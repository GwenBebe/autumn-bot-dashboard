var React = require('react');
var DefaultLayout = require('./layouts/default');

function serverPage(props) {
    const guilds = props.guilds;
    const guildsList = guilds.map((guild) =>
        (
            <li className="guild" key="{guild.id}">
            {(() => {
                if(guild.icon)
                {
                    return(
                        <div class="guild-icon guild-element">
                        <img  class="guild-icon" src={`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png?size=512`}></img>
                        </div>
                    )
                }else{
                    return(
                        <div class="guild-icon guild-element guild-noicon">
                            <span>{guild.acro}</span>
                        </div>
                    )
                }
            })()}
                <span class="guild-name guild-element">{guild.name}</span>
                {(() => {
                    if(guild.botGuild){
                        return <a href={`/dashboard/${guild.id}`} class="dashboard-btn btn btn-primary btn-lg guild-element">Dashboard</a>;
                    }else{
                        return <a class="inviteGuild dashboard-btn btn btn-secondary btn-lg guild-element" id={guild.id}>Invite</a>;
                    }
                })()}
            </li>
        )
    );
  return (
    <DefaultLayout loggedIn={props.loggedIn} username={props.username} tag={props.tag} dirname={props.host} protocol={props.protocol}>  
    <ul class="guilds">
        <li id="servers"><span>Please Select A Server</span></li>
        {guildsList}
    </ul>
    </DefaultLayout>
  );
}

module.exports = serverPage;