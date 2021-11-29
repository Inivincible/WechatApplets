// pages/pagesA/mallDetails/mallDetails.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        details:"",
        mall:getApp().data.mall,
        url: getApp().data.url,
    },

    detail: function (event) {
        let id =parseInt(event.currentTarget.id)
        wx.navigateTo({
          url:"../pay/pay?id=" + id
        })
      },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let mall = this.data.mall
        this.setData({
            details:mall[options.id]
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