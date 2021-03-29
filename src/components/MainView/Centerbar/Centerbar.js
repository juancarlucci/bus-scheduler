import React, {useState, useEffect, useLayoutEffect, useRef, useCallback} from 'react';
import * as s from './Centerbar.styles';
import LogoRemixSimple from "../../common/LogoRemixSimpleSVG/LogoRemixSimpleSVG";
import { Link } from 'react-router-dom';

const Centerbar = (props) => {
    const {
        contentTitle = '',
        backgroundColor ='',
         textColor='',
         logo='',
         menuItems = [],
            } = props;
    // State
    const [selected, setSelectedMenuItem] = useState(menuItems[0].name);

    const handleMenuItemClick = (name, index) => {
        setSelectedMenuItem(name);
    };

    let id = Date.now();
    const menuItemsElement = menuItems.map((item, index) => {
        id += index;
        const isItemSelected = selected === item.name;
        return (
            <>
                <Link to={item.to} key={index}>
                    <s.CenterbarMenuItem
                        key={item.to+index}
                        selected={isItemSelected}
                        onClick={() => handleMenuItemClick(item.name)}
                        >

                        <s.Text key={id+index} textColor={textColor} selected={isItemSelected}>{item.name}</s.Text>
                    </s.CenterbarMenuItem>
                </Link>
            </>

        )
    });

    return (
            <s.CenterbarContainer backgroundColor={backgroundColor} logo={logo}>
                <s.CenterbarContentWrapper backgroundColor={backgroundColor} textColor={{textColor}}>
                    <s.CenterbarMenuContainer >
                        <s.CenterbarMenu>
                            <s.CenterbarMenuLeft>
                                <s.CenterbarLogoFull logo={logo} />
                            </s.CenterbarMenuLeft>
                            <s.CenterbarMenuRight>
                            </s.CenterbarMenuRight>
                        </s.CenterbarMenu>
                    </s.CenterbarMenuContainer>
                    <s.CenterbarContent key={id}>
                        <s.CenterbarContentMain>
                            <h2>Welcome</h2>
                            <br />
                            <h4>This is my take home bus scheduler assignment.</h4>
                            <br />
                            <p>This is a Bus Scheduling app that allows the user to create and edit bus schedules.</p>
                            <br />
                            <p>It shows the user which trips are currently assigned to each bus.</p>
                            <br />
                            <p>It allows the user to move trips from one bus to another, without creating conflicts.</p>
                            <br />
                        </s.CenterbarContentMain>
                        <s.CenterbarContentItems key={id}>
                            {menuItemsElement}
                        </s.CenterbarContentItems>
                    </s.CenterbarContent>
                </s.CenterbarContentWrapper>
            </s.CenterbarContainer>
                );
};

export default Centerbar
