/*
 * Subscribe to the EmbeddedApp onPageLoad event before initializing 
 */
 
ZOHO.embeddedApp.on("PageLoad",function(data)
{
	console.log(data);
	//Custom Bussiness logic goes here
})

/*
 * initializing the widget.
 */
ZOHO.embeddedApp.init();


function createCard() {

}


function search() {
    // Get the search results
    let numResults = 4;
    // For each 'result' create a card

    var results = document.getElementById("results");
    results.innerHTML = "";
    for (var i = 0; i < numResults; i++) {
        var card = createCard();
        card.className = "card";
        results.appendChild(card);
    }
}

