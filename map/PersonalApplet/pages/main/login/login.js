// pages/login/login.js
import request from "../../../utils/request";
import chooseMessageFile from "../../../utils/chooseMessageFile";
import upFile from "../../../utils/upFile";

Page({
    /**
     * 页面的初始数据
     */
    data: {
        userInfo: '',
        userName: '',
        passWord: '',
        itmes: true,
        openid: "",
        passWordType:true,
        yanjingType:true,
        mobile:''
    },    
    //密码眼睛显示
    eyeStates: function(){
        this.data.passWordType = !this.data.passWordType
        this.data.yanjingType = !this.data.yanjingType
        this.setData({
            passWordType:this.data.passWordType,
            yanjingType:this.data.yanjingType
        })
    },
//同意协议
    changebutton(e) {
        if (e.detail.value.length === 1) {
            this.setData({
                itmes: true
            })
        } else {
            this.setData({
                itmes: false
            })
        }
    },

//表单项内容发送改变的回调
    handleInput(event) {
        //获取输入的文本框类型
        let type = event.currentTarget.id;
        this.setData({
            [type]: event.detail.value
        })
    },
    //微信登录
    clickgs() {
        let that = this;
        wx.getUserProfile({
            desc: "用于完善会员资料",//声明获取用户权限用途
            success: (res) => {
                let realName = res.userInfo.nickName
                wx.setStorageSync("userVia",res.userInfo.avatarUrl)
                wx.cloud.callFunction({
                    name: 'openid',
                    success(res) {
                        var openid = res.result.openid
                        that.setData({
                            openid
                        })
                        that.WeChat(openid,realName);
                    }
                })
            },
        })
    },
    async buttonClick() {
        //获取表单数据
        let {userName, passWord, itmes} = this.data;
        //前端验证
        if (!userName) {
            //提示用户账号不能为空
            wx.showToast({
                title: '账号不能为空！',
                icon: 'none'
            })
            return;
        }

        if (!passWord) {
            //提示用户账号不能为空
            wx.showToast({
                title: '密码不能为空！',
                icon: 'none'
            })
            return;
        }
        if (!itmes) {
            //提示用户同意协议
            wx.showToast({
                title: '请先同意相关协议！',
                icon: 'none'
            })
            return;
        }


        let result = await request('/WeChatServlet', {
            _zhbai_METHOD: 'com.zhbai.platform.UserList.onLoad', userName, passWord
        }, 'POST')
        wx.setStorageSync('userinfo', null)
        wx.setStorageSync('userinfo', result[0]);
        if (result.length != 0) {
            wx.switchTab({
                url: '/pages/main/index/index',
            })
        } else if (result.length == 0) {
            wx.showToast({
                title: '账号或密码错误！',
                icon: 'error'
            })
        }
    },
    /**
     * 微信快捷登录
     */
    async WeChat(openid,realName) {
        let result = await request('/WeChatServlet', {
            _zhbai_METHOD: 'com.zhbai.platform.UserList.WeChatonLoad',openid,realName
        }, 'POST')
        wx.setStorageSync('userinfo', null);
        wx.setStorageSync('userinfo', result[0]);
        wx.switchTab({
            url: '/pages/main/index/index',
        })
    },
    //选择文件
    async choose(){
        let path = await chooseMessageFile(1);
        console.log(path)
        let src = await upFile(path);
        console.log(src)
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

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