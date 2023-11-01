import { DogCard } from "../Shared/DogCard";
import { Component } from "react";
import { Dog } from "../types";

// Right now these dogs are constant, but in reality we should be getting these from our server
export class ClassDogs extends Component<{
  dogs: Dog[];
  isLoading: boolean;
  deleteDog: (dog: Dog) => void;
  updateDog: (dog: Dog, change: { isFavorite: boolean }) => void;
}> {
  render() {
    const { dogs, isLoading, updateDog, deleteDog } = this.props;
    return (
      <>
        {dogs.map((dog) => {
          return (
            <DogCard
              dog={{
                id: dog.id,
                image: dog.image,
                description: dog.description,
                isFavorite: dog.isFavorite,
                name: dog.name,
              }}
              key={dog.id}
              onTrashIconClick={() => {
                deleteDog(dog);
              }}
              onHeartClick={() => {
                updateDog(dog, { isFavorite: false });
              }}
              onEmptyHeartClick={() => {
                updateDog(dog, { isFavorite: true });
              }}
              isLoading={isLoading}
            />
          );
        })}
      </>
    );
  }
}
