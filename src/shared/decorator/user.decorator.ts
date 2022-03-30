import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const JwtPayloadData = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;
    return user;
  },
);
