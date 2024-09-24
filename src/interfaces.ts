export interface CountryData {
  countryCode: string
  name: string
}

export interface CountryHoliday {
  date: string
  localName: string
  name: string
  countryName: string
  countryCode: string
  global: boolean
  counties: string[]
  launchYear: number
  types: string[]
}

export interface CountryFullInfo {
  commonName: string
  officialName: string
  countryCode: string
  region: string
}
