#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";

//Initialize user balance and pin code;
let myBalance = 5000;
let myPin = 2345;

// Print welcome message;
console.log(chalk.blue("\n \tWelcome to code with Ayesha ATM Machine\n"));

let pinAnswer = await inquirer.prompt([
    {
        name : "pin",
        type : "number",
        message : chalk.yellow("Enter your pin code:")
    }
])
if(pinAnswer.pin === myPin){
    console.log(chalk.green("\nPin is Correct, Login Succesfully\n"));
    //console.log(`Current Account Balance is ${myBalance}`);

    let operationAns = await inquirer.prompt([
        {
            name : "operation",
            type : "list",
            message : "Select an Operation:",
            choices : ["WithDraw Amount", "Check Balance"]
        }
    ])

    if(operationAns.operation === "WithDraw Amount"){
        let withdrawAns = await inquirer.prompt([
            {
                name : "withdrawmethod",
                type : "list",
                message : "Select a withdrawal method:",
                choices : ["Fast Cash", "Enter Amount"]
            }
        ])
        if(withdrawAns.withdrawmethod === "Fast Cash"){
            let fastcashAns = await inquirer.prompt([
                {
                    name : "fastcash",
                    type : "list",
                    message : "Select Amount:",
                    choices: [1000,2000,5000,10000,20000,50000]
                }
            ])
            if(fastcashAns.fastcash > myBalance){
                console.log(chalk.red("Insufficient Balance"));
            }
            else{
                myBalance -= fastcashAns.fastcash
                console.log(`${fastcashAns.fastcash} Withdraw Successfully`);
                console.log(`Your Remaining Balance is: ${myBalance}`)
            }
        }


        else if(withdrawAns.withdrawmethod === "Enter Amount"){
            let amountAns = await inquirer.prompt([
                {
                    name : "amount",
                    type : "number",
                    message : "Enter the amount to withdraw:"
                }
            ])
            if(amountAns.amount > myBalance){
                console.log(chalk.red("Insufficient Balance"));
            }
            else{
                myBalance -= amountAns.amount;
                console.log(`${amountAns.amount} Withdraw Succesfully`);
                console.log(`Your Remaining Balance is: ${myBalance}`);
            }

        }
        
    }
    else if(operationAns.operation === "Check Balance"){
        console.log(`Your Account Balance is: ${myBalance}`);
    }
}
else{
    console.log(chalk.red("Pin is Incorrect, Try Again!"));
}



