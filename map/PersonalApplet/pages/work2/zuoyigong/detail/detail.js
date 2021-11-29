// pages/work2/zuoyigong/detail/detail.js
import request from "../../../../utils/request";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    TransactionDetail: "",
    ID: "",
    type: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:async function (options) {
    let ID = options.commodityID;
    let type = options.Type;  
    let result = await request('/WeChatServlet', {
      _zhbai_METHOD: 'com.zhbai.platform.TransactionAppletUtility.transactionOrder',ID,type
    }, 'POST');
    wx.setStorageSync('Volunteers', result[0])
    this.setData({
      TransactionDetail:result[0],
      ID,type
    })
  },

  /**
     * 接单方法
     * @returns {Promise<void>}
     * @constructor
     */
    async PickTask() {
      let {ID,type}=this.data
      let UserName =wx.getStorageSync("userinfo").userName
      let result = await request('/WeChatServlet', {
          _zhbai_METHOD: 'com.zhbai.platform.TransactionAppletUtility.transactionPickTask', ID,type
          ,UserName}, 'POST')
      if (result[0]){
          wx.showToast({
              title: '接单成功！',
              icon: 'success'
          })
      }else {
          wx.showToast({
              title: '接单失败！',
              icon: 'error'
          })
      }
      setTimeout(function () {
          var pages = getCurrentPages();
          var prePage = pages[pages.length - 2];
          prePage.onLoad();
          wx.navigateBack({
              url: "/pages/work2/zuoyigong/list/list"
          })
      }, 1000);
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