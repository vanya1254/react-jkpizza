import axios from "axios";
import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const Pizza: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [pizza, setPizza] = React.useState<{
    imageUrl: string;
    title: string;
    price: number;
  }>();

  React.useEffect(() => {
    const getPizza = async () => {
      try {
        const { data } = await axios.get(
          `https://3fbdd3c00f84b334.mokky.dev/items/${id}`
        );

        setPizza(data);
      } catch (error) {
        console.log(error);
        navigate("react-jkpizza/");
      }
    };

    getPizza();
  }, []);

  if (!pizza) {
    return "Loading...";
  }

  return (
    <div className="container">
      <img src={pizza.imageUrl} alt="pizza" />
      <h2>{pizza.title}</h2>
      <h4>{pizza.price}</h4>
    </div>
  );
};

export default Pizza;
