import React from "react";
import { useNavigate } from "react-router-dom";

// Icons
import { loadingIcon } from "helper/icons";

// Material UI
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const WeatherCard = ({ weather, withLink = false, index = 0 }) => {
  const navigate = useNavigate();

  return (
    <Card sx={{ width: "100%" }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Today's Weather
        </Typography>
        <Typography variant="h5" component="div">
          {weather ? `${weather.list[index].main.temp} °C` : loadingIcon()}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {weather
            ? `${weather.city.name}, ${weather.city.country}`
            : loadingIcon()}
        </Typography>
        <Typography variant="body2">
          Date:{" "}
          <strong>
            {weather
              ? new Date(weather.list[index].dt_txt).toLocaleDateString()
              : loadingIcon()}
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
