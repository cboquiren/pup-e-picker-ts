import { Dog } from "./types";

export const baseUrl = "http://localhost:3000";

export const Requests = {
  // should return a promise with all dogs in the database
  getAllDogs: (): Promise<Dog[]> => {
    return fetch(`${baseUrl}/dogs`).then((response) => response.json());
  },
  // should create a dog in the database from a partial dog object
  // and return a promise with the result
  postDog: (dog: Omit<Dog, "id">) => {
    return fetch(`${baseUrl}/dogs`, {
      method: "POST",
      body: JSON.stringify(dog),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => response.json());
  },

  // should delete a dog from the database
  deleteDog: (dog: Dog) => {
    return fetch(`${baseUrl}/dogs/${dog.id}`, {
      method: "DELETE",
    }).then((response) => response.json());
  },

  updateDog: (dog: Dog, change: { isFavorite: boolean }) => {
    return fetch(`${baseUrl}/dogs/${dog.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(change),
    }).then((response) => response.json());
  },

  // Just a dummy function for use in the playground
  dummyFunction: () => {
    console.log("dummy stuff");
  },
};
