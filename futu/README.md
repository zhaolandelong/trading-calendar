# 从富途下载交易日历数据

## 注意事项
1. 使用了获取交易日历的 API，详见 [文档](https://openapi.futunn.com/futu-api-doc/quote/request-trading-days.html)；
2. 运行 py 脚本即可生成一个 csv 和 json 文件，但使用时需要放到正确的引用位置；
3. 一些 Magic Number 和必须满足顺序的数据，见下面这部分代码：
```py
markets = ["HK", "US", "CN", "NT", "ST", "JP_FUTURE", "SG_FUTURE"]
type_mapping = {"WHOLE": 1, "MORNING": 2, "AFTERNOON": 3}
```