// pages/main/user_zhuce.js

import request from "../../../utils/request";

Page({

    /**
     * 页面的初始数据
     */
    data: {
        UserName: "",
        RealName:"",
        PassWord: "",
        PassWord1: "",
        Mobile: "",
        passWordType:true,
        yanjingType:true,
        passWordTypes:true,
        yanjingTypes:true
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
     //确认密码眼睛显示
     eyeStatess: function(){
        this.data.passWordTypes = !this.data.passWordTypes
        this.data.yanjingTypes = !this.data.yanjingTypes
        this.setData({
            passWordTypes:this.data.passWordTypes,
            yanjingTypes:this.data.yanjingTypes
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
     * 表单验证与提交
     */ async buttonClick() {
        let {
            UserName,
            RealName,
            PassWord,
            PassWord1,
            Mobile,
        } = this.data;
        //判断用户名是否为空且是否符合标准
        if (UserName == "" || !/^[0-9a-zA-Z]+$/.test(UserName)) {
            wx.showToast({
                title: '用户名不能为空且只能包含英文和数字',
                icon: 'none'
            })
            return;
        }
        //判断昵称是否为空且是否符合标准
        if (UserName == "") {
            wx.showToast({
                title: '用户名不能为空且只能包含英文和数字',
                icon: 'none'
            })
            return;
        }
        //判断密码是否为空
        if (PassWord =="" || PassWord == "") {
            wx.showToast({
                title: '请输入密码！',
                icon: 'none'
            })
            return;
        }
        //判断两次输入密码是否一致
        if (PassWord != PassWord1) {
            wx.showToast({
                title: '两次输入的密码不一致请重新输入！',
                icon: 'none'
            })
            return;
        }
        
        //验证手机号格式
        if (Mobile == "" || !/^1\d{10}$/.test(Mobile)) {
            wx.showToast({
                title: '手机号不能为空或该号无效！',
                icon: 'none'
            })
            return;
        }


        let result = await request('/WeChatServlet', {
            _zhbai_METHOD: 'com.zhbai.platform.UserList.register', UserName, RealName, PassWord, Mobile
        }, 'POST')
        if (result[0].userName==UserName){
            wx.showToast({
                title: '该用户名已存在！',
                icon: 'none'
            })
            return;
        }else if (result[0]){
            wx.showToast({
                title: '注册成功！',
                icon: 'none'
            })
            setTimeout(function () {
                wx.reLaunch({
                    url: '/pages/main/login/login'
                })
            }, 1000);
            return;
        }else {
            wx.showToast({
                title: '注册失败！',
                icon: 'none'
            })
            return;
        }

    },


    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    //一键获取手机号码
  getPhoneNumber(e) {
    var that = this;
    wx.cloud.callFunction({
      name: 'getMobile',
      data: {
        weRunData: wx.cloud.CloudID(e.detail.cloudID),
      }
    }).then(res => {
      that.setData({
        Mobile: res.result,
      })
    }).catch(err => {
      console.error(err);
    });
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