var React = require('react');
var DefaultLayout = require('./layouts/default');

function errorPage(props) {
  return (
    <DefaultLayout loggedIn={props.loggedIn} username={props.username} tag={props.tag} dirname={props.host} protocol={props.protocol}>  
    <div class="error text-center">
        <br/><br/><br/><br/><br/><br/>
        <h1 class="display-1 title">404</h1>
        <p class="subtitle">Page not found!</p>
    </div>
    </DefaultLayout>
  );
}

module.exports = errorPage;