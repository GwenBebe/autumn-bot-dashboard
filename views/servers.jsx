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
                        <div className="guild-icon guild-element">
                        <img  className="guild-icon" src={`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png?size=512`}></img>
                        </div>
                    )
                }else{
                    return(
                        <div className="guild-icon guild-element guild-noicon">
                            <span>{guild.acro}</span>
                        </div>
                    )
                }
            })()}
                <span className="guild-name guild-element">{guild.name}</span>
                {(() => {
                    if(guild.botGuild){
                        return <a href={`/dashboard/${guild.id}`} className="dashboard-btn btn btn-primary btn-lg guild-element">Dashboard</a>;
                    }else{
                        return <a className="inviteGuild dashboard-btn btn btn-secondary btn-lg guild-element" id={guild.id}>Invite</a>;
                    }
                })()}
            </li>
        )
    );
  return (
    <DefaultLayout loggedIn={props.loggedIn} userInfo={props.userInfo} dirname={props.host} protocol={props.protocol} dashboard={true}>  
    <ul className="guilds">
        <li id="servers"><span>Please Select A Server</span></li>
        {guildsList}
    </ul>
    </DefaultLayout>
  );
}

module.exports = serverPage;