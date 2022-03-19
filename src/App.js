import axios from "axios";
import React from "react";
import Li from "./components/Li";

function App() {
  const [previousInfo, setPreviousInfo] = React.useState([])
  const [info, setInfo] = React.useState([]);
  const [newInfo, setNewInfo] = React.useState([]);
  // Сегодняшние данные
  React.useEffect(() => {
    axios.get('https://www.cbr-xml-daily.ru/latest.js').then(({ data }) => {
      setNewInfo([data])
    })
    // Предыдущие данные
    axios.get('https://www.cbr-xml-daily.ru/daily_json.js').then(({ data }) => {
      setInfo([data])
    })
  }, []);
  // Данные за 10.03
  React.useEffect(() => {
    axios.get('https://www.cbr-xml-daily.ru//archive//2022//03//10//daily_json.js').then(({ data }) => {
      setPreviousInfo([data])
    })
  }, [])

  return (
    <div className="App">
      <div className="tabble">
        {info.length !== 0 ?
           Object.entries(info).map(obj =>
            <Li obj={obj} key={Math.random()} newObj={newInfo} previousObj={previousInfo} />)
          : console.log('Идёт загрузка данных с сервера')}
      </div>
    </div>
  );
}

export default App;
