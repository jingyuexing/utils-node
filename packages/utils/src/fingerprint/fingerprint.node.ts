import os from "node:os"
import crypto, { createHash } from "node:crypto"
import  { execSync } from "node:child_process"
// const hwSerial = require('node-hw-serial');
// const moment = require('moment-timezone');
// const osLocale = require('os-locale');

const networkInterfaces = os.networkInterfaces();
const cpus = os.cpus();
const architecture = os.arch();
const type = os.type();
const platform = os.platform();
// const locale = osLocale.sync();
const macAddresses = Object.values(networkInterfaces)
  .flat()
  .filter(({ family,address }) => family === 'IPv4' && !/127\.0\.0\.\d+/.test(address))
  .map(({ mac }) => mac);

console.log({
  cpus:cpus.length,
  type:type,
  arch:architecture,
  macAddresses,
  platform
})
console.log(networkInterfaces)
// createHash("sha256").update(new TextEncoder().encode("utf8"))

// const ips = Object.values(networkInterfaces)
//   .flat()
//   .filter(({ family }) => family === 'IPv4' && !/127\.0\.0\.\d+/.test(address))
//   .map(({ address }) => address);

// const cpuCores = cpus.length;

// const serialNumber = hwSerial.getDiskSerial();

// const biosInfo = execSync('sudo dmidecode -t bios').toString();
// const systemUuid = biosInfo.match(/UUID: (.+)/)[1];

// const installDate = moment(fs.statSync('/var/log/installer/media-info').birthtime).tz(moment.tz.guess()).format();

// const fingerprintData = {
//   macAddresses,
//   ips,
//   architecture,
//   cpuCores,
//   serialNumber,
//   systemUuid,
//   type,
//   platform,
//   locale,
//   installDate,
// };

// const hash = crypto.createHash('sha256').update(JSON.stringify(fingerprintData)).digest('hex');

// console.log(hash); // 输出生成的指纹
