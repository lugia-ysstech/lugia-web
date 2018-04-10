/**
 *
 * create by ZhangBoPing
 *
 * @flow
 */
import * as React from 'react';
import Widget from '../consts/index';

import {SwitchWrapper, SwitchInner,} from './styles';

/* props type */
export type SwitchProps = {
  autoFocus?: boolean,
  prefixCls?: string,
  size?: 'small' | 'default',
  className?: string,
  checked?: boolean,
  defaultChecked?: boolean,
  onChange?: (checked: boolean) => any,
  checkedChildren?: string | React$Node,
  unCheckedChildren?: string | React$Node,
  disabled?: boolean,
  loading?: boolean,
}

/* state type */
export type SwitchState = {
  checked: boolean,
  disabled: boolean
};

/* Class */
class Switch extends React.Component<SwitchProps, SwitchState>{
  el: any;

  static displayName = `_${Widget.Switch}`;

  constructor(props: SwitchProps){
    super(props);
    
    const disabled = this.props.disabled || false;
    let checked = this.props.defaultChecked || false;
    if('checked' in this.props){
      checked =  this.props.checked || false;
    }

    this.state = {
      checked,
      disabled,
    };
  }

  toggle(): void{
    this.updateChecked(!this.state.checked);
  }

  updateChecked(checked:boolean): void{
    if(this.state.disabled){
      return;
    }

    this.setState({
      checked,
    });
  }

  handleKeyDown(event: SyntheticKeyboardEvent<EventTarget>): void{
    const key = event.keyCode;

    if(key === 37) this.updateChecked(false); // left
    if(key === 39) this.updateChecked(true); // right
    if(key === 32 || key === 13) this.toggle(); // space || enter
  }
  
  focus(): void{
    if(this.el){
      this.el.focus();
    }
  }

  blur(): void{
    if(this.el){
      this.el.blur();
    }
  }

  cacheNode(node: React.Node): void{
    this.el = node;
  }

  componentDidMount() {
    const { autoFocus, disabled, } = this.props;
    if (autoFocus && !disabled) {
      this.focus();
    }
  }

  componentDidUpdate(){
    if(this.props.onChange){
      this.props.onChange(this.state.checked);
    }
  }

  render(){
    const {checkedChildren,unCheckedChildren,} = this.props;
    const switchTabIndex = this.state.disabled? -1 : 0;
    return (
      <SwitchWrapper
        isChecked={this.state.checked}
        isDisabled={this.state.disabled}
        tabIndex={switchTabIndex}
        onClick={() => this.toggle()}
        onKeyDown={e => this.handleKeyDown(e)}
        innerRef={el => this.cacheNode(el)}
        >
        
        <SwitchInner isChecked={this.state.checked}>
          {
            (checkedChildren || unCheckedChildren)?
            (this.state.checked?
              checkedChildren || '' :
              unCheckedChildren || ''
            ):
            ''
          }
        </SwitchInner>
      </SwitchWrapper>
    );
  }
}

export default Switch;
