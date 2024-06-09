import { reveseBits } from "./crc";

type CRC16Algo =
    "CRC-16/ARC"
    |"CRC-16/AUG-CCITT"
    |"CRC-16/BUYPASS"
    |"CRC-16/CCITT-FALSE"
    |"CRC-16/CDMA2000"
    |"CRC-16/DDS-110"
    |"CRC-16/DECT-R"
    |"CRC-16/DECT-X"
    |"CRC-16/DNP"
    |"CRC-16/EN-13757"
    |"CRC-16/GENIBUS"
    |"CRC-16/KERMIT"
    |"CRC-16/MAXIM"
    |"CRC-16/MCRF4XX"
    |"CRC-16/MODBUS"
    |"CRC-16/RIELLO"
    |"CRC-16/T10-DIF"
    |"CRC-16/TELEDISK"
    |"CRC-16/TMS37157"
    |"CRC-16/USB"
    |"CRC-16/X-25"
    |"CRC-16/XMODEM"
    |"CRC-A"




export function crc16(data:string, name:CRC16Algo) {
    const params = [
        {
            check: 0xbb3d,
            name: "CRC-16/ARC",
            poly: 0x8005,
            init: 0x0000,
            refIn: true,
            refOut: true,
            xorOut: 0x0000,
        },
        {
            check: 0xe5cc,
            name: "CRC-16/AUG-CCITT",
            poly: 0x1021,
            init: 0x1d0f,
            refIn: false,
            refOut: false,
            xorOut: 0x0000,
        },
        {
            check: 0xfee8,
            name: "CRC-16/BUYPASS",
            poly: 0x8005,
            init: 0x0000,
            refIn: false,
            refOut: false,
            xorOut: 0x0000,
        },
        {
            check: 0x29b1,
            name: "CRC-16/CCITT-FALSE",
            poly: 0x1021,
            init: 0xffff,
            refIn: false,
            refOut: false,
            xorOut: 0x0000,
        },
        {
            check: 0x4c06,
            name: "CRC-16/CDMA2000",
            poly: 0xc867,
            init: 0xffff,
            refIn: false,
            refOut: false,
            xorOut: 0x0000,
        },
        {
            check: 0x9ecf,
            name: "CRC-16/DDS-110",
            poly: 0x8005,
            init: 0x800d,
            refIn: false,
            refOut: false,
            xorOut: 0x0000,
        },
        {
            check: 0x007e,
            name: "CRC-16/DECT-R",
            poly: 0x0589,
            init: 0x0000,
            refIn: false,
            refOut: false,
            xorOut: 0x0001,
        },
        {
            check: 0x007f,
            name: "CRC-16/DECT-X",
            poly: 0x0589,
            init: 0x0000,
            refIn: false,
            refOut: false,
            xorOut: 0x0000,
        },
        {
            check: 0xea82,
            name: "CRC-16/DNP",
            poly: 0x3d65,
            init: 0x0000,
            refIn: true,
            refOut: true,
            xorOut: 0xffff,
        },
        {
            check: 0xc2b7,
            name: "CRC-16/EN-13757",
            poly: 0x3d65,
            init: 0x0000,
            refIn: false,
            refOut: false,
            xorOut: 0xffff,
        },
        {
            check: 0xd64e,
            name: "CRC-16/GENIBUS",
            poly: 0x1021,
            init: 0xffff,
            refIn: false,
            refOut: false,
            xorOut: 0xffff,
        },
        {
            check: 0x2189,
            name: "CRC-16/KERMIT",
            poly: 0x1021,
            init: 0x0000,
            refIn: true,
            refOut: true,
            xorOut: 0x0000,
        },
        {
            check: 0x44c2,
            name: "CRC-16/MAXIM",
            poly: 0x8005,
            init: 0x0000,
            refIn: true,
            refOut: true,
            xorOut: 0xffff,
        },
        {
            check: 0x6f91,
            name: "CRC-16/MCRF4XX",
            poly: 0x1021,
            init: 0xffff,
            refIn: true,
            refOut: true,
            xorOut: 0x0000,
        },
        {
            check: 0x4b37,
            name: "CRC-16/MODBUS",
            poly: 0x8005,
            init: 0xffff,
            refIn: true,
            refOut: true,
            xorOut: 0x0000,
        },
        {
            check: 0x63d0,
            name: "CRC-16/RIELLO",
            poly: 0x1021,
            init: 0xb2aa,
            refIn: true,
            refOut: true,
            xorOut: 0x0000,
        },
        {
            check: 0xd0db,
            name: "CRC-16/T10-DIF",
            poly: 0x8bb7,
            init: 0x0000,
            refIn: false,
            refOut: false,
            xorOut: 0x0000,
        },
        {
            check: 0x0fb3,
            name: "CRC-16/TELEDISK",
            poly: 0xa097,
            init: 0x0000,
            refIn: false,
            refOut: false,
            xorOut: 0x0000,
        },
        {
            check: 0x26b1,
            name: "CRC-16/TMS37157",
            poly: 0x1021,
            init: 0x89ec,
            refIn: true,
            refOut: true,
            xorOut: 0x0000,
        },
        {
            check: 0xb4c8,
            name: "CRC-16/USB",
            poly: 0x8005,
            init: 0xffff,
            refIn: true,
            refOut: true,
            xorOut: 0xffff,
        },
        {
            check: 0x906e,
            name: "CRC-16/X-25",
            poly: 0x1021,
            init: 0xffff,
            refIn: true,
            refOut: true,
            xorOut: 0xffff,
        },
        {
            check: 0x31c3,
            name: "CRC-16/XMODEM",
            poly: 0x1021,
            init: 0x0000,
            refIn: false,
            refOut: false,
            xorOut: 0x0000,
        },
        {
            check: 0xbf05,
            name: "CRC-A",
            poly: 0x1021,
            init: 0xc6c6,
            refIn: true,
            refOut: true,
            xorOut: 0x0000,
        },
    ];
    const { poly, init, refIn, refOut, xorOut } = params.find((ele)=>ele.name === name)!;
    const checksum = (text:string)=>{
        let crc = init;
        for (let byte of new TextEncoder().encode(text)) {
            crc ^= (refIn ? byte : reveseBits(byte,16)) << 8;
            for (let bit = 0; bit < 8; bit++) {
                if (crc & 0x8000) {
                    crc = (crc << 1) ^ poly;
                } else {
                    crc <<= 1;
                }
            }
        }
        return crc;
    }

    let crc = checksum(data)
    if (refOut) {
        crc = reveseBits(crc,16);
    }
    crc ^= xorOut;
    crc &= 0xffff;
    return crc;
}
