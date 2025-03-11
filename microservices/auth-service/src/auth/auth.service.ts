import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  private readonly userServiceUrl =
    process.env.USER_SERVICE_URL || 'http://localhost:4001/users';

  constructor(
    private jwtService: JwtService,
    private httpService: HttpService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`${this.userServiceUrl}/email/${email}`),
      );

      const user = response.data;

      if (!user) {
        throw new UnauthorizedException('Usuario no encontrado');
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new UnauthorizedException('Credenciales inválidas');
      }

      return user;
    } catch (error) {
      throw new UnauthorizedException('Error al validar el usuario');
    }
  }

  async login(user: any) {
    const payload = { id: user._id, email: user.email, role: user.role };
    return { access_token: this.jwtService.sign(payload) };
  }

  async verifyToken(token: string) {
    try {
      return this.jwtService.verify(token);
    } catch (error) {
      throw new UnauthorizedException('Token inválido');
    }
  }
}
