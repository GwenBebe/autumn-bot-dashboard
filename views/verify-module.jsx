var React = require('react');
var DefaultLayout = require('./layouts/default');

function channelsMap(channels, selectedID){

    return channels.map((channel) => {
    if(channel.id == selectedID){
        var isSelected = true;
    }else{
        var isSelected = false;
    }
    if(channel.type == 0){

        if(isSelected){
            return<option data-channel={channel.id} selected>#{channel.name}</option>
        }else{
            return<option data-channel={channel.id}>#{channel.name}</option>
        }
    }else{
        return null;
    }
});
}

function rolesMap(roles, selectedID){
    return roles.map((role) => {
    var color = role.color.toString(16);

    if(color == "#0") color = "#FFFFFF";
    if(role.id == selectedID){
        var isSelected = true;
    }else{
        var isSelected = false;
    }
    
    if(role.name != "@everyone"){
        if(isSelected){
            return <option style={{color: `#${color}`}} data-role={role.id} selected>@{role.name}</option>

        }else{
            return<option style={{color: `#${color}`}} data-role={role.id}>@{role.name}</option>
        }
    }else{
        return null;
    }
});
}

function verifyModule(props) {
    var guild = props.guild;
    var channels = props.channels;
    var roles = guild.roles;

    const verifyList = channelsMap(channels, props.moduleSettings.VerifyChannel);

    const modVerifyList = channelsMap(channels, props.moduleSettings.MVChannel);

    const staffList = rolesMap(roles, props.moduleSettings.StaffRole);

    const nonVerifyList = rolesMap(roles, props.moduleSettings.NonVerifiedRole);

    const verifiedList = rolesMap(roles, props.moduleSettings.VerifiedRole);

    if(props.moduleSettings.enabled){
        var enableSwitch = 
        (<label className="switch" name="enabled">
            <input className="module-switch" defaultChecked type="checkbox" name="enabled"/>
            <span className="slider round"></span>
        </label>)
    }else{
        var enableSwitch = 
        (<label className="switch" name="enabled">
            <input className="module-switch" type="checkbox" name="enabled"/>
            <span className="slider round"></span>
        </label>)
    }

    if(props.moduleSettings.VerifiedRoleEnabled){
        var verifiedSwitch = 
        (<label id="verified-switch" className="switch" name="verifiedRoleEnabled">
            <input className="verified-switch" defaultChecked type="checkbox" name="verifiedRoleEnabled"/>
            <span className="slider round"></span>
        </label>)
    }else{
        var verifiedSwitch = 
        (<label id="verified-switch" className="switch" name="verifiedRoleEnabled">
            <input className="verified-switch" type="checkbox" name="verifiedRoleEnabled"/>
            <span className="slider round"></span>
        </label>)
    }

  return (
    <DefaultLayout loggedIn={props.loggedIn} userInfo={props.userInfo} dirname={props.host} protocol={props.protocol} dashboard={true}> 
    <div className="module-guild guild-current">
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
            <a href={`/dashboard/${props.guild.id}`} className="dashboard-btn btn btn-secondary btn-lg guild-element">{'<'} Back</a>
        </div>
    </div>
    <div className="settings-head">
        <h1 className="module-title">Verification</h1>
        {enableSwitch}

    </div>
    <div className="settings card-large">
    <form id="verifySettings" action={`/api/dashboard/update/verify/${props.guild.id}`}>
        <div className="form-group">
            <label for="VerifyChannel"><b>Verification Channel</b><br/>This is the channel where new users will send their verification application.</label>
            <select className="custom-select" name="VerifyChannel">
                {verifyList}
            </select>
        </div>
        <div className="form-group">
            <label for="MVChannel"><b>Mod Verification Channel</b><br/>This is the channel where moderators will accept/deny verification applications.</label>
            <select className="custom-select" name="MVChannel">
                {modVerifyList}
            </select>
        </div>
        <div className="form-group">
            <label for="VerifyChannel"><b>Staff Role</b><br/>This is the role given to the staff/moderators who verify applications.</label>
            <select  className="custom-select" name="StaffRole">
                {staffList}
            </select>
        </div>
        <div className="form-group">
            <label for="NonVerifiedRole"><b>Non Verified Role</b><br/>This is the role given users who are not yet verified.</label>
            <select className="custom-select" name="NonVerifiedRole">
                {nonVerifyList}
            </select>
        </div>
        <div className="form-group">
            <label className="switch-label-parent" for="AutoRole">
                <div className="switch-label">
                    <div id="verifiedRole"><b>Verified Role</b><br/>Give users a role once they're verified.</div>
                    {verifiedSwitch}
                </div>
            </label>
            <select id="verified-select" className="custom-select" name="AutoRole">
                {verifiedList}
            </select>
        </div>
        <div className="form-group">  
            <label for="VMessage"><b>Verification Message</b><br/>This is message send to users who have been verified.</label>
            <textarea className="form-control" rows="3" name="VMessage" type="text" defaultValue={(() => {
                if(props.moduleSettings.VMessage){
                    return props.moduleSettings.VMessage;
                }else{
                    return "You have been verified!";
                }
            })()}></textarea>
        </div>
        <div className="submit-btn">
            <span className="response"></span><input data-module="verification" data-guild={props.guild.id} type="button" className="form-submit btn btn-primary" defaultValue="Save" />
        </div>
    </form>
    </div>
    </DefaultLayout>
  );
}

module.exports = verifyModule;