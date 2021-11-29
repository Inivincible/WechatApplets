// pages/daily_affairs_list/daily_affairs_list.js
import request from "../../../../utils/request";

Page({
    /**
     * 页面的初始数据
     */
    data: {
        isTriggered: false,
        dailyAffairs: null,
        tabnumber: 1,
        dailyAffairs1: null,
        Theme: '',
        Issuer: '',
        Place: '',
        Phone: '',
        Commitments: '',
        date: '',
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
     *跳转到详情页面
     * @param event
     */
    detail: function (event) {
        let transaction = event.currentTarget.dataset.song;
        let ID = event.currentTarget.id;
        wx.navigateTo({
            url: "/pages/work/daily_affairs/daily_affairs_detail/daily_affairs_detail?transactionID=" + transaction.iD + "&ID=" + ID
        })
    },
    clicktab1: function () {

        this.setData({
            tabnumber: 1
        })
    },
    clicktab2: function () {

        this.setData({
            tabnumber: 2
        })
    },
    clicktab3: function () {

        this.setData({
            tabnumber: 3
        })
    },
    /**
     * 自定义下拉刷新
     */
    async handleRefresher() {
        this.onLoad();
        this.setData({
            isTriggered: false
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: async function (options) {
        let result = await request('/WeChatServlet', {
            _zhbai_METHOD: 'com.zhbai.platform.TransactionDailyList.onLoad'
        }, 'POST');
        let result1 = await request('/WeChatServlet', {
            _zhbai_METHOD: 'com.zhbai.platform.TransactionDailyList.onLoad1'
        }, 'POST');
        this.setData({
            dailyAffairs: result,
            dailyAffairs1: result1
        })
    },

    /**
     * 获取日常任务文本数据
     */
    handleInput(event) {
        //获取输入的文本框类型
        let type = event.currentTarget.id;
        this.setData({
            [type]: event.detail.value
        })
    },

    /**
     * 发布日常任务
     */
    async ReleaseTask() {
        let branchInner = wx.getStorageSync("userinfo").branchInnerCode
        let {
            Theme,
            Issuer,
            Place,
            Phone,
            Commitments, date
        } = this.data;
        if (Issuer == "") {
            Issuer = wx.getStorageSync("userinfo").realName
        }
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
            _zhbai_METHOD: 'com.zhbai.platform.TransactionDailyList.addTask', Theme,
            Issuer,
            Place,
            Phone,
            Commitments, date, branchInner
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
        let that = this
        setTimeout(function () {
            var pages = getCurrentPages();
            var prePage = pages[pages.length - 1];
            prePage.onLoad();
            that.setData({
                tabnumber: 3
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