/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class RefreshJwtGuard implements CanActivate {
  constructor(private jwtService: JwtService) { };
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) throw new UnauthorizedException();
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.jwtRefreshTokenKey,
      });
      request['user'] = payload;
    }
    catch {
      throw new UnauthorizedException();
    }
    return true;
  }
  private extractTokenFromHeader(request: Request) {
    const [type, token] = request.headers.authorization.split(' ') ?? [];
    return type === 'Refresh' ? token : undefined;
  }
}