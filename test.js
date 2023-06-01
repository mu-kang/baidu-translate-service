var baiduTranslateService = require("./index.js");

baiduTranslateService({
  appid: "",
  key: "",
  to: "en",
  from: "auto",
  q: "今天星期几？",
}).then((result) => {
  console.log(result);
});

