import {getHospitalList} from '../../utils/api.js'
Page({
    data: {
    title: '选择医院',
    hospitals: null
  },
  onReady() {
    const self = this;
    wx.setNavigationBarTitle({
      title: self.data.title,
    });
  },
  onLoad(options) {
    const self = this;
    wx.showToast({
      title: '正在加载',
      icon: 'loading',
      duration: 10000,
    });
    getHospitalList({
      success: (res) => {
        console.log(res)
        const hospitals = res.data && res.data.data;
        self.setData({
          hospitals,
        });
        wx.hideToast();
      },
    });
  }
})