import {Listing} from "../Listing/Listing"
import "../Home/Home.css"
import {Link} from '@inertiajs/react'
export const Home=()=>{
    return(
        <div className="Title1">
            {/* link bolgoh or useState boloh */}
            <div className="Listing-Grid">
            <Link href={'/MostPopular'}>Хамгийн эрэлттэй байр</Link>
            <Listing Title='Guesthouse in Seoul'
            Img='/zurag1.jpg' Categories={["Gueshouse"]} 
            Location={["Хан-уулдүүрэг"]} 
            Price={10000} 
            Star={5} 
            Instock={true}/>
        
            <Listing Title='Guesthouse in Seoul'
            Img='/zurag1.jpg' Categories={["Gueshouse"]} 
            Location={["Хан-уулдүүрэг"]} 
            Price={10000} 
            Star={5} 
            Instock={true}/>
            </div>
        </div>
        
        
    )
}
