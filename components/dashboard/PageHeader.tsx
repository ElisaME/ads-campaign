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
		<header className="flex items-center justify-between gap-4">
			<div>
				<nav className="text-sm text-slate-500 mt-1">{breadcrumb}</nav>
				<h1 className="text-2xl font-bold text-slate-950">{title}</h1>
			</div>
			<div className="flex">
				<div className="text-sm text-slate-500 flex items-center gap-1">
					<CircleSmall
						className="h-3.5 w-3.5 text-green-500"
						fill="currentColor"
					/>
					{lastSynced}
				</div>
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
							Last 7 Days
						</DropdownMenuItem>
						<DropdownMenuItem onClick={() => setDateSelection('Last 14 Days')}>
							Last 14 Days
						</DropdownMenuItem>
						<DropdownMenuItem onClick={() => setDateSelection('Last 30 Days')}>
							Last 30 Days
						</DropdownMenuItem>
						<DropdownMenuItem onClick={() => setDateSelection('Last 90 Days')}>
							Last 90 Days
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
		</header>
	);
}
