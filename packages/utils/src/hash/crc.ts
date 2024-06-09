export interface Params {
    Poly: number;
    Init: number;
    RefIn: boolean;
    RefOut: boolean;
    XorOut: number;
    Check: number;
    Name: string;
}

export const reveseBits = (data: number, length = 8) => {
    let reversed = 0;
    for (let i = 0; i < length; i++) {
        reversed = (reversed << 1) | (data & 1);
        data = data >>> 1;
    }
    return reversed;
};
