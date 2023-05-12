import React, { useState } from "react";
import { Modal, ModalBody } from "reactstrap";
import { useForm } from "react-hook-form";
import { PostData } from "../../ApiHelper/ApiHelper";
import Swal from "sweetalert2";

export default function NewPassword(props) {
  const [modalNewPassword, setModalNewPassword] = useState(true);
  const toggleModalNewPassword = () => setModalNewPassword(!modalNewPassword);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ mode: "onBlur" });

  const handleNewPassword = (data) => {
    console.log(props.email.email);

    let allData = {
      email: props.email.email,
      ...data,
    };
    console.log(allData);
    PostData("auth/new-password", allData).then((res) => {
      if (res.status == true) {
        toggleModalNewPassword();
        Swal.fire({
          title: "password changed !",
          text: "password changed successfully.",
          icon: "success",
          timer: 1000,
          showConfirmButton: false, // Set this option to false to remove the OK button
        });
      }
      if ("Invalid OTP") {
        console.log("helo");
        Swal.fire({
          title: "Invalid OTP !",
          text: "please enter valid OTP.",
          showCancelButton: true,
          cancelButtonColor: "#d33",
          confirmButtonColor: "rgb(0, 128, 0)",
          confirmButtonText: "Yes, exit it!",
        });
      }
    });
  };

  return (
    <>
      <Modal
        Modal
        className="modal-dialog modal-dialog-centered twm-sign-up"
        isOpen={modalNewPassword}
        toggle={() => {
          toggleModalNewPassword();
          props.toggle();
        }}
      >
        <ModalBody>
          <form>
            <div className="modal-header mt-0">
              <button
                type="button"
                className="btn-close"
                // data-bs-dismiss="modal"
                // aria-label="Close"
                onClick={() => {
                  toggleModalNewPassword();
                  props.toggle();
                }}
              ></button>
            </div>
            <div className="twm-tabs-style-2">
              <div className="mb-3">
                <img className="otp-img" src="./images/otp.png" alt="" />
              </div>
              <h4 className="modal-title text-center mb-3" id="OTP_popupLabel">
                Create New password
              </h4>
              <p className="text-center">
                Your new password must be different from previous used password.
                <br className="d-none d-md-block" />
              </p>
              <div className="row">
                <div className="col-lg-12">
                  <div className="form-group mb-3">
                    <input
                      name="OTP"
                      type="text"
                      required=""
                      className="form-control"
                      placeholder="25865"
                      {...register("otp", {
                        required: "OTP is required",
                        minLength: {
                          value: 6,
                          message: "OTP min length 6 Character",
                        },
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

                <div className="col-lg-12">
                  <div className="form-group mb-3">
                    <input
                      name="password"
                      type={"password"}
                      required=""
                      className="form-control"
                      placeholder=" New Password"
                      {...register("new_password", {
                        required: "OTP is required",
                      })}
                    />
                  </div>
                </div>

                <div className="col-lg-3 col-md-4 col-12">
                  <button
                    type="submit"
                    className="site-button"
                    onClick={handleSubmit(handleNewPassword)}
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          </form>
          {/* <!--Model Popup Section End--> */}
        </ModalBody>
      </Modal>
    </>
  );
}
