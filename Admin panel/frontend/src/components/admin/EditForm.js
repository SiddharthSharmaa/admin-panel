import axios from 'axios'
import React, { useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import {useNavigate} from "react-router-dom";

function EditForm() {
    const navigate=useNavigate();
    const [responseData, setResponseData] = useState({})
    const _id = useSelector(state => state.room.updatingId)
    console.log("id", _id)
    const emailRef = useRef()
    const startDateRef = useRef()
    const endDateRef = useRef()
    const roomTypeRef = useRef()
    const roomNoRef = useRef()
    const onBack=()=>{
        navigate("/admin")
    }
    const submitHandler = async (e) => {
        e.preventDefault();
        const email = emailRef.current.value
        // const roomType = roomDetails.roomType
        // const roomNo = roomDetails.roomNo
        const startTime = startDateRef.current.value
        const endTime = endDateRef.current.value
        const dateNow = new Date().toISOString().slice(0, 10)
        const roomNo = roomNoRef.current.value
        const roomType = roomTypeRef.current.value

        if (startTime > dateNow && endTime > startTime) {
            const bookRoom = await axios.put('http://localhost:3001/user/updateUser', {
                email, startTime, endTime, roomType, roomNo, _id
            })
            setResponseData(bookRoom.data)
        } else {
            setResponseData({ message: "Wrong inputs" })
        }
    }

    return (
        <div className="form-main">
            <form>
                <label for="em">Email of customer</label>
                <input type="email" name='em' ref={emailRef} placeholder="email" required /><br />
                <label for="room-type">Room Type</label>
                <input type="text" name='room-type' ref={roomTypeRef} placeholder="room-type(A,B,C)" required /><br />
                <label for="room-no">Room Number</label>
                <input type="text" name='room-no' ref={roomNoRef} placeholder="room-no" required /><br />
                <label for="s-date">Start Date</label>
                <input type='date' name='s-date' ref={startDateRef} required /><br />
                <label for="e-date">End Date</label>
                <input type='date' name='e-date' ref={endDateRef} required /><br />
                <button onClick={submitHandler}>Update Detail</button>
                <button onClick={onBack} style={{margin:4, backgroundColor:"red", border:"4px solid #8b0000"}}>Back</button>
            </form>
            {responseData.message}
        </div>

    )
}

export default EditForm