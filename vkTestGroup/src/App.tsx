import cn from 'clsx'
import { Shell } from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { Filters } from './components/Filters'
import { GroupItem } from './components/GroupItem'
import { colors } from './constants/colors.const'
import { GROUPS_JSON } from './constants/url.const'
import { useDebounce } from './hooks/useDebounce'
import { Group } from './types/groups.type'
import {
	closedGroups,
	dontHaveFriends,
	getAll,
	haveFriends,
	openedGroups
} from './utils/filterFunctions'

function App() {
	const [getGroups, setGetGroups] = useState<Group[]>()
	const [searchColor, setSearchColor] = useState('')
	const [filterId, setFilterId] = useState(0)

	const deboucedValue = useDebounce(searchColor)
	const debouncedId = useDebounce(filterId)

	const processServerData = async (
		reqURL: string,
		successToastMsg: string,
		filterGroups: (arr: Group[]) => Group[]
	) => {
		await fetch(reqURL)
			.then(res => res.json())
			.then(res => {
				if (!res.data) {
					toast.error(
						'Произошла ошибка. Данные не пришли с сервера или данных нет',
						{
							closeButton: true,
							duration: 60000
						}
					)
				} else if (res.result === 1) {
					toast.error(
						'Произошла ошибка. Сервер ответил с кодом ответа result: 1',
						{
							closeButton: true,
							duration: 60000
						}
					)
				} else {
					setGetGroups(filterGroups(res.data))
					toast.success(successToastMsg)
				}
			})
			.catch(() => {
				toast.error(
					'Произошла ошибка. Невозможно получить данные с сервера: cервер не отвечает',
					{
						closeButton: true,
						duration: 60000
					}
				)
			})
	}

	const printColor = (arr: any) =>
		arr.filter((item: Group) => {
			if (searchColor === 'no_color') {
				return !item.avatar_color
			} else {
				return item.avatar_color === searchColor
			}
		})

	const fetchData = async (id: number) => {
		if (id === 0) {
			await new Promise(resolve => setTimeout(resolve, 1000))
			processServerData(
				GROUPS_JSON,
				'Вы применили фильтр по всем параметрам',
				getAll
			)
		} else if (id === 1) {
			processServerData(
				GROUPS_JSON,
				'Вы применили фильтр по открытым группам',
				closedGroups
			)
			console.log('Открытые группы: ', closedGroups)
		} else if (id === 2) {
			processServerData(
				GROUPS_JSON,
				'Вы применили фильтр по закрытым группам',
				openedGroups
			)
			console.log('Закрытые группы: ', openedGroups)
		} else if (id === 3) {
			processServerData(
				GROUPS_JSON,
				`Вы применили фильтр по группам где состоят ваши друзья`,
				haveFriends
			)
		} else if (id === 4) {
			processServerData(
				GROUPS_JSON,
				`Вы применили фильтр по группам где не состоят ваши друзья`,
				dontHaveFriends
			)
		} else if (id === 5 && deboucedValue) {
			processServerData(
				GROUPS_JSON,
				`Вы применили фильтр по цвету ${deboucedValue}`,
				printColor
			)
		}
	}

	useEffect(() => {
		try {
			fetchData(filterId)
		} catch (error) {
			console.log(`Error: ${error}`)
		}
	}, [debouncedId, deboucedValue])

	if (!getGroups) {
		return (
			<div className='w-full h-screen flex justify-center items-center'>
				<Shell className='h-20 w-20 animate-spin' />
			</div>
		)
	}

	return (
		<div className='flex justify-center flex-col items-center gap-6'>
			<Filters
				filterId={filterId}
				setFilterId={(i: number) => setFilterId(i)}
			/>
			{filterId === 5 && (
				<div className='flex flex-col gap-6 absolute right-[265px] top-[70px] p-2 bg-gray-500/30 rounded-lg'>
					{colors.map((color, i) => (
						<div
							key={i}
							onClick={() => setSearchColor(color)}
							className={cn(
								'p-2 text-black rounded-lg text-center cursor-pointer ring',
								searchColor === color && 'ring-4 ring-black'
							)}
							style={{
								backgroundColor: color === 'no_color' ? 'transparent' : color
							}}
						>
							<span>{color}</span>
						</div>
					))}
				</div>
			)}
			{getGroups?.length &&
				getGroups?.map(group => <GroupItem key={group.id} group={group} />)}
		</div>
	)
}

export default App
