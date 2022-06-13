const crc32 = require("crc-32");
const fs = require('fs');


//return hash table
function uniqueValues(files_amount=1){
  //initialize
  let hTable = {};
  let rez = [];
  //iteration by files
  for(let file_number = 0; file_number < files_amount; file_number++){
    //read file and receive string
    let file = fs.readFileSync(`./words/out${file_number}.txt`, 'utf8', function(err, file_content) {
      if (err) return err;
      return file_content;
    });
    //split string into words
    let arr = file.split('\n');
    // calculate hash for each word and push [hash]: [word] pairs to object
    for(let word_number = 0; word_number <= 10000; word_number++){
        let hash = crc32.str(arr[word_number]);
        let index = Math.abs(hash);
        hTable[index] = arr[word_number];
        
      }
  }
  const hTableLength  = Object.keys(hTable).length;
  return `Unique word combinations: ${hTableLength} in ${files_amount} files`;
}

let start_unic = performance.now();
let unic_words = uniqueValues(20);
let finish_unic = performance.now();
console.log(unic_words); //20 files ==> 97836
console.log('time: ' + (finish_unic-start_unic)+' msec '); //from 525.6123959999532 to 792.836188999936 msec



//Determine how many usernames appear in all [files_amount] files
function returnIntersection(files_amount){
  let hTable = {};
  //array for values common for all files
  let rez_arr = [];
  //iteration by files
  for(let file_number = 0; file_number < files_amount; file_number++){
    //read file and receive string
    let file = fs.readFileSync(`./words/out${file_number}.txt`, 'utf8', function(err, file_content) {
      if (err) return err;
      return file_content;
    });
    //split string into words
    let arr = file.split('\n');
    //calculate hash for each word and push [hash]: [word] pairs to object
    for(let word_number = 0; word_number < 10000; word_number++){
        let hash = crc32.str(arr[word_number]);
        let index = Math.abs(hash);
        if(!!hTable[index]){
          if(!hTable[index][0].includes(file_number)){
            hTable[index][0].push(file_number);
          }
        }else{
          hTable[index] = [];
          hTable[index][0] = [file_number];
          hTable[index][1] = arr[word_number];
        }
        
      }
  }
  for(let item in hTable ){
    if(hTable[item][0].length === files_amount){
      rez_arr.push(hTable[item]);
    }
  }

  return `Word combinations that are in all ${files_amount} files: ${rez_arr.length}`;
}


let intersectoin_start = performance.now();
let int_words = returnIntersection(20);
let intersectoin_finish = performance.now();
console.log(int_words); //10 files ==> 0; 20 files ==> 0
console.log('time: ' + (intersectoin_finish-intersectoin_start)+' msec '); 
//10 files => time: 571.255129000172 - 719.1590740000829 msec
//20 files => time: 943.6417710001115 -  1028.7025129999965 msec
