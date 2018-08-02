'use strict';

/* eslint-env browser */

(() => {
    function populateList(results) {
        console.log(results); // eslint-disable-line no-console
        // Fetch user list element from DOM first
        let userList = document.getElementById('z-user-list');

        // Then populate list with content from results array.
        for (let userIndex = 0; userIndex < results.length; userIndex++) {
            let user = results[userIndex];

            let photo = user.picture.thumbnail;
            let firstName = capitalize(user.name.first);
            let lastName = capitalize(user.name.last);
            let city = capitalize(user.location.city);
            let state = capitalize(user.location.state);
            let email = user.email;

            userList.insertAdjacentHTML('beforeend', `
                <li class="user">
                    <img class="user-photo" src="${ photo }" alt="Photo of ${ firstName } ${ lastName }">
                    <div class="user-name">${ firstName } ${ lastName }</div>
                    <div class="user-location">${ city }, ${ state }</div>
                    <div class="user-email">${ email }</div>
                </li>
            `);
        }
    }

    function capitalize(string) {
        let words = string.split(' ');
        let capitalWords = words.map(word => word[0].toUpperCase() + word.slice(1));
        return capitalWords.join(' ');
    }

    function init() {
        fetch('https://randomuser.me/api/?results=5')
            .then(res => res.json())
            .then(json => populateList(json.results));
    }

    document.addEventListener('DOMContentLoaded', init);
})();
