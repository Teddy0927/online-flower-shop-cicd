import React from 'react';
import Marquee from 'react-fast-marquee';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { brands } from '@fortawesome/fontawesome-svg-core/import.macro';

export default function Header() {
    return (
        <div className="header">
            <div className="top">
                {/* <Select options={langOptions} /> */}
                <Marquee pauseOnHover={true} direction="left"><h3>Senior Citizen&apos;s Day is coming soon! Browser ai.belief to purchase preserve flower for your seniors!</h3></Marquee>

            </div>
            <div className="socialMedia justify-content-end">
                    <h3 className="p-2">Check out our socials</h3>
                    <div className="p-2">
                    <FontAwesomeIcon size="3x" className="icon" icon={brands('facebook')} onClick={() => window.open('https://www.facebook.com/aibeeyiu')} />
                    <FontAwesomeIcon size="3x" className="icon" icon={brands('instagram')} onClick={() => window.open('https://www.instagram.com/aibeeka/')} />
                    <FontAwesomeIcon size="3x" className="icon" icon={brands('twitter')} onClick={() => window.open('https://www.twitter.com')} />
                    </div>
                </div>
        </div>

    )
}