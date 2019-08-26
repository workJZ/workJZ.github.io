var peymane=1000; //peymane
var meqdare_avaliye =0; //adad 
var faceColor = 'rgb(225,225,225)';
var numberColor = "black";
var innerCycle = 'gray';
var outerCycle = 'black';
var i=0;
var cycle =0;
var mode= 100;
var end =meqdare_avaliye%peymane;

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var radius = canvas.height / 2;
ctx.translate(radius, radius);
radius = radius * 0.90
setInterval(drawClock, 100);

function Enter(){
var tavan  =document.getElementById("adad").value;
end = f(end,tavan)%peymane;
// meqdare_avaliye = Math.pow(meqdare_avaliye, tavan);
setInterval(drawClock, 100);
drawClock();
//cycle = (secondNumber / number)|0 ;
}



function set(){
  meqdare_avaliye =document.getElementById("meqdareAvaliye1").value;
  end = meqdare_avaliye%peymane;
  drawClock();
  //cycle = (secondNumber / number)|0 ;
}

function f(a,b){
  if(b===1)
    return a;
  if(b%2!=0){
    b-=1;
    return (Math.pow(f(a,b/2),2)*a)%peymane;
  }
  else
   return (Math.pow(f(a,b/2),2))%peymane;

}

function drawClock() {
drawFace(ctx, radius);
drawNumbers(ctx, radius);
drawTime(ctx, radius);
}

function drawFace(ctx, radius) {
var grad;
ctx.beginPath();
ctx.arc(0, 0, radius, 0, 2*Math.PI);
ctx.fillStyle = faceColor;
ctx.fill();
grad = ctx.createRadialGradient(0,0,radius*0.95, 0,0,radius*1.05);
grad.addColorStop(0, innerCycle);
grad.addColorStop(0.5, 'white');
grad.addColorStop(1, outerCycle );
ctx.strokeStyle = grad;
ctx.lineWidth = radius*0.1;
ctx.stroke();
ctx.beginPath();

ctx.arc(0, 0, radius*0.1, 0, 2*Math.PI);
ctx.fillStyle = numberColor;
ctx.font = "15px Arial";
ctx.fillText("134", 0, 0);

ctx.fill();

}

function drawNumbers(ctx, radius) {
var ang;
var num;

ctx.font = radius*0.05 + "px arial";
ctx.textBaseline="middle";
ctx.textAlign="center";
for(num = 1; num <= peymane; num++){
ang = num * Math.PI / (peymane/2);
ctx.rotate(ang);
ctx.translate(0, -radius*0.85);
ctx.rotate(-ang);
if(num % mode == 0)
  ctx.fillText(num.toString(), 0, 0);
ctx.rotate(ang);
ctx.translate(0, radius*0.85);
ctx.rotate(-ang);
}
}

function drawTime(ctx, radius){
  if(end<meqdare_avaliye){
    i-=0.05;
    if(i<= (end)*(2*Math.PI/peymane)){
      i= (end)*(2*Math.PI/peymane);
      document.getElementById('num').innerHTML=end;
      meqdare_avaliye = end;
    }
    drawHand(ctx, i, radius*0.8, radius*0.07);
  }
  else{
    i+=0.05; 
    if(i>= (end)*(2*Math.PI/peymane)){
    i= (end)*(2*Math.PI/peymane);
    document.getElementById('num').innerHTML=end;
    meqdare_avaliye = end;
    }
    drawHand(ctx, i, radius*0.8, radius*0.07);

  }

}

function drawHand(ctx, pos, length, width) {
ctx.beginPath();
ctx.lineWidth = width;
ctx.lineCap = "round";
ctx.moveTo(0,0);
ctx.rotate(pos);
ctx.lineTo(0, -length);
ctx.stroke();
ctx.rotate(-pos);
}