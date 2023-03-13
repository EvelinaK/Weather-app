import React from "react";

import dayBg from "../../images/day2.png";
import day2Bg from "../../images/day.png";
import day3Bg from "../../images//day2.1.png";
import nightBg from "../../images/night.png";
import "../Decorator/decrator.scss";
export default function Decorator(props) {
  let background;

  if (props.DayOrNigth === "day") {
    background = dayBg;
  } else if (props.DayOrNigth === "night") {
    background = nightBg;
  } else if (props.DayOrNigth === "other") {
    background = day2Bg;
  } else {
    background = day3Bg;
  }

  return (
    <>
      <section className={`decoration`}>
        <div className="background">
          <img src={background} alt="Wallpaper" className="img-background" />
        </div>
      </section>
    </>
  );
}
