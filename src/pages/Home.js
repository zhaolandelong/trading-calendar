import React, { useState } from "react";
import {
  Calendar,
  Tag,
  Checkbox,
  Layout,
  Menu,
  Anchor,
  Typography,
} from "antd";
import { CheckCircleOutlined, MinusCircleOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import tradingData from "../trading_days.json";
import "./Home.css";
import ApiDocs from "./ApiDocs";

const { Title } = Typography;
const { Header, Content, Sider } = Layout;
const { Link } = Anchor;

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
    <Layout className="layout-container">
      <Header className="header">
        <img src="logo-white.png" alt="logo" className="header-logo" />
        <h1 className="header-title">Global Stock Market Trading Calendar</h1>
      </Header>
      <Content>
        <Layout>
          <Sider width={110}>
            <Menu
              theme="dark"
              defaultSelectedKeys={["calendar"]}
              mode="inline"
              items={[
                {
                  key: "calendar",
                  label: <Link href="#calendar">Calendar</Link>,
                },
                { key: "api", label: <Link href="#api">API</Link> },
              ]}
            />
          </Sider>
          <Content className="main-content">
            <div className="calendar-container">
              <Title id="calendar" level={2}>
                Trading Days Calendar
              </Title>
              <div className="checkbox-group">
                <Checkbox.Group
                  options={Object.keys(markets).map((market) => ({
                    label: (
                      <span>
                        <Tag color={markets[market].color}>{market}</Tag>
                        <span>{markets[market].name}</span>
                      </span>
                    ),
                    value: market,
                  }))}
                  value={selectedMarkets}
                  onChange={setSelectedMarkets}
                />
              </div>
              <Calendar
                cellRender={dateCellRender}
                fullscreen={false}
                className="calendar"
                validRange={[dayjs(firstDay), dayjs(lastDay).add(1, "day")]}
              />
              <Title id="api" level={2}>
                Trading Days API
              </Title>
              <ApiDocs />
            </div>
          </Content>
        </Layout>
      </Content>
    </Layout>
  );
};

export default StockTradingCalendar;
