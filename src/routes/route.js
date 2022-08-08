const express = require('express');
const lodash = require('lodash')
const abc = require('../introduction/intro')
const router = express.Router();

router.get('/test-me', function (req, res) {
    console.log('My batch is', abc.name)
    abc.printName()
    res.send('My second ever api!')

    let month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    console.log(lodash.chunk(month, 4))

    let oddNum = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19.]
    
    console.log(_.tail(oddNum))


    let gfg = _.union([10000, 22, 3],
        [3, 840, 10000],
        [840, 22, 7],
        [8, 99999, 10000],
        [11, 12, 13]);

    console.log(gfg)

    let obj1 =[
        ["horror","The Shining"],
        ["drama","Titanic"],
        ["thriller","Shutter Island"],
        ["fantasy","Pans Labyrinth"]
       ]

    let obj2 =_.fromPairs(obj1);
    console.log(obj2)

});


router.get('/test-you', function (req, res) {
    res.send('This is the second routes implementation')
})

router.get('/give-me-students-data', function (req, res) {

})
module.exports = router;
// adding this comment for no reason