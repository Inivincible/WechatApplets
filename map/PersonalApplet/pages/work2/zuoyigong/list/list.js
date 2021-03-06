// pages/work2/zuoyigong/list/list.js
import request from "../../../../utils/request";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isTriggered:false,
    Volunteers:""
  },

  /**
   * 跳转详情页面
   */
  detail: function (event) {
    let commodity = event.currentTarget.dataset.song;
    let type = event.currentTarget.id;
    wx.navigateTo({
        url:"/pages/work2/zuoyigong/detail/detail?commodityID=" + commodity.iD+"&Type="+type
    })
  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:async function (options) {
    let result = await request('/WeChatServlet', {
      _zhbai_METHOD: 'com.zhbai.platform.TransactionAppletUtility.allTransaction'
    }, 'POST');
    this.setData({
      Volunteers:result.Volunteers
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