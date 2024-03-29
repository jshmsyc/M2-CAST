import KfGroup, { GROUP_RX } from "./kfGroup";
import KfItem from "./kfItem";
import { state } from "../../../app/state";
import { Animation, TimingSpec } from "canis_toolkit";
import IntelliRefLine from "./intelliRefLine";
import KfTrack from "./kfTrack";
import { KF_FG_LAYER, KF_OMIT_LAYER } from "./vl-consts";
import { ICoord, IOmitPattern } from "../../global-interfaces";
import { createSvgElement } from "../../../util/svgManager";
import { jsTool } from "../../../util/jsTool";
import { store } from "../../store";

export default class KfOmit {
  static OMIT_WIDTH: number = 36;
  static OMIT_W_UNIT: number = KfOmit.OMIT_WIDTH / 6;
  static OMIT_SUB_WIDTH: number = 24;
  static OMIT_SUB_W_UNIT: number = KfOmit.OMIT_SUB_WIDTH / 6;
  static OMIT_HEIGHT: number = 20;
  static OMIT_SUB_HEIGHT: number = 14;
  static KF_OMIT: string = "kfOmit";
  static KF_GROUP_OMIT: string = "kfGroupOmit";
  static KF_ALIGN: string = "kfAlign";
  static PADDING: number = 6;
  static omitIdx: number = 0;
  static maxOmitWidth: number = KfOmit.OMIT_WIDTH;

  public id: string;
  public idxInGroup: number = -1;
  public isHidden: boolean = false;
  public totalWidth: number = KfOmit.OMIT_WIDTH;
  public oHeight: number = KfOmit.OMIT_HEIGHT;
  public container: SVGGElement;
  public num: SVGTextElement;
  public hasOffset: boolean;
  public hasDuration: boolean;
  public iconContainer: SVGGElement;
  public parentObj: KfGroup;
  public preItem: KfItem | KfGroup;
  public startX: number;
  public startY: number;
  public omitType: string;
  public omitPattern: {
    merge: boolean;
    timing: string;
    hasOffset: boolean;
    hasDuration: boolean;
  }[] = [];
  public omittedNum: number; //could be kfitem or kfgroup
  public kfIcon: SVGRectElement;
  public offsetIcon: SVGRectElement;
  public durationIcon: SVGRectElement;
  public IconComb: SVGGElement;
  public rendered: boolean = true;
  public useTag: SVGUseElement;

  public static reset() {
    this.omitIdx = 0;
    this.maxOmitWidth = KfOmit.OMIT_WIDTH;
  }

  public createOmit(
    omitType: string,
    startX: number,
    omittedNum: number,
    parentObj: KfGroup,
    hasOffset: boolean,
    hasDuration: boolean,
    startY: number,
    preItemIdx: number = -1
  ): void {
    this.omitType = omitType;
    this.hasOffset = hasOffset;
    this.hasDuration = hasDuration;
    this.parentObj = parentObj;
    // this.preItem = preItemIdx === -1 ? <KfGroup | KfItem>this.parentObj.children[this.parentObj.children.length - 1] : <KfGroup | KfItem>this.parentObj.children[preItemIdx];
    this.omittedNum = omittedNum;
    this.startX = startX;
    this.startY = startY;
    this.id = `kfOmit${KfOmit.omitIdx}`;
    KfOmit.omitIdx++;

    //assign pre item
    if (preItemIdx !== -1 && this.parentObj.children[preItemIdx].rendered) {
      this.preItem = <KfGroup | KfItem>this.parentObj.children[preItemIdx];
    } else {
      let lastRenderedItem: KfGroup | KfItem;
      this.parentObj.children.forEach((c: KfGroup | KfItem | KfOmit) => {
        if ((c instanceof KfGroup || c instanceof KfItem) && c.rendered) {
          lastRenderedItem = c;
        }
      });
      this.preItem = lastRenderedItem;
    }

    if (this.preItem instanceof KfItem) {
      if (this.preItem.hasHiddenDuration) {
        this.startX -= this.preItem.durationWidth;
      }
    }

    if (typeof this.parentObj.container !== "undefined") {
      this.renderOmit();
    }
  }

  public renderOmit() {
    this.container = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "g"
    );
    this.container.id = this.id;

    //create thumbnail
    this.createThumbnail(this.omittedNum);

    //create dots
    this.createDots();
    this.parentObj.container.appendChild(this.container);
    if (
      typeof this.parentObj.alignTarget !== "undefined" &&
      this.parentObj.alignType === Animation.alignTarget.withEle
    ) {
      this.hideOmit();
    }
    this.translateContainer(
      this.startX + KfOmit.PADDING,
      this.startY - this.oHeight
    );
    if (this.omitType === KfOmit.KF_ALIGN) {
      this.createUseTag();
    }
  }

  public createUseTag() {
    this.useTag = document.createElementNS("http://www.w3.org/2000/svg", "use");
    this.useTag.setAttributeNS(
      "http://www.w3.org/1999/xlink",
      "href",
      `#${this.id}`
    );
    document.getElementById(KF_OMIT_LAYER).appendChild(this.useTag);
    this.updateUseTagPosi();

    // this.hideOmit();
  }

  public updateUseTagPosi() {
    const kfFgBbox: DOMRect = document
      .getElementById(KF_FG_LAYER)
      .getBoundingClientRect();
    const parentBbox: DOMRect = this.parentObj.groupBg.getBoundingClientRect();
    this.useTag.setAttributeNS(
      null,
      "x",
      `${(parentBbox.x - kfFgBbox.x) / store.getState().kfZoomLevel}`
    );
    this.useTag.setAttributeNS(
      null,
      "y",
      `${(parentBbox.y - kfFgBbox.y) / store.getState().kfZoomLevel}`
    );
  }

  public createThumbnail(omittedNum: number): void {
    this.iconContainer = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "g"
    );
    this.iconContainer.setAttributeNS(
      null,
      "transform",
      `translate(${KfOmit.OMIT_W_UNIT / 2}, 0)`
    );
    switch (this.omitType) {
      case KfOmit.KF_OMIT:
        this.kfIcon = <SVGRectElement>createSvgElement({
          tag: "rect",
          para: {
            y: "0",
            fill: "#fff",
            stroke: "#e4e4e4",
            strokeWidth: "1",
            height: `${this.oHeight}`,
          },
          flag: true,
        });
        this.iconContainer.appendChild(this.kfIcon);
        break;
      case KfOmit.KF_ALIGN:
        this.createThumbnailComb();
        this.iconContainer.appendChild(this.IconComb);
        break;
      case KfOmit.KF_GROUP_OMIT:
        this.kfIcon = <SVGRectElement>createSvgElement({
          tag: "rect",
          para: {
            y: "0",
            fill: "rgb(239, 239, 239)",
            stroke: "#898989",
            strokeWidth: "1",
            height: `${this.oHeight}`,
            width: `${KfOmit.OMIT_W_UNIT * 5}`,
            rx: `${GROUP_RX / 2}`,
          },
          flag: true,
        });
        this.iconContainer.appendChild(this.kfIcon);
        break;
    }

    this.offsetIcon = <SVGRectElement>createSvgElement({
      tag: "rect",
      para: {
        x: "0",
        y: "0",
        fill: KfItem.OFFSET_COLOR,
        height: `${this.oHeight}`,
      },
      flag: true,
    });
    this.durationIcon = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "rect"
    );
    if (typeof this.preItem !== "undefined") {
      this.durationIcon.setAttributeNS(
        null,
        "y",
        this.preItem.hasHiddenDuration ? `${-this.oHeight / 4}` : "0"
      );
      this.durationIcon.setAttributeNS(
        null,
        "height",
        this.preItem.hasHiddenDuration
          ? `${(5 * this.oHeight) / 4}`
          : `${this.oHeight}`
      );
    } else {
      this.durationIcon.setAttributeNS(null, "y", "0");
      this.durationIcon.setAttributeNS(null, "height", `${this.oHeight}`);
    }
    this.durationIcon.setAttributeNS(null, "fill", KfItem.DURATION_COLOR);
    this.iconContainer.appendChild(this.offsetIcon);
    this.iconContainer.appendChild(this.durationIcon);
    this.updateThumbnail(this.hasOffset, this.hasDuration);
    this.createNum(omittedNum);
    this.container.appendChild(this.iconContainer);
  }

  public createThumbnailComb() {
    this.IconComb = document.createElementNS("http://www.w3.org/2000/svg", "g");
    let trackCount: number = 0;
    this.totalWidth = KfOmit.OMIT_SUB_WIDTH;
    this.oHeight = KfOmit.OMIT_SUB_HEIGHT;

    this.omitPattern.forEach((ommittedKf: IOmitPattern, idx: number) => {
      let trackNum: number = 1;
      if (
        ommittedKf.timing === TimingSpec.timingRef.previousStart ||
        !ommittedKf.merge
      ) {
        trackCount++;
        trackNum = trackCount;
      }
      // const trackNum: number = ((!ommittedKf.merge && ommittedKf.timing === TimingSpec.timingRef.previousEnd) || ommittedKf.timing === TimingSpec.timingRef.previousStart) ? trackCount : 0;
      this.IconComb.appendChild(
        this.createSubThumbnail(
          ommittedKf.hasOffset,
          trackNum,
          idx,
          ommittedKf.timing === TimingSpec.timingRef.previousEnd,
          ommittedKf.merge
        )
      );
    });
    if (this.totalWidth > KfOmit.maxOmitWidth) {
      KfOmit.maxOmitWidth = this.totalWidth;
    }
  }

  /**
   * create single thumbnail in the combination
   * @param hasOffset
   * @param index
   */
  public createSubThumbnail(
    hasOffset: boolean,
    trackNum: number,
    index: number,
    afterPre: boolean,
    merge: boolean
  ): SVGGElement {
    const tmpContainer: SVGGElement = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "g"
    );
    tmpContainer.setAttributeNS(
      null,
      "transform",
      `translate(${afterPre && index > 0 ? this.totalWidth - 3 : 0}, ${
        trackNum * (KfOmit.OMIT_SUB_HEIGHT + 2)
      })`
    );
    //update the omit size
    this.totalWidth =
      afterPre && index > 0
        ? this.totalWidth + KfOmit.OMIT_SUB_WIDTH
        : this.totalWidth;
    this.oHeight =
      (trackNum + 1) * KfOmit.OMIT_SUB_HEIGHT > this.oHeight
        ? (trackNum + 1) * (KfOmit.OMIT_SUB_HEIGHT + 2)
        : this.oHeight;
    if (hasOffset) {
      const offsetBg: SVGRectElement = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "rect"
      );
      offsetBg.setAttributeNS(null, "fill", KfItem.OFFSET_COLOR);
      offsetBg.setAttributeNS(null, "width", `${KfOmit.OMIT_SUB_W_UNIT}`);
      offsetBg.setAttributeNS(null, "height", `${KfOmit.OMIT_SUB_HEIGHT}`);
      tmpContainer.appendChild(offsetBg);
    }
    const kfBg: SVGRectElement = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "rect"
    );
    kfBg.setAttributeNS(null, "fill", "#ffffff");
    kfBg.setAttributeNS(
      null,
      "x",
      `${hasOffset ? KfOmit.OMIT_SUB_W_UNIT - 3 : 0}`
    );
    kfBg.setAttributeNS(
      null,
      "width",
      `${hasOffset ? KfOmit.OMIT_SUB_W_UNIT * 4 : KfOmit.OMIT_SUB_W_UNIT * 5}`
    );
    kfBg.setAttributeNS(null, "height", `${KfOmit.OMIT_SUB_HEIGHT}`);
    kfBg.setAttributeNS(null, "stroke", IntelliRefLine.Real_COLOR);
    kfBg.setAttributeNS(null, "stroke-dasharray", "1 0");

    tmpContainer.appendChild(kfBg);
    const duraitonBg: SVGRectElement = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "rect"
    );
    duraitonBg.setAttributeNS(null, "fill", KfItem.DURATION_COLOR);
    duraitonBg.setAttributeNS(null, "x", `${KfOmit.OMIT_SUB_W_UNIT * 5 - 3}`);
    duraitonBg.setAttributeNS(null, "height", `${KfOmit.OMIT_SUB_HEIGHT}`);
    duraitonBg.setAttributeNS(null, "width", `${KfOmit.OMIT_SUB_W_UNIT}`);
    tmpContainer.appendChild(duraitonBg);

    if (index > 0 && afterPre && merge) {
      const frame: SVGRectElement = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "rect"
      );
      frame.setAttributeNS(null, "width", `${KfOmit.OMIT_SUB_WIDTH - 3}`);
      frame.setAttributeNS(null, "height", `${KfOmit.OMIT_SUB_HEIGHT}`);
      frame.setAttributeNS(null, "fill", "none");
      frame.setAttributeNS(null, "stroke", IntelliRefLine.STROKE_COLOR);
      frame.setAttributeNS(null, "stroke-dasharray", "2 1");
      tmpContainer.appendChild(frame);
    } else if (index > 0 && afterPre && !merge) {
      const lineStartY: number = -(trackNum - 1) * KfOmit.OMIT_SUB_HEIGHT;
      const lineHeight: number = (trackNum + 1) * KfOmit.OMIT_SUB_HEIGHT;
      const refLine: SVGLineElement = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "line"
      );
      refLine.setAttributeNS(null, "x1", "0");
      refLine.setAttributeNS(null, "x2", "0");
      refLine.setAttributeNS(null, "y1", `${lineStartY}`);
      refLine.setAttributeNS(null, "y2", `${KfOmit.OMIT_SUB_HEIGHT}`);
      refLine.setAttributeNS(null, "stroke", IntelliRefLine.STROKE_COLOR);
      refLine.setAttributeNS(null, "stroke-dasharray", "2 1");
      tmpContainer.appendChild(refLine);
    }
    return tmpContainer;
  }

  public updateThumbnail(hasOffset: boolean, hasDuration: boolean): void {
    switch (this.omitType) {
      case KfOmit.KF_OMIT:
        this.hasOffset = hasOffset;
        this.hasDuration = hasDuration;
        if (this.hasOffset) {
          this.offsetIcon.setAttributeNS(
            null,
            "width",
            `${KfOmit.OMIT_W_UNIT}`
          );
          this.kfIcon.setAttributeNS(null, "x", `${KfOmit.OMIT_W_UNIT}`);
          // if (this.hasDuration) {
          this.kfIcon.setAttributeNS(
            null,
            "width",
            `${KfOmit.OMIT_W_UNIT * 3}`
          );
          this.durationIcon.setAttributeNS(
            null,
            "x",
            `${KfOmit.OMIT_W_UNIT * 4}`
          );
          this.durationIcon.setAttributeNS(
            null,
            "width",
            `${KfOmit.OMIT_W_UNIT}`
          );
          // } else {
          //     this.kfIcon.setAttributeNS(null, 'width', `${KfOmit.OMIT_W_UNIT * 4}`);
          //     this.durationIcon.setAttributeNS(null, 'width', '0');
          // }
        } else {
          this.offsetIcon.setAttributeNS(null, "width", "0");
          this.kfIcon.setAttributeNS(null, "x", "0");
          // if (this.hasDuration) {
          this.kfIcon.setAttributeNS(
            null,
            "width",
            `${KfOmit.OMIT_W_UNIT * 4}`
          );
          this.durationIcon.setAttributeNS(
            null,
            "x",
            `${KfOmit.OMIT_W_UNIT * 4}`
          );
          this.durationIcon.setAttributeNS(
            null,
            "width",
            `${KfOmit.OMIT_W_UNIT}`
          );
          // } else {
          //     this.kfIcon.setAttributeNS(null, 'width', `${KfOmit.OMIT_W_UNIT * 5}`);
          //     this.durationIcon.setAttributeNS(null, 'width', '0');
          // }
        }
        break;
    }
  }

  /**
   * when this group is aligned to other groups, then the startX is not correct
   */
  public correctTrans(targetKf: KfItem): void {
    const targetKfTrans: ICoord = jsTool.extractTransNums(
      targetKf.container.getAttributeNS(null, "transform")
    );
    const targetKfBBox: DOMRect = targetKf.container.getBoundingClientRect();
    const currentOmitBbox: ICoord = jsTool.extractTransNums(
      this.container.getAttributeNS(null, "transform")
    );
    this.translateContainer(
      targetKfTrans.x +
        targetKfBBox.width / store.getState().kfZoomLevel +
        KfOmit.PADDING,
      currentOmitBbox.y
    );
  }

  public updateTrans(startX: number, startY: number): void {
    this.translateContainer(startX, startY - this.oHeight / 2);
  }

  public translateContainer(x: number, y: number) {
    this.container.setAttributeNS(
      null,
      "transform",
      `translate(${Math.max(0, x)}, ${y})`
    );
  }

  public createNum(omittedNum: number): void {
    this.num = document.createElementNS("http://www.w3.org/2000/svg", "text");
    this.num.setAttributeNS(null, "x", `${this.totalWidth / 2}`);
    this.num.setAttributeNS(
      null,
      "y",
      `${this.omitType === KfOmit.KF_ALIGN ? this.oHeight + 15 : 15}`
    );
    this.num.setAttributeNS(null, "font-size", "12px");
    this.num.setAttributeNS(null, "text-anchor", "middle");
    this.num.innerHTML = `x${omittedNum}`;
    this.iconContainer.appendChild(this.num);
  }

  public updateNum(omittedNum: number): void {
    this.omittedNum = omittedNum;
    this.num.innerHTML = `x${omittedNum}`;
  }

  public createDots(): void {
    const dots: SVGTextElement = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "text"
    );
    dots.setAttributeNS(null, "x", `${this.totalWidth / 2}`);
    dots.setAttributeNS(
      null,
      "y",
      `${
        this.omitType === KfOmit.KF_ALIGN
          ? this.oHeight + 25
          : this.oHeight + 10
      }`
    );
    dots.setAttributeNS(null, "font-size", "32px");
    dots.setAttributeNS(null, "text-anchor", "middle");
    dots.innerHTML = "...";
    this.container.appendChild(dots);
  }

  public showOmit(): void {
    if (typeof this.container !== "undefined") {
      this.isHidden = false;
      this.container.setAttributeNS(null, "opacity", "1");
    }
  }

  public hideOmit(): void {
    if (typeof this.container !== "undefined") {
      this.isHidden = true;
      this.container.setAttributeNS(null, "opacity", "0");
    }
  }

  public removeOmit(parentObj: KfGroup | KfTrack): void {
    if (parentObj.container.contains(this.container)) {
      parentObj.container.removeChild(this.container);
    }
  }
}
