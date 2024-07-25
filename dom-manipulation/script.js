document.addEventListener("DOMContentLoaded", function() {
  const quoteDisplay = document.getElementById('quoteDisplay');
  const addQuoteForm = document.getElementById('addQuoteForm');
  const newQuoteText = document.getElementById('newQuoteText');
  const newQuoteCategory = document.getElementById('newQuoteCategory');
  const overlay = document.getElementById('overlay');
  const categorySelect = document.getElementById('categorySelect');
  const importFileInput = document.getElementById('importFile');

  let quotes = JSON.parse(localStorage.getItem('quotes')) || [
    { quote: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivation" },
    { quote: "Do not watch the clock. Do what it does. Keep going.", category: "Motivation" },
    { quote: "Believe you can and you're halfway there.", category: "Motivation" },
    { quote: "Act as if what you do makes a difference. It does.", category: "Inspiration" },
    { quote: "Success is not how high you have climbed, but how you make a positive difference to the world.", category: "Success" },
    { quote: "Hardships often prepare ordinary people for an extraordinary destiny.", category: "Success" },
    { quote: "Don't let yesterday take up too much of today.", category: "Inspiration" },
  ];

  let lastIndex = -1;

  function showRandomQuote() {
    const selectedCategory = categorySelect.value;
    const filteredQuotes = selectedCategory === 'all' ? quotes : quotes.filter(quote => quote.category === selectedCategory);

    if (filteredQuotes.length > 0) {
      let randomIndex;
      do {
        randomIndex = Math.floor(Math.random() * filteredQuotes.length);
      } while (randomIndex === lastIndex);

      lastIndex = randomIndex;
      const quoteItem = filteredQuotes[randomIndex];
      quoteDisplay.innerHTML = `<i class='fas fa-quote-left' style='font-size:48px;'></i> ${quoteItem.quote} `;
      sessionStorage.setItem('lastQuote', JSON.stringify(quoteItem));
    } else {
      quoteDisplay.innerHTML = "No quotes available for this category.";
    }
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

    // Add new category to the select if it doesn't already exist
    if (![...categorySelect.options].some(option => option.value === newQuote.category)) {
      const newOption = document.createElement('option');
      newOption.value = newQuote.category;
      newOption.textContent = newQuote.category;
      categorySelect.appendChild(newOption);
    }

    newQuoteText.value = '';
    newQuoteCategory.value = '';
    alert('New quote added successfully!');
    closeForm();
  }

  function saveQuotes() {
    localStorage.setItem('quotes', JSON.stringify(quotes));
  }

  function exportToJsonFile() {
    const dataStr = JSON.stringify(quotes);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const exportFileDefaultName = 'quotes.json';

    let linkElement = document.createElement('a');
    linkElement.setAttribute('href', url);
    linkElement.setAttribute('download', exportFileDefaultName);
    document.body.appendChild(linkElement);
    linkElement.click();
    document.body.removeChild(linkElement);
  }

  function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function(event) {
      const importedQuotes = JSON.parse(event.target.result);
      quotes.push(...importedQuotes);
      saveQuotes();
      alert('Quotes imported successfully!');
    };
    fileReader.readAsText(event.target.files[0]);
  }

  window.showRandomQuote = showRandomQuote;
  window.displayForm = displayForm;
  window.closeForm = closeForm;
  window.addQuote = addQuote;
  window.exportToJsonFile = exportToJsonFile;
  window.importFromJsonFile = importFromJsonFile;

  // Load last quote from session storage
  const lastQuote = JSON.parse(sessionStorage.getItem('lastQuote'));
  if (lastQuote) {
    quoteDisplay.innerHTML = `<i class='fas fa-quote-left' style='font-size:48px;'></i> ${lastQuote.quote} `;
  }

  document.getElementById('add-new-quote').addEventListener('click', displayForm);
  document.getElementById('closeForm').addEventListener('click', closeForm);
  addQuoteForm.addEventListener('submit', addQuote);
  document.getElementById('ShowNewQuote').addEventListener('click', showRandomQuote);
});
