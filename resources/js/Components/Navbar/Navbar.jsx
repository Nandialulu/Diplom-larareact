import "../Navbar/Nav.css"
import Search from '@/Pages/Search/Search'
import { useState } from "react"
import {Link, usePage} from '@inertiajs/react'
import { CgProfile } from "react-icons/cg";
import { MdLogout } from "react-icons/md";
export const Navbar=()=>{
    // auth user shalgah
    const { auth } = usePage().props
    // newtersen heregtlegch zarlah
    const user = auth.user
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
            { user &&(
                <>
                    <Link href={'/become-host'}>
                    <div className="Host">Байр түрээслэх</div>
                    </Link>

                    <Link href={'/Profile'}>
                    <div className="Profile">
                        <CgProfile />
                    </div>
                    </Link>

                    <Link 
                    href={'/logout'} method="post" as="button" className="LogOut">
                       <MdLogout />
                    </Link>
                </>
            )}
            {/* newtereegui hereglegch */}
            { !user && (
                <> 
                <Link href={'/become-host'}>
                <div className="Host">Байр түрээслэх</div>
                </Link>
                <Link href={'/login'}>
                <div className="LogIn">Нэвтрэх</div>
                </Link>
                <Link href={'/register'}>
                <div className="SignIn">Бүртгүүлэх</div>
                </Link>
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