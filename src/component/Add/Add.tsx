import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import './Add.css';
import BackToHome from "../BackToHome/BackToHome";
import upload from './../../assets/images/Add/Upload.png';
import Title from "../Title/Title";
export default function Add() {
  const navigate = useNavigate();
  const [name, setname] = useState<string>(""); 
  const [price, setprice] = useState<number>(0); 
  const [image, setimage] = useState<FileList | null>(null); 
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
  }
  }, []);
  const sent = (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('name', name);             
    formData.append('price', price.toString()); 

    if (image && image.length > 0) {
      for (let i = 0; i < image.length; i++) {
        formData.append('image', image[i]);
      }
    }
    axios.post('https://test1.focal-x.com/api/items', formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
        "Content-Type": "multipart/form-data",                          
      },
    })
    .then(res => {
      console.log(res.data);
      navigate('/Products/Read');
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
      <Title title="ADD NEW ITEM" />
      <form onSubmit={(event) => { sent(event) }}>
        <div className="lk-Add-Form-Father">
          <div className="lk-Add-part-one">
            <label className="lk-Add-lable">Name</label>
            <input className="lk-Add-f-input lable-margin" type="text" placeholder='Enter the product name' onChange={(event) => setname(event.target.value)} />
            <label className="lk-Add-lable">Price</label>
            <input className="lk-Add-f-input" type="number" placeholder='Enter the product price' onChange={(event) => setprice(Number(event.target.value))} />
          </div>
          <div className="lk-add-img">
            <label className="lk-Add-lable lk-mb">Image</label>
            <div className="lk-add-F-input-file" onClick={handleIconClick}>
              {image && image.length > 0 ? (
                Array.from(image).map((item: File , index: number) => (
                  <img className="lk-Add-CH-img" key={index} src={URL.createObjectURL(item)} alt="Selected" />
                ))
              ) : (
                <img className="lk-Add-F-img" src={upload} alt="Upload" />
              )}
              <input className="lk-add-input-file" ref={fileInputRef} accept="image/*" type="file" onChange={(event) => setimage(event.target.files)} multiple />
            </div>
          </div>
        </div>
        <input className="lk-Add-Submit" type='submit' value='send' />
      </form>
    </div>
  );
}