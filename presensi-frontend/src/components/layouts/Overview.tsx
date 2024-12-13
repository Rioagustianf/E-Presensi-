import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

const data = [
  {
    name: "Sen",
    total: 95,
  },
  {
    name: "Sel",
    total: 97,
  },
  {
    name: "Rab",
    total: 96,
  },
  {
    name: "Kam",
    total: 98,
  },
  {
    name: "Jum",
    total: 94,
  },
  {
    name: "Sab",
    total: 92,
  },
];

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}%`}
        />
        <Bar dataKey="total" fill="#071952" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
