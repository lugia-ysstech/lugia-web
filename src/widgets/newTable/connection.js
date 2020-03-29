//@flow
import Listener from '@lugia/listener';

export default class KeyBoardEventListener extends Listener<any> {
  editing: boolean;
  multipleSelect: boolean;
  canMoveCells: boolean;
  isShift: boolean;
  isKeyBoardDown: boolean;
  moveTrack: Array;

  constructor() {
    super();
    this.editing = false;
    this.multipleSelect = false;
    this.canMoveCells = false;
    this.isShift = false;
    this.isKeyBoardDown = false;
    this.moveTrack = [];

    this.on('keyDown', this.onKeyDown);

    this.on('enterMultipleSelect', () => {
      this.multipleSelect = true;
    });
    this.on('quitMultipleSelect', () => {
      this.multipleSelect = false;
    });
    this.on('enterMoveCells', () => {
      this.canMoveCells = true;
    });
    this.on('quitMoveCells', () => {
      this.canMoveCells = false;
    });
    this.on('shiftDown', () => {
      this.isShift = true;
    });
    this.on('shiftUp', () => {
      this.isShift = false;
    });
    this.on('enterMoveTrack', (currentCell: Object) => {
      this.moveTrack = this.moveTrack.concat([currentCell]);
    });

    this.on('quiteMoveTrack', () => {
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
}
