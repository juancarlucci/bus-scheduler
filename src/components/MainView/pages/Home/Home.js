import React from "react";
import Centerbar from "../../Centerbar/Centerbar";

const logo = {
    full:'img/logo.svg',
    simple:'img/logo-simple.svg'
};
const contentTitle = 'RemixHome';
const backgroundColor = '#273d56';
const textColor = '#199ADC';
const menuItems = [
    {name: 'Bus Services', to: '/bus', icon: '/icons/bus-icon.svg', subMenuItems: [] },
];

const Home = () => {
    return <>
                <Centerbar
                    logo={logo}
                    contentTitle={contentTitle}
                    backgroundColor={backgroundColor}
                    textColor={textColor}
                    menuItems={menuItems}
                />
            </>
};

export default Home;