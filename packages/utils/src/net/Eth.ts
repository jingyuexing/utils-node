import { IP } from "./IP"
export class Eth {
  private sourceMAC: string;
  private destinationMAC: string;
  private payload: IP | null;

  constructor(sourceMAC: string, destinationMAC: string) {
    this.sourceMAC = sourceMAC;
    this.destinationMAC = destinationMAC;
    this.payload = null;
  }

  public setPayload(payload: IP): void {
    this.payload = payload;
  }

  public pack(): Uint8Array {
    const ethHeader = new Uint8Array(14); // Ethernet header length is 14 bytes
    // Pack Ethernet header fields into the ethHeader Uint8Array
    // ...
    const ipPacket = this.payload?.pack() || new Uint8Array(0);
    const packet = new Uint8Array(ethHeader.length + ipPacket.length);
    packet.set(ethHeader);
    packet.set(ipPacket, ethHeader.length);
    return packet;
  }
}
