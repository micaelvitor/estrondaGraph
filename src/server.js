import { ApolloServer } from 'apollo-server-koa';
import Koa from 'koa';
// import cors from "cors"
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import typeDefs from './graphql/schemas/schema.js';
import resolvers from './graphql/resolvers/resolver.js';
import koaJwt from 'koa-jwt';


const database = mongoose.connection;
dotenv.config();
const mongoString = process.env.DATABASE_URL;
mongoose.connect(mongoString);

const app = new Koa();

// var corsOptions = {
//     origin: "*"
// };

// app.use(cors(corsOptions));


const secret = process.env.SECRET;
const middlewareJwt = koaJwt({ secret }).unless({ path: ['/login','/register'] });
app.use(middlewareJwt);


const server = new ApolloServer({
    debug: true,
    playground: true,
    tracing: true,
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