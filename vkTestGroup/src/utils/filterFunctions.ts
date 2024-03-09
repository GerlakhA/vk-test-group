import { Group } from '../types/groups.type'

export const closedGroups = (arr: any) =>
	arr?.filter((item: Group) => item.closed === false)

export const getAll = (arr: any) => arr

export const openedGroups = (arr: any) =>
	arr?.filter((item: Group) => item.closed === true)

export const haveFriends = (arr: any) =>
	arr.filter((item: Group) => item.friends?.length)

export const dontHaveFriends = (arr: any) =>
	arr.filter((item: Group) => !item.friends?.length)
