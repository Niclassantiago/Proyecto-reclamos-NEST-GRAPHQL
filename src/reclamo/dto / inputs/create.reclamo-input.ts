import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsString, MaxLength } from "class-validator";

@InputType()
export class createReclamoInput {

    @Field( ()=> String,)
    @IsString()
    @IsNotEmpty()
    @MaxLength(20)
    titulo: string;

    @Field( ()=> String)
    @IsString()
    @IsNotEmpty()
    detalle: string;

    @Field( ()=> String)
    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    problema: string;
}