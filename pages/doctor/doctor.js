import {getDoctorList} from '../../utils/api.js'
Page({
    data: {
    title: '选择医生',
    doctors: null,
    experts: null,
    normals: null
  },
  onReady() {
    const self = this;
    wx.setNavigationBarTitle({
      title: self.data.title,
    });
  },
  onLoad(options) {
    const hospitalCode = options.hid;
    const deptSn = options.did;
    const self = this;
    wx.showToast({
      title: '正在加载',
      icon: 'loading',
      duration: 10000,
    });
    getDoctorList({
        data: {
            hospitalCode: hospitalCode,
            deptSn:deptSn
        },
      success: (res) => {
        console.log(res)
        const doctors = res.data && res.data.data;
        self.setData({
          doctors,
          experts: doctors.expert,
          normals: doctors.normal
        });
        wx.hideToast();
      },
    });
  }
})