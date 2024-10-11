import bcrypt from "bcrypt";
import User from "../models/user.js";
import jwt from "jsonwebtoken";

export async function registerUser(req, res) {
  try {
    const {password, email, firstName, lastName} = req.body;

    const user= await User.findOne({email});
    if(user){
        return res.status(400).json({message: "User already exists"});
    }

    const newUser = new User({
        email,
        password: bcrypt.hashSync(password, 10),
        firstName,
        lastName
    });

    await newUser.save();
    res.status(201).json({message: "User created successfully"});

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error}" }); 
  }

}

export async function login(req, res) {
  try {
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if(!user){
        return res.status(400).json({message: "User does not exist"});
    }
    if(!bcrypt.compareSync(password, user.password)){
        return res.status(400).json({message: "Invalid credentials"});
    }
    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '1d'});
    res.status(200).json({token});
  }
  catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error}" }); 
  }
}

export async function getUser(req, res) {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if(!user){
            return res.status(400).json({message: "User does not exist"});
        }
        res.status(200).json(user);
    }catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error}" }); 
    }
}

export async function updateUser(req, res) {
    try {
        const user = await User.findById(req.user.id);
        if(!user){
            return res.status(400).json({message: "User does not exist"});
        }

        const {password, email, firstName, lastName} = req.body;

        if(password){
            user.password = bcrypt.hashSync(password, 10);
        }
        if(email){
            user.email = email;
        }
        if(firstName){
            user.firstName = firstName;
        }
        if(lastName){
            user.lastName = lastName;
        }

        await user.save();
        res.status(200).json({message: "User updated successfully"});

    }catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error}" }); 
    }
}

export async function deleteUser(req, res) {
    try {
        const user = await User.findById(req.user.id);
        if(!user){
            return res.status(400).json({message: "User does not exist"});
        }
        await user.deleteOne({_id: req.user.id});
        res.status(200).json({message: "User deleted successfully"});
    }catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error}" }); 
    }
}