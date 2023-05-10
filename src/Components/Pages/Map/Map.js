import React, { useState, useEffect } from "react";
import InfoWindow from "react-google-maps/lib/components/InfoWindow";
import {
  GoogleMap,
  LoadScript,
  Marker,
  useJsApiLoader,
  useLoadScript,
} from "@react-google-maps/api";
import { useSelector } from "react-redux";
import axios from "axios";

const containerStyle = {
  width: "100%",
  height: "440px",
};
const center = {
  lat: 37.7749,
  lng: -122.4194,
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

  const handleMouseOver = (business) => {
    setSelectedBusiness(business);
  };

  const handleMouseOut = () => {
    setSelectedBusiness(null);
  };

  const key = "AIzaSyDrkz33Yykq4609RKZZUrSQ7NFhgJL2DWw";
  //  "AIzaSyD7KtQoq29-5TqELLdPBSQoqCD376-qGjA nikhil "

  console.log("//////////////////////////////////", props);

  const HandleShow = (item, businessDetail) => {
    console.log("mjbń", item?.item?.latitude);
    return (
      <>
        <Marker
          position={{ lat: item?.item?.latitude, lng: item?.item?.longitude }}
          icon={redMarkerIcon}
        />
        <Marker
          position={{
            lat: props?.businessDetail?.lat,
            lng: props?.businessDetail?.lng,
          }}
          icon={redMarkerIcon}
        ></Marker>

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
            // >
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
                <HandleShow businessDetail={props?.businessDetail} />
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
