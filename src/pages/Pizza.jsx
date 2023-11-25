import axios from "axios";
import React from "react";
import { useParams, useNavigate } from "react-router-dom";

export const Pizza = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [pizza, setPizza] = React.useState({});

  React.useEffect(() => {
    async function getPizza() {
      try {
        const { data } = await axios.get(
          `https://3fbdd3c00f84b334.mokky.dev/items/${id}`
        );

        setPizza(data);
      } catch (error) {
        console.log(error);
        navigate("/");
      }
    }

    getPizza();
  }, []);

  if (!pizza) {
    return "Loading...";
  }

  return <div>{pizza.title}</div>;
};
