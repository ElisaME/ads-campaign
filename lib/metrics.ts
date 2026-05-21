//lib/metrics.ts
//------- Lógica para métricas de KPIs--------

import { Campaign } from "@/types/campaign"

export interface AggregatedTotals {
    totalSpend: number
    totalRevenue: number
    totalImpressions: number
    totalClicks: number
    totalConversions: number
    blendedROAS: number //totalRevenue / totalSpend (no ROAS individuals)
    blendedCPA: number //totalSpend / totalConversions
    blendedCTR: number //totalClicks / totalImpressions * 100
    campaignCount: number
    activeCampaignCount: number
}

export interface AggregatedDailyMetrics {
    date: string
    spend: number
    revenue: number
    impressions: number
    clicks: number
    conversions: number
    roas: number //revenue / spend (no ROAS individuals)
    cpa: number //spend / conversions
}

export interface DeltaResult{
    percentage:number // valor redondeado a 1 decimal
    direction: 'up'|'down'|'neutral'
    isPositive: boolean // true si el cambio es positivo (aumento de ROAS o disminución de CPA), false si es negativo
}

export interface KPICards{
    items: KPICard[]
    dailyData: AggregatedDailyMetrics[]
    totals: AggregatedTotals
}

//Campos del daily data disponibles para gráficas
export type SparklineField = 'spend' | 'revenue' | 'impressions' | 'clicks' | 'conversions' | 'roas' | 'cpa'

//------- Funciones para calcular métricas
// 1. Aggregate Totals : recorrer todas las campañas para KPIs globales
//- Nota: ROAS, CPA y CTR se calculan a nivel global usando los totales, no promediando los ROAS individuales

export function aggregateTotals( campaigns: Campaign[]): AggregatedTotals{
    const totals = campaigns.reduce((acc, campaign) => ({
        totalSpend : acc.totalSpend + campaign.metrics.spend,
        totalRevenue : acc.totalRevenue + campaign.metrics.revenue,
        totalImpressions : acc.totalImpressions + campaign.metrics.impressions,
        totalClicks : acc.totalClicks + campaign.metrics.clicks,
        totalConversions : acc.totalConversions + campaign.metrics.conversions
    }), {
        totalSpend: 0,
        totalRevenue: 0,
        totalImpressions: 0,
        totalClicks: 0,
        totalConversions: 0,
        
    })
    return {
        ...totals,
        blendedROAS: totals.totalSpend > 0 ? totals.totalRevenue / totals.totalSpend : 0,
        blendedCPA: totals.totalConversions > 0 ? totals.totalSpend / totals.totalConversions : 0,
        blendedCTR: totals.totalImpressions > 0 ? (totals.totalClicks / totals.totalImpressions) * 100 : 0,
        campaignCount: campaigns.length,
        activeCampaignCount: campaigns.filter(c => c.status === 'active').length
    }
}

//2. aggregateDailyMetrics: para mostrar tendencias diarias en gráficos sparkline
export function aggregateDailyMetrics(campaigns: Campaign[]): AggregatedDailyMetrics[] {
    const map = new Map <string, Omit<AggregatedDailyMetrics, 'roas' | 'cpa'>>()
    campaigns.forEach(campaign => {
        campaign.dailyData.forEach(dataPoint => {
            const existing = map.get(dataPoint.date) ?? {
                date:dataPoint.date,
                spend:0,
                revenue:0,
                impressions:0,
                clicks:0,
                conversions:0
            }
            map.set(dataPoint.date ,{
               date:dataPoint.date,
               spend: existing.spend + dataPoint.spend,
               revenue: existing.revenue + dataPoint.revenue,
               impressions: existing.impressions + dataPoint.impressions,
               clicks: existing.clicks + dataPoint.clicks,
               conversions: existing.conversions + dataPoint.conversions
           })
        })
    })

    //Convertir map a array y calcular ratios
    return Array.from(map.values())
        .sort((a,b) => a.date.localeCompare(b.date)) //ordenar por fecha
        .map(data => ({
            ...data,
            roas: data.spend > 0 ? data.revenue / data.spend : 0,
            cpa: data.conversions > 0 ? data.spend / data.conversions : 0
        }))
}

//3. calculateDelta: para mostrar cambios porcentuales entre periodos (ej: este mes vs mes pasado)
export function calculateData(
    dailyData: AggregatedDailyMetrics[],
    field: SparklineField,
    higherIsPositive: boolean //indica si un valor más alto es positivo (ej: ROAS) o negativo (ej: CPA)
): DeltaResult{
    //Necesitamos al menos 14 puntos para comparar dos semanas
    if(dailyData.length < 14){
        return {
            percentage: 0,
            direction: 'neutral',
            isPositive: true
        }
    }

    const sortedData = [...dailyData].sort((a,b) => a.date.localeCompare(b.date))

    //primeros 7 días periodo anterior, últimos 7 días periodo actual
    const previousPeriod = sortedData.slice(0,7)
    const currentPeriod = sortedData.slice(7,14)

    const previousSum = previousPeriod.reduce((sum, data) => sum + data[field], 0) 
    const currentSum = currentPeriod.reduce((sum, data) => sum + data[field], 0)

    //Si el periodo anterior es 0 no podemos calcular un porcentaje, consideramos esto como un cambio positivo si el valor actual es mayor que 0
    if(previousSum === 0){
        return {
            percentage: 0,
            direction: 'neutral',
            isPositive: false
        }
    }

    const change = ( (currentSum - previousSum) / previousSum) * 100

    //Redondear a 1 decimal
    //un cambio de +- 0.5 se considera neutral
    const direction : DeltaResult['direction'] = change > 0.5 ? 'up' : change < -0.5 ? 'down' : 'neutral'
    const percentage = Math.round(change * 10) / 10
    return {
        percentage,
        direction,
        isPositive: direction === 'neutral'
            ? false
            : higherIsPositive
            ? direction === 'up'
            : direction === 'down'
    }

}

//---- Función de  orquestación
// Llama a las 3 funciones anteriores y produce un array para el KPICards, ya que ahí no se hacen cálculos

export interface KPICard{
    id: string
    label: string
    value: number
    delta: DeltaResult
    sparklineField: SparklineField
    format: 'currency' | 'multiplier' | 'currency-compact'
}

export function buildKPIs(campaigns: Campaign[]): KPICards{
    const totals = aggregateTotals(campaigns)
    const dailyData = aggregateDailyMetrics(campaigns)

    const items : KPICard[] = [
        {
            id: 'totalSpend',
            label: 'Total Spend',
            value: totals.totalSpend,
            delta: calculateData(dailyData, 'spend', false),
            sparklineField: 'spend',
            format:'currency'
        },
         {
            id: 'attributedRevenue',
            label: 'Attributed Revenue',
            value: totals.totalRevenue,
            delta: calculateData(dailyData, 'revenue', true),
            sparklineField: 'revenue',
            format:'currency'
        },
         {
            id: 'blendedRoas',
            label: 'Blended ROAS',
            value: totals.blendedROAS,
            delta: calculateData(dailyData, 'roas', true),
            sparklineField: 'roas',
            format:'multiplier'
        },
         {
            id: 'blendedCpa',
            label: 'Blended CPA',
            value: totals.blendedCPA,
            delta: calculateData(dailyData, 'cpa', false),
            sparklineField: 'cpa',
            format:'currency'
        }
    ]
    return { items, dailyData, totals}
}