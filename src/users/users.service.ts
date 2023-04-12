import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SignupInput } from 'src/auth/dto/inputs/signup.input';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { ValidRoles } from 'src/auth/enums/valid-roles.enum';

@Injectable()
export class UsersService {

  private logger = new Logger('UsersService');

  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>
  ) {}

  async create( signupInput: SignupInput ): Promise<User> { //-------------------------CREATE

    try {
      const newUser = this.usersRepository.create( {
        ...signupInput,
        password: bcrypt.hashSync( signupInput.password, 10 )
      } );

      return await this.usersRepository.save( newUser );

    } catch (error) {
      this.handleDBErrors( error );
      
    }

  }

  async findAll( roles: ValidRoles[]): Promise<User[]> { //-------------------------FIND ALL
    if ( roles.length === 0) return this.usersRepository.find();


    return this.usersRepository.createQueryBuilder()
    .andWhere('ARRAY[roles] && ARRAY[:...roles]')
    .setParameter('roles', roles)
    .getMany();
  }

  findOne(id: string): Promise<User> {
    throw new Error(`findOne method not implemented`)
  }

  async findOneByEmail(email: string): Promise<User> { //-------------------------FIND ONE BY EMAIL
    try {

      return await this.usersRepository.findOneByOrFail({ email })
      
    } catch (error) {

      throw new NotFoundException(`${email} not found`);

/*       this.handleDBErrors({        
      code: 'error-001',
      detail: `${ email } not found`
    }); */
      
    }
  }

  async findOneById(id: string): Promise<User> { //-------------------------FIND ONE BY ID
    try {

      return await this.usersRepository.findOneByOrFail({ id })
      
    } catch (error) {

      throw new NotFoundException(`${id} not found`);
      
    }
  }
/*   update(id: string, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user`;
  } */

  async block(id: string, adminUser: User ): Promise<User> {

    const userToBlock = await this.findOneById(id);

    userToBlock.isActive = false;
    userToBlock.lastUpdateBy = adminUser;

    return await this.usersRepository.save(userToBlock);
  }

  async active(id: string, adminUser: User ): Promise<User> {

    const userToActive = await this.findOneById(id);

    userToActive.isActive = true;
    userToActive.lastUpdateBy = adminUser;

    return await this.usersRepository.save(userToActive);
  }

  private handleDBErrors( error: any ): never {

    
    if ( error.code === '23505' ) {
      throw new BadRequestException( error.detail.replace('Key ',''));
    }
    
    if ( error.code === 'error-001' ) {
      throw new BadRequestException( error.detail.replace('Key ',''));
    }

    this.logger.error( error );

    throw new InternalServerErrorException('Please check server logs');

  }
}
