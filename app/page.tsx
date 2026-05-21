import { PageHeader } from '@/components/dashboard/PageHeader';
import { DisplayKPIs } from '@/components/dashboard/KPICards';

export default function Home() {
	return (
		<div className="px-8 py-4">
			<PageHeader
				title="Omnichannel Ads Performance"
				breadcrumb="Reportes > Performance"
				lastSynced="Synced 5 min ago" //mock last synced time
			/>
			<DisplayKPIs />
			<div>
				<h3 className="font-semibold">Campañas Unificadas</h3>
				<p className="text-sm">
					Métricas homologadas de plataformas Meta, Google Ads & Amazon Ads *
					últimos 7 días
				</p>
			</div>
		</div>
	);
}
