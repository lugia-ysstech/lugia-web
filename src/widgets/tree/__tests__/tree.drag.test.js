import { TreeDragController } from '../rc-tree/drag';
import Listener from '@lugia/listener';

describe('init TreeDragController', () => {
  const treeDragController1 = new TreeDragController();
  const treeDarg1 = treeDragController1.createTreeDrag();
  const current = treeDragController1.getTreeDrag(treeDarg1.uuid);
  it('TreeDrag类创建是否成功', () => {
    expect(current.uuid === treeDarg1.uuid).toBe(true);
  });
  it('treeDrag实例是否保存到treeDragController中', () => {
    expect(Object.keys(treeDragController1.treeDrags).length).toBe(1);
  });
  it('getTreeDrag方法调用是否成功', () => {
    expect(treeDragController1.getTreeDrag(current.uuid)).not.toBe(undefined);
  });
  it('destroyTreeDrag方法调用是否成功', () => {
    treeDragController1.destroyTreeDrag(current.uuid);
    expect(treeDragController1.getTreeDrag(current.uuid)).toBe(undefined);
  });
  it('createUUid方法调用是否成', () => {
    expect(Object.prototype.toString.call(treeDragController1.createUUid())).toBe(
      '[object String]'
    );
  });
});

describe('drag分组测试', () => {
  const treeDragController2 = new TreeDragController();
  const treeDarg1 = treeDragController2.createTreeDrag({ groupKey: 'group1' });
  const treeDarg2 = treeDragController2.createTreeDrag({ groupKey: 'group1' });
  it('getGroupAllData获取分组数据', () => {
    expect(treeDragController2.getGroupAllData().group1).not.toBeUndefined();
  });
  it('根据分组key建获取分组信息getGroupDataByGroupKey', () => {
    expect(treeDragController2.getGroupDataByGroupKey('group1')).not.toBeUndefined();
  });
  it('调用destroyTreeDrag销毁不存在的拖拽类。对应该关系不变', () => {
    treeDragController2.destroyTreeDrag('222222');
    expect(treeDragController2.getGroupDataByGroupKey('group1').length).toBe(2);
  });
  it('调用destroyTreeDrag销毁拖拽类。同时移除对应的分组关系', () => {
    treeDragController2.destroyTreeDrag(treeDarg1.uuid);
    expect(treeDragController2.getGroupDataByGroupKey('group1').length).toBe(1);
  });
  it('拖拽实例全部销，对应分组也应该销毁', () => {
    treeDragController2.destroyTreeDrag(treeDarg2.uuid);
    expect(treeDragController2.getGroupDataByGroupKey('group1')).toBeUndefined();
  });
});

describe('init TreeDrag', () => {
  const treeDragController3 = new TreeDragController();
  const treeDarg3 = treeDragController3.createTreeDrag();
  it('lister是否创建成功', () => {
    expect(treeDarg3.listener).toBeInstanceOf(Listener);
  });
  it('collectNodeInformation调用是否成功', () => {
    const mackData = {
      nodeName: '222',
      nodeRef: {
        getBoundingClientRect: () => {
          return { left: 10, right: 100, top: 20, bottom: 50, height: 30 };
        },
      },
      node: {},
    };
    treeDarg3.collectNodeInformation(mackData);
    expect(treeDarg3.nodesInformation['222']).not.toBeUndefined();
  });
  it('调用collectNodeInformation方法参数有问题，数据不应该保存', () => {
    const mackData = { nodeName: '333' };
    treeDarg3.collectNodeInformation(mackData);
    expect(treeDarg3.nodesInformation['333']).toBeUndefined();
  });
  it('鼠标有键按下查看状态是否改变', () => {
    treeDarg3.mouseDown({ button: 0, clientX: 40, clientY: 30 });
    expect(treeDarg3.dragStart).toBe(true);
  });
  it('鼠标有键按下，查看是否有选中节点', () => {
    treeDarg3.mouseDown({ button: 0, clientX: 40, clientY: 30 });
    expect(treeDarg3.dargNode.nodeEmitName).toBe('222');
  });
  it('deletetNodeInformation调用是否成功', () => {
    treeDarg3.deletetNodeInformation('222');
    expect(treeDarg3.nodesInformation['222']).toBeUndefined();
  });
});
