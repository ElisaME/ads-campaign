import { PageHeader } from '@/components/dashboard/PageHeader';
import { DisplayKPIs } from '@/components/dashboard/KPICards';

export default function Home() {
	return (
		<div className="px-8 py-4">
			<PageHeader
				title="Omnichannel Ads Performance"
				breadcrumb="Reports > Performance"
				lastSynced="Synced 5 min ago" //mock last synced time
			/>
			<DisplayKPIs />
		</div>
	);
}
