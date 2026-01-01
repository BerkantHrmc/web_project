import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from '../profil/profil.entity';

export type JwtPayload = {
  sub: number;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET ?? 'dev-secret-change-me',
    });
  }

  async validate(payload: JwtPayload) {
    const user = await this.profileRepository.findOne({
      where: { id: payload.sub },
      relations: ['profileType'],
    });
    if (!user) {
      throw new UnauthorizedException();
    }
    // request.user
    return user;
  }
}
