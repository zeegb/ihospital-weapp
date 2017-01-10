//app.js
import {getAccessToken} from './utils/api.js';

App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs);
    wx.showToast({
      title: '正在加载',
      icon: 'loading',
      duration: 10000,
    });
    getAccessToken({
      data: {
        scope: 'node-business',
        grant_type: 'client_credentials'
      },
      success: (res) => {
        console.log(res)
        const token = res.data && res.data.access_token;
        wx.setStorageSync('token', token)
        wx.hideToast();
      }
    })
  },
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  globalData:{
    userInfo:null
  }
})