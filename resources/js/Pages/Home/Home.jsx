import {Listing} from "../Listing/Listing"
import "../Home/Home.css"
import {Link} from '@inertiajs/react'


export const Home = () => {
  return (
    <div className="Title1">
      <Link href="/MostPopular">
        Хамгийн эрэлттэй байр
      </Link>
      <div className="Listing-Grid">
        <Listing
          Title="Guesthouse in Seoul"
          Img="/zurag1.jpg"
          Categories={["Guesthouse"]}
          Location={["Хан-Уул дүүрэг"]}
          Price={10000}
          Star={5}
          Instock={true}
        />
        <Listing
          Title="Guesthouse in Seoul"
          Img="/zurag1.jpg"
          Categories={["Guesthouse"]}
          Location={["Хан-Уул дүүрэг"]}
          Price={10000}
          Star={5}
          Instock={true}
        />
      </div>
      <div className="Title2">
        <Link href="/">
        Ирэх сар боломжтой
      </Link>
       <div className="Listing-Grid">
       <Listing
          Title="Darhan apartment"
          Img="/zurag2.jpg"
          Categories={["Apartment"]}
          Location={["Дархан"]}
          Price={12000}
          Star={4.6}
          Instock={false}
        />
         <Listing
          Title="Darhan apartment"
          Img="/zurag2.jpg"
          Categories={["Apartment"]}
          Location={["Дархан"]}
          Price={12000}
          Star={4.6}
          Instock={false}
        />
        </div>
        </div>
    </div>
  );
};

