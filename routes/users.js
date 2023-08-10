const router = require('express').Router();

const { 
    allUsers,getUsersById,register,login,update,deleteUsers
} = require('../controllers/users');


// CREATE NEW USER
router.post('/register', register)
// LOGIN USER
router.post('/login', login)
// UPDATE USER 
router.put('/updateUser/:id', update)
// GET ALL USERS
router.get('/allUsers', allUsers)
// router.get('/allUsers', allUsers)
// GET USER BY ID
router.get('/user/:id', getUsersById)
// DELETE USER
router.delete('/deleteuser/:id', deleteUsers)


// // CHECKNG THE ADMIN 
router.get('/checkadmin/:id', (req, res, next) => {
    res.send('hello admin! you are logged in now and can delete all account')
})
module.exports = router;