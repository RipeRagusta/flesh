let pageArray;
let checkable;
const pageIds = [
				  [1, "./index.html"], 
				  [2, "./2.html"],
				  [3, "./3.html"],
				  [4, "./4.html"],
				  [5, "./5.html"],
				  [6, "./6.html"],
				  [7, "./7.html"],
				  [8, "./8.html"]
				];

const pinkBackground = new Set([1, 8, 7]);
const whiteBackground = new Set([6, 3, 5]);
const yellowBackground = new Set([2]);
const blackBackground = new Set([4]);

const rare = new Set([]);
const PAGEAMOUNT = pageIds.length;

let invalidPairings = [pinkBackground, whiteBackground, yellowBackground, blackBackground];

function firstrandom(currentPageId)
{
	if(checkStorage() === true)
	{
		if(sessionStorage.getItem("lastTwoPages") === null)
		{
			pageHistoryArray = new Array();
		}
		else
		{
			pageHistoryArray = JSON.parse(sessionStorage.getItem("lastTwoPages"));
		}
	}
	else
	{
		pageHistoryArray = new Array();
	}

	switch(pageHistoryArray.length)
	{
		case 0:
			pageHistoryArray[0] = currentPageId;
			checkable = false;
			break;

		case 1:
			if(currentPageId != pageHistoryArray[0])
			{
				pageHistoryArray[1] = currentPageId;
				checkable = true;
			}
			else
			{
				checkable = false;
			}

			break;
		
		case 2:
			if(currentPageId != pageHistoryArray[1])
			{
				pageHistoryArray[0] = pageHistoryArray[1];
				pageHistoryArray[1] = currentPageId;
			}

			checkable = true;
			break;
		
		default:
			checkable = false;
			console.log("wrong page array length");
			break;
	}

	if(checkStorage() === true)
	{
		sessionStorage.setItem("lastTwoPages", JSON.stringify(pageHistoryArray));
	}

	let newPageId;
	let valid;

	do
	{
		newPageId = newRandom();
		valid = true;

		for(let i = 0; i < invalidPairings.length; i++)
		{
			if(invalidPairings[i].has(newPageId) && invalidPairings[i].has(currentPageId))
			{
				valid = false;
			}

			if(checkable === true)
			{
				if(pageHistoryArray[i] === newPageId)
				{
					valid = false;
				}
			}

			if(currentPageId === newPageId)
			{
				valid = false;
			}

			if(rare.has(newPageId))
			{
				let roll = getRandMinMax(1, 10000);
				if(roll != 1)
				{
					valid = false;
				}
			}
		}
	}
	while(!valid);

	document.getElementById("reseter").href = pageIds[newPageId - 1][1];
}

function checkStorage()
{
    var test = "test";
    
    try 
    {
        sessionStorage.setItem(test, test);
        sessionStorage.removeItem(test);
        return true;
    } 
    catch(e)
    {
        return false;
    }
}

function newRandom()
{
	return ((Math.floor(Math.random() * PAGEAMOUNT)) + 1);
}

function getRandMinMax(min, max)
{
    return (Math.floor(Math.random() * (max - min + 1)) + min);
}