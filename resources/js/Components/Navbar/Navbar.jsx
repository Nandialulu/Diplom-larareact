import "../Navbar/Nav.css"
import Search from '@/Pages/Search/Search'
import { useState } from "react"
import {Link} from '@inertiajs/react'
export const Navbar=()=>{
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
            <div className="Host">Байр түрээслэх</div>
             <Link href={'/login'}><div className="LogIn">Нэвтрэх</div></Link>
            <Link href={'/register'}><div className="SignIn">Бүртгүүлэх</div></Link>
         </div>
         </div>
         <div className='nav1'>
            <Search/>

         </div>
        </div> 
    )
}
export default Navbar