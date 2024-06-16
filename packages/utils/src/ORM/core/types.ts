
// 定义字段类型类
class FieldType {
    toString(): string {
        return "FIELD";
    }
}

class VARCHAR extends FieldType {
    length: number;
    constructor(length: number) {
        super()
        this.length = length
    }
    toString(): string {
        return `varchar(${this.length})`
    }
}

class Text extends FieldType {
    constructor(){
        super();
    }
    toString(): string {
        return `text`
    }
}
