const publisherModel = require('../models/publisherModel')

const createPublisher = async function (req,res){
    let publisher = req.body
   let createPublisher = await publisherModel.create(publisher)
   res.send({msg:createPublisher})
}

const getAllPublisher = async function (req,res){
    let getAllPublishers = await publisherModel.find()
    res.send({msg:getAllPublishers})
}


module.exports.createPublisher=createPublisher
module.exports.getAllPublishers=getAllPublisher