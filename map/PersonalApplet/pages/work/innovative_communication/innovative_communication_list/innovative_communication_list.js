// pages/innovative_communication_list/innovative_communication_list.js
import request from "../../../../utils/request";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isTriggered:false,
    nav:null,
    commodity:null,
    Type:"全部活动",
    States:"",
  },
  
  /**
   *跳转到详情页面
   * @param event
   */
  detail:async function (event) {
    let commodity = event.currentTarget.dataset.song;
    wx.navigateTo({
      url:"/pages/work/innovative_communication/innovative_communication_detail/innovative_communication_detail?commodityID=" + commodity.iD
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    let {Type} = this.data;
    let result = await request('/WeChatServlet', {
      _zhbai_METHOD: 'com.zhbai.smh.SmhInnovativeCommunicationManagementPage.nav'
    }, 'POST');
    this.setData({
      nav:result
    })
    let resul = await request('/WeChatServlet', {
      _zhbai_METHOD: 'com.zhbai.smh.SmhInnovativeCommunicationManagementPage.onload',Type
    }, 'POST');
    this.setData({
      commodity:resul,
    })
  },

  /**
   * 导航栏点击获取
   */
  handleInput: async function(event){
    this.setData({
      Type:event.currentTarget.dataset.value
    })
    this.onLoad();
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