import fs = require("fs");


let files = fs.readdirSync("./");
let conf:any = new Array<Object>();

for (let file of files) {
    let parsed:any = {};
    try {
        parsed = JSON.parse(fs.readFileSync(file).toString());
        conf.push(parsed);
    } catch (e) { }
}

switch (conf.length) {
    case 0:
        conf = {};
        break;
    case 1:
        conf = conf[0];
        break;
    default:
        conf = conf.filter((value:any) => {
            let result:boolean = false;

            if (typeof value == "object") {
                result = Object.getOwnPropertyNames(value).length > 0;
            }

            return result;
        });
        break;
}

export = conf;