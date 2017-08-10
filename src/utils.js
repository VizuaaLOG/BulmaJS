export default {
    addClass(element, newClass) {
        element.className += ' ' + newClass;
    },

    removeClass(element, oldClass) {
        element.className = element.className.replace(oldClass, '').trim(' ');
    }
};
