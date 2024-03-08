import { useEffect, useState } from 'react'

export const useDebounce = <T>(value: T, delay?: number): T => {
	const [debouncedValue, setDeboucedValue] = useState(value)

	useEffect(() => {
		const timeout = setTimeout(() => {
			setDeboucedValue(value)
		}, delay ?? 1000)

		return () => {
			clearTimeout(timeout)
		}
	}, [value, delay])

	return debouncedValue
}
