import { useNavigate } from "react-router-dom";
import Logo from "../Logo/Logo";
import upload from './../../assets/images/Add/Upload.png'
import logo from './../../assets/images/login/logo.png';
import { useRef, useState } from "react";
import axios from "axios";
import Account from "../Account/Account";
import './Logup.css'

export default function Logup() {
  const[firstName,setFirstName]=useState<string>('')
  const[lastName,setLastName]=useState<string>('')
  const[email,setEmail]=useState<string>('')
  const[password,setPassword]=useState<string>('')
  const[rePassword,setRePassword]=useState<string>('')
  const [image,setimage] =useState<File | null>(null)
  const navigate =useNavigate()
  const sent =(event: React.FormEvent) =>{
    event.preventDefault()
    axios.post('https://test1.focal-x.com/api/register',
      {
        first_name: firstName,
        last_name: lastName,
        user_name :firstName+'_'+lastName,
        email :email,
        password :password,
        password_confirmation: rePassword,
        profile_image: image,
      },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      }
    )
      .then(res =>{ localStorage.setItem('token', `Bearer ${res.data.data.token}`)
      localStorage.setItem('img', `${res.data.data.user.profile_image_url}`)
      localStorage.setItem('name', `${res.data.data.user.user_name}`)
      navigate('/Read')
         })
      .catch(error => console.log(error))
  }
  const fileInputRef = useRef<HTMLInputElement | null>(null);
    const handleIconClick = () => {
      if (fileInputRef.current) {
        fileInputRef.current.click(); 
      }
    };
  return (
    <div className="lk-login">
    <div className="lk-father logup-p">
     <Logo logo={logo} title="SIGN UP" par="Fill in the following fields to create an account."/>
     <form className="lk-login-form log-p" onSubmit={(event)=> sent(event)}>
     <label className="lk-login-lable1">Name</label>
     <div className="lk-father-input">
     <input className="lk-logup-input" type="text" placeholder="First Name" 
      onChange={(event)=> setFirstName(event.target.value)}/>
     <input className="lk-logup-input" type="text" placeholder="Last Name" 
      onChange={(event)=> setLastName(event.target.value)}/>
     </div>
     <label className="lk-login-lable1">Email</label>
     <input className="lk-logup-email" type="email" placeholder="Enter your Email"
     onChange={(event)=> setEmail(event.target.value)}/>
     <label className="lk-login-lable2">Pssword</label>
     <div className="lk-father-input">
     <input className="lk-logup-input" type="password" placeholder="Enter password"
      onChange={(event)=> setPassword(event.target.value)}/>
     <input className="lk-logup-input" type="password" placeholder="Re-enter your password"  
     onChange={(event)=> setRePassword(event.target.value)}/>
     </div>
     <label className="lk-login-lable1 lk-mb2">Profile Image</label>
     <div className="lk-logup-F-input-file" onClick={handleIconClick}>
     {image ? <img className="lk-logup-ch-img" src={URL.createObjectURL(image)} />
    : <img className="lk-logup-F-img" src={upload} />}
     <input className="lk-add-input-file" ref={fileInputRef} accept="image/*" type="file"
      onChange={(event )=> setimage(event.target.files![0])} />
     </div>
     <input className="lk-login-send" type="submit" value='SIGN IN'/>
     </form>
     <Account href={'/'} par='Sign in'/>
    </div>
 </div>
  )
}
