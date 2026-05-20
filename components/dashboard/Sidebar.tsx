'use client';

import {
	CableIcon,
	ChevronDown,
	Megaphone,
	Menu,
	Settings,
	X,
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export function Sidebar() {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<>
			{/* Button mobile */}
			<button
				onClick={() => setIsOpen(true)}
				className="lg:hidden bg-slate-950 fixed top-4 left-4 h-9 w-9 flex items-center justify-center rounded-lg shadow-md text-slate-400"
			>
				<Menu className="h-5 w-5 text-slate-400" />
			</button>
			{/* OVerlay */}
			{isOpen && (
				<div
					className="fixed inset-0 z-10 bg-black/50 background-blur-sm"
					onClick={() => setIsOpen(false)}
				/>
			)}
			<aside
				className={[
					'h-screen w-52.5 shrink-0 flex-col bg-slate-950 text-slate-300',
					isOpen ? 'flex fixed inset-y-0 left-0 z-20' : 'hidden',
					'lg:flex lg:static lg:inset-auto lg:z-auto',
				].join(' ')}
			>
				{/* Logo */}
				<div className="flex items-center gap-2.5 px-4 py-3.5">
					<div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-600 text-sm font-bold text-white">
						A
					</div>
					<div className="min-w-0">
						<p className="text-sm font-semibold text-white">Ads Campaigns</p>
						<p className="text-xs text-slate-400">Omnichannel</p>
					</div>
					{/* Close button */}
					<button
						className="lg:hidden h-7 w-7 -mr-1 flex items-center justify-center rounded-md text-slate-400"
						onClick={() => setIsOpen(false)}
					>
						<X className="h-4 w-4" />
					</button>
				</div>
				{/* Workspace mock selector */}
				<div className="px-2 py-3">
					<div className="bg-slate-600/30 flex w-full items-center gap-2.5 rounded-lg px-2 py-2">
						<div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-emerald-600 text-sm font-bold text-white">
							#
						</div>
						<div className="min-w-0 flex-1">
							<p className="text-sm font-semibold text-white">Hash</p>
							<p className="text-xs text-slate-400">Workspace</p>
						</div>
						<ChevronDown className="h-3.5 w-3.5 shrink-0 text-slate-500" />
					</div>
				</div>
				{/* Navigation */}
				<nav className="flex-1 overflow-y-auto px-3 py-3">
					<p className="uppercase text-xs font-semibold text-slate-400 mb-2">
						Manage
					</p>
					<ul className="space-y-1.5">
						<li>
							<Link href={'#'} className="flex items-center gap-2.5 text-sm">
								<Megaphone className="h-4 w-4" />
								<span className="px-1.5">Campaigns</span>
							</Link>
						</li>
					</ul>
				</nav>
				{/* Bottom navigation (mock) */}
				<div className="border-b border-slate-800 px-3 py-3">
					<ul className="space-y-1.5">
						<li>
							<span className="flex items-center gap-2.5 text-sm">
								<CableIcon className="h-4 w-4" />
								<span className="px-1.5">Integrations</span>
							</span>
						</li>
						<li>
							<span className="flex items-center gap-2.5 text-sm">
								<Settings className="h-4 w-4" />
								<span className="px-1.5">Settings</span>
							</span>
						</li>
					</ul>
				</div>
				{/* User mock */}
				<div className="pb-3">
					<div className="flex items-center gap-2.5 px-3 py-2">
						<div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-600 text-sm font-bold text-white">
							E
						</div>
						<div className="min-w-0">
							<p className="text-sm font-semibold text-white">Elisa Martínez</p>
							<p className="text-xs text-slate-400">elisa@example.com</p>
						</div>
					</div>
				</div>
			</aside>
		</>
	);
}
