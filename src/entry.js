import React, { Component } from 'react';
import 'react-dom';
import 'redux';
import { connect } from 'react-redux';
import 'react-router';
import 'babel-polyfill';
import 'immutable';
//上面引入的库已external出去，如果不在入口文件引入则会找不到模块

import Header from './components/common/header';
// import Footer from './components/common/footer';
// import Sidebar from './components/common/sidebar';

//加载reduces
import * as reducers from './redux/modules';
import * as i18nActions from './redux/modules/i18n';

//加载入口生成器
import { CreateEntry, getRouteConfig, getBSGlobal } from 'TalentCore';

@connect(
  state => ({
    locale: state.i18n.locale
  }),
  {...i18nActions}
)
export default class App extends Component {
  
  handleLanguageSwitch(evt) {
    this.props.switchLocale(evt.target.value);
  }
  render() {
    const { locale } = this.props;
    // let footer = <Footer />;
    return (
      <div className="container-fluid">
        <Header useI18n={this.handleLanguageSwitch.bind(this)} locale={locale} />
        <div id="content-wrapper" className="row">
         
          <div id="main-region" className="">
              {this.props.children}
          </div>
         </div>

         
      </div>
    );
  }
}

var staticPath = getBSGlobal('staticPath');
__webpack_public_path__ = staticPath;

//路由跳转
let getPageBundl = function(pageName) {
  let first = pageName.substring(0,1).toUpperCase();
  let end = pageName.substring(1, pageName.length);
  let pages = first + end;
  return require("./containers/" + pages + '/index');
}

//路由入口
let routes = getRouteConfig(getPageBundl, { component: App, indexRoute: {
  onEnter: (nextState, replace) => replace('/home')
}});

//项目入口页
CreateEntry({
    "routes": routes
    ,"reducers": reducers
});

