import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { AUTH_SERVICE } from '@app/common/constants/services';
import { ClientProxy } from '@nestjs/microservices';
import { UserDto } from '@app/common/dto';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(@Inject(AUTH_SERVICE) private readonly authClient: ClientProxy) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const jwt =
      context.switchToHttp().getRequest().cookies?.Authentication ||
      context.switchToHttp().getRequest().headers.authentication;
    if (!jwt) {
      return false;
    }

    try {
      context.switchToHttp().getRequest().user = await lastValueFrom(
        this.authClient.send<UserDto>('authenticate', { Authentication: jwt }),
      );
      return true;
    } catch (error) {
      console.error('Authentication error:', error);
      return false;
    }
  }
}
