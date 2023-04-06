import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Material UI
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const WeatherCard = ({ withLink = false, index = 0 }) => {
  const API_KEY = "2b3ea704448c739eae3a40b6bb855225";

  const navigate = useNavigate();

  const [weather, setWeather] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [latitude, setLatitude] = useState(null);

  const getCurrentWeather = async (lat, lon) => {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
    );
    setWeather(response.data);
  };

  const getLatLon = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        setLatitude(lat);
        setLongitude(lon);
      });
    }
  };

  useEffect(() => {
    getLatLon();
  }, []);

  useEffect(() => {
    if (latitude && longitude) {
      getCurrentWeather(latitude, longitude);
    }
  }, [latitude, longitude]);

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Today's Weather
        </Typography>
        <Typography variant="h5" component="div">
          {weather && weather.list[index].main.temp} °C
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {weather && weather.city.name}, {weather && weather.city.country}
        </Typography>
        <Typography variant="body2">
          Date:{" "}
          <strong>
            {weather &&
              new Date(weather.list[index].dt_txt).toLocaleDateString()}
          </strong>
        </Typography>
      </CardContent>
      {withLink && (
        <CardActions>
          <Button size="small" onClick={() => navigate("/weather")}>
            Learn More
          </Button>
        </CardActions>
      )}
    </Card>
  );
};

export default WeatherCard;
