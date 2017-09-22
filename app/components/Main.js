import React from "react";
import Jumbotron from "./children/Jumbotron";

const Main = props => (
  <div>
    <Jumbotron />
    {props.children}
  </div>
);

export default Main;
