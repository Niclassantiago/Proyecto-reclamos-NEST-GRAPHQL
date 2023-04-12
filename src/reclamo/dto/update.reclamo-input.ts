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
    title?: string;

    @Field( ()=> String, {nullable: true})
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    detail?: string;

    @Field( ()=> String, {nullable: true})
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    @MaxLength(50)
    problem?: string;

    @Field( ()=> Boolean, {nullable: true})
    @IsOptional()
    @IsBoolean()
    isActive?: boolean;
}