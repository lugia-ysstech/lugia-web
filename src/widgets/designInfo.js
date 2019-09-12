import Alert from './alert';
import AmountInput from './amount-input';
import AutoComplete from './auto-complete';
import Avatar from './avatar';
import Badge from './badge';
import Breadcrumb from './breadcrumb';
import Button from './button';
import Card from './card';
import Carousel from './carousel';
import Cascader from './cascader';
import Checkbox from './checkbox';
import DatePicker from './date-picker';
import Divider from './divider';
import Dropmenu from './dropmenu';
import Icon from './icon';
import Input from './input';
import Label from './label';
import Loading from './loading';
import Menu from './menu';
import Navmenu from './navmenu';
import NumberInput from './number-input';
import Pagination from './pagination';
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
import Transfer from './transfer';
import Tree from './tree';
import TreeSelect from './tree-select';
import Upload from './upload';
export default [
  {
    meta: {
      widgetName: 'Alert',
      title: '警告提示',
      desc: '警告提示信息。',
      props: {
        type: {
          type: 'AlertType',
          desc: '指定警告提示的样式，有四种可以选择：success、error、info、warning',
          defaultValue: 0,
        },
        message: { type: 'React.node', desc: '警告提示内容' },
        showIcon: { type: 'boolean', desc: '是否展示图标', defaultValue: false },
        closeText: { type: 'React.node', desc: '自定义关闭按钮' },
        closable: { type: 'boolean', desc: '是否显示关闭按钮', defaultValue: false },
        description: { type: 'React.node', desc: '提示内容的辅助性文字介绍' },
        icon: { type: 'string', desc: '自定义图标，showIcon 为 true 时有效' },
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
      theme: {
        Container: {
          name: '警告提示整体样式',
          desc: '为警告提示配置整体样式',
          normal: [
            ['opacity'],
            ['margin'],
            ['padding'],
            ['width'],
            ['height'],
            ['background'],
            ['border', 'left'],
            ['borderRadius'],
            ['boxShadow'],
          ],
        },
        AlertMessage: {
          name: '警告提示内容样式',
          desc: '为警告提示内容配置样式',
          normal: [['color'], ['font']],
        },
        AlertDescription: {
          name: '警告提示辅助性文字样式',
          desc: '为警告提示辅助性文字配置样式',
          normal: [['color'], ['font'], ['padding']],
        },
        CloseText: {
          name: '警告提示关闭文字样式',
          desc: '为警告提示关闭文字配置样式',
          normal: [['color'], ['font']],
        },
        AlertIcon: {
          name: '警告提示图标样式',
          desc: '为警告提示图标配置样式',
          normal: [['color'], ['fontSize']],
        },
      },
      childrenWidget: [],
    },
    target: Alert,
    screenshot:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGwAAAAkCAYAAABsbd/MAAAAAXNSR0IArs4c6QAAAT5JREFUaAXt2zGKAkEUhOE3reIRDL2EZzAbEDY0FCPP4xE8gZln8BKGe4RlmZm1BaETm4JNquEfEAffQ4r66EScbnecvoYxzhGxer5i7GKT37m8GphF/C5TPFKJ5RWRNGUDQ8TiZ4x1en74OlnlkHvPBjJaBuNqqAHAGsLKUQEDrLEGGovLCQOssQYai8sJawxs/t+8++31rnzH5da/fkFx21eyO+1wwpw0hCyACSU5rQDmpCFkAUwoyWkFMCcNIQtgQklOK4A5aQhZABNKcloBzElDyAKYUJLTCmBOGkIWwISSnFYAc9IQsgAmlOS0ApiThpCl6w/TVO7xz9+yDb97TpifSTURYNV6/IaA+ZlUEwFWrcdvCJifSTURYNV6/IaA+ZlUE2Ww7+oGQ5sG8lOYaZbiBJqNyccg70dm/wDViifzwPhGcQAAAABJRU5ErkJggg==',
  },
  {
    meta: {
      widgetName: 'AmountInput',
      title: '金额输入框',
      desc: '用于金额数字的填写,可切换人民币大小写显示效果.',
      props: {
        disabled: { type: 'boolean', desc: '禁用状态,是否不可用', defaultValue: false },
        transform: {
          type: 'boolean',
          desc: "是否开启转换,仅在amountPrefix='¥'时生效",
          defaultValue: true,
        },
        viewClass: { type: 'string', desc: '用于配置主题属性' },
        size: {
          type: 'InputSize',
          desc:
            "可配置三种尺寸大小的input ('large' , 'default' , 'small'),高度分别为 40px、32px 和 24px。",
          defaultValue: 'default',
        },
        placeholder: { type: 'string', desc: 'input输入提示信息' },
        amountPrefix: { type: 'PrefixType', desc: "货币种类,默认'¥'", defaultValue: '¥' },
        defaultValue: { type: 'string', desc: '默认显示内容' },
        value: { type: 'string', desc: '显示内容' },
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
        PrefixType: ['¥', '$'],
        ChangeType: { newValue: 'string', oldValue: 'string', event: 'SyntheticEvent' },
      },
      category: ['数据录入'],
      theme: {
        InnerInput: {
          name: '金额输入框',
          theme: {
            Container: {
              name: '输入框外部容器',
              desc: '输入框外部容器',
              normal: [['width'], ['height'], ['margin'], ['padding']],
            },
            Input: {
              name: '金额输入框中输入框部分',
              desc: '金额输入框中输入框部分',
              normal: [
                ['width'],
                ['height'],
                ['fontSize'],
                ['font'],
                ['color'],
                ['background'],
                ['border'],
                ['borderRadius'],
                ['cursor'],
                ['opacity'],
              ],
              hover: [
                ['border'],
                ['borderRadius'],
                ['cursor'],
                ['background'],
                ['opacity'],
                ['boxShadow'],
              ],
              active: [['boxShadow'], ['border'], ['borderRadius'], ['cursor'], ['background']],
              disabled: [
                ['fontSize'],
                ['font'],
                ['color'],
                ['background'],
                ['border'],
                ['borderRadius'],
                ['cursor'],
                ['padding'],
                ['opacity'],
              ],
            },
          },
        },
        AmountInputPrefix: {
          name: '金额输入框主体前缀',
          desc: '金额输入框主体前缀',
          normal: [['fontSize'], ['font'], ['color']],
          hover: [],
          clicked: [],
          disabled: [],
        },
        AmountTip: {
          name: '金额切换提示',
          theme: {
            Container: {
              name: '输入框提示框外框部分',
              desc: '输入框提示框外框部分',
              normal: [['opacity'], ['background'], ['width'], ['height']],
              hover: [],
              clicked: [],
              disabled: [],
            },
            TooltipTitle: {
              name: '金额输入框提示信息文字部分',
              desc: '金额输入框提示信息文字部分',
              normal: [['fontSize'], ['font'], ['color']],
              hover: [],
              clicked: [],
              disabled: [],
            },
          },
        },
      },
      childrenWidget: [],
    },
    target: AmountInput,
    screenshot:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAAAoCAYAAAABk/85AAAAAXNSR0IArs4c6QAABFlJREFUaAXtm+9PW1UYx7+9jPaWH13Lr7ZjuGIyKW4TN5k6orC5LNmWJcMsTn3hiCaGF77xjfEv8QUkxsQ3mqgx6IwzkzmHzhXZxn5AutF1rcBaxiadFPoDCz7nKs31lpt0B2ihnJPc9NzDyfOc8/n2POfepxwDqHg8nuZwOPxFJBKpi8fjRaxNlFUjEDIYDOdNJtMHHR0d4wYG3+v1etxut+Ry1cNsNq+a52wMWyzlhmz6rdc+XV1dThLg1MLCwvuyLDcbenp67jocDldj49NrYk6FLsAi5O7u7g+p3iSxsMO++aLklgCtgE/p2i+xmJ/vsJPbqa8Nb52dnSEaiVNaG8PZuKMQAuRZeyFAoQgwMfknbvmCeZ7O+nO/YivAH7yHSwND649Anke8bAFisQT8wXGM3buP6ZkZ3L7zB2ZmY3me1vpxv4l3qPQMi59+uQLPlZuYm/s7bebzr8+C3vSw55kGHGzdC9lkTP9NVDIJcAtw5twl/H51GJbyUjQ3uRFLzCEUnkTjUy4M3hzB5WteTEdn8carhzK9ipY0Aa4QFJp4kIb/7lvHcWj/C6iutNK33YTWfbvx3jsnsMVRrYSjG8N30s5EJZMAlwDjoUnF0o6GepSWZCbvioqKKPw0K33Ek1EmdHULVwhKJJOKDYOkn7jcttWBl198Fiaj2APUwLV1rhXw5Latip3BGyO6TzySJOHAS8+h5fldWp/iXkWASwCnvRJ1tQ7MxuL46OMvlf1gPpVSmRXVbAlwCcCMnzp5GE07tyOeSOL73t/Q2zeAv6JRjI5PZOtb9CMCXHsAI8c22uOHW7FnVwOuD/swdMuPqcg0PvnsNCpsFmp3Y9/enco7gSCtT4BbgEWTdbV2Ckd2gr4ZA4PDsFdVwusL4McL/QiOhXDi2AEYjcWL3cWnhgB3CNLYUW4tZWU42X4Qb795DDVVNoz4R/HNmb6luoq2/whwCXB9yIdf+68hRpvwUoWtiNfb/30D9gXGkErNL9VNtBEBLgFYaOm9MIAAfeoVm7Wc3oarkEzOYfJhRK/bhm/nEqDWWaOA8/nHdAFSrg5Tj6K0CQOVtCmLsjQBLgEat7tQUiJT0u22ku/Rmp6fX6AV0q+EKKe9GsXFy97rtS4K5p6LjNlswpFXWvDV6XNg6We24bKsaHRmFt/+0EdPQUGCn4AsG9F+tK1gYK3GRLgEYAPZ4aZEXOlRfHf2Iu4/mFIu1v5w6pESdty0StpadqOqYjNrFkWHALcAzJ6rzqmkntkvYD9fvErP/WG0H2lToIuwo0Nc08y1B2hsKClpm9WCElkGyxMJ+FpC+vfLWgFqs/VPbIHNWqZuEvUsCKyYAI6aCrBLlMcjsCIh6PFcit5qAkIANY081IUAeYCudikEUNPIQ12iYzKpWEz8J1uu2bOjSuQzJFmt1tFA4G6u/W94f+ycGF3nN9H5sNfYIT0isiYO6RW6MhmH9NiExTHVnMr+v2Oq/wD8skvy6mYuDAAAAABJRU5ErkJggg==',
  },
  {
    meta: {
      widgetName: 'AutoComplete',
      title: '自动完成',
      desc: '需要自动完成数据时使用',
      props: {
        data: { type: 'string[]', desc: '自动补全的数据', defaultValue: [], meta: [] },
        createPortal: { type: 'boolean', desc: '是否全局弹出下拉框', defaultValue: true },
        value: { type: 'string', desc: '给定输入框的值' },
        defaultValue: { type: 'string', desc: '默认输入框的值，仅第一次生效' },
        showOldValue: { type: 'boolean', desc: '是否显示上一次选中的值', defaultValue: true },
        placeholder: { type: 'string', desc: 'input输入提示信息' },
        showAllLevels: { type: 'boolean', desc: '是否显示所有层级关系的值', defaultValue: true },
        prefix: { type: 'ReactNode', desc: '输入框前缀' },
        suffix: { type: 'ReactNode', desc: '输入框后缀' },
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
      theme: {
        AutoInput: {
          name: '自动完成输入框',
          theme: {
            Container: {
              name: '输入框外部容器',
              desc: '输入框外部容器',
              normal: [
                ['width'],
                ['height'],
                ['background'],
                ['border'],
                ['borderRadius'],
                ['boxShadow'],
                ['margin'],
                ['padding'],
              ],
            },
            InputSuffix: {
              name: '后缀图标',
              desc: '输入框后缀自定义图标',
              normal: [['color'], ['fontSize']],
              hover: [],
              clicked: [],
              disabled: [],
            },
            InputPrefix: {
              name: '前缀图标',
              desc: '输入框前缀自定义图标',
              normal: [['color'], ['fontSize']],
              hover: [],
              clicked: [],
              disabled: [],
            },
            InputClearButton: {
              name: '输入框清除图标',
              desc: '输入框后缀清除图标',
              normal: [['color'], ['fontSize']],
              hover: [],
              clicked: [],
              disabled: [],
            },
          },
        },
        OldItem: {
          name: '展示上一次选中的值',
          desc: '配置展示上一次选中值的样式',
          normal: [
            ['width'],
            ['height'],
            ['color'],
            ['background'],
            ['padding'],
            ['margin'],
            ['opacity'],
            ['font'],
            ['border'],
            ['borderRadius'],
          ],
          hover: [['color'], ['background'], ['opacity'], ['font'], ['border'], ['borderRadius']],
          clicked: [],
          disabled: [],
        },
        Menu: {
          name: '菜单配置',
          theme: {
            MenuWrap: {
              name: '菜单外盒',
              desc: '配置菜单组件的外盒样式',
              normal: [
                ['width'],
                ['height'],
                ['boxShadow'],
                ['background'],
                ['opacity'],
                ['border'],
                ['borderRadius'],
                ['margin'],
                ['padding'],
              ],
              hover: [['boxShadow'], ['background'], ['opacity'], ['border'], ['borderRadius']],
              clicked: [],
              disabled: [],
            },
            MenuItem: {
              name: '菜单项的配置',
              theme: {
                MenuItemWrap: {
                  name: '项的外盒',
                  desc: '配置每一项的外盒',
                  normal: [
                    ['height'],
                    ['background'],
                    ['border'],
                    ['borderRadius'],
                    ['opacity'],
                    ['color'],
                    ['padding'],
                  ],
                  hover: [
                    ['background'],
                    ['border'],
                    ['borderRadius'],
                    ['opacity'],
                    ['color'],
                    ['font'],
                  ],
                  active: [
                    ['background'],
                    ['border'],
                    ['borderRadius'],
                    ['opacity'],
                    ['color'],
                    ['font'],
                  ],
                  disabled: [
                    ['background'],
                    ['color'],
                    ['borderRadius'],
                    ['opacity'],
                    ['padding'],
                    ['font'],
                  ],
                },
                SelectedMenuItemWrap: {
                  name: '选中项的外盒',
                  desc: '配置选中项的外盒',
                  normal: [
                    ['background'],
                    ['border'],
                    ['borderRadius'],
                    ['opacity'],
                    ['color'],
                    ['padding'],
                    ['font'],
                  ],
                  hover: [
                    ['background'],
                    ['border'],
                    ['borderRadius'],
                    ['opacity'],
                    ['color'],
                    ['font'],
                  ],
                  active: [
                    ['background'],
                    ['border'],
                    ['borderRadius'],
                    ['opacity'],
                    ['color'],
                    ['font'],
                  ],
                  disabled: [],
                },
              },
            },
          },
        },
      },
      childrenWidget: [],
    },
    target: AutoComplete,
    screenshot:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAAAoCAYAAAABk/85AAAAAXNSR0IArs4c6QAAAd9JREFUaAXtmzFOw0AQRbMRkn2FiAu4o+EA1CBRUlDgznZJgzgDoqF03DlFCkokqDkADZ0vgHwFuzIzgS3QyNJusbNI/paiVUaj+Zv3vatk4zErutq2PR7H8XGapjN6u+EYrmAEemPMe5Ikd3mefxmGPwzDBwWfyIBdWZZ9MGkUXm232w2xviHWt2manpqmafbE5bMoigfw0SNA3O9J7WTN2w7f+XrSUGICzJzZ85KYgCQOAWa/jiMNVUsABlgSkUYYEAm8lYUBlkSkEQZEAm9lF29AXdev/LJAtMcjbcH/pkffxc9jzmnxKyAmfNaGAZEd8N6C9s8vTr+cr68uDX823/yu65zqZ1l2qO+bH5m3kMcKEEh0AzBAl7dQgwECiW4ABujyFmowQCDRDcAAXd5CDQYIJLoBGKDLW6jBAIFENwADdHkLNRggkOgGYIAub6EGAwQS3YD3aag95XSdpm++PeV0re+b71pXKw8rQIv0jA4MmAGjFfbegrQmpqVDTyq/kZbTn0Ah5rR4A6qquggB1rUmtiBXUoHyYEAgsK5lYYArqUB5bEDPbTOB6qPsDIFf5v2aG8a4Z2kmD+FABJj5gT2a9AIRninLdz7Dp0cif5r0OA9tqjO0woT/tKl+A4luf1rTokgdAAAAAElFTkSuQmCC',
  },
  {
    meta: {
      widgetName: 'Avatar',
      title: '头像',
      desc: '用来代表用户或事物，支持图片、图标或字符展示。',
      props: {
        viewClass: { type: 'string', desc: '用于配置通用主题属性' },
        size: {
          type: 'AvatarSize',
          desc:
            "可配置三种尺寸大小的input ('large' , 'default' , 'small'),高度分别为 40px、32px 和 24px。",
          defaultValue: 'default',
        },
        type: {
          type: 'AvatarType',
          desc: "可配置三种类型的头像 ('text' , 'font' , 'img')",
          defaultValue: 'text',
        },
        name: { type: 'string', desc: '头像显示内容', defaultValue: 'Lugia' },
        icon: { type: 'icon', desc: '头像显示图标资源' },
        src: {
          type: 'image',
          desc: '头像显示图片资源',
          defaultValue:
            'data:image/jpeg;base64,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AAAAAABSR0JDAAAAAwAAAABSZCAgZG91YkBv4AAAAAAAAAAAAEdybiBkb3ViQG/gAAAAAAAAAAAAQmwgIGRvdWJAb+AAAAAAAAAAAABCcmRUVW50RiNSbHQAAAAAAAAAAAAAAABCbGQgVW50RiNSbHQAAAAAAAAAAAAAAABSc2x0VW50RiNQeGxAUgAAAAAAAAAAAAp2ZWN0b3JEYXRhYm9vbAEAAAAAUGdQc2VudW0AAAAAUGdQcwAAAABQZ1BDAAAAAExlZnRVbnRGI1JsdAAAAAAAAAAAAAAAAFRvcCBVbnRGI1JsdAAAAAAAAAAAAAAAAFNjbCBVbnRGI1ByY0BZAAAAAAAAAAAAEGNyb3BXaGVuUHJpbnRpbmdib29sAAAAAA5jcm9wUmVjdEJvdHRvbWxvbmcAAAAAAAAADGNyb3BSZWN0TGVmdGxvbmcAAAAAAAAADWNyb3BSZWN0UmlnaHRsb25nAAAAAAAAAAtjcm9wUmVjdFRvcGxvbmcAAAAAADhCSU0D7QAAAAAAEABIAAAAAQACAEgAAAABAAI4QklNBCYAAAAAAA4AAAAAAAAAAAAAP4AAADhCSU0D8gAAAAAACgAA////////AAA4QklNBA0AAAAAAAQAAAAeOEJJTQQZAAAAAAAEAAAAHjhCSU0D8wAAAAAACQAAAAAAAAAAAQA4QklNJxAAAAAAAAoAAQAAAAAAAAACOEJJTQP1AAAAAABIAC9mZgABAGxmZgAGAAAAAAABAC9mZgABAKGZmgAGAAAAAAABADIAAAABAFoAAAAGAAAAAAABADUAAAABAC0AAAAGAAAAAAABOEJJTQP4AAAAAABwAAD/////////////////////////////A+gAAAAA/////////////////////////////wPoAAAAAP////////////////////////////8D6AAAAAD/////////////////////////////A+gAADhCSU0ECAAAAAAAEAAAAAEAAAJAAAACQAAAAAA4QklNBB4AAAAAAAQAAAAAOEJJTQQaAAAAAAM9AAAABgAAAAAAAAAAAAAAKAAAACgAAAAEAHoAaQBqAGkAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAACgAAAAoAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAA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Y29tL3hhcC8xLjAvADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTMyIDc5LjE1OTI4NCwgMjAxNi8wNC8xOS0xMzoxMzo0MCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0RXZ0PSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VFdmVudCMiIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDowNGU1MGQ3OC1lYzgxLTExN2ItYjFiYy1hZjNiNDY4NGI2M2QiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6YmUyZmM0MjQtZDZkYi00ZGYyLWI3ZDctZmFiY2Y0ZjhlMWJjIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9IkNFMUQyNDhFREI0MjFFRENENjkxRkVEQ0MxMDM5NTA1IiBkYzpmb3JtYXQ9ImltYWdlL2pwZWciIHBob3Rvc2hvcDpMZWdhY3lJUFRDRGlnZXN0PSJDRENGRkE3REE4QzdCRTA5MDU3MDc2QUVBRjA1QzM0RSIgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyIgcGhvdG9zaG9wOklDQ1Byb2ZpbGU9InNSR0IgSUVDNjE5NjYtMi4xIiB4bXA6Q3JlYXRlRGF0ZT0iMjAxNy0wOC0wOVQxNTo0NzozMiswODowMCIgeG1wOk1vZGlmeURhdGU9IjIwMTgtMDgtMzBUMDk6MTg6MjYrMDg6MDAiIHhtcDpNZXRhZGF0YURhdGU9IjIwMTgtMDgtMzBUMDk6MTg6MjYrMDg6MDAiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUuNSAoTWFjaW50b3NoKSI+IDx4bXBNTTpIaXN0b3J5PiA8cmRmOlNlcT4gPHJkZjpsaSBzdEV2dDphY3Rpb249InNhdmVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjBhYTM0MTlhLWMxNTctNDM3YS1iMzViLTVkMTY5NzhkNTg1MSIgc3RFdnQ6d2hlbj0iMjAxNy0wOS0xM1QxNzo0NDo0MiswODowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUuNSAoTWFjaW50b3NoKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6YmUyZmM0MjQtZDZkYi00ZGYyLWI3ZDctZmFiY2Y0ZjhlMWJjIiBzdEV2dDp3aGVuPSIyMDE4LTA4LTMwVDA5OjE4OjI2KzA4OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxNS41IChNYWNpbnRvc2gpIiBzdEV2dDpjaGFuZ2VkPSIvIi8+IDwvcmRmOlNlcT4gPC94bXBNTTpIaXN0b3J5PiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg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',
        },
        shape: { type: 'AvatarShape', desc: '头像显示形状风格', defaultValue: 'circle' },
      },
      type: {
        AvatarType: ['text', 'icon', 'img'],
        AvatarSize: ['small', 'default', 'large'],
        AvatarShape: ['circle', 'square'],
      },
      category: ['数据展示'],
      designInfo: {
        AvatarIcon: {
          sequence: 1,
          title: '图标头像',
          desc: '使用图标样式展示头像',
          props: { type: 'icon', icon: 'lugia-icon-financial_user' },
          theme: {
            Container: {
              name: '头像',
              desc: '对头像外部容器配置样式',
              normal: [
                ['width'],
                ['height'],
                ['margin'],
                ['padding'],
                ['background'],
                ['opacity'],
                ['boxShadow'],
              ],
              hover: [['width'], ['height']],
              clicked: [],
              disabled: [],
            },
            IconAvatar: {
              name: '图标样式头像',
              desc: '使用图标样式展示头像',
              normal: [['color'], ['margin'], ['font'], ['background'], ['padding']],
              hover: [['color'], ['background'], ['font']],
              clicked: [],
              disabled: [],
            },
          },
        },
        AvatarSrc: {
          sequence: 2,
          title: '图片头像',
          desc: '使用图片资源展示头像',
          props: {
            type: 'img',
            src:
              'data:image/jpeg;base64,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AAAAAABSR0JDAAAAAwAAAABSZCAgZG91YkBv4AAAAAAAAAAAAEdybiBkb3ViQG/gAAAAAAAAAAAAQmwgIGRvdWJAb+AAAAAAAAAAAABCcmRUVW50RiNSbHQAAAAAAAAAAAAAAABCbGQgVW50RiNSbHQAAAAAAAAAAAAAAABSc2x0VW50RiNQeGxAUgAAAAAAAAAAAAp2ZWN0b3JEYXRhYm9vbAEAAAAAUGdQc2VudW0AAAAAUGdQcwAAAABQZ1BDAAAAAExlZnRVbnRGI1JsdAAAAAAAAAAAAAAAAFRvcCBVbnRGI1JsdAAAAAAAAAAAAAAAAFNjbCBVbnRGI1ByY0BZAAAAAAAAAAAAEGNyb3BXaGVuUHJpbnRpbmdib29sAAAAAA5jcm9wUmVjdEJvdHRvbWxvbmcAAAAAAAAADGNyb3BSZWN0TGVmdGxvbmcAAAAAAAAADWNyb3BSZWN0UmlnaHRsb25nAAAAAAAAAAtjcm9wUmVjdFRvcGxvbmcAAAAAADhCSU0D7QAAAAAAEABIAAAAAQACAEgAAAABAAI4QklNBCYAAAAAAA4AAAAAAAAAAAAAP4AAADhCSU0D8gAAAAAACgAA////////AAA4QklNBA0AAAAAAAQAAAAeOEJJTQQZAAAAAAAEAAAAHjhCSU0D8wAAAAAACQAAAAAAAAAAAQA4QklNJxAAAAAAAAoAAQAAAAAAAAACOEJJTQP1AAAAAABIAC9mZgABAGxmZgAGAAAAAAABAC9mZgABAKGZmgAGAAAAAAABADIAAAABAFoAAAAGAAAAAAABADUAAAABAC0AAAAGAAAAAAABOEJJTQP4AAAAAABwAAD/////////////////////////////A+gAAAAA/////////////////////////////wPoAAAAAP////////////////////////////8D6AAAAAD/////////////////////////////A+gAADhCSU0ECAAAAAAAEAAAAAEAAAJAAAACQAAAAAA4QklNBB4AAAAAAAQAAAAAOEJJTQQaAAAAAAM9AAAABgAAAAAAAAAAAAAAKAAAACgAAAAEAHoAaQBqAGkAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAACgAAAAoAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAA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Y29tL3hhcC8xLjAvADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTMyIDc5LjE1OTI4NCwgMjAxNi8wNC8xOS0xMzoxMzo0MCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0RXZ0PSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VFdmVudCMiIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDowNGU1MGQ3OC1lYzgxLTExN2ItYjFiYy1hZjNiNDY4NGI2M2QiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6YmUyZmM0MjQtZDZkYi00ZGYyLWI3ZDctZmFiY2Y0ZjhlMWJjIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9IkNFMUQyNDhFREI0MjFFRENENjkxRkVEQ0MxMDM5NTA1IiBkYzpmb3JtYXQ9ImltYWdlL2pwZWciIHBob3Rvc2hvcDpMZWdhY3lJUFRDRGlnZXN0PSJDRENGRkE3REE4QzdCRTA5MDU3MDc2QUVBRjA1QzM0RSIgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyIgcGhvdG9zaG9wOklDQ1Byb2ZpbGU9InNSR0IgSUVDNjE5NjYtMi4xIiB4bXA6Q3JlYXRlRGF0ZT0iMjAxNy0wOC0wOVQxNTo0NzozMiswODowMCIgeG1wOk1vZGlmeURhdGU9IjIwMTgtMDgtMzBUMDk6MTg6MjYrMDg6MDAiIHhtcDpNZXRhZGF0YURhdGU9IjIwMTgtMDgtMzBUMDk6MTg6MjYrMDg6MDAiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUuNSAoTWFjaW50b3NoKSI+IDx4bXBNTTpIaXN0b3J5PiA8cmRmOlNlcT4gPHJkZjpsaSBzdEV2dDphY3Rpb249InNhdmVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjBhYTM0MTlhLWMxNTctNDM3YS1iMzViLTVkMTY5NzhkNTg1MSIgc3RFdnQ6d2hlbj0iMjAxNy0wOS0xM1QxNzo0NDo0MiswODowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUuNSAoTWFjaW50b3NoKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6YmUyZmM0MjQtZDZkYi00ZGYyLWI3ZDctZmFiY2Y0ZjhlMWJjIiBzdEV2dDp3aGVuPSIyMDE4LTA4LTMwVDA5OjE4OjI2KzA4OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxNS41IChNYWNpbnRvc2gpIiBzdEV2dDpjaGFuZ2VkPSIvIi8+IDwvcmRmOlNlcT4gPC94bXBNTTpIaXN0b3J5PiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg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',
          },
          theme: {
            Container: {
              name: '头像',
              desc: '对头像外部容器配置样式',
              normal: [
                ['width'],
                ['height'],
                ['margin'],
                ['padding'],
                ['background'],
                ['opacity'],
                ['boxShadow'],
              ],
              hover: [['width'], ['height']],
              clicked: [],
              disabled: [],
            },
            SrcAvatar: {
              name: '头像图片',
              desc: '对头像图片配置样式',
              normal: [
                ['width'],
                ['height'],
                ['margin'],
                ['padding'],
                ['fontSize'],
                ['background'],
              ],
              hover: [['width'], ['height'], ['fontSize'], ['background']],
              clicked: [],
              disabled: [],
            },
          },
        },
      },
      theme: {
        Container: {
          name: '头像',
          desc: '对头像外部容器配置样式',
          normal: [
            ['width'],
            ['height'],
            ['margin'],
            ['padding'],
            ['background'],
            ['opacity'],
            ['boxShadow'],
          ],
          hover: [['width'], ['height']],
          clicked: [],
          disabled: [],
        },
        FontAvatar: {
          name: '头像文字',
          desc: '对头像文字配置样式',
          normal: [
            ['width'],
            ['height'],
            ['margin'],
            ['padding'],
            ['fontSize'],
            ['color'],
            ['background'],
          ],
          hover: [['width'], ['height'], ['fontSize'], ['color'], ['background']],
          clicked: [],
          disabled: [],
        },
      },
      childrenWidget: [],
    },
    target: Avatar,
    screenshot:
      'data:image/png;base64,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',
  },
  {
    meta: {
      widgetName: 'Avatar',
      title: '图标头像',
      desc: '使用图标样式展示头像',
      props: {
        viewClass: { type: 'string', desc: '用于配置通用主题属性' },
        size: {
          type: 'AvatarSize',
          desc:
            "可配置三种尺寸大小的input ('large' , 'default' , 'small'),高度分别为 40px、32px 和 24px。",
          defaultValue: 'default',
        },
        type: {
          type: 'AvatarType',
          desc: "可配置三种类型的头像 ('text' , 'font' , 'img')",
          defaultValue: 'icon',
        },
        name: { type: 'string', desc: '头像显示内容', defaultValue: 'Lugia' },
        icon: { type: 'icon', desc: '头像显示图标资源', defaultValue: 'lugia-icon-financial_user' },
        src: {
          type: 'image',
          desc: '头像显示图片资源',
          defaultValue:
            'data:image/jpeg;base64,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AAAAAABSR0JDAAAAAwAAAABSZCAgZG91YkBv4AAAAAAAAAAAAEdybiBkb3ViQG/gAAAAAAAAAAAAQmwgIGRvdWJAb+AAAAAAAAAAAABCcmRUVW50RiNSbHQAAAAAAAAAAAAAAABCbGQgVW50RiNSbHQAAAAAAAAAAAAAAABSc2x0VW50RiNQeGxAUgAAAAAAAAAAAAp2ZWN0b3JEYXRhYm9vbAEAAAAAUGdQc2VudW0AAAAAUGdQcwAAAABQZ1BDAAAAAExlZnRVbnRGI1JsdAAAAAAAAAAAAAAAAFRvcCBVbnRGI1JsdAAAAAAAAAAAAAAAAFNjbCBVbnRGI1ByY0BZAAAAAAAAAAAAEGNyb3BXaGVuUHJpbnRpbmdib29sAAAAAA5jcm9wUmVjdEJvdHRvbWxvbmcAAAAAAAAADGNyb3BSZWN0TGVmdGxvbmcAAAAAAAAADWNyb3BSZWN0UmlnaHRsb25nAAAAAAAAAAtjcm9wUmVjdFRvcGxvbmcAAAAAADhCSU0D7QAAAAAAEABIAAAAAQACAEgAAAABAAI4QklNBCYAAAAAAA4AAAAAAAAAAAAAP4AAADhCSU0D8gAAAAAACgAA////////AAA4QklNBA0AAAAAAAQAAAAeOEJJTQQZAAAAAAAEAAAAHjhCSU0D8wAAAAAACQAAAAAAAAAAAQA4QklNJxAAAAAAAAoAAQAAAAAAAAACOEJJTQP1AAAAAABIAC9mZgABAGxmZgAGAAAAAAABAC9mZgABAKGZmgAGAAAAAAABADIAAAABAFoAAAAGAAAAAAABADUAAAABAC0AAAAGAAAAAAABOEJJTQP4AAAAAABwAAD/////////////////////////////A+gAAAAA/////////////////////////////wPoAAAAAP////////////////////////////8D6AAAAAD/////////////////////////////A+gAADhCSU0ECAAAAAAAEAAAAAEAAAJAAAACQAAAAAA4QklNBB4AAAAAAAQAAAAAOEJJTQQaAAAAAAM9AAAABgAAAAAAAAAAAAAAKAAAACgAAAAEAHoAaQBqAGkAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAACgAAAAoAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAEAAAAAAABudWxsAAAAAgAAAAZib3VuZHNPYmpjAAAAAQAAAAAAAFJjdDEAAAAEAAAAAFRvcCBsb25nAAAAAAAAAABMZWZ0bG9uZwAAAAAAAAAAQnRvbWxvbmcAAAAoAAAAAFJnaHRsb25nAAAAKAAAAAZzbGljZXNWbExzAAAAAU9iamMAAAABAAAAAAAFc2xpY2UAAAASAAAAB3NsaWNlSURsb25nAAAAAAAAAAdncm91cElEbG9uZwAAAAAAAAAGb3JpZ2luZW51bQAAAAxFU2xpY2VPcmlnaW4AAAANYXV0b0dlbmVyYXRlZAAAAABUeXBlZW51bQAAAApFU2xpY2VUeXBlAAAAAEltZyAAAAAGYm91bmRzT2JqYwAAAAEAAAAAAABSY3QxAAAABAAAAABUb3AgbG9uZwAAAAAAAAAATGVmdGxvbmcAAAAAAAAAAEJ0b21sb25nAAAAKAAAAABSZ2h0bG9uZwAAACgAAAADdXJsVEVYVAAAAAEAAAAAAABudWxsVEVYVAAAAAEAAAAAAABNc2dlVEVYVAAAAAEAAAAAAAZhbHRUYWdURVhUAAAAAQAAAAAADmNlbGxUZXh0SXNIVE1MYm9vbAEAAAAIY2VsbFRleHRURVhUAAAAAQAAAAAACWhvcnpBbGlnbmVudW0AAAAPRVNsaWNlSG9yekFsaWduAAAAB2RlZmF1bHQAAAAJdmVydEFsaWduZW51bQAAAA9FU2xpY2VWZXJ0QWxpZ24AAAAHZGVmYXVsdAAAAAtiZ0NvbG9yVHlwZWVudW0AAAARRVNsaWNlQkdDb2xvclR5cGUAAAAATm9uZQAAAAl0b3BPdXRzZXRsb25nAAAAAAAAAApsZWZ0T3V0c2V0bG9uZwAAAAAAAAAMYm90dG9tT3V0c2V0bG9uZwAAAAAAAAALcmlnaHRPdXRzZXRsb25nAAAAAAA4QklNBCgAAAAAAAwAAAACP/AAAAAAAAA4QklNBBQAAAAAAAQAAAABOEJJTQQMAAAAAANgAAAAAQAAACgAAAAoAAAAeAAAEsAAAANEABgAAf/Y/+0ADEFkb2JlX0NNAAH/7gAOQWRvYmUAZIAAAAAB/9sAhAAMCAgICQgMCQkMEQsKCxEVDwwMDxUYExMVExMYEQwMDAwMDBEMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMAQ0LCw0ODRAODhAUDg4OFBQODg4OFBEMDAwMDBERDAwMDAwMEQwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAz/wAARCAAoACgDASIAAhEBAxEB/90ABAAD/8QBPwAAAQUBAQEBAQEAAAAAAAAAAwABAgQFBgcICQoLAQABBQEBAQEBAQAAAAAAAAABAAIDBAUGBwgJCgsQAAEEAQMCBAIFBwYIBQMMMwEAAhEDBCESMQVBUWETInGBMgYUkaGxQiMkFVLBYjM0coLRQwclklPw4fFjczUWorKDJkSTVGRFwqN0NhfSVeJl8rOEw9N14/NGJ5SkhbSVxNTk9KW1xdXl9VZmdoaWprbG1ub2N0dXZ3eHl6e3x9fn9xEAAgIBAgQEAwQFBgcHBgU1AQACEQMhMRIEQVFhcSITBTKBkRShsUIjwVLR8DMkYuFygpJDUxVjczTxJQYWorKDByY1wtJEk1SjF2RFVTZ0ZeLys4TD03Xj80aUpIW0lcTU5PSltcXV5fVWZnaGlqa2xtbm9ic3R1dnd4eXp7fH/9oADAMBAAIRAxEAPwDtApghBLisv6ydVyel9FyMzEbvyW7a6BG6H2O9Nr9n52xBTuSNwaSA4iQ0kTHjt+kpQQYOh815jhfVPIzWPz+p9TLcp5myyS9zXH8215I/za11n1Ps6jQ3M6P1G05VmC9j8fKJJFlFw3V6v936NzEhME0F0o\n' +
            "import Divider from './divider';\n" +
            "import Dropmenu from './dropmenu';\n" +
            "import Icon from './icon';\n" +
            "import Input from './input';\n" +
            "import Label from './label';\n" +
            "import Loading from './loading';\n" +
            "import Menu from './menu';\n" +
            "import Navmenu from './navmenu';\n" +
            "import NumberInput from './number-input';\n" +
            "import Pagination from './pagination';\n" +
            "import Progress from './progress';\n" +
            "import Radio from './radio';\n" +
            "import Rate from './rate';\n" +
            "import Select from './select';\n" +
            "import Skeleton from './skeleton';\n" +
            "import Slider from './slider';\n" +
            "import Steps from './steps';\n" +
            "import Switch from './switch';\n" +
            "import Table from './table';\n" +
            "import Tabs from './tabs';\n" +
            "import Tag from './tag';\n" +
            "import TimeLine from './time-line';\n" +
            "import TimePicker from './time-picker';\n" +
            "import Transfer from './transfer';\n" +
            "import Tree from './tree';\n" +
            "import TreeSelect from './tree-select';\n" +
            "import Upload from './upload';\n" +
            'export default [\n' +
            '  {\n' +
            '    meta: {\n' +
            "      widgetName: 'Alert',\n" +
            "      title: '警告提示',\n" +
            "      desc: '警告提示信息。',\n" +
            '      props: {\n' +
            '        type: {\n' +
            "          type: 'AlertType',\n" +
            "          desc: '指定警告提示的样式，有四种可以选择：success、error、info、warning',\n" +
            '          defaultValue: 0,\n' +
            '        },\n' +
            "        message: { type: 'React.node', desc: '警告提示内容' },\n" +
            "        showIcon: { type: 'boolean', desc: '是否展示图标', defaultValue: false },\n" +
            "        closeText: { type: 'React.node', desc: '自定义关闭按钮' },\n" +
            "        closable: { type: 'boolean', desc: '是否显示关闭按钮', defaultValue: false },\n" +
            "        description: { type: 'React.node', desc: '提示内容的辅助性文字介绍' },\n" +
            "        icon: { type: 'string', desc: '自定义图标，showIcon 为 true 时有效' },\n" +
            '      },\n' +
            '      events: {\n' +
            '        onClose: {\n' +
            "          desc: '关闭时触发的回调函数',\n" +
            "          args: [{ name: 'event', desc: '关闭时的DOM事件', type: 'Object' }],\n" +
            '        },\n' +
            '      },\n' +
            '      type: {\n' +
            "        AlertType: ['info', 'success', 'error', 'warning'],\n" +
            '        AlertStyle: {\n' +
            "          width: { type: 'number', desc: '组件宽度' },\n" +
            "          color: { type: 'string', desc: '组件颜色' },\n" +
            '        },\n' +
            '      },\n' +
            "      category: ['反馈'],\n" +
            '      theme: {\n' +
            '        Container: {\n' +
            "          name: '警告提示整体样式',\n" +
            "          desc: '为警告提示配置整体样式',\n" +
            '          normal: [\n' +
            "            ['opacity'],\n" +
            "            ['margin'],\n" +
            "            ['padding'],\n" +
            "            ['width'],\n" +
            "            ['height'],\n" +
            "            ['background'],\n" +
            "            ['border', 'left'],\n" +
            "            ['borderRadius'],\n" +
            "            ['boxShadow'],\n" +
            '          ],\n' +
            '        },\n' +
            '        AlertMessage: {\n' +
            "          name: '警告提示内容样式',\n" +
            "          desc: '为警告提示内容配置样式',\n" +
            "          normal: [['color'], ['font']],\n" +
            '        },\n' +
            '        AlertDescription: {\n' +
            "          name: '警告提示辅助性文字样式',\n" +
            "          desc: '为警告提示辅助性文字配置样式',\n" +
            "          normal: [['color'], ['font'], ['padding']],\n" +
            '        },\n' +
            '        CloseText: {\n' +
            "          name: '警告提示关闭文字样式',\n" +
            "          desc: '为警告提示关闭文字配置样式',\n" +
            "          normal: [['color'], ['font']],\n" +
            '        },\n' +
            '        AlertIcon: {\n' +
            "          name: '警告提示图标样式',\n" +
            "          desc: '为警告提示图标配置样式',\n" +
            "          normal: [['color'], ['fontSize']],\n" +
            '        },\n' +
            '      },\n' +
            '      childrenWidget: [],\n' +
            '    },\n' +
            '    target: Alert,\n' +
            '    screenshot:\n' +
            "      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGwAAAAkCAYAAABsbd/MAAAAAXNSR0IArs4c6QAAAT5JREFUaAXt2zGKAkEUhOE3reIRDL2EZzAbEDY0FCPP4xE8gZln8BKGe4RlmZm1BaETm4JNquEfEAffQ4r66EScbnecvoYxzhGxer5i7GKT37m8GphF/C5TPFKJ5RWRNGUDQ8TiZ4x1en74OlnlkHvPBjJaBuNqqAHAGsLKUQEDrLEGGovLCQOssQYai8sJawxs/t+8++31rnzH5da/fkFx21eyO+1wwpw0hCyACSU5rQDmpCFkAUwoyWkFMCcNIQtgQklOK4A5aQhZABNKcloBzElDyAKYUJLTCmBOGkIWwISSnFYAc9IQsgAmlOS0ApiThpCl6w/TVO7xz9+yDb97TpifSTURYNV6/IaA+ZlUEwFWrcdvCJifSTURYNV6/IaA+ZlUE2Ww7+oGQ5sG8lOYaZbiBJqNyccg70dm/wDViifzwPhGcQAAAABJRU5ErkJggg==',\n" +
            '  },\n' +
            '  {\n' +
            '    meta: {\n' +
            "      widgetName: 'AmountInput',\n" +
            "      title: '金额输入框',\n" +
            "      desc: '用于金额数字的填写,可切换人民币大小写显示效果.',\n" +
            '      props: {\n' +
            "        disabled: { type: 'boolean', desc: '禁用状态,是否不可用', defaultValue: false },\n" +
            '        transform: {\n' +
            "          type: 'boolean',\n" +
            '          desc: "是否开启转换,仅在amountPrefix=\'¥\'时生效",\n' +
            '          defaultValue: true,\n' +
            '        },\n' +
            "        viewClass: { type: 'string', desc: '用于配置主题属性' },\n" +
            '        size: {\n' +
            "          type: 'InputSize',\n" +
            '          desc:\n' +
            "            \"可配置三种尺寸大小的input ('large' , 'default' , 'small'),高度分别为 40px、32px 和 24px。\",\n" +
            "          defaultValue: 'default',\n" +
            '        },\n' +
            "        placeholder: { type: 'string', desc: 'input输入提示信息' },\n" +
            "        amountPrefix: { type: 'PrefixType', desc: \"货币种类,默认'¥'\", defaultValue: '¥' },\n" +
            "        defaultValue: { type: 'string', desc: '默认显示内容' },\n" +
            "        value: { type: 'string', desc: '显示内容' },\n" +
            '      },\n' +
            '      events: {\n' +
            '        onChange: {\n' +
            "          desc: '内容改变时触发',\n" +
            "          args: [{ name: 'event', desc: '改变内容的DOM事件', type: 'ChangeType' }],\n" +
            '        },\n' +
            '        onKeyUp: {\n' +
            "          desc: '键盘按下去并松开后执行',\n" +
            "          args: [{ name: 'event', desc: '改变键盘输入的内容', type: 'KeyboardEvent' }],\n" +
            '        },\n' +
            '        onKeyDown: {\n' +
            "          desc: '键盘按下任何键时触发',\n" +
            "          args: [{ name: 'event', desc: '改变键盘输入的内容', type: 'KeyboardEvent' }],\n" +
            '        },\n' +
            '        onKeyPress: {\n' +
            "          desc: '键盘按下任何键时触发',\n" +
            "          args: [{ name: 'event', desc: '改变键盘输入的内容', type: 'KeyboardEvent' }],\n" +
            '        },\n' +
            '        onFocus: {\n' +
            "          desc: '输入框获得焦点时触发',\n" +
            "          args: [{ name: 'event', desc: '获取焦点的DOM事件', type: 'FocusEvent' }],\n" +
            '        },\n' +
            '        onBlur: {\n' +
            "          desc: '输入框失去焦点时触发',\n" +
            "          args: [{ name: 'event', desc: '失去焦点的DOM事件', type: 'FocusEvent' }],\n" +
            '        },\n' +
            '        onEnter: {\n' +
            "          desc: '当键入回车时触发事件',\n" +
            "          args: [{ name: 'event', desc: '当键入回车时触发', type: 'KeyboardEvent' }],\n" +
            '        },\n' +
            '      },\n' +
            '      type: {\n' +
            "        InputSize: ['small', 'default', 'large'],\n" +
            "        PrefixType: ['¥', '$'],\n" +
            "        ChangeType: { newValue: 'string', oldValue: 'string', event: 'SyntheticEvent' },\n" +
            '      },\n' +
            "      category: ['数据录入'],\n" +
            '      theme: {\n' +
            '        InnerInput: {\n' +
            "          name: '金额输入框',\n" +
            '          theme: {\n' +
            '            Container: {\n' +
            "              name: '输入框外部容器',\n" +
            "              desc: '输入框外部容器',\n" +
            "              normal: [['width'], ['height'], ['margin'], ['padding']],\n" +
            '            },\n' +
            '            Input: {\n' +
            "              name: '金额输入框中输入框部分',\n" +
            "              desc: '金额输入框中输入框部分',\n" +
            '              normal: [\n' +
            "                ['width'],\n" +
            "                ['height'],\n" +
            "                ['fontSize'],\n" +
            "                ['font'],\n" +
            "                ['color'],\n" +
            "                ['background'],\n" +
            "                ['border'],\n" +
            "                ['borderRadius'],\n" +
            "                ['cursor'],\n" +
            "                ['opacity'],\n" +
            '              ],\n' +
            '              hover: [\n' +
            "                ['border'],\n" +
            "                ['borderRadius'],\n" +
            "                ['cursor'],\n" +
            "                ['background'],\n" +
            "                ['opacity'],\n" +
            "                ['boxShadow'],\n" +
            '              ],\n' +
            "              active: [['boxShadow'], ['border'], ['borderRadius'], ['cursor'], ['background']],\n" +
            '              disabled: [\n' +
            "                ['fontSize'],\n" +
            "                ['font'],\n" +
            "                ['color'],\n" +
            "                ['background'],\n" +
            "                ['border'],\n" +
            "                ['borderRadius'],\n" +
            "                ['cursor'],\n" +
            "                ['padding'],\n" +
            "                ['opacity'],\n" +
            '              ],\n' +
            '            },\n' +
            '          },\n' +
            '        },\n' +
            '        AmountInputPrefix: {\n' +
            "          name: '金额输入框主体前缀',\n" +
            "          desc: '金额输入框主体前缀',\n" +
            "          normal: [['fontSize'], ['font'], ['color']],\n" +
            '          hover: [],\n' +
            '          clicked: [],\n' +
            '          disabled: [],\n' +
            '        },\n' +
            '        AmountTip: {\n' +
            "          name: '金额切换提示',\n" +
            '          theme: {\n' +
            '            Container: {\n' +
            "              name: '输入框提示框外框部分',\n" +
            "              desc: '输入框提示框外框部分',\n" +
            "              normal: [['opacity'], ['background'], ['width'], ['height']],\n" +
            '              hover: [],\n' +
            '              clicked: [],\n' +
            '              disabled: [],\n' +
            '            },\n' +
            '            TooltipTitle: {\n' +
            "              name: '金额输入框提示信息文字部分',\n" +
            "              desc: '金额输入框提示信息文字部分',\n" +
            "              normal: [['fontSize'], ['font'], ['color']],\n" +
            '              hover: [],\n' +
            '              clicked: [],\n' +
            '              disabled: [],\n' +
            '            },\n' +
            '          },\n' +
            '        },\n' +
            '      },\n' +
            '      childrenWidget: [],\n' +
            '    },\n' +
            '    target: AmountInput,\n' +
            '    screenshot:\n' +
            "      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAAAoCAYAAAABk/85AAAAAXNSR0IArs4c6QAABFlJREFUaAXtm+9PW1UYx7+9jPaWH13Lr7ZjuGIyKW4TN5k6orC5LNmWJcMsTn3hiCaGF77xjfEv8QUkxsQ3mqgx6IwzkzmHzhXZxn5AutF1rcBaxiadFPoDCz7nKs31lpt0B2ihnJPc9NzDyfOc8/n2POfepxwDqHg8nuZwOPxFJBKpi8fjRaxNlFUjEDIYDOdNJtMHHR0d4wYG3+v1etxut+Ry1cNsNq+a52wMWyzlhmz6rdc+XV1dThLg1MLCwvuyLDcbenp67jocDldj49NrYk6FLsAi5O7u7g+p3iSxsMO++aLklgCtgE/p2i+xmJ/vsJPbqa8Nb52dnSEaiVNaG8PZuKMQAuRZeyFAoQgwMfknbvmCeZ7O+nO/YivAH7yHSwND649Anke8bAFisQT8wXGM3buP6ZkZ3L7zB2ZmY3me1vpxv4l3qPQMi59+uQLPlZuYm/s7bebzr8+C3vSw55kGHGzdC9lkTP9NVDIJcAtw5twl/H51GJbyUjQ3uRFLzCEUnkTjUy4M3hzB5WteTEdn8carhzK9ipY0Aa4QFJp4kIb/7lvHcWj/C6iutNK33YTWfbvx3jsnsMVRrYSjG8N30s5EJZMAlwDjoUnF0o6GepSWZCbvioqKKPw0K33Ek1EmdHULVwhKJJOKDYOkn7jcttWBl198Fiaj2APUwLV1rhXw5Latip3BGyO6TzySJOHAS8+h5fldWp/iXkWASwCnvRJ1tQ7MxuL46OMvlf1gPpVSmRXVbAlwCcCMnzp5GE07tyOeSOL73t/Q2zeAv6JRjI5PZOtb9CMCXHsAI8c22uOHW7FnVwOuD/swdMuPqcg0PvnsNCpsFmp3Y9/enco7gSCtT4BbgEWTdbV2Ckd2gr4ZA4PDsFdVwusL4McL/QiOhXDi2AEYjcWL3cWnhgB3CNLYUW4tZWU42X4Qb795DDVVNoz4R/HNmb6luoq2/whwCXB9yIdf+68hRpvwUoWtiNfb/30D9gXGkErNL9VNtBEBLgFYaOm9MIAAfeoVm7Wc3oarkEzOYfJhRK/bhm/nEqDWWaOA8/nHdAFSrg5Tj6K0CQOVtCmLsjQBLgEat7tQUiJT0u22ku/Rmp6fX6AV0q+EKKe9GsXFy97rtS4K5p6LjNlswpFXWvDV6XNg6We24bKsaHRmFt/+0EdPQUGCn4AsG9F+tK1gYK3GRLgEYAPZ4aZEXOlRfHf2Iu4/mFIu1v5w6pESdty0StpadqOqYjNrFkWHALcAzJ6rzqmkntkvYD9fvErP/WG0H2lToIuwo0Nc08y1B2hsKClpm9WCElkGyxMJ+FpC+vfLWgFqs/VPbIHNWqZuEvUsCKyYAI6aCrBLlMcjsCIh6PFcit5qAkIANY081IUAeYCudikEUNPIQ12iYzKpWEz8J1uu2bOjSuQzJFmt1tFA4G6u/W94f+ycGF3nN9H5sNfYIT0isiYO6RW6MhmH9NiExTHVnMr+v2Oq/wD8skvy6mYuDAAAAABJRU5ErkJggg==',\n" +
            '  },\n' +
            '  {\n' +
            '    meta: {\n' +
            "      widgetName: 'AutoComplete',\n" +
            "      title: '自动完成',\n" +
            "      desc: '需要自动完成数据时使用',\n" +
            '      props: {\n' +
            "        data: { type: 'string[]', desc: '自动补全的数据', defaultValue: [], meta: [] },\n" +
            "        createPortal: { type: 'boolean', desc: '是否全局弹出下拉框', defaultValue: true },\n" +
            "        value: { type: 'string', desc: '给定输入框的值' },\n" +
            "        defaultValue: { type: 'string', desc: '默认输入框的值，仅第一次生效' },\n" +
            "        showOldValue: { type: 'boolean', desc: '是否显示上一次选中的值', defaultValue: true },\n" +
            "        placeholder: { type: 'string', desc: 'input输入提示信息' },\n" +
            "        showAllLevels: { type: 'boolean', desc: '是否显示所有层级关系的值', defaultValue: true },\n" +
            "        prefix: { type: 'ReactNode', desc: '输入框前缀' },\n" +
            "        suffix: { type: 'ReactNode', desc: '输入框后缀' },\n" +
            '      },\n' +
            '      events: {\n' +
            '        onChange: {\n' +
            "          desc: '输入框的值改变时触发',\n" +
            "          args: [{ name: 'value', desc: '输入框中改变后的值', type: 'string' }],\n" +
            '        },\n' +
            '        onFocus: {\n' +
            "          desc: '输入框获取焦距时触发',\n" +
            "          args: [{ name: 'event', desc: '点击的DOM事件', type: 'Object' }],\n" +
            '        },\n' +
            '        onBlur: {\n' +
            "          desc: '输入框失去焦距时触发',\n" +
            "          args: [{ name: 'event', desc: '点击的DOM事件', type: 'Object' }],\n" +
            '        },\n' +
            '        onSelect: {\n' +
            "          desc: '点击选中项时触发',\n" +
            "          args: [{ name: 'selectedKeys', desc: '选中项的数据', type: 'string[]' }],\n" +
            '        },\n' +
            '      },\n' +
            '      type: {},\n' +
            "      category: ['数据录入'],\n" +
            '      theme: {\n' +
            '        AutoInput: {\n' +
            "          name: '自动完成输入框',\n" +
            '          theme: {\n' +
            '            Container: {\n' +
            "              name: '输入框外部容器',\n" +
            "              desc: '输入框外部容器',\n" +
            '              normal: [\n' +
            "                ['width'],\n" +
            "                ['height'],\n" +
            "                ['background'],\n" +
            "                ['border'],\n" +
            "                ['borderRadius'],\n" +
            "                ['boxShadow'],\n" +
            "                ['margin'],\n" +
            "                ['padding'],\n" +
            '              ],\n' +
            '            },\n' +
            '            InputSuffix: {\n' +
            "              name: '后缀图标',\n" +
            "              desc: '输入框后缀自定义图标',\n" +
            "              normal: [['color'], ['fontSize']],\n" +
            '              hover: [],\n' +
            '              clicked: [],\n' +
            '              disabled: [],\n' +
            '            },\n' +
            '            InputPrefix: {\n' +
            "              name: '前缀图标',\n" +
            "              desc: '输入框前缀自定义图标',\n" +
            "              normal: [['color'], ['fontSize']],\n" +
            '              hover: [],\n' +
            '              clicked: [],\n' +
            '              disabled: [],\n' +
            '            },\n' +
            '            InputClearButton: {\n' +
            "              name: '输入框清除图标',\n" +
            "              desc: '输入框后缀清除图标',\n" +
            "              normal: [['color'], ['fontSize']],\n" +
            '              hover: [],\n' +
            '              clicked: [],\n' +
            '              disabled: [],\n' +
            '            },\n' +
            '          },\n' +
            '        },\n' +
            '        OldItem: {\n' +
            "          name: '展示上一次选中的值',\n" +
            "          desc: '配置展示上一次选中值的样式',\n" +
            '          normal: [\n' +
            "            ['width'],\n" +
            "            ['height'],\n" +
            "            ['color'],\n" +
            "            ['background'],\n" +
            "            ['padding'],\n" +
            "            ['margin'],\n" +
            "            ['opacity'],\n" +
            "            ['font'],\n" +
            "            ['border'],\n" +
            "            ['borderRadius'],\n" +
            '          ],\n' +
            "          hover: [['color'], ['background'], ['opacity'], ['font'], ['border'], ['borderRadius']],\n" +
            '          clicked: [],\n' +
            '          disabled: [],\n' +
            '        },\n' +
            '        Menu: {\n' +
            "          name: '菜单配置',\n" +
            '          theme: {\n' +
            '            MenuWrap: {\n' +
            "              name: '菜单外盒',\n" +
            "              desc: '配置菜单组件的外盒样式',\n" +
            '              normal: [\n' +
            "                ['width'],\n" +
            "                ['height'],\n" +
            "                ['boxShadow'],\n" +
            "                ['background'],\n" +
            "                ['opacity'],\n" +
            "                ['border'],\n" +
            "                ['borderRadius'],\n" +
            "                ['margin'],\n" +
            "                ['padding'],\n" +
            '              ],\n' +
            "              hover: [['boxShadow'], ['background'], ['opacity'], ['border'], ['borderRadius']],\n" +
            '              clicked: [],\n' +
            '              disabled: [],\n' +
            '            },\n' +
            '            MenuItem: {\n' +
            "              name: '菜单项的配置',\n" +
            '              theme: {\n' +
            '                MenuItemWrap: {\n' +
            "                  name: '项的外盒',\n" +
            "                  desc: '配置每一项的外盒',\n" +
            '                  normal: [\n' +
            "                    ['height'],\n" +
            "                    ['background'],\n" +
            "                    ['border'],\n" +
            "                    ['borderRadius'],\n" +
            "                    ['opacity'],\n" +
            "                    ['color'],\n" +
            "                    ['padding'],\n" +
            '                  ],\n' +
            '                  hover: [\n' +
            "                    ['background'],\n" +
            "                    ['border'],\n" +
            "                    ['borderRadius'],\n" +
            "                    ['opacity'],\n" +
            "                    ['color'],\n" +
            "                    ['font'],\n" +
            '                  ],\n' +
            '                  active: [\n' +
            "                    ['background'],\n" +
            "                    ['border'],\n" +
            "                    ['borderRadius'],\n" +
            "                    ['opacity'],\n" +
            "                    ['color'],\n" +
            "                    ['font'],\n" +
            '                  ],\n' +
            '                  disabled: [\n' +
            "                    ['background'],\n" +
            "                    ['color'],\n" +
            "                    ['borderRadius'],\n" +
            "                    ['opacity'],\n" +
            "                    ['padding'],\n" +
            "                    ['font'],\n" +
            '                  ],\n' +
            '                },\n' +
            '                SelectedMenuItemWrap: {\n' +
            "                  name: '选中项的外盒',\n" +
            "                  desc: '配置选中项的外盒',\n" +
            '                  normal: [\n' +
            "                    ['background'],\n" +
            "                    ['border'],\n" +
            "                    ['borderRadius'],\n" +
            "                    ['opacity'],\n" +
            "                    ['color'],\n" +
            "                    ['padding'],\n" +
            "                    ['font'],\n" +
            '                  ],\n' +
            '                  hover: [\n' +
            "                    ['background'],\n" +
            "                    ['border'],\n" +
            "                    ['borderRadius'],\n" +
            "                    ['opacity'],\n" +
            "                    ['color'],\n" +
            "                    ['font'],\n" +
            '                  ],\n' +
            '                  active: [\n' +
            "                    ['background'],\n" +
            "                    ['border'],\n" +
            "                    ['borderRadius'],\n" +
            "                    ['opacity'],\n" +
            "                    ['color'],\n" +
            "                    ['font'],\n" +
            '                  ],\n' +
            '                  disabled: [],\n' +
            '                },\n' +
            '              },\n' +
            '            },\n' +
            '          },\n' +
            '        },\n' +
            '      },\n' +
            '      childrenWidget: [],\n' +
            '    },\n' +
            '    target: AutoComplete,\n' +
            '    screenshot:\n' +
            "      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAAAoCAYAAAABk/85AAAAAXNSR0IArs4c6QAAAd9JREFUaAXtmzFOw0AQRbMRkn2FiAu4o+EA1CBRUlDgznZJgzgDoqF03DlFCkokqDkADZ0vgHwFuzIzgS3QyNJusbNI/paiVUaj+Zv3vatk4zErutq2PR7H8XGapjN6u+EYrmAEemPMe5Ikd3mefxmGPwzDBwWfyIBdWZZ9MGkUXm232w2xviHWt2manpqmafbE5bMoigfw0SNA3O9J7WTN2w7f+XrSUGICzJzZ85KYgCQOAWa/jiMNVUsABlgSkUYYEAm8lYUBlkSkEQZEAm9lF29AXdev/LJAtMcjbcH/pkffxc9jzmnxKyAmfNaGAZEd8N6C9s8vTr+cr68uDX823/yu65zqZ1l2qO+bH5m3kMcKEEh0AzBAl7dQgwECiW4ABujyFmowQCDRDcAAXd5CDQYIJLoBGKDLW6jBAIFENwADdHkLNRggkOgGYIAub6EGAwQS3YD3aag95XSdpm++PeV0re+b71pXKw8rQIv0jA4MmAGjFfbegrQmpqVDTyq/kZbTn0Ah5rR4A6qquggB1rUmtiBXUoHyYEAgsK5lYYArqUB5bEDPbTOB6qPsDIFf5v2aG8a4Z2kmD+FABJj5gT2a9AIRninLdz7Dp0cif5r0OA9tqjO0woT/tKl+A4luf1rTokgdAAAAAElFTkSuQmCC',\n" +
            '  },\n' +
            '  {\n' +
            '    meta: {\n' +
            "      widgetName: 'Avatar',\n" +
            "      title: '头像',\n" +
            "      desc: '用来代表用户或事物，支持图片、图标或字符展示。',\n" +
            '      props: {\n' +
            "        viewClass: { type: 'string', desc: '用于配置通用主题属性' },\n" +
            '        size: {\n' +
            "          type: 'AvatarSize',\n" +
            '          desc:\n' +
            "            \"可配置三种尺寸大小的input ('large' , 'default' , 'small'),高度分别为 40px、32px 和 24px。\",\n" +
            "          defaultValue: 'default',\n" +
            '        },\n' +
            '        type: {\n' +
            "          type: 'AvatarType',\n" +
            "          desc: \"可配置三种类型的头像 ('text' , 'font' , 'img')\",\n" +
            "          defaultValue: 'text',\n" +
            '        },\n' +
            "        name: { type: 'string', desc: '头像显示内容', defaultValue: 'Lugia' },\n" +
            "        icon: { type: 'icon', desc: '头像显示图标资源' },\n" +
            '        src: {\n' +
            "          type: 'image',\n" +
            "          desc: '头像显示图片资源',\n" +
            '          defaultValue:\n' +
            "            'data:image/jpeg;base64,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AAAAAABSR0JDAAAAAwAAAABSZCAgZG91YkBv4AAAAAAAAAAAAEdybiBkb3ViQG/gAAAAAAAAAAAAQmwgIGRvdWJAb+AAAAAAAAAAAABCcmRUVW50RiNSbHQAAAAAAAAAAAAAAABCbGQgVW50RiNSbHQAAAAAAAAAAAAAAABSc2x0VW50RiNQeGxAUgAAAAAAAAAAAAp2ZWN0b3JEYXRhYm9vbAEAAAAAUGdQc2VudW0AAAAAUGdQcwAAAABQZ1BDAAAAAExlZnRVbnRGI1JsdAAAAAAAAAAAAAAAAFRvcCBVbnRGI1JsdAAAAAAAAAAAAAAAAFNjbCBVbnRGI1ByY0BZAAAAAAAAAAAAEGNyb3BXaGVuUHJpbnRpbmdib29sAAAAAA5jcm9wUmVjdEJvdHRvbWxvbmcAAAAAAAAADGNyb3BSZWN0TGVmdGxvbmcAAAAAAAAADWNyb3BSZWN0UmlnaHRsb25nAAAAAAAAAAtjcm9wUmVjdFRvcGxvbmcAAAAAADhCSU0D7QAAAAAAEABIAAAAAQACAEgAAAABAAI4QklNBCYAAAAAAA4AAAAAAAAAAAAAP4AAADhCSU0D8gAAAAAACgAA////////AAA4QklNBA0AAAAAAAQAAAAeOEJJTQQZAAAAAAAEAAAAHjhCSU0D8wAAAAAACQAAAAAAAAAAAQA4QklNJxAAAAAAAAoAAQAAAAAAAAACOEJJTQP1AAAAAABIAC9mZgABAGxmZgAGAAAAAAABAC9mZgABAKGZmgAGAAAAAAABADIAAAABAFoAAAAGAAAAAAABADUAAAABAC0AAAAGAAAAAAABOEJJTQP4AAAAAABwAAD/////////////////////////////A+gAAAAA/////////////////////////////wPoAAAAAP////////////////////////////8D6AAAAAD/////////////////////////////A+gAADhCSU0ECAAAAAAAEAAAAAEAAAJAAAACQAAAAAA4QklNBB4AAAAAAAQAAAAAOEJJTQQaAAAAAAM9AAAABgAAAAAAAAAAAAAAKAAAACgAAAAEAHoAaQBqAGkAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAACgAAAAoAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAA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Y29tL3hhcC8xLjAvADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTMyIDc5LjE1OTI4NCwgMjAxNi8wNC8xOS0xMzoxMzo0MCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0RXZ0PSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VFdmVudCMiIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDowNGU1MGQ3OC1lYzgxLTExN2ItYjFiYy1hZjNiNDY4NGI2M2QiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6YmUyZmM0MjQtZDZkYi00ZGYyLWI3ZDctZmFiY2Y0ZjhlMWJjIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9IkNFMUQyNDhFREI0MjFFRENENjkxRkVEQ0MxMDM5NTA1IiBkYzpmb3JtYXQ9ImltYWdlL2pwZWciIHBob3Rvc2hvcDpMZWdhY3lJUFRDRGlnZXN0PSJDRENGRkE3REE4QzdCRTA5MDU3MDc2QUVBRjA1QzM0RSIgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyIgcGhvdG9zaG9wOklDQ1Byb2ZpbGU9InNSR0IgSUVDNjE5NjYtMi4xIiB4bXA6Q3JlYXRlRGF0ZT0iMjAxNy0wOC0wOVQxNTo0NzozMiswODowMCIgeG1wOk1vZGlmeURhdGU9IjIwMTgtMDgtMzBUMDk6MTg6MjYrMDg6MDAiIHhtcDpNZXRhZGF0YURhdGU9IjIwMTgtMDgtMzBUMDk6MTg6MjYrMDg6MDAiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUuNSAoTWFjaW50b3NoKSI+IDx4bXBNTTpIaXN0b3J5PiA8cmRmOlNlcT4gPHJkZjpsaSBzdEV2dDphY3Rpb249InNhdmVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjBhYTM0MTlhLWMxNTctNDM3YS1iMzViLTVkMTY5NzhkNTg1MSIgc3RFdnQ6d2hlbj0iMjAxNy0wOS0xM1QxNzo0NDo0MiswODowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUuNSAoTWFjaW50b3NoKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6YmUyZmM0MjQtZDZkYi00ZGYyLWI3ZDctZmFiY2Y0ZjhlMWJjIiBzdEV2dDp3aGVuPSIyMDE4LTA4LTMwVDA5OjE4OjI2KzA4OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxNS41IChNYWNpbnRvc2gpIiBzdEV2dDpjaGFuZ2VkPSIvIi8+IDwvcmRmOlNlcT4gPC94bXBNTTpIaXN0b3J5PiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8P3hwYWNrZXQgZW5kPSJ3Ij8+/+IMWElDQ19QUk9GSUxFAAEBAAAMSExpbm8CEAAAbW50clJHQiBYWVogB84AAgAJAAYAMQAAYWNzcE1TRlQAAAAASUVDIHNSR0IAAAAAAAAAAAAAAAAAAPbWAAEAAAAA0y1IUCAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAARY3BydAAAAVAAAAAzZGVzYwAAAYQAAABsd3RwdAAAAfAAAAAUYmtwdAAAAgQAAAAUclhZWgAAAhgAAAAUZ1hZWgAAAiwAAAAUYlhZWgAAAkAAAAAUZG1uZAAAAlQAAABwZG1kZAAAAsQAAACIdnVlZAAAA0wAAACGdmlldwAAA9QAAAAkbHVtaQAAA/gAAAAUbWVhcwAABAwAAAAkdGVjaAAABDAAAAAMclRSQwAABDwAAAgMZ1RSQwAABDwAAAgMYlRSQwAABDwAAAgMdGV4dAAAAABDb3B5cmlnaHQgKGMpIDE5OTggSGV3bGV0dC1QYWNrYXJkIENvbXBhbnkAAGRlc2MAAAAAAAAAEnNSR0IgSUVDNjE5NjYtMi4xAAAAAAAAAAAAAAASc1JHQiBJRUM2MTk2Ni0yLjEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFhZWiAAAAAAAADzUQABAAAAARbMWFlaIAAAAAAAAAAAAAAAAAAAAABYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9kZXNjAAAAAAAAABZJRUMgaHR0cDovL3d3dy5pZWMuY2gAAAAAAAAAAAAAABZJRUMgaHR0cDovL3d3dy5pZWMuY2gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAZGVzYwAAAAAAAAAuSUVDIDYxOTY2LTIuMSBEZWZhdWx0IFJHQiBjb2xvdXIgc3BhY2UgLSBzUkdCAAAAAAAAAAAAAAAuSUVDIDYxOTY2LTIuMSBEZWZhdWx0IFJHQiBjb2xvdXIgc3BhY2UgLSBzUkdCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGRlc2MAAAAAAAAALFJlZmVyZW5jZSBWaWV3aW5nIENvbmRpdGlvbiBpbiBJRUM2MTk2Ni0yLjEAAAAAAAAAAAAAACxSZWZlcmVuY2UgVmlld2luZyBDb25kaXRpb24gaW4gSUVDNjE5NjYtMi4xAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB2aWV3AAAAAAATpP4AFF8uABDPFAAD7cwABBMLAANcngAAAAFYWVogAAAAAABMCVYAUAAAAFcf521lYXMAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAKPAAAAAnNpZyAAAAAAQ1JUIGN1cnYAAAAAAAAEAAAAAAUACgAPABQAGQAeACMAKAAtADIANwA7AEAARQBKAE8AVABZAF4AYwBoAG0AcgB3AHwAgQCGAIsAkACVAJoAnwCkAKkArgCyALcAvADBAMYAywDQANUA2wDgAOUA6wDwAPYA+wEBAQcBDQETARkBHwElASsBMgE4AT4BRQFMAVIBWQFgAWcBbgF1AXwBgwGLAZIBmgGhAakBsQG5AcEByQHRAdkB4QHpAfIB+gIDAgwCFAIdAiYCLwI4AkECSwJUAl0CZwJxAnoChAKOApgCogKsArYCwQLLAtUC4ALrAvUDAAMLAxYDIQMtAzgDQwNPA1oDZgNyA34DigOWA6IDrgO6A8cD0wPgA+wD+QQGBBMEIAQtBDsESARVBGMEcQR+BIwEmgSoBLYExATTBOEE8AT+BQ0FHAUrBToFSQVYBWcFdwWGBZYFpgW1BcUF1QXlBfYGBgYWBicGNwZIBlkGagZ7BowGnQavBsAG0QbjBvUHBwcZBysHPQdPB2EHdAeGB5kHrAe/B9IH5Qf4CAsIHwgyCEYIWghuCIIIlgiqCL4I0gjnCPsJEAklCToJTwlkCXkJjwmkCboJzwnlCfsKEQonCj0KVApqCoEKmAquCsUK3ArzCwsLIgs5C1ELaQuAC5gLsAvIC+EL+QwSDCoMQwxcDHUMjgynDMAM2QzzDQ0NJg1ADVoNdA2ODakNww3eDfgOEw4uDkkOZA5/DpsOtg7SDu4PCQ8lD0EPXg96D5YPsw/PD+wQCRAmEEMQYRB+EJsQuRDXEPURExExEU8RbRGMEaoRyRHoEgcSJhJFEmQShBKjEsMS4xMDEyMTQxNjE4MTpBPFE+UUBhQnFEkUahSLFK0UzhTwFRIVNBVWFXgVmxW9FeAWAxYmFkkWbBaPFrIW1hb6Fx0XQRdlF4kXrhfSF/cYGxhAGGUYihivGNUY+hkgGUUZaxmRGbcZ3RoEGioaURp3Gp4axRrsGxQbOxtjG4obshvaHAIcKhxSHHscoxzMHPUdHh1HHXAdmR3DHeweFh5AHmoelB6+HukfEx8+H2kflB+/H+ogFSBBIGwgmCDEIPAhHCFIIXUhoSHOIfsiJyJVIoIiryLdIwojOCNmI5QjwiPwJB8kTSR8JKsk2iUJJTglaCWXJccl9yYnJlcmhya3JugnGCdJJ3onqyfcKA0oPyhxKKIo1CkGKTgpaymdKdAqAio1KmgqmyrPKwIrNitpK50r0SwFLDksbiyiLNctDC1BLXYtqy3hLhYuTC6CLrcu7i8kL1ovkS/HL/4wNTBsMKQw2zESMUoxgjG6MfIyKjJjMpsy1DMNM0YzfzO4M/E0KzRlNJ402DUTNU01hzXCNf02NzZyNq426TckN2A3nDfXOBQ4UDiMOMg5BTlCOX85vDn5OjY6dDqyOu87LTtrO6o76DwnPGU8pDzjPSI9YT2hPeA+ID5gPqA+4D8hP2E/oj/iQCNAZECmQOdBKUFqQaxB7kIwQnJCtUL3QzpDfUPARANER0SKRM5FEkVVRZpF3kYiRmdGq0bwRzVHe0fASAVIS0iRSNdJHUljSalJ8Eo3Sn1KxEsMS1NLmkviTCpMcky6TQJNSk2TTdxOJU5uTrdPAE9JT5NP3VAnUHFQu1EGUVBRm1HmUjFSfFLHUxNTX1OqU/ZUQlSPVNtVKFV1VcJWD1ZcVqlW91dEV5JX4FgvWH1Yy1kaWWlZuFoHWlZaplr1W0VblVvlXDVchlzWXSddeF3JXhpebF69Xw9fYV+zYAVgV2CqYPxhT2GiYfViSWKcYvBjQ2OXY+tkQGSUZOllPWWSZedmPWaSZuhnPWeTZ+loP2iWaOxpQ2maafFqSGqfavdrT2una/9sV2yvbQhtYG25bhJua27Ebx5veG/RcCtwhnDgcTpxlXHwcktypnMBc11zuHQUdHB0zHUodYV14XY+dpt2+HdWd7N4EXhueMx5KnmJeed6RnqlewR7Y3vCfCF8gXzhfUF9oX4BfmJ+wn8jf4R/5YBHgKiBCoFrgc2CMIKSgvSDV4O6hB2EgITjhUeFq4YOhnKG14c7h5+IBIhpiM6JM4mZif6KZIrKizCLlov8jGOMyo0xjZiN/45mjs6PNo+ekAaQbpDWkT+RqJIRknqS45NNk7aUIJSKlPSVX5XJljSWn5cKl3WX4JhMmLiZJJmQmfyaaJrVm0Kbr5wcnImc951kndKeQJ6unx2fi5/6oGmg2KFHobaiJqKWowajdqPmpFakx6U4pammGqaLpv2nbqfgqFKoxKk3qamqHKqPqwKrdavprFys0K1ErbiuLa6hrxavi7AAsHWw6rFgsdayS7LCszizrrQltJy1E7WKtgG2ebbwt2i34LhZuNG5SrnCuju6tbsuu6e8IbybvRW9j74KvoS+/796v/XAcMDswWfB48JfwtvDWMPUxFHEzsVLxcjGRsbDx0HHv8g9yLzJOsm5yjjKt8s2y7bMNcy1zTXNtc42zrbPN8+40DnQutE80b7SP9LB00TTxtRJ1MvVTtXR1lXW2Ndc1+DYZNjo2WzZ8dp22vvbgNwF3IrdEN2W3hzeot8p36/gNuC94UThzOJT4tvjY+Pr5HPk/OWE5g3mlucf56noMui86Ubp0Opb6uXrcOv77IbtEe2c7ijutO9A78zwWPDl8XLx//KM8xnzp/Q09ML1UPXe9m32+/eK+Bn4qPk4+cf6V/rn+3f8B/yY/Sn9uv5L/tz/bf///+4ADkFkb2JlAGRAAAAAAf/bAIQAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQICAgICAgICAgICAwMDAwMDAwMDAwEBAQEBAQEBAQEBAgIBAgIDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMD/8AAEQgAKAAoAwERAAIRAQMRAf/dAAQABf/EAIgAAAICAwAAAAAAAAAAAAAAAAgKBgcDBQkBAAEEAwAAAAAAAAAAAAAAAAcBBAUGAAIDEAABBAECBQMDAwUAAAAAAAADAQIEBQYRBwAhMRIIQRMUcSIVUYEJkdEyUjMRAAEDAwQBAwQCAwAAAAAAAAERAgMAIQQxQRIFUXGBBsEiMhNhQlJiB//aAAwDAQACEQMRAD8AZzjua3RFTXREX6dOXDel8eKkMWSFvJzkZoiKmqp/VV9URPXjoxzWkchakcLG9bxpYw5oKw0yuBayow5kWlkWdbHu5MIyIop8ajPKHbSIJtU7DsCon+jl4dj7gHNNq58wChIrZOjkEUgDiIA4l0IGQNwijdy+14iNa9i6LroqJwpVAgvWqk3rOgEVP9vXpr1+nTjFsCaWv//QZNNOINVa1ebV/vqq8Ni4N1rNFoEf5HvKjcvxK8M94d79oKNck3arSYdgu2MJKZ+TCq853OyeDh9FlJ8eaMzLtMbJNcePFK345rD4zS6jVzXczNG0Fz3BsYCkmwAGpJ2A3NbsjfO9kETC6R5AAFySdAB5JsKW42Y/ic3D31pco8h/KnzgsqjeLJZYLPNcsHdWO4WWYlk12RSx6rO8nm3NdZWFi2URBpCp1HACRrhRW6DTSlZfzHNdkhnW9NzgGhkdwc8DdoH4g6jldNqKeB/zrrGYRl7bvuGQl2xM5tYf8XFw+4g68bKqGmE/4gb3yJ2+g+SPhT5NbgWW9uV+M2V4Hl+0m/UmXb2UTcvYDfDHpt3iIG2OQS512i4lb4/LigDJMZ4mlIHvcgWuW6dL2be1w2ZIidG8qHMJUtcDcKLEaIdxeh13nUv6TsZMEyiRnEOa8BA5p0KbHyFsdzXa4DO5vTrz06JxLnzUSqLav//RZEmCVCPRE9ddfr0/XqvDGVVB2rDVK7u4QTOMRNRPro1tEW9xi3nV8l3tNNCx67iXhDR3Kx6LNhGhDOJqJqRw+zVO7VIfuo8yXq8mLBaDMU5AhSY9ZEXdBb3SrB8Wl62DvMSbtXubA1r+Dh/WdEhL0/oXKHbAkE2FCtR7R7QWGcXOF2OMHta/IK+rviKCBlKwaLIXXbrQ86VYQHPrIzbgo2IUaHExgWo1zBt0VR1jyPyCS82a1Gmw46bIp919aPjsGKPAky4owIWuAkDnjk6xsAXAlN+I9K6cbX4NU43fZlkNZU18UuWwsPg2dyAAB2F9LxGNbRI/yVENvt19WG0eMI0c4bnke/k7VXEr4yMhjMtzkGC8t4eXSBQ93oAGgbErQR+XvwpH4DIXOPZM5h4VWsiUGJt9XuJc4nUNQaUQMcWjUTT04tVUxK//0mWZvs/9Fci6J9y8v319NeXDYhQRS1F7u2/AUlxkq1Flaw8fhfk5MOuGJZkwAzhG4cT5Lwge7uKiuVzka1iKq9NOI7KzIuvxcjPmY50MLebg0K4gJYDc/S9OcDAm7XNxesx5GMnndwa55RoJBu43IFtrkoKpHb+omSridNj21lXQJwjSfx43hUTWzpDzrFcrmKrHMR6Nf26aq3ly4EeFLPkPyJIpAyN5cQoCgEkgLsipbxR5zWY+PBAydpfJG1jSVKEtaAXAf7ELfzej4whgJ+ORTQo0ocelI2hkkMH2xfkIscUgnxyo5ySgkFIR/f6OVUdoqcGHosmDM6zFEAI/SBG4EJ97Rfj5BVV/m96CvyHEyMPtsl2QWls5MrSCv2ONl8EIieBa1Tdioxqr105fsicTiIQNqg1UOSv/02ZsYjR5ZvkS0R/cRGgY/TsVgSM99e132q5ze7tXpq3T14ZA8wAVWlAX1q3Ug173NUkIc6EojRLGE7TtmwJAVFPjNRyaNe+KdyNX0exF42/XE4OZJHyic0tcPLSEI9xXSNz43xSxOLZmODmkahwKg+xqoIWxlxXXha+iIGPjhD/PDmUlWmq2Uz3IrUDFcT5UnIGMVBrB0199O5zkGuvFFj+J5kOa7GxUbi8l/abt4eANS8acfN1Sii/5l1s3XNyslvLNIQwhQ4v3U6NjOvJdLC9E5FZWU1EHH6YZR10FCKF0gqEkHISQ0cmfLK1EaWXOkucQjkTToifaiJxfIoIcTGjxccJEy4XUrqSd3E3Joa5WTPm5EmZkuBnf40AGjWjYNFgPqTUdlS47K5ZSGT5EeSSMYCORXFYMrgvk81+3sKiJz/y11ROXDhkqMPL8hTMgcrV//9k=',\n" +
            '        },\n' +
            "        shape: { type: 'AvatarShape', desc: '头像显示形状风格', defaultValue: 'circle' },\n" +
            '      },\n' +
            '      type: {\n' +
            "        AvatarType: ['text', 'icon', 'img'],\n" +
            "        AvatarSize: ['small', 'default', 'large'],\n" +
            "        AvatarShape: ['circle', 'square'],\n" +
            '      },\n' +
            "      category: ['数据展示'],\n" +
            '      designInfo: {\n' +
            '        AvatarIcon: {\n' +
            '          sequence: 1,\n' +
            "          title: '图标头像',\n" +
            "          desc: '使用图标样式展示头像',\n" +
            "          props: { type: 'icon', icon: 'lugia-icon-financial_user' },\n" +
            '          theme: {\n' +
            '            Container: {\n' +
            "              name: '头像',\n" +
            "              desc: '对头像外部容器配置样式',\n" +
            '              normal: [\n' +
            "                ['width'],\n" +
            "                ['height'],\n" +
            "                ['margin'],\n" +
            "                ['padding'],\n" +
            "                ['background'],\n" +
            "                ['opacity'],\n" +
            "                ['boxShadow'],\n" +
            '              ],\n' +
            "              hover: [['width'], ['height']],\n" +
            '              clicked: [],\n' +
            '              disabled: [],\n' +
            '            },\n' +
            '            IconAvatar: {\n' +
            "              name: '图标样式头像',\n" +
            "              desc: '使用图标样式展示头像',\n" +
            "              normal: [['color'], ['margin'], ['font'], ['background'], ['padding']],\n" +
            "              hover: [['color'], ['background'], ['font']],\n" +
            '              clicked: [],\n' +
            '              disabled: [],\n' +
            '            },\n' +
            '          },\n' +
            '        },\n' +
            '        AvatarSrc: {\n' +
            '          sequence: 2,\n' +
            "          title: '图片头像',\n" +
            "          desc: '使用图片资源展示头像',\n" +
            '          props: {\n' +
            "            type: 'img',\n" +
            '            src:\n' +
            "              'data:image/jpeg;base64,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AAAAAABSR0JDAAAAAwAAAABSZCAgZG91YkBv4AAAAAAAAAAAAEdybiBkb3ViQG/gAAAAAAAAAAAAQmwgIGRvdWJAb+AAAAAAAAAAAABCcmRUVW50RiNSbHQAAAAAAAAAAAAAAABCbGQgVW50RiNSbHQAAAAAAAAAAAAAAABSc2x0VW50RiNQeGxAUgAAAAAAAAAAAAp2ZWN0b3JEYXRhYm9vbAEAAAAAUGdQc2VudW0AAAAAUGdQcwAAAABQZ1BDAAAAAExlZnRVbnRGI1JsdAAAAAAAAAAAAAAAAFRvcCBVbnRGI1JsdAAAAAAAAAAAAAAAAFNjbCBVbnRGI1ByY0BZAAAAAAAAAAAAEGNyb3BXaGVuUHJpbnRpbmdib29sAAAAAA5jcm9wUmVjdEJvdHRvbWxvbmcAAAAAAAAADGNyb3BSZWN0TGVmdGxvbmcAAAAAAAAADWNyb3BSZWN0UmlnaHRsb25nAAAAAAAAAAtjcm9wUmVjdFRvcGxvbmcAAAAAADhCSU0D7QAAAAAAEABIAAAAAQACAEgAAAABAAI4QklNBCYAAAAAAA4AAAAAAAAAAAAAP4AAADhCSU0D8gAAAAAACgAA////////AAA4QklNBA0AAAAAAAQAAAAeOEJJTQQZAAAAAAAEAAAAHjhCSU0D8wAAAAAACQAAAAAAAAAAAQA4QklNJxAAAAAAAAoAAQAAAAAAAAACOEJJTQP1AAAAAABIAC9mZgABAGxmZgAGAAAAAAABAC9mZgABAKGZmgAGAAAAAAABADIAAAABAFoAAAAGAAAAAAABADUAAAABAC0AAAAGAAAAAAABOEJJTQP4AAAAAABwAAD/////////////////////////////A+gAAAAA/////////////////////////////wPoAAAAAP////////////////////////////8D6AAAAAD/////////////////////////////A+gAADhCSU0ECAAAAAAAEAAAAAEAAAJAAAACQAAAAAA4QklNBB4AAAAAAAQAAAAAOEJJTQQaAAAAAAM9AAAABgAAAAAAAAAAAAAAKAAAACgAAAAEAHoAaQBqAGkAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAACgAAAAoAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAA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Y29tL3hhcC8xLjAvADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTMyIDc5LjE1OTI4NCwgMjAxNi8wNC8xOS0xMzoxMzo0MCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0RXZ0PSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VFdmVudCMiIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDowNGU1MGQ3OC1lYzgxLTExN2ItYjFiYy1hZjNiNDY4NGI2M2QiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6YmUyZmM0MjQtZDZkYi00ZGYyLWI3ZDctZmFiY2Y0ZjhlMWJjIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9IkNFMUQyNDhFREI0MjFFRENENjkxRkVEQ0MxMDM5NTA1IiBkYzpmb3JtYXQ9ImltYWdlL2pwZWciIHBob3Rvc2hvcDpMZWdhY3lJUFRDRGlnZXN0PSJDRENGRkE3REE4QzdCRTA5MDU3MDc2QUVBRjA1QzM0RSIgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyIgcGhvdG9zaG9wOklDQ1Byb2ZpbGU9InNSR0IgSUVDNjE5NjYtMi4xIiB4bXA6Q3JlYXRlRGF0ZT0iMjAxNy0wOC0wOVQxNTo0NzozMiswODowMCIgeG1wOk1vZGlmeURhdGU9IjIwMTgtMDgtMzBUMDk6MTg6MjYrMDg6MDAiIHhtcDpNZXRhZGF0YURhdGU9IjIwMTgtMDgtMzBUMDk6MTg6MjYrMDg6MDAiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUuNSAoTWFjaW50b3NoKSI+IDx4bXBNTTpIaXN0b3J5PiA8cmRmOlNlcT4gPHJkZjpsaSBzdEV2dDphY3Rpb249InNhdmVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjBhYTM0MTlhLWMxNTctNDM3YS1iMzViLTVkMTY5NzhkNTg1MSIgc3RFdnQ6d2hlbj0iMjAxNy0wOS0xM1QxNzo0NDo0MiswODowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUuNSAoTWFjaW50b3NoKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6YmUyZmM0MjQtZDZkYi00ZGYyLWI3ZDctZmFiY2Y0ZjhlMWJjIiBzdEV2dDp3aGVuPSIyMDE4LTA4LTMwVDA5OjE4OjI2KzA4OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxNS41IChNYWNpbnRvc2gpIiBzdEV2dDpjaGFuZ2VkPSIvIi8+IDwvcmRmOlNlcT4gPC94bXBNTTpIaXN0b3J5PiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg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',\n" +
            '          },\n' +
            '          theme: {\n' +
            '            Container: {\n' +
            "              name: '头像',\n" +
            "              desc: '对头像外部容器配置样式',\n" +
            '              normal: [\n' +
            "                ['width'],\n" +
            "                ['height'],\n" +
            "                ['margin'],\n" +
            "                ['padding'],SAsvRQkpBJOWP/0OwcNVWzKDdSWQHDc1xB8GncrboUHv2MdZtLgwSQOSmnYpG4rVyWYeG691LmbmvAdw6A6d0yPb7ltYtDK7LLGtA9QNDndyWz/wBTuVLHYS8kOLQdY+K1KIdWCAYb7T8QmY92bKdNkgCSdJTMD//R7OoAmT8lY2t8JHBHiO6+b0kFP0Q3Be1+1mjOfUPEf+T/AJKujayv02fRHH96+akk2HDrTJPi04n6SJG2Z1BghJfNqSexv//ZOEJJTQQhAAAAAABhAAAAAQEAAAAPAEEAZABvAGIAZQAgAFAAaABvAHQAbwBzAGgAbwBwAAAAGQBBAGQAbwBiAGUAIABQAGgAbwB0AG8AcwBoAG8AcAAgAEMAQwAgADIAMAAxADUALgA1AAAAAQA4QklNBAYAAAAAAAcACAABAAEBAP/hDlJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTMyIDc5LjE1OTI4NCwgMjAxNi8wNC8xOS0xMzoxMzo0MCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0RXZ0PSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VFdmVudCMiIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDowNGU1MGQ3OC1lYzgxLTExN2ItYjFiYy1hZjNiNDY4NGI2M2QiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6YmUyZmM0MjQtZDZkYi00ZGYyLWI3ZDctZmFiY2Y0ZjhlMWJjIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9IkNFMUQyNDhFREI0MjFFRENENjkxRkVEQ0MxMDM5NTA1IiBkYzpmb3JtYXQ9ImltYWdlL2pwZWciIHBob3Rvc2hvcDpMZWdhY3lJUFRDRGlnZXN0PSJDRENGRkE3REE4QzdCRTA5MDU3MDc2QUVBRjA1QzM0RSIgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyIgcGhvdG9zaG9wOklDQ1Byb2ZpbGU9InNSR0IgSUVDNjE5NjYtMi4xIiB4bXA6Q3JlYXRlRGF0ZT0iMjAxNy0wOC0wOVQxNTo0NzozMiswODowMCIgeG1wOk1vZGlmeURhdGU9IjIwMTgtMDgtMzBUMDk6MTg6MjYrMDg6MDAiIHhtcDpNZXRhZGF0YURhdGU9IjIwMTgtMDgtMzBUMDk6MTg6MjYrMDg6MDAiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUuNSAoTWFjaW50b3NoKSI+IDx4bXBNTTpIaXN0b3J5PiA8cmRmOlNlcT4gPHJkZjpsaSBzdEV2dDphY3Rpb249InNhdmVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjBhYTM0MTlhLWMxNTctNDM3YS1iMzViLTVkMTY5NzhkNTg1MSIgc3RFdnQ6d2hlbj0iMjAxNy0wOS0xM1QxNzo0NDo0MiswODowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUuNSAoTWFjaW50b3NoKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6YmUyZmM0MjQtZDZkYi00ZGYyLWI3ZDctZmFiY2Y0ZjhlMWJjIiBzdEV2dDp3aGVuPSIyMDE4LTA4LTMwVDA5OjE4OjI2KzA4OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxNS41IChNYWNpbnRvc2gpIiBzdEV2dDpjaGFuZ2VkPSIvIi8+IDwvcmRmOlNlcT4gPC94bXBNTTpIaXN0b3J5PiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8P3hwYWNrZXQgZW5kPSJ3Ij8+/+IMWElDQ19QUk9GSUxFAAEBAAAMSExpbm8CEAAAbW50clJHQiBYWVogB84AAgAJAAYAMQAAYWNzcE1TRlQAAAAASUVDIHNSR0IAAAAAAAAAAAAAAAAAAPbWAAEAAAAA0y1IUCAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAARY3BydAAAAVAAAAAzZGVzYwAAAYQAAABsd3RwdAAAAfAAAAAUYmtwdAAAAgQAAAAUclhZWgAAAhgAAAAUZ1hZWgAAAiwAAAAUYlhZWgAAAkAAAAAUZG1uZAAAAlQAAABwZG1kZAAAAsQAAACIdnVlZAAAA0wAAACGdmlldwAAA9QAAAAkbHVtaQAAA/gAAAAUbWVhcwAABAwAAAAkdGVjaAAABDAAAAAMclRSQwAABDwAAAgMZ1RSQwAABDwAAAgMYlRSQwAABDwAAAgMdGV4dAAAAABDb3B5cmlnaHQgKGMpIDE5OTggSGV3bGV0dC1QYWNrYXJkIENvbXBhbnkAAGRlc2MAAAAAAAAAEnNSR0IgSUVDNjE5NjYtMi4xAAAAAAAAAAAAAAASc1JHQiBJRUM2MTk2Ni0yLjEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA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",
        },
        shape: { type: 'AvatarShape', desc: '头像显示形状风格', defaultValue: 'circle' },
      },
      type: {
        AvatarType: ['text', 'icon', 'img'],
        AvatarSize: ['small', 'default', 'large'],
        AvatarShape: ['circle', 'square'],
      },
      category: ['数据展示'],
      theme: {
        Container: {
          name: '头像',
          desc: '对头像外部容器配置样式',
          normal: [
            ['width'],
            ['height'],
            ['margin'],
            ['padding'],
            ['background'],
            ['opacity'],
            ['boxShadow'],
          ],
          hover: [['width'], ['height']],
          clicked: [],
          disabled: [],
        },
        IconAvatar: {
          name: '图标样式头像',
          desc: '使用图标样式展示头像',
          normal: [['color'], ['margin'], ['font'], ['background'], ['padding']],
          hover: [['color'], ['background'], ['font']],
          clicked: [],
          disabled: [],
        },
      },
      childrenWidget: [],
      aliasName: 'AvatarIcon',
    },
    target: Avatar,
    screenshot:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAB7RJREFUeAHlmz1sFEcUx/fOxnwetrEdQEAcBNgo0CWpUFJEoqWgpEocKVKaKF3atFGkBNFEihSSipIiLRIFEVWUDiJ8fCnmGxvOYD4PjPP/DTub8d3e3c7uXLDjJ+3t7uyb997/7Zs3HztXirpMFy9eHFlYWPhIxz4d41I3pmNYRyU+dIrm4mNG52qpVJrUcV7HmT179kzD0C0qdUPwpUuX3pufnz8iwAcFYr/OufSorqounNP5VE9Pz4ndu3f/GdreXIalGTE9PV25f//+53o2IaPfTeMpWiZH/CUZxzdt2vTTyMgIUVOYCjvg6tWrA/V6/SuB/lLWDBa2KJuAmpxxrK+v7+jOnTtns1VJ58rtAAEuqX1/ovO3OkbSxXe3VE6Y1vG18sSvOi/k0ZbLAZcvX3775cuXJwT8QB6loesI/Nne3t4ju3btmvKV7e2ACxcuHJDCkwL/lq+ybvLLpruy6fDevXvP+ugp+zAr5CfEf3qpgQdDbNPp2MbMsDI5QMJ7Jicnv1fX9rMk92WW/t8z9mEjtmJzFvUdm0AM/qSEHcoicAnx/DY+Pn5YTWO+nU0dI6BarX63DMGD+VBsezv8UdsIoD3FYd9WyFJ+qBHkZ+omj7eysaUDyPaqdFrHUm7zrXC55XXdfNyqd0h1QNzP/xFnVlfYsrymi9Q44YO0cUJvIyKBLqntMMgJ3s/LkGjDhg1RpVKJVq9eHckoo16Dquj58+fR3Nxc9OjRI7q0RrMK3YMlHrh9KBsWCW+KAIH/9NWrVy3bTF5L+vv7o+Hh4QR0Kzk4Y2ZmJnrw4EErltzl5XJ5Ymxs7BdXwCIHxBObqjwWbGzPW9+6dat5667iTtdEw61bt4JGg2yZ1gRqzJ1ALWoC8awuGHhAbt++PVq3bl2Cl/B+/PixOV68eGHKV61aFa1fv94cOAyimSiDR9euXTP3IX54sWCUrG+svCQCmM/fu3fvbz0INqXdvHlzNDAwYHVFz549i27fvm3ae1LoXJAXtmzZEq1ZsyYpnZ2dje7cuZPcB7ioDQ0Njdr1hGQgFC9mBAMPGNq9Jd761NRUS/DwkQjhgdcSMpAVkAZjrEZk4gDdTQRUYhKeDWdC/ebNm5naM00EXts8kEHyDEwJVuMA1vCkONgylrKtac/WaDWtSD2Lve14hpc6lsgPyAxFYAUz8oxUFjBDCUcOSc++fcA8fPjQWzx1rNOQ5SZSb2EpFSxm4wB55GAKT+4isrol2jVh7UvUoa4lV6YtK3K2mMua8IzIw/uLCGusS/dlSZ62l95nt64r01tQSgUwg70sT/DRIukOU3i9i1zDi7Rdt64r09uglApgBjsO2JfyvFCRzeAIKdKFuXVdmYWMcyqDHQfwuSooMeCRXCOT0CWL+xJ1bNgjC5mhCewkQb7VBSUmNE+ePElk5unH3TrIQmYXaAwHBB9lYChDWEsMbRkWZyV4G4fDWet68g3jAL7SBifm9czoLDEnYFboJjb7zJ55Bo87f7BrBJYn8LnCbLArDsBQJjEkMk1Bjd0bN240+YDoYLxvE5udDQLctnsqaOYWeiJk7HB+KiWt/THa6Nq6H4B27Njh3RuQ9K5fvx6F7v4c8FzWaQL/xmnD0xC3hDVv0pdIeu2ai6+8FvxzNAEcMNSCIXcx43fNuU175tqXWDukK6S5aK0i6VZ95XTgNw5gW8o7HRi9HrPYuW3btkWZHAH053RptH/esO3a4OcAsDuRwnGDg4PR2rVroxs3biT8Xsa0Z54hAqo63m/Pl/0pSY9lMLviS03asRYhzNu0M7w0ibVazYQ9yVC7QJKESJc4OjpqcoI7QUqT4VlWLcvLk56VWrIDuhE83diVK1eMA9qBt0LhwVnUcbvRNNm2Tt4z2HHA+bwC3HqEK2HvvnmWt1ndyQLclcU1daiLDEvIRge6QhDYccAZHf4T9gYLtNC4qM1juLuq08Ce+RYZrhNoDugqSmAGe5l9eEpO54oI5M2QrCwRuiHAW3nIcpsDutxIs3w+ZzCDnXEAIXXKp3IjL2/E9tmEbuBlbKMOmbYpoatoFFjMxgEarZ1oBJX1XoIihriWSGDdGL3ZnsTqQSe685LFbBzADkwJYxOiN9Fv27dPP+/OAr2FdaiAbHRA6My7UApWu+vUOCDWm+uDKCM2S0+fPu3K27fyiQJ0WHJ127KM5wRr4gC2n6pyLaOAhM3O9ChwF0EShsAXrg5Xt4eaWozVVEkcwLcyhcYxD0GG1c3GdnrrK8OH39Xh6s4qA4z2uyB1EgdwI48eFYPX9nS3/eeZ9aHXh9Dh5gGfumADo1unKY12a4OEq/RNXetltd8ggWHyLltkftd5SewDDuUsvf2z2h3StEVmURNAmRgX1LaO6Hw3lPI3LQcsMaamIX+TAzCW3VSKgMO69F/KedNom/XXwZK2QwzWVAfwgH11Gi19wfVyJjC02iMIrpYO4CE7LBU+P3C9HAnb2+0SBVNTL9AIVOHDTvGVu1laXpyPd10vm0jgzWfZKZ4pAtyIiDdP/6iyrn1HcPXluK7T5juFvSu3YxNwmbn+v/1lxtsBOGFF/2kKB0BKjiv3b3OvXfD6d8X+cdJ1Atcr9q+zjY7gfkX+eTrNEZSxFU35Ysn+ff4fWUWuTRYXuooAAAAASUVORK5CYII=',
  },
  {
    meta: {
      widgetName: 'Avatar',
      title: '图片头像',
      desc: '使用图片资源展示头像',
      props: {
        viewClass: { type: 'string', desc: '用于配置通用主题属性' },
        size: {
          type: 'AvatarSize',
          desc:
            "可配置三种尺寸大小的input ('large' , 'default' , 'small'),高度分别为 40px、32px 和 24px。",
          defaultValue: 'default',
        },
        type: {
          type: 'AvatarType',
          desc: "可配置三种类型的头像 ('text' , 'font' , 'img')",
          defaultValue: 'img',
        },
        name: { type: 'string', desc: '头像显示内容', defaultValue: 'Lugia' },
        icon: { type: 'icon', desc: '头像显示图标资源', defaultValue: 'lugia-icon-financial_user' },
        src: {
          type: 'image',
          desc: '头像显示图片资源',
          defaultValue:
            'data:image/jpeg;base64,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AAAAAABSR0JDAAAAAwAAAABSZCAgZG91YkBv4AAAAAAAAAAAAEdybiBkb3ViQG/gAAAAAAAAAAAAQmwgIGRvdWJAb+AAAAAAAAAAAABCcmRUVW50RiNSbHQAAAAAAAAAAAAAAABCbGQgVW50RiNSbHQAAAAAAAAAAAAAAABSc2x0VW50RiNQeGxAUgAAAAAAAAAAAAp2ZWN0b3JEYXRhYm9vbAEAAAAAUGdQc2VudW0AAAAAUGdQcwAAAABQZ1BDAAAAAExlZnRVbnRGI1JsdAAAAAAAAAAAAAAAAFRvcCBVbnRGI1JsdAAAAAAAAAAAAAAAAFNjbCBVbnRGI1ByY0BZAAAAAAAAAAAAEGNyb3BXaGVuUHJpbnRpbmdib29sAAAAAA5jcm9wUmVjdEJvdHRvbWxvbmcAAAAAAAAADGNyb3BSZWN0TGVmdGxvbmcAAAAAAAAADWNyb3BSZWN0UmlnaHRsb25nAAAAAAAAAAtjcm9wUmVjdFRvcGxvbmcAAAAAADhCSU0D7QAAAAAAEABIAAAAAQACAEgAAAABAAI4QklNBCYAAAAAAA4AAAAAAAAAAAAAP4AAADhCSU0D8gAAAAAACgAA////////AAA4QklNBA0AAAAAAAQAAAAeOEJJTQQZAAAAAAAEAAAAHjhCSU0D8wAAAAAACQAAAAAAAAAAAQA4QklNJxAAAAAAAAoAAQAAAAAAAAACOEJJTQP1AAAAAABIAC9mZgABAGxmZgAGAAAAAAABAC9mZgABAKGZmgAGAAAAAAABADIAAAABAFoAAAAGAAAAAAABADUAAAABAC0AAAAGAAAAAAABOEJJTQP4AAAAAABwAAD/////////////////////////////A+gAAAAA/////////////////////////////wPoAAAAAP////////////////////////////8D6AAAAAD/////////////////////////////A+gAADhCSU0ECAAAAAAAEAAAAAEAAAJAAAACQAAAAAA4QklNBB4AAAAAAAQAAAAAOEJJTQQaAAAAAAM9AAAABgAAAAAAAAAAAAAAKAAAACgAAAAEAHoAaQBqAGkAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAACgAAAAoAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAA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Y29tL3hhcC8xLjAvADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTMyIDc5LjE1OTI4NCwgMjAxNi8wNC8xOS0xMzoxMzo0MCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0RXZ0PSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VFdmVudCMiIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDowNGU1MGQ3OC1lYzgxLTExN2ItYjFiYy1hZjNiNDY4NGI2M2QiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6YmUyZmM0MjQtZDZkYi00ZGYyLWI3ZDctZmFiY2Y0ZjhlMWJjIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9IkNFMUQyNDhFREI0MjFFRENENjkxRkVEQ0MxMDM5NTA1IiBkYzpmb3JtYXQ9ImltYWdlL2pwZWciIHBob3Rvc2hvcDpMZWdhY3lJUFRDRGlnZXN0PSJDRENGRkE3REE4QzdCRTA5MDU3MDc2QUVBRjA1QzM0RSIgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyIgcGhvdG9zaG9wOklDQ1Byb2ZpbGU9InNSR0IgSUVDNjE5NjYtMi4xIiB4bXA6Q3JlYXRlRGF0ZT0iMjAxNy0wOC0wOVQxNTo0NzozMiswODowMCIgeG1wOk1vZGlmeURhdGU9IjIwMTgtMDgtMzBUMDk6MTg6MjYrMDg6MDAiIHhtcDpNZXRhZGF0YURhdGU9IjIwMTgtMDgtMzBUMDk6MTg6MjYrMDg6MDAiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUuNSAoTWFjaW50b3NoKSI+IDx4bXBNTTpIaXN0b3J5PiA8cmRmOlNlcT4gPHJkZjpsaSBzdEV2dDphY3Rpb249InNhdmVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjBhYTM0MTlhLWMxNTctNDM3YS1iMzViLTVkMTY5NzhkNTg1MSIgc3RFdnQ6d2hlbj0iMjAxNy0wOS0xM1QxNzo0NDo0MiswODowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUuNSAoTWFjaW50b3NoKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6YmUyZmM0MjQtZDZkYi00ZGYyLWI3ZDctZmFiY2Y0ZjhlMWJjIiBzdEV2dDp3aGVuPSIyMDE4LTA4LTMwVDA5OjE4OjI2KzA4OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxNS41IChNYWNpbnRvc2gpIiBzdEV2dDpjaGFuZ2VkPSIvIi8+IDwvcmRmOlNlcT4gPC94bXBNTTpIaXN0b3J5PiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8P3hwYWNrZXQgZW5kPSJ3Ij8+/+IMWElDQ19QUk9GSUxFAAEBAAAMSExpbm8CEAAAbW50clJHQiBYWVogB84AAgAJAAYAMQAAYWNzcE1TRlQAAAAASUVDIHNSR0IAAAAAAAAAAAAAAAAAAPbWAAEAAAAA0y1IUCAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAARY3BydAAAAVAAAAAzZGVzYwAAAYQAAABsd3RwdAAAAfAAAAAUYmtwdAAAAgQAAAAUclhZWgAAAhgAAAAUZ1hZWgAAAiwAAAAUYlhZWgAAAkAAAAAUZG1uZAAAAlQAAABwZG1kZAAAAsQAAACIdnVlZAAAA0wAAACGdmlldwAAA9QAAAAkbHVtaQAAA/gAAAAUbWVhcwAABAwAAAAkdGVjaAAABDAAAAAMclRSQwAABDwAAAgMZ1RSQwAABDwAAAgMYlRSQwAABDwAAAgMdGV4dAAAAABDb3B5cmlnaHQgKGMpIDE5OTggSGV3bGV0dC1QYWNrYXJkIENvbXBhbnkAAGRlc2MAAAAAAAAAEnNSR0IgSUVDNjE5NjYtMi4xAAAAAAAAAAAAAAASc1JHQiBJRUM2MTk2Ni0yLjEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFhZWiAAAAAAAADzUQABAAAAARbMWFlaIAAAAAAAAAAAAAAAAAAAAABYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9kZXNjAAAAAAAAABZJRUMgaHR0cDovL3d3dy5pZWMuY2gAAAAAAAAAAAAAABZJRUMgaHR0cDovL3d3dy5pZWMuY2gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAZGVzYwAAAAAAAAAuSUVDIDYxOTY2LTIuMSBEZWZhdWx0IFJHQiBjb2xvdXIgc3BhY2UgLSBzUkdCAAAAAAAAAAAAAAAuSUVDIDYxOTY2LTIuMSBEZWZhdWx0IFJHQiBjb2xvdXIgc3BhY2UgLSBzUkdCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGRlc2MAAAAAAAAALFJlZmVyZW5jZSBWaWV3aW5nIENvbmRpdGlvbiBpbiBJRUM2MTk2Ni0yLjEAAAAAAAAAAAAAACxSZWZlcmVuY2UgVmlld2luZyBDb25kaXRpb24gaW4gSUVDNjE5NjYtMi4xAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB2aWV3AAAAAAATpP4AFF8uABDPFAAD7cwABBMLAANcngAAAAFYWVogAAAAAABMCVYAUAAAAFcf521lYXMAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAKPAAAAAnNpZyAAAAAAQ1JUIGN1cnYAAAAAAAAEAAAAAAUACgAPABQAGQAeACMAKAAtADIANwA7AEAARQBKAE8AVABZAF4AYwBoAG0AcgB3AHwAgQCGAIsAkACVAJoAnwCkAKkArgCyALcAvADBAMYAywDQANUA2wDgAOUA6wDwAPYA+wEBAQcBDQETARkBHwElASsBMgE4AT4BRQFMAVIBWQFgAWcBbgF1AXwBgwGLAZIBmgGhAakBsQG5AcEByQHRAdkB4QHpAfIB+gIDAgwCFAIdAiYCLwI4AkECSwJUAl0CZwJxAnoChAKOApgCogKsArYCwQLLAtUC4ALrAvUDAAMLAxYDIQMtAzgDQwNPA1oDZgNyA34DigOWA6IDrgO6A8cD0wPgA+wD+QQGBBMEIAQtBDsESARVBGMEcQR+BIwEmgSoBLYExATTBOEE8AT+BQ0FHAUrBToFSQVYBWcFdwWGBZYFpgW1BcUF1QXlBfYGBgYWBicGNwZIBlkGagZ7BowGnQavBsAG0QbjBvUHBwcZBysHPQdPB2EHdAeGB5kHrAe/B9IH5Qf4CAsIHwgyCEYIWghuCIIIlgiqCL4I0gjnCPsJEAklCToJTwlkCXkJjwmkCboJzwnlCfsKEQonCj0KVApqCoEKmAquCsUK3ArzCwsLIgs5C1ELaQuAC5gLsAvIC+EL+QwSDCoMQwxcDHUMjgynDMAM2QzzDQ0NJg1ADVoNdA2ODakNww3eDfgOEw4uDkkOZA5/DpsOtg7SDu4PCQ8lD0EPXg96D5YPsw/PD+wQCRAmEEMQYRB+EJsQuRDXEPURExExEU8RbRGMEaoRyRHoEgcSJhJFEmQShBKjEsMS4xMDEyMTQxNjE4MTpBPFE+UUBhQnFEkUahSLFK0UzhTwFRIVNBVWFXgVmxW9FeAWAxYmFkkWbBaPFrIW1hb6Fx0XQRdlF4kXrhfSF/cYGxhAGGUYihivGNUY+hkgGUUZaxmRGbcZ3RoEGioaURp3Gp4axRrsGxQbOxtjG4obshvaHAIcKhxSHHscoxzMHPUdHh1HHXAdmR3DHeweFh5AHmoelB6+HukfEx8+H2kflB+/H+ogFSBBIGwgmCDEIPAhHCFIIXUhoSHOIfsiJyJVIoIiryLdIwojOCNmI5QjwiPwJB8kTSR8JKsk2iUJJTglaCWXJccl9yYnJlcmhya3JugnGCdJJ3onqyfcKA0oPyhxKKIo1CkGKTgpaymdKdAqAio1KmgqmyrPKwIrNitpK50r0SwFLDksbiyiLNctDC1BLXYtqy3hLhYuTC6CLrcu7i8kL1ovkS/HL/4wNTBsMKQw2zESMUoxgjG6MfIyKjJjMpsy1DMNM0YzfzO4M/E0KzRlNJ402DUTNU01hzXCNf02NzZyNq426TckN2A3nDfXOBQ4UDiMOMg5BTlCOX85vDn5OjY6dDqyOu87LTtrO6o76DwnPGU8pDzjPSI9YT2hPeA+ID5gPqA+4D8hP2E/oj/iQCNAZECmQOdBKUFqQaxB7kIwQnJCtUL3QzpDfUPARANER0SKRM5FEkVVRZpF3kYiRmdGq0bwRzVHe0fASAVIS0iRSNdJHUljSalJ8Eo3Sn1KxEsMS1NLmkviTCpMcky6TQJNSk2TTdxOJU5uTrdPAE9JT5NP3VAnUHFQu1EGUVBRm1HmUjFSfFLHUxNTX1OqU/ZUQlSPVNtVKFV1VcJWD1ZcVqlW91dEV5JX4FgvWH1Yy1kaWWlZuFoHWlZaplr1W0VblVvlXDVchlzWXSddeF3JXhpebF69Xw9fYV+zYAVgV2CqYPxhT2GiYfViSWKcYvBjQ2OXY+tkQGSUZOllPWWSZedmPWaSZuhnPWeTZ+loP2iWaOxpQ2maafFqSGqfavdrT2una/9sV2yvbQhtYG25bhJua27Ebx5veG/RcCtwhnDgcTpxlXHwcktypnMBc11zuHQUdHB0zHUodYV14XY+dpt2+HdWd7N4EXhueMx5KnmJeed6RnqlewR7Y3vCfCF8gXzhfUF9oX4BfmJ+wn8jf4R/5YBHgKiBCoFrgc2CMIKSgvSDV4O6hB2EgITjhUeFq4YOhnKG14c7h5+IBIhpiM6JM4mZif6KZIrKizCLlov8jGOMyo0xjZiN/45mjs6PNo+ekAaQbpDWkT+RqJIRknqS45NNk7aUIJSKlPSVX5XJljSWn5cKl3WX4JhMmLiZJJmQmfyaaJrVm0Kbr5wcnImc951kndKeQJ6unx2fi5/6oGmg2KFHobaiJqKWowajdqPmpFakx6U4pammGqaLpv2nbqfgqFKoxKk3qamqHKqPqwKrdavprFys0K1ErbiuLa6hrxavi7AAsHWw6rFgsdayS7LCszizrrQltJy1E7WKtgG2ebbwt2i34LhZuNG5SrnCuju6tbsuu6e8IbybvRW9j74KvoS+/796v/XAcMDswWfB48JfwtvDWMPUxFHEzsVLxcjGRsbDx0HHv8g9yLzJOsm5yjjKt8s2y7bMNcy1zTXNtc42zrbPN8+40DnQutE80b7SP9LB00TTxtRJ1MvVTtXR1lXW2Ndc1+DYZNjo2WzZ8dp22vvbgNwF3IrdEN2W3hzeot8p36/gNuC94UThzOJT4tvjY+Pr5HPk/OWE5g3mlucf56noMui86Ubp0Opb6uXrcOv77IbtEe2c7ijutO9A78zwWPDl8XLx//KM8xnzp/Q09ML1UPXe9m32+/eK+Bn4qPk4+cf6V/rn+3f8B/yY/Sn9uv5L/tz/bf///+4ADkFkb2JlAGRAAAAAAf/bAIQAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQICAgICAgICAgICAwMDAwMDAwMDAwEBAQEBAQEBAQEBAgIBAgIDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMD/8AAEQgAKAAoAwERAAIRAQMRAf/dAAQABf/EAIgAAAICAwAAAAAAAAAAAAAAAAgKBgcDBQkBAAEEAwAAAAAAAAAAAAAAAAcBBAUGAAIDEAABBAECBQMDAwUAAAAAAAADAQIEBQYRBwAhMRIIQRMUcSIVUYEJkdEyUjMRAAEDAwQBAwQCAwAAAAAAAAERAgMAIQQxQRIFUXGBBsEiMhNhQlJiB//aAAwDAQACEQMRAD8AZzjua3RFTXREX6dOXDel8eKkMWSFvJzkZoiKmqp/VV9URPXjoxzWkchakcLG9bxpYw5oKw0yuBayow5kWlkWdbHu5MIyIop8ajPKHbSIJtU7DsCon+jl4dj7gHNNq58wChIrZOjkEUgDiIA4l0IGQNwijdy+14iNa9i6LroqJwpVAgvWqk3rOgEVP9vXpr1+nTjFsCaWv//QZNNOINVa1ebV/vqq8Ni4N1rNFoEf5HvKjcvxK8M94d79oKNck3arSYdgu2MJKZ+TCq853OyeDh9FlJ8eaMzLtMbJNcePFK345rD4zS6jVzXczNG0Fz3BsYCkmwAGpJ2A3NbsjfO9kETC6R5AAFySdAB5JsKW42Y/ic3D31pco8h/KnzgsqjeLJZYLPNcsHdWO4WWYlk12RSx6rO8nm3NdZWFi2URBpCp1HACRrhRW6DTSlZfzHNdkhnW9NzgGhkdwc8DdoH4g6jldNqKeB/zrrGYRl7bvuGQl2xM5tYf8XFw+4g68bKqGmE/4gb3yJ2+g+SPhT5NbgWW9uV+M2V4Hl+0m/UmXb2UTcvYDfDHpt3iIG2OQS512i4lb4/LigDJMZ4mlIHvcgWuW6dL2be1w2ZIidG8qHMJUtcDcKLEaIdxeh13nUv6TsZMEyiRnEOa8BA5p0KbHyFsdzXa4DO5vTrz06JxLnzUSqLav//RZEmCVCPRE9ddfr0/XqvDGVVB2rDVK7u4QTOMRNRPro1tEW9xi3nV8l3tNNCx67iXhDR3Kx6LNhGhDOJqJqRw+zVO7VIfuo8yXq8mLBaDMU5AhSY9ZEXdBb3SrB8Wl62DvMSbtXubA1r+Dh/WdEhL0/oXKHbAkE2FCtR7R7QWGcXOF2OMHta/IK+rviKCBlKwaLIXXbrQ86VYQHPrIzbgo2IUaHExgWo1zBt0VR1jyPyCS82a1Gmw46bIp919aPjsGKPAky4owIWuAkDnjk6xsAXAlN+I9K6cbX4NU43fZlkNZU18UuWwsPg2dyAAB2F9LxGNbRI/yVENvt19WG0eMI0c4bnke/k7VXEr4yMhjMtzkGC8t4eXSBQ93oAGgbErQR+XvwpH4DIXOPZM5h4VWsiUGJt9XuJc4nUNQaUQMcWjUTT04tVUxK//0mWZvs/9Fci6J9y8v319NeXDYhQRS1F7u2/AUlxkq1Flaw8fhfk5MOuGJZkwAzhG4cT5Lwge7uKiuVzka1iKq9NOI7KzIuvxcjPmY50MLebg0K4gJYDc/S9OcDAm7XNxesx5GMnndwa55RoJBu43IFtrkoKpHb+omSridNj21lXQJwjSfx43hUTWzpDzrFcrmKrHMR6Nf26aq3ly4EeFLPkPyJIpAyN5cQoCgEkgLsipbxR5zWY+PBAydpfJG1jSVKEtaAXAf7ELfzej4whgJ+ORTQo0ocelI2hkkMH2xfkIscUgnxyo5ySgkFIR/f6OVUdoqcGHosmDM6zFEAI/SBG4EJ97Rfj5BVV/m96CvyHEyMPtsl2QWls5MrSCv2ONl8EIieBa1Tdioxqr105fsicTiIQNqg1UOSv/02ZsYjR5ZvkS0R/cRGgY/TsVgSM99e132q5ze7tXpq3T14ZA8wAVWlAX1q3Ug173NUkIc6EojRLGE7TtmwJAVFPjNRyaNe+KdyNX0exF42/XE4OZJHyic0tcPLSEI9xXSNz43xSxOLZmODmkahwKg+xqoIWxlxXXha+iIGPjhD/PDmUlWmq2Uz3IrUDFcT5UnIGMVBrB0199O5zkGuvFFj+J5kOa7GxUbi8l/abt4eANS8acfN1Sii/5l1s3XNyslvLNIQwhQ4v3U6NjOvJdLC9E5FZWU1EHH6YZR10FCKF0gqEkHISQ0cmfLK1EaWXOkucQjkTToifaiJxfIoIcTGjxccJEy4XUrqSd3E3Joa5WTPm5EmZkuBnf40AGjWjYNFgPqTUdlS47K5ZSGT5EeSSMYCORXFYMrgvk81+3sKiJz/y11ROXDhkqMPL8hTMgcrV//9k=',
        },
        shape: { type: 'AvatarShape', desc: '头像显示形状风格', defaultValue: 'circle' },
      },
      type: {
        AvatarType: ['text', 'icon', 'img'],
        AvatarSize: ['small', 'default', 'large'],
        AvatarShape: ['circle', 'square'],
      },
      category: ['数据展示'],
      theme: {
        Container: {
          name: '头像',
          desc: '对头像外部容器配置样式',
          normal: [
            ['width'],
            ['height'],
            ['margin'],
            ['padding'],
            ['background'],
            ['opacity'],
            ['boxShadow'],
          ],
          hover: [['width'], ['height']],
          clicked: [],
          disabled: [],
        },
        SrcAvatar: {
          name: '头像图片',
          desc: '对头像图片配置样式',
          normal: [['width'], ['height'], ['margin'], ['padding'], ['fontSize'], ['background']],
          hover: [['width'], ['height'], ['fontSize'], ['background']],
          clicked: [],
          disabled: [],
        },
      },
      childrenWidget: [],
      aliasName: 'AvatarSrc',
    },
    target: Avatar,
    screenshot:
      'data:image/png;base64,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',
  },
  {
    meta: {
      widgetName: 'Badge',
      title: '徽标数',
      desc: '图标右上角的圆形徽标数字',
      props: {
        viewClass: { type: 'string', desc: '用于配置通用主题属性' },
        showZero: { type: 'boolean', desc: '当数值为 0 时，是否展示 Badge', defaultValue: false },
        overflowCount: {
          type: 'number',
          desc: '超过 overflowCount 的会显示为 ${overflowCount}+，默认的 overflowCount 为 99',
          defaultValue: 99,
        },
        children: { type: 'React$Element<any>', desc: '可作为显示徽标数的子组件' },
        count: {
          type: 'number',
          desc: '展示的数字，大于封顶数时 显示为${overflowCount}+,为 0 时隐藏',
          defaultValue: 0,
        },
      },
      category: ['数据展示'],
      designInfo: {
        BadgeNumber: {
          sequence: 1,
          title: '数字徽标',
          desc: '徽标数大于0时,显示的数字',
          props: { showZero: true, count: 1 },
          theme: {
            BadgeNumber: {
              name: '徽标数',
              desc: '徽标数 显示数字时的样式展示',
              normal: [
                ['width'],
                ['height'],
                ['background'],
                ['position'],
                ['opacity'],
                ['color'],
                ['margin'],
                ['padding'],
                ['boxShadow'],
              ],
              hover: [['width'], ['height'], ['background'], ['opacity'], ['color']],
              clicked: [],
              disabled: [],
            },
          },
        },
      },
      theme: {
        BadgeDot: {
          name: '点状徽标',
          desc: '徽标数不显示数字时的样式展示',
          normal: [
            ['width'],
            ['height'],
            ['background'],
            ['position'],
            ['opacity'],
            ['margin'],
            ['padding'],
            ['boxShadow'],
          ],
          hover: [['width'], ['height'], ['background'], ['opacity']],
          clicked: [],
          disabled: [],
        },
      },
      childrenWidget: [],
    },
    target: Badge,
    screenshot:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAapJREFUSA21Vr1KA0EQntnjEAy+wGEhWCSVnSj4CIJib+MLCHkC8T2ENPai4CMI2lqZQrCQvECIIOFunW9yGzbcmcyZ85rd7H7fN7O78xOmJd/X3sF2PqVTXxTHxLwr0KyEj8j7d3buMUnpfvP15fM3Ga7bmHSPsoKm17J34ckndZiwxsS5zAeO0qvO8GkU1sNYMTDpHp7kXNyKh1sBZBqZx4l3553h80OMd/GPcXf/sqD8rrE4RMQhcKERa85PAM8B8EQLRmOwZS6ChaPkLJxEDeDOc56+/cnzOqt6XWkPb6Le6oM2vfM64bCm16VBQqyh+O0/VkVL4FpHRFeywTtO43xFKFpFYxwchrbTJIp3WpxD25UZ2qJsJCXZj0cO6R/ttDbN1op5ixswUKkfFqIRI3kgVdEIbg4TbYeS25xpY0DboZ6XJdfGMqI00UTblc1iYOQ1gQ2grVGEZiH5MG7CXooVLdUUkBpA1UOzQKldSjRsQmPWeGbdbZ4HZf3ur2Ok5PZDL4A/srb4/WvLhClYT3zakyi4sUQXMMCCE3se3K6cIGxgbONvyw8qXbKgKjf5rgAAAABJRU5ErkJggg==',
  },
  {
    meta: {
      widgetName: 'Badge',
      title: '数字徽标',
      desc: '徽标数大于0时,显示的数字',
      props: {
        viewClass: { type: 'string', desc: '用于配置通用主题属性' },
        showZero: { type: 'boolean', desc: '当数值为 0 时，是否展示 Badge', defaultValue: true },
        overflowCount: {
          type: 'number',
          desc: '超过 overflowCount 的会显示为 ${overflowCount}+，默认的 overflowCount 为 99',
          defaultValue: 99,
        },
        children: { type: 'React$Element<any>', desc: '可作为显示徽标数的子组件' },
        count: {
          type: 'number',
          desc: '展示的数字，大于封顶数时 显示为${overflowCount}+,为 0 时隐藏',
          defaultValue: 1,
        },
      },
      category: ['数据展示'],
      theme: {
        BadgeNumber: {
          name: '徽标数',
          desc: '徽标数 显示数字时的样式展示',
          normal: [
            ['width'],
            ['height'],
            ['background'],
            ['position'],
            ['opacity'],
            ['color'],
            ['margin'],
            ['padding'],
            ['boxShadow'],
          ],
          hover: [['width'], ['height'], ['background'], ['opacity'], ['color']],
          clicked: [],
          disabled: [],
        },
      },
      childrenWidget: [],
      aliasName: 'BadgeNumber',
    },
    target: Badge,
    screenshot:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAAAAXNSR0IArs4c6QAAAk9JREFUSA29lr9PFEEUx79vb44ECJWJJpggFgZiYULiyWG8XGIgoVITr5G/xMLGxIIWa2sqSYitFaEApSCxMBIj0AAVFeIJd7fje7M7l9llud279e4Vu/PjzfvszM7M+xIy2Pn9uRnfb74AqKKB2zxkPBx2TMARoDc9T62Pft/aTQvH/tfb2dRsTZP/DhpT13s5PYQ90t6bsb0vH53WSDERWH/w6G7jEqvQuhzxzloh2i4OYWn429eD+JArwLPpuapGa41hN+LOXdWJTgmFl2M/tjbccRGgwIDmZ61RdJ16LROhAagFF9oGhsu4k3tm8a/jmfLyluzyerY//Gf5ltEGc9/8a0zssM0AZTd2u0FocgKFJ2XQrZtu+OQybz7D4F4DNFs/2TWxtVh7jtFPqxj58B6q+jjRJ95oGUoOdavVTD9nhQLUfBXFVzWo8sN4vPQ6n2VhqeAGSff3pu9heGXZOLZ+/oJ3ZwI01N1mFhYvKVXScYGHf3SC+uu3+PNsCbi4yDrM8aOKCu9GpzG56O8f4nyxBjT4aPVowlI81l7EncPU/3buz9Y73j6H2fxze2kBHucOkz3Aicd3G+ezwZiweIZ6czA4oUii5kw9KKCwPCMLOFP3HcoMYZldKrKg30DLMECjQVgW9A3Ksa3OkYNvTDRI45IyJ+Dfpad2aOd3kID5LgzMzFCKkpFFgwSyIOzN+ZJYEtNmewnXBkol0B5qAfxVUs9lJkZUz0i8CFAaBCoahKG9/9NAJpZc8SSxxdoiKqhGnwMTwlEs8D+l/j/87s6odJWxqQAAAABJRU5ErkJggg==',
  },
  {
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
          type: 'object[]',
          desc: '生成面包屑数据对象的数组，path是跳转路径，title是面包屑展示文本',
          meta: [
            { key: 'path', title: '跳转路径', type: 'string' },
            { key: 'title', title: '展示文本', type: 'string' },
          ],
        },
        params: { type: 'Object', desc: '可配置的参数' },
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
      theme: {
        BreadcrumbWrap: {
          name: '面包屑',
          desc: '面包屑所在区域面积',
          normal: [
            ['width'],
            ['height'],
            ['padding'],
            ['margin'],
            ['border'],
            ['opacity'],
            ['borderRadius'],
            ['boxShadow'],
            ['background'],
          ],
          hover: [['border'], ['borderRadius'], ['boxShadow'], ['background'], ['opacity']],
          clicked: [],
          disabled: [],
        },
        BreadcrumbItem: {
          name: '面包屑单项配置',
          theme: {
            ItemWrap: {
              name: '单项外盒',
              desc: '面包屑的文本配置',
              normal: {
                selectNames: [['width'], ['padding'], ['margin'], ['opacity']],
                nth: [['width'], ['padding'], ['margin'], ['opacity']],
              },
              hover: {
                selectNames: [['width'], ['padding'], ['margin'], ['opacity']],
                nth: [['width'], ['padding'], ['margin'], ['opacity']],
              },
              clicked: [],
              disabled: [],
            },
            Text: {
              name: '文本',
              desc: '面包屑的文本配置',
              normal: {
                selectNames: [
                  ['color'],
                  ['fontSize'],
                  ['margin', 'left'],
                  ['margin', 'right'],
                  ['padding', 'left'],
                  ['padding', 'right'],
                  ['font'],
                ],
                nth: [
                  ['color'],
                  ['fontSize'],
                  ['margin', 'left'],
                  ['margin', 'right'],
                  ['padding', 'left'],
                  ['padding', 'right'],
                  ['font'],
                ],
              },
              hover: {
                selectNames: [
                  ['color'],
                  ['fontSize'],
                  ['margin', 'left'],
                  ['margin', 'right'],
                  ['padding', 'left'],
                  ['padding', 'right'],
                  ['font'],
                ],
                nth: [
                  ['color'],
                  ['fontSize'],
                  ['margin', 'left'],
                  ['margin', 'right'],
                  ['padding', 'left'],
                  ['padding', 'right'],
                  ['font'],
                ],
              },
              clicked: [],
              disabled: [],
            },
            Separator: {
              name: '分隔符',
              desc: '面包屑的分隔符配置',
              normal: {
                selectNames: [
                  ['color'],
                  ['fontSize'],
                  ['margin', 'left'],
                  ['margin', 'right'],
                  ['padding', 'left'],
                  ['padding', 'right'],
                ],
                nth: [
                  ['color'],
                  ['fontSize'],
                  ['margin', 'left'],
                  ['margin', 'right'],
                  ['padding', 'left'],
                  ['padding', 'right'],
                ],
              },
              hover: [],
              clicked: [],
              disabled: [],
            },
          },
        },
      },
      childrenWidget: [],
    },
    target: Breadcrumb,
    screenshot:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAAAUCAYAAAByKzjvAAAAAXNSR0IArs4c6QAAAslJREFUWAntWUFrE0EUfm82sVIpHioiigfRQ6DoTfBkUSjbmqbapG6bilhTT977c7SKksQhCaRJMJJDBT14yEUPUlDswYPiwVYwxCbuPl8ChYgkZLOTZAruJcvOfN97b76Z92YmAP+foY4ADtW6C+NSFk44QHMCfCnLmv7uAtq3rgmZDxJgbdkKlno14ovLDeoGvGzNNcXqd/92vtjo3GdH7wkyH7T22dra6sr/QCDQ9N9t/1Zbre/Z7Ouxyt7OMwGwxt//EaBbO4zX/yEiAUQrQPDYstDWweNqbWeR/TBG/EcSXvw5EALIdGGKp/npQwIeeglWJZYnxSogpOfnr+x64T0QAjgcLCK+WlgIffASrCpsPFWc4AlxCcjwPCG0FyCXyx3j9HOdEP/K/aoGsycepx7jgrIdvTmz2RO+BaS9AJUq3CKEvfExf6rF76G9lstlPw/+bUCxzquyqw1AJ2e1F8ABWEXApGmalU6BDKrt4/bXEAGNg9//SIVNrQVIpjcuAtB5FN5zrYrBanA06hEAlqI3zM8qOH0qSPrF4TiCg3XeL0WuvemXDTe8UuZO2UAmooi6wXXqq+0K4OI7ikRLnGs97zQ6DYCbNhvxDtejXUFnsm5wnfpqK8DPKkW4wo0eNvxPOgUwqDbe9yPvxmJA+NSyJmqq7GorAN+xcPGFfDhsflMVrBeeZCo/ycX3LAif0hWpZQ2QsnjOxvplnm0hL4OmFts4DEI5ujDzTiWvlivAxtpdXu5fDAgWVQbbK5eUpaN8DxVBUl+PtBNASjI42BVA1ObizRa/mrseASPxXkVsh9NOABsK01x8T/Jxc72d0wP/znt/vgrJWNbUD9W2m3fkqkm98CVkLtM4afL/D5NeeFRh46nnF8CpvzUMcXUxMrupinefR6sVkMm8OM6zfxaE+ly7H7DrX+d3jNPhJyscfOka2wXgD1IN5EWLZvuGAAAAAElFTkSuQmCC',
  },
  {
    meta: {
      widgetName: 'Button',
      title: '按钮',
      desc: '方便用户点击操作',
      props: {
        disabled: {
          type: 'boolean',
          desc: '按钮是否禁用，true 禁用 false 可用',
          defaultValue: false,
        },
        shape: {
          type: 'ButtonShape',
          desc: '设置按钮形状，可以设置为 circle 或者不设',
          defaultValue: 'default',
        },
        type: {
          type: 'ButtonType',
          desc: '支持多种不同的按钮风格，可选值为 primary、success、warning、danger 或者不设',
          defaultValue: 'primary',
        },
        plain: { type: 'boolean', desc: '是否为朴素按钮' },
        size: {
          type: 'ButtonSize',
          desc: '设置按钮大小，可选值为 small、large、bigger 或者不设',
          defaultValue: 'default',
        },
        loading: { type: 'boolean', desc: '设置按钮加载状态' },
        circle: { type: 'boolean', desc: '设置圆形按钮' },
        icon: { type: 'string', desc: '设置按钮图标类型' },
        text: { type: 'string | React.node', desc: '设置按钮的文本内容', defaultValue: 'Button' },
        block: { type: 'boolean', desc: '按钮宽度为父元素宽度', defaultValue: false },
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
        PlainButton: {
          sequence: 1,
          title: '朴素按钮',
          desc: '朴素按钮',
          props: { plain: true },
          theme: {
            Container: {
              name: '按钮整体样式',
              desc: '为按钮配置整体样式',
              normal: [
                ['background'],
                ['border'],
                ['height'],
                ['width'],
                ['padding'],
                ['margin'],
                ['borderRadius'],
              ],
              hover: [['background'], ['border']],
              active: [['background'], ['border']],
              disabled: [['background'], ['border']],
              focus: [['background'], ['border']],
            },
            ButtonText: {
              name: '按钮文字样式',
              desc: '为按钮文字配置样式',
              normal: [['color'], ['font']],
              hover: [['color']],
              active: [['color']],
              disabled: [['color']],
              focus: [['color']],
            },
            ButtonIcon: {
              name: '按钮图标样式',
              desc: '为按钮图标配置样式',
              normal: [['color'], ['font']],
              hover: [['color']],
              active: [['color']],
              disabled: [['color']],
              focus: [['color']],
            },
          },
        },
        IconButton: {
          sequence: 1,
          title: '图标按钮',
          desc: '图标按钮',
          props: { icon: 'lugia-icon-logo_lugia' },
          theme: {
            Container: {
              name: '按钮整体样式',
              desc: '为按钮配置整体样式',
              normal: [
                ['background'],
                ['border'],
                ['height'],
                ['width'],
                ['padding'],
                ['margin'],
                ['borderRadius'],
              ],
              hover: [['background'], ['border']],
              active: [['background'], ['border']],
              disabled: [['background'], ['border']],
              focus: [['background'], ['border']],
            },
            ButtonText: {
              name: '按钮文字样式',
              desc: '为按钮文字配置样式',
              normal: [['color'], ['font']],
              hover: [['color']],
              active: [['color']],
              disabled: [['color']],
              focus: [['color']],
            },
            ButtonIcon: {
              name: '按钮图标样式',
              desc: '为按钮图标配置样式',
              normal: [['color'], ['font']],
              hover: [['color']],
              active: [['color']],
              disabled: [['color']],
              focus: [['color']],
            },
          },
        },
        CircleButton: {
          sequence: 1,
          title: '圆形图标按钮',
          desc: '圆形图标按钮',
          props: { circle: true, icon: 'lugia-icon-logo_lugia', text: '', type: 'primary' },
          theme: {
            Container: {
              name: '按钮整体样式',
              desc: '为按钮配置整体样式',
              normal: [
                ['background'],
                ['border'],
                ['height'],
                ['width'],
                ['padding'],
                ['margin'],
                ['borderRadius'],
              ],
              hover: [['background'], ['border']],
              active: [['background'], ['border']],
              disabled: [['background'], ['border']],
              focus: [['background'], ['border']],
            },
            ButtonText: {
              name: '按钮文字样式',
              desc: '为按钮文字配置样式',
              normal: [['color'], ['font']],
              hover: [['color']],
              active: [['color']],
              disabled: [['color']],
              focus: [['color']],
            },
            ButtonIcon: {
              name: '按钮图标样式',
              desc: '为按钮图标配置样式',
              normal: [['color'], ['font']],
              hover: [['color']],
              active: [['color']],
              disabled: [['color']],
              focus: [['color']],
            },
          },
        },
      },
      theme: {
        Container: {
          name: '按钮整体样式',
          desc: '为按钮配置整体样式',
          normal: [
            ['background'],
            ['border'],
            ['height'],
            ['width'],
            ['padding'],
            ['margin'],
            ['borderRadius'],
          ],
          hover: [['background'], ['border']],
          active: [['background'], ['border']],
          disabled: [['background'], ['border']],
          focus: [['background'], ['border']],
        },
        ButtonText: {
          name: '按钮文字样式',
          desc: '为按钮文字配置样式',
          normal: [['color'], ['font']],
          hover: [['color']],
          active: [['color']],
          disabled: [['color']],
          focus: [['color']],
        },
        ButtonIcon: {
          name: '按钮图标样式',
          desc: '为按钮图标配置样式',
          normal: [['color'], ['font']],
          hover: [['color']],
          active: [['color']],
          disabled: [['color']],
          focus: [['color']],
        },
      },
      childrenWidget: [],
    },
    target: Button,
    screenshot:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGgAAAAsCAYAAACJ1f3bAAAAAXNSR0IArs4c6QAABXpJREFUeAHtXGtsVEUU/nYptiQ8pCJqUQgWEQXBCkYiKKtCBGPVICH4iChW1CjGGKwmJvpDjAlqhESNBqiSAFUxaIgvEEKrtUSBagWkPhDFQimUFlroI7TW83V6vdvu7KbUvfcO6Zxk7507Z3bmzPnmnDNn7rYhCM3Mab2wGVgsxUhrKy5gnaVgNBAKoUJGLkgBctctD5WHCM4poBStSA9GJDuqVgMhVPcGxoXbLMeCo9VRoJWCCbEJixCRQAWxgyfSQCRsY04i/QTLIza0IEsGa8ACZDA4FM0CZAEyXAOGi2ctyAJkuAYMF89akAXIcA0YLp6cyXlHQ84HBp+j7/9YLVBxGGhs0vNtrdKApwBNnwLcPi2+qk/JYdOXhcB7awGWu0tjRwEpMpOSXbE9JOLFtjavxlOAnOk+/jxQd9J5AlLPAi4bAUzMArJvAnpJJHx7tcs/nVK/vsCihUD++liAEvFOZ4wg2/qySagRd1Zz3P0cOgJs2SpHte8A1ceAG68F5D2IJY0GfLEgzbhtVS0tQPEOYMYNQJpYVYPEowH9gCvEZZX9DlTVdPxmWiowYSyw728BVnjjpdwnTbUZmgFMvlqVf9gNZI3W87aWABzXodEjgZHDgUEDgf3yqmxXGXCg0uGqe7RM9Y3AVWOAUZkA42jJTuAPkccrChQgTmrYEGCPgEFwnOfch5V1FW1Tdc717P7ymlF470rM+r5UlR3epAkAP6SnFsXnzVkA1DfIghCwH7sPmHKNsuzKKmDadeJuewErPwLWb1J98UoZOe6KD4CbrwfSBcyT4rLPlQ3QPXcAy/KBz7e47ZNZ8gWgVHk12CQW4lAfUc6YS1UMungo8Ooyh9P1+4FDwG05AOPM6iUqBjEOOZSIxzaP3iuAjgeW5gGbi9W3UgScR6Q+Zw5wvA4o/M7pTd3vnwWskTE+FfC4oDiHJ+cBc+8EuJhqT3Rsn4wnXwDKe0UvapNM8ln5JcTev/R8r2q5KCITgU82uuBwrGZxfW+sBEYMU0r/druqc+Sgla39zHkSd/iLAmbmdOAScZM7drq8ZJV8AWiJrFK6FYe4UjNFCdwCv/S0rMjNwKqPHa73d47LTclXRfqxNkn9/LuBjPMkLh1022z42i07pW0/yY9uBKB4+Z7Trrt3XwDiJOo6mX+RrE7SjIhyN3RZ3Nn5QUygSdxN6uigJNAktosG6Ei1qo++cqNA6u2RJn3ZZqsp6K9crdxVXXm5nu9FbWOj6pWxUUfcQJBMOOUIHKAwJRB30/JPm07+c4UZg9Vz9JWuKRlULtZKYizSUWZ7fXmFjutvXeAAZU9VJwm/7VMTZyAmMdeIJsYM+vrO1NysahjXOlM8XrHkQifqgdm3yitl6Tea+vcFeERVugfQubTotn6UPfKcHUVnrtHQ7lbI4dEOVy+Pe4ZfBOz+1Q3YPBLaLjErSwB64gH5iaXEJW5fZ92idznsl4krcyDGjqOSwP74sxo/Ho/xkOd/zIOek7xo3RdA5VG1e5s3W+QTrSx/v+McgnryBaD5d8VOr1byjMOilLwPgQ2Fsp1ttwS2fGsVsPAhYOok9WGMYp7xmuRLb74Y2xcTV1rXgrmS1e93AWLLeLyN36gElSC9/IzbZ9le4IXX1Um7WxtcKZT9oPz6ylAalK6OYP4s11tPssTmMQ/H4o4tOh1IVv//px9fLKi7AlbJtpYfr4lnfp3P/bwes6v9B75J6KqgPbWdBchw5C1AFiDDNWC4eNaCLECGa8Bw8awFWYAM14Dh4lkLsgAZrgHDxQu3/12+4WL2TPGIDV1cQc+c/hkx64KwnJbmyhtNH44kzwiFmCOkYEJswvx3I/JqfpyYU751d8HjQwyIBTEhNv8Cj+2Jti0hYhwAAAAASUVORK5CYII=',
  },
  {
    meta: {
      widgetName: 'Button',
      title: '朴素按钮',
      desc: '朴素按钮',
      props: {
        disabled: {
          type: 'boolean',
          desc: '按钮是否禁用，true 禁用 false 可用',
          defaultValue: false,
        },
        shape: {
          type: 'ButtonShape',
          desc: '设置按钮形状，可以设置为 circle 或者不设',
          defaultValue: 'default',
        },
        type: {
          type: 'ButtonType',
          desc: '支持多种不同的按钮风格，可选值为 primary、success、warning、danger 或者不设',
          defaultValue: 'primary',
        },
        plain: { type: 'boolean', desc: '是否为朴素按钮', defaultValue: true },
        size: {
          type: 'ButtonSize',
          desc: '设置按钮大小，可选值为 small、large、bigger 或者不设',
          defaultValue: 'default',
        },
        loading: { type: 'boolean', desc: '设置按钮加载状态' },
        circle: { type: 'boolean', desc: '设置圆形按钮' },
        icon: { type: 'string', desc: '设置按钮图标类型' },
        text: { type: 'string | React.node', desc: '设置按钮的文本内容', defaultValue: 'Button' },
        block: { type: 'boolean', desc: '按钮宽度为父元素宽度', defaultValue: false },
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
      theme: {
        Container: {
          name: '按钮整体样式',
          desc: '为按钮配置整体样式',
          normal: [
            ['background'],
            ['border'],
            ['height'],
            ['width'],
            ['padding'],
            ['margin'],
            ['borderRadius'],
          ],
          hover: [['background'], ['border']],
          active: [['background'], ['border']],
          disabled: [['background'], ['border']],
          focus: [['background'], ['border']],
        },
        ButtonText: {
          name: '按钮文字样式',
          desc: '为按钮文字配置样式',
          normal: [['color'], ['font']],
          hover: [['color']],
          active: [['color']],
          disabled: [['color']],
          focus: [['color']],
        },
        ButtonIcon: {
          name: '按钮图标样式',
          desc: '为按钮图标配置样式',
          normal: [['color'], ['font']],
          hover: [['color']],
          active: [['color']],
          disabled: [['color']],
          focus: [['color']],
        },
      },
      childrenWidget: [],
      aliasName: 'PlainButton',
    },
    target: Button,
    screenshot:
      'data:image/png;base64,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',
  },
  {
    meta: {
      widgetName: 'Button',
      title: '图标按钮',
      desc: '图标按钮',
      props: {
        disabled: {
          type: 'boolean',
          desc: '按钮是否禁用，true 禁用 false 可用',
          defaultValue: false,
        },
        shape: {
          type: 'ButtonShape',
          desc: '设置按钮形状，可以设置为 circle 或者不设',
          defaultValue: 'default',
        },
        type: {
          type: 'ButtonType',
          desc: '支持多种不同的按钮风格，可选值为 primary、success、warning、danger 或者不设',
          defaultValue: 'primary',
        },
        plain: { type: 'boolean', desc: '是否为朴素按钮', defaultValue: true },
        size: {
          type: 'ButtonSize',
          desc: '设置按钮大小，可选值为 small、large、bigger 或者不设',
          defaultValue: 'default',
        },
        loading: { type: 'boolean', desc: '设置按钮加载状态' },
        circle: { type: 'boolean', desc: '设置圆形按钮' },
        icon: { type: 'string', desc: '设置按钮图标类型', defaultValue: 'lugia-icon-logo_lugia' },
        text: { type: 'string | React.node', desc: '设置按钮的文本内容', defaultValue: 'Button' },
        block: { type: 'boolean', desc: '按钮宽度为父元素宽度', defaultValue: false },
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
      theme: {
        Container: {
          name: '按钮整体样式',
          desc: '为按钮配置整体样式',
          normal: [
            ['background'],
            ['border'],
            ['height'],
            ['width'],
            ['padding'],
            ['margin'],
            ['borderRadius'],
          ],
          hover: [['background'], ['border']],
          active: [['background'], ['border']],
          disabled: [['background'], ['border']],
          focus: [['background'], ['border']],
        },
        ButtonText: {
          name: '按钮文字样式',
          desc: '为按钮文字配置样式',
          normal: [['color'], ['font']],
          hover: [['color']],
          active: [['color']],
          disabled: [['color']],
          focus: [['color']],
        },
        ButtonIcon: {
          name: '按钮图标样式',
          desc: '为按钮图标配置样式',
          normal: [['color'], ['font']],
          hover: [['color']],
          active: [['color']],
          disabled: [['color']],
          focus: [['color']],
        },
      },
      childrenWidget: [],
      aliasName: 'IconButton',
    },
    target: Button,
    screenshot:
      'data:image/png;base64,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',
  },
  {
    meta: {
      widgetName: 'Button',
      title: '圆形图标按钮',
      desc: '圆形图标按钮',
      props: {
        disabled: {
          type: 'boolean',
          desc: '按钮是否禁用，true 禁用 false 可用',
          defaultValue: false,
        },
        shape: {
          type: 'ButtonShape',
          desc: '设置按钮形状，可以设置为 circle 或者不设',
          defaultValue: 'default',
        },
        type: {
          type: 'ButtonType',
          desc: '支持多种不同的按钮风格，可选值为 primary、success、warning、danger 或者不设',
          defaultValue: 'primary',
        },
        plain: { type: 'boolean', desc: '是否为朴素按钮', defaultValue: true },
        size: {
          type: 'ButtonSize',
          desc: '设置按钮大小，可选值为 small、large、bigger 或者不设',
          defaultValue: 'default',
        },
        loading: { type: 'boolean', desc: '设置按钮加载状态' },
        circle: { type: 'boolean', desc: '设置圆形按钮', defaultValue: true },
        icon: { type: 'string', desc: '设置按钮图标类型', defaultValue: 'lugia-icon-logo_lugia' },
        text: { type: 'string | React.node', desc: '设置按钮的文本内容', defaultValue: '' },
        block: { type: 'boolean', desc: '按钮宽度为父元素宽度', defaultValue: false },
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
      theme: {
        Container: {
          name: '按钮整体样式',
          desc: '为按钮配置整体样式',
          normal: [
            ['background'],
            ['border'],
            ['height'],
            ['width'],
            ['padding'],
            ['margin'],
            ['borderRadius'],
          ],
          hover: [['background'], ['border']],
          active: [['background'], ['border']],
          disabled: [['background'], ['border']],
          focus: [['background'], ['border']],
        },
        ButtonText: {
          name: '按钮文字样式',
          desc: '为按钮文字配置样式',
          normal: [['color'], ['font']],
          hover: [['color']],
          active: [['color']],
          disabled: [['color']],
          focus: [['color']],
        },
        ButtonIcon: {
          name: '按钮图标样式',
          desc: '为按钮图标配置样式',
          normal: [['color'], ['font']],
          hover: [['color']],
          active: [['color']],
          disabled: [['color']],
          focus: [['color']],
        },
      },
      childrenWidget: [],
      aliasName: 'CircleButton',
    },
    target: Button,
    screenshot:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAYAAAAehFoBAAAAAXNSR0IArs4c6QAABPNJREFUWAnVWV1sFFUU/u7SIhQlIqJYNJJqTIjyoJBo1RqMRTTQRa00Rt9UCNX491D65JP4AjURSbo+KIkxIYYGAotEDH0qKv5gYqyYIBF/UpafBxoLEqOB8ftmdteZ3dnde3fZdj3JZO7cOfec75577jl3zhjUQJ7nmeQLuNsAKz2gDR5ajUErRbay7cHgpOchw3uGPMfJsy89iK+MMWxWR5TjTqt7vU5qXMMrSVjznSQYnKLSNK+hPSkz7DSWzE6Au3q9ezhgE63W4aoojp+rcZCT3rA3Zb6Mex/XZwW4u9dr+wfYTKBPxAmptY/AdzUDfTtT5nglWRUBa/kvATu49HMqCavpvcF4Auip5CbkKU10gZdo1f11BysINIh0SWdpRGV8OLnee5v+9Uq5wfV6x2Xfkn7XvBonP9Yl/Fl6eCduwKT1GbzMzbi1UF8RYD9kcWlo3WmFzJP5TGAXuRkfKfTpCGBFg7+Bw5Piszaz50acDiwNR4/IplPoahiwmhA3oo8pNLm8hZUUyHAo9K5xmgbtueQStvDmxkFYhCSPzbewnxw8HChis+jgxkDHEuDeu4CFC4CZVwDjE8APx4ADnwO/ZSyEWLAkDJZrAzaJlwG7x2JMEcuC64H+tQHQsVPAEYK88Bcw7xqgsx1YtQz4ZAR4b4hbnumyFmLUWsPxw03ZI2IX/deJbuQZbVOfP1kMvA+MHI4Ol6Wfe5LnzmXAdXOBjamAN8pl/0R4SWJdb6rZbNPo+VtfB66axVT4JnD2j9KKV9wPvPgM8OEenif3l+azesPNR9fASivmENNDXG5ZeHB7ebAa8ulnwDejQPcKYNbMkJAqmsKaoKnbXMd2LAWO/Qoc+s5u5Ae7gZYZwJI77PhLcQlrgr6rTxonarsJGP3JfsjvjBQT54FbOK4mItYEw5Iz4BYu7bkLbqrPk38GN2ItJKxKHM6AJ84Bc6+2V61YPWc2cOK0/ZgSnASsr1tH+vFn+uPtgHasDS2+jQmFPlxzEiHWBD9DT9ooDfMMfwHcMA94fHm4N77dxEPq8wz5Ajt6NJ7HupdYE8xyFOVG3x4BdD29CpD1SlGCDreWOVQpe9tO4JLzWkYlC6ss7AxYYga2AWP0yY38kFFGu7IlKvzWm4G3+oFHHwj6FzkHz6g8/4lYm+iGqsg405/c9f0DwXJ3PchzA68xOpfOEkrF2pSZM8Abg8EqPJVNT9s/dlaVHyCsVaXmvIRsY/61QPudXHrGm+ZmAudB6Jcx4Ovv/zv0PNsNPNYJfLQPqBo0U7PJHn4yjBVMtvWlmkCzxMW6nBKH8WjqdH2hBtK18Xazmib3ePg+N43CKKz+eZgPQ/TjdW4iquMW6DNngw3rIkEYxc97QMleb4RhoyP33Eh3ZsqD6ZTx441Ss0+08IZcu9HuYWx5wPoq5Ux2NRpYYcp9MQtbHrAeGJH66CTjajcEEYuPKQQmAlgVFnb00LEvhnimpCkMwhKu+ghIBLA69CnNOPea2lNJwlBYVxOeIsDqVNWQM9yi9lSQdAtDnO5YwGL067MseU6me/i6qLNUbVi4yFOe/le/DDQV+dF0ljzrGfIkWzrifLbQnBUtHB7gF12CkizLI5eBDFi1QF84zlaS6gQ4Jyxbpe/hTlaJy+2Upx+LHvbSqjtsLJrTmbtXBTg3uOyv24Ap43+CXcZft/8CttKNGdzDdCsAAAAASUVORK5CYII=',
  },
  {
    meta: {
      widgetName: 'Card',
      title: '卡片',
      desc: '卡片容器，可添加文字、列表、图片等',
      props: {
        getThemeByDisplayName: { type: 'Function', desc: '用于配置组件内部图片的通用主题属性' },
        viewClass: { type: 'string', desc: '用于配置通用主题属性' },
        title: { type: 'React.Node', desc: '卡片标题显示内容' },
        description: { type: 'React.Node', desc: '卡片描述显示内容' },
        operation: { type: 'React.Node', desc: '卡片可操作内容' },
        image: { type: 'React.Node', desc: '卡片片显示内容' },
        avatar: { type: 'React.Node', desc: '卡片头像显示内容' },
        content: { type: 'React.Node', desc: '整个卡片显示内容' },
        children: {
          type: 'React.Node',
          desc: '卡片的children 可作为content显示,但优先于content显示',
        },
        type: {
          type: 'CardType',
          desc: '卡片风格 可配置 简洁,头像,图片,标题提示,自定义组合卡片几种风格',
        },
        imageOrientation: {
          type: 'ImageOrientation',
          desc: '当选择头像或图片卡片风格时,可配置图像的方向.水平,或垂直',
        },
      },
      type: {
        CardType: ['simple', 'avatar', 'image', 'combo', 'tip'],
        ImageOrientation: ['horizontal', 'vertical'],
      },
      category: ['数据展示'],
      designInfo: {
        HAvatarCard: {
          sequence: 1,
          title: '水平头像卡片',
          desc: '水平头像卡片样式',
          props: { type: 'avatar', imageOrientation: 'horizontal' },
          theme: {
            Container: {
              name: '卡片容器整体',
              desc: '配置卡片容器整体',
              normal: [
                ['width'],
                ['height'],
                ['background'],
                ['boxShadow'],
                ['border'],
                ['margin'],
                ['padding'],
                ['boxShadow'],
                ['opacity'],
              ],
              hover: [['background'], ['border'], ['boxShadow'], ['opacity']],
            },
            CardTitle: {
              name: '卡片标题',
              desc: '配置卡片标题',
              normal: [
                ['width'],
                ['height'],
                ['color'],
                ['font'],
                ['background'],
                ['margin'],
                ['padding'],
              ],
            },
            CardDescription: {
              name: '卡片内容描述',
              desc: '配置卡片内容描述',
              normal: [
                ['width'],
                ['height'],
                ['color'],
                ['font'],
                ['background'],
                ['margin'],
                ['padding'],
              ],
            },
            CardOperation: {
              name: '卡片操作按钮',
              desc: '配置卡片操作按钮',
              normal: [
                ['width'],
                ['height'],
                ['color'],
                ['font'],
                ['background'],
                ['margin'],
                ['padding'],
              ],
            },
            CardAvatar: {
              name: '卡片头像',
              theme: {
                SrcAvatar: {
                  name: '卡片头像资源',
                  desc: '配置卡片头像资源',
                  normal: [['width'], ['height'], ['margin'], ['padding'], ['background']],
                  hover: [['width'], ['height'], ['background']],
                },
              },
            },
          },
        },
        HImageCard: {
          sequence: 2,
          title: '水平图片卡片',
          desc: '水平图片卡片样式',
          props: { type: 'image', imageOrientation: 'horizontal' },
          theme: {
            Container: {
              name: '卡片容器整体',
              desc: '配置卡片容器整体',
              normal: [
                ['width'],
                ['height'],
                ['background'],
                ['boxShadow'],
                ['border'],
                ['margin'],
                ['padding'],
                ['boxShadow'],
                ['opacity'],
              ],
              hover: [['background'], ['border'], ['boxShadow'], ['opacity']],
            },
            CardTitle: {
              name: '卡片标题',
              desc: '配置卡片标题',
              normal: [
                ['width'],
                ['height'],
                ['color'],
                ['font'],
                ['background'],
                ['margin'],
                ['padding'],
              ],
            },
            CardDescription: {
              name: '卡片内容描述',
              desc: '配置卡片内容描述',
              normal: [
                ['width'],
                ['height'],
                ['color'],
                ['font'],
                ['background'],
                ['margin'],
                ['padding'],
              ],
            },
            CardOperation: {
              name: '卡片操作按钮',
              desc: '配置卡片操作按钮',
              normal: [
                ['width'],
                ['height'],
                ['color'],
                ['font'],
                ['background'],
                ['margin'],
                ['padding'],
              ],
            },
            CardImage: {
              name: '卡片图片',
              desc: '配置卡片图片',
              normal: [
                ['width'],
                ['height'],
                ['background'],
                ['borderRadius'],
                ['border'],
                ['margin'],
                ['padding'],
                ['boxShadow'],
                ['opacity'],
              ],
              hover: [['width'], ['height'], ['background']],
            },
          },
        },
        VAvatarCard: {
          sequence: 3,
          title: '垂直头像卡片',
          desc: '垂直头像卡片不同选择显示不同卡片样式',
          props: { type: 'avatar', imageOrientation: 'vertical' },
          theme: {
            Container: {
              name: '卡片容器整体',
              desc: '配置卡片容器整体',
              normal: [
                ['width'],
                ['height'],
                ['background'],
                ['boxShadow'],
                ['border'],
                ['margin'],
                ['padding'],
                ['boxShadow'],
                ['opacity'],
              ],
              hover: [['background'], ['border'], ['boxShadow'], ['opacity']],
            },
            CardTitle: {
              name: '卡片标题',
              desc: '配置卡片标题',
              normal: [
                ['width'],
                ['height'],
                ['color'],
                ['font'],
                ['background'],
                ['margin'],
                ['padding'],
              ],
            },
            CardDescription: {
              name: '卡片内容描述',
              desc: '配置卡片内容描述',
              normal: [
                ['width'],
                ['height'],
                ['color'],
                ['font'],
                ['background'],
                ['margin'],
                ['padding'],
              ],
            },
            CardOperation: {
              name: '卡片操作按钮',
              desc: '配置卡片操作按钮',
              normal: [
                ['width'],
                ['height'],
                ['color'],
                ['font'],
                ['background'],
                ['margin'],
                ['padding'],
              ],
            },
            CardAvatar: {
              name: '卡片头像',
              theme: {
                SrcAvatar: {
                  name: '卡片头像资源',
                  desc: '配置卡片头像资源',
                  normal: [['width'], ['height'], ['margin'], ['padding'], ['background']],
                  hover: [['width'], ['height'], ['background']],
                },
              },
            },
          },
        },
        VImageCard: {
          sequence: 4,
          title: '垂直图片卡片',
          desc: '垂直图片卡片样式',
          props: { type: 'image' },
          theme: {
            Container: {
              name: '卡片容器整体',
              desc: '配置卡片容器整体',
              normal: [
                ['width'],
                ['height'],
                ['background'],
                ['boxShadow'],
                ['border'],
                ['margin'],
                ['padding'],
                ['boxShadow'],
                ['opacity'],
              ],
              hover: [['background'], ['border'], ['boxShadow'], ['opacity']],
            },
            CardTitle: {
              name: '卡片标题',
              desc: '配置卡片标题',
              normal: [
                ['width'],
                ['height'],
                ['color'],
                ['font'],
                ['background'],
                ['margin'],
                ['padding'],
              ],
            },
            CardDescription: {
              name: '卡片内容描述',
              desc: '配置卡片内容描述',
              normal: [
                ['width'],
                ['height'],
                ['color'],
                ['font'],
                ['background'],
                ['margin'],
                ['padding'],
              ],
            },
            CardOperation: {
              name: '卡片操作按钮',
              desc: '配置卡片操作按钮',
              normal: [
                ['width'],
                ['height'],
                ['color'],
                ['font'],
                ['background'],
                ['margin'],
                ['padding'],
              ],
            },
            CardImage: {
              name: '卡片图片',
              desc: '配置卡片图片',
              normal: [
                ['width'],
                ['height'],
                ['background'],
                ['borderRadius'],
                ['border'],
                ['margin'],
                ['padding'],
                ['boxShadow'],
                ['opacity'],
              ],
              hover: [['width'], ['height'], ['background']],
            },
          },
        },
        ComboCard: {
          sequence: 5,
          title: '自定义组合卡片',
          desc: '组合卡片样式',
          props: { type: 'combo' },
          theme: {
            Container: {
              name: '卡片容器整体',
              desc: '配置卡片容器整体',
              normal: [
                ['width'],
                ['height'],
                ['background'],
                ['boxShadow'],
                ['border'],
                ['margin'],
                ['padding'],
                ['boxShadow'],
                ['opacity'],
              ],
              hover: [['background'], ['border'], ['boxShadow'], ['opacity']],
            },
            CardTitle: {
              name: '卡片标题',
              desc: '配置卡片标题',
              normal: [
                ['width'],
                ['height'],
                ['color'],
                ['font'],
                ['background'],
                ['margin'],
                ['padding'],
              ],
            },
            CardDescription: {
              name: '卡片描述内容',
              desc: '配置卡片描述内容',
              normal: [
                ['width'],
                ['height'],
                ['color'],
                ['font'],
                ['background'],
                ['margin'],
                ['padding'],
              ],
            },
            CardOperation: {
              name: '卡片操作按钮',
              desc: '配置卡片操作按钮',
              normal: [
                ['width'],
                ['height'],
                ['color'],
                ['font'],
                ['background'],
                ['margin'],
                ['padding'],
              ],
            },
            CardContent: {
              name: '卡片内容按钮',
              desc: '配置卡片内容',
              normal: [
                ['width'],
                ['height'],
                ['background'],
                ['boxShadow'],
                ['border'],
                ['margin'],
                ['padding'],
                ['boxShadow'],
                ['opacity'],
                ['color'],
              ],
            },
          },
        },
      },
      theme: {
        Container: {
          name: '卡片容器整体',
          desc: '配置卡片容器整体',
          normal: [
            ['width'],
            ['height'],
            ['background'],
            ['boxShadow'],
            ['border'],
            ['borderRadius'],
            ['margin'],
            ['padding'],
            ['boxShadow'],
            ['opacity'],
          ],
          hover: [['background'], ['border'], ['borderRadius'], ['boxShadow'], ['opacity']],
        },
        CardTitle: {
          name: '卡片标题',
          desc: '配置卡片标题',
          normal: [
            ['width'],
            ['height'],
            ['color'],
            ['font'],
            ['background'],
            ['margin'],
            ['padding'],
          ],
        },
        CardDescription: {
          name: '卡片描述内容',
          desc: '配置卡片描述内容',
          normal: [
            ['width'],
            ['height'],
            ['color'],
            ['font'],
            ['background'],
            ['margin'],
            ['padding'],
          ],
        },
        CardOperation: {
          name: '卡片操作按钮',
          desc: '配置卡片操作按钮',
          normal: [
            ['width'],
            ['height'],
            ['color'],
            ['font'],
            ['background'],
            ['margin'],
            ['padding'],
          ],
        },
        CardTitleTipLine: {
          name: '卡片标题提示',
          desc: '卡片标题提示配置',
          normal: [['width'], ['height'], ['background']],
        },
      },
      childrenWidget: [],
    },
    target: Card,
    screenshot:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHYAAABICAYAAAAj1wHMAAAAAXNSR0IArs4c6QAABPlJREFUeAHtnbtuE0EUhuM4gImRkGi4tFGUhjfgGWiQKGhCw3vwIlRpUIScFHT0PERqJC4NFCgXCeIw/8j/6pzx2ETJemaz+kcazjmzZ27/l1lIsqwHa4vLYPElXemQAhe5teTg5drQd1F7bly1rU6BLMgwnWu3sKzPZdk2+rTMkS2jAMHRYlbrcxWxbYNRYgkvZ9mGLtZPhlDYggIWHHxUaG7bMU0aN2AsIPqwuYqB2A5fZbUKEChmoZ9aXuNKLtITm4O6HrLRTmuh2nwOKnt9BXgCrSXMaRgePiwLYrBg/hrAEg6TCI4gYW3ldVrbj77s1RVo4IQh4NsKmNCdUHHN+iGMZWBPLEFZOwxpgEpLwDYHvkr7CligBAiIqOehQnfa4DYFubEQEgHeCq13Qr0b6r1Q7+/t7T09Pj6enJ+ff79QqaIAtAcDsACTGRswAisw4+Ejz0geAcDiBN8OdRTqONQIdTqd/qyyG006pwBYGLhgBFZgBnZgGMGSLi1vtaCPuhG+St5tbm6+CL5KRxQ4OTk5GI/Hb8Jy/oaK2zEqb9PxFg6QaXGQR6PRszRBcV0FZkx4CMnLLcqCtQn010N56HooqK7AjAnYkRPWZP14T04XygTa9LribihAPrRuVfbE8gITadku2y0FyIfWrS4FiySWbAdelK2uQMrHssveirFiJtFW34UWMKcA2dC6hPTEuosKbq4C9keK6S6yXwlpUhq///AxbcrGr14+j+2rzs9O3p/GhYx0YvsD2e1EYJ0c/QkEtj8s3U4E1snRn0Bg+8PS7URgnRz9CQS2PyzdTgTWydGfQGD7w9LtRGCdHP0JBLY/LN1OBNbJ0Z9AYPvD0u1EYJ0c/QkEtj8s3U7w+zxWQObzxHiyPNbwxPJX10NBJxQYDAZPwkL+mGqfL77Qie0EpvYXIbDta9qJEQW2ExjaX4TAtq9pJ0YU2E5gaH8Ry55SvNJsR0dHl+q3s7MT8256/qU2WyFJJ7aC6CWmFNgSKleYQ2AriF5iSoEtoXKFOQS2guglphTYEipXmENgK4heYkqBLaFyhTkEtoLoJaYU2BIqV5hDYCuIXmJKgS2hcoU5BLaC6CWmXAa2eT1qiYVojispsJDRMrBXmkmduqEAn1CEBWQ+pYjf0/IpxW/dWKpWYRUITyk+DjGfUkzfgjr3lKI92vH1qHYw+Z1SIOVj2WXfzMYOtJ3ajRbTKEA+tM0FOLm/Y5lI6zoo6IwC5EPrFmbB2gT64U3l0x+uh4LqCsyY4I3i5IQ1WX/piY2vIj87O/tcfSdagFNgxsS9Kt4lhIAnlrRp2Wk6mUzehv+/8yvtqLiOAmABJmH2hlHwyY02fnuDb3VQrKW/dnh4+Htra+tge3v70XA4fBD+mY2PbFEprABuv6enp5/29/df7+7ufgnT8wMeCBO2KQBIiPRp+X2ttfBRmUPbDCinNQUsMPj2hBIqbZobP6uFK3HEQyNidGSn/0EFZJXrK2A5UHtaCxc+262NK8BPmNBooSBGQUe2syPb2J7a2FF/XFsBMrDWMoCfgrWTzn0aJToAFgdEMmHyGtqQQ6iIVVanAHQnD/qpxezMiSuxcHI+26yljwGsHwfUH60qYGERJiZge2qbaxaM9bk620afljmyZRRYCDGZPublIOXa0HdRezKuwhUrQMDpNK59Gaxl19JBFddTwAHlMv4BuKNH7aSdPRQAAAAASUVORK5CYII=',
  },
  {
    meta: {
      widgetName: 'Card',
      title: '水平头像卡片',
      desc: '水平头像卡片样式',
      props: {
        getThemeByDisplayName: { type: 'Function', desc: '用于配置组件内部图片的通用主题属性' },
        viewClass: { type: 'string', desc: '用于配置通用主题属性' },
        title: { type: 'React.Node', desc: '卡片标题显示内容' },
        description: { type: 'React.Node', desc: '卡片描述显示内容' },
        operation: { type: 'React.Node', desc: '卡片可操作内容' },
        image: { type: 'React.Node', desc: '卡片片显示内容' },
        avatar: { type: 'React.Node', desc: '卡片头像显示内容' },
        content: { type: 'React.Node', desc: '整个卡片显示内容' },
        children: {
          type: 'React.Node',
          desc: '卡片的children 可作为content显示,但优先于content显示',
        },
        type: {
          type: 'CardType',
          desc: '卡片风格 可配置 简洁,头像,图片,标题提示,自定义组合卡片几种风格',
          defaultValue: 'avatar',
        },
        imageOrientation: {
          type: 'ImageOrientation',
          desc: '当选择头像或图片卡片风格时,可配置图像的方向.水平,或垂直',
          defaultValue: 'horizontal',
        },
      },
      type: {
        CardType: ['simple', 'avatar', 'image', 'combo', 'tip'],
        ImageOrientation: ['horizontal', 'vertical'],
      },
      category: ['数据展示'],
      theme: {
        Container: {
          name: '卡片容器整体',
          desc: '配置卡片容器整体',
          normal: [
            ['width'],
            ['height'],
            ['background'],
            ['boxShadow'],
            ['border'],
            ['margin'],
            ['padding'],
            ['boxShadow'],
            ['opacity'],
          ],
          hover: [['background'], ['border'], ['boxShadow'], ['opacity']],
        },
        CardTitle: {
          name: '卡片标题',
          desc: '配置卡片标题',
          normal: [
            ['width'],
            ['height'],
            ['color'],
            ['font'],
            ['background'],
            ['margin'],
            ['padding'],
          ],
        },
        CardDescription: {
          name: '卡片内容描述',
          desc: '配置卡片内容描述',
          normal: [
            ['width'],
            ['height'],
            ['color'],
            ['font'],
            ['background'],
            ['margin'],
            ['padding'],
          ],
        },
        CardOperation: {
          name: '卡片操作按钮',
          desc: '配置卡片操作按钮',
          normal: [
            ['width'],
            ['height'],
            ['color'],
            ['font'],
            ['background'],
            ['margin'],
            ['padding'],
          ],
        },
        CardAvatar: {
          name: '卡片头像',
          theme: {
            SrcAvatar: {
              name: '卡片头像资源',
              desc: '配置卡片头像资源',
              normal: [['width'], ['height'], ['margin'], ['padding'], ['background']],
              hover: [['width'], ['height'], ['background']],
            },
          },
        },
      },
      childrenWidget: [],
      aliasName: 'HAvatarCard',
    },
    target: Card,
    screenshot:
      'data:image/png;base64,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',
  },
  {
    meta: {
      widgetName: 'Card',
      title: '水平图片卡片',
      desc: '水平图片卡片样式',
      props: {
        getThemeByDisplayName: { type: 'Function', desc: '用于配置组件内部图片的通用主题属性' },
        viewClass: { type: 'string', desc: '用于配置通用主题属性' },
        title: { type: 'React.Node', desc: '卡片标题显示内容' },
        description: { type: 'React.Node', desc: '卡片描述显示内容' },
        operation: { type: 'React.Node', desc: '卡片可操作内容' },
        image: { type: 'React.Node', desc: '卡片片显示内容' },
        avatar: { type: 'React.Node', desc: '卡片头像显示内容' },
        content: { type: 'React.Node', desc: '整个卡片显示内容' },
        children: {
          type: 'React.Node',
          desc: '卡片的children 可作为content显示,但优先于content显示',
        },
        type: {
          type: 'CardType',
          desc: '卡片风格 可配置 简洁,头像,图片,标题提示,自定义组合卡片几种风格',
          defaultValue: 'image',
        },
        imageOrientation: {
          type: 'ImageOrientation',
          desc: '当选择头像或图片卡片风格时,可配置图像的方向.水平,或垂直',
          defaultValue: 'horizontal',
        },
      },
      type: {
        CardType: ['simple', 'avatar', 'image', 'combo', 'tip'],
        ImageOrientation: ['horizontal', 'vertical'],
      },
      category: ['数据展示'],
      theme: {
        Container: {
          name: '卡片容器整体',
          desc: '配置卡片容器整体',
          normal: [
            ['width'],
            ['height'],
            ['background'],
            ['boxShadow'],
            ['border'],
            ['margin'],
            ['padding'],
            ['boxShadow'],
            ['opacity'],
          ],
          hover: [['background'], ['border'], ['boxShadow'], ['opacity']],
        },
        CardTitle: {
          name: '卡片标题',
          desc: '配置卡片标题',
          normal: [
            ['width'],
            ['height'],
            ['color'],
            ['font'],
            ['background'],
            ['margin'],
            ['padding'],
          ],
        },
        CardDescription: {
          name: '卡片内容描述',
          desc: '配置卡片内容描述',
          normal: [
            ['width'],
            ['height'],
            ['color'],
            ['font'],
            ['background'],
            ['margin'],
            ['padding'],
          ],
        },
        CardOperation: {
          name: '卡片操作按钮',
          desc: '配置卡片操作按钮',
          normal: [
            ['width'],
            ['height'],
            ['color'],
            ['font'],
            ['background'],
            ['margin'],
            ['padding'],
          ],
        },
        CardImage: {
          name: '卡片图片',
          desc: '配置卡片图片',
          normal: [
            ['width'],
            ['height'],
            ['background'],
            ['borderRadius'],
            ['border'],
            ['margin'],
            ['padding'],
            ['boxShadow'],
            ['opacity'],
          ],
          hover: [['width'], ['height'], ['background']],
        },
      },
      childrenWidget: [],
      aliasName: 'HImageCard',
    },
    target: Card,
    screenshot:
      'data:image/png;base64,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',
  },
  {
    meta: {
      widgetName: 'Card',
      title: '垂直头像卡片',
      desc: '垂直头像卡片不同选择显示不同卡片样式',
      props: {
        getThemeByDisplayName: { type: 'Function', desc: '用于配置组件内部图片的通用主题属性' },
        viewClass: { type: 'string', desc: '用于配置通用主题属性' },
        title: { type: 'React.Node', desc: '卡片标题显示内容' },
        description: { type: 'React.Node', desc: '卡片描述显示内容' },
        operation: { type: 'React.Node', desc: '卡片可操作内容' },
        image: { type: 'React.Node', desc: '卡片片显示内容' },
        avatar: { type: 'React.Node', desc: '卡片头像显示内容' },
        content: { type: 'React.Node', desc: '整个卡片显示内容' },
        children: {
          type: 'React.Node',
          desc: '卡片的children 可作为content显示,但优先于content显示',
        },
        type: {
          type: 'CardType',
          desc: '卡片风格 可配置 简洁,头像,图片,标题提示,自定义组合卡片几种风格',
          defaultValue: 'avatar',
        },
        imageOrientation: {
          type: 'ImageOrientation',
          desc: '当选择头像或图片卡片风格时,可配置图像的方向.水平,或垂直',
          defaultValue: 'vertical',
        },
      },
      type: {
        CardType: ['simple', 'avatar', 'image', 'combo', 'tip'],
        ImageOrientation: ['horizontal', 'vertical'],
      },
      category: ['数据展示'],
      theme: {
        Container: {
          name: '卡片容器整体',
          desc: '配置卡片容器整体',
          normal: [
            ['width'],
            ['height'],
            ['background'],
            ['boxShadow'],
            ['border'],
            ['margin'],
            ['padding'],
            ['boxShadow'],
            ['opacity'],
          ],
          hover: [['background'], ['border'], ['boxShadow'], ['opacity']],
        },
        CardTitle: {
          name: '卡片标题',
          desc: '配置卡片标题',
          normal: [
            ['width'],
            ['height'],
            ['color'],
            ['font'],
            ['background'],
            ['margin'],
            ['padding'],
          ],
        },
        CardDescription: {
          name: '卡片内容描述',
          desc: '配置卡片内容描述',
          normal: [
            ['width'],
            ['height'],
            ['color'],
            ['font'],
            ['background'],
            ['margin'],
            ['padding'],
          ],
        },
        CardOperation: {
          name: '卡片操作按钮',
          desc: '配置卡片操作按钮',
          normal: [
            ['width'],
            ['height'],
            ['color'],
            ['font'],
            ['background'],
            ['margin'],
            ['padding'],
          ],
        },
        CardAvatar: {
          name: '卡片头像',
          theme: {
            SrcAvatar: {
              name: '卡片头像资源',
              desc: '配置卡片头像资源',
              normal: [['width'], ['height'], ['margin'], ['padding'], ['background']],
              hover: [['width'], ['height'], ['background']],
            },
          },
        },
      },
      childrenWidget: [],
      aliasName: 'VAvatarCard',
    },
    target: Card,
    screenshot:
      'data:image/png;base64,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',
  },
  {
    meta: {
      widgetName: 'Card',
      title: '垂直图片卡片',
      desc: '垂直图片卡片样式',
      props: {
        getThemeByDisplayName: { type: 'Function', desc: '用于配置组件内部图片的通用主题属性' },
        viewClass: { type: 'string', desc: '用于配置通用主题属性' },
        title: { type: 'React.Node', desc: '卡片标题显示内容' },
        description: { type: 'React.Node', desc: '卡片描述显示内容' },
        operation: { type: 'React.Node', desc: '卡片可操作内容' },
        image: { type: 'React.Node', desc: '卡片片显示内容' },
        avatar: { type: 'React.Node', desc: '卡片头像显示内容' },
        content: { type: 'React.Node', desc: '整个卡片显示内容' },
        children: {
          type: 'React.Node',
          desc: '卡片的children 可作为content显示,但优先于content显示',
        },
        type: {
          type: 'CardType',
          desc: '卡片风格 可配置 简洁,头像,图片,标题提示,自定义组合卡片几种风格',
          defaultValue: 'image',
        },
        imageOrientation: {
          type: 'ImageOrientation',
          desc: '当选择头像或图片卡片风格时,可配置图像的方向.水平,或垂直',
          defaultValue: 'vertical',
        },
      },
      type: {
        CardType: ['simple', 'avatar', 'image', 'combo', 'tip'],
        ImageOrientation: ['horizontal', 'vertical'],
      },
      category: ['数据展示'],
      theme: {
        Container: {
          name: '卡片容器整体',
          desc: '配置卡片容器整体',
          normal: [
            ['width'],
            ['height'],
            ['background'],
            ['boxShadow'],
            ['border'],
            ['margin'],
            ['padding'],
            ['boxShadow'],
            ['opacity'],
          ],
          hover: [['background'], ['border'], ['boxShadow'], ['opacity']],
        },
        CardTitle: {
          name: '卡片标题',
          desc: '配置卡片标题',
          normal: [
            ['width'],
            ['height'],
            ['color'],
            ['font'],
            ['background'],
            ['margin'],
            ['padding'],
          ],
        },
        CardDescription: {
          name: '卡片内容描述',
          desc: '配置卡片内容描述',
          normal: [
            ['width'],
            ['height'],
            ['color'],
            ['font'],
            ['background'],
            ['margin'],
            ['padding'],
          ],
        },
        CardOperation: {
          name: '卡片操作按钮',
          desc: '配置卡片操作按钮',
          normal: [
            ['width'],
            ['height'],
            ['color'],
            ['font'],
            ['background'],
            ['margin'],
            ['padding'],
          ],
        },
        CardImage: {
          name: '卡片图片',
          desc: '配置卡片图片',
          normal: [
            ['width'],
            ['height'],
            ['background'],
            ['borderRadius'],
            ['border'],
            ['margin'],
            ['padding'],
            ['boxShadow'],
            ['opacity'],
          ],
          hover: [['width'], ['height'], ['background']],
        },
      },
      childrenWidget: [],
      aliasName: 'VImageCard',
    },
    target: Card,
    screenshot:
      'data:image/png;base64,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',
  },
  {
    meta: {
      widgetName: 'Card',
      title: '自定义组合卡片',
      desc: '组合卡片样式',
      props: {
        getThemeByDisplayName: { type: 'Function', desc: '用于配置组件内部图片的通用主题属性' },
        viewClass: { type: 'string', desc: '用于配置通用主题属性' },
        title: { type: 'React.Node', desc: '卡片标题显示内容' },
        description: { type: 'React.Node', desc: '卡片描述显示内容' },
        operation: { type: 'React.Node', desc: '卡片可操作内容' },
        image: { type: 'React.Node', desc: '卡片片显示内容' },
        avatar: { type: 'React.Node', desc: '卡片头像显示内容' },
        content: { type: 'React.Node', desc: '整个卡片显示内容' },
        children: {
          type: 'React.Node',
          desc: '卡片的children 可作为content显示,但优先于content显示',
        },
        type: {
          type: 'CardType',
          desc: '卡片风格 可配置 简洁,头像,图片,标题提示,自定义组合卡片几种风格',
          defaultValue: 'combo',
        },
        imageOrientation: {
          type: 'ImageOrientation',
          desc: '当选择头像或图片卡片风格时,可配置图像的方向.水平,或垂直',
          defaultValue: 'vertical',
        },
      },
      type: {
        CardType: ['simple', 'avatar', 'image', 'combo', 'tip'],
        ImageOrientation: ['horizontal', 'vertical'],
      },
      category: ['数据展示'],
      theme: {
        Container: {
          name: '卡片容器整体',
          desc: '配置卡片容器整体',
          normal: [
            ['width'],
            ['height'],
            ['background'],
            ['boxShadow'],
            ['border'],
            ['margin'],
            ['padding'],
            ['boxShadow'],
            ['opacity'],
          ],
          hover: [['background'], ['border'], ['boxShadow'], ['opacity']],
        },
        CardTitle: {
          name: '卡片标题',
          desc: '配置卡片标题',
          normal: [
            ['width'],
            ['height'],
            ['color'],
            ['font'],
            ['background'],
            ['margin'],
            ['padding'],
          ],
        },
        CardDescription: {
          name: '卡片描述内容',
          desc: '配置卡片描述内容',
          normal: [
            ['width'],
            ['height'],
            ['color'],
            ['font'],
            ['background'],
            ['margin'],
            ['padding'],
          ],
        },
        CardOperation: {
          name: '卡片操作按钮',
          desc: '配置卡片操作按钮',
          normal: [
            ['width'],
            ['height'],
            ['color'],
            ['font'],
            ['background'],
            ['margin'],
            ['padding'],
          ],
        },
        CardContent: {
          name: '卡片内容按钮',
          desc: '配置卡片内容',
          normal: [
            ['width'],
            ['height'],
            ['background'],
            ['boxShadow'],
            ['border'],
            ['margin'],
            ['padding'],
            ['boxShadow'],
            ['opacity'],
            ['color'],
          ],
        },
      },
      childrenWidget: [],
      aliasName: 'ComboCard',
    },
    target: Card,
    screenshot:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHAAAABACAYAAADCmvPmAAAAAXNSR0IArs4c6QAAA/JJREFUeAHtnE1yEzEQheMQwMRUseQS3IBbcAbuwUVYZW9uwV1gA6ukssA2eip/Uy1Z4/zZk8j1VKV0q9WS2u9Ds0Ozs/E2G5/yzDMosGmd2YLUimntWLy1r2NPV6AJLG1bxCOU6HN8jOFjybE9rAIAwmr36HNajl0wqiyQWpaYlkS/2sLDBygQAclXl7Yxru3q8QAggsCXbXVtRFy+22EUAJx2w68tc5y4qW9gC955ylYcG+HFfDa1vb8C3KhogbZO28iXpWkszck/E0AgkAQggMnGzjw2rsO3vVuBAUJKlR+7oElf4Gku+mmY2yzeQIBE+yqlCR4WkDFHvtvjFYjgACVY6qvUpS82uUNTbm7AANTrFH2b+rvU36f+4erq6tP19fVytVr92rgdVQFpLK2lubTfMhALMREbLhPcMmENBFA38k3q89QXqWd46/X6z1Gr9uY7CkjzAFEsxERsxEisMkAoYvlEirL6RfrX8P3y8vJL8t0mVuDm5ubHYrH4mo79l7o+o+p8XvOnV8DqVsCcz+ef6wSPp1Fgqz2XCi7F4RFgTMA/T+1jscKDyRTYai9G8NDZ0c/f0rogErD1vMfTKgAHbHF6vIFMkIglbvs8CsABW1RRA1QSrbmASdvJFKg5REbNT6gqIwk7WbU+aEcBGGCLhPoGFpMevHwF9gFsEn/5P+kkKxxlsQ/gSSpxaj/KADsnaoAG2LkCnZfvG2iAnSvQefm+gQbYuQKdl+8baICdK9B5+b6BBti5Ap2X7xtogJ0r0Hn5voEG2LkCnZfvG2iAnSvQefm+gQbYuQKdl+8baICdK9B5+b6BBti5Ap2X7xtogJ0r0Hn5voEnDHB4xqLz33gK5Y+y8A3sHO8YQIhjO/+ZXZcPA2zxY2qAMUl+HBcLPZhMgZpDwaQGqKpYgJ2sUh/UVAAO2CLJAAs5XuQAcNiiyAgwJuCnF5/Wv4sVHkymwFZ7vcwED50d/eYjByTkJ51ub29/TlaxDyoU2GpfPK1VJKQBNxBoWBatl8vlt/QS2996ocfHVUCaS/t0ysAi+fDB5iL0H+jVBVMP3Pm5yZ23A6cLPPS5SeAlbsMbXMQAGq18dXKwWu/2OAW4Tdh443idEEsONr89ybEKxqaxFpJ8FzzBdLu/AlFvNMZGiPKJR5tP0uOhCkbxNVbTQuIsJEa8tnmh/9xbAbSONmotvwYYN995tV4LBIUNlQw05hRTDvA0dnu6AtIX3fFrq1PIySdGCC2fWLT42iD6eUP/eZQCEQrQtBHx2g5zEUD0qSLG8LHk2B5WgVFY1TE5rwWjFdPasXi1r4cHUgCQ9XZFfB+UfXP1ph4fX4ECHMf9B+7uSnwWzloNAAAAAElFTkSuQmCC',
  },
  {
    meta: {
      widgetName: 'Carousel',
      title: '走马灯',
      desc: '常用于展示一组图片或卡片轮播',
      props: {
        defaultStart: {
          type: 'number',
          desc: '幻灯片初始状态开始激活的索引，默认从0开始',
          defaultValue: 0,
        },
        start: { type: 'number', desc: '手动切换,指定幻灯片开始的索引' },
        autoPlay: { type: 'boolean', desc: '是否自动切换', defaultValue: true },
        delay: { type: 'number', desc: '自动切换的时间间隔，单位为毫秒', defaultValue: 3000 },
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
          defaultValue: 500,
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
      theme: {
        CarouselWrap: {
          name: 'Carousel的外框',
          desc: 'Carousel的外框',
          normal: [
            ['width'],
            ['height'],
            ['borderRadius'],
            ['boxShadow'],
            ['border'],
            ['opacity'],
            ['margin'],
            ['border'],
            ['padding'],
          ],
          hover: [['opacity'], ['boxShadow'], ['boxShadow'], ['borderRadius'], ['border']],
          clicked: [],
          disabled: [],
        },
        PreButton: {
          name: '左切换按钮',
          desc: '切换到前一个',
          normal: [['font'], ['opacity'], ['color'], ['boxShadow'], ['border'], ['margin']],
          hover: [['opacity'], ['boxShadow'], ['color'], ['border']],
          clicked: [],
          disabled: [],
        },
        NextButton: {
          name: '右切换按钮',
          desc: '切换到后一个',
          normal: [['font'], ['opacity'], ['color'], ['boxShadow'], ['border'], ['margin']],
          hover: [['opacity'], ['boxShadow'], ['color'], ['border']],
          clicked: [],
          disabled: [],
        },
        Indicator: {
          name: '轮播指示器',
          desc: '显示当前轮播所在位置',
          normal: [
            ['background'],
            ['width'],
            ['height'],
            ['border'],
            ['boxShadow'],
            ['margin'],
            ['opacity'],
          ],
          hover: [['background'], ['opacity'], ['border'], ['boxShadow'], ['borderRadius']],
          clicked: [],
          disabled: [],
        },
      },
      childrenWidget: [],
    },
    target: Carousel,
    screenshot:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHIAAABECAMAAABqIJH/AAAC9FBMVEXw8PDq6urq6uoAAADz9PXp6ukpRRgyTRswShrz9Pbx8/QpRRcpRRTo6ekAAADq6urx8fPq6+3x8vTr7Ovn6Orv7/Ds7e/r7O7q6uzMzMzy9PXw8fHp6unw8PPo6ev////o6Ojp6+rr7e3n6Ont7vDx8vHs7u3n5+bq7O3u7/Hl5ujOtp7k5OXv8fLv8e/t7e0sRiAqQx7v8PHl5uXi4+UtQyDh4uInQBfw8vPu7u7NtZ0wRyTt7es+VDEuRxrg4OD09ffV1NQoQxv3+Pjr6ujj4d3MtJw8UDApPx4nOxwmQBokPRYmQRPd397Hr5YnPhwpQBsiPhHy8vLX1tfjxJ/ev506Ti43UCgmPRgkOhgoRRUgOhEvSCAvSx/2+Pvz8vXn5ODkxqPKsZowRyYzSyPc3NxLXUA8VCnZ2dnT0tDKzMfgwqJXa0pBWDM2SSo3TCk0Syg5VCPo4drbtZBYaE1NYkAsPyH6+/3Pz9DApYtabU5VZ0kwRCYqRRsJCQrn5+jp493k2c+1trTo0LCnr6DauJTFqZDYsYtofVZTaUM5OztGWzhDVzcwSyTt8PTh3Njl3tbX0Mjezr3Su6PKo4BIXTs9WiMzUCMfHyAtTBnAxru5vLjeybTVxbPZwq2wtKzXuZq/jmRgdEoVFRXu6OHb3dXU2c/d1s3j1srg08TWzMThzbjKtqHgwZu8pZGWoY23nIPFnHl0gmpmc1pSY0fv7u3u38nTyL68xLXUv6zdxKrMu6qnqaistaOVl5fVs5GTmYjQqIGxl4CCjHlfcVNSZEJMaSw+WitDXyjx9fjn6+/08e3y7OXn6uTz6uD26dfN08bDw8DEyr21v6zlyaeirpm7oIeAgoKJloGsjXJbXF1OUFFRazohQhcaNgzu4tHw28PDsaLBrpqeppebppGUpYNzdXWClXFqbG16h2x0h2NteWEsLCwbOgjp1b/r1Lfav6KhpJ/PrpGKjIvQrYlBVDZDYTDClW53jmSqfldWVldHR0eI7XeIAAAADXRSTlMc5qYA6e3qHOampqam9ZjFFQAADcBJREFUWMOc12lMm3UcwHHUeCRaCxQKoRQpvbHH87Q8LbUHpQctbYFWk94FQrt2kp4LR7h0GFxAQOY2QJgbDoVNY2ADlk3ndNntiyVzy+bUbYnHnNtc4n2+8ffQQs1kavyG8K795Pd7jvybcd+DjzwQUFnGTo4lTo37EETjXTJ4rl7p0VitKIogcq8vcfqapCyfIWDyqSsxBbmQTMZisRSKkpISElSSjAUJhUJWMiFUApFS3XNvxn0ZDz6g8k30mC2nT55MOOLDctTksVkQL4J1d/vj0Xh8eMJ3avqshCCjMJnMctyjUCgC8PAUQrICvohISpWfl5dHZv0lsAFMk0Ti/RkZD6t8PpXU1hNwjp1MoBqpVOpWIVhbW1s3mH6/HOmZGP/5WkUpWcBMRaEAyBAqSlhkMklHJBILC4kQDcrPAhMmTYt/I4n3Zjzkm1BZLKZAQGpWnR7rsVpVKqvRaKxu647a7YafhpTK8Ymx/rN0MiUdkMISha5R36gjFRGKCRBxuSSZNmGryVZE6J4Mnw9EKeoIoVazdOx0woeaTHXGuqUbx4582Te1fXLy3OT5+et9RSLRCghrBbBx946tWw/t2LJRyMYrBriwsCg/KwtXyeSkuBZJyEDdFrdFgyQimMZq0iROJ7wIiqLYwpEjX/T19U1NbW9ex9WqJaLMzPSQMkXWyKGmpqrHH3+iauseHY8nFi+zhKJ8CEc5+KRAKdIiDibJHrfbLUWx0OAwajV5EVPi9Piw3IvFDNGoHAbWaIaV4UuzWnV6qYL9WXkjb9W+9fhyVU1v6CoALQWTXpQ0IQ6g6QnvIDVutxnFlKN2xKQJeFHENxZy+BEEbtwrGs2VK1dsnqtXA1/WM1MgkDId77OOqiT5xBNPPL6ZV1EmhkmfpeekTRj1zqWukCqpRamxopFWA2rqcXjRuN88PjYO20UQFEMgWLPm9rhYS+GLRCIBJNJtPHDx89SQIFbteH1dRRmgpfQcMFMkRCKlxDtJm6NPafYOLRniGqlDjsTkLpdqLDGMGOuq8erqjBhmdZ9tp/L5/CTZu/nzvfheV8fcuH5dhaSMV1qaA3OmyVVs2UuT7ttHzsrNgdGl4A3UE4rEDJjL5VEFEiqns7ra5XLhZh1qOb9Civj7d+j37q2tAitFVm0+UFkDc5aW0nESSpPpCdOkLTB7+KrH0drVcsnrCQ1EfkJcLnOsGwuA6UyRRlTaV58ic1/cuOPMUSCrVsmm3kMHcJKHm0Xp1d6NvL2guHTVFgLyGEwZDgZjRpfZPmQ0+r1WaR0s12nF5MPuL9TlKTJ7zyuCo0c3Na2aVUB+JpGUJc3UHYSra4sw5UHdgs2iDLaeuGH1OMJLrSdOeMzxrmhdm1+ukTrBNPrjcd8FKpfLp4rgmczesrP+848v1jbhaBXUVLv5rTkgQVyb/KsHZQQlNcfd0shga3Bh2ONt6QoeX9CYsZYgVmf0y1Gps7oO89sd41NZDC5FJIJnJHvL1sde+vhoR20tqFBtbZVubq4Mbh8g4WKmN7smCOQxYmVrj1QZGR26ZfBgXeGhxSNKmynYosRcxm5vj9Rp9BuUgVOTpWQuJReCxW7TUuY+3tuxCVBo06YDeR9/VoaL/5Hsy22O+NDIkNJ+K+iUnggPLn533OOydy4NYc42zKqRYo7I6MD0hxUcRpKkvr5vw2P6o2B2bMLrONQ48tsBfK3/ldye/aFjGFEORuSLxxFnJNza8u4lmwvt6mztGnRidU5pbKCzs7//YE0+N/n64Yq+f1/bPjJ3dO/Fix3QW3rx7osjZWUpceVarpB3gkB+p212qDC7QRlbvOWQK8OdrfNTIZtrqHPg1vyoyeQ0Wx2t0/2XL6zPWSV7d72ibRe++dlcx9znh95k55cW8yS4mCaLiogcDuduZIu6OTbcZo/J5S0Lcbuy8/jAQnO/zexvCS9OzXtNZrMGQRwDJ3+dnOHjIsTY/+quLU+2a8n63TP6ohdzeDpCMQ9IAFf2SiTi2t1I02xz1NBtt2No8JJRHg12hcPbD6vMyGBn15HmfpPJLEW8NsvEz9fPNTCZy6SQvGHbrp2vl9dDHzD0b7/J1sGYAOJiiqT9EzlwoTmmNBgMcmN0PlrdZh8aHTzGHrDJY0vhxecORixSKRJyW07dPMhiwvsVJxW0os3bdm3buWfDxg29O/b9tklHJLF59JykCOC/kTXNsyfsyp+UAcx4LFhd3W2IxoOFFyzymL0rfKzyS5XNjEROTR/MrS8QCKhwAlGU5OmIhM1bf9m1a9++ffC/aYSuKCGAlQOBmCRXvTVIxZPqwycMSmVMbm1pwarbDH5r3XNnRlEDouzs/GLmptujGbg2U1+QncuVMVgK+Bqajs4W63e//eO2fdu+f7tXl5dPzMvDbxkQV8n8fBKJRlubpJOo6vNhx3hA3hZtMbS12aOoZ1H7hTUeQEdbO/tmf534+TBfTeXDKbIE9+A8x2aLJbzSZxsbN2zUkRl5y3E4OJok06+7O7wUSSMpqNpz/SGV22IeGvR326OYxzmp6JL6ELkjNDp/7vp5bQOVwQKPRCPqignsDXt69RV6CY9OgmOVkAxnKjKZjKOcLLD+A6krKdkvUp853H9qwqIaNMjjAanl9nHBZMimQqQ9vtCN3e3ZDDIHOAKBXsxu1L/xzvPf7q6pqangFRNJChaDQU6GjwrPf9KDAFxLBJIkLCHLZA31Zw5euzk9PT0Y8tncE+6+9guJxOWB6Zvzk4ICbj6JSChmQ40jb7zz6qs7t+hzytavk7ALOXlkRrKUCZNC/0IKhQqykEGWZdZr9+tnz315vf/y5csn+8Xa84fPzpxhtrc3cOGzwInFjfreLTtf2dNILi9/kVNZWSOm09JkMlxdJUl3IVlCGf4J+ONSG9TqAipNXzMzM6tv0Gq1anUDlSITEovZPAmcG2GrbFlBfT35qe3vTVU8vV7CpmWR0yVJKEXSSGuBQOZCOLkcl5tLpWZnZxc05OZmZsLvD5FMRiIWi/Ejo04hEOXW8yua3/3okxde/pRQ+VSNmPCPJO3upIgLWsoEFH9z8/mUzMxyJlPAIhHYxXQCjcVUawt4zVM/fP3HN689+uijL69fX7mOR8j/vySYKZABIiSiMCE+X6AoKhYTOIwCdUFh5XPvffXpN689Ax70zHM8fLOFnDXIJIrf5GuaGZRlAyxgYcSVlsnyXBqd3cgWFcHF++r3F14GbrWPSE9XVogLs/6BJN6NTJnJ0uRyf1Zm/6BNRHEcwKPooBB7vURzJr2YmNbG2iColBsEU8RRh0uyGjMEjNm8wUy1Go6AQzTaoWAsAQWtJYODAUtpyNhEUoSCUId2Egepfydd/L7c5V58vkvjF/qPg374/t7LHS85PHLtweJWDItncjS/hzKZ9GRA8jDgQKSBWholBfH1naVy9csNsnhsnk6nyWQ5JECTpCDbkonPh6MkIX3ybLYar25c+nyIk5VrGbJnw0c8XFJy2ZL0QEVioGcEWZZBjj1LVePxeHuTR36aLU2nz90eOs4naUlbkgakjKCm0tqpZlPx9VUeee/Ok+nr2EAuPunqT7KmT5aNQ7PYzoP8kuEt5sy7R6VYenI8GO4lrTterzhC0o/04Q0ehZCCIqi1eCq18ewer+bq8psYajrpDrI6IkF7UmVIgJhqRECgjr3Nw1z/xCM3H9ZRc2rCH4ZJSw4bTzC0xO2H9fBrXxJRUTOeqq3wyM+ln0+mYxcmQ5LHw5R0IfakWae7cc4IEBEBId9V1LRbzMe6TmreRk2PCVIyiJDhWmQgwCcJZJGiiB9jtY24zWL+WC4s4HmCmqDY7dqHVFVCdgOLRuxceZvHy+Qjj/zwsFExa6Jnz3aVuh0NBAmQmKhDNP4xbuJmPSayWkvFt7mLOV9qaG9IzUBQYu51rr9J56CkSiagCFjNPH8x734v6C9xP5gYkcK9pIStg3Q0Lql0yiCUJH8riohriuATa3avzPcLZs2QNGzMtSsOUZEOFjFJmDxSRDpoEjVtFnNxTqug5tRZP2qaIkh4/UjShRgWyJC46t1Kbd/lkU9vNAraowxquiWJjlViRGcnPS25JECaZCufvz/PM7+damh11MSmJaM1xMFJoSfi30HN9gfuA6w8p5GaFyb8wAzRJLsUEuqET9KOTFr59R/cB1jpVUEr4O20SZb0O/1G3GZCBB+cTHq3th/PcB9gcyAfZdIsOUI9W7IXhMhEbW1zF3Nm5UqjXvj5EoOVLBEhHEtam/YfMnqMn1vvMce7R/m5HPJP5fiXcheslkb+bckHEd+hQxD5ybmlnO01hnQOTl6c6UP6/4f0gpSZwXIzNG872NyUNHyu/2BB2ZL0xUhDBhG99Wt+c/XdRPTq2lqx6L60uFApFPTyTanZ7O5Wa+e4mdiR1KMkNRU1GktHLkbXipET156Xv9Z1rV55OOtvNpvBMBXtyND4+GAkDcix0WJRGR1/sLj8taJrup5Yuhn2DAdxcw1Lg5ABpC/pZYKz5snggxdLywkSXSMgTusuDwnT0r0LuY+YfJAZrdjOJrJZfCWqifLNI6NHEJwOuqbp8UWS22Ch7nEcMEgUpR43SW9rJ5ECmUgszZ4v0rckWJLVKEni3Otw7IMiI+JuZHKtDbGKkZ7GYRsH4FGEIe1KUnK/A5/THgTKTNVO3UlkAUZORk4eJsdflvTvSpIPhv8AWba9yZvIdcwAAAAASUVORK5CYII=',
  },
  {
    meta: {
      widgetName: 'Cascader',
      title: '级联选择',
      desc: '通过级联选择,可以清晰地显示层级数据结构',
      props: {
        action: { type: 'hover | click', desc: '展开子菜单的方式' },
        offsetX: { type: 'number', desc: '菜单间的间隔', defaultValue: 2 },
        offsetY: { type: 'number', desc: '显示框与菜单的间隔', defaultValue: 5 },
        placeholder: { type: 'string', desc: '显示框占位符' },
        valueField: { type: 'string', desc: 'data数据的value值的名称', defaultValue: 'value' },
        displayField: {
          type: 'string',
          desc: 'data数据的displayValue值的名称',
          defaultValue: 'text',
        },
        data: {
          type: 'Object[]',
          desc: '级联选择的数据',
          meta: [
            { key: 'value', title: 'value值', type: 'string' },
            { key: 'text', title: '文本值', type: 'string' },
          ],
        },
        separator: { type: 'string', desc: '自定义级联数据分隔符', defaultValue: '|' },
        value: { type: 'string | string[] | number | number[]', desc: '指定当前选中的条目' },
        displayValue: {
          type: 'string | string[] | number | number[]',
          desc: '指定当前选中的条目的displayValue值',
        },
        disabled: { type: 'boolean', desc: '是否禁选', defaultValue: false },
        allowClear: { type: 'boolean', desc: '是否允许清空选中值', defaultValue: true },
        showAllLevels: { type: 'boolean', desc: '是否显示所有层级关系的值', defaultValue: true },
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
      theme: {
        InputTag: {
          name: '选中数据展示框',
          theme: {
            InputTagWrap: {
              name: 'Inputtag的外盒',
              desc: '配置展示选中数据的外盒样式',
              normal: [
                ['width'],
                ['height'],
                ['margin'],
                ['padding'],
                ['color'],
                ['background'],
                ['border'],
                ['boxShadow'],
                ['borderRadius'],
                ['font'],
                ['opacity'],
              ],
              hover: [
                ['color'],
                ['background'],
                ['border'],
                ['boxShadow'],
                ['borderRadius'],
                ['font'],
                ['opacity'],
              ],
              active: [],
              disabled: [],
            },
            SwitchIcon: {
              name: '下拉图标',
              desc: '配置下拉或清除按钮的图标样式',
              normal: [['margin'], ['padding'], ['color'], ['font'], ['opacity']],
              hover: [['color'], ['font'], ['opacity']],
              active: [],
              disabled: [],
            },
          },
        },
        Menu: {
          name: '菜单配置',
          theme: {
            MenuWrap: {
              name: '菜单外盒',
              desc: '配置菜单组件的外盒样式',
              normal: [
                ['width'],
                ['height'],
                ['boxShadow'],
                ['background'],
                ['opacity'],
                ['border'],
                ['borderRadius'],
                ['margin'],
                ['padding'],
              ],
              hover: [['boxShadow'], ['background'], ['opacity'], ['border'], ['borderRadius']],
              clicked: [],
              disabled: [],
            },
            MenuItem: {
              name: '菜单项配置',
              theme: {
                MenuItemWrap: {
                  name: '项的外盒',
                  desc: '配置每一项的外盒',
                  normal: [
                    ['height'],
                    ['background'],
                    ['border'],
                    ['borderRadius'],
                    ['opacity'],
                    ['color'],
                    ['padding'],
                  ],
                  hover: [
                    ['background'],
                    ['border'],
                    ['borderRadius'],
                    ['opacity'],
                    ['color'],
                    ['font'],
                  ],
                  active: [
                    ['background'],
                    ['border'],
                    ['borderRadius'],
                    ['opacity'],
                    ['color'],
                    ['font'],
                  ],
                  disabled: [
                    ['background'],
                    ['color'],
                    ['borderRadius'],
                    ['opacity'],
                    ['padding'],
                    ['font'],
                  ],
                },
                SelectedMenuItemWrap: {
                  name: '选中项的外盒',
                  desc: '配置选中项的外盒',
                  normal: [
                    ['background'],
                    ['border'],
                    ['borderRadius'],
                    ['opacity'],
                    ['color'],
                    ['padding'],
                    ['font'],
                  ],
                  hover: [
                    ['background'],
                    ['border'],
                    ['borderRadius'],
                    ['opacity'],
                    ['color'],
                    ['font'],
                  ],
                  active: [
                    ['background'],
                    ['border'],
                    ['borderRadius'],
                    ['opacity'],
                    ['color'],
                    ['font'],
                  ],
                  disabled: [],
                },
              },
            },
            SubMenu: {
              name: '子菜单配置',
              theme: {
                MenuWrap: {
                  name: '菜单外盒',
                  desc: '配置菜单组件的外盒样式',
                  normal: [
                    ['width'],
                    ['height'],
                    ['boxShadow'],
                    ['background'],
                    ['opacity'],
                    ['border'],
                    ['borderRadius'],
                    ['margin'],
                    ['padding'],
                  ],
                  hover: [['boxShadow'], ['background'], ['opacity'], ['border'], ['borderRadius']],
                  clicked: [],
                  disabled: [],
                },
                MenuItem: {
                  name: '子菜单项配置',
                  theme: {
                    MenuItemWrap: {
                      name: '项的外盒',
                      desc: '配置每一项的外盒',
                      normal: [
                        ['height'],
                        ['background'],
                        ['border'],
                        ['borderRadius'],
                        ['opacity'],
                        ['color'],
                        ['padding'],
                      ],
                      hover: [
                        ['background'],
                        ['border'],
                        ['borderRadius'],
                        ['opacity'],
                        ['color'],
                        ['font'],
                      ],
                      active: [
                        ['background'],
                        ['border'],
                        ['borderRadius'],
                        ['opacity'],
                        ['color'],
                        ['font'],
                      ],
                      disabled: [
                        ['background'],
                        ['color'],
                        ['borderRadius'],
                        ['opacity'],
                        ['padding'],
                        ['font'],
                      ],
                    },
                    SelectedMenuItemWrap: {
                      name: '选中项的外盒',
                      desc: '配置选中项的外盒',
                      normal: [
                        ['background'],
                        ['border'],
                        ['borderRadius'],
                        ['opacity'],
                        ['color'],
                        ['padding'],
                        ['font'],
                      ],
                      hover: [
                        ['background'],
                        ['border'],
                        ['borderRadius'],
                        ['opacity'],
                        ['color'],
                        ['font'],
                      ],
                      active: [
                        ['background'],
                        ['border'],
                        ['borderRadius'],
                        ['opacity'],
                        ['color'],
                        ['font'],
                      ],
                      disabled: [],
                    },
                  },
                },
              },
            },
          },
        },
      },
      childrenWidget: [],
    },
    target: Cascader,
    screenshot:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAfQAAAFiCAMAAAA3N9rmAAAA/1BMVEUAAACamprZ2dnm5uaampqurq7Z2dmnqrPZ2dnZ2dmoq7LZ2dnY2NjZ2dmqqrbZ2dmnq7NRWF1NV1uZmZmcnJyamppLV1tQWF6amppSWF+WlpuamppOTk6ampqZmZmampqbm5tPVVybm5tPVlyhoaGampqampqZmZmampqnp6dQWF5SWV+ZmZlSWV+ZmZlRWF6ZmZlRWF6ampra2tqdnZ2dnZ1RWF6en6DHx8fDw8NPV1/Z2dmbm5vZ2dlOWmChoaHZ2dlRWF/a2tqnqrOZmZm3t7eZmZlQWF6ZmZlQWF7Z2dnZ2dnExMS1tbVRWGDY2NimqrKZmZlQV11RWF5SWl//qhXkAAAAT3RSTlMANbUKtb/q6jXVan+/aipKqt41+TubD2f92ATsB+bUqF8rIiITw7xwZQzt5d3Tsp6SiINgNCqSSN6aXlhXT0AbxsN01tCto4J2UT343MjC6Bgk+AAABq5JREFUeNrs2EGKhEAMheF4hqRAEC0pEBFERHTnJXL/ywxR7KZ7mDlA8r5N6fqHVCj6IlseZlZwguchb0L/kNQqONSmv7ofi4Jby0G/TalWcKxOE30pnYJzXaEP0rzH/3hKBU7IOb4XtUY+mrNeeN0J3NnXp6/QS2n0kguBSyXrpXkVnjo13BO41bOabqJbegY+OCaNmkSXo7YfRnPn7sWtPsgsajDb3evVLPYpajKBe1mNPDc6Y28PoPBzq7f2sRIEsFrr9pnueJMJYVcjtN3xIYRrrG+U7zEPIaR7aR/sGAlCGK32QLMdJ0EIp9Weie3Aa1wQYrWZ1FQEIVRqED0URA8I0QNC9IAQPSBEDwjRA0L0gBA9oB/26NAGQBgAgCCuCYKwEwt0/2lQJNim8u8WePGmB5keZHqQ6UGmB5keZHqQ6UGmB5keZHqQ6UGmB5keZHqQ6UGmB5keZHqQ6UGmB21Mf8a66/icY929G2d3+pjrftPnunsvbrrpXaYHmR5kepDpQaYHmR5k+sseHQgAAAAACPK3HqRTCHQ66HTQ6aDTQaeDTgedDjoddDrodNDpoNNBp4NOB50OOh10Ouh00Omg00Gng04HnQ46HXQ66HTQ6aDTQaeDTgedDjoddDrodNDpoNNBp4NOB50OOh10Ouh00Omg00Gng04HnQ46HXQ66HTQ6aDTQaeDTgedDjoddDrodNDpoNNBsXN/LW1DYRzHH0YU3dx2EQIhwVgkTVMQEf/QFZF6oSJsY5z3/2a2J3VBp4VgYdrz+35untwcysmXpCEXIbogogsiuiCiCyK6IKILIrogogsiuiCiCyK6IKILIrqgNaJ/fIXa/vryitWzdX8cL0SHBKILIrogogsiuiCiCyK6IKILIrogogsiuiCiCyK6IKILIrogogsiuiCiCyK6IKILIrogogsiuiCiCyK6IKILIrogogsiuiCiC3qInhNdSBc9t9LHzCBh5rVLu/HRGiS0XvvGEh+nBgmnXjuxzEdjkNB47cxGPlI+yiKhTr32yOp8OSGgu8Lz2mzsB1VhiF5ReeuxmU0Cz+8i2uAmZjYt/Wiff/Xo1fteupxaf6mPucFHrhgHNzFXHAWXGaKWBXdU9O/m3PHUEK3pcejM7MF96FQXhkhdVKFzb7270MmzhSFCiywPnTuzXpGEpTRpeYyPTN0maVhKCnukOAm9smoSRKKpytA7KeypURoQtXRkzxwe5AHRyg8O7SXnDdkjlTfntsqibbjLRydt2oU98elf8/ntFlb48e2Pn1sb5HY+f5bYfkEO0QURXRDRBS2jX3/AIN83/GxdP4q+Yxhk28/WV9tYO0QnOogOooPoqoguiOiCiC6I6IKILojogoguiOiCiC6I6IKILojogoguiOiCiC6I6IKILojogoguiOiCiC6I6IKILojogoguiOiCiC6I6IKILojogoguiOiCiC6I6IKILojogoguiOiCiC6I6IKEo599HujKepdD11xa72romjMb4P9Gf587XyO6b32QPevtDl2za729oWu2baW3j/6edk50ohOd6EQn+u927pg1YSAOoHigY3EwQ4JyS8hWERHBoVBBl6JDh1y+/2fp3VGEDoV0aux7b89w/DjB5O4vuuiiiy666LNGb+pedBp6v9t3osPQ6+Xm2IlOQx+Tuugw9Bg3+050GPqQ1HvRYehFXXQYelEXHYZe1EWHoQ9x+d6LDkMv6qLD0IfhZdeJTkOPSV10GHpRFx2GntSPnegw9KIuOgw9qzeiw9CTetuIDkMf4rJtRIehF3XRYehFXXQY+jCurkF0GPow7nrRaehxW4tOQx+3neg4dH/ecejxXK9FZ6HH8yn4l42FHj9OwZczLPS8z30Ny0KPq1PwgwsLPa7a4KdVFnoybzxEwULP5h6XYqFncw9GstCzuUegWejZ3MsOLPQxmXutiYWe97kXGFno2dyryiz0MZk7lICFnve540dY6OP2NThoiIWezR0pxkLP5g4PhKEnc8eEotDXTXsNDgRmoVdVWDv6G4fukH/RRRdddNFFF1100UUXXXTR57hy0UUXXXTRRRdddNFFF1100UWf39JFF130KV2eJ3ao7i2mPrOo7h2mPnOpfuzv0ee08u/o9hv0h0100U10E91ExyY6MNGBiQ5MdGCiAxMdmOjARAcmOjDRgYkOTHRgogMTHZjowEQHJjow0YGJDkx0YKIDEx2Y6MBEByY6MNGBiQ5MdGCiA/tP6Lcnm1RBf3t62G5f6IZLdGCiAxMdmOjAPgHpqJACoaqHWwAAAABJRU5ErkJggg==',
  },
  {
    meta: {
      widgetName: 'Checkbox',
      title: '多选框',
      desc: '多选框。',
      props: {
        checked: { type: 'boolean', desc: '指定Checkbox是否选中' },
        defaultChecked: { type: 'boolean', desc: '指定Checkbox初始是否选中' },
        disabled: { type: 'boolean', desc: '指定Checkbox是否禁用' },
        indeterminate: { type: 'boolean', desc: '设置半选状态，只用于样式控制' },
        value: { type: 'string', desc: '组件value值' },
        styles: {
          type: 'CheckboxType',
          desc: 'Checkbox展示方向，可选值为 vertical 或不设',
          defaultValue: false,
        },
        children: { type: 'string | React.node', desc: 'Checkbox展示内容' },
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
      childrenWidget: ['Checkbox.Group'],
      category: ['数据录入'],
      theme: {
        Container: {
          name: '整体样式',
          desc: '整体样式',
          normal: [['opacity'], ['margin'], ['padding'], ['width'], ['height']],
        },
        CheckboxText: {
          name: '文字样式',
          desc: '文字样式',
          normal: [['color'], ['font']],
          hover: [['color'], ['font']],
          disabled: [['color'], ['font']],
        },
        CheckboxEdgeUnChecked: {
          name: '未选中外框样式',
          desc: '未选中外框样式',
          normal: [
            ['background'],
            ['borderRadius'],
            ['border'],
            ['boxShadow'],
            ['width'],
            ['height'],
          ],
          hover: [['background'], ['borderRadius'], ['border'], ['width'], ['height']],
          disabled: [['background'], ['borderRadius'], ['border'], ['width'], ['height']],
        },
        CheckboxEdgeChecked: {
          name: '选中外框样式',
          desc: '选中外框样式',
          normal: [
            ['background'],
            ['borderRadius'],
            ['border'],
            ['boxShadow'],
            ['width'],
            ['height'],
          ],
          hover: [['background'], ['borderRadius'], ['border'], ['width'], ['height']],
          disabled: [['background'], ['borderRadius'], ['border'], ['width'], ['height']],
        },
        CheckboxEdgeIndeterminate: {
          name: '半选外框样式',
          desc: '半选状态外框样式',
          normal: [
            ['background'],
            ['borderRadius'],
            ['border'],
            ['boxShadow'],
            ['width'],
            ['height'],
          ],
          hover: [['background'], ['borderRadius'], ['border'], ['width'], ['height']],
          disabled: [['background'], ['borderRadius'], ['border'], ['width'], ['height']],
        },
        CheckboxEdgeCancel: {
          name: '取消状态外框样式',
          desc: '取消状态外框样式',
          normal: [
            ['background'],
            ['borderRadius'],
            ['border'],
            ['boxShadow'],
            ['width'],
            ['height'],
          ],
        },
        CheckboxInnerChecked: {
          name: '选中内框样式',
          desc: '选中内框样式',
          normal: [['color'], ['width'], ['height']],
          hover: [['color'], ['width'], ['height']],
          disabled: [['color'], ['width'], ['height']],
        },
        CheckboxInnerIndeterminate: {
          name: '半选内框样式',
          desc: '半选内框样式',
          normal: [['color'], ['width'], ['height']],
          hover: [['color'], ['width'], ['height']],
          disabled: [['color'], ['width'], ['height']],
        },
        CheckboxInnerCancel: {
          name: '取消状态内框样式',
          desc: '取消状态内框样式',
          normal: [['color'], ['width'], ['height']],
        },
      },
    },
    target: Checkbox,
    screenshot:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAAAYCAYAAABKtPtEAAAAAXNSR0IArs4c6QAAAd1JREFUWAntWL9Lw0AU/i5J/wEHsdYfoEs2R0cLuhZEF6HgYgXBrYUOLjqog4Mi6iY4uvk39F9wEApdHBSdRFs3hfhe2qMRkjMkF21SH5Qcl3ff3fe9d5feEyBbqTgTn8ARNYuOgzz3RTUh8ERjGxZQv7kUD1FxfmucYPIfwC0cjGidVOAlB8wNugiGG3nd5FlJwuxllVZddYMZBFjUDerBSxLbM030phV3z6umVmE3m01HNVa+s21bcDspf86AobZ/AYY6/EReSwbk6KM/M5lOKWMLYJpAdRNYXwXoT1DqLJYATL5WAfKjwOkVffpDneuDpRElbzST5MfHgL0T4LUdDeevRwVmwOw0sDDvvzw37SnyaSfP7AIFMGg/b5WB0tJ3EST5AkV+9zi9kZesAgVo3QP7Z8BaiURY7Lqb5F3dACT5t46ESe9TeQbctYDDc2Bnu0uQt0WBLsu857NAnlkFZoCMqSvCBVBeBqYK2Uh7yY2fygyQjixC7QDovANt+mXJQgnAhB+fs0S7z+XHLdB3zWbL4hqe6t4eh3avPugLIe/5vi99OpPy5wxo+MynqytJbC1rNOgQqIMKmFrQvCCE6WJ7+wawbXDVlqu3lK7XqpQNu3bGYKw0VISZ0xdB62tJJ1pYqQAAAABJRU5ErkJggg==',
  },
  {
    meta: {
      widgetName: 'Checkbox.Group',
      title: '多选框组',
      desc: '多选框组。',
      props: {
        defaultValue: { type: 'string[]', desc: '指定CheckboxGroup初始选中值' },
        value: { type: 'string[]', desc: '指定CheckboxGroup选中值' },
        disabled: { type: 'boolean', desc: '指定CheckboxGroup是否禁用' },
        data: {
          type: 'Object[]',
          desc: '指定 Checkbox 组件展示值',
          defaultValue: [
            { text: '选项1', value: '1' },
            { text: '选项2', value: '2' },
            { text: '选项3', value: '3' },
          ],
        },
        displayField: { type: 'string', desc: '指定CheckboxGroup展示字段值' },
        valueField: { type: 'string', desc: '指定 Checkbox 组件 value 值', defaultValue: false },
        displayValue: {
          type: 'string[]',
          desc:
            '指定CheckboxGroup选中值备用项，与value相对应，value中有不存在的值，将展示 displayValue 中对应值',
        },
        defaultDisplayValue: {
          type: 'string[]',
          desc:
            '指定CheckboxGroup选中值初始备用项，与value相对应，value中有不存在的值，将展示 displayValue 中对应值',
        },
        styles: {
          type: 'CheckboxType',
          desc: '指定CheckboxGroup中Checkbox展示方向，可选值为 vertical 或不设',
        },
        childType: {
          type: 'CheckboxGroupChildType',
          desc: '指定CheckboxGroup展示类型，可设置为 button 或不设',
        },
        size: {
          type: 'CheckboxButtonSizeType',
          desc:
            '指定CheckboxGroup大小，仅展示类型为button 时生效，可设置为 small、large、bigger 或不设',
        },
        cache: { type: 'boolean', desc: '指定CheckboxGroup中实时更新data 数据源信息' },
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
      designInfo: {
        CheckboxButtonGroup: {
          sequence: 1,
          title: '按钮状多选框组',
          desc: '按钮形状的多选框组',
          props: { childType: 'button' },
          theme: {
            Container: {
              name: '多选框组整体样式',
              desc: '多选框组整体样式',
              normal: [
                ['opacity'],
                ['border'],
                ['borderRadius'],
                ['background'],
                ['width'],
                ['height'],
                ['margin'],
                ['padding'],
              ],
            },
            CheckButton: {
              name: '按钮多选框样式',
              desc: '按钮多选框样式',
              theme: {
                CheckButtonUnChecked: {
                  name: '未选中样式',
                  desc: '未选中样式',
                  normal: {
                    selectNames: [
                      ['opacity'],
                      ['border'],
                      ['borderRadius'],
                      ['background'],
                      ['width'],
                      ['height'],
                      ['color'],
                      ['font'],
                      ['padding'],
                    ],
                    nth: [
                      ['opacity'],
                      ['border'],
                      ['borderRadius'],
                      ['background'],
                      ['width'],
                      ['height'],
                      ['color'],
                      ['font'],
                      ['padding'],
                    ],
                  },
                  hover: {
                    selectNames: [
                      ['opacity'],
                      ['border'],
                      ['borderRadius'],
                      ['background'],
                      ['color'],
                    ],
                    nth: [['opacity'], ['border'], ['borderRadius'], ['background'], ['color']],
                  },
                  disabled: {
                    selectNames: [
                      ['opacity'],
                      ['border'],
                      ['borderRadius'],
                      ['background'],
                      ['color'],
                    ],
                    nth: [['opacity'], ['border'], ['borderRadius'], ['background'], ['color']],
                  },
                },
                CheckButtonChecked: {
                  name: '选中样式',
                  desc: '选中样式',
                  normal: {
                    selectNames: [
                      ['opacity'],
                      ['border'],
                      ['borderRadius'],
                      ['background'],
                      ['width'],
                      ['height'],
                      ['color'],
                      ['font'],
                      ['padding'],
                    ],
                    nth: [
                      ['opacity'],
                      ['border'],
                      ['borderRadius'],
                      ['background'],
                      ['width'],
                      ['height'],
                      ['color'],
                      ['font'],
                      ['padding'],
                    ],
                  },
                  hover: {
                    selectNames: [
                      ['opacity'],
                      ['border'],
                      ['borderRadius'],
                      ['background'],
                      ['color'],
                    ],
                    nth: [['opacity'], ['border'], ['borderRadius'], ['background'], ['color']],
                  },
                  disabled: {
                    selectNames: [
                      ['opacity'],
                      ['border'],
                      ['borderRadius'],
                      ['background'],
                      ['color'],
                    ],
                    nth: [['opacity'], ['border'], ['borderRadius'], ['background'], ['color']],
                  },
                },
                CheckButtonCancel: {
                  name: '取消状态样式',
                  desc: '取消状态样式',
                  normal: [
                    ['opacity'],
                    ['border'],
                    ['borderRadius'],
                    ['background'],
                    ['width'],
                    ['height'],
                    ['color'],
                    ['font'],
                    ['padding'],
                  ],
                  hover: [['opacity'], ['border'], ['borderRadius'], ['background'], ['color']],
                },
              },
            },
          },
        },
      },
      needExport: true,
      theme: {
        Container: {
          name: '多选框组整体配置',
          desc: '多选框组整体配置',
          normal: [
            ['opacity'],
            ['border'],
            ['borderRadius'],
            ['background'],
            ['width'],
            ['height'],
            ['margin'],
            ['padding'],
          ],
        },
        Checkbox: {
          name: '单个多选框配置',
          theme: {
            Container: {
              name: '整体样式',
              desc: '整体样式',
              normal: [['opacity'], ['margin'], ['padding'], ['width'], ['height']],
              hover: [['opacity']],
              disabled: [['opacity']],
            },
            CheckboxText: {
              name: '文字样式',
              desc: '文字样式',
              normal: [['color'], ['font']],
              hover: [['color'], ['font']],
              disabled: [['color'], ['font']],
            },
            CheckboxEdgeUnChecked: {
              name: '未选中外框样式',
              desc: '未选中外框样式',
              normal: [
                ['background'],
                ['borderRadius'],
                ['border'],
                ['boxShadow'],
                ['width'],
                ['height'],
              ],
              hover: [['background'], ['borderRadius'], ['border'], ['width'], ['height']],
              disabled: [['background'], ['borderRadius'], ['border'], ['width'], ['height']],
            },
            CheckboxEdgeChecked: {
              name: '选中外框样式',
              desc: '选中外框样式',
              normal: [
                ['background'],
                ['borderRadius'],
                ['border'],
                ['boxShadow'],
                ['width'],
                ['height'],
              ],
              hover: [['background'], ['borderRadius'], ['border'], ['width'], ['height']],
              disabled: [['background'], ['borderRadius'], ['border'], ['width'], ['height']],
            },
            CheckboxEdgeIndeterminate: {
              name: '半选外框样式',
              desc: '半选状态外框样式',
              normal: [
                ['background'],
                ['borderRadius'],
                ['border'],
                ['boxShadow'],
                ['width'],
                ['height'],
              ],
              hover: [['background'], ['borderRadius'], ['border'], ['width'], ['height']],
              disabled: [['background'], ['borderRadius'], ['border'], ['width'], ['height']],
            },
            CheckboxEdgeCancel: {
              name: '取消状态外框样式',
              desc: '取消状态外框样式',
              normal: [
                ['background'],
                ['borderRadius'],
                ['border'],
                ['boxShadow'],
                ['width'],
                ['height'],
              ],
            },
            CheckboxInnerChecked: {
              name: '选中内框样式',
              desc: '选中内框样式',
              normal: [['color'], ['width'], ['height']],
              hover: [['color'], ['width'], ['height']],
              disabled: [['color'], ['width'], ['height']],
            },
            CheckboxInnerIndeterminate: {
              name: '半选内框样式',
              desc: '半选内框样式',
              normal: [['color'], ['width'], ['height']],
              hover: [['color'], ['width'], ['height']],
              disabled: [['color'], ['width'], ['height']],
            },
            CheckboxInnerCancel: {
              name: '取消状态内框样式',
              desc: '取消状态内框样式',
              normal: [['color'], ['width'], ['height']],
            },
          },
        },
      },
      parentWidget: 'Checkbox',
    },
    target: Checkbox.Group,
    screenshot:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAAA6CAYAAAAA0F95AAAAAXNSR0IArs4c6QAAAltJREFUaAXtWr9Lw0AYfUnbf8BBrPUH6NLN0dGCrgXRRSi4WEFwa6GDiw7q4KCIugmObv4N/RcchEKXDopOoq2bQvy+tEcrJLGklzZJv4M2R3L37t677+6a6zNAaaNozfwAZ5TNWRbSfM9vMgy8Ut1qEqg83BrPfnGGVc9g8t/AIyxMaG3UwHsKWAq7CKY98rrJs5KE2YkqrbrqBjMJMKcbtAcvSOyeZvxnk4POea+mvbBrtZrlVVc9y2azBueDKs8RMNZJBBjr4SfyWiIgRZv+wmw0pRxYgEQCKO0C25sA/QiKXBpIACZfLgLpSeDyjrb+vtb1cGlEwesvKfLTU8DRBfDR9Icz6lquEbA4D6wsO3fPDnsa+aiTZ3auApg0n/cKQH7trwiKfIZG/vA8uiOvWLkKUG8Ax1fAVp5EWG0XT1Dp0g6gyH+2FEx0r55rwFMdOL0GDvbbBHlaZOhlmed8HMgzK9cIUGNqi3ADFNaBuUw8wl5x46tnBKiCLEL5BGh9AU36xCn1JQATfnmLE+0ul3+nQLdoPHNJPsPzem8fhHbnfNARQr3nOz50uBlUeY6AqkN7um4Fia2ljyYtAhXQAaYWtF4QwrSxe++FMG/yqS2f3lK43nuFbL99ZwzGisKJcL+cpJwoIAqIAqKAKCAKiAKiQBwVsP/KEIeIOEQ022N4rohDxF4xcvZ3iL/EIRLiwRlK18b+UFQE0BFn4hARh4g4RMQhomMtGQWG6y4gDpGGOEQgDhGalOIQ6YggDhFxiIxikwq+TXGIkMbVAHUOEltLt8UhMu4OkV80EdaRb+T6RQAAAABJRU5ErkJggg==',
  },
  {
    meta: {
      widgetName: 'DatePicker',
      title: '日期选择器',
      desc: '用于日期选择',
      props: {
        defaultValue: { type: 'string', desc: '日期默认显示值' },
        value: { type: 'string', desc: '日期显示值' },
        createPortal: { type: 'boolean', desc: '是否全局弹出下拉框', defaultValue: true },
        format: {
          type: 'string',
          desc: '用于指定输入框日期显示的格式',
          defaultValue: 'YYYY-MM-DD',
        },
        placeholder: { type: 'string', desc: 'input输入提示信息' },
        disabled: { type: 'boolean', desc: '禁用状态,是否不可用', defaultValue: false },
        readOnly: { type: 'boolean', desc: '只读input', defaultValue: false },
        selectToday: { type: 'boolean', desc: '是否默认选中今天日期', defaultValue: false },
        showToday: {
          type: 'boolean | Object',
          desc: "是否展示'今天'按钮 | showToday={message:'XXX'} 可以指定按钮文本 ",
          defaultValue: false,
        },
        showTime: {
          type: 'boolean | Object',
          desc:
            "为组件增加时间选择功能 | showTime={message:{showTime:'XXX',showDate:'XXX'}} 可以指定按钮切换文本",
          defaultValue: false,
        },
        extraFooter: {
          type: 'Object',
          desc: "在面板中添加额外的页脚 extraFooter={message:'XXX',style:{...}}",
          defaultValue: '',
        },
        buttonOptions: {
          type: 'Object',
          desc:
            '自定义页脚展示的一些按钮 buttonOptions={{options: { buttonNameXXX:自定义时间, buttonNameXXX:自定义时间}}} ',
          defaultValue: '',
        },
        step: { type: 'number', desc: '设置周,年的展示步长', defaultValue: false },
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
      childrenWidget: [
        'DatePicker.MonthPicker',
        'DatePicker.YearPicker',
        'DatePicker.WeekPicker',
        'DatePicker.WeeksPicker',
        'DatePicker.RangePicker',
      ],
      category: ['数据录入'],
    },
    target: DatePicker,
    screenshot:
      'data:image/png;base64,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',
  },
  {
    meta: {
      widgetName: 'DatePicker.MonthPicker',
      title: '月选择器',
      desc: '用于月份选择,',
      props: {
        defaultValue: { type: 'string', desc: '日期默认显示值' },
        value: { type: 'string', desc: '日期显示值' },
        createPortal: { type: 'boolean', desc: '是否全局弹出下拉框', defaultValue: true },
        format: { type: 'string', desc: '用于指定输入框日期显示的格式', defaultValue: 'YYYY-MM' },
        placeholder: { type: 'string', desc: 'input输入提示信息' },
        disabled: { type: 'boolean', desc: '禁用状态,是否不可用', defaultValue: false },
        readOnly: { type: 'boolean', desc: '只读input', defaultValue: false },
        extraFooter: {
          type: 'Object',
          desc: "在面板中添加额外的页脚 extraFooter={message:'XXX',style:{...}}",
          defaultValue: '',
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
      parentWidget: 'DatePicker',
    },
    target: DatePicker.MonthPicker,
    screenshot:
      'data:image/png;base64,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',
  },
  {
    meta: {
      widgetName: 'DatePicker.YearPicker',
      title: '年选择器',
      desc: '用于年选择,',
      props: {
        createPortal: { type: 'boolean', desc: '是否全局弹出下拉框', defaultValue: true },
        defaultValue: { type: 'string', desc: '日期默认显示值' },
        value: { type: 'string', desc: '日期显示值' },
        format: { type: 'string', desc: '用于指定输入框日期显示的格式', defaultValue: 'YYYY' },
        placeholder: { type: 'string', desc: 'input输入提示信息' },
        disabled: { type: 'boolean', desc: '禁用状态,是否不可用', defaultValue: false },
        readOnly: { type: 'boolean', desc: '只读input', defaultValue: false },
        extraFooter: {
          type: 'Object',
          desc: "在面板中添加额外的页脚 extraFooter={message:'XXX',style:{...}}",
          defaultValue: '',
        },
        step: { type: 'number', desc: '设置年的展示步长', defaultValue: false },
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
      parentWidget: 'DatePicker',
    },
    target: DatePicker.YearPicker,
    screenshot:
      'data:image/png;base64,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',
  },
  {
    meta: {
      widgetName: 'DatePicker.WeekPicker',
      title: '周选择器',
      desc: '用于周选择,',
      props: {
        defaultValue: { type: 'string', desc: '日期默认显示值' },
        value: { type: 'string', desc: '日期显示值' },
        createPortal: { type: 'boolean', desc: '是否全局弹出下拉框', defaultValue: true },
        format: { type: 'string', desc: '用于指定输入框日期显示的格式', defaultValue: 'YYYY-WW' },
        placeholder: { type: 'string', desc: 'input输入提示信息' },
        disabled: { type: 'boolean', desc: '禁用状态,是否不可用', defaultValue: false },
        readOnly: { type: 'boolean', desc: '只读input', defaultValue: false },
        selectToday: { type: 'boolean', desc: '是否默认选中今天日期', defaultValue: false },
        showToday: {
          type: 'boolean | Object',
          desc: "是否展示'今天'按钮 | showToday={message:'XXX'} 可以指定按钮文本 ",
          defaultValue: false,
        },
        extraFooter: {
          type: 'Object',
          desc: "在面板中添加额外的页脚 extraFooter={message:'XXX',style:{...}}",
          defaultValue: '',
        },
        buttonOptions: {
          type: 'Object',
          desc:
            '自定义页脚展示的一些按钮 buttonOptions={{options: { buttonNameXXX:自定义时间, buttonNameXXX:自定义时间}}} ',
          defaultValue: '',
        },
        step: { type: 'number', desc: '设置周,年的展示步长', defaultValue: false },
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
      parentWidget: 'DatePicker',
    },
    target: DatePicker.WeekPicker,
    screenshot:
      'data:image/png;base64,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',
  },
  {
    meta: {
      widgetName: 'DatePicker.WeeksPicker',
      title: '周选择器',
      desc: '用于周选择,',
      props: {
        createPortal: { type: 'boolean', desc: '是否全局弹出下拉框', defaultValue: true },
        defaultValue: { type: 'string', desc: '日期默认显示值' },
        value: { type: 'string', desc: '日期显示值' },
        format: { type: 'string', desc: '用于指定输入框日期显示的格式', defaultValue: 'YYYY-WW' },
        placeholder: { type: 'string', desc: 'input输入提示信息' },
        disabled: { type: 'boolean', desc: '禁用状态,是否不可用', defaultValue: false },
        readOnly: { type: 'boolean', desc: '只读input', defaultValue: false },
        extraFooter: {
          type: 'Object',
          desc: "在面板中添加额外的页脚 extraFooter={message:'XXX',style:{...}}",
          defaultValue: '',
        },
        step: { type: 'number', desc: '设置周,年的展示步长', defaultValue: false },
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
      parentWidget: 'DatePicker',
    },
    target: DatePicker.WeeksPicker,
    screenshot:
      'data:image/png;base64,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',
  },
  {
    meta: {
      widgetName: 'DatePicker.RangePicker',
      title: '日期范围选择器',
      desc: '用于日期范围选择,',
      props: {
        defaultValue: {
          type: 'string[]',
          meta: [{ key: 'value', type: 'string' }],
          desc: '日期默认显示值',
        },
        value: { type: 'string[]', meta: [{ key: 'value', type: 'string' }], desc: '日期显示值' },
        createPortal: { type: 'boolean', desc: '是否全局弹出下拉框', defaultValue: true },
        format: {
          type: 'string',
          desc: '用于指定输入框日期显示的格式',
          defaultValue: 'YYYY-MM-DD',
        },
        placeholder: {
          type: 'string[]',
          meta: [{ key: 'value', type: 'string' }],
          desc: 'input输入提示信息',
          defaultValue: ['开始时间', '结束时间'],
        },
        disabled: { type: 'boolean', desc: '禁用状态,是否不可用', defaultValue: false },
        readOnly: { type: 'boolean', desc: '只读input', defaultValue: false },
        selectToday: { type: 'boolean', desc: '是否默认选中今天日期', defaultValue: false },
        showToday: {
          type: 'boolean | Object',
          desc: "是否展示'今天'按钮 | showToday={message:'XXX'} 可以指定按钮文本 ",
          defaultValue: false,
        },
        showTime: {
          type: 'boolean | Object',
          desc:
            "为组件增加时间选择功能 | showTime={message:{showTime:'XXX',showDate:'XXX'}} 可以指定按钮切换文本",
          defaultValue: false,
        },
        extraFooter: {
          type: 'Object',
          desc: "在面板中添加额外的页脚 extraFooter={message:'XXX',style:{...}}",
          defaultValue: '',
        },
        buttonOptions: {
          type: 'Object',
          desc:
            '自定义页脚展示的一些按钮 buttonOptions={{options: { buttonNameXXX:自定义时间, buttonNameXXX:自定义时间}}} ',
          defaultValue: '',
        },
        step: { type: 'number', desc: '设置周,年的展示步长', defaultValue: false },
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
      parentWidget: 'DatePicker',
    },
    target: DatePicker.RangePicker,
    screenshot:
      'data:image/png;base64,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',
  },
  {
    meta: {
      widgetName: 'Divider',
      title: '分割线',
      desc: '区隔内容的分割线',
      props: {
        viewClass: { type: 'string', desc: '用于配置通用主题属性' },
        position: { type: 'DividerPosition', desc: '分割线中显示内容的位置,与content 配合使用' },
        dashed: { type: 'boolean', desc: '分割线是否是虚线', defaultValue: false },
        content: { type: 'string', desc: '分割线中可添加显示的内容' },
        type: {
          type: 'DividerType',
          desc: '分割线的风格 水平或者 垂直',
          defaultValue: 'horizontal',
        },
      },
      type: { DividerPosition: ['left', 'right'], DividerType: ['horizontal', 'vertical'] },
      category: ['其他'],
      designInfo: {
        VerticalDivider: {
          sequence: 1,
          title: '垂直分割线',
          desc: '垂直分割线',
          props: { type: 'vertical' },
          theme: {
            VerticalDivider: {
              name: '垂直分割线',
              desc: '分割线为垂直类型时的配置',
              normal: [
                ['width'],
                ['height'],
                ['background'],
                ['opacity'],
                ['margin'],
                ['padding'],
                ['boxShadow'],
              ],
            },
          },
        },
      },
      theme: {
        HorizontalDivider: {
          name: '水平分割线',
          desc: '分割线为水平类型时的配置',
          normal: [
            ['width'],
            ['height'],
            ['background'],
            ['opacity'],
            ['margin'],
            ['padding'],
            ['boxShadow'],
          ],
        },
      },
      childrenWidget: [],
    },
    target: Divider,
    screenshot:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAAACCAYAAACnpNlpAAAAAXNSR0IArs4c6QAAACJJREFUKBVjPHPmzFYGBgYvIB4F9A+BbUz0t3PURqQQ+A8AQvAFHGBapi0AAAAASUVORK5CYII=',
  },
  {
    meta: {
      widgetName: 'Divider',
      title: '垂直分割线',
      desc: '垂直分割线',
      props: {
        viewClass: { type: 'string', desc: '用于配置通用主题属性' },
        position: { type: 'DividerPosition', desc: '分割线中显示内容的位置,与content 配合使用' },
        dashed: { type: 'boolean', desc: '分割线是否是虚线', defaultValue: false },
        content: { type: 'string', desc: '分割线中可添加显示的内容' },
        type: { type: 'DividerType', desc: '分割线的风格 水平或者 垂直', defaultValue: 'vertical' },
      },
      type: { DividerPosition: ['left', 'right'], DividerType: ['horizontal', 'vertical'] },
      category: ['其他'],
      theme: {
        VerticalDivider: {
          name: '垂直分割线',
          desc: '分割线为垂直类型时的配置',
          normal: [
            ['width'],
            ['height'],
            ['background'],
            ['opacity'],
            ['margin'],
            ['padding'],
            ['boxShadow'],
          ],
        },
      },
      childrenWidget: [],
      aliasName: 'VerticalDivider',
    },
    target: Divider,
    screenshot:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAABACAYAAAAwJqZDAAAAAXNSR0IArs4c6QAAAClJREFUKBVjPHPmzFYGIGABYi8QgwlEgMAoYzQQwAkBS0oApZZtQPwfAC8nBZy6TqPcAAAAAElFTkSuQmCC',
  },
  {
    meta: {
      widgetName: 'Dropmenu',
      title: '下拉菜单',
      desc: '选项过多时，弹出下拉菜单给用户选择操作',
      props: {
        action: { type: 'click | hover', desc: '弹出项的打开方式', defaultValue: 'click' },
        hideAction: { type: 'click | hover', desc: '弹出项的隐藏方式', defaultValue: 'click' },
        menus: { type: 'React.Node', desc: '弹出项组件' },
        align: { type: 'React.Node', desc: '弹出方向', defaultValue: 'bottom' },
      },
      events: {
        onPopupVisibleChange: {
          desc: '弹出项展开/隐藏时触发',
          args: [{ name: 'popupVisible', desc: '展开/隐藏时的popupVisible值', type: 'boolean' }],
        },
      },
      childrenWidget: [],
      category: ['数据录入'],
    },
    target: Dropmenu,
    screenshot:
      'data:image/png;base64,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',
  },
  {
    meta: {
      widgetName: 'Icon',
      title: '图标',
      desc: '语义化的矢量图形',
      props: {
        viewClass: { type: 'string', desc: '用于配置通用主题属性' },
        iconClass: { type: 'icon', desc: '图标资源,需从图标库中获取.' },
        disabled: { type: 'boolean', desc: '禁用状态,是否不可用', defaultValue: false },
      },
      events: {
        onClick: {
          desc: '点击按钮时触发',
          args: [{ name: 'event', desc: '点击的DOM事件', type: 'Object' }],
        },
      },
      category: ['通用'],
      theme: {
        Icon: {
          name: '图标',
          desc: '图标',
          normal: [['color'], ['margin'], ['fontSize'], ['font'], ['padding'], ['cursor']],
          hover: [['color'], ['margin'], ['cursor']],
          clicked: [],
          disabled: [['color'], ['cursor']],
        },
      },
      childrenWidget: [],
    },
    target: Icon,
    screenshot:
      'data:image/png;base64,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',
  },
  {
    meta: {
      widgetName: 'Input',
      title: '文本输入框',
      desc: '常用于昵称,名称,表格内容等填写.',
      props: {
        disabled: { type: 'boolean', desc: '禁用状态,是否不可用', defaultValue: false },
        viewClass: { type: 'string', desc: '用于配置通用主题属性' },
        size: {
          type: 'InputSize',
          desc:
            "可配置三种尺寸大小的input ('large' , 'default' , 'small'),高度分别为 40px、32px 和 24px。",
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
        help: { type: 'string', desc: 'input校验提示信息' },
        placeholder: { type: 'string', desc: 'input输入提示信息' },
        prefix: { type: 'icon', desc: '带有前缀的 input' },
        suffix: { type: 'icon', desc: '带有后缀的 input' },
        defaultValue: { type: 'string', desc: '默认显示内容' },
        value: { type: 'string', desc: '显示内容' },
        formatter: { type: 'function', desc: '格式化显示内容的匹配规则,需与 parser 属性配套使用' },
        parser: { type: 'function', desc: '解析格式化显示内容的规则,需与 formatter 属性配套使用' },
        readOnly: { type: 'boolean', desc: '只读input', defaultValue: false },
        autoFocus: { type: 'boolean', desc: '是否自动获取焦点', defaultValue: false },
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
      theme: {
        Container: {
          name: '输入框外部容器',
          desc: '输入框外部容器',
          normal: [['width'], ['height'], ['margin'], ['padding']],
        },
        Input: {
          name: '输入框主体',
          desc: '输入框主体结构',
          normal: [
            ['width'],
            ['height'],
            ['fontSize'],
            ['font'],
            ['color'],
            ['background'],
            ['border'],
            ['borderRadius'],
            ['cursor'],
            ['opacity'],
          ],
          hover: [
            ['border'],
            ['borderRadius'],
            ['cursor'],
            ['background'],
            ['opacity'],
            ['boxShadow'],
          ],
          active: [['boxShadow'], ['border'], ['borderRadius'], ['cursor'], ['background']],
          disabled: [
            ['fontSize'],
            ['font'],
            ['color'],
            ['background'],
            ['border'],
            ['borderRadius'],
            ['cursor'],
            ['padding'],
            ['opacity'],
          ],
        },
        InputSuffix: {
          name: '后缀图标',
          desc: '输入框后缀自定义图标',
          normal: [['color'], ['fontSize'], ['font']],
          hover: [],
          clicked: [],
          disabled: [],
        },
        InputPrefix: {
          name: '前缀图标',
          desc: '输入框前缀自定义图标',
          normal: [['color'], ['fontSize'], ['font']],
          hover: [],
          clicked: [],
          disabled: [],
        },
        InputClearButton: {
          name: '输入框清除图标',
          desc: '输入框后缀清除图标',
          normal: [['color'], ['fontSize']],
          hover: [],
          clicked: [],
          disabled: [],
        },
      },
      childrenWidget: [],
    },
    target: Input,
    screenshot:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAAAoCAYAAAABk/85AAAAAXNSR0IArs4c6QAAAahJREFUaAXtmzFug0AQRb0oElzBygXo0uQAqZM7hA4o00Q+Q5QmJdCRIjdIah/ATTouEHEFqMiMky1SeSx5+UH+SNYKPOzffZ9Z2cC4lWxt216O4/g8TdON7K71GLdgBHrn3DaO48csy76cwh+GYScHX8SA16Io+mDS7HhV1/VaWN8L64ckSa5d0zRvwuUzz/Mn8pmPgHDfiNpVpMuOXvnzSVNJCShzZa8pMREJhoCyjzDSVPUEaIAnAWppAAi8l6UBngSopQEg8F7WbEBVVe/68SeyPQ2BC2s38pv11hrLODsBcwbYu2TkMQRowDG0AsSal6BD2l3Xmf5Rp2nqtK/Q8YfG+1++ZwaAnaABNABMACzPDKABYAJgeWYADQATAMszA2gAmABYnhlAA8AEwPLMABoAJgCWP9ndUH+X0zqf0PHWcaDjuASBHaABYAPMS5C80fshYzU9dAHPaVHyZgPKsrxb1MwWMlguQWCjaAANABMAy2sG9Fo2Ax7H2cn/Mu8jLRjTmqWzIwCesDLfs2eR3rxO6JWv8OVVz58iPZVnmeqsJvwpU/0GCaF51U2BFrUAAAAASUVORK5CYII=',
  },
  {
    meta: {
      widgetName: 'Label',
      title: '文本',
      desc: '文本组件',
      props: { text: { type: 'string', desc: '文本内容', defaultValue: 'Label' } },
      events: {},
      category: ['数据展示'],
      theme: {
        LabelConfig: {
          name: '文本',
          desc: '文本的样式',
          normal: [['color'], ['font'], ['lineHeight'], ['margin'], ['padding'], ['cursor']],
          hover: [['color'], ['font'], ['margin'], ['padding'], ['cursor']],
          disabled: [['cursor']],
        },
      },
      childrenWidget: [],
    },
    target: Label,
    screenshot:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAANlJREFUWAljZICCwNhkHca/v0VhfFrS/5lZX69fPPcKyA5GEBEUkZDw7//f+SA2vQATI3PiuhULFjCBLGRkZPgApP7Qy3KQXVA7ISEAsjgyMk3kD/NfAWId8e/vX52///6uB6lnZmIOZGJmBgcpMfpZ/jJ/WL581huQWnAUEKMJXU1AVLwxw99/Z8DizEwmG5YtPIuuhhg+OAqIUUgrNaMOGA2B0RAYDYHREBgNgdEQGA2B0RAYDYHREBgNAbJDgJWH/Q6wY/UZhCFsWnVd8JgL6k+CMB4lBKUAJS0xPyQr+iIAAAAASUVORK5CYII=',
  },
  {
    meta: {
      widgetName: 'Loading',
      title: '加载中',
      desc: '用于页面和区块的加载中状态',
      props: {
        size: {
          type: 'sizeType',
          desc: 'Loading尺寸大小 small|default|large',
          defaultValue: 'default',
        },
        delay: { type: 'number', desc: '延迟加载时间' },
        scale: { type: 'boolean', desc: '是否缩放', defaultValue: false },
        iconClass: { type: 'string', desc: '自定义Loading,iconClass接受一个图标名的字符串' },
        tip: { type: 'string', desc: '自定义Loading加载文本' },
        children: { type: 'any', desc: 'Loading组件允许内嵌容器' },
        data: { type: 'any', desc: '与children属性一样，在Loading组件内嵌入内容' },
      },
      type: { sizeType: ['default', 'small', 'large'] },
      category: ['其他'],
      childrenWidget: [],
    },
    target: Loading,
    screenshot:
      'data:image/png;base64,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',
  },
  {
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
          type: 'Object[]',
          desc: '生成选择项的数据',
          meta: [
            { key: 'value', title: 'value值', type: 'string' },
            { key: 'text', title: '文本值', type: 'string' },
          ],
          defaultValue: false,
        },
        mutliple: { type: 'boolean', desc: '是否多选', defaultValue: false },
        start: { type: 'number', desc: '开始展示数据的索引值', defaultValue: 0 },
        selectedKeys: { type: 'string | string[] | number | number[]', desc: '指定当前选中的项' },
        defaultSelectedKeys: {
          type: 'string | string[] | number | number[]',
          desc: '默认指定当前选中的项,仅第一次生效',
        },
        checkedCSS: {
          type: 'background | checkbox | none',
          desc: '选中项的样式',
          defaultValue: 'none',
        },
        limitCount: { type: 'number', desc: '多选时的最大选中数', defaultValue: 999999 },
        offsety: { type: 'number', desc: '菜单间的间隔', defaultValue: 4 },
        autoHeight: { type: 'boolean', desc: '根据data数量，自动计算菜单高度' },
        expandedPath: { type: 'string[]', desc: '层级菜单时展开的数据' },
        separator: { type: 'string', desc: '层级菜单时连接层级数据的分隔符', defaultValue: '|' },
        offsetX: { type: 'number', desc: '层级菜单时，菜单间的间隔', defaultValue: 4 },
        offsetY: { type: 'string', desc: '层级菜单时，子菜单相对父级菜单的top值' },
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
        popupVisible: { type: 'boolean', desc: '层级菜单,是否允许打开子菜单', defaultValue: true },
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
      designInfo: {
        MutlipleMenu: {
          sequence: 1,
          title: '多选菜单',
          desc: '多项选择的菜单',
          props: { mutliple: true },
          theme: {
            MenuWrap: {
              name: '菜单外盒',
              desc: '配置菜单组件的外盒样式',
              normal: [
                ['width'],
                ['height'],
                ['boxShadow'],
                ['background'],
                ['opacity'],
                ['border'],
                ['borderRadius'],
                ['margin'],
                ['padding'],
              ],
              hover: [['boxShadow'], ['background'], ['opacity'], ['border'], ['borderRadius']],
              clicked: [],
              disabled: [],
            },
            MenuItem: {
              name: '多选菜单项配置',
              theme: {
                MenuItemWrap: {
                  name: '项的外盒',
                  desc: '配置每一项的外盒',
                  normal: [
                    ['height'],
                    ['background'],
                    ['border'],
                    ['borderRadius'],
                    ['opacity'],
                    ['color'],
                    ['padding'],
                  ],
                  hover: [
                    ['background'],
                    ['border'],
                    ['borderRadius'],
                    ['opacity'],
                    ['color'],
                    ['font'],
                  ],
                  active: [
                    ['background'],
                    ['border'],
                    ['borderRadius'],
                    ['opacity'],
                    ['color'],
                    ['font'],
                  ],
                  disabled: [
                    ['background'],
                    ['color'],
                    ['borderRadius'],
                    ['opacity'],
                    ['padding'],
                    ['font'],
                  ],
                },
                SelectedMenuItemWrap: {
                  name: '选中项的外盒',
                  desc: '配置选中项的外盒',
                  normal: [
                    ['background'],
                    ['border'],
                    ['borderRadius'],
                    ['opacity'],
                    ['color'],
                    ['padding'],
                    ['font'],
                  ],
                  hover: [
                    ['background'],
                    ['border'],
                    ['borderRadius'],
                    ['opacity'],
                    ['color'],
                    ['font'],
                  ],
                  active: [
                    ['background'],
                    ['border'],
                    ['borderRadius'],
                    ['opacity'],
                    ['color'],
                    ['font'],
                  ],
                  disabled: [],
                },
                Divider: {
                  name: '分割线',
                  desc: '配置每项之间的分割线，当divided为true时生效',
                  normal: [['background']],
                  hover: [],
                  active: [],
                  disabled: [],
                },
                Checkbox: {
                  name: '多选菜单选择器配置',
                  theme: {
                    CheckboxWrap: {
                      name: 'Checkbox整体配置',
                      desc: 'Checkbox整体配置',
                      normal: [['opacity'], ['margin'], ['padding'], ['width'], ['height']],
                      hover: [['opacity']],
                      disabled: [['opacity']],
                    },
                    CheckboxText: {
                      name: 'Checkbox文字配置',
                      desc: 'Checkbox文字配置',
                      normal: [['color'], ['font']],
                      hover: [['color'], ['font']],
                      disabled: [['color'], ['font']],
                    },
                    CheckboxEdgeChecked: {
                      name: 'Checkbox选中后边框配置',
                      desc: 'Checkbox选中后边框配置样式',
                      normal: [['background'], ['borderRadius'], ['border']],
                      hover: [['background'], ['borderRadius'], ['border']],
                      disabled: [['background'], ['borderRadius'], ['border']],
                    },
                    CheckboxEdgeUnChecked: {
                      name: 'Checkbox未选中边框配置',
                      desc: 'Checkbox未选中边框配置样式',
                      normal: [['background'], ['borderRadius'], ['border']],
                      hover: [['background'], ['borderRadius'], ['border']],
                      disabled: [['background'], ['borderRadius'], ['border']],
                    },
                    CheckboxInnerChecked: {
                      name: 'Checkbox选中样式配置',
                      desc: 'Checkbox选中样式配置',
                      normal: [['color']],
                      hover: [['color']],
                      disabled: [['color']],
                    },
                  },
                },
              },
            },
          },
        },
        CascaderMenu: {
          sequence: 3,
          title: '多级菜单',
          desc: '支持展开的菜单',
          props: { mutliple: false },
          theme: {
            MenuWrap: {
              name: '菜单外盒',
              desc: '配置菜单组件的外盒样式',
              normal: [
                ['width'],
                ['height'],
                ['boxShadow'],
                ['background'],
                ['opacity'],
                ['border'],
                ['borderRadius'],
                ['margin'],
                ['padding'],
              ],
              hover: [['boxShadow'], ['background'], ['opacity'], ['border'], ['borderRadius']],
              clicked: [],
              disabled: [],
            },
            MenuItem: {
              name: '多级菜单项配置',
              theme: {
                MenuItemWrap: {
                  name: '项的外盒',
                  desc: '配置每一项的外盒',
                  normal: [
                    ['height'],
                    ['background'],
                    ['border'],
                    ['borderRadius'],
                    ['opacity'],
                    ['color'],
                    ['padding'],
                  ],
                  hover: [
                    ['background'],
                    ['border'],
                    ['borderRadius'],
                    ['opacity'],
                    ['color'],
                    ['font'],
                  ],
                  active: [
                    ['background'],
                    ['border'],
                    ['borderRadius'],
                    ['opacity'],
                    ['color'],
                    ['font'],
                  ],
                  disabled: [
                    ['background'],
                    ['color'],
                    ['borderRadius'],
                    ['opacity'],
                    ['padding'],
                    ['font'],
                  ],
                },
                SelectedMenuItemWrap: {
                  name: '选中项的外盒',
                  desc: '配置选中项的外盒',
                  normal: [
                    ['background'],
                    ['border'],
                    ['borderRadius'],
                    ['opacity'],
                    ['color'],
                    ['padding'],
                    ['font'],
                  ],
                  hover: [
                    ['background'],
                    ['border'],
                    ['borderRadius'],
                    ['opacity'],
                    ['color'],
                    ['font'],
                  ],
                  active: [
                    ['background'],
                    ['border'],
                    ['borderRadius'],
                    ['opacity'],
                    ['color'],
                    ['font'],
                  ],
                  disabled: [],
                },
                Divider: {
                  name: '分割线',
                  desc: '配置每项之间的分割线，当divided为true时生效',
                  normal: [['background']],
                  hover: [],
                  active: [],
                  disabled: [],
                },
              },
            },
            SubMenu: {
              name: '子菜单配置',
              theme: {
                MenuWrap: {
                  name: '菜单外盒',
                  desc: '配置菜单组件的外盒样式',
                  normal: [
                    ['width'],
                    ['height'],
                    ['boxShadow'],
                    ['background'],
                    ['opacity'],
                    ['border'],
                    ['borderRadius'],
                    ['margin'],
                    ['padding'],
                  ],
                  hover: [['boxShadow'], ['background'], ['opacity'], ['border'], ['borderRadius']],
                  clicked: [],
                  disabled: [],
                },
                MenuItem: {
                  name: '子菜单的项配置',
                  theme: {
                    MenuItemWrap: {
                      name: '项的外盒',
                      desc: '配置每一项的外盒',
                      normal: [
                        ['height'],
                        ['background'],
                        ['border'],
                        ['borderRadius'],
                        ['opacity'],
                        ['color'],
                        ['padding'],
                      ],
                      hover: [
                        ['background'],
                        ['border'],
                        ['borderRadius'],
                        ['opacity'],
                        ['color'],
                        ['font'],
                      ],
                      active: [
                        ['background'],
                        ['border'],
                        ['borderRadius'],
                        ['opacity'],
                        ['color'],
                        ['font'],
                      ],
                      disabled: [
                        ['background'],
                        ['color'],
                        ['borderRadius'],
                        ['opacity'],
                        ['padding'],
                        ['font'],
                      ],
                    },
                    SelectedMenuItemWrap: {
                      name: '选中项的外盒',
                      desc: '配置选中项的外盒',
                      normal: [
                        ['background'],
                        ['border'],
                        ['borderRadius'],
                        ['opacity'],
                        ['color'],
                        ['padding'],
                        ['font'],
                      ],
                      hover: [
                        ['background'],
                        ['border'],
                        ['borderRadius'],
                        ['opacity'],
                        ['color'],
                        ['font'],
                      ],
                      active: [
                        ['background'],
                        ['border'],
                        ['borderRadius'],
                        ['opacity'],
                        ['color'],
                        ['font'],
                      ],
                      disabled: [],
                    },
                    Divider: {
                      name: '分割线',
                      desc: '配置每项之间的分割线，当divided为true时生效',
                      normal: [['background']],
                      hover: [],
                      active: [],
                      disabled: [],
                    },
                  },
                },
              },
            },
          },
        },
      },
      theme: {
        MenuWrap: {
          name: '菜单外盒',
          desc: '配置菜单组件的外盒样式',
          normal: [
            ['width'],
            ['height'],
            ['boxShadow'],
            ['background'],
            ['opacity'],
            ['border'],
            ['borderRadius'],
            ['margin'],
            ['padding'],
          ],
          hover: [['boxShadow'], ['background'], ['opacity'], ['border'], ['borderRadius']],
          clicked: [],
          disabled: [],
        },
        MenuItem: {
          name: '单选菜单项配置',
          theme: {
            MenuItemWrap: {
              name: '项的外盒',
              desc: '配置每一项的外盒',
              normal: [
                ['height'],
                ['background'],
                ['border'],
                ['borderRadius'],
                ['opacity'],
                ['color'],
                ['padding'],
              ],
              hover: [
                ['background'],
                ['border'],
                ['borderRadius'],
                ['opacity'],
                ['color'],
                ['font'],
              ],
              active: [
                ['background'],
                ['border'],
                ['borderRadius'],
                ['opacity'],
                ['color'],
                ['font'],
              ],
              disabled: [
                ['background'],
                ['color'],
                ['borderRadius'],
                ['opacity'],
                ['padding'],
                ['font'],
              ],
            },
            SelectedMenuItemWrap: {
              name: '选中项的外盒',
              desc: '配置选中项的外盒',
              normal: [
                ['background'],
                ['border'],
                ['borderRadius'],
                ['opacity'],
                ['color'],
                ['padding'],
                ['font'],
              ],
              hover: [
                ['background'],
                ['border'],
                ['borderRadius'],
                ['opacity'],
                ['color'],
                ['font'],
              ],
              active: [
                ['background'],
                ['border'],
                ['borderRadius'],
                ['opacity'],
                ['color'],
                ['font'],
              ],
              disabled: [],
            },
            Divider: {
              name: '分割线',
              desc: '配置每项之间的分割线，当divided为true时生效',
              normal: [['background']],
              hover: [],
              active: [],
              disabled: [],
            },
            Checkbox: {
              name: '单选菜单选择器配置',
              theme: {
                CheckboxWrap: {
                  name: 'Checkbox整体配置',
                  desc: 'Checkbox整体配置',
                  normal: [['opacity'], ['margin'], ['padding'], ['width'], ['height']],
                  hover: [['opacity']],
                  disabled: [['opacity']],
                },
                CheckboxText: {
                  name: 'Checkbox文字配置',
                  desc: 'Checkbox文字配置',
                  normal: [['color'], ['font']],
                  hover: [['color'], ['font']],
                  disabled: [['color'], ['font']],
                },
                CheckboxEdgeChecked: {
                  name: 'Checkbox选中后边框配置',
                  desc: 'Checkbox选中后边框配置样式',
                  normal: [['background'], ['borderRadius'], ['border']],
                  hover: [['background'], ['borderRadius'], ['border']],
                  disabled: [['background'], ['borderRadius'], ['border']],
                },
                CheckboxEdgeUnChecked: {
                  name: 'Checkbox未选中边框配置',
                  desc: 'Checkbox未选中边框配置样式',
                  normal: [['background'], ['borderRadius'], ['border']],
                  hover: [['background'], ['borderRadius'], ['border']],
                  disabled: [['background'], ['borderRadius'], ['border']],
                },
                CheckboxInnerChecked: {
                  name: 'Checkbox选中样式配置',
                  desc: 'Checkbox选中样式配置',
                  normal: [['color']],
                  hover: [['color']],
                  disabled: [['color']],
                },
              },
            },
          },
        },
      },
      childrenWidget: [],
    },
    target: Menu,
    screenshot:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABMCAYAAACbHRIPAAAAAXNSR0IArs4c6QAAAtFJREFUeAHtnT9KA0EUxvdfVAKBCHb2SSUEcgIhrQdIlTN4EQVvkMYcwDbgCQIBq6QXLAQLMUSSoPvCCotMscx8s29Cvq2WceZ7b3+/TERWmDjKr/F4fLnZbO7z28FutzuXMV71EEjT9COvNG00Grej0eg1LmS89Pv9VqfTyZrNZj2dsMqewGq1ipbL5XY2m33mUq4y2Rkio9frZWRUPwHZAAX7Vi7lPslbGMjOqL8VViwTKBwMEvmdwa+pMhqde3EgLmSH8AqIAIUEJENaoRAKCYxAYO1wh1BIYAQCa4c7JDAh1n8QLhaLSo/S7Xb38w59fqWHBUziDgFAREZQCJImIItCABCRERSCpAnIohAARGQEhSBpArIoBAARGUEhSJqALAoBQERGUAiSJiCLQgAQkREUgqQJyKIQAERkBIUgaQKyKAQAERlh/T7k7z1H1WYOfX7V53Sdxx3iShC8nkLAQF3jKMSVIHg9hYCBusZRiCtB8HoKAQN1jaMQV4Lg9RQCBuoaRyGuBMHrs6/vVvT2Dk5lnBUBccEdYoXO3yIK8cfWKplCrLD5W0Qh/thaJVOIFTZ/iyjEH1urZAqxwuZvEYX4Y2uVTCFW2Pwtsn6n/vz8VKmr6+ub/bxjm18JjmESd4gBiuYQhWjSN9SmEAMUzSEK0aRvqE0hBiiaQxSiSd9Qm0IMUDSHKESTvqE2hRigaA5RiCZ9Q20KMUDRHKIQTfqG2hRigKI5RCGa9A21KcQARXMovnt4/BkOh5o9sHZBYDKZ8D8XQ/s08CsrMCMUEpqQJP4JrKXjbUdcJEmyO14CgT25uEhO0nVuJbDOjrAdcbB3Eefb5KIdRWenUZRSTO0fBWEu7MWBuMjkHL31enXebvG4vNptlArK8XniQvbEVM7RK/2MtwoECgfTRE6YlEMN5/P5VizxqpeAMBf2xcGSt7GU59Gr9UooV/t/9Oov796X9Hh6uxgAAAAASUVORK5CYII=',
  },
  {
    meta: {
      widgetName: 'Menu',
      title: '多选菜单',
      desc: '多项选择的菜单',
      props: {
        valueField: { type: 'string', desc: 'data数据的value值的名称', defaultValue: 'value' },
        displayField: {
          type: 'string',
          desc: 'data数据的displayValue值的名称',
          defaultValue: 'text',
        },
        data: {
          type: 'Object[]',
          desc: '生成选择项的数据',
          meta: [
            { key: 'value', title: 'value值', type: 'string' },
            { key: 'text', title: '文本值', type: 'string' },
          ],
          defaultValue: false,
        },
        mutliple: { type: 'boolean', desc: '是否多选', defaultValue: true },
        start: { type: 'number', desc: '开始展示数据的索引值', defaultValue: 0 },
        selectedKeys: { type: 'string | string[] | number | number[]', desc: '指定当前选中的项' },
        defaultSelectedKeys: {
          type: 'string | string[] | number | number[]',
          desc: '默认指定当前选中的项,仅第一次生效',
        },
        checkedCSS: {
          type: 'background | checkbox | none',
          desc: '选中项的样式',
          defaultValue: 'none',
        },
        limitCount: { type: 'number', desc: '多选时的最大选中数', defaultValue: 999999 },
        offsety: { type: 'number', desc: '菜单间的间隔', defaultValue: 4 },
        autoHeight: { type: 'boolean', desc: '根据data数量，自动计算菜单高度' },
        expandedPath: { type: 'string[]', desc: '层级菜单时展开的数据' },
        separator: { type: 'string', desc: '层级菜单时连接层级数据的分隔符', defaultValue: '|' },
        offsetX: { type: 'number', desc: '层级菜单时，菜单间的间隔', defaultValue: 4 },
        offsetY: { type: 'string', desc: '层级菜单时，子菜单相对父级菜单的top值' },
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
        popupVisible: { type: 'boolean', desc: '层级菜单,是否允许打开子菜单', defaultValue: true },
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
      theme: {
        MenuWrap: {
          name: '菜单外盒',
          desc: '配置菜单组件的外盒样式',
          normal: [
            ['width'],
            ['height'],
            ['boxShadow'],
            ['background'],
            ['opacity'],
            ['border'],
            ['borderRadius'],
            ['margin'],
            ['padding'],
          ],
          hover: [['boxShadow'], ['background'], ['opacity'], ['border'], ['borderRadius']],
          clicked: [],
          disabled: [],
        },
        MenuItem: {
          name: '多选菜单项配置',
          theme: {
            MenuItemWrap: {
              name: '项的外盒',
              desc: '配置每一项的外盒',
              normal: [
                ['height'],
                ['background'],
                ['border'],
                ['borderRadius'],
                ['opacity'],
                ['color'],
                ['padding'],
              ],
              hover: [
                ['background'],
                ['border'],
                ['borderRadius'],
                ['opacity'],
                ['color'],
                ['font'],
              ],
              active: [
                ['background'],
                ['border'],
                ['borderRadius'],
                ['opacity'],
                ['color'],
                ['font'],
              ],
              disabled: [
                ['background'],
                ['color'],
                ['borderRadius'],
                ['opacity'],
                ['padding'],
                ['font'],
              ],
            },
            SelectedMenuItemWrap: {
              name: '选中项的外盒',
              desc: '配置选中项的外盒',
              normal: [
                ['background'],
                ['border'],
                ['borderRadius'],
                ['opacity'],
                ['color'],
                ['padding'],
                ['font'],
              ],
              hover: [
                ['background'],
                ['border'],
                ['borderRadius'],
                ['opacity'],
                ['color'],
                ['font'],
              ],
              active: [
                ['background'],
                ['border'],
                ['borderRadius'],
                ['opacity'],
                ['color'],
                ['font'],
              ],
              disabled: [],
            },
            Divider: {
              name: '分割线',
              desc: '配置每项之间的分割线，当divided为true时生效',
              normal: [['background']],
              hover: [],
              active: [],
              disabled: [],
            },
            Checkbox: {
              name: '多选菜单选择器配置',
              theme: {
                CheckboxWrap: {
                  name: 'Checkbox整体配置',
                  desc: 'Checkbox整体配置',
                  normal: [['opacity'], ['margin'], ['padding'], ['width'], ['height']],
                  hover: [['opacity']],
                  disabled: [['opacity']],
                },
                CheckboxText: {
                  name: 'Checkbox文字配置',
                  desc: 'Checkbox文字配置',
                  normal: [['color'], ['font']],
                  hover: [['color'], ['font']],
                  disabled: [['color'], ['font']],
                },
                CheckboxEdgeChecked: {
                  name: 'Checkbox选中后边框配置',
                  desc: 'Checkbox选中后边框配置样式',
                  normal: [['background'], ['borderRadius'], ['border']],
                  hover: [['background'], ['borderRadius'], ['border']],
                  disabled: [['background'], ['borderRadius'], ['border']],
                },
                CheckboxEdgeUnChecked: {
                  name: 'Checkbox未选中边框配置',
                  desc: 'Checkbox未选中边框配置样式',
                  normal: [['background'], ['borderRadius'], ['border']],
                  hover: [['background'], ['borderRadius'], ['border']],
                  disabled: [['background'], ['borderRadius'], ['border']],
                },
                CheckboxInnerChecked: {
                  name: 'Checkbox选中样式配置',
                  desc: 'Checkbox选中样式配置',
                  normal: [['color']],
                  hover: [['color']],
                  disabled: [['color']],
                },
              },
            },
          },
        },
      },
      childrenWidget: [],
      aliasName: 'MutlipleMenu',
    },
    target: Menu,
    screenshot:
      'data:image/png;base64,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',
  },
  {
    meta: {
      widgetName: 'Menu',
      title: '多级菜单',
      desc: '支持展开的菜单',
      props: {
        valueField: { type: 'string', desc: 'data数据的value值的名称', defaultValue: 'value' },
        displayField: {
          type: 'string',
          desc: 'data数据的displayValue值的名称',
          defaultValue: 'text',
        },
        data: {
          type: 'Object[]',
          desc: '生成选择项的数据',
          meta: [
            { key: 'value', title: 'value值', type: 'string' },
            { key: 'text', title: '文本值', type: 'string' },
          ],
          defaultValue: false,
        },
        mutliple: { type: 'boolean', desc: '是否多选', defaultValue: false },
        start: { type: 'number', desc: '开始展示数据的索引值', defaultValue: 0 },
        selectedKeys: { type: 'string | string[] | number | number[]', desc: '指定当前选中的项' },
        defaultSelectedKeys: {
          type: 'string | string[] | number | number[]',
          desc: '默认指定当前选中的项,仅第一次生效',
        },
        checkedCSS: {
          type: 'background | checkbox | none',
          desc: '选中项的样式',
          defaultValue: 'none',
        },
        limitCount: { type: 'number', desc: '多选时的最大选中数', defaultValue: 999999 },
        offsety: { type: 'number', desc: '菜单间的间隔', defaultValue: 4 },
        autoHeight: { type: 'boolean', desc: '根据data数量，自动计算菜单高度' },
        expandedPath: { type: 'string[]', desc: '层级菜单时展开的数据' },
        separator: { type: 'string', desc: '层级菜单时连接层级数据的分隔符', defaultValue: '|' },
        offsetX: { type: 'number', desc: '层级菜单时，菜单间的间隔', defaultValue: 4 },
        offsetY: { type: 'string', desc: '层级菜单时，子菜单相对父级菜单的top值' },
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
        popupVisible: { type: 'boolean', desc: '层级菜单,是否允许打开子菜单', defaultValue: true },
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
      theme: {
        MenuWrap: {
          name: '菜单外盒',
          desc: '配置菜单组件的外盒样式',
          normal: [
            ['width'],
            ['height'],
            ['boxShadow'],
            ['background'],
            ['opacity'],
            ['border'],
            ['borderRadius'],
            ['margin'],
            ['padding'],
          ],
          hover: [['boxShadow'], ['background'], ['opacity'], ['border'], ['borderRadius']],
          clicked: [],
          disabled: [],
        },
        MenuItem: {
          name: '多级菜单项配置',
          theme: {
            MenuItemWrap: {
              name: '项的外盒',
              desc: '配置每一项的外盒',
              normal: [
                ['height'],
                ['background'],
                ['border'],
                ['borderRadius'],
                ['opacity'],
                ['color'],
                ['padding'],
              ],
              hover: [
                ['background'],
                ['border'],
                ['borderRadius'],
                ['opacity'],
                ['color'],
                ['font'],
              ],
              active: [
                ['background'],
                ['border'],
                ['borderRadius'],
                ['opacity'],
                ['color'],
                ['font'],
              ],
              disabled: [
                ['background'],
                ['color'],
                ['borderRadius'],
                ['opacity'],
                ['padding'],
                ['font'],
              ],
            },
            SelectedMenuItemWrap: {
              name: '选中项的外盒',
              desc: '配置选中项的外盒',
              normal: [
                ['background'],
                ['border'],
                ['borderRadius'],
                ['opacity'],
                ['color'],
                ['padding'],
                ['font'],
              ],
              hover: [
                ['background'],
                ['border'],
                ['borderRadius'],
                ['opacity'],
                ['color'],
                ['font'],
              ],
              active: [
                ['background'],
                ['border'],
                ['borderRadius'],
                ['opacity'],
                ['color'],
                ['font'],
              ],
              disabled: [],
            },
            Divider: {
              name: '分割线',
              desc: '配置每项之间的分割线，当divided为true时生效',
              normal: [['background']],
              hover: [],
              active: [],
              disabled: [],
            },
          },
        },
        SubMenu: {
          name: '子菜单配置',
          theme: {
            MenuWrap: {
              name: '菜单外盒',
              desc: '配置菜单组件的外盒样式',
              normal: [
                ['width'],
                ['height'],
                ['boxShadow'],
                ['background'],
                ['opacity'],
                ['border'],
                ['borderRadius'],
                ['margin'],
                ['padding'],
              ],
              hover: [['boxShadow'], ['background'], ['opacity'], ['border'], ['borderRadius']],
              clicked: [],
              disabled: [],
            },
            MenuItem: {
              name: '子菜单的项配置',
              theme: {
                MenuItemWrap: {
                  name: '项的外盒',
                  desc: '配置每一项的外盒',
                  normal: [
                    ['height'],
                    ['background'],
                    ['border'],
                    ['borderRadius'],
                    ['opacity'],
                    ['color'],
                    ['padding'],
                  ],
                  hover: [
                    ['background'],
                    ['border'],
                    ['borderRadius'],
                    ['opacity'],
                    ['color'],
                    ['font'],
                  ],
                  active: [
                    ['background'],
                    ['border'],
                    ['borderRadius'],
                    ['opacity'],
                    ['color'],
                    ['font'],
                  ],
                  disabled: [
                    ['background'],
                    ['color'],
                    ['borderRadius'],
                    ['opacity'],
                    ['padding'],
                    ['font'],
                  ],
                },
                SelectedMenuItemWrap: {
                  name: '选中项的外盒',
                  desc: '配置选中项的外盒',
                  normal: [
                    ['background'],
                    ['border'],
                    ['borderRadius'],
                    ['opacity'],
                    ['color'],
                    ['padding'],
                    ['font'],
                  ],
                  hover: [
                    ['background'],
                    ['border'],
                    ['borderRadius'],
                    ['opacity'],
                    ['color'],
                    ['font'],
                  ],
                  active: [
                    ['background'],
                    ['border'],
                    ['borderRadius'],
                    ['opacity'],
                    ['color'],
                    ['font'],
                  ],
                  disabled: [],
                },
                Divider: {
                  name: '分割线',
                  desc: '配置每项之间的分割线，当divided为true时生效',
                  normal: [['background']],
                  hover: [],
                  active: [],
                  disabled: [],
                },
              },
            },
          },
        },
      },
      childrenWidget: [],
      aliasName: 'CascaderMenu',
    },
    target: Menu,
    screenshot:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHAAAABMCAYAAAC1WDOdAAAAAXNSR0IArs4c6QAAA/NJREFUeAHtncFr02AYxr+lrYVKkQ1hsh5EDxsTB4X9BYNeBfHiRQiiXrz1LxmIpzHE4s2LiNfA/oJCoBdbdpK1sMsmrRZKmuL7hmSEsZe02zJ8vr2BLembr9nzPL+8KSXtviVDS6vVqgVBsEubjTAMl7lmy1IoFE7Ji1cqlZqu6/bTvnzfr81ms8g3rSF8O44T+aF1s16v95dieJ3t7e3q+vp6sVKppD3Cb4/HY9Pr9abtdntEELcSiDG8ztraWnVlZaVI+yC8UqOZk5OT6WAwGBHELYc7j+ERTevgMRE+Idkbe4yvMhEo7jyGt7q6CgOPhfOJxppZO3twqNbgzotcWfwr9thIWWxw56UeQ23G2hvF4biyTD9mOIbSfwmx7LFy9jrHr3kol82LzLJ29sAdqAtwAgoQGB5LV4AKEDwBcPnagQoQPAFw+dqB4AAz38geHPyYy+LOzrNoXN7j5xJzDYO63e5cR9nY2IjG5T1eEqMdKCUDUleAIKAkmdYAnEwmkker69YA/Pb9q+l0fKthXWTOGoDD4W/z+cse3fv7eZFPa2vWAHQKBRMEE7P/6aM5POxZC+y8MWsAsjG6vWL+jv+Yvf0P5ujo13mvVj62CmBCKJgGJginyUOr15lv5JHc02dE6CMHZfP29Xvz6OFjJOmX1mpNB87C0BRLd8wbgre5+fTSgaA90RqA1eo94756Z57cInh8sllzCX3x/KUpl8toDXRlvdZ04G2Ex/StAXjlUxn0AAoQFFwiO/M1MLnPlzwha533+Ky/f137k/t88x4v7/GSDu1AKRmQugIEASXJVIBSMiB1BQgCSpKpAKVkQOoKEASUJFMBSsmA1BUgCChJpgKUkgGpF++WR+bBfRC1V5TJXm1btAPBiSpABQieALh87UAFCJ4AuHztQAUIngC4fO1ABQieALj8zM/E5P3d70WPf1N5L6or7/GSb72ESsmA1BUgCChJpgKUkgGpK0AQUJJMBSglA1JXgCCgJJkKUEoGpK4AQUBJMhWglAxIXQGCgJJkKkApGZC6AgQBJclUgFIyIHUFCAJKkqkApWRA6pn3A/P+7veix7+pXBfVlfd4ybd2oJQMSF0BgoCSZCpAKRmQugIEASXJVIBSMiB1BQgCSpKpAKVkQOr0z94LpzxVt+0Le4znlI+s8nzsPKU36sLa2QN3oMfzrKMamVd37NFLjfd4PvbUY6jNWLvn0GzIzXa7PfJ9f2pjJ7In9sYe2WtCic7e5mAwGB0fH0+ROpG1smbWzh6W2FCr1arRjl3abIRheDZVd2IWeR1fNj2G57puP+2FwNZoronIN0/pnd73v27zZZO0eQyvXq/3/wFI4CMUoIX4vwAAAABJRU5ErkJggg==',
  },
  {
    meta: {
      widgetName: 'Navmenu',
      title: '导航菜单',
      desc: '为页面提供导航功能的菜单',
      props: {
        valueField: { type: 'string', desc: 'data数据的value值的名称', defaultValue: 'value' },
        displayField: {
          type: 'string',
          desc: 'data数据的displayValue值的名称',
          defaultValue: 'text',
        },
        data: {
          type: 'Object[]',
          desc: '生成选择项的数据',
          meta: [
            { key: 'value', title: 'value值', type: 'string' },
            { key: 'text', title: '文本值', type: 'string' },
          ],
        },
        value: { type: 'string | string[] | number | number[]', desc: '指定当前选中的条目' },
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
        themeStyle: {
          type: 'light | dark',
          desc: '菜单类型为inline(内嵌模式)时,支持两种主题',
          defaultValue: 'light',
        },
        inlineExpandAll: {
          type: 'boolean',
          desc: '菜单类型为inline(内嵌模式)时,是否展开所有子元素,默认为true',
          defaultValue: true,
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
      designInfo: {
        HorizontalNavMenu: {
          sequence: 1,
          title: '顶部导航菜单',
          desc: '水平的导航菜单',
          props: { mode: 'horizontal' },
          theme: {
            Tabs: {
              name: '水平导航配置',
              theme: {
                TitleContainer: {
                  name: '头部标签区域',
                  desc: '头部标签区域宽度配置',
                  normal: [['width']],
                  hover: [],
                  clicked: [],
                  disabled: [],
                },
                BorderStyle: {
                  name: '默认线',
                  desc: '默认线样式配置',
                  normal: [['border']],
                  hover: [],
                  clicked: [],
                  disabled: [],
                },
                TabHeader: {
                  name: '标签配置',
                  theme: {
                    DefaultTabPan: {
                      name: '默认标签',
                      desc: '默认标签样式配置',
                      normal: [
                        ['color'],
                        ['background'],
                        ['border'],
                        ['margin'],
                        ['padding'],
                        ['font'],
                        ['opacity'],
                      ],
                      hover: [['color'], ['background'], ['border'], ['font'], ['opacity']],
                      clicked: [],
                      disabled: [],
                    },
                    SelectTabPan: {
                      name: '选中标签',
                      desc: '选中标签样式配置',
                      normal: [
                        ['color'],
                        ['background'],
                        ['border'],
                        ['margin'],
                        ['padding'],
                        ['font'],
                        ['opacity'],
                      ],
                      hover: [['color'], ['background'], ['border'], ['font'], ['opacity']],
                      clicked: [],
                      disabled: [],
                    },
                  },
                },
              },
            },
            Menu: {
              name: '弹出菜单配置',
              theme: {
                MenuWrap: {
                  name: '菜单外盒',
                  desc: '配置菜单组件的外盒样式',
                  normal: [
                    ['width'],
                    ['height'],
                    ['boxShadow'],
                    ['background'],
                    ['opacity'],
                    ['border'],
                    ['borderRadius'],
                    ['margin'],
                    ['padding'],
                  ],
                  hover: [['boxShadow'], ['background'], ['opacity'], ['border'], ['borderRadius']],
                  clicked: [],
                  disabled: [],
                },
                MenuItem: {
                  name: '菜单项配置',
                  theme: {
                    MenuItemWrap: {
                      name: '项的外盒',
                      desc: '配置每一项的外盒',
                      normal: [
                        ['height'],
                        ['background'],
                        ['border'],
                        ['borderRadius'],
                        ['opacity'],
                        ['color'],
                        ['padding'],
                      ],
                      hover: [
                        ['background'],
                        ['border'],
                        ['borderRadius'],
                        ['opacity'],
                        ['color'],
                        ['font'],
                      ],
                      active: [
                        ['background'],
                        ['border'],
                        ['borderRadius'],
                        ['opacity'],
                        ['color'],
                        ['font'],
                      ],
                      disabled: [
                        ['background'],
                        ['color'],
                        ['borderRadius'],
                        ['opacity'],
                        ['padding'],
                        ['font'],
                      ],
                    },
                    SelectedMenuItemWrap: {
                      name: '选中项的外盒',
                      desc: '配置选中项的外盒',
                      normal: [
                        ['background'],
                        ['border'],
                        ['borderRadius'],
                        ['opacity'],
                        ['color'],
                        ['padding'],
                        ['font'],
                      ],
                      hover: [
                        ['background'],
                        ['border'],
                        ['borderRadius'],
                        ['opacity'],
                        ['color'],
                        ['font'],
                      ],
                      active: [
                        ['background'],
                        ['border'],
                        ['borderRadius'],
                        ['opacity'],
                        ['color'],
                        ['font'],
                      ],
                      disabled: [],
                    },
                  },
                },
                SubMenu: {
                  name: '子菜单配置',
                  theme: {
                    MenuWrap: {
                      name: '菜单外盒',
                      desc: '配置菜单组件的外盒样式',
                      normal: [
                        ['width'],
                        ['height'],
                        ['boxShadow'],
                        ['background'],
                        ['opacity'],
                        ['border'],
                        ['borderRadius'],
                        ['margin'],
                        ['padding'],
                      ],
                      hover: [
                        ['boxShadow'],
                        ['background'],
                        ['opacity'],
                        ['border'],
                        ['borderRadius'],
                      ],
                      clicked: [],
                      disabled: [],
                    },
                    MenuItem: {
                      name: '子菜单的项配置',
                      theme: {
                        MenuItemWrap: {
                          name: '项的外盒',
                          desc: '配置每一项的外盒',
                          normal: [
                            ['height'],
                            ['background'],
                            ['border'],
                            ['borderRadius'],
                            ['opacity'],
                            ['color'],
                            ['padding'],
                          ],
                          hover: [
                            ['background'],
                            ['border'],
                            ['borderRadius'],
                            ['opacity'],
                            ['color'],
                            ['font'],
                          ],
                          active: [
                            ['background'],
                            ['border'],
                            ['borderRadius'],
                            ['opacity'],
                            ['color'],
                            ['font'],
                          ],
                          disabled: [
                            ['background'],
                            ['color'],
                            ['borderRadius'],
                            ['opacity'],
                            ['padding'],
                            ['font'],
                          ],
                        },
                        SelectedMenuItemWrap: {
                          name: '选中项的外盒',
                          desc: '配置选中项的外盒',
                          normal: [
                            ['background'],
                            ['border'],
                            ['borderRadius'],
                            ['opacity'],
                            ['color'],
                            ['padding'],
                            ['font'],
                          ],
                          hover: [
                            ['background'],
                            ['border'],
                            ['borderRadius'],
                            ['opacity'],
                            ['color'],
                            ['font'],
                          ],
                          active: [
                            ['background'],
                            ['border'],
                            ['borderRadius'],
                            ['opacity'],
                            ['color'],
                            ['font'],
                          ],
                          disabled: [],
                        },
                        Divider: {
                          name: '分割线',
                          desc: '配置每项之间的分割线，当divided为true时生效',
                          normal: [['background']],
                          hover: [],
                          active: [],
                          disabled: [],
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        VerticalNavMenu: {
          sequence: 2,
          title: '垂直导航菜单',
          desc: '子菜单从右侧弹开',
          props: { mode: 'vertical' },
          theme: {
            Menu: {
              name: '垂直导航菜单配置',
              theme: {
                MenuWrap: {
                  name: '菜单外盒',
                  desc: '配置菜单组件的外盒样式',
                  normal: [
                    ['width'],
                    ['height'],
                    ['boxShadow'],
                    ['background'],
                    ['opacity'],
                    ['border'],
                    ['borderRadius'],
                    ['margin'],
                    ['padding'],
                  ],
                  hover: [['boxShadow'], ['background'], ['opacity'], ['border'], ['borderRadius']],
                  clicked: [],
                  disabled: [],
                },
                MenuItem: {
                  name: '菜单项配置',
                  theme: {
                    MenuItemWrap: {
                      name: '项的外盒',
                      desc: '配置每一项的外盒',
                      normal: [
                        ['height'],
                        ['background'],
                        ['border'],
                        ['borderRadius'],
                        ['opacity'],
                        ['color'],
                        ['padding'],
                      ],
                      hover: [
                        ['background'],
                        ['border'],
                        ['borderRadius'],
                        ['opacity'],
                        ['color'],
                        ['font'],
                      ],
                      active: [
                        ['background'],
                        ['border'],
                        ['borderRadius'],
                        ['opacity'],
                        ['color'],
                        ['font'],
                      ],
                      disabled: [
                        ['background'],
                        ['color'],
                        ['borderRadius'],
                        ['opacity'],
                        ['padding'],
                        ['font'],
                      ],
                    },
                    SelectedMenuItemWrap: {
                      name: '选中项的外盒',
                      desc: '配置选中项的外盒',
                      normal: [
                        ['background'],
                        ['border'],
                        ['borderRadius'],
                        ['opacity'],
                        ['color'],
                        ['padding'],
                        ['font'],
                      ],
                      hover: [
                        ['background'],
                        ['border'],
                        ['borderRadius'],
                        ['opacity'],
                        ['color'],
                        ['font'],
                      ],
                      active: [
                        ['background'],
                        ['border'],
                        ['borderRadius'],
                        ['opacity'],
                        ['color'],
                        ['font'],
                      ],
                      disabled: [],
                    },
                  },
                },
                SubMenu: {
                  name: '弹开子菜单配置',
                  theme: {
                    MenuWrap: {
                      name: '菜单外盒',
                      desc: '配置菜单组件的外盒样式',
                      normal: [
                        ['width'],
                        ['height'],
                        ['boxShadow'],
                        ['background'],
                        ['opacity'],
                        ['border'],
                        ['borderRadius'],
                        ['margin'],
                        ['padding'],
                      ],
                      hover: [
                        ['boxShadow'],
                        ['background'],
                        ['opacity'],
                        ['border'],
                        ['borderRadius'],
                      ],
                      clicked: [],
                      disabled: [],
                    },
                    MenuItem: {
                      name: '子菜单的项配置',
                      theme: {
                        MenuItemWrap: {
                          name: '项的外盒',
                          desc: '配置每一项的外盒',
                          normal: [
                            ['height'],
                            ['background'],
                            ['border'],
                            ['borderRadius'],
                            ['opacity'],
                            ['color'],
                            ['padding'],
                          ],
                          hover: [
                            ['background'],
                            ['border'],
                            ['borderRadius'],
                            ['opacity'],
                            ['color'],
                            ['font'],
                          ],
                          active: [
                            ['background'],
                            ['border'],
                            ['borderRadius'],
                            ['opacity'],
                            ['color'],
                            ['font'],
                          ],
                          disabled: [
                            ['background'],
                            ['color'],
                            ['borderRadius'],
                            ['opacity'],
                            ['padding'],
                            ['font'],
                          ],
                        },
                        SelectedMenuItemWrap: {
                          name: '选中项的外盒',
                          desc: '配置选中项的外盒',
                          normal: [
                            ['background'],
                            ['border'],
                            ['borderRadius'],
                            ['opacity'],
                            ['color'],
                            ['padding'],
                            ['font'],
                          ],
                          hover: [
                            ['background'],
                            ['border'],
                            ['borderRadius'],
                            ['opacity'],
                            ['color'],
                            ['font'],
                          ],
                          active: [
                            ['background'],
                            ['border'],
                            ['borderRadius'],
                            ['opacity'],
                            ['color'],
                            ['font'],
                          ],
                          disabled: [],
                        },
                        Divider: {
                          name: '分割线',
                          desc: '配置每项之间的分割线，当divided为true时生效',
                          normal: [['background']],
                          hover: [],
                          active: [],
                          disabled: [],
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        InlineEllipseNavMenu: {
          sequence: 3,
          title: '内嵌导航菜单',
          desc: '点击菜单收起或展开子菜单,ellipse样式',
          props: { mode: 'inline', inlineType: 'ellipse' },
          theme: {
            Tree: {
              name: '内嵌导航菜单配置',
              theme: {
                TreeWrap: {
                  name: '内嵌导航菜单外盒',
                  desc: '配置内嵌导航菜单的外盒样式',
                  normal: [
                    ['width'],
                    ['height'],
                    ['boxShadow'],
                    ['background'],
                    ['opacity'],
                    ['border'],
                    ['borderRadius'],
                    ['margin'],
                    ['padding'],
                  ],
                  hover: [['boxShadow'], ['background'], ['opacity'], ['border'], ['borderRadius']],
                  clicked: [],
                  disabled: [],
                },
                TreeItem: {
                  name: '内嵌导航菜单项配置',
                  theme: {
                    TreeItemWrap: {
                      name: '项的外盒',
                      desc: '配置每一项的外盒',
                      normal: [
                        ['background'],
                        ['border'],
                        ['borderRadius'],
                        ['opacity'],
                        ['color'],
                        ['padding'],
                      ],
                      hover: [['background'], ['border'], ['borderRadius'], ['opacity'], ['color']],
                      active: [
                        ['background'],
                        ['border'],
                        ['borderRadius'],
                        ['opacity'],
                        ['color'],
                      ],
                      disabled: [],
                    },
                    SelectedTreeItemWrap: {
                      name: '选中项的外盒',
                      desc: '配置选中项的外盒',
                      normal: [
                        ['background'],
                        ['border'],
                        ['borderRadius'],
                        ['opacity'],
                        ['color'],
                        ['padding'],
                      ],
                      hover: [['background'], ['border'], ['borderRadius'], ['opacity'], ['color']],
                      active: [
                        ['background'],
                        ['border'],
                        ['borderRadius'],
                        ['opacity'],
                        ['color'],
                      ],
                      disabled: [],
                    },
                    Text: {
                      name: '项的文本',
                      desc: '配置每一项文本内容的样式',
                      normal: [
                        ['color'],
                        ['font'],
                        ['background'],
                        ['padding'],
                        ['border'],
                        ['borderRadius'],
                      ],
                      hover: [['color'], ['font'], ['background'], ['border'], ['borderRadius']],
                      active: [['color'], ['font'], ['background'], ['border'], ['borderRadius']],
                      disabled: [['color'], ['font'], ['background'], ['border'], ['borderRadius']],
                    },
                    SelectedText: {
                      name: '选中项的文本',
                      desc: '配置选中项文本内容的样式',
                      normal: [
                        ['color'],
                        ['font'],
                        ['background'],
                        ['padding'],
                        ['border'],
                        ['borderRadius'],
                      ],
                      hover: [['color'], ['font'], ['background'], ['border'], ['borderRadius']],
                      active: [['color'], ['font'], ['background'], ['border'], ['borderRadius']],
                      disabled: [['color'], ['font'], ['background'], ['border'], ['borderRadius']],
                    },
                    Switch: {
                      name: '控制器配置',
                      desc: '配置控制树节点展开或隐藏的控制器的样式',
                      normal: [['color'], ['font']],
                      hover: [['color'], ['font']],
                      active: [['color'], ['font']],
                      disabled: [['color'], ['font']],
                    },
                    SubTreeWrap: {
                      name: '嵌套中的导航菜单外盒',
                      desc: '配置嵌套中的导航菜单外盒的样式',
                      normal: [
                        ['width'],
                        ['background'],
                        ['opacity'],
                        ['border'],
                        ['margin'],
                        ['padding', 'left'],
                        ['padding', 'right'],
                      ],
                      hover: [['background'], ['opacity'], ['border']],
                      active: [],
                      disabled: [],
                    },
                  },
                },
              },
            },
          },
        },
      },
      theme: {
        Tree: {
          name: '内嵌导航菜单配置',
          theme: {
            TreeWrap: {
              name: '内嵌导航菜单外盒',
              desc: '配置内嵌导航菜单的外盒样式',
              normal: [
                ['width'],
                ['height'],
                ['boxShadow'],
                ['background'],
                ['opacity'],
                ['border'],
                ['borderRadius'],
                ['margin'],
                ['padding'],
              ],
              hover: [['boxShadow'], ['background'], ['opacity'], ['border'], ['borderRadius']],
              clicked: [],
              disabled: [],
            },
            TreeItem: {
              name: '内嵌导航菜单项配置',
              theme: {
                TreeItemWrap: {
                  name: '项的外盒',
                  desc: '配置每一项的外盒',
                  normal: [
                    ['background'],
                    ['border'],
                    ['borderRadius'],
                    ['opacity'],
                    ['color'],
                    ['padding'],
                  ],
                  hover: [['background'], ['border'], ['borderRadius'], ['opacity'], ['color']],
                  active: [['background'], ['border'], ['borderRadius'], ['opacity'], ['color']],
                  disabled: [],
                },
                SelectedTreeItemWrap: {
                  name: '选中项的外盒',
                  desc: '配置选中项的外盒',
                  normal: [
                    ['background'],
                    ['border'],
                    ['borderRadius'],
                    ['opacity'],
                    ['color'],
                    ['padding'],
                  ],
                  hover: [['background'], ['border'], ['borderRadius'], ['opacity'], ['color']],
                  active: [['background'], ['border'], ['borderRadius'], ['opacity'], ['color']],
                  disabled: [],
                },
                Text: {
                  name: '项的文本',
                  desc: '配置每一项文本内容的样式',
                  normal: [
                    ['color'],
                    ['font'],
                    ['background'],
                    ['padding'],
                    ['border'],
                    ['borderRadius'],
                  ],
                  hover: [['color'], ['font'], ['background'], ['border'], ['borderRadius']],
                  active: [['color'], ['font'], ['background'], ['border'], ['borderRadius']],
                  disabled: [['color'], ['font'], ['background'], ['border'], ['borderRadius']],
                },
                SelectedText: {
                  name: '选中项的文本',
                  desc: '配置选中项文本内容的样式',
                  normal: [
                    ['color'],
                    ['font'],
                    ['background'],
                    ['padding'],
                    ['border'],
                    ['borderRadius'],
                  ],
                  hover: [['color'], ['font'], ['background'], ['border'], ['borderRadius']],
                  active: [['color'], ['font'], ['background'], ['border'], ['borderRadius']],
                  disabled: [['color'], ['font'], ['background'], ['border'], ['borderRadius']],
                },
                Switch: {
                  name: '控制器配置',
                  desc: '配置控制树节点展开或隐藏的控制器的样式',
                  normal: [['color'], ['font']],
                  hover: [['color'], ['font']],
                  active: [['color'], ['font']],
                  disabled: [['color'], ['font']],
                },
                SubTreeWrap: {
                  name: '嵌套中的导航菜单外盒',
                  desc: '配置嵌套中的导航菜单外盒的样式',
                  normal: [
                    ['width'],
                    ['background'],
                    ['opacity'],
                    ['border'],
                    ['margin'],
                    ['padding', 'left'],
                    ['padding', 'right'],
                  ],
                  hover: [['background'], ['opacity'], ['border']],
                  active: [],
                  disabled: [],
                },
              },
            },
          },
        },
      },
      childrenWidget: [],
    },
    target: Navmenu,
    screenshot:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFwAAABMCAYAAADgOdDDAAAAAXNSR0IArs4c6QAAArhJREFUeAHt289rE0EUB/DZIRVE/4D2ov+Gd4u3RipYsFiP+i/0T6j/hmktNYdAipfoQcGbf4WnXHoQRUH2xzizNrBofPMCX162+g2ETOe9fTP72WHZ7KbFy1fT4BSv/b1hkdL6lq+Yeq9SfK9m8x9MhuDGB5ngBDcWMB6OK9wYfGA83j8x3L2DgxvXf7jnReE24yVe2d2peCm34Vwx/34tHM5Go2/dWGoT/HcRxd8Jcvjw8Www2DjxvrjZNE27lffexfaXsqz2Z6PjP7BTEk8pCuBlKdPx8bQsywdVXX8OIbj0rqrqoinrYYy9XrZN6iP432QU/RH2javqvcj9NYJfuNrtTsaj99KmBJd0FLFJRK+a+q4LzfZk/OJDbhOew3NCivj52clHRVqbwhWulQLlERwEqS1DcK0UKI/gIEiWoQAFKEABClCAAhSgAAX6K1DcfxaeNIU7SlP0wR02wb3r73Sv/sz8JfZW3JWtBfzV363+7kH6ap+wF69ue9HHT6AA76UAMTWlCK5RAuYQHIipKUVwjRIwh+BATE2p1R8ie/dJLNy42218XXni5NYf5Ao3PgYEJ7ixgPFwXOEENxYwHo4rnODGAsbDcYUT3FjAeDiucIIbCxgPxxVOcGMB4+FWv1u4uBuYm+i68nLzWnOcpxTjA5DA550xu+1ON5soAZ9+/BOLJej5ZRtVm3WWCAzaX1oFdyfFfv0D85IsdsEEeA6HUeoKEVznBMsiOIxSV2jl6/BH2+fiU/vTtzvtU/u+5+l48Flc4XhTsSLBRR58kOB4U7EiwUUefJDgeFOxIsFFHnyQ4HhTsSLBRR58kOB4U7EiwUUefJDgeFOxIsFFHnyQ4HhTsWKx8zTcEjMYhApwhUM588UInjeCZhAcypkvRvC8ETSD4FDOfDGC542gGQSHcuaL/QThMZ6aOXl76wAAAABJRU5ErkJggg==',
  },
  {
    meta: {
      widgetName: 'Navmenu',
      title: '顶部导航菜单',
      desc: '水平的导航菜单',
      props: {
        valueField: { type: 'string', desc: 'data数据的value值的名称', defaultValue: 'value' },
        displayField: {
          type: 'string',
          desc: 'data数据的displayValue值的名称',
          defaultValue: 'text',
        },
        data: {
          type: 'Object[]',
          desc: '生成选择项的数据',
          meta: [
            { key: 'value', title: 'value值', type: 'string' },
            { key: 'text', title: '文本值', type: 'string' },
          ],
        },
        value: { type: 'string | string[] | number | number[]', desc: '指定当前选中的条目' },
        mode: {
          type: 'vertical | inline| horizontal',
          desc: '菜单类型，支持垂直、内嵌和水平模式',
          defaultValue: 'horizontal',
        },
        inlineType: {
          type: 'primary | ellipse',
          desc: '菜单类型为inline(内嵌模式)时,支持两种风格',
          defaultValue: 'primary',
        },
        themeStyle: {
          type: 'light | dark',
          desc: '菜单类型为inline(内嵌模式)时,支持两种主题',
          defaultValue: 'light',
        },
        inlineExpandAll: {
          type: 'boolean',
          desc: '菜单类型为inline(内嵌模式)时,是否展开所有子元素,默认为true',
          defaultValue: true,
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
      theme: {
        Tabs: {
          name: '水平导航配置',
          theme: {
            TitleContainer: {
              name: '头部标签区域',
              desc: '头部标签区域宽度配置',
              normal: [['width']],
              hover: [],
              clicked: [],
              disabled: [],
            },
            BorderStyle: {
              name: '默认线',
              desc: '默认线样式配置',
              normal: [['border']],
              hover: [],
              clicked: [],
              disabled: [],
            },
            TabHeader: {
              name: '标签配置',
              theme: {
                DefaultTabPan: {
                  name: '默认标签',
                  desc: '默认标签样式配置',
                  normal: [
                    ['color'],
                    ['background'],
                    ['border'],
                    ['margin'],
                    ['padding'],
                    ['font'],
                    ['opacity'],
                  ],
                  hover: [['color'], ['background'], ['border'], ['font'], ['opacity']],
                  clicked: [],
                  disabled: [],
                },
                SelectTabPan: {
                  name: '选中标签',
                  desc: '选中标签样式配置',
                  normal: [
                    ['color'],
                    ['background'],
                    ['border'],
                    ['margin'],
                    ['padding'],
                    ['font'],
                    ['opacity'],
                  ],
                  hover: [['color'], ['background'], ['border'], ['font'], ['opacity']],
                  clicked: [],
                  disabled: [],
                },
              },
            },
          },
        },
        Menu: {
          name: '弹出菜单配置',
          theme: {
            MenuWrap: {
              name: '菜单外盒',
              desc: '配置菜单组件的外盒样式',
              normal: [
                ['width'],
                ['height'],
                ['boxShadow'],
                ['background'],
                ['opacity'],
                ['border'],
                ['borderRadius'],
                ['margin'],
                ['padding'],
              ],
              hover: [['boxShadow'], ['background'], ['opacity'], ['border'], ['borderRadius']],
              clicked: [],
              disabled: [],
            },
            MenuItem: {
              name: '菜单项配置',
              theme: {
                MenuItemWrap: {
                  name: '项的外盒',
                  desc: '配置每一项的外盒',
                  normal: [
                    ['height'],
                    ['background'],
                    ['border'],
                    ['borderRadius'],
                    ['opacity'],
                    ['color'],
                    ['padding'],
                  ],
                  hover: [
                    ['background'],
                    ['border'],
                    ['borderRadius'],
                    ['opacity'],
                    ['color'],
                    ['font'],
                  ],
                  active: [
                    ['background'],
                    ['border'],
                    ['borderRadius'],
                    ['opacity'],
                    ['color'],
                    ['font'],
                  ],
                  disabled: [
                    ['background'],
                    ['color'],
                    ['borderRadius'],
                    ['opacity'],
                    ['padding'],
                    ['font'],
                  ],
                },
                SelectedMenuItemWrap: {
                  name: '选中项的外盒',
                  desc: '配置选中项的外盒',
                  normal: [
                    ['background'],
                    ['border'],
                    ['borderRadius'],
                    ['opacity'],
                    ['color'],
                    ['padding'],
                    ['font'],
                  ],
                  hover: [
                    ['background'],
                    ['border'],
                    ['borderRadius'],
                    ['opacity'],
                    ['color'],
                    ['font'],
                  ],
                  active: [
                    ['background'],
                    ['border'],
                    ['borderRadius'],
                    ['opacity'],
                    ['color'],
                    ['font'],
                  ],
                  disabled: [],
                },
              },
            },
            SubMenu: {
              name: '子菜单配置',
              theme: {
                MenuWrap: {
                  name: '菜单外盒',
                  desc: '配置菜单组件的外盒样式',
                  normal: [
                    ['width'],
                    ['height'],
                    ['boxShadow'],
                    ['background'],
                    ['opacity'],
                    ['border'],
                    ['borderRadius'],
                    ['margin'],
                    ['padding'],
                  ],
                  hover: [['boxShadow'], ['background'], ['opacity'], ['border'], ['borderRadius']],
                  clicked: [],
                  disabled: [],
                },
                MenuItem: {
                  name: '子菜单的项配置',
                  theme: {
                    MenuItemWrap: {
                      name: '项的外盒',
                      desc: '配置每一项的外盒',
                      normal: [
                        ['height'],
                        ['background'],
                        ['border'],
                        ['borderRadius'],
                        ['opacity'],
                        ['color'],
                        ['padding'],
                      ],
                      hover: [
                        ['background'],
                        ['border'],
                        ['borderRadius'],
                        ['opacity'],
                        ['color'],
                        ['font'],
                      ],
                      active: [
                        ['background'],
                        ['border'],
                        ['borderRadius'],
                        ['opacity'],
                        ['color'],
                        ['font'],
                      ],
                      disabled: [
                        ['background'],
                        ['color'],
                        ['borderRadius'],
                        ['opacity'],
                        ['padding'],
                        ['font'],
                      ],
                    },
                    SelectedMenuItemWrap: {
                      name: '选中项的外盒',
                      desc: '配置选中项的外盒',
                      normal: [
                        ['background'],
                        ['border'],
                        ['borderRadius'],
                        ['opacity'],
                        ['color'],
                        ['padding'],
                        ['font'],
                      ],
                      hover: [
                        ['background'],
                        ['border'],
                        ['borderRadius'],
                        ['opacity'],
                        ['color'],
                        ['font'],
                      ],
                      active: [
                        ['background'],
                        ['border'],
                        ['borderRadius'],
                        ['opacity'],
                        ['color'],
                        ['font'],
                      ],
                      disabled: [],
                    },
                    Divider: {
                      name: '分割线',
                      desc: '配置每项之间的分割线，当divided为true时生效',
                      normal: [['background']],
                      hover: [],
                      active: [],
                      disabled: [],
                    },
                  },
                },
              },
            },
          },
        },
      },
      childrenWidget: [],
      aliasName: 'HorizontalNavMenu',
    },
    target: Navmenu,
    screenshot:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGIAAABMCAYAAACWA2JIAAAAAXNSR0IArs4c6QAABYdJREFUeAHtXM1u3FQUtqdJSTOVWIJ4gWz6BixB7BqJSnRR0R0LHoFd17wBC9gkLQiiECkRC8IKCVY8QV6AH6kCRJUoaMYznO9qvtG5rl2PPR77mJwr3Zz77+/H9jhzZyZNVkxffnM6X2Xoo4f7KcbVHb/K2quMuf/xfCWcZ5+lAWfd8atgaDJm1GSSz2lfATeifU0brehGNJKt/UluRPuaNlrRjWgkW/uTttpf8uas+N7jx+M7/yafyvPXm/KoNtHM5ZFsO0nS365uzz85Pzy81H1FZTeiSJUV2yDw/gcfnm9tbT8bjdK7s9kszByNRomU/5lMpo/OD59WmoBJfmtaUfSyYadHT08nk8mDaZb9PZd/YZCn0+nz2STbl77vyubl292IvCIN6iL4D8k0eyg2vBAjnidZ8v7J0eGPdZZyI+qo9YqxJ2LGdJa9k8xn754cHfz0iqGFXf4aUShLs8azr5/90mymv0Y01a31eX5ral3SZgu6Ec10a32WG9G6pM0WDO/JN5u68VmWsa1DvnC/xCLZMkxl7euI0sXcQuHlwFG7JXJFWHQby4xdiLjOMSg0I9bSZa4d2qz+H0GxiyLbQESXSazPqIVGGRkYdTvw5etJuureMmb3kb76/n4fh934Mc++SPWD0lxXNn5wP0CkQHQ1R5VoWHcVjQFlZpwkKCPqzH5G6Q4J9T6Svs2grDPeF9cZfajrMVJNEkuvERRWx1uCESYw0hA9pi8DoJ9OWlwKThMyGQicjPl5ut5bmaJScNnZSl6TfEfyXcmvHxwc3Lu8vDzOsux3eZt5EAlYgRnYwWHBBZzADRx5cpG/NPWbCARG4Aq9LXlH8lhyMEF2u/4chPoFIIFdmQFO4AaO4ArOgT/+9J1oBCJvPThbkLfkrPp8d3f3Qd8g1zn+1dXVt+Px+CNZYyoZtydk3rbCLQ3ErSUaE0zZ2dl52xrAungWHHiSkV+0jMUXawAkWNmHH70RIV5ULi4uipqXbXt7e6Hc17glECksOMAI8kI3y7giwq0A0VIiQEZL2NbBQj6M0VqWb02FgCP0w6qQD2OE3poRAMlUCJidA4x5PpqryVsTNCZIxgHq/hJkcmGMBli7IiJwN6li2YjCM2fg5pRysmzEwDWvB9+NqKfXxka7ERuTtt7CbkQ9vTY22o3YmLT1FnYj6um1sdFuxMakrbdw6XNtvWXWGg0MyDgpuA+BHayQZa/lVykPPqVp+paQwPfsmPW+hH+Kw4rDfmsy4oQb4UYYUcAIDL8ijBhhac+6liQW9qJrAa4Y7FdEhUBddbsRXSldcRw3okKgrrrdiK6UrjiOG1EhUFfdbkRXSlccx42oEKirbjeiK6UrjuNGVAjUVbdlI8KnpLsSoqPjlHKybERH2tg4jFUjeOYw2lBrPRTkwhitZs0IDRJlXY+AD7CS5xNxs7ZnjRMjfHdOIt4Z3pY96z8GKPpLkGXPGt98wn41vkfH79Itv0dn7YoAAZ45jGj7PyTyYYw4WTJCA2RZvh07G/wVseCgf3EAJpBjMMSSETxDCDBcttfX1z+zY6hxwWF5GxIe4BglK0ZQfEaCnh0fHz+R14m/ItQDqgA7OAjkJScpkyejCUb5D5jhg2U37icgrDw14YygIYy4WvEEpSPKyBzDKE29J57djPoK4C8NMHIMo6lfpwEonVAHcIKtMgGm9JE0bmJl1GagzHYdA2YLn+IAKC0i6kgAznYCZxvb8zFM7OEPMeuoMaOcN0LDnFswIgIkFYhLQuij+GjTwrOMMZYSDQAmlvORfUvclshoLCwXRbaBhC4vSfVYgOBMFB91tufjss8SkSIsuo1lRhK2GktFzwEO4yySKsNU1p7jZa5KQ/LAonbL5Cxjy4tapx4ZwIn/AbCzpKCpu66XAAAAAElFTkSuQmCC',
  },
  {
    meta: {
      widgetName: 'Navmenu',
      title: '垂直导航菜单',
      desc: '子菜单从右侧弹开',
      props: {
        valueField: { type: 'string', desc: 'data数据的value值的名称', defaultValue: 'value' },
        displayField: {
          type: 'string',
          desc: 'data数据的displayValue值的名称',
          defaultValue: 'text',
        },
        data: {
          type: 'Object[]',
          desc: '生成选择项的数据',
          meta: [
            { key: 'value', title: 'value值', type: 'string' },
            { key: 'text', title: '文本值', type: 'string' },
          ],
        },
        value: { type: 'string | string[] | number | number[]', desc: '指定当前选中的条目' },
        mode: {
          type: 'vertical | inline| horizontal',
          desc: '菜单类型，支持垂直、内嵌和水平模式',
          defaultValue: 'vertical',
        },
        inlineType: {
          type: 'primary | ellipse',
          desc: '菜单类型为inline(内嵌模式)时,支持两种风格',
          defaultValue: 'primary',
        },
        themeStyle: {
          type: 'light | dark',
          desc: '菜单类型为inline(内嵌模式)时,支持两种主题',
          defaultValue: 'light',
        },
        inlineExpandAll: {
          type: 'boolean',
          desc: '菜单类型为inline(内嵌模式)时,是否展开所有子元素,默认为true',
          defaultValue: true,
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
      theme: {
        Menu: {
          name: '垂直导航菜单配置',
          theme: {
            MenuWrap: {
              name: '菜单外盒',
              desc: '配置菜单组件的外盒样式',
              normal: [
                ['width'],
                ['height'],
                ['boxShadow'],
                ['background'],
                ['opacity'],
                ['border'],
                ['borderRadius'],
                ['margin'],
                ['padding'],
              ],
              hover: [['boxShadow'], ['background'], ['opacity'], ['border'], ['borderRadius']],
              clicked: [],
              disabled: [],
            },
            MenuItem: {
              name: '菜单项配置',
              theme: {
                MenuItemWrap: {
                  name: '项的外盒',
                  desc: '配置每一项的外盒',
                  normal: [
                    ['height'],
                    ['background'],
                    ['border'],
                    ['borderRadius'],
                    ['opacity'],
                    ['color'],
                    ['padding'],
                  ],
                  hover: [
                    ['background'],
                    ['border'],
                    ['borderRadius'],
                    ['opacity'],
                    ['color'],
                    ['font'],
                  ],
                  active: [
                    ['background'],
                    ['border'],
                    ['borderRadius'],
                    ['opacity'],
                    ['color'],
                    ['font'],
                  ],
                  disabled: [
                    ['background'],
                    ['color'],
                    ['borderRadius'],
                    ['opacity'],
                    ['padding'],
                    ['font'],
                  ],
                },
                SelectedMenuItemWrap: {
                  name: '选中项的外盒',
                  desc: '配置选中项的外盒',
                  normal: [
                    ['background'],
                    ['border'],
                    ['borderRadius'],
                    ['opacity'],
                    ['color'],
                    ['padding'],
                    ['font'],
                  ],
                  hover: [
                    ['background'],
                    ['border'],
                    ['borderRadius'],
                    ['opacity'],
                    ['color'],
                    ['font'],
                  ],
                  active: [
                    ['background'],
                    ['border'],
                    ['borderRadius'],
                    ['opacity'],
                    ['color'],
                    ['font'],
                  ],
                  disabled: [],
                },
              },
            },
            SubMenu: {
              name: '弹开子菜单配置',
              theme: {
                MenuWrap: {
                  name: '菜单外盒',
                  desc: '配置菜单组件的外盒样式',
                  normal: [
                    ['width'],
                    ['height'],
                    ['boxShadow'],
                    ['background'],
                    ['opacity'],
                    ['border'],
                    ['borderRadius'],
                    ['margin'],
                    ['padding'],
                  ],
                  hover: [['boxShadow'], ['background'], ['opacity'], ['border'], ['borderRadius']],
                  clicked: [],
                  disabled: [],
                },
                MenuItem: {
                  name: '子菜单的项配置',
                  theme: {
                    MenuItemWrap: {
                      name: '项的外盒',
                      desc: '配置每一项的外盒',
                      normal: [
                        ['height'],
                        ['background'],
                        ['border'],
                        ['borderRadius'],
                        ['opacity'],
                        ['color'],
                        ['padding'],
                      ],
                      hover: [
                        ['background'],
                        ['border'],
                        ['borderRadius'],
                        ['opacity'],
                        ['color'],
                        ['font'],
                      ],
                      active: [
                        ['background'],
                        ['border'],
                        ['borderRadius'],
                        ['opacity'],
                        ['color'],
                        ['font'],
                      ],
                      disabled: [
                        ['background'],
                        ['color'],
                        ['borderRadius'],
                        ['opacity'],
                        ['padding'],
                        ['font'],
                      ],
                    },
                    SelectedMenuItemWrap: {
                      name: '选中项的外盒',
                      desc: '配置选中项的外盒',
                      normal: [
                        ['background'],
                        ['border'],
                        ['borderRadius'],
                        ['opacity'],
                        ['color'],
                        ['padding'],
                        ['font'],
                      ],
                      hover: [
                        ['background'],
                        ['border'],
                        ['borderRadius'],
                        ['opacity'],
                        ['color'],
                        ['font'],
                      ],
                      active: [
                        ['background'],
                        ['border'],
                        ['borderRadius'],
                        ['opacity'],
                        ['color'],
                        ['font'],
                      ],
                      disabled: [],
                    },
                    Divider: {
                      name: '分割线',
                      desc: '配置每项之间的分割线，当divided为true时生效',
                      normal: [['background']],
                      hover: [],
                      active: [],
                      disabled: [],
                    },
                  },
                },
              },
            },
          },
        },
      },
      childrenWidget: [],
      aliasName: 'VerticalNavMenu',
    },
    target: Navmenu,
    screenshot:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGIAAABACAYAAADhwaIzAAAAAXNSR0IArs4c6QAABWZJREFUeAHtXDFvFEcUvjXn2HKkSEiRQgpql/kBQSCaNChIjmWiwNlVCv5BSpQuPyG1fSGCxEGCDjokqvwC12mgSopgLM63x/vG+63eDHO+W3u9frPekebemzezM9/3vp29861vs4ePn056c5S7d25nGHbW42dBwfrEMmtsSv0LKYFtM9Z+C8i5nZoQj+gVKGUhpgkwLX5eWoWJJz4vnpwQk4nDTzJMrm7Tp+WYpq2X6GJxHSM+F0tOiCCbJBOzjOEQ7QdT1NrUiYaPirV1HAuG7V5qQuiE0oeNVRBmHH5ThQJgPfq0jAEXxXB+akKACArAozDRsPgEqC37OE5b+HUWJlVbJj+XheDDsqANfByf1I4AcF2YaC0AfFb20/LYcB7GT2rLZMoE8HVF8rEeRUCf9qXpSpbcjlBv1kww7CWpEIB2lhiOfc0vWgAmHElHHUsFTlpxy4KxSe2IEnnhgBgT7kTY3t6+ur6+/vPy8vLXCwsLX4QHNNnO8/zNwcHBq93d3QdbW1v/FGu7pIsPcei7ruR2REFI74ZShMFg8DLLssvFmHM1OBFWVla+E0w3Bcj1QgwkH5X4SzFAIqUiBBx2Eil3BHaCFRF0QoEJ2CRWYhWf+Gldpz4uJZ8kHEFcjqyCL7BRCOL24KIzqXL0h7U7o4CbpORKcL7vCcclscCGXBOvxu4OTU4IRZikaFWXSZc4aT2QCKZSHIGd35+MN39YWxLQ+KDBuigfa1/HiOzt7cXCZWx1ddX5dY8rFygcea+4Iu5I6qGq/Hg7SXVH6BMoeoYV/C2ZEKfmkPSbNZJMMrSWEh9iIUZarz/VHeGRaEOjDUJEzzCj4kzF2gYhjOa8Gqz+t/eLT+Yzjnv2a+bUrDp+xrRdd5GBbkcYORU6IToh4hn4ZnPz03hPu6PmdsTK++yX2xuDW+1O+8fszAkhX3N/ubjYf7i2sXnjY7jtjZgTQu42jOTbys96l7I/1za2rrU39T4zc0IAntxm7MmXZJ/LHegna98PvvIht7Nl+1Zp1ls6nEw+OU3q+e3qrDnqHjdrvbDf5I6QSxNuiP7XO8zXnz367e8QdBvb5naE/Pm+mOeT/8eH4ztP/xi+aGPSY5zM7Qj5wuX1aDS6d5FEgDDmdsS7pd5Pz3eGb2NnTZtj5nbE852dCyeCyR1R91lf973oeeerysPcjqhKoC3j+7zPMC+hquPnnfeij+t2hJEzoBOiE8JIBozA6HZEJ4SRDBiB0T/rZ2tUnd9IXhqH0V2aGk95fME2COF+QhSnZy46FWsbhDCX7ZMASl0InmG0J8lBU8cQI623bqpCaDLwddsjaKgR4vQwm7sfUSFxJEYbPbTue9HzzhcBQ5y03pBUdwRIkBCtR8xggzhpPYjJCXH0P+nlpYik5D9w8jceM0ONAhufNgDMKMTuGskJ4VAfvZCI+0EgHreg+ky5Bbbyh4sCjmKUOFMTQgi4n2l4IgibHM+8kF+W/lsyM+IAE7ABo6rET5vsjxlJABYEx3jWxXA4vL6/v/+XhcsUMAALMBXP4cCTaYBVY5fmUUn9UxOIobhtAsJSf5Q2djoq4rpK88yKTjBPEO4CisA2+r2SnBDyP7EgoInAB1FY1FkiuAlkXF0lxEIcsEw8re6j73CkJASA6ySijQKSjJMcY4yH1h1Y4wuxaKuxwAcmxjiOECYpCUHQsCCC5GpCTD77MA5jKALaTRSsT1z0QwscHOMwNQ3SLXrKF42ZfswyhuW0f8rljz1cJ5fJxwGMh7bsawrgsegrdsYw6xh92orT1zZ8atKDFdy48wYbYKrUnIZ9WrzS5DUOpiDhlF7cGugQ7Dzt1Dh4ApDgBzAdpOJdUvDcAAAAAElFTkSuQmCC',
  },
  {
    meta: {
      widgetName: 'Navmenu',
      title: '内嵌导航菜单',
      desc: '点击菜单收起或展开子菜单,ellipse样式',
      props: {
        valueField: { type: 'string', desc: 'data数据的value值的名称', defaultValue: 'value' },
        displayField: {
          type: 'string',
          desc: 'data数据的displayValue值的名称',
          defaultValue: 'text',
        },
        data: {
          type: 'Object[]',
          desc: '生成选择项的数据',
          meta: [
            { key: 'value', title: 'value值', type: 'string' },
            { key: 'text', title: '文本值', type: 'string' },
          ],
        },
        value: { type: 'string | string[] | number | number[]', desc: '指定当前选中的条目' },
        mode: {
          type: 'vertical | inline| horizontal',
          desc: '菜单类型，支持垂直、内嵌和水平模式',
          defaultValue: 'inline',
        },
        inlineType: {
          type: 'primary | ellipse',
          desc: '菜单类型为inline(内嵌模式)时,支持两种风格',
          defaultValue: 'ellipse',
        },
        themeStyle: {
          type: 'light | dark',
          desc: '菜单类型为inline(内嵌模式)时,支持两种主题',
          defaultValue: 'light',
        },
        inlineExpandAll: {
          type: 'boolean',
          desc: '菜单类型为inline(内嵌模式)时,是否展开所有子元素,默认为true',
          defaultValue: true,
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
      theme: {
        Tree: {
          name: '内嵌导航菜单配置',
          theme: {
            TreeWrap: {
              name: '内嵌导航菜单外盒',
              desc: '配置内嵌导航菜单的外盒样式',
              normal: [
                ['width'],
                ['height'],
                ['boxShadow'],
                ['background'],
                ['opacity'],
                ['border'],
                ['borderRadius'],
                ['margin'],
                ['padding'],
              ],
              hover: [['boxShadow'], ['background'], ['opacity'], ['border'], ['borderRadius']],
              clicked: [],
              disabled: [],
            },
            TreeItem: {
              name: '内嵌导航菜单项配置',
              theme: {
                TreeItemWrap: {
                  name: '项的外盒',
                  desc: '配置每一项的外盒',
                  normal: [
                    ['background'],
                    ['border'],
                    ['borderRadius'],
                    ['opacity'],
                    ['color'],
                    ['padding'],
                  ],
                  hover: [['background'], ['border'], ['borderRadius'], ['opacity'], ['color']],
                  active: [['background'], ['border'], ['borderRadius'], ['opacity'], ['color']],
                  disabled: [],
                },
                SelectedTreeItemWrap: {
                  name: '选中项的外盒',
                  desc: '配置选中项的外盒',
                  normal: [
                    ['background'],
                    ['border'],
                    ['borderRadius'],
                    ['opacity'],
                    ['color'],
                    ['padding'],
                  ],
                  hover: [['background'], ['border'], ['borderRadius'], ['opacity'], ['color']],
                  active: [['background'], ['border'], ['borderRadius'], ['opacity'], ['color']],
                  disabled: [],
                },
                Text: {
                  name: '项的文本',
                  desc: '配置每一项文本内容的样式',
                  normal: [
                    ['color'],
                    ['font'],
                    ['background'],
                    ['padding'],
                    ['border'],
                    ['borderRadius'],
                  ],
                  hover: [['color'], ['font'], ['background'], ['border'], ['borderRadius']],
                  active: [['color'], ['font'], ['background'], ['border'], ['borderRadius']],
                  disabled: [['color'], ['font'], ['background'], ['border'], ['borderRadius']],
                },
                SelectedText: {
                  name: '选中项的文本',
                  desc: '配置选中项文本内容的样式',
                  normal: [
                    ['color'],
                    ['font'],
                    ['background'],
                    ['padding'],
                    ['border'],
                    ['borderRadius'],
                  ],
                  hover: [['color'], ['font'], ['background'], ['border'], ['borderRadius']],
                  active: [['color'], ['font'], ['background'], ['border'], ['borderRadius']],
                  disabled: [['color'], ['font'], ['background'], ['border'], ['borderRadius']],
                },
                Switch: {
                  name: '控制器配置',
                  desc: '配置控制树节点展开或隐藏的控制器的样式',
                  normal: [['color'], ['font']],
                  hover: [['color'], ['font']],
                  active: [['color'], ['font']],
                  disabled: [['color'], ['font']],
                },
                SubTreeWrap: {
                  name: '嵌套中的导航菜单外盒',
                  desc: '配置嵌套中的导航菜单外盒的样式',
                  normal: [
                    ['width'],
                    ['background'],
                    ['opacity'],
                    ['border'],
                    ['margin'],
                    ['padding', 'left'],
                    ['padding', 'right'],
                  ],
                  hover: [['background'], ['opacity'], ['border']],
                  active: [],
                  disabled: [],
                },
              },
            },
          },
        },
      },
      childrenWidget: [],
      aliasName: 'InlineEllipseNavMenu',
    },
    target: Navmenu,
    screenshot:
      'data:image/png;base64,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',
  },
  {
    meta: {
      widgetName: 'NumberInput',
      title: '数字输入框',
      desc: '常用于数字输入,可以进行快速加减显示',
      props: {
        disabled: { type: 'boolean', desc: '禁用状态,是否不可用', defaultValue: false },
        viewClass: { type: 'string', desc: '用于配置通用主题属性' },
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
        help: { type: 'string', desc: 'input校验提示信息' },
        placeholder: { type: 'string', desc: 'input输入提示信息' },
        defaultValue: { type: 'string', desc: '默认显示内容' },
        value: { type: 'string', desc: '显示内容' },
        max: { type: 'number', desc: '输入最大值限制', defaultValue: 999999999999 },
        min: { type: 'number', desc: '输入最小值限制', defaultValue: -999999999999 },
        step: { type: 'number', desc: '每次改变步数，可以为小数', defaultValue: 1 },
        precision: { type: 'number', desc: '数值精度,默认0', defaultValue: 0 },
        formatter: { type: 'function', desc: '格式化显示内容的匹配规则,需与 parser 属性配套使用' },
        parser: { type: 'function', desc: '解析格式化显示内容的规则,需与 formatter 属性配套使用' },
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
        ChangeType: { newValue: 'number', oldValue: 'number', event: 'SyntheticEvent' },
      },
      category: ['数据录入'],
      theme: {
        Container: {
          name: '输入框外部容器',
          desc: '输入框外部容器',
          normal: [['width'], ['height'], ['margin'], ['padding']],
        },
        Input: {
          name: '数字输入框中输入框部分',
          desc: '数字输入框中输入框部分',
          normal: [
            ['width'],
            ['height'],
            ['fontSize'],
            ['font'],
            ['color'],
            ['background'],
            ['border'],
            ['borderRadius'],
            ['cursor'],
            ['opacity'],
          ],
          hover: [
            ['border'],
            ['borderRadius'],
            ['cursor'],
            ['background'],
            ['opacity'],
            ['boxShadow'],
          ],
          active: [['boxShadow'], ['border'], ['borderRadius'], ['cursor'], ['background']],
          disabled: [
            ['fontSize'],
            ['font'],
            ['color'],
            ['background'],
            ['border'],
            ['borderRadius'],
            ['cursor'],
            ['padding'],
            ['opacity'],
          ],
        },
        ArrowIconContainer: {
          name: '数字输入框步长图标包裹框',
          desc: '数字输入框步长图标包裹框',
          normal: [
            ['width'],
            ['height'],
            ['fontSize'],
            ['font'],
            ['color'],
            ['background'],
            ['cursor'],
            ['margin'],
            ['padding'],
            ['opacity'],
          ],
          hover: [
            ['width'],
            ['height'],
            ['font'],
            ['color'],
            ['background'],
            ['cursor'],
            ['opacity'],
          ],
          clicked: [
            ['width'],
            ['height'],
            ['font'],
            ['color'],
            ['background'],
            ['cursor'],
            ['opacity'],
          ],
          disabled: [
            ['width'],
            ['height'],
            ['font'],
            ['color'],
            ['background'],
            ['cursor'],
            ['opacity'],
          ],
        },
        InputArrowIcon: {
          name: '数字输入框步长图标',
          desc: '数字输入框步长图标',
          normal: [['fontSize'], ['font'], ['color'], ['background'], ['cursor'], ['opacity']],
          hover: [['fontSize'], ['font'], ['color'], ['background'], ['cursor'], ['opacity']],
          active: [['fontSize'], ['font'], ['color'], ['background'], ['cursor'], ['opacity']],
          disabled: [['fontSize'], ['font'], ['color'], ['background'], ['cursor'], ['opacity']],
        },
      },
      childrenWidget: [],
    },
    target: NumberInput,
    screenshot:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAAAoCAYAAAABk/85AAAAAXNSR0IArs4c6QAAA9JJREFUaAXtm09IVEEcx+c3a66pl6CILQ9FQn+ERJC6VhBBQkEHwUtSiZrZrphuFmKzhqWuB12zXEXQoBTrUIeCkshLh8wOSXQo7B/UXqKT4u66O9NvtCe4vq1F3+6T3XmwO29+8+c37/N9M/Pe7A4QPIaGhrYHAgG3EOIQRm3Spo64EfABwLjVaq0vLS39ARK+3++fRGMnCnC3oqLCFzfXqmLi9XptyPo0sq7JyMgohL6+vvvI5V15eXmb4pM4Asj9MnrLp3LYkXd+4lwrT5KAZC7Zyy4hFBJzCEj21BzXyqtGQAmgkTApVAKYBF5zqwTQSJgUKgFMAq+5XbcC9Pb2PpEfraHJGqat1wvDZ+Tj67VtRrZr1QI4XV2HeZhcohQG25n9YWSj6ljnfuDQREAUEALb8M1jWgB5kQ3ZLsbKfkfmT9X4qoYgZ1PnOYT/DN/niggnuyLh1TPPWcJhAu1HiCBvMd8Iwt+K5/ZZPvuxgfXkRpZJ1XjMPQCHBHC6us8ILuyciHwC5AMC3RcJroHd2RHigVtA4Ht6uuVoS2P1N5lndHTU8ub9z1PYI0bCInQPTQcjy6ZiPOYe4HINWgXnAwh+JyG03ALEpQcsRIKNaN9IqKjV4Mt8xcXFYXdzzQMi4DGKecDJPDl65VPNFrMANlswjHd1Nc3MzulotvdzLnTXkEAsjPmBLOJ4qgsTyKcFO4jduukpZox5CMLfCeaRTY/GBydfCHM9DeAXUPGIMeBa3uWh2CPjVKRPL7enZixmAWLF43Y5jkXL67zes5fPh2T6l1Z2/mu0fKlkj3kIWiuUKzc8WxD+MD4RWYFC5VrrS5byCRHAyboL5/3iNcLPx3eCRjezP08WgGu9jrgLUMc8NUKEXwERmy0USjqaHS1rbXQylTd8DtDgNNy8vSnsDw7io+sJAjBhoRtKWlnVZy1dhYsE4iLA1RavbX5ubgyfkfIIhYEsYqtirDiooK8kYLgAjL1MmwlMyVXMPEqpA9eJPCvdKotGwPA5YJZM1eJkWwCUDCv4GubooeE9ABfnyhbcccisv9bVH801APW2s4uT0dJTxW6oAIz1ZM/wUK6EJ4g4iV9RDwp8DBOVAFEJ/SehjTlGMYv8LB2MXZjBiOHD2pKDJDxRsEwWVQlgsgCGzgFGXgv+g1guZ/9jFjHSm3l1rVsBKisri8zDkjjPaghKHGtdT0oAXSyJMyoBEsda15MUwCe3zeimKmPcCPxl7sNfdmFc7lmKmydVsS4ByXyBvdqkp8snbkZ550v4+NecxU160pPapho33noVL9um+ge9/UeP6+j0VQAAAABJRU5ErkJggg==',
  },
  {
    meta: {
      widgetName: 'Pagination',
      title: '分页',
      desc: '分页组件，分页展示数据。',
      props: {
        current: { type: 'number', desc: '当前页数' },
        defaultCurrent: { type: 'number', desc: '默认的当前页数', defaultValue: 1 },
        total: { type: 'number', desc: '数据总数', defaultValue: 1 },
        pageSize: { type: 'number', desc: '每页的条数', defaultValue: 10 },
        defaultPageSize: { type: 'number', desc: '默认的每页条数', defaultValue: 10 },
        pageSizeOptions: {
          type: 'string[]',
          desc: '指定每页可以显示多少条',
          defaultValue: ['10', '20', '30', '50'],
        },
        showQuickJumper: { type: 'boolean', desc: '是否可以快速跳转至某页', defaultValue: false },
        showTotal: { type: 'Function(total, range)', desc: '用于显示数据总量和当前数据顺序' },
        hideOnSinglePage: {
          type: 'boolean',
          desc: '只有一页时是否隐藏分页器',
          defaultValue: false,
        },
        showSizeChanger: {
          type: 'boolean',
          desc: '是否显示可以改变 pageSize',
          defaultValue: false,
        },
        simple: { type: 'boolean', desc: '当添加该属性时，显示为简单分页' },
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
      designInfo: {
        SimplePagination: {
          sequence: 1,
          title: '简洁分页',
          desc: '简洁分页',
          props: { simple: true },
          theme: {
            PaginationContainer: {
              name: '分页外部容器',
              desc: '配置分页外部容器',
              normal: [
                ['width'],
                ['height'],
                ['background'],
                ['cursor'],
                ['padding'],
                ['opacity'],
                ['margin'],
              ],
            },
            SimplePaginationInput: {
              name: '简洁分页输入框',
              theme: {
                Container: {
                  name: '输入框外部容器',
                  desc: '输入框外部容器',
                  normal: [['width'], ['height'], ['margin'], ['padding']],
                },
                Input: {
                  name: '输入框主体内容',
                  desc: '输入框主体内容',
                  normal: [
                    ['width'],
                    ['height'],
                    ['fontSize'],
                    ['font'],
                    ['color'],
                    ['background'],
                    ['border'],
                    ['borderRadius'],
                    ['cursor'],
                    ['opacity'],
                  ],
                  hover: [
                    ['border'],
                    ['borderRadius'],
                    ['cursor'],
                    ['background'],
                    ['opacity'],
                    ['boxShadow'],
                  ],
                  active: [['boxShadow'], ['border'], ['borderRadius'], ['cursor'], ['background']],
                  disabled: [
                    ['fontSize'],
                    ['font'],
                    ['color'],
                    ['background'],
                    ['border'],
                    ['borderRadius'],
                    ['cursor'],
                    ['padding'],
                    ['opacity'],
                  ],
                },
              },
            },
            ChangePageIcon: {
              name: '分页切换页数图标',
              desc: '配置分页切换页数图标',
              normal: [['color'], ['fontSize'], ['font']],
              hover: [],
              clicked: [],
              disabled: [],
            },
          },
        },
      },
      theme: {
        PaginationContainer: {
          name: '分页外部容器',
          desc: '配置分页外部容器',
          normal: [
            ['width'],
            ['height'],
            ['background'],
            ['cursor'],
            ['padding'],
            ['opacity'],
            ['margin'],
          ],
        },
        PaginationListItem: {
          name: '单个页数外部容器',
          desc: '配置单个页数外部容器',
          normal: [
            ['width'],
            ['height'],
            ['cursor'],
            ['border'],
            ['borderRadius'],
            ['opacity'],
            ['background'],
            ['boxShadow'],
            ['lineHeight'],
          ],
          hover: [['color'], ['font'], ['fontSize'], ['border'], ['borderRadius']],
          clicked: [],
          disabled: [],
        },
        PaginationInnerText: {
          name: '单个页数内部文字',
          desc: '配置单个页数内部文字',
          normal: [['fontSize'], ['font'], ['color'], ['cursor'], ['opacity']],
          hover: [['color'], ['font'], ['fontSize']],
          clicked: [],
          disabled: [],
        },
        QuickJumpInput: {
          name: '快速跳转分页输入框',
          theme: {
            Container: {
              name: '输入框外部容器',
              desc: '输入框外部容器',
              normal: [['width'], ['height'], ['margin'], ['padding']],
            },
            Input: {
              name: '输入框主体内容',
              desc: '输入框主体内容',
              normal: [
                ['width'],
                ['height'],
                ['fontSize'],
                ['font'],
                ['color'],
                ['background'],
                ['border'],
                ['borderRadius'],
                ['cursor'],
                ['opacity'],
              ],
              hover: [
                ['border'],
                ['borderRadius'],
                ['cursor'],
                ['background'],
                ['opacity'],
                ['boxShadow'],
              ],
              active: [['boxShadow'], ['border'], ['borderRadius'], ['cursor'], ['background']],
              disabled: [
                ['fontSize'],
                ['font'],
                ['color'],
                ['background'],
                ['border'],
                ['borderRadius'],
                ['cursor'],
                ['padding'],
                ['opacity'],
              ],
            },
          },
        },
        ChangePageIcon: {
          name: '切换显示每页页数图标',
          desc: '配置切换显示每页页数图标',
          normal: [['color'], ['fontSize'], ['font']],
          hover: [],
          clicked: [],
          disabled: [],
        },
        MorePageIcon: {
          name: '更多页数图标',
          desc: '配置更多页数图标',
          normal: [['color'], ['fontSize'], ['font']],
          hover: [],
          clicked: [],
          disabled: [],
        },
        PaginationPageSizeSelect: {
          name: '切换每页显示页数选择器',
          theme: {
            InputTag: {
              name: '数据展示框',
              theme: {
                InputTagWrap: {
                  name: '单个显示项外部容器',
                  desc: '配置展示选中数据的容器',
                  normal: [
                    ['width'],
                    ['height'],
                    ['margin'],
                    ['padding'],
                    ['color'],
                    ['background'],
                    ['border'],
                    ['boxShadow'],
                    ['borderRadius'],
                    ['font'],
                    ['opacity'],
                  ],
                  hover: [
                    ['color'],
                    ['background'],
                    ['border'],
                    ['boxShadow'],
                    ['borderRadius'],
                    ['font'],
                    ['opacity'],
                  ],
                  active: [],
                  disabled: [],
                },
                SwitchIcon: {
                  name: '下拉图标',
                  desc: '配置下拉或清除按钮的图标样式',
                  normal: [['color'], ['background'], ['font'], ['margin'], ['opacity']],
                  hover: [['color'], ['font'], ['opacity']],
                  active: [],
                  disabled: [],
                },
              },
            },
            Menu: {
              name: '弹开菜单',
              theme: {
                MenuWrap: {
                  name: '菜单外部容器',
                  desc: '配置菜单外部容器',
                  normal: [
                    ['width'],
                    ['height'],
                    ['boxShadow'],
                    ['background'],
                    ['opacity'],
                    ['border'],
                    ['borderRadius'],
                    ['margin'],
                    ['padding'],
                  ],
                  hover: [['boxShadow'], ['background'], ['opacity'], ['border'], ['borderRadius']],
                  clicked: [],
                  disabled: [],
                },
                MenuItem: {
                  name: '菜单项配置',
                  theme: {
                    MenuItemWrap: {
                      name: '单个项的外部容器',
                      desc: '配置单个项的外部容器',
                      normal: [
                        ['height'],
                        ['background'],
                        ['border'],
                        ['borderRadius'],
                        ['opacity'],
                        ['color'],
                        ['padding'],
                      ],
                      hover: [
                        ['background'],
                        ['border'],
                        ['borderRadius'],
                        ['opacity'],
                        ['color'],
                        ['font'],
                      ],
                      active: [
                        ['background'],
                        ['border'],
                        ['borderRadius'],
                        ['opacity'],
                        ['color'],
                        ['font'],
                      ],
                      disabled: [
                        ['background'],
                        ['color'],
                        ['borderRadius'],
                        ['opacity'],
                        ['padding'],
                        ['font'],
                      ],
                    },
                    SelectedMenuItemWrap: {
                      name: '选中项的外部容器',
                      desc: '配置选中项的外部容器',
                      normal: [
                        ['background'],
                        ['border'],
                        ['borderRadius'],
                        ['opacity'],
                        ['color'],
                        ['padding'],
                        ['font'],
                      ],
                      hover: [
                        ['background'],
                        ['border'],
                        ['borderRadius'],
                        ['opacity'],
                        ['color'],
                        ['font'],
                      ],
                      active: [
                        ['background'],
                        ['border'],
                        ['borderRadius'],
                        ['opacity'],
                        ['color'],
                        ['font'],
                      ],
                      disabled: [],
                    },
                  },
                },
              },
            },
          },
        },
      },
      category: ['导航'],
      childrenWidget: [],
    },
    target: Pagination,
    screenshot:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGwAAAASCAYAAAC+Tjt8AAAAAXNSR0IArs4c6QAABQNJREFUWAntmGtoXEUUx++dvRuTbU02JrWgaG0pRbEiovhIVVSQUm124zZZkpBE8gYtKIh+8EO/SL9IRVCxzQvJ05DUNI92P0iJ2GpALfrJakFbbKpiW0xEbR67O9ffhGya3r20u7m7bYIZGO7MmTnnf+acOWfmjqatlhVlAT3d2jY1Nd2t6/r6hoaGz9ONpeS3trZui0ajD4KZZ5rmqYyMjFB1dfVkOrHBES0tLdvB3Ep7LfW02+0O1dTUXEg1rq3DikornjKj5vmh/u6TTgBZRJmU8iNk/NHY2LjBiaxr8eKoW8BqxVgvMPcfapSaQ72IIdkvDYdop7ywxo1g9lIfBudfACTtm2n/Tfs1cFuSBS0sK7vXiBj5h/o74za5sAorLKl8RujGoBDaJutYov3m5uYCIqsXA3aheCRRPifzwGqGfwd4FRgpJzc391YhxPPQxjFgl4p0J/LteEOh0E3gfsLYFup2cNd6vd58hQvmKWj7ceijdrxXoxlSbNTdYtAXLH/SOu8Kh/mCVU+7XaJfCD3H1LRZ6+RE+hjmTpT9EsM9S/XD820ifE7mqA0C5i5kvIvRusGVwWBwtr6+PkT7Lege6otOMOx4x8fHfdAfoDaRQT5Vcxbh7kEnFw4NKHoyRdle6MJrCPdBf2lFwWLeBYcpZ7mEflDTNZVaFs9Jtn0JI73MTtuA8Q4ny7yU+RjmMcXHzu6x8jOmdJhCp3usYynob0HuD9QPrLLAVekswtg661gi/Tkf6No6obkG/KWVj8R4DNWIOUufdxYLj40n/WWnXYTpw6QZHTBgFHV2HM7Ozv7ZKoZLR97s7GwWBjxjHXPaZ617kaFqXMGGAYyu7Hs0bjBBgnIactYLTQz4Siv9w72dJwxfScVmoZsDLNrrMLISVCP104jkA0hVNa6Ew+E3FZH1HYkbTDGhvb09b2Zm5g6wnsOWjXxHPR7PiBOYeafdJkx9KFBeXmAYbhmWUeMSQr1OBC9HXs7T3ei1G8N149Ql7/RE1zY9PX2WuR6iWW2Qo5yh6qrv6Hy5jG16ImHhFgM9Pb9I3fRz0P3mJBVeFnzjWx0dHWu4iLSjyfvUQc7T+uuhlcvlehycnTjpAE7byg1xlKi73Qm28gn+/1OaemC4v+unuTNM5UYOtgC5ckjlTCcAN5qXqLpvamqqD6Ntor7OLn+HL/sx/aWuru47UFQ9grP2ks6+J+peof/GUtBjzopKs3i4r+MzJWPhdjHU2/mV1KIBzdQurNRII6qCOOdr1rWG3b6NNLgvnc7CKbX8sBfaOYONcg76GPhBu/Fr0eZ8QGQtdpbiWXCY6gz1do1FZLhYmnKSJ5AMRVspBeMVk4Y+Rt9vsrKyHqqtrT2Rbt2JoCqewd67Co46z5KObmV7Kc2/wlFZEousGMYVDlPE4b6eY2ZYFkWEPBObtNy/pMF8jLcfPc9mZmbuqKqqOn+ddFYXmbvYLHE/x21tbfczpv4Pv0hWF27zp6UZKRrp7xy18s6dYVai3RuWdc5y6pN26tnI+XzHuFa/hAHt1DtHmlIRmLLC89e+iYmJXWyWTtKxH8G8EolfibonIpHIHvSZRK+kz6/5N9yTdoraOsxu4nKmYRT1PMRtyvSpaqcrxjsOPaUO4xlqis2xE8y3kV3JV6XIGPyIYRiv8mL/e4yQii/pcrWkwgKk5RyiazNOE1x4fuQMVa/1q+X/boH/ANUeDtd7j99mAAAAAElFTkSuQmCC',
  },
  {
    meta: {
      widgetName: 'Pagination',
      title: '简洁分页',
      desc: '简洁分页',
      props: {
        current: { type: 'number', desc: '当前页数' },
        defaultCurrent: { type: 'number', desc: '默认的当前页数', defaultValue: 1 },
        total: { type: 'number', desc: '数据总数', defaultValue: 1 },
        pageSize: { type: 'number', desc: '每页的条数', defaultValue: 10 },
        defaultPageSize: { type: 'number', desc: '默认的每页条数', defaultValue: 10 },
        pageSizeOptions: {
          type: 'string[]',
          desc: '指定每页可以显示多少条',
          defaultValue: ['10', '20', '30', '50'],
        },
        showQuickJumper: { type: 'boolean', desc: '是否可以快速跳转至某页', defaultValue: false },
        showTotal: { type: 'Function(total, range)', desc: '用于显示数据总量和当前数据顺序' },
        hideOnSinglePage: {
          type: 'boolean',
          desc: '只有一页时是否隐藏分页器',
          defaultValue: false,
        },
        showSizeChanger: {
          type: 'boolean',
          desc: '是否显示可以改变 pageSize',
          defaultValue: false,
        },
        simple: { type: 'boolean', desc: '当添加该属性时，显示为简单分页', defaultValue: true },
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
      theme: {
        PaginationContainer: {
          name: '分页外部容器',
          desc: '配置分页外部容器',
          normal: [
            ['width'],
            ['height'],
            ['background'],
            ['cursor'],
            ['padding'],
            ['opacity'],
            ['margin'],
          ],
        },
        SimplePaginationInput: {
          name: '简洁分页输入框',
          theme: {
            Container: {
              name: '输入框外部容器',
              desc: '输入框外部容器',
              normal: [['width'], ['height'], ['margin'], ['padding']],
            },
            Input: {
              name: '输入框主体内容',
              desc: '输入框主体内容',
              normal: [
                ['width'],
                ['height'],
                ['fontSize'],
                ['font'],
                ['color'],
                ['background'],
                ['border'],
                ['borderRadius'],
                ['cursor'],
                ['opacity'],
              ],
              hover: [
                ['border'],
                ['borderRadius'],
                ['cursor'],
                ['background'],
                ['opacity'],
                ['boxShadow'],
              ],
              active: [['boxShadow'], ['border'], ['borderRadius'], ['cursor'], ['background']],
              disabled: [
                ['fontSize'],
                ['font'],
                ['color'],
                ['background'],
                ['border'],
                ['borderRadius'],
                ['cursor'],
                ['padding'],
                ['opacity'],
              ],
            },
          },
        },
        ChangePageIcon: {
          name: '分页切换页数图标',
          desc: '配置分页切换页数图标',
          normal: [['color'], ['fontSize'], ['font']],
          hover: [],
          clicked: [],
          disabled: [],
        },
      },
      category: ['导航'],
      childrenWidget: [],
      aliasName: 'SimplePagination',
    },
    target: Pagination,
    screenshot:
      'data:image/png;base64,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',
  },
  {
    meta: {
      widgetName: 'Progress',
      title: '进度条',
      desc: '展示操作的当前进度。',
      props: {
        type: {
          type: 'ProgressType',
          desc: '进度条类型，line、circle、dashboard',
          defaultValue: 'line',
        },
        size: {
          type: 'ProgressSizeType',
          desc: '进度条大小，可设置为 small 或不设',
          defaultValue: 'default',
        },
        percent: { type: 'number', desc: '百分比', defaultValue: 0 },
        status: {
          type: 'ProgressStatusType',
          desc: '进度条状态，可设置为success、error或不设',
          defaultValue: 'default',
        },
        active: {
          type: 'boolean',
          desc: '进度条状态是否激活状态，仅生效于线性进度条(type = line)',
          defaultValue: false,
        },
        showInfo: { type: 'boolean', desc: '是否显示进度数值或状态图标', defaultValue: true },
        format: { type: 'Function', desc: '进度条展示内容模板函数' },
        showType: {
          type: 'ProgressShowType',
          desc: '进度条展示内容展示位置，可设置为 inside 或不设',
          defaultValue: 'default',
        },
      },
      type: {
        ProgressType: ['line', 'circle', 'dashboard'],
        ProgressSizeType: ['default', 'small'],
        ProgressStatusType: ['success', 'error', 'default'],
        ProgressShowType: ['default', 'inside'],
        ProgressStyle: {
          color: { type: 'string', desc: 'Progress的颜色' },
          width: { type: 'number', desc: 'Progress的宽度' },
          height: { type: 'number', desc: 'Progress的高度' },
        },
      },
      category: ['反馈'],
      designInfo: {
        CircleProgress: {
          sequence: 1,
          title: '圆形进度条',
          desc: '圆形进度条',
          props: { type: 'circle' },
          theme: {
            ProgressCircleText: {
              name: '进度条文字配置',
              desc: '进度条文字配置',
              normal: [['color'], ['font']],
            },
            ProgressCircleSuccessIcon: {
              name: '进度条成功图标配置',
              desc: '进度条成功图标配置',
              normal: [['color'], ['fontSize']],
            },
            ProgressCircleErrorIcon: {
              name: '进度条失败图标配置',
              desc: '进度条失败图标配置',
              normal: [['color'], ['fontSize']],
            },
          },
        },
        DashboardProgress: {
          sequence: 1,
          title: '仪表盘进度条',
          desc: '仪表盘进度条',
          props: { type: 'dashboard' },
          theme: {
            DashboardText: {
              name: '进度条文字配置',
              desc: '仪表盘进度条文字配置',
              normal: [['color'], ['font']],
            },
            ProgressDashboardSuccessIcon: {
              name: '进度条成功图标配置',
              desc: '进度条成功图标配置',
              normal: [['color'], ['fontSize']],
            },
            ProgressDashboardErrorIcon: {
              name: '进度条失败图标配置',
              desc: '进度条失败图标配置',
              normal: [['color'], ['fontSize']],
            },
          },
        },
      },
      theme: {
        Container: {
          name: '进度条整体配置',
          desc: '进度条整体配置',
          normal: [['width'], ['height'], ['margin'], ['padding'], ['background'], ['opacity']],
        },
        ProgressOutLine: {
          name: '进度条底色线配置',
          desc: '进度条底色线配置',
          normal: [['background'], ['borderRadius'], ['border'], ['boxShadow']],
        },
        ProgressInnerLine_Default: {
          name: '进度条进度线默认配置',
          desc: '进度条进度线默认配置',
          normal: [['height'], ['background'], ['border'], ['borderRadius'], ['boxShadow']],
        },
        ProgressInnerLine_Success: {
          name: '进度条进度线成功配置',
          desc: '进度条进度线成功配置',
          normal: [['height'], ['background'], ['border'], ['borderRadius'], ['boxShadow']],
        },
        ProgressInnerLine_Error: {
          name: '进度条进度线失败配置',
          desc: '进度条进度线失败配置',
          normal: [['height'], ['background'], ['border'], ['borderRadius'], ['boxShadow']],
        },
        ProgressLineInsideText: {
          name: '进度条内置文本配置',
          desc: '进度条内置文本配置',
          normal: [['color'], ['font']],
        },
        ProgressLineInfoText: {
          name: '进度条描述文本配置',
          desc: '进度条描述文本配置',
          normal: [['color'], ['font']],
        },
        ProgressLineSuccessIcon: {
          name: '进度条成功图标配置',
          desc: '进度条成功图标配置',
          normal: [['color'], ['fontSize']],
        },
        ProgressLineErrorIcon: {
          name: '进度条失败图标配置',
          desc: '进度条失败图标配置',
          normal: [['color'], ['fontSize']],
        },
      },
      childrenWidget: [],
    },
    target: Progress,
    screenshot:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAAAMCAYAAACdrrgZAAAAAXNSR0IArs4c6QAAAUhJREFUWAljZICC////M3ZO/7Hg4VOWoNfvmLl//mJkhMkNB5qd7R+DtPhfBhuT7wy2QExvwMjI+AUYxleB9s4VFxefA+T/B7kBHMgzFn/Rv3aHfd/9JyxC9HbYQNinqfyLITn0IwM/77+BsB5k5z5mZuYYUVHR50yglD+SAh/k++t32RjmruYHMQcKOP39+3cJKOyZOcUrFl66yWYxUC4ZKHvfvGdmEOT/xyAv9WegnKD49evXp0ygMn+gXDDQ9h45wznQTkhmAlW4A+2KgbL/6UvmgbIabC+wItZmGlAXjFrOwCQq9PfrSA0HULN0IAGoWcokL/1n3UA6YiDtBvUJBhjMZSrP5EhQlPnzboAdQnfrQX2BgeiQIXl0H6hDxgTqkWmp/HQaSZEA64ghBQa9meCOGCjs4cMNoE7B6FAE7eIBGNhYhyIADBh+CzX59GYAAAAASUVORK5CYII=',
  },
  {
    meta: {
      widgetName: 'Progress',
      title: '圆形进度条',
      desc: '圆形进度条',
      props: {
        type: {
          type: 'ProgressType',
          desc: '进度条类型，line、circle、dashboard',
          defaultValue: 'circle',
        },
        size: {
          type: 'ProgressSizeType',
          desc: '进度条大小，可设置为 small 或不设',
          defaultValue: 'default',
        },
        percent: { type: 'number', desc: '百分比', defaultValue: 0 },
        status: {
          type: 'ProgressStatusType',
          desc: '进度条状态，可设置为success、error或不设',
          defaultValue: 'default',
        },
        active: {
          type: 'boolean',
          desc: '进度条状态是否激活状态，仅生效于线性进度条(type = line)',
          defaultValue: false,
        },
        showInfo: { type: 'boolean', desc: '是否显示进度数值或状态图标', defaultValue: true },
        format: { type: 'Function', desc: '进度条展示内容模板函数' },
        showType: {
          type: 'ProgressShowType',
          desc: '进度条展示内容展示位置，可设置为 inside 或不设',
          defaultValue: 'default',
        },
      },
      type: {
        ProgressType: ['line', 'circle', 'dashboard'],
        ProgressSizeType: ['default', 'small'],
        ProgressStatusType: ['success', 'error', 'default'],
        ProgressShowType: ['default', 'inside'],
        ProgressStyle: {
          color: { type: 'string', desc: 'Progress的颜色' },
          width: { type: 'number', desc: 'Progress的宽度' },
          height: { type: 'number', desc: 'Progress的高度' },
        },
      },
      category: ['反馈'],
      theme: {
        ProgressCircleText: {
          name: '进度条文字配置',
          desc: '进度条文字配置',
          normal: [['color'], ['font']],
        },
        ProgressCircleSuccessIcon: {
          name: '进度条成功图标配置',
          desc: '进度条成功图标配置',
          normal: [['color'], ['fontSize']],
        },
        ProgressCircleErrorIcon: {
          name: '进度条失败图标配置',
          desc: '进度条失败图标配置',
          normal: [['color'], ['fontSize']],
        },
      },
      childrenWidget: [],
      aliasName: 'CircleProgress',
    },
    target: Progress,
    screenshot:
      'data:image/png;base64,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',
  },
  {
    meta: {
      widgetName: 'Progress',
      title: '仪表盘进度条',
      desc: '仪表盘进度条',
      props: {
        type: {
          type: 'ProgressType',
          desc: '进度条类型，line、circle、dashboard',
          defaultValue: 'dashboard',
        },
        size: {
          type: 'ProgressSizeType',
          desc: '进度条大小，可设置为 small 或不设',
          defaultValue: 'default',
        },
        percent: { type: 'number', desc: '百分比', defaultValue: 0 },
        status: {
          type: 'ProgressStatusType',
          desc: '进度条状态，可设置为success、error或不设',
          defaultValue: 'default',
        },
        active: {
          type: 'boolean',
          desc: '进度条状态是否激活状态，仅生效于线性进度条(type = line)',
          defaultValue: false,
        },
        showInfo: { type: 'boolean', desc: '是否显示进度数值或状态图标', defaultValue: true },
        format: { type: 'Function', desc: '进度条展示内容模板函数' },
        showType: {
          type: 'ProgressShowType',
          desc: '进度条展示内容展示位置，可设置为 inside 或不设',
          defaultValue: 'default',
        },
      },
      type: {
        ProgressType: ['line', 'circle', 'dashboard'],
        ProgressSizeType: ['default', 'small'],
        ProgressStatusType: ['success', 'error', 'default'],
        ProgressShowType: ['default', 'inside'],
        ProgressStyle: {
          color: { type: 'string', desc: 'Progress的颜色' },
          width: { type: 'number', desc: 'Progress的宽度' },
          height: { type: 'number', desc: 'Progress的高度' },
        },
      },
      category: ['反馈'],
      theme: {
        DashboardText: {
          name: '进度条文字配置',
          desc: '仪表盘进度条文字配置',
          normal: [['color'], ['font']],
        },
        ProgressDashboardSuccessIcon: {
          name: '进度条成功图标配置',
          desc: '进度条成功图标配置',
          normal: [['color'], ['fontSize']],
        },
        ProgressDashboardErrorIcon: {
          name: '进度条失败图标配置',
          desc: '进度条失败图标配置',
          normal: [['color'], ['fontSize']],
        },
      },
      childrenWidget: [],
      aliasName: 'DashboardProgress',
    },
    target: Progress,
    screenshot:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFIAAABICAYAAABlYaJmAAAAAXNSR0IArs4c6QAAFjVJREFUeAHlXAd8FNW6n9mWvukFAiSU0IvS9dI7oahXgdCkho5I83oNQgRiwQe8KwqCQARRn3Dtgogogg+kPZAgLYpSQgjp2WT77sz9f0tmnZndTTahJb7z+539zvnOd875zn++02eWZR6g27OH90lMZM1yFea8ZFlTUKKax/M8q1QwjELB8AqW53t0NJ2cMjKwq1y+JsRV91OJ1FRe5V/PNFFXyk7MyVc9/PMVE4/6A+U6WO2MoszAAkJWSHIEOJ7xERhiuvBV69JQrW1MfB3bru7t7Wvi4kKKxOn3I3xfgJwynw8LibL8cOEW38qQ4wuAbjulgmeKioriQkNDrwq88pRb0vjtmL8v75ZfXMqMy7zim3Asg1ny9WEuZfmbpmsJcdbtSUMDV7Isa3FX1t3mORt1twsWl1c/mNFl3VI3MZjIyv502XlK5kaOvdefnNshs0VxU86juJ+fPVvOn7aRVxcWKxsJfF2Zgj3xi0/ch3sCXjx+qmSSwL/XVNKwe1VZaiprCw/hvnQtn2Uyr/kMkfOLihm3QIYGsTLLZZii80wXm51Vysto3cRq6dw+eJucf6/idxXIlLWmRRs+KDvgTtnrecrl7vjZuYrOLnwlU+zCAyMi2Pq7nB8VZk+S8yjerpnlC3RrkzztX9v5BpjENHL+ncbvCpALVvP15660Xsi45PP698f8eh09VTBZrtiXb7HnwoK5LDkf3bseGiYZq3nOFUi1imeiIzgXizRb+X7yMiND7XyvTobn5fwR83m/42f4c8vesOQdOV7cV55+J/E7BjJljfWFrGvcH1eyVM1JEZNZwXx/zH8twHGZYX00zAa5slez1cr8/Py2Er7GFcigAI6BhUkmG1oFFJYoG0vyItKxlflidHT0ZTk/OtS6SadnA09f0Gg37Ar69oMvddvkD1Gex9v4HQE5d6V9aUamKs1oVkjGqGMZPtpvf9S9LFeiyKJ4S6Vk7GI+Jgfm/B+qRDEvzo1FagM5Rq1W54rlMgqYjlYrK7FmstyuD9mWi+UoPPGffPMbueoxAr+4VMF+uDvw6dWbjVdKS0ujBH516R0BmVOgeDM4kC+VV87xLLP/qO8zUDBSnLbrNbYkIsx2VMyj8LUsZX8xb9061iwHXBvAcyEh0vVhTITNZXxs38JS+nAr7U5xeRRWq2yf2myMrL0sc/iMb+yRU/ZkuXxV47KCq5Z911q20NeHHQAr4OQ5L/yuUe05yL0r5xsMqjQ571ahqrWcp1bzkh2Pvy9nlMtYLYzkAVB62+bmdzEESPSZu9w2OSfv9tAjL2NID/2PA3uGuOgkl6ssfkdAUuGb09ijMZH8c+4q2n80YPD164WS8S8hiPkm0F9qxVm5qlAszEPEZeDhSGZcPz9pnhE7eWWhTpkgzhNX18r17qxYIeZNS+X9C0rYN8Q8Idy9vfHGlBGBLpOVkF4V6jWQL6zl6xQWFga7K3z9MuXqulG23fK0nHwlu/eI5n/EfKwpueAg7iMxz2JhzXa7vY6Y1yBe0bRJUya8S2smvms7S5vQEPYRcbrpINPcIhsfH25hPhoUFJQnllOz1k2lekWAmEfhFo0sxgmPcR3u1s6HlVfgLj5mJh+qCuKuNmlg5cb93diuUV35lo5hRqTymkAz91t+kaK+uIxAf45ZOLF4ZMe24bsE/rA5fMP4KNuhBnWsx2Oj7W+NGR70vZBWFTp3Bd84wM/8fFGJarhOr4hYOrOgT4uEyINCGVOX8C3yC/lzdo6VtLNOhI2bMEzX7W9dwn8SZMWUJh+DwRCDmT9DzK8oLKnAnSBtwZgsLvNmniKe0ts2tRgmDrN0SkgIOi+XxzotFgc1lw1GVrL06dnJWLBwsl8Mnr5Nnuduxdem8yHzJ7GShXzyi9ZLGBubiusI8OP58cN1s4b0DnlbzBfCeXl5TdE79kJXf6VS2SEiIuKGkFYRrbRrK29a9wkgUkEZmRr/jR9rTp85V9JFXjAmnxthIeyTdOwlTjue4Rv2y4WigWLe3Q7LQZy93DZVDqIChySP9y3b6gnEnJycrgDxCHRriPVltM1m+8Tdetid7hUCOXelZU5WjrqXPOOlKxrNlk/8/vfwyYIB8rQNy9jdsVG2NQI/PtZmerJ/yaQ2LcNcxlBB5l5QjlMejwjlJOvOwd0MJ5OGaqe6qw8gDgefhphwUXrn3NzcdaK4x6DHro1dgyKbs/14M1f1qKfc9aJtXNIQ/eienUNc1m0zlloPNY23qId1Nw1MSAjXeSrjXvJpWPLNs71/5Ybqqc5tjHkpM/3i0WVdllG3bt2aAT3ehPVJNhaCbsgzCOPlN0LcHfUIpCD8TJp5WXaO+kWz1fWEhWQiQ238mCH6mf26hWwU8tQ0+vwq64ApT+jO44FmyXWDxa3kOC5FzhfiAJE2HLMB5HsCzx2tFEjKlJzKN+Ws9v25BUrJjCwUGKrl+LFD9SkDe2hfEXg1ndIeGyBuBp3gSVeAuBfb0ulhYWHXPMkI/ArHSEHonVQ2s75aGd+onnW9UslLJhKSKdIp2G2fB6Z99b3ujncIQp33kn6yXxcOEL+qAMRCgDgBVjjYGxBJV6+AJEFaSP9riWZ2XDTbJSKEyyee2BG8GhXzq5hXE8M09j/a2pAKEN2uIgDgv+FbAsTtVdFf0rUnpvK+nRPKUkYMMK2KjIx0OYwQCnYM4rnWHTgCG4ELKZaWFaMTdVuShoa4nRGFfDWF0mEKFtw/A8y6gk4ALwfhWQDwU4FXbTrnJfvyYTN4flaq1Zr+77L3PW0JhQrmpVkHjn/OXvr2+/rTUEryUASZmkrRtbthtrZi2cPDby0uLg6tTFe00Reyfd3JORtPQIxfzBWWlCmchwdYD9o7tbZ8OvBR+4x69bQF7gogK05fxtjwRO/ZrsVdvXeDB1CSofcVWOG3FZWn0+nCjUbjLGA0B/JhCoWiAXrsTXEeJ5DTl/KjsnMZyQGDIBgTYbd3amXc3a8PO61RdKDklFqQ+StSWG0TgDcffiLa5y+0EWAuBfgrhDhRJ5AzllmP3bilcr2IEknjoonr1Ma8r3d749Rmzbzbg4qy15ogujxtQhbBPwYQ3U3I1wEkLe6d554OIOfO5X2yGb5MfizlqeWRoRzXvb1+38SngoaIC/MkXxv4BBgs8HHoughhyZGdB/0fiYmJOSqkOdB+4w3GgiOySc0aWg/jksksJHqieUUKRalB2eKvAiLN4gAxEwB+7CWIeB9JMVSMj4oiAIQW2TvIoyD2+dfMA1gl+8zNAmUPvMXg8m4OXmhiHmpuWU15/wqODoPRnSWXcu7aRYYDfE6A7sW28mOxjHOMFDPF4QWvWB7GNerCgmLFwJt5SjoZYdskWCxpCzTBKFByHSDOV9vCmMGXQGfJBEJtQBtpdt4HC9yr0Wj2BQcHFxJf7ioFUpxh3qt8gwC1eVGzeGvehCeDXCoVy9a2MO6M4i0Wy+/Q2warO0zAge7FpHKmxrRly5YtQVDK3ewn0XHPnj0+O3fuVEqY1Yhs3LgxAt65XPG2CJyO94IP8lZeLIfXN/EOp2gaFyfeaRiNmYMypqP8VqjHAvo9/MLk5OQL4rI3bdrUE+nLwaNTdzNkDsEi5kydOvWqWK4cHDphouXJNZzMvDh58mTJlcc777xTD+NXBtLaIe26OP+9DLOzX7Luw8V5r9BgvkgbwF0P8ucuBQVxJ6PCrT8M7hFyFo2q1o4F4PwD4LyE/C+gAT8iTCDRziDAx8fnoQkTJjh2SgCH+PvB3wvwtkAuGEDMAy8Kvvv06dOdOwjIboVcV/h5kOmP9El4tzJm5MiRzokC9VIZBcj3HNLvm1OZLEx8boFKnZ3nUJyU7wA/hjTY8QXHz11hMYYEcnnaQP6PoAD+bNsEPv3RTgGnKd2TS09Pp/HmZQAzBtYnXL2egLWcBAA/mUymscjruGsGKOsQPoO3KJIEQADYd+BlIG0p6Ex4BuCwyJ8IOnfatGnfbt++/QjKWYA9Mj0Iumdhtm7d2tJqtQ4PDAyUXHhRWnUd6vPDu0kNoHc8yohDnBbijjDiURhDHXfrCrz0FAGGW4f7YPbKDbX/z5d84g79n2+v3Yf85uYV2We7FRYx0ZhpqOySCERHKuJHwU/E7ZxjIQvroS7fCYlpAogkCGvKh9x6BJPwUHyJt3nz5uaQjcbD+YXiTz/9tB7kMuR6UZwcLquo278+duzYIgejGj9YT67EDP4R/DEsiXLgDbgQu4i6afKhW4B/go6GfxSetpCOsV9lMrMu68SK6vf3szu7mic5FE6L1c8pfceOHVps+HujwfQSwElY09eifDTWMb6+vodEPEcQZfyAwApYdkvQU7AIGi9ps1AP/gLSyULrgF5CnIEVdwNpjyXKKIpX16G8icgbS/kRJlKZo7W4RcFx0teRK8sVEmTzZgCvB+Cuo3Eper0+ByCsAYifgXcFVpgsqqMOeKXl1iVi46UntTq7nFGHKKzUANkfURY9JLLQ3iD+kKNhgNZ7r4EsmzRpkmNtS0ATvxouvyp5MMtrSF4B0L2uEO8r8LFR3JWKKsLyxQ/pdLZH+9Z28HUAQmNMCsT7AH4jQPgbKLlINNjtDSO6f8ltEcY59KBbp4D3JB7Qb8hHb+QuAnDFiD+OOIbZkG0YCkIQ/xQPTAeaBe8YY8vL8obQkOG1g563u/Zn693fDnp6oiwbXZm929FAkmkB7Jpi7DOSVkQPHDgwKzMzswesaj5Yh1EHjWVuhxaMsw4+wHO+PYHl0HHkqY8HEa9SqW6S9dG6E4vpV1DnP2icBYAEdkPEOyBvJHrCIYC7H7K/gu+No5WKD+rxKacaoshIPEcY1LG1FhfmwhASkbkywARRCUVjLGhMPio7LIAoCPTu3dsGCzmCeNdy3k3Uo6WFeGJiIo1/YhdNEaRLxuRyvf4QBDFrTwavAGPvF8RDvQNB0hHPBM1EfZkYZ4nnFZCYhWdAtkKHOsgKNXiAPjAWx5WMRyArLKmSRFT0GxrnmG3diAYi3dGdYTGnYZ1sVlYWAXtQLAt+N5RhwkR0UcwXhwES7V5S4UcQn2Z4WHJrlPsbxcvdryiHVgZ3zaE8OoeksZi8wzn6txC5WxQVpQOsXljr0brU6dAlw5DWF96x/KHlEBJp1p3nFEKAAEL+ZPhPxo0b53YMJXkA9izICVgfWTlDXR15MtCdm1KcHOpqBn/8duze/VZokXR1Gd3C+IhJz/Ywmtn2eiPbrG0zy+FRQ4IqHMDRmPeh8kIse74GeDO1Wu3ZkpKSlmjgOjTKjvSVQpMQpx3IJwBvFehG+GD4FPCj4J1y4Enctm3bws1m80LI0LLH6RD/BuUnod50WHUnhJsA8G+cAhUEIIvs1RvSHDP21s8M9Q1lbB+DgemqNzKt9UZFfEmpMrygROlrtUln9R4djEWLk/3DKtDHkUTWB+A+RKQPvOOBQcnDCE8uH78ccvSDMXUsyCo0pG458yImk/FTpkw5WR53IchDL2ppUdZUcSIdkGBh/jbqGoTyCgDiK7D8dLGMpzAW408B/PXIS7uqs5AjmoFX+86DOiZNT3nZ2an2tGs5ihc8Ccj58XWtzMvzzVHyN2PlckKcuika0wIKXqUdi8B3RwFOUzS+FHKSCcadLAB7hMbPO9nFyMvFLmY96nfpbQCR9vI07mYgPQP0LOrOwHLLOemxYxfzo3Sl7m8P5RVRnF4G+K9FRaMSGoXvdJdem3kAkraCzarQhiW4t0kjeZXFwvzkbUbc53ANY61XrucoHSc33uarDXLYodTFUFQVEGmyOyW0zTFGjlnAlZQaWK3AFFN8jmZrUNf2S0y47b2+nQLeSkhw/VBdLF9bw7BEJcbI3ujGozAMPYF2hFfUFsjxOA4MR/emTcXtSUAbaD9dalD1vJ2RZ+rF2I31o23HYqJsb0/6e+BOlsXnVH9xVz4O7kcz99M4CQvtD0oHILT9pJWExIF3UQCREhyzKe6z32tc39YmNsr6Qx28tjzuMS3Nrg43WQj8P6IA1Ybmfk0egGkwdg4iS0V8OOLClvbzO4Yk7b/56NR15o8zM/O73HFhNaAAgOPVwQ3k/ADqk/A7MQw8JFbdqwKEDCs38LF6g2Xrb1fV/UwWVjGom+H6rLH+cTReCDK1jQIU6sJr0IYXsc/+rLr6ewVk6gY+3qg3b718zaen2fLny6kaNc/MG1eyoEeX0LXVVeBB5gOAvrCss6BNyvU4DkBTACiNlVVyFQL5/BpTE96uSP/1qupvVpv06ymhFny2ZpwzWhcFVybwagsFiCswQy9xo++BckC9Xho6Jht5QcvfNLfSlTFbLl5Wd7bjdFGeLsTxEj7XuL51U20EEVZIk8g4oS0y2hvpR3Bv8xUAXQILPSNLd4m6gDRvpXXn1WzVU3Z8sO8iLWK0a2bO79bBNHBQjxDnolSUXCuCeIE0Aq9Avwtlh3hSGEACU/4jLL6XwmA8nmm6HKPhVjGjIhDpW76hPct2rXjWJ6Y2g0jA4VQqH9Y2DMEF8BbiyR1AJINKAj0PC54lTxfiLkBqihWv44+KDIKAmCbEWfTjhxsSp48OGokn5byUJxl6BfqF1aaDP53SDRfnqUlhgKGCl3xyTBaH/fJa3L08grBHi0M+fGPL7vPUHrfdd9ZL9vnXbyrWCJk0agb/WmI8OGe8XyIKMwp8gY6YxQeGRdjPZecqG+A1aW5Ef92sAT3D6GyxxriCggItjtfoU+cAdNPB7r7awORDp/cb4F3GTrR7Nax3kacGuQWShKemWE/cKlB1bFDHZunV0ThjxBBturtC6O+6WH/7hVsFSudpeEgQx48aXJY6tE/wcnd57jcPINYHiLsBUBuqG6AcAZiD3IFJ6ejCT4O8BXnHLgby2bj2bYmPl0oo3Z1z6dqCUEGxalDn1sYvnkkyxnoCccZKPpbz5S6LQaT89A8mBcUs3cM8cAcwlADxOwFEUgjhR7Hs+cbTm2ewvO0AugMAPA1Pm42JFYFIZXq0SEqsyC1exSfk5NlPF5cqJWMO5aH/ilic7NcQSlgrKuN+paHLTgBw78rrg34/4SR+UHi4+693AbgGeRMBbKU7nmoB+WyapX1ekfIw/rPH5aYQ/5Jnnj5O17hZ/T+/eoBC0PnBbiPRXbdBD+qyEge9jgLMgZ7AlAhXEPHYtT3lWbzK2h1/+nHUHYj0lewTfUxPiUGkch40iKQD1oCzoAfdWEocwO2KK9x9NBlJEqoYqRKQi141Dbt6Q3kAl2NqeT0qJc880U+/pnsX7VfytJoQB4j0KspIeOddtEivLgRmZZ8MiuRdgl53bfqDNrWCy8Grfm6f3LCe+uPTRgfW+GM1dHF8bclvcEHiNuM4Zuf+1enmXlsk/vjDGOCv6IfFussE0qm1qTA5KaC3B+VqFBsTB13V0nrSnWuDGb6Vu4TKeF4DSQW9s4I9oQ1iHw4O5JwnPVhn2ob01NPrJW53Q5Up8CDSYXX0Mefv4roRL8PuhmZor098xPmrBCRlBJjnzGZFo8gw7gb+mot/oq95Yoc2ERfEhdb0MK0JAVoSwBN61zWsG3thgf7Dfded9tbr39M/ft8rvosV4phsPvx38n8VrE4V/wGqYovD6pnE3wAAAABJRU5ErkJggg==',
  },
  {
    meta: {
      widgetName: 'Radio',
      title: '单选框',
      desc: '单选框。',
      props: {
        checked: { type: 'boolean', desc: '单选框是否选中' },
        defaultChecked: { type: 'boolean', desc: '单选框初始是否选中' },
        disabled: { type: 'boolean', desc: '单选框是否禁用' },
        value: { type: 'string', desc: '单选框的 value 值', defaultValue: true },
        children: { type: 'string | React.node', desc: 'Radio展示内容' },
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
      childrenWidget: ['Radio.Group'],
      category: ['数据录入'],
      theme: {
        Container: {
          name: '整体样式',
          desc: '整体样式',
          normal: [['opacity'], ['margin'], ['padding'], ['width'], ['height']],
        },
        RadioText: {
          name: '文字样式',
          desc: '文字样式',
          normal: [['color'], ['font']],
          hover: [['color'], ['font']],
          disabled: [['color'], ['font']],
        },
        RadioEdgeUnChecked: {
          name: '未选中外框样式',
          desc: '未选中外框样式',
          normal: [
            ['background'],
            ['border'],
            ['borderRadius'],
            ['boxShadow'],
            ['width'],
            ['height'],
          ],
          hover: [['background'], ['borderRadius'], ['border']],
          disabled: [['background'], ['borderRadius'], ['border']],
        },
        RadioEdgeChecked: {
          name: '选中外框样式',
          desc: '选中外框样式',
          normal: [
            ['background'],
            ['border'],
            ['borderRadius'],
            ['boxShadow'],
            ['width'],
            ['height'],
          ],
          hover: [['background'], ['borderRadius'], ['border']],
          disabled: [['background'], ['borderRadius'], ['border']],
        },
        RadioInnerChecked: {
          name: '选中内框样式',
          desc: '选中内框样式',
          normal: [['background'], ['width'], ['height']],
          hover: [['background']],
          disabled: [['background']],
        },
        RadioEdgeCancel: {
          name: '取消状态外框样式',
          desc: '取消状态外框样式',
          normal: [
            ['background'],
            ['border'],
            ['borderRadius'],
            ['boxShadow'],
            ['width'],
            ['height'],
          ],
          hover: [['background'], ['borderRadius'], ['border']],
          disabled: [['background'], ['borderRadius'], ['border']],
        },
        RadioInnerCancel: {
          name: '取消状态内框样式',
          desc: '取消状态内框样式',
          normal: [['background'], ['width'], ['height']],
          hover: [['background']],
        },
      },
    },
    target: Radio,
    screenshot:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAAAYCAYAAABKtPtEAAAAAXNSR0IArs4c6QAAAyxJREFUWAnlWE1rU0EUvTNpdFN/gKG46SYouPIXuBBETFPBnZtCBIOtVKHQnXUXKGixlQgW3LgTbBopggt/gStByaYbKf0D1UVNk/GcmzdJJW0+BnzNIwNhXt6ce949986bd2eM9Gh3FtxU40hmmiK3jMg0oJkIvu9Edq3ITmpCtj+sm70eNCM9BF3dLTfvMq4hz4yTOQhNdSM6d0DQcEbempQ8rW6Y/c5IMq66ApArupw4eQfhFzBYFyMV9BVr5euEExV4ZCTTbMo1YPLA5tGngTkA9l61bKrJkN7y8p8AzDxwj5DNF86JxcCWTctSZd3s9hKUX3DTzbqsIgizxkgTs+bx9mvzspfNKI21A6CZh+jIuWVkcpXXt++7KxBVQKZvIMOXdNzJT1x/RrA2P74x33kP9kvoSjqOYPSbCbVaDTHr37LZrPr4v/BYx+A83nmd9sg8/qr4uyvuXK7gNiD+G2bEIry9jH5Sf63rRY4RQ2wUsGXOHnIpZ399Z47QAHDBg0C+81sUQkGHe/IJYh6qoFPc5BgxxPogkINc5DzFbKRuW37qkMk5OF7nO0/vIOg5hF0f1FNiaUM8OchFTnIPynFWOMvvPDKW4mrPBY/vPJwpBjhUpK0umuAiJ7kDeGI1sSxy+ERkraI9FjxO7WG9oA2yXjjO5bmH5YoTz88dKzzhd14fzNU+tEW2nstzh9LFYcdMa3nri5z2py7k6dFnss3VKZ1D2GKxGXqqD+LV4STfqGQ0BqBd3qrLLHJCW2Sb+i0XI4qR3xtYrNZa6rK2V6dR4YXqR97V1nN57mC+GAyxXskOnwNn89qjvGVNP+yzacPS+DiX5x6WK0685X4eL2wDEchzYxPV9uUAJ8q0JQe5yEnuAJ5YTSwPM7ifxwxIc1fHp5+fkifI6JdBPSGWNsRHO8M0OZNwUMJFUHiYgYwdIAiz3NW9XzF/IOgmhL3i1CbmpMYxYoilDW3JQS5ynmQzavc0AHqSg8OMSGzJB6G6aeaRyau4vwZRP9D/0l/reo1jxHjxEFdSDh6MJOR0CLo6bawPRHwYkP3xPRJrB2GcD0V9ENiPw7H4X629g775Is/PAAAAAElFTkSuQmCC',
  },
  {
    meta: {
      widgetName: 'Radio.Group',
      title: '单选框',
      desc: '单选框。',
      props: {
        defaultValue: { type: 'string', desc: '单选框初始选中值' },
        value: { type: 'string', desc: '单选框选中值' },
        data: {
          type: 'Object[]',
          desc: '单选框信息',
          defaultValue: [
            { text: '选项1', value: '1' },
            { text: '选项2', value: '2' },
            { text: '选项3', value: '3' },
          ],
        },
        displayField: { type: 'string', desc: '单选框的 显示字段值', defaultValue: 'text' },
        valueField: { type: 'string', desc: '单选框的 value 值', defaultValue: 'value' },
        displayValue: { type: 'string', desc: '单选框的 value 备用值，value 找不到时展示' },
        styles: { type: 'RadioStylesType', desc: '单选框的展示方向，可选值为 vertical 或不设' },
        childType: { type: 'RadioChildType', desc: '指定Radio展示类型，可设置为 button 或不设' },
        size: {
          type: 'RadioButtonSizeType',
          desc: '指定 Radio 大小，仅展示类型为button 时生效，可设置为 small、large、bigger 或不设',
        },
      },
      event: {
        onChange: {
          desc: 'Radio 改变时回调',
          args: [
            {
              name: 'newValue',
              desc: 'Radio改变时 value、displayValue 和 item 对应的值',
              type: 'Object',
            },
          ],
        },
      },
      type: {
        RadioStylesType: ['default', 'vertical'],
        RadioChildType: ['default', 'button'],
        RadioButtonSizeType: ['default', 'small', 'large', 'bigger'],
        RadioStyle: {
          color: { type: 'string', desc: 'Radio 的颜色' },
          width: { type: 'number', desc: 'Radio 的宽度' },
        },
      },
      category: ['数据录入'],
      designInfo: {
        RadioButtonGroup: {
          sequence: 1,
          title: '按钮状单选框组',
          desc: '按钮形状的单选框组',
          props: { childType: 'button' },
          theme: {
            Container: {
              name: '单选框组整体样式',
              desc: '单选框组整体样式',
              normal: [
                ['opacity'],
                ['border'],
                ['borderRadius'],
                ['background'],
                ['width'],
                ['height'],
                ['margin'],
                ['padding'],
              ],
            },
            CheckButton: {
              name: '按钮单选框样式',
              desc: '按钮单选框样式',
              theme: {
                CheckButtonUnChecked: {
                  name: '未选中样式',
                  desc: '未选中样式',
                  normal: {
                    selectNames: [
                      ['opacity'],
                      ['border'],
                      ['borderRadius'],
                      ['background'],
                      ['width'],
                      ['height'],
                      ['color'],
                      ['font'],
                      ['padding'],
                    ],
                    nth: [
                      ['opacity'],
                      ['border'],
                      ['borderRadius'],
                      ['background'],
                      ['width'],
                      ['height'],
                      ['color'],
                      ['font'],
                      ['padding'],
                    ],
                  },
                  hover: {
                    selectNames: [
                      ['opacity'],
                      ['border'],
                      ['borderRadius'],
                      ['background'],
                      ['color'],
                    ],
                    nth: [['opacity'], ['border'], ['borderRadius'], ['background'], ['color']],
                  },
                  disabled: {
                    selectNames: [
                      ['opacity'],
                      ['border'],
                      ['borderRadius'],
                      ['background'],
                      ['color'],
                    ],
                    nth: [['opacity'], ['border'], ['borderRadius'], ['background'], ['color']],
                  },
                },
                CheckButtonChecked: {
                  name: '选中样式',
                  desc: '选中样式',
                  normal: {
                    selectNames: [
                      ['opacity'],
                      ['border'],
                      ['borderRadius'],
                      ['background'],
                      ['width'],
                      ['height'],
                      ['color'],
                      ['font'],
                      ['padding'],
                    ],
                    nth: [
                      ['opacity'],
                      ['border'],
                      ['borderRadius'],
                      ['background'],
                      ['width'],
                      ['height'],
                      ['color'],
                      ['font'],
                      ['padding'],
                    ],
                  },
                  hover: {
                    selectNames: [
                      ['opacity'],
                      ['border'],
                      ['borderRadius'],
                      ['background'],
                      ['color'],
                    ],
                    nth: [['opacity'], ['border'], ['borderRadius'], ['background'], ['color']],
                  },
                  disabled: {
                    selectNames: [
                      ['opacity'],
                      ['border'],
                      ['borderRadius'],
                      ['background'],
                      ['color'],
                    ],
                    nth: [['opacity'], ['border'], ['borderRadius'], ['background'], ['color']],
                  },
                },
                CheckButtonCancel: {
                  name: '取消状态样式',
                  desc: '取消状态样式',
                  normal: [
                    ['opacity'],
                    ['border'],
                    ['borderRadius'],
                    ['background'],
                    ['width'],
                    ['height'],
                    ['color'],
                    ['font'],
                    ['padding'],
                  ],
                  hover: [['opacity'], ['border'], ['borderRadius'], ['background'], ['color']],
                },
              },
            },
          },
        },
      },
      needExport: true,
      theme: {
        Container: {
          name: '单选框组整体配置',
          desc: '单选框组整体配置',
          normal: [
            ['opacity'],
            ['border'],
            ['borderRadius'],
            ['background'],
            ['width'],
            ['height'],
            ['margin'],
            ['padding'],
          ],
        },
        Radio: {
          name: '配置单选框样式',
          desc: '配置单选框样式',
          theme: {
            Container: {
              name: '整体样式',
              desc: '整体样式',
              normal: [['opacity'], ['margin'], ['padding'], ['width'], ['height']],
              hover: [['opacity']],
              disabled: [['opacity']],
            },
            RadioText: {
              name: '文字样式',
              desc: '文字样式',
              normal: [['color'], ['font']],
              hover: [['color'], ['font']],
              disabled: [['color'], ['font']],
            },
            RadioEdgeUnChecked: {
              name: '未选中外框样式',
              desc: '未选中外框样式',
              normal: [
                ['background'],
                ['border'],
                ['borderRadius'],
                ['boxShadow'],
                ['width'],
                ['height'],
              ],
              hover: [['background'], ['borderRadius'], ['border']],
              disabled: [['background'], ['borderRadius'], ['border']],
            },
            RadioEdgeChecked: {
              name: '选中外框样式',
              desc: '选中外框样式',
              normal: [
                ['background'],
                ['border'],
                ['borderRadius'],
                ['boxShadow'],
                ['width'],
                ['height'],
              ],
              hover: [['background'], ['borderRadius'], ['border']],
              disabled: [['background'], ['borderRadius'], ['border']],
            },
            RadioInnerChecked: {
              name: '选中内框样式',
              desc: '选中内框样式',
              normal: [['background'], ['width'], ['height']],
              hover: [['background']],
              disabled: [['background']],
            },
            RadioEdgeCancel: {
              name: '取消状态外框样式',
              desc: '取消状态外框样式',
              normal: [
                ['background'],
                ['border'],
                ['borderRadius'],
                ['boxShadow'],
                ['width'],
                ['height'],
              ],
              hover: [['background'], ['borderRadius'], ['border']],
              disabled: [['background'], ['borderRadius'], ['border']],
            },
            RadioInnerCancel: {
              name: '取消状态内框样式',
              desc: '取消状态内框样式',
              normal: [['background'], ['width'], ['height']],
              hover: [['background']],
            },
          },
        },
      },
      parentWidget: 'Radio',
    },
    target: Radio.Group,
    screenshot:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAAA8CAYAAADWibxkAAAAAXNSR0IArs4c6QAABW1JREFUaAXtWstqHEcUraqeTjbWB0SIbLQRCUQg6QuyCAST8SiQnTcCBSz8wA4ItLO9EwgSEzsoEIM22gWikYIIZOEvGAkUcNDGm2D0A0pAzjwq51xVjaSMPI9WzaPdXdBUz9S9p+499b5dWrVJX961E/WautFQ6rpWahKi4078yCr1yii1GxXU9i9P9es2MCNdBL9aU/GOHbd19VhbtQBHo1aJs38AULdabehIPdx5po/OStLx1kJAcckWlVWbcHwMhVWlVRl52RhVKVglDta0Gm801BxkSpAtIY8hcwzZmzvreicdrp9aeYGAG7fsPbTmd9Yqg4ItE6vl8lP9qp1Dpbt2slFVayBhXmvVQK95sP2j/r6dziiVNQmQlofTzrgVtOQa37/42n4MpxbR0p+hhT+Ucqv+wvvvIOv5rz/pl/wP+svIVqUcZHTqCYeHh+Csc5qamhIb+yWPeQzGY8xLt0fL46c4/9Uj+15x0T6D83+gR9yHtR8hvybP6ft9llGGso6wFfYeYglmZ/+GLiEEcMKDgxzzW3SEDr15rX6DM7fFobeYyTLKUNaTQAxiEfMtaiP1t+FSh5ZcgOFVjnlaB4e+hWOfdmspZalDeWIQi5jE7hZjWHKG6zxaLOJszwmPYx7GLCUwaIm6MmkCi5jEToAzUBXDTQ5rRKuVJceEx67dqxXUQasvnsfy2L1iDVKeyx13eIrrvFTM2T5pcroey2MnhRuEHltatrd+k9Nc6pLU7pbJJtbZ1jkJ2kB0eu7q3Vj15hpHVDoSCWhub8VkbnKSJqcb/aM+cBAjfzYwmK1lq8u9vRiNHV5S/9HuouuxPHZivAEoYr5Su6wHxpYkx/aWe/pe66YOt8bnsTx2r1iDlDc8z2PA1sFAiQcbt7dfT2DEOnWJQSxiEjsBzkBVDIMZPM+jB8Q81bH29yfUN2jRF91aQlnqUN6dDGNipiFQwklQMZiBFjsGCfM81f38SP8Lhz6HYz+wa1PmssQyylCWOtQlBrGIeZnOqP0nBEgkB8EM5+yqJ2Hnub6DlvwE/z+BU38i/1ue0/cnLKOMdx7OrQoGAyMpiQ7Br7OU6YCIpwGtn92QWJOELAdFPQnMsxAWP+9v/p4zkDOQM5AzkDOQM5AzkDOQM5AzkB0GLsQD/u/2wcHBRK1W4/e969baSa21fETB+xHeGU3eLRQK29PT0+/WHaH9/X1cgWk8hoMLeNreEUJ5Hc+GMebhzMzMyH8HgK0XUksPgPNFOL8JqTE8VTz8aFpGS1fiOBYHq9XqOHoGvyMwlM4nxnMMEm6ChPTeEapUKvfQtXFHyBrkW8iX5+bm2t4Rgg6HxhpkcUdIN5A/gE767gix5WF8847Q7OyshMjRsl2lvb295h0hEDHfqSf0685Pr3eKJCrsxvwmCODvlV6dJ0NOB3eErOEQImZXzA1ZSAhwE94Yu30S570P1CUGfo85TF80srnhUgfrONtX0XpyR+gq1joMTp4LDvsqcH3XNW6d51JX7jThdWONw+DKETnsbtSGJsMhIHeEkNPoUMljeexQuMFxcM8PX3ORuM6HQvdYHjsUbj9wuN7LbO03OSEq8VgeOwRmvzBkFQgNHkVRyw4zdB2h8DgEmtvbUKAnJydyR8hjh8LtBw6HgGx13d4+SB0ey2MHAe0TCIeA3BFCzkNNqOSxPHYo3OA4hud5oPJIW+LB5qo1OAwSUHfYV4Xsq75xwYwN1BKjy/Z0ALrMMofB4/FGGgIlsgowmAGDjzFpzbtT3WW+dfyPusQglsPsqDNsASGAkRwGM9B6vBC1moQEfxwmhguMpCI6dGG9znRAxHfFTIfEzpGQ3aCoJ4F5FsLi/wGwPbJ73Y3raAAAAABJRU5ErkJggg==',
  },
  {
    meta: {
      widgetName: 'Rate',
      title: '评分',
      desc: '评分组件',
      props: {
        count: { type: 'number', desc: '展示的 star 总数', defaultValue: 5 },
        max: { type: 'number', desc: '最大分值', defaultValue: 5 },
        disabled: { type: 'boolean', desc: '禁用状态,不可进行交互', defaultValue: false },
        allowHalf: { type: 'boolean', desc: '是否允许半选', defaultValue: false },
        classify: { type: 'boolean', desc: '是否区分颜色', defaultValue: false },
        iconClass: {
          type: 'object[]',
          desc: '自定义图标对象',
          meta: [
            { key: 'default', title: '默认图标名称', type: 'string' },
            { key: 'primary', title: '选中状态图标名称', type: 'string' },
            { key: 'danger', title: '低分值图标名称', type: 'string' },
            { key: 'amazed', title: '高分值图标名称', type: 'string' },
            { key: 'half', title: '半星图标名称', type: 'string' },
          ],
          defaultValue: {
            default: 'lugia-icon-financial_star',
            primary: 'lugia-icon-financial_star',
            danger: 'lugia-icon-financial_star',
            amazed: 'lugia-icon-financial_star',
            half: 'lugia-icon-finacial_half_star',
          },
        },
        value: { type: 'number', desc: '当前分值', defaultValue: 0 },
        character: { type: 'string | React$Element<any>', desc: '自定义展示字符' },
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
      designInfo: {
        ClassifyRate: {
          sequence: 1,
          title: '分级图标评分',
          desc: '按分值等级展示不同图标样式和颜色',
          props: {
            classify: true,
            iconClass: {
              default: 'lugia-icon-financial_meh',
              danger: 'lugia-icon-financial_sad',
              amazed: 'lugia-icon-financial_smile',
            },
          },
          theme: {
            ActiveIcon: {
              name: '选中状态的图标',
              desc: '选中的星星的样式',
              normal: [['color']],
              hover: [],
              clicked: [],
              disabled: [],
            },
            DefaultRateIcon: {
              name: '默认状态的图标',
              desc: '默认的星星的样式',
              normal: [['color'], ['margin'], ['fontSize']],
              hover: [],
              clicked: [],
              disabled: [],
            },
            DangerIcon: {
              name: '低分值样式',
              desc: '选中的图标数少于一半时的样式配置',
              normal: [['color']],
              hover: [],
              clicked: [],
              disabled: [],
            },
            AmazedIcon: {
              name: '高分值样式',
              desc: '选中的图标数超过一半时的样式配置',
              normal: [['color']],
              hover: [],
              clicked: [],
              disabled: [],
            },
          },
        },
        TextRate: {
          sequence: 2,
          title: '文字评分',
          desc: '按分值等级展示不同图标样式和颜色',
          props: { character: '好' },
          theme: {
            ActiveTextIcon: {
              name: '选中状态的文字',
              desc: '选中的文字的样式配置',
              normal: [['color']],
              hover: [],
              clicked: [],
              disabled: [],
            },
            DefaultTextIcon: {
              name: '默认状态的文字的',
              desc: '默认的文字的样式配置',
              normal: [['color'], ['margin'], ['fontSize']],
              hover: [],
              clicked: [],
              disabled: [],
            },
          },
        },
      },
      theme: {
        ActiveIcon: {
          name: '选中状态的图标',
          desc: '选中的星星的样式',
          normal: [['color']],
          hover: [],
          clicked: [],
          disabled: [],
        },
        DefaultRateIcon: {
          name: '默认状态的图标',
          desc: '默认的星星的样式',
          normal: [['color'], ['margin'], ['fontSize']],
          hover: [],
          clicked: [],
          disabled: [],
        },
      },
      childrenWidget: [],
    },
    target: Rate,
    screenshot:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAOCAYAAABQFS4BAAAAAXNSR0IArs4c6QAAAxBJREFUSA21ls1LG0EYxudrN8lGd3OKQZD00FsqIiK9iPQf8OKhl9yKpxY8FHsQPKR4KUgtigieCtK/Qjx4KHi0HxaEHDQHQRKyNiLZfOzu9JltkpqQrbSJA5udfd95Mr/3zbNDCAkZ+Xw+IqWMhqTvDee3H0fkx2cPpmdhBKZpbl1dXX0Ky98Xn/DiW3X7+sH0tB/A5eXlhBDilFJq+L4/nUqlTvutC4tV3z+ZEExTGqPuetOjb74NXd+345zzbCwWM6PRqMDmL8IAw+KcallNoyYuoXH2IPqg47ZtW7VazWKMWejyOLy9h46ncSfoeAn3JV3XL5Cr3GCk0+nru9Dy3YxVixGLeQ1LMjZOfLonGE1LLPKkLBFKlyKEXhBXVipN9yax+n1gPYWPJwF8ALg49omh20IBe54XsCFH1OW6rgo4KMhBMYvJZPKzWlDfnJkkxD8gRMYBGgOwCIB99UkIQ2s4Ppqe9DB1BKdOo+kvxla+DqRnmqYVAHpoGMYoOioA2IFWGwNSQSt4Ho/HR1DQMZ7PVE6NWyEKgD7UdTYKPuEC2GtBq7yaAloVwPUIG8HXHUeJGFgfWAXgrFQqvUW3VwHFVcd7BwqUgN7BupVMJtO4m5c5whrmNPRk1fMk71WrTYSg0JMdrdJYobkfA+sD8DYEbLOOF3INfm+HgjtipF6v746Njb3qSvQ8OJtT6xGNr8EKXRldYwSx3ejrL0PTd50qsIWt/NwesE4wVTH8Cj/b8bA7VtstSbCk3RUVw68wVL067joDgPPK07BF4G1lGTVXLyrmc7hQC+11QkdPJJ1XhBqnWK/8DT3MLWF0qOYQatXwR9I1+wd9p73lctkE1GwL+gyQz1HEAqBPVAxFTRUKhVTXRnceyttPTULJLAE03sUzeB16ueBKeUI5U8RT1Q8zQ9N3Og5AA7C24zj7AN1IJBLBWVssFo+q1eoywLM4edSR2XdEarcG3kDbbXr7mu5t0Je/z+piLnNkJcgyZSTL/eDIHb7+/Pw89E/R33JtEpkL/1Mlc49Cv/t/9L8AUt8EM4LPje0AAAAASUVORK5CYII=',
  },
  {
    meta: {
      widgetName: 'Rate',
      title: '分级图标评分',
      desc: '按分值等级展示不同图标样式和颜色',
      props: {
        count: { type: 'number', desc: '展示的 star 总数', defaultValue: 5 },
        max: { type: 'number', desc: '最大分值', defaultValue: 5 },
        disabled: { type: 'boolean', desc: '禁用状态,不可进行交互', defaultValue: false },
        allowHalf: { type: 'boolean', desc: '是否允许半选', defaultValue: false },
        classify: { type: 'boolean', desc: '是否区分颜色', defaultValue: true },
        iconClass: {
          type: 'object[]',
          desc: '自定义图标对象',
          meta: [
            { key: 'default', title: '默认图标名称', type: 'string' },
            { key: 'primary', title: '选中状态图标名称', type: 'string' },
            { key: 'danger', title: '低分值图标名称', type: 'string' },
            { key: 'amazed', title: '高分值图标名称', type: 'string' },
            { key: 'half', title: '半星图标名称', type: 'string' },
          ],
          defaultValue: {
            default: 'lugia-icon-financial_meh',
            danger: 'lugia-icon-financial_sad',
            amazed: 'lugia-icon-financial_smile',
          },
        },
        value: { type: 'number', desc: '当前分值', defaultValue: 0 },
        character: { type: 'string | React$Element<any>', desc: '自定义展示字符' },
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
      theme: {
        ActiveIcon: {
          name: '选中状态的图标',
          desc: '选中的星星的样式',
          normal: [['color']],
          hover: [],
          clicked: [],
          disabled: [],
        },
        DefaultRateIcon: {
          name: '默认状态的图标',
          desc: '默认的星星的样式',
          normal: [['color'], ['margin'], ['fontSize']],
          hover: [],
          clicked: [],
          disabled: [],
        },
        DangerIcon: {
          name: '低分值样式',
          desc: '选中的图标数少于一半时的样式配置',
          normal: [['color']],
          hover: [],
          clicked: [],
          disabled: [],
        },
        AmazedIcon: {
          name: '高分值样式',
          desc: '选中的图标数超过一半时的样式配置',
          normal: [['color']],
          hover: [],
          clicked: [],
          disabled: [],
        },
      },
      childrenWidget: [],
      aliasName: 'ClassifyRate',
    },
    target: Rate,
    screenshot:
      'data:image/png;base64,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',
  },
  {
    meta: {
      widgetName: 'Rate',
      title: '文字评分',
      desc: '按分值等级展示不同图标样式和颜色',
      props: {
        count: { type: 'number', desc: '展示的 star 总数', defaultValue: 5 },
        max: { type: 'number', desc: '最大分值', defaultValue: 5 },
        disabled: { type: 'boolean', desc: '禁用状态,不可进行交互', defaultValue: false },
        allowHalf: { type: 'boolean', desc: '是否允许半选', defaultValue: false },
        classify: { type: 'boolean', desc: '是否区分颜色', defaultValue: true },
        iconClass: {
          type: 'object[]',
          desc: '自定义图标对象',
          meta: [
            { key: 'default', title: '默认图标名称', type: 'string' },
            { key: 'primary', title: '选中状态图标名称', type: 'string' },
            { key: 'danger', title: '低分值图标名称', type: 'string' },
            { key: 'amazed', title: '高分值图标名称', type: 'string' },
            { key: 'half', title: '半星图标名称', type: 'string' },
          ],
          defaultValue: {
            default: 'lugia-icon-financial_meh',
            danger: 'lugia-icon-financial_sad',
            amazed: 'lugia-icon-financial_smile',
          },
        },
        value: { type: 'number', desc: '当前分值', defaultValue: 0 },
        character: {
          type: 'string | React$Element<any>',
          desc: '自定义展示字符',
          defaultValue: '好',
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
      theme: {
        ActiveTextIcon: {
          name: '选中状态的文字',
          desc: '选中的文字的样式配置',
          normal: [['color']],
          hover: [],
          clicked: [],
          disabled: [],
        },
        DefaultTextIcon: {
          name: '默认状态的文字的',
          desc: '默认的文字的样式配置',
          normal: [['color'], ['margin'], ['fontSize']],
          hover: [],
          clicked: [],
          disabled: [],
        },
      },
      childrenWidget: [],
      aliasName: 'TextRate',
    },
    target: Rate,
    screenshot:
      'data:image/png;base64,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',
  },
  {
    meta: {
      widgetName: 'Select',
      title: '选择器',
      desc: '选项过多时，弹出下拉菜单给用户选择操作',
      props: {
        data: {
          type: 'Object[]',
          desc: '生成选择项的数据',
          meta: [
            { key: 'value', title: 'value值', type: 'string' },
            { key: 'text', title: '文本值', type: 'string' },
          ],
        },
        mutliple: { type: 'boolean', desc: '是否多选', defaultValue: false },
        canSearch: { type: 'boolean', desc: '是否支持查询', defaultValue: false },
        canClear: { type: 'boolean', desc: '是否展示清空图标', defaultValue: true },
        createPortal: { type: 'boolean', desc: '是否全局弹出下拉框', defaultValue: true },
        throttle: { type: 'number', desc: '查询的延迟时间，单位为毫秒', defaultValue: 100 },
        canInput: {
          type: 'boolean',
          desc: '是否支持自定义值,只有在canSearch为true时才生效',
          defaultValue: false,
        },
        valueField: { type: 'string', desc: 'data数据的value值的名称', defaultValue: 'value' },
        displayField: {
          type: 'string',
          desc: 'data数据的displayValue值的名称',
          defaultValue: 'text',
        },
        disabled: { type: 'boolean', desc: '是否禁选', defaultValue: false },
        validateStatus: {
          type: 'ValidateStatus',
          desc: "input校验状态, 'success' 成功 | 'error'错误",
          defaultValue: 'success',
        },
        limitCount: { type: 'number', desc: '多选时最多个数' },
        placeholder: { type: 'string', desc: '占位符' },
        searchType: {
          type: 'start | end | include | eql',
          desc: '查询的方式',
          defaultValue: 'include',
        },
        value: { type: 'string | string[] | number | number[]', desc: '指定当前选中的条目' },
        displayValue: {
          type: 'string | string[] | number | number[]',
          desc: '指定当前选中的条目的displayValue值',
        },
        defaultValue: {
          type: 'string | string[] | number | number[]',
          desc: '初始状态下指定当前选中的条目,只生效一次',
        },
        defaultDisplayValue: {
          type: 'string | string[] | number | number[]',
          desc: '初始状态下指定当前选中的条目的displayValue值,只生效一次',
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
      designInfo: {
        MutlipleSelect: {
          sequence: 1,
          title: '多项选择器',
          desc: '支持多项选择',
          props: { mutliple: true },
          theme: {
            InputTag: {
              name: '数据展示框',
              theme: {
                InputTagWrap: {
                  name: 'Inputtag的外盒',
                  desc: '配置展示选中数据的外盒样式',
                  normal: [
                    ['width'],
                    ['height'],
                    ['margin'],
                    ['padding'],
                    ['color'],
                    ['background'],
                    ['border'],
                    ['boxShadow'],
                    ['borderRadius'],
                    ['font'],
                    ['opacity'],
                  ],
                  hover: [
                    ['color'],
                    ['background'],
                    ['border'],
                    ['boxShadow'],
                    ['borderRadius'],
                    ['font'],
                    ['opacity'],
                  ],
                  active: [],
                  disabled: [],
                },
                SwitchIcon: {
                  name: '下拉图标',
                  desc: '配置下拉或清除按钮的图标样式',
                  normal: [['margin'], ['padding'], ['color'], ['font'], ['opacity']],
                  hover: [['color'], ['font'], ['opacity']],
                  active: [],
                  disabled: [],
                },
                TagWrap: {
                  name: '标签',
                  desc: '配置展示选中项的标签样式',
                  normal: [
                    ['width'],
                    ['height'],
                    ['background'],
                    ['color'],
                    ['font'],
                    ['fontSize'],
                    ['border'],
                    ['borderRadius'],
                    ['boxShadow'],
                    ['opacity'],
                    ['padding', 'left'],
                    ['padding', 'right'],
                    ['margin', 'left'],
                    ['margin', 'right'],
                  ],
                  hover: [
                    ['background'],
                    ['color'],
                    ['borderRadius'],
                    ['border'],
                    ['font'],
                    ['opacity'],
                    ['boxShadow'],
                  ],
                  active: [],
                  disabled: [],
                },
                TagIcon: {
                  name: '标签删除按钮',
                  desc: '配置标签删除按钮样式',
                  normal: [['color'], ['font'], ['fontSize'], ['opacity']],
                  hover: [['color'], ['font'], ['fontSize'], ['opacity']],
                  active: [],
                  disabled: [],
                },
                Menu: {
                  name: '隐藏更多选中项的菜单',
                  theme: {
                    MenuWrap: {
                      name: '菜单外盒',
                      desc: '配置菜单组件的外盒样式',
                      normal: [
                        ['width'],
                        ['height'],
                        ['boxShadow'],
                        ['background'],
                        ['opacity'],
                        ['border'],
                        ['borderRadius'],
                        ['margin'],
                        ['padding'],
                      ],
                      hover: [
                        ['boxShadow'],
                        ['background'],
                        ['opacity'],
                        ['border'],
                        ['borderRadius'],
                      ],
                      clicked: [],
                      disabled: [],
                    },
                    MenuItem: {
                      name: '菜单项配置',
                      theme: {
                        MenuItemWrap: {
                          name: '项的外盒',
                          desc: '配置每一项的外盒',
                          normal: [
                            ['height'],
                            ['background'],
                            ['border'],
                            ['borderRadius'],
                            ['opacity'],
                            ['color'],
                            ['padding'],
                          ],
                          hover: [
                            ['background'],
                            ['border'],
                            ['borderRadius'],
                            ['opacity'],
                            ['color'],
                            ['font'],
                          ],
                          active: [
                            ['background'],
                            ['border'],
                            ['borderRadius'],
                            ['opacity'],
                            ['color'],
                            ['font'],
                          ],
                        },
                      },
                    },
                  },
                },
              },
            },
            Menu: {
              name: '弹开菜单',
              theme: {
                MenuWrap: {
                  name: '菜单外盒',
                  desc: '配置菜单组件的外盒样式',
                  normal: [
                    ['width'],
                    ['height'],
                    ['boxShadow'],
                    ['background'],
                    ['opacity'],
                    ['border'],
                    ['borderRadius'],
                    ['margin'],
                    ['padding'],
                  ],
                  hover: [['boxShadow'], ['background'], ['opacity'], ['border'], ['borderRadius']],
                  clicked: [],
                  disabled: [],
                },
                MenuItem: {
                  name: '菜单项配置',
                  theme: {
                    MenuItemWrap: {
                      name: '项的外盒',
                      desc: '配置每一项的外盒',
                      normal: [
                        ['height'],
                        ['background'],
                        ['border'],
                        ['borderRadius'],
                        ['opacity'],
                        ['color'],
                        ['padding'],
                      ],
                      hover: [
                        ['background'],
                        ['border'],
                        ['borderRadius'],
                        ['opacity'],
                        ['color'],
                        ['font'],
                      ],
                      active: [
                        ['background'],
                        ['border'],
                        ['borderRadius'],
                        ['opacity'],
                        ['color'],
                        ['font'],
                      ],
                      disabled: [
                        ['background'],
                        ['color'],
                        ['borderRadius'],
                        ['opacity'],
                        ['padding'],
                        ['font'],
                      ],
                    },
                    SelectedMenuItemWrap: {
                      name: '选中项的外盒',
                      desc: '配置选中项的外盒',
                      normal: [
                        ['background'],
                        ['border'],
                        ['borderRadius'],
                        ['opacity'],
                        ['color'],
                        ['padding'],
                        ['font'],
                      ],
                      hover: [
                        ['background'],
                        ['border'],
                        ['borderRadius'],
                        ['opacity'],
                        ['color'],
                        ['font'],
                      ],
                      active: [
                        ['background'],
                        ['border'],
                        ['borderRadius'],
                        ['opacity'],
                        ['color'],
                        ['font'],
                      ],
                      disabled: [],
                    },
                  },
                },
              },
            },
          },
        },
      },
      theme: {
        InputTag: {
          name: '数据展示框',
          theme: {
            InputTagWrap: {
              name: 'Inputtag的外盒',
              desc: '配置展示选中数据的外盒样式',
              normal: [
                ['width'],
                ['height'],
                ['margin'],
                ['padding'],
                ['color'],
                ['background'],
                ['border'],
                ['boxShadow'],
                ['borderRadius'],
                ['font'],
                ['opacity'],
              ],
              hover: [
                ['color'],
                ['background'],
                ['border'],
                ['boxShadow'],
                ['borderRadius'],
                ['font'],
                ['opacity'],
              ],
              active: [],
              disabled: [],
            },
            SwitchIcon: {
              name: '下拉图标',
              desc: '配置下拉或清除按钮的图标样式',
              normal: [['color'], ['background'], ['font'], ['margin'], ['opacity']],
              hover: [['color'], ['font'], ['opacity']],
              active: [],
              disabled: [],
            },
          },
        },
        Menu: {
          name: '弹开菜单',
          theme: {
            MenuWrap: {
              name: '菜单外盒',
              desc: '配置菜单组件的外盒样式',
              normal: [
                ['width'],
                ['height'],
                ['boxShadow'],
                ['background'],
                ['opacity'],
                ['border'],
                ['borderRadius'],
                ['margin'],
                ['padding'],
              ],
              hover: [['boxShadow'], ['background'], ['opacity'], ['border'], ['borderRadius']],
              clicked: [],
              disabled: [],
            },
            MenuItem: {
              name: '菜单项配置',
              theme: {
                MenuItemWrap: {
                  name: '项的外盒',
                  desc: '配置每一项的外盒',
                  normal: [
                    ['height'],
                    ['background'],
                    ['border'],
                    ['borderRadius'],
                    ['opacity'],
                    ['color'],
                    ['padding'],
                  ],
                  hover: [
                    ['background'],
                    ['border'],
                    ['borderRadius'],
                    ['opacity'],
                    ['color'],
                    ['font'],
                  ],
                  active: [
                    ['background'],
                    ['border'],
                    ['borderRadius'],
                    ['opacity'],
                    ['color'],
                    ['font'],
                  ],
                  disabled: [
                    ['background'],
                    ['color'],
                    ['borderRadius'],
                    ['opacity'],
                    ['padding'],
                    ['font'],
                  ],
                },
                SelectedMenuItemWrap: {
                  name: '选中项的外盒',
                  desc: '配置选中项的外盒',
                  normal: [
                    ['background'],
                    ['border'],
                    ['borderRadius'],
                    ['opacity'],
                    ['color'],
                    ['padding'],
                    ['font'],
                  ],
                  hover: [
                    ['background'],
                    ['border'],
                    ['borderRadius'],
                    ['opacity'],
                    ['color'],
                    ['font'],
                  ],
                  active: [
                    ['background'],
                    ['border'],
                    ['borderRadius'],
                    ['opacity'],
                    ['color'],
                    ['font'],
                  ],
                  disabled: [],
                },
              },
            },
          },
        },
      },
      childrenWidget: [],
    },
    target: Select,
    screenshot:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABkCAYAAAB5CTUuAAAAAXNSR0IArs4c6QAAA9dJREFUeAHtnD9sEzEUh8+hUoLEwIQU2GAgGwNZ2GCuYGRBkAEpUaeiSilbe+0GRVU7oURiSBEMHYuY6caSDmxh6AiRmBhAJBJg/AIeuDvHR332C9EvUnR379l+1++Lr+39iYjUq9frXRiPx1tSyutqs0oxvLwRGAohDsvlcrvRaHwQBH80GvVVcEcJ2Gu1WkNvpTFw1Ol0qor1PcX6QaVSqYtut/tScXnXbDYfgU84Aor7Q1XtSokOO/TJD1calYgAMSf2NCUkkPAQIPYlntKoqglAgCbBtIQAJvC6LARoEkxLCGACr8tCgCbBtIQAJvC6LARoEkxLCGACr8tCgCZxwmV7bWe/vb7TS3anGOWS8eQ2BCSJ/ON29ez5hpTR5dV4N9ZdaZ1ilNMx03LBlEA8H4GVldvf4vjpra9y/HZ1bfeYeqmTbHfPlMrXKGcbBTPARihHPo6XPi2IU4vqrOYWvWmdYjm6RhCQh5LHNhBQAFx1CDr3Xf54LaKoTW9ap1ieoSEgD6Upbba3909/+Tk+kFLsPd5cfk5vWqcY5aZ0naQgwEbIkh9+/tgTInr/ZHN5QzeldYpRTseMS1wRM6LxnsAVMe+I7QVwCLIz8toCArzitQ8OAXZGXltAgFe89sEhwM7IawsI8IrXPjgE2Bl5bQEBXvHaBycBQ/UfGZ4JsLMqtMUf5sOSulf9kO5XL3R0DGYlQMwn7PGAhpVVoQ3ok0/w1VWz3w9o0Oh4RKlQxrbB/n5EKdm63+/jeYEklAK36/W6umYz5QUBU+A4prLY4s9QR6iu3SHAlaBjfwhwBOjaHQJcCTr2hwBHgK7dIcCVoGN/CHAE6NodAlwJOvaHAEeArt0hwJWgY/8TPx8wGAymnjOq1WqTcx7z0s6Rs7E7ZoARTZgEBIThbKwCAUY0YRIQEIazsQoEGNGESUBAGM7GKhBgRBMmAQFhOBurQIARTZgEBIThbKwCAUY0TImsWyeYdmXuymaxxQxg1gwBEMBMgLk8ZgAEMBNgLo8ZAAHMBJjLZ14TXlySF5n3a07LH6V+LhyCUkjCBiAgLO9UNQhIIQkbgICwvFPVICCFJGwAAsLyTlWDgBSSsIHM/wPy7MKdG68m35Nsavvizc1LlONqZ9qvWYtjBjAbgQAIYCbAXB4zAAKYCTCXxwyAAGYCzOUxAyCAmQBzecwACGAmwFw+9f1ldP/i+rOrk/M4zPs2d+U37h8dJ78zDocgZs0QAAHMBJjLYwZAADOBWSuf9RTHrO3j/7o/WWxxCGK2CQEQwEyAuTxmALOAzNtSsn5ZMO/n3Jb/Bd7pDF8dPZZKAAAAAElFTkSuQmCC',
  },
  {
    meta: {
      widgetName: 'Select',
      title: '多项选择器',
      desc: '支持多项选择',
      props: {
        data: {
          type: 'Object[]',
          desc: '生成选择项的数据',
          meta: [
            { key: 'value', title: 'value值', type: 'string' },
            { key: 'text', title: '文本值', type: 'string' },
          ],
        },
        mutliple: { type: 'boolean', desc: '是否多选', defaultValue: true },
        canSearch: { type: 'boolean', desc: '是否支持查询', defaultValue: false },
        canClear: { type: 'boolean', desc: '是否展示清空图标', defaultValue: true },
        createPortal: { type: 'boolean', desc: '是否全局弹出下拉框', defaultValue: true },
        throttle: { type: 'number', desc: '查询的延迟时间，单位为毫秒', defaultValue: 100 },
        canInput: {
          type: 'boolean',
          desc: '是否支持自定义值,只有在canSearch为true时才生效',
          defaultValue: false,
        },
        valueField: { type: 'string', desc: 'data数据的value值的名称', defaultValue: 'value' },
        displayField: {
          type: 'string',
          desc: 'data数据的displayValue值的名称',
          defaultValue: 'text',
        },
        disabled: { type: 'boolean', desc: '是否禁选', defaultValue: false },
        validateStatus: {
          type: 'ValidateStatus',
          desc: "input校验状态, 'success' 成功 | 'error'错误",
          defaultValue: 'success',
        },
        limitCount: { type: 'number', desc: '多选时最多个数' },
        placeholder: { type: 'string', desc: '占位符' },
        searchType: {
          type: 'start | end | include | eql',
          desc: '查询的方式',
          defaultValue: 'include',
        },
        value: { type: 'string | string[] | number | number[]', desc: '指定当前选中的条目' },
        displayValue: {
          type: 'string | string[] | number | number[]',
          desc: '指定当前选中的条目的displayValue值',
        },
        defaultValue: {
          type: 'string | string[] | number | number[]',
          desc: '初始状态下指定当前选中的条目,只生效一次',
        },
        defaultDisplayValue: {
          type: 'string | string[] | number | number[]',
          desc: '初始状态下指定当前选中的条目的displayValue值,只生效一次',
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
      theme: {
        InputTag: {
          name: '数据展示框',
          theme: {
            InputTagWrap: {
              name: 'Inputtag的外盒',
              desc: '配置展示选中数据的外盒样式',
              normal: [
                ['width'],
                ['height'],
                ['margin'],
                ['padding'],
                ['color'],
                ['background'],
                ['border'],
                ['boxShadow'],
                ['borderRadius'],
                ['font'],
                ['opacity'],
              ],
              hover: [
                ['color'],
                ['background'],
                ['border'],
                ['boxShadow'],
                ['borderRadius'],
                ['font'],
                ['opacity'],
              ],
              active: [],
              disabled: [],
            },
            SwitchIcon: {
              name: '下拉图标',
              desc: '配置下拉或清除按钮的图标样式',
              normal: [['margin'], ['padding'], ['color'], ['font'], ['opacity']],
              hover: [['color'], ['font'], ['opacity']],
              active: [],
              disabled: [],
            },
            TagWrap: {
              name: '标签',
              desc: '配置展示选中项的标签样式',
              normal: [
                ['width'],
                ['height'],
                ['background'],
                ['color'],
                ['font'],
                ['fontSize'],
                ['border'],
                ['borderRadius'],
                ['boxShadow'],
                ['opacity'],
                ['padding', 'left'],
                ['padding', 'right'],
                ['margin', 'left'],
                ['margin', 'right'],
              ],
              hover: [
                ['background'],
                ['color'],
                ['borderRadius'],
                ['border'],
                ['font'],
                ['opacity'],
                ['boxShadow'],
              ],
              active: [],
              disabled: [],
            },
            TagIcon: {
              name: '标签删除按钮',
              desc: '配置标签删除按钮样式',
              normal: [['color'], ['font'], ['fontSize'], ['opacity']],
              hover: [['color'], ['font'], ['fontSize'], ['opacity']],
              active: [],
              disabled: [],
            },
            Menu: {
              name: '隐藏更多选中项的菜单',
              theme: {
                MenuWrap: {
                  name: '菜单外盒',
                  desc: '配置菜单组件的外盒样式',
                  normal: [
                    ['width'],
                    ['height'],
                    ['boxShadow'],
                    ['background'],
                    ['opacity'],
                    ['border'],
                    ['borderRadius'],
                    ['margin'],
                    ['padding'],
                  ],
                  hover: [['boxShadow'], ['background'], ['opacity'], ['border'], ['borderRadius']],
                  clicked: [],
                  disabled: [],
                },
                MenuItem: {
                  name: '菜单项配置',
                  theme: {
                    MenuItemWrap: {
                      name: '项的外盒',
                      desc: '配置每一项的外盒',
                      normal: [
                        ['height'],
                        ['background'],
                        ['border'],
                        ['borderRadius'],
                        ['opacity'],
                        ['color'],
                        ['padding'],
                      ],
                      hover: [
                        ['background'],
                        ['border'],
                        ['borderRadius'],
                        ['opacity'],
                        ['color'],
                        ['font'],
                      ],
                      active: [
                        ['background'],
                        ['border'],
                        ['borderRadius'],
                        ['opacity'],
                        ['color'],
                        ['font'],
                      ],
                    },
                  },
                },
              },
            },
          },
        },
        Menu: {
          name: '弹开菜单',
          theme: {
            MenuWrap: {
              name: '菜单外盒',
              desc: '配置菜单组件的外盒样式',
              normal: [
                ['width'],
                ['height'],
                ['boxShadow'],
                ['background'],
                ['opacity'],
                ['border'],
                ['borderRadius'],
                ['margin'],
                ['padding'],
              ],
              hover: [['boxShadow'], ['background'], ['opacity'], ['border'], ['borderRadius']],
              clicked: [],
              disabled: [],
            },
            MenuItem: {
              name: '菜单项配置',
              theme: {
                MenuItemWrap: {
                  name: '项的外盒',
                  desc: '配置每一项的外盒',
                  normal: [
                    ['height'],
                    ['background'],
                    ['border'],
                    ['borderRadius'],
                    ['opacity'],
                    ['color'],
                    ['padding'],
                  ],
                  hover: [
                    ['background'],
                    ['border'],
                    ['borderRadius'],
                    ['opacity'],
                    ['color'],
                    ['font'],
                  ],
                  active: [
                    ['background'],
                    ['border'],
                    ['borderRadius'],
                    ['opacity'],
                    ['color'],
                    ['font'],
                  ],
                  disabled: [
                    ['background'],
                    ['color'],
                    ['borderRadius'],
                    ['opacity'],
                    ['padding'],
                    ['font'],
                  ],
                },
                SelectedMenuItemWrap: {
                  name: '选中项的外盒',
                  desc: '配置选中项的外盒',
                  normal: [
                    ['background'],
                    ['border'],
                    ['borderRadius'],
                    ['opacity'],
                    ['color'],
                    ['padding'],
                    ['font'],
                  ],
                  hover: [
                    ['background'],
                    ['border'],
                    ['borderRadius'],
                    ['opacity'],
                    ['color'],
                    ['font'],
                  ],
                  active: [
                    ['background'],
                    ['border'],
                    ['borderRadius'],
                    ['opacity'],
                    ['color'],
                    ['font'],
                  ],
                  disabled: [],
                },
              },
            },
          },
        },
      },
      childrenWidget: [],
      aliasName: 'MutlipleSelect',
    },
    target: Select,
    screenshot:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABkCAYAAAB5CTUuAAAAAXNSR0IArs4c6QAABU5JREFUeAHtXb9rHEcYnT1O0R2GRLYaH0YuZFUJwc0Ft+6D3ASnMlJh0Fmu3IS0akMaVYlPkEIhqLBJY/0Dag2XIgSnkl1YmHNhWXKIOSkSt5nvkgnK7Oz8kOfHrfUOjt359pvvvX3vZndvblfKGH+tr69fOjw8/DbP8+u82aIYXsEU6GdZtjU5OfnV4uLii4zEPzg46PHgKjfgx06n0w8GjcKs2+22uNYLXOt7jUajna2trW1wXX5dWlr6BvrEU4Dr/jVHu1qjww598uNBA4kUIM1JexoSOSRJowBpX0sDDVShAAwQSiRawoBEwgvYulhxWa6s5LUnb9jU0TE7Pzxm59iQfTDMmBczazmvVmN/1ers7USd7X3yEdtfWcmGLvxEbhV4Oot283Z+oddnnw4GbO74iE0Pc9bwJT4JR7WoJtUmDMIiTCGq7bIqPK0N4JdM2fxSfnkwweZYxiZthXjnPI5FmIRNHEz1qsJT7Ie1ATc6bIZfM10UHWMvCZs4mHCrwlPsh9U5gIbzQBJ/83v2WBRRLeeX2TWK2+apasgxMoFz+fPhD9lreRu1q8LzJHfjCKAT2aBu/uSdLBpynbgQJxmjKjxl3oUdkRPoaifqMV8mILf5OWHESYpXhadE23zpSJeacqfUbRUnVWwcecqcjCNgdJ0v9wrYnp3+6e6Hzd9b9KZ1FZSKkyqm6usrdlqeMr75JMy/ZPFDULTXzv4X3ZnzD+4R4M7el6tKYOIkv6rCU+JtHAFSPpqeFTAbwKcFPGNqy81M/dx59fazDXrTujJZxUkVU3b2Ezw1TwneeAiiOZnhEWtI/YI1n+3e+k4U/2Pw8X/rIkZL4nSyLWJV4FngLQfkNk2IybHUbRUnVWwcecqcjIcgmo1kOTuUOyZrcy4jThKBqvCUaJu/B9BUcPOY7cgdU7WJi2p6uio8Zd0y+l2S34pivNAczUZK80FysdBt/qvAy8217LkOpyo8aR+cfhN+1GU7JIBu50NuI2ziYMKoCk+xH8ZzgEjkNxPl9OlrHrHtqOcEfswnTMImDoJP2bIqPAV/awNEB5oKbrfYb80m265PsN1axg5GPyOKhHdcUi2qSbUJg7DKpp91UFXhifuCdC4G3uZ0DgjM5cyWdz4EnVmlAu04DAgkrG1ZMqDPj0V4JsBWMU95/2rer/HLti3+XvBUF2UsFSDNR9rjAQ1LxTyl0SefxOf3L/3zgAbVxSNKntS1K/P/R5TkPr1ez/htU+6Dtr0C7XZbP+8GA+zFdM1UaYvLUFcVPefDAM+CupaDAa6Kec6HAZ4FdS0HA1wV85wPAzwL6loOBrgq5jkfBngW1LUcDHBVzHM+DPAsqGs5472hZQXn7+TaOaPN+9lozmPc88r2L1YcIyCW0iU4MKBEmFhhGBBL6RIcGFAiTKwwDIildAkODCgRJlYYBsRSugQHBpQIEysMA2IpXYIDA0qEiRWGAbGUtsVR3Tph2xd5egVU2mIE6DULvhUGBJdYDwAD9PoE3woDgkusB4ABen2Cb4UBwSXWA8AAvT7Btyp/E/58OZ8NjnwmAX4p7DVGQEGSuAEYEFfvAhoMKEgSNwAD4updQIMBBUniBmBAXL0LaDCgIEncgPJ7gA0F/oeVnury+L8iuULbU+XpuI3TNoyAxG7AABiQWIHE8BgBMCCxAonhMQJgQGIFEsNjBMCAxAokhscIgAGJFUgMf+q5IDHXY+KfKs/Ea1y24xCU2AkYAAMSK5AYHiMABiRWYNzgVU9xjBvHqvJRaYtDUGI3YQAMSKxAYniMgMQGKKciVCeLxDzfW/i/AbYIHc/YldztAAAAAElFTkSuQmCC',
  },
  {
    meta: {
      widgetName: 'Skeleton',
      title: '加载占位符',
      desc: '在等待加载内容时，提供一个占位的图形组合',
      props: {
        title: { type: 'boolean', desc: '是否展示标题占位符', defaultValue: true },
        avatar: { type: 'boolean', desc: '是否展示头像占位符', defaultValue: true },
        paragraph: {
          type: '{ rows: number }',
          desc: '段落占位符的数目',
          meta: [{ key: 'rows', title: '段落的数目', type: 'number' }],
          defaultValue: { rows: 3 },
        },
        loading: { type: 'boolean', desc: '是否展示占位符组合', defaultValue: true },
        picture: { type: 'boolean', desc: '是否展示图片占位符', defaultValue: false },
        animation: { type: 'boolean', desc: '是否展示动画效果', defaultValue: false },
      },
      category: ['反馈'],
      theme: {
        Wrap: {
          name: 'Skeleton的外框',
          desc: '配置Skeleton的外框样式',
          normal: [
            ['width'],
            ['height'],
            ['margin'],
            ['padding'],
            ['background'],
            ['border'],
            ['boxShadow'],
            ['borderRadius'],
          ],
          hover: [],
          clicked: [],
          disabled: [],
        },
        Title: {
          name: '标题',
          desc: '配置标题样式',
          normal: [
            ['width'],
            ['height'],
            ['background'],
            ['border'],
            ['opacity'],
            ['boxShadow'],
            ['borderRadius'],
          ],
          hover: [['background'], ['border'], ['opacity'], ['boxShadow'], ['borderRadius']],
          clicked: [],
          disabled: [],
        },
        Paragraph: {
          name: '段落',
          desc: '配置段落样式',
          normal: {
            selectNames: [
              ['width'],
              ['height'],
              ['background'],
              ['border'],
              ['opacity'],
              ['boxShadow'],
              ['borderRadius'],
            ],
            nth: [
              ['width'],
              ['height'],
              ['background'],
              ['border'],
              ['opacity'],
              ['boxShadow'],
              ['borderRadius'],
            ],
          },
          hover: {
            selectNames: [['background'], ['border'], ['opacity'], ['boxShadow'], ['borderRadius']],
            nth: [['background'], ['border'], ['opacity'], ['boxShadow'], ['borderRadius']],
          },
          clicked: [],
          disabled: [],
        },
        Avatar: {
          name: '头像',
          desc: '配置头像样式',
          normal: [
            ['margin'],
            ['width'],
            ['border'],
            ['background'],
            ['border'],
            ['opacity'],
            ['cursor'],
            ['boxShadow'],
            ['borderRadius'],
          ],
          hover: [
            ['border'],
            ['opacity'],
            ['background'],
            ['border'],
            ['boxShadow'],
            ['borderRadius'],
          ],
          clicked: [],
          disabled: [],
        },
      },
      childrenWidget: [],
    },
    target: Skeleton,
    screenshot:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAAA+CAYAAADUHB6/AAAAAXNSR0IArs4c6QAAAXtJREFUeAHt2sFNw0AQhWGvi7AvUBCNUBSNpCC42E0YT6SR5uBr8luaHyns4gMv+z18wJmx7/vXcRw/5+tjavA1xvg7X9/LsjzucNyxbdtvF/wEjxLWdf3Mn8l17oYf2Hc680y2b/Y0WQD8V2ABFgALwPHeARYAC8Dx3gEWAAvA8d4BdAHxbzn8Ht4ef6czz/Fg6k5v6NVtxFnjzK/O8fcroIACCiiggAIKKKCAAgoooMCVwOg2F3SFQFzLRyIt54II8KvMKKHlXNAVBnEt5pP8PICQL5kWUDCIrQUQ6iXTAgoGsbUAQr1kWkDBILYWQKiXTAsoGMTWAgj1khljKe3mgsr50e3zUcT5rdVcECpewgM/7MsltwoooIACCiiggAIKKKCAAgo0EHAuCCo5H0U4FwQVELFRgnNBYAHOBYH4Ge0HMikBrRYAwWesBaQEtFoABJ+xFpAS0GoBEHzGWkBKQKsFQPAZ61xQSgDr81FEzKbEBshvHRnmYf8PX7pZeVbwHVQAAAAASUVORK5CYII=',
  },
  {
    meta: {
      widgetName: 'Slider',
      title: '滑动输入条',
      desc: '滑动型输入器，展示当前值和可选范围',
      props: {
        maxValue: { type: 'number', desc: '最大值限制', defaultValue: 999999999999 },
        minValue: { type: 'number', desc: '最小值限制', defaultValue: -999999999999 },
        defaultValue: {
          type: 'number | number[]',
          meta: [{ key: 'value', type: 'number' }],
          desc: '滑动输入条默认显示值，值为number时,为单滑块，值为Array时,为双滑块',
        },
        value: {
          type: 'number | number[]',
          meta: [{ key: 'value', type: 'number' }],
          desc: '滑动输入条显示值,值为number时,为单滑块，值为Array时,为双滑块',
        },
        disabled: { type: 'boolean', desc: '禁用状态,是否不可用', defaultValue: false },
        tips: {
          type: 'boolean | string | number',
          desc: 'boolean 是否显示提示信息,number|string指定显示的文本内容,可自定义显示的文本格式',
          defaultValue: false,
        },
        vertical: { type: 'boolean', desc: '是否垂直显示', defaultValue: false },
        icons: { type: 'object[]', meta: [{ key: 'name', type: 'icon' }], desc: '显示的图标资源' },
        marks: {
          type: '{ [key:number]: string | Object }',
          meta: [{ key: 'number', type: 'string' }],
          desc: '刻度标记,key的类型必须为number且每个标签可以单独设置样式',
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
      designInfo: {
        SingleVerticalSlider: {
          sequence: 2,
          title: '单个滑块的样式',
          desc: '单个滑块的样式配置',
          props: { defaultValue: 2, vertical: true },
          theme: {
            SliderContainer: {
              name: '滑块组件外盒',
              desc: '为滑块组件外盒配置样式',
              normal: [['border'], ['background'], ['margin'], ['padding'], ['opacity']],
              hover: [],
              active: [],
              disabled: [['border'], ['background'], ['opacity']],
            },
            SliderTrack: {
              name: '滑块轨道样式',
              desc: '为滑块轨道配置样式',
              normal: [['background'], ['borderRadius'], ['border'], ['width'], ['height']],
              hover: [['background']],
              active: [['background']],
              disabled: [['background']],
            },
            SliderPassedWay: {
              name: '滑块滑过的区间轨道',
              desc: '滑块滑过的区间轨道样式配置',
              normal: [['background'], ['border'], ['height']],
              hover: [['background'], ['border'], ['height']],
              active: [['background'], ['border'], ['height']],
              disabled: [['background'], ['border'], ['height']],
            },
            SliderButton: {
              name: '滑块的样式',
              desc: '滑块的样式配置',
              normal: [['width'], ['height'], ['background'], ['border'], ['borderRadius']],
              hover: [['width'], ['height'], ['background'], ['border'], ['borderRadius']],
              active: [['width'], ['height'], ['background'], ['border'], ['borderRadius']],
              disabled: [['width'], ['height'], ['background'], ['border'], ['borderRadius']],
            },
            SliderTips: {
              name: '提示框',
              desc: '提示框样式配置',
              normal: [
                ['width'],
                ['height'],
                ['border', 'top', 'color'],
                ['border', 'top', 'style'],
                ['border', 'right', 'style'],
                ['border', 'right', 'color'],
                ['border', 'bottom', 'color'],
                ['border', 'bottom', 'style'],
                ['border', 'left', 'style'],
                ['border', 'left', 'color'],
                ['borderRadius'],
                ['background'],
                ['boxShadow'],
                ['color'],
                ['font'],
                ['fontSize'],
              ],
              hover: [],
              active: [],
              disabled: [
                ['background'],
                ['color'],
                ['boxShadow'],
                ['border', 'top', 'color'],
                ['border', 'right', 'color'],
                ['border', 'bottom', 'color'],
                ['border', 'left', 'color'],
              ],
            },
          },
        },
        DoubleSlider: {
          sequence: 3,
          title: '双滑块的样式',
          desc: '双滑块的样式配置',
          props: { defaultValue: [5, 15] },
          theme: {
            SliderContainer: {
              name: '滑块组件外盒',
              desc: '为滑块组件外盒配置样式',
              normal: [['border'], ['background'], ['margin'], ['padding'], ['opacity']],
              hover: [],
              active: [],
              disabled: [['border'], ['background'], ['opacity']],
            },
            SliderTrack: {
              name: '滑块轨道样式',
              desc: '为滑块轨道配置样式',
              normal: [['background'], ['borderRadius'], ['border'], ['width'], ['height']],
              hover: [['background']],
              active: [['background']],
              disabled: [['background']],
            },
            SliderPassedWay: {
              name: '滑块滑过的区间轨道',
              desc: '滑块滑过的区间轨道样式配置',
              normal: [['background'], ['border'], ['height']],
              hover: [['background'], ['border'], ['height']],
              active: [['background'], ['border'], ['height']],
              disabled: [['background'], ['border'], ['height']],
            },
            SliderButton: {
              name: '滑块的样式',
              desc: '滑块的样式配置',
              normal: [['width'], ['height'], ['background'], ['border'], ['borderRadius']],
              hover: [['width'], ['height'], ['background'], ['border'], ['borderRadius']],
              active: [['width'], ['height'], ['background'], ['border'], ['borderRadius']],
              disabled: [['width'], ['height'], ['background'], ['border'], ['borderRadius']],
            },
            SliderTips: {
              name: '提示框',
              desc: '提示框样式配置',
              normal: [
                ['width'],
                ['height'],
                ['border', 'top', 'color'],
                ['border', 'top', 'style'],
                ['border', 'right', 'style'],
                ['border', 'right', 'color'],
                ['border', 'bottom', 'color'],
                ['border', 'bottom', 'style'],
                ['border', 'left', 'style'],
                ['border', 'left', 'color'],
                ['borderRadius'],
                ['background'],
                ['boxShadow'],
                ['color'],
                ['font'],
                ['fontSize'],
              ],
              hover: [],
              active: [],
              disabled: [
                ['background'],
                ['color'],
                ['boxShadow'],
                ['border', 'top', 'color'],
                ['border', 'right', 'color'],
                ['border', 'bottom', 'color'],
                ['border', 'left', 'color'],
              ],
            },
          },
        },
        MarksSlider: {
          sequence: 4,
          title: '离散值样式',
          desc: '带有离散值节点的样式配置',
          props: { defaultValue: 10, marks: { 5: '5℃', 10: '10℃', 15: '15℃' } },
          theme: {
            SliderContainer: {
              name: '滑块组件外盒',
              desc: '为滑块组件外盒配置样式',
              normal: [['border'], ['background'], ['margin'], ['padding'], ['opacity']],
              hover: [],
              active: [],
              disabled: [['border'], ['background'], ['opacity']],
            },
            SliderTrack: {
              name: '滑块轨道样式',
              desc: '为滑块轨道配置样式',
              normal: [['background'], ['borderRadius'], ['border'], ['width'], ['height']],
              hover: [['background']],
              active: [['background']],
              disabled: [['background']],
            },
            SliderPassedWay: {
              name: '滑块滑过的区间轨道',
              desc: '滑块滑过的区间轨道样式配置',
              normal: [['background'], ['border'], ['height']],
              hover: [['background'], ['border'], ['height']],
              active: [['background'], ['border'], ['height']],
              disabled: [['background'], ['border'], ['height']],
            },
            SliderButton: {
              name: '滑块的样式',
              desc: '滑块的样式配置',
              normal: [['width'], ['height'], ['background'], ['border'], ['borderRadius']],
              hover: [['width'], ['height'], ['background'], ['border'], ['borderRadius']],
              active: [['width'], ['height'], ['background'], ['border'], ['borderRadius']],
              disabled: [['width'], ['height'], ['background'], ['border'], ['borderRadius']],
            },
            SliderTips: {
              name: '提示框',
              desc: '提示框样式配置',
              normal: [
                ['width'],
                ['height'],
                ['border', 'top', 'color'],
                ['border', 'top', 'style'],
                ['border', 'right', 'style'],
                ['border', 'right', 'color'],
                ['border', 'bottom', 'color'],
                ['border', 'bottom', 'style'],
                ['border', 'left', 'style'],
                ['border', 'left', 'color'],
                ['borderRadius'],
                ['background'],
                ['boxShadow'],
                ['color'],
                ['font'],
                ['fontSize'],
              ],
              hover: [],
              active: [],
              disabled: [
                ['background'],
                ['color'],
                ['boxShadow'],
                ['border', 'top', 'color'],
                ['border', 'right', 'color'],
                ['border', 'bottom', 'color'],
                ['border', 'left', 'color'],
              ],
            },
            SliderMarks: {
              name: '离散节点',
              desc: '离散节点样式配置',
              normal: {
                selectNames: [['color'], ['font'], ['fontSize']],
                nth: [['color'], ['font'], ['fontSize']],
              },
              hover: [],
              active: [],
              disabled: {
                selectNames: [['color'], ['font'], ['fontSize']],
                nth: [['color'], ['font'], ['fontSize']],
              },
            },
          },
        },
      },
      theme: {
        SliderContainer: {
          name: '滑块组件外盒',
          desc: '为滑块组件外盒配置样式',
          normal: [['border'], ['background'], ['margin'], ['padding'], ['opacity']],
          hover: [],
          active: [],
          disabled: [['border'], ['background'], ['opacity']],
        },
        SliderTrack: {
          name: '滑块轨道样式',
          desc: '为滑块轨道配置样式',
          normal: [['background'], ['borderRadius'], ['border'], ['width'], ['height']],
          hover: [['background']],
          active: [['background']],
          disabled: [['background']],
        },
        SliderPassedWay: {
          name: '滑块滑过的区间轨道',
          desc: '滑块滑过的区间轨道样式配置',
          normal: [['background'], ['border'], ['height']],
          hover: [['background'], ['border'], ['height']],
          active: [['background'], ['border'], ['height']],
          disabled: [['background'], ['border'], ['height']],
        },
        SliderButton: {
          name: '滑块的样式',
          desc: '滑块的样式配置',
          normal: [['width'], ['height'], ['background'], ['border'], ['borderRadius']],
          hover: [['width'], ['height'], ['background'], ['border'], ['borderRadius']],
          active: [['width'], ['height'], ['background'], ['border'], ['borderRadius']],
          disabled: [['width'], ['height'], ['background'], ['border'], ['borderRadius']],
        },
        SliderTips: {
          name: '提示框',
          desc: '提示框样式配置',
          normal: [
            ['width'],
            ['height'],
            ['border', 'top', 'color'],
            ['border', 'top', 'style'],
            ['border', 'right', 'style'],
            ['border', 'right', 'color'],
            ['border', 'bottom', 'color'],
            ['border', 'bottom', 'style'],
            ['border', 'left', 'style'],
            ['border', 'left', 'color'],
            ['borderRadius'],
            ['background'],
            ['boxShadow'],
            ['color'],
            ['font'],
            ['fontSize'],
          ],
          hover: [],
          active: [],
          disabled: [
            ['background'],
            ['color'],
            ['boxShadow'],
            ['border', 'top', 'color'],
            ['border', 'right', 'color'],
            ['border', 'bottom', 'color'],
            ['border', 'left', 'color'],
          ],
        },
      },
      childrenWidget: [],
    },
    target: Slider,
    screenshot:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAAAMCAYAAACURRhjAAAAAXNSR0IArs4c6QAAATVJREFUWAljZKAz+P//P6N/GkMKwz+GZAZGBm2w9f8ZrjIwMczdOIthDiMj4386O2lQWcdIT9cEpf2X/POPYcn//wxO2OxlZGTYx8LEELNuFuNzbPIjQYyJXp4E5Qx8kQFyByiiIGr+0zWh0CsMiLGHbhECKqZw5Qxkh4LUgIs0ZMERxGbsnPq+9tJt3rpPn5lZBou/5SS/M+TGPBoszqGLO4B15xOgRWlMgy0yQL5/+ZadLoEwmCwBFukyQPfMoluRNZg8P5jdwqSn+rmJj/fvn8HkSHHhn4PJOXRxC6zIoltrxi/1f+r/fwyziPEdIxND2qbZjLOJUTvc1NAtQsAdwlSGPYRaWqC+yMbZDC4jtYNItzoEFMCgTh8owHGlaljHcKRGBihc6JZDYJEwOnQCCwnsNACQY2aZbif/3QAAAABJRU5ErkJggg==',
  },
  {
    meta: {
      widgetName: 'Slider',
      title: '单个滑块的样式',
      desc: '单个滑块的样式配置',
      props: {
        maxValue: { type: 'number', desc: '最大值限制', defaultValue: 999999999999 },
        minValue: { type: 'number', desc: '最小值限制', defaultValue: -999999999999 },
        defaultValue: {
          type: 'number | number[]',
          meta: [{ key: 'value', type: 'number' }],
          desc: '滑动输入条默认显示值，值为number时,为单滑块，值为Array时,为双滑块',
          defaultValue: 2,
        },
        value: {
          type: 'number | number[]',
          meta: [{ key: 'value', type: 'number' }],
          desc: '滑动输入条显示值,值为number时,为单滑块，值为Array时,为双滑块',
        },
        disabled: { type: 'boolean', desc: '禁用状态,是否不可用', defaultValue: false },
        tips: {
          type: 'boolean | string | number',
          desc: 'boolean 是否显示提示信息,number|string指定显示的文本内容,可自定义显示的文本格式',
          defaultValue: false,
        },
        vertical: { type: 'boolean', desc: '是否垂直显示', defaultValue: true },
        icons: { type: 'object[]', meta: [{ key: 'name', type: 'icon' }], desc: '显示的图标资源' },
        marks: {
          type: '{ [key:number]: string | Object }',
          meta: [{ key: 'number', type: 'string' }],
          desc: '刻度标记,key的类型必须为number且每个标签可以单独设置样式',
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
      theme: {
        SliderContainer: {
          name: '滑块组件外盒',
          desc: '为滑块组件外盒配置样式',
          normal: [['border'], ['background'], ['margin'], ['padding'], ['opacity']],
          hover: [],
          active: [],
          disabled: [['border'], ['background'], ['opacity']],
        },
        SliderTrack: {
          name: '滑块轨道样式',
          desc: '为滑块轨道配置样式',
          normal: [['background'], ['borderRadius'], ['border'], ['width'], ['height']],
          hover: [['background']],
          active: [['background']],
          disabled: [['background']],
        },
        SliderPassedWay: {
          name: '滑块滑过的区间轨道',
          desc: '滑块滑过的区间轨道样式配置',
          normal: [['background'], ['border'], ['height']],
          hover: [['background'], ['border'], ['height']],
          active: [['background'], ['border'], ['height']],
          disabled: [['background'], ['border'], ['height']],
        },
        SliderButton: {
          name: '滑块的样式',
          desc: '滑块的样式配置',
          normal: [['width'], ['height'], ['background'], ['border'], ['borderRadius']],
          hover: [['width'], ['height'], ['background'], ['border'], ['borderRadius']],
          active: [['width'], ['height'], ['background'], ['border'], ['borderRadius']],
          disabled: [['width'], ['height'], ['background'], ['border'], ['borderRadius']],
        },
        SliderTips: {
          name: '提示框',
          desc: '提示框样式配置',
          normal: [
            ['width'],
            ['height'],
            ['border', 'top', 'color'],
            ['border', 'top', 'style'],
            ['border', 'right', 'style'],
            ['border', 'right', 'color'],
            ['border', 'bottom', 'color'],
            ['border', 'bottom', 'style'],
            ['border', 'left', 'style'],
            ['border', 'left', 'color'],
            ['borderRadius'],
            ['background'],
            ['boxShadow'],
            ['color'],
            ['font'],
            ['fontSize'],
          ],
          hover: [],
          active: [],
          disabled: [
            ['background'],
            ['color'],
            ['boxShadow'],
            ['border', 'top', 'color'],
            ['border', 'right', 'color'],
            ['border', 'bottom', 'color'],
            ['border', 'left', 'color'],
          ],
        },
      },
      childrenWidget: [],
      aliasName: 'SingleVerticalSlider',
    },
    target: Slider,
    screenshot:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAABICAYAAADCvBSdAAAAAXNSR0IArs4c6QAAAUlJREFUSA3tlbFKBEEMhpNwINYWx4HWW/gWYmOhB9Z2585DjV5nLRwWNuJbWGztgVxhLYJsTNaNxB3GlStlFpZk/v2Svfkz3CIMrqZpTkSKvRyqqrr3CPlFn0dm3tdb1lb4jSUFPdgBPreKpMAe5GIpyDnj9eKSdyOXF5dyzni9uOTdyOXFpZwzXkdbyLcA5wEuD6ZvcfO608nTvXd43uyGVYRrRGQVu4LzwLOPFm6Y4cga+IgIjxOCi9uIL6Sdf4O1UBt9MYx4VnPNbfot82+wHAkCQQsLE0ajsCS7OBwFDRB2i7PE8GQNRqOwBATLUdAAYbEbWA0PuRkYq7NYXcEx6QR1KCrYw2G0wSmbHI3hTNT75Gj4jqcL+XHuultKf3dtYaur/kta3lBcyjhQjkbGmB/yv3RJ/oXWtkufm5ZsmhCCgnprbqDFT/1EZ6Gh7GFYAAAAAElFTkSuQmCC',
  },
  {
    meta: {
      widgetName: 'Slider',
      title: '双滑块的样式',
      desc: '双滑块的样式配置',
      props: {
        maxValue: { type: 'number', desc: '最大值限制', defaultValue: 999999999999 },
        minValue: { type: 'number', desc: '最小值限制', defaultValue: -999999999999 },
        defaultValue: {
          type: 'number | number[]',
          meta: [{ key: 'value', type: 'number' }],
          desc: '滑动输入条默认显示值，值为number时,为单滑块，值为Array时,为双滑块',
          defaultValue: [5, 15],
        },
        value: {
          type: 'number | number[]',
          meta: [{ key: 'value', type: 'number' }],
          desc: '滑动输入条显示值,值为number时,为单滑块，值为Array时,为双滑块',
        },
        disabled: { type: 'boolean', desc: '禁用状态,是否不可用', defaultValue: false },
        tips: {
          type: 'boolean | string | number',
          desc: 'boolean 是否显示提示信息,number|string指定显示的文本内容,可自定义显示的文本格式',
          defaultValue: false,
        },
        vertical: { type: 'boolean', desc: '是否垂直显示', defaultValue: true },
        icons: { type: 'object[]', meta: [{ key: 'name', type: 'icon' }], desc: '显示的图标资源' },
        marks: {
          type: '{ [key:number]: string | Object }',
          meta: [{ key: 'number', type: 'string' }],
          desc: '刻度标记,key的类型必须为number且每个标签可以单独设置样式',
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
      theme: {
        SliderContainer: {
          name: '滑块组件外盒',
          desc: '为滑块组件外盒配置样式',
          normal: [['border'], ['background'], ['margin'], ['padding'], ['opacity']],
          hover: [],
          active: [],
          disabled: [['border'], ['background'], ['opacity']],
        },
        SliderTrack: {
          name: '滑块轨道样式',
          desc: '为滑块轨道配置样式',
          normal: [['background'], ['borderRadius'], ['border'], ['width'], ['height']],
          hover: [['background']],
          active: [['background']],
          disabled: [['background']],
        },
        SliderPassedWay: {
          name: '滑块滑过的区间轨道',
          desc: '滑块滑过的区间轨道样式配置',
          normal: [['background'], ['border'], ['height']],
          hover: [['background'], ['border'], ['height']],
          active: [['background'], ['border'], ['height']],
          disabled: [['background'], ['border'], ['height']],
        },
        SliderButton: {
          name: '滑块的样式',
          desc: '滑块的样式配置',
          normal: [['width'], ['height'], ['background'], ['border'], ['borderRadius']],
          hover: [['width'], ['height'], ['background'], ['border'], ['borderRadius']],
          active: [['width'], ['height'], ['background'], ['border'], ['borderRadius']],
          disabled: [['width'], ['height'], ['background'], ['border'], ['borderRadius']],
        },
        SliderTips: {
          name: '提示框',
          desc: '提示框样式配置',
          normal: [
            ['width'],
            ['height'],
            ['border', 'top', 'color'],
            ['border', 'top', 'style'],
            ['border', 'right', 'style'],
            ['border', 'right', 'color'],
            ['border', 'bottom', 'color'],
            ['border', 'bottom', 'style'],
            ['border', 'left', 'style'],
            ['border', 'left', 'color'],
            ['borderRadius'],
            ['background'],
            ['boxShadow'],
            ['color'],
            ['font'],
            ['fontSize'],
          ],
          hover: [],
          active: [],
          disabled: [
            ['background'],
            ['color'],
            ['boxShadow'],
            ['border', 'top', 'color'],
            ['border', 'right', 'color'],
            ['border', 'bottom', 'color'],
            ['border', 'left', 'color'],
          ],
        },
      },
      childrenWidget: [],
      aliasName: 'DoubleSlider',
    },
    target: Slider,
    screenshot:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAAAMCAYAAACURRhjAAAAAXNSR0IArs4c6QAAAWpJREFUWAntWLFOwzAQfZciIeYOqBLqD/AXiKULlZi70Xjja9gc2DojtTPqXzBkrZAqBmZUiebIhUbq0AQ7NtgSeHFkn8/P753PdgieCjPTWGGKAjcgnFduGc9I8DDXuCci9jSVFzex4iUfq7tWPPgoMGPGxSF/RFgeJZg8alof6v/ttpjxJq5kSKS1iSH+RagvG/YSAC6YY8frLIikqaadsU+c2FQpbb8xwHfseCnP81HJiy4j56wLP3ezIVbrE6OhvV6B7dY5BozmajKywTAcvON2smpy5bW9PGNfSodK2OkshiB6fTuWyqiEFkNA2mCwWZsRAS1Guw2hw4ZrC8C/2iWCqN126cTBaX9jPE7SRehig8Fmba7rqlOW863nKuWUC2gTQJRALTLKTGx/yiZ2vM6CyDVynOLpu5uWvEXmGS5DPxBjx+t8hgjB8ugTwpuiun4YhhZD8MWO13mH1CJUkff/66Smo3P9CadOwUsbddD7AAAAAElFTkSuQmCC',
  },
  {
    meta: {
      widgetName: 'Slider',
      title: '离散值样式',
      desc: '带有离散值节点的样式配置',
      props: {
        maxValue: { type: 'number', desc: '最大值限制', defaultValue: 999999999999 },
        minValue: { type: 'number', desc: '最小值限制', defaultValue: -999999999999 },
        defaultValue: {
          type: 'number | number[]',
          meta: [{ key: 'value', type: 'number' }],
          desc: '滑动输入条默认显示值，值为number时,为单滑块，值为Array时,为双滑块',
          defaultValue: 10,
        },
        value: {
          type: 'number | number[]',
          meta: [{ key: 'value', type: 'number' }],
          desc: '滑动输入条显示值,值为number时,为单滑块，值为Array时,为双滑块',
        },
        disabled: { type: 'boolean', desc: '禁用状态,是否不可用', defaultValue: false },
        tips: {
          type: 'boolean | string | number',
          desc: 'boolean 是否显示提示信息,number|string指定显示的文本内容,可自定义显示的文本格式',
          defaultValue: false,
        },
        vertical: { type: 'boolean', desc: '是否垂直显示', defaultValue: true },
        icons: { type: 'object[]', meta: [{ key: 'name', type: 'icon' }], desc: '显示的图标资源' },
        marks: {
          type: '{ [key:number]: string | Object }',
          meta: [{ key: 'number', type: 'string' }],
          desc: '刻度标记,key的类型必须为number且每个标签可以单独设置样式',
          defaultValue: { 5: '5℃', 10: '10℃', 15: '15℃' },
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
      theme: {
        SliderContainer: {
          name: '滑块组件外盒',
          desc: '为滑块组件外盒配置样式',
          normal: [['border'], ['background'], ['margin'], ['padding'], ['opacity']],
          hover: [],
          active: [],
          disabled: [['border'], ['background'], ['opacity']],
        },
        SliderTrack: {
          name: '滑块轨道样式',
          desc: '为滑块轨道配置样式',
          normal: [['background'], ['borderRadius'], ['border'], ['width'], ['height']],
          hover: [['background']],
          active: [['background']],
          disabled: [['background']],
        },
        SliderPassedWay: {
          name: '滑块滑过的区间轨道',
          desc: '滑块滑过的区间轨道样式配置',
          normal: [['background'], ['border'], ['height']],
          hover: [['background'], ['border'], ['height']],
          active: [['background'], ['border'], ['height']],
          disabled: [['background'], ['border'], ['height']],
        },
        SliderButton: {
          name: '滑块的样式',
          desc: '滑块的样式配置',
          normal: [['width'], ['height'], ['background'], ['border'], ['borderRadius']],
          hover: [['width'], ['height'], ['background'], ['border'], ['borderRadius']],
          active: [['width'], ['height'], ['background'], ['border'], ['borderRadius']],
          disabled: [['width'], ['height'], ['background'], ['border'], ['borderRadius']],
        },
        SliderTips: {
          name: '提示框',
          desc: '提示框样式配置',
          normal: [
            ['width'],
            ['height'],
            ['border', 'top', 'color'],
            ['border', 'top', 'style'],
            ['border', 'right', 'style'],
            ['border', 'right', 'color'],
            ['border', 'bottom', 'color'],
            ['border', 'bottom', 'style'],
            ['border', 'left', 'style'],
            ['border', 'left', 'color'],
            ['borderRadius'],
            ['background'],
            ['boxShadow'],
            ['color'],
            ['font'],
            ['fontSize'],
          ],
          hover: [],
          active: [],
          disabled: [
            ['background'],
            ['color'],
            ['boxShadow'],
            ['border', 'top', 'color'],
            ['border', 'right', 'color'],
            ['border', 'bottom', 'color'],
            ['border', 'left', 'color'],
          ],
        },
        SliderMarks: {
          name: '离散节点',
          desc: '离散节点样式配置',
          normal: {
            selectNames: [['color'], ['font'], ['fontSize']],
            nth: [['color'], ['font'], ['fontSize']],
          },
          hover: [],
          active: [],
          disabled: {
            selectNames: [['color'], ['font'], ['fontSize']],
            nth: [['color'], ['font'], ['fontSize']],
          },
        },
      },
      childrenWidget: [],
      aliasName: 'MarksSlider',
    },
    target: Slider,
    screenshot:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAAAMCAYAAACURRhjAAAAAXNSR0IArs4c6QAAAVlJREFUWAljZBjh4P///4z+aQwpDP8YkhkYGbTBwfGf4SoDE8PcjbMY5jAyMv6nZxAx0tOywWZXUNp/yT//GJb8/8/ghM1tjIwM+1iYGGLWzWJ8jk2eFmJMtDB0KJgJyhn4IgPkB1BEQdT8p1vCHbERAiqmcOUM5AQFUgMu0pAFachm7Jz6vvbSbd66T5+ZWWhoD4bRRjoMDDlxEOEpixgYzl3BUDJoBOQkvzPkxjyiqXuAddUToAVpTAMRGSCfgSJDRAiCYRFDUx9TYPjLt+wU6CZOK7AIlQGqnDViiyzigon+qpj0VD838fH+/UNvq0HF1Jt3EAxiD2YgLvyT5s6DFVl0az3Q3EckWuCX+j/1/z+GWcRoY2RiSNs0m3E2MWopVTNiIwTcIUxl2EOopQXqi2yczeBCrw7iiK1DQAEM6vSBAhxXqoZ1DOkVGSB3jNgcAouEwTZ0AgBQEHKZgwK00AAAAABJRU5ErkJggg==',
  },
  {
    meta: {
      widgetName: 'Steps',
      title: '步骤条',
      desc: '引导用户按照流程完成任务的导航条',
      props: {
        children: { type: 'React.Node', desc: '步骤条需要包含的子组件' },
        data: {
          type: 'object[]',
          desc: '步骤条填充的数据',
          meta: [
            { key: 'title', title: '步骤条标题', type: 'string' },
            { key: 'description', title: '步骤条描述', type: 'string' },
            { key: 'stepStatus', title: '步骤条状态', type: 'StepStatus' },
          ],
        },
        defaultData: {
          type: 'object[]',
          desc: '步骤条填充的默认显示数据',
          meta: [
            { key: 'title', title: '步骤条标题', type: 'string' },
            { key: 'description', title: '步骤条描述', type: 'string' },
            { key: 'stepStatus', title: '步骤条状态', type: 'StepStatus' },
          ],
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
          type: 'OrientationType',
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
        StepStatus: ['finish', 'process', 'next', 'wait', 'error'],
      },
      childrenWidget: [],
      category: ['导航'],
      designInfo: {
        VSteps: {
          sequence: 1,
          title: '垂直步骤条',
          desc: '垂直步骤条配置',
          props: { orientation: 'vertical' },
          theme: {
            StepsOutContainer: {
              name: '步骤条最外层容器',
              desc: '步骤条最外层容器',
              normal: [['width'], ['height'], ['margin'], ['padding'], ['background'], ['opacity']],
            },
            Step: {
              name: '单个步骤配置',
              theme: {
                StepOutContainer: {
                  name: '单个步骤外部',
                  desc: '单个步骤外部容器配置',
                  normal: [['width'], ['height']],
                },
                StepLine: {
                  name: '步骤间连接线',
                  desc: '步骤间连接线的配置',
                  normal: [['width'], ['height'], ['background']],
                },
                StepInnerContainer: {
                  name: '单个步骤内部',
                  desc: '单个步骤内部容器配置',
                  normal: [['width'], ['height'], ['background']],
                },
                StepTitle: {
                  name: '步骤标题',
                  desc: '配置步骤标题',
                  normal: [
                    ['fontSize'],
                    ['font'],
                    ['color'],
                    ['width'],
                    ['height'],
                    ['padding'],
                    ['margin'],
                  ],
                },
                StepDescription: {
                  name: '步骤条内容描述',
                  desc: '配置步骤条内容描述',
                  normal: [
                    ['fontSize'],
                    ['font'],
                    ['color'],
                    ['width'],
                    ['height'],
                    ['padding'],
                    ['margin'],
                  ],
                },
                StepInnerIcon: {
                  name: '步骤条内容图标',
                  desc: '配置步骤条内容图标',
                  normal: [['fontSize'], ['font'], ['color']],
                },
              },
            },
          },
        },
        FlatSteps: {
          sequence: 2,
          title: '半扁平步骤条',
          desc: '半扁平步骤条配置',
          props: { stepType: 'flat' },
          theme: {
            StepsOutContainer: {
              name: '步骤条最外层容器',
              desc: '步骤条最外层容器',
              normal: [['width'], ['height'], ['margin'], ['padding'], ['background'], ['opacity']],
            },
            Step: {
              name: '单个步骤配置',
              theme: {
                StepOutContainer: {
                  name: '单个步骤外部',
                  desc: '单个步骤外部容器配置',
                  normal: [['width'], ['height']],
                },
                StepLine: {
                  name: '步骤间连接线',
                  desc: '步骤间连接线的配置',
                  normal: [['width'], ['height'], ['background']],
                },
                StepInnerContainer: {
                  name: '单个步骤内部',
                  desc: '单个步骤内部容器配置',
                  normal: [['width'], ['height'], ['background']],
                },
                StepTitle: {
                  name: '步骤标题',
                  desc: '配置步骤标题',
                  normal: [
                    ['fontSize'],
                    ['font'],
                    ['color'],
                    ['width'],
                    ['height'],
                    ['padding'],
                    ['margin'],
                  ],
                },
                StepDescription: {
                  name: '步骤条内容描述',
                  desc: '配置步骤条内容描述',
                  normal: [
                    ['fontSize'],
                    ['font'],
                    ['color'],
                    ['width'],
                    ['height'],
                    ['padding'],
                    ['margin'],
                  ],
                },
                StepInnerIcon: {
                  name: '步骤条内容图标',
                  desc: '配置步骤条内容图标',
                  normal: [['fontSize'], ['font'], ['color']],
                },
              },
            },
          },
        },
        IconSteps: {
          sequence: 3,
          title: '图标步骤条',
          desc: '图标步骤条步骤条配置',
          props: { stepType: 'icon' },
          theme: {
            StepsOutContainer: {
              name: '步骤条最外层容器',
              desc: '步骤条最外层容器',
              normal: [['width'], ['height'], ['margin'], ['padding'], ['background'], ['opacity']],
            },
            Step: {
              name: '单个步骤配置',
              theme: {
                StepOutContainer: {
                  name: '单个步骤外部',
                  desc: '单个步骤外部容器配置',
                  normal: [['width'], ['height']],
                },
                StepLine: {
                  name: '步骤间连接线',
                  desc: '步骤间连接线的配置',
                  normal: [['width'], ['height'], ['background']],
                },
                StepInnerContainer: {
                  name: '单个步骤内部',
                  desc: '单个步骤内部容器配置',
                  normal: [['width'], ['height'], ['background']],
                },
                StepTitle: {
                  name: '步骤标题',
                  desc: '配置步骤标题',
                  normal: [
                    ['fontSize'],
                    ['font'],
                    ['color'],
                    ['width'],
                    ['height'],
                    ['padding'],
                    ['margin'],
                  ],
                },
                StepDescription: {
                  name: '步骤条内容描述',
                  desc: '配置步骤条内容描述',
                  normal: [
                    ['fontSize'],
                    ['font'],
                    ['color'],
                    ['width'],
                    ['height'],
                    ['padding'],
                    ['margin'],
                  ],
                },
                StepIcon: {
                  name: '步骤条图标',
                  desc: '配置步骤条图标',
                  normal: [['fontSize'], ['font'], ['color']],
                },
              },
            },
          },
        },
        DotSteps: {
          sequence: 4,
          title: '点状步骤条',
          desc: '点状步骤条配置',
          props: { stepType: 'dot' },
          theme: {
            StepsOutContainer: {
              name: '步骤条最外层容器',
              desc: '步骤条最外层容器',
              normal: [['width'], ['height'], ['margin'], ['padding'], ['background'], ['opacity']],
            },
            Step: {
              name: '单个步骤配置',
              theme: {
                StepOutContainer: {
                  name: '单个步骤外部',
                  desc: '单个步骤外部容器配置',
                  normal: [['width'], ['height']],
                },
                StepLine: {
                  name: '步骤间连接线',
                  desc: '步骤间连接线的配置',
                  normal: [['width'], ['height'], ['background']],
                },
                StepDot: {
                  name: '点状步骤',
                  desc: '点状步骤配置',
                  normal: [['width'], ['height'], ['background']],
                },
                StepTitle: {
                  name: '步骤标题',
                  desc: '配置步骤标题',
                  normal: [
                    ['fontSize'],
                    ['font'],
                    ['color'],
                    ['width'],
                    ['height'],
                    ['padding'],
                    ['margin'],
                  ],
                },
                StepDescription: {
                  name: '步骤条内容描述',
                  desc: '配置步骤条内容描述',
                  normal: [
                    ['fontSize'],
                    ['font'],
                    ['color'],
                    ['width'],
                    ['height'],
                    ['padding'],
                    ['margin'],
                  ],
                },
              },
            },
          },
        },
      },
      theme: {
        StepsOutContainer: {
          name: '步骤条最外层容器',
          desc: '步骤条最外层容器',
          normal: [['width'], ['height'], ['margin'], ['padding'], ['background'], ['opacity']],
        },
        Step: {
          name: '单个步骤配置',
          theme: {
            StepOutContainer: {
              name: '单个步骤外部',
              desc: '单个步骤外部容器配置',
              normal: [['width'], ['height']],
            },
            StepLine: {
              name: '步骤间连接线',
              desc: '步骤间连接线的配置',
              normal: [['width'], ['height'], ['background']],
            },
            StepInnerContainer: {
              name: '单个步骤内部',
              desc: '单个步骤内部容器配置',
              normal: [['width'], ['height'], ['background']],
            },
            StepTitle: {
              name: '步骤标题',
              desc: '配置步骤标题',
              normal: [
                ['fontSize'],
                ['font'],
                ['color'],
                ['width'],
                ['height'],
                ['padding'],
                ['margin'],
              ],
            },
            StepDescription: {
              name: '步骤条内容描述',
              desc: '配置步骤条内容描述',
              normal: [
                ['fontSize'],
                ['font'],
                ['color'],
                ['width'],
                ['height'],
                ['padding'],
                ['margin'],
              ],
            },
            StepInnerIcon: {
              name: '步骤条内容图标',
              desc: '配置步骤条内容图标',
              normal: [['fontSize'], ['font'], ['color']],
            },
          },
        },
      },
    },
    target: Steps,
    screenshot:
      'data:image/png;base64,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',
  },
  {
    meta: {
      widgetName: 'Steps',
      title: '垂直步骤条',
      desc: '垂直步骤条配置',
      props: {
        children: { type: 'React.Node', desc: '步骤条需要包含的子组件' },
        data: {
          type: 'object[]',
          desc: '步骤条填充的数据',
          meta: [
            { key: 'title', title: '步骤条标题', type: 'string' },
            { key: 'description', title: '步骤条描述', type: 'string' },
            { key: 'stepStatus', title: '步骤条状态', type: 'StepStatus' },
          ],
        },
        defaultData: {
          type: 'object[]',
          desc: '步骤条填充的默认显示数据',
          meta: [
            { key: 'title', title: '步骤条标题', type: 'string' },
            { key: 'description', title: '步骤条描述', type: 'string' },
            { key: 'stepStatus', title: '步骤条状态', type: 'StepStatus' },
          ],
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
          type: 'OrientationType',
          desc: '步骤条方向,可选择水平,垂直',
          defaultValue: 'vertical',
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
        StepStatus: ['finish', 'process', 'next', 'wait', 'error'],
      },
      childrenWidget: [],
      category: ['导航'],
      theme: {
        StepsOutContainer: {
          name: '步骤条最外层容器',
          desc: '步骤条最外层容器',
          normal: [['width'], ['height'], ['margin'], ['padding'], ['background'], ['opacity']],
        },
        Step: {
          name: '单个步骤配置',
          theme: {
            StepOutContainer: {
              name: '单个步骤外部',
              desc: '单个步骤外部容器配置',
              normal: [['width'], ['height']],
            },
            StepLine: {
              name: '步骤间连接线',
              desc: '步骤间连接线的配置',
              normal: [['width'], ['height'], ['background']],
            },
            StepInnerContainer: {
              name: '单个步骤内部',
              desc: '单个步骤内部容器配置',
              normal: [['width'], ['height'], ['background']],
            },
            StepTitle: {
              name: '步骤标题',
              desc: '配置步骤标题',
              normal: [
                ['fontSize'],
                ['font'],
                ['color'],
                ['width'],
                ['height'],
                ['padding'],
                ['margin'],
              ],
            },
            StepDescription: {
              name: '步骤条内容描述',
              desc: '配置步骤条内容描述',
              normal: [
                ['fontSize'],
                ['font'],
                ['color'],
                ['width'],
                ['height'],
                ['padding'],
                ['margin'],
              ],
            },
            StepInnerIcon: {
              name: '步骤条内容图标',
              desc: '配置步骤条内容图标',
              normal: [['fontSize'], ['font'], ['color']],
            },
          },
        },
      },
      aliasName: 'VSteps',
    },
    target: Steps,
    screenshot:
      'data:image/png;base64,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',
  },
  {
    meta: {
      widgetName: 'Steps',
      title: '半扁平步骤条',
      desc: '半扁平步骤条配置',
      props: {
        children: { type: 'React.Node', desc: '步骤条需要包含的子组件' },
        data: {
          type: 'object[]',
          desc: '步骤条填充的数据',
          meta: [
            { key: 'title', title: '步骤条标题', type: 'string' },
            { key: 'description', title: '步骤条描述', type: 'string' },
            { key: 'stepStatus', title: '步骤条状态', type: 'StepStatus' },
          ],
        },
        defaultData: {
          type: 'object[]',
          desc: '步骤条填充的默认显示数据',
          meta: [
            { key: 'title', title: '步骤条标题', type: 'string' },
            { key: 'description', title: '步骤条描述', type: 'string' },
            { key: 'stepStatus', title: '步骤条状态', type: 'StepStatus' },
          ],
        },
        stepType: {
          type: 'StepType',
          desc: '步骤条风格 有 简洁,半扁平,图标,点状四种风格可供选择',
          defaultValue: 'flat',
        },
        size: {
          type: 'SizeType',
          desc: '步骤条尺寸,有正常和迷你 两种尺寸可供选择',
          defaultValue: 'normal',
        },
        orientation: {
          type: 'OrientationType',
          desc: '步骤条方向,可选择水平,垂直',
          defaultValue: 'vertical',
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
        StepStatus: ['finish', 'process', 'next', 'wait', 'error'],
      },
      childrenWidget: [],
      category: ['导航'],
      theme: {
        StepsOutContainer: {
          name: '步骤条最外层容器',
          desc: '步骤条最外层容器',
          normal: [['width'], ['height'], ['margin'], ['padding'], ['background'], ['opacity']],
        },
        Step: {
          name: '单个步骤配置',
          theme: {
            StepOutContainer: {
              name: '单个步骤外部',
              desc: '单个步骤外部容器配置',
              normal: [['width'], ['height']],
            },
            StepLine: {
              name: '步骤间连接线',
              desc: '步骤间连接线的配置',
              normal: [['width'], ['height'], ['background']],
            },
            StepInnerContainer: {
              name: '单个步骤内部',
              desc: '单个步骤内部容器配置',
              normal: [['width'], ['height'], ['background']],
            },
            StepTitle: {
              name: '步骤标题',
              desc: '配置步骤标题',
              normal: [
                ['fontSize'],
                ['font'],
                ['color'],
                ['width'],
                ['height'],
                ['padding'],
                ['margin'],
              ],
            },
            StepDescription: {
              name: '步骤条内容描述',
              desc: '配置步骤条内容描述',
              normal: [
                ['fontSize'],
                ['font'],
                ['color'],
                ['width'],
                ['height'],
                ['padding'],
                ['margin'],
              ],
            },
            StepInnerIcon: {
              name: '步骤条内容图标',
              desc: '配置步骤条内容图标',
              normal: [['fontSize'], ['font'], ['color']],
            },
          },
        },
      },
      aliasName: 'FlatSteps',
    },
    target: Steps,
    screenshot:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGYAAAAYCAYAAAAI94jTAAAAAXNSR0IArs4c6QAAC31JREFUaAXdWnuQV1Ud/9zd37LLwyGEgYBd2GUNqIB10pRAa9ScGBJihFAoRcxyQg2ZavWPapzij5IhgimbBnY0NSADByqZ6KUGCyrBBITFw11wAUUReSwPWXZvn8/3nu/du8vqgLv46Myce875fr/n+zyve+6N8A7pV4vjqw7V476DhzD62HF0O34SOURA50I09eiOI726Y3OPHvjeN74crXsHNhcMteSP8aij9Zh9pB4V9SfQveEM8iLq16UIjdTx6MUfwT9Z/+FNY6PqC6ZEG4y37ozL4ybcEQOjiR6MGN1ZNlG1g4TVsVydn8OST14S7Wqju4FIc3ZauDQeWbMPi3ftQWlTjEjG5omS2YpMPT8fcWk/7C8fgEnTJ0bPnc2t4yFLV8Uj972KZa+8jn5x0E86Wg7i0nYe4uKPoq5PL9w08foLq9+WHfEg+msBVRlTkI/8XI5+ywu+o17EobExyWea0MjgrYjyUDlicFTT2ktycYs0tyqet+HfmHm6IQmIDFRKDc3Us/BOBYgvG4YH7/5KdL/gFyo9/GT84//UoPIM9ZOMVC/XUzA6Q03HiU76lQ3E3Gnjo++q3dFp8454CpqwqLATuhQwIMoctGcFpqkpCQxnN5TfOo0T+RG+OWxI9GhWp2BOApr9ULxq04sYkx2FwijqSm6sKppBrYOWx9lzxXDMY3C+nfTo2GfVk/HcbTsxK26k6Dbkp/pJ1wze9afOcXE/PH7n5OjWjtSMS9ctXK6qigpRwMCgE4PisyU/+M7lNTIwCs4ZBuU086m3LDhNnE0/qhgSPeB0ssWSZsqaTZjJRvPSpYYBQhCCsd4pa7zqChYV0cxZcM8t0b3GuIMei5bFP9u2C9/i9JcoU0yl66CS+wpOnc7AgmzXzQYU9Rs6CPOn3hDNCuh2FZu3x9M44hcVFSFXpKAUJFmzRdl1lBAOeMsKjpY0rkqWpfPJU9yDYkz3mWM2ak/58zqs49SyoIiJlgMl21tYmgNUZuHsnRXsDtCycfVlGD3txmi9eLQ3Lf5D/JmNL6KaoyyZKWRo+lC4jB/7WeBTnwAu6kZDaeR/a4FV/wCOHGtDf/YpoH6XDsao8e3cc3bsiQdRpy2FBejK2QIFhrxttmimuD+y9mufUYAUHJs1DI5mzUnmEydxgv4drj3H3LyzDos5rRgwdgpGqyKni4k5X9xVaS4S4gRkSqgqevHavR9PBFS7i32v4QkFRYyCCsZTsu6YBFw+HPjTWuDnjwN/fx7o1xu4c3LiKNGkKRiiAXjgTSxN4e+20oR5DIYFxZYwBYbLGDd+5DRj6F3b/DOlYMKJRrQ+w0L/LlwRHpQ6eb/gkXhHLUpdt6zhglmbD7dPhnrd+xhAQOXAYPc+9H9kZazjYrvSb1fFo/cdQH93sJdiWjEU+Fgp8NhKYMNW4OVXgKcZmOWrAR7ncfmwRLRGrifvv/81DFjxbDzK4edb7jkQD6Izx3Yu4gDgbJFjLRh0uB0+KFNB8ZntZQojTrNde5EFRyUz+07Ytiu+JHfoMO7j9Eo3U3M6H26Mt9MljRbIThk47hpg0hjg0BGgco6AwTyW3OCiZ9Zj7W33i3lQUH1DXZRet9IACW8JkDzB12xsrovEhBMuUYNLgTcOAy+93MxLJLV7Ab7fgEdkS9K1tf5c46PO+aiu3RvbkuJLjDZmNyPpnYh0h4qPbewk6sSA2AzR8iUnMzuddH+7JBzjYgGUPA+QeOXykM/VYUruwBv2EmTaSCF3SJapGAlnax05qq7ROOWGZPOa/2hy0hCd6eP0WSbsFAe8HOWKW510hhNj8hcPwZVa0BlzAkP/g28yMBwUlgiz7qSRgXyxxOGjCaot/QXjTMSlnHUKijZj9dfDZSe9gw6kl3g5UT5SKTnmVNZ92RJf19n7t1WaTpSlQHpf8VLmUvuF3LF6dJNASVVpyqlpwFAKKHwg6Ms1fMbUpL2QO0kdlxChrEtgYIIJ85HKaspTdRGL1PDWMYEZkG2XL1JPTuZtLVuiM1qVRIjnNSNZp8E8xRkuHQhOEGhpuy1DCkoTnawk2rYC4/p4UFo4VINJvM8zqY/4qcwGh82SnK5ZZAwbiaPEnIDbJ/L4yVH313XAzj3NeK2n37k9GZFPPQOs/5c6EE/ljI8YtU5CEC8CmxlBmBsjR1iAAp0K0bbGC26zNsgQ3mlCF1x7BQNzJfCXauDAwZZ4pwmqgNc4NkLFw2VaYESYSRJnciSPdQXFMhtyqOmh0ukyfc+l6jbIB8rUpRdP9aErSzG2xMr2WuBajrzvzwD692nGaaaozRc9LHkqkItZ4JPyIEp1gzswlN5MeidP657Bu7LCGpiPtB8rQVwqtwsHzPQbget53NCAefqFwNcJk2YzD8FThgH5ASryunYB3z+ZpKQbTKWrNwEr/pbMmsqvJVN+wnXAlSN4E8e1fcFjyb7iHgrdzVHui9bBUlt02WAZTEBPpFF/52Fg6xRgoZ7yIUFpf+De6UDvnsBDS4C1PDCIgXjYaBaxUmDq8G6dk71F7xMNDckVia5JrK62Z8ECXLRa+mz548at9xHZwGNuUgYZicBze5o/SKq9TpnqHszxpayem2QPV9pGqgxhXvx7oLwYGD4E+MFdQBnrUnDewwBvm5MUjHZ9zBGOyuACy+Y+6hDwgTxxHGFOm84a0Wr9Ycp2Ef7j5cCtE5KT2G+oL++eUgZOmwbfGZNELPVCqpe789786YPs5k9W6ZKm+rkm6SXZKv2qJhxC6vL69ES1lJTFVqquCrM6/fQR4PVDDNCAZF1d9DugZm/CTKSe3InuDMF9JGTrYu00VpdcVTwFPQRK4RkagwWai7oCU8dxD9wNVC1L3p6NjXVm/8DDdRNO/dndkFqST5wC6jnIuNfiOPccDbhjKrNZeLZFI1r10Zu6gqqbBg3WMzpAnMescdvUJxsUBYb6rc7xm8VPuOF8kYT2LiNjbCOW8kzaIOdUAfd8FXh+C/DshgQuY88yODhMcG6O8edG4urbvtS+byF6weQBYw0NIFcmyaCS0vHzo5L7Me2HmjlGwIfpRlI5WUdii5AhE5z683tIfLIRV5UVRzzenH/SCyYDs52D1w5PziGfFTsYsMz6x/EqJV+DXkFRqWDYcqoA83OAvtWYupVz4hoaV+YGqbPVM8ZYsGR0wKni9bQUTA2mQQOw94G7o5Kk1b7nnKq4bu+rKBaXrKyZ04ABfd+et47LWt6kk+svatVL+mLP1ydHpWq/27SjNl7Jl83xeuv3nH3RFF/3h8tQUJQUFM0yzTbNPF1kakZyBi6vGBpNstN7aQmm8m15nb7ByHIzIumfMhY/OcVTti5EkGeVwkJ+++iHyU7b3rJ/b0zm0dcuMY1XED7/14nhLQYRCexKRCXp3DGuv7ryxTDu0wM3G6/2PPIwiw69js7mokpZzDFvASQrnw/JzvpSNJohCk72ElO3zNobGRRdYlaKzrbUGTdHz40cgflkotcM6yikkpi4ce59giylcLa8zk0xrhiCBR11syxBU8dF64eW8csgeSfWm/hUZtJKHGN6uIJEtNaf+Lh8IOa392ZZMgcPjGo44u/ilf0Z7TnZfUfO9hmhMq1zhth1PwNhMyXMFtab9MHMv2YqDmma/ct41cZt4O0XB13AqJCxZnAoA6oZHmg4reNPv0cfyhQg6eG6eUlQM0wNJuFkD0djXNz3Q/ahLDEB0AezF7ZiZgMv+QRLAyTDZGQ4thrcYSz1DeY9+7T8Ej8t8+reBktrHaUkUws92ZZ+ZSX8tDzhQ/hp2SziY+Fy/oyxu/lnDBttFhUanAmG6LV08QVvf3nJ+/MzBlWwUHiQTL+MjjZL/h9+xpCzPdnvS0f5+9Lh5t+XtHzz5tZ+X+rJ35cufp9/X+KvS7N5xV/Br3/dTzXwpMqgdOXvS7zT+1D/vvQ/blygmiqUlQoAAAAASUVORK5CYII=',
  },
  {
    meta: {
      widgetName: 'Steps',
      title: '图标步骤条',
      desc: '图标步骤条步骤条配置',
      props: {
        children: { type: 'React.Node', desc: '步骤条需要包含的子组件' },
        data: {
          type: 'object[]',
          desc: '步骤条填充的数据',
          meta: [
            { key: 'title', title: '步骤条标题', type: 'string' },
            { key: 'description', title: '步骤条描述', type: 'string' },
            { key: 'stepStatus', title: '步骤条状态', type: 'StepStatus' },
          ],
        },
        defaultData: {
          type: 'object[]',
          desc: '步骤条填充的默认显示数据',
          meta: [
            { key: 'title', title: '步骤条标题', type: 'string' },
            { key: 'description', title: '步骤条描述', type: 'string' },
            { key: 'stepStatus', title: '步骤条状态', type: 'StepStatus' },
          ],
        },
        stepType: {
          type: 'StepType',
          desc: '步骤条风格 有 简洁,半扁平,图标,点状四种风格可供选择',
          defaultValue: 'icon',
        },
        size: {
          type: 'SizeType',
          desc: '步骤条尺寸,有正常和迷你 两种尺寸可供选择',
          defaultValue: 'normal',
        },
        orientation: {
          type: 'OrientationType',
          desc: '步骤条方向,可选择水平,垂直',
          defaultValue: 'vertical',
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
        StepStatus: ['finish', 'process', 'next', 'wait', 'error'],
      },
      childrenWidget: [],
      category: ['导航'],
      theme: {
        StepsOutContainer: {
          name: '步骤条最外层容器',
          desc: '步骤条最外层容器',
          normal: [['width'], ['height'], ['margin'], ['padding'], ['background'], ['opacity']],
        },
        Step: {
          name: '单个步骤配置',
          theme: {
            StepOutContainer: {
              name: '单个步骤外部',
              desc: '单个步骤外部容器配置',
              normal: [['width'], ['height']],
            },
            StepLine: {
              name: '步骤间连接线',
              desc: '步骤间连接线的配置',
              normal: [['width'], ['height'], ['background']],
            },
            StepInnerContainer: {
              name: '单个步骤内部',
              desc: '单个步骤内部容器配置',
              normal: [['width'], ['height'], ['background']],
            },
            StepTitle: {
              name: '步骤标题',
              desc: '配置步骤标题',
              normal: [
                ['fontSize'],
                ['font'],
                ['color'],
                ['width'],
                ['height'],
                ['padding'],
                ['margin'],
              ],
            },
            StepDescription: {
              name: '步骤条内容描述',
              desc: '配置步骤条内容描述',
              normal: [
                ['fontSize'],
                ['font'],
                ['color'],
                ['width'],
                ['height'],
                ['padding'],
                ['margin'],
              ],
            },
            StepIcon: {
              name: '步骤条图标',
              desc: '配置步骤条图标',
              normal: [['fontSize'], ['font'], ['color']],
            },
          },
        },
      },
      aliasName: 'IconSteps',
    },
    target: Steps,
    screenshot:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGYAAAAUCAYAAAB/NUioAAAAAXNSR0IArs4c6QAAB0xJREFUWAntWH1MlVUYf87L5XMKDTc/MktSnAvBK5AKqM1ckGyCWiD2MVw2UxmrrJU6M9rSdDl1A9HlKss+rroKbYmxtiYfiiQfXieukUJGbvyBMw256L3v6fe8cPHl+nK593JV2jzs5Xw953d+7/N7zznPuUQP0pD0gBiSrHwglZ8vg1tUmmhykHgkkJoKC0WXDzB+H9LU1BTc0dExUSCFhYU1RUdHe8Trfy9MZp5MVx20AS8yXRIFsGdRdqBcIwRtOrJb/OR3b3sAWF9fn66q6gYp5XSYa7yQO6BPDdo2JSYmuuU1oDA5ldMeltL+FkDnSEmTNU6CfiehlCukbLPMqr+std3jf1kFMqirjb4Fp8WYWkKEkxCjUUiSUCYG7UloF/grGW+inHu1gs6dOxdks9nASy6GCKAEXlI29pRjUE9Cnf1eEhERkdPfCnIrTHZ57Dsw+ADoIQDqAngTcgJwNLJgblMEvW+ZfXYrt9+rVFAglbo2Ogrnp0GQigAT5f9QKM7o589YJeMgUSG4z4E4ZSFzKf1QtnDobfxdhl+Uuro68JLgJSrw5MfHx/fhVVtbG4d5C2EzB3lZQkJCOuzu4KX0R25JRexH6NtKQlyB8197YsTk8AOzrbH8PBQWNBwDVwCwXZW0Jbsidkt/OHejvb6NXmFR2OGRoyjVVRSeE1uYNXK0JtwxCJTa9Sstvxtc9JhwOnjJNLSVRUZGprqKwrYQwoo+Fu4YqqkQ0pCX4YpZWml+xqE6yjDwjxAlaN6Xs2ovMahryql5cpzs6voFZCaRSXn2YPKZn11t/F1fuFqacYCUwtnhIaE06dAO8be7ORa/Icfc6qImvGgHPrC0kmLR4M7e1z6cKWaHw1GK8eEmk2mS2Wx2y+v06dNjIA7vQB2KoqRNmzatD687hFlxOiHs6o1b1STkFGESiQeSrHXuyL5QZTZDxFps540RoYEzPkmsveHO3tc+jrr+tNM+rJScHowdP+4RazzBy1gtt0mV+JzEBkCWx0y0zF9nDkdd165dAy+p8YKzd2BVeMQL4mwDpR5ewhIeHr7Meeb02cqWVMS9frXz5l84RWJxah4YSBR+0W9SGqC0sIDYFB7LGNzu79Rip709otQECFo0ZjRtcJ0j610ZwY9r++iRtJHHoB0REeUwlquNr3WIAl6aKDXAWITyHbywXc3DNve0wRwbeQwejtRyGMtp07tisivj1pEqN6OjXQjl06AguWf/DGuz09BdnnPSPF61O1Zie3kVdiNIEesPzrLyGeWXtCBPxpCDzgKsfnwgJRt97RwQ1LZhi0NKGEXzCwqE6jr5sgIZcqWNTkAcsxJIUw4XikZXG2/qDQ0NMdi+zsKp9Yiwkp1fuysGRGmFjUSIPM61j+vNzc0h7e3tJ7DazHim4GxqNHGHFhKr9o1Y55dFcPBMy/TfsGo8T5akhhZYr32xOq7IfotO4cXfA+YXHEovWImaDwnbVO9Ho6iUBC9zwy4jURgeUdqHfMj3lonWu067r0DYMlfJYhDaS3ZKRn8jthOf+MHJwm63ayE5zohd/YniysGoHhUVZQOPYmjHq0/jpW1lCP3ngl0ILgDbvRVFP9HXM62tjIF4OpQx9X2DLHNoDmnophEOLpnYQmits4/L3Oas63PcIDp76t2Y+k4vy/i6NQw405CXN3DA0ng5MbUVA0eOYhBBqmH05dUEwNA+wR5M/ZfvDY7eVlGoDrd7Tll4vtJKun/YtGyIuJZj3u14JK51b6Pb+KcPVcMgrEAELET85eugvCrCiXUQhccY8vIGDDiMwUnj1bNiVCu3SFKe4nwwyYkhqRtzMFjOsd8XUTW8Vw4fZODiWJT1phzr7OO8ZLcoPbxbfI7+DojScWSP+OzwLnFUb8NjeCzcmIkv8PiRYjql7/eljBC3GuKAl8zAOVKEM6cPL08weQyPhW0msI7jfNF4acKMDRhWhQ38IlbOyqXlU1/yBNDIRhsLDMZiTCMbX9pAWCohlAtxGuH8PFsntS5YJW0LV8n5A+GxDdvyGB7LGAHBtIwxBxo7UL/GS1FykYOXzMOZ0won2xCFabxwbmShvAZ9w4A1nMt4nmdctmFbHsNjGQNnVS8vbSvbkXyyc2nl1FyHVEsdJPcvKY/djL344kDE9P14zccdpHLU8a8ilFzG1PcPtlyyU7TgLhN/yUGr8WtDChw8AR/A9YFw2QbczuN9LmC7q3o0gIoLd/rvl2esmhbcZeIR6q4GlxQ4eQIeJ69/ULagvXtnkvJj1DXR8AMn25yHIBeQV+EOU6wPIPB+t9PLp+Kium5K/LwiUrB6vFuWgm/gsio4SKz1NMy+PbN/SogAW/FCEluZYVjqn1m8Q8GqWYcRfA3htB5nmkfXiD7CdI/t/p/fND/4uqmz33697XB7qCyMLjU+bPWGd7k8FIXhV8aW9R3n+EXgOc49Sd1RmYHlUHC0AS23TcJEC90a3KfOkSNH+nxu3yfKD6btzwP/Aaj0L9qEqKuiAAAAAElFTkSuQmCC',
  },
  {
    meta: {
      widgetName: 'Steps',
      title: '点状步骤条',
      desc: '点状步骤条配置',
      props: {
        children: { type: 'React.Node', desc: '步骤条需要包含的子组件' },
        data: {
          type: 'object[]',
          desc: '步骤条填充的数据',
          meta: [
            { key: 'title', title: '步骤条标题', type: 'string' },
            { key: 'description', title: '步骤条描述', type: 'string' },
            { key: 'stepStatus', title: '步骤条状态', type: 'StepStatus' },
          ],
        },
        defaultData: {
          type: 'object[]',
          desc: '步骤条填充的默认显示数据',
          meta: [
            { key: 'title', title: '步骤条标题', type: 'string' },
            { key: 'description', title: '步骤条描述', type: 'string' },
            { key: 'stepStatus', title: '步骤条状态', type: 'StepStatus' },
          ],
        },
        stepType: {
          type: 'StepType',
          desc: '步骤条风格 有 简洁,半扁平,图标,点状四种风格可供选择',
          defaultValue: 'dot',
        },
        size: {
          type: 'SizeType',
          desc: '步骤条尺寸,有正常和迷你 两种尺寸可供选择',
          defaultValue: 'normal',
        },
        orientation: {
          type: 'OrientationType',
          desc: '步骤条方向,可选择水平,垂直',
          defaultValue: 'vertical',
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
        StepStatus: ['finish', 'process', 'next', 'wait', 'error'],
      },
      childrenWidget: [],
      category: ['导航'],
      theme: {
        StepsOutContainer: {
          name: '步骤条最外层容器',
          desc: '步骤条最外层容器',
          normal: [['width'], ['height'], ['margin'], ['padding'], ['background'], ['opacity']],
        },
        Step: {
          name: '单个步骤配置',
          theme: {
            StepOutContainer: {
              name: '单个步骤外部',
              desc: '单个步骤外部容器配置',
              normal: [['width'], ['height']],
            },
            StepLine: {
              name: '步骤间连接线',
              desc: '步骤间连接线的配置',
              normal: [['width'], ['height'], ['background']],
            },
            StepDot: {
              name: '点状步骤',
              desc: '点状步骤配置',
              normal: [['width'], ['height'], ['background']],
            },
            StepTitle: {
              name: '步骤标题',
              desc: '配置步骤标题',
              normal: [
                ['fontSize'],
                ['font'],
                ['color'],
                ['width'],
                ['height'],
                ['padding'],
                ['margin'],
              ],
            },
            StepDescription: {
              name: '步骤条内容描述',
              desc: '配置步骤条内容描述',
              normal: [
                ['fontSize'],
                ['font'],
                ['color'],
                ['width'],
                ['height'],
                ['padding'],
                ['margin'],
              ],
            },
          },
        },
      },
      aliasName: 'DotSteps',
    },
    target: Steps,
    screenshot:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGYAAAAOCAYAAADdeGlVAAAAAXNSR0IArs4c6QAAAh9JREFUWAntWLFOwzAQvTNjFX6hA6ytYC4sVVfSDYm1E+wVH4HYw9QViTGsFQt0btWuXfoLVIz0uHPrEkqSJm6pUwlLkR37zn6Xi8/3jBAprbea9wHvbSL0gehYDyGOESksweF956w3jYg7b/q35NEU2gjgM5g5XoAxAYTowX14h3uLl22al6tetT6bQYeIyqYvWiPiRCloPdaGL9F+V+2La6oDQgcIYvHy2ITHWs8PuJd4tWPEKZ8z6rIhS0fFfnAEOlDYcO0c7RSALmNMxwtsEUDDtXNs8KIOXzQdJe2UVQfJzimhV3EV1hbha5S4U34BhgmHtYqrsGaLV83PlPjwtWqjvIsDRSdubBd9cqZkdooGDGWtswtwMWvY4lVsZDNmvtQunRykSvzhoAVejneSHLgplngVERzlRmwythhFjqckjxna9N3MY2pEC7zfGZuZZlkHQUDymI5N3808prbFq8wE/3WxvgBevlb7fHCc5IKFOHg6H57m0tmSsH9Dfd6PufDyXzsIA9wrvErIY95vZqOTd40keY45ufHa6CStn7ffZm3RUcLoJQXOuqBOl1knq/y25YTRa/KYdWImmlonq/yW5WzxKuEjwujZWHbUmsIyIuuKwwg6zUeY0XNzPV6RYVlXHGYTvPrwFyYvjD5t58hYEVi/GLtg8o3UnSNXMgVg/bZ4f1xpmEtM/suayzR6Dy4xBW8kLS38JWYWvF8waEIl3I2eYgAAAABJRU5ErkJggg==',
  },
  {
    meta: {
      widgetName: 'Switch',
      title: '开关',
      desc: '开关选择器',
      props: {
        defaultValue: { type: 'boolean', desc: '默认开关状态', defaultValue: false },
        value: { type: 'boolean', desc: '开关状态', defaultValue: false },
        data: {
          type: 'Object[]',
          meta: [{ key: 'text', title: '显示文本', type: 'any' }],
          desc: '开关配置的展示信息',
        },
        size: { type: 'sizeType', desc: '设置开关大小 default | small' },
        isInverse: { type: 'boolean', desc: '开关翻转', defaultValue: false },
        loading: { type: 'boolean', desc: '是否配置加载', defaultValue: false },
        autoFocus: { type: 'boolean', desc: '是否自动聚焦', defaultValue: false },
        disabled: { type: 'boolean', desc: '禁用状态,是否不可用', defaultValue: false },
        displayFiled: {
          type: 'string',
          desc: '匹配需要显示的文本,读取data中需要显示的内容名',
          defaultValue: 'text',
        },
      },
      events: {
        onChange: {
          desc: '开关状态改变时触发',
          args: [{ name: 'event', desc: '改变状态触发的DOM事件', type: 'ChangeType' }],
        },
      },
      type: {
        sizeType: ['default', 'small'],
        ChangeType: { newValue: 'string', oldValue: 'string', event: 'SyntheticEvent' },
      },
      category: ['数据录入'],
      theme: {
        Switch_SwitchOpen: {
          name: '组件打开',
          desc: '开关组件打开的样式配置',
          normal: [
            ['width'],
            ['height'],
            ['background'],
            ['fontSize'],
            ['borderRadius'],
            ['border'],
            ['boxShadow'],
            ['color'],
            ['font'],
          ],
          hover: [],
          active: [],
          disabled: [['background'], ['border']],
        },
        Switch_SwitchClosed: {
          name: '组件关闭',
          desc: '开关组件打开的样式配置',
          normal: [
            ['width'],
            ['height'],
            ['background'],
            ['fontSize'],
            ['borderRadius'],
            ['border'],
            ['boxShadow'],
            ['color'],
            ['font'],
          ],
          hover: [],
          active: [],
          disabled: [['background'], ['border']],
        },
        SwitchButton: {
          name: '按钮',
          desc: '按钮的样式配置',
          normal: [
            ['width'],
            ['height'],
            ['background'],
            ['borderRadius'],
            ['border'],
            ['boxShadow'],
            ['color'],
          ],
          hover: [],
          active: [
            ['width'],
            ['height'],
            ['background'],
            ['borderRadius'],
            ['border'],
            ['boxShadow'],
          ],
          disabled: [['background'], ['border'], ['width'], ['height'], ['borderRadius']],
        },
        SwitchContainer: {
          name: '开关整体',
          desc: '开关整体的样式配置',
          normal: [
            ['width'],
            ['height'],
            ['border'],
            ['margin'],
            ['padding'],
            ['background'],
            ['opacity'],
          ],
          hover: [],
          active: [],
          disabled: [
            ['width'],
            ['height'],
            ['border'],
            ['margin'],
            ['padding'],
            ['background'],
            ['opacity'],
          ],
        },
      },
      childrenWidget: [],
    },
    target: Switch,
    screenshot:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAXCAYAAAB9J90oAAAAAXNSR0IArs4c6QAABANJREFUSA2tl01sFGUYx38zu9v9aKnQdquohdC0FJU2GilGsYn1QKLGiPXkAU08mOiFgyaevOhNPZnowYMmkpAIiVWjxnDwQkpCAYtIQSQSICBaaYBuh+7XzOvzzHSLm93tsrvzJNvZvjvvM//n/z4f/7GMGHXs1hLcyEA+X+fGBn+Ot8HaTkgm6m+M1rolX4BjJ2HqGJy7ADeXgdaNqpbDKusloAMbYcc22DYCbbEqN8qSVY3Rk2dg7yScPgeuC5EI2HZ1B42sFsWXJ5+o0KM+9SyVED0pBT28BXa/CCMPVHotA6obvz0IX34NS1mI1Yiu0s3qKxqsZcFQPzyyFZTB7rVCggf/XIOz54PT+/MidHbAqy/BCzuDPSXPZUAP/ACfH5Bohb0wGNSHFIpwT48wNQFjo7WDX1iEH3+Gr74HR2rizd2wS8CWbAXo8d/gvY+Dow4TZH+f4Z03LDbcW3rk6tcjJ+CjzyRASYn33wrSQXf4mZfNBTmpuRIWSE+OtesuePv1OwepgB57WNk0KCZNQc1hNR/o0V/hD8mTsHJSHWvh7Npp2NSn/zVm449bPDlqOHEaZmaDvT7QqeNSjcJAWKa+0l0e40807/GZp4wUoMdhwaZma3VfuBy0i2Cp9b9a5YObPHrWSak3aZv7LdanPb+H6/HbGUea+YJ8ad5nBRRXKO1bL72uBetIWdydNsxfNzi3BJ9Gry2EEIEa45GMt5ZL2nfjMVeKyfhDx9YC0qlQf+LfOT0WRkauMNCCeZ5h0XFJxKXIZZLZne2wTtqIrIdmtuTR+YsFCb55pzcWXC7/XaS326I9JUDbhE0dbZoCYVk0astYLHLpynITbMLxzKmsP14fHLR8beC3p7Hty6qleQLKoNgyNTJOlO8OSpU2YYWCxzc/ZUglY/7YVRc+0OEheHT49hRownfFlkQiKbM7y+GjjYPdN3mNX2YtxrbH2TIQuPaBquR6ZUJGniqakFIgEonhsoYPPv2XqembFYFUW9AC2jc5xxf7HTbe3ymYIittc0WU6MYjM/ChCAJV9KoZWzVjXLJL1yX6eZ59OsXEc2kBUCnnFeCp3x0f5KFpj+6eXt7ds4bRkds9swyoAlMV9cleuHJV2oIUWquDwJgihVwGx5kXrZlj61BCjjNJT5cwLqd3dS7H7NklEel5IaidwYFu9rzWLmrfP+wVriqA6i8qZveLNj00HbyCaPNVVaXXRk236ABw3SyF/CK5rINbzPlrWrvGRIhEE/SmOxjf0cHLz7fJRKp8UFWgJTCX/oJpUVb6SjIn4FV6tdAaZQx4GK8YfCSDUwkdkzYPbY6JvIuw4b5yFks49Loq0P/fqMIgrEIr+dUirvUyV7qndP0PLXKLA88lz5UAAAAASUVORK5CYII=',
  },
  {
    meta: {
      widgetName: 'Table',
      title: '表格',
      desc: 'Table  表格。',
      props: {
        columns: {
          type: 'Object[]',
          meta: [
            { key: 'title', title: '表头文本', type: 'string' },
            { key: 'key', title: '对应key', type: 'any' },
            { key: 'dataIndex', title: '指定展示项', type: 'any' },
            { key: 'width', title: '列宽', type: 'number' },
          ],
          desc: '表格每一行展示的内容',
        },
        data: { type: 'Object[]', meta: [], desc: '数据源，指定 table 组件的数据' },
        defaultExpandedRowKeys: { type: 'string[]', desc: '初始展开的行的集合' },
        expandedRowKeys: { type: 'string[]', desc: '展开的行的集合' },
        defaultExpandAllRows: { type: 'boolean', desc: '初始是否展开所有的行' },
        expandedRowRender: {
          type: 'Function(recode, index, indent, expanded):ReactNode',
          desc: '额外的展开行',
        },
        useFixedHeader: { type: 'boolean', desc: '固定 Table 标题，使其固定在最上方' },
        footer: { type: 'Function(currentPageData)', desc: '表格尾部' },
        indentSize: {
          type: 'number',
          desc: '展示树形数据时，每层缩进的宽度，以 px 为单位',
          defaultValue: 15,
        },
        rowKey: {
          type: '{ x: number | true, y: number }',
          desc: '表格行 key 的取值，可以是字符串或一个函数',
          defaultValue: 'key',
        },
        showHeader: { type: 'boolean', desc: '是否展示标头', defaultValue: true },
        title: { type: 'Function(currentPageData)', desc: '表格标题' },
        onHeaderRow: { type: 'Function(column, index)', desc: '设置头部行属性' },
        onRow: { type: 'Function(record, index)', desc: '设置行属性' },
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
      childrenWidget: [],
      category: ['数据展示'],
    },
    target: Table,
    screenshot:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHQAAABWCAYAAAAe/rIaAAAAAXNSR0IArs4c6QAAA3lJREFUeAHtnU+KE0EUxqsyEwcccOXGnCA7LyDElQwoQpAowclcwyt4hawzGkRBUBcybszaC+QEwV1cKILJdE868mUxM92vKjTx1fPL5qW7Xld97/ulupv+Q/xwOMxdAp9Op+Mmk4kapdr0wBhfAO33+1hWG2ezmWu1Wmr0adNTGDMej11DjUMUUosDBFqLjXo6IVA9LGpRQqC12Kink31JyqfPXytTHh3dX7fXnVc5aEWjFh2QuGs9nKFw3kgkUCMgUQaBwgkjkUCNgEQZBAonjEQCNQISZRAonDASCdQISJRBoHDCSCRQIyBRBoHCCSORQI2ARBkECieMRAI1AhJlECicMBL5kNiWIPmQ2JbGcbM4B7jLjfNLfTaBqkcUJ5BA4/xSn02g6hHFCVw/9VecsaXw0aZTm541w1ReVppOp6peqtKmp4BZsOQuN4VdU4RGAo0wK4VUAk2BUoRGAo0wK4VUAk2BUoRGAo0wK4VU8e2z0CKk0/h2u+2LvkLzQse9nBfaf2je5f5jl0PHCc2TxucMlRxKrJ1AEwMmyRWBPhgMDqVO2K7HARHozT/+5ePe8UM9kqmkygERqHP5nWZz/3W3N+hUdcQ2HQ6IQFdXxBeNRuOW2/Pvur2TezpkU0WZAyLQYsMsy5z3/rbbc++7z47vlnXG9f/egSCgG5neHSxdfmOzzC/qHAgCutrlutWu94dbZk8+vnn1TV0VFLRxQLxStLq808yy/Of58vzph7enXzZb8otKB8QZmufu+2KxeE6YKvldESXO0N8H7sXZ6PTXlS25QqUD4gw9G40IUyW660WJQK/fjGu1OkCgWslsqUs8hob2i/udUn5ontRPWXto/6F5ZeOErg8dJzRPGpczVHIosXYCTQyYJJdAJYcSa/fSsyyJ1fNfy53P53/fh0jBBW0/PG16CoZ8tyWFX3KkRh5DIw3Tnk6g2glF6iPQSMO0pxOodkKR+gg00jDt6eK1XOn0HNcg687b1jgtOqB/13o4Q+G8kUigRkCiDAKFE0YigRoBiTIIFE4YiQRqBCTKIFA4YSQSqBGQKINA4YSRSKBGQKIMAoUTRiKBGgGJMggUThiJBGoEJMogUDhhJIr3Q3G/U6q37jxpvLJ2LTqgb9d6OEPhvJFIoEZAogwChRNGIoEaAYky1idFqfx3izad2vQUUC8AS7fTjJ7GXgUAAAAASUVORK5CYII=',
  },
  {
    meta: {
      widgetName: 'Tabs',
      title: '标签页',
      desc: '选项卡切换组件',
      props: {
        activityValue: { type: 'string', desc: '当前激活 tab 面板的 key' },
        defaultActivityValue: { type: 'string', desc: '默认激活 tab 面板的 key', defaultValue: 0 },
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
        },
        data: { type: 'object[]', desc: '配置标签页需要配置的数据' },
        defaultData: { type: 'object[]', desc: '默认配置标签页需要配置的数据,若有data,以data优先' },
        forceRender: { type: 'boolean', desc: '切换时是否重新渲染面板', defaultValue: false },
        pagedType: {
          type: 'PagedType',
          desc: '翻页类型,可配置单个滑动,整页滑动',
          defaultValue: 'single',
        },
        showAddBtn: {
          type: 'boolean',
          desc: '是否显示新增按钮(仅卡片和窗口类型支持)',
          defaultValue: false,
        },
        showDeleteBtn: {
          type: 'boolean',
          desc: '是否显示删除按钮(仅卡片和窗口类型支持)',
          defaultValue: false,
        },
      },
      events: {
        onTabClick: {
          desc: 'tab 被点击时的回调',
          args: [{ name: 'result', desc: '返回当前被点击是第几的项', type: 'number' }],
        },
        onChange: {
          desc: 'tab改变时触发',
          args: [{ name: 'result', desc: '标签页改变时当前选中的是第几的项', type: 'number' }],
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
          desc: '点击添加按钮新增标签后回调',
          args: [{ name: 'event', desc: '新增标签时的事件', type: 'Object' }],
        },
        getAddItem: {
          desc: '返回点击添加按钮新增标签的内容',
          args: [{ name: 'event', desc: '获取新增标签的内容事件', type: 'Object' }],
        },
        onDelete: {
          desc: '点击清除按钮后删除标签后的回调',
          args: [{ name: 'event', desc: '删除标签时的事件', type: 'Object' }],
        },
      },
      type: {
        TabType: ['line', 'card', 'window'],
        PagedType: ['single', 'page'],
        TabPositionType: ['top', 'bottom', 'inner', 'default'],
      },
      childrenWidget: [],
      category: ['数据展示'],
      designInfo: {
        CardTabs: {
          sequence: 1,
          title: '卡片风格标签页',
          desc: '卡片风格标签页',
          props: { tabType: 'card' },
          theme: {
            AddButton: {
              name: '新增按钮',
              desc: '新增按钮样式配置',
              normal: [
                ['width'],
                ['height'],
                ['opacity'],
                ['background'],
                ['border'],
                ['boxShadow'],
                ['color'],
                ['fontSize'],
              ],
              hover: [
                ['width'],
                ['height'],
                ['opacity'],
                ['background'],
                ['border'],
                ['boxShadow'],
                ['color'],
                ['fontSize'],
              ],
            },
            ContentBlock: {
              name: '内容区域',
              desc: '内容区域的样式配置',
              normal: [['background'], ['padding'], ['width'], ['height']],
            },
            TitleContainer: {
              name: '卡片区域',
              desc: '卡片区域样式配置',
              normal: [['width'], ['background']],
            },
            BorderStyle: { name: '默认线', desc: '默认线样式配置', normal: [['border', 'bottom']] },
            TabHeader: {
              name: '标签配置',
              theme: {
                DefaultTabPan: {
                  name: '默认标签',
                  desc: '默认标签样式配置',
                  normal: [
                    ['width'],
                    ['height'],
                    ['color'],
                    ['background'],
                    ['border'],
                    ['margin'],
                    ['padding'],
                    ['font'],
                    ['opacity'],
                  ],
                  hover: [['color'], ['background'], ['border'], ['font'], ['opacity']],
                  disabled: [['color'], ['background']],
                },
                SelectTabPan: {
                  name: '选中标签',
                  desc: '选中标签样式配置',
                  normal: [
                    ['color'],
                    ['background'],
                    ['border'],
                    ['margin'],
                    ['padding'],
                    ['font'],
                    ['opacity'],
                  ],
                  hover: [['color'], ['background'], ['border'], ['font'], ['opacity']],
                  disabled: [['color'], ['background']],
                },
              },
            },
          },
        },
        WindowTabs: {
          sequence: 1,
          title: '窗口风格标签页',
          desc: '窗口风格标签页',
          props: { tabType: 'window' },
          theme: {
            WindowContainer: {
              name: '窗口背景区域',
              desc: '窗口背景区域样式配置',
              normal: [['background'], ['padding'], ['border'], ['borderRadius'], ['opacity']],
            },
            AddButton: {
              name: '新增按钮',
              desc: '新增按钮样式配置',
              normal: [
                ['width'],
                ['height'],
                ['opacity'],
                ['background'],
                ['border'],
                ['boxShadow'],
                ['color'],
                ['fontSize'],
              ],
              hover: [
                ['width'],
                ['height'],
                ['opacity'],
                ['background'],
                ['border'],
                ['boxShadow'],
                ['color'],
                ['fontSize'],
              ],
            },
            ContentBlock: {
              name: '内容区域',
              desc: '内容区域的样式配置',
              normal: [['background'], ['padding'], ['width'], ['height']],
            },
            TitleContainer: { name: '卡片区域', desc: '卡片区域样式配置', normal: [['width']] },
            TabHeader: {
              name: '标签配置',
              theme: {
                DefaultTabPan: {
                  name: '默认标签',
                  desc: '默认标签样式配置',
                  normal: [
                    ['width'],
                    ['height'],
                    ['color'],
                    ['background'],
                    ['border'],
                    ['margin'],
                    ['padding'],
                    ['font'],
                    ['opacity'],
                  ],
                  hover: [['color'], ['background'], ['border'], ['font'], ['opacity']],
                  disabled: [['color'], ['background']],
                },
                SelectTabPan: {
                  name: '选中标签',
                  desc: '选中标签样式配置',
                  normal: [
                    ['color'],
                    ['background'],
                    ['border'],
                    ['margin'],
                    ['padding'],
                    ['font'],
                    ['opacity'],
                  ],
                  hover: [['color'], ['background'], ['border'], ['font'], ['opacity']],
                  disabled: [['color'], ['background']],
                },
              },
            },
          },
        },
      },
      theme: {
        ContentBlock: {
          name: '内容区域',
          desc: '内容区域的样式配置',
          normal: [['background'], ['padding'], ['width'], ['height']],
        },
        TitleContainer: {
          name: '卡片区域',
          desc: '卡片区域样式配置',
          normal: [['width'], ['background']],
        },
        BorderStyle: { name: '默认线', desc: '默认线样式配置', normal: [['border', 'bottom']] },
        TabHeader: {
          name: '标签配置',
          theme: {
            DefaultTabPan: {
              name: '默认标签',
              desc: '默认标签样式配置',
              normal: [
                ['width'],
                ['height'],
                ['color'],
                ['background'],
                ['border'],
                ['margin'],
                ['padding'],
                ['font'],
                ['opacity'],
              ],
              hover: [['color'], ['background'], ['border'], ['font'], ['opacity']],
              disabled: [['color'], ['background']],
            },
            SelectTabPan: {
              name: '选中标签',
              desc: '选中标签样式配置',
              normal: [
                ['color'],
                ['background'],
                ['border'],
                ['margin'],
                ['padding'],
                ['font'],
                ['opacity'],
              ],
              hover: [['color'], ['background'], ['border'], ['font'], ['opacity']],
              disabled: [['color'], ['background']],
            },
          },
        },
      },
    },
    target: Tabs,
    screenshot:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGYAAAAaCAYAAABFPynYAAAAAXNSR0IArs4c6QAAALxJREFUaAXtmsEJhDAABI3VpBmr8GMj9nBgGTaTFqxC0QrmDm5RHN8Dm8y8ApYOfsO07wRdP6Wc3L95cpZfmNYaumet9brntzw9U09BuawBw2R94zXDYFVZ0DBZ33jNMFhVFjRM1jdeMwxWlQUNk/WN1wyDVWVBw2R94zXDYFVZ0DBZ33jNMFhVFjRM1jdeMwxWlQUNk/WN1wyDVQlqQAMa0IAGNKABDbzPQBlG9r/YU9Us8/bIo/uOuWm2A9ZDGN6y2llBAAAAAElFTkSuQmCC',
  },
  {
    meta: {
      widgetName: 'Tabs',
      title: '卡片风格标签页',
      desc: '卡片风格标签页',
      props: {
        activityValue: { type: 'string', desc: '当前激活 tab 面板的 key' },
        defaultActivityValue: { type: 'string', desc: '默认激活 tab 面板的 key', defaultValue: 0 },
        tabType: {
          type: 'TabType',
          desc: '可配置三种风格的标签页.可选 线性,卡片,窗口风格',
          defaultValue: 'card',
        },
        tabPosition: {
          type: 'TabPositionType',
          desc: '页签位置，可配置 左,右,上,下',
          defaultValue: 'top',
        },
        children: {
          type: 'React$Element<any>',
          desc: '配置标签页需要包含的子组件,若有data,以data优先',
        },
        data: { type: 'object[]', desc: '配置标签页需要配置的数据' },
        defaultData: { type: 'object[]', desc: '默认配置标签页需要配置的数据,若有data,以data优先' },
        forceRender: { type: 'boolean', desc: '切换时是否重新渲染面板', defaultValue: false },
        pagedType: {
          type: 'PagedType',
          desc: '翻页类型,可配置单个滑动,整页滑动',
          defaultValue: 'single',
        },
        showAddBtn: {
          type: 'boolean',
          desc: '是否显示新增按钮(仅卡片和窗口类型支持)',
          defaultValue: false,
        },
        showDeleteBtn: {
          type: 'boolean',
          desc: '是否显示删除按钮(仅卡片和窗口类型支持)',
          defaultValue: false,
        },
      },
      events: {
        onTabClick: {
          desc: 'tab 被点击时的回调',
          args: [{ name: 'result', desc: '返回当前被点击是第几的项', type: 'number' }],
        },
        onChange: {
          desc: 'tab改变时触发',
          args: [{ name: 'result', desc: '标签页改变时当前选中的是第几的项', type: 'number' }],
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
          desc: '点击添加按钮新增标签后回调',
          args: [{ name: 'event', desc: '新增标签时的事件', type: 'Object' }],
        },
        getAddItem: {
          desc: '返回点击添加按钮新增标签的内容',
          args: [{ name: 'event', desc: '获取新增标签的内容事件', type: 'Object' }],
        },
        onDelete: {
          desc: '点击清除按钮后删除标签后的回调',
          args: [{ name: 'event', desc: '删除标签时的事件', type: 'Object' }],
        },
      },
      type: {
        TabType: ['line', 'card', 'window'],
        PagedType: ['single', 'page'],
        TabPositionType: ['top', 'bottom', 'inner', 'default'],
      },
      childrenWidget: [],
      category: ['数据展示'],
      theme: {
        AddButton: {
          name: '新增按钮',
          desc: '新增按钮样式配置',
          normal: [
            ['width'],
            ['height'],
            ['opacity'],
            ['background'],
            ['border'],
            ['boxShadow'],
            ['color'],
            ['fontSize'],
          ],
          hover: [
            ['width'],
            ['height'],
            ['opacity'],
            ['background'],
            ['border'],
            ['boxShadow'],
            ['color'],
            ['fontSize'],
          ],
        },
        ContentBlock: {
          name: '内容区域',
          desc: '内容区域的样式配置',
          normal: [['background'], ['padding'], ['width'], ['height']],
        },
        TitleContainer: {
          name: '卡片区域',
          desc: '卡片区域样式配置',
          normal: [['width'], ['background']],
        },
        BorderStyle: { name: '默认线', desc: '默认线样式配置', normal: [['border', 'bottom']] },
        TabHeader: {
          name: '标签配置',
          theme: {
            DefaultTabPan: {
              name: '默认标签',
              desc: '默认标签样式配置',
              normal: [
                ['width'],
                ['height'],
                ['color'],
                ['background'],
                ['border'],
                ['margin'],
                ['padding'],
                ['font'],
                ['opacity'],
              ],
              hover: [['color'], ['background'], ['border'], ['font'], ['opacity']],
              disabled: [['color'], ['background']],
            },
            SelectTabPan: {
              name: '选中标签',
              desc: '选中标签样式配置',
              normal: [
                ['color'],
                ['background'],
                ['border'],
                ['margin'],
                ['padding'],
                ['font'],
                ['opacity'],
              ],
              hover: [['color'], ['background'], ['border'], ['font'], ['opacity']],
              disabled: [['color'], ['background']],
            },
          },
        },
      },
      aliasName: 'CardTabs',
    },
    target: Tabs,
    screenshot:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGYAAAAkCAYAAAB7T08FAAAAAXNSR0IArs4c6QAAAiBJREFUaAXtmrFSwkAQhkkGBigoLIGKloHOB7CgtbWwkA4stfAhGAoshQ5fwdbCB7CDnkqgs7AABod4y2SZcyfMXAriZvxtLnu3kv//v1yiRi9jfY3H4+pms+kHQXBhpsvWUpoOF57nveXz+Yd2u/1hCyd/2+12YPy1drvdmb32V8e+738ava+5XO7e1uuxIBK9Xq/fTdOjEf7c7XYXvJamcTgclo2HG+PhrlAonLPZEMqk0WiWarVatlgsqrC1Wq0ys9nsezqdfBk4TdabZXW0UwhKp9Pp8Vwax/CC6o1Gowx5Mh6uyQftFIJSr9cPnjX4owsk1FQycAZG0xXp8lkc3b5op3Cd9pG8kCf2YY5btFO41jaSNtLIug5gzEQ5rbcvNmOPoZfDc5KeKVpuX7ZOPiZt9nPPBsM9GBUkADAKIERJAJioVBTMAYwCCFESACYqFQVzsX98vLwNAhfdL0/e/pfXU/e7aInTM5//+mPB0W+tVKr7tbj9Rz9QLGDHiEC0lACjhYTQATAiEC0lwGghIXQAjAhESwkwWkgIHQAjAtFSAowWEkIHwIhAtJQAo4WE0AEwIhAtJcBoISF0AIwIREsJMFpICB0AIwLRUgKMFhJCB8CIQLSUsd9g8ptJVwOn7nfV4drHbyZP1e/6udgxrkkl3AcwCQfuejqAcU0q4T6ASThw19MBjGtSCfd5y+XS6f/EEtb170+HHaP0EvgBC0CU69uckSwAAAAASUVORK5CYII=',
  },
  {
    meta: {
      widgetName: 'Tabs',
      title: '窗口风格标签页',
      desc: '窗口风格标签页',
      props: {
        activityValue: { type: 'string', desc: '当前激活 tab 面板的 key' },
        defaultActivityValue: { type: 'string', desc: '默认激活 tab 面板的 key', defaultValue: 0 },
        tabType: {
          type: 'TabType',
          desc: '可配置三种风格的标签页.可选 线性,卡片,窗口风格',
          defaultValue: 'window',
        },
        tabPosition: {
          type: 'TabPositionType',
          desc: '页签位置，可配置 左,右,上,下',
          defaultValue: 'top',
        },
        children: {
          type: 'React$Element<any>',
          desc: '配置标签页需要包含的子组件,若有data,以data优先',
        },
        data: { type: 'object[]', desc: '配置标签页需要配置的数据' },
        defaultData: { type: 'object[]', desc: '默认配置标签页需要配置的数据,若有data,以data优先' },
        forceRender: { type: 'boolean', desc: '切换时是否重新渲染面板', defaultValue: false },
        pagedType: {
          type: 'PagedType',
          desc: '翻页类型,可配置单个滑动,整页滑动',
          defaultValue: 'single',
        },
        showAddBtn: {
          type: 'boolean',
          desc: '是否显示新增按钮(仅卡片和窗口类型支持)',
          defaultValue: false,
        },
        showDeleteBtn: {
          type: 'boolean',
          desc: '是否显示删除按钮(仅卡片和窗口类型支持)',
          defaultValue: false,
        },
      },
      events: {
        onTabClick: {
          desc: 'tab 被点击时的回调',
          args: [{ name: 'result', desc: '返回当前被点击是第几的项', type: 'number' }],
        },
        onChange: {
          desc: 'tab改变时触发',
          args: [{ name: 'result', desc: '标签页改变时当前选中的是第几的项', type: 'number' }],
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
          desc: '点击添加按钮新增标签后回调',
          args: [{ name: 'event', desc: '新增标签时的事件', type: 'Object' }],
        },
        getAddItem: {
          desc: '返回点击添加按钮新增标签的内容',
          args: [{ name: 'event', desc: '获取新增标签的内容事件', type: 'Object' }],
        },
        onDelete: {
          desc: '点击清除按钮后删除标签后的回调',
          args: [{ name: 'event', desc: '删除标签时的事件', type: 'Object' }],
        },
      },
      type: {
        TabType: ['line', 'card', 'window'],
        PagedType: ['single', 'page'],
        TabPositionType: ['top', 'bottom', 'inner', 'default'],
      },
      childrenWidget: [],
      category: ['数据展示'],
      theme: {
        WindowContainer: {
          name: '窗口背景区域',
          desc: '窗口背景区域样式配置',
          normal: [['background'], ['padding'], ['border'], ['borderRadius'], ['opacity']],
        },
        AddButton: {
          name: '新增按钮',
          desc: '新增按钮样式配置',
          normal: [
            ['width'],
            ['height'],
            ['opacity'],
            ['background'],
            ['border'],
            ['boxShadow'],
            ['color'],
            ['fontSize'],
          ],
          hover: [
            ['width'],
            ['height'],
            ['opacity'],
            ['background'],
            ['border'],
            ['boxShadow'],
            ['color'],
            ['fontSize'],
          ],
        },
        ContentBlock: {
          name: '内容区域',
          desc: '内容区域的样式配置',
          normal: [['background'], ['padding'], ['width'], ['height']],
        },
        TitleContainer: { name: '卡片区域', desc: '卡片区域样式配置', normal: [['width']] },
        TabHeader: {
          name: '标签配置',
          theme: {
            DefaultTabPan: {
              name: '默认标签',
              desc: '默认标签样式配置',
              normal: [
                ['width'],
                ['height'],
                ['color'],
                ['background'],
                ['border'],
                ['margin'],
                ['padding'],
                ['font'],
                ['opacity'],
              ],
              hover: [['color'], ['background'], ['border'], ['font'], ['opacity']],
              disabled: [['color'], ['background']],
            },
            SelectTabPan: {
              name: '选中标签',
              desc: '选中标签样式配置',
              normal: [
                ['color'],
                ['background'],
                ['border'],
                ['margin'],
                ['padding'],
                ['font'],
                ['opacity'],
              ],
              hover: [['color'], ['background'], ['border'], ['font'], ['opacity']],
              disabled: [['color'], ['background']],
            },
          },
        },
      },
      aliasName: 'WindowTabs',
    },
    target: Tabs,
    screenshot:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGoAAAAsCAYAAACNIC3mAAAAAXNSR0IArs4c6QAAAwRJREFUeAHtm8Fu2kAQhteAMKI4alR8aE7ceJu+R5+o79G34ZpK6SFUqQI5gALU/5Cfjq0e7G3AYzQrbXYx6/X/z7ezShRvEt7K8/PqUBR+9NZABJIkCTc3WQIpA+rRkNhnyzFda2EUBS296D6vWfGl9UKT1kdQ4ghf/KtaMdJEB0yz4j4GYb/fyzTaZ5N5zzWWWqstpBf1AFAlSDCiKw2dS+A55qXZXq8ngNjiWfADf7pFv82i9UIrq9KUMKPkGgzsdjsxMZl8CGmahn6/r8Z3pwsfm80mrFZr8QPzKISUZRNT/qh3vX4RvdCqY09QCbMIq2s6/SRUMbirBSbH47HAeHxcCiB6yfO8CMIRHK+13VLvaDQKy+Uv0YtMK4psfSe13AqQSVx9bYt/j+fDCzxhxaJmWWYOkvZJvcx8fkdQCUFhu7u2MhwOT6DSdGjeHhgoUJJW3PpkXwQsvS+ad1RTIDzBOMpgcLJc8+7LD4NesEBlYUbxs7dGI1ACpQka1Rst6+jt7wqNnuhCN1ZZlEBdSIM/JiICDioiaG3c4qDaiHrEM6N/Bfrytd7Tvn87jjv3+Hpq6o9aLBa1Bs/ncxnXdHytydUgzygVDMtdB2WZjtLmoFQwLHcdlGU6SpuDUsGw3HVQlukobQ5KBcNy10FZpqO0OSgVDMtdB2WZjtLmoFQwLHcdlGU6SpuDUsGw3HVQlukobQ5KBcNy10FZpqO0OSgVDMtdvNyH2ite+33dbrfh7u6zZb2NteFtHrzTd3//ozgwEMJsNms8Rxs3PDz8DHhxNM+n+C/83jOqDQoRz3RQEUFr4xYH1UbUI55Zegvp7ZhHxDT2b+mat6pezyj7a0wUnjIKBK/pXFQ1/l07pQIWOqsI6nDNoOCtw6DkZAP/jkqenn7v8PcGTuWhRa2eKKiuUuufAYiVuwV9wZs1f0wWaMXCQnt7+xGHqOVUPOJdyigMsGbifxYFYWEO696oFTrRL0opo3ABRb5RrVy8gh/Vg1H0adUa9bK9WjBWAcTqOvwBKxYu8iYMxIMAAAAASUVORK5CYII=',
  },
  {
    meta: {
      widgetName: 'Tag',
      title: '标签',
      desc: '标记和分类的标签',
      props: {
        closable: { type: 'boolean', desc: '标签是否可关闭', defaultValue: true },
        text: { type: 'string', desc: '指定标签的文本值', defaultValue: 'Tag' },
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
      designInfo: {
        ClosableTag: {
          sequence: 1,
          title: '可关闭标签',
          desc: '点击关闭按钮可隐藏标签',
          props: { closable: true },
          theme: {
            TagWrap: {
              name: '标签区域',
              desc: '标签内的样式配置',
              normal: [
                ['color'],
                ['background'],
                ['border'],
                ['borderRadius'],
                ['width'],
                ['height'],
                ['boxShadow'],
                ['opacity'],
                ['font'],
                ['margin'],
                ['padding'],
              ],
              hover: [
                ['color'],
                ['background'],
                ['borderRadius'],
                ['border'],
                ['boxShadow'],
                ['opacity'],
                ['font'],
              ],
              active: [],
              clicked: [],
              disabled: [],
            },
            CloseButton: {
              name: '关闭按钮',
              desc: '隐藏按钮的样式配置',
              normal: [['font'], ['color'], ['margin']],
              hover: [['font'], ['color']],
              active: [],
              clicked: [],
              disabled: [],
            },
          },
        },
        ChooseTag: {
          sequence: 2,
          title: '可选择标签',
          desc: '点击标签可配置选中样式',
          props: { type: 'optional' },
          theme: {
            TagWrap: {
              name: '标签区域',
              desc: '标签内的样式配置',
              normal: [
                ['color'],
                ['background'],
                ['border'],
                ['width'],
                ['height'],
                ['boxShadow'],
                ['borderRadius'],
                ['opacity'],
                ['font'],
                ['margin'],
                ['padding'],
              ],
              hover: [
                ['color'],
                ['borderRadius'],
                ['background'],
                ['border'],
                ['boxShadow'],
                ['opacity'],
                ['font'],
              ],
              active: [
                ['color'],
                ['borderRadius'],
                ['background'],
                ['border'],
                ['boxShadow'],
                ['opacity'],
                ['font'],
              ],
              clicked: [],
              disabled: [],
            },
            CheckedTagWrap: {
              name: '选中标签区域',
              desc: '选中后的标签内的样式配置',
              normal: [
                ['color'],
                ['background'],
                ['border'],
                ['width'],
                ['height'],
                ['boxShadow'],
                ['opacity'],
                ['font'],
                ['margin'],
                ['padding'],
                ['borderRadius'],
              ],
              hover: [
                ['color'],
                ['background'],
                ['border'],
                ['boxShadow'],
                ['opacity'],
                ['font'],
                ['borderRadius'],
              ],
              active: [
                ['color'],
                ['background'],
                ['border'],
                ['boxShadow'],
                ['opacity'],
                ['font'],
                ['borderRadius'],
              ],
              clicked: [],
              disabled: [],
            },
          },
        },
      },
      theme: {
        TagWrap: {
          name: '标签区域',
          desc: '标签内的样式配置',
          normal: [
            ['color'],
            ['background'],
            ['border'],
            ['width'],
            ['height'],
            ['boxShadow'],
            ['opacity'],
            ['font'],
            ['margin'],
            ['padding'],
            ['borderRadius'],
          ],
          hover: [
            ['color'],
            ['borderRadius'],
            ['background'],
            ['border'],
            ['boxShadow'],
            ['opacity'],
            ['font'],
          ],
          active: [],
          clicked: [],
          disabled: [],
        },
      },
      childrenWidget: [],
    },
    target: Tag,
    screenshot:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFYAAAAkCAYAAAATvM09AAAAAXNSR0IArs4c6QAABE1JREFUaAXtmskvLF8Ux7/dZiJinoMQCSG/hRBWLEQsrEhEIiwsrazY+Ave0spfgCCxImKIMUIMIRJjEGIOj5hnr773pyrV0d7T/d6tX/28OkmnTp07dN9Pnzr33JOyQZHT09O4p6enb4pa8Pr6Gk2bJa4RsNlsB8qIYU9Pz/rQ0NBdG6E+Pj4uKMYQ16ayen9A4LuXl9c/9jdPtaB+QMkNcwiZ2pWBBW4Mtob8nECB3YqpPyfkTiuZ0mMtkUDAAisBKqe0wFpgJRGQNK2npHm1aQ8PD3F1daXd/0pJTk6Gkmz/qpvp26WDHRsbw+Li4qdBNDY2wtvb+9P9zdrRpnjUq8wfd319jfv7e4ev6Ovrw9LSEurq6hzsvAkJ+RpnFekeGxAQAH704uvrK26/CkT92lRdOlj1i9y50tu3t7exs7MjwkNkZCTS09OdxuDn52esrq5if38fSiEEiYmJSEhIwPHxsfikpaUJuzu/w50xpgSrnFzQ1dWF+fl5KAUNREVF4ejoCA8PD4iLi0NVVRX8/Py09V5cXKCtrQ27u7sICwuDv78/xsfHkZmZKZ6W0dFRNDQ0WGCnpqYE1Ly8PBQVFcHDwwNKYQOzs7Po7u7GyMgIiouLNbAdHR3CK6urq5GSkiLs/BM6OzuxsrKi9TNSMeUBgSBzc3M1qATCxzs7O1t44+bmpsZofX1dhIv8/HwNKhuZWZSWluLl5UXra6RiylBAgHq5ubkRmQUhRUdHiziqtvPxp2RkZKgm7cpNkh7sSrqnDf5NxZRguSamY5OTk9jb24NSiHdYpo+Pj3Z/fn4u9MDAQM2mV4KCgvS3hummBDsxMYHe3l7hhZWVlQgODga9z263i01tY2NDA6QCPTg4QHx8vGZXFWYW/4WYDiwzgqGhIfBoW15e/o7J2dmZg40pGGVtbe0dWKZg+njsMFDyjek2L9YVeFJzdnhYXl4GPVMvzGuZYjE1Ozk50Zr4B9Hrb29vNZuRiuk8lo824+LCwoLYeOi5fJzn5uZEusWkn4UdVZhBlJWVobW1Fc3NzcJrmccyNhN4Tk6OyGnV/kZdTQeWC6+oqMDg4CDa29vBx5mpE+NnTU0NpqenHcCyf2xsLGprazEzMyPaCJvpFzMFhhUKDxpGivQizO8s5u7uju88iJMXYTkTgr+8vBT5rbOqGA8PW1tbqK+vdzZcms10MVa/UmYC9MaPoLIvwTY1NaGlpUU/VOj8Y5hBxMTEvGuTbTBlKHBl0fTSrKws8Bjc09OD1NRUREREiI1sYGBAbF6FhYWuTPlH+po6FHx2hfTa/v5+EWNZI1AlPDwcJSUlSEpKUk2GXb8EWJUWCzWsdDEE8FChr4CpfYy6/u9DgR4UCzXO8l99H6N0U29eRkGQ8T0WWBlUlTntb+91Spr+75yWTOmxw3/n8qWueth68fjP8/33xWO+1s03kBX3bbXCgvuUyY4MyZJMfwDg9JE83I7P/AAAAABJRU5ErkJggg==',
  },
  {
    meta: {
      widgetName: 'Tag',
      title: '可关闭标签',
      desc: '点击关闭按钮可隐藏标签',
      props: {
        closable: { type: 'boolean', desc: '标签是否可关闭', defaultValue: true },
        text: { type: 'string', desc: '指定标签的文本值', defaultValue: 'Tag' },
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
      theme: {
        TagWrap: {
          name: '标签区域',
          desc: '标签内的样式配置',
          normal: [
            ['color'],
            ['background'],
            ['border'],
            ['borderRadius'],
            ['width'],
            ['height'],
            ['boxShadow'],
            ['opacity'],
            ['font'],
            ['margin'],
            ['padding'],
          ],
          hover: [
            ['color'],
            ['background'],
            ['borderRadius'],
            ['border'],
            ['boxShadow'],
            ['opacity'],
            ['font'],
          ],
          active: [],
          clicked: [],
          disabled: [],
        },
        CloseButton: {
          name: '关闭按钮',
          desc: '隐藏按钮的样式配置',
          normal: [['font'], ['color'], ['margin']],
          hover: [['font'], ['color']],
          active: [],
          clicked: [],
          disabled: [],
        },
      },
      childrenWidget: [],
      aliasName: 'ClosableTag',
    },
    target: Tag,
    screenshot:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFYAAAAkCAYAAAATvM09AAAAAXNSR0IArs4c6QAABQNJREFUaAXtWusvJFkUP93eLWK19ysIMWHJTCKEmWzIrLUma7O7JFYifPDRJ5/44i+Yjz75C7DY2M2GMR7juUI8QuyiCZZ4h9HxaK/G1O+aqlSvNttV07XFTJ2kU6fOPfd03V+de+7v3pSOONnb24uwWq0vOTXr+vo6FDZNpCGg0+k2uR69rq6ulf7+/ms6gHpxcTHFGY3SQmnedyDw1s3N7bH+faZqoN6BkgyzEZjquY5ZMjprXT6MQJZeq6kfRkhOKzBFxmqiAAIasAqAipAasBqwCiGgUFhXZ8Xd2tqio6Mjh8PFxsYSR6od9n9ojk4DdmBggKanpx0ef3V1Nbm7uzvs/9AcdVymXTvjoY+Pj+ns7MwmVEdHB83MzFBFRYWNHTdG46e9J3Faxnp7exN+YvH09GS3nzqI4jHzutOA5QPKuSLbV1ZWaHV1lZWH4OBgSkxMtFuDLy8vyWQy0cbGBnEHHhQdHU1RUVG0s7PDfgkJCcwu5zmc2UdVYLkdCrW0tNDk5CRxBxcUEhJC29vbdH5+ThEREVRSUkJeXl7CeA8ODqihoYHW1tYoICCADAYDDQ4OUnJyMpst/f39VFVVJQvYP17/yfVzoRdfpwv/B+VV9zBZrZf0/bfPbOz/daMqsCMjIwzUjIwMysnJIRcXF24QVhofH6fW1lbq6+uj3NxcYQxNTU0sK0tLSykuLo7Z8RKam5tpbm5O8JOjANBffn9DQ6N/0dPUJBYC+lvzIf38w3PJIVXdIADI9PR0AVQ8PaZ3amoqy8alpSVhQAsLC6xcZGZmCqCiEcwiPz+frq6uBF85CrL1pxdf0d+mZZox/cN+0GFDm1RRNWMBoFgsFgtjFgApNDSU1VG+HdMfkpR0k028HVcskshgKXRP3J/XDQZPKvgukxp+e8NMRT8+517wzQLM+zh6VRVYPCTo2PDwMK2vrxN34G7z3B4eHsK92Wxmuo+Pj2ATK76+vuJb1XVVgR0aGqL29naWhcXFxeTn58eyT6/Xs0VtcXFRAIgHdHNzkyIjIwU7r4BZfKxYLKf0a2sfZT19wkJBL87/RlbWqgYsGEFPTw9ha1tYWHgLk/39fRsbKBhkfn7+FrCgYOJ6bNPRwRus/C2vBujLRzGU+Cia9TIfHDEbFi+pdVa1xQvnCtip2ds8zM7OEjJTLOC1oFigZru7u0ITXhCy/uTkRLDJUUCrjF/4CIwAMcAOYEObVFEtYzG1URenpqbYwoPMxXSemJhgdAukHwc7vIBBFBQUUH19PdXW1rKsBY9FbQbgaWlpjNPy/lKvd/HUf/NaR+OqBiwesKioiLq7u6mxsZEwnUGdUD/LyspodHTUBlj4h4eHU3l5OY2NjbE2gA36BaaAsgLBRuM+iNMOYT5mMKenp/i2ge28AJY9AfCHh4eM39o7FcPmYXl5mSorK+11/99tqtVY8UjBQ5GNd4EKXwBbU1NDdXV14q5Mx4sBgwgLC7vVppZB1VIgZdDI0pSUFMI2uK2tjeLj4ykoKIgtZF1dXWzxys7OlhJSUd97UQocHSGytrOzk9VYnBHwEhgYSHl5eRQTE8ObVL8+KGB5tHBQg5MulABsKsQnYLyP2tcHUwrEQOGgxh7/Ffuord+LxUttEJT4fw1YJVDlYurff9epUPjPMywwRcb2fp7DV3TUvdqHx87H9+bDY3zWjS+QufSt18qCfJSBHTAElsD0HWeM0rz8yDIwAAAAAElFTkSuQmCC',
  },
  {
    meta: {
      widgetName: 'Tag',
      title: '可选择标签',
      desc: '点击标签可配置选中样式',
      props: {
        closable: { type: 'boolean', desc: '标签是否可关闭', defaultValue: true },
        text: { type: 'string', desc: '指定标签的文本值', defaultValue: 'Tag' },
        shape: {
          type: ' basic | round ',
          desc: '标签的圆角, basic为4px圆角,round为圆角标签',
          defaultValue: 'basic',
        },
        type: {
          type: 'customs | primary | basic | presets | optional',
          desc: '标签的主题样式',
          defaultValue: 'optional',
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
      theme: {
        TagWrap: {
          name: '标签区域',
          desc: '标签内的样式配置',
          normal: [
            ['color'],
            ['background'],
            ['border'],
            ['width'],
            ['height'],
            ['boxShadow'],
            ['borderRadius'],
            ['opacity'],
            ['font'],
            ['margin'],
            ['padding'],
          ],
          hover: [
            ['color'],
            ['borderRadius'],
            ['background'],
            ['border'],
            ['boxShadow'],
            ['opacity'],
            ['font'],
          ],
          active: [
            ['color'],
            ['borderRadius'],
            ['background'],
            ['border'],
            ['boxShadow'],
            ['opacity'],
            ['font'],
          ],
          clicked: [],
          disabled: [],
        },
        CheckedTagWrap: {
          name: '选中标签区域',
          desc: '选中后的标签内的样式配置',
          normal: [
            ['color'],
            ['background'],
            ['border'],
            ['width'],
            ['height'],
            ['boxShadow'],
            ['opacity'],
            ['font'],
            ['margin'],
            ['padding'],
            ['borderRadius'],
          ],
          hover: [
            ['color'],
            ['background'],
            ['border'],
            ['boxShadow'],
            ['opacity'],
            ['font'],
            ['borderRadius'],
          ],
          active: [
            ['color'],
            ['background'],
            ['border'],
            ['boxShadow'],
            ['opacity'],
            ['font'],
            ['borderRadius'],
          ],
          clicked: [],
          disabled: [],
        },
      },
      childrenWidget: [],
      aliasName: 'ChooseTag',
    },
    target: Tag,
    screenshot:
      'data:image/png;base64,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',
  },
  {
    meta: {
      widgetName: 'TimeLine',
      title: '时间轴',
      desc: '垂直展示的时间流信息',
      props: {
        children: { type: 'React.Node', desc: '时间轴需要包含的子组件' },
        data: {
          type: 'object[]',
          desc: '时间轴填充的数据',
          meta: [
            { key: 'time', title: '时间节点信息', type: 'string' },
            { key: 'description', title: '时间节点详细描述', type: 'string' },
          ],
        },
        defaultData: {
          type: 'object[]',
          desc: '时间轴填充的默认显示数据',
          meta: [
            { key: 'time', title: '时间节点信息', type: 'string' },
            { key: 'description', title: '时间节点详细描述', type: 'string' },
          ],
        },
        reverse: {
          type: 'boolean',
          desc: '控制节点排序，false 正序,true 倒序',
          defaultValue: false,
        },
        pending: { type: 'boolean', desc: '最后一个是否是幽灵节点', defaultValue: false },
        pendingDot: { type: 'icon', desc: '当最后一个是幽灵节点时,指定其图标资源' },
        mode: {
          type: 'TimeLineMode',
          desc: '时间轴 描述信息的显示位置 ,可选择右侧或者交错显示.',
          defaultValue: 'right',
        },
      },
      type: { TimeLineMode: ['right', 'alternate'] },
      childrenWidget: [],
      category: ['数据展示'],
      designInfo: {
        PendingDotTimeLine: {
          sequence: 1,
          title: '幽灵节点时间轴',
          desc: '幽灵节点时间轴配置',
          props: { pending: true, pendingDot: 'lugia-icon-financial_abort' },
          theme: {
            TimeLineContainer: {
              name: '时间轴最外层容器',
              desc: '时间轴最外层容器',
              normal: [['width'], ['height'], ['margin'], ['padding'], ['background']],
            },
            TimeLine: {
              name: '单个时间节点配置',
              theme: {
                TimeLineIcon: {
                  normal: {
                    name: '步骤条内容图标',
                    desc: '步骤间连接线的配置',
                    normal: [['font'], ['fontSize'], ['color']],
                  },
                },
                TimeLineItemContainer: {
                  name: '时间点外层容器',
                  desc: '时间点外层容器配置',
                  normal: [['width'], ['height'], ['margin'], ['padding']],
                },
                TimeLineItemLine: {
                  name: '步骤间连接线',
                  desc: '步骤间连接线的配置',
                  normal: [['width'], ['height'], ['background']],
                },
              },
            },
          },
        },
      },
      theme: {
        TimeLineContainer: {
          name: '时间轴最外层容器',
          desc: '时间轴最外层容器',
          normal: [['width'], ['height'], ['margin'], ['padding'], ['background']],
        },
        TimeLine: {
          name: '单个时间节点配置',
          theme: {
            TimeLineDot: {
              name: '时间点',
              desc: '时间点配置',
              normal: [['width'], ['height'], ['background'], ['boxShadow'], ['border']],
            },
            TimeLineItemContainer: {
              name: '时间点外层容器',
              desc: '时间点外层容器配置',
              normal: [['width'], ['height'], ['margin'], ['padding']],
            },
            TimeLineExplainDot: {
              name: '隐藏的解释时间点',
              desc: '隐藏的解释时间点配置',
              normal: [['width'], ['height'], ['background'], ['boxShadow'], ['border']],
            },
            TimeLineItemTip: {
              name: '隐藏信息弹框',
              theme: {
                Container: {
                  name: '隐藏的解释时间点显示容器',
                  desc: '隐藏的解释时间点显示容器配置',
                  normal: [['width'], ['height'], ['background'], ['boxShadow'], ['border']],
                },
                TooltipTitle: {
                  name: '隐藏的解释时间点标题',
                  desc: '隐藏的解释时间点标题配置',
                  normal: [
                    ['fontSize'],
                    ['font'],
                    ['color'],
                    ['width'],
                    ['height'],
                    ['padding'],
                    ['margin'],
                  ],
                },
                TooltipDescription: {
                  name: '隐藏的解释时间点描述',
                  desc: '隐藏的解释时间点描述配置',
                  normal: [
                    ['fontSize'],
                    ['font'],
                    ['color'],
                    ['width'],
                    ['height'],
                    ['padding'],
                    ['margin'],
                  ],
                },
              },
            },
            TimeLineItemLine: {
              name: '步骤间连接线',
              desc: '步骤间连接线的配置',
              normal: [['width'], ['height'], ['background']],
            },
            TimeLineIcon: {
              normal: {
                name: '步骤条内容图标',
                desc: '步骤间连接线的配置',
                normal: [['font'], ['fontSize'], ['color']],
              },
            },
          },
        },
      },
    },
    target: TimeLine,
    screenshot:
      'data:image/png;base64,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',
  },
  {
    meta: {
      widgetName: 'TimeLine',
      title: '幽灵节点时间轴',
      desc: '幽灵节点时间轴配置',
      props: {
        children: { type: 'React.Node', desc: '时间轴需要包含的子组件' },
        data: {
          type: 'object[]',
          desc: '时间轴填充的数据',
          meta: [
            { key: 'time', title: '时间节点信息', type: 'string' },
            { key: 'description', title: '时间节点详细描述', type: 'string' },
          ],
        },
        defaultData: {
          type: 'object[]',
          desc: '时间轴填充的默认显示数据',
          meta: [
            { key: 'time', title: '时间节点信息', type: 'string' },
            { key: 'description', title: '时间节点详细描述', type: 'string' },
          ],
        },
        reverse: {
          type: 'boolean',
          desc: '控制节点排序，false 正序,true 倒序',
          defaultValue: false,
        },
        pending: { type: 'boolean', desc: '最后一个是否是幽灵节点', defaultValue: true },
        pendingDot: {
          type: 'icon',
          desc: '当最后一个是幽灵节点时,指定其图标资源',
          defaultValue: 'lugia-icon-financial_abort',
        },
        mode: {
          type: 'TimeLineMode',
          desc: '时间轴 描述信息的显示位置 ,可选择右侧或者交错显示.',
          defaultValue: 'right',
        },
      },
      type: { TimeLineMode: ['right', 'alternate'] },
      childrenWidget: [],
      category: ['数据展示'],
      theme: {
        TimeLineContainer: {
          name: '时间轴最外层容器',
          desc: '时间轴最外层容器',
          normal: [['width'], ['height'], ['margin'], ['padding'], ['background']],
        },
        TimeLine: {
          name: '单个时间节点配置',
          theme: {
            TimeLineIcon: {
              normal: {
                name: '步骤条内容图标',
                desc: '步骤间连接线的配置',
                normal: [['font'], ['fontSize'], ['color']],
              },
            },
            TimeLineItemContainer: {
              name: '时间点外层容器',
              desc: '时间点外层容器配置',
              normal: [['width'], ['height'], ['margin'], ['padding']],
            },
            TimeLineItemLine: {
              name: '步骤间连接线',
              desc: '步骤间连接线的配置',
              normal: [['width'], ['height'], ['background']],
            },
          },
        },
      },
      aliasName: 'PendingDotTimeLine',
    },
    target: TimeLine,
    screenshot:
      'data:image/png;base64,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',
  },
  {
    meta: {
      widgetName: 'TimePicker',
      title: '时间选择器',
      desc: '用于时间选择,',
      props: {
        defaultValue: { type: 'string', desc: '时间默认显示值' },
        value: { type: 'string', desc: '时间显示值' },
        format: { type: 'string', desc: '用于指定输入框时间显示的格式', defaultValue: 'HH:mm:ss' },
        placeholder: { type: 'string', desc: 'input输入提示信息' },
        disabled: { type: 'boolean', desc: '禁用状态,是否不可用', defaultValue: false },
        readOnly: { type: 'boolean', desc: '只读input', defaultValue: false },
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
      childrenWidget: [],
    },
    target: TimePicker,
    screenshot:
      'data:image/png;base64,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',
  },
  {
    meta: {
      widgetName: 'Transfer',
      title: '穿梭框',
      desc: '穿梭框。',
      props: {
        data: { type: 'Object[]', desc: '左右两个面板数据源' },
        showSearch: { type: 'boolean', desc: '是否展示搜索框' },
        filterOption: {
          type: 'Function',
          desc: '搜索条件函数，接收 inputValue 和 option 两个参数，可以自定义筛选条件',
        },
        value: { type: 'string[]', desc: '显示在右侧面板数据集合' },
        defaultValue: { type: 'string[]', desc: '显示在右侧面板初始数据集合' },
        sourceSelectedKeys: { type: 'string[]', desc: '左侧面板选中值的集合' },
        targetSelectedKeys: { type: 'string[]', desc: '右侧面板选中值的集合' },
        defaultSourceSelectedKeys: { type: 'string[]', desc: '左侧面板初始选中值的集合' },
        defaultTargetSelectedKeys: { type: 'string[]', desc: '右侧面板初始选中值的集合' },
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
      designInfo: {
        TransferTree: {
          sequence: 1,
          title: '树形穿梭框',
          desc: '树形穿梭框，展示树形数据',
          props: { type: 'tree' },
          theme: {
            TransferWrap: {
              name: '穿梭框整体样式',
              desc: '为穿梭框配置整体样式',
              normal: [
                ['width'],
                ['height'],
                ['margin'],
                ['padding'],
                ['background'],
                ['border'],
                ['borderRadius'],
              ],
            },
            TransferPanel: {
              name: '穿梭框面板样式',
              desc: '为穿梭框配置左右面板样式',
              normal: [
                ['width'],
                ['height'],
                ['margin'],
                ['padding'],
                ['background'],
                ['border'],
                ['borderRadius'],
                ['boxShadow'],
                ['opacity'],
              ],
            },
            TransferHeaderWrap: {
              name: '穿梭框面板头部',
              desc: '为穿梭框配置左右面板头部样式',
              normal: [['background'], ['border']],
            },
            TransferPanelHeaderCheckbox: {
              name: '穿梭框面板头部Checkbox',
              desc: '为穿梭框配置左右面板头部Checkbox样式',
              theme: {
                CheckboxWrap: {
                  name: 'Checkbox整体配置',
                  desc: 'Checkbox整体配置',
                  normal: [['opacity'], ['margin'], ['padding'], ['width'], ['height']],
                  hover: [['opacity']],
                  disabled: [['opacity']],
                },
                CheckboxText: {
                  name: 'Checkbox文字配置',
                  desc: 'Checkbox文字配置',
                  normal: [['color'], ['font']],
                  hover: [['color'], ['font']],
                  disabled: [['color'], ['font']],
                },
                CheckboxEdgeChecked: {
                  name: 'Checkbox选中后边框配置',
                  desc: 'Checkbox选中后边框配置样式',
                  normal: [['background'], ['borderRadius'], ['border']],
                  hover: [['background'], ['borderRadius'], ['border']],
                  disabled: [['background'], ['borderRadius'], ['border']],
                },
                CheckboxEdgeUnChecked: {
                  name: 'Checkbox未选中边框配置',
                  desc: 'Checkbox未选中边框配置样式',
                  normal: [['background'], ['borderRadius'], ['border']],
                  hover: [['background'], ['borderRadius'], ['border']],
                  disabled: [['background'], ['borderRadius'], ['border']],
                },
                CheckboxEdgeIndeterminate: {
                  name: 'Checkbox半选边框配置',
                  desc: 'Checkbox半选状态边框配置样式',
                  normal: [['background'], ['borderRadius'], ['border']],
                  hover: [['background'], ['borderRadius'], ['border']],
                  disabled: [['background'], ['borderRadius'], ['border']],
                },
                CheckboxInnerChecked: {
                  name: 'Checkbox选中样式配置',
                  desc: 'Checkbox选中样式配置',
                  normal: [['color']],
                  hover: [['color']],
                  disabled: [['color']],
                },
                CheckboxInnerIndeterminate: {
                  name: 'Checkbox半选样式配置',
                  desc: 'Checkbox半选状态样式配置',
                  normal: [['color']],
                  hover: [['color']],
                  disabled: [['color']],
                },
              },
            },
            TransferHeaderText: {
              name: '穿梭框面板头部文字样式',
              desc: '为穿梭框配置左右面板头部文字样式',
              normal: [['padding'], ['color'], ['font']],
            },
            TransferCancelBox: {
              name: '穿梭框面板取消项盒子样式',
              desc: '为穿梭框配置右面板取消项盒子样式',
              normal: [['width'], ['height'], ['margin'], ['padding'], ['background']],
            },
            TransferCancelCheckbox: {
              name: '穿梭框面板取消项盒子样式',
              desc: '为穿梭框配置右面板取消项盒子样式',
              theme: {
                CheckboxWrap: {
                  name: 'Checkbox整体配置',
                  desc: 'Checkbox整体配置',
                  normal: [['opacity'], ['margin'], ['padding'], ['width'], ['height']],
                  hover: [['opacity']],
                  disabled: [['opacity']],
                },
                CheckboxText: {
                  name: 'Checkbox文字配置',
                  desc: 'Checkbox文字配置',
                  normal: [['color'], ['font']],
                  hover: [['color'], ['font']],
                  disabled: [['color'], ['font']],
                },
                CheckboxEdgeCancel: {
                  name: 'Checkbox取消项边框配置',
                  desc: 'Checkbox取消状态边框配置样式',
                  normal: [['background'], ['borderRadius'], ['border']],
                },
                CheckboxInnerCancel: {
                  name: 'Checkbox取消状态样式配置',
                  desc: 'Checkbox取消状态样式配置',
                  normal: [['color']],
                },
              },
            },
            TransferPanelTree: {
              name: '穿梭框面板Tree样式',
              desc: '为穿梭框配置左右面板Tree样式',
              theme: {
                TreeWrap: {
                  name: '树形控件外盒',
                  desc: '配置树形组件的外盒样式',
                  normal: [
                    ['width'],
                    ['height'],
                    ['boxShadow'],
                    ['background'],
                    ['opacity'],
                    ['border'],
                    ['borderRadius'],
                    ['margin'],
                    ['padding'],
                  ],
                  hover: [['boxShadow'], ['background'], ['opacity'], ['border'], ['borderRadius']],
                  clicked: [],
                  disabled: [],
                },
                TreeItem: {
                  theme: {
                    TreeItemWrap: {
                      name: '项的外盒',
                      desc: '配置每一项的外盒',
                      normal: [
                        ['background'],
                        ['border'],
                        ['borderRadius'],
                        ['opacity'],
                        ['color'],
                        ['padding'],
                      ],
                      hover: [['background'], ['border'], ['borderRadius'], ['opacity'], ['color']],
                      active: [
                        ['background'],
                        ['border'],
                        ['borderRadius'],
                        ['opacity'],
                        ['color'],
                      ],
                      disabled: [],
                    },
                    SelectedTreeItemWrap: {
                      name: '选中项的外盒',
                      desc: '配置选中项的外盒',
                      normal: [
                        ['background'],
                        ['border'],
                        ['borderRadius'],
                        ['opacity'],
                        ['color'],
                        ['padding'],
                      ],
                      hover: [['background'], ['border'], ['borderRadius'], ['opacity'], ['color']],
                      active: [
                        ['background'],
                        ['border'],
                        ['borderRadius'],
                        ['opacity'],
                        ['color'],
                      ],
                      disabled: [],
                    },
                    Text: {
                      name: '项的文本',
                      desc: '配置每一项文本内容的样式',
                      normal: [
                        ['color'],
                        ['font'],
                        ['background'],
                        ['padding'],
                        ['border'],
                        ['borderRadius'],
                      ],
                      hover: [['color'], ['font'], ['background'], ['border'], ['borderRadius']],
                      active: [['color'], ['font'], ['background'], ['border'], ['borderRadius']],
                      disabled: [['color'], ['font'], ['background'], ['border'], ['borderRadius']],
                    },
                    SelectedText: {
                      name: '选中项的文本',
                      desc: '配置选中项文本内容的样式',
                      normal: [
                        ['color'],
                        ['font'],
                        ['background'],
                        ['padding'],
                        ['border'],
                        ['borderRadius'],
                      ],
                      hover: [['color'], ['font'], ['background'], ['border'], ['borderRadius']],
                      active: [['color'], ['font'], ['background'], ['border'], ['borderRadius']],
                      disabled: [['color'], ['font'], ['background'], ['border'], ['borderRadius']],
                    },
                    Switch: {
                      name: '控制器配置',
                      desc: '配置控制树节点展开或隐藏的控制器的样式',
                      normal: [['color'], ['font']],
                      hover: [['color'], ['font']],
                      active: [['color'], ['font']],
                      disabled: [['color'], ['font']],
                    },
                    Checkbox: {
                      theme: {
                        CheckboxWrap: {
                          name: 'Checkbox整体配置',
                          desc: 'Checkbox整体配置',
                          normal: [['opacity'], ['margin'], ['padding'], ['width'], ['height']],
                          hover: [['opacity']],
                          disabled: [['opacity']],
                        },
                        CheckboxText: {
                          name: 'Checkbox文字配置',
                          desc: 'Checkbox文字配置',
                          normal: [['color'], ['font']],
                          hover: [['color'], ['font']],
                          disabled: [['color'], ['font']],
                        },
                        CheckboxEdgeChecked: {
                          name: 'Checkbox选中后边框配置',
                          desc: 'Checkbox选中后边框配置样式',
                          normal: [['background'], ['borderRadius'], ['border']],
                          hover: [['background'], ['borderRadius'], ['border']],
                          disabled: [['background'], ['borderRadius'], ['border']],
                        },
                        CheckboxEdgeUnChecked: {
                          name: 'Checkbox未选中边框配置',
                          desc: 'Checkbox未选中边框配置样式',
                          normal: [['background'], ['borderRadius'], ['border']],
                          hover: [['background'], ['borderRadius'], ['border']],
                          disabled: [['background'], ['borderRadius'], ['border']],
                        },
                        CheckboxInnerChecked: {
                          name: 'Checkbox选中样式配置',
                          desc: 'Checkbox选中样式配置',
                          normal: [['color']],
                          hover: [['color']],
                          disabled: [['color']],
                        },
                      },
                    },
                  },
                },
              },
            },
            TransferButton: {
              name: '穿梭框按钮样式',
              desc: '为穿梭框配置按钮样式',
              theme: {
                ButtonWrap: {
                  name: '按钮整体样式',
                  desc: '为按钮配置整体样式',
                  normal: [
                    ['background'],
                    ['border'],
                    ['height'],
                    ['width'],
                    ['padding'],
                    ['margin'],
                    ['borderRadius'],
                  ],
                  hover: [['background'], ['border']],
                  active: [['background'], ['border']],
                  disabled: [['background'], ['border']],
                  focus: [['background'], ['border']],
                },
                ButtonText: {
                  name: '按钮文字样式',
                  desc: '为按钮文字配置样式',
                  normal: [['color'], ['font']],
                  hover: [['color']],
                  active: [['color']],
                  disabled: [['color']],
                  focus: [['color']],
                },
                ButtonIcon: {
                  name: '按钮图标样式',
                  desc: '为按钮图标配置样式',
                  normal: [['color'], ['font']],
                  hover: [['color']],
                  active: [['color']],
                  disabled: [['color']],
                  focus: [['color']],
                },
              },
            },
          },
        },
      },
      theme: {
        TransferWrap: {
          name: '穿梭框整体样式',
          desc: '为穿梭框配置整体样式',
          normal: [
            ['width'],
            ['height'],
            ['margin'],
            ['padding'],
            ['background'],
            ['border'],
            ['borderRadius'],
          ],
        },
        TransferPanel: {
          name: '穿梭框面板样式',
          desc: '为穿梭框配置左右面板样式',
          normal: [
            ['width'],
            ['height'],
            ['margin'],
            ['padding'],
            ['background'],
            ['border'],
            ['borderRadius'],
            ['boxShadow'],
            ['opacity'],
          ],
        },
        TransferHeaderWrap: {
          name: '穿梭框面板头部',
          desc: '为穿梭框配置左右面板头部样式',
          normal: [['background'], ['border']],
        },
        TransferPanelHeaderCheckbox: {
          name: '穿梭框面板头部Checkbox',
          desc: '为穿梭框配置左右面板头部Checkbox样式',
          theme: {
            CheckboxWrap: {
              name: 'Checkbox整体配置',
              desc: 'Checkbox整体配置',
              normal: [['opacity'], ['margin'], ['padding'], ['width'], ['height']],
              hover: [['opacity']],
              disabled: [['opacity']],
            },
            CheckboxText: {
              name: 'Checkbox文字配置',
              desc: 'Checkbox文字配置',
              normal: [['color'], ['font']],
              hover: [['color'], ['font']],
              disabled: [['color'], ['font']],
            },
            CheckboxEdgeChecked: {
              name: 'Checkbox选中后边框配置',
              desc: 'Checkbox选中后边框配置样式',
              normal: [['background'], ['borderRadius'], ['border']],
              hover: [['background'], ['borderRadius'], ['border']],
              disabled: [['background'], ['borderRadius'], ['border']],
            },
            CheckboxEdgeUnChecked: {
              name: 'Checkbox未选中边框配置',
              desc: 'Checkbox未选中边框配置样式',
              normal: [['background'], ['borderRadius'], ['border']],
              hover: [['background'], ['borderRadius'], ['border']],
              disabled: [['background'], ['borderRadius'], ['border']],
            },
            CheckboxEdgeIndeterminate: {
              name: 'Checkbox半选边框配置',
              desc: 'Checkbox半选状态边框配置样式',
              normal: [['background'], ['borderRadius'], ['border']],
              hover: [['background'], ['borderRadius'], ['border']],
              disabled: [['background'], ['borderRadius'], ['border']],
            },
            CheckboxInnerChecked: {
              name: 'Checkbox选中样式配置',
              desc: 'Checkbox选中样式配置',
              normal: [['color']],
              hover: [['color']],
              disabled: [['color']],
            },
            CheckboxInnerIndeterminate: {
              name: 'Checkbox半选样式配置',
              desc: 'Checkbox半选状态样式配置',
              normal: [['color']],
              hover: [['color']],
              disabled: [['color']],
            },
          },
        },
        TransferHeaderText: {
          name: '穿梭框面板头部文字样式',
          desc: '为穿梭框配置左右面板头部文字样式',
          normal: [['padding'], ['color'], ['font']],
        },
        TransferSearchInput: {
          name: '穿梭框面板搜索框样式',
          desc: '为穿梭框配置左右面板搜索框样式',
          theme: {
            Container: {
              name: '输入框外部容器',
              desc: '输入框外部容器',
              normal: [['width'], ['height'], ['margin'], ['padding']],
            },
            Input: {
              name: '输入框主体',
              desc: '输入框主体结构',
              normal: [
                ['width'],
                ['height'],
                ['fontSize'],
                ['font'],
                ['color'],
                ['background'],
                ['border'],
                ['borderRadius'],
                ['cursor'],
                ['opacity'],
              ],
              hover: [
                ['border'],
                ['borderRadius'],
                ['cursor'],
                ['background'],
                ['opacity'],
                ['boxShadow'],
              ],
              active: [['boxShadow'], ['border'], ['borderRadius'], ['cursor'], ['background']],
              disabled: [
                ['fontSize'],
                ['font'],
                ['color'],
                ['background'],
                ['border'],
                ['borderRadius'],
                ['cursor'],
                ['padding'],
                ['opacity'],
              ],
            },
            InputSuffix: {
              name: '后缀图标',
              desc: '输入框后缀自定义图标',
              normal: [['color'], ['fontSize'], ['font']],
              hover: [],
              clicked: [],
              disabled: [],
            },
            InputClearButton: {
              name: '输入框清除图标',
              desc: '输入框后缀清除图标',
              normal: [['color'], ['fontSize']],
              hover: [],
              clicked: [],
              disabled: [],
            },
          },
        },
        TransferCancelBox: {
          name: '穿梭框面板取消项盒子样式',
          desc: '为穿梭框配置右面板取消项盒子样式',
          normal: [['width'], ['height'], ['margin'], ['padding'], ['background']],
        },
        TransferCancelCheckbox: {
          name: '穿梭框面板取消项盒子样式',
          desc: '为穿梭框配置右面板取消项盒子样式',
          theme: {
            CheckboxWrap: {
              name: 'Checkbox整体配置',
              desc: 'Checkbox整体配置',
              normal: [['opacity'], ['margin'], ['padding'], ['width'], ['height']],
              hover: [['opacity']],
              disabled: [['opacity']],
            },
            CheckboxText: {
              name: 'Checkbox文字配置',
              desc: 'Checkbox文字配置',
              normal: [['color'], ['font']],
              hover: [['color'], ['font']],
              disabled: [['color'], ['font']],
            },
            CheckboxEdgeCancel: {
              name: 'Checkbox取消项边框配置',
              desc: 'Checkbox取消状态边框配置样式',
              normal: [['background'], ['borderRadius'], ['border']],
            },
            CheckboxInnerCancel: {
              name: 'Checkbox取消状态样式配置',
              desc: 'Checkbox取消状态样式配置',
              normal: [['color']],
            },
          },
        },
        TransferPanelMenu: {
          name: '穿梭框面板菜单样式',
          desc: '为穿梭框配置左右面板菜单样式',
          theme: {},
        },
        TransferButton: {
          name: '穿梭框按钮样式',
          desc: '为穿梭框配置按钮样式',
          theme: {
            ButtonWrap: {
              name: '按钮整体样式',
              desc: '为按钮配置整体样式',
              normal: [
                ['background'],
                ['border'],
                ['height'],
                ['width'],
                ['padding'],
                ['margin'],
                ['borderRadius'],
              ],
              hover: [['background'], ['border']],
              active: [['background'], ['border']],
              disabled: [['background'], ['border']],
              focus: [['background'], ['border']],
            },
            ButtonText: {
              name: '按钮文字样式',
              desc: '为按钮文字配置样式',
              normal: [['color'], ['font']],
              hover: [['color']],
              active: [['color']],
              disabled: [['color']],
              focus: [['color']],
            },
            ButtonIcon: {
              name: '按钮图标样式',
              desc: '为按钮图标配置样式',
              normal: [['color'], ['font']],
              hover: [['color']],
              active: [['color']],
              disabled: [['color']],
              focus: [['color']],
            },
          },
        },
      },
      childrenWidget: [],
    },
    target: Transfer,
    screenshot:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGwAAABACAYAAAD/CJKAAAAAAXNSR0IArs4c6QAAA/BJREFUeAHtnV1rE0EUhmcmGy8CxSqIoBeiSAuKUKggeOEXvW1SQ1PS2tjf0F/ib6iptTQltultwY8LQbBQEIQWUbxQEMEPhFx0N7POiVnTi7Iza7LxzGEWSrd7zp688z57sml2YDhT29LS0lnf9x+o3YlWq3UCjv3vLZPJfFcatrPZ7OLCwsKnQeixwQfeEflmfHx8aGRkxMvlcoPwRvsazWaT7e/vBzs7O78UtCtpQ7PFBw86C2CNjY15WhcHmAAXTkfTkIIG3T+T5svb4oNQJkxAZ6VpRi+1O9omeqlheK4VPgi4Z2F5GzzKWNA2iPuqLT5Ah7nNIgccMItggVQHzAGzzAHL5LoOswyY8cf5vb09o6GNjo6285LmGxVHkJR0XEnzdUN0HaZzCFncAUMGRCfHAdM5hCzugCEDopPjgOkcQhYnBWxydvby3VLlJjKP+yqHFDBPivM8KzbyM3M3+uoSomKkgIWMHQguhj2RXS+U568j8rlvUkgBA1eklIxxdkqwTL1Qrlzrm1NICpEDFkHjnJ1W3VbPlytXkXjdFxkkgf2FxtgZEfLN4tzcub64haAIWWBdb8Nc4Its92+798gCE0KwMGTfZMiLjdryO7sxddWTBBbBaslwurH28Gl3uPbvkQMGsJjqLIqw4HIzfh4WPecyvUaT5pvWjcvjjB2TMvzpt2Rpq1ZNpbOSjitpftz4IGYMTFcIQ1z9C/ae82Bqq7b8DIOeNDSQArZZe/RWmQQ/ZDdy9zCypDoDc8AsI+yAOWCWOWCZXNdhDphlDlgm13WYA4bHgany/K1C6d4lPIp6V0K2wyZLlTuCexvqq8ULvduEp4LxNx2Pa1tGqmdLk+28pPlGxQ2T8jP3b3uC14TgxwPJDgxPM0pLOlc+ab5OBLkOA1gZwdfVvI6T7fkdOgcsi5MCFsFS8zlIwoJry/gtEfuFmC/NXxQ8rHPOhyl2VuQ/mQ7zstJX89ua0cCo/iYDrL6y8lHysKAmk35uP3UmSowMMODTWK2+lqEsqsk3X6hCIwUMoG2uVl9J1iqqeR1fKUIjB+wPtOWXgfSnVbf9gHkecIzKRhIYwGmsrbwIfTkVCPmBCiwYB5mP9UdBeVKrPj/quM3HyHaYzVDitDtgce4gjDlgCKHESXLA4txBGHPAEEKJk2T8KTF6zhVX7HAsaf7hczHvJ50rnzRfN3bXYTqHkMUdMGRAdHIcMJ1DyOIOGDIgOjkOmM4hZHEBa5zAshlYN9DWWYclVYm2+AAdtg1rnKTqRg/FO9q2eyhheqoVPghYPQgWpNnd3Q0wdRpoAU2dxXIWTV3/1zxbfFDP99xyVBFkG5aj+g1B5HJrMuaaRQAAAABJRU5ErkJggg==',
  },
  {
    meta: {
      widgetName: 'Transfer',
      title: '树形穿梭框',
      desc: '树形穿梭框，展示树形数据',
      props: {
        data: { type: 'Object[]', desc: '左右两个面板数据源' },
        showSearch: { type: 'boolean', desc: '是否展示搜索框' },
        filterOption: {
          type: 'Function',
          desc: '搜索条件函数，接收 inputValue 和 option 两个参数，可以自定义筛选条件',
        },
        value: { type: 'string[]', desc: '显示在右侧面板数据集合' },
        defaultValue: { type: 'string[]', desc: '显示在右侧面板初始数据集合' },
        sourceSelectedKeys: { type: 'string[]', desc: '左侧面板选中值的集合' },
        targetSelectedKeys: { type: 'string[]', desc: '右侧面板选中值的集合' },
        defaultSourceSelectedKeys: { type: 'string[]', desc: '左侧面板初始选中值的集合' },
        defaultTargetSelectedKeys: { type: 'string[]', desc: '右侧面板初始选中值的集合' },
        type: {
          type: 'TransferType',
          desc: '指定 Transfer 类型，可设置为tree 或不设',
          defaultValue: 'tree',
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
      theme: {
        TransferWrap: {
          name: '穿梭框整体样式',
          desc: '为穿梭框配置整体样式',
          normal: [
            ['width'],
            ['height'],
            ['margin'],
            ['padding'],
            ['background'],
            ['border'],
            ['borderRadius'],
          ],
        },
        TransferPanel: {
          name: '穿梭框面板样式',
          desc: '为穿梭框配置左右面板样式',
          normal: [
            ['width'],
            ['height'],
            ['margin'],
            ['padding'],
            ['background'],
            ['border'],
            ['borderRadius'],
            ['boxShadow'],
            ['opacity'],
          ],
        },
        TransferHeaderWrap: {
          name: '穿梭框面板头部',
          desc: '为穿梭框配置左右面板头部样式',
          normal: [['background'], ['border']],
        },
        TransferPanelHeaderCheckbox: {
          name: '穿梭框面板头部Checkbox',
          desc: '为穿梭框配置左右面板头部Checkbox样式',
          theme: {
            CheckboxWrap: {
              name: 'Checkbox整体配置',
              desc: 'Checkbox整体配置',
              normal: [['opacity'], ['margin'], ['padding'], ['width'], ['height']],
              hover: [['opacity']],
              disabled: [['opacity']],
            },
            CheckboxText: {
              name: 'Checkbox文字配置',
              desc: 'Checkbox文字配置',
              normal: [['color'], ['font']],
              hover: [['color'], ['font']],
              disabled: [['color'], ['font']],
            },
            CheckboxEdgeChecked: {
              name: 'Checkbox选中后边框配置',
              desc: 'Checkbox选中后边框配置样式',
              normal: [['background'], ['borderRadius'], ['border']],
              hover: [['background'], ['borderRadius'], ['border']],
              disabled: [['background'], ['borderRadius'], ['border']],
            },
            CheckboxEdgeUnChecked: {
              name: 'Checkbox未选中边框配置',
              desc: 'Checkbox未选中边框配置样式',
              normal: [['background'], ['borderRadius'], ['border']],
              hover: [['background'], ['borderRadius'], ['border']],
              disabled: [['background'], ['borderRadius'], ['border']],
            },
            CheckboxEdgeIndeterminate: {
              name: 'Checkbox半选边框配置',
              desc: 'Checkbox半选状态边框配置样式',
              normal: [['background'], ['borderRadius'], ['border']],
              hover: [['background'], ['borderRadius'], ['border']],
              disabled: [['background'], ['borderRadius'], ['border']],
            },
            CheckboxInnerChecked: {
              name: 'Checkbox选中样式配置',
              desc: 'Checkbox选中样式配置',
              normal: [['color']],
              hover: [['color']],
              disabled: [['color']],
            },
            CheckboxInnerIndeterminate: {
              name: 'Checkbox半选样式配置',
              desc: 'Checkbox半选状态样式配置',
              normal: [['color']],
              hover: [['color']],
              disabled: [['color']],
            },
          },
        },
        TransferHeaderText: {
          name: '穿梭框面板头部文字样式',
          desc: '为穿梭框配置左右面板头部文字样式',
          normal: [['padding'], ['color'], ['font']],
        },
        TransferCancelBox: {
          name: '穿梭框面板取消项盒子样式',
          desc: '为穿梭框配置右面板取消项盒子样式',
          normal: [['width'], ['height'], ['margin'], ['padding'], ['background']],
        },
        TransferCancelCheckbox: {
          name: '穿梭框面板取消项盒子样式',
          desc: '为穿梭框配置右面板取消项盒子样式',
          theme: {
            CheckboxWrap: {
              name: 'Checkbox整体配置',
              desc: 'Checkbox整体配置',
              normal: [['opacity'], ['margin'], ['padding'], ['width'], ['height']],
              hover: [['opacity']],
              disabled: [['opacity']],
            },
            CheckboxText: {
              name: 'Checkbox文字配置',
              desc: 'Checkbox文字配置',
              normal: [['color'], ['font']],
              hover: [['color'], ['font']],
              disabled: [['color'], ['font']],
            },
            CheckboxEdgeCancel: {
              name: 'Checkbox取消项边框配置',
              desc: 'Checkbox取消状态边框配置样式',
              normal: [['background'], ['borderRadius'], ['border']],
            },
            CheckboxInnerCancel: {
              name: 'Checkbox取消状态样式配置',
              desc: 'Checkbox取消状态样式配置',
              normal: [['color']],
            },
          },
        },
        TransferPanelTree: {
          name: '穿梭框面板Tree样式',
          desc: '为穿梭框配置左右面板Tree样式',
          theme: {
            TreeWrap: {
              name: '树形控件外盒',
              desc: '配置树形组件的外盒样式',
              normal: [
                ['width'],
                ['height'],
                ['boxShadow'],
                ['background'],
                ['opacity'],
                ['border'],
                ['borderRadius'],
                ['margin'],
                ['padding'],
              ],
              hover: [['boxShadow'], ['background'], ['opacity'], ['border'], ['borderRadius']],
              clicked: [],
              disabled: [],
            },
            TreeItem: {
              theme: {
                TreeItemWrap: {
                  name: '项的外盒',
                  desc: '配置每一项的外盒',
                  normal: [
                    ['background'],
                    ['border'],
                    ['borderRadius'],
                    ['opacity'],
                    ['color'],
                    ['padding'],
                  ],
                  hover: [['background'], ['border'], ['borderRadius'], ['opacity'], ['color']],
                  active: [['background'], ['border'], ['borderRadius'], ['opacity'], ['color']],
                  disabled: [],
                },
                SelectedTreeItemWrap: {
                  name: '选中项的外盒',
                  desc: '配置选中项的外盒',
                  normal: [
                    ['background'],
                    ['border'],
                    ['borderRadius'],
                    ['opacity'],
                    ['color'],
                    ['padding'],
                  ],
                  hover: [['background'], ['border'], ['borderRadius'], ['opacity'], ['color']],
                  active: [['background'], ['border'], ['borderRadius'], ['opacity'], ['color']],
                  disabled: [],
                },
                Text: {
                  name: '项的文本',
                  desc: '配置每一项文本内容的样式',
                  normal: [
                    ['color'],
                    ['font'],
                    ['background'],
                    ['padding'],
                    ['border'],
                    ['borderRadius'],
                  ],
                  hover: [['color'], ['font'], ['background'], ['border'], ['borderRadius']],
                  active: [['color'], ['font'], ['background'], ['border'], ['borderRadius']],
                  disabled: [['color'], ['font'], ['background'], ['border'], ['borderRadius']],
                },
                SelectedText: {
                  name: '选中项的文本',
                  desc: '配置选中项文本内容的样式',
                  normal: [
                    ['color'],
                    ['font'],
                    ['background'],
                    ['padding'],
                    ['border'],
                    ['borderRadius'],
                  ],
                  hover: [['color'], ['font'], ['background'], ['border'], ['borderRadius']],
                  active: [['color'], ['font'], ['background'], ['border'], ['borderRadius']],
                  disabled: [['color'], ['font'], ['background'], ['border'], ['borderRadius']],
                },
                Switch: {
                  name: '控制器配置',
                  desc: '配置控制树节点展开或隐藏的控制器的样式',
                  normal: [['color'], ['font']],
                  hover: [['color'], ['font']],
                  active: [['color'], ['font']],
                  disabled: [['color'], ['font']],
                },
                Checkbox: {
                  theme: {
                    CheckboxWrap: {
                      name: 'Checkbox整体配置',
                      desc: 'Checkbox整体配置',
                      normal: [['opacity'], ['margin'], ['padding'], ['width'], ['height']],
                      hover: [['opacity']],
                      disabled: [['opacity']],
                    },
                    CheckboxText: {
                      name: 'Checkbox文字配置',
                      desc: 'Checkbox文字配置',
                      normal: [['color'], ['font']],
                      hover: [['color'], ['font']],
                      disabled: [['color'], ['font']],
                    },
                    CheckboxEdgeChecked: {
                      name: 'Checkbox选中后边框配置',
                      desc: 'Checkbox选中后边框配置样式',
                      normal: [['background'], ['borderRadius'], ['border']],
                      hover: [['background'], ['borderRadius'], ['border']],
                      disabled: [['background'], ['borderRadius'], ['border']],
                    },
                    CheckboxEdgeUnChecked: {
                      name: 'Checkbox未选中边框配置',
                      desc: 'Checkbox未选中边框配置样式',
                      normal: [['background'], ['borderRadius'], ['border']],
                      hover: [['background'], ['borderRadius'], ['border']],
                      disabled: [['background'], ['borderRadius'], ['border']],
                    },
                    CheckboxInnerChecked: {
                      name: 'Checkbox选中样式配置',
                      desc: 'Checkbox选中样式配置',
                      normal: [['color']],
                      hover: [['color']],
                      disabled: [['color']],
                    },
                  },
                },
              },
            },
          },
        },
        TransferButton: {
          name: '穿梭框按钮样式',
          desc: '为穿梭框配置按钮样式',
          theme: {
            ButtonWrap: {
              name: '按钮整体样式',
              desc: '为按钮配置整体样式',
              normal: [
                ['background'],
                ['border'],
                ['height'],
                ['width'],
                ['padding'],
                ['margin'],
                ['borderRadius'],
              ],
              hover: [['background'], ['border']],
              active: [['background'], ['border']],
              disabled: [['background'], ['border']],
              focus: [['background'], ['border']],
            },
            ButtonText: {
              name: '按钮文字样式',
              desc: '为按钮文字配置样式',
              normal: [['color'], ['font']],
              hover: [['color']],
              active: [['color']],
              disabled: [['color']],
              focus: [['color']],
            },
            ButtonIcon: {
              name: '按钮图标样式',
              desc: '为按钮图标配置样式',
              normal: [['color'], ['font']],
              hover: [['color']],
              active: [['color']],
              disabled: [['color']],
              focus: [['color']],
            },
          },
        },
      },
      childrenWidget: [],
      aliasName: 'TransferTree',
    },
    target: Transfer,
    screenshot:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGwAAABACAYAAAD/CJKAAAAAAXNSR0IArs4c6QAABIxJREFUeAHtnd9LFFEUx8+9O7PqgmRSBPUQRSgUlWRIRESFr+4u0oqaZhDRL4x+/CH9DeZm4oqlvgr9eAiCNPtBoETRQ0EEVgQ+NLN3umfbpV3YCzPjTN17uQO64/Xs2e/3fObMzjpXLgG+jY2N7XAc5zbf7S4Wi5txTJYtkUh841oWbNu+MTIy8ikOXSr5J2Wxrzs7O5vb2tqsVCoVR01C51xfX4fV1VV3cXHxJ4e2P2poqvm3sLMQVkdHhxW6qjE+EQ+gsrZmDg3PAn1Rvpxq/ik3342dFWUR4shV1tgdQ26l/FN8z5LtNFgPCmqM4/1VNf/YYWZTqAIGmEKwUKoBZoApVgHF5JoOUwxY6Mv5lZUVX1bb29tLcUHjfSX/j0FB/QSNF1kzHSaqjKTjBpikYESyDDBRZSQdN8AkBSOSVXPRsbb2DZZevgLbsmviHdeBQwcPQGurVHdeajRG8YMK/muANaWa4PnSMrx49QaKrluqQcKyOKz9cOzokShqEmuOnoGBfZZrbblfGH8c5oVU8F9zSmxqbIRb165A16EOIIQA/wZHuw7DzdHL0NjQEKYG//Q5FqO7iE0fpPsGj4d5YRX813QYmuQ3CWH08gUglEIyacOl8+fA4l2mwuYB/EoQ2mJRezrTP5Sdncw/Dapbdv91SSSTSbh+9WLJK+XgVNoYY/zMAFupl5jJ9A9nZifHnwXVL7N/IQ0EpRqsChiExs/m2yihM+n+4cOV8SCPsvoXAgtiTsbYEjSA7dQjs72Dgztl1BhGk7bA/hbDS7kOrf2c8veXyu1pCwxPaZ4Ha8wjvXOF/DvlyAgEawmsAqvIvNNzU3ceCrwrOawdsNKFEu8sHWHhEVb3st7PoVe5z+UnFmOCxvvNWx3HP+onGfN+OEWWmy+Mx9pZQf0Eja/2Vb0fGlh1Eln2+dX8e0Lc7Hwh/0gWTVHr0ArYbOHuW14g/NJ20+49TFtSZWMGmGKEDTADTLEKKCbXdJgBplgFFJNrOswAk6cC2f6hE5ncmb3yKNq4Em07rCc3fIoS6wH/o/3ujZdJngyh/9JxrzDvy8VArqcUFzTeV3JBULrv7EmLkgKlZJPL4JcgbEPDQefKB40XidOuwxBWgpJpPq+jtTS/Q+Rc0XGtgFVg8fkcWsLCYyz0KVG2AzSdG9pDiTfD51O26NhZlXpr02GWzRw+v229YkzXR22AzUxMfGTEy/DJpJ9Ld501JaYNMOQzNzn+nHmsl0+++aIrNK2AITSc6cug2AsefNURmnbA/kDLP3WZc5p323ec54FjumxaAkM4c1MTTzyHZV3KPugCC31oc1lfD0rY/xOrl0uWMW07TJYCR63DAIu6ojHnM8BiLnDU6Q2wqCsacz4DLOYCR50+9FVi5T6XX0FB4/3m/V9xQefKB40X+TIdJqqMpOMGmKRgRLIMMFFlJB03wCQFI5JlgIkqI+k4xbVNcLkM2TfUWF6HJVKpqvnHDlvAtU0irUIMycoaF2JIrZR/iqsG4UI0y8vLroydhppQW3mxnBtRA1PNP7+/Z5ajUmk5qt+y57ArB79yGQAAAABJRU5ErkJggg==',
  },
  {
    meta: {
      widgetName: 'Tree',
      title: '树形控件',
      desc: '清晰地展示层级结构的信息,可展开或折叠。',
      props: {
        start: { type: 'number', desc: '开始展示数据的索引值', defaultValue: 0 },
        query: { type: 'string', desc: '用于过滤数据的关键字', defaultValue: '' },
        mutliple: { type: 'boolean', desc: '是否多选', defaultValue: false },
        limitCount: { type: 'number', desc: '多选时的最大选中数', defaultValue: 999999 },
        expandAll: { type: 'boolean', desc: '是否展开所有子元素', defaultValue: false },
        onlySelectLeaf: { type: 'boolean', desc: '是否只能选择根节点选项', defaultValue: false },
        valueField: { type: 'string', desc: 'data数据的value值的名称', defaultValue: 'key' },
        displayField: {
          type: 'string',
          desc: 'data数据的displayValue值的名称',
          defaultValue: 'title',
        },
        value: {
          type: 'string | string[] | number | number[]',
          desc: '指定当前选中的条目的valueField值',
        },
        displayValue: {
          type: 'string | string[] | number | number[]',
          desc: '指定当前选中的条目的displayField值',
        },
        data: {
          type: 'object[]',
          desc: '生成选择项的数据',
          meta: [
            { key: 'value', title: 'value值', type: 'string' },
            { key: 'text', title: '文本值', type: 'string' },
          ],
          defaultValue: false,
        },
        igronSelectField: { type: 'string', desc: '指定不可选的标识' },
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
          defaultValue: false,
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
        onRightClick: {
          desc: '单选树的右击事件',
          args: [
            { name: 'target', desc: '包含事件对象、节点信息和节点数据等对象几何', type: 'object' },
          ],
        },
        renderSuffix: {
          desc: '自定义后缀图标的回调函数',
          args: [{ name: 'item', desc: '节点数据', type: 'object' }],
        },
      },
      category: ['数据录入'],
      designInfo: {
        MutlipleTree: {
          sequence: 1,
          title: '多选树形控件',
          desc: '多项选择的树形控件',
          props: { mutliple: true },
          theme: {
            TreeWrap: {
              name: '树形控件外盒',
              desc: '配置树形组件的外盒样式',
              normal: [
                ['width'],
                ['height'],
                ['boxShadow'],
                ['background'],
                ['opacity'],
                ['border'],
                ['borderRadius'],
                ['margin'],
                ['padding'],
              ],
              hover: [['boxShadow'], ['background'], ['opacity'], ['border'], ['borderRadius']],
              clicked: [],
              disabled: [],
            },
            TreeItem: {
              name: '多选树的项配置',
              theme: {
                TreeItemWrap: {
                  name: '项的外盒',
                  desc: '配置每一项的外盒',
                  normal: [
                    ['background'],
                    ['border'],
                    ['borderRadius'],
                    ['opacity'],
                    ['color'],
                    ['padding'],
                  ],
                  hover: [['background'], ['border'], ['borderRadius'], ['opacity'], ['color']],
                  active: [['background'], ['border'], ['borderRadius'], ['opacity'], ['color']],
                  disabled: [],
                },
                SelectedTreeItemWrap: {
                  name: '选中项的外盒',
                  desc: '配置选中项的外盒',
                  normal: [
                    ['background'],
                    ['border'],
                    ['borderRadius'],
                    ['opacity'],
                    ['color'],
                    ['padding'],
                  ],
                  hover: [['background'], ['border'], ['borderRadius'], ['opacity'], ['color']],
                  active: [['background'], ['border'], ['borderRadius'], ['opacity'], ['color']],
                  disabled: [],
                },
                Text: {
                  name: '项的文本',
                  desc: '配置每一项文本内容的样式',
                  normal: [
                    ['color'],
                    ['font'],
                    ['background'],
                    ['padding'],
                    ['border'],
                    ['borderRadius'],
                  ],
                  hover: [['color'], ['font'], ['background'], ['border'], ['borderRadius']],
                  active: [['color'], ['font'], ['background'], ['border'], ['borderRadius']],
                  disabled: [['color'], ['font'], ['background'], ['border'], ['borderRadius']],
                },
                SelectedText: {
                  name: '选中项的文本',
                  desc: '配置选中项文本内容的样式',
                  normal: [
                    ['color'],
                    ['font'],
                    ['background'],
                    ['padding'],
                    ['border'],
                    ['borderRadius'],
                  ],
                  hover: [['color'], ['font'], ['background'], ['border'], ['borderRadius']],
                  active: [['color'], ['font'], ['background'], ['border'], ['borderRadius']],
                  disabled: [['color'], ['font'], ['background'], ['border'], ['borderRadius']],
                },
                Switch: {
                  name: '控制器配置',
                  desc: '配置控制树节点展开或隐藏的控制器的样式',
                  normal: [['color'], ['font']],
                  hover: [['color'], ['font']],
                  active: [['color'], ['font']],
                  disabled: [['color'], ['font']],
                },
                Checkbox: {
                  name: '多选树的选择框配置',
                  theme: {
                    CheckboxWrap: {
                      name: 'Checkbox整体配置',
                      desc: 'Checkbox整体配置',
                      normal: [['opacity'], ['margin'], ['padding'], ['width'], ['height']],
                      hover: [['opacity']],
                      disabled: [['opacity']],
                    },
                    CheckboxText: {
                      name: 'Checkbox文字配置',
                      desc: 'Checkbox文字配置',
                      normal: [['color'], ['font']],
                      hover: [['color'], ['font']],
                      disabled: [['color'], ['font']],
                    },
                    CheckboxEdgeChecked: {
                      name: 'Checkbox选中后边框配置',
                      desc: 'Checkbox选中后边框配置样式',
                      normal: [['background'], ['borderRadius'], ['border']],
                      hover: [['background'], ['borderRadius'], ['border']],
                      disabled: [['background'], ['borderRadius'], ['border']],
                    },
                    CheckboxEdgeUnChecked: {
                      name: 'Checkbox未选中边框配置',
                      desc: 'Checkbox未选中边框配置样式',
                      normal: [['background'], ['borderRadius'], ['border']],
                      hover: [['background'], ['borderRadius'], ['border']],
                      disabled: [['background'], ['borderRadius'], ['border']],
                    },
                    CheckboxInnerChecked: {
                      name: 'Checkbox选中样式配置',
                      desc: 'Checkbox选中样式配置',
                      normal: [['color']],
                      hover: [['color']],
                      disabled: [['color']],
                    },
                  },
                },
                SubTreeWrap: {
                  name: '展开项的外盒配置',
                  desc: '展开项下的子树的外盒配置',
                  normal: [
                    ['width'],
                    ['background'],
                    ['opacity'],
                    ['border'],
                    ['margin'],
                    ['padding', 'left'],
                    ['padding', 'right'],
                  ],
                  hover: [['background'], ['opacity'], ['border']],
                  active: [],
                  disabled: [],
                },
              },
            },
          },
        },
      },
      theme: {
        TreeWrap: {
          name: '树形控件外盒',
          desc: '配置树形组件的外盒样式',
          normal: [
            ['width'],
            ['height'],
            ['boxShadow'],
            ['background'],
            ['opacity'],
            ['border'],
            ['borderRadius'],
            ['margin'],
            ['padding'],
          ],
          hover: [['boxShadow'], ['background'], ['opacity'], ['border'], ['borderRadius']],
          clicked: [],
          disabled: [],
        },
        TreeItem: {
          name: '单选树的项配置',
          theme: {
            TreeItemWrap: {
              name: '项的外盒',
              desc: '配置每一项的外盒',
              normal: [
                ['background'],
                ['border'],
                ['borderRadius'],
                ['opacity'],
                ['color'],
                ['padding'],
              ],
              hover: [['background'], ['border'], ['borderRadius'], ['opacity'], ['color']],
              active: [['background'], ['border'], ['borderRadius'], ['opacity'], ['color']],
              disabled: [],
            },
            SelectedTreeItemWrap: {
              name: '选中项的外盒',
              desc: '配置选中项的外盒',
              normal: [
                ['background'],
                ['border'],
                ['borderRadius'],
                ['opacity'],
                ['color'],
                ['padding'],
              ],
              hover: [['background'], ['border'], ['borderRadius'], ['opacity'], ['color']],
              active: [['background'], ['border'], ['borderRadius'], ['opacity'], ['color']],
              disabled: [],
            },
            Text: {
              name: '项的文本',
              desc: '配置每一项文本内容的样式',
              normal: [
                ['color'],
                ['font'],
                ['background'],
                ['padding'],
                ['border'],
                ['borderRadius'],
              ],
              hover: [['color'], ['font'], ['background'], ['border'], ['borderRadius']],
              active: [['color'], ['font'], ['background'], ['border'], ['borderRadius']],
              disabled: [['color'], ['font'], ['background'], ['border'], ['borderRadius']],
            },
            SelectedText: {
              name: '选中项的文本',
              desc: '配置选中项文本内容的样式',
              normal: [
                ['color'],
                ['font'],
                ['background'],
                ['padding'],
                ['border'],
                ['borderRadius'],
              ],
              hover: [['color'], ['font'], ['background'], ['border'], ['borderRadius']],
              active: [['color'], ['font'], ['background'], ['border'], ['borderRadius']],
              disabled: [['color'], ['font'], ['background'], ['border'], ['borderRadius']],
            },
            Switch: {
              name: '控制器配置',
              desc: '配置控制树节点展开或隐藏的控制器的样式',
              normal: [['color'], ['font']],
              hover: [['color'], ['font']],
              active: [['color'], ['font']],
              disabled: [['color'], ['font']],
            },
            SubTreeWrap: {
              name: '展开项的外盒配置',
              desc: '展开项下的子树的外盒配置',
              normal: [
                ['width'],
                ['background'],
                ['opacity'],
                ['border'],
                ['margin'],
                ['padding', 'left'],
                ['padding', 'right'],
              ],
              hover: [['background'], ['opacity'], ['border']],
              active: [],
              disabled: [],
            },
          },
        },
      },
      childrenWidget: [],
    },
    target: Tree,
    screenshot:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAF4AAABGCAYAAABFVyOYAAAAAXNSR0IArs4c6QAAAxRJREFUeAHt2j1v2kAYB/Az2CaCqEo69BNkyN5+i1QdowiWvBSRSgkDH6BiYczEkqSKlCHOULaqFWs+QNNuLVK7RFmKlDbpGwHbcLVRiQy6eMg/2Cn9IyHsOz/3HD9OBnGPJsBHo9GQYUPMz89rfn9c14XNLc6+RJzJ/+fchI/p0yd8TPC6ZVmztp2WdsZR3qvN34Zmmi0tl8udxzTHiUyrC326lDLEZkpM/VK9Q5mRGSGnq17fc1U/224moNutbxUzfX9O08SSaghNioOz5klF1ce2mwskVlZW2l+bJ8tSSmt0GCnk3s+LL6vFYrEz2sdzTKD/5erDevhrQfyeFDufPrxfLxQKDpaC0SqBq181Pn5T6+Q9/G0h5dbnj+82yuWyqwpiGy6gB4coLS5eeufPgm08Ho/A1Yofz/Ac9ToBwl8nM+Z2wo8ZmMNTgAIUoAAFKEABClCAAhSgAAX+TYF+zctdmPrhy1fKPd/B3LKLT/pzve3rBuNH/cr/aqIW/5uP8ISPSSCmtEM7UDeZw0I2O2u0TGkYpvIe7Ti25qRt7c3hIetyAsAwvOEmSyLlbrqiq6zLESmRMdwE63IC6P4hDD+TTla+X3bnkoax1HWH98aTui5c1z3oPJhhXc4IPPzlur+/327/OFvuOo6VSCa9AgWvGsd7+seu4+yd3ptarVerrMu5bXh/vHq93vHw17zVbem6IXRvpfdcZ+eiebp+vLvLupwRdP8UXvGDMX18s9fOeyt/2/sAts6bcxtHR0fD957BxXzF7/FBw1qtxrqcIEjI8a2t+JAc7FIIEF6BEkUT4aNQZg4KUIACFKAABSgwsQJ3Zs914al8OLHKijfG3/EKlCiaCB+FsiIH4RUoUTQRPgplRQ7CK1CiaIL3XKOYpJ/j9QvxNizX47x4NI7rwnIifVzxiB4QS3gADwklPKIHxBIewENCCY/oAbGEB/CQUMIjekAs4QE8JJTwiB4QS3gADwklPKIHxBIewENCCY/oAbHccwXwkFCueEQPiCU8gIeEEh7RA2IJD+AhoYRH9IDYP12R2WcI4/UOAAAAAElFTkSuQmCC',
  },
  {
    meta: {
      widgetName: 'Tree',
      title: '多选树形控件',
      desc: '多项选择的树形控件',
      props: {
        start: { type: 'number', desc: '开始展示数据的索引值', defaultValue: 0 },
        query: { type: 'string', desc: '用于过滤数据的关键字', defaultValue: '' },
        mutliple: { type: 'boolean', desc: '是否多选', defaultValue: true },
        limitCount: { type: 'number', desc: '多选时的最大选中数', defaultValue: 999999 },
        expandAll: { type: 'boolean', desc: '是否展开所有子元素', defaultValue: false },
        onlySelectLeaf: { type: 'boolean', desc: '是否只能选择根节点选项', defaultValue: false },
        valueField: { type: 'string', desc: 'data数据的value值的名称', defaultValue: 'key' },
        displayField: {
          type: 'string',
          desc: 'data数据的displayValue值的名称',
          defaultValue: 'title',
        },
        value: {
          type: 'string | string[] | number | number[]',
          desc: '指定当前选中的条目的valueField值',
        },
        displayValue: {
          type: 'string | string[] | number | number[]',
          desc: '指定当前选中的条目的displayField值',
        },
        data: {
          type: 'object[]',
          desc: '生成选择项的数据',
          meta: [
            { key: 'value', title: 'value值', type: 'string' },
            { key: 'text', title: '文本值', type: 'string' },
          ],
          defaultValue: false,
        },
        igronSelectField: { type: 'string', desc: '指定不可选的标识' },
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
          defaultValue: false,
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
        onRightClick: {
          desc: '单选树的右击事件',
          args: [
            { name: 'target', desc: '包含事件对象、节点信息和节点数据等对象几何', type: 'object' },
          ],
        },
        renderSuffix: {
          desc: '自定义后缀图标的回调函数',
          args: [{ name: 'item', desc: '节点数据', type: 'object' }],
        },
      },
      category: ['数据录入'],
      theme: {
        TreeWrap: {
          name: '树形控件外盒',
          desc: '配置树形组件的外盒样式',
          normal: [
            ['width'],
            ['height'],
            ['boxShadow'],
            ['background'],
            ['opacity'],
            ['border'],
            ['borderRadius'],
            ['margin'],
            ['padding'],
          ],
          hover: [['boxShadow'], ['background'], ['opacity'], ['border'], ['borderRadius']],
          clicked: [],
          disabled: [],
        },
        TreeItem: {
          name: '多选树的项配置',
          theme: {
            TreeItemWrap: {
              name: '项的外盒',
              desc: '配置每一项的外盒',
              normal: [
                ['background'],
                ['border'],
                ['borderRadius'],
                ['opacity'],
                ['color'],
                ['padding'],
              ],
              hover: [['background'], ['border'], ['borderRadius'], ['opacity'], ['color']],
              active: [['background'], ['border'], ['borderRadius'], ['opacity'], ['color']],
              disabled: [],
            },
            SelectedTreeItemWrap: {
              name: '选中项的外盒',
              desc: '配置选中项的外盒',
              normal: [
                ['background'],
                ['border'],
                ['borderRadius'],
                ['opacity'],
                ['color'],
                ['padding'],
              ],
              hover: [['background'], ['border'], ['borderRadius'], ['opacity'], ['color']],
              active: [['background'], ['border'], ['borderRadius'], ['opacity'], ['color']],
              disabled: [],
            },
            Text: {
              name: '项的文本',
              desc: '配置每一项文本内容的样式',
              normal: [
                ['color'],
                ['font'],
                ['background'],
                ['padding'],
                ['border'],
                ['borderRadius'],
              ],
              hover: [['color'], ['font'], ['background'], ['border'], ['borderRadius']],
              active: [['color'], ['font'], ['background'], ['border'], ['borderRadius']],
              disabled: [['color'], ['font'], ['background'], ['border'], ['borderRadius']],
            },
            SelectedText: {
              name: '选中项的文本',
              desc: '配置选中项文本内容的样式',
              normal: [
                ['color'],
                ['font'],
                ['background'],
                ['padding'],
                ['border'],
                ['borderRadius'],
              ],
              hover: [['color'], ['font'], ['background'], ['border'], ['borderRadius']],
              active: [['color'], ['font'], ['background'], ['border'], ['borderRadius']],
              disabled: [['color'], ['font'], ['background'], ['border'], ['borderRadius']],
            },
            Switch: {
              name: '控制器配置',
              desc: '配置控制树节点展开或隐藏的控制器的样式',
              normal: [['color'], ['font']],
              hover: [['color'], ['font']],
              active: [['color'], ['font']],
              disabled: [['color'], ['font']],
            },
            Checkbox: {
              name: '多选树的选择框配置',
              theme: {
                CheckboxWrap: {
                  name: 'Checkbox整体配置',
                  desc: 'Checkbox整体配置',
                  normal: [['opacity'], ['margin'], ['padding'], ['width'], ['height']],
                  hover: [['opacity']],
                  disabled: [['opacity']],
                },
                CheckboxText: {
                  name: 'Checkbox文字配置',
                  desc: 'Checkbox文字配置',
                  normal: [['color'], ['font']],
                  hover: [['color'], ['font']],
                  disabled: [['color'], ['font']],
                },
                CheckboxEdgeChecked: {
                  name: 'Checkbox选中后边框配置',
                  desc: 'Checkbox选中后边框配置样式',
                  normal: [['background'], ['borderRadius'], ['border']],
                  hover: [['background'], ['borderRadius'], ['border']],
                  disabled: [['background'], ['borderRadius'], ['border']],
                },
                CheckboxEdgeUnChecked: {
                  name: 'Checkbox未选中边框配置',
                  desc: 'Checkbox未选中边框配置样式',
                  normal: [['background'], ['borderRadius'], ['border']],
                  hover: [['background'], ['borderRadius'], ['border']],
                  disabled: [['background'], ['borderRadius'], ['border']],
                },
                CheckboxInnerChecked: {
                  name: 'Checkbox选中样式配置',
                  desc: 'Checkbox选中样式配置',
                  normal: [['color']],
                  hover: [['color']],
                  disabled: [['color']],
                },
              },
            },
            SubTreeWrap: {
              name: '展开项的外盒配置',
              desc: '展开项下的子树的外盒配置',
              normal: [
                ['width'],
                ['background'],
                ['opacity'],
                ['border'],
                ['margin'],
                ['padding', 'left'],
                ['padding', 'right'],
              ],
              hover: [['background'], ['opacity'], ['border']],
              active: [],
              disabled: [],
            },
          },
        },
      },
      childrenWidget: [],
      aliasName: 'MutlipleTree',
    },
    target: Tree,
    screenshot:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAF4AAABICAYAAAB/XULoAAAAAXNSR0IArs4c6QAABVZJREFUeAHtnEFoHFUYgP+3O7NbkmpNq8RQwUsPOYiGuN73XvHgIUiC0rSNttIGSWn1JAHJoUpLSQRtNBBCN8UEepDKqoguih5kG1M8mIOX0pYaCG1pmjTZmd3xf9uZsrvMZGfmvdn3dvcNLDv73v//73/f+/fN7D8/S4DD8eZR6wUT4FM0lbYs6PFjkhC4g3I5DeDMla/JLT86rSRDWCdDoRsA18GCvaFsEbirA7zSbvAx4NiOcqSHhU6HRl2TlL8tg26erKysWG7tTltvb285ePzKOXqi32McHEhLYoODG40zwQze756+05R42NjJvox9zOBlnFQz+KRlMpmuQqHDKnQarntpYkMnicQmGRoautcME2oWHzXQdo8ldTiZhF0P3Zy2Oq1OsHZPYd/Hbv2qLRwBrbB5dyLRsfcA3le/5WaCWHBpbfXGhFufagtPQBseHt6anJw8tK/7xSIhZKjSlAXWzMP7/x0fHR3FW3V/x/PPARwe8JZ9sA7w+Zx3f7v0lO/jEew2wj+C8MGBX7Lg4r///HVifHwcb9X9HxuPAK797S3/aNu7r516nvyAovDPLyyMdFvJdfxFsoHQPwoKnYJbxyvFD7+2E8Jwc30CnqqPDQxgvMLxcKaUVhAC6j4+CC2Osszg7Swjk0s8bDA5IECZGTz6nOPgNw8bHNxonAmVFm4c66qRmCOe5tFpPh23i8tBtgwqS3XaMRdftQLqgyKgCCgCioAioAgoAk1NgPk+nufs26k+Rxrw7VafU5Wd5Bm9QW1FXZ8zv/Ct6zNlx8/BgTfKQchbzrFf+878y7XWIMPnNIOuo8rDhmMr0ndpwPOoreFhI1LaFcalAV/hk6/TPU8BdD/rS1RKIeY9/uDgYJe+mbB0PeG6hxpGgRgdBfLd/Dy3upyuPQAfHgO48j3A6pqUXOs6xQxeN+NjkDRPmlB0rcuBJHTqZoxbXQ6Ffgah//wHwJ/X685PWgHmreaZjvgEAZKN6/p+LFGoetltV7e7uwLV5cTQq/6XAOI13jnQf0HoP/4mLVNfjtVMzZdOldDs7OzW1oO1Q0XDyMTicbDwCkdf9Nw0jJmbT+86nJ2aClTUgerw2ssA778NQBeBHq0Enc6HGTw1ks1mtxH+EdM0M5qmg6ZpUDKNi/dXbx67Nj3tuxiK2qIHBT99GaBYAngPq+ZpkdTpdwFaIdIfz5ATeGqMwk+UtkYw8r/EBTh3b/XAiVwuF6gYynGKvlP4X1xC+EWAT04B/PR7828vlfNjvrhWGltcXORal0Phz3yDBVK4n9+4VTlS859z2WqixEC3m1aDTnlJAz7Ig3KvheZhw8s273ZpwOPEchwmx8MGBzfqm1Bp4fqMIpGQJuJVfU4k66uMKgKKgCKgCAggIM1dTdRzP3jUejXqMYLYl+auJojTrSCrwAtaRQVeEHiu2UnWOSwvL+/HlPJnaCeNL1//9IRyj//pSdNO9/X13cbPTXFIA96Gno/FYhdKpdKpVCpFgdY98vl8D+q8gwuWRxupZoEvDXga6RR6f3//2bq0KwTsBTq7tLQE9rfF9Z+eKlRcT69+BXnXDrvx9RFI0VO/cjvZon0y7fFpjPS5eg579du6aa9+2dplAt/jd3txg2jr+r0uuJloaJtM4Bs6cdGDKfCCVkCBV+AFERA0rIp4BV4QAUHDqohX4AUREDSsingFHu7QhFdYDraur8Ra2DF46skU8TmaZQw7OVs3F1a/0XrSPHOtSQvP+c3bOGlhTJJ9gHX5nmlh2Z65SgOeRlyUD0IU+EZ/p+3xZAMv0x4vaEnEDKvAi+Eu1RMoQQjEDPs/KBq+RLysf5kAAAAASUVORK5CYII=',
  },
  {
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
        data: {
          type: 'Array<Object>',
          desc: '生成选择项的数据',
          meta: [
            { key: 'value', title: 'value值', type: 'string' },
            { key: 'text', title: '文本值', type: 'string' },
          ],
          defaultValue: false,
        },
        createPortal: { type: 'boolean', desc: '是否全局弹出下拉框', defaultValue: true },
        valueField: { type: 'string', desc: 'data数据的value值的名称', defaultValue: 'value' },
        displayField: {
          type: 'string',
          desc: 'data数据的displayValue值的名称',
          defaultValue: 'text',
        },
        translateTreeData: {
          type: 'boolean',
          desc: '是否开启嵌套数据生成Tree',
          defaultValue: false,
        },
        start: { type: 'number', desc: '开始展示数据的索引值', defaultValue: 0 },
        query: { type: 'string', desc: '搜索框关键字', defaultValue: '' },
        mutliple: { type: 'boolean', desc: '是否多选', defaultValue: false },
        limitCount: { type: 'number', desc: '多选时的最大选中数', defaultValue: 999999 },
        expandAll: { type: 'boolean', desc: '是否展开所有子元素', defaultValue: false },
        onlySelectLeaf: { type: 'boolean', desc: '是否只能选择根节点选项', defaultValue: true },
        label: { type: 'string', desc: '标注文本' },
        value: {
          type: 'string | string[] | number | number[]',
          desc: '指定当前选中的条目的valueField值',
        },
        displayValue: {
          type: 'string | string[] | number | number[]',
          desc: '指定当前选中的条目的displayField值',
        },
        disabled: { type: 'boolean', desc: '是否禁选', defaultValue: false },
        placeholder: { type: 'string', desc: '占位符' },
        mode: {
          type: 'local | remote',
          desc: '指定检索是本地检索还是远程检索',
          defaultValue: 'local',
        },
        canSearch: { type: 'boolean', desc: '是否支持查询', defaultValue: false },
        throttle: { type: 'number', desc: '检索数据的延迟,单位为毫秒', defaultValue: 200 },
        canInput: {
          type: 'boolean',
          desc: '是否支持自定义值,只有在canSearch为true时才生效',
          defaultValue: false,
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
      designInfo: {
        MutlipleTreeSelect: {
          sequence: 1,
          title: '多项树形选择',
          desc: '支持多项树形选择',
          props: { mutliple: true },
          theme: {
            InputTag: {
              name: '多选树形选择的展示框',
              theme: {
                InputTagWrap: {
                  name: '展示框的外盒',
                  desc: '配置展示选中数据的外盒样式',
                  normal: [
                    ['width'],
                    ['height'],
                    ['margin'],
                    ['padding'],
                    ['color'],
                    ['background'],
                    ['border'],
                    ['boxShadow'],
                    ['borderRadius'],
                    ['font'],
                    ['opacity'],
                  ],
                  hover: [
                    ['color'],
                    ['background'],
                    ['border'],
                    ['boxShadow'],
                    ['borderRadius'],
                    ['font'],
                    ['opacity'],
                  ],
                  active: [],
                  disabled: [],
                },
                SwitchIcon: {
                  name: '下拉图标',
                  desc: '配置下拉或清除按钮的图标样式',
                  normal: [['margin'], ['padding'], ['color'], ['font'], ['opacity']],
                  hover: [['color'], ['font'], ['opacity']],
                  active: [],
                  disabled: [],
                },
                TagWrap: {
                  name: '标签',
                  desc: '配置展示选中项的标签样式',
                  normal: [
                    ['width'],
                    ['height'],
                    ['background'],
                    ['color'],
                    ['font'],
                    ['fontSize'],
                    ['border'],
                    ['borderRadius'],
                    ['boxShadow'],
                    ['opacity'],
                    ['padding', 'left'],
                    ['padding', 'right'],
                    ['margin', 'left'],
                    ['margin', 'right'],
                  ],
                  hover: [
                    ['background'],
                    ['color'],
                    ['borderRadius'],
                    ['border'],
                    ['font'],
                    ['opacity'],
                    ['boxShadow'],
                  ],
                  active: [],
                  disabled: [],
                },
                TagIcon: {
                  name: '标签删除按钮',
                  desc: '配置标签删除按钮样式',
                  normal: [['color'], ['font'], ['fontSize'], ['opacity']],
                  hover: [['color'], ['font'], ['fontSize'], ['opacity']],
                  active: [],
                  disabled: [],
                },
                Menu: {
                  name: '多选展示框的弹开菜单',
                  theme: {
                    MenuWrap: {
                      name: '菜单外盒',
                      desc: '配置菜单组件的外盒样式',
                      normal: [
                        ['width'],
                        ['height'],
                        ['boxShadow'],
                        ['background'],
                        ['opacity'],
                        ['border'],
                        ['borderRadius'],
                        ['margin'],
                        ['padding'],
                      ],
                      hover: [
                        ['boxShadow'],
                        ['background'],
                        ['opacity'],
                        ['border'],
                        ['borderRadius'],
                      ],
                      clicked: [],
                      disabled: [],
                    },
                    MenuItem: {
                      name: '菜单项的配置',
                      theme: {
                        MenuItemWrap: {
                          name: '项的外盒',
                          desc: '配置每一项的外盒',
                          normal: [
                            ['height'],
                            ['background'],
                            ['border'],
                            ['borderRadius'],
                            ['opacity'],
                            ['color'],
                            ['padding'],
                          ],
                          hover: [
                            ['background'],
                            ['border'],
                            ['borderRadius'],
                            ['opacity'],
                            ['color'],
                            ['font'],
                          ],
                          active: [
                            ['background'],
                            ['border'],
                            ['borderRadius'],
                            ['opacity'],
                            ['color'],
                            ['font'],
                          ],
                        },
                      },
                    },
                  },
                },
              },
            },
            Tree: {
              name: '弹开树形控件配置',
              theme: {
                TreeWrap: {
                  name: '树形控件外盒',
                  desc: '配置树形组件的外盒样式',
                  normal: [
                    ['width'],
                    ['height'],
                    ['boxShadow'],
                    ['background'],
                    ['opacity'],
                    ['border'],
                    ['borderRadius'],
                    ['margin'],
                    ['padding'],
                  ],
                  hover: [['boxShadow'], ['background'], ['opacity'], ['border'], ['borderRadius']],
                  clicked: [],
                  disabled: [],
                },
                TreeItem: {
                  name: '树形控件项配置',
                  theme: {
                    TreeItemWrap: {
                      name: '项的外盒',
                      desc: '配置每一项的外盒',
                      normal: [
                        ['background'],
                        ['border'],
                        ['borderRadius'],
                        ['opacity'],
                        ['color'],
                        ['padding'],
                      ],
                      hover: [['background'], ['border'], ['borderRadius'], ['opacity'], ['color']],
                      active: [
                        ['background'],
                        ['border'],
                        ['borderRadius'],
                        ['opacity'],
                        ['color'],
                      ],
                      disabled: [],
                    },
                    SelectedTreeItemWrap: {
                      name: '选中项的外盒',
                      desc: '配置选中项的外盒',
                      normal: [
                        ['background'],
                        ['border'],
                        ['borderRadius'],
                        ['opacity'],
                        ['color'],
                        ['padding'],
                      ],
                      hover: [['background'], ['border'], ['borderRadius'], ['opacity'], ['color']],
                      active: [
                        ['background'],
                        ['border'],
                        ['borderRadius'],
                        ['opacity'],
                        ['color'],
                      ],
                      disabled: [],
                    },
                    Text: {
                      name: '项的文本',
                      desc: '配置每一项文本内容的样式',
                      normal: [
                        ['color'],
                        ['font'],
                        ['background'],
                        ['padding'],
                        ['border'],
                        ['borderRadius'],
                      ],
                      hover: [['color'], ['font'], ['background'], ['border'], ['borderRadius']],
                      active: [['color'], ['font'], ['background'], ['border'], ['borderRadius']],
                      disabled: [['color'], ['font'], ['background'], ['border'], ['borderRadius']],
                    },
                    SelectedText: {
                      name: '选中项的文本',
                      desc: '配置选中项文本内容的样式',
                      normal: [
                        ['color'],
                        ['font'],
                        ['background'],
                        ['padding'],
                        ['border'],
                        ['borderRadius'],
                      ],
                      hover: [['color'], ['font'], ['background'], ['border'], ['borderRadius']],
                      active: [['color'], ['font'], ['background'], ['border'], ['borderRadius']],
                      disabled: [['color'], ['font'], ['background'], ['border'], ['borderRadius']],
                    },
                    Switch: {
                      name: '控制器配置',
                      desc: '配置控制树节点展开或隐藏的控制器的样式',
                      normal: [['color'], ['font']],
                      hover: [['color'], ['font']],
                      active: [['color'], ['font']],
                      disabled: [['color'], ['font']],
                    },
                  },
                },
              },
            },
          },
        },
      },
      theme: {
        InputTag: {
          name: '树形选择器的展示框',
          theme: {
            InputTagWrap: {
              name: '展示框的外盒',
              desc: '配置展示选中数据的外盒样式',
              normal: [
                ['width'],
                ['height'],
                ['margin'],
                ['padding'],
                ['color'],
                ['background'],
                ['border'],
                ['boxShadow'],
                ['borderRadius'],
                ['font'],
                ['opacity'],
              ],
              hover: [
                ['color'],
                ['background'],
                ['border'],
                ['boxShadow'],
                ['borderRadius'],
                ['font'],
                ['opacity'],
              ],
              active: [],
              disabled: [],
            },
            SwitchIcon: {
              name: '下拉图标',
              desc: '配置下拉或清除按钮的图标样式',
              normal: [['color'], ['background'], ['font'], ['margin'], ['opacity']],
              hover: [['color'], ['font'], ['opacity']],
              active: [],
              disabled: [],
            },
          },
        },
        Tree: {
          name: '弹开树形控件配置',
          theme: {
            TreeWrap: {
              name: '树形控件外盒',
              desc: '配置树形组件的外盒样式',
              normal: [
                ['width'],
                ['height'],
                ['boxShadow'],
                ['background'],
                ['opacity'],
                ['border'],
                ['borderRadius'],
                ['margin'],
                ['padding'],
              ],
              hover: [['boxShadow'], ['background'], ['opacity'], ['border'], ['borderRadius']],
              clicked: [],
              disabled: [],
            },
            TreeItem: {
              name: '树形控件项配置',
              theme: {
                TreeItemWrap: {
                  name: '项的外盒',
                  desc: '配置每一项的外盒',
                  normal: [
                    ['background'],
                    ['border'],
                    ['borderRadius'],
                    ['opacity'],
                    ['color'],
                    ['padding'],
                  ],
                  hover: [['background'], ['border'], ['borderRadius'], ['opacity'], ['color']],
                  active: [['background'], ['border'], ['borderRadius'], ['opacity'], ['color']],
                  disabled: [],
                },
                SelectedTreeItemWrap: {
                  name: '选中项的外盒',
                  desc: '配置选中项的外盒',
                  normal: [
                    ['background'],
                    ['border'],
                    ['borderRadius'],
                    ['opacity'],
                    ['color'],
                    ['padding'],
                  ],
                  hover: [['background'], ['border'], ['borderRadius'], ['opacity'], ['color']],
                  active: [['background'], ['border'], ['borderRadius'], ['opacity'], ['color']],
                  disabled: [],
                },
                Text: {
                  name: '项的文本',
                  desc: '配置每一项文本内容的样式',
                  normal: [
                    ['color'],
                    ['font'],
                    ['background'],
                    ['padding'],
                    ['border'],
                    ['borderRadius'],
                  ],
                  hover: [['color'], ['font'], ['background'], ['border'], ['borderRadius']],
                  active: [['color'], ['font'], ['background'], ['border'], ['borderRadius']],
                  disabled: [['color'], ['font'], ['background'], ['border'], ['borderRadius']],
                },
                SelectedText: {
                  name: '选中项的文本',
                  desc: '配置选中项文本内容的样式',
                  normal: [
                    ['color'],
                    ['font'],
                    ['background'],
                    ['padding'],
                    ['border'],
                    ['borderRadius'],
                  ],
                  hover: [['color'], ['font'], ['background'], ['border'], ['borderRadius']],
                  active: [['color'], ['font'], ['background'], ['border'], ['borderRadius']],
                  disabled: [['color'], ['font'], ['background'], ['border'], ['borderRadius']],
                },
                Switch: {
                  name: '控制器配置',
                  desc: '配置控制树节点展开或隐藏的控制器的样式',
                  normal: [['color'], ['font']],
                  hover: [['color'], ['font']],
                  active: [['color'], ['font']],
                  disabled: [['color'], ['font']],
                },
              },
            },
          },
        },
      },
      childrenWidget: [],
    },
    target: TreeSelect,
    screenshot:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAAAXNSR0IArs4c6QAABPVJREFUeAHtnE1oG0cUx2clraTapjg9BNxeDfWtF1966z2Qowk2reOE2AkkThE4vbnbgA9tPnDwoZEgYKWRD/YtEHzVrRe3pZfGoe0hhFZVyIfTJo5Wu/JknpIBab3yaJWdXVL9BcvMvjfznv377wfatyODiU+xWPzItu1LnPPPxO4I2fDRRqBiGEY5k8ksTE9P/2UQ/FqttiWMy0KAm3NzcxVtqRGY5fP5EcH6C8H6y2w2O24UCoU1weXX2dnZb8EnOgKC+1ci2ycJuuzQkR9damQiAsSc2NMpwYEkHgLEPhFPamSVBCCAJBFTCwFiAi/TQgBJIqYWAsQEXqaFAJJETC0EiAm8TAsBJImYWggQE3iZFgJIEj22C4vL6wtfLxe908lGPq/duw8BvEQC7o8MfzjNOfv4gnXNklOpTzbySVunNtXJAXt3BHK5iZeW9f3RF9z+8cLitT9plnjI9vlQIvMp+VRRcAaoCHXht6wzD1NG8oh4qnmJNuqTrYupDAJ0Q0njGAgQAlxxCTrs8sYdg7EF2qhPtm5CQ4BuKB0w5urV9fee79m3OTdufnfx/A+0UZ9s5DtgatMFAVSEFP7Kzt9Fw2D3Ll88/40cSn2ykU/aOraoiHVEo92Biph2xOoEuASpGWkdAQG04lUHhwBqRlpHQACteNXBIYCakdYREEArXnVwCKBmpHUEBNCKVx2cBKiIb2RYE6BmFeqIN8wrCfGuepneVw81OoIpCRDzJnss0FCyCnUAHfkEX1TNXi/QoOhYohQqY1WwtiVKqsHwgwAIgAAIgAAIgMD/k4B4iyLaz/b29oGrMsfGxpp/U1zjoqXB8GJW1MC9+fAwzksk4n0IEDFwb7rAb0eXSqVD9foArw86vtfy9AvTSKd3jampqafeZNjfTyCwACw1lMuY7FyGZZ/vDydezR7kg4wPrQjfop8ftnYCgQWo7z5ZSg98MCpevTvWHur1nsHZrUfV+0t+Ptj2Ewh8D5iZmak9rt4/Lh6nlrzhOOM3/tv558T8/Lzt9WHfn0BgASgMARYinGwVYY+z/O+//XJa/OCT458KVj8CPQlAgUiEqmGfEiJcF2tyrvxx9+ezlmW5fklg60wg8D2gNVRuorkG6kyrDf1gBHo+A4KlwehOBCBAJzIR2SFARKCRBgRAAARAAARAAARAoJVA5DXh1uRv019bv+1bj5AxJyeONv+3sMfJ+GG1+B4QFske40CAHsGFNQ0ChEWyxzhv9TS0l5xHJicPmbtpbppp32u449QNZ6Bu3Flb64uacuQCmG4yxzLuOZc1fGvKLMMGTTfRNzXlyAUYHkguPXvZGE2a5rGG216/SaZSzHXdW/bh4b6pKUd+D1hdXa3V/n10vOE4pUQyST9w19yo7zrOjQfvZ09srqz0TU05cgHovrG5uWkLEU6Ko72USpksJY78PdfJ71QfnP6pUOirmnIsAkgR0nu1U+JMuC6EuPK0Onq2XC63X5N6ucu/Y3Mivwe08tnY2KDf1ezrmnJsZ0CrEP3chwAxqw8BYhYA6UEABEAABEAABECgPwm8szXhbuXa2tryrTvI+ePj400GYY+T8VUtvgeoCGn2QwDNgFXhIYCKkGY/BNAMWBUeAqgIafZDAM2AVeEhgIqQZj8E0AxYFR4CqAhp9kMAzYBV4SGAipBmPwTQDFgVHgKoCGn2vwI8ZJYTBLgZjgAAAABJRU5ErkJggg==',
  },
  {
    meta: {
      widgetName: 'TreeSelect',
      title: '多项树形选择',
      desc: '支持多项树形选择',
      props: {
        validateStatus: {
          type: 'ValidateStatus',
          desc: "input校验状态, 'success' 成功 | 'error'错误",
          defaultValue: 'success',
        },
        data: {
          type: 'Array<Object>',
          desc: '生成选择项的数据',
          meta: [
            { key: 'value', title: 'value值', type: 'string' },
            { key: 'text', title: '文本值', type: 'string' },
          ],
          defaultValue: false,
        },
        createPortal: { type: 'boolean', desc: '是否全局弹出下拉框', defaultValue: true },
        valueField: { type: 'string', desc: 'data数据的value值的名称', defaultValue: 'value' },
        displayField: {
          type: 'string',
          desc: 'data数据的displayValue值的名称',
          defaultValue: 'text',
        },
        translateTreeData: {
          type: 'boolean',
          desc: '是否开启嵌套数据生成Tree',
          defaultValue: false,
        },
        start: { type: 'number', desc: '开始展示数据的索引值', defaultValue: 0 },
        query: { type: 'string', desc: '搜索框关键字', defaultValue: '' },
        mutliple: { type: 'boolean', desc: '是否多选', defaultValue: true },
        limitCount: { type: 'number', desc: '多选时的最大选中数', defaultValue: 999999 },
        expandAll: { type: 'boolean', desc: '是否展开所有子元素', defaultValue: false },
        onlySelectLeaf: { type: 'boolean', desc: '是否只能选择根节点选项', defaultValue: true },
        label: { type: 'string', desc: '标注文本' },
        value: {
          type: 'string | string[] | number | number[]',
          desc: '指定当前选中的条目的valueField值',
        },
        displayValue: {
          type: 'string | string[] | number | number[]',
          desc: '指定当前选中的条目的displayField值',
        },
        disabled: { type: 'boolean', desc: '是否禁选', defaultValue: false },
        placeholder: { type: 'string', desc: '占位符' },
        mode: {
          type: 'local | remote',
          desc: '指定检索是本地检索还是远程检索',
          defaultValue: 'local',
        },
        canSearch: { type: 'boolean', desc: '是否支持查询', defaultValue: false },
        throttle: { type: 'number', desc: '检索数据的延迟,单位为毫秒', defaultValue: 200 },
        canInput: {
          type: 'boolean',
          desc: '是否支持自定义值,只有在canSearch为true时才生效',
          defaultValue: false,
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
      theme: {
        InputTag: {
          name: '多选树形选择的展示框',
          theme: {
            InputTagWrap: {
              name: '展示框的外盒',
              desc: '配置展示选中数据的外盒样式',
              normal: [
                ['width'],
                ['height'],
                ['margin'],
                ['padding'],
                ['color'],
                ['background'],
                ['border'],
                ['boxShadow'],
                ['borderRadius'],
                ['font'],
                ['opacity'],
              ],
              hover: [
                ['color'],
                ['background'],
                ['border'],
                ['boxShadow'],
                ['borderRadius'],
                ['font'],
                ['opacity'],
              ],
              active: [],
              disabled: [],
            },
            SwitchIcon: {
              name: '下拉图标',
              desc: '配置下拉或清除按钮的图标样式',
              normal: [['margin'], ['padding'], ['color'], ['font'], ['opacity']],
              hover: [['color'], ['font'], ['opacity']],
              active: [],
              disabled: [],
            },
            TagWrap: {
              name: '标签',
              desc: '配置展示选中项的标签样式',
              normal: [
                ['width'],
                ['height'],
                ['background'],
                ['color'],
                ['font'],
                ['fontSize'],
                ['border'],
                ['borderRadius'],
                ['boxShadow'],
                ['opacity'],
                ['padding', 'left'],
                ['padding', 'right'],
                ['margin', 'left'],
                ['margin', 'right'],
              ],
              hover: [
                ['background'],
                ['color'],
                ['borderRadius'],
                ['border'],
                ['font'],
                ['opacity'],
                ['boxShadow'],
              ],
              active: [],
              disabled: [],
            },
            TagIcon: {
              name: '标签删除按钮',
              desc: '配置标签删除按钮样式',
              normal: [['color'], ['font'], ['fontSize'], ['opacity']],
              hover: [['color'], ['font'], ['fontSize'], ['opacity']],
              active: [],
              disabled: [],
            },
            Menu: {
              name: '多选展示框的弹开菜单',
              theme: {
                MenuWrap: {
                  name: '菜单外盒',
                  desc: '配置菜单组件的外盒样式',
                  normal: [
                    ['width'],
                    ['height'],
                    ['boxShadow'],
                    ['background'],
                    ['opacity'],
                    ['border'],
                    ['borderRadius'],
                    ['margin'],
                    ['padding'],
                  ],
                  hover: [['boxShadow'], ['background'], ['opacity'], ['border'], ['borderRadius']],
                  clicked: [],
                  disabled: [],
                },
                MenuItem: {
                  name: '菜单项的配置',
                  theme: {
                    MenuItemWrap: {
                      name: '项的外盒',
                      desc: '配置每一项的外盒',
                      normal: [
                        ['height'],
                        ['background'],
                        ['border'],
                        ['borderRadius'],
                        ['opacity'],
                        ['color'],
                        ['padding'],
                      ],
                      hover: [
                        ['background'],
                        ['border'],
                        ['borderRadius'],
                        ['opacity'],
                        ['color'],
                        ['font'],
                      ],
                      active: [
                        ['background'],
                        ['border'],
                        ['borderRadius'],
                        ['opacity'],
                        ['color'],
                        ['font'],
                      ],
                    },
                  },
                },
              },
            },
          },
        },
        Tree: {
          name: '弹开树形控件配置',
          theme: {
            TreeWrap: {
              name: '树形控件外盒',
              desc: '配置树形组件的外盒样式',
              normal: [
                ['width'],
                ['height'],
                ['boxShadow'],
                ['background'],
                ['opacity'],
                ['border'],
                ['borderRadius'],
                ['margin'],
                ['padding'],
              ],
              hover: [['boxShadow'], ['background'], ['opacity'], ['border'], ['borderRadius']],
              clicked: [],
              disabled: [],
            },
            TreeItem: {
              name: '树形控件项配置',
              theme: {
                TreeItemWrap: {
                  name: '项的外盒',
                  desc: '配置每一项的外盒',
                  normal: [
                    ['background'],
                    ['border'],
                    ['borderRadius'],
                    ['opacity'],
                    ['color'],
                    ['padding'],
                  ],
                  hover: [['background'], ['border'], ['borderRadius'], ['opacity'], ['color']],
                  active: [['background'], ['border'], ['borderRadius'], ['opacity'], ['color']],
                  disabled: [],
                },
                SelectedTreeItemWrap: {
                  name: '选中项的外盒',
                  desc: '配置选中项的外盒',
                  normal: [
                    ['background'],
                    ['border'],
                    ['borderRadius'],
                    ['opacity'],
                    ['color'],
                    ['padding'],
                  ],
                  hover: [['background'], ['border'], ['borderRadius'], ['opacity'], ['color']],
                  active: [['background'], ['border'], ['borderRadius'], ['opacity'], ['color']],
                  disabled: [],
                },
                Text: {
                  name: '项的文本',
                  desc: '配置每一项文本内容的样式',
                  normal: [
                    ['color'],
                    ['font'],
                    ['background'],
                    ['padding'],
                    ['border'],
                    ['borderRadius'],
                  ],
                  hover: [['color'], ['font'], ['background'], ['border'], ['borderRadius']],
                  active: [['color'], ['font'], ['background'], ['border'], ['borderRadius']],
                  disabled: [['color'], ['font'], ['background'], ['border'], ['borderRadius']],
                },
                SelectedText: {
                  name: '选中项的文本',
                  desc: '配置选中项文本内容的样式',
                  normal: [
                    ['color'],
                    ['font'],
                    ['background'],
                    ['padding'],
                    ['border'],
                    ['borderRadius'],
                  ],
                  hover: [['color'], ['font'], ['background'], ['border'], ['borderRadius']],
                  active: [['color'], ['font'], ['background'], ['border'], ['borderRadius']],
                  disabled: [['color'], ['font'], ['background'], ['border'], ['borderRadius']],
                },
                Switch: {
                  name: '控制器配置',
                  desc: '配置控制树节点展开或隐藏的控制器的样式',
                  normal: [['color'], ['font']],
                  hover: [['color'], ['font']],
                  active: [['color'], ['font']],
                  disabled: [['color'], ['font']],
                },
              },
            },
          },
        },
      },
      childrenWidget: [],
      aliasName: 'MutlipleTreeSelect',
    },
    target: TreeSelect,
    screenshot:
      'data:image/png;base64,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',
  },
  {
    meta: {
      widgetName: 'Upload',
      title: '上传',
      desc: '上传组件,可通过文件选择和拖拽上传',
      props: {
        data: { type: 'object', desc: '上传时附带的额外参数' },
        areaType: {
          type: 'UploadType',
          desc: '文件列表的类型 支持5种类型(default/both/button/picture/area)',
          defaultValue: 'default',
        },
        disabled: { type: 'boolean', desc: '禁用状态', defaultValue: false },
        limit: { type: 'number', desc: '一次性可允许上传的最大文件数' },
        multiple: { type: 'boolean', desc: '是否允许多个文件上传', defaultValue: false },
        showFileList: { type: 'boolean', desc: '是否显示上传列表', defaultValue: false },
        fileList: {
          type: 'object[]',
          desc: "上传的文件列表,如 [{ id: 1, name: 'header.jpg', status: 'done' }]",
          meta: [
            { key: 'id', title: '文件唯一标识', type: 'number' },
            { key: 'name', title: '文件名', type: 'string' },
            { key: 'status', title: '文件传输状态', type: 'FileType' },
          ],
        },
        withCredentials: {
          type: 'boolean',
          desc: '上传请求时是否允许携带cookie凭证',
          defaultValue: false,
        },
        autoUpload: { type: 'boolean', desc: '是否允许自动上传', defaultValue: true },
        url: { type: 'string', desc: '上传的请求地址(必填参数)' },
        accept: { type: 'string', desc: '指定上传文件类型' },
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
        FileType: ['done', 'fail'],
      },
      category: ['数据录入'],
      designInfo: {
        ButtonTypeUpload: {
          sequence: 1,
          title: '按钮上传',
          desc: '按钮上传模式的配置项',
          props: { areaType: 'button' },
          theme: {
            UploadButtonType: {
              name: '按钮',
              desc: '按钮上传类型的样式配置',
              normal: [
                ['background'],
                ['width'],
                ['height'],
                ['boxShadow'],
                ['border'],
                ['opacity'],
              ],
              hover: [['background'], ['boxShadow'], ['border'], ['opacity']],
              disabled: [['background'], ['border']],
            },
            UploadList: {
              name: '上传列表',
              theme: {
                UploadLiType: {
                  name: '上传文件列表',
                  desc: '上传列表的行样式',
                  normal: [
                    ['width'],
                    ['height'],
                    ['background'],
                    ['border'],
                    ['color'],
                    ['fontSize'],
                  ],
                  hover: [['border'], ['background'], ['color']],
                },
                UploadListSuccessIcon: {
                  name: '上传成功图标样式',
                  desc: '上传成功时列表图标的样式',
                  normal: [['color'], ['fontSize']],
                },
                UploadListFailedIcon: {
                  name: '上传失败图标样式',
                  desc: '上传失败时列表图标的样式',
                  normal: [['color'], ['fontSize']],
                },
              },
            },
          },
        },
        PictureTypeUpload: {
          sequence: 2,
          title: '图片上传',
          desc: '图片上传模式的配置项，仅支持图片',
          props: { areaType: 'picture' },
          theme: {
            UploadPictureType: {
              name: '图片上传区域',
              desc: '图片上传类型的样式配置',
              normal: [['background'], ['width'], ['height'], ['opacity'], ['border']],
              hover: [['background'], ['opacity'], ['border']],
              disabled: [['background'], ['color'], ['border']],
            },
            UploadList: {
              name: '上传列表',
              theme: {
                UploadLiType: {
                  name: '上传文件列表',
                  desc: '上传列表的行样式',
                  normal: [
                    ['width'],
                    ['height'],
                    ['background'],
                    ['border'],
                    ['color'],
                    ['fontSize'],
                  ],
                  hover: [['border'], ['background'], ['color']],
                },
                UploadListSuccessIcon: {
                  name: '上传成功图标样式',
                  desc: '上传成功时列表图标的样式',
                  normal: [['color'], ['fontSize']],
                },
                UploadListFailedIcon: {
                  name: '上传失败图标样式',
                  desc: '上传失败时列表图标的样式',
                  normal: [['color'], ['fontSize']],
                },
              },
            },
          },
        },
        AreaTypeUpload: {
          sequence: 3,
          title: '区域拖拽上传',
          desc: '大面积区域拖拽上传模式的配置项',
          props: { areaType: 'area' },
          theme: {
            UploadAreaType: {
              name: '文件上传区域',
              desc: '区域拖拽上传类型的样式配置',
              normal: [['width'], ['height'], ['fontSize'], ['color']],
              disabled: [['color']],
            },
            UploadList: {
              name: '上传列表',
              theme: {
                UploadLiType: {
                  name: '上传文件列表',
                  desc: '上传列表的行样式',
                  normal: [
                    ['width'],
                    ['height'],
                    ['background'],
                    ['border'],
                    ['color'],
                    ['fontSize'],
                  ],
                  hover: [['border'], ['background'], ['color']],
                },
                UploadListSuccessIcon: {
                  name: '上传成功图标样式',
                  desc: '上传成功时列表图标的样式',
                  normal: [['color'], ['fontSize']],
                },
                UploadListFailedIcon: {
                  name: '上传失败图标样式',
                  desc: '上传失败时列表图标的样式',
                  normal: [['color'], ['fontSize']],
                },
              },
            },
          },
        },
        BothTypeUpload: {
          sequence: 4,
          title: '带按钮的拖拽上传',
          desc: '带按钮的拖拽上传模式的配置项',
          props: { areaType: 'both' },
          theme: {
            UploadButtonType: {
              name: '按钮',
              desc: '按钮部分的样式配置',
              normal: [['width'], ['height'], ['fontSize'], ['color']],
              disabled: [['color']],
            },
            UploadDefaultType: {
              name: '文件上传区域',
              desc: '默认上传框的样式',
              normal: [['width'], ['height'], ['boxShadow'], ['border']],
              hover: [['boxShadow'], ['border']],
              disabled: [['border'], ['cursor']],
            },
            UploadList: {
              name: '上传列表',
              theme: {
                UploadLiType: {
                  name: '上传文件列表',
                  desc: '上传列表的行样式',
                  normal: [
                    ['width'],
                    ['height'],
                    ['background'],
                    ['border'],
                    ['color'],
                    ['fontSize'],
                  ],
                  hover: [['border'], ['background'], ['color']],
                },
                UploadListSuccessIcon: {
                  name: '上传成功图标样式',
                  desc: '上传成功时列表图标的样式',
                  normal: [['color'], ['fontSize']],
                },
                UploadListFailedIcon: {
                  name: '上传失败图标样式',
                  desc: '上传失败时列表图标的样式',
                  normal: [['color'], ['fontSize']],
                },
              },
            },
          },
        },
      },
      theme: {
        UploadDefaultType: {
          name: '文件上传区域',
          desc: '默认上传框的样式',
          normal: [['width'], ['height'], ['boxShadow'], ['border']],
          hover: [['boxShadow'], ['border']],
          disabled: [['border'], ['cursor']],
        },
        UploadList: {
          name: '上传列表',
          theme: {
            UploadLiType: {
              name: '上传文件列表',
              desc: '上传列表的行样式',
              normal: [['width'], ['height'], ['background'], ['border'], ['color'], ['fontSize']],
              hover: [['border'], ['background'], ['color']],
            },
            UploadListSuccessIcon: {
              name: '上传成功图标样式',
              desc: '上传成功时列表图标的样式',
              normal: [['color'], ['fontSize']],
            },
            UploadListFailedIcon: {
              name: '上传失败图标样式',
              desc: '上传失败时列表图标的样式',
              normal: [['color'], ['fontSize']],
            },
          },
        },
      },
      childrenWidget: [],
    },
    target: Upload,
    screenshot:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGIAAAAoCAYAAAAFZi8EAAAAAXNSR0IArs4c6QAAAmJJREFUaAXtm7FuGkEQhucACWiOElmxhWPSnAtbjniAlFi8Q0p4gjxElMYtdORBYpc2smwJXFDYMhAkg6CBCAHV+eYsQrQ6eZfodjmhf6QTt7OzM+vvZxc3Y5Fn9Xr9w3K5/OG67hdvuMc+mF4CqVSKstksnZ19pnQ6TRaLsFgsbi3LuvCE+FmpVF70bmE72afTP+52KgdXnc/n1Ok8U7vdpmLxnBJ8EliEcrn8PXgJvDoI8ClwnGM/9f39HcX4OuKToKMYcsoJHB5+pOFwSDEvdG9XryM5hu1H8Mnwfhp8Iba/G+wAQkTlO8BXEywCBCBEBETgLUAICBERAhHZBk4EhIgIgQ230Wq1iJ+wLRF2wl3O1+126eHhTQTbtimXy4X25+JqUkQ5Ho/p5ub6bzS/sy8sgxCKJEejER0d5Skej/sPv7MvLMPVpEjScRw/stfreZ8uFQoFxZVqYTgRapy0R0EI7YjVCkAINU7aoyCEdsRqBSCEGiftURBCQPz09Ej9/m/Bqz7ktZxjU8O/rwKxRqNBmUyG9vcPhJm34enpSaB/5Ww2mzSZTCif/7RyKX1CCCVM66BNAa9Xvv+Gq+l9PsZmcSICUM9mM7q8/BUwI3fx2v8xCCFQs+0MTacTGgwGwoz6kHNsahBCIFYqlQSPmSF+I8xwllaBEFJEZgIghBnO0ioQQorITACEMMNZWgVCSBGZCYAQZjhLq7AQL9VqFX1zUlR6AriFi/vpYl7b1pX3fNVTBlllBLiPjpsaE8lk8hs3M9ZqNdrlZkYZENPzYjOjxRtAe69pGci/jv5t730FH5Cl9CKkbTsAAAAASUVORK5CYII=',
  },
  {
    meta: {
      widgetName: 'Upload',
      title: '按钮上传',
      desc: '按钮上传模式的配置项',
      props: {
        data: { type: 'object', desc: '上传时附带的额外参数' },
        areaType: {
          type: 'UploadType',
          desc: '文件列表的类型 支持5种类型(default/both/button/picture/area)',
          defaultValue: 'button',
        },
        disabled: { type: 'boolean', desc: '禁用状态', defaultValue: false },
        limit: { type: 'number', desc: '一次性可允许上传的最大文件数' },
        multiple: { type: 'boolean', desc: '是否允许多个文件上传', defaultValue: false },
        showFileList: { type: 'boolean', desc: '是否显示上传列表', defaultValue: false },
        fileList: {
          type: 'object[]',
          desc: "上传的文件列表,如 [{ id: 1, name: 'header.jpg', status: 'done' }]",
          meta: [
            { key: 'id', title: '文件唯一标识', type: 'number' },
            { key: 'name', title: '文件名', type: 'string' },
            { key: 'status', title: '文件传输状态', type: 'FileType' },
          ],
        },
        withCredentials: {
          type: 'boolean',
          desc: '上传请求时是否允许携带cookie凭证',
          defaultValue: false,
        },
        autoUpload: { type: 'boolean', desc: '是否允许自动上传', defaultValue: true },
        url: { type: 'string', desc: '上传的请求地址(必填参数)' },
        accept: { type: 'string', desc: '指定上传文件类型' },
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
        FileType: ['done', 'fail'],
      },
      category: ['数据录入'],
      theme: {
        UploadButtonType: {
          name: '按钮',
          desc: '按钮上传类型的样式配置',
          normal: [['background'], ['width'], ['height'], ['boxShadow'], ['border'], ['opacity']],
          hover: [['background'], ['boxShadow'], ['border'], ['opacity']],
          disabled: [['background'], ['border']],
        },
        UploadList: {
          name: '上传列表',
          theme: {
            UploadLiType: {
              name: '上传文件列表',
              desc: '上传列表的行样式',
              normal: [['width'], ['height'], ['background'], ['border'], ['color'], ['fontSize']],
              hover: [['border'], ['background'], ['color']],
            },
            UploadListSuccessIcon: {
              name: '上传成功图标样式',
              desc: '上传成功时列表图标的样式',
              normal: [['color'], ['fontSize']],
            },
            UploadListFailedIcon: {
              name: '上传失败图标样式',
              desc: '上传失败时列表图标的样式',
              normal: [['color'], ['fontSize']],
            },
          },
        },
      },
      childrenWidget: [],
      aliasName: 'ButtonTypeUpload',
    },
    target: Upload,
    screenshot:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAAAoCAYAAAABk/85AAAAAXNSR0IArs4c6QAABC1JREFUaAXtm1tolEcUx3+75mJsLbUqWg1qsQ+mBWNBqaBiqLb40FYbKwUVbTAURaRGSLBBEC9YbfvijfQhQksLVh98EH3yJRQfLC2W1ntLgsZ4qXejQdHoeo6zy7fL7vclu/Hb+br5DiQ7c87MmZn/mTlzziQbQai6NlbeDd9IsSoW43XlheQPApEIV0RzSxE0HGiOdEQU/MfwFzFe82fIUGtGBCLcKobK6POdH4KfESNfmYK5Yh+VQap8HShU7oVAVTT0+V74+CtT7PUEhGQRgdAAFsHXoUMDhAawjIDl4QN3AirehElv9Q2VcpdUclw5qP4gUeAMMO8DWFKdO0RlpfBdI3z+abqOxZ/AwrnpfJucwBmgr2DMmg6DyuDX39I1VYyHM/+m821y5EmicEjeWfjwPThxFtouSpr5lbO2AQNg8Mswc6q4uLcdfqK0/xD8cSJRy99nQRlg8kQYNQL27DMAduizV5zeGAOP5dHr1D8JTupn14PUer5qBWOAkhKoEb//3w34/W8D344fHBgbV8LdTkjmOVJ7pUAaQMEcPdIdlOs34ZHs5mSq/Qw0+jnbarh6GUfiN5y6n8oK2H/Y3A/J/ZLLDx/C01gyx/9yIA0wZhQ0bXZffP0WONfmyKe+A3NmCnhPHd6ujTB8qFPX0tL55ieV69TqNkHrBaeej1IgDXDpKuz80X357Zcc2auvwKqlcFJ8+/0u0LrS7p+gRB7clarnQLGsdJ9ctF509ZqX1B9ZIA3wQFzB6SzCxbv3YctuWLHIAen4SVMuFXe2ehk074VjfzryoJQCaYBswLkjF+varWb3Z+o3bbLZ/a3tMHJ4phaGp5e3PA/nnf73BlDEOuUEuNHsacYA29e7tTD8Ravhnoce7965SwvCAF7Lb5acQBO0TFQk0dGXNaCnqEvuDxtU8AZoE9eTidQoa2qhrAwav81/+JmYUzxSTlQL73PEMLmg6+UJ4l3QfEBJ34rWrYKJE2DTdnMCjCT/vwv+BGgUpHdEnURCNQvgyFGYMcXkDJpPXJOkziZZMcDY0VDkMvJLg2CgZLHjx3rD8uQJnO/wbqPS9suwtclEQB/PhnnvQ6no/+Ug3Ljdc3+/W0Q+Wpb/4GvPtvQsNduFdt6DxXWpveq/MHobvk7lJ9eGDgF9ttDw9IIkdE0/Z5dzJOt6EWWXffgiVLvr2CB+tziepbq38pboCciFbsqu3/a9+avbckncyuXNKZukL5cxvfpYOQFeE+qLTMNKJLrpln856w1p++4cDdkb/b1pY+UE9GZiubTJFsxs2+cyp576FHwY2hMAtuWhASxbIDRAaADLCFgePjwBoQEsI2B5+Gj8O0uWp9E/h1fs1QW19M/lB2LVLVHJxBoke7wViOn0p0kI5op9VL8qKc8ylXIc9obuyP8doBgr1oq5Yv8MBondA5KVCuQAAAAASUVORK5CYII=',
  },
  {
    meta: {
      widgetName: 'Upload',
      title: '图片上传',
      desc: '图片上传模式的配置项，仅支持图片',
      props: {
        data: { type: 'object', desc: '上传时附带的额外参数' },
        areaType: {
          type: 'UploadType',
          desc: '文件列表的类型 支持5种类型(default/both/button/picture/area)',
          defaultValue: 'picture',
        },
        disabled: { type: 'boolean', desc: '禁用状态', defaultValue: false },
        limit: { type: 'number', desc: '一次性可允许上传的最大文件数' },
        multiple: { type: 'boolean', desc: '是否允许多个文件上传', defaultValue: false },
        showFileList: { type: 'boolean', desc: '是否显示上传列表', defaultValue: false },
        fileList: {
          type: 'object[]',
          desc: "上传的文件列表,如 [{ id: 1, name: 'header.jpg', status: 'done' }]",
          meta: [
            { key: 'id', title: '文件唯一标识', type: 'number' },
            { key: 'name', title: '文件名', type: 'string' },
            { key: 'status', title: '文件传输状态', type: 'FileType' },
          ],
        },
        withCredentials: {
          type: 'boolean',
          desc: '上传请求时是否允许携带cookie凭证',
          defaultValue: false,
        },
        autoUpload: { type: 'boolean', desc: '是否允许自动上传', defaultValue: true },
        url: { type: 'string', desc: '上传的请求地址(必填参数)' },
        accept: { type: 'string', desc: '指定上传文件类型' },
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
        FileType: ['done', 'fail'],
      },
      category: ['数据录入'],
      theme: {
        UploadPictureType: {
          name: '图片上传区域',
          desc: '图片上传类型的样式配置',
          normal: [['background'], ['width'], ['height'], ['opacity'], ['border']],
          hover: [['background'], ['opacity'], ['border']],
          disabled: [['background'], ['color'], ['border']],
        },
        UploadList: {
          name: '上传列表',
          theme: {
            UploadLiType: {
              name: '上传文件列表',
              desc: '上传列表的行样式',
              normal: [['width'], ['height'], ['background'], ['border'], ['color'], ['fontSize']],
              hover: [['border'], ['background'], ['color']],
            },
            UploadListSuccessIcon: {
              name: '上传成功图标样式',
              desc: '上传成功时列表图标的样式',
              normal: [['color'], ['fontSize']],
            },
            UploadListFailedIcon: {
              name: '上传失败图标样式',
              desc: '上传失败时列表图标的样式',
              normal: [['color'], ['fontSize']],
            },
          },
        },
      },
      childrenWidget: [],
      aliasName: 'PictureTypeUpload',
    },
    target: Upload,
    screenshot:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAAAXNSR0IArs4c6QAAAsNJREFUaAXtm7+LE0EUx7ObTUi0spAgHHrCCcErrrE+/wQLO4tIQn7AXXNcoeBfIFhZXJFfBi20Ew78B7S2EPW000gOT0VLLUKS9fNC5oplU8Tcze6OMzDMzpvdfe/73nx3dt8kqRSl1+vlpG2329vNZtOXKn0pBvS/tlqtPd/3HcHjAnJlOBx+7HQ6a5PJ5IcIDSsXHMd5TQWz7zoAvgHQPQT79Xp92zCwMntXC4XC0WAw2ALj+jTMTNtMPp/Plkql36YBFjwE9TLRfUcdpJjfj6WaCDQMkwfq0mzgdtgJpsh4Rl0SLJ7rukYDVQEbj8d9OZ5yWAlNbqFtf4rPctjQMFsOGxrYY1iWw7jC6OXJcvh4sht6YDlsOWzY1Lbv0oYFdC4c+z081zUJH4iUw7MM6VXP895XKpVPOnyp1mFPvodFIRlLba+WZElvklq6PxqNdlD9UAdg8K2KHsthHd6OQofisFer1Z5EYYBunSThv4jOSDisG6zo08Jh+QbFs+eDAJleKzPZxW63ey04zkPtGzPvMChfpq/lexhg9zCyPs9QntS7PKl3Q8YfILsTIv9nkRYOk+R/C6gXQSuRrSErEv0D2s/BcfofQmRLiRSHnSjWYXTelXUYI3bglpZ1WHnLrsPKE6a1WjgcJ6cpDtt1WEdU8PZP9BzQ/tKhT3RoWYfngeGlosuYVG1FcdjuD2tzeUSK7DockeNPXa3l8Km7OCYKLIdjEogTN8Ny+MRdGtMbWg7HNDBLm2U5vLQLE3IDy+GEBGphM/9bDjv8weMR7ipms9lb5XK5v7DrEnABOXCXdNJETJVE/FME+VwuV+X/S7Kb+D0BGBYyEYzPuOAcvzjYkgifaTQaf9jU2mCf5006nb5erVZfIX/JSZtJ72cymXX4WySobaK84QpYcRfCTZojOTapEMSzzNrn7HNdoT38C3EgHuewecblAAAAAElFTkSuQmCC',
  },
  {
    meta: {
      widgetName: 'Upload',
      title: '区域拖拽上传',
      desc: '大面积区域拖拽上传模式的配置项',
      props: {
        data: { type: 'object', desc: '上传时附带的额外参数' },
        areaType: {
          type: 'UploadType',
          desc: '文件列表的类型 支持5种类型(default/both/button/picture/area)',
          defaultValue: 'area',
        },
        disabled: { type: 'boolean', desc: '禁用状态', defaultValue: false },
        limit: { type: 'number', desc: '一次性可允许上传的最大文件数' },
        multiple: { type: 'boolean', desc: '是否允许多个文件上传', defaultValue: false },
        showFileList: { type: 'boolean', desc: '是否显示上传列表', defaultValue: false },
        fileList: {
          type: 'object[]',
          desc: "上传的文件列表,如 [{ id: 1, name: 'header.jpg', status: 'done' }]",
          meta: [
            { key: 'id', title: '文件唯一标识', type: 'number' },
            { key: 'name', title: '文件名', type: 'string' },
            { key: 'status', title: '文件传输状态', type: 'FileType' },
          ],
        },
        withCredentials: {
          type: 'boolean',
          desc: '上传请求时是否允许携带cookie凭证',
          defaultValue: false,
        },
        autoUpload: { type: 'boolean', desc: '是否允许自动上传', defaultValue: true },
        url: { type: 'string', desc: '上传的请求地址(必填参数)' },
        accept: { type: 'string', desc: '指定上传文件类型' },
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
        FileType: ['done', 'fail'],
      },
      category: ['数据录入'],
      theme: {
        UploadAreaType: {
          name: '文件上传区域',
          desc: '区域拖拽上传类型的样式配置',
          normal: [['width'], ['height'], ['fontSize'], ['color']],
          disabled: [['color']],
        },
        UploadList: {
          name: '上传列表',
          theme: {
            UploadLiType: {
              name: '上传文件列表',
              desc: '上传列表的行样式',
              normal: [['width'], ['height'], ['background'], ['border'], ['color'], ['fontSize']],
              hover: [['border'], ['background'], ['color']],
            },
            UploadListSuccessIcon: {
              name: '上传成功图标样式',
              desc: '上传成功时列表图标的样式',
              normal: [['color'], ['fontSize']],
            },
            UploadListFailedIcon: {
              name: '上传失败图标样式',
              desc: '上传失败时列表图标的样式',
              normal: [['color'], ['fontSize']],
            },
          },
        },
      },
      childrenWidget: [],
      aliasName: 'AreaTypeUpload',
    },
    target: Upload,
    screenshot:
      'data:image/png;base64,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',
  },
  {
    meta: {
      widgetName: 'Upload',
      title: '带按钮的拖拽上传',
      desc: '带按钮的拖拽上传模式的配置项',
      props: {
        data: { type: 'object', desc: '上传时附带的额外参数' },
        areaType: {
          type: 'UploadType',
          desc: '文件列表的类型 支持5种类型(default/both/button/picture/area)',
          defaultValue: 'both',
        },
        disabled: { type: 'boolean', desc: '禁用状态', defaultValue: false },
        limit: { type: 'number', desc: '一次性可允许上传的最大文件数' },
        multiple: { type: 'boolean', desc: '是否允许多个文件上传', defaultValue: false },
        showFileList: { type: 'boolean', desc: '是否显示上传列表', defaultValue: false },
        fileList: {
          type: 'object[]',
          desc: "上传的文件列表,如 [{ id: 1, name: 'header.jpg', status: 'done' }]",
          meta: [
            { key: 'id', title: '文件唯一标识', type: 'number' },
            { key: 'name', title: '文件名', type: 'string' },
            { key: 'status', title: '文件传输状态', type: 'FileType' },
          ],
        },
        withCredentials: {
          type: 'boolean',
          desc: '上传请求时是否允许携带cookie凭证',
          defaultValue: false,
        },
        autoUpload: { type: 'boolean', desc: '是否允许自动上传', defaultValue: true },
        url: { type: 'string', desc: '上传的请求地址(必填参数)' },
        accept: { type: 'string', desc: '指定上传文件类型' },
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
        FileType: ['done', 'fail'],
      },
      category: ['数据录入'],
      theme: {
        UploadButtonType: {
          name: '按钮',
          desc: '按钮部分的样式配置',
          normal: [['width'], ['height'], ['fontSize'], ['color']],
          disabled: [['color']],
        },
        UploadDefaultType: {
          name: '文件上传区域',
          desc: '默认上传框的样式',
          normal: [['width'], ['height'], ['boxShadow'], ['border']],
          hover: [['boxShadow'], ['border']],
          disabled: [['border'], ['cursor']],
        },
        UploadList: {
          name: '上传列表',
          theme: {
            UploadLiType: {
              name: '上传文件列表',
              desc: '上传列表的行样式',
              normal: [['width'], ['height'], ['background'], ['border'], ['color'], ['fontSize']],
              hover: [['border'], ['background'], ['color']],
            },
            UploadListSuccessIcon: {
              name: '上传成功图标样式',
              desc: '上传成功时列表图标的样式',
              normal: [['color'], ['fontSize']],
            },
            UploadListFailedIcon: {
              name: '上传失败图标样式',
              desc: '上传失败时列表图标的样式',
              normal: [['color'], ['fontSize']],
            },
          },
        },
      },
      childrenWidget: [],
      aliasName: 'BothTypeUpload',
    },
    target: Upload,
    screenshot:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGoAAAAoCAYAAAAWsW/wAAAAAXNSR0IArs4c6QAAAtVJREFUeAHtXM9rE1EQ/l6IJGcpmFiLeKgHPYhSBBElF/Gm4E0PBkGSgyh6aI+Cx9aLRxO8pCjeqnjzxyFUQRAR/BNEY3LynLSFdaa7wZA+X7PLe+zbZea0nTcz+8339b0N204UyDqdzvxoNHocBEGNfqyyL4fWV0p1S6XScr1e7+n6u3Y7OLIDrNFaLQjS5UEp9AlHtwisbDxTvxSLNBwOv1ITT0io9WazyQG5s1arVaUeb1KP98vl8tK0WCzSNvAdAQ561bzCnwPAqSLvJBap0WisegXQMpjoF3C13W6De6byNyZvsbuTfBOJARKmHYW1Ah93vJMmQef5mnvlnjU96nyasFRctQLdtprX405HadTrnudw2s8kHdaxj7GxUGIZYECEyoBIDFGEEqEywkBGYMqOEqEywkBGYMqOyohQ9CrJbIPBIDBHhKuVSkXxlev4WbCkGXP9Snj3l2/sothXKLu3y3e1i2eBsVC9AbD5xV6/cvRZ4vL4MeDerX/F+Jp9tkyEssTkiUXgwydgi17Bj7bCa/bZMjn6LDH5+l1Y6PwSvfCmp/rTF5YKR2VkR9nl01k1EcoZtXYLi1B2+XRWTYRyRq3dwiKUXT6dVROhYlJ76QJw7kzMpIlwzuUacU0+nsdk7G4d+NEDPn/TJz5/FX4816/Sf9RcBY7OA+8//i9C7xeh9Lwk9r7dTJxqTJSjz0iPP4uyoxJocWgOePQgQSKlcG4SE6FisvbzN7BwGDh9MmbiRDjXiGv7CjX+O9OshV3Hz4rDVdydh64qm+vKM8rMjzerIpQ3UpiBiFBmfrxZFaG8kcIMRIQy8+PNqgjljRRmICKUmR9vVlmoPo9NeoPIMZCo1z3jr9HMrOO7JyvP2Ao8gMyzrclKZC+Le+WeNch1Pk1YKq5ukafEediaZ1t5bDKv04fTw9bTdNMrmpVthcs+DlszNsWA5esLQtl8/vqCv5ouyP4AgUX3AAAAAElFTkSuQmCC',
  },
];
