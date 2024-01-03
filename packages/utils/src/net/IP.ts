import { TCP } from "./TCP"
export class IP {
  private sourceIP: string;
  private destinationIP: string;
  private payload: TCP | null;

  constructor(sourceIP: string, destinationIP: string) {
    this.sourceIP = sourceIP;
    this.destinationIP = destinationIP;
    this.payload = null;
  }

  public setPayload(payload: TCP): void {
    this.payload = payload;
  }

  public pack(): Uint8Array {
    const ipHeader = new Uint8Array(20); // IP header length is 20 bytes
    // Pack IP header fields into the ipHeader Uint8Array
    // ...
    const tcpPacket = this.payload?.pack() || new Uint8Array(0);
    const packet = new Uint8Array(ipHeader.length + tcpPacket.length);
    packet.set(ipHeader);
    packet.set(tcpPacket, ipHeader.length);
    return packet;
  }
}
