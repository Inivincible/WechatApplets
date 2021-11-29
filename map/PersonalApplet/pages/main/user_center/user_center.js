// pages/usercenter/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {},

    /**
     * 组件的初始数据
     */
    data: {
        userinfo:"",
        userVia:""
    },

    /**
     * 组件的方法列表
     */
    methods: {
        onLoad: function (options) {
            //动态修改user的状态数据,必须在data中修改数据
            this.setData({
                userinfo:wx.getStorageSync('userinfo'),
                userVia:wx.getStorageSync('userVia')
            })
        },
        loginOut() {
            wx.navigateTo({
                url: '/pages/main/user_signout/user_signout'
            })
        }
    }

})
