var React = require('react');
var DefaultLayout = require('./layouts/default');

function errorPage(props) {
  return (
    <DefaultLayout loggedIn={props.loggedIn} userInfo={props.userInfo} dirname={props.host} protocol={props.protocol}>  
    <div className="error text-center">
        <br/><br/><br/><br/><br/><br/>
        <h1 className="display-1 title">404</h1>
        <p className="subtitle">Page not found!</p>
    </div>
    </DefaultLayout>
  );
}

module.exports = errorPage;