import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*', // 或指定域名：["http://localhost:3000"]
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true, // 如果你需要携带 cookie
  });
  //设置全局前缀
  // app.setGlobalPrefix('api');

  await app.listen(process.env.WEB_PROT ?? 3000);
  console.log('process.env.PORT:', process.env.WEB_PROT);
}
bootstrap();
