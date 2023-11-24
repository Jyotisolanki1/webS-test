import asyncHandler from 'express-async-handler';
import User from '../model/userModel.js';
import generateToken from '../utils/generateToken.js';
import axios from 'axios'
//@decs  user auth /set token
//route POST /api/userś/auth
//access public
const authUser = asyncHandler(async(req, res) =>{
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if(user && (await user.matchPassword(password))){
        generateToken(res, user._id)
            res.status(200).json({
                id : user._id,
                name : user.name,
                email : user.email,
                password : user.password
            })
            
        }else{
            res.status(401);
            throw new Error('Invalid email and password')
        }
res.status(200).json({msg : "success"});
});

//@decs  register new user
//route POST /api/users
//access public


const getLatLongFromZipCode = async (zipCode) => {
  const apiKey = '0094c925561444a98ee5d20f02f17933'; // Replace with your OpenCage API key
  const apiUrl = `https://api.opencagedata.com/geocode/v1/json?q=${zipCode}&key=${apiKey}`;

  try {
    const response = await axios.get(apiUrl);

    if (response.data.results.length > 0) {
      const { lat, lng } = response.data.results[0].geometry;
      return { lat: lat, lang: lng };
     
    } else {
      return('No results found for the given zip code.');
    }
  } catch (error) {
   return('Error fetching data:', error.message);
  }
};



const registerUser = asyncHandler(async (req, res) => {
  const zipcode = req.body.zipCode
  const { lat, lang } = await getLatLongFromZipCode(zipcode);
 
  const { name, email, password,mobileNumber,zipCode} = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const user = await User.create({
    name,
    email,
    password,
    mobileNumber,
    zipCode,
    location: {
      type: 'Point',
      coordinates: [lang, lat]
    }
    
  });

 
  if (user) {
     generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      mobileNumber:user.mobileNumber,
      zipCode:user.zipCode,
      msg: "register success"
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

const setcook= async(req,res) =>{
  res.cookie('cookieName', 'cookieValue', { maxAge: 900000, httpOnly: true });
    res.send('Cookie set successfully');
}

//@decs  logout user
//route POST /api/users/logout
//access public
const logoutUser = asyncHandler(async(req, res) =>{
    res.cookie('jwt','', {
        httpOnly:true,
        expires: new Date(0)
    })
    res.status(200).json({msg : "user logout success"});
    });


//@decs  get user profile
//route get /api/userś/profile
//access private
const getUserProfile = asyncHandler(async(req, res) =>{
    const user = {
        _id : user_id,
        name : user.name,
        email : user.email,
    }
    res.status(200).json(user); 
    });


//@decs  updateuser profile
//route PUT /api/userś/profile
//access public
const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
  
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.mobileNumber = req.body.mobileNumber || user.mobileNumber;
  
      if (req.body.password) {
        user.password = req.body.password;
      }
  
      const updatedUser = await user.save();
  
      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        mobileNumber: updatedUser.mobileNumber,

      });
    } else {
      res.status(404);
      throw new Error('User not found');
    }
  });

  const getNearUser = asyncHandler(async (req, res) => {   
console.log(req.params.id)
    try {
      const loggedInUser = await User.findById(req.params.id);
      const lang = loggedInUser.location.coordinates[0];      
      const lat = loggedInUser.location.coordinates[1];  
      const nearestUsers = await User.aggregate([
        {
          $geoNear: {
            near: {
              type: "Point",
              coordinates: [lang, lat]
            },
            distanceField: "dist.calculated",
            maxDistance: 10000 * 1609,
            spherical: true,
            key: "location"
          }
        },
        {
          $skip: 1 
        },
        {
          $limit: 5
        }
      ]);
      res.json(nearestUsers);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  
});


  export{
    authUser,
    registerUser,
    updateUserProfile,
    getUserProfile,
    logoutUser,
    setcook,
    getNearUser

}
//