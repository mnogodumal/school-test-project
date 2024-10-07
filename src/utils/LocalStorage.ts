export const saveProgress = <T>(key: string, data: T): void => {
  localStorage.setItem(key, JSON.stringify(data))
}

export const loadProgress = <T>(key: string): T | null => {
  const savedData = localStorage.getItem(key)
  return savedData ? (JSON.parse(savedData) as T) : null
}
