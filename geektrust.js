const { getPayment } = require("./controller/main_controller");
const sever = require('./index');
const fs = require("fs");
var XMLHttpRequest = require('xhr2');
var xhr = new XMLHttpRequest();
const filename = process.argv[2]

fs.readFile(filename, "utf8", (err, data) => {
    /*if (err) throw err
    var inputLines = data.toString().split("\n")
    // Add your code here to process input commands
    */
})
fs.readFile(filename, "utf8", (err, data) => {
    if (err) throw err
    var inputLines = data.toString().split("\r\n")
    // Add your code here to process input commands
    console.log("inputLines  " , inputLines);
    parseFile( inputLines);
})

// const runFile = function(filename) {
//     fs.readFile(filename, 'utf8', function(err, data) {
//         if (err) {
//             return console.log("ERR ", err);
//         }
//         parseFile(data);
//     });
// };

const parseFile = async function(data) {
    var commandList = data;
    for( let i =  0  ; i < commandList.length ; i ++ ){
        let arr = commandList[i].split(" ");
         console.log(arr);
         if(arr[0] == 'LOAN'){
            console.log("rr" , arr[0]);
            findLoanFE(arr);
         }else if( arr[0] == 'BALANCE'){
            findBalanceFE( arr);
         }else if(arr[0] == 'PAYMENT'){
            getPaymentFE( arr);
         }else{
            console.log(" command not matched");
         }
    }
};
function findLoanFE( arr ){
    let xhr  = new XMLHttpRequest();
    let url = `http://localhost:8000/loan/${arr[1]}/${arr[2]}/${arr[3]}/${arr[4]}/${arr[5]}`;
    console.log(url);
    xhr.open('GET' , url );
    xhr.onload = ()=>{
        if(xhr.status == 200){
            console.log("response" ,xhr.response);
        }else{
            console.log(" err",xhr.status);
        }
    }
    xhr.send();

}
function findBalanceFE( arr){
    let xhr  = new XMLHttpRequest();
    let url = `http://localhost:8000/balance/${arr[1]}/${arr[2]}/${arr[3]}`;
    console.log(url);
    xhr.open('GET' , url );
    xhr.onload = ()=>{
        if(xhr.status == 200){
            console.log(xhr.responce);
        }else{
            console.log(" err",xhr.status);
        }
    }
    xhr.send();

}
function getPaymentFE(arr){
    let xhr  = new XMLHttpRequest();
    let url = `http://localhost:8000/payment/${arr[1]}/${arr[2]}/${arr[3]}/${arr[4]}`;
    console.log(url);
    xhr.open('GET' , url );
    xhr.onload = ()=>{
        if(xhr.status == 200){
            console.log(xhr.responce);
        }else{
            console.log(" err",xhr.status);
        }
    }
    xhr.send();

}


