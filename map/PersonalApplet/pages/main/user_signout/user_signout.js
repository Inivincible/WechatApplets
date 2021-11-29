Component({
    /**
     * 组件的属性列表
     */
    properties: {},

    /**
     * 组件的初始数据
     */
    data: {
        user: '',
        userVia:""
    },

    /**
     * 组件的方法列表
     */
    methods: {
        onLoad: function (options) {
            //动态修改user的状态数据,必须在data中修改数据
            this.setData({
                user: wx.getStorageSync('userinfo').realName,
                userVia:wx.getStorageSync('userVia')
            })
        },
        loginOut() {
            this.setData({
                user: "",
                userVia:""
            })
            wx.setStorageSync('userinfo', null)
            wx.setStorageSync('userVia',null)
            wx.reLaunch({
                url: '/pages/main/login/login'
            })

        }
    }

})