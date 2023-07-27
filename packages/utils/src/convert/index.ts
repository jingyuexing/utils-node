export function convert() {
   const length = (value: number, from: "m" | "km" | "cm" | "mm" | "um" | "nm" | "dm", to: "m" | "km" | "cm" | "mm" | "um" | "nm" | "dm") => {
      const units = {
         m: 100,
         km: 1000,
         cm: 1,
         mm: 0.01,
         um: 1e-3,
         nm: 1e-6,
         dm: 10,
      };
      return value * units[from] / units[to]
   };
   const weight = (value: number, from: "g" | "kg" | "mg", to: "g" | "kg" | "mg") => {
      const units = {
         g: 1,
         kg: 1000,
         mg: 0.001,
      }
      return value * units[from] / units[to]
   }
   const size = (value: number, from: "k" | "w" | "m", to: "k" | "w" | "m") => {
      const units = {
         "k": 1000,
         "w": 10000,
         "m": 1000000
      }
      return value * units[from] / units[to]
   }
   type StorageUnit = 'B' | 'KB' | 'MB' | 'GB' | 'TB' | 'PB';
   const storage = (value: number, from: StorageUnit, to: StorageUnit): number => {
      const units: StorageUnit[] = ['B', 'KB', 'MB', 'GB', 'TB', 'PB'];
      const fromIndex = units.indexOf(from);
      const toIndex = units.indexOf(to);

      if (fromIndex === -1 || toIndex === -1) {
         throw new Error('Invalid storage unit');
      }

      const diff = fromIndex - toIndex;

      if (diff === 0) {
         return value;
      }

      const factor = 1024 ** Math.abs(diff);
      return diff > 0 ? value / factor : value * factor;
   }
   type NetworkUnit = 'bps' | 'Kbps' | 'Mbps' | 'Gbps';
   const netSpeed = (speed: number, from: NetworkUnit, to: NetworkUnit): number => {
      const networkUnitTable: Record<NetworkUnit, number> = {
         'bps': 1,
         'Kbps': 1000,
         'Mbps': 1000000,
         'Gbps': 1000000000,
      };
      if (!(from in networkUnitTable) || !(to in networkUnitTable)) {
         throw new Error('Invalid network unit');
      }
      const fromFactor = networkUnitTable[from as keyof (typeof networkUnitTable)];
      const toFactor = networkUnitTable[to];

      return speed * fromFactor / toFactor;
   }
   return {
      length,
      weight,
      size,
      storage,
      netSpeed
   }
}
