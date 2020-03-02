var React = require('react');
var DefaultLayout = require('./layouts/default');


function verifyModule(props) {
    var guild = props.guild;
    var channels = props.channels;
    var roles = guild.roles;
    const verifyList = channels.map((channel) => {
        if(channel.id == props.moduleSettings.VerifyChannel){
            var isSelected = true;
        }else{
            var isSelected = false;
        }
        if(channel.type == 0){
            if(isSelected){
                return<option value={guild.id} selected="selected">#{channel.name}</option>
            }else{
                return<option value={guild.id}>#{channel.name}</option>
            }
        }else{
            return null;
        }
    });

    const modVerifyList = channels.map((channel) => {
        if(channel.id == props.moduleSettings.MVChannel){
            var isSelected = true;
        }else{
            var isSelected = false;
        }
        if(channel.type == 0){
            if(isSelected){
                return<option value={guild.id} selected="selected">#{channel.name}</option>
            }else{
                return<option value={guild.id}>#{channel.name}</option>
            }
        }else{
            return null;
        }
    });

    
    const staffList = roles.map((role) => {
        var color = role.color.toString(16)
        if(role.id == props.moduleSettings.StaffRole){
            var isSelected = true;
        }else{
            var isSelected = false;
        }
        
        if(role.name != "@everyone"){
            if(isSelected){
                return <option style={{color: `#${color}`}} value={guild.id} selected="selected">@{role.name}</option>

            }else{
                return<option style={{color: `#${color}`}} value={guild.id}>@{role.name}</option>
            }
        }else{
            return null;
        }
    });
    const nonVerifyList = roles.map((role) => {
        var color = role.color.toString(16)

        /*if(role.id == props.moduleSettings.staffRole){
            var isSelected = true;
        }else{
            var isSelected = false;
        }*/

        var isSelected = false;
        
        if(role.name != "@everyone"){
            if(isSelected){
                return<option style={{color: `#${color}`}} value={guild.id} selected="selected">@{role.name}</option>
            }else{
                return<option style={{color: `#${color}`}} value={guild.id}>@{role.name}</option>
            }
        }else{
            return null;
        }
    });
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
            <p class="guild-name guild-element">{props.guild.name} - <b>Verification</b></p>
        </div>
    </div>
    <div class="settings">
    <form id="verifySettings" action={`/api/dashboard/update/verify/${props.guild.id}`} method="post">
        <label class="switch" name="enabled">
            <input type="checkbox" name="enabled"/>
            <span class="slider round"></span>
        </label>
        <select name="VerifyChannel">
            {verifyList}
        </select>
        <select name="MVChannel">
            {modVerifyList}
        </select>
        <select name="StaffRole">
            {staffList}
        </select>
        <select name="NonVerifiedRole">
            {nonVerifyList}
        </select>
        <input name="VMessage" type="text" />
        <label>
            <input data-module="verification" data-guild={props.guild.id} type="button" class="form-submit" value="Save" />
        </label>
        
    </form>
    </div>
    </DefaultLayout>
  );
}

module.exports = verifyModule;