import { Component } from "react";
import { dogPictures } from "../dog-pictures";
import { Dog } from "../types";

type FormState = {
  dogName: string;
  dogDescription: string;
  image: string;
};

export class ClassCreateDogForm extends Component<{
  createDog: (dog: Omit<Dog, "id">) => void;
  isLoading: boolean;
}> {
  state: FormState = {
    dogName: "",
    dogDescription: "",
    image: dogPictures.BlueHeeler,
  };
  render() {
    const { dogName, dogDescription, image } = this.state;
    const { createDog, isLoading } = this.props;

    const reset = () => {
      this.setState({
        dogName: "",
        dogDescription: "",
        image: dogPictures.BlueHeeler,
      });
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
          value={dogName}
          onChange={(e) => {
            this.setState({ dogName: e.target.value });
          }}
          disabled={isLoading}
        />
        <label htmlFor="description">Dog Description</label>
        <textarea
          name=""
          id=""
          cols={80}
          rows={10}
          value={dogDescription}
          onChange={(e) => {
            this.setState({ dogDescription: e.target.value });
          }}
          disabled={isLoading}
        />
        <label htmlFor="picture">Select an Image</label>
        <select
          onChange={(e) => {
            this.setState({ image: e.target.value });
          }}
          disabled={isLoading}
          value={image}
        >
          {Object.entries(dogPictures).map(([label, pictureValue]) => {
            return (
              <option value={pictureValue} key={pictureValue}>
                {label}
              </option>
            );
          })}
        </select>
        <input type="submit" value="submit" disabled={isLoading} />
      </form>
    );
  }
}
