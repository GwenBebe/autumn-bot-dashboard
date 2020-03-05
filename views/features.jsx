var React = require('react');
var DefaultLayout = require('./layouts/default');

function FeaturesPage(props) {
  return (
    <DefaultLayout page="features" loggedIn={props.loggedIn} username={props.username} tag={props.tag} dirname={props.host} protocol={props.protocol}>
<div class="features-page text-left">
	<div class="media">
		<img src="/images/feature1.png" class="align-self-center mr-3" alt="..."/>
		<div class="media-body">
			<h5 class="mt-0">Easily Verify New Users</h5>
			<p class="mb-0">Verify new users when they join your server! Protect against unwanted raids, bot accounts, and trolls. It's as easy as clicking a button (literally). </p>
		</div>
	</div>
	<div class="media">
		<div class="media-body">
			<h5 class="mt-0">Create Custom Embedded Messages</h5>
			<p class="mb-0">Spice up your server with custom embedded messages! Set the channel, title, description, and color, then you're good to go! It's as esay as 1, 2, 3... 4... 5!</p>
		</div>
		<img src="/images/feature2.png" class="align-self-center mr-3" alt="..."/>
	</div>
	<div class="media">
		<img src="/images/feature3.png" class="align-self-center mr-3" alt="..."/>
		<div class="media-body">
			<h5 class="mt-0">Randomized Fun Commands</h5>
			<p class="mb-0">Use the randomized fun commands to interact with your friends! These commands are perks of voting for the bot, so don't forget to support your favorite  non-human.</p>
		</div>
	</div>
</div>
    </DefaultLayout>
  );
}

module.exports = FeaturesPage;