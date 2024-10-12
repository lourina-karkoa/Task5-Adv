import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import './Login.css'
import logo from './../../assets/images/login/logo.png'
import Logo from "../Logo/Logo"
import Account from "../Account/Account"
export default function Login() {
  const[email,setEmail]=useState<string>('')
  const[password,setPassword]=useState<string>('')
  const navigate =useNavigate()
  
  const sent =(event: React.FormEvent) : void=>{
    event.preventDefault()
    axios.post('https://test1.focal-x.com/api/login',
      {
        email :email,
        password :password,
      })
      .then(res =>{ localStorage.setItem('token', `Bearer ${res.data.token}`)
      localStorage.setItem('img', `${res.data.user.profile_image_url}`)
      localStorage.setItem('name', `${res.data.user.user_name}`)
      navigate('/Products/Read')
         })
      .catch(error => console.log(error))
  }
  
  return (
    <div className="lk-login">
       <div className="lk-father login-p">
        <Logo logo={logo} title="SIGN IN" par="Enter your credentials to access your account"/>
        <form className="lk-login-form" onSubmit={(event)=> sent(event)}>
        <label className="lk-login-lable1">Email</label>
        <input className="lk-login-input" type="email" placeholder="Enter your Email" onChange={(event)=> setEmail(event.target.value)}/>
        <label className="lk-login-lable2">Pssword</label>
        <input className="lk-login-input" type="password" placeholder="Enter your password"  onChange={(event)=> setPassword(event.target.value)}/>
        <input className="lk-login-send" type="submit" value='SIGN IN'/>
      </form>
      <Account href="/Logup" par="Create one"/>
       </div>
    </div>
  )
}
