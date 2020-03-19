import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import MonitorItem from "./components/monitorItem";

function App() {
  useEffect(() => {
    getData();
    setInterval(() => {
      getData();
    }, 2000);
  }, []);
  const [casos, setCasos] = useState();
  const [casosHoje, setCasosHoje] = useState();
  const [mortes, setMortes] = useState();
  const [criticos, setCriticos] = useState();
  const [updateTime, setUpdateTime] = useState();
  const getData = async () => {
    const response = await axios.get(
      "https://coronavirus-19-api.herokuapp.com/countries/brazil"
    );
    console.log("response", response.data);
    setCasos(response.data.cases);
    setCasosHoje(response.data.todayCases);
    setMortes(response.data.deaths);
    setCriticos(response.data.critical);
    const now = new Date();
    setUpdateTime(now.toLocaleString("pt-BR"));
  };
  return (
    <div className="App">
      <header className="App-header">
        <h1>Monitor COVID-19</h1>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            width: "100%",
            flexDirection: "row"
          }}
        >
          <MonitorItem label="Casos totais" number={casos} />
          <MonitorItem
            label="Casos hoje"
            number={casosHoje}
            increase={((casosHoje / (casos - casosHoje)) * 100).toFixed(2)}
          />
          <MonitorItem label="Casos de Mortes" number={mortes} />
          <MonitorItem label="Casos críticos" number={criticos} />
        </div>
        <div style={{ display: "flex", flex: 1, alignItems: "flex-end" }}>
          <h6>Atualizado em: {updateTime}</h6>
        </div>
      </header>
    </div>
  );
}

export default App;
