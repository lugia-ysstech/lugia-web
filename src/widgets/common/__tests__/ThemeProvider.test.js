//@flow

import * as React from 'react';
import chai from 'chai';
import ThemeProvider from '../../theme-provider';
import Theme from '../../theme/index';

import renderer from 'react-test-renderer';
import Enzyme, { mount, shallow, } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { createTestComponent, } from '@lugia/react-test-utils';

const { expect: exp, } = chai;
Enzyme.configure({ adapter: new Adapter(), });

describe('ThemeProvider', () => {
  const WidgetName = 'ligx';
  const TestTarget = ThemeProvider(class  extends React.Component<any, any> {

    constructor (props: any) {
      super(props);
      this.state = { theme: props.getTheme(), };
    }

    render () {
      return <div>hello</div>;
    }
  }, WidgetName);

  it('ThemeProvider', () => {

    const TestComponent = ThemeProvider(class  extends React.Component<any> {
      static displayName = 'ThemeProviderTest';

      render () {
        return <div>{JSON.stringify(this.props.getTheme())}{this.props.children}</div>;
      }
    }, WidgetName);

    const config = { ligx: { value: '正念', }, };
    const cmp = renderer.create(<Theme config={config}><TestComponent>hello everyone</TestComponent></Theme>);
    expect(cmp).toMatchSnapshot();
  });

  it('ThemeProvider A B  B级可以拿到A级的配置通过svThemeConfigTree 属性 未存在重叠配置的情况', () => {
    const name = WidgetName;
    const oneConfig = { kxy: { value: '无我', }, };
    const twoConfig = { [name]: { value: '正念', }, };


    const TestComponent = class  extends React.Component<any> {
      static displayName = 'ThemeProviderTest';
      state: any;
      lgx: Object;


      render () {
        const getCmp: Function = (cmp: Object) => {
          this.lgx = cmp;
        };
        return <Theme config={oneConfig}>
          <Theme config={twoConfig}>
            <TestTarget ref={getCmp}>hello
              everyone</TestTarget>
          </Theme>
        </Theme>;
      }
    };

    const Target = createTestComponent(TestComponent, target => {


      const theme = target.lgx.getThemeTarget().props.getTheme();
      const expectResult = { ...twoConfig.ligx, svThemeConfigTree: Object.assign({}, oneConfig, twoConfig), };
      exp(theme).to.be.eql(expectResult);
    });
    mount(<Target/>);

  });

  it('ThemeProvider A B C self 级配置 ', () => {
    const name = WidgetName;
    const A = { a: { value: '苦', }, };
    const B = { b: { value: '集', }, };
    const C = { c: { value: '灭', }, };
    const D = { [name]: { value: '道', }, };


    const TestComponent = class  extends React.Component<any> {
      static displayName = 'ThemeProviderTest';
      state: any;
      lgx: Object;


      render () {
        const getCmp: Function = (cmp: Object) => {
          this.lgx = cmp;
        };
        return <Theme config={A}>
          <Theme config={B}>
            <Theme config={C}>
              <Theme config={D}>
                <TestTarget ref={getCmp}>hello
                  everyone</TestTarget>
              </Theme>
            </Theme>
          </Theme>
        </Theme>;
      }
    };

    const Target = createTestComponent(TestComponent, target => {


      const theme = target.lgx.getThemeTarget().props.getTheme();
      const expectResult = { ...D.ligx, svThemeConfigTree: Object.assign({}, A, B, C, D), };
      exp(theme).to.be.eql(expectResult);
    });
    mount(<Target/>);

  });

  it('ThemeProvider A B C D 级配置 无自己相关的配置', () => {
    const A = { a: { value: '苦', }, };
    const B = { b: { value: '集', }, };
    const C = { c: { value: '灭', }, };
    const D = { d: { value: '道', }, };


    const TestComponent = class  extends React.Component<any> {
      static displayName = 'ThemeProviderTest';
      state: any;
      lgx: Object;


      render () {
        const getCmp: Function = (cmp: Object) => {
          this.lgx = cmp;
        };
        return <Theme config={A}>
          <Theme config={B}>
            <Theme config={C}>
              <Theme config={D}>
                <TestTarget ref={getCmp}>hello
                  everyone</TestTarget>
              </Theme>
            </Theme>
          </Theme>
        </Theme>;
      }
    };

    const Target = createTestComponent(TestComponent, target => {


      const theme = target.lgx.getThemeTarget().props.getTheme();
      const expectResult = { svThemeConfigTree: Object.assign({}, A, B, C, D), };
      exp(theme).to.be.eql(expectResult);
    });
    mount(<Target/>);

  });

  it('ThemeProvider A A A A 级配置 无自己相关的配置', () => {
    const name = WidgetName;
    const A = { a: { value: '苦', }, };
    const B = { a: { value: '集', }, };
    const C = { a: { value: '灭', }, };
    const D = { a: { value: '道', }, };


    const TestComponent = class  extends React.Component<any> {
      static displayName = 'ThemeProviderTest';
      state: any;
      lgx: Object;


      render () {
        const getCmp: Function = (cmp: Object) => {
          this.lgx = cmp;
        };
        return <Theme config={A}>
          <Theme config={B}>
            <Theme config={C}>
              <Theme config={D}>
                <TestTarget ref={getCmp}>hello
                  everyone</TestTarget>
              </Theme>
            </Theme>
          </Theme>
        </Theme>;
      }
    };

    const Target = createTestComponent(TestComponent, target => {


      const theme = target.lgx.getThemeTarget().props.getTheme();
      const expectResult = { svThemeConfigTree: D, };
      exp(theme).to.be.eql(expectResult);
    });
    mount(<Target/>);

  });
  it('ThemeProvider A B B A 级配置 无自己相关的配置', () => {
    const name = WidgetName;
    const A = { a: { value: '苦', }, };
    const B = { b: { value: '集', }, };
    const C = { b: { value: '灭', }, };
    const D = { a: { value: '道', }, };


    const TestComponent = class  extends React.Component<any> {
      static displayName = 'ThemeProviderTest';
      state: any;
      lgx: Object;


      render () {
        const getCmp: Function = (cmp: Object) => {
          this.lgx = cmp;
        };
        return <Theme config={A}>
          <Theme config={B}>
            <Theme config={C}>
              <Theme config={D}>
                <TestTarget ref={getCmp}>hello
                  everyone</TestTarget>
              </Theme>
            </Theme>
          </Theme>
        </Theme>;
      }
    };

    const Target = createTestComponent(TestComponent, target => {


      const theme = target.lgx.getThemeTarget().props.getTheme();
      const expectResult = { svThemeConfigTree: { ...C, ...D, }, };
      exp(theme).to.be.eql(expectResult);
    });
    mount(<Target/>);
  });

  it('ThemeProvider A C B A 级配置 无自己相关的配置', () => {
    const name = WidgetName;
    const A = { a: { value: '苦', }, };
    const B = { c: { value: '集', }, };
    const C = { b: { value: '灭', }, };
    const D = { a: { value: '道', }, };


    const TestComponent = class  extends React.Component<any> {
      static displayName = 'ThemeProviderTest';
      state: any;
      lgx: Object;


      render () {
        const getCmp: Function = (cmp: Object) => {
          this.lgx = cmp;
        };
        return <Theme config={A}>
          <Theme config={B}>
            <Theme config={C}>
              <Theme config={D}>
                <TestTarget ref={getCmp}>hello
                  everyone</TestTarget>
              </Theme>
            </Theme>
          </Theme>
        </Theme>;
      }
    };

    const Target = createTestComponent(TestComponent, target => {


      const theme = target.lgx.getThemeTarget().props.getTheme();
      const expectResult = { svThemeConfigTree: { ...B, ...C, ...D, }, };
      exp(theme).to.be.eql(expectResult);
    });
    mount(<Target/>);
  });

  it('ThemeProvider A C B A 级配置 无自己相关的配置', () => {
    const A = { a: { value: '苦', }, };
    const B = { c: { value: '集', }, };
    const C = { b: { value: '灭', }, };
    const D = { a: { value: '道', }, };


    const TestComponent = class  extends React.Component<any> {
      static displayName = 'ThemeProviderTest';
      state: any;
      lgx: Object;


      render () {
        const getCmp: Function = (cmp: Object) => {
          this.lgx = cmp;
        };
        return <Theme config={A}>
          <Theme config={B}>
            <Theme config={C}>
              <Theme config={D}>
                <TestTarget ref={getCmp}>hello
                  everyone</TestTarget>
              </Theme>
            </Theme>
          </Theme>
        </Theme>;
      }
    };

    const Target = createTestComponent(TestComponent, target => {


      const theme = target.lgx.getThemeTarget().props.getTheme();
      const expectResult = { svThemeConfigTree: { ...B, ...C, ...D, }, };
      exp(theme).to.be.eql(expectResult);
    });
    mount(<Target/>);
  });

  it('ThemeProvider getTheme来自于配置树 B', () => {
    const A = { a: { value: '苦', }, };
    const B = { [WidgetName]: { value: '集', }, };
    const C = { b: { value: '灭', }, };
    const D = { a: { value: '道', }, };


    const TestComponent = class  extends React.Component<any> {
      static displayName = 'ThemeProviderTest';
      state: any;
      lgx: Object;


      render () {
        const getCmp: Function = (cmp: Object) => {
          this.lgx = cmp;
        };
        return <Theme config={A}>
          <Theme config={B}>
            <Theme config={C}>
              <Theme config={D}>
                <TestTarget ref={getCmp}>hello
                  everyone</TestTarget>
              </Theme>
            </Theme>
          </Theme>
        </Theme>;
      }
    };

    const Target = createTestComponent(TestComponent, target => {


      const theme = target.lgx.getThemeTarget().props.getTheme();
      const expectResult = { svThemeConfigTree: { ...B, ...C, ...D, }, ...B[ WidgetName ], };
      exp(theme).to.be.eql(expectResult);
    });
    mount(<Target/>);
  });
  it('ThemeProvider getTheme来自于配置树 C', () => {
    const A = { a: { value: '苦', }, };
    const B = { b: { value: '集', }, };
    const C = { [WidgetName]: { value: '灭', }, };
    const D = { a: { value: '道', }, };


    const TestComponent = class  extends React.Component<any> {
      static displayName = 'ThemeProviderTest';
      state: any;
      lgx: Object;


      render () {
        const getCmp: Function = (cmp: Object) => {
          this.lgx = cmp;
        };
        return <Theme config={A}>
          <Theme config={B}>
            <Theme config={C}>
              <Theme config={D}>
                <TestTarget ref={getCmp}>hello
                  everyone</TestTarget>
              </Theme>
            </Theme>
          </Theme>
        </Theme>;
      }
    };

    const Target = createTestComponent(TestComponent, target => {
      const theme = target.lgx.getThemeTarget().props.getTheme();
      const expectResult = { svThemeConfigTree: { ...B, ...C, ...D, }, ...C[ WidgetName ], };
      exp(theme).to.be.eql(expectResult);
    });
    mount(<Target/>);
  });

  it('ThemeProvider 更新Theme props', async () => {
    await new Promise(resolve => {

      const A = { a: { value: '苦', }, };
      const B = { b: { value: '集', }, };
      const C = { [WidgetName]: { value: '灭', }, };
      const D = { a: { value: '道', }, };


      const TestComponent = class  extends React.Component<any> {
        static displayName = 'ThemeProviderTest';
        state: any;
        lgx: Object;


        render () {
          const { A, B, C, D, } = this.props;
          const getCmp: Function = (cmp: Object) => {
            this.lgx = cmp;
          };
          return <Theme config={A}>
            <Theme config={B}>
              <Theme config={C}>
                <Theme config={D}>
                  <TestTarget ref={getCmp}>hello
                    everyone</TestTarget>
                </Theme>
              </Theme>
            </Theme>
          </Theme>;
        }
      };

      const Target = createTestComponent(TestComponent, target => {
        const theme = target.lgx.getThemeTarget().props.getTheme();
        const expectResult = { svThemeConfigTree: { ...B, ...C, ...D, }, ...C[ WidgetName ], };
        exp(theme).to.be.eql(expectResult);
      }, {
        componentDidUpdate (_, _b, target) {
          const theme = target.lgx.getThemeTarget().props.getTheme();
          const expectResult = { svThemeConfigTree: { ...A, ...B, ...C, }, ...C[ WidgetName ], };
          exp(theme).to.be.eql(expectResult);
          resolve(true);
        },
      });
      const cmp = mount(<Target A={A} B={B} C={C} D={D}/>);
      cmp.setProps({ A: D, B: C, C: B, D: A, });
    });

  });


});
