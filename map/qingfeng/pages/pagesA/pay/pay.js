// pages/pagesA/pay/pay.js
import request from "../../../utils/request";
Page({

    /**
     * 页面的初始数据
     */
    data: {
        details:"",
        mall:getApp().data.mall,
        Tel:"",
        payname:"",
        di:"",
    },
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
    onLoad: function (options) {
        let mall = this.data.mall
        this.setData({
            details:mall[options.id]
        })
    },
    getPhoneNumber(e) {
        var that = this;
        wx.cloud.callFunction({
          name: 'getMobile',
          data: {
            weRunData: wx.cloud.CloudID(e.detail.cloudID),
          }
        }).then(res => {
          that.setData({
            Tel: res.result,
          })
        }).catch(err => {
          console.error(err);
        });
      },

      /**
     *云开发支付
     */
    async goPay(details, ID) {
        wx.cloud.callFunction({
            //函数名
            name: 'pay',
            data: {
                //传参
                Name: details.name,
                money: details.money,
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
    async endOrder(orderNumber) {
        let {details,Tel,payname,di} = this.data;
        let name =details.name;
        let money = details.money;
        let otel = details.tel;

        let result = await request('/WeChatServlet', {
            _zhbai_METHOD: 'com.zhbai.smh.AFQPayPage.createOrder',
            name,money,otel,Tel,payname,di,
            orderNumber
        }, 'POST');
        console.log(result)
        if (result[0]) {
            wx.showToast({
                title: "购买成功！",
            })
        } else {
            wx.showToast({
                title: "购买失败！",
                icon: 'none'
            })}
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
    //创建订单
    creatOrder() {
        let{Tel,payname,di}=this.data
        if(payname==""){
            wx.showToast({
                title: '姓名不能为空',
                icon: 'none'
            })
            return;
        }
        if(di==""){
            wx.showToast({
                title: '地址不能为空',
                icon: 'none'
            })
            return;
        }
        if(Tel==""){
            wx.showToast({
                title: '电话不能为空',
                icon: 'none'
            })
            return;
        }

        let details = this.data.details
        wx.cloud.database().collection('qforder').add({
                data: {
                    //商品名
                    name: details.name,
                    //价格
                    totalFee: details.money,
                    //创建时间
                    createTime: this.getCurrenTime()
                }
            }
        ).then(res => {
            wx.showToast({
                title: "订单创建成功"
            })
            this.goPay(details, res._id)
        }).catch(err => {
            console.log("创建失败", err)
            wx.showToast({
                title: "订单创建失败",
                icon: 'error'
            })
        })
    },
    getCurrenTime() {
        var time = new Date();
        return time.getFullYear() + '年' + (time.getMonth() + 1) + '月' + time.getDate() + '日' + time.getHours() + '时' + time.getMinutes() + '分' + time.getSeconds() + '秒';
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