// pages/main/proclamation_list/proclamation_list.js

import request from "../../../utils/request";

Page({

    /**
     * 页面的初始数据
     */
    data: {
        isTriggered:false
    },
    /**
     * 跳转到详情页面
     * 并在路由跳转时传参
     */
    detail: function (event) {
        let policyDetails = event.currentTarget.dataset.song;
        wx.navigateTo({
            url: "/pages/work/proclamation/detail/detail?policyID=" + policyDetails.iD
        })
    },

    /**
     * 自定义下拉刷新
     */
    async handleRefresher() {
        let result = await request('/WeChatServlet', {
            _zhbai_METHOD: 'com.zhbai.platform.SmhAnnouncementManagementPage.onLoad'
        }, 'POST');
        this.setData({
            notice:result,
            isTriggered:false
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
        let notice = wx.getStorageSync('notice')
        this.setData({
            notice
        })
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