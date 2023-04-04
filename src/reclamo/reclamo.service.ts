import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createReclamoInput } from './dto/create.reclamo-input';
import { updateReclamoInput } from './dto/update.reclamo-input';
import { Reclamo } from './entity/reclamo.entity';

@Injectable()
export class ReclamoService {

    constructor(
        @InjectRepository( Reclamo )
        private readonly reclamosRepository: Repository<Reclamo>,
    ) {}

    async create( createReclamoInput: createReclamoInput ): Promise<Reclamo> {

        const newReclamo = this.reclamosRepository.create( createReclamoInput )
        return await this.reclamosRepository.save( newReclamo )
    }

    //Todos los reclamos 
    async findAll(): Promise<Reclamo[]> {
        /* if ( this.reclamosRepository.find() === 0 ) throw new NotFoundException(`No existen reclamos`);
        return this.reclamos; */
        return this.reclamosRepository.find();
    }
 
    //Un solo reclamo buscado por id
    async findOne(id: number): Promise<Reclamo> {
        const reclamo = await this.reclamosRepository.findOneBy ({ id });

        if ( !reclamo ) throw new NotFoundException(`El reclamo con id: ${id} no existe`);

        return reclamo;
    }

    //Los reclamos que contengan el texto indicado en el titulo o problema
    /* async findBy(text: string): Promise<Reclamo[]> {

        const reclamos = [];

        this.reclamosRepository.forEach((reclamo) => {
            if (reclamo.titulo.search(text) != -1 || reclamo.problema.search(text) != -1 ) {
                reclamos.push(reclamo);
            }
        })

        if ( reclamos.length === 0 ) throw new NotFoundException(`No se encontraron reclamos con ese texto`);

        return reclamos;
    } */


    async update(id: number, updateReclamoInput: updateReclamoInput ): Promise<Reclamo> {
        const {titulo, problema, detalle, resuelto} = updateReclamoInput;

        const reclamoToUpdate = await this.reclamosRepository.preload( updateReclamoInput )

        return this.reclamosRepository.save( reclamoToUpdate );

    }

    async delete( id: number): Promise<Reclamo> {
        const reclamo = await this.findOne( id )

        await this.reclamosRepository.remove(reclamo);

        return {...reclamo, id};
    }

}
 