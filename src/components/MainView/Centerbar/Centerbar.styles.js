import styled, { css } from 'styled-components/macro';

export const CenterbarContainer = styled.div`
    background: ${p => p.backgroundColor};
    color: white;
    height: 100vh;
    overflow: hidden;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 4px 4px 0px;
    position: relative;
    transition: .2s ease-in all;
`

export const CenterbarContentWrapper = styled.div`
    background: ${p => p.backgroundColor};
    color: ${p => p.textColor};
    width: 320px;
    position: relative;
    top: 50%;
    left: 50%;
    z-index: 1;
    transform: translate(-50%, -50%);
`

export const CenterbarLogoFull = styled.div`
    background-image: url(${p => p.logo.full});
    width: 115px;
    height: 24px;
    transition: .2s ease-in all;
`

export const CenterbarMenuContainer = styled.div`
    box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 4px -1px, 
                rgba(0, 0, 0, 0.14) 0px 4px 5px 0px, 
                rgba(0, 0, 0, 0.12) 0px 1px 10px 0px;
    width: 320px;
    transform: matrix(1, 0, 0, 1, 0, 0);
    transition-delay: 0s;
    transition-duration: 0.3s;
    transition-property: box-shadow;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 1100;
`

export const CenterbarMenu = styled.div`
    align-items: center;
    width: 100%;
    display: flex;
    height: 64px;
    justify-content: space-between;
    padding: 8px 16px;
    transition: .2s ease-in all;
`

export const CenterbarMenuLeft = styled.div`
    align-items: center;
    display: flex;
`

export const CenterbarMenuRight = styled.div`
    align-items: center;
    display: flex;
`

export const CenterBarLogoSimple = styled.div`
  // background-image: url(${p => p.logo.simple});
    width: 24px;
    height: 24px;
    transition: .2s ease-in all;
`

export const CenterbarContent = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow-x: auto;
    overflow-y: auto;
    z-index: 1;
`

export const CenterbarContentHeader = styled.div`
    background-color: rgb(255, 255, 255);
    box-shadow: rgba(0, 0, 0, 0.2) 0px 1px 3px 0px;
    color: rgb(66, 80, 90);
    display: block;
    font-size: ${p => p.isCenterbarOpen ? '1.8rem': '.7rem'};
    font-weight: 600;
    opacity: 0.85;
    padding: 8px 16px;
    transition: .2s ease-in all;
`

export const CenterbarContentSubTitle = styled.div`
    font-size: .6rem;
    font-weight: 400;
`

export const CenterbarContentItems = styled.div`
    //border-right-color: rgb(163, 174, 182);
    //border-right-style: solid;
    //border-right-width: 1px;
    color: rgb(66, 80, 90);
    display: block;
    flex-grow: 1;
    text-align: center;
`
export const CenterbarMenuItem = styled.div`
    align-items: center;
    display: flex;
    //color: ${p => p.selected ? 'white' : 'darkgray'};
    flex-direction: row;
    flex-grow: 0;
    flex-shrink: 0;
    font-weight: ${p => p.selected ? '600' : '300'};
    justify-content: flex-start;
    padding: 8px 16px;
    text-align: left;
    border: ${p => p.selected ? '1px solid rgba(255, 255, 255, 0.3)' : '1px solid transparent'};
    border-left: none;
    border-right: none;
    transition: .2s ease-in all;
    
    ${p => !p.selected && `
    &:hover {
        border: 1px solid rgba(255, 255, 255, 0.2);
        transition: .2s ease-in-out all;
        }
    `}
`

export const Text = styled.p`
   color: ${p => p.selected ? p.textColor : 'white'};
`

export const Icon = styled.img`
  fill: white;
  filter: invert(48%) sepia(79%) saturate(2476%) hue-rotate(86deg) brightness(118%) contrast(119%);
  height: 20px;
  margin-right: .5em;
  width: 20px;
`

// Toggler -----------------------------------------------------------------------------
export const TogglerContainer = styled.div`
    display: flex;
    align-items: center;
`

export const Toggler = styled.div`
    cursor: pointer;
    right: 32px;
    top: 32px;
    width: 32px;
    height: 32px;
    position: absolute; // for horizontal lines
    
    &:hover {
      opacity: 1;
    }
    &:before, &:after {
      position: absolute;
      left: 15px;
      content: ' ';
      height: 33px;
      width: 1px;
      background-color: #fff;
      
    &:before {
      transform: rotate(45deg);
    }
    
    &:after {
      transform: rotate(-45deg);
    }       
`

export const  CGeocoder = styled.div`

`

export const  GeocoderInput = styled.div`
    width: 100%;
    border-radius: 0;
`