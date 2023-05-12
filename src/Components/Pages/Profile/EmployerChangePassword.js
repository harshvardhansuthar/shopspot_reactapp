import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { PostDataWithToken } from "../../../ApiHelper/ApiHelper";
import Swal from "sweetalert2";
import Loder from "../../commen/Loder";

export default function EmployerChangePassword() {
  const [componentLoader, setComponentLoader] = useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({ mode: "onBlur" });

  const handleSetNewPassword = (data) => {
    if (data?.new_password !== data?.Confirm_password) {
      return (
        <p className="f-error m-0" style={{ color: "red", fontSize: 15 }}>
          <i className="fa-regular fa-circle-xmark" />
          {"new password and old password must be the same"}
        </p>
      );
    } else {
      setComponentLoader(true)
      PostDataWithToken("auth/edit-profile", data).then((res) => {
        console.log(res);
        if (res.status == true) {
          reset({
            old_password: "",
            new_password: "",
            Confirm_password: "",
          });
          setComponentLoader(false)
          Swal.fire({
            title: "Updated !",
            text: "password changed successfully.",
            icon: "success",
            timer: 1000,
            showConfirmButton: false, // Set this option to false to remove the OK button
          });
        }
      });
    }
  };
  return (
    <>
      {componentLoader ? (
        <Loder />
      ) : (
        <>
          {/* <!--Filter Short By--> */}
          <div class="twm-right-section-panel site-bg-light">
            <form onSubmit={handleSubmit(handleSetNewPassword)}>
              {/* <!--Basic Information--> */}
              <div class="panel panel-default">
                <div class="panel-heading wt-panel-heading p-a20">
                  <h4 class="panel-tittle m-a0">Change Password</h4>
                </div>
                <div class="panel-body wt-panel-body p-a20">
                  <div class="row">
                    <div class="col-lg-6 col-md-6">
                      <div class="form-group">
                        <label>Old Password</label>
                        <div class="ls-inputicon-box">
                          <input
                            class="form-control wt-form-control"
                            name="company_name"
                            type="password"
                            placeholder=""
                            {...register("old_password", {
                              required: "password is required",
                              minLength: {
                                value: 6,
                                message: "Password min length 6 Character",
                              },
                            })}
                          />
                          {errors.old_password && errors.old_password.message && (
                            <p
                              className="f-error m-0"
                              style={{ color: "red", fontSize: 15 }}
                            >
                              <i className="fa-regular fa-circle-xmark" />
                              {errors.old_password && errors.old_password.message}
                            </p>
                          )}
                          <i class="fs-input-icon fa fa-asterisk"></i>
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-6 col-md-6">
                      <div class="form-group">
                        <label>New Password</label>
                        <div class="ls-inputicon-box">
                          <input
                            class="form-control wt-form-control"
                            name="company_name"
                            type="password"
                            placeholder=""
                            {...register("new_password", {
                              required: "password is required",
                              minLength: {
                                value: 6,
                                message: "Password min length 6 Character",
                              },
                            })}
                          />
                          {errors.new_password && errors.new_password.message && (
                            <p
                              className="f-error m-0"
                              style={{ color: "red", fontSize: 15 }}
                            >
                              <i className="fa-regular fa-circle-xmark" />
                              {errors.new_password && errors.new_password.message}
                            </p>
                          )}
                          <i class="fs-input-icon fa fa-asterisk"></i>
                        </div>
                      </div>
                    </div>

                    <div class="col-lg-12 col-md-12">
                      <div class="form-group">
                        <label>Confirm New Password</label>
                        <div class="ls-inputicon-box">
                          <input
                            class="form-control wt-form-control"
                            name="company_name"
                            type="password"
                            placeholder=""
                            {...register("Confirm_password", {
                              required: "password is required",
                              minLength: {
                                value: 6,
                                message: "Password min length 6 Character",
                              },
                            })}
                          />
                          {errors.Confirm_password &&
                            errors.Confirm_password.message && (
                              <p
                                className="f-error m-0"
                                style={{ color: "red", fontSize: 15 }}
                              >
                                <i className="fa-regular fa-circle-xmark" />
                                {errors.Confirm_password &&
                                  errors.Confirm_password.message}
                              </p>
                            )}
                          <i class="fs-input-icon fa fa-asterisk"></i>
                        </div>
                      </div>
                    </div>

                    <div class="col-xl-12 col-lg-12 col-md-12">
                      <div class="text-left">
                        <button type="submit" class="site-button">
                          Save Changes
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>

        </>
      )}
    </>
  );
}
