# baidu-translate-service

该库通过封装了百度翻译的API信息，支持浏览器，客户端，nodejs调用百度翻译接口，欢迎大家使用，记得[start](https://github.com/mu-kang/baidu-translate-service.git)

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

[参考官方文档链接](https://fanyi-api.baidu.com/product/113)


## Demo

>Browsers

```html
<script src="./lib/baiduTranslateService.js"></script>
```

>Nodejs

```bash
npm install baidu-translate-service
```

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

