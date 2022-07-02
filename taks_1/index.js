import fs from "fs";
import sqlite3 from "sqlite3";
import path from "path";
import { fileURLToPath } from "url";
import jsonToTable from "json-to-table";

const dbName = "taks_1.db";

const CreateDB = () => {
  fs.open(`./taks_1/${dbName}`, "w", function (err, file) {
    if (err) throw err;
    console.log("Suksess Create Db");
  });
};

const CreateTable = async (db) => {
  const table = [
    "CREATE TABLE Product(ProductID INTEGER PRIMARY KEY AUTOINCREMENT, Nama)",
    "CREATE TABLE SalesPerson(SalesPersonID INTEGER PRIMARY KEY AUTOINCREMENT, Nama, SalesYTD)",
    "CREATE TABLE SalesOrderHeader(SalesOrderID INTEGER PRIMARY KEY AUTOINCREMENT,SalesPersonID)",
    "CREATE TABLE SalesOrderDetail(SalesOrderDetailID INTEGER PRIMARY KEY AUTOINCREMENT, SalesOrderID, ProductID)",
  ];
  for (let i = 0; i < table.length; i++) {
    await db.run(table[i], (err) => {
      if (err) return console.error(err);
    });
  }
};

const InsertDataToTable = async (db) => {
  const tableData = [
    "INSERT INTO Product (Nama) VALUES ('Sabun')",
    "INSERT INTO Product (Nama) VALUES ('Jam Wheel Tangan')",
    "INSERT INTO Product (Nama) VALUES ('Coklat Milka Wheel')",
    "INSERT INTO Product (Nama) VALUES ('Mouse')",
    "INSERT INTO Product (Nama) VALUES ('Bantal Wheel')",
    "INSERT INTO Product (Nama) VALUES ('Guling')",
    "INSERT INTO Product (Nama) VALUES ('Susu Wheel')",
    "INSERT INTO Product (Nama) VALUES ('Citato')",
    "INSERT INTO Product (Nama) VALUES ('Wheel Sound')",
    "INSERT INTO Product (Nama) VALUES ('Toner Wheel')",
    "INSERT INTO Product (Nama) VALUES ('HandBody')",
    "INSERT INTO SalesPerson(Nama, SalesYTD) VALUES ('Maria', '2000')",
    "INSERT INTO SalesPerson(Nama, SalesYTD) VALUES ('Safira', '2332')",
    "INSERT INTO SalesPerson(Nama, SalesYTD) VALUES ('Ariawan', '2001')",
    "INSERT INTO SalesPerson(Nama, SalesYTD) VALUES ('Jennie', '2323')",
    "INSERT INTO SalesPerson(Nama, SalesYTD) VALUES ('Theyoung', '3222')",
    "INSERT INTO SalesPerson(Nama, SalesYTD) VALUES ('Hermawan', '9002')",
    "INSERT INTO SalesPerson(Nama, SalesYTD) VALUES ('Imam', '3332')",
    "INSERT INTO SalesPerson(Nama, SalesYTD) VALUES ('Eka', '9933')",
    "INSERT INTO SalesPerson(Nama, SalesYTD) VALUES ('Taufiq', '3382')",
    "INSERT INTO SalesPerson(Nama, SalesYTD) VALUES ('Natalia', '9932')",
    "INSERT INTO SalesPerson(Nama, SalesYTD) VALUES ('GusDe', '8837')",
    "INSERT INTO SalesPerson(Nama, SalesYTD) VALUES ('Wandita', '8392')",
    "INSERT INTO SalesOrderHeader(SalesPersonID) VALUES ('1')",
    "INSERT INTO SalesOrderHeader(SalesPersonID) VALUES ('2')",
    "INSERT INTO SalesOrderHeader(SalesPersonID) VALUES ('3')",
    "INSERT INTO SalesOrderHeader(SalesPersonID) VALUES ('4')",
    "INSERT INTO SalesOrderHeader(SalesPersonID) VALUES ('5')",
    "INSERT INTO SalesOrderHeader(SalesPersonID) VALUES ('6')",
    "INSERT INTO SalesOrderHeader(SalesPersonID) VALUES ('7')",
    "INSERT INTO SalesOrderHeader(SalesPersonID) VALUES ('8')",
    "INSERT INTO SalesOrderHeader(SalesPersonID) VALUES ('9')",
    "INSERT INTO SalesOrderHeader(SalesPersonID) VALUES ('10')",
    "INSERT INTO SalesOrderHeader(SalesPersonID) VALUES ('11')",
    "INSERT INTO SalesOrderHeader(SalesPersonID) VALUES ('12')",
    "INSERT INTO SalesOrderDetail(SalesOrderID, ProductID) VALUES ('1','3')",
    "INSERT INTO SalesOrderDetail(SalesOrderID, ProductID) VALUES ('2','4')",
    "INSERT INTO SalesOrderDetail(SalesOrderID, ProductID) VALUES ('3','5')",
    "INSERT INTO SalesOrderDetail(SalesOrderID, ProductID) VALUES ('4','2')",
    "INSERT INTO SalesOrderDetail(SalesOrderID, ProductID) VALUES ('5','3')",
    "INSERT INTO SalesOrderDetail(SalesOrderID, ProductID) VALUES ('6','4')",
    "INSERT INTO SalesOrderDetail(SalesOrderID, ProductID) VALUES ('7','5')",
    "INSERT INTO SalesOrderDetail(SalesOrderID, ProductID) VALUES ('8','5')",
    "INSERT INTO SalesOrderDetail(SalesOrderID, ProductID) VALUES ('9','2')",
    "INSERT INTO SalesOrderDetail(SalesOrderID, ProductID) VALUES ('10','8')",
    "INSERT INTO SalesOrderDetail(SalesOrderID, ProductID) VALUES ('11','6')",
    "INSERT INTO SalesOrderDetail(SalesOrderID, ProductID) VALUES ('12','7')",
  ];
  for (let i = 0; i < tableData.length; i++) {
    await db.run(tableData[i], (err) => {
      if (err) return console.error(err);
    });
  }
};

const Taks_1 = async (query) => {
  const getData = async (db, query) => {
    const sql = query;
    await db.all(sql, (err, rows) => {
      if (err) {
        return console.error(err);
      } else {
        console.log(jsonToTable(rows));
      }
    });
  };
  //   await CreateDB();
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const db = new sqlite3.Database(
    path.join(__dirname, "./", dbName),
    sqlite3.OPEN_READWRITE,
    (err) => {
      if (err) return console.error(err);
    }
  );
  //   await CreateTable(db);
  //   await InsertDataToTable(db);
  await getData(db, query);
};

await Taks_1(
  "SELECT SP.SalesPersonID, SP.SalesYTD FROM salesperson SP JOIN SalesOrderHeader SOH ON SP.SalesPersonID = SOH.SalesPersonID JOIN SalesOrderDetail SOD ON SOH.SalesOrderID = SOD.SalesOrderID JOIN Product P ON SOD.ProductID = P.ProductID WHERE P.Nama LIKE '%Wheel%' ORDER BY SP.SalesYTD DESC LIMIT 5"
);
