import { NavLink } from "react-router-dom";
import {img,dataSidePar} from './../../data/DataSidePar/DataSidePar'
import './SidePar.css'
import Logout from "../Logout/Logout";

interface dataSidePar2{
    path:string,
    title:string,
    icon:string
}

export default function SidePar() {
  const imge:string=localStorage.getItem('img') || '';
  const name:string=localStorage.getItem('name') || ''; 
  return (
    <div className="lk-sidepar">
    <img className="lk-side-logo" src={img} />
    <div className="lk-sidpar-profile">
    <img className="lk-side-profile-img" src={imge} />
    <h2 className="lk-side-h2">{name}</h2>
    </div>
    <div className="lk-side-links">
      {dataSidePar.map((item:dataSidePar2, index:number) => {
        return (
            <NavLink 
              key={index}
              to={item.path}
              className={({ isActive }) => {
                return isActive ? `lk-link-sidePar-on lk-link-sidePar-off` : "lk-link-sidePar-off";
              }}>
             <img src={item.icon}/>
             {item.title}
            </NavLink>       
              )
      })}
    </div>
    <Logout text="Logout"/>
  </div>
  )
}
