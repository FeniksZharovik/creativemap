"use client";
 
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
 
const COLORS = [
  "#f59e0b",
  "#ef4444",
  "#10b981",
  "#3b82f6",
  "#8b5cf6",
  "#ec4899",
  "#f97316",
  "#14b8a6",
  "#a855f7",
  "#84cc16",
  "#06b6d4",
  "#eab308",
];
 
type Props = {
  bySector: { name: string; value: number }[];
  byProvince: { name: string; value: number }[];
  monthly: { month: string; value: number }[];
};
 
export default function DashboardCharts({ bySector, byProvince, monthly }: Props) {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="rounded-xl bg-white border border-zinc-200 p-5">
        <h3 className="font-semibold mb-4">Distribusi per Sektor</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={bySector} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label={(entry) => `${entry.name}`}>
              {bySector.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
 
      <div className="rounded-xl bg-white border border-zinc-200 p-5">
        <h3 className="font-semibold mb-4">Top 10 Provinsi</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={byProvince.slice(0, 10)} layout="vertical" margin={{ left: 30 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis dataKey="name" type="category" width={120} />
            <Tooltip />
            <Bar dataKey="value" fill="#f59e0b" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
 
      <div className="rounded-xl bg-white border border-zinc-200 p-5 lg:col-span-2">
        <h3 className="font-semibold mb-4">Pertumbuhan Pendaftaran (12 bulan terakhir)</h3>
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={monthly}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="value" name="Kreator terdaftar" stroke="#f59e0b" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}