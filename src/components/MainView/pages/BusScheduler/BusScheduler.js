import React, { useRef, useState, useEffect } from "react";
import * as s from "./BusScheduler.styles";

const BusScheduler = () => {
    //* STATE
    const [tripsData, setTripsData] = useState( [
        { "id": 1, "startTime": 30, "endTime": 150 },
        { "id": 2, "startTime": 180, "endTime": 300 },
        { "id": 3, "startTime": 330, "endTime": 450 },
        { "id": 4, "startTime": 40, "endTime": 130 },
        { "id": 55, "startTime": 160, "endTime": 250 },
        { "id": 66, "startTime": 280, "endTime": 370 },
        { "id": 77, "startTime": 400, "endTime": 490 },
        { "id": 88, "startTime": 80, "endTime": 240 },
        { "id": 99, "startTime": 280, "endTime": 430 }
    ]);
    const [busTripsObj, setbusTripsObj] = useState({});
    const [originalNumberOfBuses, setOriginalNumberOfBuses] = useState(null);
    const [areTripsOverlapping, setAreTripsOverlapping] = useState(false);
    const [haveError, setHaveError] = useState(false);
    const [selectedTrip, setSelectedTrip] = useState(null);

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
                console.log(json);
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

        const maxTripValue = Math.max.apply(Math, tripsData.map(function(o) { return o.endTime; }));
        const minTripValue = Math.min.apply(Math, tripsData.map(function(o) { return o.startTime; }));

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

    const tripItemsElement = Object.keys(busTripsObj).map((bus, index) => {

        let tripsObj = busTripsObj[bus];
        let singleTrip = Object.keys(tripsObj).map(trips => {
            let trip = tripsObj[trips];
            if(trip){
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

        return (
                <s.Bus key={index}
                       busId={index}
                       id={+`${index +1}`}
                       onClick={() => addSelectedToBus(+`${index +1}`)}
                >bus:{index +1}
                    {singleTrip}
                </s.Bus>
        )

    });

    return (
        <>
            <s.TripsContainer>
                <s.TripsTitle>
                    Bus Scheduler
                </s.TripsTitle>
                <s.TripContentItems>
                    {tripItemsElement}
                    {areTripsOverlapping && <s.OverlapError>oops, those trips overlap</s.OverlapError>}
                </s.TripContentItems>
            </s.TripsContainer>
        </>
    );
};

export default BusScheduler;