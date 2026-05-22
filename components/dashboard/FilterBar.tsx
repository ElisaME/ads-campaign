'use client';

import { Search, X } from 'lucide-react';
import { Input } from '../ui/input';
import { PlatformFilter, StatusFilter } from '@/hooks/useCampaigns';
import {
	Select,
	SelectTrigger,
	SelectItem,
	SelectContent,
	SelectValue,
} from '../ui/select';

interface FilterBarProps {
	searchTerm: string;
	setSearchTerm: (term: string) => void;
	platformFilter: string;
	setPlatformFilter: (value: PlatformFilter) => void;
	statusFilter: string;
	setStatusFilter: (value: StatusFilter) => void;
	isFiltered: boolean;
	onClearFilters: () => void;
}

export function FilterBar({
	searchTerm,
	setSearchTerm,
	platformFilter,
	setPlatformFilter,
	statusFilter,
	setStatusFilter,
	isFiltered,
	onClearFilters,
}: FilterBarProps) {
	return (
		<div className="flex items-center gap-3 mt-3">
			{/* Search campaign */}
			<div className="relative">
				<Search className="absolute left-3 h-4 w-4 top-1/4 text-slate-600" />
				<Input
					type="text"
					placeholder="Búsqueda de campañas"
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					className="pl-8 text-slate-600"
				></Input>
				{searchTerm && (
					<button
						onClick={() => setSearchTerm('')}
						className="absolute right-3 top-1/4 text-slate-600 cursor-pointer"
					>
						<X className="h-3.5 w-3.5" />
					</button>
				)}
			</div>
			{/* Platform filter */}
			<Select
				value={platformFilter}
				onValueChange={(value) => setPlatformFilter(value as PlatformFilter)}
			>
				<SelectTrigger className="w-45">
					<SelectValue placeholder="Plataforma" />
				</SelectTrigger>
				<SelectContent>
					<SelectItem className="text-slate-600" value="all">
						Todas las plataformas
					</SelectItem>
					<SelectItem className="text-slate-600" value="meta">
						Meta
					</SelectItem>
					<SelectItem className="text-slate-600" value="google">
						Google
					</SelectItem>
					<SelectItem className="text-slate-600" value="amazon">
						Amazon
					</SelectItem>
				</SelectContent>
			</Select>
			{/* Status filter */}
			<Select
				value={statusFilter}
				onValueChange={(value) => setStatusFilter(value as StatusFilter)}
			>
				<SelectTrigger className="w-45">
					<SelectValue placeholder="Estado" />
				</SelectTrigger>
				<SelectContent>
					<SelectItem className="text-slate-600" value="all">
						Todos los estados
					</SelectItem>
					<SelectItem className="text-slate-600" value="active">
						Activa
					</SelectItem>
					<SelectItem className="text-slate-600" value="paused">
						Pausada
					</SelectItem>
					<SelectItem className="text-slate-600" value="ended">
						Finalizada
					</SelectItem>
				</SelectContent>
			</Select>
			{/* Si hay filtros */}
			{isFiltered && (
				<button
					onClick={onClearFilters}
					className="ml-2 text-sm text-slate-600 cursor-pointer hover:text-slate-800"
				>
					Limpiar filtros
				</button>
			)}
		</div>
	);
}
