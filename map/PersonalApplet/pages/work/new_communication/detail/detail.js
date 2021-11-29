// pages/work/new_communication/detail/detail.js
import request from "../../../../utils/request";

Page({

    /**
     * 页面的初始数据
     */
    data: {
        url: getApp().data.url.replace("/smh", ""),
        commodity: "",
        userinfo: ""
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: async function (options) {
        //加载产品数据
        let ID = options.commodityID;

        let result = await request('/WeChatServlet', {
            _zhbai_METHOD: 'com.zhbai.smh.SmhNewProductLaunchManagementPage.onLoad', ID
        }, 'POST');
        this.setData({
            commodity: result[0]
        })
    },

    /**
     *云开发支付
     */
    async goPay(commodity, ID) {
        wx.cloud.callFunction({
            //函数名
            name: 'pay',
            data: {
                //传参
                Name: commodity.tName,
                money: commodity.money,
                outTradeNo: ID
            },
            success: res => {
                console.log("获取支付参数成功！", res)
                const payment = res.result.payment
                //调起支付
                let that = this;
                wx.requestPayment({
                    ...payment,
                    success(res) {
                        that.endOrder(ID)
                        wx.showToast({
                            title: "支付成功"
                        })
                        console.log('pay success', res)
                    },
                    fail(err) {
                        wx.showToast({
                            title: "支付失败",
                            icon: 'error'
                        })
                        console.error('pay fail', err)
                    },
                })
            },
            //  fail: console.error,
            fail: err => {
                console.log("获取支付参数失败！", err)
            },
        })
    },
    //创建订单
    creatOrder() {
        let commodity = this.data.commodity
        wx.cloud.database().collection('order').add({
                data: {
                    //商品名
                    name: commodity.tName,
                    //价格
                    totalFee: commodity.money,
                    //创建时间
                    createTime: this.getCurrenTime()
                }
            }
        ).then(res => {
            wx.showToast({
                title: "订单创建成功"
            })
            this.goPay(commodity, res._id)
        }).catch(err => {
            console.log("创建失败", err)
            wx.showToast({
                title: "订单创建失败",
                icon: 'error'
            })
        })
    },
    contact:function (event) {
        let ID = event.currentTarget.id;
        wx.navigateTo({
          url: "../contact/contact?ID=" + ID
        })
    },
    async endOrder(orderNumber) {
        if (orderNumber.toString().length != 32) {
            orderNumber = "null"
        }
        this.setData({
            userinfo: wx.getStorageSync('userinfo'),
        })
        let {commodity, userinfo} = this.data;
        let F_ID = commodity.iD;
        let userName = userinfo.userName;
        let result = await request('/WeChatServlet', {
            _zhbai_METHOD: 'com.zhbai.smh.SmhNewProductLaunchbookManagementPage.createOrder',
            F_ID,
            orderNumber,
            userName
        }, 'POST');
        if (result[0] != undefined) {
            wx.showToast({
                title: "库存不足！",
                icon: 'none'
            })
        } else if (orderNumber != "null") {
            wx.showToast({
                title: "购买成功！"
            })
        } else if (orderNumber == "null") {
            wx.showToast({
                title: "预约成功！"
            })
        }
        /**
         * 跳转并刷新上一个页面
         */
        setTimeout(function () {
            var pages = getCurrentPages();
            var prePage = pages[pages.length - 2];
            prePage.onLoad();
            wx.navigateBack({
                url: "/pages/main/new_communication/new_communication"
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

    },//获取当前时间工具方法
    getCurrenTime() {
        var time = new Date();
        return time.getFullYear() + '年' + (time.getMonth() + 1) + '月' + time.getDate() + '日' + time.getHours() + '时' + time.getMinutes() + '分' + time.getSeconds() + '秒';
    }
})