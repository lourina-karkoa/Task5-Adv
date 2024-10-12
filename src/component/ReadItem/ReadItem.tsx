import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import './ReadItem.css'
import BackToHome from "../BackToHome/BackToHome";

export interface User {
    image_url: string,
    id: number,
    name: string,
    price: number,
    updated_at: string,
    created_at: string,
}

export default function ReadItem() {
    const navigate = useNavigate();
    const params = useParams();
    const [dataBack, setdataBack] = useState<User>();

    useEffect(() => {
        if (!localStorage.getItem("token")) {
            navigate("/");
        }
        axios.get(`https://test1.focal-x.com/api/items/${params.id}`, {
            headers: {
                Authorization: localStorage.getItem("token"),
            },
        })
            .then((res) => setdataBack(res.data))
            .catch((error) => console.log(error));
    }, []);

    const toISOStringWithTimezone = (date: Date) => {
        const pad = (n: number) => `${Math.floor(Math.abs(n))}`.padStart(2, '0');
        return pad(date.getDate()) +
            '/' + pad(date.getMonth() + 1) +
            '/' + date.getFullYear();
    };

    return (
        <div className="lk-readItem">
            <BackToHome />
            <div className="lk-readItem-father2">
                <p className="lk-readItem-name">{dataBack?.name}</p>
                <div className="lk-readItem-Fimg">
                    <img className="lk-readItem-img" src={dataBack?.image_url} />
                </div>
                <div className="lk-readItem-F-par">
                    <p className="lk-readItem-par">price: <span className="lk-readItem-span">{dataBack?.price}</span></p>
                    <p className="lk-readItem-par">Added at: <span className="lk-readItem-span">{dataBack?.created_at ? toISOStringWithTimezone(new Date(dataBack.created_at)) : ""}</span></p>
                </div>
                <p className="lk-readItem-par3">
                    updated at: <span className="lk-readItem-span">
                        {dataBack?.updated_at ? toISOStringWithTimezone(new Date(dataBack.updated_at)) : ""}
                    </span>
                </p>
            </div>
        </div>
    );
}