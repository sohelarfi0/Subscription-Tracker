import { Router } from "express";
import { getUser ,getUsers} from "../controller/user.controller";
import authorize from "../middleware/auth.middleware";
const userRouter=Router();
userRouter.get('/',getUsers);
userRouter.get('/:id',authorize,getUser);
userRouter.post('/',(req,res)=>res.send({title:'Create new user'}));
userRouter.put('/:id',(req,res)=>res.send({title:'Update user'}));
userRouter.delete('/:id',(req,res)=>res.send({title:'Delete user'}));

export default userRouter;