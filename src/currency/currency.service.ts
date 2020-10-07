import { Injectable, HttpService } from '@nestjs/common';
import { CurrencyConvertResponseDto, CurrencyRateObject } from './currency.dto';
import { Currencies } from '../constants/currencies';
import { getCurrencyByCountryCode } from './currency.utils';
const util = require("util")
const {parseString} = require("xml2js");

interface ICurrencyService {
    getCurrencyRates(): Promise<CurrencyRateObject[]>;
    convertCurrency(price: number, currency: Currencies, countryCode: string, xml: CurrencyRateObject[]): Promise<CurrencyConvertResponseDto>;
}

@Injectable()
export class CurrencyService implements ICurrencyService {
    constructor(private readonly httpService: HttpService) {}

    async getCurrencyRates(): Promise<CurrencyRateObject[]> {
        const currencyRates = await this.httpService.get(`https://www.ecb.europa.eu/stats/eurofxref/eurofxref-hist-90d.xml`).toPromise();
        let rates: CurrencyRateObject[];

        await parseString(currencyRates.data, (err, result) => {
            rates = result['gesmes:Envelope'].Cube[0].Cube[0].Cube.map(it => it.$);
        })

        return rates;
    }

    async convertCurrency(price: number, currency: Currencies, countryCode: string, rates: CurrencyRateObject[]): Promise<CurrencyConvertResponseDto> {
        const currentCurrencyObject = rates.find(it => it.currency === currency)
        const currentCurrencyRate = currentCurrencyObject ? +parseFloat(currentCurrencyObject.rate).toFixed(2) : 1;
        const countryCurrency = getCurrencyByCountryCode(countryCode);

        if (countryCurrency === Currencies.EUR) {
            return {price: +(price / currentCurrencyRate).toFixed(2), currency: countryCurrency}
        }

        const countryCurrencyObject = rates.find(it => it.currency === countryCurrency);
        const countryCurrencyRate = parseFloat(countryCurrencyObject.rate).toFixed(2);

        // @ts-ignore
        const priceInEuros = price / currentCurrencyRate;
        
        // @ts-ignore
        const convertedPrice = +(countryCurrencyRate * priceInEuros).toFixed(3);
        return {price: convertedPrice, currency: countryCurrency}
    }
}