import {USERNAME,PASSWORD} from '../config.js';
const apiURL = 'https://api.uthealth.com.cn';
const token = wx.getStorageSync('token');
const wxRequest = (params, url) => {
  wx.request({
    url,
    method: params.method || 'POST',
    data: params.data || {},
    header: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Authorization':`Basic ${btoa(USERNAME + ":" + PASSWORD)}`
    },
    success(res) {
      if (params.success) {
        params.success(res);
      }
    },
    fail(res) {
      if (params.fail) {
        params.fail(res);
      }
    },
    complete(res) {
      if (params.complete) {
        params.complete(res);
      }
    },
  });
};

export const getHospitalList = (params) => {
  return wxRequest(params, `${apiURL}/node-business/api/hospitals/getHospitalList?access_token=${token}`);
};

export const getDeptList = (params) => {
  return wxRequest(params, `${apiURL}/node-business/api/hospitals/getDeptListByHospital?access_token=${token}`);
};

export const getDoctorList = (params) => {
  console.log(params)
  return wxRequest(params, `${apiURL}/node-business/api/hospitals/getScheduleTypeDocs?access_token=${token}`);
};

export const getAccessToken = (params) => {
  return wxRequest(params, `${apiURL}/oauth/token`);
};