import React, { useState, useEffect } from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import { set, useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useLocation } from "react-router-dom";
import { GetData, PostData } from "../../ApiHelper/ApiHelper";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export default function VerifyOtp() {
  const [modal, setModal] = useState(true);
  const toggleModal = () => setModal(!modal);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const email = location.state?.data?.email;
  const [resendState, setResendState] = useState(false);
  const [disable, setDisable] = useState(false)
  let [countdown, setCountdown] = useState(60); // Initial countdown value in seconds

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ mode: "onBlur" });

  const handleExitPopUp = (id) =>
    Swal.fire({
      title: "Are you sure to exit?",
      icon: "warning",
      showCancelButton: true,
      cancelButtonColor: "#d33",
      confirmButtonColor: "rgb(0, 128, 0)",
      confirmButtonText: "Yes, exit it!",
    }).then((result) => {
      if (result.isConfirmed) {
        toggleModal();
        navigate("/");
      }
    });




  const handlerVerifyOtp = (data) => {
    console.log(data);

    let verifyData = {
      email: email,
      otp: data.otp,
    };

    setLoading(true);

    PostData("auth/verify-otp", verifyData).then((responce) => {
      console.log(responce);
      if (responce.status == true) {
        Cookies.set("token", responce.user.access_token);
        setLoading(false);
        Swal.fire({
          title: "Verified !",
          text: "Signed up successfully.",
          icon: "success",
          timer: 1000,
          showConfirmButton: false, // Set this option to false to remove the OK button
        });
        toggleModal();
        navigate("/");
      } else {
        setLoading(false);
        Swal.fire({
          title: "Error !",
          text: `${responce?.data?.message}`,
          icon: "error",
          showConfirmButton: true, // Set this option to false to remove the OK button
        });
      }
    });
  };



  const resendHandler = () => {
    setResendState(true);
    setDisable(true);

    PostData("auth/otp-resend", { email }).then((response) => {
      if (response.status === true) {
        Swal?.fire("OTP resend");
      } else {
        Swal?.fire(response?.message);

      }
    });

    let countdownValue = 60;
    setCountdown(countdownValue);

    const timer = setInterval(() => {
      countdownValue--;
      setCountdown(countdownValue);

      if (countdownValue <= 0) {
        clearInterval(timer);
        setResendState(false);
        setDisable(false);
      }
    }, 1000);
  };




  return (
    <>
      {" "}
      <Modal
        Modal
        className="modal-dialog-centered twm-sign-up"
        isOpen={modal}
        toggle={toggleModal}
      >
        <ModalBody>
          <form onSubmit={handleSubmit(handlerVerifyOtp)}>
            <div class="modal-header mt-0">
              <button
                type="button"
                className="btn-close"
                onClick={handleExitPopUp}
              ></button>
            </div>
            <div className="twm-tabs-style-2">
              <div class="mb-3">
                <img class="otp-img" src="./images/otp.png" alt="" />
              </div>
              <h4 class="modal-title text-center mb-3" id="OTP_popupLabel">
                Verify your OTP
              </h4>
              <p class="text-center">
                We have sent you a code at <strong> {email}</strong>
                <br class="d-none d-md-block" />
                please check your inbox to verify your account
              </p>
              <div className="row">
                <div className="col-lg-12">
                  <div className="form-group mb-3">
                    <input
                      name="otp"
                      type="text"
                      required=""
                      className="form-control"
                      placeholder="OTP*"
                      {...register("otp", {
                        required: " OTP is required",
                      })}
                    />
                    {errors.otp && errors.otp.message && (
                      <p
                        className="f-error m-0"
                        style={{ color: "red", fontSize: 15 }}
                      >
                        <i className="fa-regular fa-circle-xmark" />
                        {errors.otp && errors.otp.message}
                      </p>
                    )}
                  </div>
                </div>
                <div class="mb-3">
                  <button class="twm-backto-login" onClick={resendHandler} disabled={disable}>
                    {resendState ? "Sending OTP" : "Resend OTP"} {disable && countdown}
                  </button>
                </div>
                <div class="col-lg-3 col-md-4 col-12">
                  <button type="submit" class="site-button">
                    {loading == true ? (
                      <span className="spinner-border text-light spinner-border-sm"></span>
                    ) : (
                      "Verify"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </ModalBody>
      </Modal>
    </>
  );
}
