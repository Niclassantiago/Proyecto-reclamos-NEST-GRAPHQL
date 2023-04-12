import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { take } from 'rxjs';
import { ValidRoles } from 'src/auth/enums/valid-roles.enum';
import { PaginationArgs } from 'src/common/dto/args/pagination.args';
import { User } from 'src/users/entities/user.entity';
import { ILike, Like, Repository } from 'typeorm';
import { createReclamoInput } from './dto/create.reclamo-input';
import { updateReclamoInput } from './dto/update.reclamo-input';
import { Reclamo } from './entity/reclamo.entity';

@Injectable()
export class ReclamoService {

    constructor(
        @InjectRepository( Reclamo )
        private readonly reclamosRepository: Repository<Reclamo>,
    ) {}

    async create( createReclamoInput: createReclamoInput, user: User ): Promise<Reclamo> {
        const newReclamo = {...createReclamoInput, detail: `${createReclamoInput.purchaseId},${createReclamoInput.productCode},${createReclamoInput.purchaseDate}`, user}
        const createdReclamo = this.reclamosRepository.create( newReclamo )
        return await this.reclamosRepository.save( createdReclamo )
    }

    //Todos los reclamos 

    async findAll( roles: ValidRoles[], paginationArgs: PaginationArgs): Promise<Reclamo[]> { //-------------------------FIND ALL
        
        const { limit , offset } = paginationArgs;
        console.log(roles)
  
        return this.reclamosRepository.find({
            take: limit,
            skip: offset,
        });
      }
 
    //Un solo reclamo buscado por id
    async findOneById(id: number): Promise<Reclamo> {
        
        const reclamo = await this.reclamosRepository.findOneBy ({ id });

        if ( !reclamo ) throw new NotFoundException(`El reclamo con id: ${id} no existe`);

        return reclamo;
    }

    //Los reclamos que contengan el texto indicado en el titulo o problema
    async findBy(text: string): Promise<Reclamo[]> {

        const reclamo = await this.reclamosRepository.find({ where: {
            title: ILike(`%${text}%`)
        }});

        if ( !reclamo ) throw new NotFoundException(`No se encontraron reclamos con ese texto`);

        return reclamo;
    }


    async update(id: number, updateReclamoInput: updateReclamoInput ): Promise<Reclamo> {
        const {title, problem, detail, isActive} = updateReclamoInput;

        const reclamoToUpdate = await this.reclamosRepository.preload( updateReclamoInput )

        return this.reclamosRepository.save( reclamoToUpdate );

    }

    async delete( id: number): Promise<Reclamo> {
        const reclamo = await this.findOneById( id )

        await this.reclamosRepository.remove(reclamo);

        return {...reclamo, id};
    }

}
 