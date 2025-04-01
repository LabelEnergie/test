import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  createParamDecorator,
  Logger
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from './constants';
import { FirebaseService } from './firebase/firebase.service';

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly logger = new Logger(AuthGuard.name);

  constructor(
    private reflector: Reflector,
    private firebaseService: FirebaseService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    this.logger.debug({
      message: 'Route access check',
      path: request.url,
      method: request.method,
      isPublic
    });

    if (isPublic) {
      return true;
    }

    const token = this.extractTokenFromHeader(request);
    if (!token) {
      this.logger.warn('No authentication token provided');
      throw new UnauthorizedException('Authentication token missing');
    }

    try {
      const decodedToken = await this.verifyFirebaseToken(token);
      this.setRequestAuth(request, decodedToken, token);
      
      this.logger.log({
        message: 'Successful authentication',
        userId: decodedToken.uid,
        email: decodedToken.email,
        path: request.url
      });

      return true;
    } catch (error) {
      this.logger.error({
        message: 'Authentication failed',
        error: error.message,
        stack: error.stack,
        path: request.url
      });
      
      throw new UnauthorizedException(this.getFriendlyError(error));
    }
  }

  private async verifyFirebaseToken(token: string) {
    try {
      return await this.firebaseService.auth.verifyIdToken(token, true);
    } catch (error) {
      // Gestion spécifique des erreurs Firebase
      if (error.code === 'auth/id-token-expired') {
        throw new Error('Token expired - please refresh your authentication');
      } else if (error.code === 'auth/argument-error') {
        throw new Error('Invalid token format - ensure you are using a valid Firebase ID token');
      }
      throw error;
    }
  }

  private setRequestAuth(request: any, decodedToken: any, rawToken: string) {
    request.auth = {
      id: decodedToken.uid,
      email: decodedToken.email,
      emailVerified: decodedToken.email_verified,
      isAdmin: decodedToken.admin || false,
      token: rawToken,
      authTime: new Date(decodedToken.auth_time * 1000)
    };
  }

  private extractTokenFromHeader(request: any): string | null {
    const authHeader = request.headers?.authorization;
    if (!authHeader) return null;
    
    const [type, token] = authHeader.split(' ');
    return type === 'Bearer' ? token : null;
  }

  private getFriendlyError(error: any): string {
    if (error.message.includes('Firebase ID token has no "kid" claim')) {
      return 'Invalid authentication token format - please login again';
    }
    if (error.message.includes('Token expired')) {
      return 'Your session has expired - please login again';
    }
    return 'Authentication failed - please check your credentials';
  }
}

export const Auth = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.auth;
  }
);