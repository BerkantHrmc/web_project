import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProfileType } from './profil-type.entity';

@Injectable()
export class ProfileTypeService {
  constructor(
    @InjectRepository(ProfileType)
    private profileTypeRepository: Repository<ProfileType>,
  ) {
    void this.seedProfileTypes();
  }

  async seedProfileTypes() {
    const count = await this.profileTypeRepository.count();
    if (count === 0) {
      const types = [
        { name: 'Yönetici' },
        { name: 'Standart Kullanıcı' },
        { name: 'Misafir' },
      ];
      await this.profileTypeRepository.save(types);
      console.log('Profil Tipleri eklendi.');
    }
  }

  findAll() {
    return this.profileTypeRepository.find();
  }
}
