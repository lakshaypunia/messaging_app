import { useEffect,useState } from "react"
import {  useRecoilState } from 'recoil'
import axios from "axios";
import { useratom,recieveratom,messagearrayatom,messageatom } from "../atoms/atoms";
import { set } from "mongoose";

export function Messaginbox(){
    const[userid,setuserid] = useRecoilState(useratom)
    const[recieverid,setrecieverid] = useRecoilState(recieveratom)
    const[message,setmessage] = useRecoilState(messageatom)
    const[messagearray,setmessagearry] = useRecoilState(messagearrayatom)


    useEffect(()=> {
        const fetchData = async()=> {
          const res = await axios.post("http://localhost:3000/message",{userid : userid,
          recieverid : recieverid});
          const final_chats = res.data;
          setmessagearry(final_chats.messages);
        }
        const ID = setInterval(fetchData, 2000);
      }, [])

    function MEssages({message}){
        return (
            <div style={{width: '100%', backgroundColor: 'rgba(255, 255, 255, 0.1)', padding: '40px', borderRadius: '10px', position: 'relative', height: 'calc(100% - 70px)', overflowY: 'auto',
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'flex-start', 
            justifyContent: 'flex-start', }}>
                {message.map(function(msg){
                    const alignRight = msg.send 
                    return <>
                    <div style={{ backgroundImage: 'linear-gradient(to right, #ff5e62, #ff9966)', color: 'white', padding: '10px', marginBottom: '10px', borderRadius: '5px',alignSelf: alignRight ? 'flex-end' : 'flex-start' }}>{msg.message}</div>
                    </>
                   
                })}
            </div>
        )
    }

    return(<div style={{ backgroundColor: 'black', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center',position: 'relative',padding: 0 }}>
            <MEssages message={messagearray} />

            <div style={{position: 'absolute', bottom: '20px', left: '0', width: '100%' }}>
            <input value={message} style={{width: 'calc(100% - 120px)', padding: '10px', marginLeft: '10px', border: 'none', borderRadius: '5px', backgroundColor: 'rgba(255, 255, 255, 0.2)', color: 'white' }}     type="text" placeholder="message" onChange={(e) => {
                setmessage(e.target.value)
            }}/>

            <button style={{ padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', transition: 'background-color 0.3s' }} onClick={async() =>{
                    if (message ==""){
                        return
                    }
                    await axios.post("http://localhost:3000/send", {
                      message: message,
                      userid : userid,
                      recieverid : recieverid
                })
                const res = await axios.post("http://localhost:3000/message",{userid : userid,
                recieverid : recieverid})
                setmessagearry(res.data.messages)
                setmessage("")

            }}>send</button>
            </div>
        </div>
    )
}