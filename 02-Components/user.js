'use strict';

/* eslint-env browser */
/* globals Zinc */

(() => {
    function populateList(users) {
        const myComponents = ['user-one', 'user-two', 'user-three', 'user-four', 'user-five'];
        for (let i = 0; i < users.length; i++) {
            Zinc.registerComponent(myComponents[i], 'user', users[i]);
        }
    }

    fetch('https://randomuser.me/api/?results=5')
        .then(res => res.json())
        .then(json => populateList(json.results));
})();