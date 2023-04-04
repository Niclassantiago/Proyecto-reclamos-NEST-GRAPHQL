import { Field, ID, InputType } from "@nestjs/graphql";
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from "class-validator";

@InputType()
export class updateReclamoInput {

    @Field( ()=> Number)
    @IsNumber()
    @IsNotEmpty()
    id: number;

    @Field( ()=> String, {nullable: true})
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    @MaxLength(20)
    titulo?: string;

    @Field( ()=> String, {nullable: true})
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    detalle?: string;

    @Field( ()=> String, {nullable: true})
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    @MaxLength(50)
    problema?: string;

    @Field( ()=> Boolean, {nullable: true})
    @IsOptional()
    @IsBoolean()
    resuelto?: boolean;
}