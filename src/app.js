// external dependencies
const path = require("path");
const express = require("express");
const hbs = require("hbs");

// internal dependencies
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Mahesh",
    extra: true
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Mahesh"
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    helpText: "This is some helpful text.",
    title: "Help",
    name: "Mahesh"
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({ error: "You must provide an address" });
  }
  const address = req.query.address;
  geocode(address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({ error });
    }

    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({ error });
      }

      res.send({
        forecast: forecastData,
        location: location,
        address: req.query.address
      });
    });
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Mahesh",
    errorMessage: "Help article not found."
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Mahesh",
    errorMessage: "Page not found."
  });
});

app.listen(port, () => {
  console.log("Server is up on port 3000.");
});
