
import { Link } from 'react-router-dom'
import './Account.css'

interface account{
    href:string,
    par:string
}
export default function Account({href,par}:account) {
  return (
    <p className="lk-login-par2">
        Don’t have an account? 
        <Link className="lk-login-link" to={href}>
        <span className="lk-login-span">{par}</span>
        </Link>
        </p>
  )
}
