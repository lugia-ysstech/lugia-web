//@flow
import * as React from 'react';
import chai from 'chai';
import Enzyme, { mount, shallow } from 'enzyme';
import DelayHoc from '../DelayHoc';
import Adapter from 'enzyme-adapter-react-16';
import { delay } from '@lugia/react-test-utils';

const { expect: exp } = chai;
Enzyme.configure({ adapter: new Adapter() });

describe('DelayHoc', () => {
  const TargetComponent = DelayHoc(
    class extends React.Component<any, any> {
      constructor(props: any) {
        super(props);
      }

      render() {
        return <div>hello</div>;
      }
    }
  );
  it('DelayHoc delay-loading', async () => {
    const target = mount(<TargetComponent loading={{ delay: 1000 }} />);
    expect(target.state().loading).toBe(true);
    await delay(1000);
    expect(target.state().loading).toBe(false);
    target.setProps({ loading: { delay: 2000 } });
    expect(target.state().loading).toBe(false);
    target.setProps({ loading: true });
    expect(target.state().loading).toBe(true);
  });

  it('DelayHoc loading-delay', async () => {
    const target = mount(<TargetComponent loading />);
    expect(target.state().loading).toBe(true);
    target.setProps({ loading: { delay: 2000 } });
    expect(target.state().loading).toBe(true);
    await delay(2000);
    expect(target.state().loading).toBe(true);
  });
  it('DelayHoc to delay-loading', async () => {
    const target = mount(<TargetComponent />);
    expect(target.state().loading).toBe(false);
    target.setProps({ loading: { delay: 2000 } });
    expect(target.state().loading).toBe(false);
    await delay(2000);
    expect(target.state().loading).toBe(false);
    target.setProps({ loading: true });
    expect(target.state().loading).toBe(true);
  });
});
