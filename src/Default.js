import React, { Component } from 'react';
import auth0Client from './Auth';
import $ from 'jquery';
import { saveAs } from 'file-saver';

class Default extends Component {

  constructor(props) {
    super(props);
  }


  acquireUserInfo(mapObject, startLat, startLong, endLat, endLong) {
    var username = document.getElementById('userdisplay').textContent;
    $.ajax({
      type: "POST",
      url: "http://localhost:3001/retrieve",
      data: ({ user: username }),
      success: function (data) {
        // Display the routes!

        var temperament = data.temperament;
        var transmission = data.transmission;
        var vehicle = data.vehicle;
        var preference = data.preference;
        var traffic = data.traffic;
        var toll = data.toll;
        var thrill = data.thrill;
        var fuel = data.fuel;

        var avoidToll = "";
        var avoidUnpaved = "";
        var avoidMotorways = "";
        var factor = 0;
        var minDeviation = 0;
        var routeType = "";
        var winding = "";
        var travelMode = "car";

        switch (temperament) {
          case "aggressive":
            factor -= 1;
            break;
          case "neutral":
            break;
          case "defensive":
            factor += 1;
            break;
        }
        switch (transmission) {
          case "automatic":
            break;
          case "manual":
            factor += 1;
            break;
        }
        switch (vehicle) {
          case "sedan":
            break;
          case "rwd":
            break;
          case "fwd":
            break;
          case "awd":
            break;
          case "offroad":
            break;
          case "suv":
            break;
          case "hybrid":
            break;
          case "electric":
            break;
          case "motorcycle":
            travelMode = "motorcycle";
            break;
        }
        switch (preference) {
          case "fastest":
            routeType = "fastest";
            break;
          case "shortest":
            routeType = "shortest";
            break;
        }
        switch (traffic) {
          case "yes":
            factor += 1;
            break;
          case "maybe":
            minDeviation = 900;
            break;
          case "no":
            factor -= 1;
            break;
        }
        switch (toll) {
          case "yes":
            break;
          case "no":
            avoidToll = "tollRoads";
            break;
        }
        switch (thrill) {
          case "speed":
            routeType = "thrilling";
            winding = "high";
            avoidMotorways = "motorways";
            factor += 1;
            break;
          case "sortof":
            routeType = "thrilling";
            winding = "low";
            break;
          case "no":
            factor -= 1;
            break;
        }
        switch (fuel) {
          case "yes":
            travelMode = "eco";
            avoidUnpaved = "unpavedRoads";
            break;
          case "kindof":
            if (travelMode === "") {
              travelMode = "eco";
            }
            break;
          case "no":
            break;
        }
        
        var routing = window.tomtom.routing({
          locations: `${startLat},${startLong}:${endLat},${endLong}`,
          maxAlternatives: 5,
          computeTravelTimeFor: "all",
          instructionsType: "text",
          travelMode: travelMode
        });

        if (avoidToll !== "") {
          routing.avoid(`${avoidToll}`);
        }
        if (avoidMotorways !== "") {
          routing.avoid(`${avoidMotorways}`);
        }
        if (avoidUnpaved !== "") {
          routing.avoid(`${avoidUnpaved}`);
        }
        if (routeType !== "") {
          routing.routeType(`${routeType}`);
        }
        if (winding !== "") {
          routing.windingness(`${winding}`);
        }
        if (minDeviation !== 0) {
          routing.minDeviationTime(900);
        }

        var colors = ['#FF2052', '#FFBF00', '#FFF600', '#66FF00', '#0000FF'];
        
        try {
          routing.go().then(function (routeJson) {
            var numRoutes = routeJson.features.length;
            var routeObjects = [];
            var instructions = [];
            for (var i = 0; i < numRoutes; i++) {
              instructions[i] = [];
              // Frustration calculation
              var lengthInMeters = routeJson.features[i].properties.summary.lengthInMeters;
              var timeInSeconds = routeJson.features[i].properties.summary.travelTimeInSeconds;
              //var arrivalTime = routeJson.features[i].properties.summary.arrivalTime;
              var trafficDelay = timeInSeconds - routeJson.features[i].properties.summary.noTrafficTravelTimeInSeconds;
              for (var j = 0; j < routeJson.features[i].properties.guidance.instructionGroups.length; j++) {
                instructions[i][j] = routeJson.features[i].properties.guidance.instructionGroups[j].groupMessage;
              }

              var FI = 1;

              if (factor === 0) {
                factor = 1;
              }

              if (trafficDelay !== 0) {
                factor = Math.abs(factor);
                var delayRatio = (trafficDelay / timeInSeconds) * factor;
                if (delayRatio >= 0.1) {
                  delayRatio *= factor;
                }
                else if (delayRatio <= 0.05) {
                  delayRatio *= 15;
                }
                if (delayRatio > 3) {
                  delayRatio = 3
                }
                // needs a variable between 0 and 3, no higher.
                FI = Math.pow((delayRatio - 3), 2)
                FI = -FI + 10
                FI = Math.round(FI * 100) / 100;
              }

              var routeColor = '';
              if (FI >= 1 && FI <= 2) {
                routeColor = colors[4];
              }
              if (FI > 2 && FI <= 3) {
                routeColor = colors[3];
              }
              if (FI > 3 && FI <= 5) {
                routeColor = colors[2];
              }
              if (FI > 5 && FI <= 8) {
                routeColor = colors[1];
              }
              if (FI > 8) {
                routeColor = colors[0];
              }


              var fullTime = new Date(null);
              fullTime.setSeconds(timeInSeconds);
              var timeString = fullTime.toISOString().substr(11,8);

              var lengthInMiles = Math.round(lengthInMeters * 0.000621371192 * 100) / 100;

              var routeToDownload = 0;
              var htmlContent = "<b>Frustration Level: " + 
              FI + "</b><br><b>Travel Time: " + 
              timeString + "</b><br><b>Trip Length: " + 
              lengthInMiles + " mi.</b><br>" +
              '<a href="#" class="speciallink">Download Directions!</a>';

              var route = window.tomtom.L.geoJson(routeJson.features[i], {
                style: { color: routeColor, opacity: 0.3, weight: 20, lineCap: 'round' }
              }).bindPopup(htmlContent);
              route.addTo(mapObject);
              routeObjects.push(route);
            }

            function setOpacity(e) {
              e.target.setStyle({opacity: 1});
              for (var j = 0; j < routeObjects.length; j++) {
                if (routeObjects[j] !== e.target) {
                  routeObjects[j].setStyle({opacity: 0.3});
                }
                else {
                  routeToDownload = j;
                }
              }
            }

            for (i = 0; i < routeObjects.length; i++) {
              var tempRoute = routeObjects[i];
              tempRoute.on('click', setOpacity);
            }
            mapObject.fitBounds(route.getBounds(), { padding: [5, 5] });
            mapObject.on('popupopen', function() {
              $('.speciallink').click(function() {
                var directions = instructions[routeToDownload].toString();
                var blob = new Blob([directions], { type: "text/plain;charset=utf-8 "});
                saveAs(blob, "directions.txt");
              });
            });
          });
        } catch(err) {
          alert('Error: TomTom could not calculate route.\n Message: ' + err);
        }
      },
      error: function () {
        alert('Error: user not found in database.\n Make sure you have taken the survey before using RoadMage!');
      }
    });

  }

  componentDidMount() {
    if (document.getElementById("mapscript") == null) {
      const script = document.createElement('script');
      script.src = process.env.PUBLIC_URL + '/sdk/tomtom.min.js';
      script.id = "mapscript";
      var divForMap = document.getElementById("buildMapHere");
      divForMap.appendChild(script);
      var that = this;

      function escapeLoad(mapObject, startLat, startLong, endLat, endLong) {
        that.acquireUserInfo(mapObject, startLat, startLong, endLat, endLong);
      }

      script.async = true;
      script.onload = function () {
        if (document.getElementById("map") == undefined) {
          var page = document.getElementById("buildMapHere");
          var newMapDiv = document.createElement('div');
          newMapDiv.id = "map";
          page.appendChild(newMapDiv);
        }

        var mapObject = window.tomtom.L.map('map', {
          key: 'qD4Qs2rfJcxWNSGHAbrkO2mtUELkTTAE',
          center: [37.063706, -76.493837],
          basePath: '/sdk',
          zoom: 15
        });

        var startSearch = new window.L.SearchBox({placeholder: "Starting Location"});
        var endSearch = new window.L.SearchBox({placeholder: "Ending Destination"});
        var startLat = 0;
        var startLong = 0;
        var endLat = 0;
        var endLong = 0;
        startSearch.on(window.L.SearchBox.Events.ResultClicked, function (eventObject) {
          startLat = eventObject.data.position.lat;
          startLong = eventObject.data.position.lon;
          if (endLat != 0 && endLong != 0) {
            escapeLoad(mapObject, startLat, startLong, endLat, endLong);
          }
        });
        endSearch.on(window.L.SearchBox.Events.ResultClicked, function (eventObject) {
          endLat = eventObject.data.position.lat;
          endLong = eventObject.data.position.lon;
          escapeLoad(mapObject, startLat, startLong, endLat, endLong);
        });
        startSearch.addTo(mapObject);
        endSearch.addTo(mapObject);
      }
    }
  }

  render() {
    if (!auth0Client.isAuthenticated()) {
      auth0Client.signIn();
    }
    return (
      <div>
      </div>
    )
  }
}

export default Default;