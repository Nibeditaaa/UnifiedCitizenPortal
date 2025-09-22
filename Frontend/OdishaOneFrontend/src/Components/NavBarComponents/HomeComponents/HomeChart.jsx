import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  LineChart,
  Line,
  AreaChart,
  Area,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";
import "../../../css/HomeChart.css";
import { Container } from "react-bootstrap";

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

// const data = [
//   { name: "Jan", pv: 2400, uv: 4000, amt: 2400 },
//   { name: "Feb", pv: 1398, uv: 3000, amt: 2210 },
//   { name: "Mar", pv: 9800, uv: 2000, amt: 2290 },
//   { name: "Apr", pv: 3908, uv: 2780, amt: 2000 },
// ];

const pieData = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
];

export default function HomeChart() {
  return (
    <div className="dashboard">
      <Container className="dashboard-container px-3 px-sm-0">
        {/* Bar Chart */}
        <div className="chart-card">
          <h2 className="chart-title">Sales Overview</h2>
          <ResponsiveContainer width="100%" height={300}>
            {/* <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E0D5C6" />
            <XAxis dataKey="name" stroke="#B88655" />
            <YAxis stroke="#A66D42" />
            <Tooltip />
            <Legend />
            <Bar dataKey="pv" fill="#A66D42" />
          </BarChart> */}
            <BarChart
              data={data}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#E0D5C6" />
              <XAxis dataKey="name" stroke="#B88655" />
              <YAxis yAxisId="left" orientation="left" stroke="#A66D42" />
              <YAxis yAxisId="right" orientation="right" stroke="#C4A484" />
              <Tooltip />
              <Legend />
              <Bar yAxisId="left" dataKey="pv" fill="#A66D42" />
              <Bar yAxisId="right" dataKey="uv" fill="#C4A484" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="chart-card">
          <h2 className="chart-title">Revenue Breakdown</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#C4A484"
                label
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Line Chart */}
        <div className="chart-card">
          <h2 className="chart-title">Performance Trend</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <XAxis dataKey="name" stroke="#B88655" />
              <YAxis stroke="#A66D42" />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="uv"
                stroke="#A66D42"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Area Chart */}
        <div className="chart-card">
          <h2 className="chart-title">Market Share</h2>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={data}>
              <XAxis dataKey="name" stroke="#B88655" />
              <YAxis stroke="#A66D42" />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="amt"
                stroke="#A66D42"
                fill="#C4A484"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Radar Chart */}
        <div className="chart-card">
          <h2 className="chart-title">Product Strength</h2>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart outerRadius={90} data={pieData}>
              <PolarGrid stroke="#E0D5C6" />
              <PolarAngleAxis dataKey="name" stroke="#A66D42" />
              <PolarRadiusAxis stroke="#B88655" />
              <Radar
                name="Strength"
                dataKey="value"
                stroke="#A66D42"
                fill="#C4A484"
                fillOpacity={0.6}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </Container>
    </div>
  );
}
