import {getDateStr} from '../../utils/util.js';
Page({
    data: {
    title: '医生详情',
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
    const dateObj = (() => {
    let _date = new Date();    // 默认为当前系统时间
    return {
      getDate() {
        return _date;
      },
      setDate(date) {
        _date = date;
      }
    };
  })();
    const self = this;
    const _year = dateObj.getDate().getFullYear();
    const _month = dateObj.getDate().getMonth() + 1;
    const _nextMonth = dateObj.getDate().getMonth() + 2;
    const _firstDay = new Date(_year, _month - 1, 1); 
    const _nextFirstDay = new Date(_year, _nextMonth - 1, 1); 
    let dateArr = [];
    let nextDateArr = [];
    for(var i = 0; i < 42; i++) {
        let dateJson = {};
      const _thisDay = new Date(_year, _month - 1, i + 1 - _firstDay.getDay());
      const _thisDayStr = getDateStr(_thisDay);
        dateJson.text = _thisDay.getDate();
        dateJson.date = _thisDayStr;
      if(_thisDayStr == getDateStr(new Date())) {    // 当前天
        dateJson.class = 'currentDay';
      }else if(_thisDayStr.substr(0, 6) == getDateStr(_firstDay).substr(0, 6)) {
        dateJson.class = 'currentMonth';  // 当前月
      }else {    // 其他月
        dateJson.class = 'otherMonth';
      }
        dateArr.push(dateJson);
    }
    for(var i = 0; i < 42; i++) {
        let dateJson = {};
      const _thisDay = new Date(_year, _nextMonth - 1, i + 1 - _nextFirstDay.getDay());
      const _thisDayStr = getDateStr(_thisDay);
        dateJson.text = _thisDay.getDate();
        dateJson.date = _thisDayStr;
      if(_thisDayStr == getDateStr(new Date())) {    // 当前天
        dateJson.class = 'currentDay';
      }else if(_thisDayStr.substr(0, 6) == getDateStr(_nextFirstDay).substr(0, 6)) {
        dateJson.class = 'currentMonth';  // 当前月
      }else {    // 其他月
        dateJson.class = 'otherMonth';
      }
        nextDateArr.push(dateJson);
    }
    self.setData({
        dateArr,
        nextDateArr
    });
  },
  swipMonth(e) {
      console.log(e.detail)
      this.setData({
        currentIndex: e.detail.current
    });
  }
})