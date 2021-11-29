// pages/work/policy/resource_up/resource_up.js
import request from "../../../../utils/request";
import chooseImage from "../../../../utils/chooseImage";
import upImage from "../../../../utils/upImage";

Page({

    /**
     * 页面的初始数据
     */
    data: {
        ID: null,
        imgUrl: [],
        tempFilePaths: []
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
    onLoad: async function (options) {
        let ID = options.policyID;
        let result = await request('/WeChatServlet', {
            _zhbai_METHOD: 'com.zhbai.platform.PolicyManagementList.policyDetail', ID
        }, 'POST')
        this.setData({
            policyDetail: result[0],
            ID
        })
    },

    /**
     * 选择图片文件
     */
    chooseImage: async function () {
        let tempFilePaths = await chooseImage(2);
        let img = [{tempFilePaths: tempFilePaths[0], id: 0}, {tempFilePaths: tempFilePaths[1], id: 1}]
        this.setData({
            imgUrl: img,
            tempFilePaths
        })
    },
    /**
     * 上传图片文件
     */
    upImage: async function () {
        let {tempFilePaths} = this.data
        let src = await upImage(tempFilePaths);
        console.log(src)

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