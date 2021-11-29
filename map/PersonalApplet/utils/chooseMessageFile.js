//选择附件
export default (number=1) =>{
    return new Promise((resolve,reject)=>{
        wx.chooseMessageFile({
            count: number,
            type: 'file',
            success (res) {
                const tempFilePaths = res.tempFiles
                resolve(tempFilePaths)
            },
            fail:(err)=>{
                reject(err);
            }
        })
    })
}