import React from 'react'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { MdAddCircle } from 'react-icons/md'
import { MoonLoader } from 'react-spinners';
import { updateProfile } from '../apis';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { setUserInfo } from '../facilities/userSlice';
import { Link } from 'react-router-dom';

const UserAccount = () => {

    const dispatch = useDispatch();

    const { userInfo } = useSelector((state) => state.user)
    const [loading, setLoading] = useState(false)

    const [avatar, setAvatar] = useState({
        url: `${import.meta.env.VITE_URL}/images/${userInfo.avatar}`,
        image: ''
    })

    const handleAvatar = async (e) => {
        setLoading(true);
        setAvatar({ url: URL.createObjectURL(e.target.files[0]), image: e.target.files[0] });
        await new Promise((resolve) => setTimeout(resolve, 500))
        setLoading(false);
    }

    const [user, setUser] = useState({
        name: userInfo.name,
        email: userInfo.email,
        joinedOn: userInfo.createdAt,
    });
    const options = { year: 'numeric', month: 'long', day: 'numeric' };

    const [isClick, setIsClick] = useState(false);

    const handleUpdate = async () => {
        setIsClick(!isClick);
        console.log(user);
        console.log(avatar)
        try {
            const formData = new FormData();
            formData.append('json', JSON.stringify(user));
            formData.append('avatar', avatar.image)
            const { data } = await axios.put(updateProfile(), formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                withCredentials: true
            })
            toast.success(data.message);
            console.log(data.user)
            dispatch(setUserInfo(data.user))
        } catch (error) {
            // toast.error(error.response.data.message)
            console.log(error)
        }
    }

    const handleBack = () => {
        setIsClick(!isClick);
        setUser({
            name: userInfo.name,
            email: userInfo.email,
            joinedOn: userInfo.createdAt,
        })
        setAvatar({
            url: `${import.meta.env.VITE_URL}/images/${userInfo.avatar}`,
            image: ''
        })
    }

    return (
        <div className='grid grid-cols-3'>
            {/* left grid  */}
            <div className='col-span-3 md:col-span-1 px-5 py-10 bg-yellow-300'>
                <div className='text-2xl font-semibold text-slate-600'>
                    My Account
                </div>
                <div className='flex flex-col items-center py-10 '>
                    <div className={`${isClick ? 'hidden' : 'block'} `}>
                        <img className='rounded-full w-40 h-40 object-cover outline-double outline-offset-2 outline-slate-500 outline-8'
                            src={avatar.url} />
                    </div>
                    <div className={`${isClick ? 'block' : 'hidden'}`}>
                        <label htmlFor="avatar">
                            <div className='w-fit rounded-full outline-double outline-offset-2 outline-slate-500 outline-8 relative'>
                                {
                                    loading ? <MoonLoader
                                        color="black"
                                        size='30px'
                                    /> : <>
                                        <img className='rounded-full w-40 h-40 object-cover cursor-pointer'
                                            src={avatar.url} />
                                        <div className='absolute top-[110px] right-[-5px] z-10 text-blue-950 cursor-pointer'>
                                            <MdAddCircle size={40} />
                                        </div>
                                    </>
                                }
                            </div>
                            <input
                                type="file"
                                id='avatar'
                                onChange={handleAvatar}
                            />
                        </label>
                    </div>
                </div>
                <div className='flex justify-center'>
                    <button className={`${isClick ? 'hidden' : 'block'} bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-2 px-4 rounded-none shadow-lg hover:shadow-xl transition-transform duration-100 hover:scale-105`}
                        onClick={() => setIsClick(!isClick)}>
                        Update Profile
                    </button>
                    <div className='flex'>
                        <button className={`${isClick ? 'block' : 'hidden'} bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-2 px-4 rounded-none shadow-lg hover:shadow-xl transition-transform duration-100 hover:scale-105 mr-2`}
                            onClick={handleUpdate}>
                            Save Changes
                        </button>
                        <button className={`${isClick ? 'block' : 'hidden'} bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-2 px-4 rounded-none shadow-lg hover:shadow-xl transition-transform duration-100 hover:scale-105 ml-2`}
                            onClick={handleBack}>
                            Back
                        </button>
                    </div>
                </div>
            </div>
            {/* left grid ends here  */}
            {/* right grid  */}
            <div className='col-span-3 md:col-span-2 px-5 py-10 bg-green-300'>
                <div className='mb-5'>
                    <div className='font-semibold text-xl text-slate-600'>
                        Full name
                    </div>
                    <div className={`${isClick ? 'hidden' : 'block'}`}>
                        {user.name}
                    </div>
                    <div className={`${isClick ? 'block' : 'hidden'}`}>
                        <input
                            type="text"
                            value={user.name}
                            onChange={(e) => setUser({ ...user, name: e.target.value })} />
                    </div>
                </div>
                <div className='mb-5'>
                    <div className='font-semibold text-xl text-slate-600'>
                        Email
                    </div>
                    <div className={`${isClick ? 'hidden' : 'block'}`}>
                        {user.email}
                    </div>
                    <div className={`${isClick ? 'block' : 'hidden'}`}>
                        <input
                            type="text"
                            value={user.email}
                            onChange={(e) => setUser({ ...user, email: e.target.value })} />
                    </div>
                </div>
                <div className='mb-5'>
                    <div className='font-semibold text-xl text-slate-600'>
                        Joined on
                    </div>
                    <div>
                        {new Date(user.joinedOn).toLocaleDateString('en-US', options)}
                    </div>
                </div>
                <div className='mb-5 flex justify-center md:block'>
                    <Link to={'/cart'}>
                        <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-2 px-32 rounded-none shadow-lg hover:shadow-xl transition-transform duration-300 hover:scale-105">
                            My Orders
                        </button>
                    </Link>
                </div>
            </div>
            {/* right grid ends here  */}
        </div>
    )
}

export default UserAccount