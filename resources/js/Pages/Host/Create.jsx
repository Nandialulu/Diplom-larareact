import React, { useState } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link, router } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {Select,SelectContent,SelectItem,SelectTrigger,SelectValue,} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Map from "@/Components/Map";
import { format } from "date-fns";
import {Popover,PopoverContent,PopoverTrigger,} from "@/components/ui/popover";
import { CiCalendarDate } from "react-icons/ci";
import { Calendar } from "@/components/ui/calendar";
import MainLayout from "@/Layouts/MainLayout"
export default function Create({ auth }) {
  const [isSubmitting, setSubmitting] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [markers, setMarkers] = useState([]);
  const [date, setDate] = useState({
    from: null,
    to: null,
  });

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    address: "",
    price_per_day: "",
    guest_number: "",
    bedrooms: "",
    bathrooms: "",
    image: [],
    start_date: "",
    end_date: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImgChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({
      ...prev,
      image: files,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);

    if (markers.length === 0) {
      alert("Байршил сонгоно уу!");
      setSubmitting(false);
      return;
    }

    const data = new FormData();

    Object.keys(formData).forEach((key) => {
      if (key !== "image") {
        data.append(key, formData[key]);
      }
    });

    formData.image.forEach((file) => {
      data.append("images[]", file);
    });

    data.append("lat", markers[0].lat);
    data.append("lng", markers[0].lng);

    router.post("/host", data, {
      onFinish: () => setSubmitting(false),
    });
  };

  const handleDateChange = (range) => {
    setDate(range);

    setFormData((prev) => ({
      ...prev,
      start_date: range?.from ? range.from.toISOString().split("T")[0] : "",
      end_date: range?.to ? range.to.toISOString().split("T")[0] : "",
    }));
  };

  const handleMapClick = async (lat, lng) => {
    const newLat = Number(lat);
    const newLng = Number(lng);

    setMarkers([{ lat: newLat, lng: newLng }]);

    try {
      if (!window.google || !window.google.maps) return;

      const geocoder = new window.google.maps.Geocoder();

      geocoder.geocode(
        { location: { lat: newLat, lng: newLng } },
        (results, status) => {
          if (status === "OK" && results && results.length > 0) {
            setFormData((prev) => ({
              ...prev,
              address: results[0].formatted_address,
            }));
          } else {
            console.error("Geocoder failed:", status);
          }
        }
      );
    } catch (error) {
      console.error("Map click address error:", error);
    }
  };
  console.log(import.meta.env.VITE_GOOGLE_MAPS_API_KEY)
  Create.layout = (page) => <MainLayout>{page}</MainLayout>
  return (
    <AuthenticatedLayout user={auth.user} header={<h2 className="font-medium">Байр нэмэх</h2>}>
      <div className="flex h-screen bg-gray-100">
        <Sidebar collapsed={collapsed} className="bg-white shadow h-full">
          <Menu className="font-medium">
            <MenuItem>
              <Link href="/dashboard">Үндсэн хэсэг</Link>
            </MenuItem>
            <MenuItem>
              <Link href={route("host.create")}>Байр нэмэх</Link>
            </MenuItem>
            <MenuItem>
              <Link href={route("host.index")}>Бүртгүүлсэн байр</Link>
            </MenuItem>
            <MenuItem component={<Link href={route("host.BookingInfo")} />}>
              Захиалгын мэдээлэл
            </MenuItem>
            <MenuItem>
              <Link href={route("host.Review")}>Сэтгэгдэл харах</Link>
            </MenuItem>
          </Menu>
        </Sidebar>

        <div className="flex-1 p-6 flex flex-col gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Байрны мэдээлэл</CardTitle>
            </CardHeader>

            <CardContent>
              <form
                onSubmit={handleSubmit}
                className="space-y-4"
                encType="multipart/form-data"
              >
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Гарчиг</Label>
                    <Input
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      placeholder="Жишээ: Luxury apartment"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Төрөл</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) =>
                        setFormData((prev) => ({ ...prev, category: value }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Сонгох" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="choose">Байрны төрөл сонгох</SelectItem>
                        <SelectItem value="apartment">Орон сууц</SelectItem>
                        <SelectItem value="house">Байшин</SelectItem>
                        <SelectItem value="villa">Вилла</SelectItem>
                        <SelectItem value="cabin">Өрөө</SelectItem>
                        <SelectItem value="trending">Орчин үеийн</SelectItem>
                        <SelectItem value="bungalow">Зуслангийн байшин</SelectItem>
                        <SelectItem value="new">Шинэ</SelectItem>
                        <SelectItem value="other">Бусад</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Тайлбар</Label>
                    <Textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Тайлбар бичнэ үү"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Хаяг</Label>
                    <Input
                      name="address"
                      value={formData.address}
                      readOnly
                      placeholder="Газрын зураг дээр байршил сонгоно уу"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Үнэ / өдөр</Label>
                    <Input
                      name="price_per_day"
                      value={formData.price_per_day}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Зочдын тоо</Label>
                    <Input
                      type="number"
                      name="guest_number"
                      value={formData.guest_number}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Унтлагын өрөө</Label>
                    <Input
                      type="number"
                      name="bedrooms"
                      value={formData.bedrooms}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Угаалгын өрөө</Label>
                    <Input
                      type="number"
                      name="bathrooms"
                      value={formData.bathrooms}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Байрны зураг</Label>
                    <Input
                      type="file"
                      multiple
                      name="image"
                      onChange={handleImgChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Түрээслэх хугацаа</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="flex gap-2">
                          <CiCalendarDate />
                          {date.from && date.to
                            ? `${format(date.from, "MM/dd/yyyy")} - ${format(
                                date.to,
                                "MM/dd/yyyy"
                              )}`
                            : "Сонгоно уу"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="range"
                          selected={date}
                          onSelect={handleDateChange}
                          numberOfMonths={2}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Хадгалж байна..." : "Байр нэмэх"}
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/">Цуцлах</Link>
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          <Card>
            <div>
              <Map markers={markers} onMapClick={handleMapClick} />
              {markers.length > 0 && (
                <div className="p-4">
                  <p className="text-green-600 font-medium">Байршил сонгогдлоо</p>
                  <p>
                    Таны сонгосон байршил: {Number(markers[0].lat).toFixed(5)},{" "}
                    {Number(markers[0].lng).toFixed(5)}
                  </p>
                  <p>Хаяг: {formData.address}</p>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}