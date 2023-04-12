import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../users/entities/user.entity';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { LoginInput } from './dto/inputs/login.input';
import { SignupInput } from './dto/inputs/signup.input';
import { ValidRoles } from './enums/valid-roles.enum';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { AuthResponse } from './types/auth-response.type';

@Resolver( ()=> AuthResponse )
export class AuthResolver {
  constructor(private readonly authService: AuthService
    ) {}

    @Mutation( ()=> AuthResponse , {name: 'signup'})
    async signup(
      @Args('signupInput') signupInput: SignupInput 
    ): Promise<AuthResponse> { 
      return this.authService.signup( signupInput );
    }

    @Mutation( ()=> AuthResponse , {name: 'login'})
    async login(
      @Args('loginInput') loginInput: LoginInput
    ): Promise<AuthResponse> {
      return this.authService.login(loginInput);
    }

    @Query( ()=> AuthResponse , {name: 'revalite'})
    @UseGuards( JwtAuthGuard )
    revalidateToken(
    @CurrentUser( /* [ValidRoles.admin] */) user: User
    ): AuthResponse {
      return this.authService.revalidateToken( user );

    }
}
