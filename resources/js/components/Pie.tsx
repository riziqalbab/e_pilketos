import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

import {
    PieChart,
    Pie,
    Cell,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";

function PieChartGraph({ paslon }: { paslon: Array<paslon> }) {
    return (
        <PieChart>
            <ChartTooltip content={<ChartTooltipContent />} />
            <Pie
                data={paslon}
                dataKey="count"
                nameKey="nama_paslon"
                cx="50%"
                cy="50%"
                outerRadius={150}
                label={(entry) => entry.nama_paslon}
            >
                {paslon.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.nama_paslon} />
                ))}
            </Pie>
            <Legend />
        </PieChart>
    );
}

export default Pie;
