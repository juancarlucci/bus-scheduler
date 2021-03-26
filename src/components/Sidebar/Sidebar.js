import React, { useState, useEffect, useLayoutEffect } from "react";
import * as s from "./Sidebar.styles";
import Chevron from "../common/Chevron/Chevron";
import "../common/Chevron/Chevron.css";
import LogoRemixSimple from "../common/LogoRemixSimpleSVG/LogoRemixSimpleSVG";
import { Link } from "react-router-dom";

const Sidebar = ({
                     contentTitle = "",
                     backgroundColor ="",
                     textColor="",
                     logo="",
                     menuItems = []
                }) => {
    // State
    const [isSidebarOpen, setSidebarState] = useState(true);
    const [selected, setSelectedMenuItem] = useState(menuItems[0].name);
    const [setRotate, setRotateState] = useState("accordion__icon");
    const [subMenusStates, setSubmenus] = useState({})

    const rotateChevron = () => {
        setRotateState(
            isSidebarOpen ? "accordion__icon" : "accordion__icon rotate"
        );
    }

    useEffect(() => {
        const updateWindowWidth = () => {
            if(window.innerWidth < 1100 && isSidebarOpen) setSidebarState(false);
            else setSidebarState(true);
        }
        window.addEventListener("resize", updateWindowWidth);

        //* prevent memory leaks
        return () => window.removeEventListener('resize', updateWindowWidth);
    }, [isSidebarOpen]);

    const handleMenuItemClick = (name, index) => {
        setSelectedMenuItem(name);
    };

    const menuItemsElement = menuItems.map((item, index) => {
        const isItemSelected = selected === item.name;
        return (
            <Link to={item.to} key={index}>
                <s.SidebarMenuItem
                    selected={isItemSelected}
                    onClick={() => handleMenuItemClick(item.name)}
                    >
                    <s.Text textColor={textColor} selected={isItemSelected}>{item.name}</s.Text>
                </s.SidebarMenuItem>
            </Link>
        )
    });

    return (
        <s.SidebarContainer backgroundColor={backgroundColor} logo={logo} isSidebarOpen={isSidebarOpen}>
            <s.SidebarMenuContainer >
                <s.SidebarMenu isSidebarOpen={isSidebarOpen}>
                    <s.SidebarMenuLeft>
                        <s.SidebarLogoFull isSidebarOpen={isSidebarOpen} logo={logo} />
                        <s.SidebarLogoSimple isSidebarOpen={isSidebarOpen} >
                                <LogoRemixSimple />
                        </s.SidebarLogoSimple>
                    </s.SidebarMenuLeft>
                    <s.SidebarMenuRight>
                            <s.TogglerContainer
                                onClick={() =>{
                                    setSidebarState(!isSidebarOpen)
                                    rotateChevron(isSidebarOpen)
                                }
                            }>
                                <Chevron className={`${setRotate}`}  />
                        </s.TogglerContainer>
                    </s.SidebarMenuRight>
                </s.SidebarMenu>
            </s.SidebarMenuContainer>

            <s.SidebarContent>
                <s.SidebarContentTitle isSidebarOpen={isSidebarOpen}>
                    <p>{contentTitle}</p>
                        <s.SidebarContentSubTitle isSidebarOpen={isSidebarOpen}><p>jc@remix.com</p></s.SidebarContentSubTitle>
                    </s.SidebarContentTitle>
                <s.SidebarContentItems>
                    {menuItemsElement}
                </s.SidebarContentItems>

            </s.SidebarContent>
        </s.SidebarContainer>
    )
}

export default Sidebar
