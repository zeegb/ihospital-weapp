function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function getDateStr(date) {
  var _year = date.getFullYear();
  var _month = date.getMonth() + 1;
  var _d = date.getDate();
  _month = (_month > 9) ? ("" + _month) : ("0" + _month);
  _d = (_d > 9) ? ("" + _d) : ("0" + _d);
  return _year + _month + _d;
}

module.exports = {
  formatTime: formatTime,
  getDateStr: getDateStr
}