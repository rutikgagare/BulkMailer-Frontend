import { useState, useEffect } from "react";
import "./auth.css";
import emailimg from "../../assets/email.svg";
import circle from "../../assets/circle.svg";
import FormData from "form-data";
import mailimg from "../../assets/mail.svg";
import { useDispatch, useSelector } from "react-redux";
import { signupdata } from "../../redux/actions/AuthAction";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import * as ReactBootStrap from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function FrgPass() {
  const [email, setEmail] = useState("");

  const [correctMail, setCorrectMail] = useState(false);

  const [loading, setLoading] = useState(false);

  const [check, setCheck] = useState(0);

  const dispatch = useDispatch();
  const fd = new FormData();
  const navigate = useNavigate();

  function handleMail(e) {
    setEmail(e.target.value);
  }

  const rightmail =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  useEffect(() => {
    if (rightmail.test(email)) {
      document.getElementById("emailerr2").style.display = "none";
      setCorrectMail(true);
    } else if (email) {
      document.getElementById("emailerr2").style.display = "block";
      setCorrectMail(false);
    }
  }, [email]);

  const mssg = useSelector((state) => state.authreducer);

  useEffect(() => {
    console.log(check);
    if (check == 1) {
      toast.error(mssg.response3[0], {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  }, [check]);

  function handleSubmit(e) {
    e.preventDefault();
    localStorage.setItem("signupMail", email);
    if (correctMail) {
      setLoading(true);
      setCheck(0);
      fd.append("email", email);
      dispatch(signupdata(fd, setLoading, navigate, setCheck));
    }
  }
  return (
    <>
      {loading ? (
        <div id="loader">
          <ReactBootStrap.Spinner animation="border" id="spinner" />
        </div>
      ) : null}
      <div id="flex">
        <div className="bluediv">
          <img src={emailimg} className="bluedivimg" />
        </div>
        <div id="forms2">
          <h1 className="form-heading2">Email Verification</h1>
          <form onSubmit={handleSubmit} id="formtop">
            <div id="formflex">
              <label htmlFor="email" id="formlabel">
                Email Address
              </label>
              <input
                type="text"
                id="forminput"
                value={email}
                placeholder="Enter Your Email Address"
                onChange={handleMail}
                required
                maxLength={30}
              ></input>
              <img src={mailimg} id="mailimg"></img>
              <p id="emailerr2">Invalid Email Address</p>
            </div>
            <button type="submit" id="formbtn2">
              Send OTP
            </button>
            <ToastContainer />
          </form>
          <p id="endtxt">
            Already A Customer?{" "}
            <span id="endlink">
              <Link to="/">Login</Link>
            </span>
          </p>
        </div>
        <div></div>
        <img src={circle} className="bluecircleimg"></img>
        <div className="bluecircleimg2"></div>
      </div>
    </>
  );
}
export default FrgPass;
