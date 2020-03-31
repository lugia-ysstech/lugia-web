//@flow
import type { KeyBoardEventListenerHandle } from '@lugia/lugia-web';
import Listener from '@lugia/listener';

export default class KeyBoardEventListener extends Listener<any> {
  editing: boolean;
  multipleSelect: boolean;
  canMoveCells: boolean;
  isShift: boolean;
  isKeyBoardDown: boolean;
  moveTrack: Array;
  keyDownListener: Object;
  keyDownListener: Object;
  enterMultipleSelect: Object;
  quitMultipleSelect: Object;
  enterMoveCells: Object;
  quitMoveCells: Object;
  shiftDown: Object;
  shiftUp: Object;
  enterMoveTrack: Object;
  quiteMoveTrack: Object;

  constructor() {
    super();
    this.editing = false;
    this.multipleSelect = false;
    this.canMoveCells = false;
    this.isShift = false;
    this.isKeyBoardDown = false;
    this.moveTrack = [];

    this.keyDownListener = this.on('keyDown', this.onKeyDown);
    this.enterMultipleSelect = this.on('enterMultipleSelect', () => {
      this.multipleSelect = true;
    });
    this.quitMultipleSelect = this.on('quitMultipleSelect', () => {
      this.multipleSelect = false;
    });
    this.enterMoveCells = this.on('enterMoveCells', () => {
      this.canMoveCells = true;
    });
    this.quitMoveCells = this.on('quitMoveCells', () => {
      this.canMoveCells = false;
    });
    this.shiftDown = this.on('shiftDown', () => {
      this.isShift = true;
    });
    this.shiftUp = this.on('shiftUp', () => {
      this.isShift = false;
    });
    this.enterMoveTrack = this.on('enterMoveTrack', (currentCell: Object) => {
      this.moveTrack = this.moveTrack.concat([currentCell]);
    });
    this.quiteMoveTrack = this.on('quiteMoveTrack', () => {
      this.moveTrack = [];
    });
  }

  onKeyDown = (e: Object) => {
    if (this.isKeyBoardDown) {
      return;
    }
    this.isKeyBoardDown = true;
    const { key, shiftKey } = e;

    if (shiftKey) {
      this.emit('shiftDown');
      this.emit('enterMultipleSelect');
    }
    if (this.isCanMoveCells()) {
      let directions;
      switch (key) {
        case 'ArrowLeft':
          directions = 'left';
          break;
        case 'ArrowUp':
          directions = 'top';
          break;
        case 'Enter':
          directions = 'backToBottom';
          break;
        case 'ArrowDown':
          directions = 'bottom';
          break;
        case 'ArrowRight':
        case 'Tab':
          directions = 'right';
          break;
        default:
          break;
      }
      this.emit('moveCells', { directions, key });
      if (key !== 'Tab' && key !== 'Enter') {
        this.emit('quiteMoveTrack');
      }
    }
  };
  onKeyUp = (e: Object) => {
    this.isKeyBoardDown = false;
    const { key } = e;
    if (key === 'Shift') {
      this.emit('shiftUp');
      this.emit('quitMultipleSelect');
    }
  };

  isMultiple = (): boolean => {
    return this.multipleSelect;
  };

  isCanMoveCells = (): boolean => {
    return this.canMoveCells;
  };

  isShiftDown = (): boolean => {
    return this.isShift;
  };
  getMoveTrack = (): boolean => {
    return this.moveTrack;
  };

  componentWillUnmount(): void {
    this.keyDownListener.removeListener();
    this.keyDownListener.removeListener();
    this.enterMultipleSelect.removeListener();
    this.quitMultipleSelect.removeListener();
    this.enterMoveCells.removeListener();
    this.quitMoveCells.removeListener();
    this.shiftDown.removeListener();
    this.shiftUp.removeListener();
    this.enterMoveTrack.removeListener();
    this.quiteMoveTrack.removeListener();
  }
}
