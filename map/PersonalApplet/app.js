wx-App({
    data:{
        url:'https://www.zhengbaisoft.com/smh'
        //url:'http://localhost:80/smh'
    },
    onLaunch: function() {
        //云开发初始化
        wx.cloud.init({
            env:"cloud1-3grh7ay992ea307c"
        })
      
    },
    onShow: function() {
        
    },
    onHide: function() {
        
    }  
})