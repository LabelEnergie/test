import {
  CanActivate,
  ExecutionContext,
   Injectable,
   UnauthorizedException,
   createParamDecorator
 } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IS_ADMIN_KEY, IS_PUBLIC_KEY } from './constants';  // Changé de 'src/constants' à './constants'
import { FirebaseService } from './firebase/firebase.service';
import { verify } from 'jsonwebtoken';
import { ENV } from './constants';
import { JwtPayload } from 'jsonwebtoken';

// Add this interface above the AuthGuard class
interface CustomJwtPayload extends JwtPayload {
  id: string;
  email: string;
  isAdmin?: boolean;
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private firebaseService: FirebaseService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    console.log('Route access check:', {
      isPublic,
      path: context.switchToHttp().getRequest().url,
      method: context.switchToHttp().getRequest().method
    });

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    console.log('Token extraction:', {
      hasToken: !!token,
      tokenLength: token?.length,
      timestamp: new Date().toISOString()
    });

    if (!token) {
      console.error('Authentication failed: No token provided');
      throw new UnauthorizedException();
    }
    
    try {
      console.log('Attempting token verification...');
      const decodedToken = await this.firebaseService.auth.verifyIdToken(token);
      
      // Log unique pour la vérification du token
      console.log('Token verification details:', {
        receivedUid: decodedToken.uid,
        email: decodedToken.email,
        authTime: decodedToken.auth_time,
        requestId: Math.random().toString(36).substring(7), // Identifiant unique de requête
        timestamp: new Date().toISOString()
      });
      
      request['auth'] = {
        id: decodedToken.uid,
        email: decodedToken.email,
        emailVerified: decodedToken.email_verified,
        token: token
      };
      
      // Un seul log pour les données d'auth
      console.log('Auth data set:', {
        hasAuth: !!request['auth'],
        userId: request['auth'].id,
        requestPath: request.url,
        method: request.method,
        timestamp: new Date().toISOString()
      });
      
      // Log du body uniquement si c'est une requête POST
      if (request.method === 'POST') {
        console.log('Request payload:', {
          path: request.url,
          timestamp: new Date().toISOString(),
          bodyLength: JSON.stringify(request.body).length
        });
      }
      
      return true;
    } catch (error) {
      console.error('Authentication error:', {
        error: {
          name: error.name,
          message: error.message,
          code: error.code,
          stack: error.stack
        },
        requestPath: request.url,
        timestamp: new Date().toISOString()
      });
      throw new UnauthorizedException(error.message);
    }
  }

  private extractTokenFromHeader(request: Request): string | null {
    const authorization: string = request.headers?.['authorization'];
    if (!authorization) return null;
    const [_, token] = authorization.split(' ', 2);
    return token;
  }
}

export const Auth = createParamDecorator(
  (data: string, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    return request.auth;
  },
);
