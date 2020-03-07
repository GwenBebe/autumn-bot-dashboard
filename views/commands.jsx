var React = require('react');
var DefaultLayout = require('./layouts/default');

function AboutPage(props) {
    return (
        <DefaultLayout page="commands" loggedIn={props.loggedIn} userInfo={props.userInfo} dirname={props.host} protocol={props.protocol}>
            <div className="basic-head text-center">
                <h1 className="header title">Commands</h1>
                <br />
            </div>
            <section className="commands" id="section-wipes">
                <div className="commands-class-head">
                    <h1 className="module-title">Fun</h1>
                </div>
                <section className="card-large">
                    <section className="flex-items">
                        <article className="command">
                            <h1>hug</h1>
                            <p>Hug someone</p>
                            <div className="mono">-hug {'{'}user{'}'}</div>
                        </article>
                        <article className="command">
                            <h1>poke</h1>
                            <p>Poke someone</p>
                            <div className="mono">-poke {'{'}user{'}'}</div>
                        </article>
                        <article className="command">
                            <h1>pat</h1>
                            <p>Pat someone's head</p>
                            <div className="mono">-pat {'{'}user{'}'}</div>
                        </article>
                    </section>
                </section>
                <div className="commands-class-head">
                    <h1 className="module-title">Util</h1>
                </div>
                <section className="card-large">
                    <section className="flex-items">
                        <article className="command">
                            <h1>help</h1>
                            <p>Get the link to this page</p>
                            <div className="mono">-help</div>
                        </article>
                        <article className="command">
                            <h1>news</h1>
                            <p>Get the most recent news regarding Autumn Bot</p>
                            <div className="mono">-news</div>
                        </article>
                    </section>
                </section>
                <div className="commands-class-head">
                    <h1 className="module-title">Mod</h1>
                </div>
                <section className="card-large">
                    <section className="flex-items">
                        <article className="command">
                            <h1>embed</h1>
                            <p>Create a custom embed</p>
                            <div className="mono">-embed {'{'}channel <span className="dark">WHEN MAKING NEW EMBED</span>{'}'} {'{'}title{'}'} {'{'}description{'}'} {'{'}color{'}'} {'{'}messageID <span className="dark">WHEN EDITING EMBED</span>{'}'} </div>
                        </article>
                        <article className="command">
                            <h1>profile</h1>
                            <p>View Someone's Autumn Bot Profile</p>
                            <div className="mono">-profile {'{'}user{'}'}</div>
                        </article>
                    </section>
                </section>
            </section>

        </DefaultLayout>
    );
}

module.exports = AboutPage;