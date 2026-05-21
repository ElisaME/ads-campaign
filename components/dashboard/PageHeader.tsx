'use client';
import {
	Calendar,
	ChevronDown,
	CircleSmall,
	Download,
	RefreshCcw,
} from 'lucide-react';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Button } from '../ui/button';
import { useState } from 'react';

export function PageHeader({
	title,
	breadcrumb,
	lastSynced,
}: {
	title: string;
	breadcrumb: React.ReactNode;
	lastSynced: string;
}) {
	const [dateSelection, setDateSelection] = useState('Last 30 Days');
	return (
		<header className="lg:mt-0 mt-10 grid gap-4 grid-cols-1 md:grid-cols-2">
			<div>
				<nav className="text-sm text-slate-500 mt-1">{breadcrumb}</nav>
				<h1 className="text-2xl font-bold text-slate-950">{title}</h1>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 items-center">
				<div className="text-sm text-slate-500 flex items-center gap-1">
					<CircleSmall
						className="h-3.5 w-3.5 text-green-500"
						fill="currentColor"
					/>
					{lastSynced}
				</div>
				<div className="flex justify-start md:justify-end items-center gap-2">
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="secondary" className="text-slate-500">
								<Calendar className="h-3.5 w-3.5" />
								{dateSelection}
								<ChevronDown className="ml-2 h-3.5 w-3.5 text-slate-400" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent>
							<DropdownMenuItem onClick={() => setDateSelection('Last 7 Days')}>
								Últimos 7 Días
							</DropdownMenuItem>
							<DropdownMenuItem
								onClick={() => setDateSelection('Últimos 14 íass')}
							>
								Últimos 14 Días
							</DropdownMenuItem>
							<DropdownMenuItem
								onClick={() => setDateSelection('Últimos 30 íass')}
							>
								Últimos 30 Días
							</DropdownMenuItem>
							<DropdownMenuItem
								onClick={() => setDateSelection('Últimos 90 íass')}
							>
								Últimos 90 Días
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
					<button className="px-4 py-2 rounded-md text-slate-500">
						<RefreshCcw className="h-4 w-4 mr-2" />
					</button>
					<button className="px-4 py-2 rounded-md text-slate-500">
						<Download className="h-4 w-4 mr-2" />
					</button>
				</div>
			</div>
		</header>
	);
}
