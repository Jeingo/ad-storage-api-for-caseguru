import { INestApplication, ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './utils/exception-filter/exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export async function setup(app: INestApplication): Promise<INestApplication> {
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({ stopAtFirstError: true }));
  app.useGlobalFilters(new HttpExceptionFilter());

  //swagger
  const config = new DocumentBuilder()
    .setTitle('Api for ad storage')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  return app;
}
