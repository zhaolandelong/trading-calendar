from futu import *
import csv
from datetime import datetime, timedelta

markets = ["HK", "US", "CN", "NT", "ST", "JP_FUTURE", "SG_FUTURE"]
# markets = ["CN"]
type_mapping = {"WHOLE": 1, "MORNING": 2, "AFTERNOON": 3}
start_date = datetime(2015, 1, 1)
end_date = datetime(2024, 12, 31)
current_date = start_date

# 创建一个空列表来存储日期
date_list = []
market_data_list = []
json_data = {}

# 循环日期，直到达到结束日期
while current_date <= end_date:
    date_list.append(current_date.strftime("%Y-%m-%d"))  # 将日期添加到列表中
    current_date += timedelta(days=1)  # 每次循环增加一天

quote_ctx = OpenQuoteContext(host="127.0.0.1", port=11111)  # 创建行情对象

for market in markets:
    data = quote_ctx.request_trading_days(
        market=market,
        start=start_date.strftime("%Y-%m-%d"),
        end=end_date.strftime("%Y-%m-%d"),
    )
    data_dict = {
        item["time"]: type_mapping.get(item["trade_date_type"], 0) for item in data[1]
    }
    # print(data, data_dict)
    market_data_list.append(data_dict)

# print(market_data_list)
with open("trading_days.csv", mode="w", newline="") as file:
    writer = csv.writer(file)

    # 写入表头
    writer.writerow(["Date", *markets])

    # 遍历 date_list
    for date in date_list:
        # 写入一行数据
        writer.writerow(
            [date, *[market_data.get(date, -1) for market_data in market_data_list]]
        )
        json_data[date] = [
            market_data.get(date, -1) for market_data in market_data_list
        ]

with open("trading_days.json", mode="w") as file:
    json.dump(json_data, file)

quote_ctx.close()  # 关闭对象，防止连接条数用尽
