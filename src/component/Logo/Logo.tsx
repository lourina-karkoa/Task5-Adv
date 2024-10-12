import './Logo.css'
 interface user{
    logo:string,
    title:string,
    par:string
 }
export default function Logo({logo,title,par}:user) {
  return (
       <>
    <img className="lk-login-logo" src={logo}/>
       <h2 className="lk-login-h2">{title}</h2>
       <p className="lk-login-par1">{par}</p>
       </>
  )
}
