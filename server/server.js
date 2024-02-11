const mysql = require('mysql');
const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');

const app = express();
app.use(cors());
app.use(bodyparser.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
});

db.connect((err) => {
    if (err) {
        console.log("Connection Failed!");
    } else {
        ;
    }
});


//CREATING TABLES:
function createTables(){
    const query1 = "create database if not exists covid";
    db.query(query1,(err,result)=>{
        if(err){
            console.log("Couldn't Create Database");
            return;
        }else{
            db.query("use COVID",(err1,results1)=>{
                if(err1){
                    console.log(`Cannot use the Database:-${err}`);
                    return;
                }else{
                    const users_query = `CREATE TABLE IF NOT EXISTS USERS(
                        id INT PRIMARY KEY AUTO_INCREMENT,
                        name varchar(255) not null, 
                        email varchar(255) not null, 
                        password varchar(255) not null, 
                        slot_timings varchar(255),
                        city varchar(100) not null,
                        centre_name varchar(255),
                        booked_city varchar(255)
                    
                    )`;

                    const centre_query = `CREATE TABLE IF NOT EXISTS CENTRES(
                        id INT PRIMARY KEY AUTO_INCREMENT,
                        centre_name varchar(255) not null,
                        city varchar(255) not null,
                        slots int not null 
                    )`;

                    db.query(users_query,(u_err,u_results)=>{
                        if(u_err){
                            console.log(`Couldn't create User Table: ${u_err}`);
                            return;
                        }else{
                            db.query(centre_query,(c_err,c_results)=>{
                                if(c_err){
                                    console.log(`Couldnt'create Centre Table: ${c_err}`);
                                    return;
                                }else{
                                    ;
                                }
                            })
                        }
                    })
                }
            })
        }
    })
}


createTables();



//ADMIN ROUTES
let is_admin = false;
app.post('/admin_login' , (req,res) => {
    const username = req.body.user_name;
    const pass = req.body.pass;
    if(username == 'Admin' && pass == "admin123"){
        is_admin = true;
        res.status(200).send("WELCOME ADMIN");
    }else{
        res.status(400).send("Wrong Credentials")
    }

})

app.post('/create_centre' , (req,res) => {
    if(is_admin == false){
        res.status(400).send("NOT ADMIN!");
    } else {
        const details = req.body;
        const c_name = details.centre_name;
        const c_city = details.centre_city;
        const slots = details.slots;
        
        quer = "SELECT centre_name FROM centres WHERE city = ?";
        db.query(quer, [c_city], (err, results) => {
            if(err) {
                res.status(500).send(`Internal Server Error: ${err}`);
            } else {
                if(results.length > 0) {
                    
                    res.status(200).send(`The City already has a COVID centre`);
                } else {
                    
                    query = "INSERT INTO centres(centre_name, city, slots) VALUES (?, ?, ?)";
                    db.query(query, [c_name, c_city, slots], (err, results) => {
                        if(err) {
                            res.status(500).send(`Internal Server Error: ${err}`);
                        } else {
                            res.status(200).send('Created Successfully!');
                        }
                    });
                }
            }
        });
    }
});


app.put('/update_centre/:id' , (req,res) =>{
    if(is_admin == false){
        res.status(400).send("NOT ADMIN!");
    }else{
        const details = req.body;
        const id = req.params.id;
        const c_name = details.centre_name;
        const c_city = details.city;
        const slots = details.slots;
        query = "update centres set centre_name = ? , city = ? , slots = ? where id = ?";
        db.query(query,[c_name,c_city,slots,id] , (err,results) =>{
            if(err){
                res.status(500).send(`Internal Server Error: ${err}`);
            }else{
                res.status(200).send('Updated Successfully!');
            }
        })
    }
})

app.delete('/delete_centre/:id' , (req,res) => {
    if(is_admin == false){
        res.status(400).send("NOT ADMIN!");
    }else{
        const id = req.params.id;
        query = "delete from centres where id = ?";
        db.query(query,[id],(err,result)=>{
            if(err){
                res.status(500).send(`Internal Server Error: ${err}`);
            }else{
                res.status(200).send("Deleted Successfully!");
            }
        })
    }
})


app.get('/centre/:id',(req,res)=>{
    if(is_admin == true){
        const id = req.params.id;
        query = "select centre_name , city , slots from centres where id = ?";
        db.query(query,[id],(err,results)=>{
            if(err){
                res.status(500).send(`Internal Server Error : ${err}`);
            }else{
                res.status(200).json(results);
            }
        })
    }
})



app.get('/admin',(req,res) => {
    if(is_admin == true){
        query = "select * from centres"
        db.query(query,(err,results) =>{
            if(err){
                res.status(500).send(`Internal Server Error: ${err}`);
            }else{
                res.status(200).json(results);
            }
        })
    }
})



// USER ROUTES
let is_user = false; 
app.post('/signup', (req, res) => {
    const details = req.body;
    const name = details.name;
    const email = details.email;
    const pass = details.password;
    const city = details.city;

    bcrypt.hash(pass, 10, (err, hashedPassword) => {
        if (err) {
            res.status(500).send(`Internal Server Error : ${err}`);
        } else {
            const q = "select name from users where email = ?";
            db.query(q,[email],(e,r)=>{
                if(e){
                    res.status(500).send(`Internal Server Error :${err}`);
                }else{
                    if(r.length > 0){
                        res.status(401).send("Email is already in use!");
                    }else{

                        const query = "INSERT INTO users(name, email, password, city) VALUES (?, ?, ?, ?)";
                        db.query(query, [name, email, hashedPassword, city], (err, results) => {
                            if (err) {
                                res.status(500).send(`Internal Server Error : ${err}`);
                            } else {
                                res.status(200).send('Registered Successfully!');
                            }
                        });
                    }
                }
            })
        }
    });
});

app.get('/login',(req,res)=>{
    res.status(200).send("");
})


app.post('/login', (req, res) => {
    const creds = req.body;
    const email = creds.email;
    const password = creds.password;

    const query = "SELECT * FROM users WHERE email = ?";
    db.query(query, [email], (err, results) => {
        if (err) {
            res.status(500).send(`Internal Server Error: ${err}`);
        } else {
            if (results.length > 0) {
                const hashedPassword = results[0].password;
                bcrypt.compare(password, hashedPassword, (err, isMatch) => {
                    if (err) {
                        res.status(500).send(`Internal Server Error: ${err}`);
                    } else if (isMatch) {
                        is_user = true;
                        res.status(200).json({"userId":results[0].id});
                        // res.redirect('/');
                    } else {
                        res.status(401).send('Invalid email or password');
                    }
                });
            } else {
                res.status(401).send('Invalid email or password');
            }
        }
    });
});






app.get('/' , (req,res) => {
    if(is_user == true){
        query = "select * from centres";
        db.query(query,(err,results) => {
            if(err){
                res.status(500).send(`Internal Server Error: ${err}`);
            }else{
                res.status(200).json(results);
            }
        })
    }else{
        res.status(500).send("LOGIN FIRST!");
    }
})


app.post('/book/:id/:centre/:city/:timings', (req, res) => {
     

    if (is_user) {
        const centre = req.params.centre;
        const timings = req.params.timings;
        const id = req.params.id;
        const city = req.params.city;
        const main_query = 'select centre_name from users where id = ?';

        const query = "UPDATE centres SET slots = slots - 1 WHERE centre_name = ? and city = ?";
        const query2 = "UPDATE users SET slot_timings = ?, centre_name = ? , booked_city = ? WHERE id = ?";
        db.query(main_query,[id],(err,results)=>{
            if(err){
                res.status(500).send(`Internal Server Error: ${err}`);
            }else{
                // console.log(results[0].centre_name);
                if(results[0].centre_name != null){
                    res.status(200).send('Already Booked a Centre');
                }
                else{
                    db.query(query, [centre,city], (err, result) => {
                        if (err) {
                            console.error("Error updating slots in centres table:", err);
                            return res.status(500).send(`Internal Server Error: ${err}`);
                        } else {
                            db.query(query2, [timings, centre, city,id], (err, result) => {
                                if (err) {
                                    console.error("Error updating user's slot_timings and centre_name:", err);
                                    return res.status(500).send(`Internal Server Error: ${err}`);
                                } else {
                                    return res.status(200).send("Booked Successfully!");
                                }
                            });
                        }
                    });
                }
            }
        })
        
    } else {
        res.status(401).send("LOGIN TO ACCESS");
    }
});


app.get('/search/:city' , (req,res) => {
    if(is_user == true){
        const city = req.params.city;
        const query = "select * from centres where city = ?";
        db.query(query,[city],(err,results)=>{
            if(err){
                res.status(500).send(`Internal Server Error: ${err}`);
            }else{
                res.status(200).json(results);
            }
        })
    }
})

app.get('/profile/:id' , (req,res) =>{
    if(is_user == true){
        const id = req.params.id;
        const query = "select name,email,city,slot_timings,centre_name,booked_city from users where id = ?";
        db.query(query,[id],(err,results)=>{
            if(err){
                res.status(500).send(`Internal Server Error: ${err}`);
            }else{
                res.status(200).json(results);
            }
        })
    }
})


app.listen(3001,(err,res)=>{
    if(err){
        console.log(`Error: ${err}`);
    }else{
        console.log("Listening");
    }
})