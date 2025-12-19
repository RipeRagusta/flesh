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
				  [8, "./8.html"],
				  [9, "./9.html"],
				  [10, "./10.html"],
				  [11, "./11.html"],
				  [12, "./12.html"]
				];

const indexFlipped = new Set([1, 2]);
const pinkBackgroundCenterImage = new Set([7, 8, 9, 11]);
const rare = new Set([3, 10, 9]);
const PAGEAMOUNT = pageIds.length;

let invalidPairings = [indexFlipped, pinkBackgroundCenterImage];

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