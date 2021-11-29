// pages/office_lease_pay/office_lease_pay.js
import request from "../../../utils/request";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isTriggered:false,
    chummage:null,
    working:null,
    // comName:"",
    // Name:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    // let UserName = wx.getStorageSync('userinfo').userName;
    // let permis = await request('/WeChatServlet', {
    //   _zhbai_METHOD: 'com.zhbai.platform.UserList.search',UserName
    // }, 'POST');
    // wx.setStorageSync('userinfo', permis[0])
    // let company = wx.getStorageSync('userinfo')
    // this.setData({
    //   Name:company.userName
    // })
    let UserName = wx.getStorageSync('userinfo').userName;
    let result = await request('/WeChatServlet',{
      _zhbai_METHOD: 'com.zhbai.platform.RentpaymentmanagementList.notice',UserName
    },'POST');
    this.setData({
      chummage:result
    })
   
    

    // let work = await request('/WeChatServlet',{
    //   _zhbai_METHOD: 'com.zhbai.platform.UserList.entity'
    // },'POST');
  },

   /**
   * 自定义下拉刷新
   */
  async handleRefresher() {
    this.onLoad();
    this.setData({
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