import { config } from "config";
import UserModel from "../models/user";
import { errorController } from "./error.controller";

class CookieOptions {
  httpOnly: boolean;
  domain?: string;
  sameSite: string;
  secure: boolean;
  maxAge?: number;
  expires?: Date;

  constructor(httpOnly: boolean, sameSite: string, secure: boolean) {
    this.httpOnly = httpOnly;
    this.sameSite = sameSite;
    this.secure = secure;
  }
}

export class authController extends errorController{
    private accessTokenExpireIn: number;
    private refreshTokenExpireIn: number;

    constructor() {
        super();
        this.accessTokenExpireIn = config.get('jwtAccessTokenExpiresIn');
        this.refreshTokenExpireIn = config.get('jwtRefreshTokenExpiresIn');
    }

    private getCookieOptions(): CookieOptions {
        const cookieOptions = new CookieOptions(true, "none", true);
        if (process.env.NODE_ENV === 'production') {
            cookieOptions.secure = true;
        }
        return cookieOptions;
    }

    public getAccessTokenCookieOptions(): CookieOptions {
        const cookieOptions = this.getCookieOptions();
        const maxAge = this.accessTokenExpireIn * 60 * 1000;
        const expires = new Date(Date.now() + maxAge);
        cookieOptions.maxAge = maxAge;
        cookieOptions.expires = expires;
        return cookieOptions;
    }

    public getRefreshTokenCookieOptions(): CookieOptions {
        const cookieOptions = this.getCookieOptions();
        const maxAge = this.refreshTokenExpireIn * 60 * 1000;
        const expires = new Date(Date.now() + maxAge);
        cookieOptions.maxAge = maxAge;
        cookieOptions.expires = expires;
        return cookieOptions;
    }

    public async signTokens(user) {

        // Create access token
        const access_token = signJwt({ user: user.id }, 'JWT_ACCESS_PRIVATE_KEY', {
            expiresIn: `${config.get('jwtAccessTokenExpiresIn')}m`,
        });

        // Create refresh token
        const refresh_token = signJwt({ user: user.id }, 'JWT_REFRESH_PRIVATE_KEY', {
            expiresIn: `${config.get('jwtRefreshTokenExpiresIn')}m`,
        });

        return { access_token, refresh_token };
    }

    public async login(parent, { input: { email, password } }, { req, res }) {
        try {
            // Check if user exists and password is correct
            const user = await UserModel
                .findOne({ email })
                .select('+password');

            if (!user || !(await user.comparePasswords(password, user.password))) {
                throw new AuthenticationError('Invalid email or password');
            }

            user.password = undefined;

            // Create a session and tokens
            const { access_token, refresh_token } = await this.signTokens(user);

            // Add refreshToken to cookie
            const accessTokenCookieOptions = this.getAccessTokenCookieOptions();
            const refreshTokenCookieOptions = this.getRefreshTokenCookieOptions();

            res.cookie('refresh_token', refresh_token, refreshTokenCookieOptions);
            res.cookie('access_token', access_token, accessTokenCookieOptions);
            res.cookie('logged_in', true, {
                ...accessTokenCookieOptions,
                httpOnly: false,
            });

            return {
                status: 'success',
                access_token,
            };
        } catch (error) {
            this.errorHandler(error);
        }
    }
}