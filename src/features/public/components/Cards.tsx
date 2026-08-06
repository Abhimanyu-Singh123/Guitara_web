import { useAuthNavigation } from "../../../hooks/useAuthNavigation";
function Cards() {
    const { goToLogin } = useAuthNavigation();
    return (
        <section id="courses" className="electric-cards-section">

            <div className="electric-section-header">
                <h2>
                    Choose Your Guitar Learning Path
                    <span>Start Free. Upgrade When New Levels Launch.</span>
                </h2>

                <p>
                    Begin with our free beginner course today.
                    Intermediate and Advanced tracks are currently under development and will unlock as premium plans soon.
                </p>
            </div>

            <div className="gallery-container">

                {/* CARD 1 */}
                <div className="card-wrapper-1">

                    <div className="inner-wrapper-1">
                        <div className="border-layer-1">
                            <div className="card-main-1"></div>
                        </div>

                        <div className="glow-1-layer-1"></div>
                        <div className="glow-1-layer-2"></div>
                    </div>

                    <div className="overlay-1-1"></div>
                    <div className="background-glow-1"></div>

                    <div className="card-content">
                        <div className="content-header">

                            <div className="glass-badge">Beginner</div>

                            <div className="card-status free">FREE</div>

                            <p className="card-title">Start Playing Smoothly</p>

                        </div>

                        <hr className="card-divider" />

                        <div className="content-footer">
                            <p className="card-description">
                                Learn finger placement, open chords, rhythm basics, and simple Hindi songs crafted for your very first jam sessions.
                            </p>

                            <button className="electric-btn electric-green" onClick={goToLogin}>
                                Start Free ⚡
                            </button>
                        </div>
                    </div>

                </div>

                {/* CARD 2 */}
                <div className="card-wrapper-2">

                    <div className="inner-wrapper-2">
                        <div className="border-layer-2">
                            <div className="card-main-2"></div>
                        </div>

                        <div className="glow-2-layer-1"></div>
                        <div className="glow-2-layer-2"></div>
                    </div>

                    <div className="overlay-2-1"></div>
                    <div className="background-glow-2"></div>

                    <div className="card-content">
                        <div className="content-header">

                            <div className="glass-badge">Intermediate</div>

                            <div className="card-status soon">COMING SOON</div>

                            <p className="card-title">Refine Your Style</p>

                        </div>

                        <hr className="card-divider" />

                        <div className="content-footer">
                            <p className="card-description">
                                Unlock barre chords, faster transitions, groove patterns, and trending Bollywood tracks chosen by the Guitara community.
                            </p>

                            <button className="electric-btn electric-purple coming-btn lock-btn">
                                <span className="lock-icon-inline">🔒</span>
                                Coming Soon ⚡
                            </button>
                        </div>
                    </div>

                </div>

                {/* CARD 3 */}
                <div className="card-wrapper-3">

                    <div className="inner-wrapper-3">
                        <div className="border-layer-3">
                            <div className="card-main-3"></div>
                        </div>

                        <div className="glow-3-layer-1"></div>
                        <div className="glow-3-layer-2"></div>
                    </div>

                    <div className="overlay-3-1"></div>
                    <div className="background-glow-3"></div>

                    <div className="card-content">
                        <div className="content-header">

                            <div className="glass-badge">Advanced</div>

                            <div className="card-status soon">COMING SOON</div>

                            <p className="card-title">Command the Stage</p>

                        </div>

                        <hr className="card-divider" />

                        <div className="content-footer">
                            <p className="card-description">
                                Master lead guitar, expressive solos, music theory, speed drills, and live-performance skills built for serious creators.
                            </p>

                            <button className="electric-btn electric-blue coming-btn lock-btn">
                                <span className="lock-icon-inline">🔒</span>
                                Coming Soon ⚡
                            </button>
                        </div>
                    </div>

                </div>

            </div>
        </section>
    );
}

export default Cards;