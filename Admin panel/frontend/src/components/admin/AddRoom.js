import axios from 'axios'
import React, {useRef, useState} from 'react'
import {useNavigate} from "react-router-dom";

function AddRoom() {
    const[message,setMessage] = useState("");
    let navigate=useNavigate();
    const roomTypeRef = useRef()
    const roomNoRef = useRef()
    const priceRef = useRef()

    const submitHandler = async(e)=>{
        e.preventDefault();
        try{
            const createRoom = await axios.post('http://localhost:3001/admin/createRoom',{
                roomType:roomTypeRef.current.value,
                availableRooms:roomNoRef.current.value,
                price:priceRef.current.value
            })
            console.log(createRoom)
            setMessage("room created")
            navigate("/");
        }
        catch(err){
            setMessage("Creation failed")
        }
    }

  return (
    <div className="form-main">
        <form>
        <input type="text" placeholder='roomType' ref={roomTypeRef}/>
        <input type="text" placeholder='roomNo' ref={roomNoRef}/>
        <input type="number" placeholder='price' ref={priceRef}/><br /><br />
        <button onClick={submitHandler}>Create Room</button>
        {message}
        </form>
        
    </div>
  )
}

export default AddRoom