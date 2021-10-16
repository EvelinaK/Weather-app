import React, { useEffect, useState, useRef, useContext } from "react";
import { useSelector } from 'react-redux';
import * as citiesSelectors from '../../redux/cities/city-selectors';
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import '../WeatherMap/WeatherMap';
import './WeatherMap.scss';
import "./leaf-map.js";
// OWM leaflet map component with rain, cloud and precipitation Forecast
const WEATHER_API_KEY = '7c3d3ca22aedc91e6c47fc43aecca7bb';

function ForecastMap() {
  const [leafletMap, setLeafletMap] = useState(null);
  const mapRef = useRef(null);
 
  const location = useSelector(citiesSelectors.getLocation);

  useEffect(() => {

    if ((location !== undefined)) {
    const osm = L.tileLayer(
      "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      {
        maxZoom: 18,
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors</a>',
      }
    );
    const clouds = L.OWM.clouds({
      showLegend: false,
      opacity: 0.5,
      appId: WEATHER_API_KEY,
    });
    const rain = L.OWM.rainClassic({ appId: WEATHER_API_KEY });
    const wind = L.OWM.wind({ appId: WEATHER_API_KEY });
    const city = L.OWM.current({ intervall: 60, appId: WEATHER_API_KEY });
    
    const container = L.DomUtil.get("map");
    if(container != null){
      container._leaflet_id = null;
    }

    const map = L.map("map", { layers: [osm] });
    const overlayMaps = {
      City: city,
      Clouds: clouds,
      Rain: rain,
      "Wind speed": wind,
    };
    const baseMaps = { "OSM Standard": osm };
    L.control.layers(baseMaps, overlayMaps).addTo(map);
    setLeafletMap(map);
}
  }, [location]);

  useEffect(() => {

    if (location !== undefined &&
        location !== null &&
        leafletMap !== null
    ) {
        leafletMap.setView(
            [location.lat, location.lon],
            10
        );
    }
  }, [location, leafletMap]);

  return <div ref={mapRef} id="map" className="p-2"></div>;
}

export default ForecastMap;
