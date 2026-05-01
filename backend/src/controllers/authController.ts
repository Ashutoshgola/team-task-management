import {Request, Response} from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';


export const signup = async (req:Request, res:Response) =>{

    try{
    const {name,email,password,role} = req.body;
    if (!name || !email || !password) {
  return res.status(400).json({ message: "All fields are required" });

}

    const userExists = await User.findOne({email});

    if(userExists){
        return res.status(400).json({message:"User already exists"});
    }
    const hashedPassword = await bcrypt.hash(password,10);
    const userRole = role === "ADMIN" ? "ADMIN" : "MEMBER";
    const user = await User.create({
        name,
        email,
        password : hashedPassword,
        role: userRole
    });

    res.status(201).json(user);
  } catch(error:any) {
    res.status(500).json({message:error.message});
}
};

export const login = async(req:Request, res:Response) =>{
    try{
        const{email, password} = req.body;

        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message:"Invalid credentials"});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({message:"Invalid credentials"});
        }
        const token = jwt.sign({id:user._id, role: user.role},
         process.env.JWT_SECRET as string, {expiresIn:"7d"});
        res.json({
            token,
            user:{
                _id:user._id,
                name:user.name,
                email:user.email,
                role:user.role
            }
        });
    }catch(error:any){
        res.status(500).json({message:error.message});


    }
};

export const protect = (req: any, res: any, next: any) => {

  const token = req.headers.authorization;

  if (!token) {

    return res.status(401).json({ message: "No token" });

  }

  try {

    const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET as string);

    req.user = decoded;

    next();

  } catch {

    res.status(401).json({ message: "Invalid token" });

  }

};