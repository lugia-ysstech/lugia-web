import * as React from 'react';
import Breadcrumb from './index';
import styled from 'styled-components';
import Icon from '../icon';
// import { HashRouter as Router, Route, Switch, Link, withRouter } from 'react-router-dom';

const Hr = styled.div`
  height: 2px;
  background: orange;
  margin: 20px 0;
`;

const CommonIcon = styled(Icon)`
  color: #000;
  border-radius: 50%;
`;

const routes = [
  {
    path: 'index',
    breadcrumbName: '首页',
  },
  {
    path: 'first',
    breadcrumbName: '一级面包屑',
  },
  {
    path: 'second',
    breadcrumbName: '二级面包屑',
  },
  {
    path: 'third',
    breadcrumbName: '当前页面',
  },
];

export default class Demo extends React.Component<any, any> {
  render() {
    return (
      <div>
        {/*Breadcrumb 和 Breadcrumb.Item配合使用，使用href属性时，可跳转 */}
        <Breadcrumb separator={'>'}>
          <Breadcrumb.Item href="">主页</Breadcrumb.Item>
          <Breadcrumb.Item href="">一级菜单</Breadcrumb.Item>
          <Breadcrumb.Item href="">二级菜单</Breadcrumb.Item>
          <Breadcrumb.Item>三级菜单</Breadcrumb.Item>
        </Breadcrumb>
        <Hr />
        {/* 传入routes路由属性，使用默认的 renderItem函数,生成面包屑组件 */}
        <Breadcrumb separator={'>'} routes={routes} />
        <Hr />
        {/* 传入Icon图标 */}
        <Breadcrumb>
          <Breadcrumb.Item href="">
            <CommonIcon iconClass="lugia-icon-logo_chrome" type="home" />
            <span>一级面包屑菜单 </span>
          </Breadcrumb.Item>
          <Breadcrumb.Item href="">
            <span>二级面包屑菜单</span>
            <CommonIcon iconClass="lugia-icon-financial_smile" type="user" />
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <span>二级面包屑菜单</span>
            <CommonIcon iconClass="lugia-icon-logo_apple" type="user" />
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>
    );
  }
}

// //       demo4
// // !!!!!!!!!!!!!!!!!!!这个组件这么使用有bug，不懂什么原因
// // 使用的自定义设置的 renderItem回调函数,传入routes路由属性，生成面包屑组件=====================
// import * as React from 'react';
// import Breadcrumb from './index';
// import { Link, Router } from 'react-router-dom';

// const routes = [
//   {
//     path: 'index',
//     breadcrumbName: '首页',
//   },
//   {
//     path: 'first',
//     breadcrumbName: '一级面包屑',
//   },
//   {
//     path: 'second',
//     breadcrumbName: '二级面包屑',
//   },
//   {
//     path: 'third',
//     breadcrumbName: '当前页面',
//   },
// ];

// function renderItem(route, params, routes, paths) {
//   const last = routes.indexOf(route) === routes.length - 1;
//   return last ? (
//     <span>{route.breadcrumbName}</span>
//   ) : (
//     <Link to={paths.join('/')}>{route.breadcrumbName}</Link>
//   );
// }
// export default class Demo extends React.Component<any, any> {
//   render() {
//     return (
//       <Router>
//         <Breadcrumb renderItem={renderItem} routes={routes} />
//       </Router>
//     );
//   }
// }

// //               demo 4
// // 配合Link标签和路由使用 需安装react-router-dom  ==========================================

// import Breadcrumb from './index';
// import * as React from 'react';

// const Apps = () => (
//   <ul className="app-list">
//     <li>
//       <Link to="/apps/1">进入二级面包屑A</Link>: <Link to="/apps/1/detail">进入三级面包屑A</Link>
//     </li>
//     <li>
//       <Link to="/apps/2">进入二级面包屑B</Link>: <Link to="/apps/2/detail">进入三级面包屑B</Link>
//     </li>
//   </ul>
// );

// const breadcrumbNameMap = {
//   '/apps': '一级面包屑',
//   '/apps/1': '二级面包屑A',
//   '/apps/2': '二级面包屑B',
//   '/apps/1/detail': '三级面包屑A',
//   '/apps/2/detail': '三级面包屑B',
// };

// const Home = withRouter(props => {
//   const { location } = props;
//   const pathSnippets = location.pathname.split('/').filter(i => i);
//   const extraBreadcrumbItems = pathSnippets.map((_, index) => {
//     const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
//     return (
//       <Breadcrumb.Item key={url}>
//         <Link to={url}>{breadcrumbNameMap[url]}</Link>
//       </Breadcrumb.Item>
//     );
//   });
//   const breadcrumbItems = [
//     <Breadcrumb.Item key="home">
//       <Link to="/">Home</Link>
//     </Breadcrumb.Item>,
//   ].concat(extraBreadcrumbItems);
//   return (
//     <div className="demo">
//       <div className="demo-nav">
//         <Link to="/">Home  =>  </Link>
//         <Link to="/apps">进入一级面包屑</Link>
//       </div>
//       <Switch>
//         <Route path="/apps" component={Apps} />
//         <Route render={() => <span>Home Page</span>} />
//       </Switch>

//       <Breadcrumb>{breadcrumbItems}</Breadcrumb>
//     </div>
//   );
// });

// export default class Demo extends React.Component<any, any> {
//   render() {
//     return (
//       <Router>
//         <Home />
//       </Router>
//     );
//   }
// }

//     demo6
//  给路由传入params 参数
// import * as React from 'react';
// import Breadcrumb from './index';
// const routes = [
//   {
//     name: 'home',
//     breadcrumbName: 'Home',
//     path: '/',
//     childRoutes: [
//       {
//         name: 'apps',
//         breadcrumbName: 'Application List',
//         path: 'apps',
//         childRoutes: [
//           {
//             name: 'app',
//             breadcrumbName: 'Application:id',
//             path: ':id',
//             childRoutes: [
//               {
//                 name: 'detail',
//                 breadcrumbName: 'Detail',
//                 path: 'detail',
//               },
//             ],
//           },
//         ],
//       },
//     ],
//   },
//   {
//     name: 'apps',
//     breadcrumbName: 'Application List',
//     path: 'apps',
//     childRoutes: [
//       {
//         name: 'app',
//         breadcrumbName: 'Application:id',
//         path: ':id',
//         childRoutes: [
//           {
//             name: 'detail',
//             breadcrumbName: 'Detail',
//             path: 'detail',
//           },
//         ],
//       },
//     ],
//   },
//   {
//     name: 'app',
//     breadcrumbName: 'Application:id',
//     path: ':id',
//     childRoutes: [
//       {
//         name: 'detail',
//         breadcrumbName: 'Detail',
//         path: 'detail',
//       },
//     ],
//   },
//   {
//     name: 'detail',
//     breadcrumbName: 'Detail',
//     path: 'detail',
//   },
// ];

// export default class Demo extends React.Component<any, any> {
//   render() {
//     return <Breadcrumb params={{ id: 1 }} routes={routes} />;
//   }
// }
