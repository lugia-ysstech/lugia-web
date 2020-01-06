import { treeDragController } from '../rc-tree/drag';
import Listener from '@lugia/listener';

// describe('init TreeDragController', () => {
//   const treeDarg = treeDragController.createTreeDrag();
//   const current = treeDragController.getTreeDrag(treeDarg.uuid);
//   it('TreeDrag类创建是否成功', () => {
//     expect(current.uuid === treeDarg.uuid).toBe(true);
//   });
//   it('treeDrag实例是否保存到treeDragController中', () => {
//     expect(Object.keys(treeDragController.treeDrags).length).toBe(1);
//   });
//   it('getTreeDrag方法调用是否成功', () => {
//     expect(treeDragController.getTreeDrag(current.uuid)).not.toBe(undefined);
//   });
//   it('destroyTreeDrag方法调用是否成功', () => {
//     treeDragController.destroyTreeDrag(current.uuid);
//     expect(treeDragController.getTreeDrag(current.uuid)).toBe(undefined);
//   });
//   it('createUUid方法调用是否成', () => {
//     expect(Object.prototype.toString.call(treeDragController.createUUid())).toBe('[object String]');
//   });
// });

describe('init TreeDrag', () => {
  const treeDarg = treeDragController.createTreeDrag();
  it('lister是否创建成功', () => {
    expect(treeDarg.listener).toBeInstanceOf(Listener);
  });
  it('collectNodeInformation调用是否成功', () => {
    const mackData = { nodeName: '222', nodeRef: {}, node: {} };
    treeDarg.collectNodeInformation(mackData);
    expect(treeDarg.nodesInformation['222']).not.toBeUndefined();
  });
  it('调用collectNodeInformation方法参数有问题，数据不应该保存', () => {
    const mackData = { nodeName: '333' };
    treeDarg.collectNodeInformation(mackData);
    expect(treeDarg.nodesInformation['333']).toBeUndefined();
  });
  it('deltetNodeInformation调用是否成功', () => {
    treeDarg.deltetNodeInformation('222');
    expect(treeDarg.nodesInformation['222']).toBeUndefined();
  });
  it('22222', () => {
    treeDarg.mouseDown({ button: 1 });
    expect(treeDarg.dragStart).toBe(true);
  });
});
