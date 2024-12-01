import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BackToHome from "../BackToHome/BackToHome";
import Title from "../Title/Title";
import {User} from './../ReadItem/ReadItem'
import './../Add/Add.css'
export default function Edit() {
  const params = useParams();
  const navigate = useNavigate();
  const [name, setname] = useState<string>(""); 
  const [price, setprice] = useState<number>(); 
  const [image, setimage] = useState<FileList | null>(null); 
  const [dataBack, setdataBack] = useState<User>();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
  }
    axios.get(`https://test1.focal-x.com/api/items/${params.id}`, {
      headers: {
        Authorization: localStorage.getItem('token'),
      }
    })
    .then(res => {
      setdataBack(res.data);
      setname(res.data.name);
      setprice(res.data.price);
    })
    .catch(error => console.log(error));
  }, [params.id, navigate]);

  const sent = (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    if (price !== undefined) {
      formData.append('price', price.toString());
    }
    if (image && image.length > 0) {
      for (let i = 0; i < image.length; i++) {
        formData.append('image', image[i]);
      }
    }
    formData.append('_method', 'PUT');
    axios.post(`https://test1.focal-x.com/api/items/${params.id}`, formData, {
      headers: {
        Authorization: localStorage.getItem('token'),
        "Content-Type": "multipart/form-data",
      }
    })
    .then(res => {
      console.log(res.data);
      navigate('/Read');
    })
    .catch(error => console.log(error));
  };

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const handleIconClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();  
    }
  };

  return (
    <div className="lk-ADD-Father">
      <BackToHome />
      <Title title="EDIT ITEM" />
      <form onSubmit={(event) => { sent(event)}}>
        <div className="lk-Add-Form-Father">
          <div className="lk-Add-part-one">
            <label className="lk-Add-lable">Name</label>
            <input className="lk-Add-f-input lable-margin" type="text" placeholder='name'
              onChange={(event) => setname(event.target.value)} value={name}/>
            <label className="lk-Add-lable">Price</label>
            <input className="lk-Add-f-input" type="number" placeholder='price'
              onChange={(event) => setprice(Number(event.target.value))} value={price} />
          </div>
          <div className="lk-add-img">
            <label className="lk-Add-lable lk-mb">Image</label>
            <div className="lk-add-F-input-file" onClick={handleIconClick}>
              {image && image.length > 0 ? (
                Array.from(image).map((item: File, index: number) => (
                  <img className="lk-Add-CH-img" key={index} src={URL.createObjectURL(item)} alt="Selected" />
                ))
              ) : (
                <img className="lk-Edit-img" src={dataBack?.image_url} alt="The current file" />
              )}
              <input
                className="lk-add-input-file"
                ref={fileInputRef}
                accept="image/*"
                type="file"
                onChange={(event) => setimage(event.target.files)} 
                multiple
              />
            </div>
          </div>
        </div>
        <input className="lk-Add-Submit" type='submit' value='send' />
      </form>
    </div>
  );
}