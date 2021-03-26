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

    const menuItemsElement = menuItems.map((item, index) => {
        const isItemSelected = selected === item.name;
        // console.log(`${item.name} selected? ${isItemSelected}`);
        return (
            <>
                <Link to={item.to} key={index}>
                    <s.CenterbarMenuItem
                        selected={isItemSelected}
                        onClick={() => handleMenuItemClick(item.name)}
                        >
                        <s.Text textColor={textColor} selected={isItemSelected}>{item.name}</s.Text>
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
                    <s.CenterbarContent>

                        <s.CenterbarContentItems>
                            {menuItemsElement}
                        </s.CenterbarContentItems>
                    </s.CenterbarContent>
                </s.CenterbarContentWrapper>
            </s.CenterbarContainer>
                );


};

export default Centerbar
