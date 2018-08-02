'use strict';

/* eslint-env browser */

const Zinc = {};

(() => {
    function renderComponent(element, content, userData) {
        // console.log(element, content); // eslint-disable-line no-console
        
        let pageElement = document.querySelector(element);

        let url = generateUrl(content);

        fetch(url)
        .then(res => res.text())
        .then(contentText => renderTemplate(contentText, userData))
        .then(template => pageElement.insertAdjacentHTML('beforeend', template));
    }

    function generateUrl(string) {
        return (string.includes('http://') || string.includes('https://')) ? string : `${string}.html`;
    }

    function renderTemplate(template, data) {

        function replaceWithString (match, captured) {
            return captured.split('.').reduce( (acc, curr) => (acc[curr]) , data)
        }

        return template.replace(/{{\s*([\w.]+)\s*}}/g, replaceWithString);
    }

    function init() {
        renderComponent('user-item', 'user', Zinc.userData);
    }

    document.addEventListener('DOMContentLoaded', init);
})();
