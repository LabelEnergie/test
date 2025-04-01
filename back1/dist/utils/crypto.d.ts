import { TAuthTokenData } from 'src/auth/auth.types';
export declare function hash(password: string): string;
export declare function createToken(auth: TAuthTokenData): Promise<string>;
export declare function verifyToken(token: string): Promise<TAuthTokenData>;
