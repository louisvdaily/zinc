'use strict';

/* eslint-env browser */

const Zinc = {};

(() => {

    Zinc.registerComponent = function (elementName, templateFile, dataObject) {
        if (!Zinc.components) {
            Zinc.components = {};
        }

        Zinc.components[elementName] = {elementName, templateFile, dataObject};
    };

    function renderComponent(element, content, userData) {
        // console.log(element, content); // eslint-disable-line no-console
        
        let pageElements = document.querySelectorAll(element);

        let url = generateUrl(content);

        fetch(url)
        .then(res => res.text())
        .then(contentText => renderTemplate(contentText, userData))
        .then(template => pageElements.forEach(element => element.insertAdjacentHTML('beforeend', template)));
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

    function renderComponents() {
        let componentsNames = Object.keys(Zinc.components);

        for (let i = 0; i < componentsNames.length; i++) {
            let currentComponent = Zinc.components[componentsNames[i]];
            renderComponent(currentComponent.elementName, currentComponent.templateFile, currentComponent.dataObject);
        }
    }
    function init() {
        Zinc.registerComponent('user-item', 'user', Zinc.userData);
        renderComponents();
    }

    document.addEventListener('DOMContentLoaded', init);
})();
