import { useRef,  useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

const Login_page = (props) => {
  const emailRef = useRef();
  const passwordRef = useRef();
  let navigate = useNavigate();
  let navigateWel = useNavigate();
  let navForgot = useNavigate();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogIn = async (e) => {
    e.preventDefault();
    setError("");
    // console.log("inside async")
    try {
      await signInWithEmailAndPassword(auth, props.email, password);
      console.log("user logged in ", props.email);
      navigateWel("/welcome");
    } catch (err) {
      // console.log("login error ide")
      setError(err.message);
    }
  };
  
  return (
    <div>
      <div>
        <img
          className="absolute w-[100vw] object-cover h-[100vh] opacity-80 top-0 -z-10"
          src="https://firebasestorage.googleapis.com/v0/b/disney-clone-1-16344.appspot.com/o/images%2Fhome-background.png?alt=media&token=7dd411c3-6d99-4b84-9c1a-2da33ef9e4b6"
        />
      </div>
      <div className="bg-slate-50 w-[50vw] min-w-[350px] mx-auto max-w-[800px] rounded-md p-6 my-[20vh]">
        <div className="text-red-600 ">{error}</div>
        <div className="text-2xl">Log-In</div>
        <div className="flex flex-col">
          <div className="flex flex-col items-start py-2">
            <div>Email</div>
            <div>
              <input
                className="border-2 min-w-[300px] bg-slate-50 w-[45vw] m-auto max-w-[750px]"
                type="email"
                ref={emailRef}
                id="email"
                onChange={(e) => props.setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-col items-start py-2">
            <div>Password</div>
            <div>
              <input
                className="border-2 min-w-[300px] bg-slate-50 w-[45vw] m-auto max-w-[750px]"
                type="password"
                ref={passwordRef}
                id="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="bg-yellow-200  flex flex-col justify-center items-center py-2 mt-3 hover:bg-yellow-300 m-auto  min-w-[300px] w-[45vw] max-w-[750px]">
            <button onClick={handleLogIn}>Log in</button>
          </div>
          <div
            onClick={() => {
              navigate("/signin");
            }}
            className="pt-5 underline text-sm hover:text-slate-500"
          >
            <button>Don't have an account?</button>
          </div>
        </div>
        <div
          className="pt-2 underline text-sm hover:text-slate-500"
          onClick={() => {
            navForgot("/forgot-password");
          }}
        >
          <button>Forgot Password?</button>
        </div>
      </div>
    </div>
  );
};

export default Login_page;