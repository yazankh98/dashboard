
import axios from "axios";
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';



const Login = () => {

    const navigate = useNavigate();
    function goToRegister() {
        navigate('/register');
    };
    const [email, setemail] = useState<string>("");
    const [password, setpassword] = useState<number | string>(0)
    function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        axios.post('https:vica.website/api/login', {
            'email': email,
            'password': password
        }).then(res => {
            toast.success("You have been logged in successfully", {
                onClose: () => {
                    window.location.href = '/layout/Home';
                },
            })
            localStorage.setItem("firstName", JSON.stringify(res.data.user.first_name));
            localStorage.setItem("lastName", JSON.stringify(res.data.user.last_name));
            localStorage.setItem("userName", JSON.stringify(res.data.user.user_name));
            localStorage.setItem("profileImage", JSON.stringify(res.data.user.profile_image_url));
            localStorage.setItem("token", JSON.stringify(res.data.token));


        }).catch(err => {
            if (axios.isAxiosError(err)) {
                toast.error(err.response?.data?.message || 'Email Or Password incorrect');
            } else {
                toast.error('Email Or Password incorrect');
            }
        });
    }




    return (
        <>
            <img className="w-screen h-lvh" src="/images/bk.jpg" alt="" />
            <form onSubmit={(event) => { onSubmit(event) }} >
                <div className=" flex flex-col justify-around w-1/3 mobile:w-3/4 h-96 position: fixed top-1/2 left-1/2  -translate-y-2/4 rounded-xl -translate-x-2/4 bg-gray-50">
                    <div className="m-3" >
                        <h1 className="text-3xl text-center  ">Login to Account</h1>
                        <p className="text-xs m-2 text-slate-600 text-center " >please enter your email and password to continue</p>
                        <label className="mt-3.5" htmlFor="email">Email address :</label> <br />
                        <input onChange={(event) => { setemail(event.target.value) }}
                            className=" mb-3.5 rounded-md bg-slate-200 w-11/12 border-slate-300  border-solid border-2"
                            type="email" name="email" id="email" placeholder="example@gmail.com" /> <br />
                        <label htmlFor="password">password :</label> <br />
                        <input onChange={(event) => { setpassword(event.target.value) }}
                            className="bg-slate-200 rounded-md w-11/12 border-slate-300 border-solid border-2"
                            type="password" name="password" id="password" placeholder="******" /> <br />
                    </div>
                    <div className="text-center" >
                        <button className="rounded-md bg-cyan-600 w-4/5 py-1 text-white" type="submit">Log In</button> <br />
                        <span>Don't have an account? <br />
                            <button className="text-cyan-600" onClick={goToRegister} ><u>Create Account</u></button>
                        </span>
                    </div>
                </div>
            </form>
        </>
    )
}

export default Login