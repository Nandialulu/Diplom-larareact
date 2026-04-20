import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link } from "@inertiajs/react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";

export default function AdminLayout({ children, header }) {
  return (
    <AuthenticatedLayout header={header}>
      <div className="flex min-h-screen bg-gray-100">
        <Sidebar className="border-r bg-white shadow-md ">
          <Menu className="text-base">
            <MenuItem component={<Link href={route("admin.dashboard")} />}>
              Үндсэн мэдээлэл
            </MenuItem>

            <SubMenu label="Хэрэглэгч удирдах">
              <MenuItem component={<Link href={route("admin.allGuest")} />}>
                Бүх зочин
              </MenuItem>
              <MenuItem component={<Link href={route("admin.allHost")} />}>
                Бүх хост
              </MenuItem>
            </SubMenu>

            <SubMenu label="Байр">
              <MenuItem component={<Link href={route("admin.allListing")} />}>
                Бүх байр
              </MenuItem>
            </SubMenu>

            <SubMenu label="Төлбөр, орлого хянах">
              <MenuItem component={<Link href={route("admin.AllBooking")} />}>
                Захиалгууд харах
              </MenuItem>
              <MenuItem component={<Link href={route("admin.Bookingstory")} />}>
                Төлбөрийн түүх
              </MenuItem>
            </SubMenu>

            <SubMenu label="Тохиргоо">
              <MenuItem component={<Link href={route("admin.AddCategory")} />}>
                Category нэмэх
              </MenuItem>
            </SubMenu>
          </Menu>
        </Sidebar>

        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </AuthenticatedLayout>
  );
}