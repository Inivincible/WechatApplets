//选择图片number最多不超过9张
export default (number=1) =>{
    return new Promise((resolve,reject)=>{
        wx.chooseImage({
            count: number,
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera'],
            success(res) {
                // tempFilePath可以作为img标签的src属性显示图片
                const tempFilePaths = res.tempFilePaths
                resolve(tempFilePaths)
            },
            fail:(err)=>{
                reject(err);
            }
        })
    })
}