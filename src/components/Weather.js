import React, { Component } from "react";
import { useState } from "react";
import "../css/styles.css";
import "../weather-icons-master/css/weather-icons.min.css";
import { url, headers } from "../private/api";
const WeatherCard = ({ info }) => {
  if (info == null) return <></>;
  return (
    <div className="a-card">
      <div className="card-header">
        <span className="a-card-img "></span>
        <span>{info.weather[0].main}</span>
      </div>
      <div className="a-card-body">
        <span className="a-card-img wi wi-thermometer"></span>
        <span className="temp">{(info.main.temp - 273).toFixed(2)}</span>
        <div className="a-card-text"></div>
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
  const fetchData = () => {
    fetch(url + props.city, {
      method: "GET",
      headers: headers,
    })
      .then((response) => {
        return response.json();
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="search">
      <input
        autoComplete="off"
        className="search-bar"
        type="text"
        name="search"
        placeholder={props.city}
        onChange={(e) => props.oninput(e.target.value)}
      />
      <button className="search-img" onClick={() => fetchData()}>
        Search
      </button>
    </div>
  );
};
const PresentWeather = () => {
  return (
    <>
      <h1>HELLO WEATHER APP</h1>
      <i
        style={{ transform: "scale(6)", color: "white" }}
        className="wi wi-owm-200"
      ></i>
      <h1>HELLO WEATHER APP</h1>
    </>
  );
};
class Weather extends Component {
  constructor() {
    super();

    this.state = {
      city: "Nizamabad",
      info: [],
    };
  }

  render() {
    return (
      <main>
        <Header />
        <Search
          city={this.state.city}
          oninput={(c) => this.setState({ city: c })}
          setinfo={(info) => this.setState({ info })}
        />
        <PresentWeather />
        <div className="a-cards">
          <WeatherCard info={this.state.info[0]} />
          <WeatherCard info={this.state.info[1]} />
          <WeatherCard info={this.state.info[2]} />
          <WeatherCard info={this.state.info[3]} />
        </div>
      </main>
    );
  }

  componentDidMount() {
    this.setState({
      info: [
        {
          dt: 1607504400,
          main: {
            temp: 301.93,
            feels_like: 300,
            temp_min: 301.93,
            temp_max: 303.04,
            pressure: 1014,
            sea_level: 1014,
            grnd_level: 970,
            humidity: 31,
            temp_kf: -1.11,
          },
          weather: [
            {
              id: 800,
              main: "Clear",
              description: "clear sky",
              icon: "01d",
            },
          ],
          clouds: { all: 0 },
          wind: { speed: 2.8, deg: 81 },
          visibility: 10000,
          pop: 0,
          sys: { pod: "d" },
          dt_txt: "2020-12-09 09:00:00",
        },
        {
          dt: 1607515200,
          main: {
            temp: 298.43,
            feels_like: 296.71,
            temp_min: 297.75,
            temp_max: 298.43,
            pressure: 1013,
            sea_level: 1013,
            grnd_level: 969,
            humidity: 40,
            temp_kf: 0.68,
          },
          weather: [
            {
              id: 800,
              main: "Clear",
              description: "clear sky",
              icon: "01d",
            },
          ],
          clouds: { all: 0 },
          wind: { speed: 2.8, deg: 64 },
          visibility: 10000,
          pop: 0,
          sys: { pod: "d" },
          dt_txt: "2020-12-09 12:00:00",
        },
        {
          dt: 1607526000,
          main: {
            temp: 294.64,
            feels_like: 292.66,
            temp_min: 294.21,
            temp_max: 294.64,
            pressure: 1014,
            sea_level: 1014,
            grnd_level: 971,
            humidity: 46,
            temp_kf: 0.43,
          },
          weather: [
            {
              id: 801,
              main: "Clouds",
              description: "few clouds",
              icon: "02n",
            },
          ],
          clouds: { all: 24 },
          wind: { speed: 2.66, deg: 105 },
          visibility: 10000,
          pop: 0,
          sys: { pod: "n" },
          dt_txt: "2020-12-09 15:00:00",
        },
        {
          dt: 1607536800,
          main: {
            temp: 292.29,
            feels_like: 290.97,
            temp_min: 292.22,
            temp_max: 292.29,
            pressure: 1014,
            sea_level: 1014,
            grnd_level: 971,
            humidity: 54,
            temp_kf: 0.07,
          },
          weather: [
            {
              id: 801,
              main: "Clouds",
              description: "few clouds",
              icon: "02n",
            },
          ],
          clouds: { all: 13 },
          wind: { speed: 1.8, deg: 129 },
          visibility: 10000,
          pop: 0,
          sys: { pod: "n" },
          dt_txt: "2020-12-09 18:00:00",
        },
      ],
    });
  }
}

export default Weather;
