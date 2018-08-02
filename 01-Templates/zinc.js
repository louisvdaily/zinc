'use strict';

/* eslint-env browser */

(() => {
    function populateList(results) {
        console.log(results); // eslint-disable-line no-console

        let template = `
        <li class="user">
            <img class="user-photo" src="{{ picture.thumbnail }}" alt="Photo of {{ name.first }} {{ name.last }}">
            <div class="user-name">{{ name.first }} {{ name.last }}</div>
            <div class="user-location">{{ location.city }}, {{ location.state }}</div>
            <div class="user-email">{{ email }}</div>
        </li>
        `

        // Fetch user list element from DOM first
        let userList = document.getElementById('z-user-list');

        for (let userIndex = 0; userIndex < results.length; userIndex++) {
            let user = results[userIndex];
            renderTemplate('user', user)
            .then(templateString => userList.insertAdjacentHTML('beforeend', templateString));
        }
    }

    function capitalize(string) {
        let words = string.split(' ');
        let capitalWords = words.map(word => word[0].toUpperCase() + word.slice(1));
        return capitalWords.join(' ');
    }

    function renderTemplate(templateName, object) {
        let url = (templateName.includes('http://') || templateName.includes('https://')) ? templateName : `${templateName}.html`;
        return fetch(url)
        .then(res => res.text())
        .then(textString => textString.replace(/{{\s*([\w.]+)\s*}}/g, (match, captured) => capitalize(captured.split('.').reduce((acc, cur) => (acc[cur]), object))));
    }

    function init() {
        fetch('https://randomuser.me/api/?results=5')
            .then(res => res.json())
            .then(json => populateList(json.results));
    }

    document.addEventListener('DOMContentLoaded', init);
})();
