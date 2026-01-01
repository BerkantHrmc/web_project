import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { CreateProfileDto } from './dto/create-profil.dto';
import { ProfileService } from './profil.service';
import type { Express } from 'express';
import { Request } from 'express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { Profile } from './profil.entity';

type AuthedRequest = Request & { user: Profile };

@Controller('profiles')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@Req() req: AuthedRequest) {
    const user = req.user;
    const isAdmin = user?.profileType?.name === 'Yönetici';
    // Admin tüm profilleri görebilir, standart kullanıcılar da görebilir (sadece görüntüleme)
    return this.profileService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('Yönetici')
  findOne(@Param('id') id: string) {
    return this.profileService.findOne(parseInt(id));
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('Yönetici')
  @UseInterceptors(
    FileInterceptor('photo', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  create(
    @Body(new ValidationPipe({ transform: true }))
    createProfileDto: CreateProfileDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      throw new Error('Fotoğraf yüklemek zorunludur.');
    }

    const photoUrl = `http://localhost:3000/uploads/${file.filename}`;

    return this.profileService.create(createProfileDto, photoUrl);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileInterceptor('photo', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  update(
    @Param('id') id: string,
    @UploadedFile() file?: Express.Multer.File,
    @Req() req?: AuthedRequest,
  ) {
    const user = req?.user;
    const isAdmin = user?.profileType?.name === 'Yönetici';
    const targetId = parseInt(id);
    if (!user) throw new ForbiddenException('Giriş gerekli');
    if (!isAdmin && user.id !== targetId) {
      throw new ForbiddenException('Yetkisiz');
    }
    const photoUrl = file
      ? `http://localhost:3000/uploads/${file.filename}`
      : undefined;
    
    // FormData'dan gelen değerleri req.body'den al (Multer ile parse edilmiş)
    const formData = req?.body || {};
    const parsedBody: Record<string, unknown> = {};
    
    if (formData.username) parsedBody.username = String(formData.username).trim();
    if (formData.email) parsedBody.email = String(formData.email).trim();
    if (formData.password && String(formData.password).trim() !== '') {
      parsedBody.password = String(formData.password);
    }
    if (formData.confirmPassword && String(formData.confirmPassword).trim() !== '') {
      parsedBody.confirmPassword = String(formData.confirmPassword);
    }
    
    // profileTypeId'yi parse et - FormData'dan string olarak gelir
    const profileTypeIdValue = formData.profileTypeId;
    
    // Tüm olası formatları kontrol et
    if (profileTypeIdValue !== undefined && profileTypeIdValue !== null) {
      let profileTypeIdNum: number;
      
      if (typeof profileTypeIdValue === 'number') {
        profileTypeIdNum = profileTypeIdValue;
      } else if (typeof profileTypeIdValue === 'string') {
        const trimmed = profileTypeIdValue.trim();
        if (trimmed !== '' && trimmed !== 'undefined' && trimmed !== 'null') {
          profileTypeIdNum = Number(trimmed);
        } else {
          profileTypeIdNum = NaN;
        }
      } else {
        profileTypeIdNum = Number(profileTypeIdValue);
      }
      
      if (!Number.isNaN(profileTypeIdNum) && profileTypeIdNum > 0) {
        parsedBody.profileTypeId = profileTypeIdNum;
      }
    }
    
    return this.profileService.update(targetId, parsedBody, photoUrl);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string, @Req() req: AuthedRequest) {
    const user = req.user;
    const isAdmin = user.profileType?.name === 'Yönetici';
    const targetId = parseInt(id);
    if (!isAdmin && user.id !== targetId) {
      throw new ForbiddenException('Yetkisiz');
    }
    return this.profileService.remove(targetId);
  }
}
