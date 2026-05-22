import { ArrowLeft, ArrowRight } from 'lucide-react';

interface PaginationProps {
	currentPage: number;
	totalPages: number;
	totalCount: number;
	goToPage: (page: number) => void;
	nextPage: () => void;
	prevPage: () => void;
	pageSize: number;
}

export function Pagination({
	currentPage,
	totalPages,
	goToPage,
	nextPage,
	prevPage,
	totalCount,
	pageSize,
}: PaginationProps) {
	const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
	const rangeStart = (currentPage - 1) * pageSize + 1;
	const rangeEnd = Math.min(currentPage * pageSize, totalCount);

	return (
		<div className="flex items-center justify-between mt-4 text-sm text-slate-700">
			<p>
				Mostrando {rangeStart} - {rangeEnd} de {totalCount} campañas
			</p>
			<div className="flex items-center gap-2">
				<button
					disabled={currentPage === 1}
					onClick={prevPage}
					className="cursor-pointer disabled:cursor-not-allowed"
				>
					<ArrowLeft className="h-4 w-4" />
				</button>
				{pages.map((page) => (
					<button
						key={page}
						className={`px-3 py-1 rounded-md 
                            ${currentPage === page ? 'bg-slate-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
						onClick={() => {
							console.log('goToPage called with:', page);
							goToPage(page);
						}}
					>
						{page}
					</button>
				))}
				<button
					onClick={nextPage}
					disabled={currentPage === totalPages}
					className="cursor-pointer disabled:cursor-not-allowed"
				>
					<ArrowRight className="h-4 w-4" />
				</button>
			</div>
		</div>
	);
}
