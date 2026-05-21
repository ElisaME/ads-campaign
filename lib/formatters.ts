export function formatCurrency(value: number, currency: string): string {
    return new Intl.NumberFormat('es-MX', { style: 'currency', currency }).format(value)
}

export function formatMultiplier(value: number): string {
    return value.toFixed(2) + 'x'
}

export function formatCurrencyCompact(value: number, currency: string): string {
    const formatter = new Intl.NumberFormat('es-MX', {
        style: 'currency',
        currency,
        notation: 'compact',
        compactDisplay: 'short'
    })
    return formatter.format(value)  
}

export function formatDateShort(dateStr: string): string {
    const date = new Date(dateStr)
    return date.toLocaleDateString('es-MX', { month: '2-digit', day: '2-digit' })
}

export function formatNumberCompact(value: number): string {
    const formatter = new Intl.NumberFormat('es-MX', {
        notation: 'compact',
        compactDisplay: 'short'
    })
    return formatter.format(value)
}

export function formatPercent(value: number): string {
    return (value * 100).toFixed(2) + '%'
}