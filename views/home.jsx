var React = require('react');
var DefaultLayout = require('./layouts/default');

function HomePage(props) {
  return (
    <DefaultLayout page="home" loggedIn={props.loggedIn} userInfo={props.userInfo} dirname={props.host} protocol={props.protocol}>
<div>
  <div className="heading text-center">
    <h1 className="display-5 title">Autumn Bot</h1>
    <p className="subtitle">Protect your server against raids, bot accounts, and trolls.</p>
    <a className="btn btn-primary btn-lg" href="/invite-bot" role="button">Invite Bot</a>
    <a className="btn btn-secondary btn-lg" href="/commands" role="button">Commands</a>
    <a className="btn btn-secondary btn-lg" href="/support" role="button">Support</a>
    <br /><br /><br /><br /><br /><br />
  </div>
  <div className="features">
    <div className="title">Features</div>
    <div className="subtitle" />
    <div className="cards">
      <div className="card" style={{width: '18rem'}}>
        <div className="card-body">
          <h5 className="card-title">Verification</h5>
          <p className="card-text">Have users go through a verification process to gain access to the rest of the server.</p>
        </div>
      </div>
      <div className="card" style={{width: '18rem'}}>
        <div className="card-body">
          <h5 className="card-title">Fun</h5>
          <p className="card-text">Poke, hug, or headpat your friends!</p>
        </div>
      </div>
      <div className="card" style={{width: '18rem'}}>
        <div className="card-body">
          <h5 className="card-title">Custom Embeds</h5>
          <p className="card-text">Create custom embedded messages to spice up your rules channel, verification channel, and more.</p>
        </div>
      </div>
    </div>
  </div>
  <div className="statistics">
    <div className="cards">
      <div className="card statistic" style={{width: '18rem'}}>
        <div className="card-body">
          <h5 className="card-title">Servers</h5>
            <h1 style={{fontWeight: 'bold !important'}}>{props.servers}</h1>
        </div>
      </div>
      <div className="card statistic" style={{width: '18rem'}}>
        <div className="card-body">
          <h5 className="card-title">Users</h5>
          <h1 style={{fontWeight: 'bold !important'}}>{props.users}</h1>
        </div>
      </div>
      <div className="card statistic" style={{width: '18rem'}}>
        <div className="card-body">
          <h5 className="card-title">Channels</h5>
          <h1 style={{fontWeight: 'bold !important'}}>{props.channels}</h1>
        </div>
      </div>
    </div>
  </div>
  <div className="features">
    <div className="title">Support</div>
    <div className="subtitle">Support the bot by voting on these websites!</div>
    <div className="cards">
      <div className="card" style={{width: 300}}>
        <a href="https://top.gg/bot/672548437346222110">
          <img src="https://top.gg/api/widget/672548437346222110.svg" alt="Autumn Bot" />
        </a>
      </div>
      <div className="card" style={{width: 380}}>
        <a href="https://discordbotlist.com/bots/672548437346222110">
          <img width={380} height={140} src="https://discordbotlist.com/bots/672548437346222110/widget" alt="Autumn Bot stats on Discord Bot List" />
        </a>
      </div>
      <div className="card" style={{width: 320}}>
        <a href="https://bots.ondiscord.xyz/bots/672548437346222110"><img src="https://bots.ondiscord.xyz/bots/672548437346222110/embed?theme=dark" alt="Autumn Bot" /></a>
      </div>
    </div> 
    <div className="footer">
      Created by <a href="https://twitter.com/NourEldienHE"> Nouridio</a>
    </div>
  </div>
  </div>
    </DefaultLayout>
  );
}

module.exports = HomePage;