//@flow
import React from 'react';
import InputTag, { _InputTag_, } from '../';
import chai from 'chai';
import 'jest-styled-components';
import Enzyme, { mount, } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Theme from '../../theme';
import { delay, } from 'sv-test-utils';
import * as Widgets from '../../consts/Widget';

const { mockFunction, mockObject, VerifyOrder, VerifyOrderConfig, } = require('vx-mock');

Enzyme.configure({ adapter: new Adapter(), });

const { expect: exp, } = chai;

describe('InputTag', () => {
  const displayValue = '常,乐,我,净';
  const value = '1,2,3';

  function createInputTagTest (props: Object) {

    return class  extends React.Component<any, any> {
      inputtag: any;

      render () {
        return <Theme config={{ [Widgets.InputTag]: { width: 300, }, }} {...this.props}>
          <InputTag {...props}
                    ref={cmp => this.inputtag = cmp}
          /></Theme>;
      }
    };
  }

  const InputTagTest = createInputTagTest({ displayValue, value, });
  createItemsTest(InputTagTest, '[value & displayValue]');

  createItemsTest(createInputTagTest({
    defaultValue: value,
    defaultDisplayValue: displayValue,
  }), '[defaultValue & defaultDisplayValue]');

  createItemsTest(createInputTagTest({
    value,
    displayValue,
    defaultValue: 'hello',
    defaultDisplayValue: 'world',
  }), '[值与默认值同时存在时，以值为准]');

  // 创建组件渲染的测试用例
  function createItemsTest (InputTagTest: Object, caseTitle: string) {

    it('展现值&实际值 宽度够容纳所有的3个结点 ' + caseTitle, async () => {
      await renderInputTag(InputTagTest, 5, cmp => {

        const tagItems = findInputItem(cmp);
        exp(tagItems.length).to.be.equal(4);
        exp(tagItems.at(1).text()).to.be.equal('常');
        exp(tagItems.at(2).text()).to.be.equal('乐');
        exp(tagItems.at(3).text()).to.be.equal('我');
        exp(findFontItem(cmp).at(0).getDOMNode() == tagItems.at(0).getDOMNode()).to.be.true;
        exp(findFontItem(cmp).length).to.be.equal(1);
      });
    });

    it('展现值&实际值 3个一个结点也容不下' + caseTitle, async () => {
      await renderInputTag(InputTagTest, 1000, cmp => {

        const tagItems = findInputItem(cmp);
        exp(tagItems.length).to.be.equal(2);
        exp(findFontItem(cmp).length).to.be.equal(1);
        exp(findFontItem(cmp).at(0).getDOMNode() == tagItems.at(0).getDOMNode()).to.be.true;
        exp(findMoreItem(cmp).length).to.be.equal(1);
        exp(findMoreItem(cmp).at(0).getDOMNode() == tagItems.at(1).getDOMNode()).to.be.true;
      });

    });
    it('展现值&实际值 3个只能容纳一个' + caseTitle, async () => {
      let i = 0;
      const val = [ 5, 1000, 1000, ];
      const getFontWidth = () => {
        return val[ i++ ];
      };

      await renderInputTag(InputTagTest, getFontWidth, cmp => {

        const tagItems = findInputItem(cmp);
        exp(tagItems.length).to.be.equal(3);
        exp(findFontItem(cmp).length).to.be.equal(1);
        exp(findMoreItem(cmp).length).to.be.equal(1);
        exp(findFontItem(cmp).at(0).getDOMNode() == tagItems.at(0).getDOMNode()).to.be.true;
        exp(tagItems.at(1).text()).to.be.equal('常');
        exp(findMoreItem(cmp).at(0).getDOMNode() == tagItems.at(2).getDOMNode()).to.be.true;
      });

    });
  }


  it('完全显示3个 , 点击第一个的删除图标 onChange事件 非受限组件 default', async () => {
    let InputTagTest;
    const onChangePromise = new Promise(resolve => {
      const onChange = (v: Object) => {
        resolve(v);
      };
      InputTagTest = createInputTagTest({ defaultDisplayValue: displayValue, defaultValue: value, onChange, });
    });
    const result = new Promise(async resolve => {

      await renderInputTag(InputTagTest, 1, async cmp => {
        cmp.find(Widgets.InputTagCloseButton).find('span').at(1).simulate('click');
        await delay(0, () => {
          
          cmp.update();
          const tagItems = findInputItem(cmp);

          exp(tagItems.length).to.be.equal(3);
          exp(tagItems.at(1).text()).to.be.equal('乐');
          exp(tagItems.at(2).text()).to.be.equal('我');
          exp(findFontItem(cmp).at(0).getDOMNode() == tagItems.at(0).getDOMNode()).to.be.true;
          exp(findFontItem(cmp).length).to.be.equal(1);
          resolve(true);
        });
      });
    });
    await  result;
    exp(await onChangePromise).to.be.eql({ value: '2,3'.split(','), displayValue: '乐,我'.split(','), });
  });
  it('完全显示3个 , 点击第一个的删除图标 onChange事件改变值', async () => {
    let InputTagTest;
    const onChangePromise = new Promise(resolve => {

      InputTagTest = class  extends React.Component<any, any> {
        inputtag: any;
        state: Object;

        constructor (props) {
          super(props);
          this.state = {
            value,
            displayValue,
          };
        }

        onChange = (v: Object) => {
          const { value, displayValue, } = v;
          this.setState({
            value: value.join(','),
            displayValue: displayValue.join(','),
          });
          resolve(v);
        };

        render () {
          const { value, displayValue, } = this.state;
          return <Theme config={{ [Widgets.InputTag]: { width: 300, }, }}>
            <InputTag
              onChange={this.onChange}
              value={value}
              displayValue={displayValue}
              ref={cmp => this.inputtag = cmp}
            /></Theme>;
        }
      };
    });

    const result = new Promise(async resolve => {

      await renderInputTag(InputTagTest, 1, async cmp => {
        cmp.find(Widgets.InputTagCloseButton).find('span').at(1).simulate('click');
        await delay(0, async () => {
          
          cmp.update();
          await delay(0, () => {
            
            cmp.update();

            const tagItems = findInputItem(cmp);
            exp(tagItems.length).to.be.equal(3);
            exp(tagItems.at(1).text()).to.be.equal('乐');
            exp(tagItems.at(2).text()).to.be.equal('我');
            exp(findFontItem(cmp).at(0).getDOMNode() == tagItems.at(0).getDOMNode()).to.be.true;
            exp(findFontItem(cmp).length).to.be.equal(1);
            resolve(true);
          });
        });
        return true;
      });
    });
    await  result;
    exp(await onChangePromise).to.be.eql({ value: '2,3'.split(','), displayValue: '乐,我'.split(','), });
  });


  it('完全显示3个 , 点击第一个的删除图标 onChange事件 受限组件 不能改变', async () => {
    let InputTagTest;
    const onChangePromise = new Promise(resolve => {
      const onChange = (v: Object) => {
        resolve(v);
      };
      InputTagTest = createInputTagTest({ displayValue, value, onChange, });
    });
    const result = new Promise(async resolve => {

      await renderInputTag(InputTagTest, 1, async cmp => {
        cmp.find(Widgets.InputTagCloseButton).find('span').at(1).simulate('click');
        await delay(0, () => {
          
          cmp.update();

          const tagItems = findInputItem(cmp);
          exp(tagItems.length).to.be.equal(4);
          exp(tagItems.at(1).text()).to.be.equal('常');
          exp(tagItems.at(2).text()).to.be.equal('乐');
          exp(tagItems.at(3).text()).to.be.equal('我');
          exp(findFontItem(cmp).at(0).getDOMNode() == tagItems.at(0).getDOMNode()).to.be.true;
          exp(findFontItem(cmp).length).to.be.equal(1);
          resolve(true);
        });
      });
    });
    await  result;
    exp(await onChangePromise).to.be.eql({ value: '2,3'.split(','), displayValue: '乐,我'.split(','), });
  });

  it('点击更多按钮 点击删除', async () => {
    let InputTagTest;
    const onChangePromise = new Promise(resolve => {
      const onChange = (v: Object) => {
        resolve(v);
      };
      InputTagTest = createInputTagTest({ defaultDisplayValue: displayValue, defaultValue: value, onChange, });
    });
    const result = new Promise(async resolve => {

      await renderInputTag(InputTagTest, 5000, async cmp => {
        const tagItems = findInputItem(cmp);
        exp(tagItems.length).to.be.equal(2);
        const moreItem = findMoreItem(cmp);
        moreItem.simulate('click');
        await delay(0, async () => {
          
          cmp.update();
          exp(cmp.find(Widgets.DropMenu).length).to.be.equal(1);
          exp(cmp.find(Widgets.MenuItem).length).to.be.equal(3);
          exp(cmp.find(Widgets.Icon).length).to.be.equal(4);
          cmp.find(Widgets.Icon).at(1).simulate('click');
          await delay(0, async () => {
            
            cmp.update();
            await delay(0, async () => {
              cmp.update();
              const menuItem = cmp.find(Widgets.MenuItem);
              exp(menuItem.length).to.be.equal(2);
              exp(menuItem.at(0).text().trim()).to.be.equal('乐');
              exp(menuItem.at(1).text().trim()).to.be.equal('我');
              resolve(true);
            });
          });
        });
      });
    });
    await  result;
    exp(await onChangePromise).to.be.eql({ value: '2,3'.split(','), displayValue: '乐,我'.split(','), });
  });

  function findFontItem (cmp) {
    return cmp.find(Widgets.FontItem);
  }

  function findMoreItem (cmp) {
    return cmp.find(Widgets.MoreInputTagItem);
  }

  function findInputItem (cmp) {
    return cmp.find(Widgets.InputTagItem);
  }


  async function renderInputTag (InputTagTest: Object, fontWidth: number | Function, callback: Function) {
    const mockInputTagPrototye = mockObject.create(_InputTag_.prototype);
    const funcMock = mockInputTagPrototye.mockFunction('getFontWidth');
    if (typeof fontWidth === 'function') {
      funcMock.mock(fontWidth);
    } else {
      funcMock.forever(fontWidth);
    }
    const cmp = mount(<InputTagTest/>);
    await delay(0, async () => {
      
      cmp.update();
      await callback(cmp);
    });
    mockInputTagPrototye.resetAll();
  }

})
;
