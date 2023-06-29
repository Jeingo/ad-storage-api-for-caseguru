import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ConfigType } from './configuration';
import { setup } from './setting';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService<ConfigType>);

  const appSetup = await setup(app);

  await appSetup.listen(configService.get('port'));
}
bootstrap();
