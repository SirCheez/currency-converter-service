import { Currencies } from "../constants/currencies";
import { EU_COUNTRY_CODES, COUNTRY_CURRENCIES_BY_CODE } from "../constants/countries";

export const shouldConvert = (currency: Currencies, countryCode: string) => {
    const currencyMatchesCountry = Array.from(COUNTRY_CURRENCIES_BY_CODE).some(it =>
        (it[0].includes(countryCode) && it[1] === currency)
    )

    const nonDollarUsingCountries = [...EU_COUNTRY_CODES, "RU"]

    // Check if country is not EU member or RU and current currency is USD. No need to convert in that case.
    if(!currencyMatchesCountry && !nonDollarUsingCountries.includes(countryCode) && currency === Currencies.USD) {
        return false
    }

    return !currencyMatchesCountry
}

export const getCurrencyByCountryCode = (countryCode: string) => {
    const foundMatchingCountry = Array.from(COUNTRY_CURRENCIES_BY_CODE).find(it => it[0].includes(countryCode))
    if (foundMatchingCountry) {
        return Currencies[foundMatchingCountry[1]]
    }

    return Currencies.USD;
}