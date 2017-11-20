//@flow
import React from 'react';
import chai from 'chai';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import VisibleBox from '../../common/VisibleBox';
import MaskBox from '../../common/MaskBox';
import ContentBox from '../ContentBox';
import Enzyme, { mount, } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

const { expect: exp, } = chai;
Enzyme.configure({ adapter: new Adapter(), });

describe('ContentBox', () => {

  it('default children:onlyOne', () => {
    const onlySpan = renderer.create(<span>a</span>).toJSON();
    const contentBox = renderer.create(<ContentBox><span>a</span></ContentBox>).toJSON();
    expect(contentBox).toMatchObject(onlySpan);
    expect(contentBox).toMatchSnapshot();
  });

  it('default children: more', () => {
    const visibleBox = renderer.create(<VisibleBox><span>a</span><span>b</span></VisibleBox>).toJSON();
    const contentBox = renderer.create(<ContentBox><span>a</span><span>b</span></ContentBox>).toJSON();
    expect(contentBox).toMatchObject(visibleBox);
    expect(contentBox).toMatchSnapshot();
  });

  it('mask: false, visible: false, children: only one', () => {
    const onlySpan = renderer.create(<span>a</span>).toJSON();
    const contentBox = renderer.create(<ContentBox visible={false}><span>a</span></ContentBox>).toJSON();
    expect(contentBox).toMatchObject(onlySpan);
    expect(contentBox).toMatchSnapshot();

  });

  it('mask: true, visible: true, children: only one', () => {
    const maskBox = renderer.create(<MaskBox visible><span>a</span></MaskBox>).toJSON();
    const contentBox = renderer.create(<ContentBox visible isMask><span>a</span></ContentBox>).toJSON();
    expect(contentBox).toMatchObject(maskBox);
    expect(contentBox).toMatchSnapshot();

  });

  it('mask: false, children: more, visible: false', () => {
    const visibleBox = renderer.create(<VisibleBox visible={false}><span>a</span><span>b</span></VisibleBox>).toJSON();
    const contentBox = renderer.create(<ContentBox visible={false}><span>a</span><span>b</span></ContentBox>).toJSON();
    expect(contentBox).toMatchSnapshot();
    expect(contentBox).toMatchObject(visibleBox);
    expect(contentBox).toHaveStyleRule('display', 'none');
  });
  it('mask: true, children: more, visible: false', () => {
    const maskBox = renderer.create(<MaskBox visible={false}><span>a</span><span>b</span></MaskBox>).toJSON();
    const contentBox = renderer.create(<ContentBox isMask
                                                   visible={false}><span>a</span><span>b</span></ContentBox>).toJSON();
    expect(contentBox).toMatchSnapshot();
    expect(contentBox).toMatchObject(maskBox);
    expect(contentBox).toHaveStyleRule('display', 'none');
  });

  it('mask: true children: more', () => {
    const visibleBox = renderer.create(<VisibleBox visible={false}><span>a</span><span>b</span></VisibleBox>).toJSON();
    const contentBox = renderer.create(<ContentBox visible={false}><span>a</span><span>b</span></ContentBox>).toJSON();
    expect(contentBox).toMatchSnapshot();
    expect(contentBox).toMatchObject(visibleBox);
    expect(contentBox).toHaveStyleRule('display', 'none');
  });

  it('children变化时组件要更新视图', () => {

    const txt = '我心';
    const cmp = mount(<ContentBox>
      <div>{txt}</div>
    </ContentBox>);
    exp(cmp.text()).to.be.equal(txt);
    const textTwo = '全中国';
    cmp.setProps({ children: <div>{textTwo}</div>, });
    exp(cmp.text()).to.be.equal(textTwo);

  });
});
