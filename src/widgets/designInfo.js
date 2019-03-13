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
import CheckBox from './checkbox';
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
import Message from './message';
import Modal from './modal';
import NavMenu from './navmenu';
import Notification from './notification';
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
        getTheme: { type: 'Function', desc: '用于配置通用主题属性', defaultValue: 'undefined' },
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
  },
  Alert: {
    meta: {
      widgetName: 'Alert',
      title: '警告提示',
      desc: '警告提示信息。',
      props: {
        getTheme: { type: 'Function', desc: '用于配置通用主题属性', defaultValue: 'undefined' },
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
  },
  AmountInput: {
    meta: {
      widgetName: 'AmountInput',
      title: '金额输入框',
      desc: '用于金额数字的填写,可切换人民币大小写显示效果.',
      props: {
        getTheme: { type: 'Function', desc: '用于配置通用主题属性', defaultValue: 'undefined' },
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
  },
  AutoComplete: {
    meta: {
      widgetName: 'AutoComplete',
      title: '自动完成',
      desc: '需要自动完成数据时使用',
      props: {
        getTheme: { type: 'Function', desc: '用于配置通用主题属性', defaultValue: 'undefined' },
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
  },
  Avatar: {
    meta: {
      widgetName: 'Avatar',
      title: '头像',
      desc: '用来代表用户或事物，支持图片、图标或字符展示。',
      props: {
        getTheme: { type: 'Function', desc: '用于配置通用主题属性', defaultValue: 'undefined' },
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
  },
  BackTop: {
    meta: {
      widgetName: 'BackTop',
      title: '回到顶部',
      desc: '返回页面顶部。',
      props: {
        getTheme: { type: 'Function', desc: '用于配置通用主题属性', defaultValue: 'undefined' },
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
  },
  Badge: {
    meta: {
      widgetName: 'Badge',
      title: '徽标数',
      desc: '图标右上角的圆形徽标数字',
      props: {
        getTheme: { type: 'Function', desc: '用于配置通用主题属性', defaultValue: 'undefined' },
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
  },
  Button: {
    meta: {
      widgetName: 'Button',
      title: '按钮',
      desc: '方便用户点击操作',
      props: {
        getTheme: { type: 'Function', desc: '用于配置通用主题属性', defaultValue: 'undefined' },
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
    },
    target: Button,
  },
  Card: {
    meta: {
      widgetName: 'Card',
      title: '卡片',
      desc: '卡片容器，可添加文字、列表、图片等',
      props: {
        getTheme: { type: 'Function', desc: '用于配置通用主题属性', defaultValue: 'undefined' },
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
  },
  Carousel: {
    meta: {
      widgetName: 'Carousel',
      title: '走马灯',
      desc: '常用于展示一组图片或卡片轮播',
      props: {
        getTheme: { type: 'Function', desc: '用于配置通用主题属性', defaultValue: 'undefined' },
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
            {
              name: 'oldValue',
              desc: '本次的索引值',
              type: 'number',
            },
          ],
        },
      },
      category: ['数据展示'],
    },
    target: Carousel,
  },
  Cascader: {
    meta: {
      widgetName: 'Cascader',
      title: '级联选择',
      desc: '通过级联选择,可以清晰地显示层级数据结构',
      props: {
        getTheme: { type: 'Function', desc: '用于配置通用主题属性', defaultValue: 'undefined' },
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
  },
  CheckBox: {
    meta: {
      widgetName: 'CheckBox',
      title: '多选框',
      desc: '多选框。',
      props: {
        getTheme: { type: 'Function', desc: '用于配置通用主题属性', defaultValue: 'undefined' },
        checked: { type: 'boolean', desc: '指定CheckBox是否选中', defaultValue: 'undefined' },
        defaultChecked: {
          type: 'boolean',
          desc: '指定CheckBox初始是否选中',
          defaultValue: 'undefined',
        },
        disabled: { type: 'boolean', desc: '指定CheckBox是否禁用', defaultValue: 'undefined' },
        indeterminate: {
          type: 'boolean',
          desc: '设置半选状态，只用于样式控制',
          defaultValue: 'undefined',
        },
        value: { type: 'string', desc: '组件value值', defaultValue: 'undefined' },
        styles: {
          type: 'CheckboxType',
          desc: 'CheckBox展示方向，可选值为 vertical 或不设',
          defaultValue: 'false',
        },
      },
      events: {
        onChange: {
          desc: 'CheckBox改变时回调',
          args: [
            { name: 'event', desc: '关闭时的DOM事件', type: 'Object' },
            {
              name: 'checked',
              desc: '当前是否选中',
              type: 'boolean',
            },
          ],
        },
      },
      type: {
        CheckboxType: ['default', 'vertical'],
        CheckBoxStyle: {
          width: { type: 'number', desc: 'CheckBox宽度' },
          color: { type: 'string', desc: 'CheckBox颜色' },
        },
      },
      childrenWidget: ['checkbox-group'],
      category: ['数据录入'],
    },
    target: CheckBox,
  },
  Collapse: {
    meta: {
      widgetName: 'Collapse',
      title: '折叠面板',
      desc: '折叠面板，用于展开/折叠内容区域。',
      props: {
        getTheme: { type: 'Function', desc: '用于配置通用主题属性', defaultValue: 'undefined' },
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
      },
      events: {
        onChange: {
          desc: 'Collapse面板展开/折叠时回调',
          args: [
            { name: 'event', desc: '关闭时的DOM事件', type: 'Object' },
            {
              name: 'value',
              desc: '变化Collapse的value值',
              type: 'string',
            },
          ],
        },
      },
      type: {
        CollapseStyle: {
          width: { type: 'number', desc: 'Collapse宽度' },
          color: { type: 'string', desc: 'Collapse颜色' },
        },
      },
      category: ['数据展示'],
    },
    target: Collapse,
  },
  DatePicker: {
    meta: {
      widgetName: 'DatePicker',
      title: '日期选择器',
      desc: '用于日期选择',
      props: {
        getTheme: { type: 'Function', desc: '用于配置通用主题属性', defaultValue: 'undefined' },
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
  },
  Drawer: {
    meta: {
      widgetName: 'Drawer',
      title: '抽屉',
      desc: '在屏幕边缘出现的浮层面板。',
      props: {
        getTheme: { type: 'Function', desc: '用于配置通用主题属性', defaultValue: 'undefined' },
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
  },
  Dropmenu: {
    meta: {
      widgetName: 'Dropmenu',
      title: '下拉菜单',
      desc: '选项过多时，弹出下拉菜单给用户选择操作',
      props: {
        getTheme: { type: 'Function', desc: '用于配置通用主题属性', defaultValue: 'undefined' },
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
  },
  Grid: {
    meta: {
      widgetName: 'Grid',
      title: '栅格',
      desc: '栅格',
      childrenWidget: ['col', 'row'],
      category: ['布局'],
    },
    target: Grid,
  },
  Icon: {
    meta: {
      widgetName: 'Icon',
      title: '图标',
      desc: '语义化的矢量图形',
      props: {
        getTheme: { type: 'Function', desc: '用于配置通用主题属性', defaultValue: 'undefined' },
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
  },
  Input: {
    meta: {
      widgetName: 'Input',
      title: '文本输入框',
      desc: '常用于昵称,名称,表格内容等填写.',
      props: {
        getTheme: { type: 'Function', desc: '用于配置通用主题属性', defaultValue: 'undefined' },
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
        autoFoucs: { type: 'boolean', desc: '是否自动获取焦点', defaultValue: 'false' },
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
  },
  Layout: {
    meta: {
      widgetName: 'Layout',
      title: '布局',
      desc: '页面整体布局。',
      props: {
        getTheme: { type: 'Function', desc: '用于配置通用主题属性', defaultValue: 'undefined' },
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
  },
  Loading: {
    meta: {
      widgetName: 'Loading',
      title: '加载中',
      desc: '用于页面和区块的加载中状态',
      props: {
        getTheme: { type: 'Function', desc: '用于配置通用主题属性', defaultValue: 'undefined' },
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
  },
  Menu: {
    meta: {
      widgetName: 'Menu',
      title: '菜单',
      desc: '为用户提供菜单列表',
      props: {
        getTheme: { type: 'Function', desc: '用于配置通用主题属性', defaultValue: 'undefined' },
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
            {
              name: 'keys',
              desc: '所有的选中值',
              type: 'Object',
            },
            { name: 'item', desc: '当前选中项的数据', type: 'Object' },
          ],
        },
        onMouseEnter: {
          desc: '鼠标进入列表项时触发',
          args: [
            { name: 'event', desc: '选中DOM的事件对象', type: 'Object' },
            {
              name: 'item',
              desc: '当前鼠标进入的列表项数据',
              type: 'Object',
            },
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
  },
  Message: {
    meta: {
      widgetName: 'Message',
      title: '全局提示',
      desc: '全局提示，展示操作反馈信息。',
      props: {
        content: { type: 'React.node', desc: '提示消息的内容', defaultValue: 'undefined' },
        time: { type: 'number', desc: '自动延时关闭，单位为 秒', defaultValue: '2' },
        callBack: { type: 'Function', desc: '关闭时的回调', defaultValue: 'undefined' },
      },
      category: ['反馈'],
    },
    target: Message,
  },
  Modal: {
    meta: {
      widgetName: 'Modal',
      title: '对话框',
      desc: 'Modal 对话框。',
      props: {
        getTheme: { type: 'Function', desc: '用于配置通用主题属性', defaultValue: 'undefined' },
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
  },
  NavMenu: {
    meta: {
      widgetName: 'NavMenu',
      title: '导航菜单',
      desc: '为页面提供导航功能的菜单',
      props: {
        getTheme: { type: 'Function', desc: '用于配置通用主题属性', defaultValue: 'undefined' },
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
  },
  Notification: {
    meta: {
      widgetName: 'Notification',
      title: '通知提醒框',
      desc: 'Notification 通知提醒框。',
      props: {
        title: { type: 'React.node', desc: '标题', defaultValue: 'undefined' },
        duration: { type: 'number', desc: '自定义演示关闭', defaultValue: '4.5' },
        description: { type: 'React.node', desc: '通知提醒内容', defaultValue: 'undefined' },
        icon: { type: 'string', desc: '自定义图标', defaultValue: 'undefined' },
        placement: {
          type: 'PlacementType',
          desc: '弹出位置，topRight、bottomLeft、bottomRight、topLeft',
          defaultValue: 'topRight',
        },
      },
      type: { PlacementType: ['topRight', 'bottomLeft', 'bottomRight', 'topLeft'] },
      category: ['反馈'],
    },
    target: Notification,
  },
  NumberInput: {
    meta: {
      widgetName: 'NumberInput',
      title: '数字输入框',
      desc: '常用于数字输入,可以进行快速加减显示',
      props: {
        getTheme: { type: 'Function', desc: '用于配置通用主题属性', defaultValue: 'undefined' },
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
            {
              name: 'pageSize',
              desc: '每页条数',
              type: 'number',
            },
          ],
        },
        onShowSizeChange: {
          desc: 'pageSize 变化的回调',
          args: [
            { name: 'current', desc: '当前页数', type: 'number' },
            {
              name: 'size',
              desc: '每页条数',
              type: 'number',
            },
          ],
        },
      },
      category: ['导航'],
    },
    target: Pagination,
  },
  Popconfirm: {
    meta: {
      widgetName: 'Popconfirm',
      title: '气泡确认框',
      desc: '气泡式的确认框',
      props: {
        getTheme: { type: 'Function', desc: '用于配置通用主题属性', defaultValue: 'undefined' },
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
  },
  Popover: {
    meta: {
      widgetName: 'Popover',
      title: '气泡卡片',
      desc: '气泡式的卡片浮层',
      props: {
        getTheme: { type: 'Function', desc: '用于配置通用主题属性', defaultValue: 'undefined' },
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
  },
  Progress: {
    meta: {
      widgetName: 'Progress',
      title: '进度条',
      desc: '展示操作的当前进度。',
      props: {
        getTheme: { type: 'Function', desc: '用于配置通用主题属性', defaultValue: 'undefined' },
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
  },
  Radio: {
    meta: {
      widgetName: 'Radio',
      title: '单选框',
      desc: '单选框。',
      props: {
        getTheme: { type: 'Function', desc: '用于配置通用主题属性', defaultValue: 'undefined' },
        checked: { type: 'boolean', desc: '单选框是否选中', defaultValue: 'undefined' },
        defaultChecked: { type: 'boolean', desc: '单选框初始是否选中', defaultValue: 'undefined' },
        disabled: { type: 'boolean', desc: '单选框是否禁用', defaultValue: 'undefined' },
        value: { type: 'string', desc: '单选框的 value 值', defaultValue: 'true' },
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
  },
  Rate: {
    meta: {
      widgetName: 'Rate',
      title: '评分',
      desc: '评分组件',
      props: {
        getTheme: { type: 'Function', desc: '用于配置通用主题属性', defaultValue: 'undefined' },
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
            {
              name: 'result',
              desc: '点击后的所选值',
              type: 'Object',
            },
          ],
        },
        onChange: {
          desc: '分值改变时触发',
          args: [
            { name: 'event', desc: '鼠标移动的DOM事件', type: 'DOM 事件' },
            {
              name: 'result',
              desc: '鼠标移动时的所选值',
              type: 'Object',
            },
          ],
        },
      },
      category: ['数据录入'],
    },
    target: Rate,
  },
  Select: {
    meta: {
      widgetName: 'Select',
      title: '选择器',
      desc: '选项过多时，弹出下拉菜单给用户选择操作',
      props: {
        getTheme: { type: 'Function', desc: '用于配置通用主题属性', defaultValue: 'undefined' },
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
            {
              name: 'newDisplayValue',
              desc: '所有选中项的displayField的集合',
              type: 'string[]',
            },
            { name: 'newItem', desc: '所有选中项的数据的集合', type: 'Object[]' },
            {
              name: 'newValue',
              desc: '所有选中项的valueField的集合',
              type: 'string[]',
            },
            { name: 'oldItem', desc: '改变之前所有选中项的数据的集合', type: 'Object[]' },
            {
              name: 'oldValue',
              desc: '改变之前所有选中项的valueField的集合',
              type: 'string[]',
            },
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
            {
              name: 'newDisplayValue',
              desc: '所有选中项的displayField的集合',
              type: 'string[]',
            },
            { name: 'newItem', desc: '所有选中项的数据的集合', type: 'Object[]' },
            {
              name: 'newValue',
              desc: '所有选中项的valueField的集合',
              type: 'string[]',
            },
            { name: 'oldItem', desc: '改变之前所有选中项的数据的集合', type: 'Object[]' },
            {
              name: 'oldValue',
              desc: '改变之前所有选中项的valueField的集合',
              type: 'string[]',
            },
          ],
        },
        onRefresh: { desc: '点击刷新按钮时触发' },
      },
      category: ['数据录入'],
    },
    target: Select,
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
  },
  Slider: {
    meta: {
      widgetName: 'Slider',
      title: '滑动输入条',
      desc: '滑动型输入器，展示当前值和可选范围',
      props: {
        getTheme: { type: 'Function', desc: '用于配置通用主题属性', defaultValue: 'undefined' },
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
  },
  Steps: {
    meta: {
      widgetName: 'Steps',
      title: '步骤条',
      desc: '引导用户按照流程完成任务的导航条',
      props: {
        getTheme: { type: 'Function', desc: '用于配置通用主题属性', defaultValue: 'undefined' },
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
            {
              name: 'record',
              desc: '当前行数据',
              type: 'Object',
            },
          ],
        },
      },
      childrenWidget: ['column'],
      category: ['数据展示'],
    },
    target: Table,
  },
  Tabs: {
    meta: {
      widgetName: 'Tabs',
      title: '标签页',
      desc: '选项卡切换组件',
      props: {
        getTheme: { type: 'Function', desc: '用于配置通用主题属性', defaultValue: 'undefined' },
        activityKey: { type: 'string', desc: '当前激活 tab 面板的 key', defaultValue: 'undefined' },
        defaultActivityKey: { type: 'string', desc: '默认激活 tab 面板的 key', defaultValue: '0' },
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
  },
  Tag: {
    meta: {
      widgetName: 'Tag',
      title: '标签',
      desc: '标记和分类的标签',
      props: {
        getTheme: { type: 'Function', desc: '用于配置通用主题属性', defaultValue: 'undefined' },
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
  },
  TimeLine: {
    meta: {
      widgetName: 'TimeLine',
      title: '时间轴',
      desc: '垂直展示的时间流信息',
      props: {
        getTheme: { type: 'Function', desc: '用于配置通用主题属性', defaultValue: 'undefined' },
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
  },
  TimePicker: {
    meta: {
      widgetName: 'TimePicker',
      title: '时间选择器',
      desc: '用于时间选择,',
      props: {
        getTheme: { type: 'Function', desc: '用于配置通用主题属性', defaultValue: 'undefined' },
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
  },
  Tooltip: {
    meta: {
      widgetName: 'Tooltip',
      title: '文字提示',
      desc: '简单的文字气泡提示框',
      props: {
        getTheme: { type: 'Function', desc: '用于配置通用主题属性', defaultValue: 'undefined' },
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
  },
  Transfer: {
    meta: {
      widgetName: 'Transfer',
      title: '穿梭框',
      desc: '穿梭框。',
      props: {
        getTheme: {
          type: 'Function',
          desc: '用于配置通用主题属性，可配置 width、height',
          defaultValue: 'undefined',
        },
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
            {
              name: 'direction',
              desc: '穿梭的方向，left、right',
              type: 'DirectionType',
            },
            { name: 'moveKeys', desc: '移动值的集合', type: 'string[]' },
          ],
        },
        onCancelItemClick: {
          desc: 'Transfer 取消选项点击回调',
          args: [
            {
              name: 'nextValue',
              desc: 'Transfer 右侧面板值的集合',
              type: 'string[]',
            },
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
  },
  Tree: {
    meta: {
      widgetName: 'Tree',
      title: '树形控件',
      desc: '清晰地展示层级结构的信息,可展开或折叠。',
      props: {
        getTheme: { type: 'Function', desc: '用于配置通用主题属性', defaultValue: 'undefined' },
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
            {
              name: 'end',
              desc: '显示区域内，最后树节点所在数据中的索引值',
              type: 'number',
            },
          ],
        },
        onExpand: {
          desc: '展开/收起节点时触发',
          args: [
            { name: 'expandedKeys', desc: '所有展开节点的valueField值的集合', type: 'string[]' },
            {
              name: 'data',
              desc: '所有的树形数据信息',
              type: 'Array<Object>',
            },
          ],
        },
        onSelect: {
          desc: '选择树节点时触发',
          args: [{ name: 'selectValue', desc: '所有选中项的valueField值的集合', type: 'string[]' }],
        },
        onChange: {
          desc: '选中节点发生改变时触发',
          args: [
            {
              name: 'selectValue',
              desc: '所有选中项的valueField值的集合',
              type: 'string[]',
            },
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
        getTheme: { type: 'Function', desc: '用于配置通用主题属性', defaultValue: 'undefined' },
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
  },
  Upload: {
    meta: {
      widgetName: 'Upload',
      title: '上传',
      desc: '上传组件,可通过文件选择和拖拽上传',
      props: {
        getTheme: { type: 'Function', desc: '用于配置通用主题属性', defaultValue: 'undefined' },
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
  },
};
