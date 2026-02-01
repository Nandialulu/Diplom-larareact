import {Navbar} from '@/Components/Navbar/Navbar';
import {Home} from './Home/Home';
import Footer from '@/Components/Footer/Footer'
function Welcome(){
    return(
        <div>
        <Navbar/>
        <Home/>
        <Footer/>
        </div>
    )
}
export default Welcome