export function addClass(el, className) {
    if (hasClass(el, className)) {
        return;
    }
    let newClass = el.className.split(' ');
    console.log('newClass',newClass);
    newClass.push(className);
    el.className = className.join(' ');
    console.log('el.className',el.className);
}
export function hasClass(el, className) {
    let reg = new RegExp('(^|\\s)' + className + '(\\s|$)');
    return reg.test(el.className);
}