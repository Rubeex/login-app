import { applyDecorators, UseGuards } from "@nestjs/common";
import { Roles } from "src/Common/interfaces/Roles";
import { AuthGuard } from "src/jwt/guard/auth.guard";
import { RolesGuard } from "src/jwt/guard/roles.guard";
import { Rol } from "./roles.decorator";

export function Auth(role: Roles) {
    return applyDecorators(Rol(role), UseGuards(AuthGuard, RolesGuard));
  }