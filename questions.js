const inquirer = require('inquirer');

const questions = [{
    type: 'list',
    name: 'type',
    message:
        'Escoja el tipo de electrodomestico',
    choices: ['Televisor', 'Nevera', 'Otro']
},
{
    type: 'list',
    name: 'isNationalOrigin',
    message:
        'Es de origen nacional?',
    choices: ['Si', 'No']
},
{
    type: 'list',
    name: 'consumptionCategory',
    message:
        'A que categoria de consumo pertenece?',
    choices: ['A', 'B', 'C']
},
{
    type: 'number',
    name: 'inchesSize',
    message: 'Cuantas pulgadas tiene el tv? (Valor entero mayor que 0',
    validate: function (userInput) {
        return (userInput > 0 && Number.isInteger(userInput)) ? true : "Error";

    },
    askAnswered: false
    ,
    when: function (answer) {
        return answer.type == "Televisor"
    }
},
{
    type: 'list',
    name: 'isTDT',
    message: 'Tiene TDT?',
    choices: ['Si', 'No'],
    transformer: function (userInput) {
        return userInput == "Si";
    },
    when: function (answer) {
        return answer.type == "Televisor"
    }
},
{
    type: 'number',
    name: 'capacitySize',
    message: 'De cuantos litros de capacidad es la nevera?',
    validate: function (userInput,) {
        return (userInput > 0 && Number.isInteger(userInput)) ? true : "Error, try again.";
    },
    when: function (answer) {
        return answer.type == "Nevera"
    }
},
{
    type: 'confirm',
    name: 'continueLoop',
    message: 'Quiere agregar otro articulo?'
}];

module.exports=function(){
    return inquirer.prompt(questions);
}