// pages/work/new_communication/contact/contact.js
import request from "../../../../utils/request";
Page({

    /**
     * 页面的初始数据
     */
    data: {
        Content:"",
        FromUser:"",
        Title:"",
        UserList:"",
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: async function (options) {
        let ID = options.ID;
        let result = await request('/WeChatServlet', {
            _zhbai_METHOD: 'com.zhbai.smh.SmhNewProductLaunchManagementPage.onLoad', ID
        }, 'POST');
        let RealName = result[0].fName;
        let result1 = await request('/WeChatServlet', {
            _zhbai_METHOD: 'com.zhbai.platform.UserList.search', RealName
        }, 'POST');
        this.setData({
            FromUser:result1[0].userName,
            ID:ID,
            UserList:wx.getStorageSync('userinfo').userName,
        })
    },
    handleInput(event) {
        //获取输入的文本框类型
        let type = event.currentTarget.id;
        this.setData({
            [type]: event.detail.value
        })
    },
    ReleasePinion: async function (){
        let {
            ID,
            Title,
            Content,
            FromUser,
            UserList,
        }=this.data
        if(Title==""){
            wx.showToast({
                title:'标题不能为空!',
                icon:'none'
            })
            return;
        }
        if(Content==""){
            wx.showToast({
                title:'内容不能为空!',
                icon:'none'
            })
            return;
        }
        if(ID!=undefined&&FromUser!=""){
            let Subject = Title;
            let ToUser = FromUser;
            let CurrentUser = UserList;
            let ToRole="";
            let result = await request('/WeChatServlet', {
                _zhbai_METHOD: 'com.zhbai.cms.document.Message.add', Subject,Content,CurrentUser,ToUser,ToRole
            }, 'POST');
            wx.showToast({
                title:'发送成功!',
                icon:'none'
            });
            setTimeout(function () {
                var pages = getCurrentPages();
                var prePage = pages[0];
                prePage.onLoad();
                wx.navigateBack()
                wx.navigateBack()
            }, 1500);
        }else{
            wx.showToast({
                title:'请联系管理员!',
                icon:'none'
            })
            return;
        }
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