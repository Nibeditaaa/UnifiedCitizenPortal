import React from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Rectangle,
  Legend,
} from "recharts";
import {
  Dropdown,
  DropdownButton,
  Row,
  Col,
  Card,
  Button,
  ButtonGroup,
} from "react-bootstrap";

const data1 = [
  { name: "Jan", value: 65 },
  { name: "Feb", value: 59 },
  { name: "Mar", value: 84 },
  { name: "Apr", value: 84 },
  { name: "May", value: 51 },
  { name: "Jun", value: 55 },
  { name: "Jul", value: 40 },
];

const data2 = [
  { name: "Jan", value: 1 },
  { name: "Feb", value: 18 },
  { name: "Mar", value: 9 },
  { name: "Apr", value: 17 },
  { name: "May", value: 34 },
  { name: "Jun", value: 22 },
  { name: "Jul", value: 11 },
];

const data3 = [
  { name: "Jan", value: 78 },
  { name: "Feb", value: 81 },
  { name: "Mar", value: 80 },
  { name: "Apr", value: 45 },
  { name: "May", value: 34 },
  { name: "Jun", value: 12 },
  { name: "Jul", value: 40 },
];

const data4 = [
  {
    name: "Pg A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Pg B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Pg C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Pg D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Pg E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Pg F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Pg G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const data5 = [
  {
    name: "Pg H",
    uv: 4500,
    pv: 2600,
    amt: 2700,
  },
  {
    name: "Pg I",
    uv: 3200,
    pv: 1500,
    amt: 2300,
  },
  {
    name: "Pg J",
    uv: 2200,
    pv: 9200,
    amt: 2400,
  },
  {
    name: "Pg K",
    uv: 2900,
    pv: 4000,
    amt: 2100,
  },
  {
    name: "Pg L",
    uv: 1950,
    pv: 5000,
    amt: 2250,
  },
  {
    name: "Pg M",
    uv: 2600,
    pv: 3700,
    amt: 2600,
  },
  {
    name: "Pg N",
    uv: 3700,
    pv: 4500,
    amt: 2200,
  },
];

const WidgetCard = ({
  title,
  value,
  data,
  type = "line",
  color = "primary",
}) => {
  return (
    <Col sm={12} md={6} lg={4} xl={3} className="mb-4">
      <Card className={`text-white bg-${color} p-4 shadow-lg rounded-5 border-0`}>
        <div className="d-flex justify-content-between align-items-center mb-2">
          <div>
            <h3 className="fw-semibold fs-5 fs-md-3">{value}</h3>
            <h5 className="fw-bold text-wrap text-md-nowrap">{title}</h5>
          </div>
          <DropdownButton
            variant="light"
            size="sm"
            title=""
            className="border-0"
          >
            <Dropdown.Item>Action</Dropdown.Item>
            <Dropdown.Item>Another action</Dropdown.Item>
            <Dropdown.Item>Something else</Dropdown.Item>
          </DropdownButton>
        </div>
        <div style={{ height: 70 }}>
          <ResponsiveContainer width="100%" height="100%">
            {type === "line" ? (
              <LineChart data={data}>
                <XAxis hide dataKey="name" />
                <YAxis hide />
                <Tooltip
                  wrapperStyle={{
                    backgroundColor: "rgba(255,255,255,0.8)",
                    borderRadius: "5px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#fff"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            ) : (
              <BarChart data={data}>
                <XAxis hide dataKey="name" />
                <YAxis hide />
                <Tooltip
                  wrapperStyle={{
                    backgroundColor: "rgba(255,255,255,0.8)",
                    borderRadius: "5px",
                  }}
                />
                <Bar dataKey="value" fill="rgba(255,255,255,0.7)" />
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>
      </Card>
    </Col>
  );
};

const TrafficWidget = () => {
  return (
    <Card className="mb-4 p-4 shadow-sm rounded-5 border-0" style={{ backgroundColor: "#DDE6ED" }}>
      <Row className="align-items-center">
        <Col sm={5}>
          <h4 className="mb-0">Traffic</h4>
          <div className="text-muted">January - July 2023</div>
        </Col>
        <Col sm={7} className="text-end">
          {/* <Button variant="primary" className="me-2">Download</Button> */}
          <ButtonGroup>
            {["Day", "Month", "Year"].map((value) => (
              <Button
                variant="outline-secondary"
                key={value}
                active={value === "Month"}
              >
                {value}
              </Button>
            ))}
          </ButtonGroup>
        </Col>
      </Row>
      <Row className="mt-3">
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={data1}>
            <XAxis dataKey="name" />
            <YAxis
              label={{ value: "Value", angle: -90, position: "insideLeft" }}
            />
            <Tooltip
              wrapperStyle={{
                backgroundColor: "rgba(255,255,255,0.8)",
                borderRadius: "5px",
              }}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#8884d8"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </Row>
    </Card>
  );
};

const WidgetsDropdown = () => {
  return (
    <>
      <Row className="g-3">
        <WidgetCard
          title="Users"
          value="26K (-12.4%)"
          data={data1}
          type="line"
          color="primary"
        />
        <WidgetCard
          title="Income"
          value="$6.2K (+40.9%)"
          data={data2}
          type="line"
          color="info"
        />
        <WidgetCard
          title="Conversion Rate"
          value="2.49% (+84.7%)"
          data={data3}
          type="line"
          color="warning"
        />
        <WidgetCard
          title="Sessions"
          value="44K (-23.6%)"
          data={data1}
          type="bar"
          color="danger"
        />
      </Row>
      <TrafficWidget />
      <ChartsSection />
    </>
  );
};

const ChartsSection = () => {
  return (
    <>
      <Row className="mt-4 g-3">
        {[data1, data2].map((data, index) => (
          <Col sm={12} lg={6} key={index}>
            <Card
              className="p-3 shadow-sm rounded-5 border-0"
              style={{ backgroundColor: "#DDE6ED" }}
            >
              <h6 className="text-center">Chart {index + 1}</h6>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={data}>
                  <XAxis dataKey="name" />
                  <YAxis
                    label={{
                      value: "Value",
                      angle: -90,
                      position: "insideLeft",
                    }}
                  />
                  <Tooltip
                    wrapperStyle={{
                      backgroundColor: "rgba(255,255,255,0.8)",
                      borderRadius: "5px",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#8884d8"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </Col>
        ))}
      </Row>
      <Row className="mt-4 g-3">
        {[data1, data2].map((data, index) => (
          <Col sm={12} lg={6} key={index}>
            <Card
              className="p-3 shadow-sm rounded-5 border-0"
              style={{ backgroundColor: "#DDE6ED" }}
            >
              <h6 className="text-center">Chart {index + 1}</h6>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart
                  data={data}
                >
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#8884d8" name="Dataset 1" />
\                </BarChart>
              </ResponsiveContainer>
            </Card>
          </Col>
        ))}
      </Row>
      <Row className="mt-4 g-3">
        {[data4, data5].map((data, index) => (
          <Col sm={12} lg={6} key={index}>
            <Card
              className="p-3 shadow-sm rounded-5 border-0"
              style={{ backgroundColor: "#DDE6ED" }}
            >
              <h6 className="text-center">Chart {index + 1}</h6>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={data}>
                  <XAxis dataKey="name" />
                  <YAxis
                    label={{
                      angle: -90,
                      position: "insideLeft",
                    }}
                  />
                  <Tooltip
                    wrapperStyle={{
                      backgroundColor: "rgba(255,255,255,0.8)",
                      borderRadius: "5px",
                    }}
                  />
                  <Bar
                    dataKey="uv"
                    fill="#B3CDAD"
                    activeBar={<Rectangle fill="pink" stroke="blue" />}
                  />
                  <Bar
                    dataKey="pv"
                    fill="#FF5F5E"
                    activeBar={<Rectangle fill="gold" stroke="purple" />}
                  />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default WidgetsDropdown;
