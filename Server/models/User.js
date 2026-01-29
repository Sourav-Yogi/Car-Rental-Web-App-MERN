import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {type:String , required: true},
    email: {type:String , required: true, unique:true},
    password: {type:String , required: true},
    role: {type:String , enum:["owner", "user"], default:'user'},
    image: {type:String , default:'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.flaticon.com%2Ffree-icon%2Fuser_9187604&psig=AOvVaw13VqqyE4CkJCtEQYQ9GFsI&ust=1769672875888000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCJCV8LLfrZIDFQAAAAAdAAAAABAE'},
},{timestamps: true})

const User =mongoose.model('User', userSchema)

export default User