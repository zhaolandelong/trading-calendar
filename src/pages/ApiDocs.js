import React from "react";
import { Typography, Card, Table, Tag } from "antd";
// import { AlertTriangle } from "lucide-react";

const { Title, Paragraph, Text } = Typography;

const ApiDocs = () => {
  const columns = [
    { title: "Parameter", dataIndex: "parameter", key: "parameter" },
    { title: "Type", dataIndex: "type", key: "type" },
    { title: "Description", dataIndex: "description", key: "description" },
    {
      title: "Required",
      dataIndex: "required",
      key: "required",
      render: (required) =>
        required ? <Tag color="red">Yes</Tag> : <Tag color="green">No</Tag>,
    },
  ];

  const data = [
    {
      key: "1",
      parameter: "start",
      type: "string",
      description: "Start date in 'YYYY-MM-DD' format",
      required: true,
    },
    {
      key: "2",
      parameter: "end",
      type: "string",
      description: "End date in 'YYYY-MM-DD' format",
      required: true,
    },
  ];

  return (
    <div className="max-w-4xl mx-auto p-8">
      <Card className="mb-8">
        <Title level={3}>Endpoint</Title>
        <Paragraph>
          <Text strong>URL:</Text>{" "}
          <Text code>http://api.tradingdays.zldlwq.top/v1</Text>
        </Paragraph>
        <Paragraph>
          <Text strong>Method:</Text> <Tag color="green">GET</Tag>
        </Paragraph>
        <Paragraph>
          <Text strong>Usage:</Text>{" "}
          <Text code>
            http://api.tradingdays.zldlwq.top/v1?start=2015-01-01&end=2015-01-02
          </Text>
        </Paragraph>
        <Title level={3}>Parameters</Title>
        <Table columns={columns} dataSource={data} pagination={false} />
        <Title level={3}>Response</Title>
        <Paragraph>
          <Text strong>Content-Type:</Text> <Text code>application/json</Text>
        </Paragraph>
        <Paragraph>
          <Text strong>Example Response:</Text>
        </Paragraph>
        <Paragraph code style={{ fontSize: 0 }}>
          <pre style={{ fontSize: 12 }}>
            {`{
    markets: ["HK", "US", "CN", "NT", "ST", "JP_FUTURE", "SG_FUTURE"],
    data: {
        "2015-01-01": [-1, -1, -1, 1, 1, 1, 1],
        "2015-01-02": [1, 1, -1, 1, 1, 1, 1],
        ……
    },
}`}
          </pre>
        </Paragraph>
        <Paragraph>
          <Text strong>Description:</Text>
        </Paragraph>
        <ul>
          <li>
            <Text strong>markets:</Text> An array of market identifiers
          </li>
          <li>
            <Text strong>data:</Text> An object where keys are dates and values
            are arrays corresponding to the markets
          </li>
          <li>The values in the data arrays represent:</li>
          <ul className="list-disc pl-8">
            <li>
              <Text strong>-1:</Text> Market is closed
            </li>
            <li>
              <Text strong>1:</Text> Whole day trading
            </li>
            <li>
              <Text strong>2:</Text> Morning trading only
            </li>
            <li>
              <Text strong>3:</Text> Afternoon trading only
            </li>
          </ul>
          <li>
            The data range is from <Text code>2015-01-01</Text> to <Text code>the last
            day of the current year</Text>.
          </li>
        </ul>
      </Card>
    </div>
  );
};

export default ApiDocs;
