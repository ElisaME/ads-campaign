import { Campaign } from "@/types/campaign";

//----------Status Dot------------
export const StatusDot : Record<Campaign['status'], string> = {
	active: 'bg-emerald-500',
	paused: 'bg-amber-400',
	ended: 'bg-slate-400',
};

//----------Platform Colors-------
export const PlatformColorsText : Record<Campaign['platform'], string> = {
    google: 'text-orange-600',
    meta: 'text-blue-600',
    amazon: 'text-yellow-600',
}

export const PlatformColorsBg : Record<Campaign['platform'], string> = {
    google: 'bg-orange-600',
    meta: 'bg-blue-600',
    amazon: 'bg-yellow-600',
}

//-------- Campaign Type color-----
export const CampaignTypeColors : Record<Campaign['funnelObjective'], string> = {
    awareness: 'text-indigo-400 border border-indigo-400',
    conversion: 'text-amber-600 border border-amber-400',
    traffic: 'text-green-600 border border-green-400',
}