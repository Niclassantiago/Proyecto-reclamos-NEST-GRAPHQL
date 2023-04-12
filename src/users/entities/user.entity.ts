import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { type } from 'os';
import { Reclamo } from 'src/reclamo/entity/reclamo.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
@ObjectType()
export class User {

  @Field(() => ID, { name: 'id' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => String )
  @Column()
  fullName: string;

  //@Field(() => String )
  @Column()
  password: string;

  @Field(() => [String] )
  @Column({
    type: 'text',
    array: true,
    default: ['user']
  })
  roles: string[];

  @Field(() => String )
  @Column({
    type: 'boolean',
    default: true
  })
  isActive: boolean;

  @Field(() => String )
  @Column({unique: true})
  email: string;
  
  @ManyToOne( ()=> User, (user) => user.lastUpdateBy,{ nullable: true, lazy: true})
  @JoinColumn({ name: 'lastUpdateBy' })
  @Field(()=> User, {nullable: true})
  lastUpdateBy?: User;

  @OneToMany( ()=> Reclamo, (reclamo) => reclamo.user)
  @Field(()=> [Reclamo] )
  reclamos: Reclamo[];
}
