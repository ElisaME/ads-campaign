'use client';

import { useEffect, useState } from 'react';
import { Skeleton } from '../ui/skeleton';
import seedData from '@/data/seed.json';
import { Campaign } from '@/types/campaign';
import { CampaignRow } from './CampaignRow';

const columns = [
	// { key: 'health', label: '' },
	{
		key: 'campaignName',
		label: 'Nombre de Campaña',
		className: 'sticky left-0 bg-white text-left min-w-[150px]',
	},
	{ key: 'platform', label: 'Plataforma', className: 'text-center w-32' },
	{ key: 'objective', label: 'Objetivo', className: 'text-center w-30' },
	{ key: 'spend', label: 'Gasto', className: 'text-center w-24' },
	{ key: 'impressions', label: 'Impresiones', className: 'text-center w-24' },
	{ key: 'clicks', label: 'Clics', className: 'text-center w-24' },
	{ key: 'ctr', label: 'CTR', className: 'text-center w-24' },
	{ key: 'cpc', label: 'CPC', className: 'text-center w-24' },
	{ key: 'conversions', label: 'Conversiones', className: 'text-center w-24' },
	{ key: 'cr', label: 'CR', className: 'text-center w-24' },
	{ key: 'cpa', label: 'CPA', className: 'text-center w-24' },
	{ key: 'revenue', label: 'Revenue', className: 'text-center w-24' },
	{ key: 'roas', label: 'ROAS', className: 'text-center w-24' },
	{ key: 'arrow', label: '', className: 'text-center w-10' },
];

//----Skeleton row for loading state--------
function SkeletonRow() {
	return (
		<tr>
			{columns.map((col) => (
				<td key={col.key} className="px-4 py-2">
					<Skeleton className="animate-pulse h-4 w-full rounded bg-slate-200" />
				</td>
			))}
		</tr>
	);
}

//_----- Message for empty table---------------
function EmptyState() {
	return (
		<tr col-span={columns.length} className="px-6 text-center">
			<p className="text-center text-sm text-slate-500 py-4">
				No se encontraron campañas
			</p>
		</tr>
	);
}

export function CampaignTable() {
	const [isLoading, setIsLoading] = useState(true);
	const campaigns = seedData.campaigns as Campaign[];

	useEffect(() => {
		// Simular carga de datos
		const timer = setTimeout(() => {
			setIsLoading(false);
		}, 2000); // 2 segundos de carga simulada
		return () => clearTimeout(timer);
	}, []);

	return (
		<div className="overflow-x-auto mt-4">
			<table className="w-full">
				<thead>
					<tr>
						{columns.map((col) => (
							<th
								key={col.key}
								className={`px-2 lg:px-4 py-2 uppercase text-xs font-medium text-slate-500 ${col.className || ''}`}
							>
								{col.label}
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{isLoading ? (
						// Mostrar 5 filas de skeleton mientras se cargan los datos
						Array.from({ length: 5 }).map((_, idx) => <SkeletonRow key={idx} />)
					) : campaigns.length === 0 ? (
						<EmptyState />
					) : (
						campaigns.map((campaign) => (
							<CampaignRow
								key={campaign.id}
								campaign={campaign}
								onSelect={() => {}}
							/>
						))
					)}
				</tbody>
			</table>
		</div>
	);
}
