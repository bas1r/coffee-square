import { useContext, useState } from "react"
import { ACTION_TYPE, StoreContext } from '../context/store-context'

const useTrackLocation = () => {
    const [locationErrorMsg, setLocationErrorMsg] = useState("");
    // const [latLong, setLatlong] = useState("");
    const [isLocating, setIsLocating] = useState(false)
    
    const { dispatch } = useContext(StoreContext);

    const success = (position) => {
        const latitude  = position.coords.latitude;
        const longitude = position.coords.longitude;
        
        dispatch({
            type: ACTION_TYPE.SET_LAT_LONG,
            payload: { latLong: `${latitude},${longitude}`}
        })
        // setLatlong(`${latitude},${longitude}`)
        setLocationErrorMsg("")
        setIsLocating(false)
    };

    const error = () => {
       setLocationErrorMsg('Unable to retrieve your location') 
       setIsLocating(false)
    }

    const handleTrackLocation = () => {
        setIsLocating(true)
        if(!navigator.geolocation) {
            setLocationErrorMsg('Geolocation is not supported by your browser');
            setIsLocating(false)
        } else {
            // status.textContent = 'Locating…';
            navigator.geolocation.getCurrentPosition(success, error);
            console.log("Sucess")
        }
    }

    return {
        // latLong,
        handleTrackLocation,
        locationErrorMsg,
        isLocating
    }
}
export default useTrackLocation;