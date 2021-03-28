import styled, { css } from 'styled-components/macro';

export const TripsContainer = styled.div`
    background: #42505a;
    height: 100vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    transition: .2s ease-in all;
    position: relative;
`
export const TripsTitle = styled.div`
    position: absolute;
    width: 100%;
    //top: 50%;
    //left: 50%;
    //z-index: 1;
    //transform: translate(-50%, -50%);
    color: white;
    text-align: center;
    font-size: 2rem;
    margin: 67px auto;
 `

export const TripContentItems = styled.div`
    position: relative;
    top: 50%;
    left: 50%;
    z-index: 1;
    transform: translate(-50%, -50%);
    color: rgb(66, 80, 90);
    text-align: center;
    margin: 40px 0;
 `

export const BusWrapper = styled.div`
    border: 1px solid blue;
    text-align: left;
    display: flex;
    color: white;
    transition: .2s ease-in all;
    position: relative;
`
export const BusLeftBar = styled.div`
    border: 1px solid rgba(255, 255, 255, 0.3);
    text-align: left;
    display: flex;
    color: white;
    transition: .2s ease-in all;
    position: relative;
`

export const Bus = styled.div`
    border: 1px solid rgba(255, 255, 255, 0.3);
    //background: ${props => props.key? "mediumseagreen" : "#777"};
    background: ${p => p.key % 2 === 0 ? 'red' : 'white'}
    text-align: left;
    display: flex;
    color: white;
    transition: .2s ease-in all;
    position: relative;
`

export const Trip = styled.p`
  text-align: center;
  position: absolute;
  color: ${p => p.selectedTrip ? 'darkgray' : 'white'};
  background-color: ${p => p.selectedTrip ? 'white' : 'darkgray'};
  left: ${p => p.startTime}px;
  width: ${p => p.endTime - p.startTime}px;
  border: 1px solid rgba(255, 255, 255, 0.3);
`

export const OverlapError = styled.div`
  color: white;
`