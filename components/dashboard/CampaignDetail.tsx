import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
} from '@/components/ui/sheet';
import {
	CampaignTypeColors,
	PlatformColorsBg,
	PlatformColorsText,
} from '@/lib/indicators';
import { Campaign } from '@/types/campaign';
import { PerformanceChart } from './PerformanceChart';
import {
	formatCurrency,
	formatNumberCompact,
	formatPercent,
	formatDateLong,
} from '@/lib/formatters';
import { Calendar } from 'lucide-react';

interface CampaignDetailProps {
	isOpen: boolean;
	setIsOpen: (isOpen: boolean) => void;
	campaign: Campaign;
}

export function CampaignDetail({
	isOpen,
	setIsOpen,
	campaign,
}: CampaignDetailProps) {
	console.log('CampaignDetail rendered with campaign:', campaign);
	return (
		<Sheet open={isOpen} onOpenChange={setIsOpen}>
			<SheetContent
				// style={{ maxWidth: '700px' }}
				className="px-6 flex flex-col"
			>
				<SheetHeader className="shrink-0">
					<div className="flex gap-2 items-center">
						{/* Platform */}
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
						{/* Campaign Type */}
						<span
							className={`
                                inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium capitalize
                                ${CampaignTypeColors[campaign.funnelObjective]}
                            `}
						>
							{campaign.funnelObjective}
						</span>
					</div>
					<SheetTitle>{campaign.name}</SheetTitle>
					<SheetDescription className="flex items-center gap-1 text-xs text-slate-500 uppercase">
						<Calendar className="w-3 h-3" />{' '}
						{formatDateLong(campaign.startDate)} -{' '}
						{formatDateLong(campaign.endDate)}
					</SheetDescription>
				</SheetHeader>
				<SheetClose></SheetClose>
				<div className=" overflow-y-auto flex-1">
					{/* Presupuesto */}
					<h3 className="uppercase text-slate-500 text-sm">Presupesto</h3>
					<div className="grid grid-cols-1 lg:grid-cols-3">
						<div>
							<span className="text-sm text-slate-700">Diario: </span>
							<span className="text-xs text-slate-500 ml-1">
								{campaign.budget
									? formatCurrency(campaign.budget.daily, 'MXN')
									: 'N/A'}{' '}
							</span>
						</div>
						<div>
							<span className="text-sm text-slate-700">Gastado:</span>
							<span className="text-xs text-slate-500 ml-1">
								{campaign.budget
									? formatCurrency(campaign.budget.spent, 'MXN')
									: 'N/A'}{' '}
							</span>
						</div>
						<div>
							<span className="text-sm text-slate-700">Total: </span>
							<span className="text-xs text-slate-500 ml-1">
								{campaign.budget
									? formatCurrency(campaign.budget.total, 'MXN')
									: 'N/A'}{' '}
							</span>
						</div>
					</div>
					<div className="mt-4 mb-2">
						<p className="text-sm text-slate-700">Daily Spend vs Revenue</p>
						<span className="text-xs text-slate-500">
							Últimos 7 días reportados
						</span>
					</div>
					<div className="px-8 mb-2">
						<PerformanceChart campaign={campaign} />
					</div>
					<h3 className="uppercase text-slate-500 text-sm">
						Metricas unificadas
					</h3>
					<div className="grid grid-cols-2 lg:grid-cols-3 gap-4 py-4 space-y-6">
						<div>
							<p className="text-xs uppercase text-slate-500">Impresiones</p>
							<p className="text-xl font-medium font-mono my-2">
								{formatNumberCompact(campaign.metrics.impressions)}
							</p>
							<p className="text-xs text-slate-500">
								{new Intl.NumberFormat('en-US').format(
									campaign.metrics.impressions,
								)}{' '}
								total
							</p>
						</div>
						<div>
							<p className="text-xs uppercase text-slate-500">Clics</p>
							<p className="text-xl font-medium font-mono my-2">
								{formatNumberCompact(campaign.metrics.clicks)}
							</p>
							<p className="text-xs text-slate-500">
								{formatPercent(campaign.metrics.ctr)} CTR
							</p>
						</div>
						<div>
							<p className="text-xs uppercase text-slate-500">CPC</p>
							<p className="text-xl font-medium font-mono my-2">
								{formatCurrency(campaign.metrics.cpc, 'MXN')}
							</p>
							<p className="text-xs text-slate-500">por clic</p>
						</div>
						<div>
							<p className="text-xs uppercase text-slate-500">Conversiones</p>
							<p className="text-xl font-medium font-mono my-2">
								{campaign.metrics.conversions}
							</p>
							<p className="text-xs text-slate-500">
								{formatPercent(campaign.metrics.conversionRate)} CR
							</p>
						</div>
						{campaign.metrics.cpa !== null &&
							campaign.metrics.cpa !== undefined && (
								<div>
									<p className="text-xs uppercase text-slate-500">CPA</p>
									<p className="text-xl font-medium font-mono my-2">
										{formatCurrency(campaign.metrics.cpa, 'MXN')}
									</p>
									<p className="text-xs text-slate-500">por conversión</p>
								</div>
							)}
						{campaign.metrics.roas !== null &&
							campaign.metrics.roas !== undefined && (
								<div>
									<p className="text-xs uppercase text-slate-500">ROAS</p>
									<p className="text-xl font-medium font-mono my-2">
										{formatNumberCompact(campaign.metrics.roas)}
									</p>
								</div>
							)}
					</div>
					{/* Platform Data */}
					<div>
						<h3 className="uppercase text-slate-500 text-sm">
							Detalles por plataforma
						</h3>
						<div className="mt-4 space-y-2 grid grid-cols-1 md:grid-cols-2">
							{Object.entries(campaign.platformData).map(([item, data]) => (
								<div key={item} className="flex items-center gap-2">
									<p className="text-xs uppercase text-slate-500 mr-1">
										{item}
									</p>
									<p className="text-sm font-medium font-mono">
										{typeof data === 'number'
											? formatNumberCompact(data)
											: data}
									</p>
								</div>
							))}
						</div>
					</div>
				</div>
				<SheetFooter>
					<div className="flex justify-between w-full">
						<span className="text-sm text-slate-500 capitalize">
							Fuente: {campaign.platform}
						</span>
						<SheetClose className="px-4 py-2 bg-slate-700 text-slate-100 rounded-md hover:bg-slate-200">
							Cerrar
						</SheetClose>
					</div>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	);
}
