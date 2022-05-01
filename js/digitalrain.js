//setting the canvas' width and height
const canvas = document.getElementById("digital-rain");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext("2d");
ctx.scale(1,1);
let w = canvas.width;
let h = canvas.height;
let currentPace = 'Normal';
//leading character color
let currentR1 = 200;
let currentG1 = 185;
let currentB1 = 255;
//second character color
let currentR2 = 200;
let currentG2 = 80;
let currentB2 = 255;
//character colors after second position
let currentR3 = 200;
let currentG3 = 0;
let currentB3 = 255;
//stream speeds
let speed1 = 5;
let speed2 = 3;
let speed3 = 2;
let speed4 = 1;
let isOpen = false;
const menuIcon = document.getElementById('hide-container');
let menu = document.getElementById('user-menu');
//function generating a random letter
function randomLetter()
{
	const num = "0123456789";
	const syntax = "$%&|!?/><(){}[]-+=*;:";
	const kanji = '日';
	const katakana = 'ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍ';
	const sArray = [num,syntax,kanji,katakana];
	const joinedArray = sArray.join('');
	let randNum = Math.floor(Math.random() * joinedArray.length);
	return joinedArray[randNum];
}
setTimeout(()=>{
	menuIcon.classList.add('disappear');
},2900);
menuIcon.addEventListener('click', ()=>{
	if(!isOpen) 
	{
		menu.classList.add("show");
		menu.classList.add("removeAnim");
		menuIcon.classList.remove('disappear');
		isOpen = !isOpen;
	}
	else 
	{
		menu.classList.remove("show");
		menuIcon.classList.add('disappear');
		isOpen = !isOpen;
	}
});
canvas.addEventListener('click', ()=>{
	if(!isOpen) 
	{
		menu.classList.add("show");
		menu.classList.add("removeAnim");
		menuIcon.classList.remove('disappear');
		isOpen = !isOpen;
	}
	else 
	{
		menu.classList.remove("show");
		menuIcon.classList.add('disappear');
		isOpen = !isOpen;
	}
});
let rValue = document.getElementById('r-range');
let gValue = document.getElementById('g-range');
let bValue = document.getElementById('b-range');
let customBtn = document.getElementById('custom-btn');

function leadingColor()
{
		currentR2 = 180;
		currentG2 = 180;
		currentB2 = 180;
		currentR1 = 220;
		currentG1 = 220;
		currentB1 = 220;
}
rValue.addEventListener('change', ()=>{
	currentR3 = rValue.value;
	currentG3 = gValue.value;
	currentB3 = bValue.value;
	leadingColor();
	customBtn.setAttribute('style', 'color:rgb(0,184,255);');
});
gValue.addEventListener('change', ()=>{
	currentR3 = rValue.value;
	currentG3 = gValue.value;
	currentB3 = bValue.value;
	leadingColor();
	customBtn.setAttribute('style', 'color:rgb(0,184,255);');
});
bValue.addEventListener('change', ()=>{
	currentR3 = rValue.value;
	currentG3 = gValue.value;
	currentB3 = bValue.value;
	leadingColor();
	customBtn.setAttribute('style', 'color:rgb(0,184,255);');
});

//function to change default color options
function changeColor(color)
{
	if(isOpen)
	{
		if(color === 'green') [currentR1,currentG1,currentB1,currentR2,currentG2,currentB2,currentR3,currentG3,currentB3]=[200,255,200,150,220,150,0,190,0];
		if(color === 'magenta') [currentR1,currentG1,currentB1,currentR2,currentG2,currentB2,currentR3,currentG3,currentB3]=[200,185,255,200,80,255,200,0,255];
		if(color === 'fuchsia') [currentR1,currentG1,currentB1,currentR2,currentG2,currentB2,currentR3,currentG3,currentB3]=[255,185,255,255,80,255,255,0,255];
		if(color === 'blue') [currentR1,currentG1,currentB1,currentR2,currentG2,currentB2,currentR3,currentG3,currentB3]=[200,200,255,100,145,255,50,145,255];
		if(color === 'red') [currentR1,currentG1,currentB1,currentR2,currentG2,currentB2,currentR3,currentG3,currentB3]=[255,190,190,255,100,100,255,0,0];
		if(color === 'mint')[currentR1,currentG1,currentB1,currentR2,currentG2,currentB2,currentR3,currentG3,currentB3]=[220,255,220,80,255,220,0,255,220];	
		customBtn.setAttribute('style', 'color:white;');
	}
}
//function to change speed of streams
function changeSpeed(pace)
{
	if(isOpen)
	{
		if(pace === 'normal')[speed1,speed2,speed3,speed4]=[5,3,2,1];
		if(pace === 'slow')[speed1,speed2,speed3,speed4]=[6,4,3,2];
	}
}
//arrays to hold streams/trains of letters
const trains = [];
let scale = 15;
//setting 3 sets of different stream lengths(number of letters)
let randtrainLen1 = h / scale;
let randtrainLen2 = (h / scale) * .70;
let randtrainLen3 = (h / scale) * .80;
//array to hold available x positions for a stream to take
let openX = [];
//function setting x positions where streams will run down through
function setX(availableX)
{
	let flag = true;
	let count = 0;
	while(flag)
	{
		let xInfo = {
			available : true,
			location : count,
		};
		availableX.push(xInfo);
		count += 13; //slighty smaller than scale size for close nit streams with possible overlap if same pixel size for letters
		if(count > w) flag = false;
	}
}
//setting x positions of streams
setX(openX);
let numTrains = openX.length;
function setTrains(len, openX)
{
	let trainArray = [];
	let randX;
	let randY = Math.floor(Math.random() * h);
	let randomSpeed = Math.floor((Math.random() * 4) + 1);
	let randomSize = Math.floor((Math.random() * 6) + 1);
	for(let x = 0; x < numTrains; x++)
	{
		if(!openX[x].available == false)
		{
			randX = openX[x].location;
			openX[x].available = false;
			break;
		}
		else continue;
	}
	for(let t = 0; t < len; t++)
	{
		let trainObj = {
			pos: {x: randX, y: randY},
			letter: randomLetter(),
			index: t,
			increment: 0,
			speed: randomSpeed,
			size: randomSize,
		}
		trainArray.push(trainObj);
		randY -= 15;
	}
	return trainArray;
}
//creating the streams/trains
for(let i = 0; i < numTrains; i++)
{
	let randNum = Math.floor(Math.random() * 3 + 1);
	if(randNum == 1) trains.push(setTrains(randtrainLen1,openX));
	if(randNum == 2) trains.push(setTrains(randtrainLen2,openX));
	if(randNum == 3) trains.push(setTrains(randtrainLen3,openX));
}
//setting color of letters and drawing function
function streamColor(letter,ctx,streamLength,r,g,b,r2,g2,b2,r3,g3,b3)
{
	let opacValue;
	//setting opacity variable based on position from index to be used when drawing letter
	if(letter.index >= (streamLength - Math.floor(streamLength / 10))) opacValue = .05;
	else if(letter.index < (streamLength - Math.floor(streamLength / 10)) && letter.index >= (streamLength - (Math.floor(streamLength / 10)) * 2)) opacValue = .1;
	else if(letter.index < (streamLength - (Math.floor(streamLength / 10)) * 2) && letter.index >= (streamLength - (Math.floor(streamLength / 10)) * 3)) opacValue = .2;
	else if(letter.index < (streamLength - (Math.floor(streamLength / 10)) * 3) && letter.index >= (streamLength - (Math.floor(streamLength / 10)) * 4)) opacValue = .3;			
	else if(letter.index < (streamLength - (Math.floor(streamLength / 10)) * 4) && letter.index >= (streamLength - (Math.floor(streamLength / 10)) * 5)) opacValue = .4;			
	else if(letter.index < (streamLength - (Math.floor(streamLength / 10)) * 5) && letter.index >= (streamLength - (Math.floor(streamLength / 10)) * 6)) opacValue = .5;			
	else if(letter.index < (streamLength - (Math.floor(streamLength / 10)) * 6) && letter.index >= (streamLength - (Math.floor(streamLength / 10)) * 7)) opacValue = .6;			
	else if(letter.index < (streamLength - (Math.floor(streamLength / 10)) * 7) && letter.index >= (streamLength - (Math.floor(streamLength / 10)) * 8)) opacValue = .7;			
	else if(letter.index < (streamLength - (Math.floor(streamLength / 10)) * 8) && letter.index >= (streamLength - (Math.floor(streamLength / 10)) * 9)) opacValue = .8;
	else opacValue = .9;
	//first letter in stream draw
	if(letter.index == 0)
	{
		ctx.fillStyle = `rgba(${r},${g},${b}, 1)`;
		//setting the size of the character
		if(letter.size == 1 || letter.size == 2 || letter.size == 3) ctx.font = "17px Lucida Console";
		else if(letter.size == 4 || letter.size == 5) ctx.font = "14px Lucida Console";
		else if(letter.size == 6) ctx.font = "11px Lucida Console";
		ctx.fillText(letter.letter, letter.pos.x, letter.pos.y);
	}
	//second in stream letter draw
	else if(letter.index == 1)
	{
		ctx.fillStyle = `rgba(${r2},${g2},${b2}, .8)`;
		//setting the size of the character
		if(letter.size == 1  || letter.size == 2 || letter.size == 3) ctx.font = "17px Lucida Console";
		else if(letter.size == 4 || letter.size == 5) ctx.font = "14px Lucida Console";
		else if(letter.size == 6) ctx.font = "11px Lucida Console";
		ctx.fillText(letter.letter, letter.pos.x, letter.pos.y);
	}
	//rest of the letters draw
	else
	{
		ctx.fillStyle = `rgba(${r3},${g3},${b3},${opacValue})`;
		//setting the size of the character
		if(letter.size == 1  || letter.size == 2 || letter.size == 3) ctx.font = "17px Lucida Console";
		else if(letter.size == 4 || letter.size == 5) ctx.font = "14px Lucida Console";
		else if(letter.size == 6) ctx.font = "11px Lucida Console";
		ctx.fillText(letter.letter, letter.pos.x, letter.pos.y);
	}
}
//go through the train array which is filled with arrays(the representing trains) of letter objects to draw them on canvas
function drawTrains(array,ctx,r,g,b,r2,g2,b2,r3,g3,b3)
{
	let trainLen;
 	ctx.fillStyle = "rgb(0,0,0)";
	ctx.fillRect(0,0,w, h);
	array.forEach((trainObj, trainNum) =>{
		trainLen = trainObj.length;
		trainObj.forEach((letterObj, letIndex) =>{
			//drawing the stream of character
			streamColor(letterObj,ctx,trainLen,r,g,b,r2,g2,b2,r3,g3,b3);
		});
	});
}
//animation of rain moving down
function matrixRain(trains)
{
	for(let r = 0; r < trains.length; r++)
	{
		for(let j = trains[r].length - 1; j >= 0; j--)
		{
			ctx.fillStyle = "rgb(0,0,0)";
			ctx.fillRect(trains[r][j].pos.x, trains[r][j].pos.y,scale, scale);
			trains[r][j].increment++;
			if(trains[r][j].increment >= 30) trains[r][j].increment = 0;
			
			let randomFinish = Math.floor(Math.random() * 70 + 1); //random chance variable to make stream finish before hitting bottom
			//first letter update conditions
			if(trains[r][j].increment % speed1 == 0 && trains[r][j].index == 0 && trains[r][j].speed == 1)
			{
				if(trains[r][j].letter != '')
				{
					if(randomFinish === 2) trains[r][j].letter = ''; 
					else trains[r][j].letter = randomLetter();
				}
				else trains[r][j].letter = '';
				trains[r][j].pos.y += scale;	
			}
			else if(trains[r][j].increment % speed2 == 0 && trains[r][j].index == 0 && trains[r][j].speed == 2)
			{
				if(trains[r][j].letter != '')
				{
					if(randomFinish === 2) trains[r][j].letter = ''; 
					else trains[r][j].letter = randomLetter();
				}
				else trains[r][j].letter = '';
				trains[r][j].pos.y += scale;
			}
			else if(trains[r][j].increment % speed3 == 0 && trains[r][j].index == 0 && trains[r][j].speed == 3)
			{
				if(trains[r][j].letter != '')
				{
					if(randomFinish === 2) trains[r][j].letter = ''; 
					else trains[r][j].letter = randomLetter();
				}
				else trains[r][j].letter = '';
				trains[r][j].pos.y += scale;
			}
			else if(trains[r][j].increment % speed4 == 0 && trains[r][j].index == 0 && trains[r][j].speed == 4)
			{
				if(trains[r][j].letter != '')
				{
					if(randomFinish === 2) trains[r][j].letter = ''; 
					else trains[r][j].letter = randomLetter();
				}
				else trains[r][j].letter = '';
				trains[r][j].pos.y += scale;
			}
			let randomChange = Math.floor(Math.random() * 40 + 1);//random chance variable to change letter in stream
			//assigning neighbor letter closer to head to each trailing letter for mimic letter staying in place on screen as stream goes down
			if(trains[r][j].increment % speed1 == 0 && trains[r][j].index != 0 &&  trains[r][j].speed == 1)
			{
				if(trains[r][j - 1].letter === '') trains[r][j].letter = trains[r][j - 1].letter;
				else if(randomChange == 7) trains[r][j].letter = randomLetter();
				else trains[r][j].letter = trains[r][j - 1].letter;
				trains[r][j].pos.y += scale;	
			}
			else if(trains[r][j].increment % speed2 == 0 && trains[r][j].index != 0 && trains[r][j].speed == 2)
			{
				if(trains[r][j - 1].letter === '') trains[r][j].letter = trains[r][j - 1].letter;
				else if(randomChange == 7) trains[r][j].letter = randomLetter();
				else trains[r][j].letter = trains[r][j - 1].letter;
				trains[r][j].pos.y += scale;
			}
			else if(trains[r][j].increment % speed3 == 0 && trains[r][j].index != 0 && trains[r][j].speed == 3)
			{
				if(trains[r][j - 1].letter === '') trains[r][j].letter = trains[r][j - 1].letter;
				else if(randomChange == 7) trains[r][j].letter = randomLetter();
				else trains[r][j].letter = trains[r][j - 1].letter;
				trains[r][j].pos.y += scale;
			}
			else if(trains[r][j].increment % speed4 == 0 && trains[r][j].index != 0 && trains[r][j].speed == 4)
			{
				if(trains[r][j - 1].letter === '') trains[r][j].letter = trains[r][j - 1].letter;
				else if(randomChange == 7) trains[r][j].letter = randomLetter();
				else trains[r][j].letter = trains[r][j - 1].letter;
				trains[r][j].pos.y += scale;
			}
			//make stream/train start back from top if it reaches the end of screen on bottom
			if(trains[r][j].pos.y > h) 
			{
				if(trains[r][j].letter == '') 
				{
					trains[r][j].letter = randomLetter();
				}
				trains[r][j].pos.y = 0;
			}
		}
	}
}
drawTrains(trains,ctx,currentR1,currentG1,currentB1,currentR2,currentG2,currentB2,currentR3,currentG3,currentB3);
let fpsInterval = 1000 / 20;
let dropCounter = 0;
let lastTime = 0;
function animateMatrix(time = 0)
{
	const deltaTime = time - lastTime;
	lastTime = time;
	dropCounter += deltaTime;
	if(dropCounter > fpsInterval)
	{
		matrixRain(trains);
	}
	drawTrains(trains,ctx,currentR1,currentG1,currentB1,currentR2,currentG2,currentB2,currentR3,currentG3,currentB3);
	matrixID = requestAnimationFrame(animateMatrix);
}
animateMatrix();