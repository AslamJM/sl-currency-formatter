# sl-currency-formatter

A simple and flexible currency Javascript formatter for the Srilankan Rupee

## Installation

You can install the package via npm:

```bash
npm install sl-currency-formatter
```

## Usage

```ts
import { formatSLR } from "sl-currency-formatter";
```

or

```js
const { formatSLR } = require("sl-currency-formatter");
```

```ts
console.log(formatSLR(123344));
console.log(formatSLR("4555.50", { lang: "tamil" }));
```

#### Parameters

- `options` (object):
  - `commas` (boolean,default=true): determines whether the output is comma seperated.
  - `cents` (boolean,default=true): display the cents.
  - `lang` ("english"|"sinhala"|"tamil"): language for prefix (default: 'en-US').
  - `prefix` (boolean,default=true): include prefix.
  - `prefixCode` (string,default="Rs."): prefix string.
  - `suffixCode` (string,default=" /="): suffix string
