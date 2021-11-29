var app = getApp();
export default (src=[])=>{
    return new Promise((resolve, reject) => {
            wx.uploadFile({
                url: app.data.url + "/Editor/filemanager/upload/simpleuploader.jsp", //真实的接口地址
                filePath: src[0],
                name: 'file',
                formData: {
                    'feature': "wxApplet",
                    'CatalogID': '11',
                    'FileType': 'Image'
                },
                success(res) {
                    resolve(res.data);
                    //do something
                },
                fail(err) {
                    reject(err);
                }
            })
        
    })
}