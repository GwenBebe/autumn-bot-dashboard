
var React = require('react');
var DefaultLayout = require('./layouts/default');

function editProfile(props) {
  var genders = ["","Male","Female","Non-Binary","Other","Prefer Not To Say"];

  console.log(props.profile.gender)

  var genderMap = genders.map((gender) => {
    if(gender == props.profile.gender){
        var isSelected = true;
    }else{
        var isSelected = false;
    }
    
    
    if(isSelected){
        return <option data-gender={gender} selected>{gender}</option>;

    }else{
        return <option data-gender={gender}>{gender}</option>;
    }
  });
  return (
    <DefaultLayout loggedIn={props.loggedIn} userInfo={props.userInfo} dirname={props.host} protocol={props.protocol} profile={true}>
    <div className="profile">
      <style dangerouslySetInnerHTML={{__html:`
        body{
            border-top: 6px #${props.profile.color} solid !important;
        }

        .profile-user{
            border-color: #${props.profile.color};
        }
      `}} />
      <div className="commands-class-head">
        <h1 className="module-title" id="username">
          Edit Profile
        </h1>
        <a href={`/profile/${props.profile.userID}`} className="dashboard-btn btn btn-secondary btn-lg guild-element">{'<'} Back</a>
      </div>
      <div className="card-large">
        <div className="profile-user">
          <img id="profilePicture"src={`https://cdn.discordapp.com/avatars/${props.profile.userID}/${props.profile.avatar}.png?size=512`} />
          <h4 id="username">{props.profile.username}#{props.profile.tag}</h4>
        </div>
        <form id="profile" action={`/api/dashboard/update/verify/${props.userInfo.id}`}>
            <div className="form-group">
                <label for="profile-accent"><b>Accent Color</b></label>
                <input name="profile-accent" className="jscolor {borderColor:'rgb(99, 99, 99)', backgroundColor:'#666'}" value={props.profile.color} />
            </div>
            <div className="form-group">
                <label for="pronouns"><b>Pronouns</b></label>
                <input required className="form-control" name="pronouns" type="text" value={props.profile.pronouns}/>
                <div id="pronouns-invalid-feedback">Please Provide Your Pronouns!</div>
            </div>
            <div className="form-group">
                <label for="gender"><b>Gender</b> <span className="dark">OPTIONAL</span></label>
                    <select className="custom-select" name="gender">
                        {genderMap}
                    </select>
            </div>
            <div className="form-group">
                <label for="age"><b>Age</b> <span className="dark">OPTIONAL</span></label>
                <input className="form-control" name="age" type="number" value={props.profile.age}/>
            </div>
            <div className="form-group" id="biography">  
                <label for="biography"><b>Biography</b> <span className="dark">OPTIONAL</span></label>
                <textarea className="form-control" rows="3" name="biography" type="text" defaultValue={(() => {
                    if(props.profile.biography){
                        return props.profile.biography;
                    }else{
                        return "";
                    }
                })()}></textarea>
            </div>
            <div className="submit-btn">
                <span className="response"></span><input data-module="profile" data-guild={props.userInfo.id} type="button" className="form-submit btn btn-primary" defaultValue="Save" />
            </div>
        </form>
      </div>
    </div>
    </DefaultLayout>
  );
}

module.exports = editProfile;