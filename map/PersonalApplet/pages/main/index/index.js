// pages/index/index.js
import request from "../../../utils/request";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isTriggered:false,
    url: getApp().data.url.replace("/smh", ""),
    slideshow:null,
    listNotice:null,
    text:""
  },
/**
 * 首页公告跳转
 */
  detail: function (event) {
    let policyDetails = event.currentTarget.dataset.song;
    wx.navigateTo({
        url: "/pages/work/proclamation/detail/detail?policyID=" + policyDetails.iD
    })
},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:async function (options) {
    let result = await request('/WeChatServlet', {
      _zhbai_METHOD: 'com.zhbai.smh.SmhInnovativeCommunicationManagementPage.slideshow'
    }, 'POST');
    this.setData({
      slideshow:result
    })

    //加载公告管理数据
    let resul = await request('/WeChatServlet', {
      _zhbai_METHOD: 'com.zhbai.platform.SmhAnnouncementManagementPage.onLoad'
    }, 'POST');
    wx.setStorageSync('notice', resul);
    this.setData({
      listNotice:resul.slice(0,1),
      text:resul[0].content
    })
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
