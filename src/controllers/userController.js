const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");


const createUser = async function (req, res) {
  try {
    let data = req.body;
    let savedData = await userModel.create(data);
    console.log(res.newAtribute);
    res.status(201).send({ msg: savedData });
  }
  catch (error) {
    res.status(500).send({ status: false, msg: "Server Error" })

  }
};

const loginUser = async function (req, res) {
  try {
    let userName = req.body.emailId;
    let password = req.body.password;

    let user = await userModel.findOne({ emailId: userName, password: password });
    res.status(200).send({ msg: user })
  }
  catch (error) {
    if (!user)
      return res.status(403).send({
        status: false,
        msg: "username or the password is not corerct",
      })
  };

  let token = jwt.sign(
    {
      userId: user._id.toString(),
      batch: "thorium",
      organisation: "FunctionUp",
    },
    "functionup-plutonium-very-very-secret-key"
  );
  res.setHeader("x-auth-token", token);
  res.send({ status: true, token: token });
};

const getUserData = async function (req, res) {
  try {

    let userId = req.params.userId;
    let userDetails = await userModel.findById(userId);

    res.status(200).send({ status: true, data: userDetails });

    if (!userDetails)
      return res.status(403).send({ status: false, msg: "No such user exists" });
  }
  catch(error){
    res.status(500).send({status : false , msg:"server error occuered"})
  }
};

const updateUser = async function (req, res) {
try{
  let userId = req.params.userId;
  let user = await userModel.findById(userId);
  let userData = req.body;
  let updatedUser = await userModel.findOneAndUpdate({ _id: userId }, userData, { new: true });
  res.status(200).send({ user , status: true, data: updatedUser });

  if (!user) {
    return res.status(403).send("No such user exists");
  }
} 
catch(error){
  {
    res.status(500).send({status : false , msg:"server error occuered"})
}
}};




const DeleteUser = async function (req, res) {
try{
  let userId = req.params.userId
  let user = await userModel.findById(userId);
 
  let DeleteUsers = await userModel.findOneAndUpdate({ _id: userId }, [{ $set: { isDeleted: true } }], { new: true });
  res.status(200).send({ user , status: true, data: DeleteUsers })

  if (!user) {
    return res.status(403).send("No Such User Exists")
  }
}
  catch(error){
    res.status(500).send({status : false , msg:"server error occuered"})
  }
};


module.exports.createUser = createUser;
module.exports.getUserData = getUserData;
module.exports.updateUser = updateUser;
module.exports.loginUser = loginUser;
module.exports.DeleteUser = DeleteUser;