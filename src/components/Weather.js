import { useState } from "react";
import "../css/styles.css";
const WeatherCard = () => {
  return (
    <div className="a-card">
      <div className="a-card-body">
        <div className="a-card-image"></div>
        <div className="a-card-text">
          Go and play cricket outsite cause its sunny
        </div>
      </div>
    </div>
  );
};
const Header = () => {
  return (
    <div className="header">
      <h2 style={{ color: "white" }}>Weather</h2>
    </div>
  );
};
const Search = (props) => {
  return (
    <div className="search">
      <input
        autoComplete="off"
        className="search-bar"
        type="text"
        name="search"
        onChange={(e) => props.oninput(e.target.value)}
      />
      <button className="search-img" onClick={() => console.log(props.city)}>
        Search
      </button>
    </div>
  );
};
const Weather = () => {
  const [city, setCity] = useState("");

  return (
    <main>
      <Search city={city} oninput={(c) => setCity(c)} />
      <Header />
      <WeatherCard />
    </main>
  );
};

export default Weather;
