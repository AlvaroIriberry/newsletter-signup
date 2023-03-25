const express = require("express");

const bodyParser = require("body-parser");
const request = require("request");


const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(request, response){
    response.sendFile(__dirname + "/signup.html")
})

app.post("/", function(req, res){
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;
    const https = require("https");
    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName,
                }
            }
        ]
    }

    const jsonData = JSON.stringify(data);
    const url = "https://us13.api.mailchimp.com/3.0/lists/af235c05e6";
    const options = {
        method: "POST",
        auth: "alvaro:5deab6ac5ddc57bb83c60ad62c93951c-us13"
    }
    const request = https.request(url, options, (res) => {

            if (res.statusCode === 200) {
                response.sendFile(__dirname + "/success.html");
            } else {
                response.sendFile(__dirname + "/failure.html");
            }

            res.on("data", function (data) {
                console.log(JSON.parse(data));

            });

        });

    request.write(jsonData);
    request.end();

    console.log(firstName, lastName, email);

});
app.listen(process.env.PORT || 3000, function() {
    console.log("Server is running in port 3000")
});
 
