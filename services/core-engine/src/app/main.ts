import { NestFactory } from '@nestjs/core';
import { AppModule } from './AppModule'; // ✅ هذا هو المسار الصحيح

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ السماح للواجهة (Next.js) بالاتصال بالمحرك السيادي
  app.enableCors({
    origin: [
      'http://localhost:3000',
      'http://192.168.8.13:3000', // شبكة جهازك (اختياري)
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  });

  const port = process.env.CORE_ENGINE_PORT
    ? parseInt(process.env.CORE_ENGINE_PORT, 10)
    : 5100;

  await app.listen(port);
  const url = await app.getUrl();
  console.log(`NEOMIND Core Engine is running on ${url}`);
}

bootstrap().catch((err) => {
  console.error('Failed to bootstrap NEOMIND Core Engine', err);
  process.exit(1);
});
