import moment from 'moment';

const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
];

export default {
  methods:{
    formatDateTime (str, hasDay) {
      let _dateStr = str.replace(/\//g, '-');
      let dateMoment = moment(_dateStr);
      let monthName = this.$t('common.date.' + monthNames[dateMoment.month()]);
      let year = dateMoment.year();
      if (hasDay) {
        let date = dateMoment.date();
        return `${monthName} ${date}  ${year}`;
      } else {
        return  `${monthName}  ${year}`;
      }
    }
  }
};