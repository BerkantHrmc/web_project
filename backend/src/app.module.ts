import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { Profile } from './profil/profil.entity';
import { ProfileController } from './profil/profil.controller';
import { ProfileService } from './profil/profil.service';
import { ProfileType } from './profil/profil-type/profil-type.entity'; // Yeni Entity
import { ProfileTypeModule } from './profil/profil-type/profil-type.module'; // Yeni Modül
import { FilmModule } from './film/film.module';
import { Film } from './film/film.entity';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { GenreModule } from './genre/genre.module';
import { Genre } from './genre/genre.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',

      entities: [Profile, ProfileType, Film, Genre],
      synchronize: true,
    }),

    TypeOrmModule.forFeature([Profile]),

    ProfileTypeModule,
    AuthModule,
    FilmModule,
    GenreModule,

    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
    }),
  ],
  controllers: [AppController, ProfileController],
  providers: [AppService, ProfileService],
})
export class AppModule {}
