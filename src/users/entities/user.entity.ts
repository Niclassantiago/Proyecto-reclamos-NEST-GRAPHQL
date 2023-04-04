import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
@ObjectType()
export class User {

  @Field(() => String, { name: 'id' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => String )
  @Column()
  name: string;

  
}
