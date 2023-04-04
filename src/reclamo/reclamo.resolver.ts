import { Resolver, Query, Args, Int, Mutation, ID } from '@nestjs/graphql';
import { createReclamoInput } from './dto/create.reclamo-input';
import { updateReclamoInput } from './dto/update.reclamo-input';
import { Reclamo } from './entity/reclamo.entity';
import { ReclamoService } from './reclamo.service';

@Resolver( ()=> Reclamo )
export class ReclamoResolver {

    constructor(
        private readonly reclamoService: ReclamoService
    ){}

    @Query( ()=> [Reclamo], {name:"reclamos"})
    async findAll(): Promise<Reclamo[]> {
        return this.reclamoService.findAll();
    }

    @Query( ()=> Reclamo, {name:"reclamo"})
    async findOne( 
        @Args ('id', {type: ()=> Number }) id: number): Promise<Reclamo>
        {
        return this.reclamoService.findOne( id );
    }

    /* @Query( ()=> [Reclamo], {name:"ReclamosPorCoincidencia"})
    findBy(
        @Args ("text", {type: ()=> String }) text: string)
        {
            return this.reclamoService.findBy( text );
        } */

    @Mutation(()=> Reclamo, {name: 'createReclamo'})
    async createReclamo(
        @Args ('createReclamoInput') createReclamoInput : createReclamoInput
    ): Promise<Reclamo> {
        return this.reclamoService.create(createReclamoInput);
    }

    @Mutation(()=> Reclamo, {name: 'updateReclamo'})
    async updateReclamo(
        @Args ('updateReclamoInput') updateReclamoInput : updateReclamoInput
    ): Promise<Reclamo> {
        return this.reclamoService.update(updateReclamoInput.id, updateReclamoInput);
    }

    @Mutation(()=> Reclamo, {name: 'deleteReclamo'})
    deleteReclamo(
        @Args ('id', {type: ()=> Int}) id: number
    ) {
        return this.reclamoService.delete(id);
    }
}
