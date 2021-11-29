// pages/person_info/person_info.js
import request from "../../../utils/request";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user:"",
    Name:[],
    Key:[],
    RealName:"",
    IDCardNum:"",
    CensusRegisterAddress: "",
    NowAddress: "",
    Tel: "",
    Email: "",
    commpany:null,
    UserName:"",
    index: -1,
  },

     /**
     *获取下拉框的值
     * @param e
     */
    bindPickerChange: function (e) {
      this.setData({
          index: e.detail.value
      })
  },

  handleChange(e){
    if (e.detail.value.length === 1) {
      this.setData({
          commpany: true
      })
  } else {
      this.setData({
          commpany: false
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

   /**
     * 表单验证与提交
     */
    async buttonClick(){
    let {
      RealName,
      IDCardNum,
      CensusRegisterAddress,
      NowAddress,
      Tel,
      Email,
      UserName,
      index,
      Key
    } = this.data;
    if(Email==undefined){
      Email=""
    }
    if(NowAddress==undefined){
      NowAddress=""
    }
    if(CensusRegisterAddress==undefined){
      CensusRegisterAddress=""
    }
    if(RealName==undefined){
      RealName=""
    }
    let BranchInnerCode='0001';
    if (index>-1) {
        BranchInnerCode = Key[index]
    }
  
    //判断用户真实姓名是否符合标准
    if (RealName == "") {
      wx.showToast({
        title: '用户人姓名不能为空',
        icon: 'none'
    })
    return;
    }
    //判断身份证号是否未空并且是否有效
    if (IDCardNum == "" || !/^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(IDCardNum)) {
      wx.showToast({
          title: '身份证号不能为空或该身份证号无效！',
          icon: 'none'
      })
      return;
  }
  //验证联系电话格式
  if (Tel == "" || !/^1\d{10}$/.test(Tel)) {
    wx.showToast({
        title: '联系电话不能为空或该号无效！',
        icon: 'none'
    })
    return;
}
//验证邮箱格式是否正确
if (Email != "" && !/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(Email)) {
    wx.showToast({
        title: '该邮箱号无效！',
        icon: 'none'
    })
    return;
}
let result = await request('/WeChatServlet', {
  _zhbai_METHOD: 'com.zhbai.platform.UserList.registerEidt', UserName,RealName, IDCardNum, CensusRegisterAddress, NowAddress, Tel, Email,BranchInnerCode
}, 'POST');
if (result[0]){
  wx.showToast({
      title: '保存成功！',
      icon: 'none'
  })


  let comao =  await request('/WeChatServlet', {
    _zhbai_METHOD: 'com.zhbai.platform.UserList.search',UserName
  }, 'POST');
    wx.setStorageSync('userinfo', comao[0])
    this.onLoad();
  setTimeout(function () {
    var pages = getCurrentPages();
    var prePage = pages[pages.length - 2];
    prePage.onLoad();
    wx.navigateBack({
      url: '/pages/main/user_center/user_center'
    })
}, 1500);
}else {
  wx.showToast({
      title: '失败！',
      icon: 'none'
  })
  return;
}

  },

  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    this.setData({
      user:wx.getStorageSync('userinfo'),
    })
    let user = this.data.user
    this.setData({
      RealName:user.realName,
      IDCardNum:user.iDCardNum,
      CensusRegisterAddress:user.censusRegisterAddress,
      NowAddress:user.nowAddress,
      Tel:user.tel,
      Email:user.email,
      UserName:user.userName
    })
    let work = await request('/WeChatServlet', {
      _zhbai_METHOD: 'com.zhbai.platform.Branch.company'
    }, 'POST');
      this.onLoads(work);

    // let qian = this.data.IDCardNum.substring(0,4);  
    // let hou = this.data.IDCardNum.substring(14,18);
    // this.setData({
    //   IDCardNumqian:qian,
    //   IDCardNumhou:hou
    // })
    
  },

  onLoads:function(work){
    let Names=[]
    let Keys = []
    for(var i = 0;i<Object.keys(work).length;i++){
      Keys[i]=Object.keys(work)[i];
      Names[i] = work[Object.keys(work)[i]];
    }
    this.setData({
      Name:Names,
      Key:Keys
    })
  },

  getPhoneNumber(e) {
    var that = this;
    wx.cloud.callFunction({
      name: 'getMobile',
      data: {
        weRunData: wx.cloud.CloudID(e.detail.cloudID),
      }
    }).then(res => {
      that.setData({
        Tel: res.result,
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