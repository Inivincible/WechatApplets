// pages/work2/shuiwu_shixiang/list/list.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: '2010-8',
    datas: []
  },

  bindDateChange: function (e) {
      this.setData({
        date: e.detail.value
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var timestamp = Date.parse(new Date());
    var date = new Date(timestamp);
    var s;
    if (date.getMonth() + 1>9){
      s = date.getFullYear() + '-' + (date.getMonth() + 1);
    }else {
      s = date.getFullYear() + '-0' + (date.getMonth() + 1);
    }
    this.setData({
      date: s
    });
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