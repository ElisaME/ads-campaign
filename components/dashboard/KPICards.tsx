import { buildKPIs, KPICard, KPICards } from '@/lib/metrics';
import seedData from './../../data/seed.json';
import { Campaign } from '@/types/campaign';
import {
	formatCurrency,
	formatCurrencyCompact,
	formatMultiplier,
} from '@/lib/formatters';

export function DisplayKPIs() {
	const campaignsData = seedData.campaigns as unknown as Campaign[];
	const kpis: KPICards = buildKPIs(campaignsData);

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
		<div>
			{/* KPI card components */}
			{kpis.items.map((kpi) => (
				<div key={kpi.id} className="kpi-card">
					<h3>{kpi.label}</h3>
					<p>{formatKpIValue(kpi)}</p>
					<p>
						{kpi.delta.direction === 'up' ? '▲' : '▼'}{' '}
						{kpi.delta.percentage.toFixed(2)}%
					</p>
					<p>{kpi.sparklineField}</p>
					<br />
					{/* Aquí podrías agregar un componente de sparkline usando kpi.sparklineField */}
				</div>
			))}
		</div>
	);
}
