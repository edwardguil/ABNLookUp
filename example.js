// Author: Edward Guilfoyler
// Date Created: 2024-01-23
// Desc: Example of a simple search widget with pagination

class ApiHandler {
    constructor() {
        this.data = null;
    }

    async getData(searchTerm) {
        const response = await fetch('https://api.example.com/data/' + searchTerm);
        this.data = await response.json();
    }
}

class Card {
    constructor(title, description) {
        this.title = title;
        this.description = description;
    }

    render() {
        return `<div class="card">
            <h2>${this.title}</h2>
            <p>${this.description}</p>
        </div>`;
    }
}

class Page {
    constructor() {
        this.cards = [];
    }

    addCard(card) {
        this.cards.push(card);
    }

    render() {
        let html = '';
        for (const card of this.cards) {
            html += card.render();
        }
        return html;
    }
}


class PageNavigator {
    constructor() {
        this.pages = [];
        this.currentPage = 0;
        this.resultsContainer = document.getElementById('results');
    }

    addPage(page) {
        this.pages.push(page);
    }

    nextPage() {
        this.currentPage++;
        this.render()
    }

    previousPage() {
        this.currentPage--;
        this.render()
    }

    render() {
        this.resultsContainer.innerHTML = this.pages[this.currentPage].render();
    }

}

// Called via onclick event
async function searchHandler() {
    const cardsPerPage = 10;
    const searchTerm = document.getElementById('searchTerm').value;
    await apiHandler.getData(searchTerm);  

    const page = new Page();
    for (i = 0; i < apiHandler.data.length; i++) {
        const card = new Card(apiHandler.data[i].title, apiHandler.data[i].description);
        page.addCard(card);
        
        if (i % cardsPerPage == 0) {
            pageNavigator.addPage(page);
            page = new Page();
        }
    }

    pageNavigator.render();
}

const pageNavigator = new PageNavigator();
const apiHandler = new ApiHandler();

// Register the onclick event
document.getElementById('searchButton').onclick = searchHandler;
document.getElementById('nextButton').onclick = pageNavigator.nextPage.bind(pageNavigator);
document.getElementById('previousButton').onclick = pageNavigator.previousPage.bind(pageNavigator);

