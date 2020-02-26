import { createParamDecorator } from '@nestjs/common';

export const CurrentUser = createParamDecorator((key: string, req) => {
  return key ? req.user && req.user[key] : req.user;
});
