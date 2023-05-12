import React, { useState, useEffect } from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import { useForm } from "react-hook-form";
import { PostData } from "../../ApiHelper/ApiHelper";
import Cookies from "js-cookie";
import { Link, useLocation } from "react-router-dom";
import { GoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";
import SignUp from "./SignUp";
import EmailVerify from "./EmailVerify";
import { useDispatch } from "react-redux";
import { actionLoginStatus } from "../../store/Action";
import { userDetail } from "../../store/Action";
import Swal from "sweetalert2";

export default function Login(props) {
  const [isLogin, setIsLogin] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();
  const [modalSignup, setModalSignup] = useState(false);
  const toggleModalSignup = () => setModalSignup(!modalSignup);
  const [EmailVerifyModal, setEmailVerifyModal] = useState(false);
  const toggleEmailVerifyModal = () => setEmailVerifyModal(!EmailVerifyModal);
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [modalSignupMap, setModalSignupMap] = useState(false);
  const toggleModalSignupMap = () => setModalSignupMap(!modalSignupMap);

  const clientId =
    "1056687895620-on8ip3n5m5j4f68i5jiuhg9iq3s7pace.apps.googleusercontent.com";
  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientId,
        scope: "",
      });
    }
    gapi.load("client:auth2", start);
  }, []);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ mode: "onBlur" });

  const [modal, setModal] = useState(true);
  const toggleModal = () => {
    setModal(!modal);
  };
  {
  }
  const handleLoginSubmit = (data) => {
    console.log(data);
    setLoading(true);
    PostData("auth/login", data).then((response) => {
      if (response?.status == true) {
        Cookies.set("userDetails", response.user);
        Cookies.set("token", response?.user?.access_token);
        Cookies.set("userid", response?.user?.id);
        Cookies.set("userName", response.user.name);
        setIsLogin(true);
        Swal.fire("Success", response.message, "success");
        dispatch(userDetail.userDetails(response?.user));
        dispatch(actionLoginStatus.loginStatus(true));
        toggleModal();
        setLoading(false);
      } else {
        setLoading(false);
        Swal.fire("Login Failed", response.message, "Login Failed");
      }
    });
  };

  const onSuccess = (response) => {
    console.log("Login success:", response);
    console.log(response);
    // setLoading(true);
    if (response) {
      PostData("auth/google-login", { tokenId: response?.tokenId }).then(
        (responce) => {
          console.log(responce);
          if (responce?.status === true) {
            Cookies.set("token", responce?.data?.access_token);
            setIsLogin(true);
            // setLoading(false);
            Swal.fire("Success", response.message, "success");
            dispatch(actionLoginStatus.loginStatus(true));
            toggleModal();
          } else {
            // setLoading(false);
            Swal.fire("Login Failed", response.message, "Login Failed");
          }
        }
      );
    }
  };

  const onFailure = (error) => {
    console.log("Login failed:", error);
  };

  return (
    <>
      <Modal
        Modal
        className="modal-dialog modal-dialog-centered modal-lg twm-sign-up"
        isOpen={modal}
        toggle={() => (props?.toggle ? props.toggle() : toggleModal())}
      >
        <div className="modal-header mt-0 py-0">
          <button
            type="button"
            classNameName="btn-close"
            onClick={() => {
              props.toggle ? props?.toggle() : toggleModal();
            }}
          ></button>
        </div>
        <ModalBody classNameName="p-0">
          <form onSubmit={handleSubmit(handleLoginSubmit)}>
            <div className="row">
              <div className="col-lg-6 col-12">
                <div className="login-overlay-img">
                  <img src="./images/featured-cities/city1.jpg" alt="" />
                </div>
              </div>
              <div className="col-lg-6 col-12 ps-lg-0">
                <div className="twm-tabs-style-2 mt-4 p-3">
                  <h4
                    className="modal-title text-center mb-3"
                    id="login_popupLabel"
                  >
                    Login
                  </h4>
                  <p className="text-center">
                    Login and get access to all the features of Shopspot
                  </p>
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="form-group mb-3">
                        <input
                          name="username"
                          type="text"
                          required=""
                          className="form-control"
                          placeholder="Email*"
                          {...register("email", {
                            required: "Email is required",
                            pattern: {
                              value:
                                /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                              message: "Incorrect email format",
                            },
                          })}
                        />
                        {errors.email && errors.email.message && (
                          <p
                            className="f-error m-0 fa-circle-xmark"
                            style={{ color: "red", fontSize: 15 }}
                          >
                            <i className="fa-regular fa-circle-xmark" />
                            {errors.email && errors.email.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="col-lg-12">
                      <div className="form-group mb-3">
                        <input
                          name="password"
                          type="password"
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
                    <div class="col-lg-12">
                      <div class="form-group mb-3">
                        <div class="form-check">
                          <input
                            type="checkbox"
                            class="form-check-input"
                            id="Password3"
                          />
                          <label
                            class="form-check-label rem-forgot"
                            for="Password3"
                          >
                            Remember me
                            <Link
                              onClick={() => {
                                toggleModal();
                                toggleEmailVerifyModal();
                              }}
                            >
                              Forgot Password ?
                            </Link>
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <button
                        type="submit"
                        className="site-button py-2"
                        style={{ width: "auto" }}
                      >
                        {loading == true ? (
                          <span className="spinner-border text-light spinner-border-sm"></span>
                        ) : (
                          "Login In"
                        )}
                      </button>
                      <div className="mt-3 mb-3">
                        Don't have an account ?
                        <Link
                          to={""}
                          onClick={() => {
                            toggleModalSignup();
                            toggleModal();
                            // props.toggle()
                          }}
                          className="twm-backto-login ms-2"
                        >
                          Sign Up
                        </Link>
                      </div>
                    </div>

                    <div className="col-md-12">
                      <GoogleLogin
                        clientId="1056687895620-on8ip3n5m5j4f68i5jiuhg9iq3s7pace.apps.googleusercontent.com"
                        buttonText="Login"
                        onSuccess={onSuccess}
                        onFailure={onFailure}
                        cookiePolicy={"single_host_origin"}
                        isSignedIn={false}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </ModalBody>
      </Modal>
      {modalSignup && (
        <SignUp
          toggleSignUp={props.toggleModalSignup}
          toggle={() => props?.toggle()}
        />
      )}
      {EmailVerifyModal && <EmailVerify toggle={() => props.toggle()} />}
    </>
  );
}
