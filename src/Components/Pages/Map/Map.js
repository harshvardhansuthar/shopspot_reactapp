import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  useJsApiLoader,
  useLoadScript,
  InfoWindow,
} from "@react-google-maps/api";
import { useSelector } from "react-redux";
import axios from "axios";

const containerStyle = {
  width: "100%",
  height: "440px",
};
const center = {
  lat: 23.377556,
  lng: 73.063889,
};
const redMarkerIcon = {
  url: "https://cdn-icons-png.flaticon.com/128/684/684908.png",
  scaledSize: { width: 30, height: 30 },
  fillOpacity: 1.0,
  strokeWeight: 0,
};

export default function Map(props) {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [showinfoIndex, setShowInfoIndex] = useState(0);
  const [showInfoWindow, setShowInfoWindow] = useState(false);

  console.log("user location", props.userLocation);
  console.log("business details", props.businessDetail);
  console.log("current location", props.currentLocation);

  const { isLoaded } = useLoadScript({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyD7KtQoq29-5TqELLdPBSQoqCD376-qGjA",
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCurrentLocation({ lat: latitude, lng: longitude });
      },
      (error) => console.error(error)
    );
  }, []);

  const userSearchLoction = {
    lat: props?.latitude?.latitude,
    lng: props?.latitude?.longitude,
  };

  const divStyle = {
    // background: `white`,
    // border: `1px solid #ccc`,
    padding: 8,
  };

  const handleMouseOver = (business) => {
    setSelectedBusiness(business);
  };

  const handleMouseOut = () => {
    setSelectedBusiness(null);
  };

  const key = "AIzaSyDrkz33Yykq4609RKZZUrSQ7NFhgJL2DWw";
  //  "AIzaSyD7KtQoq29-5TqELLdPBSQoqCD376-qGjA nikhil "

  console.log("//////////////////////////////////", props);

  const onLoad = (infoWindow) => {
    console.log("infoWindow: ", infoWindow);
  };

  const handleInfoWindow = (data) => {
    console.log(data);
    setShowInfoIndex(data);
  };

  const HandleShow = (item) => {
    // setShowInfoIndex(data);
    // // alert("");
    // // console.log("mjbń", item?.item?.latitude);
    // // console.log("cccData", item);
    return (
      <>
        <Marker
          // clickable={true}
          position={{ lat: item?.item?.latitude, lng: item?.item?.longitude }}
          icon={redMarkerIcon}
          onClick={() => handleInfoWindow(item?.item?.id)}
        >
          {item?.item && showinfoIndex && showinfoIndex === item?.item?.id && (
            <InfoWindow
              // onLoad={onLoad}
              position={{
                lat: item?.item?.latitude,
                lng: item?.item?.longitude,
              }}
            >
              <div style={divStyle}>
                <h1>{item?.item?.name}</h1>
              </div>
            </InfoWindow>
          )}
        </Marker>
        <Marker
          position={{
            lat: props?.businessDetail?.lat,
            lng: props?.businessDetail?.lng,
          }}
          onClick={handleInfoWindow}
          icon={redMarkerIcon}
        >
          {props?.businessDetail && showInfoWindow && (
            <InfoWindow
              onCloseClick={() => {}}
              onLoad={onLoad}
              visible={showInfoWindow}
              position={{
                lat: props?.businessDetail?.lat,
                lng: props?.businessDetail?.lng,
              }}
            >
              <div style={divStyle}>
                <h1>business</h1>
              </div>
            </InfoWindow>
          )}
        </Marker>

        <Marker position={props?.userLocation} icon={redMarkerIcon}></Marker>
      </>
    );
  };

  const mapLoction = () => {
    if (props.businessDetail) {
      return props.businessDetail;
    }
    if (props.userLocation) {
      return props.userLocation;
    }
    return currentLocation;
  };

  return (
    <>
      <div>
        <div>
          {isLoaded ? (
            // <iframe
            //   src={`http://maps.google.com/maps?q=${props.userLocation.latitude},${props.userLocation.logitude}&z=16&output=embed`}
            //   height="450"
            //   width="600"
            // >0
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={mapLoction()}
              zoom={2}
            >
              {props?.business?.business?.rows.length > 0 &&
                props?.business?.business?.rows?.map((item, key) => (
                  <HandleShow item={item} />
                ))}
              {/* This marker is business Detail page  */}
              {props?.businessDetail?.lat && (
                <div onClick={() => alert("jitu")}>
                  <HandleShow
                    businessDetail={props?.businessDetail}
                    onClick={() => alert("jitu")}
                  />
                </div>
              )}

              {props?.userLocation && <HandleShow />}
            </GoogleMap>
          ) : (
            // </iframe>
            <></>
          )}
        </div>
      </div>
    </>
  );
}
