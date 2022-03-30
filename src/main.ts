import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import * as morgan from 'morgan';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './shared/http-exception';
import { TransformInterceptor } from './shared/http-interceptor';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);const enableSwagger = true;
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Wash Station API')
    .setDescription('Wash Station API description')
    .setVersion('1.0')
    .addBearerAuth({ in: 'headers', type: 'http' })
    .build();
  app.useGlobalPipes(
    new ValidationPipe({
      disableErrorMessages: false,
      transform: true,
      whitelist: true,
    }),
  );
  app.use(helmet());
  app.use(morgan('tiny'));
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new TransformInterceptor());
  app.enableCors({
    credentials: true,
    origin: (origin, callback) => {
      console.log('[DEBUG] :: ', origin);
      return callback(null, true);
    },
    methods: 'GET, PUT, POST, DELETE',
  });

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  if (enableSwagger === true) {
    SwaggerModule.setup('api/document', app, document);
  }
  await app.listen(3000);
  console.log(`\nApplication is running!!!\n`);
}
bootstrap();
