/** @jsx React.DOM */

var React = require("react");
var Router = require("react-router");

/* global window */
// expost React globally for DevTools
window.React = React;

var MovEthApp = require("./components/MovEthApp");

var Client = require("./components/Client");
var InFlight = require("./components/InFlight");
var Pilot = require("./components/Pilot");
var Receipt = require("./components/Receipt");

// Load jQuery and bootstrap
var jQuery = require("jquery");
window.jQuery = jQuery;
require("bootstrap/dist/js/bootstrap.js");
//require("./css/style.css");

var Route = Router.Route;
var Routes = Router.Routes;
var Redirect = Router.Redirect;

var Firebase = require("Firebase");
var FirebaseClient = require("./clients/FirebaseClient");

var firebaseUrl = "https://moveth.firebaseio.com/";
var firebaseRef = new Firebase(firebaseUrl);
var client = new FirebaseClient(firebaseRef);

var routes = (
    <Routes>
        <Route handler={MovEthApp} client={client}>
            <Redirect from="/" to="client" />
            <Route name="client" path="/client" handler={Client} />
            <Route name="inFlight" path="/flight/:flightId/:latitude,:longitude/:address" handler={InFlight} />
            <Route name="pilot" path="/pilot" handler={Pilot} trackInterval={60000} />
            <Route name="receipt" path="/receipt/:flightId/:role" handler={Receipt} />
        </Route>
    </Routes>
);

/* global document */
React.renderComponent(routes, document.getElementById("app"));
