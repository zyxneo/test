
import React from "react";
import Colors from "../colors";
import style from "./segments.css";
import LoadDrillData from "./loadDrillData";
import Drill from "./drill";

export default class Ring extends React.Component {

  constructor() {
    super();
    this.state = {
      "tunnel": {
        radius: 0
      },
      "drills": [
      ]
    }
  }

  updateData (data) {
    this.setState(data);
  }

  componentDidMount() {
    LoadDrillData("http://localhost:8080/api/test.json", this.updateData.bind(this));
  }

  render() {
    let strokeMainColor = Colors.black;
    let drillStartColor = Colors.black;
    let drillDevianceColor = Colors.yellow;
    let radius = this.state.tunnel.radius;
    let padding = 10;
    let ringSvgWidth = (radius + padding) * 2;
    let ringSvgHeight = (radius + padding) * 2;
    let cX = radius;
    let cY = radius;

    return (
      <div class="ring">
        <svg className="ring__svg" version="1.1" viewBox={"-" + padding + " -" + padding + " " + ringSvgWidth  + " " + ringSvgHeight}>
          <circle cx={cX} cy={cY} r={radius} fill="none" stroke={strokeMainColor} strokeWidth="1"/>
          {
            this.state.drills.map(function(item) {
              let drillId = item.id;
              return (
                <g class="drill" key={drillId}>
                  {
                    item.data.map(function(item) {
                      return <Drill key={drillId + item.depth + 1} cx={item.position[0]} cy={item.position[1]} fill={drillDevianceColor}/>
                    })
                  }
                  <Drill cx={item.position[0]} cy={item.position[1]} fill={drillStartColor}/>
                </g>
              )
            })
          };

        </svg>
      </div>
    )
  }
}
