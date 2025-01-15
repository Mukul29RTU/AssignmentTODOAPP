const mongoose = require("mongoose");

const MyTodoSchema = new mongoose.Schema({
        name: {
            type: String,
            required: true, 
        },
        date: {
            type: Date, 
            required: true,
            min: 0, 
        },
        description: {
            type: String,
            required: true,
        },
        uId:{
          type: String,
          required:true,
        }
    
}, { timestamps: true }); 

const TodoModel = mongoose.model("Student", MyTodoSchema);

module.exports = TodoModel;
