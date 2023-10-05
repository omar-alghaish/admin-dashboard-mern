import fs from "fs";
import "colors"
import { configDotenv } from "dotenv";
import dbConnection from "../../configs/database"
configDotenv()

dbConnection();

const data = JSON.parse(fs.readFileSync("./data.json"))

const insertData = async () =>{
    try{
await data.create(data);
console.log("dat insered".green.inverse);
process.exit();
    }catch (error){
console.log(error)
    }
}

if (process.argv[2] === "-i") {
    insertData();
  } else if (process.argv[2] === "-d") {
    destroyData();
  }
  