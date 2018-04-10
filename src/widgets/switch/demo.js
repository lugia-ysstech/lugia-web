/**
 *
 * create by ZhangBoPing
 *
 * @flow
 */
import React from 'react';
import Switch from './index';

export default () => {

  return (
    <div className="demo-switch" style={{margin: '20px',}}>
      <section style={{marginBottom: '20px',}}>
        <h3>Basic</h3>
        <Switch />
      </section>

      <section>
        <h3>defaultChecked</h3>
        <Switch defaultChecked />
      </section>

      <section style={{marginBottom: '20px',}}>
        <h3>checkedChildren && unCheckedChildren</h3>
        <Switch
          checkedChildren={'on'}
          unCheckedChildren={'off'}
        />
        <br />
        <Switch
          checkedChildren={'开'}
          unCheckedChildren={'关'}
        />
      </section>

      <section style={{marginBottom: '20px',}}>
        <h3>disabled</h3>
        <Switch defaultChecked disabled />
      </section>

      <section style={{marginBottom: '20px',}}>
        <h3>autoFocus</h3>
        <Switch defaultChecked autoFocus />
      </section>
    </div>
  );
};

