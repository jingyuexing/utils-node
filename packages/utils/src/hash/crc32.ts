import { reveseBits } from "./crc";

interface CRC32Params {
    check: number;
    name: string;
    poly: number;
    init: number;
    refIn: boolean;
    refOut: boolean;
    xorOut: number;
}

type ParamsAlgo =
    | "CRC-32"
    | "CRC-32/BZIP2"
    | "CRC-32/JAMCRC"
    | "CRC-32/MPEG-2"
    | "CRC-32/POSIX"
    | "CRC-32/SATA"
    | "CRC-32/XFER"
    | "CRC-32C"
    | "CRC-32D"
    | "CRC-32Q";

const params: CRC32Params[] = [
    {
        check: 0xcbf43926,
        name: "CRC-32",
        poly: 0x04c11db7,
        init: 0xffffffff,
        refIn: true,
        refOut: true,
        xorOut: 0xffffffff,
    },
    {
        check: 0xfc891918,
        name: "CRC-32/BZIP2",
        poly: 0x04c11db7,
        init: 0xffffffff,
        refIn: false,
        refOut: false,
        xorOut: 0xffffffff,
    },
    {
        check: 0x340bc6d9,
        name: "CRC-32/JAMCRC",
        poly: 0x04c11db7,
        init: 0xffffffff,
        refIn: true,
        refOut: true,
        xorOut: 0x00000000,
    },
    {
        check: 0x0376e6e7,
        name: "CRC-32/MPEG-2",
        poly: 0x04c11db7,
        init: 0xffffffff,
        refIn: false,
        refOut: false,
        xorOut: 0x00000000,
    },
    {
        check: 0x765e7680,
        name: "CRC-32/POSIX",
        poly: 0x04c11db7,
        init: 0x00000000,
        refIn: false,
        refOut: false,
        xorOut: 0xffffffff,
    },
    {
        check: 0xcf72afe8,
        name: "CRC-32/SATA",
        poly: 0x04c11db7,
        init: 0x52325032,
        refIn: false,
        refOut: false,
        xorOut: 0x00000000,
    },
    {
        check: 0xbd0be338,
        name: "CRC-32/XFER",
        poly: 0x000000af,
        init: 0x00000000,
        refIn: false,
        refOut: false,
        xorOut: 0x00000000,
    },
    {
        check: 0xe3069283,
        name: "CRC-32C",
        poly: 0x1edc6f41,
        init: 0xffffffff,
        refIn: true,
        refOut: true,
        xorOut: 0xffffffff,
    },
    {
        check: 0x87315576,
        name: "CRC-32D",
        poly: 0xa833982b,
        init: 0xffffffff,
        refIn: true,
        refOut: true,
        xorOut: 0xffffffff,
    },
    {
        check: 0x3010bf7f,
        name: "CRC-32Q",
        poly: 0x814141ab,
        init: 0x00000000,
        refIn: false,
        refOut: false,
        xorOut: 0x00000000,
    },
] as const;

export function CRC32(data: string, algo: ParamsAlgo) {
    const { poly, init, refIn, refOut, xorOut } = params.find((ele) => ele.name == algo)!;
    let crc = init;

    for (let byte of new TextEncoder().encode(data)) {
        crc ^= refIn ? byte : byte << 24;
        for (let bit = 0; bit < 8; bit++) {
            if (crc & 0x80000000) {
                crc = (crc << 1) ^ poly;
            } else {
                crc <<= 1;
            }
        }
    }
    if (refOut) {
        crc = reveseBits(crc);
    }
    crc ^= xorOut;

    return crc >>> 0; // Ensure positive integer
}
