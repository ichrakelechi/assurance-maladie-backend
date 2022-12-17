var XLSX = require("xlsx");
var workbook = XLSX.readFile("data/user.xlsx");
let worksheet = workbook.Sheets[workbook.SheetNames[0]];
for (let index=2; index < 7; index++ ){
    const cin =worksheet['A${index}'].v;
}