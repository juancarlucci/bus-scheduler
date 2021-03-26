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

        appendEmptyBusToBusTripsObj();
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
            return busTripsObj[inx] = {[trip.id]:trip};
        });

        setbusTripsObj(busTripsObj);
    }, []);

    const appendEmptyBusToBusTripsObj = () => {

        if(selectedTrip){
            console.log("appendEmptyBusToBusTripsObj()");
            // console.log("last", Object.keys(busTripsObj).length);
            let updatedIndex = Object.keys(busTripsObj).length +1;
            busTripsObj[updatedIndex] = {};
            const tempCopy = {...busTripsObj};
            setbusTripsObj(tempCopy);
        }
    };

    const removeLastEmptyBus = () => {
        let lastKey = Object.keys(busTripsObj).length;
        let lastBusNonSelected = busTripsObj[Object.keys(busTripsObj)[Object.keys(busTripsObj).length - 1]]
        const tempCopy = {...busTripsObj};
        if (Object.entries(lastBusNonSelected).length === 0 || lastBusNonSelected === false ) {
            //Remove empty last Bus
            delete Object.keys(tempCopy)[Object.keys(tempCopy).length - 1];
        }
        setbusTripsObj(tempCopy);
    }

    const addSelectedToBus = ( busId) => {

        //* GET selectedTrip to be added to the selected bus
        const tripToAdd = tripsData.filter((item) => item.id === selectedTrip)[0];

        //* Checks overlap between selected tripToAdd trip and existing trips in that bus
        for (const trip in busTripsObj[busId]){
            // console.log("tripToAdd", tripToAdd);
            let tripToAddStarTime = tripToAdd.startTime;
            let tripToAddEndTime = tripToAdd.endTime;
            let existingTrips = busTripsObj[busId][trip];
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
                <s.TripContentItems>
                    {tripItemsElement}
                    {areTripsOverlapping && <s.OverlapError>oops, those trips overlap</s.OverlapError>}
                </s.TripContentItems>
            </s.TripsContainer>

        </>
    );
};

export default BusScheduler;