import Router from 'koa-router';
import jwt, { Secret } from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const router = new Router();
const SECRET: Secret = process.env.SECRET as Secret;

router.post('/login', async (ctx: any) => {
  // Lógica de autenticação
  const { username, password } = ctx.request.body;
  // ...

  // Se a autenticação for bem-sucedida, gere um token JWT
  const token = jwt.sign({ username }, SECRET!, { expiresIn: '1h' });

  ctx.body = { token };
});