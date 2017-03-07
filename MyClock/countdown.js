var WINDOW_WIDTH = 1024;
var WINDOW_HEIGHT =568;

var RADIUS = 8;

var MARGIN_TOP = 30;
var MARGIN_LEFT = 60;

var curShowTimeSeconds = 0;
//const endTime = new Date(2017,2,7,11,30,45);

var balls = [];
const colors = ["#990099","#0066ff","#ffff66","#cc0099","#00cc33","#ffffcc","#ee2233","#6633cc","#99cc00","#cc0000"];

window.onload = function(){
	var canvas = document.getElementById("canvas");
	var context = canvas.getContext("2d");
	
	canvas.width = WINDOW_WIDTH;
	canvas.height = WINDOW_HEIGHT;
	
	curShowTimeSeconds = getCurShowTimeSeconds();
	
	setInterval(function(){
		render(context);
		update();
		},50)
	
	
	}
	
function getCurShowTimeSeconds(){
	var curTime = new Date();
	var ret = curTime.getHours()*3600 + curTime.getMinutes()*60 + curTime.getSeconds();
	return ret;
	
	/*倒计时效果的秒时间计算
	var ret = endTime.getTime() - curTime.getTime();
 	ret = Math.round(ret/1000);
 	return ret>=0 ? ret:0;
	*/
	
	}
	
function update(){
	var nextShowTimeSeconds = getCurShowTimeSeconds();
	
	var nextHours = parseInt(nextShowTimeSeconds/3600);
	var nextMinutes = parseInt((nextShowTimeSeconds-nextHours*3600)/60);
	var nextSeconds = nextShowTimeSeconds%60;
	
	var curHours = parseInt(curShowTimeSeconds/3600);
	var curMinutes = parseInt((curShowTimeSeconds-curHours*3600)/60);
	var curSeconds = curShowTimeSeconds%60;
	
	if(nextSeconds != curSeconds){
		
		if(parseInt(nextHours/10) != parseInt(curHours/10)){
			addBalls(MARGIN_LEFT,MARGIN_TOP,parseInt(curHours/10));
			}
		if(parseInt(nextHours%10) != parseInt(curHours%10)){
			addBalls(MARGIN_LEFT+15*(RADIUS+1),MARGIN_TOP,parseInt(curHours%10));
			}
		if(parseInt(nextMinutes/10) != parseInt(curMinutes/10)){
			addBalls(MARGIN_LEFT+39*(RADIUS+1),MARGIN_TOP,parseInt(curMinutes/10));
			}
		if(parseInt(nextMinutes%10) != parseInt(curMinutes%10)){
			addBalls(MARGIN_LEFT+54*(RADIUS+1),MARGIN_TOP,parseInt(curMinutes%10));
			}
		if(parseInt(nextSeconds/10) != parseInt(curSeconds/10)){
			addBalls(MARGIN_LEFT+78*(RADIUS+1),MARGIN_TOP,parseInt(curSeconds/10));
			}
		if(parseInt(nextSeconds%10) != parseInt(curSeconds%10)){
			addBalls(MARGIN_LEFT+93*(RADIUS+1),MARGIN_TOP,parseInt(curSeconds%10));
			}
		
		curShowTimeSeconds = nextShowTimeSeconds;
		}
		updateBalls();
	}
	
function updateBalls(){

    for( var i = 0 ; i < balls.length ; i ++ ){

        balls[i].x += balls[i].vx;

    var c = 1.0;
	if( balls[i].y + RADIUS + balls[i].vy >= WINDOW_HEIGHT ){
	    c = ( WINDOW_HEIGHT - (balls[i].y+ RADIUS) ) / balls[i].vy;
	    console.log( c );	
	}
        
	balls[i].y += balls[i].vy;
	balls[i].vy += c * balls[i].g;;

        if( balls[i].y >= WINDOW_HEIGHT-RADIUS ){
            balls[i].y = WINDOW_HEIGHT-RADIUS;
	    balls[i].vy = - Math.abs(balls[i].vy)*0.75;
        }
    }

    var cnt = 0
    for( var i = 0 ; i < balls.length ; i ++ )
        if( balls[i].x + RADIUS > 0 && balls[i].x -RADIUS < WINDOW_WIDTH )
            balls[cnt++] = balls[i]

    while( balls.length > cnt ){
        balls.pop();
    }
}
	
function addBalls( x, y, num){
	for(var i=0; i<digit[num].length; i++)
		for(var j=0; j<digit[num][i].length; j++)
			if(digit[num][i][j] == 1){
				var aBall = {
					x:x+j*2*(RADIUS+1)+(RADIUS+1),
					y:y+i*2*(RADIUS+1)+(RADIUS+1),
					g:1.5 + Math.random(),
					vx:Math.pow(-1,Math.ceil(Math.random()*1000))*4,
					vy:-5,
					color:colors[Math.floor(Math.random()*colors.length)]
					}
				balls.push(aBall);
				}
	}
	
function render( cxt ){
	cxt.clearRect(0,0,WINDOW_WIDTH,WINDOW_HEIGHT);
	
	var hours = parseInt(curShowTimeSeconds/3600);
	var minutes = parseInt((curShowTimeSeconds-hours*3600)/60);
	var seconds = parseInt(curShowTimeSeconds%60);
	
	renderDigit( MARGIN_LEFT , MARGIN_TOP , parseInt(hours/10) , cxt );
	renderDigit( MARGIN_LEFT+15*(RADIUS+1) , MARGIN_TOP , parseInt(hours%10) , cxt );
	renderDigit( MARGIN_LEFT+30*(RADIUS+1) , MARGIN_TOP , 10 , cxt );
	renderDigit( MARGIN_LEFT+39*(RADIUS+1) , MARGIN_TOP , parseInt(minutes/10) , cxt );
	renderDigit( MARGIN_LEFT+54*(RADIUS+1) , MARGIN_TOP , parseInt(minutes%10) , cxt );
	renderDigit( MARGIN_LEFT+69*(RADIUS+1) , MARGIN_TOP , 10 , cxt );
	renderDigit( MARGIN_LEFT+78*(RADIUS+1) , MARGIN_TOP , parseInt(seconds/10) , cxt );
	renderDigit( MARGIN_LEFT+93*(RADIUS+1) , MARGIN_TOP , parseInt(seconds%10) , cxt );

		
	for(var i=0; i<balls.length; i++){
		
		cxt.fillStyle = balls[i].color;
		cxt.beginPath();
		cxt.arc(balls[i].x, balls[i].y, RADIUS, 0, 2*Math.PI, true);
		cxt.closePath();
		cxt.fill();
		}
	}
	
function renderDigit( x, y, num, cxt){
	cxt.fillStyle = "#6633ff";
	for(var i=0; i<digit[num].length; i++)
		for(var j=0; j<digit[num][i].length; j++)
			if(digit[num][i][j] == 1){
				cxt.beginPath();
				cxt.arc(x+j*2*(RADIUS+1)+(RADIUS+1) , y+i*2*(RADIUS+1)+(RADIUS+1) , RADIUS , 0 , 2*Math.PI);
				cxt.closePath();
				cxt.fill();
				}
	}