import axios from 'axios'
import cn from 'clsx'
import { Shell } from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { Filters } from './components/Filters'
import { GroupItem } from './components/GroupItem'
import { colors } from './constants/colors.const'
import { MAIN_URL } from './constants/url.const'
import { useDebounce } from './hooks/useDebounce'
import { GetGroupsResponse, Group } from './types/groups.type'

function App() {
	const [getGroups, setGetGroups] = useState<Group[]>()
	const [searchColor, setSearchColor] = useState('')
	const [filterId, setFilterId] = useState(0)

	const deboucedValue = useDebounce(searchColor)
	const debouncedId = useDebounce(filterId)

	const fetchData = async (id: number) => {
		if (id === 0) {
			await new Promise(resolve => setTimeout(resolve, 1000))
			await axios
				.get<GetGroupsResponse>(MAIN_URL)
				.then(res => {
					if (res.data) {
						console.log('result: 0')
					}
					//@ts-ignore
					setGetGroups(res?.data)
				})
				.then(() => toast.success('Вы применили фильтр по всем параметрам'))
				.catch(error => {
					toast.error(error)
					console.log('result: 1')
				})
		} else if (id === 1) {
			await axios
				.get<GetGroupsResponse>(`${MAIN_URL}?closed=false`)
				.then(res => {
					if (res.data) {
						console.log('result: 0')
					}
					//@ts-ignore
					setGetGroups(res?.data)
				})
				.then(() => toast.success('Вы применили фильтр по открытым группам'))
				.catch(error => {
					toast.error(error)
					console.log('result: 1')
				})
		} else if (id === 2) {
			await axios
				.get<GetGroupsResponse>(`${MAIN_URL}?closed=true`)
				.then(res => {
					if (res.data) {
						console.log('result: 0')
					}
					//@ts-ignore
					setGetGroups(res?.data)
				})
				.then(() => toast.success('Вы применили фильтр по закрытым группам'))
				.catch(error => {
					toast.error(error)
					console.log('result: 1')
				})
		} else if (id === 3) {
			await axios
				.get<GetGroupsResponse>(`${MAIN_URL}?has_friends=true`)
				.then(res => {
					if (res.data) {
						console.log('result: 0')
					}
					//@ts-ignore
					setGetGroups(res?.data)
				})
				.then(() =>
					toast.success(
						`Вы применили фильтр по группам где состоят ваши друзья`
					)
				)
				.catch(error => {
					toast.error(error)
					console.log('result: 1')
				})
		} else if (id === 4) {
			await axios
				.get<GetGroupsResponse>(`${MAIN_URL}?has_friends=false`)
				.then(res => {
					if (res.data) {
						console.log('result: 0')
					}
					//@ts-ignore
					setGetGroups(res?.data)
				})
				.then(() =>
					toast.success(
						`Вы применили фильтр по группам где не состоят ваши друзья`
					)
				)
				.catch(error => {
					toast.error(error)
					console.log('result: 1')
				})
		} else if (id === 5 && deboucedValue) {
			await axios
				.get<GetGroupsResponse>(`${MAIN_URL}?avatar_color=${deboucedValue}`)
				.then(res => {
					if (res.data) {
						console.log('result: 0')
					}
					//@ts-ignore
					setGetGroups(res?.data)
				})
				.then(() =>
					toast.success(`Вы применили фильтр по цвету ${deboucedValue}`)
				)
				.catch(error => {
					toast.error(error)
					console.log('result: 1')
				})
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
				<div className='flex flex-col gap-6 absolute right-[275px] top-[70px] p-2 bg-gray-500/30 rounded-lg'>
					{colors.map((color, i) => (
						<div
							key={i}
							onClick={() => setSearchColor(color)}
							className={cn(
								'p-2 text-black rounded-lg text-center cursor-pointer',
								searchColor === color && 'ring-4 ring-black'
							)}
							style={{ backgroundColor: color }}
						>
							<span>{color}</span>
						</div>
					))}
				</div>
			)}
			{getGroups?.map(group => (
				<GroupItem key={group.id} group={group} />
			))}
		</div>
	)
}

export default App
