import { useEffect, useState } from "react";
import { Requests } from "../api";
import { FunctionalCreateDogForm } from "./FunctionalCreateDogForm";
import { FunctionalDogs } from "./FunctionalDogs";
import { FunctionalSection } from "./FunctionalSection";
import { ActiveSelectorType, Dog } from "../types";
import toast from "react-hot-toast";

const getAllDogs = () => {
  return Requests.getAllDogs();
};

export function FunctionalApp() {
  const [allDogs, setAllDogs] = useState<Dog[]>([]);
  const [activeSelector, setActiveSelector] = useState<ActiveSelectorType | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const refreshDogs = () => {
    setIsLoading(true);
    getAllDogs()
      .then(setAllDogs)
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    refreshDogs();
  }, []);

  const createDog = (dog: Omit<Dog, "id">) => {
    setIsLoading(true);
    return Requests.postDog(dog)
      .then(refreshDogs)
      .then(() => {
        toast.success(`Created ${dog.name}`);
      })
      .finally(() => setIsLoading(false));
  };

  const deleteDog = (dog: Dog) => {
    setIsLoading(true);
    return Requests.deleteDog(dog)
      .then(refreshDogs)
      .then(() => toast.success(`${dog.name} has been deleted`))
      .finally(() => setIsLoading(false));
  };

  const updateDog = (dog: Dog, change: { isFavorite: boolean }) => {
    setIsLoading(true);
    return Requests.updateDog(dog, change)
      .then(refreshDogs)
      .then(() => toast.success(`You have ${change.isFavorite ? "liked" : "disliked"} ${dog.name}`))
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="App" style={{ backgroundColor: "skyblue" }}>
      <header>
        <h1>pup-e-picker (Functional)</h1>
      </header>
      <FunctionalSection
        allDogs={allDogs}
        activeSelector={activeSelector}
        activeSelectorHandler={(e) => setActiveSelector(e)}
      >
        {activeSelector === null && (
          <FunctionalDogs
            dogs={allDogs}
            deleteDog={deleteDog}
            updateDog={updateDog}
            isLoading={isLoading}
          />
        )}
        {activeSelector === "favorited" && (
          <FunctionalDogs
            dogs={allDogs.filter((dog) => dog.isFavorite)}
            deleteDog={deleteDog}
            updateDog={updateDog}
            isLoading={isLoading}
          />
        )}
        {activeSelector === "unfavorited" && (
          <FunctionalDogs
            dogs={allDogs.filter((dog) => !dog.isFavorite)}
            deleteDog={deleteDog}
            updateDog={updateDog}
            isLoading={isLoading}
          />
        )}
        {activeSelector === "create" && (
          <FunctionalCreateDogForm createDog={createDog} isLoading={isLoading} />
        )}
      </FunctionalSection>
    </div>
  );
}
