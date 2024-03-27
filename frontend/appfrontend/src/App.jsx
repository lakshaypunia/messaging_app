import { useEffect, useState ,useCallback } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { connect } from 'mongoose'

function App() {
  const[userid,setuserid] = useState("")
  const[recieverid,setrecieverid] = useState("")
  const[message,setmessage] = useState([{msg_id : "0",
  message :"welcome"}])
  const [sendmessage,setsendmessage] = useState("")
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000)
    return () => clearInterval(intervalId);
  },[])

    async function displaydata(){
      
    const data = await connect()
    const messages = data.messages
    setmessage(messages)


    
    
    // console.log("isnsie display data",data.messages)
  }

  const  send = useCallback(async () =>{
    console.log("got the params", userid , recieverid)
    async function fetchingdata(userid,recieverid,sendmessage){
      const response = await fetch("http://localhost:3000/send",{
        method : "POST",
        body: JSON.stringify({
            "userid" : userid,
            "recieverid" : recieverid,
            "message" : sendmessage
        }),
        headers : {
            "Content-type": "application/json"
        }
      })
      const data = await response.json()
      console.log("data" , data)
      return data
    }
    fetchingdata(userid,recieverid,sendmessage)
    
  },[userid,recieverid,sendmessage])

  const  connect = useCallback(async () =>{
    console.log("got the params", userid , recieverid)
    async function fetchingdata(userid,recieverid){
      const response = await fetch("http://localhost:3000/message",{
        method : "POST",
        body: JSON.stringify({
            userid : userid,
            recieverid : recieverid
        }),
        headers : {
            "Content-type": "application/json"
        }
      })
      const data = await response.json()
      // console.log("data" , data)
      return data
    }
    fetchingdata(userid,recieverid)
    const data1 = await fetchingdata(userid,recieverid)
    // console.log("data1", data1)
    return data1
    
  },[userid,recieverid])

  function Displaydata({messages}){
    const id = "1"
    return(
      <div key={id} style={{
        width: '500px', 
        height: '500px', 
        backgroundColor: 'green',
        margin: '0 auto', 
        }}>
        {messages.map(function(msg){
        let recievedorsend = ""
        let isleft = ""
        

        if(msg.send){
          recievedorsend = "send"
          isleft = true
        }else{
          recievedorsend = "recieved"
          isleft = false
        }
        const containerStyle = {
          display: 'flex',
          justifyContent: isleft ? 'flex-start' : 'flex-end' 
        };
        return<div key={msg._id}>
        <div style={containerStyle}>{recievedorsend}</div>
        <div style={containerStyle}>{msg.message}</div> 
      </div>
      
    })}
        
      </div>
    )
  }

  
  
  

  return(
    <div>
      <input type="text" placeholder='userid' onChange={(e)=>{
        setuserid(e.target.value)
      }}/>
      <input type="text" placeholder='receiveridid' onChange={(e)=>{
        setrecieverid(e.target.value)
      }}/> <br />
      <button onClick={() =>{
        setTimeout(() => {
          displaydata()
          
        }, 5000);
      }}>connect</button><br />
      <div></div>
      <Displaydata messages={message} >hello</Displaydata><br />
      <input type="text" placeholder='message' onChange={(e)=>{
        setsendmessage(e.target.value)
      }} />
      <button onClick={send}>send</button>


      
      
    </div>
    
  )
}





export default App
