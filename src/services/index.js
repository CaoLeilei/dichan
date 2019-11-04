import ajax from '../common/ajax';

let apiConfig = [
  {
    name: 'getUserInfo',
    url: '/fd/userinfo',
    type: 'get'
  },
  {
    name: 'login',
    url: ' /fd/login',
    type: 'post'
  },
  {
    name: 'createAccount',
    url: '/fd/signup',
    type: 'post'
  },
  {
    name: 'resetPassword',
    url: '/fd/request_reset_password',
    type: 'post'
  },
  {
    name: 'logout',
    url: '/fd/logout',
    type: 'get'
  },
  {
    name: 'getProjectList',
    url: ' /fd/browse/cases',
    type: 'get'
  },
  {
    name: 'getOverviewData',
    url: '/fd/case/info',
    type: 'get'
  },
  {
    // 购买页面的产品信息
    name: 'getProductInvestData',
    url: '/fd/case/invest',
    type: 'get'
  },
  {
    // 获取头部的基本信息
    name: 'getEarnsTotal',
    url: '/fd/overview/earns_total',
    type: 'get'
  },
  {
    name: 'getEarnsHistory',
    url: '/fd/overview/earns_history',
    type: 'get'
  },
  {
    // 收益总列表
    name: 'getEarnsDetail',
    url: '/fd/overview/earns_detail',
    type: 'get'
  },
  {
    // 总收益历史走势图表
    name: 'getEarnsHistory',
    url: '/fd/overview/earns_history',
    type: 'get'
  },
  {
    // 获取我的产品的nav列表
    name: 'getProduceTabList',
    url: '/fd/overview/case_list_tab',
    type: 'get'
  },
  {
    // 获取我的产品列表
    name: 'getProductList',
    url: '/fd/overview/case_list',
    type: 'get'
  },
  {
    // 获取产片的弹出卡片的quick view信息
    name: 'getProductCard',
    url: '/fd/case/card',
    type: 'get'
  },
  {
    // 获取我的投资组合的表格数据
    name: 'getPortfolioCaseTable',
    url: '/fd/portfolio/my_cases_chart',
    type: 'get'
  },
  {
    // 获取我的投资组合的项目列表
    name: 'getPortfolioCaseProductList',
    url: '/fd/portfolio/case_list',
    type: 'get'
  },
  {
    // 获取我的订单列表
    name: 'getTransactionOrders',
    url: '/fd/transactions/orders',
    type: 'get'
  },
  {
    // 赎回订单数据
    name: 'redeemTransactionOrder',
    url: '/fd/transactions/order_redeem',
    type: 'post'
  },
  {
    // 获取是否为自动投资
    name: 'getDividend',
    url: '/fd/transactions/settings/dividend_reinvest',
    type: 'get'
  },
  {
    // 设置是否为自动投资
    name: 'setDividend',
    url: '/fd/transactions/settings/dividend_reinvest',
    type: 'post'
  },
  {
    // 获取我的账户右侧的饼图数据
    name: 'getAccountRightPieData',
    url: '/fd/overview/my_cases_chart',
    type: 'get'
  },
  {
    // 获取邀请链接
    name: 'getInviteLink',
    url: '/fd/invite/link',
    type: 'get'
  }
];

const buildServiceList = function (configs) {
  let services = {};
  if (Array.isArray(configs)) {
    configs.forEach(item => {
      let requestFunction;
      if (item.type === 'get'){
        requestFunction = ajax.$get;
      } else if (item.type === 'post') {
        requestFunction = ajax.$post;
      }
      services[item.name] = function (data, config) {
        if (!data) {
          data = {};
        }
        return requestFunction(item.url, data, config);
      }
    });
  }
  return services;
};

export default buildServiceList(apiConfig);
