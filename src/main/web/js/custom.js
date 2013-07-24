if (!String.prototype.startsWith) {
    String.prototype.startsWith = function (str) {
        return !this.indexOf(str);
    }
}

function getUrlVar(key) {
    var result = new RegExp(key + "=([^&]*)", "i").exec(window.location.search)
    return result && result[1] || ""
}
function getLocale() {
    return getUrlVar('locale') || 'en'
}

jQuery.i18n.properties({
    name: ["messages", "exceptions"],
    language: getLocale(),
    path: "i18n/",
    mode: "map",
    callback: function () {
    }
})