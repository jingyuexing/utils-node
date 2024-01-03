class TCP{
   // 16bit
   sourcePort = 0;
   // 16bit
   destinationPort = 0;
   // 32bit
   sequence = 0;
   // 32bit
   acknowledgment = 0;
   // 4bit
   offset = 0;
   // 4bit
   reserved = 0;
   // 1bit
   CWR= 0;
   // 1bit
   ECE= 0;
   // 1bit
   URG= 0;
   // 1bit
   ACK= 0;
   // 1bit
   PSH= 0;
   // 1bit
   RST= 0;
   // 1bit
   SYN= 0;
   // 1bit
   FIN= 0;
   // 16bit
   window = 0;

   checksum():number{
      return 0
   }
}
