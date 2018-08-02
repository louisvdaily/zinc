'use strict';

/* eslint-env browser */

(() => {
    function populateList(results) {
        console.log(results); // eslint-disable-line no-console

        let template = `
        <li class="user">
            <img class="user-photo" src="{{ photo }}" alt="Photo of {{ firstName }} {{ lastName }}">
            <div class="user-name">{{ firstName }} {{ lastName }}</div>
            <div class="user-location">{{ city }}, {{ state }}</div>
            <div class="user-email">{{ email }}</div>
        </li>
        `

        // Fetch user list element from DOM first
        let userList = document.getElementById('z-user-list');

        for (let userIndex = 0; userIndex < results.length; userIndex++) {
            let user = results[userIndex];
            let userData = {
                photo: user.picture.thumbnail,
                firstName: capitalize(user.name.first),
                lastName: capitalize(user.name.last),
                city: capitalize(user.location.city),
                state: capitalize(user.location.state),
                email: user.email
            }
            userList.insertAdjacentHTML('beforeend', renderTemplate(template, userData));
        }
    }

    function capitalize(string) {
        let words = string.split(' ');
        let capitalWords = words.map(word => word[0].toUpperCase() + word.slice(1));
        return capitalWords.join(' ');
    }

    function renderTemplate(templateString, object) {
        return templateString.replace(/{{\s*(\w+)\s*}}/g, (match, captured) => object[captured]);
    }

    function init() {
        fetch('https://randomuser.me/api/?results=5')
            .then(res => res.json())
            .then(json => populateList(json.results));
    }

    document.addEventListener('DOMContentLoaded', init);
})();
