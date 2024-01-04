export function convert() {
  const length = (
    value: number,
    from: "m" | "km" | "cm" | "mm" | "um" | "nm" | "dm",
    to: "m" | "km" | "cm" | "mm" | "um" | "nm" | "dm",
  ) => {
    const units = {
      m: 100,
      km: 1000,
      cm: 1,
      mm: 0.01,
      um: 1e-3,
      nm: 1e-6,
      dm: 10,
    };
    return (value * units[from]) / units[to];
  };
  const weight = (value: number, from: "g" | "kg" | "mg" | "t", to: "g" | "kg" | "mg" | "t") => {
    const units = {
      g: 1,
      kg: 1000,
      mg: 0.001,
      t: 1000000,
    };
    const unit = Object.keys(units);
    if (unit.indexOf(from) === -1 || unit.indexOf(to) === -1) {
      throw new Error("Invalid weight unit");
    }
    return (value * units[from]) / units[to];
  };
  const size = (value: number, from: "k" | "w" | "m", to: "k" | "w" | "m") => {
    const units = {
      k: 1000,
      w: 10000,
      m: 1000000,
    };
    return (value * units[from]) / units[to];
  };
  /**
   * Converts units of volume in the metric system.
   * @param {number} value - The value to be converted.
   * @param {"ml" | "cl" | "dl" | "l"} from - The unit to convert from ("ml": milliliters, "cl": centiliters, "dl": deciliters, "l": liters).
   * @param {"ml" | "cl" | "dl" | "l"} to - The unit to convert to ("ml": milliliters, "cl": centiliters, "dl": deciliters, "l": liters).
   * @returns {number} - The converted value.
   */
  const volumn = (value: number, from: "ml" | "cl" | "dl" | "l", to: "ml" | "cl" | "dl" | "l") => {
    const units = {
      ml: 1,
      cl: 10,
      dl: 100,
      l: 1000,
    };

    return (value * units[from]) / units[to];
  };
  /**
   * Converts units of volume in the EN customary system.
   * @param {number} value - The value to be converted.
   * @param {"oz" | "pt" | "qt" | "gal"} from - The unit to convert from ("oz": ounces, "pt": pints, "qt": quarts, "gal": gallons).
   * @param {"oz" | "pt" | "qt" | "gal"} to - The unit to convert to ("oz": ounces, "pt": pints, "qt": quarts, "gal": gallons).
   * @returns {number} - The converted value.
   */
  const volumnEN = (value: number, from: "oz" | "pt" | "qt" | "gal", to: "oz" | "pt" | "qt" | "gal") => {
    const units = {
      oz: 1,
      pt: 20,
      qt: 40,
      gal: 160,
    };

    return (value * units[from]) / units[to];
  };
  /**
   * Converts units of volume in the US customary system.
   * @param {number} value - The value to be converted.
   * @param {"oz" | "pt" | "qt" | "gal"} from - The unit to convert from ("oz": ounces, "pt": pints, "qt": quarts, "gal": gallons).
   * @param {"oz" | "pt" | "qt" | "gal"} to - The unit to convert to ("oz": ounces, "pt": pints, "qt": quarts, "gal": gallons).
   * @returns {number} - The converted value.
   */
  const volumeUS = (value: number, from: "oz" | "pt" | "qt" | "gal", to: "oz" | "pt" | "qt" | "gal") => {
    const units = {
      oz: 1,
      pt: 16,
      qt: 32,
      gal: 128,
    };

    return (value * units[from]) / units[to];
  };
  type StorageUnit = "B" | "KB" | "MB" | "GB" | "TB" | "PB";
  const storage = (value: number, from: StorageUnit, to: StorageUnit): number => {
    const units: StorageUnit[] = ["B", "KB", "MB", "GB", "TB", "PB"];
    const fromIndex = units.indexOf(from);
    const toIndex = units.indexOf(to);

    if (fromIndex === -1 || toIndex === -1) {
      throw new Error("Invalid storage unit");
    }

    const diff = toIndex - fromIndex;

    if (diff === 0) {
      return value;
    }

    const factor = 1024 ** Math.abs(diff);
    return diff > 0 ? value / factor : value * factor;
  };
  type NetworkUnit = "bps" | "Kbps" | "Mbps" | "Gbps";
  const netSpeed = (speed: number, from: NetworkUnit, to: NetworkUnit): number => {
    const networkUnitTable: Record<NetworkUnit, number> = {
      bps: 1,
      Kbps: 1000,
      Mbps: 1000000,
      Gbps: 1000000000,
    };
    if (!(from in networkUnitTable) || !(to in networkUnitTable)) {
      throw new Error("Invalid network unit");
    }
    const fromFactor = networkUnitTable[from as keyof typeof networkUnitTable];
    const toFactor = networkUnitTable[to];

    return (speed * fromFactor) / toFactor;
  };

  const unitWords = [
    "个",
    "十",
    "百",
    "千",
    "万",
    "亿",
    "兆",
    "京",
    "垓",
    "秭",
    "穰",
    "沟",
    "涧",
    "正",
    "载",
    "极",
    "恒河沙",
    "阿僧祇",
    "那由他",
    "不可思议",
    "无量大数",
  ] as const;
  /**
   * [numeralSystemConverter description]
   * @param {number} value
   * @param {"个"|"十"|"百"|"千"|"万"|"亿"|"兆"|"京"|"垓"|"秭"|"穰"|"沟"|"涧"|"正"|"载"|"极"|"恒河沙"|"阿僧祇"|"那由他"|"不可思议"|"无量大数"} from The unit to convert from
   * @param {"个"|"十"|"百"|"千"|"万"|"亿"|"兆"|"京"|"垓"|"秭"|"穰"|"沟"|"涧"|"正"|"载"|"极"|"恒河沙"|"阿僧祇"|"那由他"|"不可思议"|"无量大数"} to The unit to convert to
   */
  function numeralSystemConverter(value: number, from: typeof unitWords[number], to: typeof unitWords[number]) {
    const fromIndex = unitWords.indexOf(from);
    const toIndex = unitWords.indexOf(to);

    if (fromIndex === -1 || toIndex === -1) {
      return -1;
    }

    const exponent = Math.abs(fromIndex - toIndex);
    const multiplier = fromIndex > toIndex ? Math.pow(10, exponent) : 1 / Math.pow(10, exponent);

    return value * multiplier;
  }
  return {
    length,
    weight,
    size,
    storage,
    netSpeed,
    volumn,
    volumnEN,
    volumeUS,
    numeralSystemConverter,
  };
}
