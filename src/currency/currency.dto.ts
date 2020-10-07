import { Currencies } from "src/constants/currencies";
import {IsArray, IsDateString, IsDefined, IsEnum, IsNumber, IsOptional, ValidateNested, IsString, MinLength, MaxLength, Length} from 'class-validator'

export interface ICurrencyConvertRequestDto {
    price: number;
    currency: Currencies;
    countryCode: string;
}

export class CurrencyConvertRequestDto implements ICurrencyConvertRequestDto {
    @IsNumber()
    price: number;

    @IsEnum(Currencies)
    currency: Currencies;

    @IsString()
    @MinLength(2)
    @MaxLength(2)
    countryCode: string;
}

export interface CurrencyConvertResponseDto {
    price: number;
    currency: Currencies;
}

export interface CurrencyRateObject {
    currency: string;
    rate: string;
}