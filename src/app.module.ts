import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import Configuration from './configuration';
import { EchartsModule } from './echarts/echarts.module';
import { LogsModule } from './logs/logs.module';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';

const envFilePath = `.env.${process.env.NODE_ENV || 'dev'}`;
@Module({
  imports: [
    UserModule,
    LogsModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [envFilePath, '.env'],
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
        // logging: process.env.NODE_ENV === 'dev' ? true : false,
        logging: false,
      }),
    }),
    EchartsModule,
    RoleModule,
  ],
})
export class AppModule {}
