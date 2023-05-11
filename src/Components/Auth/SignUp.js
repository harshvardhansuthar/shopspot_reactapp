
// import React, { useState, useEffect } from "react";
// import { Modal, ModalBody, ModalHeader } from "reactstrap";
// import { useForm } from "react-hook-form";
// import { GetData, PostData } from "../../ApiHelper/ApiHelper";
// import Cookies from "js-cookie";
// import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
// import Login from "./Login";

// export default function SignUp(props) {
//   const [modal, setModal] = useState(true);
//   const toggleModal = () => setModal(!modal);
//   const [modalLogin, setModalLogin] = useState(false);
//   const toggleModalLogin = () => setModalLogin(!modalLogin);
//   const [countryCode, setCountryCode] = useState({});
//   const [location, setLocation] = useState({ latitude: null, logitude: null });
//   const navigate = useNavigate();
//   const {
//     register,
//     watch,
//     formState: { errors },
//     handleSubmit,
//   } = useForm({ mode: "onBlur" });

//   useEffect(() => {
//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         const { latitude, longitude } = position.coords;
//         setLocation({ latitude, longitude });
//       },
//       (error) => {
//         console.error("Error getting geolocation:", error);
//       }
//     );
//     // fetch("http://0.tcp.in.ngrok.io:18544/api/v1/auth/countrys", {
//     //   method: "get",
//     //   headers: new Headers({
//     //     "ngrok-skip-browser-warning": "69420",
//     //   }),
//     // })
//     //   .then((response) => response.json())
//     //   .then((data) => setCountryCode(data.data))
//     //   .catch((err) => console.log(err));

//     GetData("auth/countrys").then((res) => setCountryCode(res.data));
//   }, []);

//   const handlerSignUp = (data) => {
//     console.log(data);
//     let signUpData = {
//       location: location,
//       ...data,
//     };
//     PostData("auth/signUp", signUpData).then((responce) => {
//       console.log(responce);
//       if (responce.status) {
//         // Cookies.set("token", responce.user.access_token);
//         navigate("/verifyotp", { state: { data: data } });
//       }
//     });
//   };
//   const toggleFunction = () => {
//     if (props?.toggle) {
//       return props.toggle();
//     }
//     if (props.toggleSignUp) {
//       return props.toggleSignUp();
//     }
//     if (props.toggleModalSignupMap) {
//       return props.toggleModalSignupMap;
//     }
//   };
//   console.log(props);
//   return (
//     <>
//       <Modal
//         Modal
//         className="modal-dialog-centered modal-lg twm-sign-up"
//         isOpen={modal}
//         toggle={() => {
//           props.toggle ? props.toggle() : props.toggleSignUp();
//         }}
//       >
//         <div class="modal-header mt-0 py-0">
//           <button
//             type="button"
//             className="btn-close"
//             onClick={() => {
//               // toggleModal();
//               props.toggle ? props.toggle() : props.toggleSignUp();
//             }}
//           ></button>
//         </div>
//         <ModalBody className="p-0">
//           <form onSubmit={handleSubmit(handlerSignUp)}>
//             <div class="row">
//               <div class="col-lg-6 col-12">
//                 <div class="login-overlay-img">
//                   <img src="./images/featured-cities/city3.jpg" alt="" />
//                 </div>
//               </div>
//               <div class="col-lg-6 col-12 ps-lg-0">
//                 <div class="twm-tabs-style-2 mt-4 p-3">
//                   <h4 class="modal-title text-center mb-3" id="OTP_popupLabel">
//                     Sign Up
//                   </h4>
//                   <p class="text-center">
//                     Sign Up and get access to all the features of Shopspot
//                   </p>
//                   <div className="row">
//                     <div className="col-lg-12">
//                       <div className="form-group mb-3">
//                         <input
//                           name="username"
//                           type="text"
//                           required=""
//                           className="form-control"
//                           placeholder="Usearname*"
//                           {...register("name", {
//                             required: "Name is required",
//                             pattern: {
//                               value: /^[a-zA-Z ]{2,30}$/,
//                               message: "Please enter a valid  name",
//                             },
//                           })}
//                         />
//                         {errors.name && errors.name.message && (
//                           <p
//                             className="f-error m-0"
//                             style={{ color: "red", fontSize: 15 }}
//                           >
//                             <i className="fa-regular fa-circle-xmark" />
//                             {errors.name && errors.name.message}
//                           </p>
//                         )}
//                       </div>
//                     </div>

//                     <div className="col-lg-6">
//                       <div className="form-group mb-3">
//                         <input
//                           name="email"
//                           type="text"
//                           className="form-control"
//                           required=""
//                           placeholder="Password*"
//                           {...register("password", {
//                             required: "password is required",
//                             minLength: {
//                               value: 6,
//                               message: "Password min length 6 Character",
//                             },
//                           })}
//                         />
//                         {errors.password && errors.password.message && (
//                           <p
//                             className="f-error m-0"
//                             style={{ color: "red", fontSize: 15 }}
//                           >
//                             <i className="fa-regular fa-circle-xmark" />
//                             {errors.password && errors.password.message}
//                           </p>
//                         )}
//                       </div>
//                     </div>

//                     <div className="col-lg-6">
//                       <div className="form-group mb-3">
//                         <input
//                           name="phone"
//                           type="text"
//                           className="form-control"
//                           required=""
//                           placeholder="Email*"
//                           {...register("email", {
//                             required: "Email is required",
//                             pattern: {
//                               value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
//                               message: "Incorrect Email format",
//                             },
//                           })}
//                         />
//                         {errors.email && errors.email.message && (
//                           <p
//                             className="f-error m-0"
//                             style={{ color: "red", fontSize: 15 }}
//                           >
//                             <i className="fa-regular fa-circle-xmark" />
//                             {errors.email && errors.email.message}
//                           </p>
//                         )}
//                       </div>
//                     </div>

//                     <div className="col-lg-6">
//                       <div className="input-group mb-3">
//                         <span
//                           className="input-group-text p-0 border-0"
//                           id="basic-addon1"
//                         >
//                           <select
//                             className="form-control"
//                             {...register("country_code", {
//                               required: "country_code is required",
//                             })}
//                           >
//                             {errors.country_code &&
//                               errors.country_code.message && (
//                                 <p
//                                   className="f-error m-0"
//                                   style={{ color: "red", fontSize: 15 }}
//                                 >
//                                   <i className="fa-regular fa-circle-xmark" />
//                                   {errors.country_code &&
//                                     errors.country_code.message}
//                                 </p>
//                               )}
//                             <option selected disabled value="">
//                               +913
//                             </option>
//                             {countryCode &&
//                               countryCode.length > 0 &&
//                               countryCode.map((item, key) => (
//                                 <option key={key} value={"+" + item.phonecode}>
//                                   {` ${"+" + item.phonecode}`}
//                                 </option>
//                               ))}
//                           </select>
//                         </span>
//                         <input
//                           name="phone"
//                           type="text"
//                           className="form-control"
//                           required=""
//                           placeholder="Phone*"
//                           {...register("phone", {
//                             required: "phone number is required",
//                           })}
//                         />
//                         {errors.phone && errors.phone.message && (
//                           <p
//                             className="f-error m-0"
//                             style={{ color: "red", fontSize: 15 }}
//                           >
//                             <i className="fa-regular fa-circle-xmark" />
//                             {errors.phone && errors.phone.message}
//                           </p>
//                         )}
//                       </div>
//                     </div>

//                     <div className="col-lg-6">
//                       <div className="form-group mb-3">
//                         <input
//                           name="date"
//                           type="date"
//                           className="form-control"
//                           required=""
//                           placeholder="Date"
//                           max={new Date().toISOString().split("T")[0]}
//                           {...register("dob", {
//                             required: "This field is required", // Add validation rule(s) here
//                           })}
//                         />
//                         {errors.dob && errors.dob.message && (
//                           <p
//                             className="f-error m-0"
//                             style={{ color: "red", fontSize: 15 }}
//                           >
//                             <i className="fa-regular fa-circle-xmark" />
//                             {errors.dob && errors.dob.message}
//                           </p>
//                         )}
//                       </div>
//                     </div>

//                     <div className="col-lg-6">
//                       <div className="form-group mb-3">
//                         <input
//                           name="CPR"
//                           type="text"
//                           className="form-control"
//                           required=""
//                           placeholder="CPR Number"
//                           {...register("cpr", {
//                             required: "CPR number is required",
//                           })}
//                         />
//                         {errors.cpr && errors.cpr.message && (
//                           <p
//                             className="f-error m-0"
//                             style={{ color: "red", fontSize: 15 }}
//                           >
//                             <i className="fa-regular fa-circle-xmark" />
//                             {errors.cpr && errors.cpr.message}
//                           </p>
//                         )}
//                       </div>
//                     </div>

//                     <div className="col-lg-6">
//                       <div className="form-group mb-3">
//                         <input
//                           name="Refer"
//                           type="text"
//                           className="form-control"
//                           required=""
//                           placeholder="Refer Number"
//                           {...register("Refer", {
//                             minLength: {
//                               value: 6,
//                               message: "refer code min length 6 Character",
//                             },
//                           })}
//                         />
//                         {errors.Refer && errors.Refer.message && (
//                           <p
//                             className="f-error m-0"
//                             style={{ color: "red", fontSize: 15 }}
//                           >
//                             <i className="fa-regular fa-circle-xmark" />
//                             {errors.Refer && errors.Refer.message}
//                           </p>
//                         )}
//                       </div>
//                     </div>

//                     <div className="col-md-6">
//                       <button type="submit" className="site-button">
//                         Sign Up
//                       </button>
//                     </div>

//                     <div className="col-lg-12">
//                       <div className="form-group mb-3 mt-3">
//                         <div className="form-check">
//                           <input
//                             type="checkbox"
//                             className="form-check-input"
//                             id="agree1"
//                             {...register("checkbox", {
//                               required: "This field is required", // Add validation rule(s) here
//                             })}
//                           />
//                           {errors.checkbox && errors.checkbox.message && (
//                             <p
//                               className="f-error m-0"
//                               style={{ color: "red", fontSize: 15 }}
//                             >
//                               <i className="fa-regular fa-circle-xmark" />
//                               {errors.checkbox && errors.checkbox.message}
//                             </p>
//                           )}

//                           <label className="form-check-label" for="agree1">
//                             I agree to the
//                             <a href="#">Terms and conditions</a>
//                           </label>
//                           <p>
//                             Already registered?
//                             <Link
//                               to={""}
//                               className="twm-backto-login"
//                               onClick={() => {
//                                 toggleModalLogin();
//                                 toggleModal();
//                               }}
//                             >
//                               Log in here
//                             </Link>
//                           </p>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </form>
//         </ModalBody>
//       </Modal>
//       {modalLogin && <Login />}
//     </>
//   );
// }





////////////////////////////////////////////////////////////////////////////////////////////////////////

























































import React, { useState, useEffect } from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import { useForm } from "react-hook-form";
import { GetData, PostData } from "../../ApiHelper/ApiHelper";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Login from "./Login";
import { CountryCodeJson } from "../commen/CountryCodeJson";

export default function SignUp(props) {
  const [modal, setModal] = useState(true);
  const toggleModal = () => setModal(!modal);
  const [modalLogin, setModalLogin] = useState(false);
  const toggleModalLogin = () => setModalLogin(!modalLogin);
  const [location, setLocation] = useState({ latitude: null, logitude: null });
  const navigate = useNavigate();
  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm({ mode: "onBlur" });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
      },
      (error) => {
        console.error("Error getting geolocation:", error);
      }
    );
    // fetch("http://0.tcp.in.ngrok.io:18544/api/v1/auth/countrys", {
    //   method: "get",
    //   headers: new Headers({
    //     "ngrok-skip-browser-warning": "69420",
    //   }),
    // })
    //   .then((response) => response.json())
    //   .then((data) => setCountryCode(data.data))
    //   .catch((err) => console.log(err));

  }, []);

  const handlerSignUp = (data) => {
    let signUpData = {
      location: location,
      ...data,
    };
    PostData("auth/signUp", signUpData).then((responce) => {
      console.log(responce);
      if (responce.status == true) {
        // Cookies.set("token", responce.user.access_token);
        navigate("/verifyotp", { state: { data: data } });
      }
    });
  };
  const toggleFunction = () => {
    if (props?.toggle) {
      return props.toggle();
    }
    if (props.toggleSignUp) {
      return props.toggleSignUp();
    }
    if (props.toggleModalSignupMap) {
      return props.toggleModalSignupMap;
    }
  };

  console.log(CountryCodeJson)
  return (
    <>
      <Modal
        Modal
        className="modal-dialog-centered modal-lg twm-sign-up"
        isOpen={modal}
        toggle={() => {
          props.toggle ? props.toggle() : props.toggleSignUp();
        }}
      >
        <div class="modal-header mt-0 py-0">
          <button
            type="button"
            className="btn-close"
            onClick={() => {
              // toggleModal();
              props.toggle ? props.toggle() : props.toggleSignUp();
            }}
          ></button>
        </div>
        <ModalBody className="p-0">
          <form onSubmit={handleSubmit(handlerSignUp)}>
            <div class="row">
              <div class="col-lg-6 col-12">
                <div class="login-overlay-img">
                  <img src="./images/featured-cities/city3.jpg" alt="" />
                </div>
              </div>
              <div class="col-lg-6 col-12 ps-lg-0">
                <div class="twm-tabs-style-2 mt-4 p-3">
                  <h4 class="modal-title text-center mb-3" id="OTP_popupLabel">
                    Sign Up
                  </h4>
                  <p class="text-center">
                    Sign Up and get access to all the features of Shopspot
                  </p>
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="form-group mb-3">
                        <input
                          name="phone"
                          type="text"
                          className="form-control"
                          required=""
                          placeholder="Email*"
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
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="form-group mb-3">
                        <input
                          name="username"
                          type="text"
                          required=""
                          className="form-control"
                          placeholder="Usearname*"
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
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="form-group mb-3">
                        <input
                          name="email"
                          type="text"
                          className="form-control"
                          required=""
                          placeholder="Password*"
                          {...register("password", {
                            required: "password is required",
                            minLength: {
                              value: 6,
                              message: "Password min length 6 Character",
                            },
                          })}
                        />
                        {errors.password && errors.password.message && (
                          <p
                            className="f-error m-0"
                            style={{ color: "red", fontSize: 15 }}
                          >
                            <i className="fa-regular fa-circle-xmark" />
                            {errors.password && errors.password.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="input-group mb-3">
                        <span
                          className="input-group-text p-0 border-0"
                          id="basic-addon1"
                        >
                          <select
                            className="form-control"
                            {...register("country_code", {
                              required: "country_code is required",
                            })}
                          >
                            {errors.country_code &&
                              errors.country_code.message && (
                                <p
                                  className="f-error m-0"
                                  style={{ color: "red", fontSize: 15 }}
                                >
                                  <i className="fa-regular fa-circle-xmark" />
                                  {errors.country_code &&
                                    errors.country_code.message}
                                </p>
                              )}
                            <option selected disabled value="">
                              +913
                            </option>
                            {CountryCodeJson &&
                              CountryCodeJson.length > 0 &&
                              CountryCodeJson.map((item, key) => (
                                <option key={key} value={item.dial_code}>
                                  {`${item?.dial_code}`}
                                </option>
                              ))}
                          </select>
                        </span>
                        <input
                          name="phone"
                          type="text"
                          className="form-control"
                          required=""
                          placeholder="Phone*"
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
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="form-group mb-3">
                        <input
                          name="date"
                          type="date"
                          className="form-control"
                          required=""
                          placeholder="Date"
                          max={new Date().toISOString().split("T")[0]}
                          {...register("dob", {
                            required: "This field is required", // Add validation rule(s) here
                          })}
                        />
                        {errors.dob && errors.dob.message && (
                          <p
                            className="f-error m-0"
                            style={{ color: "red", fontSize: 15 }}
                          >
                            <i className="fa-regular fa-circle-xmark" />
                            {errors.dob && errors.dob.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="form-group mb-3">
                        <input
                          name="CPR"
                          type="text"
                          className="form-control"
                          required=""
                          placeholder="CPR Number"
                          {...register("cpr", {
                            required: "CPR number is required",
                          })}
                        />
                        {errors.cpr && errors.cpr.message && (
                          <p
                            className="f-error m-0"
                            style={{ color: "red", fontSize: 15 }}
                          >
                            <i className="fa-regular fa-circle-xmark" />
                            {errors.cpr && errors.cpr.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="form-group mb-3">
                        <input
                          name="Refer"
                          type="text"
                          className="form-control"
                          required=""
                          placeholder="Referral code"
                          {...register("refer_code", {
                            minLength: {
                              value: 6,
                              message: "refer code min length 6 Character",
                            },
                          })}
                        />
                        {errors.Refer && errors.Refer.message && (
                          <p
                            className="f-error m-0"
                            style={{ color: "red", fontSize: 15 }}
                          >
                            <i className="fa-regular fa-circle-xmark" />
                            {errors.Refer && errors.Refer.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="col-md-6">
                      <button type="submit" className="site-button">
                        Sign Up
                      </button>
                    </div>

                    <div className="col-lg-12">
                      <div className="form-group mb-3 mt-3">
                        <div className="form-check">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id="agree1"
                            {...register("checkbox", {
                              required: "This field is required", // Add validation rule(s) here
                            })}
                          />


                          <label className="form-check-label" for="agree1">
                            I agree to the
                            <a>Terms and conditions</a>
                          </label>
                          {errors.checkbox && errors.checkbox.message && (
                            <p
                              className="f-error m-0"
                              style={{ color: "red", fontSize: 15 }}
                            >
                              <i className="fa-regular fa-circle-xmark" />
                              {errors.checkbox && errors.checkbox.message}
                            </p>
                          )}
                          <p>
                            Already registered?
                            <Link
                              to={""}
                              className="twm-backto-login ms-1"
                              onClick={() => {
                                toggleModalLogin();
                                toggleModal();
                              }}
                            >
                              Log in here
                            </Link>
                          </p>

                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </ModalBody>
      </Modal>
      {modalLogin && <Login />}
    </>
  );
}
