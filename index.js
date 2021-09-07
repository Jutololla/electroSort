
let inventary = require('./inventary.json');
const { printTable } = require('console-table-printer');
const askQuestions = require('./questions');

async function main() {
    let wantToContinue;
    let invoice = [];
    do {
        let answers = await askQuestions();
        answers.prize = calculateBasePrize(answers);
        invoice.push(answers);
        wantToContinue = answers.continueLoop;

    } while (wantToContinue);
    console.log(invoice);
}
function calculateBasePrize(article) {
    let prize = 0;
    if (article.consumptionCategory == 'A') prize += 450000;
    if (article.consumptionCategory == 'B') prize += 350000;
    if (article.consumptionCategory == 'C') prize += 250000;

    if (article.isNationalOrigin) {
        prize += 250000;
    } else {
        prize += 350000;
    }
    if (article.type == 'Nevera') {
        if (article.capacitySize >= 130) {
            prize += prize * 0.005 * ((article.capacitySize - 120) - ((article.capacitySize - 120) % 10));
        }
    }
    if (article.type == 'Televisor') {
        if (article.inchesSize > 40) prize += prize * 0.30;
        if (article.isTDT) prize += 250000;
    }
    return prize;
}
function checkInventary(inventary, invoice) {
    for (const invoiceArticle of invoice) {
        let inventaryArticle = inventary.find(function (articleInventary) {
            return invoiceArticle.type == articleInventary.type
                && invoiceArticle.consumptionCategory == articleInventary.consumptionCategory
                && invoiceArticle.isNationalOrigin == articleInventary.isNationalOrigin
                && articleInventary.quantity > 0;

        });
        if (inventaryArticle) { inventaryArticle.quantity -= 1; }
        else {
            console.log("El articulo no existe: ");
            printTable([invoiceArticle])
        }
    }
}

//main();
let invoice = [{
    "type": "Televisor",
    "isNationalOrigin": "No",
    "consumptionCategory": "B"
},{
    "type": "Nevera",
    "isNationalOrigin": "No",
    "consumptionCategory": "C"
}, {
    "type": "Nevera",
    "isNationalOrigin": "No",
    "consumptionCategory": "C"
}, {
    "type": "Otro",
    "isNationalOrigin": "Si",
    "consumptionCategory": "B"
}, {
    "type": "Otro",
    "isNationalOrigin": "Si",
    "consumptionCategory": "B"
}, {
    "type": "Otro",
    "isNationalOrigin": "Si",
    "consumptionCategory": "B"
}, {
    "type": "Otro",
    "isNationalOrigin": "Si",
    "consumptionCategory": "B"
}, {
    "type": "Otro",
    "isNationalOrigin": "Si",
    "consumptionCategory": "B"
}
]
for (let invoiceArticle of invoice) {
    invoiceArticle.prize = calculateBasePrize(invoiceArticle)
}
for (let inventaryArticle of inventary) {
    inventaryArticle.unitaryPrize = calculateBasePrize(inventaryArticle)
}
console.log('Este es el inventario actual');
printTable(inventary);
console.log('Esta es la factura');
printTable(invoice);
checkInventary(inventary, invoice);
console.log('Esta es el inventario despues de retirar los items de la factura');
printTable(inventary);


