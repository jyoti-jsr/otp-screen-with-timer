import "./styles.css";
import React, { useState } from "react";

export default function App() {
  const [otp, setOtp] = useState({
    otp1: "",
    otp2: "",
    otp3: "",
    otp4: "",
    otp5: ""
  });

  const minutes = 1;
  const seconds = 12;
  const [time, setTime] = React.useState({
    minutes: minutes,
    seconds: seconds
  });

  const tick = () => {
    if (time.seconds > 0) {
      setTime({ ...time, ["seconds"]: time.seconds - 1 });
    } else if (time.seconds == 0 && time.minutes == 1) {
      setTime({ ["minutes"]: time.minutes - 1, ["seconds"]: 60 - 1 });
    } else if (time.seconds == 0 && time.minutes == 2) {
      setTime({ ["minutes"]: time.minutes - 1, ["seconds"]: 60 - 1 });
    }
  };
  // console.log(time);

  const reset = () =>
    setTime({
      minutes: minutes,
      seconds: seconds
    });

  React.useEffect(() => {
    const timerId = setInterval(() => tick(), 1000);
    return () => clearInterval(timerId);
  }, [time.seconds]);

  const handleChange = (e) => {
    // console.log(e.target.name, e.target.value);
    setOtp({ ...otp, [e.target.name]: e.target.value });
  };
  // console.log(otp);

  const handleSubmit = (event) => {
    event.preventDefault();
    const otpp = `${otp.otp1}${otp.otp2}${otp.otp3}${otp.otp4}${otp.otp5}`;
    console.log(otpp);
    const formdata = new FormData();
    formdata.append("otp", otpp);
  };

  const inputfocus = (elmnt) => {
    // console.log(elmnt.target.tabIndex);
    if (elmnt.key === "Delete" || elmnt.key === "Backspace") {
      const next = elmnt.target.tabIndex - 2;
      if (next > -1) {
        elmnt.target.form.elements[next].focus();
      }
    } else {
      const next = elmnt.target.tabIndex;
      // console.log(next);
      if (next < 5) {
        elmnt.target.form.elements[next].focus();
        // console.log("=============", elmnt.target.form.elements);
      }
    }
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <div className="otpContainer">
          <input
            name="otp1"
            type="text"
            autoComplete="off"
            className="otpInput"
            value={otp.otp1}
            onChange={(e) => handleChange(e)}
            tabIndex="1"
            maxLength="1"
            onKeyUp={(e) => inputfocus(e)}
          />
          <input
            name="otp2"
            type="text"
            autoComplete="off"
            className="otpInput"
            value={otp.otp2}
            onChange={(e) => handleChange(e)}
            tabIndex="2"
            maxLength="1"
            onKeyUp={(e) => inputfocus(e)}
          />
          <input
            name="otp3"
            type="text"
            autoComplete="off"
            className="otpInput"
            value={otp.otp3}
            onChange={(e) => handleChange(e)}
            tabIndex="3"
            maxLength="1"
            onKeyUp={(e) => inputfocus(e)}
          />
          <input
            name="otp4"
            type="text"
            autoComplete="off"
            className="otpInput"
            value={otp.otp4}
            onChange={(e) => handleChange(e)}
            tabIndex="4"
            maxLength="1"
            onKeyUp={(e) => inputfocus(e)}
          />

          <input
            name="otp5"
            type="text"
            autoComplete="off"
            className="otpInput"
            value={otp.otp5}
            onChange={(e) => handleChange(e)}
            tabIndex="5"
            maxLength="1"
            onKeyUp={(e) => inputfocus(e)}
          />
        </div>

        <div>{`${time.minutes
          .toString()
          .padStart(2, "0")}:${time.seconds.toString().padStart(2, "0")}`}</div>
        <div>
          <button
            className="primary"
            onClick={() => reset()}
            disabled={time.seconds || time.minutes ? true : false}
          >
            Resend otp
          </button>
        </div>
        <br />
        <button className="primary" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}
