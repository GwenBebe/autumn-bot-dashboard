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
      <link href="https://fonts.googleapis.com/css?family=Electrolize&display=swap" rel="stylesheet"></link>
      <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossOrigin="anonymous"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1"   crossOrigin="anonymous"></script>
      <script src={`${props.protocol}://${props.dirname}/js/bootstrap.min.js`}></script>
      <script src={`${props.protocol}://${props.dirname}/js/jscolor.js`}></script>
      <script src={`${props.protocol}://${props.dirname}/js/now-ui-kit.min.js`}></script>
      <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
      {(() => {if(props.dashboard) { return <script src={`${props.protocol}://${props.dirname}/js/dashboard.js`}></script>}})()}
      {(() => {if(props.profile) { return <script src={`${props.protocol}://${props.dirname}/js/profile.js`}></script>}})()}
      <title>Autumn Bot</title>
    </div>

    </head>
    <body>
        <nav className="navbar navbar-expand-lg bg-transparent">
            <div className="container">
            <button className="hamburger hamburger--squeeze navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="hamburger-box">
                    <span className="hamburger-inner"></span>
                </span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item" className="page-title-item">
                        <a href="/" className="page-title">
                        Autumn Bot
                        </a>
                    </li>
                    <li className={(() => {if(props.page == "home"){ return 'nav-item active'}else{return 'nav-item'}})()}>
                        <a className="nav-link" href="/">Home</a>
                    </li>
                    <li className={(() => {if(props.page == "about"){ return 'nav-item active'}else{return 'nav-item'}})()}>
                        <a className="nav-link" href="/about">About</a>
                    </li>
                            
                    <li className={(() => {if(props.page == "features"){ return 'nav-item active'}else{return 'nav-item'}})()}>
                        <a className="nav-link" href="/features">Features</a>
                    </li>
                    <li className={(() => {if(props.page == "commands"){ return 'nav-item active'}else{return 'nav-item'}})()}>
                        <a className="nav-link" href="/commands">Commands</a>
                    </li>
                    {(() => {
                        if(props.loggedIn){
                            return (
                                <li className="nav-item dropdown" id="loginMobile">
                                        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            {props.userInfo.username}#{props.userInfo.discriminator}
                                        </a>
                                        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                            <a className="dropdown-item" href="/dashboard">Dashboard</a>
                                            <a className="dropdown-item" href={`/profile/${props.userInfo.id}`}>Profile<span id="wip">WIP</span></a>
                                            <div className="dropdown-divider"></div>
                                                <a className="dropdown-item" href="/logout">Logout</a>
                                        </div>
                                </li>
                                )
                        }else{
                            return (
                                <li className="nav-item" id="loginMobile">
                                    <a className="nav-link" href="/login">LOGIN</a>
                                </li>
                            )
                        }
                    })()}
                </ul>
                <div>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            {(() => {
                                if(props.loggedIn){
                                    return (
                                        <li className="nav-item dropdown" id="loginDesktop">
                                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                    {props.userInfo.username}#{props.userInfo.discriminator}
                                                </a>
                                                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                                    <a className="dropdown-item" href="/dashboard">Dashboard</a>
                                                    <a className="dropdown-item" href={`/profile/${props.userInfo.id}`}>Profile<span id="wip">WIP</span></a>
                                                    <div className="dropdown-divider"></div>
                                                        <a className="dropdown-item" href="/logout">Logout</a>
                                                </div>
                                        </li>
                                        )
                                }else{
                                    return (
                                        <li className="nav-item" id="loginDesktop">
                                            <a className="nav-link" href="/login">LOGIN</a>
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
