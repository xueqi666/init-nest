import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import Configuration from './configuration';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogsModule } from './logs/logs.module';

const envFilePath = `.env.${process.env.NODE_ENV || 'dev'}`;
@Module({
  imports: [
    UserModule,
    LogsModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath, // 读取简单的配置变量 ,env 文件
      load: [Configuration], // 读取复杂配置变量 config文件夹下的
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (ConfigService: ConfigService) => ({
        type: ConfigService.get('DB').type,
        host: ConfigService.get('DB').host,
        port: ConfigService.get('DB').port,
        username: ConfigService.get('DB').username,
        password: ConfigService.get('DB').password,
        database: ConfigService.get('DB').database,
        synchronize: true,
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        logging: ['error'],
      }),
    }),
  ],
})
export class AppModule {}
