export function setItem (name, val) {
  if (typeof localStorage === 'undefined') return
  localStorage.setItem(name, val)
}

export function getItem (name, defaultValue) {
  if (typeof localStorage === 'undefined') return defaultValue
  return localStorage.getItem(name) || defaultValue
}