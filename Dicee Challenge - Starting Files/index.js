//first dice
var randomNum1 = Math.random();
randomNum1 = Math.floor(randomNum1 * 6) + 1;

var randomImg1 = "dice"+randomNum1+".png";
var randomImgSource1 = "images/"+randomImg1;

var img1 = document.querySelectorAll("img")[0];
img1.setAttribute("src", randomImgSource1);

//second dice
var randomNum2 = Math.floor((Math.random() * 6) + 1 );

var randomImg2 = "dice"+randomNum2+".png";
var randomImgSource2 = "images/"+randomImg2;

var img2 = document.querySelectorAll("img")[1];
img2.setAttribute("src", randomImgSource2);

//result 
if(randomNum1 > randomNum2){
    document.querySelector("h1").textContent="Player1 wins!";
}
else if(randomNum2 > randomNum1){
    document.querySelector("h1").textContent="Player2 wins!";
}
else{
    document.querySelector("h1").textContent="Draw!";
}