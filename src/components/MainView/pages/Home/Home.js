import React from "react";
import Centerbar from "../../Centerbar/Centerbar";
import * as s from "./Home.styles";

const logo = {
    full:'img/logo.svg',
    simple:'img/logo-simple.svg'
};
const contentTitle = 'RemixHome';
const backgroundColor = '#273d56';
const textColor = '#199ADC';
const menuItems = [
    {name: 'Bus Scheduler', to: '/bus', icon: '/icons/bus-icon.svg'},
];

const Home = () => {
    return (<>
                <s.HomeContainer>
                <Centerbar
                    logo={logo}
                    contentTitle={contentTitle}
                    backgroundColor={backgroundColor}
                    textColor={textColor}
                    menuItems={menuItems}
                />
                </s.HomeContainer>
            </>)
};

export default Home;