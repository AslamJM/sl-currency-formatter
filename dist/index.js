"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// index.ts
var sl_currency_formatter_exports = {};
__export(sl_currency_formatter_exports, {
  formatSLR: () => formatSLR
});
module.exports = __toCommonJS(sl_currency_formatter_exports);

// src/formatter.ts
var defaultOptions = {
  commas: true,
  cents: true,
  prefix: true,
  suffix: false,
  lang: "english",
  prefixCode: "Rs.",
  suffixCode: " /="
};
function formatSLR(value, options = defaultOptions) {
  if (typeof value === "string" && isNaN(Number(value))) {
    throw new Error("Invalid Number");
  }
  if (typeof value === "number") {
    value = String(value);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  formatSLR
});
