import { useState } from "react";

const useForm = (initial = {}) => {
  const [inputs, setInputs] = useState(initial);

  function handleChange(e) {
    let { value, name, type } = e.target;

    if (type === "number") {
      value = parseInt(value);
    }

    if (type === "file") {
      value[0] = e.target.files;
    }

    setInputs((state) => ({
      ...state,
      [name]: value,
    }));
  }

  const resetForm = () => setInputs(initial);

  const clearForm = () => {
    const blankState = Object.entries(inputs).reduce(
      (acc, [key, value]) => (acc[key] = ""),
      {}
    );

    setInputs(blankState);
  };

  return { inputs, handleChange, resetForm, clearForm };
};

export default useForm;
