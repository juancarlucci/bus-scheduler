import React from "react";
import * as s from './Legend.styles';

const Legend = (props) => {
    const {LegendTitle} = props;
    console.log("Legend T", LegendTitle);
  return (
    <>
      <s.LegendContainer>
        <p>{LegendTitle}</p>
        {props.children}
      </s.LegendContainer>
    </>
  );
};

export default Legend;