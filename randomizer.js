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
				  [10, "./10.html"]
				];

const indexFlipped = new Set([1, 2]);
const pinkBackgroundCenterImage = new Set([7, 8, 9]);
const PAGEAMOUNT = pageIds.length;

function firstrandom(currentPageId)
{
	let newPageId = newRandom();

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

	do
	{
		newPageId = newRandom();
	}
	while(currentPageId === newPageId);

	if(indexPairing(currentPageId))
	{
		do
		{
			newPageId = newRandom();
		}
		while(currentPageId === newPageId || indexPairing(newPageId));
	}
	else if(pinkBackgroundCenterImageSet(currentPageId))
	{
		do
		{
			newPageId = newRandom();
		}
		while(currentPageId === newPageId || pinkBackgroundCenterImageSet(newPageId));
	}

	let pageHistory = new Set(pageHistoryArray);

	if(checkable === true)
	{
		pageHistory = new Set(pageHistoryArray);
	}
	else
	{
		pageHistory = null;
	}

	if(pageHistory)
	{
		if(pageHistory.has(newPageId))
		{
			do
			{
				newPageId = newRandom();
			}
			while(currentPageId === newPageId || pageHistory.has(newPageId));

			if(indexPairing(currentPageId))
			{
				do
				{
					newPageId = newRandom();
				}
				while(currentPageId === newPageId || indexPairing(newPageId) || pageHistory.has(newPageId));
			}
			else if(pinkBackgroundCenterImageSet(currentPageId))
			{
				do
				{
					newPageId = newRandom();
				}
				while(currentPageId === newPageId || pinkBackgroundCenterImageSet(newPageId) || pageHistory.has(newPageId));
			}
		}
	}

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

function indexPairing(pageNum)
{
    return indexFlipped.has(pageNum);
}

function pinkBackgroundCenterImageSet(pageNum)
{
	return pinkBackgroundCenterImage.has(pageNum)
}

function newRandom()
{
	return ((Math.floor(Math.random() * PAGEAMOUNT)) + 1);
}