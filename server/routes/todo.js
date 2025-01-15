const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const Todos = require("../models/Todos");
require('dotenv').config()
const checkAuth = require('../middleware/checkAuth')


router.post('/addtodo',checkAuth,(req,res)=>{
    const token = req.headers.authorization.split(" ")[1]
    const verify = jwt.verify(token,"mukul garg")

    const newTodo = new Todos({
        name: req.body.name,
        date: req.body.myDate,
        description: req.body.description,
        uId: verify.uId,
    });
    newTodo.save()
    .then(result=>{
        res.status(200).json({
            msg:"TODO Add"
        })
    })
    .catch(err=>{
        res.status(500).json({
            error:err
        })
    })
})  

router.get('/alltodo',checkAuth,(req,res)=>{
    const token = req.headers.authorization.split(" ")[1];
    const verify = jwt.verify(token,"mukul garg")

    Todos.find({uId:verify.uId})
    .then(result=>{
        res.status(200).json({
            Todos:result
        })
    })

})



router.get('/tododetail/:id',checkAuth,(req,res)=>{
    const token = req.headers.authorization.split(" ")[1];
    const verify = jwt.verify(token,"mukul garg")

    Todos.find({uId:verify.uId})
    .then(result=>{
        Todos.findById(req.params.id)
        .then(todo =>{
            res.status(200).json({
                Todo:todo,
            })
        })
       
    })
})


router.delete('/delete/:id',checkAuth,(req,res)=>{
  
    const token = req.headers.authorization.split(" ")[1];
    const verify = jwt.verify(token,"mukul garg")
    

    Todos.findById(req.params.id)
    .then(todo=>{
        if(todo.uId == verify.uId){
            Todos.findByIdAndDelete(req.params.id)
            .then(result=>{
               
                    res.status(200).json({
                        msg:"TODO Deleted"
                    })

            })
            .catch(error =>{
                res.status(500).json({
                    error:error
                })
            })
        }
    })

})

router.put('/update/:id', checkAuth, (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const verify = jwt.verify(token, "mukul garg");
  Todos.findById(req.params.id)
  .then(todo => {
    if (verify.uId !== todo.uId) {
        return  res.status(500).json({
            msg :"not eligible to change"
        })
    }
    else if(req.files){

        const newUpdatedTodo = {
            name: req.body.name,
            date: req.body.myDate,
            description: req.body.description,
            uId: verify.uId,
        }
        Todos.findByIdAndUpdate(req.params.id,newUpdatedTodo,{new:true})
        .then(result=>{
            res.status(200).json({
                newUpdatedTodo: result
            })
           
        })
        .catch(err =>{
            res.status(200).json({
              error:err
            })
            
        })
    }
    else{
        const updatedTodo = {
            name: req.body.name,
            date: req.body.myDate,
            description: req.body.description,
            uId: verify.uId,
        }
        Todos.findByIdAndUpdate(req.params.id,updatedTodo,{new:true})
        .then(result=>{
            res.status(200).json({
                updatedTodo: result
            })
           
        })
        .catch(err =>{
            res.status(200).json({
              error:err
            })
            
        }
        )
    }
   
  })
});


// latest 5 student to display

router.get('/latesttodos',checkAuth,(req,res)=>{
    const token = req.headers.authorization.split(" ")[1]
    const verify = jwt.verify(token,"mukul garg")

    Todos.find({uId:verify.uId})
    .sort({$natural:-1}).limit(5)
    .then(todos =>{
        res.status(200).json({
            data:todos
        })
    })
    .catch(err=>{
        res.status(500).json({
            error:err
        })
    })
})


module.exports = router;