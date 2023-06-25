var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import fetcher from "node-fetch";
import qs from "querystring";
import MD5 from "md5";
/** 初始化默认值 */
var params = {
    appid: "",
    key: "",
    to: "",
    q: "",
    from: "auto",
    tts: 1,
    dict: 1,
    action: 0,
};
/** fetch 百度翻译文档地址 */
var BaiduTranslateAPIUrl = "http://api.fanyi.baidu.com/api/trans/vip/translate";
/**
 * @name 百度翻译请求接口
 * @options appid  可在管理控制台查看
 * @options key    在控制台申请查看
 * @options q      请求翻译字符	UTF-8编码
 * @options to     翻译目标语言 不可设置为auto
 * @options from   翻译源语言	可设置为auto
 * @options tts    是否显示语音合成资源	0-显示，1-不显示
 * @options dict   是否显示词典资源	0-显示，1-不显示
 * @options action 判断是否需要使用自定义术语干预API	1-是，0-否
 * */
function BaiduTranslateService(options) {
    var salt = "".concat(Date.now()).concat(Math.random());
    var sign = MD5("".concat(options.appid).concat(options.q).concat(salt).concat(options.key));
    return new Promise(function (resolve, reject) {
        fetcher(BaiduTranslateAPIUrl, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            method: "POST",
            body: qs.stringify(__assign(__assign(__assign({}, params), options), { salt: salt, sign: sign })),
        })
            .then(function (response) { return response.json(); })
            .then(resolve)
            .catch(reject);
    });
}
export default BaiduTranslateService;
