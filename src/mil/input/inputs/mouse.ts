import {
  INPUT_START,
  INPUT_MOVE,
  INPUT_END,
  INPUT_TYPE_MOUSE,
} from "../input-consts";
import Input from "../input";
import Manager from "../../manager";

const MOUSE_INPUT_MAP: any = {
  mousedown: INPUT_START,
  mousemove: INPUT_MOVE,
  mouseup: INPUT_END,
};

const MOUSE_ELEMENT_EVENTS = "mousedown";
const MOUSE_WINDOW_EVENTS = "mousemove mouseup";

/**
 * @private
 * Mouse events input
 * @constructor
 * @extends Input
 */
export default class MouseInput extends Input {
  pressed: boolean;
  constructor(manager: Manager, callback: any) {
    super(manager, callback);

    this.evEl = MOUSE_ELEMENT_EVENTS;
    this.evWin = MOUSE_WINDOW_EVENTS;

    this.pressed = false; // mousedown state
  }

  /**
   * @private
   * handle mouse events
   * @param {Object} ev
   */
  handler(ev: any) {
    let eventType = MOUSE_INPUT_MAP[ev.type];

    // on start we want to have the left mouse button down
    if (eventType & INPUT_START && ev.button === 0) {
      this.pressed = true;
    }

    if (eventType & INPUT_MOVE && ev.which !== 1) {
      eventType = INPUT_END;
    }

    // mouse must be down
    if (!this.pressed) {
      return;
    }

    if (eventType & INPUT_END) {
      this.pressed = false;
    }

    this.callback(this.manager, eventType, {
      pointers: [ev],
      changedPointers: [ev],
      pointerType: INPUT_TYPE_MOUSE,
      srcEvent: ev,
    });
  }
}
