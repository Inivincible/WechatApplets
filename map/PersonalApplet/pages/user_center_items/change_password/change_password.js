// pages/change_password/change_password.js
import request from "../../../utils/request";
Page({

    /**
     * 页面的初始数据
     */
    data: {
        UserName: '',
        password1: '',
        password2: '',
        password3: '',
        passWordType:true,
        yanjingType:true,
        passWordTypea:true,
        yanjingTypea:true,
        passWordTypeb:true,
        yanjingTypeb:true
    },
    //原密码眼睛显示
    eyeStates: function(){
        this.data.passWordType = !this.data.passWordType
        this.data.yanjingType = !this.data.yanjingType
        this.setData({
            passWordType:this.data.passWordType,
            yanjingType:this.data.yanjingType
        })
    },
    //新密码眼睛显示
    eyeStatesa: function(){
        this.data.passWordTypea = !this.data.passWordTypea
        this.data.yanjingTypea = !this.data.yanjingTypea
        this.setData({
            passWordTypea:this.data.passWordTypea,
            yanjingTypea:this.data.yanjingTypea
        })
    },
    //确认新密码眼睛显示
    eyeStatesb: function(){
        this.data.passWordTypeb = !this.data.passWordTypeb
        this.data.yanjingTypeb = !this.data.yanjingTypeb
        this.setData({
            passWordTypeb:this.data.passWordTypeb,
            yanjingTypeb:this.data.yanjingTypeb
        })
    },

//表单项内容发送改变的回调
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
        this.setData({
            UserName: wx.getStorageSync('userinfo').userName
        })
    },
    /**
     * 表单验证与提交
     */
    async buttonClick() {
        let {
            UserName,
            password1,
            password2,
            password3,
        } = this.data;
        if (password1 =="") {
            wx.showToast({
                title: '请输入原密码！',
                icon: 'none'
            })
            return;
        }
        if (password2 =="") {
            wx.showToast({
                title: '请输入新密码！',
                icon: 'none'
            })
            return;
        }
        if (password3 =="") {
            wx.showToast({
                title: '请再次输入新密码！',
                icon: 'none'
            })
            return;
        }
        //判断两次输入密码是否一致
        if (password2 != password3) {
            wx.showToast({
                title: '两次输入的密码不一致请重新输入！',
                icon: 'none'
            })
            return;
        }
        let result = await request('/WeChatServlet', {
            _zhbai_METHOD: 'com.zhbai.platform.UserList.changePassWord', UserName, password1,
            password2
        }, 'POST')
        console.log(result[0])
        if (!result[0]){
            wx.showToast({
                title: '原密码错误！',
                icon:'error'
            })
        }else {
            wx.showToast({
                title: '密码修改成功！',
            })
        }

        setTimeout(function () {
            var pages = getCurrentPages();
            var prePage = pages[pages.length - 2];
            prePage.onLoad();
            wx.navigateBack({
                url: "/pages/main/user_center/user_center"
            })
        }, 1000);
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