import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { WishesModule } from './wishes/wishes.module';
import { WishlistsModule } from './wishlists/wishlists.module';
import { OffersModule } from './offers/offers.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { User } from './users/entities/user.entity';
import { Wish } from './wishes/entities/wish.entity';
import { Wishlist } from './wishlists/entities/wishlist.entity';
import { Offer } from './offers/entities/offer.entity';
import { WishPartial } from './wishes/entities/wish-partial.entity';

require('dotenv').config();

@Module({
  imports: [
    UsersModule,
    WishesModule,
    WishlistsModule,
    OffersModule,
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env['POSTGRES_HOST'] || 'localhost',
      port: parseInt(process.env['POSTGRES_PORT']) || 5432,
      username: process.env['POSTGRES_USER'] || 'student',
      password: process.env['POSTGRES_PASSWORD'] || 'student',
      database: process.env['POSTGRES_DB'] || 'kupipodariday',
      entities: [User, Wish, Wishlist, Offer, WishPartial],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
