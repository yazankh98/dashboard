import axios from "axios"
import { Outlet } from "react-router-dom"
import { Link } from 'react-router-dom'
import { toast } from "react-toastify";
import './index.css'
import './layout.css'
import {
    useContext
    // , useEffect
    , useState
} from "react";
import { ThemeContext } from './context/ThemeContext'
import Swal from "sweetalert2";

const Layout = () => {


    const [theme, setTheme] = useContext(ThemeContext)
    const [menu, setmenu] = useState<boolean>(false)
    const notify = () => toast("You have been logged out successfully");
    let token: string = localStorage.getItem("token") as string
    let firstName: string = localStorage.getItem("firstName") as string
    let lastName: string = localStorage.getItem("lastName") as string
    let userName: string = localStorage.getItem("userName") as string
    let profileImage: string = localStorage.getItem("profileImage") as string
    token = JSON.parse(token)
    firstName = JSON.parse(firstName)
    lastName = JSON.parse(lastName)
    userName = JSON.parse(userName)
    profileImage = JSON.parse(profileImage)

    function logout() {
        Swal.fire({
            title: "Are you sure want Log Out?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Log Out!"
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Log Out!",
                    icon: "success"
                });
                axios.post('https://vica.website/api/logout', {}, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }).then(res => {
                    console.log(res.data);
                    localStorage.clear();
                    window.location.href = '/';
                }

                ).catch(err => {
                    if (axios.isAxiosError(err)) {
                        toast.error(err.response?.data?.message || 'An error occurred');
                    } else {
                        toast.error('An unexpected error occurred');
                    }
                })
            }
        });
    }
    return (
        <div className="h-screen">
            {/* left bar */}
            <nav className="  w-1/5 relative h-screen mobile:hidden" >

                <div className="text-center " >
                    <ul className="no-underline absolute w-full top-24 " >
                        <div className="flex items-center justify-center" >
                            <i className=" mx-2 fa-solid fa-shapes"></i>
                            <Link className="block " to={""} > product</Link>
                        </div>
                        <div className="flex items-center justify-center my-5" >
                            <i className=" mx-2  fa-regular fa-heart"></i>
                            <Link className="block  " to={""} > favourite</Link>
                        </div>
                        <div className="flex items-center justify-center my-5" >
                            <i className=" mx-2 fa-solid fa-list"></i>
                            <Link className="block" to={""} > order list</Link>
                        </div>
                    </ul>
                </div>
                <div className="text-center absolute bottom-2 w-full   " >
                    <button className="  rounded-md bg-cyan-600 w-4/5 py-1 text-white" onClick={() => {

                        logout();
                    }} > logout</button>
                </div>
            </nav>
            {/* top bar */}
            <nav className={`${theme} theme justify-between items-center  flex w-full absolute top-0  `} >
                <div >
                    <p className=" mx-2  text-3xl" ><span className="text-cyan-600 font-extrabold" >Dash</span><span className="font-extrabold">Stack</span></p>
                </div>
                <div>
                    <form className={`${theme} form theme mobile:hidden`}  >
                        <label className="border border-solid border-slate-500 bg-slate-200 rounded-2xl  " htmlFor="search"  >
                            <input required autoComplete="off" placeholder="search product" id="search" type="text" />
                            <div className="icon">
                                <svg strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="swap-on">
                                    <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" strokeLinejoin="round" strokeLinecap="round"></path>
                                </svg>
                                <svg strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="swap-off">
                                    <path d="M10 19l-7-7m0 0l7-7m-7 7h18" strokeLinejoin="round" strokeLinecap="round"></path>
                                </svg>
                            </div>
                            <button type="reset" className="close-btn">
                                <svg viewBox="0 0 20 20" className="h-5 w-5" xmlns="http://www.w3.org/2000/svg">
                                    <path clipRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" fillRule="evenodd"></path>
                                </svg>
                            </button>
                        </label>
                    </form>
                </div>
                <div className="rounded-s-full flex items-center justify-around mx-2 w-72 mobile:hidden">
                    <img className="w-12 inline mx-2" src={profileImage} alt="" />
                    <div className="inline" >
                        <span>{firstName} {lastName}</span> <br />
                        <span  >{userName}</span>
                    </div>
                    <i className="fa-solid fa-grip-lines-vertical"></i>
                    <div onClick={() => {
                        {
                            setTheme(theme === 'dark' ? 'light' : 'dark')
                        }
                    }} >
                        {theme === 'dark' ?
                            <img className="w-5" src="/images/moon.png" alt="" />
                            :
                            <img className="w-5" src="/images/sun.png" alt="" />
                        }
                    </div>
                </div>

                {/* menu for mobile */}
                <div className=" desktop:hidden mobile:block z-10 ">
                    <div onClick={() => { setmenu(!menu) }} >
                        <i className="fa-solid fa-bars mx-2 "></i>
                    </div>
                    <div style={{
                        backgroundColor: (theme === 'dark') ? "rgb(26, 36, 50)" : "",
                        display: (menu === false) ? "none" : "block"
                    }} className=" w-50vw h-70vh  bg-slate-300 fixed top-0 right-0 text-center " >
                        <div onClick={() => { setmenu(!menu) }} className="absolute top-2 left-2" >
                            <i className="fa-regular fa-circle-xmark"></i>
                        </div>
                        <br />
                        <img className="w-12 mx-auto my-2 " src={profileImage} alt="" />
                        <p>{firstName} {lastName}</p>
                        <span className="text-slate-700" >{userName}</span>
                        <nav className=" my-5 " >
                            <div className="text-center" >
                                <ul className="no-underline" >
                                    <div className="flex items-center justify-center" >
                                        <i className=" mx-2 fa-solid fa-shapes"></i>
                                        <Link className="block " to={""} > product</Link>
                                    </div>
                                    <div className="flex items-center justify-center my-5" >
                                        <i className=" mx-2  fa-regular fa-heart"></i>
                                        <Link className="block  " to={""} > favourite</Link>
                                    </div>
                                    <div className="flex items-center justify-center my-5" >
                                        <i className=" mx-2 fa-solid fa-list"></i>
                                        <Link className="block" to={""} > order list</Link>
                                    </div>
                                </ul>
                            </div>
                            <div className="text-center bottom-5 w-full " >
                                <button className="  rounded-md bg-cyan-600 w-4/5 py-1 text-white" onClick={() => {
                                    logout();
                                    notify();
                                }} > logout</button>
                            </div>
                            <form className={`${theme} form theme my-2 mx-auto`}  >
                                <label className="border border-solid border-slate-500 bg-slate-200 rounded-2xl  " htmlFor="search"  >
                                    <input required autoComplete="off" placeholder="search product" id="search" type="text" />
                                    <div className="icon">
                                        <svg strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="swap-on">
                                            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" strokeLinejoin="round" strokeLinecap="round"></path>
                                        </svg>
                                        <svg strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="swap-off">
                                            <path d="M10 19l-7-7m0 0l7-7m-7 7h18" strokeLinejoin="round" strokeLinecap="round"></path>
                                        </svg>
                                    </div>
                                    <button type="reset" className="close-btn">
                                        <svg viewBox="0 0 20 20" className="h-5 w-5" xmlns="http://www.w3.org/2000/svg">
                                            <path clipRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" fillRule="evenodd"></path>
                                        </svg>
                                    </button>
                                </label>
                            </form>
                        </nav>
                        <div onClick={() => {
                            {
                                setTheme(theme === 'dark' ? 'light' : 'dark')
                            }
                        }} >
                            {theme === 'dark' ?
                                <img className="w-5 mx-auto my-3" src="/images/moon.png" alt="" />
                                :
                                <img className="w-5 mx-auto my-3" src="/images/sun.png" alt="" />
                            }
                        </div>
                    </div>
                </div>
            </nav>
            <Outlet />
        </div>
    )
}

export default Layout