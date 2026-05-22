import { Campaign } from '@/types/campaign';
import {
	Area,
	AreaChart,
	CartesianGrid,
	Legend,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from 'recharts';
import { useId } from 'react';
import { formatCurrency, formatDateShort } from '@/lib/formatters';

function CustomTooltip({
	active,
	payload,
	label,
}: {
	active?: boolean;
	payload?: { dataKey: string; name: string; value: number; color: string }[];
	label?: string;
}) {
	if (!active || !payload || payload.length === 0 || !label) return null;
	return (
		<div
			className={'rounded-lg border border-slate-200 bg-white p-3 shadow-lg'}
		>
			<p className={'text-xs text-slate-500'}>
				{new Date(label).toLocaleDateString('es-MX', {
					month: 'short',
					day: 'numeric',
				})}
			</p>
			{payload.map((entry) => (
				<div key={entry.dataKey} className={'flex items-center gap-2 mt-1'}>
					<div
						className={'w-3 h-3 rounded-full'}
						style={{ backgroundColor: entry.color }}
					/>
					<span className={'text-sm font-medium'}>{entry.name}: </span>
					<span className={'text-sm numeric'}>
						{formatCurrency(entry.value, 'MXN')}
					</span>
				</div>
			))}
		</div>
	);
}

export function PerformanceChart({ campaign }: { campaign: Campaign }) {
	const colorRevenue = '#16a34a'; // verde para spend vs revenue, por ejemplo
	const colorSpend = '#000'; // azul para spend, por ejemplo
	return (
		<ResponsiveContainer width={'100%'} height={300} aspect={1.618}>
			<AreaChart
				data={campaign.dailyData}
				margin={{ top: 2, right: 0, left: 0, bottom: 0 }}
			>
				<defs>
					<linearGradient id={'gradientSpend'} x1="0" y1="0" x2="0" y2="1">
						<stop offset="5%" stopColor={colorSpend} stopOpacity={0.25} />
						<stop offset="95%" stopColor={colorSpend} stopOpacity={0} />
					</linearGradient>
					<linearGradient id={'gradientRevenue'} x1="0" y1="0" x2="0" y2="1">
						<stop offset="5%" stopColor={colorRevenue} stopOpacity={0.25} />
						<stop offset="95%" stopColor={colorRevenue} stopOpacity={0} />
					</linearGradient>
				</defs>
				<CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={true} />

				{/* Eje X: fechas abreviadas, sin línea ni ticks */}
				<XAxis
					dataKey="date"
					tick={{ fontSize: 11, fill: '#94a3b8' }}
					axisLine={false}
					tickLine={false}
					tickFormatter={(dateStr: string) => formatDateShort(dateStr)}
					interval="preserveStartEnd" // muestra solo primer y último label
				/>

				{/* Eje Y: formato compacto ($5K), sin línea ni ticks */}
				<YAxis
					tick={{ fontSize: 11, fill: '#94a3b8' }}
					axisLine={false}
					tickLine={false}
					width={'auto'}
					tickFormatter={(v: number) =>
						v === 0 ? '0' : `$${(v / 1000).toFixed(0)}K`
					}
				/>

				<Area
					type="monotone"
					dataKey={'spend'} // ← aquí entra sparklineField ('spend', 'roas', etc.)
					name="Spend"
					dot={true}
					stroke={colorSpend}
					strokeWidth={2}
					activeDot={{ r: 4, strokeWidth: 2 }}
					fill={'url(#gradientSpend)'}
					isAnimationActive={false} // sin animación — evita re-renders innecesarios
				/>
				<Area
					type="monotone"
					dataKey={'revenue'} // ← aquí entra sparklineField ('spend', 'roas', etc.)
					name="Revenue"
					stroke={colorRevenue}
					dot={true}
					strokeWidth={2}
					activeDot={{ r: 4, strokeWidth: 2 }}
					fill={'url(#gradientRevenue)'}
					isAnimationActive={false} // sin animación — evita re-renders innecesarios
				/>
				<Legend verticalAlign="top" align={'right'} height={36} />
				<Tooltip content={<CustomTooltip />} />
			</AreaChart>
		</ResponsiveContainer>
	);
}
