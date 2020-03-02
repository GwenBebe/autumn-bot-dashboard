var React = require('react');
var DefaultLayout = require('./layouts/default');

function AboutPage(props) {
  return (
    <DefaultLayout page="about" loggedIn={props.loggedIn} username={props.username} tag={props.tag} dirname={props.host} protocol={props.protocol}>      
<div class="page text-center">
    <h1 class="header title">About Autumn Bot</h1>
    <br /><br /><br /><br /><br /><br />
</div>
<div class="about text-left">
    <h1 class="display-5 title">What is Autumn Bot?</h1>
    <p class="subtitle">Autumn Bot is a verification bot used to verify new users. This verification process can help protect against raids, bot accounts, and trolls.</p>
    <h1 class="display-5 title">Why use Autumn Bot?</h1>
    <p class="subtitle">Autumn Bot is constantly being updated, with new features constantly being added. There are plans to expand the feature set of Autumn Bot from a simple verification bot to a complete moderation bot.</p>
    <h1 class="display-5 title">How can I support the bot?</h1>
    <p class="subtitle">You can support the bot by voting <a href="https://top.gg/bot/672548437346222110/vote">here</a> every twelve hours. If you do vote, you a few fun perks to make your experience better.</p>
</div>
    </DefaultLayout>
  );
}

module.exports = AboutPage;