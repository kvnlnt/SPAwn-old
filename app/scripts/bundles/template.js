(function() {
window["JST"] = window["JST"] || {};

window["JST"]["about.jst"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div id="header"></div>\nabout us stuff\n';

}
return __p
}})();
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
__p += '<ul>\n  <li><a href="/#/dashboard">Dashboard</a></li>\n  <li><a href="/#/about">About</a></li>\n</ul>\n';

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