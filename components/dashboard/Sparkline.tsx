'use client';

import { useId } from 'react';
import { AggregatedDailyMetrics, SparklineField } from '@/lib/metrics';
import { Area, AreaChart, ResponsiveContainer } from 'recharts';

interface SparklineProps {
	data: AggregatedDailyMetrics[];
	field: SparklineField;
	isPositive: boolean;
}

export function Sparkline({ data, field, isPositive }: SparklineProps) {
	const uid = useId();
	const gradientId = `sparkline-gradient-${uid}`;
	const color = isPositive ? '#16a34a' : '#dc2626';

	return (
		<ResponsiveContainer width={100} height={60}>
			<AreaChart data={data} margin={{ top: 4, right: 0, left: 0, bottom: 0 }}>
				<defs>
					<linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
						<stop offset="5%" stopColor={color} stopOpacity={0.25} />
						<stop offset="95%" stopColor={color} stopOpacity={0} />
					</linearGradient>
				</defs>
				<Area
					type="monotone"
					dataKey={field} // ← aquí entra sparklineField ('spend', 'roas', etc.)
					stroke={color}
					strokeWidth={1.5}
					fill={`url(#${gradientId})`}
					dot={false} // sin puntos en cada dato
					activeDot={false} // sin punto al hacer hover
					isAnimationActive={false} // sin animación — evita re-renders innecesarios
				/>
			</AreaChart>
		</ResponsiveContainer>
	);
}
