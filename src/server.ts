import { ApolloServer } from 'apollo-server-koa';
import Koa from 'koa';
// import cors from "cors"
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import typeDefs from './graphql/schemas/schema';
import resolvers from './graphql/resolvers/resolver';
import koaJwt from 'koa-jwt';
import router from './routes/routes'


const database = mongoose.connection;
dotenv.config();
const mongoString: string = process.env.DATABASE_URL as string;
mongoose.connect(mongoString);
const app = new Koa();
require('ts-node/register');

// var corsOptions = {
//     origin: "*"
// };

// app.use(cors(corsOptions));

const secret: string = process.env.SECRET as string;
const middlewareJwt = koaJwt({ secret }).unless(
    { path: 
        [
            '/login',
            '/register'
        ] 
    }
);

app.use(router.routes()).use(router.allowedMethods()).use(middlewareJwt);

const server = new ApolloServer({
    cache: "bounded",
    debug: true,
    resolvers,
    typeDefs
});

async function startServer() {
    await server.start();
    const port = 8080;
    app.listen(port, () => {
        console.log('Estronda boost online!');
        console.log('Server escutando na porta %s', port);
    });

    database.on('error', (error) => {
        console.log(error)
    })

    database.once('connected', () => {
        console.log('Database Connected');
    })
}

startServer();