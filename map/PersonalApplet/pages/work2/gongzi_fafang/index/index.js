// pages/work2/gongzi_fafang/index/index.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    datas:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: app.data.url+'/WeChatServlet',
      method: 'POST',
      data: {
        _zhbai_METHOD: 'com.zhbai.smh.SmhSalaryPaymentManagementPage.onLoad',
      },
      header: {
         'content-type':'application/x-www-form-urlencoded'
        //'content-type': 'application/json'
      },
      success(res) {
        that.setData({
          datas: res.data
        });
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})