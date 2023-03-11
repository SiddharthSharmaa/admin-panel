import React, { useEffect, useState } from 'react'
import RoomDetailCard from './RoomDetailCard'
import axios from 'axios'

function Layout() {
    const[roomsData,setRoomsData] = useState([]);

    useEffect(()=>{
        const getAllRooms = async()=>{
            const totalRooms = await axios.get('http://localhost:3001/admin/allRooms')
            setRoomsData(totalRooms.data)
        }
        getAllRooms()
    },[])
    
    const roomCardList = roomsData.map((item)=><RoomDetailCard
        key={item._id}
        item={item}
    />)

  return (
    <div>
        {roomCardList}
    </div>
  )
}

export default Layout