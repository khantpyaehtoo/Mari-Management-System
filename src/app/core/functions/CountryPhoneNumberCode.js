import * as countryCodes from "country-codes-list";

const myCountryCodesObject = countryCodes.customList(
    "countryCode",
    "[{countryCode}] {countryNameEn}: +{countryCallingCode}",
);

console.log(myCountryCodesObject);

export default myCountryCodesObject;
