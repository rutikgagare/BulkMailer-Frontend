import "./auth.css";
import login from "../../assets/login.svg";
import circle from "../../assets/circle.svg";
import mailimg from '../../assets/mail.svg';
import lockimg from '../../assets/lock.svg';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import FormData from 'form-data';
import {
  faEye,
  faEyeSlash,
} from "@fortawesome/fontawesome-free-solid";
import { useState, useEffect } from "react";
import { useDispatch , useSelector } from "react-redux";
import { logindata } from "../../redux/actions/AuthAction";
import { Link } from "react-router-dom";
import * as ReactBootStrap from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [correctMail, setCorrectMail] = useState(false);

  const [show, setShow] = useState(false);

  const [loading, setLoading] = useState(false);

  const rightmail =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  const dispatch = useDispatch();
  const fd = new FormData();
  const navigate = useNavigate();

  const mssg = useSelector((state)=>state.authreducer.response[0])
   console.log(mssg);

//    const showToastMessage = () => {
//     if(correctMail&& email && password && mssg){
//     toast.success(mssg, {
//         position: toast.POSITION.TOP_RIGHT
//     });
//   }
// }; 

  useEffect(() => {
    if (rightmail.test(email)) {
      document.getElementById("emailerr").style.display = "none";
      setCorrectMail(true);
    } else if (email) {
      document.getElementById("emailerr").style.display = "block";
      setCorrectMail(false);
    }
  }, [email]);

  function showHide() {
    setShow(!show);
  }

  function handleMail(e) {
    setEmail(e.target.value);
  }
  function handlePass(e) {
    setPassword(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (correctMail) {
      setLoading(true);
      fd.append("email" , email);
      fd.append("password" , password);
      dispatch(logindata(fd, setLoading , navigate));
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
          <img src={login} className="bluedivimg" />
        </div>
        <div id="forms">
          <h1 className="form-heading">Login</h1>
          <form onSubmit={handleSubmit} id='formtop'>
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
              ></input>
              <img src={mailimg} id="mailimg"></img>
              <p id="emailerr">Invalid Email Address</p>
              <label htmlFor="password" id="formlabel">
                Password
              </label>
              <input
                type={show ? "text" : "password"}
                id="forminput"
                value={password}
                placeholder="Enter Your Password"
                onChange={handlePass}
                required
              ></input>
              <img src={lockimg} id="mailimg"></img>
              {show ? (
                <FontAwesomeIcon
                  icon={faEye}
                  onClick={showHide}
                  id="eyecloseimg"
                />
              ) : (
                <FontAwesomeIcon
                  icon={faEyeSlash}
                  onClick={showHide}
                  id="eyecloseimg"
                />
              )}
              <p id="forgotlink">
                <Link to="/forgot">Forgot Password?</Link>
              </p>
            </div>
            <button type="submit" id="formbtn">
              LOGIN
            </button>
            <ToastContainer />
          </form>
          <p id="endtxt">
            New To Bulk Mailer?{" "}
            <span id="endlink">
              <Link to="/signup">Signup</Link>
            </span>
          </p>
        </div>
      </div>
      <img src={circle} className="bluecircleimg"></img>
      <div className="bluecircleimg2"></div>
    </>
  );
}
export default Login;