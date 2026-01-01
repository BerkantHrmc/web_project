import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Profile } from './profil.entity';
import { CreateProfileDto } from './dto/create-profil.dto';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
  ) {}

  findAll() {
    return this.profileRepository.find({ relations: ['profileType'] });
  }

  async findOne(id: number) {
    const profile = await this.profileRepository.findOne({
      where: { id },
      relations: ['profileType'],
    });
    if (!profile) {
      throw new NotFoundException('Kullanıcı bulunamadı');
    }
    return profile;
  }

  async create(createProfileDto: CreateProfileDto, photoUrl: string) {
    // Şifre kontrolü
    if (createProfileDto.password !== createProfileDto.confirmPassword) {
      throw new BadRequestException('Şifreler eşleşmiyor!');
    }

    // confirmPassword'u çıkar
    const { confirmPassword: _confirmPassword, ...profileData } =
      createProfileDto;
    void _confirmPassword;

    const passwordHash = await bcrypt.hash(profileData.password, 10);

    const newProfile = this.profileRepository.create({
      ...profileData,
      password: passwordHash,
      photo: photoUrl,
    });

    const saved = await this.profileRepository.save(newProfile);

    // İlişkiyle birlikte geri döndür
    return this.findOne(saved.id);
  }

  async update(id: number, attrs: Record<string, unknown>, photoUrl?: string) {
    const profile = await this.findOne(id);

    // Şifre kontrolü
    const password = typeof attrs.password === 'string' ? attrs.password : null;
    const confirmPassword =
      typeof attrs.confirmPassword === 'string' ? attrs.confirmPassword : null;
    if (password && confirmPassword && password !== confirmPassword) {
      throw new BadRequestException('Şifreler eşleşmiyor!');
    }

    const patch: Partial<Profile> = {};

    if (typeof attrs.username === 'string') {
      patch.username = attrs.username;
    }
    if (typeof attrs.email === 'string') {
      patch.email = attrs.email;
    }
    if (password) {
      patch.password = await bcrypt.hash(password, 10);
    }
    if (photoUrl) {
      patch.photo = photoUrl;
    }
    // profileTypeId'yi parse et - string veya number olabilir
    if (attrs.profileTypeId !== undefined && attrs.profileTypeId !== null) {
      const profileTypeIdNum = typeof attrs.profileTypeId === 'number' 
        ? attrs.profileTypeId 
        : Number(String(attrs.profileTypeId).trim());
      
      if (!Number.isNaN(profileTypeIdNum) && profileTypeIdNum > 0) {
        patch.profileTypeId = profileTypeIdNum;
      }
    }
    
    // profileTypeId'yi önce çıkar ve ayrı işle
    const profileTypeIdToUpdate = patch.profileTypeId;
    delete patch.profileTypeId;
    
    // Önce diğer alanları güncelle
    if (Object.keys(patch).length > 0) {
      Object.assign(profile, patch);
    }
    
    // profileTypeId'yi direkt set et (relation güncellemesi için kritik)
    if (profileTypeIdToUpdate !== undefined) {
      profile.profileTypeId = profileTypeIdToUpdate;
    }
    
    // Save et - profileTypeId güncellenmiş olmalı
    const saved = await this.profileRepository.save(profile);
    
    // profileTypeId güncellenmişse direkt update query ile de güncelle (kesinlik için)
    if (profileTypeIdToUpdate !== undefined) {
      await this.profileRepository.update(id, { profileTypeId: profileTypeIdToUpdate });
    }

    // Güncellenmiş profili ilişkileriyle birlikte tekrar yükle
    return this.findOne(id);
  }

  async remove(id: number) {
    const profile = await this.findOne(id);
    return this.profileRepository.remove(profile);
  }
}
