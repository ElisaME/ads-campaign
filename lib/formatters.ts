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