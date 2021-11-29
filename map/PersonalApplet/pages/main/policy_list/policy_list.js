// pages/main/policy_list/policy_list.js
import request from "../../../utils/request";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabnumber : 1,
    isTriggered:false
  },

  clicktab1:function(){

    this.setData({
      tabnumber : 1
    })
  },
  clicktab2:function(){

    this.setData({
      tabnumber : 2
    })
  },
  /**
   * 跳转方法
   * @param event
   */
  detail: function (event) {
    let policyDetails = event.currentTarget.dataset.song;
    wx.navigateTo({
      url: "/pages/work/policy/detail/detail?policyID=" + policyDetails.iD
    })
  },
  /**
   * 下拉刷新方法
   * @returns {Promise<void>}
   */
  async handleRefresher() {
    this.onLoad()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    let Company = wx.getStorageSync('userinfo').branchInnerCode;
    let result = await request('/WeChatServlet', {
      _zhbai_METHOD: 'com.zhbai.platform.PolicyManagementList.onLoad'
    }, 'POST')
    let state = await request('/WeChatServlet',{
      _zhbai_METHOD:'com.zhbai.platform.PolicyApplyList.onload',Company
    },'POST')
    this.setData({
      policy:result,
      state:state,
      isTriggered:false
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