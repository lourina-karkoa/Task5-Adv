import { Outlet } from "react-router-dom";
import SidePar from "../../component/SidePar/SidePar";
import './Products.css'

export default function Products() {
  return (
    <div className="lk-products">
      <SidePar/>
      <Outlet/>
    </div>
  )
}
