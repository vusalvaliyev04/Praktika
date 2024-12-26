import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToWishlist, removeFromWishlist } from '../../redux/features/productSlice';
import { toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
import { useNavigate } from 'react-router-dom';
import './Card.css';

const Card = ({ card }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const wishlist = useSelector((state) => state.products.wishlist);
  const { isAuthenticated } = useSelector((state) => state.auth);

  const isInWishlist = wishlist.some((item) => item.id === card.id);

  const handleWishlistToggle = () => {
    if (!isAuthenticated) {
      toast.info('Please log in to add to the wishlist');
      navigate('/login');
      return;
    }

    if (isInWishlist) {
      dispatch(removeFromWishlist(card.id));
      toast.success('Removed from wishlist!'); 
    } else {
      dispatch(addToWishlist(card));
      toast.success('Added to wishlist!'); 
    }
  };

  return (
    <div className="card">
      <i
        className={`fa-regular fa-heart card-heart ${isInWishlist ? 'in-wishlist' : ''}`}
        onClick={handleWishlistToggle}
      ></i>
      <div className="card-image">
        <img src={card.images} alt={card.title} />
      </div>
      <div className="card-content">
        <h3 className="title">{card.title.slice(0, 20) + ' ...'}</h3>
        <p className="category"><span>{card.category}</span></p>
        <p className="description">{card.description}</p>
        <div className="price-stock">
          <span className="price">{card.price}</span>
          <span className="stock low">stock: {card.stock}</span>
        </div>
        <div className="rating">⭐{card.rating}</div>
        <button className="btn">View Details</button>
      </div>
    </div>
  );
};

export default Card;
