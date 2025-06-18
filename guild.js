document.addEventListener("DOMContentLoaded", function () {
    const searchBar = document.getElementById("searchBar");
    const guildCards = document.querySelectorAll(".guild-card");
  
    searchBar.addEventListener("input", function () {
      const query = searchBar.value.toLowerCase();
  
      guildCards.forEach(card => {
        const name = card.querySelector("h2").textContent.toLowerCase();
        const isMatch = name.includes(query) || isCloseMatch(query, name);
  
        card.style.display = isMatch ? "block" : "none";
      });
    });
  
    // Simple fuzzy match using Levenshtein Distance
    function isCloseMatch(a, b) {
      return levenshtein(a, b) <= 2; 
    } // Adjust the threshold as needed
    // Levenshtein Distance function
  
    function levenshtein(a, b) { // Calculate the Levenshtein distance between two strings
      const matrix = [];
      
      // Create a matrix to hold distances
  
      for (let i = 0; i <= b.length; i++) { // Initialize the first column
        matrix[i] = [i]; // Initialize the first row
      }
      for (let j = 0; j <= a.length; j++) { // Initialize the first row
        matrix[0][j] = j; // Initialize the first column 
      }
  
      for (let i = 1; i <= b.length; i++) { // Iterate through each character of the second string
        for (let j = 1; j <= a.length; j++) { // Iterate through each character of the first string
          if (b.charAt(i - 1) === a.charAt(j - 1)) { // If characters match, take the diagonal value
            matrix[i][j] = matrix[i - 1][j - 1]; // No cost for matching characters
          } else { // If characters do not match, take the minimum of the three possible operations
            // (insert, delete, substitute) and add 1 for the cost of the operation
            matrix[i][j] = Math.min( // Calculate the minimum distance
              matrix[i - 1][j - 1] + 1, // substitution
              matrix[i][j - 1] + 1, // insertion
              matrix[i - 1][j] + 1 // deletion
            ); // Add 1 for the cost of the operation
          }
        }
      }
  
      return matrix[b.length][a.length]; // Return the distance from the bottom-right corner of the matrix
    }
  });
// This code snippet is designed to enhance a guild search feature on a webpage.
// It listens for input in a search bar and filters guild cards based on the input.