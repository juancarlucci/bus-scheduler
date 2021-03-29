import styled from 'styled-components/macro';

export const SchedulerContainer = styled.div`
    background: #42505a;
    height: 100vh;
    width: 100%;
    overflow: auto;
    transition: .2s ease-in all;
    position: relative;
`

export const SchedulerTitle = styled.div`
    width: 100%;
    color: white;
    //text-align: center;
    font-size: 2rem;
    margin: 67px 200px 80px 190px;
 `

export const SchedulerDescription = styled.div`
    //width: 100%;
    margin: 40px 0;
    
    color: white;
    text-align: left;
    font-size: 1rem;
    
    & > p {
      margin: 20px 0;
    }
 `


export const SchedulerContent = styled.div`
    top: 30px;
    color: rgb(66, 80, 90);
    text-align: center;
    margin: 4px 0;
    position: relative;//for tick marks
   
   &:before { 
   width: inherit;
   content: ' ';
   display: block; 
   position: relative;
   border: 1px solid rgba(255, 255, 255, 0.3);
   top: -42px; 
   left: 195px;
}
 `

export const ContentTickMark = styled.div`
  border-left: 2px solid rgba(255, 255, 255, 0.3);
  height: 8px; 
  top: -40px;
  margin-left: 195px;
  left: ${p => p.tick}px;
  position: absolute;
  
  &> span {
  color: rgba(255, 255, 255, 0.7);
  position: relative;
  width: 10px; 
  left: -50%;
  top: 14px;
  font-size: 1rem;
}
`

export const BusWrapper = styled.div`
    display: flex;
    color: white;
    transition: .2s ease-in all;
    position: relative;
`

export const BusLeftBar = styled.div`
    border: 1px solid rgba(255, 255, 255, 0.3);
    width: 200px;
    height: 100%;
    text-align: left;
    display: flex;
    flex-direction: column;
    color: white;
    margin: 0 7px;
    transition: .2s ease-in all;
    position: relative;
`

export const BusLeftBarItems = styled.div`
  display: flex;
  align-items: center;
  border-right: 1px solid gray;
  height: 33px;
     
`

export const BusMinMaxTripTime = styled.div`
  margin: auto;
  color: rgba(255,255,255, .5);
`

export const BusRightBar = styled.div`
    width: 100%;
    height: 100%;
    text-align: left;
    display: flex;
    flex-direction: column;
    margin-right: 7px;
    transition: .2s ease-in all;
    position: relative;
`

export const Bus = styled.div`
    border-top: 1px solid rgba(255, 255, 255, 0.3);
    border-bottom: 1px solid rgba(255, 255, 255, 0.3);
    height: 33px;
    display: flex;
    flex-direction: column;
    align-content: center;
    color: white;
    background: ${p => p.busId % 2 === 0 ? '#273d56' : 'transparent'};
    transition: .2s ease-in all;
    position: relative;
`

export const Trip = styled.div`
  text-align: center;
  position: absolute;
  transform: translate(0, 25%);
  color: ${p => p.selectedTrip ? 'darkgray' : 'white'};
  background-color: ${p => p.selectedTrip ? 'white' : 'darkgray'};
  left: ${p => p.startTime}px;
  width: ${p => p.endTime - p.startTime}px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  cursor: pointer;
  transition: .2s ease-in all;
`

export const OverlapError = styled.div`
  color: white;
`