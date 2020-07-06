
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const { urlencoded } = require("body-parser");

const app = express();
app.use(express.static("public"));
app.use(urlencoded({extended: true}));

app.get("/", function(req,res){
    res.sendFile(__dirname + "/signup.html");
})

app.post("/", function(req,res) {
    const fName = req.body.fname;
    const lName = req.body.lname;
    const mail = req.body.mailId;   
    const data = {
        members : [
            {
                email_address: mail,
                status: "subscribed",
                merge_fields: {
                    FNAME: fName,
                    LNAME: lName
                }
            }
        ]
    }
    const jsonData = JSON.stringify(data);
    const url = "https://us10.api.mailchimp.com/3.0/lists/25aaa490fe";
    const options = {
        method: "POST",
        auth: "leviAryan25:07e73b57e2ecea9d85def5bed7c4b157-us10"
    }
    const request = https.request(url, options, function(response) {
        if(response.statusCode === 200){
            res.sendFile(__dirname + "/success.html");
        } else{
            res.sendFile(__dirname + "/failure.html");
        }
    })
    request.write(jsonData);
    request.end();
})

app.post("/failure", function(req,res) {
    res.redirect("/");
})

app.post("/success", function(req,res) {
    res.redirect("/");
})

app.listen(process.env.PORT || 3000, function(){
    console.log("Server is working on port 3000");
})

