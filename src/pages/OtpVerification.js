import React, { useEffect, useRef, useState } from "react";
import { Redirect } from "react-router-dom";
import Header from "../components/Header";
import CustomSpinner from "../components/CustomSpinner";
import { toast } from "react-toastify";

function OtpVerification(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState(() => {
    return props.match.params.email;
  });
  const [OTPSuccess, setOTPSuccess] = useState(false);
  const [OTP, setOTP] = useState("");
  const [OTP2, setOTP2] = useState("");
  const [OTP3, setOTP3] = useState("");
  const [OTP4, setOTP4] = useState("");
  const [OTP5, setOTP5] = useState("");

  const otp = useRef();
  const otp2 = useRef();
  const otp3 = useRef();
  const otp4 = useRef();
  const otp5 = useRef();
  const confirmBtn = useRef();

  const otpInput = (e, i) => {
    if (i === 1) {
      setOTP(e.target.value);
      otp2.current.focus();
    }
    if (i === 2) {
      setOTP2(e.target.value);
      otp3.current.focus();
    }
    if (i === 3) {
      setOTP3(e.target.value);
      otp4.current.focus();
    }
    if (i === 4) {
      setOTP4(e.target.value);
      otp5.current.focus();
    }
    if (i === 5) {
      setOTP5(e.target.value);
      confirmBtn.current.focus();
    }
  };

  useEffect(() => {
    otp.current.focus();
  }, []);

  const resendOTP = () => {
    const fetchData = async () => {
      setIsLoading(true);
      await fetch(`${process.env.REACT_APP_API_BASE_URL}/re-send-email/`, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status_code === 200) {
            toast.success(data.message);
            setIsLoading(false);
          }
        })
        .catch((error) => console.error(error));
    };
    fetchData();
  };

  const handleSubmit = () => {
    const OTPCode = OTP.concat(OTP2, OTP3, OTP4, OTP5);
    const fetchData = async () => {
      setIsLoading(true);
      await fetch(`${process.env.REACT_APP_API_BASE_URL}/verify-email/`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          number: OTPCode,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("OTP-validation-response", data);
          if (data.status_code === 200) {
            toast.success(data.message);
            setOTPSuccess(true);
            setIsLoading(false);
          } else if (data.status_code === 400) {
            toast.warn(data.message);
            setOTP("");
            setOTP2("");
            setOTP3("");
            setOTP4("");
            setOTP5("");
            setIsLoading(false);
          }
        })
        .catch((error) => console.error(error));
    };
    fetchData();
  };

  if (OTPSuccess) return <Redirect to={"/"} />;
  else
    return (
      <>
        <CustomSpinner isLoading={isLoading} />
        <Header page={"OtpVerification"} />
        <div className="login_wrapper">
          <div className="container">
            <div className="form-content">
              <div className="head_form">
                <h3 className="textCenter">Verification</h3>
              </div>
              <div className="form_wrap text-center">
                <p className="font-weight-bold font16 mb-4">{email}</p>
                <p className="mx-5 font14 mb-4">
                  Please enter the verification code from the SMS we just send
                  you.
                </p>
                <div className="otp__input mb-4">
                  <input
                    type="text"
                    maxLength={1}
                    ref={otp}
                    className="otp__code form-control"
                    onChange={(e) => otpInput(e, 1)}
                  />
                  <input
                    type="text"
                    maxLength={1}
                    ref={otp2}
                    className="otp__code form-control"
                    onChange={(e) => otpInput(e, 2)}
                  />
                  <input
                    type="text"
                    maxLength={1}
                    ref={otp3}
                    className="otp__code form-control"
                    onChange={(e) => otpInput(e, 3)}
                  />
                  <input
                    type="text"
                    maxLength={1}
                    ref={otp4}
                    className="otp__code form-control"
                    onChange={(e) => otpInput(e, 4)}
                  />
                  <input
                    type="text"
                    maxLength={1}
                    ref={otp5}
                    className="otp__code form-control"
                    onChange={(e) => otpInput(e, 5)}
                  />
                </div>
                <p className="font14 mb-4">
                  Don't get it{" "}
                  <strong className="cursorPointer" onClick={resendOTP}>
                    Resend code
                  </strong>
                </p>
                <div className="field-wrapper">
                  <button
                    ref={confirmBtn}
                    type="submit"
                    className="btn btn-primary font14"
                    onClick={handleSubmit}
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
}

export default OtpVerification;
