import axios from "axios"
import { useContext, useEffect, useState } from "react"
import Swal from 'sweetalert2'
import { ThemeContext } from './context/ThemeContext'
import { useNavigate } from "react-router-dom"


const Home = () => {
    const [theme, setTheme] = useContext(ThemeContext)
    const navigate = useNavigate();
    function goToCreateProduct() {
        navigate('/layout/Create');
    };
    let token: string = localStorage.getItem("token") as string
    token = JSON.parse(token)
    const [data, setdata] = useState<any[]>([]);


    useEffect(() => {
        axios.get("https://vica.website/api/items",
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }
        ).then(res => {
            setdata(res.data)
        })
    }, [])
    function EditeProduct(id: number) {
        localStorage.setItem('item_Id', JSON.stringify(id));
        navigate('/layout/Edite');
    }
    const deleteItem = (id: number) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });
                axios.delete(`https://vica.website/api/items/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }).then(() => { window.location.href = "/layout/home" })
            }
        });
    };
    function A() {
        setTheme("dark")
    }
    return (
        <div style={{ backgroundColor: (theme === 'dark') ? "rgb(26, 36, 50)" : "", }} className={` theme h-90% bg-maincolor absolute w-77vw top-10% left-20% mobile:left-0 mobile:w-full`} >
            <div className="flex w-75vw justify-between my-6 mx-auto ">
                <h1 className="text-2xl" >All products</h1>
                <button onClick={goToCreateProduct} className="mobile:min-w-43vw  rounded-md bg-cyan-600 py-1  px-2 text-white" > <i className="fa-solid mx-1 fa-plus"></i> Create Prouduct</button>
            </div>
            <div className="flex flex-wrap justify-around mobile:flex-col mx-auto" >
                {data.map((item, index) => {
                    return (
                        <div key={index} className={`${theme} w-1/4 theme  bg-white h-max pb-3 m-4 rounded-md mobile:w-11/12 `} >
                            <div >
                                <img className=" object-cover h-20vh  w-full " src={item.image_url} alt="" />
                            </div>
                            <button className='hidden' onClick={A} ></button>
                            <b className="mx-2 my-5"  > {item.name}</b>
                            <p className="mx-2 my-5 text-priceColor "  > ${item.price}</p>
                            <div className="flex justify-between mx-2" >
                                <button onClick={() => { EditeProduct(item.id) }} className="bg-slate-500 px-2 rounded-3xl" >edite product</button>
                                <div onClick={() => { deleteItem(item.id) }} >
                                    <i className="fa-solid fa-trash"></i>
                                </div>
                            </div>
                        </div>
                    )
                })
                }
            </div>
        </div >
    )
}

export default Home