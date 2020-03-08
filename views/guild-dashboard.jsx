var React = require('react');
var DefaultLayout = require('./layouts/default');

function dashboardPage(props) {
  return (
    <DefaultLayout loggedIn={props.loggedIn} userInfo={props.userInfo} dirname={props.host} protocol={props.protocol} dashboard={true}> 
    <div className="module-guild guild-current">
        <style dangerouslySetInnerHTML={{__html: `
            .module-soon
            {
                background-color: #313131 !important;
            }

            .module-soon .module-description
            {
                bottom: 30% !important;
                opacity: 0.5;
            }

            .module-soon img
            {
                opacity: 0.5;
            }

            .module-soon .module-name
            {
                opacity: 0.5;
            }
        `}}></style>
        <div className="guild">
            {(() => {
                if(props.guild.icon)
                {
                    return(
                        <div className="guild-icon guild-element">
                        <img className="guild-icon" src={`https://cdn.discordapp.com/icons/${props.guild.id}/${props.guild.icon}.png?size=512`}></img>
                        </div>
                    )
                }else{
                    return(
                        <div className="guild-icon guild-noicon guild-element">
                            <span>{props.guild.acro}</span>
                        </div>
                    )
                }
            })()}
            <p className="guild-name guild-element">{props.guild.name}</p>
            <a href={`/dashboard/`} className="dashboard-btn btn btn-secondary btn-lg guild-element">{'<'} Back</a>
        </div>
    </div>
    <div className="modules">
        <div className="commands-class-head">
            <h1 className="module-title">Modules</h1>
        </div>
        <div data-module="verification" data-guild={props.guild.id} className="module-open module module-component" id="verification" href={`/dashboard/${props.guild.id}/verification`}>
            <img data-module="verification" data-guild={props.guild.id}  id="verification" className="module-icon module-component" src="/images/check.png"></img>
            <span data-module="verification" data-guild={props.guild.id}  id="verification" className="module-name module-component">Verification</span>
            <span data-module="verification" data-guild={props.guild.id}  id="verification" className="module-description module-component">Verify new users to protect against raids, bot accounts, and trolls.</span>
        </div>
        <div className="module-soon module module-component" id="moderation">
            <img id="moderation" className="module-icon module-component" src="/images/hammer.png"></img>
            <span id="moderation" className="module-name module-component">Moderation</span>
            <span id="moderation" className="module-description module-component"><span className="dark">COMING SOON...</span></span>
        </div>
        <div className="module-soon module module-component" id="moderation">
            <img id="moderation" className="module-icon module-component" src="/images/medal.png"></img>
            <span id="moderation" className="module-name module-component">Levels</span>
            <span id="moderation" className="module-description module-component"><span className="dark">COMING SOON...</span></span>
        </div>
    </div>
    </DefaultLayout>
  );
}

module.exports = dashboardPage;