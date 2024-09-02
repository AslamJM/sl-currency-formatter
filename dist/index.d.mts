type Options = {
    commas?: boolean;
    cents?: boolean;
    lang?: "english" | "tamil" | "sinhala";
    prefix?: boolean;
    suffix?: boolean;
    prefixCode?: string;
    suffixCode?: string;
};
declare function formatSLR(value: string | number, options?: Options): string;

export { formatSLR };