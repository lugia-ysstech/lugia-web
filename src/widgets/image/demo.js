/**
 *@flow
 * create by zhanglunyu
 *
 */

import React from 'react';
import Image from './index';
import Theme from '../theme';
import Widget from '../consts';
import { getBorder, getBoxShadow, getBorderRadius } from '@lugia/theme-utils';

type PropsType = {};

export class ImageDemo extends React.Component<PropsType> {
  render() {
    const imageTheme = {
      [Widget.Image]: {
        Container: {
          normal: {
            borderRadius: getBorderRadius(40),
            boxShadow: getBoxShadow('2px 2px 2px 2px orange'),
            padding: 10,
            margin: { left: 50 },
          },
        },
      },
    };

    const backgroundText = {
      [Widget.Image]: {
        Container: {
          normal: {
            borderRadius: getBorderRadius(40),
            border: getBorder({ color: 'grey', width: 10, style: 'dashed' }),
            background: {
              clip: 'content-box',
            },
            boxShadow: getBoxShadow('2px 2px 2px 2px orange'),
            padding: 10,
            color: 'white',
            margin: { left: 50 },
          },
        },
      },
    };

    const imageClip1 = {
      [Widget.Image]: {
        Container: {
          normal: {
            borderRadius: getBorderRadius(40),
            border: getBorder({ color: 'grey', width: 10, style: 'dashed' }),
            background: {
              color: 'orange',
              clip: 'content-box',
            },
            boxShadow: getBoxShadow('2px 2px 2px 2px orange'),
            padding: 10,
            margin: { left: 50 },
          },
        },
      },
    };
    const imageClip2 = {
      [Widget.Image]: {
        Container: {
          normal: {
            borderRadius: 40,
            border: getBorder({ color: 'grey', width: 10, style: 'dashed' }),
            background: {
              color: 'pink',
              clip: 'border-box',
            },
            boxShadow: '2px 2px 2px 2px pink',
            margin: { left: 50 },
          },
        },
      },
    };
    const imageClip3 = {
      [Widget.Image]: {
        Container: {
          normal: {
            border: getBorder({ color: 'grey', width: 10, style: 'dashed' }),
            background: {
              clip: 'text',
            },
            margin: { left: 50 },
            fontSize: 15,
            padding: { top: 10, left: 10 },
          },
        },
      },
    };
    const imageClip4 = {
      [Widget.Image]: {
        Container: {
          normal: {
            border: getBorder({ color: 'grey', width: 10, style: 'dashed' }),
            background: {
              color: 'pink',
              clip: 'padding-box',
            },
            boxShadow: '2px 2px 2px 2px pink',
            margin: { left: 50 },
          },
        },
      },
    };

    const imageAttachment1 = {
      [Widget.Image]: {
        Container: {
          normal: {
            border: getBorder({ color: 'grey', width: 10, style: 'dashed' }),
            background: {
              color: 'pink',
              attachment: 'fixed',
              clip: 'content-box',
            },
            padding: 5,
            margin: { left: 50 },
          },
        },
      },
    };
    const imageAttachment2 = {
      [Widget.Image]: {
        Container: {
          normal: {
            border: getBorder({ color: 'grey', width: 10, style: 'dashed' }),
            background: {
              color: 'pink',
              attachment: 'scroll',
              clip: 'content-box',
            },
            padding: 5,
            margin: { left: 50 },
          },
        },
      },
    };
    const imageAttachment3 = {
      [Widget.Image]: {
        Container: {
          normal: {
            border: getBorder({ color: 'grey', width: 10, style: 'dashed' }),
            background: {
              color: 'pink',
              attachment: 'local',
              clip: 'content-box',
            },
            padding: 5,
            margin: { left: 50 },
          },
        },
      },
    };

    const imageSize1 = {
      [Widget.Image]: {
        Container: {
          normal: {
            border: getBorder({ color: 'grey', width: 10, style: 'dashed' }),
            background: { size: 'cover' },
            padding: 5,
            margin: { left: 50 },
          },
        },
      },
    };
    const imageSize2 = {
      [Widget.Image]: {
        Container: {
          normal: {
            border: getBorder({ color: 'grey', width: 10, style: 'dashed' }),
            background: { size: '60% 30%' },
            padding: 5,
            margin: { left: 50 },
          },
        },
      },
    };
    const imageSize3 = {
      [Widget.Image]: {
        Container: {
          normal: {
            border: getBorder({ color: 'grey', width: 10, style: 'dashed' }),
            background: { size: '80px 80px' },
            padding: 5,
            margin: { left: 50 },
          },
        },
      },
    };

    const imagePosition1 = {
      [Widget.Image]: {
        Container: {
          normal: {
            border: getBorder({ color: 'grey', width: 10, style: 'dashed' }),
            background: { positionX: 'top' },
            padding: 5,
            margin: { left: 50 },
          },
        },
      },
    };
    const imagePosition2 = {
      [Widget.Image]: {
        Container: {
          normal: {
            border: getBorder({ color: 'grey', width: 10, style: 'dashed' }),
            background: { positionY: '25% 75%' },
            padding: 5,
            margin: { left: 50 },
          },
        },
      },
    };
    const imagePosition3 = {
      [Widget.Image]: {
        Container: {
          normal: {
            border: getBorder({ color: 'grey', width: 10, style: 'dashed' }),
            background: { position: '25px 30px' },
            padding: 5,
            margin: { left: 50 },
          },
        },
      },
    };

    const imageRepeat1 = {
      [Widget.Image]: {
        Container: {
          normal: {
            border: getBorder({ color: 'grey', width: 10, style: 'dashed' }),
            background: { repeatX: 'no-repeat', size: '90%', color: 'orange' },
            padding: 5,
            margin: { left: 50 },
          },
        },
      },
    };
    const imageRepeat2 = {
      [Widget.Image]: {
        Container: {
          normal: {
            border: getBorder({ color: 'grey', width: 10, style: 'dashed' }),
            background: { repeatY: 'no-repeat', size: '90%' },
            padding: 5,
            margin: { left: 50 },
          },
        },
      },
    };
    const imageRepeat3 = {
      [Widget.Image]: {
        Container: {
          normal: {
            border: getBorder({ color: 'grey', width: 10, style: 'dashed' }),
            background: { repeat: 'space', size: '90%' },
            padding: 5,
            margin: { left: 50 },
          },
        },
      },
    };
    const imageRepeat4 = {
      [Widget.Image]: {
        Container: {
          normal: {
            border: getBorder({ color: 'grey', width: 10, style: 'dashed' }),
            background: { repeat: 'round', size: '90%' },
            padding: 5,
            margin: { left: 50 },
          },
        },
      },
    };
    return (
      <div style={{ display: 'flex', flexDirection: 'column', marginTop: 30, marginLeft: 30 }}>
        <div
          style={{
            width: 1200,
            height: 200,
            border: '5px dashed grey',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            margin: 20,
          }}
        >
          <span
            style={{
              fontSize: 15,
              marginLeft: 20,
            }}
          >
            <h4>无主题的demo</h4>
            <Image
              src="https://interactive-examples.mdn.mozilla.net/media/examples/grapefruit-slice-332-332.jpg"
              alt="我是可爱的西柚"
              title="I am lovely grapefruit"
            />
          </span>
          <Theme config={imageTheme}>
            <span
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                fontSize: 15,
              }}
            >
              <h4>有主题的图片demo</h4>
              <Image
                src="https://interactive-examples.mdn.mozilla.net/media/examples/grapefruit-slice-332-332.jpg"
                alt="我是可爱的西柚"
                title="I am lovely grapefruit"
              />
            </span>
          </Theme>

          <Theme config={backgroundText}>
            <span
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                fontSize: 15,
              }}
            >
              <text style={{ color: 'gray' }}> 背景文字</text>
              <Image
                src="https://interactive-examples.mdn.mozilla.net/media/examples/grapefruit-slice-332-332.jpg"
                alt="我是很酸的柚子"
                title="A T-Rex on display in the Manchester University Museum"
                isBackground={true}
              >
                <span style={{ padding: 10 }}>
                  Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh
                  euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.
                </span>
              </Image>
            </span>
          </Theme>
        </div>
        <div
          style={{
            width: 1200,
            height: 200,
            border: '5px dashed grey',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            margin: 20,
          }}
        >
          <Theme config={imageClip1}>
            <span
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                fontSize: 15,
              }}
            >
              <text style={{ color: 'gray' }}> clip:'content-box'</text>
              <Image
                src="https://static.1sapp.com/qupost/images/2020/06/06/1591431846082798163.jpg"
                alt="我是很甜的猕猴桃"
                title="A T-Rex on display in the Manchester University Museum"
                isBackground={true}
              />
            </span>
          </Theme>

          <Theme config={imageClip2}>
            <span
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                fontSize: 15,
              }}
            >
              <text style={{ color: 'gray' }}>clip:'border-box'</text>

              <Image
                src="https://interactive-examples.mdn.mozilla.net/media/examples/grapefruit-slice-332-332.jpg"
                alt="我是可爱的西柚"
                title="I am lovely grapefruit"
                isBackground={true}
              />
            </span>
          </Theme>

          <Theme config={imageClip3}>
            <span
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                fontSize: 15,
              }}
            >
              <text style={{ color: 'gray' }}>clip:'text'</text>
              <Image
                src="https://interactive-examples.mdn.mozilla.net/media/examples/grapefruit-slice-332-332.jpg"
                alt="我是可爱的西柚"
                title="I am lovely grapefruit"
                height="150"
                width="200"
                isBackground={true}
              >
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh
                euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.
              </Image>
            </span>
          </Theme>

          <Theme config={imageClip4}>
            <span
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                fontSize: 15,
              }}
            >
              <text style={{ color: 'gray' }}>clip:'padding-box'</text>
              <Image
                src="https://interactive-examples.mdn.mozilla.net/media/examples/grapefruit-slice-332-332.jpg"
                alt="我是可爱的西柚"
                title="I am lovely grapefruit"
                isBackground={true}
              />
            </span>
          </Theme>
        </div>

        <div
          style={{
            width: 1200,
            height: 200,
            border: '5px dashed grey',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            margin: 20,
          }}
        >
          <Theme config={imageAttachment1}>
            <span
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                fontSize: 15,
              }}
            >
              <text style={{ color: 'gray' }}> attachment:'fixed'</text>
              <Image
                src="https://interactive-examples.mdn.mozilla.net/media/examples/grapefruit-slice-332-332.jpg"
                alt="我是可爱的西柚"
                title="I am lovely grapefruit"
                isBackground={true}
              />
            </span>
          </Theme>
          <Theme config={imageAttachment2}>
            <span
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                fontSize: 15,
              }}
            >
              <text style={{ color: 'gray' }}> attachment'scroll'</text>
              <Image
                src="https://interactive-examples.mdn.mozilla.net/media/examples/grapefruit-slice-332-332.jpg"
                alt="我是可爱的西柚"
                title="I am lovely grapefruit"
                isBackground={true}
              />
            </span>
          </Theme>
          <Theme config={imageAttachment3}>
            <span
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                fontSize: 15,
              }}
            >
              <text style={{ color: 'gray' }}> attachment:'local'</text>
              <Image
                src="https://interactive-examples.mdn.mozilla.net/media/examples/grapefruit-slice-332-332.jpg"
                alt="我是可爱的西柚"
                title="I am lovely grapefruit"
                isBackground={true}
              />
            </span>
          </Theme>
        </div>

        <div
          style={{
            width: 1200,
            height: 200,
            border: '5px dashed grey',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            margin: 20,
          }}
        >
          <Theme config={imageSize1}>
            <span
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                fontSize: 15,
              }}
            >
              <text style={{ color: 'gray' }}>背景图片大小:关键字 的demo</text>
              <Image
                src="https://interactive-examples.mdn.mozilla.net/media/examples/grapefruit-slice-332-332.jpg"
                alt="我是可爱的西柚"
                title="I am lovely grapefruit"
                isBackground={true}
              />
            </span>
          </Theme>

          <Theme config={imageSize2}>
            <span
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                fontSize: 15,
              }}
            >
              <text style={{ color: 'gray' }}>背景图片大小:百分比 的demo</text>
              <Image
                src="https://interactive-examples.mdn.mozilla.net/media/examples/grapefruit-slice-332-332.jpg"
                alt="我是可爱的西柚"
                title="I am lovely grapefruit"
                isBackground={true}
              />
            </span>
          </Theme>

          <Theme config={imageSize3}>
            <span
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                fontSize: 15,
              }}
            >
              <text style={{ color: 'gray' }}>背景图片大小:像素值 的demo</text>
              <Image
                src="https://interactive-examples.mdn.mozilla.net/media/examples/grapefruit-slice-332-332.jpg"
                alt="我是可爱的西柚"
                title="I am lovely grapefruit"
                isBackground={true}
              />
            </span>
          </Theme>
        </div>

        <div
          style={{
            width: 1200,
            height: 200,
            border: '5px dashed grey',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            margin: 20,
          }}
        >
          <Theme config={imagePosition1}>
            <span
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                fontSize: 15,
              }}
            >
              <text style={{ color: 'gray' }}>背景位置position:关键字 的demo</text>
              <Image
                src="https://interactive-examples.mdn.mozilla.net/media/examples/grapefruit-slice-332-332.jpg"
                alt="我是可爱的西柚"
                title="I am lovely grapefruit"
                isBackground={true}
              />
            </span>
          </Theme>

          <Theme config={imagePosition2}>
            <span
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                fontSize: 15,
              }}
            >
              <text style={{ color: 'gray' }}>背景位置position:百分比 的demo</text>
              <Image
                src="https://interactive-examples.mdn.mozilla.net/media/examples/grapefruit-slice-332-332.jpg"
                alt="我是可爱的西柚"
                title="I am lovely grapefruit"
                isBackground={true}
              />
            </span>
          </Theme>

          <Theme config={imagePosition3}>
            <span
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                fontSize: 15,
              }}
            >
              <text style={{ color: 'gray' }}>背景位置position:像素值 的demo</text>
              <Image
                src="https://interactive-examples.mdn.mozilla.net/media/examples/grapefruit-slice-332-332.jpg"
                alt="我是可爱的西柚"
                title="I am lovely grapefruit"
                isBackground={true}
              />
            </span>
          </Theme>
        </div>

        <div
          style={{
            width: 1200,
            height: 200,
            border: '5px dashed grey',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            margin: 20,
          }}
        >
          <Theme config={imageRepeat1}>
            <span
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                fontSize: 15,
              }}
            >
              <text style={{ color: 'gray' }}>背景平铺方式:repeatX:no-repeat</text>
              <Image
                src="https://interactive-examples.mdn.mozilla.net/media/examples/grapefruit-slice-332-332.jpg"
                alt="我是可爱的西柚"
                title="I am lovely grapefruit"
                isBackground={true}
              />
            </span>
          </Theme>

          <Theme config={imageRepeat2}>
            <span
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                fontSize: 15,
              }}
            >
              <text style={{ color: 'gray' }}>背景平铺方式:repeatY:no-repeat</text>
              <Image
                src="https://interactive-examples.mdn.mozilla.net/media/examples/grapefruit-slice-332-332.jpg"
                alt="我是可爱的西柚"
                title="I am lovely grapefruit"
                isBackground={true}
              />
            </span>
          </Theme>

          <Theme config={imageRepeat3}>
            <span
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                fontSize: 15,
              }}
            >
              <text style={{ color: 'gray' }}>背景平铺方式:repeat:space</text>
              <Image
                src="https://interactive-examples.mdn.mozilla.net/media/examples/grapefruit-slice-332-332.jpg"
                alt="我是可爱的西柚"
                title="I am lovely grapefruit"
                isBackground={true}
              />
            </span>
          </Theme>

          <Theme config={imageRepeat4}>
            <span
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                fontSize: 15,
              }}
            >
              <text style={{ color: 'gray' }}>背景平铺方式repeat:round 的demo</text>
              <Image
                src="https://interactive-examples.mdn.mozilla.net/media/examples/grapefruit-slice-332-332.jpg"
                alt="我是可爱的西柚"
                title="I am lovely grapefruit"
                isBackground={true}
              />
            </span>
          </Theme>
        </div>
      </div>
    );
  }
}

export default ImageDemo;
