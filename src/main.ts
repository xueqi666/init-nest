import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionFilter } from './filters/all-exception';
async function bootstrap() {
  let logger = new Logger();
  const app = await NestFactory.create(AppModule, {
    // 关闭整个日志
    // logger: false,
    // logger: ['error', 'warn'],
  });
  app.enableCors({
    origin: '*', // 或指定域名：["http://localhost:3000"]
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true, // 如果你需要携带 cookie
  });
  //设置全局前缀
  // app.setGlobalPrefix('api');

  // app.useGlobalFilters(new HttpExceptionFilter());

  app.useGlobalFilters(new AllExceptionFilter());
  await app.listen(process.env.WEB_PROT ?? 3000);

  logger.log(`App端口 localhost:${process.env.WEB_PROT}`);
}
bootstrap();
