import { useJsApiLoader } from "@react-google-maps/api"

const LIBRARIES = ["places"]

export default function MainLayout({ children }) {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: LIBRARIES,
    
  })

  if (!isLoaded) return <div>Loading map...</div>

  return (
    <div>
      {/* Navbar гэх мэт */}
      {children}
    </div>
  )
}