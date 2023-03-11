const route = require('express').Router()
const Room = require("../model/room")
const BookRoom = require('../model/bookedRoom')

route.get('/allRooms',async(req,res)=>{
    const allRooms = await Room.find()
    res.json(allRooms)
})

route.get('/allUsers',async (req,res)=>{
    const allUsers = await User.find();
    res.json(allUsers)
})

route.post('/createRoom',async (req,res)=>{
    const roomA = new Room({
        roomType: req.body.roomType,
        availableRooms: req.body.availableRooms,
        price: req.body.price,
    })
    const result = await roomA.save()
    res.json(result)
})

route.post('/createBookRoom',async (req,res)=>{
    const bookRoom = new BookRoom({
        roomNo:req.body.roomNo,
        roomType: req.body.roomType,
        price:req.body.price
    })
    const result = await bookRoom.save()
    res.json(result)
})

module.exports = route