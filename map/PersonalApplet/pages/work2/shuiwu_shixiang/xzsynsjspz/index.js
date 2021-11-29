// pages/work2/shuiwu_shixiang/xzsynsjspz/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  uploadpic: function(e){
    wx.chooseImage({
      success: function(res) {
        var tempFilePaths = res.tempFilePaths
        wx.uploadFile({
          url :'http://localhost:8080/MiniProgram/UploadFileServlet', //仅为示例，非真实的接口地址
          filePath: tempFilePaths[0],
          name: 'file',
          formData:{
            'user': 'test'
          },
          success: function(res){
            var data = res.data
            //do something
          }
        })
      }
    })
  },

  preview_img:function(){//图片预览函数
    wx.previewImage({
      current: this.data.img_l, // 当前显示图片的http链接
      urls: this.data.img_l // 需要预览的图片http链接列表
    })
  },
  down_file:function(){
    var _this = this;
    const downloadTask=wx.downloadFile({
      url: 'http://127.0.0.1/m_pro/min_img/1517295297785-2018-01-30.jpg', //仅为示例，并非真实的资源
      success: function (res) {
        // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
       console.log(res)
       if(res.statusCode === 200){
          _this.setData({
            img_l:res.tempFilePath //将下载的图片临时路径赋值给img_l,用于预览图片
          })
       }
      }
    })
    downloadTask.onProgressUpdate((res) => {
      console.log('下载进度', res.progress)
      console.log('已经下载的数据长度', res.totalBytesWritten)
      console.log('预期需要下载的数据总长度', res.totalBytesExpectedToWrite)
    })
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