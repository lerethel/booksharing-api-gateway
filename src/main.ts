import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { RpcExceptionFilter } from './common/filters/rpc-exception.filter';
import { RpcExceptionInterceptor } from './common/interceptors/rpc-exception.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());
  app.useGlobalFilters(new RpcExceptionFilter());
  app.useGlobalInterceptors(new RpcExceptionInterceptor());

  await app.listen(3000);
}
bootstrap();
