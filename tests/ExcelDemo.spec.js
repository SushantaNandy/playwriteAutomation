const ExcelJs = require('exceljs'); 
const {test, expect} = require('@playwright/test')

async function writeExcel(searchText, replaceText, change, filePath){
const workbook = new ExcelJs.Workbook();

await workbook.xlsx.readFile(filePath);
const worksheet = workbook.getWorksheet('Sheet1');

const output = await readExcel(worksheet, searchText);

const cell = worksheet.getCell(output.row,output.columb+change.colChange);
cell.value = replaceText;
await workbook.xlsx.writeFile(filePath);

}

async function readExcel(worksheet, searchText){
    let output = {row:-1, columb:-1};
    worksheet.eachRow((row, rowNumber)=>{

    row.eachCell((cell, colNumber)=>{
        if(cell.value === searchText){
            output.row = rowNumber;
            output.columb = colNumber;
        }
    })
})
    return output;

}

//writeExcel("Mango", 0, {rowChange:0, colChange: 2}, '/Users/shushantanandy/Downloads/exceldownloadTest.xlsx');

test("Upload download excel validation", async({page})=>{

    await page.goto("https://rahulshettyacademy.com/upload-download-test/");
    //need to wait for the download event to happens before it jumps into altering the file
    const downloadPromise = page.waitForEvent('download');
    await page.getByRole('button',{name: 'Download'}).click();
    await downloadPromise;
    await writeExcel("Mango", 0, {rowChange:0, colChange: 2}, '/Users/shushantanandy/Downloads/download.xlsx');
    await page.locator("#fileinput").click();
    //below setInputFiles only works input type= file
    await page.locator("#fileinput").setInputFiles('/Users/shushantanandy/Downloads/download.xlsx');
})
