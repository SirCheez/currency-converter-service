export const EU_COUNTRY_CODES = [
    "AT",
    "BE",
    "BG",
    "HR",
    "CY",
    "CZ",
    "DK",
    "EE",
    "FI",
    "FR",
    "DE",
    "GR",
    "HU",
    "IE",
    "IT",
    "LV",
    "LT",
    "LU",
    "MT",
    "NL",
    "PL",
    "PT",
    "RO",
    "SK",
    "SI",
    "ES",
    "SE"
];

export const COUNTRY_CURRENCIES_BY_CODE: Map<string, string> = new Map([
    [EU_COUNTRY_CODES.toString(), 'EUR'],
    ['RU', 'RUB'],
    ['US', 'USD']
]);