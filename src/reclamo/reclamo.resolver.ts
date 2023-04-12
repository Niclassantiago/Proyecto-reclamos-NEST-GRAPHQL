import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Args, Int, Mutation, ID } from '@nestjs/graphql';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { ValidRolesArgs } from 'src/auth/dto/inputs/args/roles.arg';
import { ValidRoles } from 'src/auth/enums/valid-roles.enum';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { PaginationArgs } from 'src/common/dto/args/pagination.args';
import { User } from 'src/users/entities/user.entity';
import { createReclamoInput } from './dto/create.reclamo-input';
import { updateReclamoInput } from './dto/update.reclamo-input';
import { Reclamo } from './entity/reclamo.entity';
import { ReclamoService } from './reclamo.service';

@Resolver( ()=> Reclamo )
@UseGuards( JwtAuthGuard )
export class ReclamoResolver {

    constructor(
        private readonly reclamoService: ReclamoService
    ){}

    /* @Query( ()=> [Reclamo], {name:"reclamos"})
    async findAll(
        
    ): Promise<Reclamo[]> {
        return this.reclamoService.findAll();
    } */

    @Query(() => [Reclamo], { name: 'reclamos' })
  findAll(
    @Args() validRoles: ValidRolesArgs,
    @Args() paginationArgs: PaginationArgs,
    @CurrentUser([ValidRoles.admin]) reclamo: Reclamo
  ):Promise<Reclamo[]> {

    return this.reclamoService.findAll( validRoles.roles, paginationArgs );
  }

    @Query( ()=> Reclamo, {name:"reclamoPorId"})
    async findOneByiD( 
        @Args ('id', {type: ()=> Number }) id: number
        ): Promise<Reclamo>
        {
        return this.reclamoService.findOneById( id );
    }

    @Query( ()=> [Reclamo], {name:"ReclamosPorCoincidencia"})
    findBy(
        @Args ("text", {type: ()=> String }) text: string)
        {
            return this.reclamoService.findBy( text );
        }

    @Mutation(()=> Reclamo, {name: 'createReclamo'})
    async createReclamo(
        @Args ('createReclamoInput') createReclamoInput : createReclamoInput,
        @CurrentUser() user: User
    ): Promise<Reclamo> {
        return this.reclamoService.create(createReclamoInput, user);
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
