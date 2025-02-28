import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import debounce from "lodash/debounce"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const debouncedFetch = debounce((callback: Function) => {
  callback()
}, 300)

