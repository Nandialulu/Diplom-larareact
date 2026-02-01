import '../Listing/Listing.css';

export const Listing = ({Title,Categories = [],Location = [],Price,Star,Instock,Img}) => {
  return (
    <div className="Listing">
      <div className="Listing-img">
        <img src={Img} alt={Title} />

        <span className="badge">Guest favorite</span>
        <button className="heart">♡</button>
      </div>

      {/* medeelel heseg */}
      <div className="Listing-Info">
        <p>{Title}</p>
        <p> {Categories.join(', ')}</p>
        <p>{Location.join(', ')}</p>

        <p className="Price">
        <span>{Price}₮</span>
        </p>
        <p>★ {Star}</p>
        <p>{Instock ? 'In stock' : 'Out of stock'}</p>
      </div>
    </div>
  );
};
export const comment =()=>{
  return {

  }
}
export default Listing;
