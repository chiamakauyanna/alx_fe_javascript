# Dynamic Quote Generator

This application allows users to manage an array of quote objects, where each quote has text and a category.
It includes features to display a random quote, add new quotes, import/export quotes, filter quotes by category, and synchronize quotes with a server.

## Features

Display a random quote.
Add new quotes.
Import quotes from a JSON file.
Export quotes to a JSON file.
Filter quotes by category.
Synchronize quotes with a server.
Periodically sync quotes with the server.


![Quote generator screenshot](https://github.com/user-attachments/assets/8598941b-7079-4e63-ace1-20afef6fb352)



## Usage

**Display a Random Quote:** Click the "Show Random Quote" button to display a random quote from the selected category.

**Add a New Quote:** Click the "Add New Quote" button to open the form.
Enter the quote text and category.

**Submit the form to add the quote** Filter Quotes by Category: Select a category from the dropdown to filter quotes.

**Import Quotes:** Click the "Import" button and select a JSON file containing quotes to import.

**Export Quotes:** Click the "Export" button to download a JSON file of the current quotes.

**Sync Quotes with Server:** Click the "Sync Quotes" button to synchronize quotes with the server.

**Periodic Sync:** The application will automatically sync quotes with the server at regular intervals (default is 1 minute).

### Server Interaction
**Fetching Quotes:** Quotes are fetched from a server endpoint (placeholder URL used in the script).

**Posting Quotes:** New quotes are posted to a server endpoint (placeholder URL used in the script).

Update the server URLs in the fetchQuotesFromServer and postQuoteToServer functions with actual endpoints as needed.

### Note
This application uses localStorage to persist quotes and the last selected category filter.
Ensure the application has internet access to sync quotes with the server.
