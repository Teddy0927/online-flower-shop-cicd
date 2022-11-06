import React from 'react';
import Select from 'react-select';
import Marquee from 'react-fast-marquee';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { brands } from '@fortawesome/fontawesome-svg-core/import.macro';

const langOptions = [
    { value: 'zh-HK', label: '繁體中文(香港)' },
    { value: 'en-US', label: 'English' }
]

export default function Header() {
    return (
        <div className="header">
            <div className="top">
                <Select options={langOptions} />
                <Marquee pauseOnHover={true} direction="left" >I&apos;m promotion stuff, might change input method after using mongoDB. Follow our social media for latest news!</Marquee>
                <div className="socialMedia">
                    <FontAwesomeIcon className="icon" icon={brands('facebook')} onClick={() => window.open('https://www.facebook.com/aibeeyiu')} />
                    <FontAwesomeIcon className="icon" icon={brands('instagram')} onClick={() => window.open('https://www.instagram.com/aibeeka/')} />
                    <FontAwesomeIcon className="icon" icon={brands('twitter')} onClick={() => window.open('https://www.twitter.com')} />
                </div>
            </div>
        </div>

    )
}