import "../../assets/style/panels/view-window.scss";
import { player } from "../slider/player";
import ResizablePanel from "./resizablePanel";
import {
  BTN_CONTENT_TYPE_ICON,
  CIRCLE_BTN,
  ISVGBtn,
  PNT_DOWN_SIZE,
  PREVIEW_ICON,
  MID_BTN_SOZE,
  MULTISELECT_ICON,
  CONFIRM_ICON,
} from "../buttons/button-consts";
import { DARK_COLOR, LIGHT_COLOR } from "../menu/menu-consts";
import { SVGBtn } from "../buttons/svgButton";
import {
  CHART_VIEW_TITLE,
  KF_VIEW_TITLE,
  VIDEO_VIEW_CONTENT_ID,
  VIDEO_VIEW_TITLE,
  VIEW_CONTENT_CLS,
  ZOOM,
  ZOOM_PANEL_ID,
} from "./panel-consts";
import ViewContent from "./viewContent";
import ViewToolBtn from "./viewToolBtn";
import { Example, IViewBtnProp, EXpng } from "./interfaces";
import { ICoord } from "../../global-interfaces";
import { NON_SKETCH_CLS } from "../../global-consts";
import { jsTool } from "../../../util/jsTool";
import { toggleVideoMode } from "../../action/videoAction";
import { store } from "../../store";
import { markSelection } from "../../../util/markSelection";
import { updateManualSelect, updateSelectMarksStep, updateSlectMode } from "../../action/chartAction";
import { random } from "lodash";
import Util from "../../../app/core/util";
import { svgToPngLink } from "../../../util/appTool";
import util from "../../../app/core/util";
export var multiSelectBtn: boolean = false;
export default class ViewWindow {
  viewTitle: string;
  showTitle: boolean;
  view: HTMLDivElement;
  parentPanel: ResizablePanel;
  eventTime: number
  constructor(title: string, showTitle: boolean) {
    this.viewTitle = title;
    this.showTitle = showTitle;
  }

  public static resizeVideoLayer() {
    const videoSVG: SVGSVGElement = document
      .getElementById(VIDEO_VIEW_CONTENT_ID)
      .querySelector("svg");
    if (videoSVG) {
      videoSVG.removeAttributeNS(null, "viewBox");
      videoSVG.removeAttributeNS(null, "width");
      videoSVG.removeAttributeNS(null, "height");
    }
    const videoLayer: HTMLElement = document
      .getElementById(VIDEO_VIEW_CONTENT_ID)
      .querySelector("svg > g");
    const chartLayer: HTMLElement = document.getElementById("chartContent");
    if (videoLayer && chartLayer) {
      const chartBBox: DOMRect = chartLayer.getBoundingClientRect();
      const videoBBox: DOMRect = videoLayer.getBoundingClientRect();
      const chartTrans: ICoord = jsTool.extractTransNums(
        chartLayer.getAttributeNS(null, "transform")
      );
      const sizeRatio: number = chartBBox.width / videoBBox.width;
      videoLayer.setAttributeNS(
        null,
        "transform",
        `translate(${chartTrans.x}, ${chartTrans.y}) scale(${sizeRatio})`
      );
    }
  }

  public createView(): void {
    this.view = document.createElement("div");
    this.view.className = "view";

    const viewTitleContainer: HTMLDivElement = document.createElement("div");
    if (this.showTitle) {
      viewTitleContainer.className = "view-title-container";
      if (this.viewTitle !== "") {
        const viewTitleText: HTMLSpanElement = document.createElement("span");
        viewTitleText.className = "view-title-text";
        let titleText: string = this.viewTitle;
        switch (titleText) {
          case KF_VIEW_TITLE:
            titleText = "Animation Specification"; //keyframe list
            break;
          case VIDEO_VIEW_TITLE:
            titleText = "Animation Preview";
            break;
          default:
            break;
        }
        viewTitleText.innerHTML = jsTool.firstLetterUppercase(titleText);
        viewTitleContainer.appendChild(viewTitleText);
      }

      this.view.appendChild(viewTitleContainer);

      const that = this;

      viewTitleContainer.onpointerdown = (e) => {
        e.stopPropagation();
        switch (e.pointerType) {
          case "pen":
          case "mouse":
          case "touch":
            that.parentPanel.resizerDown(e);
            break;
        }
      };
    }

    const viewContent = new ViewContent();
    viewContent.createViewContent(this.viewTitle);
    this.view.appendChild(viewContent.container);

    //create tools on the title
    switch (this.viewTitle) {
      case CHART_VIEW_TITLE:
        this.createChartUpperLayers();
        break;
      case VIDEO_VIEW_TITLE:
        break;
      case KF_VIEW_TITLE:
        viewTitleContainer.classList.add("keyframe-title-container");
        break;
    }
  }

  public createChartUpperLayers(): void {
    this.createVideoLayer();
    this.createPlayerWidget();
    this.createZoomPanel();
    this.createMultiSelectBtn();
    this.createPreviewBtn();
    this.createConfirmBtn();
  }

  public createMultiSelectBtn() {
    const r: number = MID_BTN_SOZE;
    const container = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "svg"
    );
    container.classList.add("multiselect-btn-container", NON_SKETCH_CLS);
    this.view.appendChild(container);
    const buttonProps: ISVGBtn = {
      type: CIRCLE_BTN,
      center: { x: r + PNT_DOWN_SIZE, y: PNT_DOWN_SIZE + r },
      r: r,
      appearAni: false,
      startFill: LIGHT_COLOR,
      endFill: DARK_COLOR,
      innerContent: {
        type: BTN_CONTENT_TYPE_ICON,
        content: MULTISELECT_ICON,
      },
      values: [],
      events: [
        {
          type: "pointerdown",
          func: (e: any) => {
            if (e.pointerType === 'touch') {
              console.log('mudown', e)
              store.dispatchSystem(updateSlectMode('manual'));
            }

          },
        },
        {
          type: "pointerup",
          func: (e: any) => {
            if (e.pointerType === 'touch') {
              console.log('muup', e)
              const marksToconfirm: string[][] = [[...store.getState().manualSelect.marks].sort()];
              store.dispatchSystem(updateManualSelect(store.getState().manualSelect.marks, false));
              markSelection.beginSuggest(marksToconfirm);
              store.dispatchSystem(updateSlectMode('intelligent'));
            }
          },
        },
      ],
    };
    const btn: SVGBtn = new SVGBtn(container, true, buttonProps);
    container.appendChild(btn.container);
  }
  public createPreviewBtn() {
    const r: number = MID_BTN_SOZE;
    const container = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "svg"
    );
    container.classList.add("preview-btn-container", NON_SKETCH_CLS);
    this.view.appendChild(container);
    const buttonProps: ISVGBtn = {
      type: CIRCLE_BTN,
      center: { x: r + PNT_DOWN_SIZE, y: r + PNT_DOWN_SIZE },
      r: r,
      appearAni: false,
      startFill: LIGHT_COLOR,
      endFill: DARK_COLOR,
      innerContent: {
        type: BTN_CONTENT_TYPE_ICON,
        content: PREVIEW_ICON,
      },
      values: [],
      events: [
        {
          type: "click",
          func: () => {
            if (player.shown) {
              store.dispatchSystem(toggleVideoMode(false));
            } else {
              store.dispatchSystem(toggleVideoMode(true));
            }

          }
        }
      ],
    };
    const btn: SVGBtn = new SVGBtn(container, true, buttonProps);
    container.appendChild(btn.container);
  }
  public createConfirmBtn() {
    const r: number = MID_BTN_SOZE;
    const container = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "svg"
    );
    container.classList.add("confirm-btn-container", NON_SKETCH_CLS);
    this.view.appendChild(container);
    const buttonProps: ISVGBtn = {
      type: CIRCLE_BTN,
      center: { x: r + PNT_DOWN_SIZE, y: r + PNT_DOWN_SIZE },
      r: r,
      appearAni: false,
      startFill: '#38B12F',
      endFill: LIGHT_COLOR,
      innerContent: {
        type: BTN_CONTENT_TYPE_ICON,
        content: CONFIRM_ICON,
      },
      values: [],
      events: [
        {
          type: "click",
          func: () => {
            // store.getState().selectMarksStep.forEach((step) => {
            //   step.forEach((s) => {
            //     document.getElementById(s).style.opacity = '0.3';
            //   });
            // });
            const marksToconfirm: string[][] = [[...store.getState().manualSelect.marks].sort()];
            const svg: HTMLElement = document.getElementById('visChart');
            //random id, length = 15
            const id: string = Math.random().toString(36).substr(2, 15);
            let dataDatum: any[] = [];
            let collection: any[] = [];
            let allMarksPng: EXpng[] = [];
            store.getState().dataTable.forEach((value, id) => {
              dataDatum.push({key:id, value:document.getElementById(id).getAttribute('data-datum')});
              collection.push({key:id, value:document.getElementById(id).getAttribute('collection')});
            });
            util.nonDataTable.forEach((value, id) => {
              dataDatum.push({key:id, value:document.getElementById(id).getAttribute('data-datum')});
              collection.push({key:id, value:document.getElementById(id).getAttribute('collection')});
            });
            //current trace
            const currentTrace: ICoord[][] = store.getState().trace;
            //all mark pngs
            store.getState().dataTable.forEach((mark, markkey) => {
              document.getElementById(markkey).style.opacity = '0';
            });// all 0
            Util.nonDataTable.forEach((mark, markkey) => {
              document.getElementById(markkey).style.opacity = '0';
            });
            store.getState().dataTable.forEach((mark, markkey) => {
              if (store.getState().selectMarksStep.length != 0) {
                if (store.getState().selectMarksStep[store.getState().selectMarksStep.length - 1].includes(markkey)) {
                  document.getElementById(markkey).style.opacity = '0.3';
                } else {
                  document.getElementById(markkey).style.opacity = '1';
                }
              } else {
                document.getElementById(markkey).style.opacity = '1';
              }
              const png = svgToPngLink(svg);
              allMarksPng.push({ markId: markkey, png: png });
              document.getElementById(markkey).style.opacity = '0';
            });
            Util.nonDataTable.forEach((mark, markkey) => {
              if (store.getState().selectMarksStep.length != 0) {
                if (store.getState().selectMarksStep[store.getState().selectMarksStep.length - 1].includes(markkey)) {
                  document.getElementById(markkey).style.opacity = '0.3';
                } else {
                  document.getElementById(markkey).style.opacity = '1';
                }
              } else {
                document.getElementById(markkey).style.opacity = '1';
              }
              const png = svgToPngLink(svg);
              allMarksPng.push({ markId: markkey, png: png });
              document.getElementById(markkey).style.opacity = '0';
            });
            store.getState().dataTable.forEach((mark, markkey) => {
              document.getElementById(markkey).style.opacity = '1';
            });
            util.nonDataTable.forEach((mark, markkey) => {
              document.getElementById(markkey).style.opacity = '1';
            });
            // store.getState().selectMarksStep.forEach((step) => {
            //   step.forEach((s) => {
            //     document.getElementById(s).style.opacity = '0.3';
            //   });
            // });

            //previous marks
            const previousMarks: string[] = store.getState().selectMarksStep[store.getState().selectMarksStep.length - 1]
            //gt marks
            const gtMarks: string[] = marksToconfirm[0];

            const example: Example = {
              id: id,
              currentTrace: currentTrace,
              allMarksPngFileName: allMarksPng,
              previousMarks: previousMarks,
              gtMarks: gtMarks,
              dataDatum: dataDatum,
              collection: collection,
            };
            // function downloadJSON() {
              const filename = example.id + '.json';   // 文件名
            
              const blob = new Blob([JSON.stringify(example, null, 2)], {   // 将 JSON 数据转换成 Blob 对象
                type: 'application/json'
              });
            
              const url = URL.createObjectURL(blob);   // 创建一个 URL 对象
            
              const link = document.createElement('a');   // 创建一个 a 标签元素
              link.href = url;
              link.download = filename;   // 设置文件名
              link.click();   // 触发下载操作
              URL.revokeObjectURL(url);   // 释放 URL 对象
            // }

            store.dispatchSystem(updateSelectMarksStep(marksToconfirm[0]));
            marksToconfirm.forEach((mark) => {
              mark.forEach((m) => {
                document.getElementById(m).style.opacity = '0.3';
              });
            });
            store.dispatchSystem(updateManualSelect(store.getState().manualSelect.marks, false));
            store.dispatchSystem(updateSlectMode('intelligent'));
          },
        },
      ],
    };
    const btn: SVGBtn = new SVGBtn(container, true, buttonProps);
    container.appendChild(btn.container);
  }
  public createZoomPanel() {
    const zoomPanel: HTMLDivElement = document.createElement("div");
    zoomPanel.innerHTML = "100%";
    zoomPanel.id = ZOOM_PANEL_ID;
    zoomPanel.className = `zoom-panel ${NON_SKETCH_CLS}`;
    zoomPanel.hidden = true; //hidden 
    this.view.appendChild(zoomPanel);
  }
  public createPlayerWidget(): void {
    const container: HTMLDivElement = document.createElement("div");
    container.className = "player-widget";
    container.appendChild(player.widget);
    this.view.appendChild(container);
  }

  public createVideoLayer(): void {
    const container: HTMLDivElement = document.createElement("div");
    container.id = VIDEO_VIEW_CONTENT_ID;
    // container.className = `${ViewContent.VIEW_CONTENT_CLS} hide-ele`;
    container.className = `${VIEW_CONTENT_CLS} ele-under`;
    this.view.appendChild(container);
  }

  public createKfTools(): HTMLDivElement {
    const toolContainer = document.createElement("div");
    toolContainer.className = "view-tool-container";
    toolContainer.appendChild(
      this.createBtn({
        clickEvtType: ZOOM,
        iconClass: "zoom-icon",
      })
    );
    //create zooming slider

    // const slider: Slider = new Slider([ViewWindow.MIN_ZOOM_LEVEL, ViewWindow.MAX_ZOOM_LEVEL], ViewWindow.MAX_ZOOM_LEVEL);
    // slider.createSlider()
    // slider.callbackFunc = (zl: number) => {
    //     Reducer.triger(action.KEYFRAME_ZOOM_LEVEL, zl);
    // };
    // toolContainer.appendChild(this.createBtn({
    //     title: 'Zoom Out',
    //     clickEvtType: ViewToolBtn.CUSTOM,
    //     clickEvt: () => {
    //         if (store.getState().kfZoomLevel - ViewWindow.ZOOM_STEP >= ViewWindow.MIN_ZOOM_LEVEL) {
    //             slider.moveSlider(store.getState().kfZoomLevel - ViewWindow.ZOOM_STEP);
    //         } else {
    //             slider.moveSlider(ViewWindow.MIN_ZOOM_LEVEL);
    //         }
    //     },
    //     iconClass: 'zoom-out-icon'
    // }));
    // toolContainer.appendChild(slider.sliderContainer);
    // toolContainer.appendChild(this.createBtn({
    //     title: 'Zoom In',
    //     clickEvtType: ViewToolBtn.CUSTOM,
    //     clickEvt: () => {
    //         if (store.getState().kfZoomLevel + ViewWindow.ZOOM_STEP <= ViewWindow.MAX_ZOOM_LEVEL) {
    //             slider.moveSlider(store.getState().kfZoomLevel + ViewWindow.ZOOM_STEP);
    //         } else {
    //             slider.moveSlider(ViewWindow.MAX_ZOOM_LEVEL);
    //         }
    //     },
    //     iconClass: 'zoom-in-icon'
    // }));
    return toolContainer;
  }

  public createSeparator(): HTMLSpanElement {
    const separator: HTMLSpanElement = document.createElement("span");
    separator.className = "tool-separator";
    return separator;
  }

  public createBtn(props: IViewBtnProp): HTMLSpanElement {
    const btn: HTMLSpanElement = new ViewToolBtn().btn(props);
    return btn;
  }

}
