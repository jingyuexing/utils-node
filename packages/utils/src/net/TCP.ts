export class TCP {
  private sourcePort: number;
  private destinationPort: number;
  private sequenceNumber: number;
  private acknowledgementNumber: number;
  private data: string;

  constructor(sourcePort: number, destinationPort: number) {
    this.sourcePort = sourcePort;
    this.destinationPort = destinationPort;
    this.sequenceNumber = 0;
    this.acknowledgementNumber = 0;
    this.data = "";
  }

  public setSequenceNumber(sequenceNumber: number): void {
    this.sequenceNumber = sequenceNumber;
  }

  public setAcknowledgementNumber(acknowledgementNumber: number): void {
    this.acknowledgementNumber = acknowledgementNumber;
  }

  public setData(data: string): void {
    this.data = data;
  }

  public pack(): Uint8Array {
    const tcpHeader = new Uint8Array(20); // TCP header length is 20 bytes
    // Pack TCP header fields into the tcpHeader Uint8Array
    // ...
    const dataBytes = new TextEncoder().encode(this.data);
    const packet = new Uint8Array(tcpHeader.length + dataBytes.length);
    packet.set(tcpHeader);
    packet.set(dataBytes, tcpHeader.length);
    return packet;
  }
}




