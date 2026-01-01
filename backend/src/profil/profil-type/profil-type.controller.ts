import { Controller, Get } from '@nestjs/common';
import { ProfileTypeService } from './profil-type.service';

@Controller('profileTypes')
export class ProfileTypeController {
  constructor(private readonly profileTypeService: ProfileTypeService) {}

  @Get()
  findAll() {
    return this.profileTypeService.findAll();
  }
}
