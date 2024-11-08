var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};

// src/formatter.ts
var defaultOptions = {
  commas: true,
  cents: true,
  prefix: true,
  suffix: false,
  lang: "english",
  prefixCode: "Rs.",
  suffixCode: " /=",
  leadingZero: true
};
function isDecimal(n) {
  return n % 1 !== 0;
}
function formatSLR(value, options = defaultOptions) {
  if (typeof value === "string" && isNaN(Number(value))) {
    throw new Error("Invalid Number");
  }
  if (typeof value === "number") {
    if (isDecimal(value)) {
      value = value.toFixed(2);
    }
    value = String(value);
  } else {
    if (value.includes(".")) {
      let [dec, cents] = value.split(".");
      switch (cents.length) {
        case 0:
          cents = "00";
          break;
        case 1:
          cents = "0" + cents;
          break;
        case 2:
          cents = cents;
          break;
        default:
          cents = cents.slice(0, 2);
      }
      value = dec + "." + cents;
    }
  }
  options = createOptionsFactory(options);
  if (options.commas) {
    if (value.includes(".")) {
      const [tens, cents] = value.split(".");
      value = addComma(tens) + "." + (cents.length === 1 ? cents + "0" : cents);
    } else {
      value = addComma(value);
    }
  }
  if (options.cents) {
    if (!value.includes(".")) {
      value = value + ".00";
    }
  } else {
    if (value.includes(".")) {
      value = value.split(".")[0];
    }
  }
  if (options.leadingZero) {
    if (value.includes(".")) {
      const [dec, cent] = value.split(".");
      if (dec.length === 1) {
        value = `0${dec}.${cent}`;
      }
    }
  }
  if (options.prefix) {
    value = options.prefixCode + value;
  }
  if (options.suffix) {
    value = value + options.suffixCode;
  }
  return value;
}
function addComma(value) {
  return value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
function getPrefixForLanguage(lang) {
  return lang === "english" ? "Rs." : lang === "tamil" ? "\u0BF9." : "\u0DBB\u0DD0.";
}
function createOptionsFactory(options) {
  if (options.lang && options.lang !== "english") {
    options.prefixCode = getPrefixForLanguage(options.lang);
  }
  return __spreadValues(__spreadValues({}, defaultOptions), options);
}
export {
  formatSLR
};
