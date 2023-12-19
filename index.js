document.getElementById('submit').addEventListener('click', function (e) {
    e.preventDefault();
    var siteName = document.getElementById('siteName').value.trim();
    var siteURL = document.getElementById('siteURL').value.trim();

    if (!validateForm(siteName, siteURL)) {
        return false;
    }

    var bookmark = {
        name: siteName,
        url: siteURL.startsWith('http://') || siteURL.startsWith('https://') ? siteURL : `http://${siteURL}`
    };

    var bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
    bookmarks.push(bookmark);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    document.getElementById('siteName').value = '';
    document.getElementById('siteURL').value = '';
    fetchBookmarks();
});

function fetchBookmarks() {
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
    var bookmarksList = document.getElementById('bookmarksList');

    bookmarksList.innerHTML = '';
    bookmarks.forEach(function (bookmark, index) {
        bookmarksList.innerHTML += `
            <div class="bookmark-item">
                <span>${index + 1}</span>
                <span>${bookmark.name}</span>
                <button class="action-button visit-button" onclick="window.open('${bookmark.url}', '_blank')">Visit</button>
                <button class="action-button delete-button" onclick="deleteBookmark(${index})">Delete</button>
            </div>
        `;
    });
}

function deleteBookmark(index) {
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    bookmarks.splice(index, 1);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    fetchBookmarks();
}

function validateForm(siteName, siteURL) {
    if (!siteName || !siteURL) {
        alert('Please fill in both fields');
        return false;
    }

    var regex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
    if (!regex.test(siteURL)) {
        alert('Please enter a valid URL');
        return false;
    }

    return true;
}

window.onload = fetchBookmarks;
