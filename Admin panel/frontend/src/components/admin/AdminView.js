import axios from 'axios'
import React, {useEffect, useState} from 'react'
import AdminViewCard from './AdminViewCard'
import "./AdminView.css"

function AdminView() {
    const [bookedList,setBookedList] = useState([])
   
    useEffect(()=>{
        const defaultFetch = async() => {
            const data = await axios.get('http://localhost:3001/user/upcomingBooking')
            setBookedList(data.data)
        }
        defaultFetch()
    },[bookedList])

    const blurHandler = async (e) => {
        if(e.target.value==="past"){
            const data = await axios.get('http://localhost:3001/user/pastBooking')
            setBookedList(data.data)
            // console.log(data)
        }
        if(e.target.value==="future"){
            const data = await axios.get('http://localhost:3001/user/upcomingBooking')
            setBookedList(data.data)
            // console.log(data)
        }
    }
    const content = bookedList.map((item)=>
        <AdminViewCard 
            key={item._id}
            item={item}
        />
    )
  return (
    <div>
        <select onChange={blurHandler}>
            <option value="future">Upcoming Booking</option>
            <option value="past">Past Booking</option>
        </select>
        {content}
    </div>
  )
}

export default AdminView