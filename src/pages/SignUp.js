import { useState } from "react";
import {
    getAuth,
    createUserWithEmailAndPassword,
    updateProfile,
  } from "firebase/auth";
  import {setDoc, doc, serverTimestamp} from 'firebase/firestore';
  import { db } from "../firebase.config";
import { useNavigate, Link } from "react-router-dom";
import { ReactComponent as ArrowRightIcon } from "../assets/svg/keyboardArrowRightIcon.svg";
import visibilityIcon from "../assets/svg/visibilityIcon.svg";

  

function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const {name, email, password } = formData;
  const navigate = useNavigate();
  const onChange = (e) => {
     setFormData((prevState)=> ({
         ...prevState,
         [e.target.id] : e.target.value
     }))
     console.log(formData);
  };

  const submitProfile = async (e) => {
    e.preventDefault();
    try {
        const auth = getAuth();
        const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredentials.user;
        updateProfile(auth.currentUser , {
          displayName: name
        })

        const formDataCopy = {...formData};
        delete formDataCopy.password;
        formDataCopy.timestamp = serverTimestamp();

        await setDoc(doc(db, 'users', user.uid), formDataCopy)

        navigate('/');
    }
    catch (error) {
        console.log(error);
    }
  };

  return (
    <>
      <div className="pageContainer">
        <header>
          <p className="pageHeader">Welcome Back!</p>
        </header>
        <form onSubmit={submitProfile}>
        <input
            type="text"
            className="nameInput"
            placeholder="name"
            id="name"
            value={name}
            onChange={onChange}
          />
          <input
            type="email"
            className="emailInput"
            placeholder="Email"
            id="email"
            value={email}
            onChange={onChange}
          />
          <div className="passwordInputDiv">
              <input placeholder="Password" type={showPassword ? 'text' : 'password'} className="passwordInput" id='password' value={password} onChange={onChange} />
              <img src={visibilityIcon} className="showPassword" alt="show password" onClick={() => {setShowPassword((prevState)=> !prevState)}} />
          </div>
          <Link to='/forget-password' className="forgotPasswordLink">ForgotPassword</Link>
          <div className="signInBar">
              <p className="signInText">
                  Sign Up
              </p>
              <button type="submit" className='signInButton'>
                  <ArrowRightIcon fill="#fff" width="34px" height="34px"/>
              </button>
          </div>
        </form>

        <Link to='/sign-up' className="registerLink">Sign Up Instead</Link>
      </div>
    </>
  );
}

export default SignUp;



