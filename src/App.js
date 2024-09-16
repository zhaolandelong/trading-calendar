import React, { useState } from "react";
import { Calendar, Tag, Typography, Row, Col, Card, Checkbox } from "antd";
import { ClockCircleOutlined, CheckCircleOutlined } from "@ant-design/icons";
import "./StockTradingCalendar.css"; // 引入 CSS 文件

const { Title, Text } = Typography;

const markets = {
  HK: { name: "Hong Kong", color: "#ff4d4f" },
  US: { name: "United States", color: "#1890ff" },
  CN: { name: "China", color: "#52c41a" },
};

const statusIcons = {
  WHOLE: <CheckCircleOutlined />,
  MORNING: <ClockCircleOutlined style={{ transform: "rotate(-90deg)" }} />,
  AFTERNOON: <ClockCircleOutlined style={{ transform: "rotate(90deg)" }} />,
};

const dummyData = {
  "2024-09-01": { HK: "WHOLE", US: "WHOLE" },
  "2024-09-19": { HK: "WHOLE", US: "WHOLE", CN: "WHOLE" },
  "2024-09-17": { HK: "MORNING", US: "WHOLE", CN: "AFTERNOON" },
  "2024-09-27": { HK: "MORNING", US: "WHOLE", CN: "AFTERNOON" },
  // Add more dummy data as needed
};

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
                <Tag color={markets[market].color}>
                  {market} {statusIcons[status]}
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
          Global Trading Calendar
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
            {Object.entries(statusIcons).map(([status, icon]) => (
              <Tag key={status} icon={icon}>
                {status}
              </Tag>
            ))}
          </Col>
        </Row>
        <Calendar
          cellRender={dateCellRender}
          fullscreen={false}
          className="calendar"
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
