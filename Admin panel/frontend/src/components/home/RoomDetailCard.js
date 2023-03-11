import React from 'react'
import { useDispatch } from 'react-redux'
import { roomActions } from '../../store/room-slice';
import { useNavigate } from 'react-router-dom'
import './Layout.css';
import img1 from '../../image/img1.jpg'

function RoomDetailCard(props) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(roomActions.bookingRoom({
      roomType: props.item.roomType,
      roomNo: props.item.availableRooms,
      price: props.item.price
    }))
    navigate('/booking')
  }

  return (
    <div className="main">
      <div className='card'>
      <div className="image">
            <img src={img1} alt="" />
          </div>
        <div className="container">
          <h1 style={{ fontSize: "24px", color: "#243b7a" }}>Room Type:{props.item.roomType}</h1>
          <h2 style={{ fontSize: "22px", color: "rgb(56 91 188)" }}>Room No:{props.item.availableRooms}</h2>
          <h3 style={{ fontSize: "20px", color: "brown" }}>Price:{props.item.price}</h3>
          <button onClick={submitHandler}>Book Room</button>
        </div>
      </div>
    </div>

  )
}

export default RoomDetailCard