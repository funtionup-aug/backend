
const jwt = require("jsonwebtoken")

const authentication = async function (req, res, next) {
    try {
        let token = req.headers["x-auth-token"];
        if (!token)
            if (!token) return res.status(403).send({ status: false, msg: "token must be present" });
        console.log(token);
        let decodedToken = jwt.verify(token, "functionup-plutonium-very-very-secret-key");
        if (!decodedToken)
            return res.status(403).send()({ status: false, msg: "token is invalid" });
        next()
    }
    catch (error) {
        return res.status(500).send({ status: false, msg: "Server Error" });
    }
};



const authorization = async function (req, res, next) {
try{
    let token = req.headers["x-auth-token"]
    let decodedToken = jwt.verify(token, "functionup-plutonium-very-very-secret-key")
    let userToBeModified = req.params.userId
    let userLoggedIn = decodedToken.userId
    if (!decodedToken) return res.status(403).send({ status: false, msg: "token in Valid" })
    if (userToBeModified != userLoggedIn) return res.status(403).send({ status: false, msg: "You Are LoggedIn But Not Authorised For This Activity" })
    next()
}
catch {
    res.status(500).send({status:false,msg:"Server Error"})
}

}


module.exports.authentication = authentication
module.exports.authorization = authorization