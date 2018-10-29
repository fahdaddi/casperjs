const jsdom = require('jsdom');
const fs = require('fs');
const async = require('async');
let fn = async function(){
  let adsHtml = fs.readFile('./files/ads.html',function(result){
    console.log(result)
    return result

  });
  console.log(adsHtml)
  // let regex = new RegExp('<script>.*</script>','g');
  // let arr = regex.exec(adsHtml);
  //
  // for(let i = 0 ; i < arr.length ; i++){
  //   console.log('found a match in '+arr[i] + ' with index '+regex.lastIndex);
  // }
}

fn();
