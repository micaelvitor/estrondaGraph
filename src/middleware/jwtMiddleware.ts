import  Jwt from "jsonwebtoken";

export const middlewareJWT = (req: any, res: any, next: any) => {

    const jwt = req.headers["authorization"];
    const secret: string = process.env.SECRET as string;

    Jwt.verify(jwt, secret, (err: any, userInfo: any) => {
        if (err) {
            res.status(403).end();
            return;
        }
        req.userInfo = userInfo;
        next();
    });

};