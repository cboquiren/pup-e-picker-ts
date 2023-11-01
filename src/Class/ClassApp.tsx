import { Component } from "react";
import { ClassSection } from "./ClassSection";
import { ClassDogs } from "./ClassDogs";
import { ClassCreateDogForm } from "./ClassCreateDogForm";
import { ActiveSelectorType, Dog } from "../types";
import { Requests } from "../api";
import { dogPictures } from "../dog-pictures";
import toast from "react-hot-toast";

type State = {
  allDogs: Dog[];
  activeSelector: ActiveSelectorType | null;
  isLoading: boolean;
};

const getAllDogs = () => {
  return Requests.getAllDogs();
};

export class ClassApp extends Component<Record<string, never>, State> {
  state: State = {
    allDogs: [],
    activeSelector: null,
    isLoading: false,
  };

  refreshDogs = () => {
    this.setState({ isLoading: true });
    getAllDogs()
      .then((response) => this.setState({ allDogs: response }))
      .finally(() => this.setState({ isLoading: false }));
  };

  componentDidMount(): void {
    this.refreshDogs();
  }

  render() {
    const { allDogs, activeSelector, isLoading } = this.state;

    const createDog = (dog: Omit<Dog, "id">) => {
      this.setState({ isLoading: true });
      return Requests.postDog(dog)
        .then(this.refreshDogs)
        .then(() => toast.success(`Created ${dog.name}`))
        .finally(() => this.setState({ isLoading: false }));
    };

    const deleteDog = (dog: Dog) => {
      this.setState({ isLoading: true });
      return Requests.deleteDog(dog)
        .then(this.refreshDogs)
        .then(() => toast.success(`${dog.name} has been deleted`))
        .finally(() => this.setState({ isLoading: false }));
    };

    const updateDog = (dog: Dog, change: { isFavorite: boolean }) => {
      this.setState({ isLoading: true });
      return Requests.updateDog(dog, change)
        .then(this.refreshDogs)
        .then(() =>
          toast.success(`You have ${change.isFavorite ? "liked" : "disliked"} ${dog.name}`)
        )
        .finally(() => this.setState({ isLoading: false }));
    };

    return (
      <div className="App" style={{ backgroundColor: "goldenrod" }}>
        <header>
          <h1>pup-e-picker (Class Version)</h1>
        </header>
        <ClassSection
          allDogs={allDogs}
          activeSelector={activeSelector}
          activeSelectorHandler={(e) => {
            this.setState({ activeSelector: e });
          }}
        >
          {activeSelector === null && (
            <ClassDogs
              dogs={allDogs}
              deleteDog={deleteDog}
              updateDog={updateDog}
              isLoading={isLoading}
            />
          )}
          {(activeSelector === "favorited" || activeSelector === "unfavorited") && (
            <ClassDogs
              dogs={allDogs.filter((dog) => {
                return activeSelector === "favorited" ? dog.isFavorite : !dog.isFavorite;
              })}
              deleteDog={deleteDog}
              updateDog={updateDog}
              isLoading={isLoading}
            />
          )}
          {activeSelector === "create" && (
            <ClassCreateDogForm createDog={createDog} isLoading={isLoading} />
          )}
        </ClassSection>
      </div>
    );
  }
}
