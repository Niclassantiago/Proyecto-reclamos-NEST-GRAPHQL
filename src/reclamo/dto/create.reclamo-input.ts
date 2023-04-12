import { Field, InputType } from "@nestjs/graphql";
import { IsDateString, IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator";

@InputType()
export class createReclamoInput {

    @Field( ()=> String)
    @IsString()
    @IsNotEmpty()
    @MaxLength(20)
    title: string;

    /* @Field( ()=> String)
    @IsString()
    @IsNotEmpty()
    detail: string; */

    @Field( ()=> String)
    @IsString()
    @IsNotEmpty()
    purchaseDate: string;

    @Field( ()=> Number)
    @IsNumber()
    @IsNotEmpty()
    purchaseId: Number;

    @Field( ()=> String)
    @IsString()
    @IsNotEmpty()
    productCode: string;

    @Field( ()=> String)
    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    problem: string;
}