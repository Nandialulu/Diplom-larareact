import '../Listing/Listing.css';

export const Listing = ({Title, Categories = [],Location = [],Price,Star,Instock,Img}) => {
  return (
    <div className="Listing">
      <div className="Listing-img">
        <img src={Img} alt={Title} />
        <span className="badge">Guest favorite</span>
        <button className="heart">♡</button>
      </div>
      {/* medeelel heseg , nemj zaswarlah*/}
      <div className="Listing-Info">
      <div className="title-row">
        <p className="title">{Title}</p>
        <span className="star">★ {Star}</span>
      </div>

      <p className="category">{Categories.join(', ')}</p>
      <p className="location">{Location.join(', ')}</p>

      <p className="price">
        <span>{Price}₮</span>
        <span className="stock">
          {Instock ? 'In stock' : 'Out of stock'}
        </span>
      </p>
    </div>
    </div>
  );
};
export default Listing;
