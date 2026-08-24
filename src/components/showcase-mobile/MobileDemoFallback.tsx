import React from 'react';

export interface MobileDemoFallbackProps {}

const MobileDemoFallback: React.FC<MobileDemoFallbackProps> = () => {
    return (
        <div className="site-page-content">
            <h1>Démo interactive</h1>
            <br />
            <div className="text-block">
                <p>
                    Cette démo est une expérience interactive conçue pour un
                    écran d'ordinateur avec souris/clavier. Revenez depuis un
                    ordinateur pour l'essayer, ou consultez la description du
                    projet dans la section Projets.
                </p>
            </div>
        </div>
    );
};

export default MobileDemoFallback;
