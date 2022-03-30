import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiForbiddenResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { RoleService } from './role.service';

@Controller('role')
@ApiTags('Role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get()
  @ApiOkResponse({
    description: 'The response list has been successfully returned.',
  })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  async findRoles() {
    return await this.roleService.findAll();
  }
}
