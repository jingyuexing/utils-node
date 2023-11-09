import { reactive } from "@/reactive";
import { Dict } from "../types";
import { Option } from "../options";
import { isArray, isNone, isNull, isNumber, isString, isUndefined } from "../typeis";

type OneOfRule = `oneof=${string};`;
type MaxOrMin = `${"max" | "min"}=${number | string};`;
type GreatThan = `gt=${number};`;
type GreatThanOrEqual = `gte=${number};`;
type LessThan = `lt=${number};`;
type LessThanOrEqual = `lte=${number};`;

type ValidateObject<T> = {
  [K in keyof T]: string;
};
const alphaRegexString = "^[a-zA-Z]+$";
const alphaNumericRegexString = "^[a-zA-Z0-9]+$";
const alphaUnicodeRegexString = "^[\\p{L}]+$";
const alphaUnicodeNumericRegexString = "^[\\p{L}\\p{N}]+$";
const numericRegexString = "^[-+]?[0-9]+(?:\\.[0-9]+)?$";
const numberRegexString = "^[0-9]+$";
const hexadecimalRegexString = "^(0[xX])?[0-9a-fA-F]+$";
const hexColorRegexString = "^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$";
const rgbRegexString =
  "^rgb\\(\\s*(?:(?:0|[1-9]\\d?|1\\d\\d?|2[0-4]\\d|25[0-5])\\s*,\\s*(?:0|[1-9]\\d?|1\\d\\d?|2[0-4]\\d|25[0-5])\\s*,\\s*(?:0|[1-9]\\d?|1\\d\\d?|2[0-4]\\d|25[0-5])|(?:0|[1-9]\\d?|1\\d\\d?|2[0-4]\\d|25[0-5])%\\s*,\\s*(?:0|[1-9]\\d?|1\\d\\d?|2[0-4]\\d|25[0-5])%\\s*,\\s*(?:0|[1-9]\\d?|1\\d\\d?|2[0-4]\\d|25[0-5])%)\\s*\\)$";
const rgbaRegexString =
  "^rgba\\(\\s*(?:(?:0|[1-9]\\d?|1\\d\\d?|2[0-4]\\d|25[0-5])\\s*,\\s*(?:0|[1-9]\\d?|1\\d\\d?|2[0-4]\\d|25[0-5])\\s*,\\s*(?:0|[1-9]\\d?|1\\d\\d?|2[0-4]\\d|25[0-5])|(?:0|[1-9]\\d?|1\\d\\d?|2[0-4]\\d|25[0-5])%\\s*,\\s*(?:0|[1-9]\\d?|1\\d\\d?|2[0-4]\\d|25[0-5])%\\s*,\\s*(?:0|[1-9]\\d?|1\\d\\d?|2[0-4]\\d|25[0-5])%)\\s*,\\s*(?:(?:0.[1-9]*)|[01])\\s*\\)$";
const hslRegexString =
  "^hsl\\(\\s*(?:0|[1-9]\\d?|[12]\\d\\d|3[0-5]\\d|360)\\s*,\\s*(?:(?:0|[1-9]\\d?|100)%)\\s*,\\s*(?:(?:0|[1-9]\\d?|100)%)\\s*\\)$";
const hslaRegexString =
  "^hsla\\(\\s*(?:0|[1-9]\\d?|[12]\\d\\d|3[0-5]\\d|360)\\s*,\\s*(?:(?:0|[1-9]\\d?|100)%)\\s*,\\s*(?:(?:0|[1-9]\\d?|100)%)\\s*,\\s*(?:(?:0.[1-9]*)|[01])\\s*\\)$";
const emailRegexString =
  "^(?:(?:(?:(?:[a-zA-Z]|\\d|[!#\\$%&'\\*\\+\\-\\/=\\?\\^_`{\\|}~]|[\\x{00A0}-\\x{D7FF}\\x{F900}-\\x{FDCF}\\x{FDF0}-\\x{FFEF}])+(?:\\.([a-zA-Z]|\\d|[!#\\$%&'\\*\\+\\-\\/=\\?\\^_`{\\|}~]|[\\x{00A0}-\\x{D7FF}\\x{F900}-\\x{FDCF}\\x{FDF0}-\\x{FFEF}])+)*)|(?:(?:\\x22)(?:(?:(?:(?:\\x20|\\x09)*(?:\\x0d\\x0a))?(?:\\x20|\\x09)+)?(?:(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x7f]|\\x21|[\\x23-\\x5b]|[\\x5d-\\x7e]|[\\x{00A0}-\\x{D7FF}\\x{F900}-\\x{FDCF}\\x{FDF0}-\\x{FFEF}])|(?:(?:[\\x01-\\x09\\x0b\\x0c\\x0d-\\x7f]|[\\x{00A0}-\\x{D7FF}\\x{F900}-\\x{FDCF}\\x{FDF0}-\\x{FFEF}]))))*(?:(?:(?:\\x20|\\x09)*(?:\\x0d\\x0a))?(\\x20|\\x09)+)?(?:\\x22))))@(?:(?:(?:[a-zA-Z]|\\d|[\\x{00A0}-\\x{D7FF}\\x{F900}-\\x{FDCF}\\x{FDF0}-\\x{FFEF}])|(?:(?:[a-zA-Z]|\\d|[\\x{00A0}-\\x{D7FF}\\x{F900}-\\x{FDCF}\\x{FDF0}-\\x{FFEF}])(?:[a-zA-Z]|\\d|-|\\.|~|[\\x{00A0}-\\x{D7FF}\\x{F900}-\\x{FDCF}\\x{FDF0}-\\x{FFEF}])*(?:[a-zA-Z]|\\d|[\\x{00A0}-\\x{D7FF}\\x{F900}-\\x{FDCF}\\x{FDF0}-\\x{FFEF}])))\\.)+(?:(?:[a-zA-Z]|[\\x{00A0}-\\x{D7FF}\\x{F900}-\\x{FDCF}\\x{FDF0}-\\x{FFEF}])|(?:(?:[a-zA-Z]|[\\x{00A0}-\\x{D7FF}\\x{F900}-\\x{FDCF}\\x{FDF0}-\\x{FFEF}])(?:[a-zA-Z]|\\d|-|\\.|~|[\\x{00A0}-\\x{D7FF}\\x{F900}-\\x{FDCF}\\x{FDF0}-\\x{FFEF}])*(?:[a-zA-Z]|[\\x{00A0}-\\x{D7FF}\\x{F900}-\\x{FDCF}\\x{FDF0}-\\x{FFEF}])))\\.?$";
const e164RegexString = "^\\+[1-9]?[0-9]{7,14}$";
const base64RegexString = "^(?:[A-Za-z0-9+\\/]{4})*(?:[A-Za-z0-9+\\/]{2}==|[A-Za-z0-9+\\/]{3}=|[A-Za-z0-9+\\/]{4})$";
const base64URLRegexString = "^(?:[A-Za-z0-9-_]{4})*(?:[A-Za-z0-9-_]{2}==|[A-Za-z0-9-_]{3}=|[A-Za-z0-9-_]{4})$";
const base64RawURLRegexString = "^(?:[A-Za-z0-9-_]{4})*(?:[A-Za-z0-9-_]{2,4})$";
const iSBN10RegexString = "^(?:[0-9]{9}X|[0-9]{10})$";
const iSBN13RegexString = "^(?:(?:97(?:8|9))[0-9]{10})$";
const uUID3RegexString = "^[0-9a-f]{8}-[0-9a-f]{4}-3[0-9a-f]{3}-[0-9a-f]{4}-[0-9a-f]{12}$";
const uUID4RegexString = "^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$";
const uUID5RegexString = "^[0-9a-f]{8}-[0-9a-f]{4}-5[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$";
const uUIDRegexString = "^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$";
const uUID3RFC4122RegexString = "^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-3[0-9a-fA-F]{3}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$";
const uUID4RFC4122RegexString =
  "^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$";
const uUID5RFC4122RegexString =
  "^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-5[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$";
const uUIDRFC4122RegexString = "^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$";
const uLIDRegexString = "^[A-HJKMNP-TV-Z0-9]{26}$";
const md4RegexString = "^[0-9a-f]{32}$";
const md5RegexString = "^[0-9a-f]{32}$";
const sha256RegexString = "^[0-9a-f]{64}$";
const sha384RegexString = "^[0-9a-f]{96}$";
const sha512RegexString = "^[0-9a-f]{128}$";
const ripemd128RegexString = "^[0-9a-f]{32}$";
const ripemd160RegexString = "^[0-9a-f]{40}$";
const tiger128RegexString = "^[0-9a-f]{32}$";
const tiger160RegexString = "^[0-9a-f]{40}$";
const tiger192RegexString = "^[0-9a-f]{48}$";
const aSCIIRegexString = "^[\x00-\x7F]*$";
const printableASCIIRegexString = "^[\x20-\x7E]*$";
const multibyteRegexString = "[^\x00-\x7F]";
const dataURIRegexString = "^data:((?:w+/(?:([^;]|;[^;]).)+)?)";
const latitudeRegexString = "^[-+]?([1-8]?\\d(\\.\\d+)?|90(\\.0+)?)$";
const longitudeRegexString = "^[-+]?(180(\\.0+)?|((1[0-7]\\d)|([1-9]?\\d))(\\.\\d+)?)$";
const sSNRegexString =
  "^[0-9]{3}[ -]?(0[1-9]|[1-9][0-9])[ -]?([1-9][0-9]{3}|[0-9][1-9][0-9]{2}|[0-9]{2}[1-9][0-9]|[0-9]{3}[1-9])$";
const hostnameRegexStringRFC952 = "^[a-zA-Z]([a-zA-Z0-9-]+[.]?)*[a-zA-Z0-9]$"; // https://tools.ietf.org/html/rfc952
const hostnameRegexStringRFC1123 = "^([a-zA-Z0-9]{1}[a-zA-Z0-9-]{0,62}){1}(.[a-zA-Z0-9]{1}[a-zA-Z0-9-]{0,62})*?$"; // accepts hostname starting with a digit https://tools.ietf.org/html/rfc1123
const fqdnRegexStringRFC1123 =
  "^([a-zA-Z0-9]{1}[a-zA-Z0-9-]{0,62})(.[a-zA-Z0-9]{1}[a-zA-Z0-9-]{0,62})*?(.[a-zA-Z]{1}[a-zA-Z0-9]{0,62}).?$"; // same as hostnameRegexStringRFC1123 but must contain a non numerical TLD (possibly ending with '.')
const btcAddressRegexString = "^[13][a-km-zA-HJ-NP-Z1-9]{25,34}$"; // bitcoin address
const btcAddressUpperRegexStringBech32 = "^BC1[02-9AC-HJ-NP-Z]{7,76}$"; // bitcoin bech32 address https://en.bitcoin.it/wiki/Bech32
const btcAddressLowerRegexStringBech32 = "^bc1[02-9ac-hj-np-z]{7,76}$"; // bitcoin bech32 address https://en.bitcoin.it/wiki/Bech32
const ethAddressRegexString = "^0x[0-9a-fA-F]{40}$";
const ethAddressUpperRegexString = "^0x[0-9A-F]{40}$";
const ethAddressLowerRegexString = "^0x[0-9a-f]{40}$";
const uRLEncodedRegexString = "^(?:[^%]|%[0-9A-Fa-f]{2})*$";
const hTMLEncodedRegexString = "&#[x]?([0-9a-fA-F]{2})|(&gt)|(&lt)|(&quot)|(&amp)+[;]?";
const hTMLRegexString = "<[/]?([a-zA-Z]+).*?>";
const jWTRegexString = "^[A-Za-z0-9-_]+\\.[A-Za-z0-9-_]+\\.[A-Za-z0-9-_]*$";
const splitParamsRegexString = `'[^']*'|\S+`;
const bicRegexString = "^[A-Za-z]{6}[A-Za-z0-9]{2}([A-Za-z0-9]{3})?$";
const semverRegexString =
  "^(0|[1-9]d*).(0|[1-9]d*).(0|[1-9]d*)(?:-((?:0|[1-9]d*|d*[a-zA-Z-][0-9a-zA-Z-]*)(?:.(?:0|[1-9]d*|d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:+([0-9a-zA-Z-]+(?:.[0-9a-zA-Z-]+)*))?$"; // numbered capture groups https://semver.org/
const dnsRegexStringRFC1035Label = "^[a-z]([-a-z0-9]*[a-z0-9]){0,62}$";
const cveRegexString = "^CVE-(1999|2d{3})-(0[^0]d{2}|0d[^0]d{1}|0d{2}[^0]|[1-9]{1}d{3,})$"; // CVE Format Id https://cve.mitre.org/cve/identifiers/syntaxchange.html
const mongodbRegexString = "^[a-f\\d]{24}$";
const cronRegexString =
  "(@(annually|yearly|monthly|weekly|daily|hourly|reboot))|(@every (d+(ns|us|µs|ms|s|m|h))+)|((((d+,)+d+|(d+(/|-)d+)|d+|*) ?){5,7})";
const spicedbIDRegexString = "^(([a-zA-Z0-9/_|-=+]{1,})|*)$";
const spicedbPermissionRegexString = "^([a-z][a-z0-9_]{1,62}[a-z0-9])?$";
const spicedbTypeRegexString = "^([a-z][a-z0-9_]{1,61}[a-z0-9]/)?[a-z][a-z0-9_]{1,62}[a-z0-9]$";

export function validate<T>(target: ValidateObject<T>) {
  // use proxy object listen the setter or other way
  let errorFn: ((err: Partial<Dict<keyof T, string[]>>) => void) | null = null;
  const error = (fn: (err: Partial<Dict<keyof T, string[]>>) => void) => {
    errorFn = fn;
  };
  const rules = {
    uuid: uUIDRegexString,
    uuid3: uUID3RegexString,
    uuid4: uUID4RegexString,
    uuid5: uUID5RegexString,
    base64: base64RegexString,
    base64URL: base64URLRegexString,
    base64RawURL: base64RawURLRegexString,
    btc: btcAddressRegexString,
    alphanum: alphaNumericRegexString,
    color: hexColorRegexString,
    hex: hexadecimalRegexString,
    email: emailRegexString,
    url: uRLEncodedRegexString,
    jwt: jWTRegexString,
    sha256: sha256RegexString,
    sha384: sha384RegexString,
    sha512: sha512RegexString,
    cron: cronRegexString,
    cve: cveRegexString,
    eth: ethAddressRegexString,
    ssn: sSNRegexString,
    tiger128: tiger128RegexString,
    ascii: aSCIIRegexString,
    btcupper: btcAddressUpperRegexStringBech32,
    btclower: btcAddressLowerRegexStringBech32,
    fqdn: fqdnRegexStringRFC1123,
    e164: e164RegexString,
    ripemd128: ripemd128RegexString,
    ripemd160: ripemd160RegexString,
    isbn10: iSBN10RegexString,
    isbn13: iSBN13RegexString,
    alpha: alphaRegexString,
    md4: md4RegexString,
    md5: md5RegexString,
    dns: dnsRegexStringRFC1035Label,
    rgb: rgbRegexString,
    rgba: rgbaRegexString,
    hsla: hslaRegexString,
    hsl: hslRegexString,
  };
  const validators = {
    optional: (val: unknown): boolean => {
      return isNone(val);
    },
    oneof: (value: number | string, include: (number | string)[]) => {
      if (isNumber(value) || isString(value)) {
        return include.includes(value);
      } else {
        throw Error(`${value} not include of (${include})`);
      }
    },
    number: (value: unknown) => {
      return isNumber(value);
    },
    array: (value: unknown) => {
      return isArray(value);
    },
    required:(value:unknown)=>{
      return !isUndefined(value)
    },
    is: (value: unknown, rule: string) => {
      return new RegExp(`${rules[rule as keyof typeof rules]}`).test(value as string);
    },
    min: (value: unknown, min: number) => {
      if (isString(value)) {
        return value.length > min;
      } else if (isNumber(value)) {
        return value > min;
      } else if (isArray(value)) {
        return value.length > min;
      } else {
        throw Error(`the ${value}(${typeof value}) not support this feature`);
      }
    },
    max: (value: unknown, max: number) => {
      if (isString(value)) {
        return value.length < max;
      } else if (isNumber(value)) {
        return value < max;
      } else if (isArray(value)) {
        return value.length < max;
      } else {
        throw Error(`the ${value}(${typeof value}) not support this feature`);
      }
    },
    gt: (value: unknown, gt: number) => {
      if (isNumber(value)) {
        return value > gt;
      } else {
        throw Error(`the ${value}(${typeof value}) not support this feature`);
      }
    },
    gte: (value: unknown, gte: number) => {
      if (isNumber(value)) {
        return value >= gte;
      } else {
        throw Error(`the ${value}(${typeof value}) not support this feature`);
      }
    },
    lt: (value: unknown, gte: number) => {
      if (isNumber(value)) {
        return value < gte;
      } else {
        throw Error(`the ${value}(${typeof value}) not support this feature`);
      }
    },
    lte: (value: unknown, gte: number) => {
      if (isNumber(value)) {
        return value <= gte;
      } else {
        throw Error(`the ${value}(${typeof value}) not support this feature`);
      }
    },
  };
  const addRule = (name: string, rule: string) => {
    (rules as any)[name] = rule;
  };
  const parser = (rule: string) => {
    const rulesWithValue: Partial<Dict<keyof typeof validators, string>> = {};
    for (const item of rule.split(";")) {
      const [rule_, val] = item.split("=");
      (rulesWithValue as any)[rule_] = val;
    }
    return rulesWithValue;
  };
  const _validateObject = target;
  const createObject = () => {
    const validateValues: Partial<Dict<keyof T, any>> = {} as Partial<Dict<keyof T, any>>;
    Object.keys(target).forEach((key) => {
      validateValues[key as keyof T] = undefined;
    });
    return validateValues;
  };
  const _validateValues = new Proxy(createObject(), {
    set(target, key, value, recviver) {
      let isValid = true;
      const validString = Reflect.get(_validateObject, key);
      if (validString) {
        const rules = parser(validString);
        const errorMsg: Partial<Dict<keyof T, string[]>> = {};
        for (const ruleName in rules) {
          const ruleValue = rules[ruleName as keyof typeof validators];
          const validateFunc = validators[ruleName as keyof typeof validators];
          if (!isNone(validateFunc)) {
            switch (ruleName as keyof typeof validators) {
              case "number":
                isValid = isValid && validators["number"](value);
                break;
              case "optional":
                isValid = isValid && validators["optional"](value);
              case "oneof":
                isValid =
                  isValid &&
                  validators["oneof"](
                    value,
                    Option(ruleValue)
                      .unwrapOr("")
                      .split(",")
                      .map((val) => (parseFloat(val) ? parseFloat(val) : val)) as (string | number)[],
                  );
                break;
              case "array":
                isValid = isValid && validators["array"](value);
                break;
              case "min":
                isValid = isValid && validators["min"](value, parseFloat(Option(ruleValue as string).unwrapOr("0")));
                break;
              case "max":
                isValid = isValid && validators["max"](value, parseFloat(Option(ruleValue).unwrapOr("65535")));
                break;
              case "gt":
                isValid = isValid && validators["gt"](value, parseFloat(Option(ruleValue).unwrapOr("0")));
                break;
              case "lt":
                isValid = isValid && validators["lt"](value, parseFloat(Option(ruleValue).unwrapOr("0")));
                break;
              case "gte":
                isValid = isValid && validators["gte"](value, parseFloat(Option(ruleValue).unwrapOr("0")));
                break;
              case "lte":
                isValid = isValid && validators["lte"](value, parseFloat(Option(ruleValue).unwrapOr("0")));
                break;
              case "is":
                isValid = isValid && validators["is"](value, Option(ruleValue).unwrapOr(""));
                break;
            }
            if (!isValid) {
              const msg = `validation failed for ${String(key)}: ${ruleName}(${ruleValue})`;
              if (!isNone(errorMsg[key as keyof T])) {
                errorMsg[key as keyof T]?.push(msg);
              } else {
                errorMsg[key as keyof T] = [msg];
              }
            }
          }
        }
        if (isValid) {
          target[key as keyof T] = value;
        }
        if (errorFn) {
          errorFn(errorMsg);
        }
      }
      return true;
    },
  });

  return {
    values: _validateValues,
    appendRule: addRule,
    error,
  };
}
