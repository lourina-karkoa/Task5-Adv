import axios from "axios"
import { useNavigate } from "react-router-dom"
import './Logout.css'

export default function Logout({text}:{text:string}) {
  const  navigate=useNavigate()
  function handleLogout() {
    axios.post('https://test1.focal-x.com/api/logout',
      {},
        {headers:{
            Authorization:localStorage.getItem('token')
          }}
    )
    .then(res => {console.log(res),
      navigate('/')
    })
   .catch(error => console.log(error)
   )
    
}
  return (
    <button className="lk-logout" onClick={()=> handleLogout()}>
        <p className="lk-logout-par">{text}</p>
        <i className="fa-solid fa-right-from-bracket"></i>
    </button>
  )
}
