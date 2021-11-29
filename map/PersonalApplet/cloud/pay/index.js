// 云函数代码
const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

exports.main = async (event, context) => {
  const res = await cloud.cloudPay.unifiedOrder({
    //商品名称或商品描述
    "body" : event.Name,
    //订单号必须保持唯一性
    //1217752501201407033233368018
    "outTradeNo" :event.outTradeNo,
    //回调地址
    "spbillCreateIp" : "127.0.0.1",
    //微信支付商户号
    "subMchId" : "1613450330",
    //支付的金额（分）
    "totalFee" : event.money*100,
    //云环境ID
    "envId": "cloud1-3grh7ay992ea307c",
    //回调
    "functionName": "pay_cb"
  })
  return res
}
