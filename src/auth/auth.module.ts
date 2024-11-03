import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'AUTH',
        transport: Transport.TCP,
        options: { port: 3003, host: 'booksharing-auth' },
      },
    ]),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
  // This makes the guard available to other modules.
  exports: [ClientsModule, AuthService],
})
export class AuthModule {}
