import chai from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';
import 'jest-styled-components';
import {
  getOverflowSize,
  getNewFormsSize,
  getMoveXY,
  fourLineChangeXY,
  getPosition,
  dragRange,
  getLimitPosition,
  getXY,
  dragCircle,
  getComponentSize,
} from '../function/utils';
const { expect: exp } = chai;
Enzyme.configure({ adapter: new Adapter() });
describe('default', () => {
  function testgetOverflowSize(title: string, params: Object, expValue: Object) {
    it(`utils ${title}`, () => {
      const { x, y, downX, downY } = params;
      const changeValue = getOverflowSize(x, y, downX, downY);
      expect(changeValue).toEqual(expValue);
    });
  }
  testgetOverflowSize(
    'getOverflowSize x>downX',
    { x: 100, y: 100, downX: 50, downY: 50 },
    { overflowWidth: 50, overflowHeight: 50 }
  );
  testgetOverflowSize(
    'getOverflowSize x<downX',
    { x: 50, y: 50, downX: 100, downY: 100 },
    { overflowWidth: -50, overflowHeight: -50 }
  );
  testgetOverflowSize(
    'getOverflowSize x<downX y>downY',
    { x: 50, y: 100, downX: 100, downY: 50 },
    { overflowWidth: -50, overflowHeight: 50 }
  );
  function testGetNewFormsSize(title: string, params: Object, expValue: Object) {
    it(`utils ${title}`, () => {
      const { overflowWidth, overflowHeight, oldWidth, oldHeight, direction, limitSize } = params;
      const changeValue = getNewFormsSize(
        overflowWidth,
        overflowHeight,
        oldWidth,
        oldHeight,
        direction,
        limitSize
      );
      expect(changeValue).toEqual(expValue);
    });
  }
  testGetNewFormsSize(
    'getNewFormsSize direction===top overflowHeight 正数',
    {
      overflowWidth: 0,
      overflowHeight: 10,
      oldWidth: 100,
      oldHeight: 100,
      direction: 'top',
      limitSize: { minWidth: 50, minHeight: 50, maxWidth: 1000, maxHeight: 1000 },
    },
    {
      width: 100,
      height: 90,
    }
  );
  testGetNewFormsSize(
    'getNewFormsSize direction===top overflowWidth, overflowHeight 负数',
    {
      overflowWidth: 0,
      overflowHeight: -10,
      oldWidth: 100,
      oldHeight: 100,
      direction: 'top',
      limitSize: { minWidth: 50, minHeight: 50, maxWidth: 1000, maxHeight: 1000 },
    },
    {
      width: 100,
      height: 110,
    }
  );
  testGetNewFormsSize(
    'getNewFormsSize direction===right 正数',
    {
      overflowWidth: 10,
      overflowHeight: 0,
      oldWidth: 100,
      oldHeight: 100,
      direction: 'right',
      limitSize: { minWidth: 50, minHeight: 50, maxWidth: 1000, maxHeight: 1000 },
    },
    {
      width: 110,
      height: 100,
    }
  );
  testGetNewFormsSize(
    'getNewFormsSize direction===right 负数',
    {
      overflowWidth: -10,
      overflowHeight: 0,
      oldWidth: 100,
      oldHeight: 100,
      direction: 'right',
      limitSize: { minWidth: 50, minHeight: 50, maxWidth: 1000, maxHeight: 1000 },
    },
    {
      width: 90,
      height: 100,
    }
  );
  testGetNewFormsSize(
    'getNewFormsSize direction===bottom 负数',
    {
      overflowWidth: 0,
      overflowHeight: -10,
      oldWidth: 100,
      oldHeight: 100,
      direction: 'bottom',
      limitSize: { minWidth: 50, minHeight: 50, maxWidth: 1000, maxHeight: 1000 },
    },
    {
      width: 100,
      height: 90,
    }
  );
  testGetNewFormsSize(
    'getNewFormsSize direction===bottom 正数',
    {
      overflowWidth: 0,
      overflowHeight: 10,
      oldWidth: 100,
      oldHeight: 100,
      direction: 'bottom',
      limitSize: { minWidth: 50, minHeight: 50, maxWidth: 1000, maxHeight: 1000 },
    },
    {
      width: 100,
      height: 110,
    }
  );
  testGetNewFormsSize(
    'getNewFormsSize direction===left 正数',
    {
      overflowWidth: 10,
      overflowHeight: 0,
      oldWidth: 100,
      oldHeight: 100,
      direction: 'bottom',
      limitSize: { minWidth: 50, minHeight: 50, maxWidth: 1000, maxHeight: 1000 },
    },
    {
      width: 110,
      height: 100,
    }
  );
  testGetNewFormsSize(
    'getNewFormsSize direction===left 负数',
    {
      overflowWidth: -10,
      overflowHeight: 0,
      oldWidth: 100,
      oldHeight: 100,
      direction: 'bottom',
      limitSize: { minWidth: 50, minHeight: 50, maxWidth: 1000, maxHeight: 1000 },
    },
    {
      width: 90,
      height: 100,
    }
  );
  testGetNewFormsSize(
    'getNewFormsSize direction===topPiece 正数',
    {
      overflowWidth: 10,
      overflowHeight: 10,
      oldWidth: 100,
      oldHeight: 100,
      direction: 'topPiece',
      limitSize: { minWidth: 50, minHeight: 50, maxWidth: 1000, maxHeight: 1000 },
    },
    {
      width: 90,
      height: 90,
    }
  );
  testGetNewFormsSize(
    'getNewFormsSize direction===topPiece 负数',
    {
      overflowWidth: -10,
      overflowHeight: -10,
      oldWidth: 100,
      oldHeight: 100,
      direction: 'topPiece',
      limitSize: { minWidth: 50, minHeight: 50, maxWidth: 1000, maxHeight: 1000 },
    },
    {
      width: 110,
      height: 110,
    }
  );
  testGetNewFormsSize(
    'getNewFormsSize direction===rightPiece 值变大',
    {
      overflowWidth: 10,
      overflowHeight: -10,
      oldWidth: 100,
      oldHeight: 100,
      direction: 'rightPiece',
      limitSize: { minWidth: 50, minHeight: 50, maxWidth: 1000, maxHeight: 1000 },
    },
    {
      width: 110,
      height: 110,
    }
  );
  testGetNewFormsSize(
    'getNewFormsSize direction===rightPiece 值变小',
    {
      overflowWidth: -10,
      overflowHeight: 10,
      oldWidth: 100,
      oldHeight: 100,
      direction: 'rightPiece',
      limitSize: { minWidth: 50, minHeight: 50, maxWidth: 1000, maxHeight: 1000 },
    },
    {
      width: 90,
      height: 90,
    }
  );
  testGetNewFormsSize(
    'getNewFormsSize direction===bottomPiece 正数',
    {
      overflowWidth: 10,
      overflowHeight: 10,
      oldWidth: 100,
      oldHeight: 100,
      direction: 'bottomPiece',
      limitSize: { minWidth: 50, minHeight: 50, maxWidth: 1000, maxHeight: 1000 },
    },
    {
      width: 110,
      height: 110,
    }
  );
  testGetNewFormsSize(
    'getNewFormsSize direction===bottomPiece 负数',
    {
      overflowWidth: -10,
      overflowHeight: -10,
      oldWidth: 100,
      oldHeight: 100,
      direction: 'bottomPiece',
      limitSize: { minWidth: 50, minHeight: 50, maxWidth: 1000, maxHeight: 1000 },
    },
    {
      width: 90,
      height: 90,
    }
  );
  testGetNewFormsSize(
    'getNewFormsSize direction===leftPiece 值变大',
    {
      overflowWidth: -10,
      overflowHeight: 10,
      oldWidth: 100,
      oldHeight: 100,
      direction: 'leftPiece',
      limitSize: { minWidth: 50, minHeight: 50, maxWidth: 1000, maxHeight: 1000 },
    },
    {
      width: 110,
      height: 110,
    }
  );

  function testGetMoveXY(title: string, params: Object, expValue: Object) {
    it(`utils ${title}`, () => {
      const { sourceX, sourceY, currentX, currentY } = params;
      const changeValue = getMoveXY(sourceX, sourceY, currentX, currentY);
      expect(changeValue).toEqual(expValue);
    });
  }
  testGetMoveXY(
    'getMoveXY 正数',
    { sourceX: 100, sourceY: 100, currentX: 10, currentY: 10 },
    {
      moveX: 90,
      moveY: 90,
    }
  );
  testGetMoveXY(
    'getMoveXY 负数',
    { sourceX: 100, sourceY: 100, currentX: 110, currentY: 110 },
    {
      moveX: -10,
      moveY: -10,
    }
  );
  function testFourLineChangeXY(title: string, params: Object, expValue: Object) {
    it(`utils ${title}`, () => {
      const { state, direction, sourceX, sourceY, currentX, currentY } = params;
      const changeValue = fourLineChangeXY(state, direction, sourceX, sourceY, currentX, currentY);
      expect(changeValue).toEqual(expValue);
    });
  }
  testFourLineChangeXY(
    'fourLineChangeXY topIsDown top',
    {
      state: { topIsDown: true, rightIsDown: false, bottomIsDown: false, leftIsDown: false },
      direction: 'top',
      sourceX: 100,
      sourceY: 100,
      currentX: 10,
      currentY: 10,
    },
    {
      moveX: 0,
      moveY: 90,
    }
  );
  testFourLineChangeXY(
    'fourLineChangeXY topIsDown topPiece',
    {
      state: { topIsDown: true, rightIsDown: false, bottomIsDown: false, leftIsDown: false },
      direction: 'topPiece',
      sourceX: 100,
      sourceY: 100,
      currentX: 110,
      currentY: 110,
    },
    {
      moveX: -10,
      moveY: -10,
    }
  );
  testFourLineChangeXY(
    'fourLineChangeXY rightIsDown right',
    {
      state: { topIsDown: false, rightIsDown: true, bottomIsDown: false, leftIsDown: false },
      direction: 'right',
      sourceX: 100,
      sourceY: 100,
      currentX: 110,
      currentY: 110,
    },
    {
      moveX: 0,
      moveY: 0,
    }
  );
  testFourLineChangeXY(
    'fourLineChangeXY rightIsDown rightPiece',
    {
      state: { topIsDown: false, rightIsDown: true, bottomIsDown: false, leftIsDown: false },
      direction: 'rightPiece',
      sourceX: 100,
      sourceY: 100,
      currentX: 110,
      currentY: 110,
    },
    {
      moveX: 0,
      moveY: -10,
    }
  );
  testFourLineChangeXY(
    'fourLineChangeXY rightIsDown bottom',
    {
      state: { topIsDown: false, rightIsDown: false, bottomIsDown: true, leftIsDown: false },
      direction: 'bottom',
      sourceX: 100,
      sourceY: 100,
      currentX: 110,
      currentY: 110,
    },
    {
      moveX: 0,
      moveY: 0,
    }
  );
  testFourLineChangeXY(
    'fourLineChangeXY rightIsDown bottomPiece',
    {
      state: { topIsDown: false, rightIsDown: false, bottomIsDown: true, leftIsDown: false },
      direction: 'bottomPiece',
      sourceX: 100,
      sourceY: 100,
      currentX: 110,
      currentY: 110,
    },
    {
      moveX: 0,
      moveY: 0,
    }
  );
  testFourLineChangeXY(
    'fourLineChangeXY rightIsDown left',
    {
      state: { topIsDown: false, rightIsDown: false, bottomIsDown: false, leftIsDown: true },
      direction: 'left',
      sourceX: 100,
      sourceY: 100,
      currentX: 110,
      currentY: 110,
    },
    {
      moveX: -10,
      moveY: 0,
    }
  );
  testFourLineChangeXY(
    'fourLineChangeXY rightIsDown leftPiece',
    {
      state: { topIsDown: false, rightIsDown: false, bottomIsDown: false, leftIsDown: true },
      direction: 'leftPiece',
      sourceX: 100,
      sourceY: 100,
      currentX: 110,
      currentY: 110,
    },
    {
      moveX: -10,
      moveY: 0,
    }
  );

  function testGetPosition(title: string, params: Object, expValue: Object) {
    it(`utils ${title}`, () => {
      const { moveX, moveY, x, y } = params;
      const changeValue = getPosition(moveX, moveY, x, y);
      expect(changeValue).toEqual(expValue);
    });
  }
  testGetPosition('getPosition', { moveX: 10, moveY: 10, x: 100, y: 100 }, { x: 90, y: 90 });
  testGetPosition('getPosition', { moveX: 100, moveY: 100, x: 10, y: 10 }, { x: -90, y: -90 });

  function testDragRange(title: string, params: Object, expValue: Object) {
    it(`utils ${title}`, () => {
      const { clientX, clientY, isDrag, lockTop, windowWidth, windowHeight } = params;
      const changeValue = dragRange(
        { clientX, clientY },
        isDrag,
        lockTop,
        windowWidth,
        windowHeight
      );
      expect(changeValue).toEqual(expValue);
    });
  }
  testDragRange(
    'dragRange',
    {
      clientX: 100,
      clientY: 100,
      isDrag: false,
      lockTop: 0,
      windowWidth: 1000,
      windowHeight: 800,
    },
    {
      currentX: 100,
      currentY: 100,
      lockDirection: '',
    }
  );
  testDragRange(
    'dragRange right',
    {
      clientX: 1001,
      clientY: 100,
      isDrag: true,
      lockTop: 0,
      windowWidth: 1000,
      windowHeight: 800,
    },
    {
      currentX: 1000,
      currentY: 100,
      lockDirection: 'right',
    }
  );
  testDragRange(
    'dragRange right',
    {
      clientX: -1,
      clientY: 100,
      isDrag: true,
      lockTop: 0,
      windowWidth: 1000,
      windowHeight: 800,
    },
    {
      currentX: 0,
      currentY: 100,
      lockDirection: 'left',
    }
  );
  function testGetLimitPosition(title: string, params: Object, expValue: Object) {
    it(`utils ${title}`, () => {
      const { state, direction, minWidth, minHeight, maxWidth, maxHeight } = params;
      const changeValue = getLimitPosition(
        state,
        direction,
        minWidth,
        minHeight,
        maxWidth,
        maxHeight
      );
      expect(changeValue).toEqual(expValue);
    });
  }
  testGetLimitPosition(
    'testGetLimitPosition top',
    {
      state: {
        topIsDown: true,
        rightIsDown: false,
        bottomIsDown: false,
        leftIsDown: false,
        width: 100,
        height: 100,
        x: 100,
        y: 100,
      },
      direction: 'top',
      minWidth: 50,
      minHeight: 50,
      maxWidth: 1000,
      maxHeight: 800,
    },
    {
      limitY: { maxLimitY: -600, minlimitY: 150 },
      limitX: { maxLimitX: 100, minlimitX: 100 },
    }
  );
  testGetLimitPosition(
    'testGetLimitPosition topPiece',
    {
      state: {
        topIsDown: true,
        rightIsDown: false,
        bottomIsDown: false,
        leftIsDown: false,
        width: 100,
        height: 100,
        x: 100,
        y: 100,
      },
      direction: 'topPiece',
      minWidth: 50,
      minHeight: 50,
      maxWidth: 1000,
      maxHeight: 800,
    },
    {
      limitY: { maxLimitY: -600, minlimitY: 150 },
      limitX: { maxLimitX: -800, minlimitX: 150 },
    }
  );
  testGetLimitPosition(
    'testGetLimitPosition right',
    {
      state: {
        topIsDown: false,
        rightIsDown: true,
        bottomIsDown: false,
        leftIsDown: false,
        width: 100,
        height: 100,
        x: 100,
        y: 100,
      },
      direction: 'right',
      minWidth: 50,
      minHeight: 50,
      maxWidth: 1000,
      maxHeight: 800,
    },
    {
      limitY: { maxLimitY: 100, minlimitY: 100 },
      limitX: { maxLimitX: 1100, minlimitX: 150 },
    }
  );
  testGetLimitPosition(
    'testGetLimitPosition rightPiece',
    {
      state: {
        topIsDown: false,
        rightIsDown: true,
        bottomIsDown: false,
        leftIsDown: false,
        width: 100,
        height: 100,
        x: 100,
        y: 100,
      },
      direction: 'rightPiece',
      minWidth: 50,
      minHeight: 50,
      maxWidth: 1000,
      maxHeight: 800,
    },
    {
      limitY: { maxLimitY: -600, minlimitY: 150 },
      limitX: { maxLimitX: 1100, minlimitX: 150 },
    }
  );
  testGetLimitPosition(
    'testGetLimitPosition bottom',
    {
      state: {
        topIsDown: false,
        rightIsDown: false,
        bottomIsDown: true,
        leftIsDown: false,
        width: 100,
        height: 100,
        x: 100,
        y: 100,
      },
      direction: 'bottom',
      minWidth: 50,
      minHeight: 50,
      maxWidth: 1000,
      maxHeight: 800,
    },
    {
      limitY: { maxLimitY: 900, minlimitY: 150 },
      limitX: { maxLimitX: 100, minlimitX: 100 },
    }
  );
  testGetLimitPosition(
    'testGetLimitPosition bottomPiece',
    {
      state: {
        topIsDown: false,
        rightIsDown: false,
        bottomIsDown: true,
        leftIsDown: false,
        width: 100,
        height: 100,
        x: 100,
        y: 100,
      },
      direction: 'bottomPiece',
      minWidth: 50,
      minHeight: 50,
      maxWidth: 1000,
      maxHeight: 800,
    },
    {
      limitY: { maxLimitY: 900, minlimitY: 150 },
      limitX: { maxLimitX: 100, minlimitX: 100 },
    }
  );
  testGetLimitPosition(
    'testGetLimitPosition left',
    {
      state: {
        topIsDown: false,
        rightIsDown: false,
        bottomIsDown: false,
        leftIsDown: true,
        width: 100,
        height: 100,
        x: 100,
        y: 100,
      },
      direction: 'left',
      minWidth: 50,
      minHeight: 50,
      maxWidth: 1000,
      maxHeight: 800,
    },
    {
      limitY: { maxLimitY: 900, minlimitY: 150 },
      limitX: { maxLimitX: -800, minlimitX: 150 },
    }
  );
  testGetLimitPosition(
    'testGetLimitPosition leftPiece',
    {
      state: {
        topIsDown: false,
        rightIsDown: false,
        bottomIsDown: false,
        leftIsDown: true,
        width: 100,
        height: 100,
        x: 100,
        y: 100,
      },
      direction: 'leftPiece',
      minWidth: 50,
      minHeight: 50,
      maxWidth: 1000,
      maxHeight: 800,
    },
    {
      limitY: { maxLimitY: 900, minlimitY: 150 },
      limitX: { maxLimitX: -800, minlimitX: 150 },
    }
  );

  function testGetXY(title: string, params: Object, expValue: Object) {
    it(`utils ${title}`, () => {
      const { state, direction, limitX, limitY, clientX, clientY } = params;
      const changeValue = getXY(state, direction, limitX, limitY, clientX, clientY);
      expect(changeValue).toEqual(expValue);
    });
  }
  testGetXY(
    'testGetXY',
    {
      state: {
        topIsDown: false,
        rightIsDown: false,
        bottomIsDown: false,
        leftIsDown: false,
        maxX: 1000,
        maxY: 800,
      },
      direction: '',
      limitX: { maxLimitX: 500, minlimitX: 100 },
      limitY: { maxLimitY: 500, minlimitY: 100 },
      clientX: 200,
      clientY: 200,
    },
    {
      x: 200,
      y: 200,
    }
  );
  testGetXY(
    'testGetXY top',
    {
      state: {
        topIsDown: true,
        rightIsDown: false,
        bottomIsDown: false,
        leftIsDown: false,
        maxX: 1000,
        maxY: 800,
      },
      direction: 'top',
      limitX: { maxLimitX: 500, minlimitX: 100 },
      limitY: { maxLimitY: 500, minlimitY: 100 },
      clientX: 200,
      clientY: 200,
    },
    {
      x: 200,
      y: 500,
    }
  );
  testGetXY(
    'testGetXY topPiece',
    {
      state: {
        topIsDown: true,
        rightIsDown: false,
        bottomIsDown: false,
        leftIsDown: false,
        maxX: 1000,
        maxY: 800,
      },
      direction: 'topPiece',
      limitX: { maxLimitX: 500, minlimitX: 100 },
      limitY: { maxLimitY: 500, minlimitY: 100 },
      clientX: 200,
      clientY: 200,
    },
    {
      x: 500,
      y: 500,
    }
  );
  testGetXY(
    'testGetXY bottom',
    {
      state: {
        topIsDown: false,
        rightIsDown: false,
        bottomIsDown: true,
        leftIsDown: false,
        maxX: 1000,
        maxY: 800,
      },
      direction: 'bottom',
      limitX: { maxLimitX: 500, minlimitX: 100 },
      limitY: { maxLimitY: 500, minlimitY: 100 },
      clientX: 200,
      clientY: 200,
    },
    {
      x: 200,
      y: 200,
    }
  );
  testGetXY(
    'testGetXY bottomPiece',
    {
      state: {
        topIsDown: false,
        rightIsDown: false,
        bottomIsDown: true,
        leftIsDown: false,
        maxX: 1000,
        maxY: 800,
      },
      direction: 'bottomPiece',
      limitX: { maxLimitX: 500, minlimitX: 100 },
      limitY: { maxLimitY: 500, minlimitY: 100 },
      clientX: 200,
      clientY: 200,
    },
    {
      x: 200,
      y: 200,
    }
  );
  testGetXY(
    'testGetXY left',
    {
      state: {
        topIsDown: false,
        rightIsDown: false,
        bottomIsDown: false,
        leftIsDown: true,
        maxX: 1000,
        maxY: 800,
      },
      direction: 'left',
      limitX: { maxLimitX: 500, minlimitX: 100 },
      limitY: { maxLimitY: 500, minlimitY: 100 },
      clientX: 200,
      clientY: 200,
    },
    {
      x: 500,
      y: 200,
    }
  );
  testGetXY(
    'testGetXY leftPiece',
    {
      state: {
        topIsDown: false,
        rightIsDown: false,
        bottomIsDown: false,
        leftIsDown: true,
        maxX: 1000,
        maxY: 800,
      },
      direction: 'leftPiece',
      limitX: { maxLimitX: 500, minlimitX: 100 },
      limitY: { maxLimitY: 500, minlimitY: 100 },
      clientX: 200,
      clientY: 200,
    },
    {
      x: 500,
      y: 200,
    }
  );
  testGetXY(
    'testGetXY right',
    {
      state: {
        topIsDown: false,
        rightIsDown: true,
        bottomIsDown: false,
        leftIsDown: false,
        maxX: 1000,
        maxY: 800,
      },
      direction: 'right',
      limitX: { maxLimitX: 500, minlimitX: 100 },
      limitY: { maxLimitY: 500, minlimitY: 100 },
      clientX: 1001,
      clientY: 200,
    },
    {
      x: 1000,
      y: 200,
    }
  );

  function testDragCircle(title: string, params: Object, expValue: Object) {
    it(`utils ${title}`, () => {
      const changeValue = dragCircle({ ...params });
      expect(changeValue).toEqual(expValue);
    });
  }
  testDragCircle(
    'testDragCircle right',
    {
      x: 100,
      maxX: 200,
      isFloat: true,
    },
    {
      left: '',
      right: 'right:1px',
      x: 150,
    }
  );
  testDragCircle(
    'testDragCircle left',
    {
      x: 90,
      maxX: 200,
      isFloat: true,
    },
    {
      left: 'left:1px',
      right: '',
      x: 1,
    }
  );
  testDragCircle(
    'testDragCircle !float',
    {
      x: 90,
      maxX: 200,
      isFloat: false,
    },
    {
      left: '',
      right: '',
      x: 90,
    }
  );
  testDragCircle(
    'testDragCircle !float left ',
    {
      x: 90,
      maxX: 200,
      isFloat: false,
      direction: 'left',
    },
    {
      left: 'left:0px',
      right: '',
      x: 0,
    }
  );
  testDragCircle(
    'testDragCircle !float right ',
    {
      x: 90,
      maxX: 200,
      isFloat: false,
      direction: 'right',
      width: 100,
    },
    {
      left: '',
      right: 'right:0px',
      x: 100,
    }
  );
  function testGetComponentSize(title: string, params: Object, expValue: Object) {
    it(`utils ${title}`, () => {
      const { width, height, minWidth, minHeight, maxWidth, maxHeight, canScale } = params;
      const changeValue = getComponentSize(
        width,
        height,
        minWidth,
        minHeight,
        maxWidth,
        maxHeight,
        canScale
      );
      expect(changeValue).toEqual(expValue);
    });
  }
  testGetComponentSize(
    'testGetComponentSize',
    {
      width: '',
      height: '',
      minWidth: 50,
      minHeight: 50,
      maxWidth: 500,
      maxHeight: 500,
      canScale: false,
    },
    { newWidth: 'auto', newHeight: 'auto' }
  );
  testGetComponentSize(
    'testGetComponentSize',
    {
      width: 100,
      height: 100,
      minWidth: 50,
      minHeight: 50,
      maxWidth: 500,
      maxHeight: 500,
      canScale: false,
    },
    { newWidth: 100, newHeight: 100 }
  );
  testGetComponentSize(
    'testGetComponentSize',
    {
      width: 100,
      height: 100,
      minWidth: 50,
      minHeight: 50,
      maxWidth: 500,
      maxHeight: 500,
      canScale: true,
    },
    { newWidth: 100, newHeight: 100 }
  );
});
