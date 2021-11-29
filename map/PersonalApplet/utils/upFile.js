var app = getApp();
export default (src=[])=>{
    return new Promise((resolve, reject) => {
        let storeAddress = []
        for (var i = 0; i < src.length; i++) {
            wx.uploadFile({
                url: app.data.url + "/Editor/filemanager/upload/zuploader.jsp", //真实的接口地址
                filePath: src[i].path,
                name: 'file',
                formData: {
                    'feature': "wxApplet",
                    'CatalogID': '10',
                    'FileType': 'Attach'
                },
                success(res) {
                    const data = res.data
                    storeAddress.push(data)
                    //do something
                },
                fail(err) {
                    reject(err);
                }
            })
        }
        resolve(storeAddress)
    })
}