var fs = require("fs");
var express = require('express');
const bp = require('body-parser')
const app = express()
const { encryptString, decryptString } = require("@gykh/caesar-cipher");
var cookieParser = require('cookie-parser');
app.use(cookieParser());
const { application } = require("express");
var keys = ['uwu']
var ip = require("ip");
const { emitKeypressEvents } = require("readline");
const e = require("express");

var userns = []
var userps = []
var bal = []
var tnumber = []

console.log("startup")
function gd(){
    userns = fs.readFileSync("D:/htsandyoutube/hts/software/node/boo/data/users.txt", 'utf8').split(",");
    userps = fs.readFileSync("D:/htsandyoutube/hts/software/node/boo/data/passwords.txt", 'utf8').split(",");
    bal = fs.readFileSync("D:/htsandyoutube/hts/software/node/boo/data/bal.txt", 'utf8').split(",");
    tnumber = fs.readFileSync("D:/htsandyoutube/hts/software/node/boo/data/tnumber.txt", 'utf8').split(",");

}
function sa(){
    fs.writeFileSync('D:/htsandyoutube/hts/software/node/boo/data/users.txt', userns.join(","));
    fs.writeFileSync('D:/htsandyoutube/hts/software/node/boo/data/passwords.txt',userps.join(","));
    fs.writeFileSync('D:/htsandyoutube/hts/software/node/boo/data/bal.txt',bal.join(","));
    fs.writeFileSync('D:/htsandyoutube/hts/software/node/boo/data/tnumber.txt',tnumber.join(","));

}
function check(userd, pads){
    if(userns.includes(userd)){
        
        console.log(userps[userns.indexOf(userd)])
        if(userps[userns.indexOf(userd)]== pads){
            return true;

        }else{
            return false;
        }
    }else{
        return false;
    }
}
gd();
console.log("loaded files")
app.get('/login',function (req, res){
    res.end(fs.readFileSync("./html/login/index.html", 'utf8'))
})
app.get('/login/style.css',function (req, res){
    res.end(fs.readFileSync("./html/login/style.css", 'utf8'))
})
app.get('/sign-up',function (req, res){
    res.end(fs.readFileSync("./html/sign-up/index.html", 'utf8'))
})
app.get('/sign-up/style.css',function (req, res){
    res.end(fs.readFileSync("./html/sign-up/style.css", 'utf8'))
})
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))



app.post('/api/login', function (req, res) {
    var user = req.body.username;
    var pas = req.body.password;
    console.log(userns[0])
    console.log(user)


    if(userns.includes(user)){
        
        console.log(userps[userns.indexOf(pas)])
        if(userps[userns.indexOf(user)]== pas){
            res.cookie('lo', `${encryptString(user+","+pas,4)}`)
            res.redirect("/wel")
            res.end();

        }else{
            res.send("pasword incorrect")
            res.end();
        }
    }else{
        res.send("user dose not exist")
        res.end();
    }
});
app.post('/api/signup', function (req, res) {
    var user = req.body.username;
    var pas = req.body.password;
    console.log(JSON.stringify(req.body))
    if(!userns.includes(user)){
    userns.push(user);
    userps[userns.indexOf(user)]= pas
    bal[userns.indexOf(user)]= 0
    tnumber[userns.indexOf(user)]= Math.floor(1000000000 + Math.random() * 9999999999)
    fs.mkdirSync(`./data/history/${user}`);
    fs.writeFileSync(`./data/history/${user}/history.txt`,"");
    fs.mkdirSync(`./data/messages/${user}`);

    sa();
    res.redirect("/login")
    }else{
        res.send("username already exist")
    }
});
app.post('/api/message', function(req,res){
    if(req.cookies.lo == undefined){
        res.redirect("/login")
        return true;
    }
    if(userns.includes(req.body.user)){
    var usda = decryptString(req.cookies.lo, 4);
    var username = usda.split(",")[0]
    var password = usda.split(",")[1]
    var user = req.body.user;
    console.log(userns)
    if(userns.includes(user)){
        if(check(username,password)){
            if (!fs.existsSync(`d:\\htsandyoutube/hts/software/node/boo/data/messages/${username}/${req.body.user}.txt`)) {
                fs.writeFileSync(`d:\\htsandyoutube/hts/software/node/boo/data/messages/${username}/${req.body.user}.txt`,"");
            }
            console.log(`d:\\htsandyoutube/hts/software/node/boo/data/messages/${req.body.user}/${username}.txt`)
            if (!fs.existsSync(`d:\\htsandyoutube/hts/software/node/boo/data/messages/${req.body.user}/${username}.txt`)) {
                
                  fs.writeFileSync(`d:\\htsandyoutube/hts/software/node/boo/data/messages/${req.body.user}/${username}.txt`,"");
            }
            array = fs.readFileSync(`./data/messages/${username}/${user}.txt`, 'utf8').split(",");
            s = `<head>
            <link rel="stylesheet" href="./m/styles.css">
          </head><script src="https://code.jquery.com/jquery-1.8.3.min.js"></script>
 <script>

         const interval = setInterval(function() {

            $.getJSON('./getms', function(data) {
          
                document.getElementById("shit").innerHTML =data.data;

            });}, 50);
            
          </script><script> 

          function kk(){
            document.getElementById("no").submit()
            setTimeout(function(){
                document.getElementById("yes").value = ""    
                window.scrollTo(0, document.body.scrollHeight);

            }, 200);
        }
        window.scrollTo(0, document.body.scrollHeight);

        </script><body class="shit" ><div id="shit"><h1>messages to ${user}</h1>`;
            array.forEach(element => {
                if(element.includes("own")){
                s= s+`	<div class="bubbleWrapper">
                <div class="inlineContainer own">
                    <img class="inlineIcon" style="opacity: 0" src="https://www.pinclipart.com/picdir/middle/205-2059398_blinkk-en-mac-app-store-ninja-icon-transparent.png">
                    <div class="ownBubble own">
                    ${element.replace("own","")} 

                    </div>
                </div><span  style="opacity: 0" class="own">08:55</span>
            </div>
                    
                    `}else{
                s= s+`		<div class="bubbleWrapper">
                <div class="inlineContainer">
                    <img style="opacity: 0" class="inlineIcon" src="https://cdn1.iconfinder.com/data/icons/ninja-things-1/1772/ninja-simple-512.png">
                    <div class="otherBubble other">
                        ${element}
                    </div>
                </div>
            </div><span style="opacity: 0" class="other">10:13</span>`
            }
            });
            s= s +`</div><form id="no" action="./smessage" method="POST">
            <input style="opacity: 0" type="text" name="user" value="${user}">

            <input type="text" id="yes" name="message" placeholder="message">
            <input type="submit" onclick='kk()' value="Submit">
      
          </form></body></html>`;
          res.cookie('w', `${user}`)

          res.end(s)

        }else{
            res.end("login in")
        }
    }else{
        
        res.end("user dose not exist")

    }}else{
        res.end("user dose not exist please go back and pick a correct user")
    }
})
app.get('/api/getms', function(req,res){
    var usda = decryptString(req.cookies.lo, 4);
    var username = usda.split(",")[0]
    var password = usda.split(",")[1]
    var user = req.cookies.w;
    array = fs.readFileSync(`./data/messages/${username}/${user}.txt`, 'utf8').split(",");
    s = `<h1>messages to ${user}</h1>`;
    array.forEach(element => {
        if(element.includes("own")){
        s= s+`	<div class="bubbleWrapper">
        <div class="inlineContainer own">
            <img class="inlineIcon" style="opacity: 0" src="https://www.pinclipart.com/picdir/middle/205-2059398_blinkk-en-mac-app-store-ninja-icon-transparent.png">
            <div class="ownBubble own">
            ${element.replace("own","")} 

            </div>
        </div><span  style="opacity: 0" class="own">08:55</span>
    </div>
            
            `}else{
        s= s+`		<div class="bubbleWrapper">
        <div class="inlineContainer">
            <img style="opacity: 0" class="inlineIcon" src="https://cdn1.iconfinder.com/data/icons/ninja-things-1/1772/ninja-simple-512.png">
            <div class="otherBubble other">
                ${element}
            </div>
        </div>
    </div><span style="opacity: 0" class="other">10:13</span>`
    }
    });
    
  res.json({ data: s })

})
app.post('/api/smessage',function (req, res) {

      if(req.cookies.lo == undefined){
        res.redirect("/login") 
        return true;
    }   

        var usda = decryptString(req.cookies.lo, 4);
        var username = usda.split(",")[0]
        var password = usda.split(",")[1]
        var ball = bal[userns.indexOf(username)]
        var ttnumber = tnumber[userns.indexOf(username)]
        gd();
        if(req.body.user== "everyone"){
            fs.appendFile(`d:\\htsandyoutube/hts/software/node/boo/data/messages/GC/m.txt`, `,${username}:<br>${req.body.message.replace(",","")}`, function (err) {
                if (err) throw err;
                console.log('Saved!');
              });
              res.status(204).send()
              return true
            }

        if(check(username,password)){
            console.log(`d:\\htsandyoutube/hts/software/node/boo/data/messages/${username}/${req.body.user}.txt`)

            if (!fs.existsSync(`d:\\htsandyoutube/hts/software/node/boo/data/messages/${username}/${req.body.user}.txt`)) {
                fs.writeFileSync(`d:\\htsandyoutube/hts/software/node/boo/data/messages/${username}/${req.body.user}.txt`,"");
            }
            console.log(`d:\\htsandyoutube/hts/software/node/boo/data/messages/${req.body.user}/${username}.txt`)
            if (!fs.existsSync(`d:\\htsandyoutube/hts/software/node/boo/data/messages/${req.body.user}/${username}.txt`)) {
                
                  fs.writeFileSync(`d:\\htsandyoutube/hts/software/node/boo/data/messages/${req.body.user}/${username}.txt`,"");
            }
            
            fs.appendFile(`d:\\htsandyoutube/hts/software/node/boo/data/messages/${username}/${req.body.user}.txt`, `,own${req.body.message.replace(",","")}`, function (err) {
                if (err) throw err;
                console.log('Saved!');
              });
            fs.appendFile(`d:\\htsandyoutube/hts/software/node/boo/data/messages/${req.body.user}/${username}.txt`, `,${req.body.message.replace(",","")}`, function (err) {
                if (err) throw err;
                console.log('Saved!');
              });
              res.status(204).send()
                }

})
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))
app.get('/api/l',function (req, res){
    res.redirect('back');
})
app.get('/', function (req, res) {
if(req.cookies.lo == undefined){
    res.redirect("/login")
    return true;
}   
    var ad = ""
  var usda = decryptString(req.cookies.lo, 4);
    var username = usda.split(",")[0]
    var password = usda.split(",")[1]
    var ball = bal[userns.indexOf(username)]
    var ttnumber = tnumber[userns.indexOf(username)]
    gd();
    if(username=="admin"){

        ad="<h3>users "+userns.length;+"</h3>"
    }
      
    if(check(username,password)){
        res.send(`<!DOCTYPE html>
        <html lang="en" >
        <head>
          <meta charset="UTF-8">
          <title>dashboard</title>
          <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css'><link rel="stylesheet" href="./dashboard/style.css">
          <script >
          
            function s() {
            window.location.href = "api/send/?t=" + document.getElementById('userid').value + "&m=" +document.getElementById('money').value + "&"+document.cookie.replace("'","");
        }
  
          </script>

        </head>
        <body>
        <!-- partial:index.partial.html -->

        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300&display=swap" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@100&display=swap" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css2?family=Teko:wght@300&display=swap" rel="stylesheet">
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">

        <div class = "navbar">
          <h3>BOO</h3>
          <ul>
            <li><b><i class="fab fa-elementor"></i>&nbsp;&nbsp;Dashboard</b></li>
            <a href="/logout"><li ><b><i class="material-icons" style="font-size: 14px;">logout</i>&nbsp;&nbsp;Logout</b></li></a>
          </ul>
        </div>
        
        <div class = "dashboard">
          <div class = "top-bar">
            <div class="a"></div>
            <div class = "profile-data">
              <span><b>${username}</b></span>
            </div>
            
            
          </div>
          <div class = "text-title">
            <h1><b>Dashboard</b></h1>
            </div>
          <div class = "row-1">
            <div class = "col-1 col">
              <h2>Balance</h2>
              <p><b>£${ball}</b><b class = "fraction"></b></p>
            </div>
            <div class = "col-2 col">
              <p class = "title"><b>${username} details</b></p>
              <p class = "card-no">${ttnumber}</p>                   <span id = "name">${username}</span>
              <span id = "kst"></span>
            </div>
          </div>
           <div class = "row-1">
            <div class = "col-2 col" >
          <h2 class = "text-title">send money</h2>
          <div style="padding-left:30px">
            <input type = "text" id="userid" class="nb" >
            <input type = "text" id="money" class="nb" >
            <input type="submit" class="btn" onclick="s();">
            <div>
            <!-- Scrolling div courtesy of HTML Basix - www.htmlbasix.com -->
            <div id = 'scrolling_div1' class = 'scrolling_div1'  style = "color:white;text-align: left;overflow: auto;width: 500px;height: 200px">
            ${fs.readFileSync("./data/history/"+username+"/history.txt", 'utf8')}
            </div>
            <!-- End Scrolling div -->
            </div>
          </div>
          <div class = "row-3">
            <div class= "col-2">
              <br><br><br><br>
               
            </div>
          </div>
        </div>
        <!-- partial -->
          
        </body>
        </html>
        `)
    }else{

    }
})
app.get('/api/m/styles.css', function (req, res){
    res.end(fs.readFileSync("./html/message/style.css", 'utf8'))
})
app.get('/api/send', function (req, res) {
  
    var usda = decryptString(req.query.lo, 4);
    var username = usda.split(",")[0]
    var ball = bal[userns.indexOf(username)]

    console.log(ball)

    var ne = parseInt(req.query.m);
    var tnr = req.query.t;
if(ne < parseInt(ball)){
    if(tnumber.includes(tnr)){
        bal[tnumber.indexOf(tnr)] = parseInt(bal[tnumber.indexOf(tnr)]) + ne
        bal[userns.indexOf(username)] = parseInt(ball) - ne   
        sa();
        fs.appendFile(`./data/history/${username}/history.txt`, `<h4 class = "text-title" style="font-size:13px">${username},${tnumber[userns.indexOf(username)]} £${ne} --> ${userns[tnumber.indexOf(tnr)]},${tnr} </h4>`, function (err) {
            if (err) throw err;
            console.log('Saved!');
          });
          fs.appendFile(`./data/history/${userns[tnumber.indexOf(tnr)]}/history.txt`, `<h4 class = "text-title" style="font-size:13px" >${username},${tnumber[userns.indexOf(username)]} £${ne} --> ${userns[tnumber.indexOf(tnr)]},${tnr} </h4>`, function (err) {
            if (err) throw err;
            console.log('Saved!');
          });
          
        res.redirect("/approved")
        
    }else{
        res.send("dose not exist")
    }
}else{
    res.end("broke bitch")
}
});
app.get('/home', function (req, res){
    res.end(fs.readFileSync("./html/home/index.html", 'utf8')) 

})

app.get('/home/style.css', function (req, res){
    res.end(fs.readFileSync("./html/home/style.css", 'utf8')) 

})
app.get('/home/script.js', function (req, res){
    res.end(fs.readFileSync("./html/home/script.js", 'utf8')) 

})
app.get('/logout', function (req, res) {
    res.clearCookie("lo");
    res.redirect("/")
})
app.get('/approved', function (req, res) {
   res.end(fs.readFileSync("./html/approved/index.html", 'utf8')) 
});
app.get('/message', function (req, res) {
    if(req.cookies.lo == undefined){
        res.redirect("/login")
        return true;
    }
    var usda = decryptString(req.cookies.lo, 4);
    var username = usda.split(",")[0]
    res.end(`<!DOCTYPE html>
    <html lang="en" >
    <head>
      <meta charset="UTF-8">
      <title>dashboard</title>
      <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css'><link rel="stylesheet" href="./messages/style.css">
    
    </head>
    <body>
    <!-- partial:index.partial.html -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@100&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Teko:wght@300&display=swap" rel="stylesheet">
    
    <div class = "navbar">
      <h3>BOO</h3>
      <ul>
      <a href="/home"><li><b><i class="fab fa-elementor"></i>&nbsp;&nbsp;home</b></li></a>
      <a href="/gc"><li><b><i class="fab fa-elementor"></i>&nbsp;&nbsp;global chat</b></li></a>
      <a href="/logout"><li><b><i class="fab fa-elementor"></i>&nbsp;&nbsp;logout</b></li></a>


      </ul>
    </div>
    
    <div class = "dashboard">
      <div class = "top-bar">
        <div class="a"><form action="./api/message" method="POST">
          <input type="text" name="user" value="user">
          <input type="submit" value="messages">
    
        </form></div>
        <div class = "profile-data">
          <i class="far fa-bell"></i>
          <span><b>${username}</b></span>
          <i class="fas fa-angle-down"></i>
        </div>

        
      </div>
      
        
      </div>
      
        
      </div>
    </div>
    <!-- partial -->
      
    </body>
    </html>
    `) 
 });
 app.get('/messages/style.css', function (req, res) {
    res.end(fs.readFileSync("./html/messages/style.css", 'utf8')) 
 });
app.get('/ap/style.css', function (req, res) {
    res.end(fs.readFileSync("./html/approved/style.css", 'utf8'))

})
app.get('/dashboard/style.css', function (req, res) {
    res.end(fs.readFileSync("./html/dashboard/style.css", 'utf8'))

})

app.get('/dashboard/js.js', function (req, res) {
    res.end(fs.readFileSync("./html/dashboard/js.js", 'utf8'))

}) 
app.get('/thegirlinabox.mp4', function (req, res) {
    res.setHeader("content-type", "some/type");
    fs.createReadStream("D:\\d\\Girl In The Box (2016) [1080p] [WEBRip] [YTS.MX]\\Girl.In.The.Box.2016.1080p.WEBRip.x264.AAC-[YTS.MX].mp4").pipe(res);
   
});
app.get('/world.zip', function (req, res) {
    res.setHeader("content-type", "some/type");
    fs.createReadStream("C:\\Users\\harry\\AppData\\Roaming\\.minecraft\\saves\\world.zip").pipe(res);

});
// global chat
app.get('/gc', function(req,res){
    if(req.cookies.lo == undefined){
        res.redirect("/login")
        return true;
    }
    
    var usda = decryptString(req.cookies.lo, 4);
    var username = usda.split(",")[0]
    var password = usda.split(",")[1]
    console.log(userns)
        if(check(username,password)){
           
            array = fs.readFileSync(`./data/messages/GC/m.txt`, 'utf8').split(",");
            s = `<head>
            <link rel="stylesheet" href="./api/m/styles.css">
          </head><script src="https://code.jquery.com/jquery-1.8.3.min.js"></script>
 <script>

         const interval = setInterval(function() {

            $.getJSON('./getgc', function(data) {
          
                document.getElementById("shit").innerHTML =data.data;

            });}, 50);
            
          </script><script> 

          function kk(){
            document.getElementById("no").submit()
            setTimeout(function(){
                document.getElementById("yes").value = ""    
                window.scrollTo(0, document.body.scrollHeight);

            }, 200);
        }
        window.scrollTo(0, document.body.scrollHeight);

        </script><body class="shit" ><div id="shit"><h1>messages to everyone</h1>`;
            array.forEach(element => {
                if(element.startsWith(`${username}`)){
                    s= s+`	<div class="bubbleWrapper">
                    <div class="inlineContainer own">
                        <img class="inlineIcon" style="opacity: 0" src="https://www.pinclipart.com/picdir/middle/205-2059398_blinkk-en-mac-app-store-ninja-icon-transparent.png">
                        <div class="ownBubble own">
                        ${element.replace(`${username}:<br>`,"")} 
            
                        </div>
                    </div><span  style="opacity: 0" class="own">08:55</span>
                </div>
                        
                        `
        
                }else{
                s= s+`		<div class="bubbleWrapper">
                <div class="inlineContainer">
                    <img style="opacity: 0" class="inlineIcon" src="https://cdn1.iconfinder.com/data/icons/ninja-things-1/1772/ninja-simple-512.png">
                    <div class="otherBubble other">
                        ${element}
                    </div>
                </div>
            </div><span style="opacity: 0" class="other">10:13</span>`
                }
            });
            s= s +`</div><form id="no" action="./api/smessage" method="POST">
            <input style="opacity: 0" type="text" name="user" value="everyone">

            <input type="text" id="yes" name="message" placeholder="message">
            <input type="submit" onclick='kk()' value="Submit">
      
          </form></body></html>`;

          res.end(s)

        }else{
            res.end("login in")
        }
    
})



app.get('/getgc', function(req,res){
    s="";
    var usda = decryptString(req.cookies.lo, 4);
    var username = usda.split(",")[0]
    var password = usda.split(",")[1]
    array = fs.readFileSync(`./data/messages/GC/m.txt`, 'utf8').split(",");
    array.forEach(element => {
        if(element.startsWith(`${username}`)){
            s= s+`	<div class="bubbleWrapper">
            <div class="inlineContainer own">
                <img class="inlineIcon" style="opacity: 0" src="https://www.pinclipart.com/picdir/middle/205-2059398_blinkk-en-mac-app-store-ninja-icon-transparent.png">
                <div class="ownBubble own">
                ${element.replace(`${username}:<br>`,"")} 
    
                </div>
            </div><span  style="opacity: 0" class="own">08:55</span>
        </div>
                
                `

        }else{
        s= s+`		<div class="bubbleWrapper">
        <div class="inlineContainer">
            <img style="opacity: 0" class="inlineIcon" src="https://cdn1.iconfinder.com/data/icons/ninja-things-1/1772/ninja-simple-512.png">
            <div class="otherBubble other">
                ${element}
            </div>
        </div>
    </div><span style="opacity: 0" class="other">10:13</span>`
        }
    });
    
  res.json({ data: s })

})
// new welcome page
app.get('/wel', function (req, res){
    var usda = decryptString(req.cookies.lo, 4);
    var username = usda.split(",")[0]
    var password = usda.split(",")[1]
res.end(`<!DOCTYPE html>
<html lang="en" >
<head>
  <meta charset="UTF-8">
  <title>Welcome animation</title>
  <script src="https://code.jquery.com/jquery-1.8.3.min.js"></script>

  <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.3/css/bootstrap.min.css'><link rel="stylesheet" href="./wel/style.css">
    <script>
    
    setTimeout(function(){
        window.location.href = '/home';
     }, 1500);
    </script>
</head>
<body>
<!-- partial:index.partial.html -->
<div class="login-wrapper" id="login-wrapper">
  <span></span>
  <span></span>
  <span></span>
  <span></span>
 <h1>welcome, ${username}</h1>
</div>
<!-- partial -->
  
</body>
</html>
`)

})

app.get('/wel/style.css', function (req, res){
    res.end(fs.readFileSync("./html/welcome/style.css", 'utf8')) 


})







app.listen(80);
console.log("started")
