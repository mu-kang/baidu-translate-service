import fetcher, { Response } from "node-fetch";
import qs from "querystring";
import MD5 from "md5";

interface OptionsType {
  /**  APPID	可在管理控制台查看 */
  appid: string;
  /**  秘钥 */
  key: string;
  /**  请求翻译query	UTF-8编码 */
  q: string;
  /**  翻译目标语言	不可设置为auto */
  to: string;
  /**  翻译源语言	可设置为auto */
  from?: string;

  /**  // 以下字段仅开通了词典、TTS用户需要填写 */
  /****  tts 	是否显示语音合成资源	0-显示，1-不显示 */
  tts?: 1 | 0;
  /****  dict 	是否显示词典资源	0-显示，1-不显示 */
  dict?: 1 | 0;

  /**  // 以下字段仅开通了”我的术语库“用户需要填写 */
  /**** 	判断是否需要使用自定义术语干预API	1-是，0-否 */
  action?: 1 | 0;
}

/** 初始化默认值 */
const params: OptionsType = {
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
const BaiduTranslateAPIUrl: string = `http://api.fanyi.baidu.com/api/trans/vip/translate`;

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

function BaiduTranslateService(options: OptionsType): Promise<Response> {
  var salt = `${Date.now()}${Math.random()}`;
  var sign = MD5(`${options.appid}${options.q}${salt}${options.key}`);

  return new Promise((resolve, reject) => {
    fetcher(BaiduTranslateAPIUrl, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      method: "POST",
      body: qs.stringify({ ...params, ...options, salt, sign }),
    })
      .then((response: { json: () => any }) => response.json())
      .then(resolve)
      .catch(reject);
  });
}
export default BaiduTranslateService;
module.exports = BaiduTranslateService;
