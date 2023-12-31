import { BsTelegram } from 'react-icons/bs'
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { Link, redirect, useNavigate, useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';
import axiosClient from "../../Api/AxiosClient";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './Signup.css';
import { url } from 'inspector';

type UserSignupProp = {
  first_name: string;
  last_name: string;
  password: string;
  username: string;
  email: string;
  isActive: boolean
};

export default function CountrySelect() {
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();

  useEffect(() => {
    const postData = async (provider: string) => {
      try {
        let res = await axiosClient.post(`api/user/auth/${provider}/callback/`, { 
          'url': decodeURIComponent(window.location.href)
        })

        localStorage.setItem('user', JSON.stringify(data));
        localStorage.setItem('accessToken', JSON.stringify(res?.data?.access));

        toast.dismiss();
        setTimeout(() => {
        toast.success('Signup successful. Redirecting...', {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2500,
          hideProgressBar: true,
          pauseOnHover: true,
          closeOnClick: false,
          theme: "dark",
        })}, 500);

        setTimeout(() => {
          navigate('/');
        }, 1500);
      } catch (error: any) {
        let errorMessage = 'Something went wrong??'
        if (error.response.status === 403) {
          errorMessage = `Error occur when authenticate your ${provider} account`
        } else if (error.response.status === 400) {
          errorMessage = error.response.data.message
        }
        toast.dismiss();
        toast.error(errorMessage , {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2500,
          hideProgressBar: true,
          pauseOnHover: true,
          closeOnClick: false,
          theme: "dark",
        });
      }
    }
    if (params.get('scope')) {
      postData('google')
    } else if (params.get('code')) {
      postData('facebook')
    }
  }, [params])


  const [data, setData] = useState<UserSignupProp>({
    first_name: "",
    last_name: "",
    password: "",
    username: "",
    email: "",
    isActive: true
  });

  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setLoading(true);

    if (data.password !== confirmPassword) {
      toast.dismiss();
      toast.error("Password and Confirm Password do not match!", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2500,
        hideProgressBar: true,
        pauseOnHover: true,
        closeOnClick: false,
        theme: "dark",
      });
      setLoading(false);
      return;
    }

    const formData = {
      first_name: (event.target as any).firstname.value,
      last_name: (event.target as any).lastname.value,
      password: (event.target as any).password.value,
      username: (event.target as any).username.value,
      email: (event.target as any).email.value,
      isActive: true
    };

    try {
      toast.dismiss();
      toast.info("Signing up, please wait...", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: false, // Do not auto close during loading
        hideProgressBar: true,
        pauseOnHover: true,
        closeOnClick: false,
        theme: "dark",
      });

      const response = await axios.post('http://112.137.129.158:5002/api/user/signup/', formData);

      if (response.status === 200) {
        toast.dismiss();
        setTimeout(() => {
          toast.success("Signup successful. Redirecting...", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2500,
            hideProgressBar: true,
            pauseOnHover: true,
            closeOnClick: false,
            theme: "dark",
          });
        }, 500);

        setTimeout(() => {
          navigate(`/redirect`);
        }, 2500);
      } else {
        toast.dismiss();
        toast.error("Username or Email already taken", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2500,
          hideProgressBar: true,
          pauseOnHover: true,
          closeOnClick: false,
          theme: "dark",
        });
      }
    } catch (error) {
      toast.dismiss();
      toast.error("Error sending data!", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2500,
        hideProgressBar: true,
        pauseOnHover: true,
        closeOnClick: false,
        theme: "dark",
      });
      console.error("Error sending data:", error);
    } finally {
      setLoading(false);
    }
  };

  const signupWithGoogle = async () => {
    let res: string = await axiosClient.get('/api/user/auth/google/')
    window.location.replace(res)
  }

  const signupWithFacebook = async () => {
    let res: string = await axiosClient.get('/api/user/auth/facebook/')
    window.location.replace(res)
  }

  return (
    <section className="signup-form-container">
      <ToastContainer />
      <div className="logo-icon-container">
        <BsTelegram size={150} style={{ color: "var(--icon-color-active)" }} />
      </div>
      <h4>Signup Form</h4>
      <form action="" className="signup-contents" onSubmit={handleSubmit}>
        <div className="inputBox">
          <input
            id="firstname"
            name="first_name"
            value={data.first_name}
            onChange={handleChange}
            type="text"
            required
          />
          <span>First Name</span>
        </div>
        <div className="inputBox">
          <input
            id="lastname"
            name="last_name"
            value={data.last_name}
            onChange={handleChange}
            type="text"
            required
          />
          <span>Last Name</span>
        </div>
        <div className="inputBox">
          <input id="phone" name="phone" type="text" required />
          <span>Phone Number</span>
        </div>
        <div className="inputBox">
          <input
            id="email"
            name="email"
            value={data.email}
            onChange={handleChange}
            type="email"
            required
          />
          <span>Email</span>
        </div>
        <div className="inputBox">
          <input
            id="username"
            name="username"
            value={data.username}
            onChange={handleChange}
            type="text"
            required
          />
          <span>User Name</span>
        </div>
        <div className="inputBox">
          <input
            id="password"
            name="password"
            value={data.password}
            onChange={handleChange}
            type="password"
            required
          />
          <span>Password</span>
        </div>
        <div className="inputBox">
          <input
            id="cfpassword"
            name="cfpassword"
            type="password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            required
          />
          <span>Confirm Password</span>
        </div>
        <button className="signup-btn" type="submit" disabled={loading}>
          Submit
        </button>
      </form>
      
      <span>Already have an account? <Link to="/signin">Signin</Link></span>

      <span className='oauth2'>
        <FcGoogle size={50} style={{color: "var(--icon-color-active)"}} onClick={signupWithGoogle}/>
        <FaFacebook size={50} style={{color: "var(--icon-color-active)"}} onClick={signupWithFacebook}/>
      </span>      
    </section>
  );
}