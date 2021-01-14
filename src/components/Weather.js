import React, { Component } from "react";
import "../css/styles.css";
import "../weather-icons-master/css/weather-icons.min.css";
import { url, headers } from "../private/api";
import { maps } from "../weatherToClassNames";

const swapDayAndMonth = (date) => {
  date = date.split("/");
  return date[1] + "/" + date[0] + "/" + date[2];
};
const WeatherCard = ({ info, day, time, ic }) => {
  if (info == null) return <></>;
  return (
    <div className="a-card">
      <p className="txt-top">
        {day === "Tomorrow" ? day : swapDayAndMonth(day)}
      </p>
      <div className="a-card-body">
        <div className="acb-1">
          <span
            className={"a-card-img wi " + maps[info.weather[0].main + ic]}
          ></span>
          <p className="a-main">{info.weather[0].main}</p>
          <span className="a-card-img wi wi-thermometer"></span>
          <p className="temp">{(info.main.temp - 273).toFixed(2)}&#176;C</p>
        </div>
        <div className="acb-2">
          <span className="a-card-img wi wi-humidity"></span>
          <span className="hum">{parseInt(info.main.humidity) / 100}</span>
          <span className="a-card-img wi wi-time-1"></span>
          <p className="time">{time}</p>
        </div>
      </div>
      <p className="txt-bottom">{info.weather[0].description}</p>
    </div>
  );
};
const Header = () => {
  return (
    <div className="header">
      <h2 style={{ color: "white" }}>Weather</h2>
      <div className="alfie">
        <p>
          Made by &nbsp;
          <a
            target="_blank"
            rel="noreferrer"
            className="link-to-alfie"
            href="https://tarunalfie.netlify.app"
          >
            Alfie
          </a>
        </p>
      </div>
    </div>
  );
};
const fetchData = (city) => {
  return fetch(url + city, {
    method: "GET",
    headers: headers,
  })
    .then((response) => {
      return response.json();
    })
    .then((res) => {
      res = res.list;
      return [res[0], res[7], res[15], res[23], res[31], res[9]];
    })
    .catch((err) => {
      console.error(err);
    });
};
const Search = (props) => {
  return (
    <div className="search">
      <input
        autoComplete="off"
        className="search-bar"
        type="text"
        name="search"
        placeholder={"Enter a city name"}
        onKeyPress={async (e) => {
          if (e.key === "Enter") {
            document.querySelector(".search-img");
            const info = await fetchData(props.city);
            props.setinfo(info);
          }
        }}
        onChange={(e) => {
          props.oninput(e.target.value);
        }}
      />
      <button
        className="search-img"
        onClick={async () => {
          const info = await fetchData(props.city);
          props.setinfo(info);
        }}
      >
        Search
      </button>
    </div>
  );
};
const PresentWeather = ({ info, ic }) => {
  if (info == null) return <></>;
  return (
    <div className="pres-">
      <div className="pres-1">
        <div className="wind-speed">
          <span className={"wi pres " + maps["Wind"]}></span>
          <p className="pres-t">Wind Speed</p>
          <p className="pres-t">{info.wind.speed} m/s</p>
        </div>
        <div className="w-main">
          <span className={"wi pres " + maps[info.weather[0].main + ic]}></span>
          <p className="pres-t">{info.weather[0].description}</p>
        </div>
      </div>
      <div className="pres-2">
        <div className="temp-2">
          <span className={"wi pres wi-thermometer"}></span>
          <div className="pres-t">Temperature</div>
          <p className="pres-t">{(info.main.temp - 273).toFixed(2)}&#176;C</p>
        </div>
        <div className="hum-2">
          <span className={"wi pres wi-humidity"}></span>
          <div className="pres-t">Humidity</div>
          <p className="pres-t">{parseInt(info.main.humidity) / 100}</p>
        </div>
      </div>
    </div>
  );
};
class Weather extends Component {
  constructor() {
    super();

    this.state = {
      city: "",
      info: [],
    };
  }

  render() {
    var date1, date2, date3, time, ic;
    date1 = new Date();
    date2 = new Date();
    date3 = new Date();
    time = new Date().toTimeString().substring(0, 5);
    var timeInt = parseInt(time[0] + time[1]);
    if (timeInt > 19 || time < 5) ic = "-2";
    else ic = "-1";
    date1.setDate(date1.getDate() + 2);
    date2.setDate(date2.getDate() + 3);
    date3.setDate(date3.getDate() + 4);

    return (
      <main>
        <Header />
        <Search
          city={this.state.city}
          oninput={(c) => this.setState({ city: c })}
          setinfo={(info) => this.setState({ info })}
        />
        <PresentWeather info={this.state.info[0]} ic={ic} />
        <div className="a-cards">
          <WeatherCard
            info={this.state.info[1]}
            day="Tomorrow"
            time={time}
            ic={ic}
          />
          <WeatherCard
            info={this.state.info[2]}
            day={date1.toLocaleDateString()}
            time={time}
            ic={ic}
          />
          <WeatherCard
            info={this.state.info[3]}
            day={date2.toLocaleDateString()}
            time={time}
            ic={ic}
          />
          <WeatherCard
            info={this.state.info[4]}
            day={date3.toLocaleDateString()}
            time={time}
            ic={ic}
          />
        </div>
      </main>
    );
  }
}

export default Weather;
