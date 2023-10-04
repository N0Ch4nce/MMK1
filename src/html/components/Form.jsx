/* eslint-disable react/prop-types */
import { useState } from "react";
import styles from '../pages/admin/admin.module.css';



export default function Form({title,handleClick}){

    const [email,setEmail] = useState('');
    const [pass,setPass] = useState('');

    return (
        <div className={styles.login}>
            <input type="email" value={email} onChange={event=>setEmail(event.target.value)} placeholder="email"/>
            <input type="password" value={pass} onChange={event=>setPass(event.target.value)} placeholder="password"/>
            <button onClick={()=>handleClick(email,pass)}>{title}</button>
        </div>

    )
}