(function() {
window["JST"] = window["JST"] || {};

window["JST"]["dashboard.jst"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += 'this is the dashboard\n';

}
return __p
}})();
(function() {
window["JST"] = window["JST"] || {};

window["JST"]["header.jst"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div>this is the header</div>\n';

}
return __p
}})();
(function() {
window["JST"] = window["JST"] || {};

window["JST"]["main.jst"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div id="header"></div>\n<div id="dashboard"></div>\n';

}
return __p
}})();