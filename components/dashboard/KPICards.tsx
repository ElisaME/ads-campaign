import { buildKPIs, KPICards } from '@/lib/metrics';
import seedData from './../../data/seed.json';
import { Campaign } from '@/types/campaign';
import { KPIDataCard } from '@/components/dashboard/KPICard';

export function DisplayKPIs() {
	const campaignsData = seedData.campaigns as unknown as Campaign[];
	const kpis: KPICards = buildKPIs(campaignsData);

	return (
		<div>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
				{/* KPI card components */}
				{kpis.items.map((kpiData) => (
					<KPIDataCard
						kpi={kpiData}
						key={kpiData.id}
						dailyData={kpis.dailyData}
					/>
				))}
			</div>
		</div>
	);
}
