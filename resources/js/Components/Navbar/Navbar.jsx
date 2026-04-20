import "../Navbar/Nav.css"
import Search from '@/Pages/Search/Search'
import {Link, usePage} from '@inertiajs/react'
import { MdLogout } from "react-icons/md";
import {DropdownMenu,DropdownMenuContent,DropdownMenuGroup,DropdownMenuItem,DropdownMenuLabel,DropdownMenuSeparator,DropdownMenuShortcut,DropdownMenuTrigger,} from "@/components/ui/dropdown-menu"
import {Avatar, AvatarFallback,AvatarImage,} from "@/Components/ui/avatar";
import { Button } from "@/components/ui/button";
import { RxHamburgerMenu } from "react-icons/rx";

export const Navbar =()=>{
// auth user shalgah uguliin sangaas tatah
    const { auth } = usePage().props;
    // newtersen heregtlegch zarlah
const user = auth?.user; 

const roleName = user?.role?.name ?? user?.role ?? null;
    console.log(user);
    return(
        <div id="Nav"> 
            <div className="nav-inner">
            <h1 className="Logo">Gerhub</h1> 

        <div className="Main">
            <Link href={'/welcome'}><div className='home'>Нүүр хуудас</div></Link>
            <Link href={'/comment'}><div className='comment'>Сэтгэгдэл</div></Link>
            <Link href={'/service'}><div className='service'>Үйлчилгээ</div></Link>
        </div>

        <div className="Auth">
            {/* newtersen hereglegch */}
                {user ? (
        <>
            {roleName === "admin" || roleName === "super_admin" ? (
            <>
            <Link href={route('admin.dashboard')}>
            <div className="Admin"> Админ самбар</div>
            </Link>
                <Link href={route("admin.dashboard")}>
            <div className="Profile">
                <Avatar className="h-7 w-7">
                    <AvatarImage className= ''
                      src={user?.avatar ? `/storage/${user.avatar}` : undefined}
                      alt={user?.name || "User"}/>
                    <AvatarFallback>
                      {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
                    </AvatarFallback>
                  </Avatar>
            </div>
          </Link>
           </>
            ) : roleName === "host" ? (
              <>
               <Link href={route("host.create")}>
                <div className="Host">Байр түрээслэх</div>
                </Link>
              <Link href={route("host.dashboard")}>
                <div className="Profile">
                      <Avatar className="h-7 w-7">
                    <AvatarImage className= ''
                      src={user?.avatar ? `/storage/${user.avatar}` : undefined}
                      alt={user?.name || "User"}/>
                    <AvatarFallback>
                      {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
                    </AvatarFallback>
                  </Avatar>
                </div>
                </Link>
              </>
              ):(
                <> 
                <Link href={route("host.dashboard")}>
                  <div className="Host">Байр түрээслэх</div>
                </Link>
                <Link href={route("guest.Dashboard")}>
                <div className="Profile">
                    <Avatar className="h-7 w-7">
                    <AvatarImage className= ''
                      src={user?.avatar ? `/storage/${user.avatar}` : undefined}
                      alt={user?.name || "User"}/>
                    <AvatarFallback>
                      {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
                    </AvatarFallback>
                  </Avatar>
                </div>
                </Link>
                </>
            )}
            <Link href="/logout"method="post" as="button" className="LogOut" ><MdLogout /></Link>
        </>
        ) : (
        <>
          <button className="font-medium">
       <Link href={route("login")}>Байр түрээслэх</Link>
    </button>
     <DropdownMenu>
      <DropdownMenuTrigger asChild>
         <div className="flex flex-wrap items-center gap-2 md:flex-row">
        <Button variant="outline"><RxHamburgerMenu /></Button>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuLabel></DropdownMenuLabel>
          <DropdownMenuItem aschild>
            <Link href={route("login")} className="font-medium">Нэвтрэх</Link>
            <DropdownMenuShortcut>⌘</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
             <Link href={route("register")} className="font-medium">Бүртгүүлэх</Link>
            <DropdownMenuShortcut>⌘</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href={route("login")} className="font-medium">Байр түрээслэх</Link>
            <DropdownMenuShortcut>⌘</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
      </DropdownMenuContent>
    </DropdownMenu>
        </>
        )}
         </div>   
         </div>
         <div className='nav1'>
            <Search/>
         </div>
        </div> 
    )
}
export default Navbar