import axios from 'axios'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { roomActions } from '../../store/room-slice'
import img1 from '../../image/img1.jpg'

function AdminViewCard(props) {
    const { _id,startTime } = props.item
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const onEditHandler = () => {
        dispatch(roomActions.updatingRoom(_id))
        navigate('/editForm')
    }

    const onDeleteHandler = async () => {
        let start = Date.parse(startTime);
        let timeDiff=(start-Date.now())/(1000*60*60);
        let refund="Hello";
        if(timeDiff>48){
            refund="Complete Refund";
        }
        else if(timeDiff>=24 && timeDiff<=48){
            refund="50% Refund";
        }
        else{
            refund="No refund";
        }
        alert(refund);
        const cancelBooking = await axios.delete('http://localhost:3001/user/cancelBooking', {
            data: {
                _id
            }
        })
        console.log(cancelBooking.data)
    
    }
    return (
        <div className="main">
            <div className="card">
                <div className="image">
                    <img src={img1} alt="" />
                </div>

                <div className="container">
                    <p>Email:{props.item.email}</p>
                    <p>StartDate:{props.item.startTime}</p>
                    <p>EndDate:{props.item.endTime}</p>
                    <p>Amount:{props.item.amount}</p>
                    <p>RoomNo:{props.item.roomNo}</p>
                    <p>RoomType:{props.item.roomType}</p>
                    <button onClick={() => onEditHandler()}>edit</button>
                    <button onClick={() => onDeleteHandler()}>delete</button>
                    <hr />
                </div>
            </div>

        </div>
    )
}

export default AdminViewCard