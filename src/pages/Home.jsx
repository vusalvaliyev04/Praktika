import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getProducts } from "../redux/features/productSlice";
import Card from "../components/card/Card";



const Home = () => {
  const datas = useSelector((state) => state.products.products);
  
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch, datas]);

  return (
    <section id="products">
      <h1>Products</h1>
      <div className="container">
        <div className="cards">
          {datas && datas.map((card) => <Card key={card.id} card={card} />)}
        </div>
      </div>
    </section >
  );
};

export default Home;
