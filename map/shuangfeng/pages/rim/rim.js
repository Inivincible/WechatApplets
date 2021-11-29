// pages/rim/rim.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        url:getApp().data.url,
        navigation:getApp().data.navigation
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
           
    },
    /**
     * 跳转到详情页面
     * @param {} e 
     */
    details:function (e) {
        let id =parseInt(e.currentTarget.id)
        wx.navigateTo({
          url: '../pagesA/details/details?id='+id,
        })
    },
    /**
     * 导航
     * @param {} e 
     */
    navigation:function (e) {
        let id =parseInt(e.currentTarget.id)
        let weizi = this.data.navigation[id]
        if(weizi.latitude==null||weizi.longitude==null){
            wx.showToast({
                title: '未收藏该点坐标',
                icon: 'none'
            })
            return;
        }
        wx.openLocation({
            latitude: weizi.latitude,
            longitude: weizi.longitude,
            name:weizi.name,
            success: function (res) {
              console.log(res);
            },
            fail: function (res) {
              console.log(res);
            }
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