import { SetMetadata } from '@nestjs/common';
import { Roles } from 'src/Common/interfaces/Roles';

export const ROLES_KEY = 'roles';
export const Rol = (roles: Roles) => SetMetadata(ROLES_KEY, roles);