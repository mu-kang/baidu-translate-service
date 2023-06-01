# baidu-translate-service


This component library is applicable to the Nodejs server and obtains translation results through the Baidu Translation API


## parameter

字段名|	类型|	是否必填|	描述|	备注
------|------|------|------|------
q	|string|	是|	请求翻译query	|UTF-8编码
from	|string|	是|	翻译源语言|	可设置为auto
to	|string|	是|	翻译目标语言|	不可设置为auto
appid	|string|	是|	APPID|	可在管理控制台查看
key|	string|	是|	秘钥|	在控制台申请查看
tts|	integer	|否|	是否显示语音合成资源|	0-显示，1-不显示
dict|	integer|	否|	是否显示词典资源|	0-显示，1-不显示 
action|	integer|	否	|判断是否需要使用自定义术语干预API|	1-是，0-否

## Response

[Reference link](https://fanyi-api.baidu.com/product/113)


## Demo

```javascript
var baiduTranslateService = require("baidu-translate-service");

baiduTranslateService({
  appid: "",
  key: "",
  to: "en",
  from: "auto",
  q: "今天星期几？",
}).then((result) => {
  console.log(result);
});

```
