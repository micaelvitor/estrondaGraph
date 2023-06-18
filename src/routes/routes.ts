import Router from 'koa-router';
import { Context } from 'koa';
import jwt, { Secret } from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const router = new Router();
const SECRET: Secret = process.env.SECRET as Secret;

interface AuthRequestBody {
  username: string;
  password: string;
}

router.post('/login', async (ctx: Context) => {
  const { username, password } = ctx.request.body as AuthRequestBody;
  const token = jwt.sign({ username }, SECRET, { expiresIn: '24h' });
  ctx.body = { token };
});

router.get('/register', async (ctx: Context) => {
    ctx.body = "<h1>Froxilda porra!!!</h1>";
});

export default router;
