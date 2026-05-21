import { Campaign } from '@/types/campaign';
import {
	formatCurrency,
	formatDateShort,
	formatNumberCompact,
	formatPercent,
	formatMultiplier,
} from '@/lib/formatters';
import {
	CampaignTypeColors,
	PlatformColorsBg,
	PlatformColorsText,
	StatusDot,
} from '@/lib/indicators';
import { ChevronRight } from 'lucide-react';

interface CampaignRowProps {
	campaign: Campaign;
	onSelect: (campaign: Campaign) => void;
}

export function CampaignRow({ campaign, onSelect }: CampaignRowProps) {
	return (
		<tr
			onClick={() => onSelect(campaign)}
			className="cursor-pointer hover:bg-slate-200 group"
		>
			{/* <td className="sticky left-0 group-hover:bg-slate-50px-3 py-4">
				<span className="block h-2 w-2 rounded-full bg-green-500"></span>
			</td> */}
			{/* Campaign Name */}
			<td className="bg-white sticky left-0 group-hover:bg-slate-200 py-4 sm:py-2 lg:px-4">
				<p className="font-medium text-sm text-slate-900">{campaign.name}</p>
				<div className="flex items-center mt-1 gap-1">
					<span
						className={`h-2 w-2 rounded-full ${StatusDot[campaign.status]}`}
					></span>
					<span className="text-xs ml-1 capitalize text-slate-500">
						{campaign.status} •
						<span className="sm:inline block">
							De {formatDateShort(campaign.startDate)} a{' '}
							{formatDateShort(campaign.endDate)}
						</span>
					</span>
				</div>
			</td>
			{/* Platform */}
			<td className="px-2 py-4">
				<div className={`flex items-center gap-2`}>
					<span
						className={`h-2 w-2 rounded-full ${PlatformColorsBg[campaign.platform]}`}
					></span>
					<span
						className={`text-xs ml-1 uppercase ${PlatformColorsText[campaign.platform]}`}
					>
						{campaign.platform}
					</span>
				</div>
			</td>
			{/*Funnel Objective */}
			<td className="px-3 py-4 w-30">
				<span
					className={`
                        inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium capitalize
                        ${CampaignTypeColors[campaign.funnelObjective]}
                    `}
				>
					{campaign.funnelObjective}
				</span>
			</td>
			{/*Number Metrics */}
			<td className="px-3 py-4 text-right text-sm numeric">
				{formatCurrency(campaign.metrics.spend, 'MXN')}
			</td>
			<td className="px-3 py-4 text-right text-sm numeric">
				{formatNumberCompact(campaign.metrics.impressions)}
			</td>
			<td className="px-3 py-4 text-right text-sm numeric">
				{formatNumberCompact(campaign.metrics.clicks)}
			</td>
			<td className="px-3 py-4 text-right text-sm numeric">
				{formatPercent(campaign.metrics.ctr)}
			</td>
			<td className="px-3 py-4 text-right text-sm numeric">
				{formatCurrency(campaign.metrics.cpc, 'MXN')}
			</td>
			<td className="px-3 py-4 text-right text-sm numeric">
				{campaign.metrics.conversions.toLocaleString('es-MX')}
			</td>
			<td className="px-3 py-4 text-right text-sm numeric">
				{formatPercent(campaign.metrics.conversionRate)}
			</td>
			<td className="px-3 py-4 text-right text-sm numeric">
				{campaign.metrics.cpa !== null
					? formatCurrency(campaign.metrics.cpa, 'MXN')
					: '-'}
			</td>
			<td className="px-3 py-4 text-right text-sm numeric">
				{formatNumberCompact(campaign.metrics.revenue)}
			</td>
			<td className="px-3 py-4 text-right text-sm numeric">
				{campaign.metrics.roas !== null ? (
					<span
						className={`
                        inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium capitalize
                    `}
					>
						{formatMultiplier(campaign.metrics.roas)}
					</span>
				) : (
					'-'
				)}
			</td>
			<td>
				<ChevronRight className="h4 w-4 text-slate-300 group-hover:text-slate-500 transition-colors" />
			</td>
		</tr>
	);
}
