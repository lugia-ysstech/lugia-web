import Affix from './affix';
import Alert from './alert';
import AmountInput from './amount-input';
import Anchor from './anchor';
import AutoComplete from './auto-complete';
import Avatar from './avatar';
import BackTop from './back-top';
import Badge from './badge';
import Breadcrumb from './breadcrumb';
import Button from './button';
import Card from './card';
import Carousel from './carousel';
import Cascader from './cascader';
import Checkbox from './checkbox';
import Collapse from './collapse';
import DatePicker from './date-picker';
import Divider from './divider';
import Drawer from './drawer';
import Dropmenu from './dropmenu';
import Grid from './grid';
import Icon from './icon';
import Input from './input';
import Layout from './layout';
import Loading from './loading';
import Menu from './menu';
import Modal from './modal';
import NavMenu from './navmenu';
import NumberInput from './number-input';
import Pagination from './pagination';
import Popconfirm from './popconfirm';
import Popover from './popover';
import Progress from './progress';
import Radio from './radio';
import Rate from './rate';
import Select from './select';
import Skeleton from './skeleton';
import Slider from './slider';
import Steps from './steps';
import Switch from './switch';
import Table from './table';
import Tabs from './tabs';
import Tag from './tag';
import TimeLine from './time-line';
import TimePicker from './time-picker';
import Tooltip from './tooltip';
import Transfer from './transfer';
import Tree from './tree';
import TreeSelect from './tree-select';
import Upload from './upload';
export default {
  Affix: {
    meta: {
      widgetName: 'Affix',
      title: '固钉',
      desc: '将元素展示在可视区域。',
      props: {
        offsetTop: {
          type: 'number',
          desc: '距离指定容器顶部达到指定偏移量后触发',
          defaultValue: '0',
        },
        offsetBottom: {
          type: 'number',
          desc: '距离指定容器底部达到指定偏移量后触发',
          defaultValue: '0',
        },
        target: {
          type: 'Function',
          desc: '设置Affix组件监听滚功事件的元素，返回值为对应的DOM元素',
          defaultValue: 'undefined',
        },
      },
      events: {
        onChange: {
          desc: '固定状态发生改变时触发',
          args: [{ name: 'affixed', desc: '当前固定状态', type: 'boolean' }],
        },
      },
      category: ['导航'],
    },
    target: Affix,
    screenshot:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAYCAYAAAAVibZIAAAAAXNSR0IArs4c6QAAA2VJREFUOBGllV1oXEUUx8+ZvdmNmk0fUl+MUGhKquLaF6ElCiqCSgq2UCgNiG20JaHdXW3uNiWV7M5utDEm29LdpGlaDERbBB8EfShIac1DaaUKafoh2i9KUSp+BDWRJLt753gmMsvNzQ0kdB72zPznzG/mzJxzF2EZzU7nXwWHPrAssb0nGb2+2FKx2ISfnk3FvgaBw8WS+i4h+98lIvTzWxZUAxCI1+ANRdSUSOXPtMsTj3vBy4K2dw08qQjSKGBbNT79HAo879D0mJ3MNbnBvsd3O5i+lJ8HJ9Wv3xKIjw9logNGT2T611NJfcrX8n0YqnZL2fzXkqF2Kt8DBJFsJtZogMa2yf56JHUdCO9TAJuXFP6+zNEX+FG2h0KVzQZkrH4sJBpAxG4hsBUVRX1Puv/DoRXObPFFcFQ9Cb2G9ggh4n2p6JcGZqydzO8FoKawiDRI+VJJ6/OgthxaCTArQcGbPHeJ7+kKuyhQ9AuHfdiAjN2fyUeKDo0GrOCG3s7Wm0a37FQuXYHWiApAhVMsnAEBXwUrq+q6D7z1u3Hys7nc6dDdP26fQiE63EDta/HlThTJucSP4HCoHYdkbNgP4tXu/XnrIId5Nytjx71zgsM6Yln0Mt/Lb6DU6x0Hhx/1OnnH+7qG6gggiqJip3dOj+devycZH19Vs+ZZTuY7szNT44l0bqOfs9F6O1tuE+A9AbTaaG5bTql4vHGWQ2njtHiDHBzk3DuW6P3kEbezuy8QPlPkbHFrpl+GGqFPxs6FRdUzQBRWU39f1hVj5jz2Ry7ZVR5tbrgAqlVdamsfC+7gruASPKszRMpvLD1XbojTnJC+kfhC9cKf7hfS/Hi3AuKhJzhXGybV1QvtXUfXlqGOWoMI5dws69zxhdpy4HkkeLsyGNrxkdz1c5+MvsLgU6VS6YIt87s1QAFu4uXn3TDTn1dRWpTyZPU/NDHOp7CzMv6FcdTWlseeAlU4yRvMEFJtNUbqTGm6/RacdBIm+nmnc16gXpSVrT/U14bW82d6lH0e/hev8WkXtnlQ/ovYynE1hDHwzkLX/5WWlpYiV90BEcDNSlGbX9qVw3/v/cHa6UJxTFhiU18yenEx6FL0uZPqb+JMoTjC9zj4oEC9aUD/zARq1inC18IY2TU6OqK09iDtP3tyRN/UQch7AAAAAElFTkSuQmCC',
  },
  Alert: {
    meta: {
      widgetName: 'Alert',
      title: '警告提示',
      desc: '警告提示信息。',
      props: {
        type: {
          type: 'AlertType',
          desc: '指定警告提示的样式，有四种可以选择：success、error、info、warning',
          defaultValue: '0',
        },
        message: { type: 'React.node', desc: '警告提示内容', defaultValue: 'undefined' },
        showIcon: { type: 'boolean', desc: '是否展示图标', defaultValue: 'false' },
        closeText: { type: 'React.node', desc: '自定义关闭按钮', defaultValue: 'undefined' },
        closable: { type: 'boolean', desc: '是否显示关闭按钮', defaultValue: 'false' },
        description: {
          type: 'React.node',
          desc: '提示内容的辅助性文字介绍',
          defaultValue: 'undefined',
        },
        icon: {
          type: 'string',
          desc: '自定义图标，showIcon 为 true 时有效',
          defaultValue: 'undefined',
        },
      },
      events: {
        onClose: {
          desc: '关闭时触发的回调函数',
          args: [{ name: 'event', desc: '关闭时的DOM事件', type: 'Object' }],
        },
      },
      type: {
        AlertType: ['info', 'success', 'error', 'warning'],
        AlertStyle: {
          width: { type: 'number', desc: '组件宽度' },
          color: { type: 'string', desc: '组件颜色' },
        },
      },
      category: ['反馈'],
    },
    target: Alert,
    screenshot:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADYAAAARCAYAAACW7F9TAAAAAXNSR0IArs4c6QAAAfRJREFUSA1j9E35v5/hP4PDP0YGE4ZhAhiZGT4xgTw1TPwD98b/vwx8THDeMGOMemyoRSgLLgeL8FyR+PuP9e/7b+qvQWp4ue4JsDF/4mH8z/KHGuLffki/4+O4K/nys8VdkPmM/38zi/KfUHv5wfYGIyjnUwhwJkUmpo88Evx7ZnJxPORnY/7MJs2/Yyon60tJaon//svzS5D3fK2c0FZbkB+UxFek83Pd8aeGp0DmMfom/weHDrbiXkF0TQAb83ub/wwsr/79Y/1w91XMLJAmaokLc1+RFOM7OPXbT6lZnBwvou6/jk7++ZvvN8gOSgHOGAMZ/OB1yAYgxczE+EP3zouY2TDLqCX+9qvO86+/pOZycTxufv3ZvIZangK5E6/HRHkvSTEx/pJjYPjPKi5wWAPmMWqJ///HwMjJ+srz3z+2CwKc17xg5lODxukxFqbvLMK8R9u+/FLq/fhdv16I+1ITF+sLHmqJgxyvLLEs6d9/lpd3X8VnsjB/tpYW3GVGDU+BzMBZKiqIrsr/84fz0pO3nsdACrmYH22UEdpS+4+B9RU1xL/8UVjJyvLB/cm7yLg//zj/vP1kWivMd3IiD6dS0pfvKm9BdlIC8BYelBg80HpxJsWBdhil9o96jNIQpLd+JgZGhgP0tpTW9jGzMXwEAMZJTRvuLdfjAAAAAElFTkSuQmCC',
  },
  AmountInput: {
    meta: {
      widgetName: 'AmountInput',
      title: '金额输入框',
      desc: '用于金额数字的填写,可切换人民币大小写显示效果.',
      props: {
        disabled: { type: 'boolean', desc: '禁用状态,是否不可用', defaultValue: 'false' },
        transform: {
          type: 'boolean',
          desc: "是否开启转换,仅在amountPrefix='¥'时生效",
          defaultValue: 'true',
        },
        viewClass: { type: 'string', desc: '用于配置主题属性', defaultValue: 'undefined' },
        size: {
          type: 'InputSize',
          desc: "可配置三种尺寸大小的input ('大' , '默认' , '小'),高度分别为 40px、32px 和 24px。",
          defaultValue: 'default',
        },
        placeholder: { type: 'string', desc: 'input输入提示信息', defaultValue: 'undefined' },
        amountPrefix: { type: 'string', desc: "货币种类,默认'¥'", defaultValue: '¥' },
        defaultValue: { type: 'string', desc: '默认显示内容', defaultValue: 'undefined' },
        value: { type: 'string', desc: '显示内容', defaultValue: 'undefined' },
      },
      events: {
        onChange: {
          desc: '内容改变时触发',
          args: [{ name: 'event', desc: '改变内容的DOM事件', type: 'ChangeType' }],
        },
        onKeyUp: {
          desc: '键盘按下去并松开后执行',
          args: [{ name: 'event', desc: '改变键盘输入的内容', type: 'KeyboardEvent' }],
        },
        onKeyDown: {
          desc: '键盘按下任何键时触发',
          args: [{ name: 'event', desc: '改变键盘输入的内容', type: 'KeyboardEvent' }],
        },
        onKeyPress: {
          desc: '键盘按下任何键时触发',
          args: [{ name: 'event', desc: '改变键盘输入的内容', type: 'KeyboardEvent' }],
        },
        onFocus: {
          desc: '输入框获得焦点时触发',
          args: [{ name: 'event', desc: '获取焦点的DOM事件', type: 'FocusEvent' }],
        },
        onBlur: {
          desc: '输入框失去焦点时触发',
          args: [{ name: 'event', desc: '失去焦点的DOM事件', type: 'FocusEvent' }],
        },
        onEnter: {
          desc: '当键入回车时触发事件',
          args: [{ name: 'event', desc: '当键入回车时触发', type: 'KeyboardEvent' }],
        },
      },
      type: {
        InputSize: ['small', 'default', 'large'],
        ChangeType: { newValue: 'string', oldValue: 'string', event: 'SyntheticEvent' },
      },
      category: ['数据录入'],
    },
    target: AmountInput,
    screenshot:
      'data:image/png;base64,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',
  },
  Anchor: {
    meta: {
      widgetName: 'Anchor',
      title: '锚点',
      desc: '用于跳转到页面指定位置。',
      props: {
        affix: { type: 'boolean', desc: '是否固定在窗口', defaultValue: 'true' },
        offsetTop: { type: 'number', desc: '距离窗口顶部达到指定值后触发', defaultValue: '0' },
        offsetBottom: {
          type: 'number',
          desc: '距离窗口底部达到指定值后触发',
          defaultValue: 'undefined',
        },
        slideType: { type: 'SlideType', desc: '分割线样式', defaultValue: 'circle' },
        slideLine: { type: 'boolean', desc: '是否展示分割线', defaultValue: 'true' },
      },
      type: { SlideType: ['circle', 'line'] },
      category: ['其他'],
    },
    target: Anchor,
    screenshot:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAbCAYAAAAK5R1TAAAAAXNSR0IArs4c6QAAAkBJREFUWAntl89rE0EUx9+bHdomUSRISXLQ2kvxJOJBjPRP0L/AIkIFicgm0mxJMbTTmhZbe4hJsZcKgngRbwUPInio6M1TTz15UJqgHgpNY5PsvO5oF0KZ8VD2sIXMafmw++Y778d+GbyT7+y/XOb90LUelVaGAKzOfDHzQ+GphcogtawzFqd2EFxGBuq8uTu0ILKbKr4QH/kebF5uQnzrNPw+f5RH4cFXvDlOtP4CUX3gr7woX0KJb/mAle5vxRoN2vmCDPOS6GcQPEqpjQZtbzCGpcUZe92ZqcwDUjwGqZyOPxXZ+1qhSrAjnt0FCTeAwXfvFL+WRFYEyQti9YIrW+8RcJZQ5s6dZaO2be+bOFOb65Z3ijVAsEjCtSjYc/47QfEnIvMNvIxKoFcc+S0lUu1h4kahxcfVYQIY8bLZtwcrV3yhQXEhiIGkMS/+JxfcMT++iWtLL8Sbvn+9wgQi1dyOfM2ikXTkT7wZBF8s3NtxRKUIRMMxTGV25fZnL7uFZWF/MHGtUK8/y0hES7O5h+qkk9PlCQJM/+3XIDjHKrn0PHEqftVxbjemRPViW8p3YMGENxeloxwZvw7jk22vwidg1Wq1EyHUOExhyzHXCQqlM6nSJ5PJ8DuTTqjKcs+ZDnvN5EAmbhymoBzIFMfkQCaOutKH0pl0QkPpTEqo7hcVNmbs0Z7QY2ag50z/u2Md686km3pVnZ4zHfaoyYFM3Dj1JkcJipscyMSxXq9vJRKJke5hDKUzdQv0n8PoTAcW86a2P+7yQQAAAABJRU5ErkJggg==',
  },
  AutoComplete: {
    meta: {
      widgetName: 'AutoComplete',
      title: '自动完成',
      desc: '需要自动完成数据时使用',
      props: {
        data: { type: 'string[]', desc: '自动补全的数据', defaultValue: '[]' },
        value: { type: 'string', desc: '给定输入框的值', defaultValue: 'undefined' },
        defaultValue: {
          type: 'string',
          desc: '默认输入框的值，仅第一次生效',
          defaultValue: 'undefined',
        },
        showOldValue: { type: 'boolean', desc: '是否显示上一次选中的值', defaultValue: 'true' },
        placeholder: { type: 'string', desc: 'input输入提示信息', defaultValue: 'undefined' },
        showAllLevels: { type: 'boolean', desc: '是否显示所有层级关系的值', defaultValue: 'true' },
        prefix: { type: 'ReactNode', desc: '输入框前缀', defaultValue: 'undefined' },
        suffix: { type: 'ReactNode', desc: '输入框后缀', defaultValue: 'undefined' },
      },
      events: {
        onChange: {
          desc: '输入框的值改变时触发',
          args: [{ name: 'value', desc: '输入框中改变后的值', type: 'string' }],
        },
        onFocus: {
          desc: '输入框获取焦距时触发',
          args: [{ name: 'event', desc: '点击的DOM事件', type: 'Object' }],
        },
        onBlur: {
          desc: '输入框失去焦距时触发',
          args: [{ name: 'event', desc: '点击的DOM事件', type: 'Object' }],
        },
        onSelect: {
          desc: '点击选中项时触发',
          args: [{ name: 'selectedKeys', desc: '选中项的数据', type: 'string[]' }],
        },
      },
      type: {},
      category: ['数据录入'],
    },
    target: AutoComplete,
    screenshot:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAUCAYAAADLP76nAAAAAXNSR0IArs4c6QAAAmFJREFUSA3VV89rE0EUfm/ZtI2JPxp/VayCBXtQsPof2FMsbUChhBYV0UMSbClVSiNYwmi1iFGoQdlkL2IQNtgiUmmhFy96EM89qVXBwloslto0aWN2nzOeQkj2EBbivsO+mW+Y975vZmd4g6qqdgGASkSt3DvGEHGJkw3J/KPyTjgUCs05hj0nmkqlujlvVTTIScRLuQruUingxHZdBCSTyY92LVZdBPAL46ijBdhFXsQRt1BVG2WJVtnVaEzcDOvxeNrzc3P9sCTjD9ii3ffYwGe+knhj/Mmxtv37lpqbd/qCQf9XEUx7NX9ou/wnm8u5dpViPjf88vv9G1UT1jBgKYAf8SOFrbzGWOrkcnZVAaTFbYb7QdbMv4myxxeitx6dIBP6dH3v6R2+9efa9OwdlGDVLBSSuULbGQMX06XYGsdq4Gg5xfIMxGNDb1GSkhtm/h0SHfRCxxhj4RWUpYsmFZ/xDYg2NLj6GessepvwMpAZp6KhoEu+EgweL1TCLNnUMGgpQMTjW/SSANtBwhlBVGAHvC0fhOe2cHds4LtoBAKBFe6+AGC+/1zXt2qYwO00SwGMPW0qEmmShMNk0mD0dqJDJNfX9ElAmAcCz0gsERaY9uJ1L3dZjr/PTM1crYYJ3E6zFJCl3w95soX7bCiBANcMgzKjscR5TrzTA+7rjS7pEgKNTyppPwANt+zxjvT19kwQwdnM1GxPOaZNz52yk/y/WPUoJRRFsaV8qVspwYuwT3bthOUvZFeS8jiRSKS9HKu1XxcBtZKtNM/5AsTLhh+G7krq/mdMcBbc0elPyr/Pc/9zE47MSAAAAABJRU5ErkJggg==',
  },
  Avatar: {
    meta: {
      widgetName: 'Avatar',
      title: '头像',
      desc: '用来代表用户或事物，支持图片、图标或字符展示。',
      props: {
        viewClass: { type: 'string', desc: '用于配置通用主题属性', defaultValue: 'undefined' },
        size: {
          type: 'AvatarSize',
          desc: "可配置三种尺寸大小的input ('大' , '默认' , '小'),高度分别为 40px、32px 和 24px。",
          defaultValue: 'default',
        },
        name: { type: 'string', desc: '头像显示内容', defaultValue: 'undefined' },
        icon: { type: 'string', desc: '头像显示图标资源', defaultValue: 'undefined' },
        src: { type: 'string', desc: '头像显示图片资源', defaultValue: 'undefined' },
        shape: { type: 'AvatarShape', desc: '头像显示形状风格', defaultValue: 'circle' },
      },
      type: { AvatarSize: ['small', 'default', 'large'], AvatarShape: ['circle', 'square'] },
      category: ['数据展示'],
    },
    target: Avatar,
    screenshot:
      'data:image/png;base64,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',
  },
  BackTop: {
    meta: {
      widgetName: 'BackTop',
      title: '回到顶部',
      desc: '返回页面顶部。',
      props: {
        visibilityHeight: {
          type: 'number',
          desc: '页面滚动高度达到指定值后出现BackTop',
          defaultValue: '400',
        },
        target: {
          type: 'Function',
          desc: '设置监听滚动事件的元素，返回值为DOM元素的函数',
          defaultValue: '() => window',
        },
      },
      type: {
        BackTopStyle: {
          color: { type: 'string', desc: '组件颜色' },
          backgroundColor: { type: 'string', desc: '组件背景颜色' },
        },
      },
      category: ['其他'],
    },
    target: BackTop,
    screenshot:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAAAXNSR0IArs4c6QAAAxBJREFUWAnNmDuPElEUxy/DQIAAQUKEAArhUdiQAB2rJYXRxmZLv4GxMPFDmFhs9lvY2Ggsxo5dOiCh2R7JbrBxQ8nT/38yMw6zPAYQhpsM93XuOT/OuXMf4xJbpm63+2g8Hr+az+d1DH2KJ+lyuZJUg7ZbZHx6aFM8Hs/3Uqn0h312k8uuYKvVegOD7yD/Ao9sc9wEcg3AXVar1a92xmwE6nQ6Z7PZ7BNganYUrpIBVFOSpI/lcvl6lQzbVwIBwN1utz8jf79OwbZ9ALuoVCofkE+XjV0KBK9EptPpFwzgPDlEUtxu9zm8dW9V/gCIMAhRE555ZhX+n3V46AYhrFmhJLMRhomeOTQMbdKGZsttZlgA4pxB56HCZLarl+uaTb3+b1LzbQLxldFzxALm03P97TM8xFf7iAwLpsy2VSBt0dtrnVmwsGUF86lGBg5TgdDAFdjRpDO4uDeNRqPfoLG7HRwKfOL1eh9Lk8nk9QnA8E/KZJHgqr1f80QiIWKx2N6eI4uMnyf7aIpGoyKVSnGhEwi9GA6HO6sjCye1epbZRUsoFBLZbFYdiq1A5HI54ff7d1Glj0lKULQTkM/nE/l8XhBET1jgRKFQEJicetNWOVk4h+ZbjYIwToKiWCwKAlgTYQi1rM8qa62ThSG7s3asq2OH3ugFho3hM3tvnU5T3x2BeAa2nWgoEAhslA+HwyKTyWyUswjccjHsWRpXVtPptAgGgwKb8EoZc0ckEhHxeFwMBgNz87pyT0YIfmJze7tOSu/r9/uCz6ESQqxIsix/gwHeDpxOE16bJO3e1HCaBvYbZOGk5ttw6TSQzmCsajiPXGMZcORMBJgmLpJndIrqIbWAS5xTXuIFUrdtAPFMC9ILveNYOW3q52naNELGCkLmRuh+oLj3kYT6bCQFoXoJKGNhMzzEwezAHnSO/MaGsr1EaEOzZcBQ4QIQG+C+e94oUVRYP1BSaIO2rPoXQmbuZPhO5mODGexkPseYoVjW7m7Of7CygvHaxNsBQlrHw/P4g096mLC/8CjcJ7f9pPcXEQosy1UKiCgAAAAASUVORK5CYII=',
  },
  Badge: {
    meta: {
      widgetName: 'Badge',
      title: '徽标数',
      desc: '图标右上角的圆形徽标数字',
      props: {
        viewClass: { type: 'string', desc: '用于配置通用主题属性', defaultValue: 'undefined' },
        showZero: { type: 'boolean', desc: '当数值为 0 时，是否展示 Badge', defaultValue: 'false' },
        overflowCount: {
          type: 'number',
          desc: '超过 overflowCount 的会显示为 ${overflowCount}+，默认的 overflowCount 为 99',
          defaultValue: 99,
        },
        children: {
          type: 'React$Element<any>',
          desc: '可作为显示徽标数的子组件',
          defaultValue: 'undefined',
        },
        count: {
          type: 'number',
          desc: '展示的数字，大于封顶数时 显示为${overflowCount}+,为 0 时隐藏',
          defaultValue: 'undefined',
        },
      },
      category: ['数据展示'],
    },
    target: Badge,
    screenshot:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAAAXNSR0IArs4c6QAAAPNJREFUOBGtVD0OglAMbh+bwYnBCzgYmY2rN2DT1RO46zE8gatu3MDdGScv4MCixA1rP+IjaIgizyYNpT8fH33tY3oTCSd+lt/mRBJpKFQNVFPVhIhj3+tsONln+l4Kl5Ya1+FoSndei0iv6q/azHwmI4vu8bCzfmONy2C8lJy2nwCQizjykG9rCyZggIB1Nn2yRzMw4mcPTt8Y1AHj17RHfYMmtgEAKOpQrz0pTqHuQw19EqGxOEYXCQGCOXCRACAYJBdJAaKT6CSJgnDsBKH1/5mTYpl0F1qx0TrUoydULBOb1U9Amm+X8C9b/AICJm3ukwe3c3lgt6ciawAAAABJRU5ErkJggg==',
  },
  Breadcrumb: {
    meta: {
      widgetName: 'Breadcrumb',
      title: '面包屑',
      desc: '显示系统的层级关系和当先所在的位置,并能向上返回',
      props: {
        separator: { type: 'string', desc: '自定义层级分隔符', defaultValue: '/' },
        lastSeparator: {
          type: 'string | React.Element<any>',
          desc: '最后一个显示的元素后所',
          defaultValue: '',
        },
        routes: {
          type: 'Array<{path: , title: }>',
          desc: '生成面包屑数据对象的数组，path是跳转路径，title是面包屑展示文本',
          defaultValue: 'undefined',
        },
        params: { type: 'Object', desc: '可配置的参数', defaultValue: 'undefined' },
      },
      events: {
        onClick: {
          desc: '点击按钮时触发',
          args: [{ name: 'event', desc: '点击的DOM事件', type: 'Object' }],
        },
      },
      type: {
        ButtonShape: ['default', 'round'],
        ButtonStyle: { width: { type: 'number', desc: '组件宽度' } },
      },
      category: ['通用'],
    },
    target: Breadcrumb,
    screenshot:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADEAAAAKCAYAAAAdIbZyAAAAAXNSR0IArs4c6QAAAqRJREFUOBG1VF9IU2EUP+fbnVuWFvZSkZQpFb2UJNRDIINoiRNz6twdtNSnCISCek4oQjB6WERkJYbQ5r2uqbNrEbSgggpfeykqn/qPOXKY98++vm9w43KZcHP4vZzv/H7n33fOPRdgjU4y+XBHJpMRSgkvSY/qnPgTJ0arsVGN/A2fz6evxpf7JJPKdgPUC0781+QRkpQ+QhFeOilgJRs1b3S7AEdW4q24EJ94XF21Dub9fn9OURRPdhm3AhLDCSa2Nc1Zg5l3HeEUlnkumropJWlmT2fn8XeISNmnUiUIKASD/u8mb0pKKSbk6cOhUMtlE+Oyr6/P83VhaZs8eucT18Phnmq3e/M8AU3bOZ9VRzmYzRnXQdPrHWPcyXYmJ19UINBKsfXYZxsFOurBMXn6HNsVr4HahK7DersN1+PyjA+QPrNzsVhM1TU11h7uOdTWFd29TI17f2o3aETsDDxHgDf3pfQ4S54TQy0pp5g9CdeX1F9dCGSsGCd2BAYoQOOXH4sSQbgWCvkLHbXbIugnaVl5obFWjk/Qi94eA/RB9sibHiS9cn+/WtgJAu5xRAgAEf4ld4pZk/A7pdBSV7Mlbce5zotgeSZYsw5WlLueFrNJpTKbAMETaT36rRgfjw/9RMCPLNpSIjEyx20I3wM22ttsDxrzhjHI9EqnmD2JJCn7WJHvGxoaNDvH9URKqWWTiFJwdS/kjFvFbJb13xGCGC/GcSwYjnawVi1SwFdBMXqGYyS7aFxl7bkrdjS/ZiO+xPQhpxgPYD15NHoJdQ1bMfMuSW/L8po+7KLC6Uio+QlQ/JCQpwpFmDZcskc2YT6gWDHz3h7p3cUmfXaj13X+wN6aK+wHcKI9HK03+ZLl7Oysm+3VVCmBEg/S++Py1MD/xvgLkkpdsAabHFgAAAAASUVORK5CYII=',
  },
  Button: {
    meta: {
      widgetName: 'Button',
      title: '按钮',
      desc: '方便用户点击操作',
      props: {
        disabled: {
          type: 'boolean',
          desc: '按钮是否禁用，true 禁用 false 可用',
          defaultValue: true,
        },
        shape: {
          type: 'ButtonShape',
          desc: '设置按钮形状，可以设置为 circle 或者不设',
          defaultValue: 'default',
        },
        type: {
          type: 'ButtonType',
          desc: '支持多种不同的按钮风格，可选值为 primary、success、warning、danger 或者不设',
          defaultValue: 'default',
        },
        plain: { type: 'boolean', desc: '是否为朴素按钮', defaultValue: 'undefined' },
        size: {
          type: 'ButtonSize',
          desc: '设置按钮大小，可选值为 small、large、bigger 或者不设',
          defaultValue: 'default',
        },
        loading: { type: 'boolean', desc: '设置按钮加载状态', defaultValue: 'undefined' },
        circle: { type: 'boolean', desc: '设置圆形按钮', defaultValue: 'undefined' },
        icon: { type: 'string', desc: '设置按钮图标类型', defaultValue: 'undefined' },
        text: {
          type: 'string | React.node',
          desc: '设置按钮的文本内容',
          defaultValue: 'undefined',
        },
      },
      events: {
        onClick: {
          desc: '点击按钮时触发',
          args: [{ name: 'event', desc: '点击的DOM事件', type: 'Object' }],
        },
      },
      type: {
        ButtonShape: ['default', 'round'],
        ButtonType: ['default', 'primary', 'success', 'warning', 'danger'],
        ButtonSize: ['default', 'small', 'large'],
        ButtonStyle: {
          width: { type: 'number', desc: '组件宽度' },
          margin: { type: 'number | Object', desc: '组件外间距' },
          color: { type: 'string', desc: '组件颜色' },
        },
      },
      category: ['通用'],
      designInfo: {
        DefaultSuccessButton: { props: { shape: 'default', type: 'success', text: 'Button' } },
      },
    },
    target: Button,
    screenshot:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAUCAYAAADLP76nAAAAAXNSR0IArs4c6QAAAopJREFUSA3tl0tIVWEQx3/nappSlhaVr4ooelhCWmCPTdBGyqgW4iIMem1yEwRBBCVErYVa1KoWRYsWRougNkGtzAJTUEukzDRTKsWePm7/OR+Xk+DjdJXkQgP3njnfmZlv/vOf+TjH2388Wjoa5Xo0Sh4JJJ5HZ8TjhLfvWPRdoiUfq7MPIlGTNxCWeySGJlGv/wHMNnPJYRJISYGsBYFl7ycYGQnuZ1MLBaBgDRw6AE2tEFHTZS9xeu3DiVPfuQW6PkJ7ByQlQUUZ3Kqd2D7eJ6EAWPDGFrhxN9im5jzcewSZYmZgEIaHBc6DRZnSxU7RRkh9BZ/7tbZQ9wXwpA46ulyMFbkwLx1ev4FfQw5kZoaYHXX2bW+DvSbTQg+xzly/knMEuXAdfBnwjzEqD0KOGDFJS4Oqw7BqOeQug4K10vOhpAgy5sP2YgfySLljtLgQLp+BdPktFvCLp6F8j+zEXvUpF3Oq/9AMbNVmtgkCkp8NDx5PHPp5I2xS8vW6Wts1iokNq+HOfYFMdf7VNc5/9w7Ytll2shkSi9duu/VzVdovC/o0b5NJaAB1DWNb6OxJaG4bG9pYmkqMnfc9gZXNSOkuB6CzO1i3g8JabyoAoVsoCO00G8wfP6Fbg2pDbWLDHhO9XxlZvkTV17Gb1nZYmedayR4WrocXTb5ZXH+hGSgRzTlLlYeyssRaVP0PvfC0Xn1f6frbAMXkZbP6ea87tRqk92tmbD6u3JTPM6i5AD19miuV8NJVHdOqdjzilR3VG8UMiA3it+/hAyWrdHM1D4Nfw/uMZxmagfGc/1z7m+TNz47dQf2mK3HPwHQ3nin/xAdgHwUzVY1/Hcdyj/ifZQkIwk9en5S/AQh6o/E9CMWVAAAAAElFTkSuQmCC',
  },
  DefaultSuccessButton: {
    meta: {
      widgetName: 'Button',
      title: '按钮',
      desc: '方便用户点击操作',
      props: {
        disabled: {
          type: 'boolean',
          desc: '按钮是否禁用，true 禁用 false 可用',
          defaultValue: true,
        },
        shape: {
          type: 'ButtonShape',
          desc: '设置按钮形状，可以设置为 circle 或者不设',
          defaultValue: 'default',
        },
        type: {
          type: 'ButtonType',
          desc: '支持多种不同的按钮风格，可选值为 primary、success、warning、danger 或者不设',
          defaultValue: 'success',
        },
        plain: { type: 'boolean', desc: '是否为朴素按钮', defaultValue: 'undefined' },
        size: {
          type: 'ButtonSize',
          desc: '设置按钮大小，可选值为 small、large、bigger 或者不设',
          defaultValue: 'default',
        },
        loading: { type: 'boolean', desc: '设置按钮加载状态', defaultValue: 'undefined' },
        circle: { type: 'boolean', desc: '设置圆形按钮', defaultValue: 'undefined' },
        icon: { type: 'string', desc: '设置按钮图标类型', defaultValue: 'undefined' },
        text: { type: 'string | React.node', desc: '设置按钮的文本内容', defaultValue: 'Button' },
      },
      events: {
        onClick: {
          desc: '点击按钮时触发',
          args: [{ name: 'event', desc: '点击的DOM事件', type: 'Object' }],
        },
      },
      type: {
        ButtonShape: ['default', 'round'],
        ButtonType: ['default', 'primary', 'success', 'warning', 'danger'],
        ButtonSize: ['default', 'small', 'large'],
        ButtonStyle: {
          width: { type: 'number', desc: '组件宽度' },
          margin: { type: 'number | Object', desc: '组件外间距' },
          color: { type: 'string', desc: '组件颜色' },
        },
      },
      category: ['通用'],
      designInfo: {
        DefaultSuccessButton: { props: { shape: 'default', type: 'success', text: 'Button' } },
      },
    },
    target: Button,
    screenshot:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAABSxJREFUWAntmW1oW1UYx885N0k32VhhtMV184tSdOqGOPDl20Anio6kUttMk/Vlggzm+yar+EnmsBR8Ke5DcetLdEkNa7oNqlN8QfTDxE0GG61BFMFVwblRtFmTm3uO/+cmd7vGm9zEJGUfvJDec859Xn73PM957rm3nOWPjif6bsrqmVcUY3dhqA0/bl1bojNcsyScnvR4fa/G3zv4A/k1IfzB7UEm1buMqeuWCMbFDU8xwXdMRceinGZO1/UzBMc5/5BxbZALLekzpHSxUtPLGU0IJY02powXlVIPYu5SXq93o4fCCk8mXCI2/lBNvVZu7BeofBboCk8TJLGJfM4BWBus3F6dNPIsxCbgghYEo7DWyV3FZm0sbQRoLpSlzrlS1DYWToDX9PE/YLXh8ZRjoLe3d+V8Sq0Xy9mP8ZGR38vRqUbG8GU5S+cslAQMhPpuY7o+fHFBvxvi3EgxhhqVVIrvmpoY+7gaiHJ1i+agv3P7FpbJnELBvIeMcc6oiGbRR1mSJ/yd4WfKdVKNnCNgd3d3I2fqEAqlD4+/Y97l2ppELLJupa+lEaBv5B2+3vF4z/pqnJej6wg4n1FbFVOtMPD92qZVj8VHR38jY5HI4AJAnydoPLsbstLoK8dJNTKOgMpQm8goQKaGhoby6XrVjeI8ZvYkM+WuXql9y3GRcI5MQ3zxx3FPKDBubnWQB5UgdfT0NBmXjSehe6tg6mfOxftHomPnStlwnEEmxClSwgz6kY/LCg1IpbpoDJzfFl4r1n90W/i+bMo4B919UNwmFdsrpTzdHgzvKqZD446AnhUNR2nV0oqdX5Txrq7eNSRM9TDQFXoLzUcAv8iZPEjjbgdVBOwujyOvmxCS00KIl6CDPvNJqd4OdIZ3F7PhCBgfHp7H9qsXc5gG5MOLSj8PsLlLC/olhP5pGEMasj2JichMMcPWeCDYfT9S5ijsIBJ8em1z472T0bGBqYnIVsHZfpID+EAxSEdAUkpERz/RBL8TM/UVfogMux53rKE9q2l8y2R0fIjkSh0Ex5Q8ZsGta17Vbl90k7FIvxsk93eGzERfxr2tsdihOSeHHTt3rpAX/7xZ+vhPifHxP5xkCsfc4OzyeDrtw0300xhnfI+ngR3W04oeDMxxFdMF+xE/cOAv9MteEJXAkR+8arwMSKoa/RRuPS2Q87kCUTTEdsBK2pXCWbYJEunzWq4vn7XGawr4X+EsmH9C5kZrBmhuLkosCAvC7UyQ1sIh2bJyMBAOr2a6thHVf+5IdHS20AnB2UtJ4WotlHfraz7+jkyrvSTnOoPtwdALKs3OK5n91JDGDLZZHwVCTzVbTiistYSz7FrnkjMYCIYHUOlR5RXtB39FEWjBSnuA6akvgsEdmxdZdkOpOmc5qeZcdAYJTplwwOJiNwpzq+B8AzpzgLxlUWW+rjcc3ZgjoB1OCPZcIjY2iBKgaOfBFduch7wRoPT4OlFtzpWa4X8BFsJNRiNv2g0kJsaTFiSNI/Q3XLhwudEuU8v2FUB6k3KDsxzbIfPh/hw52WJdr/asZTy5xwgMXQHUM2y/lXMU1sKZK3RaT0jztTPvkABztEqFaKwcuLwuqxekYfisnbwiwKTlsBI4S6cekOaHzJyDpECWf2O2Of/OLawWVOG55pD4yko+MI0na/oJOMtkm6HkFLZMq1CWZpA8/gbuoa2a61HsE7AZ62v5I7pGtzZ79szZ2+/Y9AFiT/WM3uJW42clKppLctBipX9DTHu9vuDk4ZEvyevf3jHHr14uq9EAAAAASUVORK5CYII=',
  },
  Card: {
    meta: {
      widgetName: 'Card',
      title: '卡片',
      desc: '卡片容器，可添加文字、列表、图片等',
      props: {
        getThemeByDisplayName: {
          type: 'Function',
          desc: '用于配置组件内部图片的通用主题属性',
          defaultValue: 'undefined',
        },
        viewClass: { type: 'string', desc: '用于配置通用主题属性', defaultValue: 'undefined' },
        title: { type: 'React.Node', desc: '卡片标题显示内容', defaultValue: 'undefined' },
        description: { type: 'React.Node', desc: '卡片描述显示内容', defaultValue: 'undefined' },
        operation: { type: 'React.Node', desc: '卡片可操作内容', defaultValue: 'undefined' },
        image: { type: 'React.Node', desc: '卡片片显示内容', defaultValue: 'undefined' },
        avatar: { type: 'React.Node', desc: '卡片头像显示内容', defaultValue: 'undefined' },
        content: { type: 'React.Node', desc: '整个卡片显示内容', defaultValue: 'undefined' },
        children: {
          type: 'React.Node',
          desc: '卡片的children 可作为content显示,但优先于content显示',
          defaultValue: 'undefined',
        },
        type: {
          type: 'CardType',
          desc: '卡片风格 可配置 简洁,头像,图片,组合卡片几种风格',
          defaultValue: 'undefined',
        },
        imageOrientation: {
          type: 'ImageOrientation',
          desc: '当选择头像或图片卡片风格时,可配置图像的方向.水平,或垂直',
          defaultValue: 'undefined',
        },
      },
      type: {
        CardType: ['simple', 'avatar', 'image', 'combo', 'tip'],
        ImageOrientation: ['horizontal', 'vertical'],
      },
      category: ['数据展示'],
    },
    target: Card,
    screenshot:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADYAAAAeCAYAAABnuu2GAAAAAXNSR0IArs4c6QAAA9ZJREFUWAntWFlPU0EU/roApYCCYIOIILhhiihrVBITlGhMICYQH/TJxIQX/4S/wsT4YIwvyoNCoqIWISi4YKlaqdXaQoGWrWwFLIXS1jljeoM6hZq0BpFJ2jv3u+eeOd+cbXJlBoNBFwgEqrGBhlwub1USKa1Wu4FoASaTqVq+oRitILNJbMVm/BPT/8tjM+45jI5PSp6ZnfuG4dEJLC754Bxxwedb5s+Wl/383ru4hJGxSbhn56V3xl1TmHHPs59YlyQYo4nQY0Tg+q37MFvsWGRG37jdzOb9iFMq8OBpJ5pbnnNzHuo60fSoA0qFAhbbAH/Hs+CFtd+Bazfv4ZtngW+GSFeM+EhqFQ0NDVc1Go0E0CQ5KRFJ6kS0PHvFPDEBhVyOupoqsP6AvXnZHJ+emYPxkw2XLtRw+dzsHbD2OfD56wD0782oqiyBtiA/rC6ZTPbTmtG8cblcEHqMFikvPohMTToz1I762iqEDEndmoIzJ49x46tPlCNj21ZuE9lJcja7E2lM5nhFkWRrOF2SQAwmYYlNTrkxNDyGxEQVjCartHQwGMQHk4V5Qs08ZgVr8NKzXrMNqoR4DDMvU46FRjhdoeexuAqJ+f1+3G3S4bB2Ly7WnUZbZw+GnGN8/XY2p4Jw5XI9vN5FtHa85TgVlyftb3D+3ClUlGhxp6kVVFxW0xULQiGdQmKP216zouHD2VPHkZOdiUoWVo3NrbBYB9Hx0sDzjTxWX3sSXd1GmFm4NjIiFHJ7du8EhSiNh7ouhNNFlTSWQ6bX64Mb8KwYvnjEcjf/hm6laBEP6z9UBalw0KBeRvlClS8aeAIrMJ6FBWxJSeb6qSBR3qYkJwnxtNQtXO5P/oQ55mMkXrzqwRJr1FT1ul4b+ILRwqkfGt5/wuiYi9tq/mLDwKCT90kR/ieEQrLCBk0lm04TX212TE27QTuWuyuLl/Jo4OR1DeuRbw29iI+Lg8M5ioqyIk5MhId6aMjota6rNujcnJ2gECFiBfvzJV3RwtUszAv25UH/rhdlJYc4KVokHC4ZEOFEGIr0rsfjxfy8h4fi9MyspC5aOCkccowgIz2NX6UFVsFXyqw1FxILBILo7jGiqPAASosL0cN2lU700cLJqM+WPl6cKo+WslybgGvix0klHL4WkV+fC3PsIzsyqdUq5OflQKVKgJ8VkD67A9MsLKOBq+LjWLO342jFESgUcmxnXuvWG6FWqWDrH/oNz87KhFIpLOC/8uH3lGObDVq4NesYFObYOrY3YtM2iUW8VetEcNNj68QREZuhpA/49K074jf+AUHGSfcdNwCwOhJLWKwAAAAASUVORK5CYII=',
  },
  Carousel: {
    meta: {
      widgetName: 'Carousel',
      title: '走马灯',
      desc: '常用于展示一组图片或卡片轮播',
      props: {
        defaultStart: {
          type: 'number',
          desc: '幻灯片初始状态开始激活的索引，默认从0开始',
          defaultValue: '0',
        },
        start: { type: 'number', desc: '手动切换,指定幻灯片开始的索引', defaultValue: 'undefined' },
        autoPlay: { type: 'boolean', desc: '是否自动切换', defaultValue: 'true' },
        delay: { type: 'number', desc: '自动切换的时间间隔，单位为毫秒', defaultValue: '3000' },
        indicatorType: {
          type: 'horizontal | vertical | outside',
          desc: '指示器的显示方式',
          defaultValue: 'horizontal',
        },
        switchType: {
          type: 'horizontal | vertical | fade',
          desc: '动画切换的方式',
          defaultValue: 'horizontal',
        },
        animationTime: {
          type: 'number',
          desc: '单次动画执行的时间，单位为毫秒',
          defaultValue: '500',
        },
        action: { type: 'hover | click', desc: '指示器触发切换的方式', defaultValue: 'hover' },
      },
      events: {
        onChange: {
          desc: '触发指示器切换或点击切换按钮时触发',
          args: [
            { name: 'newValue', desc: '切换到下一次面板的索引值', type: 'number' },
            { name: 'oldValue', desc: '本次的索引值', type: 'number' },
          ],
        },
      },
      category: ['数据展示'],
    },
    target: Carousel,
    screenshot:
      'data:image/png;base64,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',
  },
  Cascader: {
    meta: {
      widgetName: 'Cascader',
      title: '级联选择',
      desc: '通过级联选择,可以清晰地显示层级数据结构',
      props: {
        action: { type: 'hover | click', desc: '展开子菜单的方式', defaultValue: 'undefined' },
        offsetX: { type: 'number', desc: '菜单间的间隔', defaultValue: '2' },
        offsetY: { type: 'number', desc: '显示框与菜单的间隔', defaultValue: '5' },
        placeholder: { type: 'string', desc: '显示框占位符', defaultValue: 'undefined' },
        menuWidth: { type: 'number', desc: '层级菜单的宽度', defaultValue: '150' },
        valueField: { type: 'string', desc: 'data数据的value值的名称', defaultValue: 'value' },
        displayField: {
          type: 'string',
          desc: 'data数据的displayValue值的名称',
          defaultValue: 'text',
        },
        data: {
          type: "[{valueField: '', displayField: ''}]",
          desc: '级联选择的数据',
          defaultValue: 'undefined',
        },
        separator: { type: 'string', desc: '自定义级联数据分隔符', defaultValue: '|' },
        value: {
          type: 'string | string[] | number | number[]',
          desc: '指定当前选中的条目',
          defaultValue: 'undefined',
        },
        displayValue: {
          type: 'string | string[] | number | number[]',
          desc: '指定当前选中的条目的displayValue值',
          defaultValue: 'undefined',
        },
        disabled: { type: 'boolean', desc: '是否禁选', defaultValue: 'false' },
        allowClear: { type: 'boolean', desc: '是否允许清空选中值', defaultValue: 'true' },
        showAllLevels: { type: 'boolean', desc: '是否显示所有层级关系的值', defaultValue: 'true' },
      },
      events: {
        onClick: {
          desc: '点击选择项时触发',
          args: [
            {
              name: 'target',
              desc:
                '包含事件对象event,选中的层级数据(通过自定义分隔符separator连接),点击项的数据item',
              type: 'Object',
            },
          ],
        },
        onClear: {
          desc: '点击清空图标时触发',
          args: [{ name: 'event', desc: '点击的DOM事件', type: 'Object' }],
        },
        onChange: {
          desc: '选中值改变时触发',
          args: [
            {
              name: 'selectedKeys',
              desc: '选中的层级数据(通过自定义分隔符separator连接),点击项的数据item',
              type: 'string[]',
            },
          ],
        },
      },
      category: ['数据录入'],
    },
    target: Cascader,
    screenshot:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAfQAAAFiCAMAAAA3N9rmAAAA/1BMVEUAAACamprZ2dnm5uaampqurq7Z2dmnqrPZ2dnZ2dmoq7LZ2dnY2NjZ2dmqqrbZ2dmnq7NRWF1NV1uZmZmcnJyamppLV1tQWF6amppSWF+WlpuamppOTk6ampqZmZmampqbm5tPVVybm5tPVlyhoaGampqampqZmZmampqnp6dQWF5SWV+ZmZlSWV+ZmZlRWF6ZmZlRWF6ampra2tqdnZ2dnZ1RWF6en6DHx8fDw8NPV1/Z2dmbm5vZ2dlOWmChoaHZ2dlRWF/a2tqnqrOZmZm3t7eZmZlQWF6ZmZlQWF7Z2dnZ2dnExMS1tbVRWGDY2NimqrKZmZlQV11RWF5SWl//qhXkAAAAT3RSTlMANbUKtb/q6jXVan+/aipKqt41+TubD2f92ATsB+bUqF8rIiITw7xwZQzt5d3Tsp6SiINgNCqSSN6aXlhXT0AbxsN01tCto4J2UT343MjC6Bgk+AAABq5JREFUeNrs2EGKhEAMheF4hqRAEC0pEBFERHTnJXL/ywxR7KZ7mDlA8r5N6fqHVCj6IlseZlZwguchb0L/kNQqONSmv7ofi4Jby0G/TalWcKxOE30pnYJzXaEP0rzH/3hKBU7IOb4XtUY+mrNeeN0J3NnXp6/QS2n0kguBSyXrpXkVnjo13BO41bOabqJbegY+OCaNmkSXo7YfRnPn7sWtPsgsajDb3evVLPYpajKBe1mNPDc6Y28PoPBzq7f2sRIEsFrr9pnueJMJYVcjtN3xIYRrrG+U7zEPIaR7aR/sGAlCGK32QLMdJ0EIp9Weie3Aa1wQYrWZ1FQEIVRqED0URA8I0QNC9IAQPSBEDwjRA0L0gBA9oB/26NAGQBgAgCCuCYKwEwt0/2lQJNim8u8WePGmB5keZHqQ6UGmB5keZHqQ6UGmB5keZHqQ6UGmB5keZHqQ6UGmB5keZHqQ6UGmB21Mf8a66/icY929G2d3+pjrftPnunsvbrrpXaYHmR5kepDpQaYHmR5k+sseHQgAAAAACPK3HqRTCHQ66HTQ6aDTQaeDTgedDjoddDrodNDpoNNBp4NOB50OOh10Ouh00Omg00Gng04HnQ46HXQ66HTQ6aDTQaeDTgedDjoddDrodNDpoNNBp4NOB50OOh10Ouh00Omg00Gng04HnQ46HXQ66HTQ6aDTQaeDTgedDjoddDrodNDpoNNBsXN/LW1DYRzHH0YU3dx2EQIhwVgkTVMQEf/QFZF6oSJsY5z3/2a2J3VBp4VgYdrz+35untwcysmXpCEXIbogogsiuiCiCyK6IKILIrogogsiuiCiCyK6IKILIrqgNaJ/fIXa/vryitWzdX8cL0SHBKILIrogogsiuiCiCyK6IKILIrogogsiuiCiCyK6IKILIrogogsiuiCiCyK6IKILIrogogsiuiCiCyK6IKILIrogogsiuiCiC3qInhNdSBc9t9LHzCBh5rVLu/HRGiS0XvvGEh+nBgmnXjuxzEdjkNB47cxGPlI+yiKhTr32yOp8OSGgu8Lz2mzsB1VhiF5ReeuxmU0Cz+8i2uAmZjYt/Wiff/Xo1fteupxaf6mPucFHrhgHNzFXHAWXGaKWBXdU9O/m3PHUEK3pcejM7MF96FQXhkhdVKFzb7270MmzhSFCiywPnTuzXpGEpTRpeYyPTN0maVhKCnukOAm9smoSRKKpytA7KeypURoQtXRkzxwe5AHRyg8O7SXnDdkjlTfntsqibbjLRydt2oU98elf8/ntFlb48e2Pn1sb5HY+f5bYfkEO0QURXRDRBS2jX3/AIN83/GxdP4q+Yxhk28/WV9tYO0QnOogOooPoqoguiOiCiC6I6IKILojogoguiOiCiC6I6IKILojogoguiOiCiC6I6IKILojogoguiOiCiC6I6IKILojogoguiOiCiC6I6IKILojogoguiOiCiC6I6IKILojogoguiOiCiC6I6IKEo599HujKepdD11xa72romjMb4P9Gf587XyO6b32QPevtDl2za729oWu2baW3j/6edk50ohOd6EQn+u927pg1YSAOoHigY3EwQ4JyS8hWERHBoVBBl6JDh1y+/2fp3VGEDoV0aux7b89w/DjB5O4vuuiiiy666LNGb+pedBp6v9t3osPQ6+Xm2IlOQx+Tuugw9Bg3+050GPqQ1HvRYehFXXQYelEXHYZe1EWHoQ9x+d6LDkMv6qLD0IfhZdeJTkOPSV10GHpRFx2GntSPnegw9KIuOgw9qzeiw9CTetuIDkMf4rJtRIehF3XRYehFXXQY+jCurkF0GPow7nrRaehxW4tOQx+3neg4dH/ecejxXK9FZ6HH8yn4l42FHj9OwZczLPS8z30Ny0KPq1PwgwsLPa7a4KdVFnoybzxEwULP5h6XYqFncw9GstCzuUegWejZ3MsOLPQxmXutiYWe97kXGFno2dyryiz0MZk7lICFnve540dY6OP2NThoiIWezR0pxkLP5g4PhKEnc8eEotDXTXsNDgRmoVdVWDv6G4fukH/RRRdddNFFF1100UUXXXTR57hy0UUXXXTRRRdddNFFF1100UWf39JFF130KV2eJ3ao7i2mPrOo7h2mPnOpfuzv0ee08u/o9hv0h0100U10E91ExyY6MNGBiQ5MdGCiAxMdmOjARAcmOjDRgYkOTHRgogMTHZjowEQHJjow0YGJDkx0YKIDEx2Y6MBEByY6MNGBiQ5MdGCiA/tP6Lcnm1RBf3t62G5f6IZLdGCiAxMdmOjAPgHpqJACoaqHWwAAAABJRU5ErkJggg==',
  },
  Checkbox: {
    meta: {
      widgetName: 'Checkbox',
      title: '多选框',
      desc: '多选框。',
      props: {
        checked: { type: 'boolean', desc: '指定Checkbox是否选中', defaultValue: 'undefined' },
        defaultChecked: {
          type: 'boolean',
          desc: '指定Checkbox初始是否选中',
          defaultValue: 'undefined',
        },
        disabled: { type: 'boolean', desc: '指定Checkbox是否禁用', defaultValue: 'undefined' },
        indeterminate: {
          type: 'boolean',
          desc: '设置半选状态，只用于样式控制',
          defaultValue: 'undefined',
        },
        value: { type: 'string', desc: '组件value值', defaultValue: 'undefined' },
        styles: {
          type: 'CheckboxType',
          desc: 'Checkbox展示方向，可选值为 vertical 或不设',
          defaultValue: 'false',
        },
        children: {
          type: 'string | React.node',
          desc: 'Checkbox展示内容',
          defaultValue: 'undefined',
        },
      },
      events: {
        onChange: {
          desc: 'Checkbox改变时回调',
          args: [
            { name: 'event', desc: '关闭时的DOM事件', type: 'Object' },
            { name: 'checked', desc: '当前是否选中', type: 'boolean' },
          ],
        },
      },
      type: {
        CheckboxType: ['default', 'vertical'],
        CheckboxStyle: {
          width: { type: 'number', desc: 'Checkbox宽度' },
          color: { type: 'string', desc: 'Checkbox颜色' },
        },
      },
      childrenWidget: ['checkbox-group'],
      category: ['数据录入'],
    },
    target: Checkbox,
    screenshot:
      'data:image/png;base64,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',
  },
  CheckboxGroup: {
    meta: {
      widgetName: 'CheckboxGroup',
      title: '多选框组',
      desc: '多选框组。',
      props: {
        defaultValue: {
          type: 'string[]',
          desc: '指定CheckboxGroup初始选中值',
          defaultValue: 'undefined',
        },
        value: { type: 'string[]', desc: '指定CheckboxGroup选中值', defaultValue: 'undefined' },
        disabled: { type: 'boolean', desc: '指定CheckboxGroup是否禁用', defaultValue: 'undefined' },
        data: { type: 'Object[]', desc: '指定 Checkbox 组件展示值', defaultValue: 'undefined' },
        displayField: {
          type: 'string',
          desc: '指定CheckboxGroup展示字段值',
          defaultValue: 'undefined',
        },
        valueField: { type: 'string', desc: '指定 Checkbox 组件 value 值', defaultValue: 'false' },
        displayValue: {
          type: 'string[]',
          desc:
            '指定CheckboxGroup选中值备用项，与value相对应，value中有不存在的值，将展示 displayValue 中对应值',
          defaultValue: 'undefined',
        },
        defaultDisplayValue: {
          type: 'string[]',
          desc:
            '指定CheckboxGroup选中值初始备用项，与value相对应，value中有不存在的值，将展示 displayValue 中对应值',
          defaultValue: 'undefined',
        },
        styles: {
          type: 'CheckboxType',
          desc: '指定CheckboxGroup中Checkbox展示方向，可选值为 vertical 或不设',
          defaultValue: 'undefined',
        },
        childType: {
          type: 'CheckboxGroupChildType',
          desc: '指定CheckboxGroup展示类型，可设置为 button 或不设',
          defaultValue: 'undefined',
        },
        size: {
          type: 'CheckboxButtonSizeType',
          desc:
            '指定CheckboxGroup大小，仅展示类型为button 时生效，可设置为 small、large、bigger 或不设',
          defaultValue: 'undefined',
        },
        cache: {
          type: 'boolean',
          desc: '指定CheckboxGroup中实时更新data 数据源信息',
          defaultValue: 'undefined',
        },
      },
      events: {
        onChange: {
          desc: 'CheckboxGroup改变时回调',
          args: [
            {
              name: 'newValue',
              desc: 'CheckboxGroup改变时 value、displayValue 和 item 对应的值',
              type: 'Object',
            },
          ],
        },
      },
      type: {
        CheckboxType: ['default', 'vertical'],
        CheckboxGroupChildType: ['default', 'button'],
        CheckboxButtonSizeType: ['default', 'small', 'large', 'bigger'],
        CheckboxGroupStyle: {
          width: { type: 'number', desc: 'Checkbox宽度' },
          color: { type: 'string', desc: 'Checkbox颜色' },
        },
      },
      category: ['数据录入'],
      componentName: 'Group',
      needExport: true,
    },
    target: Checkbox.Group,
    screenshot:
      'data:image/png;base64,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',
  },
  Collapse: {
    meta: {
      widgetName: 'Collapse',
      title: '折叠面板',
      desc: '折叠面板，用于展开/折叠内容区域。',
      props: {
        activeValue: {
          type: 'string | string[]',
          desc: '当前展开面板的 value值 或者 value 集合',
          defaultValue: 'undefined',
        },
        defaultActiveValue: {
          type: 'string | string[]',
          desc: '初始时展开面板的 value值 或者 value 集合',
          defaultValue: 'undefined',
        },
        showArrow: { type: 'boolean', desc: '是否展示面板箭头', defaultValue: 'undefined' },
        accordion: { type: 'boolean', desc: '设置是否为手风琴模式', defaultValue: 'undefined' },
        data: {
          type: 'Object[]',
          desc: '指定折叠面板data数据源，仅用于设计器',
          defaultValue: 'undefined',
          designOnly: true,
        },
      },
      events: {
        onChange: {
          desc: 'Collapse面板展开/折叠时回调',
          args: [
            { name: 'event', desc: '关闭时的DOM事件', type: 'Object' },
            { name: 'value', desc: '变化Collapse的value值', type: 'string' },
          ],
        },
      },
      type: {
        CollapseStyle: {
          width: { type: 'number', desc: 'Collapse宽度' },
          color: { type: 'string', desc: 'Collapse颜色' },
        },
      },
      childrenWidget: ['panel'],
      category: ['数据展示'],
    },
    target: Collapse,
    screenshot:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC8AAAAiCAYAAADPuYByAAAAAXNSR0IArs4c6QAAAm5JREFUWAntWL+LE1EQzr63yQkRCSkkEoQrFGwVsRGx1gjhFLbKBdIkrXZnJ4iV18hhkQTTJCkuCHc2UQS7s9C/4ErBFMkhFkdC4mX3rd8s7F0IL2YO934E9kGYl+/Nznw7md35iBHBqtVqV03T/J3P5wftdnup1+tdcV3X4WCFQuEHxTiLJSip4zjLo9GoTvtOp7MxHo9vcjG65qyW4Scul8trhmHcRsV/lkqlZ4RzMT/Gysrq5QPhXBTCtAlTyjZjSva3tup7vk+Q1qs8BZRSvgfxR0KITT8BF/P9jai4bpryqxTuLn2iUu6oJfeafx609SpPfY52+QTya0iwHo/HM8lk8g8Hy+Vy+5OkstbqQylFKxIxbKXG1vZm8/PkeZB7r/IguY6WeYd2+YbgLweDQYWLTZP50Kq3lWtnXdvJniTx6bzh97ACzAoY3W7XZfqeP7dFJU+8D9/z56+s8xktNHlTd3//I9SgifZjsZgJkedJAkiMG5jUexwMc2ZXx2cWpiVPosy27Te46DGG1QbsRwyxXxwMSnRnOBxuN5vNTL/ff4Dr7kByvOJgyPN0FlEd7r1tUqnUoUDznbiiTOdXrVbvQWo8R6xoIpHIWJZ1wMX8/PPsPx9YrijT+aXT6e9Ivowb+ELEiQgXm0d68lz7wJJQU0pV4Xgf9nWj0bjExSg46SKYF2iZu/hlbh0HI1/u0pLnijKdX6VSeYKKXygWiy3YIm7gLVomx8GoSFzinl84pI5VruCctW0TXPiTjaR9z4dDKhxSs9suHFLTw4xqFQ6p2R1zdBIOqaNanOpuoYdUSP5Ue2Ui2UL/b/MXjaZyeNqsf/MAAAAASUVORK5CYII=',
  },
  Panel: {
    meta: {
      widgetName: 'Panel',
      title: 'Panel 面板',
      desc: 'Panel 面板。',
      props: {
        value: { type: 'string', desc: '指定Panel面板value值', defaultValue: 'undefined' },
        title: {
          type: 'string | React.node',
          desc: '指定Panel面板头部内容',
          defaultValue: 'undefined',
        },
        children: { type: 'string | React.node', desc: 'Panel面板内容', defaultValue: 'undefined' },
        disabled: { type: 'boolean', desc: 'Panel面板是否禁用', defaultValue: 'false' },
        open: { type: 'boolean', desc: 'Panel面板是否展开', defaultValue: 'false' },
        showArrow: { type: 'boolean', desc: 'Panel面板是否展示箭头', defaultValue: 'true' },
      },
      events: {
        onClick: {
          desc: 'Panel面板点击事件回调',
          args: [{ name: 'value', desc: 'Panel面板点击时 value的值', type: 'string' }],
        },
      },
      type: {},
      category: ['数据展示'],
      componentName: 'Panel',
      needExport: true,
    },
    target: Collapse.Panel,
    screenshot:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAfQAAACuCAYAAADAtP+vAAAAAXNSR0IArs4c6QAADSpJREFUeAHt3d+PHWUZB/D3nd2lYCsXarjzisS/wUtjYkxDSAjBGGKihPBDSaQNiSSUC5uoNPFKTbyg8UJNFKUKhQK1YARDdKOwEJVqAKGIxdKl1bbQ7m7PmXmd95SNjcTxMD3bnTn7OclmN31nZp/n807zzbwz52y89957U/AiQIAAAQIEei1Q9Lp6xRMgQIAAAQIjAYHuRCBAgAABAlMgINCnYBK1QIAAAQIEBLpzgAABAgQITIHAbIxx+xT0oQUCBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQ2IgCcSM23bWeH3jgwBUr5cq2rtU1iXo2zWz69rXXfnpxnGPdt2ffV0NIl4yzba+2iTMPXn/dVc+OU/N9P3vkxpCqK8fZtk/bFDE+89nrrt47Ts0/vv/RT8VYfmKcbXu1TYxHr7/u6u/0qmbF9kpgtlfVTmmxZ8PgipTCjmlsr+7tvrqvsQK9NvhKve3maXMoQnWo7mmsQA9V9bkUwienzaAM4Xt1T2MFeg7zafz/EFN4oTYQ6NN2cneon6JDtSiFAAECBAgQaCkg0FvC2Y0AAQIECHRJQKB3aTbUQoAAAQIEWgoI9JZwdiNAgAABAl0SEOhdmg21ECBAgACBlgICvSWc3QgQIECAQJcEBHqXZkMtBAgQIECgpYBAbwlnNwIECBAg0CUBgd6l2VALAQIECBBoKSDQW8LZjQABAgQIdElAoHdpNtRCgAAB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IECAQJOAQG/SMUaAAAECBHoiINB7MlHKJECAAAECTQICvUnHGAECBAgQ6ImAQO/JRCmTAAECBAg0CQj0Jh1jBAgQIECgJwICvScTpUwCBAgQINAkINCbdIwRIECAAIGeCAj0nkyUMgkQIECAQJOAQG/SMUaAAAECBHoiINB7MlHKJECAAAECTQICvUnHGAECBAgQ6ImAQO/JRCmTAAECBAg0CQj0Jh1jBAgQIECgJwICvScTpUwCBAgQINAkINCbdIwRIECAAIGeCAj0nkyUMgkQIECAQJOAQG/SMUaAAAECBHoiMNuTOqe6zEvCpUfOhqXt09hk7m3cvoqY7gwpzo27fV+2q+Lc/Li1xlh8N6b08Ljb92W7FMIL49Y6k+IjVQiL427fm+1iONabWhVKgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECCwIQTi7t2739kQnWqSAAECBAhMscBsSmnzFPenNQIECBAgsCEEig3RpSYJECBAgMCUCwj0KZ9g7REgQIDAxhAQ6BtjnnVJgAABAlMuMFsUxd1T3qP2CBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQKAvAv8G55z1E2+GrwIAAAAASUVORK5CYII=',
  },
  DatePicker: {
    meta: {
      widgetName: 'DatePicker',
      title: '日期选择器',
      desc: '用于日期选择',
      props: {
        defaultValue: { type: 'string', desc: '日期默认显示值', defaultValue: 'undefined' },
        value: { type: 'string', desc: '日期显示值', defaultValue: 'undefined' },
        format: {
          type: 'string',
          desc: '用于指定输入框日期显示的格式',
          defaultValue: 'YYYY-MM-DD',
        },
        placeholder: { type: 'string', desc: 'input输入提示信息', defaultValue: 'undefined' },
        disabled: { type: 'boolean', desc: '禁用状态,是否不可用', defaultValue: 'false' },
        readOnly: { type: 'boolean', desc: '只读input', defaultValue: 'false' },
        selectToday: { type: 'boolean', desc: '是否默认选中今天日期', defaultValue: 'false' },
        showToday: {
          type: 'boolean | Object',
          desc: "是否展示'今天'按钮 | showToday={message:'XXX'} 可以指定按钮文本 ",
          defaultValue: 'false',
        },
        showTime: {
          type: 'boolean | Object',
          desc:
            "为组件增加时间选择功能 | showTime={message:{showTime:'XXX',showDate:'XXX'}} 可以指定按钮切换文本",
          defaultValue: 'false',
        },
        extraFooter: {
          type: 'Object',
          desc: "在面板中添加额外的页脚 extraFooter={message:'XXX',style:{...}}",
          defaultValue: '无',
        },
        buttonOptions: {
          type: 'Object',
          desc:
            '自定义页脚展示的一些按钮 buttonOptions={{options: { buttonNameXXX:自定义时间, buttonNameXXX:自定义时间}}} ',
          defaultValue: '无',
        },
        step: { type: 'number', desc: '设置周,年的展示步长', defaultValue: 'false' },
      },
      events: {
        onChange: {
          desc: '时间值发生变化时的回调',
          args: [{ name: 'event', desc: '时间值发生变化时的回调', type: 'ChangeType' }],
        },
        onOk: {
          desc:
            "点击确定按钮的回掉onOk={function()} | onOk={message:'XXX',Function:function()} 可指定onOk按钮显示的文本",
          args: [],
        },
        onFocus: { desc: '输入框获取焦点', args: [] },
        onBlur: { desc: '输入框失去焦点', args: [] },
      },
      type: { ChangeType: { newValue: 'string', oldValue: 'string', event: 'SyntheticEvent' } },
      childrenWidget: ['month', 'year', 'week', 'weeks', 'range'],
      category: ['数据录入'],
    },
    target: DatePicker,
    screenshot:
      'data:image/png;base64,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',
  },
  MonthPicker: {
    meta: {
      widgetName: 'MonthPicker',
      title: '月选择器',
      desc: '用于月份选择,',
      props: {
        defaultValue: { type: 'string', desc: '日期默认显示值', defaultValue: 'undefined' },
        value: { type: 'string', desc: '日期显示值', defaultValue: 'undefined' },
        format: { type: 'string', desc: '用于指定输入框日期显示的格式', defaultValue: 'YYYY-MM' },
        placeholder: { type: 'string', desc: 'input输入提示信息', defaultValue: 'undefined' },
        disabled: { type: 'boolean', desc: '禁用状态,是否不可用', defaultValue: 'false' },
        readOnly: { type: 'boolean', desc: '只读input', defaultValue: 'false' },
        extraFooter: {
          type: 'Object',
          desc: "在面板中添加额外的页脚 extraFooter={message:'XXX',style:{...}}",
          defaultValue: '无',
        },
      },
      events: {
        onChange: {
          desc: '时间值发生变化时的回调',
          args: [{ name: 'event', desc: '时间值发生变化时的回调', type: 'ChangeType' }],
        },
        onFocus: { desc: '输入框获取焦点', args: [] },
        onBlur: { desc: '输入框失去焦点', args: [] },
      },
      type: { ChangeType: { newValue: 'string', oldValue: 'string', event: 'SyntheticEvent' } },
      category: ['数据录入'],
      componentName: 'MonthPicker',
      needExport: true,
    },
    target: DatePicker.MonthPicker,
    screenshot:
      'data:image/png;base64,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',
  },
  YearPicker: {
    meta: {
      widgetName: 'YearPicker',
      title: '年选择器',
      desc: '用于年选择,',
      props: {
        defaultValue: { type: 'string', desc: '日期默认显示值', defaultValue: 'undefined' },
        value: { type: 'string', desc: '日期显示值', defaultValue: 'undefined' },
        format: { type: 'string', desc: '用于指定输入框日期显示的格式', defaultValue: 'YYYY' },
        placeholder: { type: 'string', desc: 'input输入提示信息', defaultValue: 'undefined' },
        disabled: { type: 'boolean', desc: '禁用状态,是否不可用', defaultValue: 'false' },
        readOnly: { type: 'boolean', desc: '只读input', defaultValue: 'false' },
        extraFooter: {
          type: 'Object',
          desc: "在面板中添加额外的页脚 extraFooter={message:'XXX',style:{...}}",
          defaultValue: '无',
        },
        step: { type: 'number', desc: '设置年的展示步长', defaultValue: 'false' },
      },
      events: {
        onChange: {
          desc: '时间值发生变化时的回调',
          args: [{ name: 'event', desc: '时间值发生变化时的回调', type: 'ChangeType' }],
        },
        onFocus: { desc: '输入框获取焦点', args: [] },
        onBlur: { desc: '输入框失去焦点', args: [] },
      },
      type: { ChangeType: { newValue: 'string', oldValue: 'string', event: 'SyntheticEvent' } },
      category: ['数据录入'],
      componentName: 'YearPicker',
      needExport: true,
    },
    target: DatePicker.YearPicker,
    screenshot:
      'data:image/png;base64,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',
  },
  WeekPicker: {
    meta: {
      widgetName: 'WeekPicker',
      title: '周选择器',
      desc: '用于周选择,',
      props: {
        defaultValue: { type: 'string', desc: '日期默认显示值', defaultValue: 'undefined' },
        value: { type: 'string', desc: '日期显示值', defaultValue: 'undefined' },
        format: { type: 'string', desc: '用于指定输入框日期显示的格式', defaultValue: 'YYYY-WW' },
        placeholder: { type: 'string', desc: 'input输入提示信息', defaultValue: 'undefined' },
        disabled: { type: 'boolean', desc: '禁用状态,是否不可用', defaultValue: 'false' },
        readOnly: { type: 'boolean', desc: '只读input', defaultValue: 'false' },
        selectToday: { type: 'boolean', desc: '是否默认选中今天日期', defaultValue: 'false' },
        showToday: {
          type: 'boolean | Object',
          desc: "是否展示'今天'按钮 | showToday={message:'XXX'} 可以指定按钮文本 ",
          defaultValue: 'false',
        },
        extraFooter: {
          type: 'Object',
          desc: "在面板中添加额外的页脚 extraFooter={message:'XXX',style:{...}}",
          defaultValue: '无',
        },
        buttonOptions: {
          type: 'Object',
          desc:
            '自定义页脚展示的一些按钮 buttonOptions={{options: { buttonNameXXX:自定义时间, buttonNameXXX:自定义时间}}} ',
          defaultValue: '无',
        },
        step: { type: 'number', desc: '设置周,年的展示步长', defaultValue: 'false' },
      },
      events: {
        onChange: {
          desc: '时间值发生变化时的回调',
          args: [{ name: 'event', desc: '时间值发生变化时的回调', type: 'ChangeType' }],
        },
        onOk: {
          desc:
            "点击确定按钮的回掉onOk={function()} | onOk={message:'XXX',Function:function()} 可指定onOk按钮显示的文本",
          args: [],
        },
        onFocus: { desc: '输入框获取焦点', args: [] },
        onBlur: { desc: '输入框失去焦点', args: [] },
      },
      type: { ChangeType: { newValue: 'string', oldValue: 'string', event: 'SyntheticEvent' } },
      category: ['数据录入'],
      componentName: 'WeekPicker',
      needExport: true,
    },
    target: DatePicker.WeekPicker,
    screenshot:
      'data:image/png;base64,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',
  },
  WeeksPicker: {
    meta: {
      widgetName: 'WeeksPicker',
      title: '周选择器',
      desc: '用于周选择,',
      props: {
        defaultValue: { type: 'string', desc: '日期默认显示值', defaultValue: 'undefined' },
        value: { type: 'string', desc: '日期显示值', defaultValue: 'undefined' },
        format: { type: 'string', desc: '用于指定输入框日期显示的格式', defaultValue: 'YYYY-WW' },
        placeholder: { type: 'string', desc: 'input输入提示信息', defaultValue: 'undefined' },
        disabled: { type: 'boolean', desc: '禁用状态,是否不可用', defaultValue: 'false' },
        readOnly: { type: 'boolean', desc: '只读input', defaultValue: 'false' },
        extraFooter: {
          type: 'Object',
          desc: "在面板中添加额外的页脚 extraFooter={message:'XXX',style:{...}}",
          defaultValue: '无',
        },
        step: { type: 'number', desc: '设置周,年的展示步长', defaultValue: 'false' },
      },
      events: {
        onChange: {
          desc: '时间值发生变化时的回调',
          args: [{ name: 'event', desc: '时间值发生变化时的回调', type: 'ChangeType' }],
        },
        onFocus: { desc: '输入框获取焦点', args: [] },
        onBlur: { desc: '输入框失去焦点', args: [] },
      },
      type: { ChangeType: { newValue: 'string', oldValue: 'string', event: 'SyntheticEvent' } },
      category: ['数据录入'],
      componentName: 'WeeksPicker',
      needExport: true,
    },
    target: DatePicker.WeeksPicker,
    screenshot:
      'data:image/png;base64,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',
  },
  RangePicker: {
    meta: {
      widgetName: 'RangePicker',
      title: '日期范围选择器',
      desc: '用于日期范围选择,',
      props: {
        defaultValue: { type: 'Array<string>', desc: '日期默认显示值', defaultValue: 'undefined' },
        value: { type: 'Array<string>', desc: '日期显示值', defaultValue: 'undefined' },
        format: {
          type: 'string',
          desc: '用于指定输入框日期显示的格式',
          defaultValue: 'YYYY-MM-DD',
        },
        placeholder: {
          type: 'Array<string>',
          desc: 'input输入提示信息',
          defaultValue: 'undefined',
        },
        disabled: { type: 'boolean', desc: '禁用状态,是否不可用', defaultValue: 'false' },
        readOnly: { type: 'boolean', desc: '只读input', defaultValue: 'false' },
        selectToday: { type: 'boolean', desc: '是否默认选中今天日期', defaultValue: 'false' },
        showToday: {
          type: 'boolean | Object',
          desc: "是否展示'今天'按钮 | showToday={message:'XXX'} 可以指定按钮文本 ",
          defaultValue: 'false',
        },
        showTime: {
          type: 'boolean | Object',
          desc:
            "为组件增加时间选择功能 | showTime={message:{showTime:'XXX',showDate:'XXX'}} 可以指定按钮切换文本",
          defaultValue: 'false',
        },
        extraFooter: {
          type: 'Object',
          desc: "在面板中添加额外的页脚 extraFooter={message:'XXX',style:{...}}",
          defaultValue: '无',
        },
        buttonOptions: {
          type: 'Object',
          desc:
            '自定义页脚展示的一些按钮 buttonOptions={{options: { buttonNameXXX:自定义时间, buttonNameXXX:自定义时间}}} ',
          defaultValue: '无',
        },
        step: { type: 'number', desc: '设置周,年的展示步长', defaultValue: 'false' },
      },
      events: {
        onChange: {
          desc: '时间值发生变化时的回调',
          args: [{ name: 'event', desc: '时间值发生变化时的回调', type: 'ChangeType' }],
        },
        onOk: {
          desc:
            "点击确定按钮的回掉onOk={function()} | onOk={message:'XXX',Function:function()} 可指定onOk按钮显示的文本",
          args: [],
        },
        onFocus: { desc: '输入框获取焦点', args: [] },
        onBlur: { desc: '输入框失去焦点', args: [] },
      },
      type: {
        ChangeType: {
          newValue: 'Array<string>',
          oldValue: 'Array<string>',
          event: 'SyntheticEvent',
        },
      },
      category: ['数据录入'],
      componentName: 'RangePicker',
      needExport: true,
    },
    target: DatePicker.RangePicker,
    screenshot:
      'data:image/png;base64,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',
  },
  Divider: {
    meta: {
      widgetName: 'Divider',
      title: '分割线',
      desc: '区隔内容的分割线',
      props: {
        viewClass: { type: 'string', desc: '用于配置通用主题属性', defaultValue: 'undefined' },
        position: {
          type: 'DividerPosition',
          desc: '分割线中显示内容的位置,与content 配合使用',
          defaultValue: 'undefined',
        },
        dashed: { type: 'boolean', desc: '分割线是否是虚线', defaultValue: 'false' },
        content: { type: 'string', desc: '分割线中可添加显示的内容', defaultValue: 'undefined' },
        type: {
          type: 'DividerType',
          desc: '分割线的风格 水平或者 垂直',
          defaultValue: 'horizontal',
        },
      },
      type: { DividerPosition: ['left', 'right'], DividerType: ['horizontal', 'vertical'] },
      category: ['其他'],
    },
    target: Divider,
    screenshot:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADYAAAAECAYAAADF98x7AAAAAXNSR0IArs4c6QAAAD9JREFUKBVjPHfunOe/f/9mMTAwyADxcABPmJiY0hjPnDnzGOib4eIpWMQ8YYKxhhsNjDWmNKCnngwjj4GTIgAlig6h5+7aEgAAAABJRU5ErkJggg==',
  },
  Drawer: {
    meta: {
      widgetName: 'Drawer',
      title: '抽屉',
      desc: '在屏幕边缘出现的浮层面板。',
      props: {
        placement: { type: 'PlacementType', desc: '抽屉的方向', defaultValue: 'right' },
        title: { type: 'React.node', desc: '抽屉的标题', defaultValue: 'undefined' },
        visible: { type: 'boolean', desc: '抽屉是否展示', defaultValue: 'undefined' },
        mask: { type: 'boolean', desc: '是否展示遮罩层', defaultValue: 'true' },
        maskClosable: { type: 'boolean', desc: '点击遮罩层是否允许关闭抽屉', defaultValue: 'true' },
        closable: { type: 'boolean', desc: '是否展示抽屉右上角关闭按钮', defaultValue: 'false' },
      },
      events: { onClose: { desc: '抽屉关闭时的回调', args: [] } },
      type: {
        PlacementType: ['top', 'right', 'left', 'bottom'],
        DrawerStyle: {
          width: { type: 'number', desc: 'Drawer的宽度' },
          height: { type: 'number', desc: 'Drawer的高度，在 placement 为 top 或 bottom 时使用' },
        },
      },
      category: ['反馈'],
    },
    target: Drawer,
    screenshot:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADUAAAAoCAYAAABerrI1AAAAAXNSR0IArs4c6QAAAilJREFUaAXtmM1LG0EYxp/Nxg9spcWkxVStFUkQkSIhByk9SYpQPHnw0IP/nBQRkVJaEKsEDxKVBttSPLQSgriWYBrNhyabr40zU1wkcRMWTGcis4fMvJN3Mu/veWZ2lyiRSKSKe3Y5KU8gEFB4c8Xj8TsRV9M0OHjDtGJ9CdUKVVvxm8I5lb3I4TKnM9ZSqYzkeQZ6oYhU+sLk/3uWRrlcMePajnBQ6ewlFlfWkc8XsBbaw8GvGKpGFcsfQ9D+JPDt529sbH2Fw2FdOrv71ZLyjAc9TzA54cXSh010d3Vi9s0rAqDgbXCKQO7CIIDv5oJszKpOa1yrGf9h3DsygLNUFqOkpUD08jx1sdbd9wi9D3tY3+pDOCh6Vj5v7GD6tZ9stUMkkilWe2h7Hy+G+kHP2Y+DqBUPGxdu+22Fv4O64X/pw4Oebnz6EsaUfxzHJ6dYmJ9BLq/j/eomBjxulncbnUJfk+QbxW3SCDYm3JkqFkumRAXSbxabyTc6wp2pDHlO5fUCOjuc7PbdQdpGsafffQPnX1c4p9yux9AJ1HkqA1pws7iOiAwI55RhGGTLFQFFQaVi0KZhrKr1vggHFY1pGB56BtWp4jB6BFVVG8ZjvpE6s4SD8o4+N4usLbhZfD2x3rvrb9q4lVDtYp50SjrFUQG5/TiKb2tp6ZQtuTgmS6c4im9raemULbk4JkunOIpva2nplC25OCZLpziKb2tp9l+6rRltkHwFZ9nVoB1yH58AAAAASUVORK5CYII=',
  },
  Dropmenu: {
    meta: {
      widgetName: 'Dropmenu',
      title: '下拉菜单',
      desc: '选项过多时，弹出下拉菜单给用户选择操作',
      props: {
        action: { type: 'click | hover', desc: '弹出项的打开方式', defaultValue: 'click' },
        hideAction: { type: 'click | hover', desc: '弹出项的隐藏方式', defaultValue: 'click' },
        menus: { type: 'React.Node', desc: '弹出项组件', defaultValue: 'undefined' },
        align: {
          type: 'React.Node',
          desc: '弹出方向',
          defaultValue: "'topLeft | top | topRight | bottomLeft | bottom | bottomRight'",
        },
      },
      events: {
        onPopupVisibleChange: {
          desc: '弹出项展开/隐藏时触发',
          args: [{ name: 'popupVisible', desc: '展开/隐藏时的popupVisible值', type: 'boolean' }],
        },
      },
      childrenWidget: ['dropmenuButton'],
      category: ['数据录入'],
    },
    target: Dropmenu,
    screenshot:
      'data:image/png;base64,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',
  },
  Grid: {
    meta: {
      widgetName: 'Grid',
      title: '栅格',
      desc: '栅格',
      childrenWidget: ['col', 'row'],
      category: ['布局'],
      empty: true,
    },
    target: Grid,
    screenshot:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAABSxJREFUWAntmW1oW1UYx885N0k32VhhtMV184tSdOqGOPDl20Anio6kUttMk/Vlggzm+yar+EnmsBR8Ke5DcetLdEkNa7oNqlN8QfTDxE0GG61BFMFVwblRtFmTm3uO/+cmd7vGm9zEJGUfvJDec859Xn73PM957rm3nOWPjif6bsrqmVcUY3dhqA0/bl1bojNcsyScnvR4fa/G3zv4A/k1IfzB7UEm1buMqeuWCMbFDU8xwXdMRceinGZO1/UzBMc5/5BxbZALLekzpHSxUtPLGU0IJY02powXlVIPYu5SXq93o4fCCk8mXCI2/lBNvVZu7BeofBboCk8TJLGJfM4BWBus3F6dNPIsxCbgghYEo7DWyV3FZm0sbQRoLpSlzrlS1DYWToDX9PE/YLXh8ZRjoLe3d+V8Sq0Xy9mP8ZGR38vRqUbG8GU5S+cslAQMhPpuY7o+fHFBvxvi3EgxhhqVVIrvmpoY+7gaiHJ1i+agv3P7FpbJnELBvIeMcc6oiGbRR1mSJ/yd4WfKdVKNnCNgd3d3I2fqEAqlD4+/Y97l2ppELLJupa+lEaBv5B2+3vF4z/pqnJej6wg4n1FbFVOtMPD92qZVj8VHR38jY5HI4AJAnydoPLsbstLoK8dJNTKOgMpQm8goQKaGhoby6XrVjeI8ZvYkM+WuXql9y3GRcI5MQ3zxx3FPKDBubnWQB5UgdfT0NBmXjSehe6tg6mfOxftHomPnStlwnEEmxClSwgz6kY/LCg1IpbpoDJzfFl4r1n90W/i+bMo4B919UNwmFdsrpTzdHgzvKqZD446AnhUNR2nV0oqdX5Txrq7eNSRM9TDQFXoLzUcAv8iZPEjjbgdVBOwujyOvmxCS00KIl6CDPvNJqd4OdIZ3F7PhCBgfHp7H9qsXc5gG5MOLSj8PsLlLC/olhP5pGEMasj2JichMMcPWeCDYfT9S5ijsIBJ8em1z472T0bGBqYnIVsHZfpID+EAxSEdAUkpERz/RBL8TM/UVfogMux53rKE9q2l8y2R0fIjkSh0Ex5Q8ZsGta17Vbl90k7FIvxsk93eGzERfxr2tsdihOSeHHTt3rpAX/7xZ+vhPifHxP5xkCsfc4OzyeDrtw0300xhnfI+ngR3W04oeDMxxFdMF+xE/cOAv9MteEJXAkR+8arwMSKoa/RRuPS2Q87kCUTTEdsBK2pXCWbYJEunzWq4vn7XGawr4X+EsmH9C5kZrBmhuLkosCAvC7UyQ1sIh2bJyMBAOr2a6thHVf+5IdHS20AnB2UtJ4WotlHfraz7+jkyrvSTnOoPtwdALKs3OK5n91JDGDLZZHwVCTzVbTiistYSz7FrnkjMYCIYHUOlR5RXtB39FEWjBSnuA6akvgsEdmxdZdkOpOmc5qeZcdAYJTplwwOJiNwpzq+B8AzpzgLxlUWW+rjcc3ZgjoB1OCPZcIjY2iBKgaOfBFduch7wRoPT4OlFtzpWa4X8BFsJNRiNv2g0kJsaTFiSNI/Q3XLhwudEuU8v2FUB6k3KDsxzbIfPh/hw52WJdr/asZTy5xwgMXQHUM2y/lXMU1sKZK3RaT0jztTPvkABztEqFaKwcuLwuqxekYfisnbwiwKTlsBI4S6cekOaHzJyDpECWf2O2Of/OLawWVOG55pD4yko+MI0na/oJOMtkm6HkFLZMq1CWZpA8/gbuoa2a61HsE7AZ62v5I7pGtzZ79szZ2+/Y9AFiT/WM3uJW42clKppLctBipX9DTHu9vuDk4ZEvyevf3jHHr14uq9EAAAAASUVORK5CYII=',
  },
  Col: {
    meta: {
      widgetName: 'Col',
      title: '栅格',
      desc: '栅格。',
      props: {
        span: { type: 'number', desc: '栅格占位格数，共 24格', defaultValue: '1' },
        offset: {
          type: 'number',
          desc: '栅格左侧的间隔格数，间隔内不可以有栅格',
          defaultValue: 'undefined',
        },
        pull: { type: 'number', desc: '栅格向左移动格数', defaultValue: 'undefined' },
        push: { type: 'number', desc: '栅格向右移动格数', defaultValue: 'undefined' },
        order: { type: 'number', desc: '栅格的顺序，flex 布局下有效', defaultValue: 'undefined' },
      },
      category: ['布局'],
      componentName: 'Col',
      needExport: true,
    },
    target: Grid.Col,
    screenshot:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAABSxJREFUWAntmW1oW1UYx885N0k32VhhtMV184tSdOqGOPDl20Anio6kUttMk/Vlggzm+yar+EnmsBR8Ke5DcetLdEkNa7oNqlN8QfTDxE0GG61BFMFVwblRtFmTm3uO/+cmd7vGm9zEJGUfvJDec859Xn73PM957rm3nOWPjif6bsrqmVcUY3dhqA0/bl1bojNcsyScnvR4fa/G3zv4A/k1IfzB7UEm1buMqeuWCMbFDU8xwXdMRceinGZO1/UzBMc5/5BxbZALLekzpHSxUtPLGU0IJY02powXlVIPYu5SXq93o4fCCk8mXCI2/lBNvVZu7BeofBboCk8TJLGJfM4BWBus3F6dNPIsxCbgghYEo7DWyV3FZm0sbQRoLpSlzrlS1DYWToDX9PE/YLXh8ZRjoLe3d+V8Sq0Xy9mP8ZGR38vRqUbG8GU5S+cslAQMhPpuY7o+fHFBvxvi3EgxhhqVVIrvmpoY+7gaiHJ1i+agv3P7FpbJnELBvIeMcc6oiGbRR1mSJ/yd4WfKdVKNnCNgd3d3I2fqEAqlD4+/Y97l2ppELLJupa+lEaBv5B2+3vF4z/pqnJej6wg4n1FbFVOtMPD92qZVj8VHR38jY5HI4AJAnydoPLsbstLoK8dJNTKOgMpQm8goQKaGhoby6XrVjeI8ZvYkM+WuXql9y3GRcI5MQ3zxx3FPKDBubnWQB5UgdfT0NBmXjSehe6tg6mfOxftHomPnStlwnEEmxClSwgz6kY/LCg1IpbpoDJzfFl4r1n90W/i+bMo4B919UNwmFdsrpTzdHgzvKqZD446AnhUNR2nV0oqdX5Txrq7eNSRM9TDQFXoLzUcAv8iZPEjjbgdVBOwujyOvmxCS00KIl6CDPvNJqd4OdIZ3F7PhCBgfHp7H9qsXc5gG5MOLSj8PsLlLC/olhP5pGEMasj2JichMMcPWeCDYfT9S5ijsIBJ8em1z472T0bGBqYnIVsHZfpID+EAxSEdAUkpERz/RBL8TM/UVfogMux53rKE9q2l8y2R0fIjkSh0Ex5Q8ZsGta17Vbl90k7FIvxsk93eGzERfxr2tsdihOSeHHTt3rpAX/7xZ+vhPifHxP5xkCsfc4OzyeDrtw0300xhnfI+ngR3W04oeDMxxFdMF+xE/cOAv9MteEJXAkR+8arwMSKoa/RRuPS2Q87kCUTTEdsBK2pXCWbYJEunzWq4vn7XGawr4X+EsmH9C5kZrBmhuLkosCAvC7UyQ1sIh2bJyMBAOr2a6thHVf+5IdHS20AnB2UtJ4WotlHfraz7+jkyrvSTnOoPtwdALKs3OK5n91JDGDLZZHwVCTzVbTiistYSz7FrnkjMYCIYHUOlR5RXtB39FEWjBSnuA6akvgsEdmxdZdkOpOmc5qeZcdAYJTplwwOJiNwpzq+B8AzpzgLxlUWW+rjcc3ZgjoB1OCPZcIjY2iBKgaOfBFduch7wRoPT4OlFtzpWa4X8BFsJNRiNv2g0kJsaTFiSNI/Q3XLhwudEuU8v2FUB6k3KDsxzbIfPh/hw52WJdr/asZTy5xwgMXQHUM2y/lXMU1sKZK3RaT0jztTPvkABztEqFaKwcuLwuqxekYfisnbwiwKTlsBI4S6cekOaHzJyDpECWf2O2Of/OLawWVOG55pD4yko+MI0na/oJOMtkm6HkFLZMq1CWZpA8/gbuoa2a61HsE7AZ62v5I7pGtzZ79szZ2+/Y9AFiT/WM3uJW42clKppLctBipX9DTHu9vuDk4ZEvyevf3jHHr14uq9EAAAAASUVORK5CYII=',
  },
  Row: {
    meta: {
      widgetName: 'Row',
      title: '栅格',
      desc: '栅格。',
      props: {
        type: { type: 'RowType', desc: '布局方式，可设为 flex 或不设', defaultValue: 'undefined' },
        justify: {
          type: 'JustifyType',
          desc: 'flex 布局下的水平排列方式，可设置为 start、end、center、spaceAround、spaceBetween',
          defaultValue: 'undefined',
        },
        align: {
          type: 'AlignType',
          desc: 'flex 布局下的垂直排列方式，可设置为 top、middle、bottom',
          defaultValue: 'undefined',
        },
        gutter: {
          type: 'number | Object',
          desc: '栅格之间的间隔，可写为 number 格式 或支持响应式 对象写法：{xs: 8,sm: 16,md: 24}',
          defaultValue: 'undefined',
        },
        data: {
          type: 'Object[]',
          desc: '指定栅格 data 属性，仅用于设计器',
          defaultValue: 'undefined',
          designOnly: true,
        },
      },
      type: {
        RowType: ['flex', 'default'],
        JustifyType: ['start', 'end', 'center', 'spaceAround', 'spaceBetween'],
        AlignType: ['top', 'middle', 'bottom'],
      },
      category: ['布局'],
      componentName: 'Row',
      needExport: true,
    },
    target: Grid.Row,
    screenshot:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAABSxJREFUWAntmW1oW1UYx885N0k32VhhtMV184tSdOqGOPDl20Anio6kUttMk/Vlggzm+yar+EnmsBR8Ke5DcetLdEkNa7oNqlN8QfTDxE0GG61BFMFVwblRtFmTm3uO/+cmd7vGm9zEJGUfvJDec859Xn73PM957rm3nOWPjif6bsrqmVcUY3dhqA0/bl1bojNcsyScnvR4fa/G3zv4A/k1IfzB7UEm1buMqeuWCMbFDU8xwXdMRceinGZO1/UzBMc5/5BxbZALLekzpHSxUtPLGU0IJY02powXlVIPYu5SXq93o4fCCk8mXCI2/lBNvVZu7BeofBboCk8TJLGJfM4BWBus3F6dNPIsxCbgghYEo7DWyV3FZm0sbQRoLpSlzrlS1DYWToDX9PE/YLXh8ZRjoLe3d+V8Sq0Xy9mP8ZGR38vRqUbG8GU5S+cslAQMhPpuY7o+fHFBvxvi3EgxhhqVVIrvmpoY+7gaiHJ1i+agv3P7FpbJnELBvIeMcc6oiGbRR1mSJ/yd4WfKdVKNnCNgd3d3I2fqEAqlD4+/Y97l2ppELLJupa+lEaBv5B2+3vF4z/pqnJej6wg4n1FbFVOtMPD92qZVj8VHR38jY5HI4AJAnydoPLsbstLoK8dJNTKOgMpQm8goQKaGhoby6XrVjeI8ZvYkM+WuXql9y3GRcI5MQ3zxx3FPKDBubnWQB5UgdfT0NBmXjSehe6tg6mfOxftHomPnStlwnEEmxClSwgz6kY/LCg1IpbpoDJzfFl4r1n90W/i+bMo4B919UNwmFdsrpTzdHgzvKqZD446AnhUNR2nV0oqdX5Txrq7eNSRM9TDQFXoLzUcAv8iZPEjjbgdVBOwujyOvmxCS00KIl6CDPvNJqd4OdIZ3F7PhCBgfHp7H9qsXc5gG5MOLSj8PsLlLC/olhP5pGEMasj2JichMMcPWeCDYfT9S5ijsIBJ8em1z472T0bGBqYnIVsHZfpID+EAxSEdAUkpERz/RBL8TM/UVfogMux53rKE9q2l8y2R0fIjkSh0Ex5Q8ZsGta17Vbl90k7FIvxsk93eGzERfxr2tsdihOSeHHTt3rpAX/7xZ+vhPifHxP5xkCsfc4OzyeDrtw0300xhnfI+ngR3W04oeDMxxFdMF+xE/cOAv9MteEJXAkR+8arwMSKoa/RRuPS2Q87kCUTTEdsBK2pXCWbYJEunzWq4vn7XGawr4X+EsmH9C5kZrBmhuLkosCAvC7UyQ1sIh2bJyMBAOr2a6thHVf+5IdHS20AnB2UtJ4WotlHfraz7+jkyrvSTnOoPtwdALKs3OK5n91JDGDLZZHwVCTzVbTiistYSz7FrnkjMYCIYHUOlR5RXtB39FEWjBSnuA6akvgsEdmxdZdkOpOmc5qeZcdAYJTplwwOJiNwpzq+B8AzpzgLxlUWW+rjcc3ZgjoB1OCPZcIjY2iBKgaOfBFduch7wRoPT4OlFtzpWa4X8BFsJNRiNv2g0kJsaTFiSNI/Q3XLhwudEuU8v2FUB6k3KDsxzbIfPh/hw52WJdr/asZTy5xwgMXQHUM2y/lXMU1sKZK3RaT0jztTPvkABztEqFaKwcuLwuqxekYfisnbwiwKTlsBI4S6cekOaHzJyDpECWf2O2Of/OLawWVOG55pD4yko+MI0na/oJOMtkm6HkFLZMq1CWZpA8/gbuoa2a61HsE7AZ62v5I7pGtzZ79szZ2+/Y9AFiT/WM3uJW42clKppLctBipX9DTHu9vuDk4ZEvyevf3jHHr14uq9EAAAAASUVORK5CYII=',
  },
  Icon: {
    meta: {
      widgetName: 'Icon',
      title: '图标',
      desc: '语义化的矢量图形',
      props: {
        viewClass: { type: 'string', desc: '用于配置通用主题属性', defaultValue: 'undefined' },
        iconClass: {
          type: 'string',
          desc: '图标资源,需从图标库中获取.',
          defaultValue: 'undefined',
        },
      },
      events: {
        onClick: {
          desc: '点击按钮时触发',
          args: [{ name: 'event', desc: '点击的DOM事件', type: 'Object' }],
        },
      },
      category: ['通用'],
    },
    target: Icon,
    screenshot:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAABSxJREFUWAntmW1oW1UYx885N0k32VhhtMV184tSdOqGOPDl20Anio6kUttMk/Vlggzm+yar+EnmsBR8Ke5DcetLdEkNa7oNqlN8QfTDxE0GG61BFMFVwblRtFmTm3uO/+cmd7vGm9zEJGUfvJDec859Xn73PM957rm3nOWPjif6bsrqmVcUY3dhqA0/bl1bojNcsyScnvR4fa/G3zv4A/k1IfzB7UEm1buMqeuWCMbFDU8xwXdMRceinGZO1/UzBMc5/5BxbZALLekzpHSxUtPLGU0IJY02powXlVIPYu5SXq93o4fCCk8mXCI2/lBNvVZu7BeofBboCk8TJLGJfM4BWBus3F6dNPIsxCbgghYEo7DWyV3FZm0sbQRoLpSlzrlS1DYWToDX9PE/YLXh8ZRjoLe3d+V8Sq0Xy9mP8ZGR38vRqUbG8GU5S+cslAQMhPpuY7o+fHFBvxvi3EgxhhqVVIrvmpoY+7gaiHJ1i+agv3P7FpbJnELBvIeMcc6oiGbRR1mSJ/yd4WfKdVKNnCNgd3d3I2fqEAqlD4+/Y97l2ppELLJupa+lEaBv5B2+3vF4z/pqnJej6wg4n1FbFVOtMPD92qZVj8VHR38jY5HI4AJAnydoPLsbstLoK8dJNTKOgMpQm8goQKaGhoby6XrVjeI8ZvYkM+WuXql9y3GRcI5MQ3zxx3FPKDBubnWQB5UgdfT0NBmXjSehe6tg6mfOxftHomPnStlwnEEmxClSwgz6kY/LCg1IpbpoDJzfFl4r1n90W/i+bMo4B919UNwmFdsrpTzdHgzvKqZD446AnhUNR2nV0oqdX5Txrq7eNSRM9TDQFXoLzUcAv8iZPEjjbgdVBOwujyOvmxCS00KIl6CDPvNJqd4OdIZ3F7PhCBgfHp7H9qsXc5gG5MOLSj8PsLlLC/olhP5pGEMasj2JichMMcPWeCDYfT9S5ijsIBJ8em1z472T0bGBqYnIVsHZfpID+EAxSEdAUkpERz/RBL8TM/UVfogMux53rKE9q2l8y2R0fIjkSh0Ex5Q8ZsGta17Vbl90k7FIvxsk93eGzERfxr2tsdihOSeHHTt3rpAX/7xZ+vhPifHxP5xkCsfc4OzyeDrtw0300xhnfI+ngR3W04oeDMxxFdMF+xE/cOAv9MteEJXAkR+8arwMSKoa/RRuPS2Q87kCUTTEdsBK2pXCWbYJEunzWq4vn7XGawr4X+EsmH9C5kZrBmhuLkosCAvC7UyQ1sIh2bJyMBAOr2a6thHVf+5IdHS20AnB2UtJ4WotlHfraz7+jkyrvSTnOoPtwdALKs3OK5n91JDGDLZZHwVCTzVbTiistYSz7FrnkjMYCIYHUOlR5RXtB39FEWjBSnuA6akvgsEdmxdZdkOpOmc5qeZcdAYJTplwwOJiNwpzq+B8AzpzgLxlUWW+rjcc3ZgjoB1OCPZcIjY2iBKgaOfBFduch7wRoPT4OlFtzpWa4X8BFsJNRiNv2g0kJsaTFiSNI/Q3XLhwudEuU8v2FUB6k3KDsxzbIfPh/hw52WJdr/asZTy5xwgMXQHUM2y/lXMU1sKZK3RaT0jztTPvkABztEqFaKwcuLwuqxekYfisnbwiwKTlsBI4S6cekOaHzJyDpECWf2O2Of/OLawWVOG55pD4yko+MI0na/oJOMtkm6HkFLZMq1CWZpA8/gbuoa2a61HsE7AZ62v5I7pGtzZ79szZ2+/Y9AFiT/WM3uJW42clKppLctBipX9DTHu9vuDk4ZEvyevf3jHHr14uq9EAAAAASUVORK5CYII=',
  },
  Input: {
    meta: {
      widgetName: 'Input',
      title: '文本输入框',
      desc: '常用于昵称,名称,表格内容等填写.',
      props: {
        disabled: { type: 'boolean', desc: '禁用状态,是否不可用', defaultValue: 'false' },
        viewClass: { type: 'string', desc: '用于配置通用主题属性', defaultValue: 'undefined' },
        size: {
          type: 'InputSize',
          desc: "可配置三种尺寸大小的input ('大' , '默认' , '小'),高度分别为 40px、32px 和 24px。",
          defaultValue: 'default',
        },
        validateStatus: {
          type: 'ValidateStatus',
          desc: "input校验状态, 'success' 成功 | 'error'错误",
          defaultValue: 'success',
        },
        validateType: {
          type: 'InputValidateType',
          desc: "input校验信息显示类型, 'top' | 'bottom' | 'inner' | 'default'",
          defaultValue: 'default',
        },
        help: { type: 'string', desc: 'input校验提示信息', defaultValue: 'undefined' },
        placeholder: { type: 'string', desc: 'input输入提示信息', defaultValue: 'undefined' },
        prefix: { type: 'React$Element<any>', desc: '带有前缀的 input', defaultValue: 'undefined' },
        suffix: { type: 'React$Element<any>', desc: '带有后缀的 input', defaultValue: 'undefined' },
        defaultValue: { type: 'string', desc: '默认显示内容', defaultValue: 'undefined' },
        value: { type: 'string', desc: '显示内容', defaultValue: 'undefined' },
        formatter: {
          type: 'function',
          desc: '格式化显示内容的匹配规则,需与 parser 属性配套使用',
          defaultValue: 'undefined',
        },
        parser: {
          type: 'function',
          desc: '解析格式化显示内容的规则,需与 formatter 属性配套使用',
          defaultValue: 'undefined',
        },
        readOnly: { type: 'boolean', desc: '只读input', defaultValue: 'false' },
        autoFocus: { type: 'boolean', desc: '是否自动获取焦点', defaultValue: 'false' },
        type: { type: 'string', desc: 'input类型', defaultValue: 'text' },
      },
      events: {
        onClick: {
          desc: '点击输入框时触发',
          args: [{ name: 'event', desc: '点击的DOM事件', type: 'SyntheticEvent' }],
        },
        onChange: {
          desc: '内容改变时触发',
          args: [{ name: 'event', desc: '改变内容的DOM事件', type: 'ChangeType' }],
        },
        onKeyUp: {
          desc: '键盘按下去并松开后执行',
          args: [{ name: 'event', desc: '改变键盘输入的内容', type: 'KeyboardEvent' }],
        },
        onKeyDown: {
          desc: '键盘按下任何键时触发',
          args: [{ name: 'event', desc: '改变键盘输入的内容', type: 'KeyboardEvent' }],
        },
        onKeyPress: {
          desc: '键盘按下任何键时触发',
          args: [{ name: 'event', desc: '改变键盘输入的内容', type: 'KeyboardEvent' }],
        },
        onFocus: {
          desc: '输入框获得焦点时触发',
          args: [{ name: 'event', desc: '获取焦点的DOM事件', type: 'FocusEvent' }],
        },
        onBlur: {
          desc: '输入框失去焦点时触发',
          args: [{ name: 'event', desc: '失去焦点的DOM事件', type: 'FocusEvent' }],
        },
        onClear: {
          desc: '清除输入框内容时触发',
          args: [{ name: 'event', desc: '清除输入框内容事件', type: 'Object' }],
        },
        onEnter: {
          desc: '当键入回车时触发事件',
          args: [{ name: 'event', desc: '当键入回车时触发', type: 'KeyboardEvent' }],
        },
      },
      type: {
        InputSize: ['small', 'default', 'large'],
        ValidateStatus: ['success', 'error'],
        InputValidateType: ['top', 'bottom', 'inner', 'default'],
        ChangeType: { newValue: 'string', oldValue: 'string', event: 'SyntheticEvent' },
      },
      category: ['数据录入'],
    },
    target: Input,
    screenshot:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAUCAYAAADLP76nAAAAAXNSR0IArs4c6QAAAU5JREFUSA1jnDVrlicDA8Os////ywDpIQMYGRmfAB2bxgIkZgE56WlpaduGjOuBDp05c6Y30N2zQIz/Q8nhyG4FuZ0JWWAosrF6YMaMGbeGimewegCYoVWHtAeGiuNB7gSVQjjB5cuXZf/9+/dOX1//6+3bt9m/fPkiycLC8pcYMUNDwwc4DaaiBNYkBDP/169fCn/+/FkM4n/69Gky0OGGxIrBzKA1jdcDxsbGh4H54dTZs2fXAB3yFchfT6wYrR0OMx+vB0CKgJUFyPE+QLwSxAcBYsUgqmlL4vUAKN0DY2A2ENsDcTeQz0esGG2djTAdrweA6b4HGNpzTUxMTgK1NAP5s4gVQ1hBYxa2psT06dOHRPMCZ1MCGOq3aRxuVDMeaxLKyMhQo5oNNDYIqwdobCdVjR/6HgCm9yfAzOBN1WChg2EgN4PczjjUu5QAz3PtkbDlO/YAAAAASUVORK5CYII=',
  },
  Layout: {
    meta: {
      widgetName: 'Layout',
      title: '布局',
      desc: '页面整体布局。',
      props: {
        direction: {
          type: 'LayoutDirectionType',
          desc: '指定Layout嵌套组件排列顺序，row 横向排列，column 纵向排列',
          defaultValue: 'column',
        },
        needEnlarge: {
          type: 'boolean',
          desc: '指定Layout嵌套组件中是否有被放大元素',
          defaultValue: 'undefined',
        },
      },
      type: {
        LayoutDirectionType: ['row', 'column'],
        LayoutStyle: {
          width: { type: 'number', desc: 'Layout 宽度' },
          margin: { type: 'number | Object', desc: 'Layout 间距' },
        },
      },
      childrenWidget: ['aside'],
      category: ['布局'],
    },
    target: Layout,
    screenshot:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAABSxJREFUWAntmW1oW1UYx885N0k32VhhtMV184tSdOqGOPDl20Anio6kUttMk/Vlggzm+yar+EnmsBR8Ke5DcetLdEkNa7oNqlN8QfTDxE0GG61BFMFVwblRtFmTm3uO/+cmd7vGm9zEJGUfvJDec859Xn73PM957rm3nOWPjif6bsrqmVcUY3dhqA0/bl1bojNcsyScnvR4fa/G3zv4A/k1IfzB7UEm1buMqeuWCMbFDU8xwXdMRceinGZO1/UzBMc5/5BxbZALLekzpHSxUtPLGU0IJY02powXlVIPYu5SXq93o4fCCk8mXCI2/lBNvVZu7BeofBboCk8TJLGJfM4BWBus3F6dNPIsxCbgghYEo7DWyV3FZm0sbQRoLpSlzrlS1DYWToDX9PE/YLXh8ZRjoLe3d+V8Sq0Xy9mP8ZGR38vRqUbG8GU5S+cslAQMhPpuY7o+fHFBvxvi3EgxhhqVVIrvmpoY+7gaiHJ1i+agv3P7FpbJnELBvIeMcc6oiGbRR1mSJ/yd4WfKdVKNnCNgd3d3I2fqEAqlD4+/Y97l2ppELLJupa+lEaBv5B2+3vF4z/pqnJej6wg4n1FbFVOtMPD92qZVj8VHR38jY5HI4AJAnydoPLsbstLoK8dJNTKOgMpQm8goQKaGhoby6XrVjeI8ZvYkM+WuXql9y3GRcI5MQ3zxx3FPKDBubnWQB5UgdfT0NBmXjSehe6tg6mfOxftHomPnStlwnEEmxClSwgz6kY/LCg1IpbpoDJzfFl4r1n90W/i+bMo4B919UNwmFdsrpTzdHgzvKqZD446AnhUNR2nV0oqdX5Txrq7eNSRM9TDQFXoLzUcAv8iZPEjjbgdVBOwujyOvmxCS00KIl6CDPvNJqd4OdIZ3F7PhCBgfHp7H9qsXc5gG5MOLSj8PsLlLC/olhP5pGEMasj2JichMMcPWeCDYfT9S5ijsIBJ8em1z472T0bGBqYnIVsHZfpID+EAxSEdAUkpERz/RBL8TM/UVfogMux53rKE9q2l8y2R0fIjkSh0Ex5Q8ZsGta17Vbl90k7FIvxsk93eGzERfxr2tsdihOSeHHTt3rpAX/7xZ+vhPifHxP5xkCsfc4OzyeDrtw0300xhnfI+ngR3W04oeDMxxFdMF+xE/cOAv9MteEJXAkR+8arwMSKoa/RRuPS2Q87kCUTTEdsBK2pXCWbYJEunzWq4vn7XGawr4X+EsmH9C5kZrBmhuLkosCAvC7UyQ1sIh2bJyMBAOr2a6thHVf+5IdHS20AnB2UtJ4WotlHfraz7+jkyrvSTnOoPtwdALKs3OK5n91JDGDLZZHwVCTzVbTiistYSz7FrnkjMYCIYHUOlR5RXtB39FEWjBSnuA6akvgsEdmxdZdkOpOmc5qeZcdAYJTplwwOJiNwpzq+B8AzpzgLxlUWW+rjcc3ZgjoB1OCPZcIjY2iBKgaOfBFduch7wRoPT4OlFtzpWa4X8BFsJNRiNv2g0kJsaTFiSNI/Q3XLhwudEuU8v2FUB6k3KDsxzbIfPh/hw52WJdr/asZTy5xwgMXQHUM2y/lXMU1sKZK3RaT0jztTPvkABztEqFaKwcuLwuqxekYfisnbwiwKTlsBI4S6cekOaHzJyDpECWf2O2Of/OLawWVOG55pD4yko+MI0na/oJOMtkm6HkFLZMq1CWZpA8/gbuoa2a61HsE7AZ62v5I7pGtzZ79szZ2+/Y9AFiT/WM3uJW42clKppLctBipX9DTHu9vuDk4ZEvyevf3jHHr14uq9EAAAAASUVORK5CYII=',
  },
  Aside: {
    meta: {
      widgetName: 'Aside',
      title: '侧边栏',
      desc: '页面整体布局-侧边栏。',
      props: {
        collapsible: { type: 'boolean', desc: '指定 Aside 是否可以收起', defaultValue: 'column' },
        trigger: { type: 'React.node', desc: '指定 Aside 收起元素', defaultValue: 'undefined' },
        reverseArrow: {
          type: 'string',
          desc: '触发响应式的断点，可选 xs、sm、md、lg、xl、xxl',
          defaultValue: 'undefined',
        },
        collapsedWidth: { type: 'number', desc: '收缩宽度', defaultValue: 'undefined' },
        collapsed: { type: 'boolean', desc: '当前收缩状态', defaultValue: 'undefined' },
      },
      type: {
        LayoutDirectionType: ['row', 'column'],
        AsideStyle: {
          height: { type: 'number', desc: 'Aside 高度' },
          backgroundColor: { type: 'string', desc: 'Aside 背景色' },
        },
      },
      events: {
        onCollapse: {
          desc: '展开-收起时的回调函数',
          args: [{ name: 'collapsed', desc: '收起状态', type: 'boolean' }],
        },
        onBreakpoint: {
          desc: '触发响应式时的回调函数',
          args: [{ name: 'broken', desc: '收起状态', type: 'boolean' }],
        },
      },
      category: ['布局'],
      needExport: true,
    },
    target: Layout.undefined,
    screenshot:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAABSxJREFUWAntmW1oW1UYx885N0k32VhhtMV184tSdOqGOPDl20Anio6kUttMk/Vlggzm+yar+EnmsBR8Ke5DcetLdEkNa7oNqlN8QfTDxE0GG61BFMFVwblRtFmTm3uO/+cmd7vGm9zEJGUfvJDec859Xn73PM957rm3nOWPjif6bsrqmVcUY3dhqA0/bl1bojNcsyScnvR4fa/G3zv4A/k1IfzB7UEm1buMqeuWCMbFDU8xwXdMRceinGZO1/UzBMc5/5BxbZALLekzpHSxUtPLGU0IJY02powXlVIPYu5SXq93o4fCCk8mXCI2/lBNvVZu7BeofBboCk8TJLGJfM4BWBus3F6dNPIsxCbgghYEo7DWyV3FZm0sbQRoLpSlzrlS1DYWToDX9PE/YLXh8ZRjoLe3d+V8Sq0Xy9mP8ZGR38vRqUbG8GU5S+cslAQMhPpuY7o+fHFBvxvi3EgxhhqVVIrvmpoY+7gaiHJ1i+agv3P7FpbJnELBvIeMcc6oiGbRR1mSJ/yd4WfKdVKNnCNgd3d3I2fqEAqlD4+/Y97l2ppELLJupa+lEaBv5B2+3vF4z/pqnJej6wg4n1FbFVOtMPD92qZVj8VHR38jY5HI4AJAnydoPLsbstLoK8dJNTKOgMpQm8goQKaGhoby6XrVjeI8ZvYkM+WuXql9y3GRcI5MQ3zxx3FPKDBubnWQB5UgdfT0NBmXjSehe6tg6mfOxftHomPnStlwnEEmxClSwgz6kY/LCg1IpbpoDJzfFl4r1n90W/i+bMo4B919UNwmFdsrpTzdHgzvKqZD446AnhUNR2nV0oqdX5Txrq7eNSRM9TDQFXoLzUcAv8iZPEjjbgdVBOwujyOvmxCS00KIl6CDPvNJqd4OdIZ3F7PhCBgfHp7H9qsXc5gG5MOLSj8PsLlLC/olhP5pGEMasj2JichMMcPWeCDYfT9S5ijsIBJ8em1z472T0bGBqYnIVsHZfpID+EAxSEdAUkpERz/RBL8TM/UVfogMux53rKE9q2l8y2R0fIjkSh0Ex5Q8ZsGta17Vbl90k7FIvxsk93eGzERfxr2tsdihOSeHHTt3rpAX/7xZ+vhPifHxP5xkCsfc4OzyeDrtw0300xhnfI+ngR3W04oeDMxxFdMF+xE/cOAv9MteEJXAkR+8arwMSKoa/RRuPS2Q87kCUTTEdsBK2pXCWbYJEunzWq4vn7XGawr4X+EsmH9C5kZrBmhuLkosCAvC7UyQ1sIh2bJyMBAOr2a6thHVf+5IdHS20AnB2UtJ4WotlHfraz7+jkyrvSTnOoPtwdALKs3OK5n91JDGDLZZHwVCTzVbTiistYSz7FrnkjMYCIYHUOlR5RXtB39FEWjBSnuA6akvgsEdmxdZdkOpOmc5qeZcdAYJTplwwOJiNwpzq+B8AzpzgLxlUWW+rjcc3ZgjoB1OCPZcIjY2iBKgaOfBFduch7wRoPT4OlFtzpWa4X8BFsJNRiNv2g0kJsaTFiSNI/Q3XLhwudEuU8v2FUB6k3KDsxzbIfPh/hw52WJdr/asZTy5xwgMXQHUM2y/lXMU1sKZK3RaT0jztTPvkABztEqFaKwcuLwuqxekYfisnbwiwKTlsBI4S6cekOaHzJyDpECWf2O2Of/OLawWVOG55pD4yko+MI0na/oJOMtkm6HkFLZMq1CWZpA8/gbuoa2a61HsE7AZ62v5I7pGtzZ79szZ2+/Y9AFiT/WM3uJW42clKppLctBipX9DTHu9vuDk4ZEvyevf3jHHr14uq9EAAAAASUVORK5CYII=',
  },
  Loading: {
    meta: {
      widgetName: 'Loading',
      title: '加载中',
      desc: '用于页面和区块的加载中状态',
      props: {
        size: { type: 'small|default|large', desc: 'Loading尺寸大小', defaultValue: 'default' },
        delay: { type: 'number', desc: '延迟加载时间', defaultValue: 'undefined' },
        scale: { type: 'boolean', desc: '是否缩放', defaultValue: 'false' },
        iconClass: {
          type: 'string',
          desc: '自定义Loading,iconClass接受一个图标名的字符串',
          defaultValue: 'undefined',
        },
        tip: { type: 'string', desc: '自定义Loading加载文本', defaultValue: 'undefined' },
        children: { type: 'any', desc: 'Loading组件允许内嵌容器', defaultValue: 'undefined' },
        data: {
          type: 'any',
          desc: '与children属性一样，在Loading组件内嵌入内容',
          defaultValue: 'undefined',
        },
      },
      category: ['其他'],
    },
    target: Loading,
    screenshot:
      'data:image/png;base64,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',
  },
  Menu: {
    meta: {
      widgetName: 'Menu',
      title: '菜单',
      desc: '为用户提供菜单列表',
      props: {
        valueField: { type: 'string', desc: 'data数据的value值的名称', defaultValue: 'value' },
        displayField: {
          type: 'string',
          desc: 'data数据的displayValue值的名称',
          defaultValue: 'text',
        },
        data: {
          type: "[{valueField: '', displayField: '', children}]",
          desc: '生成选择项的数据',
          defaultValue: 'false',
        },
        mutliple: { type: 'boolean', desc: '是否多选', defaultValue: 'false' },
        start: { type: 'number', desc: '开始展示数据的索引值', defaultValue: '0' },
        selectedKeys: {
          type: 'string | string[] | number | number[]',
          desc: '指定当前选中的项',
          defaultValue: 'undefined',
        },
        defaultSelectedKeys: {
          type: 'string | string[] | number | number[]',
          desc: '默认指定当前选中的项,仅第一次生效',
          defaultValue: 'undefined',
        },
        checkedCSS: {
          type: 'background | checkbox | mark | none',
          desc: '选中项的样式',
          defaultValue: 'none',
        },
        limitCount: { type: 'number', desc: '多选时的最大选中数', defaultValue: '999999' },
        offsety: { type: 'number', desc: '菜单间的间隔', defaultValue: '4' },
        autoHeight: {
          type: 'boolean',
          desc: '根据data数量，自动计算菜单高度',
          defaultValue: 'undefined',
        },
        expandedPath: { type: 'string[]', desc: '层级菜单时展开的数据', defaultValue: 'undefined' },
        separator: { type: 'string', desc: '层级菜单时连接层级数据的分隔符', defaultValue: '|' },
        offsetX: { type: 'number', desc: '层级菜单时，菜单间的间隔', defaultValue: '4' },
        offsetY: {
          type: 'string',
          desc: '层级菜单时，子菜单相对父级菜单的top值',
          defaultValue: 'undefined',
        },
        action: {
          type: 'click | hover',
          desc: '层级菜单时，展开子菜单的方式',
          defaultValue: 'click',
        },
        size: {
          type: 'large | default | bigger',
          desc: '设置列表项的高度',
          defaultValue: 'default',
        },
        subsize: {
          type: 'large | default | bigger',
          desc: '设置子菜单列表项的高度',
          defaultValue: 'default',
        },
        popupVisible: {
          type: 'boolean',
          desc: '层级菜单,是否允许打开子菜单',
          defaultValue: 'true',
        },
      },
      events: {
        onChange: {
          desc: '选中项发生变化时触发',
          args: [{ name: 'keys', desc: '所有的选中值', type: 'Object' }],
        },
        onClick: {
          desc: '点击列表项时触发',
          args: [
            { name: 'event', desc: '选中DOM的事件对象', type: 'Object' },
            { name: 'keys', desc: '所有的选中值', type: 'Object' },
            { name: 'item', desc: '当前选中项的数据', type: 'Object' },
          ],
        },
        onMouseEnter: {
          desc: '鼠标进入列表项时触发',
          args: [
            { name: 'event', desc: '选中DOM的事件对象', type: 'Object' },
            { name: 'item', desc: '当前鼠标进入的列表项数据', type: 'Object' },
          ],
        },
        onExpandPathChange: {
          desc: '层级菜单展开项发生改变时触发',
          args: [
            { name: 'expandedPath', desc: '通过separator连接的各级展开数据', type: 'string[]' },
          ],
        },
      },
      category: ['数据录入'],
    },
    target: Menu,
    screenshot:
      'data:image/png;base64,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',
  },
  Modal: {
    meta: {
      widgetName: 'Modal',
      title: '对话框',
      desc: 'Modal 对话框。',
      props: {
        title: { type: 'React.node', desc: '标题', defaultValue: 'undefined' },
        visible: { type: 'boolean', desc: 'Modal 是否可见', defaultValue: 'undefined' },
        cancelText: { type: 'string', desc: '取消按钮文字', defaultValue: '取消' },
        okText: { type: 'string', desc: '确认按钮文字', defaultValue: '确定' },
        confirmLoading: {
          type: 'boolean',
          desc: '确定按钮是否 loading',
          defaultValue: 'undefined',
        },
        footer: {
          type: 'React.node',
          desc: '自定义底部内容，不需要底部内容可设置为 null',
          defaultValue: 'undefined',
        },
        maskClosable: { type: 'boolean', desc: '点击蒙层是否允许关闭', defaultValue: 'true' },
      },
      events: {
        onOk: { desc: '点击确定时的回调', args: [] },
        onCancel: { desc: '点击取消时的回调', args: [] },
      },
      category: ['反馈'],
    },
    target: Modal,
    screenshot:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADkAAAAiCAYAAADlCXHdAAAAAXNSR0IArs4c6QAAAuFJREFUWAntWc9rE0EU/vZH1Kab2ioJ2mio9FArEQvtwUMOKioi/kAoIvWil+Kf4cE/ohehB1GkIloULwa0SFUMSSupqC2ITdOapNq0qW1Mml33LSQE2ilkMod1zRx2l8fsN+9737y3szNSLBY7bxjGsK7rXjisybKckSTphhSNRtOBQMCraZrDKAK5XA6JRCIjk4JOJEiKeTweED/ZcfJtQahBcoug/JMmleV1djkHszqhxdNsdfm9to58vgBFkYXYNc2NZXMMn3ePha/rBhZSi2jf54UksbziszOna/5PAXfvjWJtPY+NjRKGHzxDdiUHUXZVUfD4+St8mflueR4e+4Dox8/CCRK4Mjg4eNvn820Kkdbshsul4s27ScwtpK0I9x47DFF2WZbQ2XEAI0/DcDftwuTUNK5dOWPNkk3O1GFIp9NgKkm4fT3d0A0Ds3MpnAz1VYYSZW9r9eBEqBcjo2FcvXzaTAWlMobIh21JLmVXsPgri1KphPkfmcq4ouxm/DAZn0bHwf2YiH+t4It+YJIslXQ8fPISF86G0H/pFB6Z0aZ8FGUnIq/Ho9jd0oybAxfN3JzFzLc50fwsPGZOvgiPo7VFw/G+IDxmJSQ130emkJhPCbFrWhPG3sZwvf8cVFXBoUC7FdSj3Z3YucMljCzlpBSJRIxgMCgM1G5A8Xh8+8JjN4d5/WHmJC+gHd9rkLSjKjw+/RdKMhfoE59kDN1X8XOJb7W8t83ArYEN9BzRreCvrq4imUyiWCzyiGEuMV3w+/3g+cFnkqyHILGg4BDG0J2CRYoI8jpJALSVQRhdXV0WXi0X5nTlVbB68GoMUpBHhTIebWXwzgImyTK4E+4Nkk5QkTgwlaTqWG+rxqDqSMWDt9G7hMHTmNWVyn89Fbb8CSk7RZVVxCekjFfLvfEXUku07NyXmZN2drpW3xoka42YXfubm+Rypp7Sbldi5BfxIn4qHVKaZ3iOPoT9C0cKxNBk3ItpAAAAAElFTkSuQmCC',
  },
  NavMenu: {
    meta: {
      widgetName: 'NavMenu',
      title: '导航菜单',
      desc: '为页面提供导航功能的菜单',
      props: {
        data: {
          type: "[{valueField: '', displayField: ''}]",
          desc: '生成选择项的数据',
          defaultValue: 'undefined',
        },
        valueField: { type: 'string', desc: 'data数据的value值的名称', defaultValue: 'value' },
        displayField: {
          type: 'string',
          desc: 'data数据的displayValue值的名称',
          defaultValue: 'text',
        },
        value: {
          type: 'string | string[] | number | number[]',
          desc: '指定当前选中的条目',
          defaultValue: 'undefined',
        },
        mode: {
          type: 'vertical | inline| horizontal',
          desc: '菜单类型，支持垂直、内嵌和水平模式',
          defaultValue: 'inline',
        },
        inlineType: {
          type: 'primary | ellipse',
          desc: '菜单类型为inline(内嵌模式)时,支持两种风格',
          defaultValue: 'primary',
        },
        theme: {
          type: 'light | dark',
          desc: '菜单类型为inline(内嵌模式)时,支持两种主题',
          defaultValue: 'light',
        },
        inlineExpandAll: {
          type: 'boolean',
          desc: '菜单类型为inline(内嵌模式)时,是否展开所有子元素,默认为true',
          defaultValue: 'true',
        },
        separator: {
          type: 'string',
          desc: '自定义层级分隔符,只有在mode为 vertical 时,传入级联数据生效 ',
          defaultValue: '|',
        },
      },
      events: {
        onClick: {
          desc: 'mode为vertical时生效,点击选中项时触发',
          args: [{ name: 'target', desc: '点击项所包含的数据信息', type: 'Object' }],
        },
        onChange: {
          desc: '选中值改变时触发',
          args: [{ name: 'target', desc: '改变的值,所包含的数据信息', type: 'Object' }],
        },
        onSelect: {
          desc: 'mode为inline时生效,选中项时触发',
          args: [{ name: 'target', desc: '选中项所包含的数据信息', type: 'Object' }],
        },
      },
      category: ['导航'],
    },
    target: NavMenu,
    screenshot:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAcCAYAAAAeC42RAAAAAXNSR0IArs4c6QAAA6RJREFUWAntll1sFFUUx885c6cf7KKNH0hVFIkSooklfr0YQjXGpYFKWumGohAjaZqIqZJQW7UpYwE1Lg+wTRVjommB7NJuS2HKCia+aDHQBx+MD5iAmNRYQwm6dtptZ+fe470kJrx1eGg0cU8yuzO/uefe/5xzc8/Bt5zkvcIule+/2zyRSPRFJmen7iOBv8Mc3/6hs+MiM2P7np6Hy1XFeJ7+XPb4qiUX4vG47NjT/YCQJVOO03wV/gXD1q7kGg5UKkrlqz2e/QSQL0WhfL+n8t9bJF5mCB5lBZsjVFU9zT+4gHjWIjglJWcR8cmPnJZfF0J3Xd3WJT7JKJEIzPxKBaJEWd7x44evmGdKdLZ8i0SHplV+FJnviUJVh4kiCtqqOOjVAW8rKbEbHeeZQJTiNmBuklJl9Ac2LZRoIwxtekgISweJL5jLtqxRVcoPmnfGyPwIgCEGXAmEJ41AwyqjS8fMv7Yf93XsGDc3H7zTMskA5/QVjQB9Y9hC2VB/71lg2E5EisjyAdUrJ9JHvvtnPXKcL8oC5hQRvsmKX2/rSlaZlxO5iQOAcEY7R3Z1JpsNa+1MNiLwSs17PeZPDVtIO9F/OKuzvpEDuXH42NGvblwLd+0+2IMAFYn33niptfNAAyN2EeNeBt4dobLVgeXfNVdQ53VutoGCPpvg2fsry366+Ft+DJC6E07L5zdOWLwvRqAYgf95BDA1fGbZbeVwLRaLTWez2dLcHFbq00KGYVYB/xICRX197Ho1y2TcVUrZV8KwRYusy55n3R2Pxy6bHBgdi0XBm5mxK+ZjRpuAQmH5NZ8Pat/63LTs1uf2l7qsXw3FwBqdDeTwyMjI+qkZrvEVPCVA7QvDXqyp2ZnOuMlU5tReJPhD+f6hGX/FOomX+uZjOT1OH+EA6X63XQE8Qcjjmxte2HkzLDUwsgaA32YGW8CK9fH4I35Y5rruHd4sDOk2ogC2vb2xruaXsOx6ySewM4iwAUgcM6KNhWW3RmhMZ2m5nuhrI9r4hmW1tbWms/xZdyZ5I9r4hmVk9rXEwmd6X69VUib08y1hmVko58n9TOQw8tPpQfexm2GpfneTHu/pFuJceuDka8Y3LEM9sJsJz2/ZtOFIesB9Xqf8Ve0/GYYR8YBkXLelobZpcPB0pS/9Ic16JNPa+ZhN3FxQ+PHSOxc/V11d7eu1TyNaSWbZPh/TO6PNfGTRihEoRuA/GIFiyS+W/JBtQLHkF0t+yJL/N+U1WhXsXjeoAAAAAElFTkSuQmCC',
  },
  NumberInput: {
    meta: {
      widgetName: 'NumberInput',
      title: '数字输入框',
      desc: '常用于数字输入,可以进行快速加减显示',
      props: {
        disabled: { type: 'boolean', desc: '禁用状态,是否不可用', defaultValue: 'false' },
        viewClass: { type: 'string', desc: '用于配置通用主题属性', defaultValue: 'undefined' },
        size: {
          type: 'InputSize',
          desc: "可配置三种尺寸大小的input ('大' , '默认' , '小'),高度分别为 40px、32px 和 24px。",
          defaultValue: 'default',
        },
        validateStatus: {
          type: 'ValidateStatus',
          desc: "input校验状态, 'success' 成功 | 'error'错误",
          defaultValue: 'success',
        },
        validateType: {
          type: 'InputValidateType',
          desc: "input校验信息显示类型, 'top' | 'bottom' | 'inner' | 'default'",
          defaultValue: 'default',
        },
        help: { type: 'string', desc: 'input校验提示信息', defaultValue: 'undefined' },
        placeholder: { type: 'string', desc: 'input输入提示信息', defaultValue: 'undefined' },
        defaultValue: { type: 'string', desc: '默认显示内容', defaultValue: 'undefined' },
        value: { type: 'string', desc: '显示内容', defaultValue: 'undefined' },
        max: { type: 'number', desc: '输入最大值限制', defaultValue: 'Infinity' },
        min: { type: 'number', desc: '输入最小值限制', defaultValue: '-Infinity' },
        step: { type: 'number', desc: '每次改变步数，可以为小数', defaultValue: 1 },
        precision: { type: 'number', desc: '数值精度,默认0', defaultValue: '0' },
        formatter: {
          type: 'function',
          desc: '格式化显示内容的匹配规则,需与 parser 属性配套使用',
          defaultValue: 'undefined',
        },
        parser: {
          type: 'function',
          desc: '解析格式化显示内容的规则,需与 formatter 属性配套使用',
          defaultValue: 'undefined',
        },
      },
      events: {
        onClick: {
          desc: '点击按钮时触发',
          args: [{ name: 'event', desc: '点击的DOM事件', type: 'Object' }],
        },
        onChange: {
          desc: '内容改变时触发',
          args: [{ name: 'event', desc: '改变内容的DOM事件', type: 'ChangeType' }],
        },
        onKeyUp: {
          desc: '键盘按下去并松开后执行',
          args: [{ name: 'event', desc: '改变键盘输入的内容', type: 'KeyboardEvent' }],
        },
        onKeyDown: {
          desc: '键盘按下任何键时触发',
          args: [{ name: 'event', desc: '改变键盘输入的内容', type: 'KeyboardEvent' }],
        },
        onKeyPress: {
          desc: '键盘按下任何键时触发',
          args: [{ name: 'event', desc: '改变键盘输入的内容', type: 'KeyboardEvent' }],
        },
        onFocus: {
          desc: '输入框获得焦点时触发',
          args: [{ name: 'event', desc: '获取焦点的DOM事件', type: 'FocusEvent' }],
        },
        onBlur: {
          desc: '输入框失去焦点时触发',
          args: [{ name: 'event', desc: '失去焦点的DOM事件', type: 'FocusEvent' }],
        },
        onEnter: {
          desc: '当键入回车时触发事件',
          args: [{ name: 'event', desc: '当键入回车时触发的事件', type: 'KeyboardEvent' }],
        },
        onMouseEnter: {
          desc: '当鼠标移入输入框内触发',
          args: [{ name: 'event', desc: '当鼠标移入输入框内触发的事件', type: 'Object' }],
        },
        onMouseLeave: {
          desc: '当鼠标移入输入框内触发',
          args: [{ name: 'event', desc: '当鼠标移出输入框外触发的事件', type: 'Object' }],
        },
      },
      type: {
        InputSize: ['small', 'default', 'large'],
        ValidateStatus: ['success', 'error'],
        InputValidateType: ['top', 'bottom', 'inner', 'default'],
        ChangeType: { newValue: 'string', oldValue: 'string', event: 'SyntheticEvent' },
      },
      category: ['数据录入'],
    },
    target: NumberInput,
    screenshot:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAUCAYAAADLP76nAAAAAXNSR0IArs4c6QAAAZ9JREFUSA1jPHPmzFYGBgYvIB6KYBsD0AP/h6LLQW4GuZ1pqDoe5u5RD8BCYqBoFlItLm2cEMzwn+Fnd0PBFpDeqtaZkn9+fS/7z8ggycTAuIGTgWNTQ0P6N1LNJVc90R6oaZ6s+PPPvyqGfwxuQMuWAfGWhoapPF9+/jjKwMA4l4WZYcnffwyJX/7/tAbK5ZLrIFL1EZ0Hfvz7Z8DEyLyYgZFhMsySrwx/gxgY/z/sacpv7ajLP8vNwFfC+P9/aF/fKk6YGlrTRMdAT33+epBjShsmmsEcxcjAeO0/M0sVjP+V4asWMClxfvoU+hMmRmuaaA9gc0hXQ+4ZmHhl2xTh3z//TmRgZKxvaGD8BxOnNU10EsLnkIqmCaZAxx9h/M+woqchbwI+tdSWoygGQI4paZgY9fcPQwMLC2N4R13eeWo7kJB5FHmgsmGyxp///3pZ2TmM2qrTnxOyjBbyFHngD8P/MKCj+H79/HG8pG4i3H3sbGzWrTWZT+ECtGSMNuZoGbpEmE2VUogIe2imZNQDNAtaIg0GlULbhnBG3goAuyqE+2rHLyIAAAAASUVORK5CYII=',
  },
  Pagination: {
    meta: {
      widgetName: 'Pagination',
      title: '分页',
      desc: '分页组件，分页展示数据。',
      props: {
        current: { type: 'number', desc: '当前页数', defaultValue: 'undefined' },
        defaultCurrent: { type: 'number', desc: '默认的当前页数', defaultValue: '1' },
        total: { type: 'number', desc: '数据总数', defaultValue: '0' },
        pageSize: { type: 'number', desc: '每页的条数', defaultValue: '10' },
        defaultPageSize: { type: 'number', desc: '默认的每页条数', defaultValue: '10' },
        pageSizeOptions: {
          type: 'string[]',
          desc: '指定每页可以显示多少条',
          defaultValue: "['10', '20', '30', '40']",
        },
        showQuickJumper: { type: 'boolean', desc: '是否可以快速跳转至某页', defaultValue: 'false' },
        showTotal: {
          type: 'Function(total, range)',
          desc: '用于显示数据总量和当前数据顺序',
          defaultValue: 'undefined',
        },
        hideOnSinglePage: {
          type: 'boolean',
          desc: '只有一页时是否隐藏分页器',
          defaultValue: 'false',
        },
        showSizeChanger: {
          type: 'boolean',
          desc: '是否显示可以改变 pageSize',
          defaultValue: 'false',
        },
        simple: {
          type: 'boolean',
          desc: '当添加该属性时，显示为简单分页',
          defaultValue: 'undefined',
        },
      },
      event: {
        onChange: {
          desc: '页码改变的回调，参数是改变后的页码及每页条数',
          args: [
            { name: 'page', desc: '页码改变后的页码', type: 'number' },
            { name: 'pageSize', desc: '每页条数', type: 'number' },
          ],
        },
        onShowSizeChange: {
          desc: 'pageSize 变化的回调',
          args: [
            { name: 'current', desc: '当前页数', type: 'number' },
            { name: 'size', desc: '每页条数', type: 'number' },
          ],
        },
      },
      category: ['导航'],
    },
    target: Pagination,
    screenshot:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADYAAAAJCAYAAAB5ad+lAAAAAXNSR0IArs4c6QAAAkJJREFUOBHVVE1oE0EU3pldW4RGLVZFPAgaiiDouba3UhER2mgaCyX2YH4uBe2h9NqLBwuF9pg/PCQLda2kvUQsaPDiUel5aaMXNSImQiHg7s74TWBkKbuJ23rpwux78973Pd57M28UJeCXyWTOB6S04bqu94N7+SDcXC53Lp/Ph4NwiQTfjc0Mc4uZ5XLxu7S5ZalUOtFqteYYY7PpdPqM29dNR0GLhJBLwP3EupBKpSa7caQ/m82uQA9xzvcQI5xMJu9AcumXMhKJn2W9PLy5VnovbFT8xmPx2w5h67+p0yf2Xh+Kukcp3ULQL15+P5toCDg3UMwDrMdIsF4oFIb88G47Tuki9n3gPUQzH0HfhW3EjZG6yJ0wsj5xf/qmsGkTU9OjlFADJ4G8NVsC90t06pmwoYP7XR33aMhxBF5wga7Ytv3JtfdVE4nEZzgT1WpVq9Vqg5ZlXVVVdceL0M6d8FOUHjMik/FxjTjUVjQiCurxIhzWhobUEaNuGIbabDafQP+IE/gaJK5pmmPAixMzQ6HQj85crnGVabT8oviOMSumcKXJmK11Jh3Mixk7iaJe4kqaKGr+X6OIRwPcAXBeYd0Cr95oNKJefJE7Bu+X47DYxpr+pj1jG8/1LU55tIepe16k/2AzcIWe4vQKQWKBcxr4VclBY8S19pxxkbvKaXTTKFYE/u+rKMndJGZsG9273g0n/ej6NczvWyT1QdoglxHjtWvvq+LElsAVTz3Dw/MNj8isL/ioOSqVSq9YQfL+A4IQ3yaxKeeZAAAAAElFTkSuQmCC',
  },
  Popconfirm: {
    meta: {
      widgetName: 'Popconfirm',
      title: '气泡确认框',
      desc: '气泡式的确认框',
      props: {
        title: { type: 'React.Node', desc: '确认框标题显示内容', defaultValue: 'undefined' },
        description: { type: 'React.Node', desc: '确认框描述显示内容', defaultValue: 'undefined' },
        content: { type: 'React.Node', desc: '整个确认框显示内容', defaultValue: 'undefined' },
        icon: { type: 'React.Node', desc: '确认框的标题的图标', defaultValue: 'undefined' },
        placement: {
          type: 'DirectionType',
          desc: '气泡确认框显示的位置,十二个方向',
          defaultValue: 'undefined',
        },
        visible: { type: 'boolean', desc: '是否显示出来', defaultValue: 'false' },
        defaultVisible: { type: 'boolean', desc: '默认是否显示出来', defaultValue: 'false' },
        action: {
          type: 'Array<string>',
          desc: '页签位置，可配置 click,hover,focus',
          defaultValue: 'click',
        },
        children: {
          type: 'React.Node',
          desc: '气泡确认框需要包含的子组件',
          defaultValue: 'undefined',
        },
        okType: { type: 'ButtonType', desc: '气泡确认框确认按钮的类型', defaultValue: 'primary' },
        cancelText: { type: 'string', desc: '取消按钮文字', defaultValue: '取消' },
        okText: { type: 'string', desc: '确认按钮文字', defaultValue: '确定' },
      },
      events: {
        onVisibleChange: {
          desc: '气泡确认框改变时触发',
          args: [{ name: 'event', desc: '气泡确认框显示改变的DOM事件', type: 'Object' }],
        },
        onCancel: {
          desc: '气泡确认框点击取消时触发',
          args: [{ name: 'event', desc: '气泡确认框点击取消的DOM事件', type: 'Object' }],
        },
        onConfirm: {
          desc: '气泡确认框关闭时时触发',
          args: [{ name: 'event', desc: '气泡确认框点击确认的DOM事件', type: 'Object' }],
        },
      },
      type: {
        DirectionType: [
          'left',
          'leftTop',
          'leftBottom',
          'right',
          'rightTop',
          'rightBottom',
          'top',
          'bottom',
          'topLeft',
          'top',
          'topRight',
          'bottom',
          'bottomRight',
          'bottomLeft',
        ],
        ButtonType: ['default', 'primary', 'success', 'warning', 'danger'],
      },
      category: ['反馈'],
    },
    target: Popconfirm,
    screenshot:
      'data:image/png;base64,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5KfGfjMiWc39hvyqe5DttTaQmNZedtAVAAAAAAAAAAAAAMB7e/aSEjEUhFG4SHNjCCGEziA0dA9EUSinvvYg7n87pgk0IiVecCDWf755jQ73lQD/QFcaCaUznF3thtZltMPuytSVm72L2d8UU9YdZxc0H4W3+dK7qF52sY9CZ/lX7WiSinBz91ZyrXeye/umVzzXb13crcmZ5J5qX+0nUzO4vMHETA5XW+r3Dr83LQeHH0xKJ3+NO9trvdo40gUP9caxakzJ4lgtpmTnWO1MCdGJrorogoguiOiCiC6I6IKIXunxpdq7b97qR958814/8ug/Ivpvoz9Ue/LNc/3Is2+e6keITvQA0YlO9O8QPR2iEz1A9HSITvQA0dMhOtEDRE+H6EQPED0dohM9QPR0iE70ANHTITrRA0RPh+hEDxA9HaITPUD0dIhO9ADR0yE60QNET4foRA8QPR2iEz1A9HSITvQA0dMhOtEDRE+H6EQPED0dohM9QPR0iE70ANHTITrRA0RPh+hEDxA9HaITPUD0dIhO9ADR0yE60QNET4foRA8QPR2iEz1A9HSITvQA0dMhOtEDRE+H6EQPED0dohM9QPR0iE70ANHTITrRA0RP5zfRX6tdotePXKLXjxC9OjqIronogoguiOiCiC6I6IKILkgr+uJYLabk5FidTMnkWE2mpHOsOpPSO7w3LXcOvzMto8NHE3NweQdT07i8xuQMLm4wPaV1aW0xQePswma5W9xmEa4+a312/2SU3eFb0XV+VkRvc4PkeX5xEvwe22v9XIs0x2sXcn38++f5B59UjlnPX63DAAAAAElFTkSuQmCC',
  },
  Popover: {
    meta: {
      widgetName: 'Popover',
      title: '气泡卡片',
      desc: '气泡式的卡片浮层',
      props: {
        title: { type: 'React.Node', desc: '卡片标题显示内容', defaultValue: 'undefined' },
        description: { type: 'React.Node', desc: '卡片描述显示内容', defaultValue: 'undefined' },
        content: { type: 'React.Node', desc: '整个卡片显示内容', defaultValue: 'undefined' },
        clear: { type: 'React.Node', desc: '关闭卡片的操作内容', defaultValue: 'undefined' },
        placement: {
          type: 'DirectionType',
          desc: '气泡卡片显示的位置,十二个方向',
          defaultValue: 'undefined',
        },
        visible: { type: 'boolean', desc: '是否显示出来', defaultValue: 'false' },
        defaultVisible: { type: 'boolean', desc: '默认是否显示出来', defaultValue: 'false' },
        action: {
          type: 'Array<string>',
          desc: '页签位置，可配置 click,hover,focus',
          defaultValue: 'click',
        },
        children: {
          type: 'React.Node',
          desc: '气泡卡片需要包含的子组件',
          defaultValue: 'undefined',
        },
      },
      events: {
        onVisibleChange: {
          desc: '气泡卡片改变时触发',
          args: [{ name: 'event', desc: '气泡卡片显示改变的DOM事件', type: 'Object' }],
        },
        onClearClick: {
          desc: '气泡卡片关闭时时触发',
          args: [{ name: 'event', desc: '气泡卡片关闭的DOM事件', type: 'Object' }],
        },
      },
      type: {
        DirectionType: [
          'left',
          'leftTop',
          'leftBottom',
          'right',
          'rightTop',
          'rightBottom',
          'top',
          'bottom',
          'topLeft',
          'top',
          'topRight',
          'bottom',
          'bottomRight',
          'bottomLeft',
        ],
      },
      category: ['数据展示'],
    },
    target: Popover,
    screenshot:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADUAAAAiCAYAAAD/NZFTAAAAAXNSR0IArs4c6QAABCdJREFUWAntWVtPU0sU/nqhlKsiWi8oCN5BCWpR9CSKnmiMGBMvD/qmLxj/hT/CBzUxOTEmnhhjUOM1ooiBg9qiB6hgoVigKFCg3GxpC62zJtlbTp02Tc5UScM8dPasWfPN+mbNrFmTaiwWSxhJVvTEp6SkJGlo2Ww2aJOGzRwiC6TmLMa8/hR6amxiCoPuUdXwiclv+Do4jEAgiC8DbgSDM7xvZmaWt6f9AQwMjWCcjVPK0LAHhBMNS9FLRC0k5WdGXrtRg45OJ/yMyPWb99Fu74Fer8PDZ424/+Q1t+XR80bUPKrncrujl425B69vGg5nP678dRderw/RsBJBRsHUVVdXXzKZTEqb15kZachIN+LJiyYMDI5Aq9PhRNV+aLVarFubh6dM7hmbROtHB86dqQLp569ZCcdnFz519cLyoR2Ve3egeFMh7xNhaTSa/8wpq+F2u6NHP3PZFqww5XJvnTxWCcWIxYuycPjAblj/7cCf+8zIXbKI20Mmkp7D6QLp7CnfptoZDUtVkPwh3H40x4hnHH39Q0hLM6LF1qVOGw6HeZu8Q54KhUJqX1t7N4ypBn7+6EwpJRqW0i+7FpKanQ3hdk0tSkvW48zJQ6hrsKLvyxCfu66hGWPjk7h4/hR8fj9q6y1cToHkWd0bnD5+EOXbi9n456BAEgtLNhkFT0jq6csmFiACOHKwAvl5y7G3vBR37tWCgkF943t2vir5WaHt1viulZ2jHtxm/bTNigry+LakCSiQRMOiiJmooqHcbyFNStTySsQVbj+J+L8FKilJ8adH5HJSJkD3EoVzKpQVUCSj+1KGPJWFfa/Ph+ysTI5P1wRF1KzMDKE8Z3E214v3R+ipICPw+h8rz/XoHmpoauaTyZJTZtL84SPLVtzczvZPDvT09vOMRSSPl4yiJ0yT6ALVs9So0+HEKLuEaaUK1qziF6sMOXnbxLKVd81tMKSkwNU/gF3mUk5KJFeyGcXoWHXMNKkgPw+0LYjU5o1FKo4seTrb2ps3FMLyvg3mHds4IZokmlw1II4P4fajcV7vNKamvDwN8oxNqFCy5ATY5/qKpbk5vFYniCGfqxPrW0gqFArjrbUFpVs3Yef2rbCy1aQ3lCw5GdRh7+aB6I+KnexsDcM9PMrtjCaPRSKyT3imWm12pLOnR1FhPozGVMyyYNHNsm8P24oy5EZDCuxdTlTsKoNOp8Uy5q23lhakG43s+dL3k3z1qhXszSYM1JF8QGcqKdMkfVdvNi7/ncqeGnIfbbk5YVw4G0RZ8Y+nyU/LmiCB9sGrAumEyFZapKu3UhJkdmxY7cSUIbbG/+iV7f14TRFGv3gHz1e9BVLz1TORdi14KnJF5mtbn50ZQKIiIGHTXyu/uui/eQ1H2UvgGkvIV8ucnGG6GHa12Wx+LBM3Hqzvr/DIjrXD9u0AAAAASUVORK5CYII=',
  },
  Progress: {
    meta: {
      widgetName: 'Progress',
      title: '进度条',
      desc: '展示操作的当前进度。',
      props: {
        type: {
          type: 'ProgressType',
          desc: '进度条类型，line、circle、dashboard',
          defaultValue: 'right',
        },
        size: {
          type: 'ProgressSizeType',
          desc: '进度条大小，可设置为 small 或不设',
          defaultValue: 'undefined',
        },
        percent: { type: 'number', desc: '百分比', defaultValue: '0' },
        status: {
          type: 'ProgressStatusType',
          desc: '进度条状态，可设置为success、error、active或不设',
          defaultValue: 'true',
        },
        showInfo: { type: 'boolean', desc: '是否显示进度数值或状态图标', defaultValue: 'true' },
        format: { type: 'Function', desc: '进度条展示内容模板函数', defaultValue: 'undefined' },
        showType: {
          type: 'ProgressShowType',
          desc: '进度条展示内容展示位置，可设置为 inside 或不设',
          defaultValue: 'undefined',
        },
      },
      type: {
        ProgressType: ['line', 'circle', 'dashboard'],
        ProgressSizeType: ['default', 'small'],
        ProgressStatusType: ['success', 'error', 'default', 'active'],
        ProgressShowType: ['default', 'inside'],
        ProgressStyle: {
          color: { type: 'string', desc: 'Progress的颜色' },
          width: { type: 'number', desc: 'Progress的宽度' },
          height: { type: 'number', desc: 'Progress的高度' },
        },
      },
      category: ['反馈'],
    },
    target: Progress,
    screenshot:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADYAAAAECAYAAADF98x7AAAAAXNSR0IArs4c6QAAAF1JREFUKBVj7J/9tfbsNY66j5+YWBgGMRDk/8sQF/CJQUftF15XMjIyPgHiNMaYwr+/B7unYD4Bea6r7A2Mi5MGeY4Jp+wQl2Ay1vrRxM/3789g9wcsKRJyJywpAgCTPxynb2FUvQAAAABJRU5ErkJggg==',
  },
  Radio: {
    meta: {
      widgetName: 'Radio',
      title: '单选框',
      desc: '单选框。',
      props: {
        checked: { type: 'boolean', desc: '单选框是否选中', defaultValue: 'undefined' },
        defaultChecked: { type: 'boolean', desc: '单选框初始是否选中', defaultValue: 'undefined' },
        disabled: { type: 'boolean', desc: '单选框是否禁用', defaultValue: 'undefined' },
        value: { type: 'string', desc: '单选框的 value 值', defaultValue: 'true' },
        children: { type: 'string | React.node', desc: 'Radio展示内容', defaultValue: 'undefined' },
      },
      event: {
        onChange: {
          desc: '单选框改变时的回调',
          args: [
            {
              name: 'value',
              desc: 'Radio 改变时 value、displayValue 和 item 对应的值',
              type: 'Object',
            },
          ],
        },
      },
      type: { RadioStyle: { color: { type: 'string', desc: 'Radio的颜色' } } },
      category: ['数据录入'],
    },
    target: Radio,
    screenshot:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAD4AAAAUCAYAAADV9o4UAAAAAXNSR0IArs4c6QAAA0JJREFUWAnlWE1oE0EUfrPZ2pbqoVA0mIKHQEQoWIoHUc+CPWjtwYNCDq2m0Co9VaxijYIo7amghybxkODRals0h4Lk4E0k4EHUlArSWusf1P5Igs2u39tkk92amt12oYYOTGbm7fe9nW/e/G0ElUiBgFo1n6U2VVCbIDoEyN48bE4leiVUGnO7aCwUEr9L0CvCBF3mdOqCelpVaQjZa35ibglB08h942HxxPykMloF4cGgKiVn6S4E99npOsQPtTTSlWBQKHZ4W42V9Q5sRDRzeaDA5XRZ+62QHy3iPL0VhR5vps+SRO2VNO2FtpEp9Lbcmi43KLzm3RIdsLvhhcPhRvg+KknSu87OztfG90QikX2qqh4WQrxBueAkTtJ27zIbmbEzXK+tIerxE+1uKD7hgWNfRYu1msfj+QZRfaurq8+j0ahHZ8Xj8WpFUSbwbDibzf5wGifxkaW/zErJoq9dJHK5iBZ+mhl2fTG7tbU1I8vyGVTlTCbzEEIlts/MzAyi3oSZcK6rq+uz0zhx8rz6HtHy8cvKJRZ9tYfo63eiezFtYzNRMN1TExGx32S02MCUb0eERwEfQE4iP0W+CdFBlIXkFI6FL0H4Tt1zS1NO2Oy8bsmVNdW5SK8nmlEQvgzhu8xM662RkZFhrOceRHoRrGQgEDiO9l/HpBM4bVoZu9ZQjyHvJfK4i1YroovoTdX6wf6FXA/BvaVE571vGsfC5/LOtGLyBdH4JNH1S7in7iHaUYVI/2N6G7lrfa15VrYJoQOIdh2AHHFe44ULlpHsBE7muzecmtb4s0TuNf3dRMsrRJ++EN0vsaaNneF63tdas6V2KBQ6ASBfgu5AWBKiH8HGt8hBowOncBJ/cBgd63UWH0ee/mhNNPPW86X7XK/kYwxCY8gvfT7fDaztUYh/APxtCD2i85zEbfkFJpFIyKlUKgGhB3GsNXd0dHxgobFYrC6dTnPka10uV7PX6110EifxTQu7sa0PEz0CxpJ92L21MX9qauoWimMQ3q2LZrvf71+B7SyqbhxzUadxhc0Dxxo2k40NAEQP4RirqI+UwnHGn5YsgEfbTmIOc+1w/gdsIeJ6Z7bdHxG6cC63w19PfwC+sGNmMz1+7QAAAABJRU5ErkJggg==',
  },
  Rate: {
    meta: {
      widgetName: 'Rate',
      title: '评分',
      desc: '评分组件',
      props: {
        count: { type: 'number', desc: '展示的 star 总数', defaultValue: '5' },
        max: { type: 'number', desc: '最大分值', defaultValue: '5' },
        disabled: { type: 'boolean', desc: '禁用状态,不可进行交互', defaultValue: 'false' },
        allowHalf: { type: 'boolean', desc: '是否允许半选', defaultValue: 'false' },
        classify: { type: 'boolean', desc: '是否区分颜色', defaultValue: 'false' },
        iconClass: {
          type: 'object',
          desc: '自定义图标对象',
          defaultValue: {
            default: 'lugia-icon-financial_star',
            primary: 'lugia-icon-financial_star',
            danger: 'lugia-icon-financial_star',
            amazed: 'lugia-icon-financial_star',
            half: 'lugia-icon-finacial_half_star',
          },
        },
        className: { type: 'string', desc: '自定义样式类名', defaultValue: '' },
        value: { type: 'number', desc: '当前分值', defaultValue: '0' },
        character: {
          type: 'string | React$Element<any>',
          desc: '自定义展示字符',
          defaultValue: 'undefined',
        },
      },
      events: {
        onClick: {
          desc: '点击时触发',
          args: [
            { name: 'event', desc: '点击的DOM事件', type: 'DOM 事件' },
            { name: 'result', desc: '点击后的所选值', type: 'Object' },
          ],
        },
        onChange: {
          desc: '分值改变时触发',
          args: [
            { name: 'event', desc: '鼠标移动的DOM事件', type: 'DOM 事件' },
            { name: 'result', desc: '鼠标移动时的所选值', type: 'Object' },
          ],
        },
      },
      category: ['数据录入'],
    },
    target: Rate,
    screenshot:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAOCAYAAABQFS4BAAAAAXNSR0IArs4c6QAAAxBJREFUSA21ls1LG0EYxudrN8lGd3OKQZD00FsqIiK9iPQf8OKhl9yKpxY8FHsQPKR4KUgtigieCtK/Qjx4KHi0HxaEHDQHQRKyNiLZfOzu9JltkpqQrbSJA5udfd95Mr/3zbNDCAkZ+Xw+IqWMhqTvDee3H0fkx2cPpmdhBKZpbl1dXX0Ky98Xn/DiW3X7+sH0tB/A5eXlhBDilFJq+L4/nUqlTvutC4tV3z+ZEExTGqPuetOjb74NXd+345zzbCwWM6PRqMDmL8IAw+KcallNoyYuoXH2IPqg47ZtW7VazWKMWejyOLy9h46ncSfoeAn3JV3XL5Cr3GCk0+nru9Dy3YxVixGLeQ1LMjZOfLonGE1LLPKkLBFKlyKEXhBXVipN9yax+n1gPYWPJwF8ALg49omh20IBe54XsCFH1OW6rgo4KMhBMYvJZPKzWlDfnJkkxD8gRMYBGgOwCIB99UkIQ2s4Ppqe9DB1BKdOo+kvxla+DqRnmqYVAHpoGMYoOioA2IFWGwNSQSt4Ho/HR1DQMZ7PVE6NWyEKgD7UdTYKPuEC2GtBq7yaAloVwPUIG8HXHUeJGFgfWAXgrFQqvUW3VwHFVcd7BwqUgN7BupVMJtO4m5c5whrmNPRk1fMk71WrTYSg0JMdrdJYobkfA+sD8DYEbLOOF3INfm+HgjtipF6v746Njb3qSvQ8OJtT6xGNr8EKXRldYwSx3ejrL0PTd50qsIWt/NwesE4wVTH8Cj/b8bA7VtstSbCk3RUVw68wVL067joDgPPK07BF4G1lGTVXLyrmc7hQC+11QkdPJJ1XhBqnWK/8DT3MLWF0qOYQatXwR9I1+wd9p73lctkE1GwL+gyQz1HEAqBPVAxFTRUKhVTXRnceyttPTULJLAE03sUzeB16ueBKeUI5U8RT1Q8zQ9N3Og5AA7C24zj7AN1IJBLBWVssFo+q1eoywLM4edSR2XdEarcG3kDbbXr7mu5t0Je/z+piLnNkJcgyZSTL/eDIHb7+/Pw89E/R33JtEpkL/1Mlc49Cv/t/9L8AUt8EM4LPje0AAAAASUVORK5CYII=',
  },
  Select: {
    meta: {
      widgetName: 'Select',
      title: '选择器',
      desc: '选项过多时，弹出下拉菜单给用户选择操作',
      props: {
        data: {
          type: "[{valueField: '', displayField: ''}]",
          desc: '生成选择项的数据',
          defaultValue: 'undefined',
        },
        mutliple: { type: 'boolean', desc: '是否多选', defaultValue: 'false' },
        canSearch: { type: 'boolean', desc: '是否支持查询', defaultValue: 'false' },
        throttle: { type: 'number', desc: '查询的延迟时间，单位为毫秒', defaultValue: '100' },
        canInput: {
          type: 'boolean',
          desc: '是否支持自定义值,只有在canSearch为true时才生效',
          defaultValue: 'false',
        },
        valueField: { type: 'string', desc: 'data数据的value值的名称', defaultValue: 'value' },
        displayField: {
          type: 'string',
          desc: 'data数据的displayValue值的名称',
          defaultValue: 'text',
        },
        disabled: { type: 'boolean', desc: '是否禁选', defaultValue: 'false' },
        validateStatus: {
          type: 'ValidateStatus',
          desc: "input校验状态, 'success' 成功 | 'error'错误",
          defaultValue: 'success',
        },
        limitCount: { type: 'number', desc: '多选时最多个数', defaultValue: 'undefined' },
        placeholder: { type: 'string', desc: '占位符', defaultValue: 'undefined' },
        searchType: {
          type: 'start | end | include | eql',
          desc: '查询的方式',
          defaultValue: 'include',
        },
        value: {
          type: 'string | string[] | number | number[]',
          desc: '指定当前选中的条目',
          defaultValue: 'undefined',
        },
        displayValue: {
          type: 'string | string[] | number | number[]',
          desc: '指定当前选中的条目的displayValue值',
          defaultValue: 'undefined',
        },
        defaultValue: {
          type: 'string | string[] | number | number[]',
          desc: '初始状态下指定当前选中的条目,只生效一次',
          defaultValue: 'undefined',
        },
        defaultDisplayValue: {
          type: 'string | string[] | number | number[]',
          desc: '初始状态下指定当前选中的条目的displayValue值,只生效一次',
          defaultValue: 'undefined',
        },
      },
      events: {
        onChange: {
          desc: '选中项发生变化时触发',
          args: [
            { name: 'event', desc: '点击的DOM事件', type: 'Object' },
            { name: 'newDisplayValue', desc: '所有选中项的displayField的集合', type: 'string[]' },
            { name: 'newItem', desc: '所有选中项的数据的集合', type: 'Object[]' },
            { name: 'newValue', desc: '所有选中项的valueField的集合', type: 'string[]' },
            { name: 'oldItem', desc: '改变之前所有选中项的数据的集合', type: 'Object[]' },
            { name: 'oldValue', desc: '改变之前所有选中项的valueField的集合', type: 'string[]' },
          ],
        },
        onTrigger: { desc: '菜单展开是触发' },
        onQuery: {
          desc: '键盘按下任何键时触发',
          args: [{ name: 'query', desc: '输入的搜索关键字', type: 'string' }],
        },
        onClear: {
          desc: '清除输入框内容时触发',
          args: [{ name: 'event', desc: '清除输入框内容事件', type: 'Object' }],
        },
        onSelect: {
          desc: '选中时触发',
          args: [
            { name: 'event', desc: '点击的DOM事件', type: 'Object' },
            { name: 'newDisplayValue', desc: '所有选中项的displayField的集合', type: 'string[]' },
            { name: 'newItem', desc: '所有选中项的数据的集合', type: 'Object[]' },
            { name: 'newValue', desc: '所有选中项的valueField的集合', type: 'string[]' },
            { name: 'oldItem', desc: '改变之前所有选中项的数据的集合', type: 'Object[]' },
            { name: 'oldValue', desc: '改变之前所有选中项的valueField的集合', type: 'string[]' },
          ],
        },
        onRefresh: { desc: '点击刷新按钮时触发' },
      },
      category: ['数据录入'],
    },
    target: Select,
    screenshot:
      'data:image/png;base64,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',
  },
  Skeleton: {
    meta: {
      widgetName: 'Skeleton',
      title: '加载占位符',
      desc: '在等待加载内容时，提供一个占位的图形组合',
      props: {
        title: { type: 'boolean', desc: '是否展示标题占位符', defaultValue: 'true' },
        titleWidth: {
          type: 'number | string',
          desc: '标题占位符的宽度, 只有在titile为true时生效',
          defaultValue: '176',
        },
        avatar: { type: 'boolean', desc: '是否展示头像占位符', defaultValue: 'true' },
        paragraph: {
          type: '{ rows: number }',
          desc: '段落占位符的数目',
          defaultValue: '{ rows: 3 }',
        },
        paragraphWidth: {
          type: 'number | string | string[] | number[]',
          desc: '设置段落占位图的宽度，若为数组时则为对应的每行宽度，反之则是最后一行的宽度',
          defaultValue: 'undefined',
        },
        loading: { type: 'boolean', desc: '是否展示占位符组合', defaultValue: 'true' },
        picture: { type: 'boolean', desc: '是否展示图片占位符', defaultValue: 'false' },
        pictureWidth: {
          type: 'number | string',
          desc: '图片占位符的宽度',
          defaultValue: 'undefined',
        },
        pictureHeight: {
          type: 'number | string',
          desc: '图片占位符的高度',
          defaultValue: 'undefined',
        },
        animation: { type: 'boolean', desc: '是否展示动画效果', defaultValue: 'false' },
      },
      category: ['反馈'],
    },
    target: Skeleton,
    screenshot:
      'data:image/png;base64,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gAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIFBToraevubm50VOnTu2fmZnZs55+7EuAAAECBDazwMjIyPEdO3Yc6fV6L12qw0UF+vT09HWzs7O3xWC3xuP6CPRdlzqw/QgQIECAAIGlAhHo/4k1T8fj0X6/f3BsbOyZpVus/tWaAn1qauqWCO/74nHD6l1pIUCAAAECBEoKRMA/GY97xsfHH8v1e8FAjyC/Ia7IvxmdvD3XkXYCBAgQIEBgwwT+FFfsn49gf3K1EVYN9MnJyQ/EFfmDsePoajtbT4AAAQIECFQTSL9f/9i+fft+sdKI/ZVWHj169P4I859FmzBfCcg6AgQIECBQXyBl8s9TRq809LJAjyvzr8SGd620sXUECBAgQIDAZRe463xWLylkyS332OA90fqbuDpfsn7JHr4gQIAAAQIELqtAvFBuLgp478TExO8GhSwEd4T5tRHkT0XDVYNGSwIECBAgQKCzAi9EsL8+Qv0fqcKFW+4R5vfF18K8s/OmMAIECBAgsETgqvPZPb9y/go9PjDmxnh72mG32pdA+YIAAQIECHRaIN16j7ez3RQfQPPE/BV6hPm9wrzTc6Y4AgQIECCwTCBld8rw1NCPL9Il+83LtrKCAAECBAgQ6LxAyvCU5f34NLgU5t5v3vkpUyABAgQIEFhRYDRlebpCv2XFZisJECBAgACBJgRSlqffoV/bRLWKJECAAAECBFYTuLYfr5A7sFqr9QQIECBAgED3BVKWpyt0gd79uVIhAQIECBC4kMCB9Dv0V15oC20ECBAgQIBAtwVSls+/D73bZaqOAAECBAgQyAkI9JyQdgIECBAg0ICAQG9gkpRIgAABAgRyAgI9J6SdAAECBAg0ICDQG5gkJRIgQIAAgZyAQM8JaSdAgAABAg0ICPQGJkmJBAgQIEAgJyDQc0LaCRAgQIBAAwICvYFJUiIBAgQIEMgJCPSckHYC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',
  },
  Slider: {
    meta: {
      widgetName: 'Slider',
      title: '滑动输入条',
      desc: '滑动型输入器，展示当前值和可选范围',
      props: {
        maxValue: { type: 'number', desc: '最大值限制', defaultValue: 'Infinity' },
        minValue: { type: 'number', desc: '最小值限制', defaultValue: '-Infinity' },
        defaultValue: {
          type: 'number | Array<number>',
          desc: '滑动输入条默认显示值，值为number时,为单滑块，值为Array时,为双滑块',
          defaultValue: 'undefined',
        },
        value: {
          type: 'number | Array<number>',
          desc: '滑动输入条显示值,值为number时,为单滑块，值为Array时,为双滑块',
          defaultValue: 'undefined',
        },
        disabled: { type: 'boolean', desc: '禁用状态,是否不可用', defaultValue: 'false' },
        tips: {
          type: 'boolean | string | number',
          desc: 'boolean 是否显示提示信息,number|string指定显示的文本内容,可自定义显示的文本格式',
          defaultValue: 'false',
        },
        vertical: { type: 'boolean', desc: '是否垂直显示', defaultValue: 'false' },
        icons: { type: 'Array<Object>,', desc: '显示的图标资源', defaultValue: 'undefined' },
        marks: {
          type: '{ [key: number]: string | Object }',
          desc: '刻度标记,key的类型必须为number且每个标签可以单独设置样式',
          defaultValue: 'undefined',
        },
      },
      events: {
        onChange: {
          desc: '滑动输入条值改变时触发',
          args: [{ name: 'event', desc: '滑动输入条值触发的事件', type: 'ChangeType' }],
        },
      },
      type: { ChangeType: { newValue: 'string', oldValue: 'string', event: 'SyntheticEvent' } },
      category: ['数据录入'],
    },
    target: Slider,
    screenshot:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADYAAAAGCAYAAACIP21wAAAAAXNSR0IArs4c6QAAAJBJREFUOBFjZKATCG34z/brMUPTf0aGOJCVjP8ZFrHJMtStbmD8RQsnsNDCUGxmgjz1j4GhnOE/RBZIlQPFQKACIkJdkjGn7tvLh085xahrLHGm8fH8YajNvEucYhJUMTIybmMiQf1QUgpM8XQC/sn/O8BJEck+YKh2bpzLSJOkSLc8BiooQHkKvfBA8idVmQB9+SgKkEDk+AAAAABJRU5ErkJggg==',
  },
  Steps: {
    meta: {
      widgetName: 'Steps',
      title: '步骤条',
      desc: '引导用户按照流程完成任务的导航条',
      props: {
        children: { type: 'React.Node', desc: '步骤条需要包含的子组件', defaultValue: 'undefined' },
        data: { type: 'Array<Object>', desc: '步骤条填充的数据', defaultValue: 'undefined' },
        defaultData: {
          type: 'Array<Object>',
          desc: '步骤条填充的默认显示数据',
          defaultValue: 'undefined',
        },
        stepType: {
          type: 'StepType',
          desc: '步骤条风格 有 简洁,半扁平,图标,点状四种风格可供选择',
          defaultValue: 'simple',
        },
        size: {
          type: 'SizeType',
          desc: '步骤条尺寸,有正常和迷你 两种尺寸可供选择',
          defaultValue: 'normal',
        },
        orientation: {
          type: 'SizeType',
          desc: '步骤条方向,可选择水平,垂直',
          defaultValue: 'horizontal',
        },
        desAlign: {
          type: 'AlignType',
          desc: '步骤条描述信息的对齐位置 ,可选择左对齐,居中对齐',
          defaultValue: 'left',
        },
        currentStepNumber: { type: 'number', desc: '当前显示的步骤条位置', defaultValue: 0 },
      },
      type: {
        StepType: ['simple', 'flat', 'icon', 'dot'],
        SizeType: ['normal', 'mini'],
        OrientationType: ['horizontal', 'vertical'],
        AlignType: ['center', 'left'],
      },
      childrenWidget: ['step'],
      category: ['导航'],
    },
    target: Steps,
    screenshot:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADYAAAAOCAYAAABkbO8dAAAAAXNSR0IArs4c6QAAAr9JREFUSA3VVj1ok0EYfu9LAlaCTc0kbgatopsNah0KokNBGhHEQIpL87eIOjk4qJsODuKQ5Eu+QUgwZhBaQRctVCgoKWaxiIWCm3SIGhLIkJ/P573m2ksswQ6p5ODj7t577+55vvfueU/QkJVMJnOw0WhMCSF8DN227XWXy7UUDod/6lSE6sBBBKIUpjbNkaCT0m7TKhlkzZuUwUK28v1ftWmawXa7/QxYi8DzlXGgfQJtv2EYN6PRaF5hk8SuRu1DzTZlbZsuqAG9FoIWnQbNvjLFD92+l+1kMpkHiesOh2McBNb0vUH4WKvVeguCxXg8HuQxgyO1E6mx0e2pTHjTx96K8Pbo4FscKeD0e73e/YpULpcbS6VS8jiyDWOnmDj7MiIxE7EjdptMBW9kH1HgEtFlxG72jrJu1sKg6EJapLutg+0xgWq1uoajdl6RAqEHiM4R7Mz36jDs1xgFRw5HddnpdI4b8k6xtVMmTxOVVonKv5VFq/n+7XGp1WpT2HJFkcpmswdAahL9G/huI0oblmWdY1jsg36RxcUphUKThffLfZArUenjMoAhH4hIoeC16/X6CKJ3V9vneLPZ/K76HV+foQy7rROJhPwdg6zV2jq2SCSyAWkvFQoFB47eIxApxWKxv0RNzMzZH4HwjD6Z20/vE9162G2FcnxasMTZbutge7hPV3C8YlC7abUTbKMg9BzfaxC1lJ1r/Iw3qNIG5yl9oG97N759F/r3QbfbvQTvCRYGbVYBsv+4lxT7gKyfE7bA3xCBCL3rzWG9EeNcNp+mi5io3UhtqwE2ATiIPPWC5b5SqRyF8i0Cx2dtyycej+dDuVz+AsL3ICJ5mZeGKEH7AXya1U8jJWUexL+B7EuVoCUxdpKRG5InFeCugMTWkwr9iR2fVExsWAon7E5uk68O4F7nexgKhX7pHP4AEktdGJxQMiEAAAAASUVORK5CYII=',
  },
  Switch: {
    meta: {
      widgetName: 'Switch',
      title: '开关',
      desc: '开关选择器',
      props: {
        defaultValue: { type: 'boolean', desc: '默认开关状态', defaultValue: 'false' },
        value: { type: 'boolean', desc: '开关状态', defaultValue: 'false' },
        data: { type: 'Object', desc: '开关配置的展示信息', defaultValue: 'undefined' },
        size: { type: 'string', desc: '设置开关大小', defaultValue: 'undefined' },
        isInverse: { type: 'boolean', desc: '开关翻转', defaultValue: 'false' },
        loading: { type: 'boolean', desc: '是否配置加载', defaultValue: 'false' },
        autoFocus: { type: 'boolean', desc: '是否自动聚焦', defaultValue: 'false' },
        disabled: { type: 'boolean', desc: '禁用状态,是否不可用', defaultValue: 'false' },
        displayFiled: {
          type: 'string',
          desc: '匹配需要显示的文本,读取data中需要显示的内容名',
          defaultValue: 'Text',
        },
      },
      events: {
        onChange: {
          desc: '开关状态改变时触发',
          args: [{ name: 'event', desc: '改变状态触发的DOM事件', type: 'ChangeType' }],
        },
      },
      type: { ChangeType: { newValue: 'string', oldValue: 'string', event: 'SyntheticEvent' } },
      category: ['数据录入'],
    },
    target: Switch,
    screenshot:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAXCAYAAAB9J90oAAAAAXNSR0IArs4c6QAABANJREFUSA2tl01sFGUYx38zu9v9aKnQdquohdC0FJU2GilGsYn1QKLGiPXkAU08mOiFgyaevOhNPZnowYMmkpAIiVWjxnDwQkpCAYtIQSQSICBaaYBuh+7XzOvzzHSLm93tsrvzJNvZvjvvM//n/z4f/7GMGHXs1hLcyEA+X+fGBn+Ot8HaTkgm6m+M1rolX4BjJ2HqGJy7ADeXgdaNqpbDKusloAMbYcc22DYCbbEqN8qSVY3Rk2dg7yScPgeuC5EI2HZ1B42sFsWXJ5+o0KM+9SyVED0pBT28BXa/CCMPVHotA6obvz0IX34NS1mI1Yiu0s3qKxqsZcFQPzyyFZTB7rVCggf/XIOz54PT+/MidHbAqy/BCzuDPSXPZUAP/ACfH5Bohb0wGNSHFIpwT48wNQFjo7WDX1iEH3+Gr74HR2rizd2wS8CWbAXo8d/gvY+Dow4TZH+f4Z03LDbcW3rk6tcjJ+CjzyRASYn33wrSQXf4mZfNBTmpuRIWSE+OtesuePv1OwepgB57WNk0KCZNQc1hNR/o0V/hD8mTsHJSHWvh7Npp2NSn/zVm449bPDlqOHEaZmaDvT7QqeNSjcJAWKa+0l0e40807/GZp4wUoMdhwaZma3VfuBy0i2Cp9b9a5YObPHrWSak3aZv7LdanPb+H6/HbGUea+YJ8ad5nBRRXKO1bL72uBetIWdydNsxfNzi3BJ9Gry2EEIEa45GMt5ZL2nfjMVeKyfhDx9YC0qlQf+LfOT0WRkauMNCCeZ5h0XFJxKXIZZLZne2wTtqIrIdmtuTR+YsFCb55pzcWXC7/XaS326I9JUDbhE0dbZoCYVk0astYLHLpynITbMLxzKmsP14fHLR8beC3p7Hty6qleQLKoNgyNTJOlO8OSpU2YYWCxzc/ZUglY/7YVRc+0OEheHT49hRownfFlkQiKbM7y+GjjYPdN3mNX2YtxrbH2TIQuPaBquR6ZUJGniqakFIgEonhsoYPPv2XqembFYFUW9AC2jc5xxf7HTbe3ymYIittc0WU6MYjM/ChCAJV9KoZWzVjXLJL1yX6eZ59OsXEc2kBUCnnFeCp3x0f5KFpj+6eXt7ds4bRkds9swyoAlMV9cleuHJV2oIUWquDwJgihVwGx5kXrZlj61BCjjNJT5cwLqd3dS7H7NklEel5IaidwYFu9rzWLmrfP+wVriqA6i8qZveLNj00HbyCaPNVVaXXRk236ABw3SyF/CK5rINbzPlrWrvGRIhEE/SmOxjf0cHLz7fJRKp8UFWgJTCX/oJpUVb6SjIn4FV6tdAaZQx4GK8YfCSDUwkdkzYPbY6JvIuw4b5yFks49Loq0P/fqMIgrEIr+dUirvUyV7qndP0PLXKLA88lz5UAAAAASUVORK5CYII=',
  },
  Table: {
    meta: {
      widgetName: 'Table',
      title: '表格',
      desc: 'Table  表格。',
      props: {
        columns: { type: 'Object[]', desc: '表格每一行展示的内容', defaultValue: 'undefined' },
        data: {
          type: 'Object[]',
          desc: '数据源，指定 table 组件的数据',
          defaultValue: 'undefined',
        },
        defaultExpandedRowKeys: {
          type: 'string[]',
          desc: '初始展开的行的集合',
          defaultValue: 'undefined',
        },
        expandedRowKeys: { type: 'string[]', desc: '展开的行的集合', defaultValue: 'undefined' },
        defaultExpandAllRows: {
          type: 'boolean',
          desc: '初始是否展开所有的行',
          defaultValue: 'undefined',
        },
        expandedRowRender: {
          type: 'Function(recode, index, indent, expanded):ReactNode',
          desc: '额外的展开行',
          defaultValue: 'undefined',
        },
        useFixedHeader: {
          type: 'boolean',
          desc: '固定 Table 标题，使其固定在最上方',
          defaultValue: 'undefined',
        },
        footer: { type: 'Function(currentPageData)', desc: '表格尾部', defaultValue: 'undefined' },
        indentSize: {
          type: 'number',
          desc: '展示树形数据时，每层缩进的宽度，以 px 为单位',
          defaultValue: '15',
        },
        rowKey: {
          type: '{ x: number | true, y: number }',
          desc: '表格行 key 的取值，可以是字符串或一个函数',
          defaultValue: 'key',
        },
        showHeader: { type: 'boolean', desc: '是否展示标头', defaultValue: 'true' },
        title: { type: 'Function(currentPageData)', desc: '表格标题', defaultValue: 'undefined' },
        onHeaderRow: {
          type: 'Function(column, index)',
          desc: '设置头部行属性',
          defaultValue: 'undefined',
        },
        onRow: { type: 'Function(record, index)', desc: '设置行属性', defaultValue: 'undefined' },
      },
      event: {
        onExpandedRowsChange: {
          desc: '展开的行改变时的回调',
          args: [{ name: 'expandedRows', desc: '当前展开的行', type: 'string[]' }],
        },
        onExpand: {
          desc: '点击展开图标时触发',
          args: [
            { name: 'expanded', desc: '当前是否展开', type: 'boolean' },
            { name: 'record', desc: '当前行数据', type: 'Object' },
          ],
        },
      },
      childrenWidget: ['column'],
      category: ['数据展示'],
    },
    target: Table,
    screenshot:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADoAAAApCAYAAABk+TodAAAAAXNSR0IArs4c6QAAA6RJREFUaAXtmE1oE0EUx99sU0s1bbEpWmNLRWioNyu5SEELHoIoatGoRQ+eih69eRQ86s2Tn2AtWEOVlEpCBbEiqC1VxA8IUcFSLUpJaZoUTdNNnFmYMNPMwiQzh7XJQnhv38777XuZ2Z0/i6anp/NQAYeL9Ojz+bS0Ojc3B16vVwuLQHTx4vE4GNqqcjiIa3QptQzkR47MShbmE4vw528GEgtJK5bHi5zEVvA1mcNJPK7RxaU03LgXhiS24cgLmHr3GQA3NxiKQuzrDEy+/QSPn0yAYXBptj07iVczMDBw2ePxWMU2NbrBNHMQffYasqsmnDx6AOrqasG7tQVGoy9h5scvOHM8AO5N9cLmUqkUNDQ0FK45hZdIJIqf0V2dHdby7dzZBi5XjVW0t7XF8j2bm6AZ/0o5nMLj1uAqnsVHeGnu27sb3n/8ArM/f1s9jT9/A9txswgheDX1QbpPJ/Gs7YVW/nRiCi/LjdDbswfI7JGme3u6If5tFs6f67NeTLeHxqCjvRXavFtomq11Eg8RwVDdR23n6v+7YM2orrLdbjek02ldONDK06l1Y7GYVt2si0d65F5GD8Lj7c31sBAIBJYjkUhdMoO2ATJMmVh/38HvoqmUZdrls0wVFre9QDa7YyG5cp/Ak8vmdawauqVjbEWsL8tkc+x8BZb1jPr9fkTZw6GxSzkAv4Hys6eDRy6SuGyMLLWurq4Cq1QmHU+tiCdbC2UQS5YuP6M4aEDtCNYFh8FwPaSDZWN0/Fqrms/yymVxjZLn0kTZW/i53J8zzav4vFE2xhbD+qr5ulhco8m0eS2P0J3+E4cmDQRX8PlN2RhbEOur5mtjVcr2ws0o+++tN7+qjMqZUV1Kht5bF69IGdEbsFZFjRCOaj5bC/XLYXLPaDAY3EBhBaugRiyGan6hEMYpg8kpo2Onzl7II2N+dHhwhME6ShnRukpRSEJlhHI5bpYJuFw1QotSzacc1pbK5JrKLCXuhkNDIRaoqmxU89laqF8Ok2s0Go1mKIxaVWWjmk/rYG1ZzEpRRlXBwC4VWV/XBk/vp4tXJBhkN2LR5xW7TyGyTLt82jSxKizuZST92US0YbMVsb5orCjG5tj5ojxRTJDPCQZyXXYjFo0jS636KUXi84xgIopCpQoFCuCWruxGLBpHgWutaKwotjZPdC7KE8VEuVyjshuxaJwITmKisaKYXT4bF+WJYmxOwa8UwcDNaKH7dehoVUZO/n/+Af4e9AJpIkjUAAAAAElFTkSuQmCC',
  },
  Tabs: {
    meta: {
      widgetName: 'Tabs',
      title: '标签页',
      desc: '选项卡切换组件',
      props: {
        activityValue: {
          type: 'string',
          desc: '当前激活 tab 面板的 key',
          defaultValue: 'undefined',
        },
        defaultActivityValue: {
          type: 'string',
          desc: '默认激活 tab 面板的 key',
          defaultValue: '0',
        },
        viewClass: { type: 'string', desc: '用于配置通用主题属性', defaultValue: 'undefined' },
        tabType: {
          type: 'TabType',
          desc: '可配置三种风格的标签页.可选 线性,卡片,窗口风格',
          defaultValue: 'line',
        },
        tabPosition: {
          type: 'TabPositionType',
          desc: '页签位置，可配置 左,右,上,下',
          defaultValue: 'top',
        },
        children: {
          type: 'React$Element<any>',
          desc: '配置标签页需要包含的子组件,若有data,以data优先',
          defaultValue: 'undefined',
        },
        data: {
          type: 'Array<Object>',
          desc: '配置标签页需要配置的数据,',
          defaultValue: 'undefined',
        },
        defaultData: {
          type: 'Array<Object>',
          desc: '默认配置标签页需要配置的数据,',
          defaultValue: 'undefined',
        },
        forceRender: {
          type: 'boolean',
          desc: '是否一次性显示标签页下的内容',
          defaultValue: 'false',
        },
        pagedType: {
          type: 'PagedType',
          desc: '翻页类型,可配置单个滑动,整页滑动',
          defaultValue: 'single',
        },
      },
      events: {
        onTabClick: {
          desc: 'tab 被点击的回调',
          args: [{ name: 'event', desc: '点击标签页时调用DOM事件', type: '' }],
        },
        onChange: {
          desc: 'tab改变时触发',
          args: [{ name: 'event', desc: '标签页改变内容的DOM事件', type: 'Object' }],
        },
        onNextClick: {
          desc: '点击向下滑动按钮时调用',
          args: [{ name: 'event', desc: '向下滑动时事件', type: 'Object' }],
        },
        onPreClick: {
          desc: '点击向上滑动按钮时调用',
          args: [{ name: 'event', desc: '向上滑动时事件', type: 'Object' }],
        },
        onAddClick: {
          desc: '点击添加按钮后回调',
          args: [{ name: 'event', desc: '要添加的标签页对象', type: 'Object' }],
        },
        onDeleteClick: {
          desc: '点击清除按钮后回调',
          args: [{ name: 'event', desc: '要删除的标签页对象', type: 'Object' }],
        },
      },
      type: {
        TabType: ['line', 'card', 'window'],
        PagedType: ['single', 'page'],
        TabPositionType: ['top', 'bottom', 'inner', 'default'],
      },
      childrenWidget: ['tabpane', 'tabcontent'],
      category: ['数据展示'],
    },
    target: Tabs,
    screenshot:
      'data:image/png;base64,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',
  },
  Tag: {
    meta: {
      widgetName: 'Tag',
      title: '标签',
      desc: '标记和分类的标签',
      props: {
        closable: { type: 'boolean', desc: '标签是否可关闭', defaultValue: 'true' },
        shape: {
          type: ' basic | round ',
          desc: '标签的圆角, basic为4px圆角,round为圆角标签',
          defaultValue: 'basic',
        },
        type: {
          type: 'customs | primary | basic | presets | optional',
          desc: '标签的主题样式',
          defaultValue: 'customs',
        },
      },
      events: {
        onClick: {
          desc: '点击按钮时触发',
          args: [
            { name: 'event', desc: '点击的DOM事件', type: 'Object' },
            {
              name: 'checked',
              desc: '是否选中标签，只有在可选择标签( type: optional )生效',
              type: 'boolean',
            },
          ],
        },
        onClose: {
          desc: '关闭标签时触发',
          args: [{ name: 'event', desc: '改变内容的DOM事件', type: 'Object' }],
        },
      },
      type: { shape: ['basic', 'round'], type: ['customs', 'primary', 'basic', 'presets'] },
      category: ['数据展示'],
    },
    target: Tag,
    screenshot:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAUCAYAAADLP76nAAAAAXNSR0IArs4c6QAAAxRJREFUSA3VV01LalEUXZaZWPRhWFSPEqkoMTCsSYOggsKoSTRvVP+oySNwUk4aNHAUVOCooJAIMgp1kAaVSBR9U/Tu2nB82VPrRDzywPXcvc/HXvvstffxmi4uLvyvr6+/jecXSqiZTKaU8cybzs/Pk6UGXp0znSgrVfB0gtjLlDel2n/ZgbW1NVxfX4vfT09PuL29zXnu7++zZ8LxYDDIE8vqXl5e/tFlBzVezBpzc6am02k8Pz+Lbnd3F8fHxznjNTU1mJ6eFt3W1hYSiQQWFxdh8BZWqxVutxvxeFx0nET92NgY2tracvb5SDCdnZ39PZaPZhvjNzc32NnZwf7+Pjo7O9Hd3Q2Xy1VwJSOzsLCAubk5WVNdXQ2fzyfAp6amJGqRSAQzMzMF9yg2oB2BiooKNDY24uHhAQ0NDaBslOK8NqqqqkCqTE5Oor6+XoCnUimsrKxIFBhBOn95eZl3/WeU2g5UVlaCwHiyZrMZlMPhsNi6urrC3d0dmpubRfZ4POjp6RG6UK+o5vf7hTKrq6uoq6vD8PDwZ7DmnaNNIe6yvLwM5gCNDw0NoampCY+PjzDuFJycnKC/v19OmI7ydDc3N2FQVfhN+pSXlwsYRod0ZH44HA5MTEzAbrfnBVpIqe0AgW9sbEgCj4yMYG9vT8DSMKNBB0gX0mNwcFByhhRjVNbX1/PiGB0dxenpqcxhjug07TIai8Xk1GmE1YR0ODg4EJoow11dXTg6OhKRgMjzaDSKgYEBMHEzmQzGx8flvb29XcZYEHTB04C2A6RAS0uLwirlkyAsFktWR2rxHmCiq8aobG9vi9ja2iollAJLbLEqptYX6rUdeAuUmx4eHqKvr0/2V/cChY6ODjBabLzAnE4namtr5d3r9Ur0kskkbDabUO7tJSeLPvmjnQNq36WlJUk6XlisRqFQSKLBy6i3t1eqFCnGRA0EAmpZ0X52dlYcKzrp3eCXHWB1IXhVUfh3ge19hN7Z+3ZR+x5QCMjpt+1/A1e2tXNALfwpfRk/Cn4KGF0c8kFj/MyXohPETOx/ANA9TtYdx1gqAAAAAElFTkSuQmCC',
  },
  TimeLine: {
    meta: {
      widgetName: 'TimeLine',
      title: '时间轴',
      desc: '垂直展示的时间流信息',
      props: {
        children: { type: 'React.Node', desc: '时间轴需要包含的子组件', defaultValue: 'undefined' },
        data: { type: 'Array<Object>', desc: '时间轴填充的数据', defaultValue: 'undefined' },
        defaultData: {
          type: 'Array<Object>',
          desc: '时间轴填充的默认显示数据',
          defaultValue: 'undefined',
        },
        reverse: {
          type: 'boolean',
          desc: '控制节点排序，false 正序,true 倒序',
          defaultValue: 'false',
        },
        pending: { type: 'boolean', desc: '最后一个是否是幽灵节点', defaultValue: 'false' },
        pendingDot: {
          type: 'React.Node',
          desc: '当最后一个是幽灵节点时,指定其图标资源',
          defaultValue: 'undefined',
        },
        mode: {
          type: 'TimeLineMode',
          desc: '时间轴 描述信息的显示位置 ,可选择右侧或者交错显示.',
          defaultValue: 'right',
        },
      },
      type: { TimeLineMode: ['right', 'alternate'] },
      childrenWidget: ['timeLineItem'],
      category: ['数据展示'],
    },
    target: TimeLine,
    screenshot:
      'data:image/png;base64,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',
  },
  TimePicker: {
    meta: {
      widgetName: 'TimePicker',
      title: '时间选择器',
      desc: '用于时间选择,',
      props: {
        defaultValue: { type: 'string', desc: '时间默认显示值', defaultValue: 'undefined' },
        value: { type: 'string', desc: '时间显示值', defaultValue: 'undefined' },
        format: { type: 'string', desc: '用于指定输入框时间显示的格式', defaultValue: 'HH:mm:ss' },
        placeholder: { type: 'string', desc: 'input输入提示信息', defaultValue: 'undefined' },
        disabled: { type: 'boolean', desc: '禁用状态,是否不可用', defaultValue: 'false' },
        readOnly: { type: 'boolean', desc: '只读input', defaultValue: 'false' },
      },
      events: {
        onChange: {
          desc: '时间值发生变化时的回调',
          args: [{ name: 'event', desc: '时间值发生变化时的回调', type: 'ChangeType' }],
        },
        onFocus: { desc: '输入框获取焦点', args: [] },
        onBlur: { desc: '输入框失去焦点', args: [] },
      },
      type: { ChangeType: { newValue: 'string', oldValue: 'string', event: 'SyntheticEvent' } },
      category: ['数据录入'],
    },
    target: TimePicker,
    screenshot:
      'data:image/png;base64,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',
  },
  Tooltip: {
    meta: {
      widgetName: 'Tooltip',
      title: '文字提示',
      desc: '简单的文字气泡提示框',
      props: {
        size: {
          type: 'ToolTipSize',
          desc: "可配置三种尺寸大小的input ('大' , '默认' , '小'),高度分别为 40px、32px 和 24px。",
          defaultValue: 'default',
        },
        placement: {
          type: 'DirectionType',
          desc: '气泡提示框显示的位置,十二个方向',
          defaultValue: 'undefined',
        },
        visible: { type: 'boolean', desc: '是否显示出来', defaultValue: 'false' },
        defaultVisible: { type: 'boolean', desc: '默认是否显示出来', defaultValue: 'false' },
        popArrowType: {
          type: 'popArrowType',
          desc: '可配置两种风格的箭头. 尖角,圆角',
          defaultValue: 'sharp',
        },
        action: {
          type: 'Array<string>',
          desc: '页签位置，可配置 click,hover,focus',
          defaultValue: 'click',
        },
        children: {
          type: 'React.Node',
          desc: '气泡提示框需要包含的子组件',
          defaultValue: 'undefined',
        },
        title: {
          type: 'React.Node',
          desc: '配置气泡提示框需要显示的内容',
          defaultValue: 'undefined',
        },
      },
      events: {
        onVisibleChange: {
          desc: '气泡提示框改变时触发',
          args: [{ name: 'event', desc: '气泡提示框显示改变的DOM事件', type: 'Object' }],
        },
      },
      type: {
        ToolTipSize: ['small', 'default', 'large'],
        PopArrowType: ['sharp', 'round'],
        DirectionType: [
          'left',
          'leftTop',
          'leftBottom',
          'right',
          'rightTop',
          'rightBottom',
          'top',
          'bottom',
          'topLeft',
          'top',
          'topRight',
          'bottom',
          'bottomRight',
          'bottomLeft',
        ],
      },
      category: ['数据展示'],
    },
    target: Tooltip,
    screenshot:
      'data:image/png;base64,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',
  },
  Transfer: {
    meta: {
      widgetName: 'Transfer',
      title: '穿梭框',
      desc: '穿梭框。',
      props: {
        data: { type: 'Object[]', desc: '左右两个面板数据源', defaultValue: 'undefined' },
        showSearch: { type: 'boolean', desc: '是否展示搜索框', defaultValue: 'undefined' },
        filterOption: {
          type: 'Function',
          desc: '搜索条件函数，接收 inputValue 和 option 两个参数，可以自定义筛选条件',
          defaultValue: 'undefined',
        },
        value: { type: 'string[]', desc: '显示在右侧面板数据集合', defaultValue: 'undefined' },
        defaultValue: {
          type: 'string[]',
          desc: '显示在右侧面板初始数据集合',
          defaultValue: 'undefined',
        },
        sourceSelectedKeys: {
          type: 'string[]',
          desc: '左侧面板选中值的集合',
          defaultValue: 'undefined',
        },
        targetSelectedKeys: {
          type: 'string[]',
          desc: '右侧面板选中值的集合',
          defaultValue: 'undefined',
        },
        defaultSourceSelectedKeys: {
          type: 'string[]',
          desc: '左侧面板初始选中值的集合',
          defaultValue: 'undefined',
        },
        defaultTargetSelectedKeys: {
          type: 'string[]',
          desc: '右侧面板初始选中值的集合',
          defaultValue: 'undefined',
        },
        type: {
          type: 'TransferType',
          desc: '指定 Transfer 类型，可设置为tree 或不设',
          defaultValue: 'panel',
        },
        displayField: {
          type: 'string',
          desc: '指定 Transfer 面板展示字段值',
          defaultValue: 'text',
        },
        valueField: {
          type: 'string',
          desc: '指定 Transfer 面板选项 value 字段值',
          defaultValue: 'value',
        },
      },
      event: {
        onSelectChange: {
          desc: 'Transfer 选中回调',
          args: [
            {
              name: 'sourceSelectedKeys',
              desc: 'Transfer选中后，左侧面板选中值集合',
              type: 'string[]',
            },
            {
              name: 'targetSelectedKeys',
              desc: 'Transfer选中后，右侧面板选中值集合',
              type: 'string[]',
            },
          ],
        },
        onDirectionClick: {
          desc: 'Transfer 穿梭回调',
          args: [
            { name: 'nextValue', desc: 'Transfer穿梭后，右侧面板值的集合', type: 'string[]' },
            { name: 'direction', desc: '穿梭的方向，left、right', type: 'DirectionType' },
            { name: 'moveKeys', desc: '移动值的集合', type: 'string[]' },
          ],
        },
        onCancelItemClick: {
          desc: 'Transfer 取消选项点击回调',
          args: [
            { name: 'nextValue', desc: 'Transfer 右侧面板值的集合', type: 'string[]' },
            { name: 'newDisplayValue', desc: 'Transfer 右侧面板值的备用集合', type: 'string[]' },
          ],
        },
      },
      type: {
        TransferType: ['panel', 'tree'],
        DirectionType: ['left', 'right'],
        TransferStyle: {
          height: { type: 'number', desc: 'Transfer 的高度' },
          width: { type: 'number', desc: 'Transfer 的宽度' },
        },
      },
      category: ['数据录入'],
    },
    target: Transfer,
    screenshot:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADYAAAAgCAYAAABZyotbAAAAAXNSR0IArs4c6QAAAu1JREFUWAntWc9rE0EUfjO7CTQI2oMFmwqWilQpCJqTOSgoPYiYRmostMGDufXuxbP/RS+lFmoMjRHxR6X+QkUhf4AQLx4iqIc2GgLtZnedl0rYjW/rzu5OKdqBkJ3vvfe9983swtsdVq1WY4yx2wBQsG27X/wHGoJjTQTOCY5bqVTKkCFRUYOOohKJxGwymUzEYjGZely+hmH01+v12VarhfhNl/EvExU1cJGzEFYU1o2LgjzIh3PJEXkNHG+/MDvlFIA8QW5nFTXgju3K0fjRBMNod2ozTRPWG02gMK/iSWEUAYV5kUaBrzV+QunB8w7Vw5U38OXrd6Awr1ykMIqAwrxIe/FsNj+QmZo504tvNz9y+BAkBw/C0vIziItb/MSxYaAwLw5SGEVAYV6kvfgmN/cxi5Umrk2P99q2m4+NjsDHT59h7PhI143CukbHBSkM7RQBhTm4PC8519vA4ADnsWL2av6sp6PDgM9V+dFLKMxchqcvPsDGxiZQmCPEdUkKowgozMXka2Lrtmbpflwfr76H0ydHYWhwAM6lT0HlyWugMC8uMglFkOjr+yNRLnPBi9eFW1Zb51xrmKZ1o1JcXHUZPSaXxtNdy9HhIcCfc1CY004KC0vqTIDXcUtrMptPLhfn3/baVM1JYVEnK5cXvglO/O3YIJ+xHcuuMNGeMIWLq4R6b8eULKtC0v9rx6hOnsIULnhoanLHqE6ewmSzX8ldT2OnLxsXxJ8URnXyFCaTMJPLXzSZVcJOXyYuqC8pDMmoTp7C/CSemJo+r2m8yAD2dzp9P0EhfUhhVCdPYX5zM5OLd3y29Z7vNyikHymM6u4pzG/u8r2FV5Zl5MCGdez0/caF8SOTRN3dY4H37y6uiM8Dk3FDa4Yp2G8sKcxvsKxfZenOO9mYoP7krRiUbDfF/bvC8DBBfHePZLGR5/fhhBSfihpwx+bEYUIrrDiMRx7kk1K15Rx5DToe++AJSa1Wi+wYSVaYihp+Aag75nvoG9nhAAAAAElFTkSuQmCC',
  },
  Tree: {
    meta: {
      widgetName: 'Tree',
      title: '树形控件',
      desc: '清晰地展示层级结构的信息,可展开或折叠。',
      props: {
        start: { type: 'number', desc: '开始展示数据的索引值', defaultValue: '0' },
        query: { type: 'string', desc: '用于过滤数据的关键字', defaultValue: " '' " },
        mutliple: { type: 'boolean', desc: '是否多选', defaultValue: 'false' },
        limitCount: { type: 'number', desc: '多选时的最大选中数', defaultValue: '999999' },
        expandAll: { type: 'boolean', desc: '是否展开所有子元素', defaultValue: 'false' },
        onlySelectLeaf: { type: 'boolean', desc: '是否只能选择根节点选项', defaultValue: 'false' },
        valueField: { type: 'string', desc: 'data数据的value值的名称', defaultValue: 'key' },
        displayField: {
          type: 'string',
          desc: 'data数据的displayValue值的名称',
          defaultValue: 'title',
        },
        value: {
          type: 'string | string[] | number | number[]',
          desc: '指定当前选中的条目的valueField值',
          defaultValue: 'undefined',
        },
        displayValue: {
          type: 'string | string[] | number | number[]',
          desc: '指定当前选中的条目的displayField值',
          defaultValue: 'undefined',
        },
        data: { type: 'Array<Object>', desc: '生成选择项的数据', defaultValue: 'false' },
        igronSelectField: { type: 'string', desc: '指定不可选的标识', defaultValue: 'undefined' },
        searchType: {
          type: 'start | end | include | eql',
          desc: '生成过滤数据的方式',
          defaultValue: 'include',
        },
        shpale: {
          type: 'default | round',
          desc: '单选树形控件,选中时的样式',
          defaultValue: 'default',
        },
        translateTreeData: {
          type: 'boolean',
          desc: '是否开启嵌套数据生成Tree',
          defaultValue: 'false',
        },
      },
      events: {
        onScroller: {
          desc: '滚动条滚动时触发',
          args: [
            { name: 'start', desc: '显示区域内，第一个树节点所在数据中的索引值', type: 'number' },
            { name: 'end', desc: '显示区域内，最后树节点所在数据中的索引值', type: 'number' },
          ],
        },
        onExpand: {
          desc: '展开/收起节点时触发',
          args: [
            { name: 'expandedKeys', desc: '所有展开节点的valueField值的集合', type: 'string[]' },
            { name: 'data', desc: '所有的树形数据信息', type: 'Array<Object>' },
          ],
        },
        onSelect: {
          desc: '选择树节点时触发',
          args: [{ name: 'selectValue', desc: '所有选中项的valueField值的集合', type: 'string[]' }],
        },
        onChange: {
          desc: '选中节点发生改变时触发',
          args: [
            { name: 'selectValue', desc: '所有选中项的valueField值的集合', type: 'string[]' },
            {
              name: 'selectDisplayValue',
              desc: '所有选中项的displayField值的集合',
              type: 'string[]',
            },
          ],
        },
      },
      category: ['数据录入'],
    },
    target: Tree,
    screenshot:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAjCAYAAADWtVmPAAAAAXNSR0IArs4c6QAAA7lJREFUWAntWN9rFFcUPufeO5tYlm7BGmoeGiwqviilfdCAb1Is1LTJ1t1mo1kMyT8gEfpQKIuofSgWH1qhaQvNJupm1mwiWqGluoimfSy0FPLQSh8iSkyLLRtidufe0zupE6brFu/FzULDDgxn5pvz6zszd/i4CIbH5ORXHVIqL5nsuuOHuO7VTQAsxrms2ODJ5Ou/GJa0cmOm3svEYh5CsVD4dmOxWGz1QH4jsdJhi5vWs/XDbLbQxjlFpSM9P5hXuJASS+l0fL46WS5/eYiADgDgnH62kEp0ZXwfW9yPqffBWAvfho4zI6Bl1j/BEbfQYVtrFepNdH2ucU4Ee3oPHjge+NjiQVw9LTv8zlszRGqQCJVOXCaljvSnur+rVcR1v94ChNv1s0hu8uorgY8tHsTV02KQbPzC1D7GyetLxm8EWNi67s8RD27fZEgZQnEPlDzHobUToH3JBk8mX/sznLde16tEnpTwvHv5jCZBvYk3j/q+5/NXhoFIE4E5G7wv2XXwSbWaz5sTaE6gOYH1PwHj36/JKOJ9gx1cVLx8NrsiLBMDA5ugwmJSgRY+5nh+/AtrYVlXIm+n0rsUwUWIQGeMscUHS+p7gXiMkO7b4Bdzo9dMBhf2MSbS09PfVmYyyphYEZdKeSKieGlqauxf4jKeSg9pLaaFJc0h4EIhl834BW3xcJMm18YyXgvJbULwGc5o1j8dzm+pFnpMXBYuZP8RloB7du14aVVY2uImzYd9jIkU3NEZIBhkjCnGeBlQHbmUG39MXCb6h7boAtu1b+Sn2V9XhaUtHm7S5Nr40wqSdfce2oeSeVP5sRsBFthEJhPxZm/f1J9WhiPc03L6nHhWC8t2LSwt8PzIiLWwtCYSNF3L9qTSZ0ghTU+MrgjLeKp/WCnoRIZzNvj0xFhTWNYa8P8Kq+unFWb+xhC9Gr5f62vjv9ZaN/K0+dcNEfG0kzCJ55XiC4COlGLvfd8f6YfnUM1HUeltAAtc8f3+NlTNoyFvBGkhypa+/FTJH2OaQISXzn4iyr9ttsVrMngENmyxO0snu0Hd3at3kuaBWh5Uoh+M+D3Y4v9FpiFvxC9e2fDetN514UClneVnjn8WNGSLB3HVtmFEhHe9HWH5RSJyxLK7I2jEFg/iqm1DFjuxvwR7OHHK4y+fZvz531n52gmSuwek0/bQBld8a6maQHDfkDXiLB4b1luy5EU//Mgv7Cy+f5joj52IrfM2uBf9+N2g8WrbECLVRdfivmFrZC2aD+dcN0T+BteOozdt+9xRAAAAAElFTkSuQmCC',
  },
  TreeSelect: {
    meta: {
      widgetName: 'TreeSelect',
      title: '树形选择控件',
      desc: '类似Select选择器，弹出面板是一个树形控件，可以清晰地展示层级数据结构。',
      props: {
        validateStatus: {
          type: 'ValidateStatus',
          desc: "input校验状态, 'success' 成功 | 'error'错误",
          defaultValue: 'success',
        },
        data: { type: 'Array<Object>', desc: '生成选择项的数据', defaultValue: 'false' },
        valueField: { type: 'string', desc: 'data数据的value值的名称', defaultValue: 'key' },
        displayField: {
          type: 'string',
          desc: 'data数据的displayValue值的名称',
          defaultValue: 'title',
        },
        translateTreeData: {
          type: 'boolean',
          desc: '是否开启嵌套数据生成Tree',
          defaultValue: 'false',
        },
        start: { type: 'number', desc: '开始展示数据的索引值', defaultValue: '0' },
        query: { type: 'string', desc: '搜索框关键字', defaultValue: " '' " },
        mutliple: { type: 'boolean', desc: '是否多选', defaultValue: 'false' },
        limitCount: { type: 'number', desc: '多选时的最大选中数', defaultValue: '999999' },
        expandAll: { type: 'boolean', desc: '是否展开所有子元素', defaultValue: 'false' },
        onlySelectLeaf: { type: 'boolean', desc: '是否只能选择根节点选项', defaultValue: 'false' },
        label: { type: 'string', desc: '标注文本', defaultValue: 'undefined' },
        value: {
          type: 'string | string[] | number | number[]',
          desc: '指定当前选中的条目的valueField值',
          defaultValue: 'undefined',
        },
        displayValue: {
          type: 'string | string[] | number | number[]',
          desc: '指定当前选中的条目的displayField值',
          defaultValue: 'undefined',
        },
        disabled: { type: 'boolean', desc: '是否禁选', defaultValue: 'false' },
        placeholder: { type: 'string', desc: '占位符', defaultValue: 'undefined' },
        mode: {
          type: 'local | remote',
          desc: '指定检索是本地检索还是远程检索',
          defaultValue: 'local',
        },
        canSearch: { type: 'boolean', desc: '是否支持查询', defaultValue: 'false' },
        throttle: { type: 'number', desc: '检索数据的延迟,单位为毫秒', defaultValue: '200' },
        canInput: {
          type: 'boolean',
          desc: '是否支持自定义值,只有在canSearch为true时才生效',
          defaultValue: 'false',
        },
      },
      events: {
        onSelect: {
          desc: '选择树节点时触发',
          args: [
            { name: 'Target', desc: '所有选中项的valueField值和dispalyField值', type: 'Object' },
          ],
        },
        onChange: {
          desc: '选中节点发生改变时触发',
          args: [
            { name: 'Target', desc: '所有选中项的valueField值和dispalyField值', type: 'Object' },
          ],
        },
        onQuery: {
          desc: '搜索框的值改变时触发',
          args: [{ name: 'query', desc: '搜索框中的值', type: 'string' }],
        },
        onRefresh: {
          desc: '点击刷新按钮时触发',
          args: [{ name: 'event', desc: '刷新内容事件', type: 'bject' }],
        },
      },
      category: ['数据录入'],
    },
    target: TreeSelect,
    screenshot:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAhCAYAAACfiCi5AAAAAXNSR0IArs4c6QAAAtZJREFUWAntWE1oE1EQnveSUisitfgXtSjiQUVaAnvxJJ5CkrYoGDFntYIHwVsp6MFCL/ak4CG1J8GfWrAYSCt4UPSihCAiHkVs0JOlKY2abnfXN9kuTZZ9b1/YTcJCAmH3fTNv9puZ3Z2ZJYVCIa7regYADrF/kH5FSuloGMmHQqFr0Wg0FyT2+Xw+WQ08OzGCRLyWK3KntUAQzwPvQFgU9RvjX279Wjl6+1+lx1FvW/ffjUjvtzv3Jk9NiOw0UybMgIg8kkLHUKeZBN1sO0bW2sSLvCXHo13nyfyr/r4eWI7FYuVcLtddqpAIEKrJYOnz8e+1tmXOhRngGRg4DnDsMEeqqkeWS+uPUFoqa/dB3YiCLMYxKYKlHNi9C4AQ08zgCVbxIgA/fjqbTaeG3jHVj49ns3MEjHL64vALWczZohiVcgAJnz0NMHgS4MA+gMW3AOsq3zCFrjnm8BDQ8DNLSxaz9GWPUg58+gqwusbI7zXJ6zrfPN73GlGn2X1/Rte0u2y9UxbjW+VLpBzA7fnPAAtvAAyXul1a06YMQmbSF5IfKIEJts7IYnyafAnBcqwoyuYdXq+Yuv5Htb9l6jUAsBY8f7C9y463Yu3aSmCRQoI8MlYh48lbgneauZaEmX8R6YeYb6K9EnSgyG6jZHtpNH71Tc5FEvSRsnHXOzs6EaiLgGMFrtMQLM5dNeK6ARnWXjh+kmENXZG1E6Pz02RBYMaTyNNrVEQeWaFjqOOJoctm4UTmsrdKsFEdvyc2TxngkW/lxObpGRi+bDbXOLH9XjFbbZzYDu4HeP1+a+jJzljznOny09nsGBspFEqMpUupkZuIymL2oPmSgXZObL5kAKOiDADs6TMnNvvQU5uB6peKsrbIJrYxQ9eneneEsI2psA8ArlgikVhtSgbQaLsmNk8ZGLliLPFqgBUprAUvH5J+a+330dMzgEUKCfJIWYWMJ/cD/w/VReSMk9N1nwAAAABJRU5ErkJggg==',
  },
  Upload: {
    meta: {
      widgetName: 'Upload',
      title: '上传',
      desc: '上传组件,可通过文件选择和拖拽上传',
      props: {
        data: { type: 'Object', desc: '上传时附带的额外参数', defaultValue: 'undefined' },
        listType: {
          type: 'UploadType',
          desc: '文件列表的类型 支持5种类型(default/both/button/picture/area)',
          defaultValue: 'default',
        },
        disabled: { type: 'boolean', desc: '禁用状态', defaultValue: 'false' },
        limit: { type: 'number', desc: '一次性可允许上传的最大文件数', defaultValue: 'undefined' },
        multiple: { type: 'boolean', desc: '是否允许多个文件上传', defaultValue: 'false' },
        showFileList: { type: 'boolean', desc: '是否显示上传列表', defaultValue: 'false' },
        fileList: {
          type: 'array',
          desc: "上传的文件列表,如 [{ id: 1, name: 'header.jpg', status: 'done' }]",
          defaultValue: 'undefined',
        },
        withCredentials: {
          type: 'boolean',
          desc: '上传请求时是否允许携带cookie凭证',
          defaultValue: 'false',
        },
        autoUpload: { type: 'boolean', desc: '是否允许自动上传', defaultValue: 'true' },
        url: { type: 'string', desc: '上传的请求地址(必填参数)', defaultValue: 'undefined' },
        size: {
          type: 'UploadSize',
          desc: 'picture类型可配置的三种尺寸(small/default/large)',
          defaultValue: 'default',
        },
      },
      events: {
        onProgress: {
          desc: '上传进行中时触发',
          args: [{ name: 'result', desc: '上传进行中服务器响应内容', type: 'Object' }],
        },
        onSuccess: {
          desc: '上传成功时触发',
          args: [{ name: 'result', desc: '上传成功后服务器响应内容', type: 'Object' }],
        },
        onComplete: {
          desc: '上传完成时触发',
          args: [{ name: 'result', desc: '上传完成后服务器响应内容', type: 'Object' }],
        },
        onChange: {
          desc: '添加上传文件时触发',
          args: [{ name: 'result', desc: '选中文件', type: 'Object' }],
        },
        onFail: {
          desc: '上传失败时触发',
          args: [{ name: 'result', desc: '上传失败后服务器响应内容', type: 'Object' }],
        },
      },
      type: {
        UploadSize: ['small', 'default', 'large'],
        UploadType: ['default', 'both', 'button', 'picture', 'area'],
      },
      category: ['数据录入'],
    },
    target: Upload,
    screenshot:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADEAAAAaCAYAAAAe97TpAAAAAXNSR0IArs4c6QAAAtBJREFUWAntl01oE0EUx7ubxI8chIiCHjRH0aIobVEQUVARRMSDgkIwGvIBHhQverOtVSoWPZsPkkYiSOitByFiQfAiLSQaFT9O4sGLShQSGvLlb0MK6bBJN8w2sOLC5M28/5t9/zdv5mV2IBaLHYxEIiPhcLgxwGMlCe9vtGMKP6cbjcbnUCj0UQvCSg/cB1VVLWsrn7MScZEr/Auq3W73ioDFxm61Wq0mLUZapPv1n8iEvZWJvWJ4smMO3QjvuEHRGEbWFUVZ4BDe8/v9Wdl3C/NXJxMctqs4ytAWOHPnCOA87U29Xp8DCwkkZIdu0zMByf2wuk0GDghlex5sFuwVWXodDAbNqoqrkonrrPqkEEBztdHl2VIPGVxrKsz5Ma86sfJKNBodgtdR+s878SOIDPgJbgr7tDmd7HrQm5MJtsluAshD6hlZyHIOvnQigc0nbN7XarUMc3LxeHxXJ1uDevkzAYnNVLgXEJui8jxA1pecp1KpDaVS6bHT6bzo8Xj+aHpsfiGOE4xKEDeZO5dMJge9Xu/PpXk9SvlMVCqVOxCaCQQCU+0BoFMI4AnyZLFYnNfG7eQ0Ww73JPrZcrk82o712Jc/E5A5QkuIjqlA4xDcATYNtkkbizbauDX3kB5mUCefCYhugch30SG6bQ6H4wz63/SfIreLNtq4NXerHmZQZ0om8jjTqtKyh61y2efzfWhtox+U10vLDFoD/gCHsXmnhxnUyWeClUxA4m46nV6v5xS8Cl7Vw6hqTvQT4NN6uEGdW+FFOVZJ6u7Efp+ByE6cjtlstiz9xW4ECGwdNkNkYZx+lqxd6GbfDYN/gZIu/z0BibMEEsDZFYjtQa7t5hibRci/pd1nbrybrQHM/f/LzsAq9cNEvjr1g+UKPuSr0woO+gE3MzHBjXJjP7yZ7UPjTXFIKNT3NYVCIcoV+RZV4yXysFUkN+FHLpfr1F+2/OkPfg65aAAAAABJRU5ErkJggg==',
  },
};
