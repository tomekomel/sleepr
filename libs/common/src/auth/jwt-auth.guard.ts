import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { AUTH_SERVICE } from '@app/common/constants/services';
import { ClientProxy } from '@nestjs/microservices';
import { UserDto } from '@app/common/dto';
import { Reflector } from '@nestjs/core';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    @Inject(AUTH_SERVICE) private readonly authClient: ClientProxy,
    private readonly reflector: Reflector,
  ) {}
  private readonly logger = new Logger(JwtAuthGuard.name);

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const jwt =
      context.switchToHttp().getRequest().cookies?.Authentication ||
      context.switchToHttp().getRequest().headers.authentication;
    if (!jwt) {
      return false;
    }

    const roles = this.reflector.get<string[]>('roles', context.getHandler());

    try {
      const user = await lastValueFrom(
        this.authClient.send<UserDto>('authenticate', { Authentication: jwt }),
      );
      if (roles) {
        for (const role of roles) {
          if (!user.roles?.includes(role)) {
            this.logger.error('The user does not have a valid role');
            throw new UnauthorizedException();
          }
        }
      }
      context.switchToHttp().getRequest().user = user;
      return true;
    } catch (error) {
      console.error('Authentication error:', error);
      return false;
    }
  }
}
