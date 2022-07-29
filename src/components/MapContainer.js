import React, { useMemo, useState, useEffect, useRef} from "react";
import { GoogleMap, useLoadScript, Marker, InfoWindow} from "@react-google-maps/api";
import TextField from "@mui/material/TextField";
import './MapContainer.css';
import axios from 'axios';
import {Button} from './Button';

export default function MapContainer() {
  const [earthquakeData, setEartquakeData] = useState([]);
  const [geocodingData, setGeocodingData] = useState([]);
  const [inputText, setInputText] = useState("");
  const [center, setCenter] = useState({ lat: 39.82, lng: -46 });
  const [selectedElement, setSelectedElement] = useState(null);
  const [activeMarker, setActiveMarker] = useState(null);
  const [showInfoWindow, setInfoWindowFlag] = useState(true);
  const prevMarkersRef = useRef([]);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });

  let inputHandler = (e) => {
    var lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };

  let searchCity = () => {
      console.log("uno");
      console.log(inputText);
      var name = inputText;
      fetchGeocodingData(name);

  }

  const fetchGeocodingData = async (name) => {
    const {data} = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${name}&key=AIzaSyA1dIo_wiTARr5TT3v22UhyOIpM2aytBVc`);
    console.log(data.results[0]);
    setGeocodingData(data.results);
    console.log(data);

    setCenter(data.results.location);

    if(data.results.length > 0){
      fetchData(data.results);  
      postCity(data.results[0], name);
    }else{
      alert('City not found');
      var tempCity = {"name": name, "geometry": {"location": {"lat": "NaN", "lng": "NaN"}}};
      postCity(tempCity, name);
    }
   
  };

  const postCity = async (data, name) => {

    const city = {
      name: name,
      latitude: data.geometry.location.lat,
      longitude: data.geometry.location.lng
    };

    axios.post(`https://earthquake-search-api.herokuapp.com/location`, { city })
      .then(res => {
        console.log(res);
        console.log(res.data);
      })

  };

  const checkEartquakeData = (data) => {
      if(data.length == 0){
        alert('No earthquakes were found');
      }else{
        alert('Now you can see on the map the details of the earthquakes');
      }
  };

  const fetchData = async (geocodingData) => {
    var north = geocodingData[0].geometry.viewport.northeast.lat;
    var south = geocodingData[0].geometry.viewport.southwest.lat;
    var east = geocodingData[0].geometry.viewport.northeast.lng;
    var west = geocodingData[0].geometry.viewport.southwest.lng;
    const {data} = await axios.get(`http://api.geonames.org/earthquakesJSON?north=${north}&south=${south}&east=${east}&west=${west}&username=aralimata`);
    console.log(data.earthquakes);
    checkEartquakeData(data.earthquakes); 
    setEartquakeData(data.earthquakes);
  };

  if (!isLoaded) return <div>Loading...</div>;

  return (
  <>
  <div className="main">
  <h1 className="heading dark"> Welcome to Earthquake Search</h1>
  <p className="home__hero-subtitle dark">You can start your search for earthquakes</p>
  <div className="parent">
  <div className="child"><TextField
          id="outlined-basic"
          variant="outlined"
          onChange={inputHandler}
          fullWidth
          label="Search"
          className="input-field"
        /></div>
        <div className="child"><Button buttonSize='btn--wide' buttonColor='blue'  onClick={searchCity}>Buscar</Button></div>
  </div>
  
  <GoogleMap
    zoom={2}
    center={center}
    mapContainerClassName="map-container"
    >
    {earthquakeData.filter((element, index) => index <= 10).map((element, index) => {
          return (
          <Marker
              key={index}
              title={element.datetime}
              position={{
                lat: element.lat,
                lng: element.lng
              }}
              onClick={(props, marker) => {
                setSelectedElement(element);
                setActiveMarker(marker);
              }}
            />
          );
        })}
        {selectedElement ? (
          <InfoWindow
            visible={showInfoWindow}
            marker={activeMarker}
            position={{
              lat: selectedElement.lat,
              lng: selectedElement.lng
            }}
            onCloseClick={() => {
              setSelectedElement(null);
            }}
          >
            <div>
              <h1>Date: {selectedElement.datetime}</h1>
              <p><span className="bold">Magnitude: </span>{selectedElement.magnitude}</p>
              <p><span className="bold">Depth: </span>{selectedElement.depth}</p>
              <p><span className="bold">Latitude: </span>{selectedElement.lat}</p>
              <p><span className="bold">Longitude: </span>{selectedElement.lng}</p>
            </div>
          </InfoWindow>
        ) : null}

  </GoogleMap>
 
  </div>
  </>);
}

/*function Map() {
  const center = useMemo(() => ({ lat: 44, lng: -80 }), []);
  const [selectedElement, setSelectedElement] = useState(null);
  const [activeMarker, setActiveMarker] = useState(null);
  const [showInfoWindow, setInfoWindowFlag] = useState(true);
  
  const earthquakesData = [{"datetime":"2015-04-25 06:13:40","depth":15,"lng":84.6493,"src":"us","eqid":"us20002926","magnitude":7.9,"lat":28.1306},{"datetime":"2013-04-16 08:44:20","depth":82,"lng":62.0532,"src":"us","eqid":"b000g7x7","magnitude":7.8,"lat":28.1069},{"datetime":"2015-05-30 11:36:00","depth":677.56,"lng":140.4932,"src":"us","eqid":"us20002ki3","magnitude":7.8,"lat":27.8312},{"datetime":"2010-12-21 16:19:41","depth":14.9,"lng":143.7392,"src":"us","eqid":"c0000rxc","magnitude":7.4,"lat":26.8656},{"datetime":"2015-05-12 07:15:00","depth":18.47,"lng":86.1535,"src":"us","eqid":"us20002ejl","magnitude":7.4,"lat":27.8428},{"datetime":"2011-01-18 19:23:26","depth":84,"lng":63.9473,"src":"us","eqid":"2011ggbx","magnitude":7.2,"lat":28.8382},{"datetime":"2010-02-26 19:31:27","depth":22,"lng":128.4172,"src":"us","eqid":"2010teb2","magnitude":7,"lat":25.9025},{"datetime":"2009-10-30 06:03:39","depth":35,"lng":129.9025,"src":"us","eqid":"2009njal","magnitude":6.9,"lat":29.1544},{"datetime":"2011-09-18 10:40:48","depth":19.7,"lng":88.064,"src":"us","eqid":"c0005wg6","magnitude":6.9,"lat":27.723},{"datetime":"2009-08-03 15:59:59","depth":10,"lng":-112.8135,"src":"us","eqid":"2009jwbh","magnitude":6.9,"lat":29.3722}]

  return (<GoogleMap
    zoom={10}
    center={center}
    mapContainerClassName="map-container"
    >
    {earthquakesData.map((element, index) => {
          return (
            <Marker
              key={index}
              title={element.datetime}
              position={{
                lat: element.lat,
                lng: element.lng
              }}
              onClick={(props, marker) => {
                setSelectedElement(element);
                setActiveMarker(marker);
              }}
            />
          );
        })}
        {selectedElement ? (
          <InfoWindow
            visible={showInfoWindow}
            marker={activeMarker}
            position={{
              lat: selectedElement.lat,
              lng: selectedElement.lng
            }}
            onCloseClick={() => {
              setSelectedElement(null);
            }}
          >
            <div>
              <h1>Date: {selectedElement.datetime}</h1>
              <p><span className="bold">Magnitude: </span>{selectedElement.magnitude}</p>
              <p><span className="bold">Depth: </span>{selectedElement.depth}</p>
              <p><span className="bold">Latitude: </span>{selectedElement.lat}</p>
              <p><span className="bold">Longitude: </span>{selectedElement.lng}</p>
            </div>
          </InfoWindow>
        ) : null}

  </GoogleMap>
  );
}
*/

