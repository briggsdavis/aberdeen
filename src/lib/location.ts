export const restaurantAddress = "301 Passage Way B101, Savannah, GA 31401"

export function googleMapsPlaceUrl(address: string) {
  const placePath = encodeURIComponent(address).replaceAll("%20", "+").replaceAll("%2C", ",")
  return `https://www.google.com/maps/place/${placePath}`
}
