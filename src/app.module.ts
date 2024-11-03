import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { CatalogModule } from './catalog/catalog.module';
import { UserModule } from './user/user.module';

@Module({ imports: [CatalogModule, UserModule, AuthModule] })
export class AppModule {}
