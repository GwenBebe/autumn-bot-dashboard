var React = require('react');
function RedirectLayout(props) {
  return (
    <html>
        <head>
            <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
            <script src="js/redirect.js"></script>
        </head>
        <body>
            Redirecting...
        </body>
    </html>
  );
}

module.exports = RedirectLayout;
