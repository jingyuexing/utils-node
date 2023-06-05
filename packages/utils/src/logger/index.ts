type LoggerType = 'DEBUG' | 'WARN' | 'INFO' | 'ERROR';
type LoggerEventCallbacks = Utils.Dict<LoggerType, ((data: ReportType | Logger) => void)[]>;
type ReportType = { type: LoggerType; message: string; date: string; url: string };
class Logger {
   private tag: 'DEBUG' | 'WARN' | 'INFO' | 'ERROR' = 'INFO';
   private callbacks: LoggerEventCallbacks = {
      DEBUG: [] as ((data: ReportType | Logger) => void)[],
      INFO: [] as ((data: ReportType | Logger) => void)[],
      WARN: [] as ((data: ReportType | Logger) => void)[],
      ERROR: [] as ((data: ReportType | Logger) => void)[],
   };
   private logMap = {
      DEBUG: console.debug,
      INFO: console.info,
      WARN: console.warn,
      ERROR: console.error,
   };
   private report: boolean;
   private isBorwser: boolean;
   private constructor(tag: LoggerType = 'INFO', report: boolean = false) {
      this.report = report;
      this.tag = tag;
      this.isBorwser = globalThis.window && !!globalThis.document;
   }
   /**
    * listener the diffrent logger level event
    * @param {LoggerType} tag [description]
    * @param {(ReportType|Logger)=> void} callback [description]
    */
   on(tag: LoggerType, callback: (data: ReportType | Logger) => void) {
      this.callbacks[tag].push(callback);
   }
   /**
    * [error description]
    * @param {string} message the logger message
    */
   error(message: string) {
      this.logger(message, 'ERROR');
   }
   /**
    * [debug description]
    * @param {string} message the logger message
    */
   debug(message: string) {
      this.logger(message, 'DEBUG');
   }
   /**
    * [warn description]
    * @param {string} message the logger message
    */
   warn(message: string) {
      this.logger(message, 'WARN');
   }
   /**
    * [info description]
    * @param {string} message the logger message
    */
   info(message: string) {
      this.logger(message, 'INFO');
   }
   /**
    * format your logger message
    * @param {string} message
    */
   format(
      message: string,
      config: Partial<{
         date: boolean;
         tag: boolean;
      }> = {
         date: true,
         tag: true,
      },
   ) {
      let { date, tag } = config;
      let format: string[] = [];
      if (date) {
         let time = new Date();
         if (this.isBorwser) {
            format.push(
               `${time.getFullYear()}/${time.getMonth()}/${time.getDate()} ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`,
            );
         }
      }
      if (tag) {
         if (this.isBorwser) {
            format.push(this.tag);
         } else {
         }
      }
      format.push(message);
      return format.join(' | ');
   }
   logger(message: any, tag: LoggerType = this.tag) {
      this.tag = tag;
      let messageBak = message;
      if (toString.call(messageBak) === '[object Object]') {
         messageBak = JSON.stringify(messageBak);
      }
      if (this.report) {
         // TODO update logger message
      }
      if (this.isBorwser) {
         this.logMap[this.tag as keyof Logger['logMap']]('', '', this.format(messageBak));
      } else {
         // TODO the node env logger process way
      }
      for (let i = 0; i < this.callbacks[tag].length; i++) {
         let params: any = this;
         if (this.report) {
            let dateInstance = new Date();
            params = {
               type: this.tag,
               message: message,
               date: [
                  [dateInstance.getFullYear(), dateInstance.getDate(), dateInstance.getDay()].join('/'),
                  [dateInstance.getHours(), dateInstance.getMinutes(), dateInstance.getSeconds()].join(':'),
               ].join(' '),
            };
         }
         (this.callbacks[tag][i] as Function).call(this, params);
      }
   }
   static getInstance(report: boolean = false, tag: LoggerType = 'INFO') {
      return new Logger(tag, report);
   }
}

export function useLogger(report: boolean = false, tag: LoggerType = 'INFO') {
   let logger = Logger.getInstance(report, tag);
   function getLogger() {
      return logger;
   }
   return getLogger();
}
