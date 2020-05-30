const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./chinook.db');

//Retrieving All Rows
db.all("SELECT EmployeeId, FirstName FROM employees", (error, rows) => {
    rows.forEach((row) => {
        console.log(row.EmployeeId + " " + row.FirstName);
    })
});

//Retrieving A Single Row
db.get("SELECT EmployeeId, FirstName FROM employees", (error, row) => {
    console.log(row.EmployeeId + " " + row.FirstName);
});

//Retrieving Data Based on Placeholder
db.all("SELECT EmployeeId, FirstName FROM employees where title=$title", {
        $title: 'Sales Support Agent'
    },
    (error, rows) => {rows.forEach((row) => {
        console.log(row.EmployeeId + " " + row.FirstName);
    })
});

//Executing run() Method
db.run(`INSERT INTO playlists(Name) VALUES(?)`, 
    ['Rock'],
    function(error){
        console.log("New playlist added with id " + this.lastID);
    }
);
    
//Using SQLite each() Method Instead of forEach()
db.each("SELECT EmployeeId, FirstName FROM employees limit 10",
    (error, row) => {
        console.log(row.EmployeeId + " " + row.FirstName);
    }
);

//Running Queries Synchronously
//without serialize method
db.run("DROP TABLE playlists", function(error){
    db.run("CREATE TABLE playlists([PlaylistId] INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,[Name] NVARCHAR(120))", function(error){
        db.run("INSERT INTO playlists (name) VALUES  ('Music'), ('Movies'), ('TV Shows')");
    });
});

//with serialize method
db.serialize(() => {
    db.run("DROP TABLE playlists");
    db.run("CREATE TABLE playlists([PlaylistId] INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,[Name] NVARCHAR(120))");
    db.run("INSERT INTO playlists (name) VALUES  ('Music'), ('Movies'), ('TV Shows')");
});