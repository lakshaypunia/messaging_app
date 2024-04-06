import { useState ,useEffect } from "react"
import { RecoilRoot, useRecoilState,useRecoilValue  } from 'recoil'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useratom,recieveratom } from "../atoms/atoms";

export function Mainpage(){
    const[userid,setuserid] = useRecoilState(useratom)
    const[receiverid,setrecieverid] = useRecoilState(recieveratom)
    const navigate = useNavigate()

    return(
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: 'black', color: 'white', height: '100vh', justifyContent: 'center', padding: 0}}>
            <h1 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '10px' }}>
                    <span style={{
                         backgroundImage: 'linear-gradient(to right, #8a2387, #e94057, #f27121)',
                         WebkitBackgroundClip: 'text',
                         color: 'transparent'
                    }}>Welcome to the Messaging App</span>
                </h1>
            <p style={{ fontSize: '16px', marginBottom: '20px', color: '#fff', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
                    Add the following credentials to get started
            </p>
            <input style={{marginBottom: '10px',
                        padding: '8px',
                        border: '1px solid #ccc',
                        borderRadius: '5px',
                        width: '200px'}}
            type="text" placeholder="USER ID" onChange={(e) =>{
            setuserid(e.target.value)
            console.log(userid)
            }}/>

            <input style={{marginBottom: '10px',
                        padding: '8px',
                        border: '1px solid #ccc',
                        borderRadius: '5px',
                        width: '200px'}}
            type="text"  placeholder="RECIEVER ID" onChange={(e)=> {
                setrecieverid(e.target.value)
            }} />
            <button style={{
                 padding: '10px 20px',
                 backgroundColor: '#007bff',
                 color: '#fff',
                 border: 'none',
                 borderRadius: '5px',
                 cursor: 'pointer',
                 width: '200px',
                 transition: 'background-color 0.3s' }} onClick={() =>{
                navigate("/messagebox")}}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#0056b3'}
                onMouseLeave={(e) => e.target.style.backgroundColor ='#007bff'} 
                >open chat</button>
        </div>
    )
}