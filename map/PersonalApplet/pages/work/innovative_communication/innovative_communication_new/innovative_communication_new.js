// pages/innovative_communication_new/innovative_communication_new.js
import request from "../../../../utils/request";
import chooseImage from "../../../../utils/chooseImage";
import upImage from "../../../../utils/upImage";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Title:"",
    sdate:"",
    stime:"",
    edate:"",
    etime:"",
    Address:"",
    Type:[],
    Money:"",
    imgUrl:[],
    tempFilePaths:[]
  },

  /**
     *获取下拉框的值
     */
    bindPickerChange: function (e) {
      this.setData({
          index: e.detail.value
      })
  },
  /**
   * 获取时间的值
   */
  bindDateChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      sdate: e.detail.value,
    })
  },
  bindTimeChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      stime: e.detail.value,
    })
  },
  bindDateChanges: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      edate: e.detail.value,
    })
  },
  bindTimeChanges: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      etime: e.detail.value,
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
   * 表单提交
   */ 
  async buttonClick(){
    let{
      Title,
      sdate,
      stime,
      edate,
      etime,
      Address,
      Money,
      Type,
      index
    } = this.data;
    let UserName = wx.getStorageSync('userinfo').userName;
    let type = Type[index];
    let {tempFilePaths} = this.data;
    let src;
    if (tempFilePaths.length!=0) {
      src = await upImage(tempFilePaths);
    }
    let result = await request('/WeChatServlet', {
      _zhbai_METHOD: 'com.zhbai.smh.SmhInnovativeCommunicationManagementPage.newActive',UserName,src,sdate,stime,edate,etime,type,Title,Address,Money
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
        url: '/pages/work/innovative_communication/innovative_communication_list/innovative_communication_list'
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
  onLoad:async function (options) {
    let result = await request('/WeChatServlet', {
      _zhbai_METHOD: 'com.zhbai.smh.SmhInnovativeCommunicationManagementPage.type'
    }, 'POST');
    let Types = []
    for (let i = 0; i < result.length; i++) {
      Types[i] = result[i].codeName
    }
    this.setData({
      Type:Types
    })
  },

  /**
     * 选择图片文件
     */
  chooseImage: async function () {
    let tempFilePaths = await chooseImage(1);
    let img = [{tempFilePaths: tempFilePaths[0], id: 0}];
    this.setData({
        imgUrl: img,
        tempFilePaths
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

  }
})