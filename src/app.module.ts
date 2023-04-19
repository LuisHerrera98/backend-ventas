import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { EnvConfiguration } from './config/app.config';
import { joiValidationSchema } from './config/joi.validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [ EnvConfiguration ],
      validationSchema: joiValidationSchema
    }),
    MongooseModule.forRoot(process.env.DATABASE_MONGO_URI),
    AuthModule,
  ],
})
export class AppModule {}
