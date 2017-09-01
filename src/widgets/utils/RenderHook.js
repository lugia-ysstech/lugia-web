/**
 *
 * create by ligx
 *@flow
 */
import ReactDOM from 'react-dom';
import * as React from 'react';

function defaultGetContainer () {
  const container = document.createElement('div');
  document.body && document.body.appendChild(container);
  return container;
}

type Props = {};
type ArgType = {
  autoMount?: boolean,
  autoDestory?: boolean
}
export default <C: React.ComponentType<any>> (arg: ArgType, Target: C) => {
  const {
    autoMount = true,
    autoDestory = true,
  } = arg;
  return class extends React.Component<Props> {
    target: React.Element<any>;
    _container: ?HTMLElement;
    _component: any;

    render () {
      const saveTarget: Function = (cmp: React.Element<any>) => {
        this.target = cmp;
      };

      const props = {};
      if (!autoMount) {
        props.renderComponent = this.renderComponent.bind(this);
      }
      if (!autoDestory) {
        props.removeContainer = this.removeContainer.bind(this);
      }
      return <Target ref={saveTarget} {...this.props} {...props}/>;
    }


    getComponent (args?: Object) {
      if (this.target && this.target.getComponent) {
        return this.target.getComponent(args);
      }
      return null;
    }

    getContainer () {
      if (this._container) {
        return this._container;
      }
      if (this.target && this.target.getContainer) {
        return this.target.getContainer();
      }
      return defaultGetContainer();
    }

    isVisible () {
      if (this.target && this.target.isVisible) {
        return this.target.isVisible();
      }
      return false;
    }

    componentDidMount () {
      autoMount && this.renderComponent();
    }

    componentDidUpdate () {
      autoMount && this.renderComponent();
    }

    renderComponent (componentArg?: Object, ready?: Function) {
      if (this.isVisible() || this._component) {
        if (!this._container) {
          this._container = this.getContainer();
        }
        const updateComponent = target => {
          this._component = target;
        };
        const component = this.getComponent(componentArg);
        if (component !== null) {

          ReactDOM.unstable_renderSubtreeIntoContainer(this,
            component, this._container,
            function callback () {
              updateComponent(this);
              if (ready) {
                ready.call(this);
              }
            });
        }
      }
    }

    componentWillUnmount () {
      autoDestory && this.removeContainer();
    }

    removeContainer () {
      if (this._container) {
        const container = this._container;
        ReactDOM.unmountComponentAtNode(container);
        container.parentNode && container.parentNode.removeChild(container);
        this._container = null;
      }
    }
  };
};
