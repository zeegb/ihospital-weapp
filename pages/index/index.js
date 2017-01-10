//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    title: '网络医院',
    userInfo: {}
  },
  onReady() {
    const self = this;
    wx.setNavigationBarTitle({
      title: self.data.title,
    });
  },
  //事件处理函数
  viewNext(e) {
    const ds = e.currentTarget.dataset;
    wx.navigateTo({
      url: `../${ds.destination}/${ds.destination}`
    });
  },
  onLoad() {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  }
})
