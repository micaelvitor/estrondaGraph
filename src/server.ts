import { ApolloServer } from '@apollo/server';
import Koa from 'koa';
// import cors from "cors"
import http from "http";
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { typeDefs } from './graphql/schemas/schema.js';
import resolvers from './graphql/resolvers/resolver.js';
import router from './routes/routes.js';
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { koaMiddleware } from "@as-integrations/koa";
import bodyParser from "koa-bodyparser";
const database = mongoose.connection;
dotenv.config();
const mongoString: string = process.env.DATABASE_URL as string;
mongoose.connect(mongoString);
const app = new Koa();
// require('ts-node/register');

// var corsOptions = {
//     origin: "*"
// };

// app.use(cors(corsOptions));

// const secret: string = process.env.SECRET as string;


app.use(router.routes()).use(router.allowedMethods())
const httpServer = http.createServer(app.callback());
const server = new ApolloServer({
    cache: "bounded",
    resolvers,
    typeDefs,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});


async function startServer() {
    await server.start();
    app.use(bodyParser());
    app.use(
        koaMiddleware(server, {
            context: async ({ ctx }) => ({ token: ctx.headers.token }),
        })
    );
    const port = 8080;
    app.listen(port, () => {
        console.log('Estronda boost online!');
        console.log('Reset Server escutando na porta %s', port);
    });

    database.on('error', (error) => {
        console.log(error)
    })

    database.once('connected', () => {
        console.log('Database Connected');
    })
}

startServer();