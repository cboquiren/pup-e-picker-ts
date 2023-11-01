// you can use this type for react children if you so choose
import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Dog, ActiveSelectorType } from "../types";

export const FunctionalSection = ({
  allDogs,
  children,
  activeSelector,
  activeSelectorHandler,
}: {
  allDogs: Dog[];
  children: ReactNode;
  activeSelector: ActiveSelectorType | null;
  activeSelectorHandler: (e: ActiveSelectorType | null) => void;
}) => {
  let favorited = 0;
  let unfavorited = 0;
  allDogs.map((dog) => (dog.isFavorite ? favorited++ : unfavorited++));

  const setSelector = (value: ActiveSelectorType) => {
    activeSelector === value ? activeSelectorHandler(null) : activeSelectorHandler(value);
  };

  const setActiveClass = (value: ActiveSelectorType) => {
    return activeSelector === value ? "active" : "";
  };

  return (
    <section id="main-section">
      <div className="container-header">
        <div className="container-label">Dogs: </div>
        <Link to={"/class"} className="btn">
          Change to Class
        </Link>
        <div className="selectors">
          {/* This should display the favorited count */}
          <div
            className={`selector ${setActiveClass("favorited")}`}
            onClick={() => {
              setSelector("favorited");
            }}
          >
            favorited ( {favorited} )
          </div>

          {/* This should display the unfavorited count */}
          <div
            className={`selector ${setActiveClass("unfavorited")}`}
            onClick={() => {
              setSelector("unfavorited");
            }}
          >
            unfavorited ( {unfavorited} )
          </div>
          <div
            className={`selector ${setActiveClass("create")}`}
            onClick={() => {
              setSelector("create");
            }}
          >
            create dog
          </div>
        </div>
      </div>
      <div className="content-container">{children}</div>
    </section>
  );
};
