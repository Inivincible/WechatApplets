// pages/work/policy/detail/detail.js
import request from "../../../../utils/request";

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  /**
   * 跳转方法
   * @param event
   */
  detail: function (event) {
    let policyDetails = event.currentTarget.id;
    wx.navigateTo({
      url: "/pages/work/policy/resource_up/resource_up?policyID=" + policyDetails
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    let F_ID = options.policyID;
    let result = await request('/WeChatServlet', {
      _zhbai_METHOD: 'com.zhbai.platform.PolicyManagementList.policyDetail',F_ID
    }, 'POST')
    this.setData({
      policyDetail: result[0]
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