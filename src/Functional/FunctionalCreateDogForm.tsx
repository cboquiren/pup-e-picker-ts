import { useState } from "react";
import { dogPictures } from "../dog-pictures";
import { Dog } from "../types";

// use this as your default selected image
const defaultSelectedImage = dogPictures.BlueHeeler;

export const FunctionalCreateDogForm = ({
  createDog,
  isLoading,
}: {
  createDog: (dog: Omit<Dog, "id">) => void;
  isLoading: boolean;
}) => {
  const [dogName, setDogName] = useState("");
  const [dogDescription, setDogDescription] = useState("");
  const [image, setImage] = useState(defaultSelectedImage);

  const reset = () => {
    setDogName("");
    setDogDescription("");
    setImage(defaultSelectedImage);
  };

  return (
    <form
      action=""
      id="create-dog-form"
      onSubmit={(e) => {
        e.preventDefault();
        createDog({
          name: dogName,
          image: image,
          description: dogDescription,
          isFavorite: false,
        });
        reset();
      }}
    >
      <h4>Create a New Dog</h4>
      <label htmlFor="name">Dog Name</label>
      <input
        type="text"
        disabled={isLoading}
        value={dogName}
        onChange={(e) => setDogName(e.target.value)}
      />
      <label htmlFor="description">Dog Description</label>
      <textarea
        name=""
        id=""
        cols={80}
        rows={10}
        disabled={isLoading}
        value={dogDescription}
        onChange={(e) => setDogDescription(e.target.value)}
      ></textarea>
      <label htmlFor="picture">Select an Image</label>
      <select id="" onChange={(e) => setImage(e.target.value)} disabled={isLoading} value={image}>
        {Object.entries(dogPictures).map(([label, pictureValue]) => {
          return (
            <option value={pictureValue} key={pictureValue}>
              {label}
            </option>
          );
        })}
      </select>
      <input type="submit" disabled={isLoading} />
    </form>
  );
};
