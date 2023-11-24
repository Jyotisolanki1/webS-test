import mongoose from "mongoose";
import bcrypt from 'bcryptjs';
const userSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required:true,
        unique : true
    },
    password:{
        type: String,
        required:true
    },
    mobileNumber:{
        type: String,
        required:true
    },
    zipCode:{
        type: String,
        required:true
    },  
    location: {
        type: {
          type: String,
          enum: ['Point'],
          required: true
        },
        coordinates: {
          type: [Number],
          required: true
        }
      }
},{
    timestamp : true
});

userSchema.pre('save', async function(next){
   if(!this.isModified('password')){
    next();
   }
   const salt = await bcrypt.genSalt(10);
   this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword , this.password)
}

const User = mongoose.model('User', userSchema);
export default User;