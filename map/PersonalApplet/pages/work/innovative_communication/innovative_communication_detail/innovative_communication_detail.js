// pages/innovative_communication_detail/innovative_communication_detail.js
import request from "../../../../utils/request";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    commodity: ""
  },

  /**
   * 点击报名
   */
  handleInput:async function(){
    let ID = wx.getStorageSync('apphuodong').iD;
    let UserName = wx.getStorageSync('userinfo').userName;
    let result = await request('/WeChatServlet', {
      _zhbai_METHOD: 'com.zhbai.smh.SmhInnovativeCommunicationManagementPage.apply', UserName,ID
    }, 'POST');
    if (result[0]==="已报名") {
      wx.showToast({
        title: '已报名！',
        icon: 'none'
      })
      setTimeout(function () {
        var pages = getCurrentPages();
        var prePage = pages[pages.length - 2];
        prePage.onLoad();
        wx.navigateBack({
          url: '/pages/work/innovative_communication/innovative_communication_list/innovative_communication_list'
        })
    }, 1500);
    }else {
      if (result[0]){
        wx.showToast({
            title: '报名成功！',
            icon: 'none'
        })
        setTimeout(function () {
          var pages = getCurrentPages();
          var prePage = pages[pages.length - 2];
          prePage.onLoad();
          wx.navigateBack({
            url: '/pages/work/innovative_communication/innovative_communication_list/innovative_communication_list'
          })
      }, 1500);
      }else {
        wx.showToast({
            title: '报名失败！',
            icon: 'none'
        })
        return;
      }
  }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:async function (options) {
    //加载活动数据
    let ID = options.commodityID;
    let result = await request('/WeChatServlet', {
        _zhbai_METHOD: 'com.zhbai.smh.SmhInnovativeCommunicationManagementPage.onload', ID
    }, 'POST');
    wx.setStorageSync('apphuodong', result[0])
    this.setData({
        commodity: result[0]
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