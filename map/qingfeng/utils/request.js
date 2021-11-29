//发送ajax请求
var app = getApp();
export default (url,data={},method='GET',header={'content-type': 'application/x-www-form-urlencoded'}) =>{
   return new Promise((resolve,reject)=>{
    wx.request({
        url:app.data.furl+url,
        data,
        method,
        header,
        success:(res)=>{
            resolve(res.data);
        },
        fail:(err)=>{
          reject(err);
        }
    })
   })
}
