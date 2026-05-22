import { useState, useEffect, useMemo } from 'react';
import { Campaign } from '../types/campaign';

//FIltros
export type PlatformFilter = Campaign['platform'] | 'all'
export type StatusFilter = Campaign['status'] | 'all'

//Constantes
const PAGE_SIZE=8
const DEBOUNCE_MS = 300

export function useCampaigns(campaigns: Campaign[]) {
    const [searchTerm, setSearchTerm] = useState('')
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('')
    const [platformFilter, setPlatformFilter] = useState<PlatformFilter>('all')
    const [statusFilter, setStatusFilter] = useState<StatusFilter>('all')
    const [currentPage, setCurrentPage] = useState(1)

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm)
        }, DEBOUNCE_MS)

        return () => clearTimeout(timer)
    },[searchTerm])

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setCurrentPage(1)
    }, [debouncedSearchTerm, platformFilter, statusFilter])

    const filteredCampaigns = useMemo(() => {
        return campaigns.filter((campaign: Campaign) => {
            const matchesSearch = campaign.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
            const matchesPlatform = platformFilter === 'all' || campaign.platform === platformFilter
            const matchesStatus = statusFilter === 'all' || campaign.status === statusFilter

            return matchesSearch && matchesPlatform && matchesStatus
        })
    },[campaigns, debouncedSearchTerm, platformFilter, statusFilter])

    //Paginación
    const totalPages = Math.max(1, Math.ceil(filteredCampaigns.length / PAGE_SIZE))
    //Select rango de campañas a mostrar
    const paginatedCampaigns = useMemo(() => {
        const startIndex = (currentPage - 1) * PAGE_SIZE
        return filteredCampaigns.slice(startIndex, startIndex + PAGE_SIZE)
    }, [filteredCampaigns, currentPage])

    //Navegación
    function goToPage(page: number) {
        const fixedPage = Math.min(Math.max(1, page), totalPages)
        setCurrentPage(fixedPage)
    }

    function nextPage() {
       if(currentPage < totalPages) setCurrentPage(prev => prev + 1)
    }

    function prevPage() {
       if(currentPage > 1) setCurrentPage(prev => prev - 1)
    }

    //Indicador si hay filtro
    const isFiltered = debouncedSearchTerm !== '' ||
        platformFilter !== 'all' ||
        statusFilter !== 'all'

    return {
        paginatedCampaigns,
        currentPage,
        totalPages,
        totalCount: filteredCampaigns.length,
        searchTerm,
        goToPage,
        prevPage,
        nextPage,
        setSearchTerm,
        platformFilter,
        setPlatformFilter,
        statusFilter,
        setStatusFilter,
        isFiltered,
        pageSize: PAGE_SIZE
    }
}