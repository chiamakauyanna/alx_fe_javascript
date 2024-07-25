document.addEventListener("DOMContentLoaded", function() {
  const quoteDisplay = document.getElementById('quoteDisplay');
  const addQuoteForm = document.getElementById('addQuoteForm');
  const newQuoteText = document.getElementById('newQuoteText');
  const newQuoteCategory = document.getElementById('newQuoteCategory');
  const overlay = document.getElementById('overlay');
  const categoryFilter = document.getElementById('categoryFilter');
  const importFileInput = document.getElementById('importFile');
  const showNewQuoteButton = document.getElementById('ShowNewQuote');

  let quotes = JSON.parse(localStorage.getItem('quotes')) || [
    { quote: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivation" },
    { quote: "Do not watch the clock. Do what it does. Keep going.", category: "Motivation" },
    { quote: "Believe you can and you're halfway there.", category: "Motivation" },
    { quote: "Act as if what you do makes a difference. It does.", category: "Inspiration" },
    { quote: "Success is not how high you have climbed, but how you make a positive difference to the world.", category: "Success" },
    { quote: "Hardships often prepare ordinary people for an extraordinary destiny.", category: "Success" },
    { quote: "Don't let yesterday take up too much of today.", category: "Inspiration" },
  ];

  let lastQuote = null;

  function populateCategories() {
    const categories = [...new Set(quotes.map(quote => quote.category))];
    categoryFilter.innerHTML = `<option value="all">All Categories</option>` +
      categories.map(cat => `<option value="${cat}">${cat}</option>`).join('');
    
    // Restore the last selected filter
    const savedFilter = localStorage.getItem('categoryFilter');
    if (savedFilter) {
      categoryFilter.value = savedFilter;
      filterQuotes();
    }
  }

  function filterQuotes() {
    const selectedCategory = categoryFilter.value;
    const filteredQuotes = selectedCategory === 'all' ? quotes : quotes.filter(quote => quote.category === selectedCategory);

    // Save the selected filter to local storage
    localStorage.setItem('categoryFilter', selectedCategory);

    // Show a random quote from the filtered list
    showRandomQuote(filteredQuotes);
  }

  function showRandomQuote(filteredQuotes) {
    if (filteredQuotes.length === 0) {
      quoteDisplay.innerHTML = "No quotes available for this category.";
      lastQuote = null;
      return;
    }

    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * filteredQuotes.length);
    } while (filteredQuotes[randomIndex] === lastQuote);

    lastQuote = filteredQuotes[randomIndex];
    quoteDisplay.innerHTML = `<i class='fas fa-quote-left' style='font-size:48px;'></i> ${lastQuote.quote} `;
  }

  function displayForm() {
    overlay.style.display = 'flex'; // Show overlay
  }

  function closeForm() {
    overlay.style.display = 'none'; // Hide overlay
  }

  function addQuote(event) {
    event.preventDefault();
    const newQuote = {
      quote: newQuoteText.value,
      category: newQuoteCategory.value,
    };

    quotes.push(newQuote);
    saveQuotes();

    // Add new category to the filter if it doesn't already exist
    if (![...categoryFilter.options].some(option => option.value === newQuote.category)) {
      const newOption = document.createElement('option');
      newOption.value = newQuote.category;
      newOption.textContent = newQuote.category;
      categoryFilter.appendChild(newOption);
    }

    newQuoteText.value = '';
    newQuoteCategory.value = '';
    alert('New quote added successfully!');
    closeForm();

    // Re-populate the categories and apply the filter
    populateCategories();
    filterQuotes();
  }

  function saveQuotes() {
    localStorage.setItem('quotes', JSON.stringify(quotes));
  }

  function exportToJsonFile() {
    const dataStr = JSON.stringify(quotes);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);

    const exportFileDefaultName = 'quotes.json';

    let linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  }

  function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function(event) {
      const importedQuotes = JSON.parse(event.target.result);
      quotes = [...quotes, ...importedQuotes];
      saveQuotes();
      populateCategories();
      filterQuotes();
      alert('Quotes imported successfully!');
    };
    fileReader.readAsText(event.target.files[0]);
  }

  // Initialize the categories and filter
  populateCategories();

  // Attach event listeners
  showNewQuoteButton.addEventListener('click', function() {
    const selectedCategory = categoryFilter.value;
    const filteredQuotes = selectedCategory === 'all' ? quotes : quotes.filter(quote => quote.category === selectedCategory);
    showRandomQuote(filteredQuotes);
  });

  window.displayForm = displayForm;
  window.closeForm = closeForm;
  window.addQuote = addQuote;
  window.exportToJsonFile = exportToJsonFile;
  window.importFromJsonFile = importFromJsonFile;
});
