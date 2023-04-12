import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Reclamo } from 'src/reclamo/entity/reclamo.entity';
import { ReclamoService } from 'src/reclamo/reclamo.service';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { SEED_RECLAMOS, SEED_USERS } from './data/seed-data';

@Injectable()
export class SeedService {

    private isProd: boolean;

    constructor(
        private readonly configService: ConfigService,

        @InjectRepository(Reclamo)
        private readonly reclamosRepository: Repository<Reclamo>,

        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,

        private readonly usersService: UsersService,

        private readonly reclamosService: ReclamoService
    ) {
        this.isProd = configService.get('STATE') === 'prod'
    }


    async executeSeed() {

        if( this.isProd) {
            throw new UnauthorizedException('We cannot run SEED on Prod')
        }
    //lIMPIAR BASE DE DATOS

        await this.deleteDatabase();

    //CREAR USUARIOS
        const user = await this.loadUsers();


    //CREAR RECLAMOS
        await this.loadReclamos( user );


        return true;
    }

    async deleteDatabase() {

        await this.reclamosRepository.createQueryBuilder()
            .delete()
            .where({})
            .execute();

        await this.usersRepository.createQueryBuilder()
            .delete()
            .where({})
            .execute();
    }

    async loadUsers(): Promise<User> {
        const users = [];

        for (const user of SEED_USERS ) {
            users.push(await this.usersService.create( user ))
        }

        return users[0];
    }

    async loadReclamos( user: User): Promise<void> {
        const reclamosPromises = [];

        for (const reclamo of SEED_RECLAMOS ) {
            reclamosPromises.push( this.reclamosService.create( reclamo, user ))
        }

        await Promise.all( reclamosPromises );

    }
}
