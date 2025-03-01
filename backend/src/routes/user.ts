import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { sign } from "hono/jwt";
import { SigninSchema,  SignupSchema } from "@ahmed_bargir/medium_types_new";

import bcrypt from 'bcryptjs'
 
export const userRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    }
}>();

 
userRouter.post('/signup', async (c) => {
   try {
    console.log('database url  is ', c.env.DATABASE_URL);
    console.log('jwt token is ', c.env.JWT_SECRET);
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate());
    
      const body = await c.req.json();
    console.log('data is ', body);
    
      const verifySchema = SignupSchema.safeParse(body)
      if(!verifySchema.success){
          return c.json({
              msg:"please provide the valid schema!",
              error:verifySchema.error.flatten(),
              success:false
          })
      }
      const {name, email, password} = verifySchema.data;

      const userExist = await prisma.user.findUnique({
        where:{email}
      })
      if(userExist){
        c.status(403)
        return c.json({
            msg:"user already exists login instead!"
        })
      }

      const salt = await bcrypt.genSalt(10)
      const hashPassword = await bcrypt.hash(password, salt)
      const user = await prisma.user.create({
        data: {
          name, 
          email, 
          password:hashPassword
        },
      });
    
      
      
      
      const token = await sign({ id: user.id }, c.env.JWT_SECRET)
     
      c.status(200)
      return c.json({
        msg:"user created success",
        success:true,
        user,
        jwt: token
      })
   } catch (error:any) {
    console.log('error', error.message);
    
   }
})
  
userRouter.post('/signin', async (c) => {
   try {
    const prisma = new PrismaClient({
        //@ts-ignore
            datasourceUrl: c.env?.DATABASE_URL	,
        }).$extends(withAccelerate());
    
         
        const body = await c.req.json();
        const verifySchema = SigninSchema.safeParse(body)
    
        if(!verifySchema.success){
            return c.json({
                msg:"please provide the valid schema!",
                error:verifySchema.error.flatten(),
                success:false
            })
        }
    
        const {email, password} = verifySchema.data
        const user = await prisma.user.findUnique({
            where: {
                email,
         
            }
        });
    
        if (!user) {
            c.status(403);
            return c.json({ error: "user not found" });
        }
         
        const verifyPassword = await bcrypt.compare(password, user.password)
        if(!verifyPassword){
            c.status(403);
            return c.json({ error: "please provide the correct password" });
        }
    
        const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
        return c.json({ 
          msg:'user login success!',
          success:true,
          jwt

        });
   }  catch (error:any) {
    console.log('error', error.message);
   }
})