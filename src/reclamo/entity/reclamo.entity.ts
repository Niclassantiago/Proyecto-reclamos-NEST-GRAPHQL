import { Field, ID, ObjectType } from "@nestjs/graphql";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, Index, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity({ name: 'reclamos' })
@ObjectType()
export class Reclamo {

    @Field( ()=> Number )
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Field( ()=> String)
    @Column()
    title: string;

    @Column()
    @Field( ()=> String)
    detail: string;

    @Column()
    @Field( ()=> String)
    problem: string;

    @Column()
    @Field( ()=> Boolean)
    isActive: boolean = true;

    @ManyToOne( ()=> User, (user)=> user.reclamos, { nullable: false} )
    @Index('userId-index')
    @Field(()=> User)
    user: User;
}

//TODO Agregar decorador a "detalle" y convertirlo en objeto ?...