'use client';
import type { KPICard } from '@/lib/metrics';
import {
	formatCurrency,
	formatCurrencyCompact,
	formatMultiplier,
} from '@/lib/formatters';
import { TrendingDown, TrendingUp } from 'lucide-react';
import { Sparkline } from './Sparkline';

type dailyData = {
	clicks: number;
	conversions: number;
	cpa: number;
	date: string;
	impressions: number;
	revenue: number;
	roas: number;
	spend: number;
};

interface KPIDataCardProps {
	kpi: KPICard;
	dailyData: dailyData[]; // Puedes definir un tipo específico para los datos diarios si lo deseas
}

export function KPIDataCard({ kpi, dailyData }: KPIDataCardProps) {
	const formatKpIValue = (kpi: KPICard): number | string | undefined => {
		switch (kpi.format) {
			case 'currency':
				return formatCurrency(kpi.value, 'MXN');
			case 'multiplier':
				return formatMultiplier(kpi.value);
			case 'currency-compact':
				return formatCurrencyCompact(kpi.value, 'MXN');
		}
	};

	return (
		<div
			key={kpi.id}
			className="p-4 flex flex-col space-y-2 h-48 justify-center"
		>
			<h3 className="uppercase text-slate-500 text-xs mb-3 lg:mb-6">
				{kpi.label}
			</h3>
			<div className="flex justify-between">
				<p className="letter-spacing-1 text-2xl lg:text-3xl font-mono font-medium">
					{formatKpIValue(kpi)}{' '}
				</p>
				<div className="flex items-center gap-1 ml-4 text-green-600 text-sm">
					<span>
						{kpi.delta.direction === 'up' ? (
							<TrendingUp className="h-3.5 w-3.5" />
						) : (
							<TrendingDown className="h-3.5 w-3.5" />
						)}{' '}
					</span>
					<span>{kpi.delta.percentage.toFixed(2)}%</span>
				</div>
			</div>
			<div className="flex justify-between items-center">
				<div>
					{kpi.config.comparison && (
						<p className="text-sm text-gray-400"> {kpi.config.comparison}</p>
					)}
					{kpi.config.targetLabel && (
						<p className="text-sm text-gray-400"> {kpi.config.targetLabel}</p>
					)}
					{kpi.config.note && (
						<p className="text-sm text-gray-400"> {kpi.config.note}</p>
					)}
				</div>
				<Sparkline
					data={dailyData}
					field={kpi.sparklineField}
					isPositive={kpi.delta.isPositive}
				/>
			</div>
		</div>
	);
}
