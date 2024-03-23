function stringToBoolean(str) {
  // Matches 'true', 'yes', or '1' (case-insensitive)
  const truePattern = /^(true|1)$/i

  // Returns true if it matches, false otherwise
  return truePattern.test(str.trim())
}

export const API_HOST = process.env.NEXT_PUBLIC_REACT_APP_API_HOST

if (!API_HOST) {
  throw new Error('REACT_APP_API_HOST must be set')
}
export const API_SSL = !API_HOST.startsWith('localhost')
export const API_URL = `${API_SSL ? 'https' : 'http'}://${API_HOST}`
console.log("API_URL =", API_URL)
export const STRIPE_PK = process.env.NEXT_PUBLIC_REACT_APP_STRIPE_PK
if (!STRIPE_PK) {
  throw new Error('REACT_APP_STRIPE_PK must be set')
}
export const UNDER_CONSTRUCTION = stringToBoolean(
  process.env.NEXT_PUBLIC_REACT_APP_UNDER_CONSTRUCTION || ''
)
