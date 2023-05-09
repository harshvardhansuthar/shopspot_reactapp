import React, { useEffect, useState } from "react";
import {
  GetData,
  GetDataWithToken,
  PostDataWithToken,
} from "../../../ApiHelper/ApiHelper";
import { useForm } from "react-hook-form";
import Map from "../Map/Map"

export default function ProfileForm(props) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loction, setLoction] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(true);
 

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onBlur" });

  useEffect(()=>{
    reset({
      name: props?.userData?.name,
      email: props?.userData?.email,
      phone: props?.userData?.phone,
      address: props?.userData?.full_address,
      city_name: props?.userData?.city,
      post_code: props?.userData?.post_code,
      country_name: props?.userData?.country,
    });
  },[props])

 
  // useEffect(() => {
  //   GetDataWithToken("auth/my-profile").then((res) => {
  //     console.log(res);
  //     setUserData(res.data);
  //     let data = res.data;
  //     reset({
  //       name: data?.name,
  //       email: data?.email,
  //       phone: data?.phone,
  //       address: data?.full_address,
  //       city_name: data?.city,
  //       post_code: data?.post_code,
  //       country_name: data.country,
  //     });
  //   });
  // }, []);

  // https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${text}&key=${googleKey}

  useEffect(() => {
    const fetchSuggestions = async () => {
      await GetData(`auto-suggestions?text=${query}`).then((response) => {
        setSuggestions(response?.data);
      });
    };
    if (query?.length > 0) {
      fetchSuggestions();
    } else {
      setSuggestions([]);
    }
  }, [query]);

  const handleEditProfile = (data) => {
    let allData = {
      ...data,address: query,
    };
    PostDataWithToken("auth/edit-profile", allData).then((res) => {
      console.log(res);
    });
  };

  const handlePlaceSelect = () => {
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address: query }, (results, status) => {
      if (status === "OK") {
        const location = {
          latitude: results[0].geometry.location.lat(),
          longitude: results[0].geometry.location.lng(),
        };
        setLoction(location);
      }
    });
  };

  const handleGetLatLng = (e) => {
    setQuery(e);
    handlePlaceSelect();
  };

  return (
    <>
      <form onSubmit={handleSubmit(handleEditProfile)}>
        {/* <!--Basic Information--> */}
        <div className="panel panel-default">
          <div className="panel-heading wt-panel-heading p-a20">
            <h4 className="panel-tittle m-a0">Profile</h4>
          </div>
          <div className="panel-body wt-panel-body p-a20 m-b30">
            <div className="row">
              <div className="col-xl-6 col-lg-6 col-md-12">
                <div className="form-group">
                  <label>Name</label>
                  <div className="ls-inputicon-box">
                    <input
                      className="form-control"
                      name="company_name"
                      type="text"
                      placeholder="Devid Smith"
                      {...register("name", {
                        required: "Name is required",
                        pattern: {
                          value: /^[a-zA-Z ]{2,30}$/,
                          message: "Please enter a valid  name",
                        },
                      })}
                    />
                    {errors.name && errors.name.message && (
                      <p
                        className="f-error m-0"
                        style={{ color: "red", fontSize: 15 }}
                      >
                        <i className="fa-regular fa-circle-xmark" />
                        {errors.name && errors.name.message}
                      </p>
                    )}
                    <i className="fs-input-icon fa fa-building"></i>
                  </div>
                </div>
              </div>

              <div className="col-xl-6 col-lg-6 col-md-12">
                <div className="form-group">
                  <label>Email Address</label>
                  <div className="ls-inputicon-box">
                    <input
                      className="form-control"
                      name="company_Email"
                      type="email"
                      placeholder="Devid@example.com"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: "Incorrect Email format",
                        },
                      })}
                    />
                    {errors.email && errors.email.message && (
                      <p
                        className="f-error m-0"
                        style={{ color: "red", fontSize: 15 }}
                      >
                        <i className="fa-regular fa-circle-xmark" />
                        {errors.email && errors.email.message}
                      </p>
                    )}
                    <i className="fs-input-icon fas fa-at"></i>
                  </div>
                </div>
              </div>

              <div className="col-xl-6 col-lg-6 col-md-12">
                <div className="form-group">
                  <label>Phone</label>
                  <div className="ls-inputicon-box">
                    <input
                      className="form-control"
                      name="company_phone"
                      type="text"
                      placeholder="(251) 1234-456-7890"
                      {...register("phone", {
                        required: "phone number is required",
                      })}
                    />
                    {errors.phone && errors.phone.message && (
                      <p
                        className="f-error m-0"
                        style={{ color: "red", fontSize: 15 }}
                      >
                        <i className="fa-regular fa-circle-xmark" />
                        {errors.phone && errors.phone.message}
                      </p>
                    )}
                    <i className="fs-input-icon fa fa-phone-alt"></i>
                  </div>
                </div>
              </div>

              <div className="col-xl-6 col-lg-6 col-md-12">
                <div className="form-group city-outer-bx has-feedback">
                  <label>Country</label>
                  <div className="ls-inputicon-box">
                    <input
                      className="form-control"
                      name="company_since"
                      type="text"
                      placeholder="USA"
                      {...register("country_name", {})}
                    />
                    {errors.country_name && errors.country_name.message && (
                      <p
                        className="f-error m-0"
                        style={{ color: "red", fontSize: 15 }}
                      >
                        <i className="fa-regular fa-circle-xmark" />
                        {errors.country_name && errors.country_name.message}
                      </p>
                    )}
                    <i className="fs-input-icon fa fa-globe-americas"></i>
                  </div>
                </div>
              </div>

              <div className="col-xl-6 col-lg-6 col-md-12">
                <div className="form-group city-outer-bx has-feedback">
                  <label>City</label>
                  <div className="ls-inputicon-box">
                    <input
                      className="form-control"
                      name="company_since"
                      type="text"
                      placeholder="Texas"
                      {...register("city_name", {})}
                    />
                    {errors.city_name && errors.city_name.message && (
                      <p
                        className="f-error m-0"
                        style={{ color: "red", fontSize: 15 }}
                      >
                        <i className="fa-regular fa-circle-xmark" />
                        {errors.city_name && errors.city_name.message}
                      </p>
                    )}
                    <i className="fs-input-icon fa fa-globe-americas"></i>
                  </div>
                </div>
              </div>

              <div className="col-xl-6 col-lg-12 col-md-12">
                <div className="form-group city-outer-bx has-feedback">
                  <label>Postcode</label>
                  <div className="ls-inputicon-box">
                    <input
                      className="form-control"
                      name="company_since"
                      type="text"
                      placeholder="75462"
                      {...register("post_code", {})}
                    />
                    {errors.post_code && errors.post_code.message && (
                      <p
                        className="f-error m-0"
                        style={{ color: "red", fontSize: 15 }}
                      >
                        <i className="fa-regular fa-circle-xmark" />
                        {errors.post_code && errors.post_code.message}
                      </p>
                    )}
                    <i className="fs-input-icon fas fa-map-pin"></i>
                  </div>
                </div>
              </div>

              <div className="col-xl-12 col-lg-12 col-md-12">
                <div className="form-group city-outer-bx has-feedback">
                  <label>Full Address</label>
                  <div className="ls-inputicon-box">
                    <input
                      className="form-control"
                      name="company_since"
                      type="text"
                      value={query}
                      placeholder="Loaction"
                      onChange={ async (e) => await setQuery(e.target.value)}
                      // {...register("address", {
                      // })}
                    />
                    {suggestions &&
                      suggestions?.length > 0 &&
                      suggestions?.map((item, key) => (
                        <div
                          className={
                            showSuggestions ?  "ls-inputicon-box" : "d-none"
                          }
                          key={key}
                          onClick={() => {
                            handleGetLatLng(item);
                            setShowSuggestions(false);
                          }}
                        >
                          {item}
                        </div>
                      ))}
                    {errors.address && errors.address.message && (
                      <p
                        className="f-error m-0"
                        style={{ color: "red", fontSize: 15 }}
                      >
                        <i className="fa-regular fa-circle-xmark" />
                        {errors.address && errors.address.message}
                      </p>
                    )}
                    <i className="fs-input-icon fas fa-map-marker-alt"></i>
                  </div>
                </div>
              </div>

              <div className="col-xl-12 col-lg-12 col-md-12">
                <div className="twm-s-map mb-5">
                  <h4 className="section-head-small mb-4">Location</h4>
                  <div className="twm-s-map-iframe">
                    {/* <iframe
                      height="270"
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3304.8534521658976!2d-118.2533646842856!3d34.073270780600225!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2c6fd9829c6f3%3A0x6ecd11bcf4b0c23a!2s1363%20Sunset%20Blvd%2C%20Los%20Angeles%2C%20CA%2090026%2C%20USA!5e0!3m2!1sen!2sin!4v1620815366832!5m2!1sen!2sin"
                    ></iframe> */}
                    <Map userLocation={{lat:props?.userData?.latitude,lng:props?.userData?.longitude}} />
                  </div>
                </div>
              </div>

              <div className="col-lg-12 col-md-12">
                <div className="text-left">
                  <button type="submit" className="site-button">
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
