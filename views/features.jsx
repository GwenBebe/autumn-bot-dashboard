var React = require('react');
var DefaultLayout = require('./layouts/default');

function FeaturesPage(props) {
	return (
		<DefaultLayout page="features" loggedIn={props.loggedIn} userInfo={props.userInfo} dirname={props.host} protocol={props.protocol}>
			<div className="basic-head text-center">
				<h1 className="header title">Features</h1>
				<br />
			</div>
			<div className="features-page text-left">
				<div className="media">
					<img src="/images/feature1.png" className="align-self-center mr-3" alt="..." />
					<div className="media-body">
						<h5 className="mt-0">Easily Verify New Users</h5>
						<p className="mb-0">Verify new users when they join your server! Protect against unwanted raids, bot accounts, and trolls. It's as easy as clicking a button (literally). </p>
					</div>
				</div>
				<div className="media">
					<div className="media-body">
						<h5 className="mt-0">Create Custom Embedded Messages</h5>
						<p className="mb-0">Spice up your server with custom embedded messages! Set the channel, title, description, and color, then you're good to go! It's as esay as 1, 2, 3... 4... 5!</p>
					</div>
					<img src="/images/feature2.png" className="align-self-center mr-3" alt="..." />
				</div>
				<div className="media">
					<img src="/images/feature3.png" className="align-self-center mr-3" alt="..." />
					<div className="media-body">
						<h5 className="mt-0">Randomized Fun Commands</h5>
						<p className="mb-0">Use the randomized fun commands to interact with your friends! These commands are perks of voting for the bot, so don't forget to support your favorite  non-human.</p>
					</div>
				</div>
				<div className="media">
					<div className="media-body">
						<h5 className="mt-0">Custom Universal Profiles</h5>
						<p className="mb-0">Create a profile on the website and view it in any server Autumn Bot is in. Let people get to know you without the trouble of telling them yourself. (It avoids the awkwardness.)</p>
					</div>
					<img src="/images/feature4.png" className="align-self-center mr-3" alt="..." />
				</div>
			</div>
		</DefaultLayout>
	);
}

module.exports = FeaturesPage;