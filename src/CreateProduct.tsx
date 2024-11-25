import { useContext, useState } from 'react'
import { ThemeContext } from './context/ThemeContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const CreateProduct = () => {
    const [theme, setTheme] = useContext(ThemeContext)
    const [name, setname] = useState<string>()
    const [price, setprice] = useState<number | string>(0)
    const [file, setfile] = useState<File | null>(null)
    const [Image, setImage] = useState<string | null>(null)
    let token: string = localStorage.getItem("token") as string
    token = JSON.parse(token)
    function A() {
        setTheme("dark")
    }
    function createItem(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        axios.post('https://vica.website/api/items', {
            'name': name,
            'price': price,
            'image': file
        }, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`,
            }
        }).then(res => {
            console.log(res);
            window.location.href = '/layout/Home';
        }

        ).catch(err => {
            if (axios.isAxiosError(err)) {
                toast.error(err.response?.data?.message || 'An error occurred');
            } else {
                toast.error('An unexpected error occurred');
            }
        })
    }

    return (
        <div style={{ backgroundColor: (theme === 'dark') ? "rgb(26, 36, 50)" : "", }} className={` theme bg-maincolor fixed w-80vw  h-90vh top-10vh left-20% mobile:left-0 mobile:w-full`} >
            <div className=" w-11/12 my-6 mx-auto ">
            <button className='hidden' onClick={A} ></button>
                <h1 className="text-2xl" >Create product</h1>
                <form className='flex justify-between' onSubmit={(event) => { createItem(event) }}>
                    <div className='w-1/2'>
                        <div className='my-5' >
                            <label htmlFor="productName" >product Name:</label> <br /> <br />
                            <input onChange={(event) => { setname(event.target.value) }} className='rounded-sl w-4/5 px-2' type="text" name="name" id="productName" placeholder='Enter Product Name' />
                        </div>
                        <div className='my-5' >
                            <label htmlFor="productPrice" >product Price:</label> <br /> <br />
                            <input onChange={(event) => { setprice(event.target.value) }} className='rounded-sl w-4/5 px-2' type="text" name="price" id="productPrice" placeholder='Enter Product Price' />
                        </div>

                        <button type='submit' className="  rounded-md bg-cyan-600 w-4/5 py-1 text-white"  > Create</button>
                    </div>
                    <div className="border-2 border-dashed border-priceColor rounded-md text-center w-2/4" >
                        {file === null ?
                            <label htmlFor="item_image"> <br />
                                <i className="fa-solid w-1/2 h-1/2 fa-upload text-priceColor my-3"></i>
                            </label>
                            :
                            Image && <img src={Image} alt="Uploaded Preview" className="w-11/12 m-auto min-w-20% mx-4" />
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

                                        localStorage.setItem('item_image', base64Image);
                                    };
                                    reader.readAsDataURL(file);
                                }
                            }}
                            className="hidden" id="item_image" name="image" type="file" />
                        <p>Upload Product Image</p>
                    </div>
                </form>
            </div>
        </div >

    )
}

export default CreateProduct