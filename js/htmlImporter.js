/**
 * Created by islam on 14.05.16.
 */

function importComponent(componentID) {
    var link = document.querySelector('link[rel=import]');
    var component = link.import.querySelector('#' + componentID);
    document.body.appendChild(component.cloneNode(true));
}
