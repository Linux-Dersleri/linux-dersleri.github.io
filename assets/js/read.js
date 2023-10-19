// Function to mark the post as read when the checkbox is clicked
function markAsRead() {
  var checkbox = document.getElementById("readCheckbox");
  var postId = getPageUrl(); // Use the current page URL as the unique identifier for each post

  if (checkbox.checked) {
    // Mark post as read
    localStorage.setItem(postId, "1"); // Store a value (e.g., "1") to indicate it's read
  } else {
    // Mark post as unread
    localStorage.removeItem(postId); // Remove the cache for unread posts
  }
}

// Get the current page URL
function getPageUrl() {
  return window.location.href;
}

// Check the cache on page load and set the checkbox accordingly
document.addEventListener("DOMContentLoaded", function () {
  var checkbox = document.getElementById("readCheckbox");
  var postId = getPageUrl(); // Use the current page URL as the unique identifier for each post

  // Check if the post has been marked as read in the cache
  if (localStorage.getItem(postId)) {
    checkbox.checked = true;
  }
});

// Store the checkbox state in local storage
function saveCheckboxState() {
  var checkbox = document.getElementById("readCheckbox");
  var postId = getPageUrl(); // Use the current page URL as the unique identifier for each post

  if (checkbox.checked) {
    localStorage.setItem(postId, "1");
  } else {
    localStorage.removeItem(postId);
  }
}

// Call saveCheckboxState() when the page is unloaded (before refreshing or leaving the page)
window.addEventListener("beforeunload", function () {
  saveCheckboxState();
});


// Store the reading progress and scroll position in local storage for the current page
function storeReadingProgressAndScrollPosition(progress, scrollPosition) {
  const url = window.location.href;
  const pageData = JSON.parse(localStorage.getItem('pageData')) || {};
  pageData[url] = {
    progress,
    scrollPosition
  };
  localStorage.setItem('pageData', JSON.stringify(pageData));
}

// Get the reading progress for the current page
function getReadingProgress() {
  const url = window.location.href;
  const pageData = JSON.parse(localStorage.getItem('pageData')) || {};
  return pageData[url]?.progress || 0;
}

// Get the scroll position for the current page
function getScrollPosition() {
  const url = window.location.href;
  const pageData = JSON.parse(localStorage.getItem('pageData')) || {};
  return pageData[url]?.scrollPosition || 0;
}

// Calculate and update the reading progress and scroll position based on scroll event
function updateReadingProgressAndScrollPosition() {
  const windowHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const maxScrollTop = documentHeight - windowHeight;

  // Get the position of the element with ID "okundu"
  const okunduElement = document.getElementById('okundu');
  const okunduOffsetTop = okunduElement ? okunduElement.offsetTop : documentHeight;

  // Calculate the scroll position relative to the "okundu" element
  const scrollPosition = Math.min(scrollTop, okunduOffsetTop - windowHeight);

  // Calculate the progress based on the scroll position relative to the "okundu" element
  const progress = Math.round((scrollPosition / (okunduOffsetTop - windowHeight)) * 100);

  // Store the progress and scroll position
  storeReadingProgressAndScrollPosition(progress, scrollPosition);
}



// Restore the reading progress and scroll position when the page is loaded
function restoreReadingProgressAndScrollPosition() {
  const progress = getReadingProgress();
  const scrollPosition = getScrollPosition();
  window.scrollTo(0, scrollPosition);
  renderProgressBar(progress);
}

// Render the progress bar with the given progress value
function renderProgressBar(progress) {
  const progressBar = document.getElementById('progress-bar');
  progressBar.style.width = progress + '%';
}

// Initialize the reading progress and attach scroll event listener
function initReadingProgress() {
  restoreReadingProgressAndScrollPosition();

  window.addEventListener('scroll', function () {
    updateReadingProgressAndScrollPosition();
    const progress = getReadingProgress();
    renderProgressBar(progress);
  });
}

// Call the initialization function when the DOM is ready
document.addEventListener('DOMContentLoaded', function () {
  initReadingProgress();
});