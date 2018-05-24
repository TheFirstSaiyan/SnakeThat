let curX,curY;
let foodX,foodY;
let dir;
let speed=12;
let parts=[];
let score =0;
let highscore =0 ;

// function preload()
// {
//
// let data=loadJSON('highscore.json',gotData);
// }
function setup() {
			dir="none";
			score =0;
			createCanvas(800, 800);
			foodX=random(10,width-10);
			foodY=random(10,height-10);
			curX=width/2;
			curY=height/2;
			rectMode(CENTER);
			ellipseMode(CENTER);
			parts.push(createVector(curX,curY));
			frameRate(20);
			textAlign(CENTER);
			highscore=localStorage.getItem('highscore');
		

}

// function gotData(data)
// {
// 	console.log(data);
// }
function keyPressed()
{

	if(keyCode==LEFT_ARROW && dir != "right")
	{
		dir="left";
	}
	if(keyCode==RIGHT_ARROW && dir != "left")
	{
		dir="right";
	}
	if(keyCode==UP_ARROW && dir != "down")
	{
		dir="up";
	}
	if(keyCode==DOWN_ARROW && dir != "up")
	{
		dir="down";
	}
}

function checkEat()
{

	if(dist(curX,curY,foodX,foodY)<=15)
	{
			score++;
			if(score>= highscore) highscore=score;
			parts.push(createVector(curX,curY));
			foodX=random(10,width-10);
			foodY=random(10,height-10);


	}

}
function checkGameOver()
{
if(score>=highscore)
localStorage.setItem('highscore',score);
for(let i=0;i<parts.length-1;i++)
{
	if(dist(curX,curY,parts[i].x,parts[i].y)<=10)
	{
		console.log("game over");
		return true;
	}

}
return false;

}
function draw() {
					background(0);

					textSize(32);
          text("score : " + score ,60,50);
					text("\nbest : " + highscore ,53,50);
					if(dir=="left" ) curX-=speed;
					if(dir=="right") curX+=speed;
					if(dir=="up" ) curY-=speed;
					if(dir=="down") curY+=speed;

					if(curX < 0) curX=width;    /* wrap the snake*/
					if(curX > width) curX=0;
					if(curY < 0) curY = height;
					if(curY > height) curY = 0;

					ellipse(foodX,foodY,20);

					checkEat(); //check contact with food

					if(checkGameOver())   // check for game over condition
					{

						score=0;
					 	parts=[];
						curX=width/2;
						curY=height/2;
						parts.push(createVector(curX,curY));
						foodX=random(10,width-10);
						foodY=random(10,height-10);
					}

					for(let i=0;i<parts.length;i++) //draw the snake
					{
							fill(255);
							rect(parts[i].x,parts[i].y,10,10);

					}
					for(let i=0;i<parts.length-1;i++) // shift down body parts of snake
					{
								parts[i]=parts[i+1];

					}
					if(parts.length>=1)
								parts[parts.length-1]=createVector(curX,curY);    //put the current position at the last index

}
