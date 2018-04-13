/**
 *
 * create by ZhangBoPing
 *
 * create date: 2018/04/09
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
        <Switch defaultChecked autoFocus onFocus={() => {
          console.log('is focus.');
        }} />
      </section>

      <section style={{marginBottom: '20px',}}>
        <h3>small</h3>
        <Switch size={'small'} />
      </section>

      <section style={{marginBottom: '20px',}}>
        <h3>loading</h3>
        <Switch loading defaultChecked />
        <br />
        <Switch size={'small'} loading disabled />
      </section>
    </div>
  );
};

