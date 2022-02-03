import React, {useState} from 'react';
import axios from "axios";
import {API_BASE_URL} from "../config";
import {FaCheckCircle} from "react-icons/fa";
const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword ]= useState('')
    const [isDisabled, setDisabled] = useState(false)

    const handleSubmit = async () =>{
        setDisabled(true)
        await axios
            .post(`${API_BASE_URL}/api/login`,{username:username,password:password})
            .then(
                (res) => {
                    console.log(res)
                },(error)=>{
                    alert('Une erreur s\'est produite !')
                    console.log(error)
                }
            )
            .then(res => setDisabled(false))
    }
    const handleChange = (e,setter) => {
        let value = e.target.value
        setter(value)
        if (value.length === 0)
            setDisabled(true)
        else
            setDisabled(false)
    }

    return (<>
        <h2>LOGIN</h2>
        <div>
            <form onSubmit={handleSubmit} className={'max'}>
                <input
                    type={'text'}
                    name={'username'}
                    placeholder={'Username'}
                    value={username}
                    onChange={e => handleChange(e,setUsername)}
                />
                <input
                    type={'password'}
                    name={'password'}
                    placeholder={'Password'}
                    value={password}
                    onChange={e => handleChange(e,setPassword)}
                />

                <div className={'btnContainer'}>
                    <FaCheckCircle size={30} className={'doneBtn'} type={'submit'}  disabled={isDisabled} onClick={handleSubmit}/>
                </div>
            </form>
        </div>
    </>)
}

export default Login;