const fetcher = require("node-fetch");
const crypto = require("crypto");
const querystring = require("querystring");

/**
 * @name 获取签名
 * @argument:
 *   @appid APPID	可在管理控制台查看
 *   @query 请求翻译query	UTF-8编码
 *   @key 秘钥
 *   @salt 随机数
 * */

function getSign(appid = "", query = "", key = "", salt = "") {
  const md5 = crypto.createHash("md5");
  md5.update(appid + query + salt + key);
  return md5.digest("hex");
}

/**
 * @name 调用百度翻译接口获取数据
 * @param {
 *
 *  key 秘钥
 *
 *  q 请求翻译query	UTF-8编码
 *
 *  from		翻译源语言	可设置为auto
 *
 *  to		翻译目标语言	不可设置为auto
 *
 *  appid		APPID	可在管理控制台查看
 *
 *  salt 	随机数	可为字母或数字的字符串
 *
 *  sign 	签名	appid+q+salt+密钥的MD5值
 *
 *  // 以下字段仅开通了词典、TTS用户需要填写
 *
 *  tts 	是否显示语音合成资源	0-显示，1-不显示
 *
 *  dict 	是否显示词典资源	0-显示，1-不显示
 *
 *  // 以下字段仅开通了”我的术语库“用户需要填写
 *
 *  action 	判断是否需要使用自定义术语干预API	1-是，0-否
 *
 * }
 * */

function baiduTranslateService(
  param = {
    q: "",
    from: "",
    to: "",
    appid: "",
    key: "",
    tts: 1,
    dict: 1,
    action: 0,
  }
) {
  var salt = Date.now();
  var sign = getSign(param.appid, param.q, param.key, salt);

  return new Promise((resolve, reject) => {
    fetcher(`http://api.fanyi.baidu.com/api/trans/vip/translate`, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      method: "POST",
      body: querystring.stringify({
        tts: 1,
        dict: 1,
        action: 0,
        ...param,
        salt,
        sign,
      }),
    })
      .then((response) => response.json())
      .then(resolve)
      .catch(reject);
  });
}

module.exports = baiduTranslateService;

