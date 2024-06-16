const ORMTable = Symbol("table");
const ORMFields = Symbol("fields");
const ORMIndex = Symbol("index");

interface FieldsOptions {
   index?: boolean;
   nullable?: boolean;
   auto?: boolean;
   name?: string;
   type: string;
   enum?: string[];
   primaryKey: boolean;
   default?: string;
   comment?: string;
}

interface TableOptions {
   name?: string;
   engine?: string;
   charset?: string;
}

const defaultFieldsOptions: Partial<FieldsOptions> = {
   index: false,
   auto: false,
   primaryKey: false,
   nullable: true
};

// 将类名转换为 snake_case
function toSnakeCase(str: string): string {
   return str.replace(/([A-Z])/g, '_$1').toLowerCase().replace(/^_/, '');
}

function Table(options: TableOptions = {}): ClassDecorator {
   return function (constructor: Function) {
      const tableName = options.name || toSnakeCase(constructor.name);
      const tableMetadata = {
         name: tableName,
         engine: options.engine,
         charset: options.charset
      };
      constructor.prototype[ORMTable] = tableMetadata;
   };
}


function Fields(options: FieldsOptions): PropertyDecorator {
   return function (target, propertyKey: string | symbol) {
      // 合并默认值
      const finalOptions = { ...defaultFieldsOptions, ...options };

      if (!Reflect.has(target, ORMFields)) {
         Reflect.set(target, ORMFields, {});
      }
      if (!Reflect.has(target, ORMIndex)) {
         Reflect.set(target, ORMIndex, [])
      }
      const fields = Reflect.get(target, ORMFields);
      fields[propertyKey as string] = finalOptions;
      Reflect.set(target, ORMFields, fields);
      if (finalOptions.primaryKey) {
         (Reflect.get(target, ORMIndex) as string[]).push(propertyKey as string)
      }
   };
}


// 用于展示元数据的辅助函数
function getTableMetadata(constructor: Function) {
   const tableName = constructor.prototype[ORMTable] as TableOptions;
   const fields = constructor.prototype[ORMFields] as Record<string, FieldsOptions>;
   const index = constructor.prototype[ORMIndex] as string[]
   return { tableName, fields, index };
}

function generateCreateTableSQL(constructor: Function): string {
   const metadata = getTableMetadata(constructor);
   const table = metadata.tableName;
   const fields = metadata.fields;

   const fieldDefinitions = Object.keys(fields).map(fieldName => {
      const options = fields[fieldName];
      const type = options.type.toUpperCase();
      const nullable = options.nullable ? "NULL" : "NOT NULL";
      const autoIncrement = options.auto ? "AUTO_INCREMENT" : "";
      const defaultValue = options.default !== undefined ? `DEFAULT '${options.default}'` : "";
      const comment = options.comment ? `COMMENT '${options.comment}'` : "";
      const primaryKey = options.primaryKey ? "primary key" : ""
      return [
         `\`${fieldName}\``,
         type,
         nullable,
         autoIncrement,
         primaryKey,
         defaultValue,
         comment
      ].filter((val) => val !== "").join(" ")
   });
   const primaryKey = Object.keys(fields).find(
      fieldName => fields[fieldName].primaryKey
   ) || Object.keys(fields).find(
      fieldName => fields[fieldName].auto
   ) || 'id';

   const indexes = Object.keys(fields).filter(fieldName => fields[fieldName].index)
      .map(fieldName => `INDEX (\`${fieldName}\`)`);


   let tableConfig = [
      table.engine ? `ENGINE=${table.engine}` : "",
      table.charset ? `DEFAULT CHARSET=${table.charset}` : ""
   ].filter((val) => val !== "").join(" ")
   return `CREATE TABLE \`${table.name}\` ( ${[...fieldDefinitions, ...indexes].filter(val => val !== "").join(",\n ")},PRIMARY KEY (\`${primaryKey}\`)) ${tableConfig};`.trim();

}
