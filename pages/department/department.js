import {getDeptList} from '../../utils/api.js'
Page({
    data: {
    title: '选择科室',
    depts: null
  },
  onReady() {
    const self = this;
    wx.setNavigationBarTitle({
      title: self.data.title,
    });
  },
  onLoad(options) {
    const hospitalCode = options.hid;
    const self = this;
    wx.showToast({
      title: '正在加载',
      icon: 'loading',
      duration: 10000,
    });
    getDeptList({
        data: {hospitalCode: hospitalCode},
      success: (res) => {
        console.log(res)
        const depts = res.data && res.data.data;
        self.setData({
          depts,
        });
        wx.hideToast();
      },
    });
  },
  viewDoctorList(e) {
    const ds = e.currentTarget.dataset;
    wx.navigateTo({
      url: `../doctor/doctor?hid=${ds.hid}&did=${ds.did}`
    })
  }
})