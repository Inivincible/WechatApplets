// pages/work2/feedback/feedback.js
import request from "../../../utils/request";

Page({

    /**
     * 页面的初始数据
     */
    data: {
        array: [],
        index: -1,
        Content:"",

    },
    /**
     *获取下拉框的值
     * @param e
     */
    bindPickerChange: function (e) {
        this.setData({
            index: e.detail.value
        })
    },
    /**
     * 获取任务文本数据
     */
    handleInput(event) {
        //获取输入的文本框类型
        let type = event.currentTarget.id;
        this.setData({
            [type]: event.detail.value
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: async function (options) {
        let result = await request('/WeChatServlet', {
            _zhbai_METHOD: 'com.zhbai.smh.SmhOpinionPage.opinionType'
        }, 'POST');
        this.setData({
            array:result
        })
    },
    /**
     * 意见反馈连接后端
     */
    ReleasePinion:async function () {
        let userName = wx.getStorageSync('userinfo').userName
        let {array,
            index,
            Content}=this.data
        let Type = array[index]
        if (Content.length<10){
            wx.showToast({
                title: '意见不能少于10的字！',
                icon: 'none'
            })
            return
        }
        let result = await request('/WeChatServlet', {
            _zhbai_METHOD: 'com.zhbai.smh.SmhOpinionPage.addWeChat',Content,Type,userName
        }, 'POST');

        if (result[0]){
            wx.showToast({
                title: '反馈成功！',
                icon: 'success'
            })
            /**
             * 跳转并刷新上一个页面
             */
            setTimeout(function () {
                wx.navigateBack({
                    url: "pages/main/user_center/user_center"
                })
            }, 1000);
        }else{
            wx.showToast({
                title: '反馈失败！',
                icon: 'error'
            })
        }
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