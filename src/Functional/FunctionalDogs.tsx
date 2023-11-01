import { DogCard } from "../Shared/DogCard";
import { Dog } from "../types";

// Right now these dogs are constant, but in reality we should be getting these from our server
export const FunctionalDogs = ({
  dogs,
  deleteDog,
  updateDog,
  isLoading,
}: {
  dogs: Dog[];
  deleteDog: (dog: Dog) => void;
  updateDog: (dog: Dog, change: { isFavorite: boolean }) => void;
  isLoading: boolean;
}) => {
  return (
    //  the "<> </>"" are called react fragments, it's like adding all the html inside
    // without adding an actual html element
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
};
