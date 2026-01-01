import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileTypeController } from './profil-type.controller';
import { ProfileTypeService } from './profil-type.service';
import { ProfileType } from './profil-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProfileType])],
  controllers: [ProfileTypeController],
  providers: [ProfileTypeService],
  exports: [ProfileTypeService],
})
export class ProfileTypeModule {}
