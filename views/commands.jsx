var React = require('react');
var DefaultLayout = require('./layouts/default');

function AboutPage(props) {
    return (
        <DefaultLayout page="commands" loggedIn={props.loggedIn} username={props.username} tag={props.tag} dirname={props.host} protocol={props.protocol}>
            <div class="basic-head text-center">
                <h1 class="header title">Commands</h1>
                <br />
            </div>
            <section class="commands" id="section-wipes">
                <div class="commands-class-head">
                    <h1 class="module-title">Fun</h1>
                </div>
                <section class="commands-class">
                    <section class="flex-items">
                        <article class="command">
                            <h1>hug</h1>
                            <p>Hug someone</p>
                            <span className="mono">-hug {'{'}user{'}'}</span>
                        </article>
                        <article class="command">
                            <h1>poke</h1>
                            <p>Poke someone</p>
                            <span className="mono">-poke {'{'}user{'}'}</span>
                        </article>
                        <article class="command">
                            <h1>pat</h1>
                            <p>Pat someone's head</p>
                            <span className="mono">-pat {'{'}user{'}'}</span>
                        </article>
                    </section>
                </section>
                <div class="commands-class-head">
                    <h1 class="module-title">Util</h1>
                </div>
                <section class="commands-class">
                    <section class="flex-items">
                        <article class="command">
                            <h1>help</h1>
                            <p>Get the link to this page</p>
                            <span className="mono">-help</span>
                        </article>
                        <article class="command">
                            <h1>news</h1>
                            <p>Get the most recent news regarding Autumn Bot</p>
                            <span className="mono">-news</span>
                        </article>
                    </section>
                </section>
                <div class="commands-class-head">
                    <h1 class="module-title">Mod</h1>
                </div>
                <section class="commands-class">
                    <section class="flex-items">
                        <article class="command">
                            <h1>embed</h1>
                            <p>Create a custom embed</p>
                            <span className="mono">-embed {'{'}channel <span class="dark">WHEN MAKING NEW EMBED</span>{'}'} {'{'}title{'}'} {'{'}description{'}'} {'{'}color{'}'} {'{'}messageID <span class="dark">WHEN EDITING EMBED</span>{'}'} </span>
                        </article>
                        <article class="command">
                            <h1>news</h1>
                            <p>Get the most recent news regarding Autumn Bot</p>
                            <span className="mono">-news</span>
                        </article>
                    </section>
                </section>
            </section>

        </DefaultLayout>
    );
}

module.exports = AboutPage;