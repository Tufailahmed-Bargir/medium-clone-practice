import { BlogSchema } from "@ahmed_bargir/medium_types_new";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";

export const bookRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    },
    Variables: {
        userId: string
    }
}>();

bookRouter.use(async (c, next) => {
    const jwt = c.req.header('Authorization');
	if (!jwt) {
		c.status(401);
		return c.json({ error: "unauthorized" });
	}
	const token = jwt.split(' ')[1];
	const payload = await verify(token, c.env.JWT_SECRET);
	if (!payload) {
		c.status(401);
		return c.json({ error: "unauthorized" });
	}
    // @ts-ignore
	c.set('userId', payload.id);
	await next()
});

bookRouter.post('/', async (c) => {
	const userId = c.get('userId');
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());

	const body = await c.req.json();
    const verifySchema = BlogSchema.safeParse(body)
    if(!verifySchema.success){
        c.status(403)
        return c.json({
            msg:"provide the valid formate"
        })
    }

    const {title, desc} = verifySchema.data
	const post = await prisma.blog.create({
		data: {
			title,
            desc,
			authorId: userId,
            publish:true
		}
	});
	return c.json({
		id: post.id
	});
})

bookRouter.put('/', async (c) => {
	const userId = c.get('userId');
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());

	const body = await c.req.json();
	prisma.blog.update({
		where: {
			id: body.id,
			authorId: userId
		},
		data: {
			title: body.title,
			desc: body.content
		}
	});

	return c.text('updated post');
});

bookRouter.get('/:id', async (c) => {
	const id = c.req.param('id');
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());
	
	const post = await prisma.blog.findUnique({
		where: {
			id
		}
	});

	return c.json(post);
})