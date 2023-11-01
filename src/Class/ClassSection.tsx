// you can use `ReactNode` to add a type to the children prop
import { Component, ReactNode } from "react";
import { Link } from "react-router-dom";
import { ActiveSelectorType, Dog } from "../types";

export class ClassSection extends Component<{
  allDogs: Dog[];
  activeSelector: ActiveSelectorType | null;
  activeSelectorHandler: (e: ActiveSelectorType | null) => void;
  children: ReactNode;
}> {
  render() {
    const { allDogs, activeSelector, activeSelectorHandler, children } = this.props;
    let favorited = 0;
    let unfavorited = 0;
    allDogs.map((dog: Dog) => (dog.isFavorite ? favorited++ : unfavorited++));

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

          <Link to={"/functional"} className="btn">
            Change to Functional
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
  }
}
