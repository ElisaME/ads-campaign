//------------Union Types--------------------

export type Platform = 'google' | 'meta' | 'amazon'
export type CampaignStatus = 'active' | 'paused' | 'ended'
export type FunnelObjective = 'awareness' | 'traffic' | 'conversion'

//--------------Budget---------------------------

export interface Budget{
    daily:number
    total:number
    spent:number
    currency:string
}

// -----------Campos comunes homologados de campañas------------------
//Regla: todas las plataformas los exponen con el mismo nombre
//meta purchases -> conversions | google conversions -> conversions | amazon orders -> conversions

export interface CommonMetrics{
    spend:number
    impressions: number
    clicks: number
    ctr: number
    cpc: number
    conversions : number
    conversionRate:number
    cpa:number | null //Awareness no tiene costo por conversión
    revenue: number
    roas: number | null //Awareness no ritne ROAS
}

// ---------------Datos por día para gráficos--------------

export interface DailyDataPoint { 
    date: string
    spend: number
    impressions: number
    clicks: number
    conversions: number
}

// ---------------Datos específicos por plataformas ----------

export interface GooglePlatformData{
    campaignType: 'Search' | 'Display' | 'Shopping' | 'Performance' | 'YouTube'
    qualityScore: number | null // número del 1-10 (search)
    searchImpressionShare: number | null // % (Search y shopping)
    viewRate: number | null //% vistas (youtube)
    addGroupCount: number
}

export interface MetaPlatformData{
    reach:number //usuarios únicos alcanzados
    frequency: number // promedio de veces que un usuario vio el anuncio
    cpm: number //costo por 1k impresiones
    videoViews: number | null
    adSetCount: number
    campaignObjective: string // objeto nativo de meta
}

export interface AmazonPlatformData{
    campaignType: 'Sponsored Products' | 'Sponsored Brands' | 'Sponsored Display' | 'DSP'
    acos: number | null //  advertising cost of sale = spend / revenue * 100
    ntbOrders: number | null// new to brand orders
    ntbOrdersPercentage: number | null// new to brand orders
    impressionShare: number | null// % de impresiones disponibles
}


// ------------ Campaña con union por plataforma

//base
interface CampaignBase{
    id:string
    name: string
    status: CampaignStatus
    funnelObjective: FunnelObjective
    startDate: string
    endDate: string
    budget: Budget
    metrics: CommonMetrics
    dailyData: DailyDataPoint[]
}

export interface GoogleCampaign extends CampaignBase{
    platform: 'google'
    platformData: GooglePlatformData
}

export interface MetaCampaign extends CampaignBase{
    platform: 'meta'
    platformData: MetaPlatformData
}

export interface AmazonCampaign extends CampaignBase{
    platform: 'amazon'
    platformData: AmazonPlatformData
}

export type Campaign = GoogleCampaign | MetaCampaign | AmazonCampaign

// Health indicator (cálculado en hook independiente)
// verde -> ROAS >= 3.0 y CTR >= 2%
// amarillo -> ROAS entre 1.5 y 3.9 o CTR entre 1% y 2%
// rojo -> ROAS <1.5 o CTR < 1%
// neutro -> campañas awareness sin ROAS

export type HealthStatus = 'good' | 'warning' | 'critical' | 'neutral'

// Seed.json
export interface SeedData{
    summary:{
        lastUpdated: string
        currency: string
        timezone: string
        dateRange: { from:string , to:string }
    }
    campaigns: Campaign[]
}