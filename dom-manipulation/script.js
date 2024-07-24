document.addEventListener("DOMContentLoaded", function() {
  const quoteDisplay = document.getElementById('quoteDisplay');
  const newQuoteBtn = document.getElementById('newQuote');
  const addQuoteForm = document.getElementById('addQuoteForm');
  const quoteText = document.getElementById('quoteText');
  const quoteCategory = document.getElementById('quoteCategory');
  const addNewQuoteBtn = document.getElementById('add-new-quote');
  const closeFormBtn = document.getElementById('closeForm');
  const overlay = document.getElementById('overlay');
  const categorySelect = document.getElementById('categorySelect');


  const quotes = [
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
      quote: quoteText.value,
      category: quoteCategory.value,
    };

    quotes.push(newQuote);

    // Add new category to the select if it doesn't already exist
    if (![...categorySelect.options].some(option => option.value === newQuote.category)) {
      const newOption = document.createElement('option');
      newOption.value = newQuote.category;
      newOption.textContent = newQuote.category;
      categorySelect.appendChild(newOption);
    }

    quoteText.value = '';
    quoteCategory.value = '';
    alert('New quote added successfully!');
  }


  newQuoteBtn.addEventListener('click', showRandomQuote);
  addNewQuoteBtn.addEventListener('click', displayForm);
  closeFormBtn.addEventListener('click', closeForm);
  addQuoteForm.addEventListener('submit', addQuote);
});
