import { onUnmounted, onMounted, ref } from 'vue'

// get the user's coordinates to get their exact location
export function useGeolocation() {
  const coords = ref({ latitude: 0, longitude: 0 })
  
  // checks if geolocation api is supported
  const isSupported = 'navigator' in window && 'geolocation' in navigator

// keep coordinates up to date
  let watcher = null
  onMounted(() => {
    if (isSupported)
      watcher = navigator.geolocation.watchPosition(
        position => (coords.value = position.coords)
      )
  })
  onUnmounted(() => {
    if (watcher) navigator.geolocation.clearWatch(watcher)
  })

  return { coords, isSupported }
}