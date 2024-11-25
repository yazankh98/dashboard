import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify";


const Register = () => {
    const [firstName, setfirstName] = useState("")
    const [lastName, setlastName] = useState("")
    const [userName, setuserName] = useState("")
    const [email, setemail] = useState("")
    const [password, setpassword] = useState<string | number>(0)
    const [passwordConfirm, setpasswordConfirm] = useState<string | number>(0)
    const [file, setfile] = useState<File | null>(null)
    const notify = () => toast.done("Created you account successfully");
    const nevigate = useNavigate();
    const [Image, setImage] = useState<string | null>(null)
    function goToLogin() {
        nevigate('/');
    };
    function singup(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        axios.post(' https://vica.website/api/register', {
            'first_name': firstName,
            'last_name': lastName,
            'user_name': userName,
            'email': email,
            'password': password,
            'password_confirmation': passwordConfirm,
            "profile_image": file
        }, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }

        ).then(res => {
            localStorage.setItem("token", JSON.stringify(res.data.data.token)),
            localStorage.setItem("firstName", JSON.stringify(firstName));
            localStorage.setItem("lastName", JSON.stringify(lastName));
            localStorage.setItem("userName", JSON.stringify(userName));
            localStorage.setItem("profileImage", JSON.stringify(file));

            console.log(res);
            localStorage.removeItem('uploadedImage')
            window.location.href = '/layout/home';
        }).catch(err => {
            if (axios.isAxiosError(err)) {
                toast.error(err.response?.data?.message || 'An error occurred');
            } else {
                toast.error('An unexpected error occurred');
            }
        })
    }

    return (
        <div>
            <img className="w-screen h-lvh" src="/images/bk.jpg" alt="" />
            <form onSubmit={(event) => { singup(event) }} >
                <div className="lg:w-4/6 flex flex-col w-11/12 mobile:w-3/4 position: fixed top-1/2 left-1/2  -translate-y-2/4 rounded-xl -translate-x-2/4 bg-gray-50">
                    <div className="mx-5%" >
                        <div className="m-3" >
                            <h1 className="text-3xl text-center  ">Create An Account</h1>
                            <p className="text-xs m-2 text-slate-600 text-center " >create an account to continue</p>
                        </div>
                        <div className="flex justify-between mobile:flex-col mobile:text-center w-11/12 m-auto" >
                            <div>
                                <label htmlFor="first_name">First Name :</label> <br />
                                <input
                                    onChange={(event) => { setfirstName(event.target.value) }}
                                    className=" px-1.5 rounded-md bg-slate-200 mobile:w-3/6  border-slate-300  border-solid border-2"
                                    type="text" name="first_name" id="first_name" placeholder="First Name" />
                            </div>
                            <div>
                                <label htmlFor="last_name">Last Name :</label> <br />
                                <input
                                    onChange={(event) => { setlastName(event.target.value) }}
                                    className=" px-1.5 rounded-md bg-slate-200 mobile:w-3/6  border-slate-300  border-solid border-2"
                                    type="text" name="last_name" id="last_name" placeholder="Last Name" />
                            </div>
                            <div>
                                <label htmlFor="user_name">User Name :</label> <br />
                                <input
                                    onChange={(event) => { setuserName(event.target.value) }}
                                    className=" px-1.5 rounded-md bg-slate-200 mobile:w-3/6  border-slate-300  border-solid border-2"
                                    type="text" name="user_name" id="user_name" placeholder="User Name" />
                            </div>
                        </div>
                        <div className="py-6 m-auto w-11/12 " >
                            <label htmlFor="email">Email address:</label> <br />
                            <input
                                onChange={(event) => { setemail(event.target.value) }}
                                className="w-full px-1.5 rounded-md bg-slate-200  border-slate-300  border-solid border-2"
                                type="email" name="email" id="email" placeholder="example@gmail.com" />
                        </div>
                        <div className="flex m-auto w-11/12 ">
                            <div className="w-3/6" >
                                <label htmlFor="password">password :</label> <br />
                                <input
                                    onChange={(event) => { setpassword(event.target.value) }}
                                    className="w-3/4 px-1.5 rounded-md bg-slate-200  border-slate-300  border-solid border-2"
                                    type="password" name="password" id="password" placeholder="password" />
                            </div>
                            <div className="w-3/6" >
                                <label htmlFor="password_confirmation"> corfim password :</label> <br />
                                <input

                                    onChange={(event) => { setpasswordConfirm(event.target.value) }}
                                    className="w-full px-1.5 rounded-md bg-slate-200  border-slate-300  border-solid border-2"
                                    type="password" name="password_confirmation" id="password_confirmation" placeholder="password confirmation" />
                            </div>
                        </div>
                    </div>
                    <div className="mx-5% my-1.5 mx-5vw" >

                        {file === null ?
                            <label htmlFor="profile_image">profile picture : <br />
                                <img className="w-12 mx-4 " src="/images/user.png" alt="" />
                            </label>
                            :
                            Image && <img src={Image} alt="Uploaded Preview" className="w-1/3 min-w-20% mx-4" />
                        }
                        <input
                            onChange={(event) => {
                                const file = event.target.files?.[0];
                                if (file) {
                                    setfile(file);
                                    const reader = new FileReader();
                                    reader.onload = () => {
                                        const base64Image = reader.result as string;
                                        setImage(base64Image);

                                        localStorage.setItem('uploadedImage', base64Image);
                                    };
                                    reader.readAsDataURL(file);
                                }
                            }}
                            className="hidden" id="profile_image" name="profile_image" type="file" />
                    </div>
                    <div className="text-center" >
                        <button className="rounded-md bg-cyan-600 w-1/3 py-1 text-white" onClick={notify} type="submit">Sing Up</button> <br />
                        <span>Already have an account? <br />
                            <button className="text-cyan-600 my-3 " onClick={goToLogin} ><u>LogIn</u></button>
                        </span>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Register