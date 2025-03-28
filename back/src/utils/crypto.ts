import { createHash } from 'crypto';
import * as jwt from 'jsonwebtoken';
import { TAuthTokenData } from 'src/auth/auth.types';
import { ENV } from 'src/constants';

export function hash(password: string) {
  return createHash('sha256').update(password).digest('hex');
}

export async function createToken(auth: TAuthTokenData): Promise<string> {
  return new Promise((resolve, reject) => {
    jwt.sign(
      auth,
      ENV().JWT_SECRET || 'default_secret',  // Use direct env variable
      { 
        expiresIn: parseInt(ENV().JWT_EXPIRES_IN) || 604800 // Convert to number (7 days in seconds)
      },
      (err, token) => {
        if (err) reject(err);
        resolve(token);
      }
    );
  });
}

export async function verifyToken(token: string): Promise<TAuthTokenData> {
  return new Promise((resolve, reject) => {
    jwt.verify(token, ENV().JWT_SECRET, (err, decoded) => {
      if (err) reject(err);
      resolve(decoded as TAuthTokenData);
    });
  });
}
