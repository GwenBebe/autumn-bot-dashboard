var React = require('react');
var DefaultLayout = require('./layouts/default');

function verifyModule(props) {
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
            <p class="guild-name guild-element">{props.guild.name} - Verification</p>
        </div>
    </div>
    </DefaultLayout>
  );
}

module.exports = verifyModule;