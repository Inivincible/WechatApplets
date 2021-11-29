var lastTouchPoint = {
    x: 0,
    y: 0
};
var newDist = 0;
var oldDist = 0;
var inTouch = false;

Page({

    /**
     * 页面的初始数据
     */
    data: {
        markers: [],
        ballTop: "",
        screenHeight: "",
        startHeight: "",
        navigation: getApp().data.navigation,
        url: getApp().data.url,
        detail: ""
    },
    gotohere: function () {
        let d = this.data.detail
        console.log(d)
        wx.openLocation({
            latitude: d.latitude,
            longitude: d.longitude,
            name: d.name,
            success: function (res) {
                console.log(res);
            },
            fail: function (res) {
                console.log(res);
            }
        })
    },
    button: function () {
        wx.getLocation({
            success: function (res) {
                this.setData({

                })
            }
        })
    },

    /**
     * 跳转页面
     */
    handleTap: function (event) {
        let id = parseInt(event.currentTarget.id);
        wx.navigateTo({
            url: "../pagesA/details/details?id=" + id,
        })
    },
    /**
     * 滑动页面
     */
    handletouchmove: function (event) {
        let pageY = event.touches[0].pageY;
        //判断滑动的底线距离
        if (pageY < 200) {
            return;
        }
        if (pageY > this.data.screenHeight - 30) {
            return;
        }
        this.setData({
            ballTop: event.touches[0].pageY - 30
        })
    },



    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        //获取屏幕高度
        let that = this;
        wx.getSystemInfo({
            success: (result) => {
                that.setData({
                    screenHeight: result.windowHeight,
                    startHeight: result.windowHeight - 115
                });
            }
        });

        this.setData({
            markers: [{
                id: 2,
                latitude: 31.513246,
                longitude: 121.048151,
                iconPath: "/icon/qf.png",
                width: 40,
                height: 40,
                callout: {
                    content: "富华稻米深加工中心",
                    color: "#fff",
                    bgColor: "#F29920",
                    fontSize: 13,
                    borderRadius: 5,
                    borderWidth: 1,
                    borderColor: '#fff',
                    padding: 5,
                    display: 'BYCLICK'
                }
            },
            {
                id: 3,
                latitude:31.51874,
                longitude: 121.049848,
                iconPath: "/icon/kaixin.png",
                width: 35,
                height: 35,
                callout: {
                    content: "邨邨乐开心农场",
                    color: "#fff",
                    bgColor: "#F29920",
                    fontSize: 13,
                    borderRadius: 5,
                    borderWidth: 1,
                    borderColor: '#fff',
                    padding: 5,
                    display: 'BYCLICK'
                }
            },{
                id: 1,
                latitude:31.522372,
                longitude: 121.041053,
                iconPath: "/icon/yuyang.png",
                width: 40,
                height: 40,
                callout: {
                    content: "富华农场育秧基地",
                    color: "#fff",
                    bgColor: "#F29920",
                    fontSize: 13,
                    borderRadius: 5,
                    borderWidth: 1,
                    borderColor: '#fff',
                    padding: 5,
                    display: 'BYCLICK'
                }
            },{
                id: 0,
                latitude: 31.518942,
                longitude: 121.050231,
                iconPath: "/icon/jiagongchang.png",
                width: 35,
                height: 35,
                callout: {
                    content: "稻田理想",
                    color: "#fff",
                    bgColor: "#F2991F",
                    fontSize: 13,
                    borderRadius: 5,
                    borderWidth: 1,
                    borderColor: '#fff',
                    padding: 5,
                    display: 'BYCLICK'
                }
            },{   
                id:4,
                latitude:31.527899,
                longitude:121.038806,
                iconPath:"/icon/feifeng.png",
                width:35,
                height:30,
                callout:{
                    content:"飞凤工厂店",
                    color:"#fff",
                    bgColor:"#856C56",
                    fontSize:13,
                    borderRadius:5,
                    borderWidth:1,
                    borderColor:'#fff',
                    padding:5,
                    display:'BYCLICK'
                }
            },]
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

    },
    //点击我显示底部弹出框
    clickme: function (e) {
        console.log(e)
        let i = e.detail.markerId
        console.log(i)
        let detail = this.data.navigation[i]
        this.setData({
            detail
        })
        this.showModal();
    },

    //显示对话框
    showModal: function () {
        // 显示遮罩层
        var animation = wx.createAnimation({
            duration: 200,
            timingFunction: "linear",
            delay: 0
        })
        this.animation = animation
        animation.translateY(300).step()
        this.setData({
            animationData: animation.export(),
            showModalStatus: true
        })
        setTimeout(function () {
            animation.translateY(0).step()
            this.setData({
                animationData: animation.export()
            })
        }.bind(this), 200)
    },
    //隐藏对话框
    hideModal: function () {
        // 隐藏遮罩层
        var animation = wx.createAnimation({
            duration: 200,
            timingFunction: "linear",
            delay: 0
        })
        this.animation = animation
        animation.translateY(300).step()
        this.setData({
            animationData: animation.export(),
        })
        setTimeout(function () {
            animation.translateY(0).step()
            this.setData({
                animationData: animation.export(),
                showModalStatus: false
            })
        }.bind(this), 200)
    }
})