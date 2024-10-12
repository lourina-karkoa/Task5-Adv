import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import './Read.css'
import defImg from './../../assets/images/Read/defaultImg.png'
import Pagination from "../Pagination/Pagination"
import useWindowSize from "../WindowSize/WindowSize"

interface User {
  image_url: string,
  id: number,
  name: string,
  price: number,
}

export default function Read() {
  const size = useWindowSize()
  const [search, setSearch] = useState('')
  const [deleteItemId, setDeleteItemId] = useState<number | null>(null)
  const [dataBack, setdataBack] = useState<User[]>([]);
  const navigate = useNavigate()
  
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
    axios.get('https://test1.focal-x.com/api/items',
      {
        headers: {
          Authorization: localStorage.getItem('token')
        }
      }
    ).then(res => setdataBack(res.data))
      .catch(error => console.log(error)
      )
  }, [])
  
  function handleAdd() {
    navigate('/Products/Add')
  }
  function handleReadItem(id: number) {
    navigate(`/Products/ReadItem/${id}`)
  }
  function handleEdit(id: number) {
    navigate(`/Products/Edit/${id}`)
  }
  function handleDelet(id: number) {
    axios.delete(`https://test1.focal-x.com/api/items/${id}`,
      {
        headers: {
          Authorization: localStorage.getItem('token')
        }
      }
    ).then(res => {
      console.log(res),
        axios.get('https://test1.focal-x.com/api/items',
          {
            headers: {
              Authorization: localStorage.getItem('token')
            }
          }
        ).then(res => setdataBack(res.data))
          .catch(error => console.log(error)
          )
    })
      .catch(error => console.log(error))
}
const calculatePostsPerPage = ()=> {
  if (size.width > 1174) {
    return 8;
  } else if (size.width > 992) {
    return 6;  
  } else if (size.width > 768) {
    return 4;
  } else {
    return 2; 
  }
}
const [currentPage, setCurrentPage] = useState(1);
const postsPerPage = calculatePostsPerPage(); 
const indexOfLastPost = currentPage * postsPerPage;
const indexOfFirstPost = indexOfLastPost - postsPerPage;
const currentPosts = dataBack && dataBack.length ? dataBack.slice(indexOfFirstPost, indexOfLastPost) : [];
const howManyPages = dataBack && dataBack.length ? Math.ceil(dataBack.length / postsPerPage) : 1;

  return (
    <div className="lk-Read-Father">
      <div className="lk-search">
        <input type="search" onChange={(event) => setSearch(event.target.value)} placeholder="Search product by name " className="lk-read-search" />
        <i className="fa-solid fa-magnifying-glass lk-icon-search"></i>
      </div>
      <div className="neeeew">
      <div className="lk-read-add-father"><button onClick={() => handleAdd()} className="lk-read-Add">Add New Products</button></div>
      <div className="lk-Read-show">
        {currentPosts?.filter((item : User) => {
          return search === '' ? item : item.name.includes(search)
        }).map((item: User, index: number) => {
          return (
            <div className="lk-read" key={index}>
              <div className="lk-read-img-father" onClick={() => handleReadItem(item.id)}>
              <img className="lk-read-img" src={item.image_url} alt={item.name} onError={(e) => { if (e.currentTarget.src !== defImg) {e.currentTarget.src = defImg;}}}/>   
              </div>
              <div className="lk-read-info" onClick={() => handleReadItem(item.id)}>
              </div>
              <button className="lk-img-adding1" onClick={() => handleEdit(item.id)}>Edit</button>
              <button className="lk-img-adding2" onClick={() => setDeleteItemId(item.id)}>delete</button> 
              {deleteItemId === item.id && (
                <div className="lk-overlay">
                   <div className="lk-hidden-delete">
                     <p className="lk-delete-par">Are you sure you want to delete the product?</p>
                       <div className="lk-delet-F-button">
                         <button className="lk-delete-button" onClick={() => {handleDelet(item.id); setDeleteItemId(null); }}>Yes</button>
                         <button className="lk-delete-button" onClick={() => setDeleteItemId(null)}>No</button>
                       </div>
                    </div>
                </div>
              )}
              <p className="lk-read-name">{item.name}</p>
            </div>
          )
        })}
      </div>
      </div>
      <Pagination pages = {howManyPages} setCurrentPage={setCurrentPage}/>
    </div>
  )
}