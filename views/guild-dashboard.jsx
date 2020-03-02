var React = require('react');
var DefaultLayout = require('./layouts/default');

function dashboardPage(props) {
  return (
    <DefaultLayout loggedIn={props.loggedIn} username={props.username} tag={props.tag} dirname={props.host} protocol={props.protocol}> 
    <div class="guilds guild-current">
        <div class="guild module-guild">
            {(() => {
                if(props.guild.icon)
                {
                    return(
                        <div class="guild-icon guild-element">
                        <img class="guild-icon" src={`https://cdn.discordapp.com/icons/${props.guild.id}/${props.guild.icon}.png?size=512`}></img>
                        </div>
                    )
                }else{
                    return(
                        <div class="guild-icon guild-element">
                            <span>{props.guild.acro}</span>
                        </div>
                    )
                }
            })()}
            <p class="guild-name guild-element">{props.guild.name}</p>
        </div>
    </div>
    <div class="modules">
        <div id="verification" data-guild={props.guild.id} class="module" id="verification" href={`/dashboard/${props.guild.id}/verification`}>
            <img class="module-icon" src="/images/check.png"></img>
            <span class="module-name">Verification</span>
            <span class="module-description">Verify new users to protect against raids, bot accounts, and trolls.</span>
        </div>
    </div>
    </DefaultLayout>
  );
}

module.exports = dashboardPage;