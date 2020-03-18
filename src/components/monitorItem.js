import React from "react";

const MonitorItem = props => {
  return (
    <div>
      <h3>{props.label}</h3>
      <h1>{props.number}</h1>
      {props.increase && <h4>+{props.increase} %</h4>}
    </div>
  );
};

export default MonitorItem;
