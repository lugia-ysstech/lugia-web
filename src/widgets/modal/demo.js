/**
 *
 * create by guorg
 *
 * @flow
 */
import * as React from 'react';
import { getBorder, getBoxShadow } from '@lugia/theme-utils';
import Modal from './index';
import Button from '../button';
import Select from '../select';
import Theme from '../theme';
import Widgets from '../consts';
import { getBorderRadius } from '../theme/CSSProvider';

const Text = (props: Object) => {
  return <div>{props.text}</div>;
};
const data = (function(t) {
  const res = [];
  for (let i = 0; i < t; i++) {
    res.push({ value: `key-${i}`, label: `txt${i}` });
  }
  return res;
})(10);
class ModalBox extends React.Component<any, any> {
  constructor() {
    super();
    this.state = {
      visable: false,
    };
  }

  click = () => {
    this.setState({
      visable: true,
    });
  };

  buttonClick = () => {
    this.setState({
      visable: false,
    });
  };

  render() {
    const { visable } = this.state;
    return (
      <div style={{ position: 'absolute', bottom: '30px', right: '30px' }}>
        <Button onClick={this.click}>弹出</Button>
        <Modal
          visible={visable}
          title="另一个对话框！"
          onOk={this.buttonClick}
          onCancel={this.buttonClick}
        >
          <div style={{ width: '100px', height: '300px' }}>我也是一个对话框</div>
        </Modal>
      </div>
    );
  }
}

export default class ModalDemo extends React.Component<any, any> {
  constructor() {
    super();
    this.state = {
      visable1: false,
      visable2: false,
      visable3: false,
      visable4: false,
      visable5: false,
      visable6: false,
      visable7: false,
      visable8: false,
      buttonValue: 'testValue',
    };
  }

  Click = (cur: number) => () => {
    this.setState({
      ['visable' + cur]: true,
    });
  };
  buttonClick = (cur: number) => () => {
    this.setState({
      ['visable' + cur]: false,
    });
  };
  loadingClick = (cur: number) => () => {
    this.setState({
      confirmLoading: true,
    });
    setTimeout(() => {
      this.setState({
        ['visable' + cur]: false,
      });
    }, 2000);
  };
  handleTestButtonClick = () => {
    const { buttonValue } = this.state;
    const newValue = buttonValue === 'testValue' ? 'anotherTestValue' : 'testValue';
    this.setState({
      buttonValue: newValue,
    });
  };

  render() {
    const {
      visable1,
      visable2,
      visable3,
      visable4,
      visable5,
      visable6,
      visable7,
      visable8,
      confirmLoading,
      buttonValue,
    } = this.state;
    const view = {
      [Widgets.Modal]: {
        Container: {
          normal: {
            width: 800,
            height: 500,
            border: getBorder({ color: '#4d63ff', width: 1, style: 'solid' }),
            borderRadius: getBorderRadius(50),
            opacity: 0.8,
            boxShadow: getBoxShadow('1px 2px 2px 2px #e8e8e8'),
            background: { color: 'orange' },
            padding: {
              top: 30,
              right: 30,
              bottom: 30,
              left: 50,
            },
          },
        },
        ModalTitle: {
          normal: {
            color: 'green',
            font: { size: 18, weight: 500 },
            padding: {
              top: 30,
              right: 30,
              bottom: 30,
              left: 0,
            },
          },
        },
        ModalContentText: {
          normal: {
            color: 'green',
            font: { size: 18, weight: 500 },
            padding: {
              top: 30,
              right: 30,
              bottom: 30,
              left: 0,
            },
          },
        },
        ModalCloseIcon: {
          normal: {
            color: 'green',
            fontSize: 18,
          },
        },
        ModalMask: {
          normal: {
            background: {
              color: 'green',
            },
          },
        },
        ModalOkButton: {
          Container: {
            normal: {
              width: 200,
            },
          },
        },
        ModalCancelButton: {
          Container: {
            normal: {
              width: 100,
              background: {
                color: 'red',
              },
            },
          },
        },
      },
    };
    return (
      <div>
        <Button onClick={this.Click(7)}>Theme Modal</Button>
        <Theme config={view}>
          <Modal
            visible={visable7}
            title="这是标题！"
            onOk={this.buttonClick(7)}
            onCancel={this.buttonClick(7)}
          >
            这是内容！
          </Modal>
        </Theme>
        <br />
        <br />
        <Button onClick={this.Click(4)}>Modal</Button>
        <Modal
          injectProps={{ type: 'Modal' }}
          visible={visable4}
          title="这是标题！"
          onOk={this.buttonClick(4)}
          onCancel={this.buttonClick(4)}
          okButtonProps={{ type: 'success' }}
          cancelButtonProps={{ type: 'danger' }}
          closable={true}
          zIndex={99999}
        >
          这是内容！
        </Modal>
        <br />
        <br />
        <Button onClick={this.Click(1)}>Modal</Button>
        <Modal
          visible={visable1}
          title="这是标题！"
          onOk={this.buttonClick(1)}
          onCancel={this.buttonClick(1)}
        >
          <ModalBox />
        </Modal>
        <br />
        <br />
        <Button onClick={this.Click(2)}>异步关闭</Button>
        <Modal
          visible={visable2}
          confirmLoading={confirmLoading}
          onOk={this.loadingClick(2)}
          onCancel={this.buttonClick(2)}
          title="这是标题！"
        >
          这是内容！
        </Modal>
        <br />
        <br />
        <Button onClick={this.Click(3)}>自定义页脚</Button>
        <Modal
          visible={visable3}
          footer={[
            <div style={{ marginTop: '15px' }}>
              <Button type="primary" onClick={this.buttonClick(3)}>
                自定义页脚
              </Button>
            </div>,
          ]}
          onCancel={this.buttonClick(3)}
          title="这是标题！"
        >
          这是内容！
        </Modal>
        <br />
        <br />
        <Button
          onClick={() =>
            Modal.confirm({
              title: 'confirm',
              content: 'this confirm text!',
              onOk: () => console.log('ok'),
              onCancel: () => console.log('onCancel'),
              okButtonProps: {
                type: 'success',
              },
              iconClass: 'lugia-icon-direction_arrow_right',
            })
          }
        >
          confirm
        </Button>
        <br />
        <br />
        <Button onClick={() => Modal.info({ title: 'info', content: 'this info text!' })}>
          info
        </Button>
        <br />
        <br />
        <Button onClick={() => Modal.success({ title: 'success', content: 'this success text!' })}>
          success
        </Button>
        <br />
        <br />
        <Button onClick={() => Modal.error({ title: 'error', content: 'this error text!' })}>
          error
        </Button>
        <br />
        <br />
        <Button onClick={() => Modal.createShowModal({ title: 'warning', component: Text })()}>
          warning
        </Button>

        <Button
          onClick={() =>
            Modal.createShowModal({ title: 'warning', component: Text, footer: false })({
              text: 'hello world',
            })
          }
        >
          createModal
        </Button>
        <Select
          canSearch
          canClear={false}
          displayField={'label'}
          data={data}
          onTrigger={this.Click(4)}
        />

        <br />
        <br />
        <Button onClick={this.Click(8)}>挂载在body上</Button>
        <Modal
          visible={visable8}
          title="这是标题！"
          onOk={this.buttonClick(8)}
          onCancel={this.buttonClick(8)}
          mountBody={true}
        >
          <button onClick={this.handleTestButtonClick}>{buttonValue}</button>
        </Modal>
      </div>
    );
  }
}
