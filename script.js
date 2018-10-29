phantom.casperPath = 'C:/Users/fahd/AppData/Roaming/npm/node_modules/casperjs';
phantom.injectJs( phantom.casperPath + '/bin/bootstrap.js');


//Initating casper
var casper = require('casper').create({
  verbose: true,
  viewportSize :{width: 1500, height: 1000},
  clientScripts:  [
        'C:\\Users\\fahd\\Desktop\\New folder\\jquery.js'
    ]
});
casper.userAgent('Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36');

//importing the needed modules
var utils = require('utils');
var x = require('casper').selectXPath;
var fs = require('fs');
var username ='the username';
var password = '**********'


//Defining some usefull vars
var campaingsGetUrl = 'https://ads.reddit.com/api/v2/account/t2_1ql2lygi/campaigns/',adGroupesGetUrl = 'https://ads.reddit.com/api/v2/account/t2_1ql2lygi/adgroups/', adsGetUrl ='https://ads.reddit.com/api/v2/account/t2_1ql2lygi/ads/';
var exportPostUrl = 'https://ads.reddit.com/api/v1/account/t2_1ql2lygi/export';
var exportDataPost = JSON.stringify({
  "breakdowns":[],
  "columns":["impressions","clicks","revenue","ecpm","ctr","cpc"],
  "endDate":"2018-10-26",
  "filters":[],
  "graphMetric":"impressions",
  "level":"flightId",
  "selectedCampaigns":[],
  "selectedAdgroups":[],
  "selectedAds":[],
  "sorts":[],
  "startDate":"2018-10-26",
  "viewWindow":"viewWindow1",
  "view":"Default"
});
var exportRequest = {
  method : 'POST',
  data : exportDataPost
}
var campaings = [];


//Starting the navigation and clearing the browser memory
// casper.start('https://www/google.com/',function(){
//   this.clear();
// })

//visiting the ads.reddit link to log in
casper.start('https://ads.reddit.com/login',function(){
  casper.page.injectJs('C:\\Users\\fahd\\Desktop\\New folder\\jquery.js');
});

// waiting for 3s to load the DOM and printing the title
casper.wait(3000, function(){
  this.echo(this.getTitle());
});

//capturing the page the check if an error occures
casper.then(function(){
  casper.capture('./captures/img.png');
});

// filling the login form and clicking on the "log in" button
casper.then(function(){
  casper.fill(x('//*[@id="app"]/div/form'),{
    username : username,
    password : password
  });
  casper.click(x('//*[@id="app"]/div/form/div/div/div/div[3]/button'));
});

//waiting 10s to log in an render the page => capture the page to check if you're logged in and naviagte to the "Dashboard" nav
casper.wait(10000, function(){
  casper.capture('./captures/img2.png');
    casper.click(x('//*[@id="app"]/div/div[1]/div/ul/li[2]/a'));
});

// waiting 10s to load the Dashboard and capture the page to make sure you're in it
casper.wait(10000, function(){
  casper.capture('./captures/img3.png');
});

// updating the date to 'Today' => waiting 3s to load the new data => capture the page
casper.then( function(){
  casper.click(x('//*[@id="app"]/div/div[2]/div[2]/div[1]/div[2]/div/div'));
  casper.wait(3000,function(){
    casper.click(x('//*[@id="app"]/div/div[2]/div[2]/div[1]/div[2]/div/div[2]/table/tbody/tr[1]/td[2]/div/ul/li[1]'));
    casper.click(x('//*[@id="app"]/div/div[2]/div[2]/div[1]/div[2]/div/div[2]/table/tbody/tr[2]/td/div/div[2]/button[2]'));
  });
  casper.wait(3000,function(){
    casper.capture('./captures/img4.png');
  });
});

// casper.then(function(){
//   this.evaluate(function(){
//     var test = document.querySelector('#app > div > div.sc-feJyhm.jRPgoj > div.sc-iELTvK.giASXm > div:nth-child(3) > div > div:nth-child(4) > div');
//     var today = new Date();
//     var year = today.getFullYear();
//     var month = today.getMonth()+1;
//     var day = today.getDate();
//     var filePath = './files/createdHtml-'+year+'-'+month+'-'+day+'.html';
//     fs.write(filePath, test , 'w');
//   });
// });

//Click the 'export to csv' button & Downloading the file //ERROR: 'illegal buffer'
// casper.then(function(){
//   casper.click(x('//*[@id="app"]/div/div[2]/div[2]/div[1]/div[1]/div/div[4]/button'));
//   casper.capture('./captures/img5.png');
//   casper.on('resource.received', function(resource) {
//     if (resource.stage !== "end") {
//         console.log("resource.stage !== 'end'");
//         return;
//     }
//     else{
//         console.log("Downloading csv file");
//         this.download(resource.url, 'ExportData.csv');
//         this.capture('./captures/img6.png')
//     }
//   });
// });
// var elements = function(){
//     var elts = $('body').querySelector('div.sc-cmTdod.gSLajJ div div a');
//     return elts;
// }



//calling a method to get campaings elements
// casper.thenOpen(campaingsGetUrl,{
//   method : 'GET'
// },function(response){
//   this.echo('response is here!');
//   utils.dump(response);
//
//   this.echo('this.page.plainText');
//   this.wait(3000,function(){
//     this.capture('./captures/getcampaings.png')
//   });
// });

//Getting the campaings names and states
casper.then(function(){
  var dom = this.evaluate(function(){
    return document.body.innerHTML;
  });
  fs.write('./files/campaings.html',JSON.stringify(dom),'w');
  this.echo('writing Campaigns file');
});

//browsing ads
casper.then(function(){
  this.click(x('//*[@id="app"]/div/div[2]/div[2]/div[3]/div/nav/a[3]'));
});

//Downloading the html file
casper.wait(2*60000,function(){
  this.capture('./captures/img5.png');
  var dom = this.evaluate(function(){
    return document.body.innerHTML;
  });
  // fs.write('./files/ads stringify.html',"<html><header></header><body>"+JSON.stringify(JSON.parse(dom))+"</body></html>", 'w');
  // dom = this.evaluate(function(){
  //   return document.body;
  // });
  fs.write('./files/ads.html',"<html><header></header><body>"+dom+"</body></html>", 'w');
  this.echo('writing Ads file');
});

//running the process
casper.run(function(){
  this.echo('the automated process\'s done').exit();
});
