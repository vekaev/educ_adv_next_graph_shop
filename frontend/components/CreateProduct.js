import { useState } from "react";
import useForm from "../lib/hooks/useForm";

const CreateProduct = () => {
  const { inputs, handleChange } = useForm({ name: "", price: null });

  return (
    <form>
      <label htmlFor="name">
        Name
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Name"
          value={inputs.name}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="price">
        Price
        <input
          type="number"
          id="price"
          name="price"
          placeholder="Price"
          value={inputs.price}
          onChange={handleChange}
        />
      </label>
    </form>
  );
};

export default CreateProduct;
