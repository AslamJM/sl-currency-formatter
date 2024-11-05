type Options = {
    commas?: boolean
    cents?: boolean
    lang?: "english" | "tamil" | "sinhala",
    prefix?: boolean
    suffix?: boolean
    prefixCode?: string
    suffixCode?: string
    leadingZero?: boolean

}

const defaultOptions: Options = {
    commas: true,
    cents: true,
    prefix: true,
    suffix: false,
    lang: 'english',
    prefixCode: "Rs.",
    suffixCode: " /=",
    leadingZero: true
}

function isDecimal(n: number) {
    return n % 1 !== 0;
}


export function formatSLR(value: string | number, options: Options = defaultOptions): string {

    if (typeof value === "string" && isNaN(Number(value))) {
        throw new Error("Invalid Number")
    }

    if (typeof value === 'number') {
        if (isDecimal(value)) {
            value = value.toFixed(2)
        }
        value = String(value)
    }

    options = createOptionsFactory(options)

    if (options.commas) {
        if (value.includes(".")) {
            const [tens, cents] = value.split(".")
            value = addComma(tens) + "." + (cents.length === 1 ? cents + "0" : cents)
        } else {
            value = addComma(value)
        }
    }

    if (options.cents) {
        if (!value.includes(".")) {
            value = value + ".00"
        }
    } else {
        if (value.includes(".")) {
            value = value.split(".")[0]
        }
    }

    if (options.leadingZero) {
        if (value.includes(".")) {
            const [dec, cent] = value.split(".")

            if (dec.length === 1) {
                value = `0${dec}.${cent}`
            }
        }
    }

    if (options.prefix) {
        value = options.prefixCode + value
    }

    if (options.suffix) {
        value = value + options.suffixCode
    }

    return value
}


function addComma(value: string) {
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

function getPrefixForLanguage(lang: "english" | "tamil" | "sinhala") {
    return lang === "english" ? "Rs." : lang === "tamil" ? "\u0BF9." : "\u0DBB\u0DD0."

}

function createOptionsFactory(options: Options): Options {
    if (options.lang && options.lang !== "english") {
        options.prefixCode = getPrefixForLanguage(options.lang)
    }

    return { ...defaultOptions, ...options }
}
