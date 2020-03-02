var React = require('react');
function DefaultLayout(props) {
  return (
    <html>
    <head>
    <div>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      <link rel="stylesheet" href={`${props.protocol}://${props.dirname}/css/bootstrap.min.css`} />
      <link rel="stylesheet" href={`${props.protocol}://${props.dirname}/css/main.css`} />
      <link rel="stylesheet" href={`${props.protocol}://${props.dirname}/css/now-ui-kit.css`} />
      <link rel="stylesheet" href={`${props.protocol}://${props.dirname}/css/hamburgers.css`} />
      <link href="https://fonts.googleapis.com/css?family=Poppins:300,400,600,700,800&display=swap" rel="stylesheet" />
      <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossOrigin="anonymous"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1"   crossOrigin="anonymous"></script>
      <script src={`${props.protocol}://${props.dirname}/js/bootstrap.min.js`}></script>
      <script src={`${props.protocol}://${props.dirname}/js/now-ui-kit.min.js`}></script>
      <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
      <script src={`${props.protocol}://${props.dirname}/js/dashboard.js`}></script>
      <title>Autumn Bot</title>
    </div>

    </head>
    <body>
        <nav class="navbar navbar-expand-lg bg-transparent">
            <div class="container">
            <button class="hamburger hamburger--squeeze navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="hamburger-box">
                    <span class="hamburger-inner"></span>
                </span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item" class="page-title-item">
                        <a href="/" class="page-title">
                        Autumn Bot
                        </a>
                    </li>
                    <li class={(() => {if(props.page == "home"){ return 'nav-item active'}else{return 'nav-item'}})()}>
                        <a class="nav-link" href="/">Home</a>
                    </li>
                    <li class={(() => {if(props.page == "about"){ return 'nav-item active'}else{return 'nav-item'}})()}>
                        <a class="nav-link" href="/about">About</a>
                    </li>
                    <li class={(() => {if(props.page == "features"){ return 'nav-item active'}else{return 'nav-item'}})()}>
                        <a class="nav-link" href="/features">Features</a>
                    </li>
                    <li class={(() => {if(props.page == "commands" || props.page == "tutorials"){ return 'nav-item dropdown active'}else{return 'nav-item dropdown'}})()}>
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Documentation
                        </a>
                        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                            <a class="dropdown-item" href="/commands">Commands</a>
                            <a class="dropdown-item" href="/tutorials">Tutorials</a>

                        </div>
                    </li>
                    {(() => {
                        if(props.loggedIn){
                            return (
                                <li class="nav-item dropdown" id="loginMobile">
                                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            {props.username}#{props.tag}
                                        </a>
                                        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                                            <a class="dropdown-item" href="/dashboard">Dashboard<span id="wip">WIP</span></a>
                                            <div class="dropdown-divider"></div>
                                                <a class="dropdown-item" href="/logout">Logout</a>
                                        </div>
                                </li>
                                )
                        }else{
                            return (
                                <li class="nav-item" id="loginMobile">
                                    <a class="nav-link" href="/login">LOGIN</a>
                                </li>
                            )
                        }
                    })()}
                </ul>
                <div>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav mr-auto">
                            {(() => {
                                if(props.loggedIn){
                                    return (
                                        <li class="nav-item dropdown" id="loginDesktop">
                                                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                    {props.username}#{props.tag}
                                                </a>
                                                <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                                                    <a class="dropdown-item" href="/dashboard">Dashboard<span id="wip">WIP</span></a>
                                                    <div class="dropdown-divider"></div>
                                                        <a class="dropdown-item" href="/logout">Logout</a>
                                                </div>
                                        </li>
                                        )
                                }else{
                                    return (
                                        <li class="nav-item" id="loginDesktop">
                                            <a class="nav-link" href="/login">LOGIN</a>
                                        </li>
                                    )
                                }
                            })()}

                        </ul>
                    </div>
                </div>
            </div>
            </div>
        </nav>
        {props.children}      
    </body>
    </html>
  );
}

module.exports = DefaultLayout;
