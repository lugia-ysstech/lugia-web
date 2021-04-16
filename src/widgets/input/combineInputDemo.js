import * as React from 'react';
import CombineInput from './combineInput';
import Theme from '../theme';

import Widget from '../consts/index';
import { useState } from 'react';

export default () => {
  const data = (function(t) {
    const res = [];
    for (let i = 0; i < t; i++) {
      res.push({ value: `value-${i}`, text: `text${i}` });
    }
    return res;
  })(10);

  const combineInputConfig = {
    [Widget.CombineInput]: {
      Container: {
        normal: { width: 500, height: 50 },
      },
      Input: {
        Container: {
          normal: { width: 300, height: 50 },
        },
      },
      BeforeSelect: {
        Container: {
          normal: {
            width: 150,
          },
        },
      },
      AfterSelect: {
        Container: {
          normal: {
            width: 130,
            height: 50,
          },
        },
      },
      BeforeContent: {
        normal: {
          width: 200,
          color: 'blue',
          fontSize: 30,
        },
      },
      BeforeIcon: {
        normal: {
          fontSize: 24,
          color: 'red',
        },
      },
      AfterContent: {
        normal: {
          width: 130,
          color: 'pink',
          fontSize: 16,
        },
      },
      AfterIcon: {
        normal: {
          fontSize: 20,
          color: 'yellow',
        },
      },
    },
  };

  function SelectInput() {
    const [beforeRenderValue, setBeforeSelectValue] = useState('');
    const [afterRenderValue, setAfterSelectValue] = useState('');
    const onAfterSelectChange = value => {
      const { newValue } = value;
      setAfterSelectValue(newValue);
    };
    const onBeforeSelectChange = value => {
      const { newValue } = value;
      setBeforeSelectValue(newValue);
    };

    return (
      <CombineInput
        beforeType={'select'}
        beforeSelectData={data}
        afterType={'select'}
        afterSelectData={data}
        onBeforeSelectChange={onBeforeSelectChange}
        beforeRenderValue={beforeRenderValue}
        onAfterSelectChange={onAfterSelectChange}
        afterRenderValue={afterRenderValue}
      />
    );
  }

  return (
    <div>
      <p>默认</p>
      <CombineInput />
      <br />
      <br />
      <br />
      <p>前缀下拉菜单</p>
      <CombineInput beforeType={'select'} beforeSelectData={data} />
      <br />
      <br />
      <br /> <p>后缀下拉菜单</p>
      <CombineInput afterType={'select'} afterSelectData={data} />
      <br />
      <br />
      <br />
      <p>前缀图标</p>
      <CombineInput
        beforeType={'display'}
        beforeText=""
        beforeIconClass={'lugia-icon-direction_backward'}
      />
      <br />
      <br />
      <br />
      <p>前缀文字</p>
      <CombineInput beforeType={'display'} beforeText="前缀文字" beforeIconClass={''} />
      <br />
      <br />
      <br />
      <p>前缀文字 + 图标</p>
      <CombineInput
        beforeType={'display'}
        beforeText="前缀文字"
        beforeIconClass={'lugia-icon-direction_backward'}
      />
      <br />
      <br />
      <br />
      <p>前缀文字 + 图标 图标在后</p>
      <CombineInput
        beforeType={'display'}
        beforeText="前缀文字"
        beforeIconClass={'lugia-icon-direction_backward'}
        beforeIconPosition={'after'}
      />
      <br />
      <br />
      <br />
      <p>size large</p>
      <CombineInput
        size={'large'}
        beforeType={'display'}
        beforeText="前缀文字"
        afterType={'display'}
        afterText="后缀文字"
      />
      <br />
      <br />
      <br />
      <p>size small</p>
      <CombineInput
        size={'small'}
        beforeType={'display'}
        beforeText="前缀文字"
        afterType={'display'}
        afterText="后缀文字"
      />
      <br />
      <br />
      <br />
      <p>自定义内容</p>
      <CombineInput beforeType={'custom'} beforeRenderValue={<div>自定义内容</div>} />
      <br />
      <br />
      <br />
      <p>校验 类型 top</p>
      <CombineInput validateStatus={'error'} validateType={'top'} />
      <br />
      <br />
      <br /> <p>校验 类型 bottom</p>
      <CombineInput validateStatus={'error'} validateType={'bottom'} />
      <br />
      <br />
      <br /> <p>校验 类型 inner</p>
      <CombineInput validateStatus={'error'} validateType={'inner'} />
      <br />
      <br />
      <br /> <p>受限value</p>
      <CombineInput value={'受限value'} />
      <br />
      <br />
      <br /> <p>主题 </p>
      <Theme config={combineInputConfig}>
        <SelectInput />
        <br />
        <br />
        <br />
        <CombineInput beforeType={'display'} afterType={'display'} />
      </Theme>
      <br />
    </div>
  );
};
