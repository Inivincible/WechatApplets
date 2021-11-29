// pages/main/new_communication/new_communication.js
import request from "../../../utils/request";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isTriggered:false,
    //图片路径
    url:getApp().data.url.replace("/smh",""),
    commodity:null,
    Type:"全部",
    yangshi1:"weui-bar__item_on",
    nav:null
  },

  /**
   *跳转到详情页面
   * @param event
   */
  detail: function (event) {
    let commodity = event.currentTarget.dataset.song;
    wx.navigateTo({
      url:"/pages/work/new_communication/detail/detail?commodityID=" + commodity.iD
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    let {
      Type
    } = this.data;
    let result = await request('/WeChatServlet', {
      _zhbai_METHOD: 'com.zhbai.smh.SmhNewProductLaunchManagementPage.nav'
    }, 'POST');
    this.setData({
      nav:result
    })
    
    let resul = await request('/WeChatServlet', {
      _zhbai_METHOD: 'com.zhbai.smh.SmhNewProductLaunchManagementPage.onLoad',Type
    }, 'POST');
    this.setData({
      commodity:resul
    })
  },

  /**
   *  动态顶部导航栏
   */
  handleInput: async function(event) {
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