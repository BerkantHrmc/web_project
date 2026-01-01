import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { Profile } from '../profil/profil.entity';
import { ProfileType } from '../profil/profil-type/profil-type.entity';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
    @InjectRepository(ProfileType)
    private readonly profileTypeRepository: Repository<ProfileType>,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    if (dto.password !== dto.confirmPassword) {
      throw new BadRequestException('Şifreler eşleşmiyor!');
    }

    const existing = await this.profileRepository
      .createQueryBuilder('p')
      .where('p.username = :username OR p.email = :email', {
        username: dto.username,
        email: dto.email,
      })
      .getOne();
    if (existing) {
      throw new BadRequestException(
        'Kullanıcı adı veya email zaten kullanımda',
      );
    }

    const role = await this.profileTypeRepository.findOne({
      where: { name: 'Standart Kullanıcı' },
    });

    if (!role) {
      throw new BadRequestException('Profil tipi (rol) bulunamadı');
    }

    const passwordHash = await bcrypt.hash(dto.password, 10);

    const user = this.profileRepository.create({
      username: dto.username,
      email: dto.email,
      password: passwordHash,
      // default placeholder, frontend isterse profile upload endpointi kullanır
      photo: '',
      profileTypeId: role.id,
    });

    const saved = await this.profileRepository.save(user);
    return this.sanitize(
      await this.profileRepository.findOne({
        where: { id: saved.id },
        relations: ['profileType'],
      }),
    );
  }

  async login(dto: LoginDto) {
    const user = await this.profileRepository.findOne({
      where: { username: dto.username },
      relations: ['profileType'],
    });
    if (!user) throw new UnauthorizedException('Geçersiz kullanıcı adı/şifre');

    const ok = await this.verifyPassword(dto.password, user.password);
    if (!ok) throw new UnauthorizedException('Geçersiz kullanıcı adı/şifre');

    const access_token = await this.jwtService.signAsync({ sub: user.id });
    return { access_token, user: this.sanitize(user) };
  }

  me(user: Profile) {
    return this.sanitize(user);
  }

  private sanitize(user: Profile | null) {
    if (!user) return null;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...rest } = user;
    return rest;
  }

  private async verifyPassword(plain: string, stored: string) {
    // Backward compatibility for existing plain-text rows
    if (
      stored.startsWith('$2a$') ||
      stored.startsWith('$2b$') ||
      stored.startsWith('$2y$')
    ) {
      return bcrypt.compare(plain, stored);
    }
    return plain === stored;
  }
}
