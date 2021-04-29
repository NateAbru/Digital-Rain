//Matrix Rain Effect
const canvas = document.getElementById("matrix");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext("2d");

ctx.scale(1, 1);

const trains = [];
let trainLen1 = canvas.height / 15;
let trainLen2 = (canvas.height / 15) * .70;
let trainLen3 = (canvas.height / 15) * .80;

let currentSize = 0;
let openX = [];

function setX()
{
	let flag = true;
	let count = 0;
	while(flag)
	{
		let xInfo = {
			available : true,
			location : count,
		};
		openX.push(xInfo);
		count += 15;
		if(count > canvas.width)
		{
			flag = false;
		}
	}
}
setX();
let numTrains = openX.length;
function setTrains(len)
{
	// setX();
	let trainArray = [];
	// let randX = Math.floor(Math.random() * canvas.width);
	let randX;
	let randY = Math.floor(Math.random() * canvas.height);
	let randomSpeed = Math.floor((Math.random() * 3) + 3);
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

	for(let i = 0; i < len; i++)
	{
		let trainObj = {
			pos: {x: randX, y: randY},
			letter: randomLetter(),
			index: i,
			increment: 0,
			speed: randomSpeed,
			size: randomSize,
			randomFadeChosen : false,
		}
		trainArray.push(trainObj);
		randY -= 15;
	}
	return trainArray;
}

for(let i = 0; i < numTrains; i++)
{
	let randNum = Math.floor(Math.random() * 3 + 1);
	if(randNum == 1)
	{
		trains.push(setTrains(trainLen1));
		currentSize++;
	}
	if(randNum == 2)
	{
		trains.push(setTrains(trainLen2));
		currentSize++;
	}
	if(randNum == 3)
	{
		trains.push(setTrains(trainLen3));
		currentSize++;
	}
}
let trainLen;
//go through the train array which is filled with arrays(the representing trains) of letter objects to draw them on canvas
function drawTrains(array)
{
 ctx.fillStyle = "rgb(0,0,0)";
		ctx.fillRect(0,0,canvas.width, canvas.height);

	array.forEach((trainObj, trainNum) =>{
		trainLen = trainObj.length;

		trainObj.forEach((letterObj, letIndex) =>{
			let opacValue;
			//change opacity of letter depending on how far from the front of the train it is
			if(letterObj.index >= (trainLen - Math.floor(trainLen / 10)))
			{
				opacValue = .05;
			}
			else if(letterObj.index < (trainLen - Math.floor(trainLen / 10)) && letterObj.index >= (trainLen - (Math.floor(trainLen / 10)) * 2))
			{
				opacValue = .1;
			}
			else if(letterObj.index < (trainLen - (Math.floor(trainLen / 10)) * 2) && letterObj.index >= (trainLen - (Math.floor(trainLen / 10)) * 3))
			{
				opacValue = .2;
			}
			else if(letterObj.index < (trainLen - (Math.floor(trainLen / 10)) * 3) && letterObj.index >= (trainLen - (Math.floor(trainLen / 10)) * 4))
			{
				opacValue = .3;
			}
			else if(letterObj.index < (trainLen - (Math.floor(trainLen / 10)) * 4) && letterObj.index >= (trainLen - (Math.floor(trainLen / 10)) * 5))
			{
				opacValue = .4;
			}
			else if(letterObj.index < (trainLen - (Math.floor(trainLen / 10)) * 5) && letterObj.index >= (trainLen - (Math.floor(trainLen / 10)) * 6))
			{
				opacValue = .5;
			}
			else if(letterObj.index < (trainLen - (Math.floor(trainLen / 10)) * 6) && letterObj.index >= (trainLen - (Math.floor(trainLen / 10)) * 7))
			{
				opacValue = .6;
			}
			else if(letterObj.index < (trainLen - (Math.floor(trainLen / 10)) * 7) && letterObj.index >= (trainLen - (Math.floor(trainLen / 10)) * 8))
			{
				opacValue = .7;
			}
			else if(letterObj.index < (trainLen - (Math.floor(trainLen / 10)) * 8) && letterObj.index >= (trainLen - (Math.floor(trainLen / 10)) * 9))
			{
				opacValue = .8;
			}
			else
			{
				opacValue = .9;
			}
			
			//set the first letter in the train of letters to color white
			if(letterObj.index == 0)
			{
				//setting the size of the character
				if(letterObj.size == 1 || letterObj.size == 2 || letterObj.size == 3)
				{
					ctx.fillStyle = "rgba(200,255,200, 1)";
					ctx.font = "15px Arial";
					ctx.fillText(letterObj.letter, letterObj.pos.x, letterObj.pos.y);
				}
				else if(letterObj.size == 4 || letterObj.size == 5)
				{
					ctx.fillStyle = "rgba(200,255,200, 1)";
					ctx.font = "12px Arial";
					ctx.fillText(letterObj.letter, letterObj.pos.x, letterObj.pos.y);
				}
				else if(letterObj.size == 6)
				{
					ctx.fillStyle = "rgba(200,255,200, 1)";
					ctx.font = "9px Arial";
					ctx.fillText(letterObj.letter, letterObj.pos.x, letterObj.pos.y);
				}
			}
			else if(letterObj.index == 1)
			{
				//setting the size of the character
				if(letterObj.size == 1  || letterObj.size == 2 || letterObj.size == 3)
				{
					ctx.fillStyle = "rgba(150,220,150, .8)";
					ctx.font = "15px Arial";
					ctx.fillText(letterObj.letter, letterObj.pos.x, letterObj.pos.y);
				}
				else if(letterObj.size == 4 || letterObj.size == 5)
				{
					ctx.fillStyle = "rgba(150,220,150, .8)";
					ctx.font = "12px Arial";
					ctx.fillText(letterObj.letter, letterObj.pos.x, letterObj.pos.y);
				}
				else if(letterObj.size == 6)
				{
					ctx.fillStyle = "rgba(150,220,150, .8)";
					ctx.font = "9px Arial";
					ctx.fillText(letterObj.letter, letterObj.pos.x, letterObj.pos.y);
				}
			}

			else
			{
				//setting the size of the character
				if(letterObj.size == 1  || letterObj.size == 2 || letterObj.size == 3)
				{
					ctx.fillStyle = "rgba(0,190,0, " + opacValue +")";
					ctx.font = "15px Arial";
					ctx.fillText(letterObj.letter, letterObj.pos.x, letterObj.pos.y);
				}
				else if(letterObj.size == 4 || letterObj.size == 5)
				{
					ctx.fillStyle = "rgba(0,190,0, " + opacValue +")";
					ctx.font = "12px Arial";
					ctx.fillText(letterObj.letter, letterObj.pos.x, letterObj.pos.y);
				}
				else if(letterObj.size == 6)
				{
					ctx.fillStyle = "rgba(0,190,0, " + opacValue +")";
					ctx.font = "9px Arial";
					ctx.fillText(letterObj.letter, letterObj.pos.x, letterObj.pos.y);
				}
			}	
		});
	});
}
let numLetters = 1000;

function randomLetter()
{
	const alpha = "ABCDEFGHIKLMNOPQRSTVXYZ";
	const num = "0123456789";
	const rus = "ちこそしいはきくにまのりもみらせたすとかなひてさんつ";
	const jap = "abcdefghijklmnopqrstuvwxyz";
	const sArray = [alpha, num, rus, jap];
	const joinedArray = sArray.join('');
	let randNum = Math.floor(Math.random() * joinedArray.length);
	return joinedArray[randNum];
}

function matrixRain()
{
	for(let i = 0; i < currentSize; i++)
	{
		let rFade = Math.floor((Math.random() * 30) + 1);
		for(let j = trains[i].length - 1; j >= 0; j--)
		{

			ctx.fillStyle = "rgb(0,0,0)";
			ctx.fillRect(trains[i][j].pos.x, trains[i][j].pos.y,15, 15);
			
			
			trains[i][j].increment++;
			if(trains[i][j].increment >= 60) trains[i][j].increment = 0;

			//first letter update conditions
			if(trains[i][j].increment % 6 == 0 && trains[i][j].index == 0 && trains[i][j].speed == 3)
			{
				trains[i][j].letter = randomLetter();
				trains[i][j].pos.y += 15;
				
			}
			else if(trains[i][j].increment % 4 == 0 && trains[i][j].index == 0 && trains[i][j].speed == 4)
			{
				trains[i][j].letter = randomLetter();
				trains[i][j].pos.y += 15;
			}
			else if(trains[i][j].increment % 2 == 0 && trains[i][j].index == 0 && trains[i][j].speed == 5)
			{
				trains[i][j].letter = randomLetter();
				trains[i][j].pos.y += 15;
				
			}
			
			//random num to compare with arbitary value to assign a random letter change to a letter in the stream. Arbitary Number will be 7
			let randomChange = Math.floor(Math.random() * 40 + 1);

			//assigning neighbor letter closer to head to each trailing letter for mimic letter staying in place on screen as stream goes down
			if(trains[i][j].increment % 6 == 0 && trains[i][j].index != 0 &&  trains[i][j].speed == 3)
			{
				if(randomChange == 7)
				{
					trains[i][j].letter = randomLetter();
				}
				else
				{
					trains[i][j].letter = trains[i][j - 1].letter;
				}
				trains[i][j].pos.y += 15;
				
			}
			else if(trains[i][j].increment % 4 == 0 && trains[i][j].index != 0 && trains[i][j].speed == 4)
			{
				if(randomChange == 7)
				{
					trains[i][j].letter = randomLetter();
				}
				else
				{
					trains[i][j].letter = trains[i][j - 1].letter;
				}
				trains[i][j].pos.y += 15;
			}
			else if(trains[i][j].increment % 2 == 0 && trains[i][j].index != 0 && trains[i][j].speed == 5)
			{
				if(randomChange == 7)
				{
					trains[i][j].letter = randomLetter();
				}
				else
				{
					trains[i][j].letter = trains[i][j - 1].letter;
				}
				trains[i][j].pos.y += 15;
			}

			if(trains[i][j].pos.y > canvas.height) 
			{
				trains[i][j].pos.y = 0;
			}
		}
	}
}

drawTrains(trains);

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
		matrixRain();
	}
	drawTrains(trains);

	requestAnimationFrame(animateMatrix);
}

animateMatrix();