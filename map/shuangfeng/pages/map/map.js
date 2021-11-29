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
            markers: [
                {
                    id: 0,
                    latitude: 31.494004,
                    longitude: 121.05418,
                    iconPath: "/icon/xinwei.png",
                    width: 30,
                    height: 30,
                    callout: {
                        content: "维新遗址",
                        color: "#fff",
                        bgColor: "#336666",
                        fontSize: 13,
                        borderRadius: 5,
                        borderWidth: 1,
                        borderColor: '#fff',
                        padding: 5,
                        display: 'BYCLICK'
                    }
                }, {
                    id: 1,
                    latitude:31.525000,
                    longitude: 121.03886,
                    iconPath: "/icon/si.png",
                    width: 25,
                    height: 25,
                    callout: {
                        content: "双凤寺",
                        color: "#fff",
                        bgColor: "#C78421",
                        fontSize: 13,
                        borderRadius: 5,
                        borderWidth: 1,
                        borderColor: '#fff',
                        padding: 5,
                        display: 'BYCLICK'
                    }
                },  
                {
                    id: 2,
                    latitude: 31.522857,
                    longitude: 121.036791,
                    iconPath: "/icon/yipingyangrou.png",
                    width: 30,
                    height: 30,
                    callout: {
                        content: "一品羊肉美食街",
                        color: "#fff",
                        bgColor: "#336666",
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
                    latitude: 31.517756,
                    longitude: 121.033416,
                    iconPath: "/icon/yuhuangge.png",
                    width: 30,
                    height: 30,
                    callout: {
                        content: "玉皇阁",
                        color: "#fff",
                        bgColor: "#C78421",
                        fontSize: 13,
                        borderRadius: 5,
                        borderWidth: 1,
                        borderColor: '#fff',
                        padding: 5,
                        display: 'BYCLICK'
                    }
                },{
                    id: 4,
                    latitude: 31.517690,
                    longitude: 121.029634,
                    iconPath: "/icon/longshi.png",
                    width: 35,
                    height: 35,
                    callout: {
                        content: "双凤龙狮文化展示馆",
                        textAlign:"center",
                        color: "#fff",
                        bgColor: "#C78421",
                        fontSize: 13,
                        borderRadius: 5,
                        borderWidth: 1,
                        borderColor: '#fff',
                        padding: 5,
                        display: 'BYCLICK'
                    }
                },{
                    id: 5,
                    latitude: 31.506777,
                    longitude: 120.99579,
                    iconPath: "/icon/dujiacun.png",
                    width: 25,
                    height: 25,
                    callout: {
                        content: "华丽菲尼克斯度假村",
                        color: "#fff",
                        bgColor: "#336666",
                        fontSize: 13,
                        borderRadius: 5,
                        borderWidth: 1,
                        borderColor: '#fff',
                        padding: 5,
                        display: 'BYCLICK'
                    }
                }, 
                 {
                    id: 12,
                    latitude: 31.502015,
                    longitude: 121.00199,
                    iconPath: "/icon/jifajiaoyu.png",
                    width: 25,
                    height: 25,
                    callout: {
                        content: "太仓市农村基层党员干部纪法教育基地",
                        color: "#fff",
                        bgColor: "#BF0000",
                        fontSize: 13,
                        borderRadius: 5,
                        borderWidth: 1,
                        borderColor: '#fff',
                        padding: 5,
                        display: 'BYCLICK'
                    }
                }, 
                {
                    id: 15,
                    latitude: 31.518942,
                    longitude: 121.050231,
                    iconPath: "/icon/jiagongzhogxin.png",
                    width: 25,
                    height: 25,
                    callout: {
                        content: "“稻田理想  幸福庆丰”乡村农旅主体景区",
                        color: "#fff",
                        bgColor: "#F2991F",
                        fontSize: 13,
                        borderRadius: 5,
                        borderWidth: 1,
                        borderColor: '#fff',
                        padding: 5,
                        display: 'BYCLICK'
                    }
                },
                {   
                    id:13,
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
                },
                {   
                    id:14,
                    latitude:31.519995,
                    longitude:121.037839,
                    iconPath:"/icon/wei.png",
                    width:30,
                    height:30,
                    callout:{
                        content:"威利世家工厂店",
                        color:"#fff",
                        bgColor:"#8A2686",
                        fontSize:13,
                        borderRadius:5,
                        borderWidth:1,
                        borderColor:'#fff',
                        padding:5,
                        display:'BYCLICK'
                    }
                },
                {
                    id: 16,
                    latitude: 31.49914,
                    longitude: 121.00226,
                    iconPath: "/icon/xiandaiyuchanyeyuan.png",
                    width: 25,
                    height: 25,
                    callout: {
                        content: "双凤生态园",
                        color: "#fff",
                        bgColor: "#336699",
                        fontSize: 13,
                        borderRadius: 5,
                        borderWidth: 1,
                        borderColor: '#fff',
                        padding: 5,
                        display: 'BYCLICK'
                    }
                }, {
                    id: 11,
                    latitude: 31.438314,
                    longitude: 121.030149,
                    iconPath: "/icon/qihongjinli.png",
                    width: 25,
                    height: 25,
                    callout: {
                        content: "启泓锦鲤养殖基地",
                        color: "#fff",
                        bgColor: "#BF0000",
                        fontSize: 13,
                        borderRadius: 5,
                        borderWidth: 1,
                        borderColor: '#fff',
                        padding: 5,
                        display: 'BYCLICK'
                    }
                },
                {   
                    id:17,
                    latitude:31.500353,
                    longitude:121.054956,
                    iconPath:"/icon/xiangyu.png",
                    width:35,
                    height:25,
                    callout:{
                        content:"香玉糟油工厂店",
                        color:"#fff",
                        bgColor:"#3CB6F3",
                        fontSize:13,
                        borderRadius:5,
                        borderWidth:1,
                        borderColor:'#fff',
                        padding:5,
                        display:'BYCLICK'
                    }
                },
                {
                    id: 18,
                    latitude: 31.500500,
                    longitude: 121.052555,
                    iconPath: "/icon/tangxindan.png",
                    width: 25,
                    height: 25,
                    callout: {
                        content: "溏心蛋工厂店",
                        color: "#fff",
                        bgColor: "#D93134",
                        fontSize: 13,
                        borderRadius: 5,
                        borderWidth: 1,
                        borderColor: '#fff',
                        padding: 5,
                        display: 'BYCLICK'
                    }
                }, {
                    id: 19,
                    latitude: 31.477925,
                    longitude: 121.068248,
                    iconPath: "/icon/koushuiwa.png",
                    width:30,
                    height: 30,
                    callout: {
                        content: "口水娃工厂店",
                        color: "#fff",
                        bgColor: "#44A639",
                        fontSize: 13,
                        borderRadius: 5,
                        borderWidth: 1,
                        borderColor: '#fff',
                        padding: 5,
                        display: 'BYCLICK'
                    }
                },
                {
                    id: 8,
                    latitude: 31.451042,
                    longitude: 121.068641,
                    iconPath: "/icon/baiguo.png",
                    width:30,
                    height: 30,
                    callout: {
                        content: "“百果香泾”采摘园",
                        color: "#fff",
                        bgColor: "#44A639",
                        fontSize: 13,
                        borderRadius: 5,
                        borderWidth: 1,
                        borderColor: '#fff',
                        padding: 5,
                        display: 'BYCLICK'
                    }
                },
                {
                    id: 7,
                    latitude: 31.466582,
                    longitude: 121.039993,
                    iconPath: "/icon/tao.png",
                    width:30,
                    height: 30,
                    callout: {
                        content: "“锦绣桃园”采摘园",
                        color: "#fff",
                        bgColor: "#44A639",
                        fontSize: 13,
                        borderRadius: 5,
                        borderWidth: 1,
                        borderColor: '#fff',
                        padding: 5,
                        display: 'BYCLICK'
                    }
                },
                {
                    id: 9,
                    latitude: 31.505481,
                    longitude: 121.004078,
                    iconPath: "/icon/su.png",
                    width:30,
                    height: 30,
                    callout: {
                        content: "“临水居”民宿",
                        color: "#fff",
                        bgColor: "#44A639",
                        fontSize: 13,
                        borderRadius: 5,
                        borderWidth: 1,
                        borderColor: '#fff',
                        padding: 5,
                        display: 'BYCLICK'
                    }
                }
                ,
                {
                    id: 6,
                    latitude: 31.503284,
                    longitude: 121.01047,
                    iconPath: "/icon/lian.png",
                    width:30,
                    height: 30,
                    callout: {
                        content: "“子莲”生态文化园",
                        color: "#fff",
                        bgColor: "#44A639",
                        fontSize: 13,
                        borderRadius: 5,
                        borderWidth: 1,
                        borderColor: '#fff',
                        padding: 5,
                        display: 'BYCLICK'
                    }
                }
            ]
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