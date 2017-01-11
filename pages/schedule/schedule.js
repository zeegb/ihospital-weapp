import {getDateStr} from '../../utils/util.js';
import {getDoctorInfo} from '../../utils/api.js';
Page({
    data: {
    title: '医生详情',
    doctorInfo: null,
    dateArr: null,
    nextDateArr: null,
    currentMonth: new Date().getMonth() + 1 + '月',
    nextMonth: new Date().getMonth() + 2 + '月',
    currentIndex: 0
  },
  onReady() {
    const self = this;
    wx.setNavigationBarTitle({
      title: self.data.title,
    });
  },
  onLoad(options) {
        const self = this;
        const doctorInfo = JSON.parse(options.doctorInfo || {});
        wx.showToast({
      title: '正在加载',
      icon: 'loading'
    });
    const dateObj = (() => {
    let _date = new Date();
    return {
      getDate() {
        return _date;
      },
      setDate(date) {
        _date = date;
      }
    };
  })();
const execDateArr = (()=>{
        return (year,month,firstDay,dateArr) => {
                let dateJson = {};
                const _thisDay = new Date(year, month - 1, i + 1 - firstDay.getDay());
                const _thisDayStr = getDateStr(_thisDay);
                dateJson.text = _thisDay.getDate();
                dateJson.date = _thisDayStr;
                if(_thisDayStr == getDateStr(new Date())) {
                        dateJson.class = 'currentDay';
                }else if(_thisDayStr.substr(0, 6) == getDateStr(firstDay).substr(0, 6)) {
                        dateJson.class = 'currentMonth';
                }else {
                        dateJson.class = 'otherMonth';
                }
                dateArr.push(dateJson);
        }
})();
    const _year = dateObj.getDate().getFullYear();
    const _month = dateObj.getDate().getMonth() + 1;
    const _nextMonth = dateObj.getDate().getMonth() + 2;
    const _firstDay = new Date(_year, _month - 1, 1); 
    const _nextFirstDay = new Date(_year, _nextMonth - 1, 1); 
    let dateArr = [];
    let nextDateArr = [];
    for(var i = 0; i < 42; i++) {
        execDateArr(_year,_month,_firstDay,dateArr);
        execDateArr(_year,_nextMonth,_nextFirstDay,nextDateArr);
    }
    self.setData({
        dateArr,
        nextDateArr,
        doctorInfo
    });
  },
  swipMonth(e) {
      console.log(e.detail)
      this.setData({
        currentIndex: e.detail.current
    });
  }
})