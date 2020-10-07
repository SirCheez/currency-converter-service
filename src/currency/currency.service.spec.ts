import { CurrencyService } from "./currency.service"
import { Currencies } from "../constants/currencies"
import { Test } from "@nestjs/testing"
import { HttpModule } from "@nestjs/common"

describe('CurrencyService', () => {
    let currencyService: CurrencyService

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [HttpModule],
            providers: [CurrencyService]
        }).compile()
    
        currencyService = moduleRef.get<CurrencyService>(CurrencyService);
    })

    it('service should be defined', () => {
        expect(currencyService).toBeDefined();
    });

    describe('getCurrencyRates', () => {
        it('should return the array of currency objects', async () => {
          const rates = await currencyService.getCurrencyRates();
          const ratesCurrenciesAmount = 32;

          expect(rates.length).toBe(ratesCurrenciesAmount);
          expect(Array.isArray(rates)).toBe(true);
          expect(rates[0]).toBeDefined();
          expect(typeof rates[0].rate).toBe("string")
          expect(typeof rates[0].currency).toBe("string")
        });
    });
    
    describe('convertCurrency', () => {
        it('should return same currency and price (country matches currency - no need to convert)', async () => {
            const rates = await currencyService.getCurrencyRates();
            const expectedResult = {price: 100, currency: Currencies.USD}
            const converted = await currencyService.convertCurrency(expectedResult.price, expectedResult.currency, "US", rates);
            expect(converted).toEqual(expectedResult)
        })

        it('should return converted currency and price in EUR', async () => {
            const rates = await currencyService.getCurrencyRates();
            const mockData = {price: 100, currency: Currencies.USD}
            const converted = await currencyService.convertCurrency(mockData.price, mockData.currency, "AT", rates);
            expect(converted.currency).toEqual(Currencies.EUR);

            // not really best test case if EUR price will go below USD
            expect(converted.price).toBeLessThan(mockData.price);
        })

        it('should return converted currency and price in RUB', async () => {
            const rates = await currencyService.getCurrencyRates();
            const mockData = {price: 100, currency: Currencies.EUR}
            const converted = await currencyService.convertCurrency(mockData.price, mockData.currency, "RU", rates);
            expect(converted.currency).toEqual(Currencies.RUB);

            // same: not really best test case if RUB price will go above EUR
            expect(converted.price).toBeGreaterThan(mockData.price);
        })
    })
})