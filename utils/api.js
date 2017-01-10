import {USERNAME,PASSWORD} from '../config.js';
const apiURL = 'https://api.uthealth.com.cn';
const token = wx.getStorageSync('token');
const wxRequest = (params, url) => {
    console.log('token:',token);
  wx.request({
    url:`${url}?access_token=${token}`,
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
  return wxRequest(params, `${apiURL}/node-business/api/hospitals/getHospitalList`);
};

export const getAccessToken = (params) => {
  return wxRequest(params, `${apiURL}/oauth/token`);
};