import './LogIn.scss'
import { useState } from 'react'
import {useNavigate } from 'react-router-dom'

const account = [{username: 'admin', password: '123'}]

interface IProps {
    setIsLogIn: React.Dispatch<React.SetStateAction<boolean>>
}

function LogIn({setIsLogIn}: IProps) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const handleSubmit = (e : React.MouseEvent<HTMLButtonElement, MouseEvent>) : void => {
        e.preventDefault()

        account.some((a) => {
            if(a.username === username && a.password === password){
                setIsLogIn(true)
                navigate('./product')
                alert('Log in succesful')
            }
            else
                alert('Log in fail')
        })
    }

    return ( 
        <div className='log-in-wrapper'>
            <form className='log-in-form'>
                <div className='account-wrapper'>
                    <h2 className='log-in-title'>LOG IN</h2>
                    <label className='log-in-label'>User name: </label>
                    <input className='log-in-input' type='text' value={username} onChange={(e) => setUsername(e.target.value)} /> <br />
                    <label className='log-in-label'>Password: </label>
                    <input className='log-in-input' type='text' value={password} onChange={(e) => setPassword(e.target.value)} /> <br />
                    <button className='log-in-btn' onClick={(e) => handleSubmit(e)}>Submit</button>
                </div>
            </form>
        </div>
     );
}

export default LogIn;