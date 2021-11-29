// pages/work/affairs_order/new/new.js
import request from "../../../../utils/request";

Page({
    /**
     * 页面的初始数据
     */
    data: {
        date: '',
        array: ['临时事务', '义工事务', '个人事务'],
        objectArray: [
            {
                id: 0,
                name: 'Temporary'
            },
            {
                id: 1,
                name: 'Volunteers'
            },
            {
                id: 2,
                name: 'Personal'
            }
        ],
        index: -1,
        Theme: '',
        Issuer: '',
        Place: '',
        Phone: '',
        Commitments: ''
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
     * 时间文本框
     * @param e
     */
    bindDateChange: function (e) {
        this.setData({
            date: e.detail.value
        });
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
    },
    async ReleaseTask() {
        let branchInner = wx.getStorageSync("userinfo").branchInnerCode
        let {
            index,
            Theme,
            Issuer,
            Place,
            Phone,
            Commitments, date
        } = this.data;
        let type = this.data.objectArray[index].name
        if (Issuer == "") {
            Issuer = wx.getStorageSync("userinfo").realName
        }
        let userName= wx.getStorageSync("userinfo").realName
        if (Theme == "") {
            wx.showToast({
                title: '请填写主题！',
                icon: 'none'
            })
            return;
        }
        if (Place == "") {
            wx.showToast({
                title: '请填写地址！',
                icon: 'none'
            })
            return;
        }
        if (Phone == "") {
            wx.showToast({
                title: '请填写电话！',
                icon: 'none'
            })
            return;
        }

        let result = await request('/WeChatServlet', {
            _zhbai_METHOD: 'com.zhbai.platform.TransactionAppletUtility.addTransaction', Theme,
            Issuer,
            Place,
            Phone,
            Commitments, date, branchInner, type,userName
        }, 'POST');
        if (result[0]) {
            wx.showToast({
                title: '新建成功！',
                icon: 'success'
            })
        } else {
            wx.showToast({
                title: '新建失败！',
                icon: 'error'
            })
        }
        setTimeout(function () {
            wx.navigateBack({
                url: "/pages/main/index-gs/index-gs"
            })
        }, 1500);

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