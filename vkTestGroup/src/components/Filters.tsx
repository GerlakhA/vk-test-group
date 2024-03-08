import cn from 'clsx'

interface IFilters {
	filterId: number
	setFilterId: (filterId: number) => void
}

const filters = [
	'Все',
	'Открытая группа',
	'Закрытая группа',
	'Наличие друзей',
	'Без друзей',
	'По цвету'
]

export const Filters = ({ setFilterId, filterId }: IFilters) => {
	return (
		<div className='flex justify-center items-center gap-x-8 w-full p-4'>
			<h1>Фильтры:</h1>
			{filters.map((item, i) => (
				<div
					key={i}
					className={cn(
						'p-2 rounded-md flex justify-center items-center cursor-pointer hover:bg-white/20 focus:ring',
						filterId === i && 'bg-white/20'
					)}
					onClick={() => setFilterId(i)}
				>
					<p>{item}</p>
				</div>
			))}
		</div>
	)
}
