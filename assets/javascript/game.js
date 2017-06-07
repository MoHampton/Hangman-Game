
//Array of Ark Animals
var words =[
	"lion",
	"tiger",
	"elephant",
	"monkey",
	"horse",

];

// Music!!!
var music = new Audio('assets/audio/island_vibes.mp3');
music.play();
music.volume = 0.3;

//Record how many times a letter is being used
var letterCount = ['a','b','c',
				  'd','e','f',
				  'g','h','i',
				  'j','k','l',
				  'm','n','o',
				  'p','q','r',
				  's','t','u',
				  'v','w','x',
				  'y','z'];
//Holds chosen word
var guessWord = "";
//Holds letters in word
var lettersInWord = [];
//Holds number of blanks in word
var numBlanks = 0;
//Holds Blanks and successful guesses
var blanksAndSuccesses =[];
//Holds Wrong guesses
var wrongLetters = [];
//Counters
var winCount = 0;
var loseCount = 0;
var guessesLeft = 6;
var rightGuessCounter = 0;


//FUNCTIONS
//------------------------------
function reset()
{
	//Chooses word 
	guessWord = words[Math.floor(Math.random() * words.length)];
	//Splits words into letters
	lettersInWord = guessWord.split('');
	//Displays blanks
	numBlanks = lettersInWord.length;
	
	//RESET
	//===========================================================
	letterGuessed = 0;
	rightGuessCounter = 0;
	guessesLeft = 6;
	wrongLetters =[];
	blanksAndSuccesses =[];
	letterCount = ['a','b','c',
					  'd','e','f',
					  'g','h','i',
					  'j','k','l',
					  'm','n','o',
					  'p','q','r',
					  's','t','u',
					  'v','w','x',
					  'y','z'];
	test=false;
	startGame();
}
function startGame()
{
	//Chooses word randombly from ark animals
	guessWord = words[Math.floor(Math.random() * words.length)];
	//Splits the choosen word into individual letters
	lettersInWord = guessWord.split('');
	//Get the number of blanks
	numBlanks = lettersInWord.length;
	
	//RESET
	rightGuessCounter = 0;
	guessesLeft = 6;
	wrongLetters =[];
	blanksAndSuccesses =[];
	letterCount = ['a','b','c',
					  'd','e','f',
					  'g','h','i',
					  'j','k','l',
					  'm','n','o',
					  'p','q','r',
					  's','t','u',
					  'v','w','x',
					  'y','z'];

	//Populate blanks
	for(var i = 0; i< numBlanks; i++)
	{
		blanksAndSuccesses.push('_');
		document.getElementById('wordToGuess').innerHTML = blanksAndSuccesses;
	}

	//Changes HTML 
	document.getElementById('wordToGuess').innerHTML = blanksAndSuccesses.join(' ');
	document.getElementById('numGuesses').innerHTML = guessesLeft;
	document.getElementById('winCounter').innerHTML = winCount;
	document.getElementById('lossCounter').innerHTML = loseCount;
	document.getElementById('wrongGuesses').innerHTML = wrongLetters;
	// Testing / Debugging
	console.log(guessWord);
	console.log(lettersInWord);
	console.log(numBlanks);
	console.log(blanksAndSuccesses);
}

function compareLetters(userKey)
{
				console.log('WORKING!');
				//If user key exist in choosen word then perform this function 
				if(guessWord.indexOf(userKey) > -1)
				{
					//Loops depending on the amount of blanks 
					for(var i = 0; i < numBlanks; i++)
					{
						//Fills in right index with user key
						if(lettersInWord[i] === userKey)
						{
							rightGuessCounter++;
							blanksAndSuccesses[i] = userKey;
							document.getElementById('wordToGuess').innerHTML = blanksAndSuccesses.join(' ');
						}	
					}
					//Test / Debug
					console.log(blanksAndSuccesses);
				}
				//Wrong Keys
				else
				{
					wrongLetters.push(userKey);
					guessesLeft--;
					//Changes HTML
					document.getElementById('numGuesses').innerHTML = guessesLeft;
					document.getElementById('wrongGuesses').innerHTML = wrongLetters;
					//Test / Debug
					console.log('Wrong Letters = ' + wrongLetters);
					console.log('Guesses left are ' + guessesLeft);
				}
			
			
		
}
function winLose()
{
	// When number blanks if filled with right words then you win
	if(rightGuessCounter === numBlanks)
	{
		//Counts Wins 
		winCount++;
		//Changes HTML
		document.getElementById('winCounter').innerHTML = winCount;
		var correct = new Audio('assets/audio/TaDa.wav');
		correct.play();
		//setTimeout(function(){ 
		//	alert() 
		//}, 1000);//
		alert('You Got It!');
		reset();
	}
	// When number of Guesses reaches 0 then You lose
	else if(guessesLeft === 0)
	{
		//Counts losses
		loseCount++;
		//Changes HTML
		document.getElementById('lossCounter').innerHTML = loseCount;
		var incorrect = new Audio('assets/audio/thunder.wav');
		incorrect.play();
		alert('The Animal Ran Away!');
		reset();
	}
}

//MAIN PROCCESS
//-------------------------------------------	
//Initiates the Code
startGame();

document.onkeyup = function(event)
{
	var test = true;
	var letterGuessed = event.key;
	for(var i = 0; i < letterCount.length; i++)
	{	
		if(letterGuessed === letterCount[i] && test === true)
		{
			var spliceDword = letterCount.splice(i,1);
			//Test / Debug
			console.log('Double word is = ' + letterCount[i])
			console.log('Spliced Word is = ' + spliceDword);

			compareLetters(letterGuessed);
			setTimeout(winLose, 1000);
		}
	}		
		
}



