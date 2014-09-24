/** @jsx React.DOM */

var React = require("react");
var Router = require("react-router");

/* global window */
// expost React globally for DevTools
window.React = React;

var MovEthApp = require("./components/MovEthApp");

var Client = require("./components/Client");
var ConfirmRequest = require("./components/ConfirmRequest");
var InFlight = require("./components/InFlight");
var Pilot = require("./components/Pilot");

var utils = require("./utils");

// Load jQuery and bootstrap
var jQuery = require("jquery");
window.jQuery = jQuery;
require("bootstrap/dist/js/bootstrap.js");
//require("./css/style.css");

var Route = Router.Route;
var Routes = Router.Routes;
var Redirect = Router.Redirect;

var uid = localStorage["moveth:uid"];
if (!uid) {
    uid = utils.randomId();
    localStorage["moveth:uid"] = uid;
}

var routes = (
    <Routes>
        <Route handler={MovEthApp}>
            <Redirect from="/" to="client" />
            <Route name="client" path="/client" handler={Client} />
            <Route name="confirmRequest" path="/request/:latitude,:longitude/:address" handler={ConfirmRequest} />
            <Route name="inFlight" path="/flight/:flightId/:latitude,:longitude/:address" handler={InFlight} />
            <Route name="pilot" path="/pilot" handler={Pilot} uid={uid} />
        </Route>
    </Routes>
);

/* global document */
React.renderComponent(routes, document.getElementById("app"));
