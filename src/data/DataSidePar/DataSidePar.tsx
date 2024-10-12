import logo from './../../assets/images/sidepar/Logo.png'
import icon1 from './../../assets/images/sidepar/boxes.svg'
import icon2 from './../../assets/images/sidepar/icon.svg'

interface dataSidePar{
    path:string,
    title:string,
    icon:string,
    act:boolean    
}
export const img:string =logo;
export const dataSidePar:Array<dataSidePar>=[
    {path:"/Products",icon:icon1,title:'Products',act:true},
    {path:"/Favorites",icon:icon2,title:'Favorites',act:false},
    {path:"/OrderList",icon:icon2,title:'order list',act:false}
]