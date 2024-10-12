import { Link } from 'react-router-dom'
import './BackToHome.css'
export default function BackToHome() {
  return (
    <Link className="lk-back-link" to={"/Products/Read"}>
     <div className="lk-Back-to-Home"><i className="fa-solid fa-angle-left"></i></div>
     </Link>
  )
}
