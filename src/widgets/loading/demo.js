import React from 'react';
import Loading from './index';
import Alert from '../alert/index';
import Widgets from '../consts/index';
import Theme from '../theme/index';
import Switch from '../switch/index';
class LoadingDemo extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
    };
  }
  onChange = obj => {
    const { newValue } = obj;
    this.setState({ loading: newValue });
    console.log(newValue);
  };
  render() {
    console.log(this.state.loading);
    return (
      <div>
        <Theme config={{ [Widgets.Loading]: { width: 400, color: 'red' } }}>
          <h2>Theme delay</h2>
          <Loading delay={5} />
        </Theme>
        <h2>small</h2>
        <Loading size={'small'} />
        <h2>large</h2>
        <Loading size={'large'} />
        <h2>default</h2>
        <Loading />
        <h2>icon small</h2>
        <Loading iconClass={'lugia-icon-financial_loading_o'} size={'small'} />
        <h2>icon large</h2>
        <Loading iconClass={'lugia-icon-financial_loading_o'} size={'large'} />
        <h2>icon default</h2>
        <Loading iconClass={'lugia-icon-financial_loading_o'} />
        <h2>加载中...</h2>
        <Loading tip={'加载中.....'} />
        <Loading
          tip={'正在加载中.....'}
          size={'large'}
          data={'LugiaLugia Lugia Lugia Lugia Lugia '}
        >
          <Alert
            message="Lugia 的诞生就是要树立金融行业大前端解决方案的标杆。
          我们提供的不仅仅是设计规范、开源组件库、可视化开发套件......而是将设计、开发、工程，
          有机高效的演变为一种适应多端、多层的前端设计语言。Lugia 的目标是降低开发成本，提升开发质量，
          为前端开发人员赋能，让用户体验 知性。Lugia 的诞生就是要树立金融行业大前端解决方案的标杆。
          我们提供的不仅仅是设计规范、开源组件库、可视化开发套件......而是将设计、开发、工程，
          有机高效的演变为一种适应多端、多层的前端设计语言。Lugia 的目标是降低开发成本，提升开发质量，
          为前端开发人员赋能，让用户体验 知性。Lugia 的诞生就是要树立金融行业大前端解决方案的标杆。
          我们提供的不仅仅是设计规范、开源组件库、可视化开发套件......而是将设计、开发、工程，
          有机高效的演变为一种适应多端、多层的前端设计语言。Lugia 的目标是降低开发成本，提升开发质量，
          为前端开发人员赋能，让用户体验 知性。Lugia 的诞生就是要树立金融行业大前端解决方案的标杆。
          我们提供的不仅仅是设计规范、开源组件库、可视化开发套件......而是将设计、开发、工程，
          有机高效的演变为一种适应多端、多层的前端设计语言。Lugia 的目标是降低开发成本，提升开发质量，
          为前端开发人员赋能，让用户体验 知性。Lugia 的诞生就是要树立金融行业大前端解决方案的标杆。
          我们提供的不仅仅是设计规范、开源组件库、可视化开发套件......而是将设计、开发、工程，
          有机高效的演变为一种适应多端、多层的前端设计语言。Lugia 的目标是降低开发成本，提升开发质量，
          为前端开发人员赋能，让用户体验 知性。Lugia 的诞生就是要树立金融行业大前端解决方案的标杆。
          我们提供的不仅仅是设计规范、开源组件库、可视化开发套件......而是将设计、开发、工程，
          有机高效的演变为一种适应多端、多层的前端设计语言。Lugia 的目标是降低开发成本，提升开发质量，
          为前端开发人员赋能，让用户体验 知性。Lugia 的诞生就是要树立金融行业大前端解决方案的标杆。
          我们提供的不仅仅是设计规范、开源组件库、可视化开发套件......而是将设计、开发、工程，
          有机高效的演变为一种适应多端、多层的前端设计语言。Lugia 的目标是降低开发成本，提升开发质量，
          为前端开发人员赋能，让用户体验 知性。Lugia 的诞生就是要树立金融行业大前端解决方案的标杆。
          我们提供的不仅仅是设计规范、开源组件库、可视化开发套件......而是将设计、开发、工程，
          有机高效的演变为一种适应多端、多层的前端设计语言。Lugia 的目标是降低开发成本，提升开发质量，
          为前端开发人员赋能，让用户体验 知性。Lugia 的诞生就是要树立金融行业大前端解决方案的标杆。
          我们提供的不仅仅是设计规范、开源组件库、可视化开发套件......而是将设计、开发、工程，
          有机高效的演变为一种适应多端、多层的前端设计语言。Lugia 的目标是降低开发成本，提升开发质量，
          为前端开发人员赋能，让用户体验 知性。Lugia 的诞生就是要树立金融行业大前端解决方案的标杆。
          我们提供的不仅仅是设计规范、开源组件库、可视化开发套件......而是将设计、开发、工程，
          有机高效的演变为一种适应多端、多层的前端设计语言。Lugia 的目标是降低开发成本，提升开发质量，
          为前端开发人员赋能，让用户体验 知性。Lugia 的诞生就是要树立金融行业大前端解决方案的标杆。
          我们提供的不仅仅是设计规范、开源组件库、可视化开发套件......而是将设计、开发、工程，
          有机高效的演变为一种适应多端、多层的前端设计语言。Lugia 的目标是降低开发成本，提升开发质量，
          为前端开发人员赋能，让用户体验 知性。Lugia 的诞生就是要树立金融行业大前端解决方案的标杆。
          我们提供的不仅仅是设计规范、开源组件库、可视化开发套件......而是将设计、开发、工程，
          有机高效的演变为一种适应多端、多层的前端设计语言。Lugia 的目标是降低开发成本，提升开发质量，
          为前端开发人员赋能，让用户体验 知性。"
          />
        </Loading>
        <Loading tip={'正在加载中.....'} size={'large'} delay={3}>
          <Alert
            message="Lugia 的诞生就是要树立金融行业大前端解决方案的标杆。
          我们提供的不仅仅是设计规范、开源组件库、可视化开发套件......而是将设计、开发、工程，
          有机高效的演变为一种适应多端、多层的前端设计语言。Lugia 的目标是降低开发成本，提升开发质量，
          为前端开发人员赋能，让用户体验 知性。Lugia 的诞生就是要树立金融行业大前端解决方案的标杆。
          我们提供的不仅仅是设计规范、开源组件库、可视化开发套件......而是将设计、开发、工程，
          有机高效的演变为一种适应多端、多层的前端设计语言。Lugia 的目标是降低开发成本，提升开发质量，
          为前端开发人员赋能，让用户体验 知性。Lugia 的诞生就是要树立金融行业大前端解决方案的标杆。
          我们提供的不仅仅是设计规范、开源组件库、可视化开发套件......而是将设计、开发、工程，
          有机高效的演变为一种适应多端、多层的前端设计语言。Lugia 的目标是降低开发成本，提升开发质量，
          为前端开发人员赋能，让用户体验 知性。Lugia 的诞生就是要树立金融行业大前端解决方案的标杆。
          我们提供的不仅仅是设计规范、开源组件库、可视化开发套件......而是将设计、开发、工程，
          有机高效的演变为一种适应多端、多层的前端设计语言。Lugia 的目标是降低开发成本，提升开发质量，
          为前端开发人员赋能，让用户体验 知性。Lugia 的诞生就是要树立金融行业大前端解决方案的标杆。
          我们提供的不仅仅是设计规范、开源组件库、可视化开发套件......而是将设计、开发、工程，
          有机高效的演变为一种适应多端、多层的前端设计语言。Lugia 的目标是降低开发成本，提升开发质量，
          为前端开发人员赋能，让用户体验 知性。Lugia 的诞生就是要树立金融行业大前端解决方案的标杆。
          我们提供的不仅仅是设计规范、开源组件库、可视化开发套件......而是将设计、开发、工程，
          有机高效的演变为一种适应多端、多层的前端设计语言。Lugia 的目标是降低开发成本，提升开发质量，
          为前端开发人员赋能，让用户体验 知性。Lugia 的诞生就是要树立金融行业大前端解决方案的标杆。
          我们提供的不仅仅是设计规范、开源组件库、可视化开发套件......而是将设计、开发、工程，
          有机高效的演变为一种适应多端、多层的前端设计语言。Lugia 的目标是降低开发成本，提升开发质量，
          为前端开发人员赋能，让用户体验 知性。Lugia 的诞生就是要树立金融行业大前端解决方案的标杆。
          我们提供的不仅仅是设计规范、开源组件库、可视化开发套件......而是将设计、开发、工程，
          有机高效的演变为一种适应多端、多层的前端设计语言。Lugia 的目标是降低开发成本，提升开发质量，
          为前端开发人员赋能，让用户体验 知性。Lugia 的诞生就是要树立金融行业大前端解决方案的标杆。
          我们提供的不仅仅是设计规范、开源组件库、可视化开发套件......而是将设计、开发、工程，
          有机高效的演变为一种适应多端、多层的前端设计语言。Lugia 的目标是降低开发成本，提升开发质量，
          为前端开发人员赋能，让用户体验 知性。Lugia 的诞生就是要树立金融行业大前端解决方案的标杆。
          我们提供的不仅仅是设计规范、开源组件库、可视化开发套件......而是将设计、开发、工程，
          有机高效的演变为一种适应多端、多层的前端设计语言。Lugia 的目标是降低开发成本，提升开发质量，
          为前端开发人员赋能，让用户体验 知性。Lugia 的诞生就是要树立金融行业大前端解决方案的标杆。
          我们提供的不仅仅是设计规范、开源组件库、可视化开发套件......而是将设计、开发、工程，
          有机高效的演变为一种适应多端、多层的前端设计语言。Lugia 的目标是降低开发成本，提升开发质量，
          为前端开发人员赋能，让用户体验 知性。Lugia 的诞生就是要树立金融行业大前端解决方案的标杆。
          我们提供的不仅仅是设计规范、开源组件库、可视化开发套件......而是将设计、开发、工程，
          有机高效的演变为一种适应多端、多层的前端设计语言。Lugia 的目标是降低开发成本，提升开发质量，
          为前端开发人员赋能，让用户体验 知性。"
          />
        </Loading>
        <Loading tip={'正在加载中.....'} size={'large'} delay={3} loading={this.state.loading}>
          <Alert
            message="Lugia 的诞生就是要树立金融行业大前端解决方案的标杆。
          我们提供的不仅仅是设计规范、开源组件库、可视化开发套件......而是将设计、开发、工程，
          有机高效的演变为一种适应多端、多层的前端设计语言。Lugia 的目标是降低开发成本，提升开发质量，
          为前端开发人员赋能，让用户体验 知性。Lugia 的诞生就是要树立金融行业大前端解决方案的标杆。
          我们提供的不仅仅是设计规范、开源组件库、可视化开发套件......而是将设计、开发、工程，
          有机高效的演变为一种适应多端、多层的前端设计语言。Lugia 的目标是降低开发成本，提升开发质量，
          为前端开发人员赋能，让用户体验 知性。Lugia 的诞生就是要树立金融行业大前端解决方案的标杆。
          我们提供的不仅仅是设计规范、开源组件库、可视化开发套件......而是将设计、开发、工程，
          有机高效的演变为一种适应多端、多层的前端设计语言。Lugia 的目标是降低开发成本，提升开发质量，
          为前端开发人员赋能，让用户体验 知性。Lugia 的诞生就是要树立金融行业大前端解决方案的标杆。
          我们提供的不仅仅是设计规范、开源组件库、可视化开发套件......而是将设计、开发、工程，
          有机高效的演变为一种适应多端、多层的前端设计语言。Lugia 的目标是降低开发成本，提升开发质量，
          为前端开发人员赋能，让用户体验 知性。Lugia 的诞生就是要树立金融行业大前端解决方案的标杆。
          我们提供的不仅仅是设计规范、开源组件库、可视化开发套件......而是将设计、开发、工程，
          有机高效的演变为一种适应多端、多层的前端设计语言。Lugia 的目标是降低开发成本，提升开发质量，
          为前端开发人员赋能，让用户体验 知性。Lugia 的诞生就是要树立金融行业大前端解决方案的标杆。
          我们提供的不仅仅是设计规范、开源组件库、可视化开发套件......而是将设计、开发、工程，
          有机高效的演变为一种适应多端、多层的前端设计语言。Lugia 的目标是降低开发成本，提升开发质量，
          为前端开发人员赋能，让用户体验 知性。Lugia 的诞生就是要树立金融行业大前端解决方案的标杆。
          我们提供的不仅仅是设计规范、开源组件库、可视化开发套件......而是将设计、开发、工程，
          有机高效的演变为一种适应多端、多层的前端设计语言。Lugia 的目标是降低开发成本，提升开发质量，
          为前端开发人员赋能，让用户体验 知性。Lugia 的诞生就是要树立金融行业大前端解决方案的标杆。
          我们提供的不仅仅是设计规范、开源组件库、可视化开发套件......而是将设计、开发、工程，
          有机高效的演变为一种适应多端、多层的前端设计语言。Lugia 的目标是降低开发成本，提升开发质量，
          为前端开发人员赋能，让用户体验 知性。Lugia 的诞生就是要树立金融行业大前端解决方案的标杆。
          我们提供的不仅仅是设计规范、开源组件库、可视化开发套件......而是将设计、开发、工程，
          有机高效的演变为一种适应多端、多层的前端设计语言。Lugia 的目标是降低开发成本，提升开发质量，
          为前端开发人员赋能，让用户体验 知性。Lugia 的诞生就是要树立金融行业大前端解决方案的标杆。
          我们提供的不仅仅是设计规范、开源组件库、可视化开发套件......而是将设计、开发、工程，
          有机高效的演变为一种适应多端、多层的前端设计语言。Lugia 的目标是降低开发成本，提升开发质量，
          为前端开发人员赋能，让用户体验 知性。Lugia 的诞生就是要树立金融行业大前端解决方案的标杆。
          我们提供的不仅仅是设计规范、开源组件库、可视化开发套件......而是将设计、开发、工程，
          有机高效的演变为一种适应多端、多层的前端设计语言。Lugia 的目标是降低开发成本，提升开发质量，
          为前端开发人员赋能，让用户体验 知性。Lugia 的诞生就是要树立金融行业大前端解决方案的标杆。
          我们提供的不仅仅是设计规范、开源组件库、可视化开发套件......而是将设计、开发、工程，
          有机高效的演变为一种适应多端、多层的前端设计语言。Lugia 的目标是降低开发成本，提升开发质量，
          为前端开发人员赋能，让用户体验 知性。"
          />
        </Loading>
        <Switch onChange={this.onChange} />
      </div>
    );
  }
}

export default LoadingDemo;
