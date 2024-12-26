import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromWishlist, clearWishlist } from '../redux/features/productSlice';
import { Link } from 'react-router-dom'; 
import { toast } from 'react-toastify'; 
import styles from './Wishlist.module.css';

const Wishlist = () => {
  const wishlist = useSelector((state) => state.products.wishlist);
  const dispatch = useDispatch();

  const handleRemoveFromWishlist = (productId) => {
    dispatch(removeFromWishlist(productId));
    toast.success('Removed from wishlist!');
  };

  const handleClearWishlist = () => {
    dispatch(clearWishlist());
    toast.success('All wishlist deleted!');
  };

  return (
    <>
      <header className={styles.header}>
        <h1>Your Wishlist</h1>
      </header>

      <main>
        <section className={styles.wishlistContainer}>
          <div className={styles.container}>
            <div className={styles.row}>
              {wishlist.length > 0 ? (
                wishlist.map((product) => (
                  <div key={product.id} className={styles.wishlistItem}>
                    <div className={styles.image}>
                      <img
                        src={product.images}
                        alt={product.title}
                        className={styles.productImage}
                      />
                    </div>
                    <h3 className={styles.productTitle}>
                      {product.title.slice(0, 20) + ' ...'}
                    </h3>
                    <p className={styles.productCategory}>{product.category}</p>
                    <p className={styles.productPrice}>${product.price}</p>
                    <button
                      className={styles.removeButton}
                      onClick={() => handleRemoveFromWishlist(product.id)}
                    >
                      Delete
                    </button>
                  </div>
                ))
              ) : (
                <p>Your wishlist is empty</p>
              )}
            </div>

            <Link to="/" className={styles.backLink}>
              Back to
            </Link>
            <button className={styles.deleteAllButton} onClick={handleClearWishlist}>
              Delete All
            </button>
          </div>
        </section>
      </main>
    </>
  );
};

export default Wishlist;
