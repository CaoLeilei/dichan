
import enUs from './en-us';
// const enUs = r => require.ensure([], () => r (require('./en-us')), 'en-us');
const zhCn = require.ensure([], require('./zh-cn'), 'zh-cn')

// const zhCn = require('./zh-cn');

// console.log(zhCn);
// console.log(zhCn());
export default {
  en: enUs,
  zh: zhCn
};