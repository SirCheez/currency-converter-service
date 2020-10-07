import { Controller, Get, Body } from '@nestjs/common';
import { CurrencyConvertRequestDto } from './currency.dto';
import { CurrencyService } from './currency.service';
import { shouldConvert } from './currency.utils';

@Controller('/currency')
export class CurrencyController {
    constructor(private readonly currencyService: CurrencyService){}

    @Get('/convert')
    async convertCurrency(@Body() dto: CurrencyConvertRequestDto) {
        const {countryCode, currency, price} = dto;

        // Check if you don't need to convert currency
        if (shouldConvert(currency, countryCode)) {
            const rates = await this.currencyService.getCurrencyRates();
            return this.currencyService.convertCurrency(price, currency, countryCode, rates)
        }

        return {price, currency}
    }
}