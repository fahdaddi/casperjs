/*eslint strict:0*/
/*global CasperError, console, phantom, require*/

phantom.casperPath = 'C:/Users/fahd/AppData/Roaming/npm/node_modules/casperjs';
phantom.injectJs( phantom.casperPath + '/bin/bootstrap.js');

var casper = require("casper").create({
    verbose: true,
    viewportSize :{width: 1500, height: 1000}
});

casper.userAgent('Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:47.0) Gecko/20100101 Firefox/47.0');

var x = require('casper').selectXPath;

//----------------------------------------------------------------------------------------------------------------------------

function fillCridentials(username,password){
  this.fill(x('//*[@id="app"]/div/form'),{
    username : username,
    password : password
  });
  this.click(x('//*[@id="app"]/div/form/div/div/div/div[3]/button'));
  this.echo('Loging in...')
}

function start(link){
  this.echo(link)
  this.start(link)
  this.wait(5000);
  this.echo('Page title: '+ this.getTitle());
  this.capture('img3.png')
}

function capture(name){
  this.wait(10000, function(){
    this.capture(name+'.png');
  });
}

function main(){
  start.call(this,'https://ads.reddit.com/login');
  this.wait(300, function(){
    this.echo(this.getTitle());
  });
  casper.capture('amg1.png')
  capture.call(this,'img1');
  // fillCridentials.call(this,'ShowstopMedia','AZcrown12');
  this.echo('All done.');
  this.exit();
}


casper.start().then(function(){
  this.echo('Started Scarping Ads.reddit.com')
});

casper.run(main);



















































casper.open('https://ads.reddit.com/api/v1/account/t2_1ql2lygi/dashboard',{
  method : 'POST',
  data : {"breakdowns":[],"columns":["impressions","clicks","revenue","ecpm","ctr","cpc"],"endDate":"2018-10-24","filters":[],"graphMetric":"impressions","level":"campaignId","selectedCampaigns":[],"selectedAdgroups":[],"selectedAds":[],"sorts":[],"startDate":"2018-10-23","viewWindow":"viewWindow1","view":"Default"}
});

casper.wait(5000,function(){
  casper.capture("adsPost.png");
  this.echo('captured !')
});
