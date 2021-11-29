// pages/work2/bangwogemang/new/new.js
import request from "../../../../utils/request";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Type:"Daily",
    ReleaseStaff:"",
    Theme:"",
    date:"",
    Place:"",
    Phone:"",
    Commitments:""
  },

  /**
   * 获取导航条信息
   */
  handleTap:function(event){
    this.setData({
      Type:event.currentTarget.dataset.value
    })
  },

  /**
   * 获取时间信息
   */
  bindDateChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },

  /**
   * 获取表单信息
   */
  handleInput(event){
    //获取输入的文本框类型
    let type = event.currentTarget.id;
    this.setData({
        [type]: event.detail.value
    })
  },

  /**
   * 提交表单信息
   */
  async buttonClick(){
    let {
      ReleaseStaff,
      Theme,
      date,
      Place,
      Phone,
      Commitments
    } = this.data;
    let type = this.data.Type;
    let realName = wx.getStorageSync('userinfo').realName;
    let branchInner = wx.getStorageSync('userinfo').branchInnerCode;
    //验证发布人员不能为空
    if (ReleaseStaff == "" && type == "Personal") {
      wx.showToast({
        title: '发布人员不能为空！',
        icon:'none'
      })
      return;
    }
     //验证任务主题不能为空
     if (Theme == "") {
      wx.showToast({
        title: '任务主题不能为空！',
        icon:'none'
      })
      return;
    }
    //验证时间不能为空
    if (date == "") {
      wx.showToast({
        title: '任务时间不能为空！',
        icon:'none'
      })
      return;
    }
    //验证联系电话格式
    if (Phone == "" || !/^1\d{10}$/.test(Phone)) {
      wx.showToast({
          title: '联系电话不能为空或该号无效！',
          icon: 'none'
      })
      return;
    }
    let result = await request('/WeChatServlet', {
      _zhbai_METHOD: 'com.zhbai.platform.TransactionAppletUtility.addTransactions',type,realName,branchInner,ReleaseStaff,Theme,date,Place,Phone,Commitments
    }, 'POST');
    if (result[0]){
      wx.showToast({
          title: '发布成功！',
          icon: 'none'
      })

      setTimeout(function () {
        var pages = getCurrentPages();
        var prePage = pages[pages.length - 2];
        prePage.onLoad();
        wx.navigateBack({
          url: '/pages/main/index/index'
        })
    }, 1500);

    }else {
      wx.showToast({
          title: '发布失败！',
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