import { usePage, Link, router, Head } from "@inertiajs/react"
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout"
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar"
import { useState } from "react"
import {Table,TableBody,TableCell,TableHead,TableHeader,TableRow,} from "@/Components/ui/table"
import { Button } from "@/Components/ui/button"
import {Command,CommandDialog,CommandEmpty,CommandGroup,CommandInput,CommandItem,CommandList,CommandSeparator,CommandShortcut,} from "@/components/ui/command"
import PaginationLinks from "@/Components/Pagination"

export default function Index({ auth }) {
  const [collapsed, setCollapsed] = useState(false)
  // search huvisagch zarlaj uguud (dahiad asuuh)
  const { listings, search: initialSearch } = usePage().props
  const [search, setSearch] = useState(initialSearch || '');

  const handleSearch = (e) => {
    e.preventDefault()
    router.get(route("host.index"), {search}, {
      preserveState:true,
      replace:true,
    })
  }
  const deleteListing = (id) => {
    if (confirm("Та устгахдаа итгэлтэй байна уу?")) {
      router.delete(route("host.destroy", id))
    }
  }
  return (
    <AuthenticatedLayout user={auth.user} header={<h2 className="font-medium">Бүртгэлтэй байр</h2>}>
      <Head title="Listings" />
      <div className="flex h-screen bg-gray-100">
        <Sidebar collapsed={collapsed} className="bg-white shadow">
          <Menu className="font-medium"> 
            <MenuItem component={<Link href="/dashboard" />}>Үндсэн хэсэг</MenuItem>
            <MenuItem component={<Link href={route("host.create")} />}>
              Байр нэмэх
            </MenuItem>
            <MenuItem component={<Link href={route("host.index")} />}>
              Бүртгүүлсэн байр
            </MenuItem>
            <MenuItem component={<Link href={route("host.BookingInfo")} />}>
              Захиалгын мэдээлэл
            </MenuItem>
            <MenuItem>
              <Link href={route("host.Review")}>Сэтгэгдэл харах</Link>
            </MenuItem>
          </Menu>
        </Sidebar>

        <main className="flex-1 p-6 overflow-auto">
          <form onSubmit={handleSearch} className="flex gap-2 items-center">
            <Command >
              <CommandInput placeholder="Type a command or search..." value={search}
           onValueChange={setSearch}/>
            </Command >
            <button type="submit">
            хайх
          </button>
          </form>
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Зураг</TableHead>
                <TableHead>Төрөл</TableHead>
                <TableHead>Мэдээлэл</TableHead>
                <TableHead>Хаяг</TableHead>
                <TableHead>Үнэ</TableHead>
                <TableHead>Хүн</TableHead>
                <TableHead>Унтлагын өрөө</TableHead>
                <TableHead>Угаалгын өрөө</TableHead>
                <TableHead>Үйлдэл</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {/* pagination baigaa uyd data.map awna */}
              {listings.data.map((listing) => (
                <TableRow key={listing.id}>
                  <TableCell>
                    <img
                     src={
                          listing.images?.[0]?.img_path
                          ? `/storage/${listing.images[0].img_path}`
                          : "/images/no-image.png"
                        }
                    />
                  </TableCell>
                  <TableCell>{listing.category}</TableCell>
                  <TableCell>{listing.description}</TableCell>
                  <TableCell>{listing.address}</TableCell>
                  <TableCell>{listing.price_per_day}</TableCell>
                  <TableCell>{listing.guest_number}</TableCell>
                  <TableCell>{listing.bedrooms}</TableCell>
                  <TableCell>{listing.bathrooms}</TableCell>
                  <TableCell className="space-x-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={route("host.edit", listing.id)}>
                        Засах
                      </Link>
                    </Button>

                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => deleteListing(listing.id)}
                    >
                      Устгах
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          {/* Paginate import hiih heseg */}
          <div className="mt-6 flex justify-center">
            <PaginationLinks links={listings.links}/>
          </div>
        </main>
      </div>
    </AuthenticatedLayout>
  )
}