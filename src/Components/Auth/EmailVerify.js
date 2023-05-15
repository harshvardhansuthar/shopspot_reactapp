import React, { useState } from "react";
import { Modal, ModalBody } from "reactstrap";
import { useForm } from "react-hook-form";
import { PostData } from "../../ApiHelper/ApiHelper";
import { useNavigate } from "react-router-dom";
import NewPassword from "./NewPassword";
import Swal from "sweetalert2";

export default function EmailVerify(props) {
  const [modalForgetPassword, setmodalForgetPassword] = useState(true);
  const toggleModalForgetPassword = () =>
    setmodalForgetPassword(!modalForgetPassword);
  const [modalNewPassword, setModalNewPassword] = useState(false);
  const toggleModalNewPassword = () => setModalNewPassword(!modalNewPassword);
  const [email, setEmail] = useState(null);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ mode: "onBlur" });

  const handleVerifyEmail = (data) => {
    setEmail(data);
    PostData("auth/forget-password", data).then((res) => {
      if (res?.status == true) {
        toggleModalForgetPassword();
        toggleModalNewPassword();
      } else {
        Swal.fire({
          title: "Error !",
          text: `${res?.data?.message}`,
          icon: "error",
          showConfirmButton: true, // Set this option to false to remove the OK button
        });
      }
    });
  };
  return (
    <>
      <Modal
        Modal
        className="modal-dialog modal-dialog-centered twm-sign-up"
        isOpen={modalForgetPassword}
        toggle={() => {
          toggleModalForgetPassword();
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
                  toggleModalForgetPassword();
                  props.toggle();
                }}
              ></button>
            </div>
            <div className="twm-tabs-style-2">
              <div className="mb-3">
                <img className="otp-img" src="./images/otp.png" alt="" />
              </div>
              <h4 className="modal-title text-center mb-3" id="OTP_popupLabel">
                Forget Password
              </h4>
              <p className="text-center">
                Enter your email address
                <br className="d-none d-md-block" />
              </p>
              <div className="row">
                <div className="col-lg-12">
                  <div className="form-group mb-3">
                    <input
                      name="email"
                      type="email"
                      required=""
                      className="form-control"
                      placeholder="admin@example"
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

                <div className="col-lg-3 col-md-4 col-12">
                  <button
                    type="submit"
                    className="site-button"
                    onClick={handleSubmit(handleVerifyEmail)}
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
      {/* <!--OTP popup --> */}
      {modalNewPassword && (
        <NewPassword toggle={() => props.toggle()} email={email && email} />
      )}
    </>
  );
}
