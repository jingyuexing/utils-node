import { reveseBits } from "./crc";
import type { Params } from "./crc"
export function CRC8() {
    let CRC8_ = {
        Poly: 0x07,
        Init: 0x00,
        RefIn: false,
        RefOut: false,
        XorOut: 0x00,
        Check: 0xf4,
        Name: "CRC-8",
    } as const;
    let CRC8_CDMA2000 = {
        Poly: 0x9b,
        Init: 0xff,
        RefIn: false,
        RefOut: false,
        XorOut: 0x00,
        Check: 0xda,
        Name: "CRC-8/CDMA2000",
    } as const;
    let CRC8_DARC = {
        Poly: 0x39,
        Init: 0x00,
        RefIn: true,
        RefOut: true,
        XorOut: 0x00,
        Check: 0x15,
        Name: "CRC-8/DARC",
    } as const;
    let CRC8_DVB_S2 = {
        Poly: 0xd5,
        Init: 0x00,
        RefIn: false,
        RefOut: false,
        XorOut: 0x00,
        Check: 0xbc,
        Name: "CRC-8/DVB-S2",
    } as const;
    let CRC8_EBU = {
        Poly: 0x1d,
        Init: 0xff,
        RefIn: true,
        RefOut: true,
        XorOut: 0x00,
        Check: 0x97,
        Name: "CRC-8/EBU",
    } as const;
    let CRC8_I_CODE = {
        Poly: 0x1d,
        Init: 0xfd,
        RefIn: false,
        RefOut: false,
        XorOut: 0x00,
        Check: 0x7e,
        Name: "CRC-8/I-CODE",
    } as const;
    let CRC8_ITU = {
        Poly: 0x07,
        Init: 0x00,
        RefIn: false,
        RefOut: false,
        XorOut: 0x55,
        Check: 0xa1,
        Name: "CRC-8/ITU",
    } as const;
    let CRC8_MAXIM = {
        Poly: 0x31,
        Init: 0x00,
        RefIn: true,
        RefOut: true,
        XorOut: 0x00,
        Check: 0xa1,
        Name: "CRC-8/MAXIM",
    } as const;
    let CRC8_ROHC = {
        Poly: 0x07,
        Init: 0xff,
        RefIn: true,
        RefOut: true,
        XorOut: 0x00,
        Check: 0xd0,
        Name: "CRC-8/ROHC",
    } as const;
    let CRC8_WCDMA = {
        Poly: 0x9b,
        Init: 0x00,
        RefIn: true,
        RefOut: true,
        XorOut: 0x00,
        Check: 0x25,
        Name: "CRC-8/WCDMA",
    } as const;
    const makeTable = (params: Params) => {
        const table: number[] = [];
        for (let i = 0; i < 256; i++) {
            let crc = i;
            for (let n = 0; n < 8; n++) {
                let bit = (crc & 0x80) != 0;
                crc <<= 1;
                if (bit) {
                    crc ^= params.Poly;
                }
            }
            table[i] = crc & 0xff;
        }
        return table;
    };
    const update = (crc: number, data: Uint8Array, table: number[], params: Params) => {
        let crc_ = crc;
        if (params.RefIn) {
            for (let i = 0; i < data.length; i++) {
                let d = reveseBits(data[i]);
                let index = (crc_ ^ d) & 0xff;
                crc_ = table[index];
            }
        } else {
            for (let n = 0; n < data.length; n++) {
                let d = data[n];
                let index = (crc_ ^ d) & 0xff;
                crc_ = table[index];
            }
        }
        return crc_;
    };
    const complete = (crc: number, params: Params) => {
        if (params.RefOut) {
            crc = reveseBits(crc);
        }
        return crc ^ params.XorOut;
    };
    const checksum = (data: string, params: Params) => {
        let crc = params.Init;
        crc = update(crc, new TextEncoder().encode(data), makeTable(params), params);
        return complete(crc, params);
    };
    return {
        update,
        checksum,
        makeTable,
        CRC8: CRC8_,
        CRC8_CDMA2000: CRC8_CDMA2000,
        CRC8_DARC,
        CRC8_DVB_S2,
        CRC8_EBU,
        CRC8_I_CODE,
        CRC8_ITU,
        CRC8_MAXIM,
        CRC8_ROHC,
        CRC8_WCDMA,
    };
}
