import { useState, useRef, useEffect } from "react"
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { FaBed } from "react-icons/fa"
import { FaPerson } from "react-icons/fa6"
import { CiCalendarDate } from "react-icons/ci"
import { IoSearchOutline } from "react-icons/io5"
import { router } from "@inertiajs/react"
import { useJsApiLoader } from "@react-google-maps/api"
import MainLayout from "@/Layouts/MainLayout"
import { FaHouseUser } from "react-icons/fa";
import { FaCity } from "react-icons/fa6";
const LIBRARIES = ["places"]

export default function Search() {
  const inputRef = useRef(null)

  //controlled input
  const [searchText, setSearchText] = useState("")
  const [location, setLocation] = useState({ address: "", lat: null, lng: null })
  const [suggestions, setSuggestions] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)

  const [date, setDate] = useState({ from: new Date(), to: new Date() })
  const [options, setOptions] = useState({ adult: 1, children: 0, room: 1 })

  const staticSuggestions = [
    { title: "Улаанбаатар", desc: "Хот, төв үйлчилгээ ихтэй" },
    { title: "Дархан", desc: "Аж үйлдвэр, байгалийн үзэмж" },
    { title: "Эрдэнэт", desc: "Эрдэс баялаг, үйлдвэр" },
    { title: "Мөрөн", desc: "Хөвсгөл нуурын ойр, аялал жуулчлал" },
    { title: "Ховд", desc: "Баруун бүс, байгалийн сонирхолтой" },
    { title: "Өндөрхаан", desc: "Хэнтий, уул усны үзэсгэлэнт байршил" },
  ]

  // Google Maps API
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: LIBRARIES,
  })

  //autocomplete
  useEffect(() => {
    if (!isLoaded || !searchText) {
      setSuggestions([])
      return
    }

    if (!window.google) return

    const service = new window.google.maps.places.AutocompleteService()

    const delayDebounce = setTimeout(() => {
      service.getPlacePredictions(
        { input: searchText },
        (predictions, status) => {
          if (
            status ===
            window.google.maps.places.PlacesServiceStatus.OK
          ) {
            setSuggestions(predictions)
          } else {
            setSuggestions([])
          }
        }
      )
    }, 300) // debounce

    return () => clearTimeout(delayDebounce)
  }, [searchText, isLoaded])

  // suggestion click
  const handleSelectSuggestion = (s) => {
    if (!window.google) return

    const service = new window.google.maps.places.PlacesService(
      document.createElement("div")
    )

    service.getDetails({ placeId: s.place_id }, (place, status) => {
      if (
        status ===
        window.google.maps.places.PlacesServiceStatus.OK
      ) {
        const address = place.formatted_address

        setLocation({
          address,
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        })

        setSearchText(address) //хамгийн чухал
        setShowSuggestions(false)
      }
    })
  }

  // static suggestion click
  const handleStaticSelect = (item) => {
    setSearchText(item.title)
    setLocation({ address: item.title })
    setShowSuggestions(false)
  }

  const handleOption = (name, type) => {
    setOptions((prev) => ({
      ...prev,
      [name]:
        type === "i"
          ? prev[name] + 1
          : Math.max(prev[name] - 1, name === "adult" || name === "room" ? 1 : 0),
    }))
  }

  const handleSearch = () => {
    router.get(
      "/search",
      {
        address: location.address || searchText,
        lat: location.lat,
        lng: location.lng,
        start_date: date?.from ? format(date.from, "yyyy-MM-dd") : null,
        end_date: date?.to ? format(date.to, "yyyy-MM-dd") : null,
        guest_number: options.adult + options.children,
      },
      { preserveState: true }
    )
  }

  //outside click → dropdown hide
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!inputRef.current?.parentElement.contains(e.target)) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener("click", handleClickOutside)
    return () => document.removeEventListener("click", handleClickOutside)
  }, [])

  Search.layout = (page) => <MainLayout>{page}</MainLayout>

  return (
    <div className="w-full max-w-4xl mx-auto flex gap-4 p-5 rounded-full shadow-lg bg-white relative z-10">
      
      {/* Destination */}
      <div className="flex-1 relative">
        <div className="flex items-center gap-2 rounded-xl">
          <FaBed />
          <Input
            ref={inputRef}
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value)
              setShowSuggestions(true)
            }}
            placeholder="Та хаашаа аялах вэ?"
            className="border-none focus:ring-0 w-full"
          />
        </div>

        {/* Suggestions */}
        {showSuggestions && (
          <div className="absolute w-full mt-3 bg-white rounded-2xl shadow-2xl max-h-96 overflow-y-auto z-50 p-2">
            <div className="p-3 text-sm text-gray-500 font-semibold">
              Санал болгох байршил
            </div>

            {/* Static */}
            {staticSuggestions.map((item, i) => (
              <div
                key={i}
                className="flex gap-3 p-3 hover:bg-gray-100 cursor-pointer rounded-xl"
                onClick={() => handleStaticSelect(item)}
              >
                <div className="w-10 h-10 bg-gray-100 flex items-center justify-center rounded-xl">
                  <FaHouseUser />
                </div>
                <div>
                  <div className="font-medium">{item.title}</div>
                  <div className="text-xs text-gray-500">{item.desc}</div>
                </div>
              </div>
            ))}

            {suggestions.length > 0 && <div className="border-t my-2"></div>}

            {/* Google */}
            {suggestions.map((s) => (
              <div
                key={s.place_id}
                className="flex gap-3 p-3 hover:bg-gray-100 cursor-pointer rounded-xl"
                onClick={() => handleSelectSuggestion(s)}
              >
                <div className="w-10 h-10 bg-gray-100 flex items-center justify-center rounded-xl">
                  <FaCity />
                </div>
                <div>
                  <div className="font-medium">
                    {s.structured_formatting.main_text}
                  </div>
                  <div className="text-xs text-gray-500">
                    {s.structured_formatting.secondary_text}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Date */}
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">
            <CiCalendarDate />
            {format(date.from, "MM/dd/yyyy")} - {format(date.to, "MM/dd/yyyy")}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="range"
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>

      {/* Guests */}
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">
            <FaPerson />
            {options.adult} Том • {options.children} Хүүхэд • {options.room} Өрөө
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-64 space-y-3">
          {["adult", "children", "room"].map((item) => (
            <div key={item} className="flex justify-between items-center">
              <span>{item}</span>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  disabled={
                    options[item] <=
                    (item === "adult" || item === "room" ? 1 : 0)
                  }
                  onClick={() => handleOption(item, "d")}
                >
                  −
                </Button>
                <span>{options[item]}</span>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleOption(item, "i")}
                >
                  +
                </Button>
              </div>
            </div>
          ))}
        </PopoverContent>
      </Popover>

      {/* Search */}
      <Button className="rounded-full" onClick={handleSearch}>
        <IoSearchOutline />
      </Button>
    </div>
  )
}