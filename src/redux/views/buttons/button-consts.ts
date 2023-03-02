import { IAttrAndSpec, ICoord } from "../../global-interfaces";

export interface IEvent {
  type: string;
  func: any;
}

export interface ISVGBtn {
  type: number;
  center: ICoord;
  r?: number;
  width?: number;
  appearAni: boolean;
  startFill: string;
  endFill: string;
  innerContent: {
    type: string;
    fontSize?: number;
    content: string;
  };
  values: string[] | number[] | IAttrAndSpec;
  events: IEvent[];
  strokeWidth?: number;
}

export const CIRCLE_BTN: number = 0;
export const RECT_BTN: number = 2;

export const BTN_TYPE_MAIN: number = 0;
export const BTN_TYPE_DATA: number = 2;
export const BTN_TYPE_TIME: number = 4;
export const BTN_TYPE_EFFECT: number = 6;
export const BTN_TYPE_PREVIEW: number = 8;
export const BTN_TYPE_CUSTOM: number = 10;

export const BTN_CLS: string = "svg-button";
export const SHADOW_FILTER_ID: string = "menuShadow";
export const SHADOW_X: number = 1;
export const SHADOW_Y: number = 2;
export const SHADOW_R: number = SHADOW_Y;
export const PNT_DOWN_SIZE: number = 4;
export const BTN_CONTENT_TYPE_ICON: string = "icon";
export const BTN_CONTENT_TYPE_STR: string = "string";
export const STROKE_COLOR: string = "#9a9a9a";
export const STROKE_DASH_ARR: string = "4 3";
export const BIG_FONT: number = 18;
export const MID_FONT: number = 12;
export const DEFAULT_BTN_SIZE: number = 24;
export const MID_BTN_SOZE: number = 22;
export const BIG_BTN_SIZE: number = 28;
export const BTN_HEIGHT: number = 28;
export const BTN_WIDTH: number = 45;
export const BTN_RX: number = 14;
export const RECT_BTN_PADDING: number = 5;
export const LETTER_WIDTH: number = 8;

export const DATA_ICON: string =
  "M27,13.82c0,2.85,0.01,5.69,0,8.54c-0.01,1.76-0.62,3.23-2.07,4.31c-0.99,0.74-2.13,0.97-3.3,0.98c-4.42,0.04-8.85,0.04-13.27,0c-1.69-0.01-3.19-0.56-4.29-1.96c-0.72-0.92-1.05-1.98-1.05-3.12c-0.02-5.85-0.02-11.71,0-17.56C3.02,2.7,4.47,0.81,6.62,0.2c0.52-0.15,1.07-0.19,1.61-0.19c4.51,0,9.01,0.02,13.52-0.01c3.19-0.02,5.24,2.21,5.25,5.28C27.01,8.13,27,10.97,27,13.82z M25.01,13.85c0-2.89,0.01-5.79,0-8.68C25,3.12,23.84,1.95,21.78,1.94c-4.52-0.01-9.04,0-13.56,0c-0.43,0-0.86,0.04-1.26,0.18C5.68,2.57,5,3.58,5,5.06c0,5.8,0,11.61,0,17.41c0,0.15,0,0.3,0.01,0.44c0.1,1.52,1.24,2.64,2.76,2.66c1.28,0.02,2.56,0.01,3.85,0.01c3.5,0,7-0.01,10.51,0c1.1,0,1.93-0.45,2.48-1.4c0.31-0.54,0.4-1.14,0.4-1.76C25.01,19.57,25.01,16.71,25.01,13.85z M15,10.04c-1.17,0-2.33,0-3.5,0c-0.48,0-0.88-0.16-1.06-0.64c-0.21-0.54,0.08-1.13,0.65-1.27c0.24-0.06,0.49-0.07,0.73-0.07c2.12,0,4.23,0,6.35,0c0.23,0,0.46,0.01,0.68,0.06c0.47,0.1,0.75,0.44,0.76,0.9c0.01,0.48-0.26,0.85-0.74,0.97c-0.19,0.05-0.39,0.05-0.59,0.05C17.2,10.04,16.1,10.04,15,10.04z M15.01,18.22c1.17,0,2.33-0.01,3.5,0c0.58,0.01,0.94,0.25,1.08,0.69c0.17,0.54-0.13,1.09-0.68,1.22c-0.2,0.05-0.42,0.06-0.63,0.06c-2.18,0-4.37,0-6.55,0c-0.21,0-0.43-0.01-0.63-0.07c-0.44-0.12-0.69-0.43-0.7-0.9c-0.01-0.46,0.21-0.78,0.65-0.94c0.2-0.08,0.42-0.08,0.63-0.08C12.78,18.22,13.89,18.22,15.01,18.22z M15.01,13.14c1.17,0,2.33-0.01,3.5,0c0.58,0.01,0.94,0.25,1.08,0.69c0.17,0.54-0.13,1.09-0.68,1.22c-0.2,0.05-0.42,0.06-0.63,0.06c-2.18,0-4.37,0-6.55,0c-0.21,0-0.43-0.01-0.63-0.07c-0.44-0.12-0.69-0.43-0.7-0.9c-0.01-0.46,0.21-0.78,0.65-0.94c0.2-0.08,0.42-0.08,0.63-0.08C12.78,13.14,13.89,13.14,15.01,13.14z";
export const NEW_ICON: string =
  "M18,12V5H7.8C7.3,5,7,5.3,7,5.8v20.5C7,26.7,7.3,27,7.8,27h16.5c0.4,0,0.8-0.3,0.8-0.8V12H18z M19,5V11H25Z";
export const OPEN_ICON: string =
  "M2.13,16.14c-0.43,0-0.81-0.14-1.06-0.39c-0.26-0.26-0.39-0.64-0.39-1.11c0.01-1.19,0-2.38,0-3.58V9.27V2.19c-0.01-0.57,0.11-0.92,0.41-1.2c0.22-0.2,0.5-0.3,0.87-0.3c0.93,0,1.87-0.01,2.81-0.01l0,0c0.94,0,1.87,0,2.8,0.01c0.74,0,1.18,0.42,1.23,1.17c0.05,0.84,0.52,1.27,1.4,1.27c0.54,0,1.09,0,1.63,0.01c0.55,0,1.1,0.01,1.64,0.01c0.69,0,1.38-0.01,2.11-0.03c0.38,0,0.71,0.12,0.93,0.34c0.24,0.23,0.37,0.58,0.37,1.01v0.28c0,0.17,0,0.35,0,0.49c-0.02,0.33,0.06,0.59,0.24,0.8c0.28,0.31,0.67,0.32,0.81,0.33c0.57,0.02,0.93,0.17,1.18,0.53c0.13,0.18,0.28,0.48,0.13,1.01c-0.5,1.71-1.01,3.42-1.52,5.13l-0.3,1l-0.3,1c-0.22,0.76-0.64,1.07-1.42,1.07c-1.14,0-2.29,0-3.43,0s-2.28,0-3.42,0c-0.63,0-1.27,0-1.9-0.01c-0.64,0-1.27-0.01-1.91-0.01c-1.12,0-2.03,0.01-2.87,0.03L2.13,16.14L2.13,16.14z M17.85,6.44c-4.39,0.01-8.8,0.01-13.2,0l0,0c-0.47,0-1.09,0.17-1.38,1c-0.38,1.14-1.94,5.7-2.32,6.84c-0.09,0.27-0.28,0.84,0.04,1.3";
export const OPEN_EG_ICON: string =
  "M9.2,23.2V23c0-0.7,0-1.7,0-3.1c0-1.3,0-2.4,0-3.1v-2.5h6v2c0,0,0,0,0,0.1s0,0.1,0,0.1c0,0,0,0,0,0.1c0,0,0,0.1,0,0.1c0,0,0,0,0,0.1c0,0,0,0.1-0.1,0.1s0,0-0.1,0c0,0-0.1,0-0.1,0h-0.1c-0.9,0-1.7,0-2.4,0c0,0.1,0,0.2,0,0.3c0,0.1,0,0.3,0,0.4c0,0.1,0,0.2,0,0.3h2.5c0.1,0,0.2,0,0.2,0c0,0,0.1,0.1,0.1,0.2c0,0,0,0.1,0,0.1c0,0,0,0.1,0,0.1c0,0.2,0,0.5,0,0.9c0,0.4,0,0.7,0,0.9C15,20,15,20,15,20c0,0,0,0-0.1,0c-1.1,0.1-1.9,0.1-2.4,0.1h-0.1V21c0.3,0,0.7,0,1.3,0c0.6,0,1,0,1.3,0c0.2,0,0.4,0.1,0.4,0.2v0.5c0,0.2,0,0.5,0,0.9c0,0.4,0,0.7,0,0.9c0,0.2-0.1,0.3-0.2,0.3c-0.2,0-0.5,0-0.8,0c-0.4,0-0.7,0-0.8,0c-0.5,0-1.2,0-2.1,0c-0.9,0-1.6,0-2,0.1l-0.1-0.2C9.2,23.3,9.2,23.2,9.2,23.2z M22.8,22.6c0,0.1-0.3,0.3-0.7,0.4c-0.4,0.1-0.9,0.2-1.3,0.3c-0.4,0-0.8,0.1-1,0.1c-0.3,0-0.5,0-0.7,0c-0.2,0-0.4-0.1-0.7-0.1c-0.3-0.1-0.5-0.1-0.8-0.3c-0.3-0.1-0.5-0.3-0.7-0.5l-0.2-0.2c-0.1,0-0.1-0.1-0.2-0.2l-0.2-0.3c-0.4-0.8-0.6-1.7-0.6-2.7c0-1,0.2-1.9,0.7-2.6l0.1-0.2v-0.1v0c0.6-0.9,1.6-1.4,3.1-1.4c0.2,0,0.4,0,0.7,0.1c0.2,0,0.5,0.1,0.8,0.2c0.3,0.1,0.5,0.2,0.8,0.4c0.2,0.2,0.4,0.4,0.6,0.6c0.1,0.1,0.1,0.2,0.2,0.4c0,0.1,0.1,0.3,0.1,0.5c0,0.2,0.1,0.4,0.1,0.5c0,0.1-0.1,0.2-0.3,0.2H22c-0.1,0-0.3,0-0.6,0c-0.3,0-0.5,0-0.7,0h-0.6c0,0-0.1-0.1-0.1-0.2s-0.1-0.2-0.1-0.2v0c-0.1-0.2-0.2-0.2-0.4-0.2c-0.1,0-0.3,0-0.4,0.1c-0.1,0.1-0.2,0.2-0.2,0.3c-0.1,0.1-0.1,0.2-0.1,0.4c0,0.2-0.1,0.3-0.1,0.4c0,0.1,0,0.3,0,0.4c0,0.1,0,0.1,0,0.2c0,0.1,0,0.2,0,0.2v0.5c0,0.1,0,0.3,0,0.4c0,0.1,0,0.2,0.1,0.4c0,0.1,0.1,0.3,0.1,0.3c0.1,0.1,0.2,0.2,0.3,0.2c0.1,0.1,0.3,0.1,0.4,0.1c0.3,0,0.6,0,0.8-0.1v-0.3c0,0,0-0.1,0-0.1c0-0.1,0-0.1,0-0.1c0,0,0,0,0-0.1c0,0,0-0.1,0-0.1h-0.2c0,0-0.1,0-0.1,0c0,0-0.1,0-0.1,0h-0.4L19.4,20c0,0,0-0.1,0-0.2v-0.4c0,0,0-0.1,0-0.2c0-0.1,0-0.2,0-0.2v-0.2c0,0,0,0,0-0.1c0,0,0-0.1,0-0.1v0c0-0.1,0-0.1,0-0.2c0,0,0.1-0.1,0.1-0.1h0.5c0,0,0.1,0,0.2,0h0.5c0.3,0,0.6,0,0.8,0h0.5c0.5,0,0.8,0.1,0.9,0.2c0,0.4,0,1,0,1.8c0,0.8,0,1.4,0,1.8V22.6z M18,12V5H7.8C7.3,5,7,5.3,7,5.7v20.5C7,26.7,7.3,27,7.8,27h16.5c0.4,0,0.8-0.3,0.8-0.8V12H18z M23.8,14.6v9.7v0.2H8.1v-0.2v-9.7v-1.1h15.7V14.6z";
export const SAVE_ICON: string =
  "M0.94,0.31C0.95,0.3,1.03,0.27,1.29,0.27h4.72h4.73c1.58,0,3.15,0,4.72,0c0.25,0,0.4,0.07,0.55,0.25c0.67,0.78,1.34,1.55,2.02,2.33l0.94,1.08c0.09,0.1,0.12,0.19,0.12,0.31v14.8c0,0.12-0.02,0.16-0.02,0.16c-0.01,0-0.05,0.03-0.17,0.04c-0.08,0.01-0.17,0.01-0.26,0.01c-0.02,0-0.03,0-0.05,0H1.45H1.16c-0.15-0.01-0.2-0.04-0.21-0.04c0-0.01-0.02-0.06-0.02-0.19v-3.93c-0.01-1.79-0.01-3.57-0.01-5.36V0.66C0.92,0.39,0.95,0.31,0.94,0.31L0.94,0.31L0.94,0.31z M4.96,0.27v1.05c0.02,1.27,0.02,2.56,0,3.83c0,0.36,0.13,0.96,0.97,0.96C7.21,6.1,8.48,6.1,9.75,6.1s2.54,0,3.82,0.01c0.83,0,1-0.53,1-0.99c-0.02-1.27-0.02-2.51,0-3.78V0.27 M14.56,19.25v-1.02c-0.01-2.12-0.01-4.23,0-6.35c0-0.63-0.34-0.97-0.97-0.97c-0.64,0.01-1.28,0.01-1.92,0.01l0,0h-0.96H9.75H8.79H7.83c-0.63-0.01-1.26-0.01-1.91-0.02l0,0c-0.2,0-0.5,0.03-0.73,0.26c-0.22,0.23-0.24,0.53-0.23,0.72c0.01,2.12,0.01,4.23,0,6.35l0,1.02 M11.9,1.94v2.62V1.94L11.9,1.94z";
export const RESET_ICON: string =
  "M15.62,6.78c0,0-0.07-0.11-0.04-0.49c0.1-1.07,0.11-2.15,0.12-3.08c0-0.13,0.01-0.21,0.03-0.25c0.02,0,0.04,0,0.07,0c0.06,0,0.14,0.01,0.21,0.02c0.95,0.13,1.91,0.26,2.86,0.39l0.34,0.04c0.09,0.01,0.15,0.03,0.19,0.04l0,0c-0.01,0.01-0.04,0.02-0.14,0.02h-0.01C19,3.46,18.76,3.42,18.51,3.38c-0.16-0.02-0.33-0.05-0.53-0.07c-0.06-0.01-0.12-0.02-0.18-0.02c-0.27,0-1.58,0.05-1.71,0.26c-0.09,0.14,0.81,0.6,1.18,1c1.04,1.52,1.59,3.24,1.63,5.11c0.09,3.99-2.84,7.89-6.68,8.9c-0.89,0.23-1.76,0.35-2.6,0.35c-2.22,0-4.26-0.83-6.08-2.46c-1.8-1.62-2.78-3.68-2.92-6.14C0.46,7.7,1.27,5.43,3.03,3.56C4.76,1.7,6.96,0.71,9.57,0.6H9.6";
export const REVERT_ICON: string =
  "M19.22,7.64c-0.09-0.17-0.17-0.35-0.26-0.52c-0.2-0.41-0.4-0.83-0.67-1.24c-1.18-1.82-2.8-3.12-4.82-3.84c-1.2-0.43-2.4-0.65-3.55-0.65c-2.17,0-4.23,0.76-6.13,2.26C2.91,4.35,2.17,5.21,1.53,6.3C1.4,6.52,1.16,6.91,1.41,7.36S2.13,7.8,2.38,7.8H7.4c0.13,0,0.24,0,0.35,0.02c-0.05,0-0.11,0-0.16,0C5.39,7.83,3.2,7.83,1,7.83c-0.11,0-0.18-0.02-0.19-0.02C0.8,7.8,0.78,7.74,0.78,7.62c0,0,0-6.75,0-6.8";
export const REDO_ICON: string =
  "M0.78,7.64c0.09-0.17,0.17-0.35,0.26-0.52c0.2-0.41,0.4-0.83,0.67-1.24c1.18-1.82,2.8-3.12,4.82-3.84c1.2-0.43,2.4-0.65,3.55-0.65c2.17,0,4.23,0.76,6.13,2.26c0.88,0.7,1.62,1.56,2.26,2.65c0.13,0.22,0.37,0.62,0.12,1.06S17.87,7.8,17.62,7.8H12.6c-0.13,0-0.24,0-0.35,0.02c0.05,0,0.11,0,0.16,0c2.2,0.01,4.39,0.01,6.59,0.01c0.11,0,0.18-0.02,0.19-0.02c0.01-0.01,0.03-0.07,0.03-0.19c0,0,0-6.75,0-6.8";
export const EDIT_ICON: string ="m 5.7129 2.0928 c -1.151 0 -2.0921 0.9353 -2.0921 2.0921 l 0 12.6078 c 0 1.151 0.9411 2.0863 2.0921 2.0863 l 12.6137 0 c 1.151 0 2.0863 -0.9352 2.0863 -2.0863 l 0 -8.2854 l 2.1644 -2.0921 l 0 11.1448 c 0 1.9244 -1.6308 3.4832 -3.5552 3.4832 l -14.0765 0 c -1.9244 0 -3.4832 -1.5588 -3.4832 -3.4832 l 0 -13.9266 c 0 -1.9244 1.5588 -3.6989 3.4832 -3.6989 l 11.1448 0 l -2.0862 2.1583 l -8.2913 0 l 0 -0 z m 7.7157 10.2455 l -4.676 1.3249 l 1.3369 -4.6462 l 3.3391 3.3213 z m 0.4678 -0.4675 l -3.3453 -3.3154 l 7.3499 -7.3018 l 3.3453 3.3151 l -7.3499 7.3021 z m 8.8606 -8.8009 l -1.0012 0.9953 l -3.3453 -3.3213 l 1.0011 -0.9953 c 0.3718 -0.3656 0.9531 -0.3838 1.295 -0.0418 l 2.0922 2.0743 c 0.3419 0.3416 0.3237 0.9233 -0.0419 1.2889 z"
export const EXPORT_ICON: string =
  "M9.22,10.47c0.04-0.07,0.15-0.18,0.25-0.28c2.28-2.28,4.56-4.56,6.82-6.81c0.03-0.02,0.69-0.55,0.75-0.84s0-0.59-0.17-0.82l-0.12-0.16c-0.19-0.29-0.52-0.47-0.87-0.47h-0.8h-0.8c-0.26,0-0.52,0-0.78,0c-0.05,0-0.08-0.01-0.08-0.05c0.89-0.01,1.79-0.02,2.69-0.02l0,0c0.87,0,1.74,0,2.62,0.01c0.01,1.53,0.01,3.04,0.01,4.58l-0.03,0.73 M9.24,3.18c-0.03,0-0.08,0.01-0.17,0.01c-0.66,0-1.32,0-1.98,0H5.11H3.12c-1.41,0-2.18,0.77-2.18,2.16v11.24c0,1.44,0.72,2.17,2.15,2.17h11.29c1.39,0,2.15-0.76,2.15-2.13v-5.58";
export const MULTISELECT_ICON: string =
  "M 20.672 4.6046 l -1.9969 1.9969 l -3.8517 -3.7337 l 2.0559 -2.0559 a 2.6818 2.6818 90 1 1 3.7927 3.7927 z m -3.1664 3.165 L 7.707 16.716 L 2.058 19.299 l 2.373 -6.174 L 13.666 4.0239 l 3.8396 3.7457 z M 20.4265 10.7547 c 0 0.8904 -0.7216 1.6123 -1.6118 1.6123 H 2.6978 c -0.89 0 -1.6115 -0.7219 -1.6115 -1.6123 c 0 -0.8907 0.7216 -1.6124 1.6115 -1.6124 h 16.1169 c 0.8902 0 1.6118 0.7217 1.6118 1.6124 z m -1.6118 -2.6875 H 2.6978 c -1.4835 0 -2.686 1.2031 -2.686 2.6875 c 0 1.4841 1.2025 2.6872 2.686 2.6872 h 16.1169 c 1.4837 0 2.6862 -1.2031 2.6862 -2.6872 c 0 -1.4843 -1.2026 -2.6875 -2.6862 -2.6875 z M 21.5009 18.8168 c 0 1.4841 -1.2026 2.6872 -2.6862 2.6872 H 2.6978 c -1.4835 0 -2.686 -1.2031 -2.686 -2.6872 c 0 -1.4843 1.9412 -3.0668 2.686 -2.6874 h 16.1169 c 1.4836 0 2.6862 1.2031 2.6862 2.6874 z m -2.6862 -1.6125 H 2.6978 c -0.89 0 -1.6115 0.7219 -1.6115 1.6125 c 0 0.8904 0.4467 1.2803 1.6115 1.6124 h 16.1169 c 0.8903 0 1.6118 -0.7219 1.6118 -1.6124 c 0 -0.8906 -0.7216 -1.6125 -1.6118 -1.6125";
export const CONFIRM_ICON: string =
  "M 10.0231 18.4164 c 0.0714 0.0714 0.2094 0.0492 0.3082 -0.0495 l 2.4818 -2.4818 c 0.0988 -0.0988 0.121 -0.2368 0.0495 -0.3082 L 3.7385 6.4528 c -0.0714 -0.0714 -0.2094 -0.0492 -0.3082 0.0495 l -2.4818 2.4818 c -0.0988 0.0988 -0.121 0.2368 -0.0495 0.3082 L 10.0231 18.4164 z M 7.5238 15.5213 c -0.1118 0.1118 -0.1224 0.2826 -0.0236 0.3814 l 2.4818 2.4818 c 0.0988 0.0988 0.2695 0.0882 0.3814 -0.0236 l 14.2883 -14.2883 c 0.1119 -0.1119 0.1224 -0.2826 0.0236 -0.3814 l -2.4818 -2.4818 c -0.0988 -0.0988 -0.2695 -0.0882 -0.3814 0.0236 L 7.5238 15.5213 z";

// export const VOICE_ICON: string = 'M10,3.4c0-1.4-0.6-2.5-2-3.1C7.4,0,6.6,0,5.8,0c-2,0-3.4,1.3-3.4,3.3c0,2.3,0,4.7,0,7.1c0,1.7,1,2.9,2.5,3.3c0.5,0.1,1.1,0.1,1.6,0.1c2.1,0,3.5-1.4,3.5-3.5c0-1.1,0-2.3,0-3.4C10,5.7,10.1,4.6,10,3.4z M6.7,12.4c-0.4,0-0.8,0-1.2,0c-1.1,0-1.9-1-1.8-2.1C3.8,10,4,10,4.2,10c0.5,0,0.9,0,1.4,0c0.6,0,0.9-0.4,0.7-0.9C6.1,8.8,5.9,8.7,5.6,8.7c-0.5,0-1,0-1.4,0c-0.3,0-0.4-0.1-0.4-0.3c0-1-0.1-0.8,0.8-0.8c0.3,0,0.7,0,1,0c0.4,0,0.7-0.3,0.7-0.6c0-0.4-0.3-0.7-0.7-0.7c-0.5,0-0.9,0-1.4,0c-0.3,0-0.4-0.1-0.4-0.4c0-0.9,0-0.7,0.7-0.7c0.3,0,0.6,0,1,0C6,5,6.3,4.8,6.3,4.4C6.3,4,6,3.8,5.5,3.8c-0.5,0-0.9,0-1.4,0c-0.2,0-0.3-0.1-0.3-0.3c-0.1-1.2,0.7-2,1.9-2.1c0.3,0,0.7,0,1,0c1.2,0,1.9,0.7,2,1.9c0,1.2,0,2.4,0,3.6c0,1.2,0,2.4,0,3.6C8.7,11.7,7.9,12.4,6.7,12.4z M6.2,20c-1,0-2.1,0-3.1,0c-0.1,0-0.2,0-0.3,0c-0.6,0-0.9-0.3-0.9-0.7c0-0.4,0.4-0.7,1-0.7c0.8,0,1.5,0,2.3,0c0.5,0,0.5,0,0.5-0.5c0-0.3,0-0.6,0-1c0-0.9,0.1-0.8-0.8-0.8c-0.5,0-1.1,0-1.6-0.2C1.3,15.5,0,13.9,0,11.8c0-0.8,0-1.6,0-2.4C0,9,0.2,8.7,0.7,8.7c0.4,0,0.7,0.3,0.7,0.8c0,0.8,0,1.6,0,2.3c0,1.5,0.9,2.7,2.4,3c0.2,0.1,0.4,0.1,0.6,0.1c1.3,0,2.6,0,3.8,0c1.6,0,2.9-1.3,3-2.9c0-0.8,0-1.6,0-2.4c0-0.2,0-0.3,0.1-0.5c0.1-0.2,0.3-0.4,0.5-0.4c0.3,0,0.5,0.1,0.6,0.3c0,0.1,0.1,0.1,0.1,0.2c0,1.6,0.3,3.3-0.6,4.8c-0.9,1.5-2.2,2.2-3.8,2.3c-0.3,0-0.6,0-0.9,0c-0.2,0-0.3,0.1-0.3,0.3c0,0.6,0,1.2,0,1.8c0,0.3,0.1,0.3,0.3,0.3c0.8,0,1.6,0,2.4,0c0.2,0,0.4,0,0.6,0.1c0.3,0.1,0.4,0.3,0.4,0.6s-0.1,0.5-0.4,0.6c-0.2,0-0.4,0-0.6,0C8.5,20,7.4,20,6.2,20z'
export const PREVIEW_ICON: string = 'M 19.504 1.072 H 1.072 c -0.6144 0 -1.024 0.4096 -1.024 1.024 v 14.336 c 0 0.6144 0.4096 1.024 1.024 1.024 h 3.072 v -2.048 H 2.096 V 3.12 h 16.384 v 12.288 h -2.048 v 2.048 h 3.072 c 0.6144 0 1.024 -0.4096 1.024 -1.024 V 2.096 c 0 -0.6144 -0.4096 -1.024 -1.024 -1.024 z M 10.6976 11.824 c -0.2048 -0.3072 -0.6144 -0.3072 -0.8192 0 l -5.12 6.8608 c -0.2048 0.3072 0 0.8192 0.4096 0.8192 h 10.24 c 0.4096 0 0.6144 -0.512 0.4096 -0.8192 l -5.12 -6.8608 z M 8.24 17.456 l 2.048 -2.7648 l 2.048 2.7648 h -4.096 z'