// pages/work2/zuoyigong/xuzhi/xuzhi.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Consent:"",
    Name:"",
    hiddenName:""
  },

  tongyi:function(event){
    this.setData({
      Consent:event.currentTarget.id,
      hiddenName:"true"
    })
  },
  // handleInput:function(event){
  //   console.log(event)
  //   let name = event.currentTarget.id;
  //   this.setData({
  //     [name]:event.detail.value
  //   })
  // },
  
  commit(){
    let {
      Consent,
    } = this.data;
    
    if (Consent == "") {
      wx.showToast({
        title: '请勾选同意！',
        icon:'none'
      })
      return;
    }
    // if (Name == "") {
    //   wx.showToast({
    //     title: '请签名！',
    //     icon:'none'
    //   })
    //   return;
    // }
    wx.navigateTo({
      url: '../list/list',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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