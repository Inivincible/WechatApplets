// pages/work2/shebao_jiaofei/list/list.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: '2020-8',
  },
  buttonClick() {
    wx.navigateTo({
      url: '../adjust/adjust'
    })
  },

  //  点击日期组件确定事件  
  bindDateChange: function (e) {
    var that =this;
    this.setData({
      date: e.detail.value
    });
    wx.request({
      url: app.data.url + '/WeChatServlet',
      method: 'POST',
      data: {
        _zhbai_METHOD: 'com.zhbai.smh.SmhSocialSecurityPaymentManagementPage.onLoad',
        date: this.data.date
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
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
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var timestamp = Date.parse(new Date());
    var date = new Date(timestamp);
    var s;
    if (date.getMonth() + 1 > 9) {
      s = date.getFullYear() + '-' + (date.getMonth() + 1);
    } else {
      s = date.getFullYear() + '-0' + (date.getMonth() + 1);
    }
    this.setData({
      date: s
    });

    wx.request({
      url: app.data.url + '/WeChatServlet',
      method: 'POST',
      data: {
        _zhbai_METHOD: 'com.zhbai.smh.SmhSocialSecurityPaymentManagementPage.onLoad',
        date: s
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
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