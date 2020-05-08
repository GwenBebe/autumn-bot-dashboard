const React = require('react');
const DefaultLayout = require('./layouts/default');
const ReactMarkdown = require('react-markdown');
const uEmojiParser = require('universal-emoji-parser');
var ReactDOMServer = require('react-dom/server');

function profilePage(props) {
  var biography = props.profile.biography;

  var a = 0;
  var count = 0;
  for (a = 0; a < props.profile.biography.length; a++) {
      if (props.profile.biography.substring(a, a+1) == "\n") {
          biography = [biography.slice(0, a + count + 1), '\n', biography.slice(a + count + 1)].join('');
          count++;
      }
  }

  var bio = uEmojiParser.parse(ReactDOMServer.renderToStaticMarkup(<ReactMarkdown skipHtml={true} source={biography}/>));
  
  return (
    <DefaultLayout loggedIn={props.loggedIn} userInfo={props.userInfo} dirname={props.host} protocol={props.protocol}> 
    <div className="profile">
      <style dangerouslySetInnerHTML={{__html:`
        body{
          border-color: #${props.profile.color};
        }

        .profile-user{
            border-color: #${props.profile.color};
        }

        .profile p{
            color: #${props.profile.color};
        }

        #bio p a
        {
          color: #${props.profile.color};
        }
      `}} />
        {(() => {
          if(props.profileOwner)
          { 
            return (
              <div className="commands-class-head">
                <h1 className="module-title" id="username">
                  Profile
                </h1>
              <a href={`/profile/${props.profile.userID}/edit`} className="dashboard-btn btn btn-secondary btn-lg guild-element">Edit Profile</a> 
              </div>
            )
          };
        })()}
      <div className="card-large">
        <div className="profile-user">
          <img id="profilePicture"src={`https://cdn.discordapp.com/avatars/${props.profile.userID}/${props.profile.avatar}.png?size=512`} />
          <h4 id="username">{props.profile.username}#{props.profile.tag}</h4>
        </div>
        <h5 style="overflow-wrap: break-word;" id="bio"  dangerouslySetInnerHTML={{__html:bio}}></h5>
        <h6>Pronouns</h6>
        <p>{props.profile.pronouns}</p>
        {(() => {
          if(props.profile.age != '')
          {
            return (
              <div>
              <h6>Age</h6>
              <p>{props.profile.age}</p>
              </div>
            );
          }
        })()}
        {(() => {
          if(props.profile.gender != '')
          {
            return (
              <div>
              <h6>Gender</h6>
              <p>{props.profile.gender}</p>
              </div>
            );
          }
        })()}
      </div>
    </div>
    </DefaultLayout>
  );
}

module.exports = profilePage;