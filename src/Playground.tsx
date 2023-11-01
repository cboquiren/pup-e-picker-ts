import { Requests } from "./api";

const messAround = async () => {
  // Write your test code in this function
  Requests.getAllDogs();
};

export const Playground = () => {
  return (
    <div>
      <h1>Functions Playground</h1>;
      <button
        onClick={() => {
          messAround();
        }}
      >
        Press This Button To Trigger `messAround`
      </button>
    </div>
  );
};
