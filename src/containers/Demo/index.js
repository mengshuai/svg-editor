import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as demoActions from '../../redux/modules/demo';
import './index.scss';

@connect(
  state => ({
      value: state.demo.text
  }),
  {...demoActions}
)
export default class Demo extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.testAsyn = this.testAsyn.bind(this);
    this.testMultiAsyn = this.testMultiAsyn.bind(this);
  }

  static propTypes = {
    handleClick: PropTypes.func,
    __as_home_getItem: PropTypes.func,
    testMultiAsyn: PropTypes.func,
    value: PropTypes.number
  };

  handleClick() {
    this.props.handleClick();
  }
  
  testAsyn() {
    this.props.__as_home_getItem();
  }
  
  testMultiAsyn() {
    this.props.testMultiAsyn();
  }
  
  render() {
    const { value } = this.props;
    return (
      <div>
        {/*{this.props.children}*/}

        <button className="btn btn_default" onClick={this.handleClick}>同步</button>
        <br />
        <br />
        <em>{value ? value : ""}</em>
        <br />
        <br />
        <button className="btn btn_default" onClick={this.testAsyn}>异步单个请求（看控制台返回内容）</button>
        <br />
        <br />
        <button className="btn btn_default" onClick={this.testMultiAsyn}>异步多个并发请求（看控制台返回内容）</button>
        <br />
        <br />
      </div>
    );
  }
}


