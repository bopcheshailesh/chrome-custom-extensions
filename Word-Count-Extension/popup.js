function countOccurrences(word) {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTab = tabs[0];
      const code = `
        const bodyText = document.body.innerText.toLowerCase();
        const regex = new RegExp('\\b${word}\\b', 'gi');
        (bodyText.match(regex) || []).length;
      `;
  
      chrome.tabs.executeScript(activeTab.id, { code }, (result) => {
        const count = result[0];
        document.getElementById('result').textContent = `Occurrences of "${word}": ${count}`;
      });
    });
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    const countButton = document.getElementById('countButton');
    countButton.addEventListener('click', () => {
      const searchWord = document.getElementById('searchWord').value.toLowerCase().trim();
      if (searchWord) {
        countOccurrences(searchWord);
      } else {
        document.getElementById('result').textContent = 'Please enter a word.';
      }
    });
  });
  