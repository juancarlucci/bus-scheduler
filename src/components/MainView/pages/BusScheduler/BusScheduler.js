import React, { useRef, useState, useEffect } from "react";
import * as s from "./BusScheduler.styles";

const BusScheduler = () => {
    //* STATE
    const [tripsData, setTripsData] = useState( [
        { "id": 1, "startTime": 30, "endTime": 150 },
        { "id": 2, "startTime": 180, "endTime": 300 },
        { "id": 3, "startTime": 330, "endTime": 450 },
        { "id": 4, "startTime": 40, "endTime": 130 },
        { "id": 5, "startTime": 160, "endTime": 250 },
        { "id": 6, "startTime": 280, "endTime": 370 },
        { "id": 7, "startTime": 400, "endTime": 490 },
        { "id": 8, "startTime": 80, "endTime": 240 },
        { "id": 9, "startTime": 280, "endTime": 430 }
    ]);
    const [busTripsObj, setbusTripsObj] = useState({});
    const [originalNumberOfBuses, setOriginalNumberOfBuses] = useState(null);
    const [areTripsOverlapping, setAreTripsOverlapping] = useState(false);
    const [haveError, setHaveError] = useState(false);
    const [selectedTrip, setSelectedTrip] = useState(null);
    const [allBusTripsMinArray, setAllBusTripsMinArray] = useState([]);
    const [allBusTripsMaxArray, setAllBusTripsMaxArray] = useState([]);

    const handleTripItemClick = (e, tripId) => {
        e.stopPropagation();

        if(tripId === selectedTrip){
            setSelectedTrip(false);
        } else {
            setSelectedTrip(tripId);
        }
    };

    useEffect(() => {

        fetch('./data/bus-scheduling-input.json'
            ,{
                headers : {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }
        )
            .then(function(response){
                return response.json();
            })
            .then(function(json) {
                setTripsData(json);
            })
            .catch(error => {
                setHaveError({ errorMessage: error.toString() });
                console.error('There was an error loading data!', error);
            });

        let tempArr = [];

        const allTrips = tripsData.map((trip, index)=>{

            let inx = index += 1;
            setOriginalNumberOfBuses(inx);
            return busTripsObj[inx] = {[trip.id]:trip};
        });

        const minTripsValue = Math.min.apply(Math, tripsData.map((o) => { return o.startTime; }));
        const maxTripsValue = Math.max.apply(Math, tripsData.map((o) => { return o.endTime; }));
        setAllBusTripsMinArray(minTripsValue);
        setAllBusTripsMaxArray(maxTripsValue);
        setbusTripsObj(busTripsObj);
    }, []);

    useEffect(()=>{
        appendEmptyBusToBusTripsObj();
    }, [selectedTrip]);

    const appendEmptyBusToBusTripsObj = () => {

        let lastKey = Object.keys(busTripsObj).length;
        //* Checks if a trip is selected and last bus not empty
        if(selectedTrip && Object.keys(busTripsObj[lastKey]).length > 0){
            removeLastEmptyBus();
            let updatedIndex = Object.keys(busTripsObj).length +1;
            const tempCopy = {...busTripsObj};
            tempCopy[updatedIndex] = {};
            setbusTripsObj(tempCopy);

        }

    };

    const removeLastEmptyBus = () => {
        let lastKey = Object.keys(busTripsObj).length;
        const tempCopy = {...busTripsObj};
        //* Removes last empty bus as long as it is not a bus from original list of buses from data
        if(Object.entries(tempCopy[lastKey]).length === 0 && lastKey > originalNumberOfBuses){
            delete tempCopy[lastKey];
        }
        setbusTripsObj(tempCopy);

    }

    const addSelectedToBus = ( busId) => {
        if(selectedTrip){
            //* GET selectedTrip to be added to the selected bus
            const tripToAdd = tripsData.filter((item) => item.id === selectedTrip)[0];

            //* Checks overlap between selected tripToAdd trip and existing trips in that bus
            for (const trip in busTripsObj[busId]){
                let tripToAddStarTime = tripToAdd.startTime;
                let tripToAddEndTime = tripToAdd.endTime;
                let existingTrips = busTripsObj[busId][trip];
                if(existingTrips !== undefined && existingTrips.startTime){
                    if(     tripToAddStarTime < existingTrips.startTime
                        &&  tripToAddEndTime < existingTrips.endTime
                        &&  tripToAddEndTime < existingTrips.startTime
                        ||  tripToAddStarTime > existingTrips.endTime ){
                        //* OK to add
                        setAreTripsOverlapping(false);
                    } else {
                        setAreTripsOverlapping(true);
                        return;
                    }
                }


            }

            //* REMOVE the trip from old bus
            let remove = Object.entries(busTripsObj).map(([bus, trips], index)=> {
                if(trips[selectedTrip]){
                    delete trips[selectedTrip];
                }
            });

            const tripsToUpdate = {...busTripsObj}; // creates a copy of the trips object

            //* ADD trip to selected Bus
            tripsToUpdate[busId][selectedTrip] = tripToAdd;

            //* Update Bus object
            setbusTripsObj(tripsToUpdate);

            //* Deselect selectedTrip
            setSelectedTrip(false);

            //* Remove last bus if empty
            removeLastEmptyBus();
        }

    };

    const generateUUID = () => {
        let d = new Date().getTime();
        let uuid = 'xxxxxxxx-AAGxxx-Dxxx-Axxx-Nxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            let r = (d + Math.random() * 5) % 5 | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return uuid;
    }

    const ticmarkCreator = (left, right, parts) => {
        //* adapted from https://stackoverflow.com/questions/51250608/split-a-dynamic-range-into-equal-parts-using-js
            let result = [],
                delta = Math.floor((right - left) / (parts));
            while (left < right) {
                result.push(left);
                left += delta;
            }
            result.push(right);
            return result;
        };
    const tickmarks = ticmarkCreator(0, allBusTripsMaxArray, 5);
    const tickMarkElements = tickmarks.map((tick)=> {
        let mins = Math.floor(tick/60);
        let hrs = mins.toFixed(2);
        let spl = hrs.split('.');
        hrs = spl.join(':');

        return (
            <s.ContentTickMark key={tick} tick={tick}><span>{hrs}</span></s.ContentTickMark>
        )
    });

    let currentIndex = 0;
    const BusItemsElements = Object.keys(busTripsObj).map((bus, index) => {

        currentIndex = index;
        const busTripsEndTimeArray = [];
        const busTripsStartTimeArray = [];

        const tripsObj = busTripsObj[bus];
        let singleTrip = Object.keys(tripsObj).map(trips => {

            let trip = tripsObj[trips];

            if(trip){

                busTripsEndTimeArray.push(trip.endTime);
                busTripsStartTimeArray.push(trip.startTime);
                const isTripSelected = selectedTrip === trip.id;
                return (<s.Trip
                    key={trip.id}
                    id={trip.id}
                    startTime={trip.startTime}
                    endTime={trip.endTime}
                    selectedTrip={isTripSelected}
                    onClick={(e) => {handleTripItemClick(e, trip.id);}}
                >{trip.id}</s.Trip>);

            }

        });

        const sortedMin = busTripsStartTimeArray.sort((a, b) => a - b)[0];
        const sortedMax = busTripsEndTimeArray.sort((a, b) => b - a)[0];

        const busLeftBar = <s.BusLeftBarItems key={generateUUID()}>
            <h3>Bus {index +1}</h3>
            <s.BusMinMaxTripTime>
                <p>{sortedMin} - {sortedMax}</p>
            </s.BusMinMaxTripTime>
        </s.BusLeftBarItems>

        const tripElements = (
                <s.Bus key={index}
                       busId={index}
                       id={+`${index +1}`}
                       onClick={() => addSelectedToBus(+`${index +1}`)}
                >
                    {singleTrip}
                </s.Bus>
        )
        return ( <s.BusWrapper key={generateUUID()}>
                        <s.BusLeftBar>{busLeftBar}</s.BusLeftBar>
                        <s.BusRightBar>
                            {tripElements}
                        </s.BusRightBar>
                    </s.BusWrapper>
                )

    });

    return (
            <s.SchedulerContainer>
                <s.SchedulerTitle>
                    Bus Scheduler
                    <s.SchedulerDescription>
                        <p>Each row represents a bus on the 38 Geary bus line in San Francisco.</p>
                        <p>Please click on the white boxes. Each box is a trip, and can be moved from bus to bus.</p>
                        <p>To move a trip just select it and then click on the row of the new bus.</p>
                        <p>If the data changes, for example if trips are added that are later in the day,</p>
                        <p>the tick marks and time will update to reflect the new data range.</p>
                    </s.SchedulerDescription>
                </s.SchedulerTitle>
                <s.SchedulerContent index={currentIndex} width={allBusTripsMaxArray}>
                    {tickMarkElements}
                    {BusItemsElements}
                    {areTripsOverlapping && <s.OverlapError>Oops, those trips overlap.</s.OverlapError>}
                </s.SchedulerContent>
            </s.SchedulerContainer>
    );
};

export default BusScheduler;