const BookedRoom = require("../model/bookedRoom");
const Room = require('../model/room')
const User = require('../model/user')
const route = require('express').Router()

route.get('/roomBooking',async (req,res)=>{
    const availableRooms = await BookedRoom.find()
    res.json(availableRooms)
})
route.get('/pastBooking',async (req,res)=>{
    const allUsers = await User.find()
    const date = new Date().toISOString().slice(0,10)
    const cdArr = date.split('-');
    const resultedUsers = allUsers.filter((obj)=>{
        const objDateArr = obj.startTime.split('-')
        if(objDateArr[1] < cdArr[1]){
            return obj
        }else if(objDateArr[1] === cdArr[1]){
            if(objDateArr[2]<cdArr[2]){
                return obj
            }
        }
    })
    res.json(resultedUsers)
})
route.get('/upcomingBooking',async (req,res)=>{
    const allUsers = await User.find()
    const date = new Date().toISOString().slice(0,10)
    const cdArr = date.split('-');
    const resultedUsers = allUsers.filter((obj)=>{
        const objDateArr = obj.startTime.split('-')
        if(objDateArr[1] > cdArr[1]){
            return obj
        }else if(objDateArr[1] === cdArr[1]){
            if(objDateArr[2]>cdArr[2]){
                return obj
            }
        }
    })
    res.json(resultedUsers)
})


const isBooked = async (startDate,endDate,roomNo)=>{
    const bookedDateList = []
    const sdArr = startDate.split('-')
    const edArr = endDate.split('-')
    let n = edArr[2]-sdArr[2];
    if(edArr[1]!==sdArr[1]){
        let num = sdArr[2]-1;
        if(sdArr[1] == 1|| sdArr[1] == 3|| sdArr[1] == 5|| sdArr[1] == 7|| sdArr[1] == 8|| sdArr[1] == 10|| sdArr[1] == 12){
            while(num!=(edArr[2]-1)){
                tmp = sdArr[0]+'-'+`0${sdArr[1]}`.slice(-2)+'-'+`0${++num}`.slice(-2)
                if(num == 31){
                    num = 0
                    sdArr[1]++;
                }
                bookedDateList.push(tmp)
            }

        }else{
            while(num!=(edArr[2]-1)){
                tmp = sdArr[0]+'-'+`0${sdArr[1]}`.slice(-2)+'-'+`0${num++}`.slice(-2)
                if(num == 30){
                    num = 1
                    sdArr[1]++;
                }
                bookedDateList.push(tmp)
            }
        }
    }else{
        let num = sdArr[2];
        for(let i = 0;i<n;i++){
            let tmp = (`${sdArr[0]}-${sdArr[1]}-${num++}`)
            bookedDateList.push(tmp)
        }
    }
    //------------------
    let choosedRoom = await User.findOneAndUpdate({roomNo:roomNo})
    console.log(choosedRoom)
    if(choosedRoom){
        for(let date1 of bookedDateList){
            for(let date2 of choosedRoom.bookedDate || []){
                if(date1 === date2){
                    return {bookedDateList,dateIsBooked:true}
                }
            }
        }
    }
    return {bookedDateList,dateIsBooked:false}
}

route.post('/roomBooking',async(req,res)=>{
    const {email,startTime,endTime,roomType,paymentMode,roomNo} = req.body
    const {bookedDateList,dateIsBooked} = await isBooked(startTime,endTime,roomNo)
    try {
        const existingUser = await User.findOne({
          roomNo: req.body.roomNo,
          $or: [
            {
              $and: [
                { startTime: { $lte: req.body.startTime } },
                { endTime: { $gt: req.body.startTime } },
              ],
            },
            {
              $and: [
                { startTime: { $lt: req.body.endTime } },
                { endTime: { $gte: req.body.endTime } },
              ],
            },
            {
              $and: [
                { startTime: { $gte: req.body.startTime } },
                { endTime: { $lte: req.body.endTime } },
              ],
            },
          ],
        });
    
        if (existingUser) {
          return res.status(409).json({
            message:
              "There is already a booking for this room during the selected time period.",
          });
        }} catch (err) {
          console.log(err);
        }

    if(!dateIsBooked){
        const bookRoom = await Room.findOneAndUpdate({roomNo:roomNo})
        console.log(bookedDateList.length);
        const user = new User({
            email,startTime,endTime,roomType,paymentMode,roomNo,amount: (bookRoom.price * bookedDateList.length)
        })
        let result = await user.save()
        let tobookRoom = new BookedRoom({
            roomNo:roomNo,
            roomType: roomType,
            price:(bookRoom.price * bookedDateList.length)
        })
        const bookresult = await tobookRoom.save()
        res.json({message:'room booked',result})
    }
    else{
        res.json({message:'date already booked'})
    }
})

route.put('/updateUser',async (req,res)=>{
    const {email,startTime,endTime,roomType,paymentMode,roomNo,amount,_id} = req.body
    const user = await User.findOne({_id:_id})
    try {
        const existingUser = await User.findOne({
          roomNo: req.body.roomNo,
          $or: [
            {
              $and: [
                { startTime: { $lte: req.body.startTime } },
                { endTime: { $gt: req.body.startTime } },
              ],
            },
            {
              $and: [
                { startTime: { $lt: req.body.endTime } },
                { endTime: { $gte: req.body.endTime } },
              ],
            },
            {
              $and: [
                { startTime: { $gte: req.body.startTime } },
                { endTime: { $lte: req.body.endTime } },
              ],
            },
          ],
        });
    
        if (existingUser) {
            throw new Error();
        }} catch (err) {
            alert("already booked for this time and date")
            return res.status(200).json({
                message:
                  "There is already a booking for this room during the selected time period.",
              });
          console.log(err);
        }

    console.log("user",user)

    const {bookedDateList,dateIsBooked} = await isBooked(startTime,endTime,roomNo)
    if(dateIsBooked){
        res.json({message:"can't update, room already booked"})
    }else{
        const {bookedDateList:previousBookingDates} = await isBooked(user.startTime,user.endTime,user.roomNo)
        let updateRoom = await BookedRoom.findOneAndUpdate({roomNo:roomNo})
        for(let date1 of updateRoom.bookedDate){
            for(let date2 of previousBookingDates){
                if(date1 === date2){
                    let idx = updateRoom.bookedDate.indexOf(date1)
                    updateRoom.bookedDate.splice(idx)
                }
            }
        }
        await updateRoom.save()
        // const updatedRoom = await BookedRoom.updateOne({roomNo:roomNo},{
        //     $push:{
        //         bookedDate: {
        //             $each:bookedDateList
        //         }
        //     }
        // }
        // )

        // await updateRoom.save()
        
        const updatedObj = await User.updateOne({_id:_id},{
            ...req.body, amount:(updateRoom.price * bookedDateList.length)
        })
        res.json({message:"updated",user:updatedObj})
    }
})


route.delete('/cancelBooking',async (req,res)=>{
    const user = await User.findById(req.body._id)
    console.log(user)
    const { startTime,endTime, amount,roomNo } = user
    const sdArr = startTime.split('-');
    const date = new Date().toISOString().slice(0,10)
    const cdArr = date.split('-');

    const {bookedDateList:cancelDates} = await isBooked(startTime,endTime,roomNo)
    const choosedRoom = await BookedRoom.findOneAndUpdate({roomNo:roomNo})
    for(let date1 of choosedRoom.bookedDate){
        for(let date2 of cancelDates){
            if(date1 === date2){
                let idx = cancelDates.indexOf(date1)
                choosedRoom.bookedDate.splice(idx)
            }
        }
    }
    await choosedRoom.save()
    let refundedAmount = 0;
    if(sdArr[1]===cdArr[1]){
        const diff = sdArr[2] - cdArr[2]
        if(diff===2){
            refundedAmount = amount/2;
        }else if(diff>2){
            refundedAmount = amount
        }
    }
    const removeUser = await User.findByIdAndDelete(req.body._id)
    res.json({refundedAmount})
})
module.exports = route