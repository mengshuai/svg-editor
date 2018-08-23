
import { CALL_FETCH } from 'TalentCore';
const CHANGEVALUE = 'test/changevalue';

const REPO = 'REPO';
// const REPO_REQUEST = "REPO_REQUEST";
const REPO_SUCCESS = "REPO_SUCCESS";
const REPO_FAILURE = "REPO_FAILURE";

const MUTIREPO = 'MUTIREPO';
// const MUTIREPO_REQUEST = "MUTIREPO_REQUEST";
const MUTIREPO_SUCCESS = "MUTIREPO_SUCCESS";
const MUTIREPO_FAILURE = "MUTIREPO_FAILURE";

const initialState = {
  text: 6
};

// window.customHeaders = function(){
//   return {
//     'x-beisen-ajax':1.0,
//     'X-Beisen-ts':1463654774869,
//     'X-Requested-With':'XMLHttpRequest',
//     'X-XSRF-Token':''
//   }
// }

export default function test(state= initialState, action= {}) {
  switch (action.type) {
    case CHANGEVALUE:
      return {
        text: action.value
      }
    case REPO_SUCCESS:
      console.log("单个异步返回结果:", action.response);
      return {
        response: action.response
      }
    case MUTIREPO_SUCCESS:
      console.log("多个并发返回结果:", action.response);
      return {
        response: action.response
      }
    case REPO_FAILURE:
      //返回错误信息
      console.log("单个异步错误状态码:", action.error.status);
      return state;

    case MUTIREPO_FAILURE:
      console.log("多个并发错误状态码:", action.error.status);
    default:
      return state;
  }
}

function HandleGetItem() {
  return {
    [CALL_FETCH]: {
        types: REPO,
        //types: [REPO_REQUEST, REPO_SUCCESS, REPO_FAILURE],  //另types也支持直接types: REPO
        url: 'http://localhost:3000/i18nAll/en.js',
        method: "GET"
        //mode: "cors",   跨域请求参数
        // headers: {
        //  'Content-Type': 'application/x-www-form-urlencoded'
        // }
    }
  };
}

function HandleMultiAsyn() {
  return {
    [CALL_FETCH]: {
          types: MUTIREPO,
          //types: [MUTIREPO_REQUEST, MUTIREPO_SUCCESS, MUTIREPO_FAILURE],
          batch: [{
              url: 'http://localhost:3000/i18nAll/en.js',
              method: "GET",
              mark: "test"
          },{
              url: 'http://localhost:3000/i18nAll/zn.js',
              method: "GET",
              mark: "test"
          },{
              url: 'https://lbs.netease.im/lbs/webconf.jsp?k=02a8065f04ecdbd754d3c6236d244484&id=105557558&sv=24&pv=1',
              method: "GET",
              mark: "test",
              mode: "cors"
          }]
      }
  };
}

//同步请求
export function handleClick() {
  const testNum = Math.random() * 10 + 1;
  return {
    type: CHANGEVALUE,
    value: testNum
  }
}

//单个异步请求
export function __as_home_getItem() {
  return (dispatch, getState) => {
    return dispatch(HandleGetItem());
  };
}

//多个并发请求
export function testMultiAsyn() {
  return (dispatch, getState) => {
    return dispatch(HandleMultiAsyn());
  };
}
