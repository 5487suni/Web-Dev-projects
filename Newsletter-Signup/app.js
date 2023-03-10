const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = new express();

app.use(express.static("public")); //for the server to serve up the static files
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname+"/signup.html")
});

app.post("/", function(req, res){
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;

    const data={
        members:[
            {
                email_address : email,
                status: "subscribed",
                merge_fields: {
                    FNAME : firstName,
                    LNAME : lastName
                }
            }
        ]
    }

    const jsonData = JSON.stringify(data);

    //const url = "https://us21.mailchimp.com/3.0/lists/b9a917d0e8";
    const url = "https://us21.admin.mailchimp.com/lists/members/b9a917d0e8";

    const options = {
        method: "POST",
        auth: "suni19:60dc3f5e30f164be7f818b04a1fb3add-us21"
    }

    const request = https.request(url, options, function(response){

        if(response.statusCode === 200){
            res.send("Successfully Subscribed!");
        }
        else{
            res.send("Error signing up, please try again!");
        }

        response.on("data", function(data){
            console.log(JSON.parse(data));
        });
    });

    request.write(jsonData);
    request.end();
});

app.listen(8080, function(req, res){
    console.log("Server is listening on port 8080");
});

//API Key
//60dc3f5e30f164be7f818b04a1fb3add-us21
//audience id
//b9a917d0e8
