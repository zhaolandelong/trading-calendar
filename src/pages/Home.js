import React, { useState } from "react";
import { Calendar, Tag, Typography, Row, Col, Card, Checkbox } from "antd";
import { CheckCircleOutlined, MinusCircleOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import tradingData from "../trading_days.json";

const { Title, Text } = Typography;

// const marketKeys = ["HK", "US", "CN", "NT", "ST", "JP_FUTURE", "SG_FUTURE"]
const markets = {
  HK: { name: "Hong Kong", color: "green" },
  US: { name: "United States", color: "blue" },
  CN: { name: "China", color: "red" },
};

const dummyData = {};
let firstDay = "";
let lastDay = "";

for (const date in tradingData) {
  const data = tradingData[date];
  dummyData[date] = {};
  dummyData[date].HK = data[0];
  dummyData[date].US = data[1];
  dummyData[date].CN = data[2];
  if (!firstDay) {
    firstDay = date;
  }
  lastDay = date;
}

console.log(dummyData);

const StockTradingCalendar = () => {
  const [selectedMarkets, setSelectedMarkets] = useState(Object.keys(markets));

  const dateCellRender = (value) => {
    const dateString = value.format("YYYY-MM-DD");
    const dateData = dummyData[dateString] || {};

    return (
      <ul className="date-cell-render">
        {Object.entries(dateData).map(([market, status]) => {
          if (selectedMarkets.includes(market)) {
            return (
              <li key={market}>
                <Tag
                  style={{ minWidth: 52 }}
                  color={status > 0 ? markets[market].color : "#bec8c8"}
                  icon={
                    status > 0 ? (
                      <CheckCircleOutlined />
                    ) : (
                      <MinusCircleOutlined />
                    )
                  }
                >
                  {market}
                </Tag>
              </li>
            );
          }
          return null;
        })}
      </ul>
    );
  };

  return (
    <div className="calendar-container">
      <Card className="calendar-card">
        <Title level={1} className="calendar-title">
          Global Stock Market Trading Calendar
        </Title>
        <Row gutter={0}>
          <Col span={12}>
            <Checkbox.Group
              options={Object.keys(markets).map((market) => ({
                label: (
                  <div>
                    <Tag color={markets[market].color}>{market}</Tag>
                    <Text strong>{markets[market].name}</Text>
                  </div>
                ),
                value: market,
              }))}
              value={selectedMarkets}
              onChange={setSelectedMarkets}
            />
          </Col>
          <Col span={12} className="checkbox-group">
            {/* {Object.entries(statusIcons).map(([status, icon]) => (
              <Tag key={status} icon={icon}>
                {status}
              </Tag>
            ))} */}
          </Col>
        </Row>
        <Calendar
          cellRender={dateCellRender}
          fullscreen={false}
          className="calendar"
          validRange={[dayjs(firstDay), dayjs(lastDay).add(1, "day")]}
          // headerRender={({ value, type, onChange, onTypeChange }) => {
          //   const current = value.clone();
          //   return (
          //     <div
          //       style={{
          //         padding: "12px 0",
          //         textAlign: "center",
          //         fontSize: "18px",
          //         fontWeight: "bold",
          //         color: "#0d47a1",
          //       }}
          //     >
          //       {current.format("MMMM YYYY")}
          //     </div>
          //   );
          // }}
        />
      </Card>
    </div>
  );
};

export default StockTradingCalendar;
