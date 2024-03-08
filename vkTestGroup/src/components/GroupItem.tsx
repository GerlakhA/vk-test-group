import { useState } from 'react'
import { Group } from '../types/groups.type'

export const GroupItem = ({ group }: { group: Group }) => {
	const [open, setOpen] = useState(false)

	return (
		<div
			className={
				'relative w-[560px] min-h-[250px] max-h-[600px] flex flex-col flex-wrap border rounded-lg bg-gray-500/30'
			}
		>
			<div className='flex flex-col gap-y-[70px] p-1'>
				<div className='flex justify-between p-2'>
					<div
						style={{ backgroundColor: group.avatar_color }}
						className='w-[100px] h-[100px] flex justify-center items-center rounded-full border'
					>
						<p className='flex justify-center items-center text-black font-semibold text-xl'>
							{group.name[0]}
						</p>
					</div>
					<h2 className='text-2xl'>{group.name}</h2>
					<p className='tex-xl opacity-30'>
						{group.closed ? 'Закрытая' : 'Открытая'}
					</p>
				</div>
				<div className='flex justify-between p-2'>
					<div className='flex flex-col gap-4'>
						<span
							onClick={() => setOpen(prev => !prev)}
							className='cursor-pointer select-none'
						>
							{group.friends
								? `Друзья: ${group?.friends?.length}`
								: 'Нет друзей'}
						</span>
						{open && (
							<div className='flex flex-col gap-4'>
								{group.friends?.map((friend, i) => (
									<div key={i} className='flex p-2 rounded-lg gap-x-2'>
										<p>{friend.first_name}</p>
										<p>{friend.last_name}</p>
									</div>
								))}
							</div>
						)}
					</div>
					<span>Участники: {group.members_count}</span>
				</div>
			</div>
		</div>
	)
}
