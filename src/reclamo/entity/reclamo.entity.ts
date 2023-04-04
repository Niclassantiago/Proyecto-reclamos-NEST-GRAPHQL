import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity({ name: 'reclamos' })
@ObjectType()
export class Reclamo {

    @Field( ()=> Number )
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Field( ()=> String)
    @Column()
    titulo: string;

    @Column()
    @Field( ()=> String)
    detalle: string;

    @Column()
    @Field( ()=> String)
    problema: string;

    @Column()
    @Field( ()=> Boolean)
    resuelto: boolean = false;

}

//TODO Agregar decorador a "detalle" y convertirlo en objeto ?...