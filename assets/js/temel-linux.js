// Function to mark the post as read when the checkbox is clicked
  function markAsRead(postUrl) {
    var checkbox = document.getElementById("readCheckbox_" + postUrl);

    if (checkbox.checked) {
      // Mark post as read
      localStorage.setItem(postUrl, "1"); // Store a value (e.g., "1") to indicate it's read
    } else {
      // Mark post as unread
      localStorage.removeItem(postUrl); // Remove the cache for unread posts
    }
  }

  // Check if the post is marked as read in the cache
  function isPostRead(postUrl) {
    return localStorage.getItem(postUrl) === "1";
  }

  // Get the reading progress for a specific URL
  function getReadingProgressForUrl(url) {
    const pageData = JSON.parse(localStorage.getItem('pageData')) || {};
    return pageData[url]?.progress || 0;
  }

  // Get the read status text for a specific URL
  function getReadStatusForUrl(url) {
    const readingProgress = getReadingProgressForUrl(url);
    return readingProgress === 100 ? "Read" : "Unread";
  }

// Update the related div box based on the cached reading progress and checkbox state
function updateRelatedDivBox() {
  const posts = document.querySelectorAll('.col-md-6');

  posts.forEach(function (post) {
    const postUrl = post.querySelector('.stretched-link').getAttribute('href');
    const progress = getReadingProgressForUrl(postUrl);
    const progressBar = post.querySelector('.progress-bar');
    const readStatus = post.querySelector('.readStatus');

    if (progressBar) {
      progressBar.style.width = `${progress}%`;
      progressBar.textContent = `${progress}%`; // Optional: Show progress percentage
    }

    if (readStatus) {
      if (isPostRead(postUrl)) {
        readStatus.innerHTML = 'Okundu: <svg fill="#0084ff" width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" stroke="#0084ff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M19.965 8.521C19.988 8.347 20 8.173 20 8c0-2.379-2.143-4.288-4.521-3.965C14.786 2.802 13.466 2 12 2s-2.786.802-3.479 2.035C6.138 3.712 4 5.621 4 8c0 .173.012.347.035.521C2.802 9.215 2 10.535 2 12s.802 2.785 2.035 3.479A3.976 3.976 0 0 0 4 16c0 2.379 2.138 4.283 4.521 3.965C9.214 21.198 10.534 22 12 22s2.786-.802 3.479-2.035C17.857 20.283 20 18.379 20 16c0-.173-.012-.347-.035-.521C21.198 14.785 22 13.465 22 12s-.802-2.785-2.035-3.479zm-9.01 7.895-3.667-3.714 1.424-1.404 2.257 2.286 4.327-4.294 1.408 1.42-5.749 5.706z"></path></g></svg>';
      } else {
        // Hide the readStatus element if the post is unread
        readStatus.style.display = "none";
      }
    }
  });
}

  // Call the function to update the related div box when the DOM is ready
  document.addEventListener('DOMContentLoaded', function () {
    updateRelatedDivBox();

    window.addEventListener('scroll', function () {
      updateReadingProgressAndScrollPosition();
      const progress = getReadingProgress();
      renderProgressBar(progress);
      updateRelatedDivBox(); // Update the related div box after scrolling
    });
  });