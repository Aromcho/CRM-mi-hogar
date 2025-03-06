import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // 📌 Extrae el token del header Authorization
      ignoreExpiration: false, // 📌 Rechazar tokens expirados
      secretOrKey: process.env.JWT_SECRET || 'secretKey123', // 📌 Clave para verificar el token
    });
  }

  async validate(payload: any) {
    return { id: payload.id, email: payload.email, role: payload.role }; // 📌 Devolver datos del usuario
  }
}
