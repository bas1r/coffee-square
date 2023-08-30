import Link from "next/link";
import { useRouter } from "next/router";
import { fetchCoffeeStores } from "../../lib/coffee-stores";
import { StoreContext } from "../../context/store-context";
import { useContext, useEffect, useState } from "react";
import { isEmpty } from "../../utils"


export async function getStaticProps(staticProps) {
    const params = staticProps.params;
    
    // const { dispatch, state } = useContext(StoreContext);
    // const { latLong } = state;
    //console.log("LATLONG: ", latLong) 
    //console.log(coffeeStores)

    const coffeeStores = await fetchCoffeeStores();
    const findCoffeeStoreById = coffeeStores.find((coffeeStore) => {
            return coffeeStore.fsq_id.toString() === params.id;
    });

    return {
        props: {
            coffeeStore: findCoffeeStoreById ? findCoffeeStoreById : {}
        }
    }
}

export async function getStaticPaths() {
    const coffeeStores = await fetchCoffeeStores();
    const paths = coffeeStores.map((coffeeStore) => {
        return {
            params: {
                id: coffeeStore.fsq_id.toString()
            }
        }
    });

    return {
        paths,
        fallback: true,
    };
}

const CoffeStore = (props) => {
    const router = useRouter();
    const { id } = router.query
    
    if (router.isFallback) {
        return <div>Loading...</div>
    } 
    
    const [coffeeStore, setCoffeeStore] = useState(props.coffeeStore);
    
    const { state: { coffeeStores }, } = useContext(StoreContext);

    const handleCreateCoffeeStore = async (coffeeStore) => {
        try {
            // const { id, name, categories, distance, imgUrl, address, geoCode, voting } = coffeeStore;
            const {fsq_id, name, categories, distance, location, imgUrl, geocodes } = coffeeStore;
            const response = await fetch("http://localhost:3000/api/createCoffeeStore", {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    id: fsq_id,
                    name,
                    distance,
                    address: location.formatted_address,
                    imgUrl,
                    voting: 0,

                }),
            });

            const dbCoffeeStore = await response.json()
            console.log("DB", { dbCoffeeStore })
        } catch (err) {
            console.error("Error creating coffee store", err)
        }
    };

    // console.log('Context', coffeeStores)
    // console.log('StaticPROPS', props.coffeeStore)
    // console.log('isEmpty', !isEmpty(props.coffeeStore))

    useEffect(() => {
        if (!isEmpty(props.coffeeStore)) {
            if (coffeeStores.length > 0) {
                const coffeeStoreById = coffeeStores.find((coffeeStore) => {
                    return coffeeStore.fsq_id.toString() === id;
                });

                if (findCoffeeStoreById) {
                    setCoffeeStore(findCoffeeStoreById);
                    handleCreateCoffeeStore(findCoffeeStoreById);

                }
            }
        }
    }, [id]);

    const { name, categories, distance, location, imgUrl, geocodes } = coffeeStore
    return <>
    <main>

        <Link href="/">
            <div type="button" className="btn btn-link link-dark p-0 mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-arrow-left-short" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"/>
                </svg>
                
                Go back
            </div>
        </Link>
       
        <div className="card mb-3">
            <div className="row g-0">
          <div className="col-md-4">
            <img src={imgUrl} className="img-fluid" alt="..." />
          </div> 
          <div className="col-md-8">
            <div className="card-body">
                <h3 className="card-title">{name}</h3> 

                {categories.map(category => {
                    return <span key={category.name} className="badge rounded-pill text-bg-dark text-dark mb-2">{`${category.name}`}</span>
                })}    
                <span className="badge rounded-pill text-bg-dark">Dark</span> 

                <p className="card-text d-flex align-items-center py-3'"> 
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-geo-fill m-1" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M4 4a4 4 0 1 1 4.5 3.969V13.5a.5.5 0 0 1-1 0V7.97A4 4 0 0 1 4 3.999zm2.493 8.574a.5.5 0 0 1-.411.575c-.712.118-1.28.295-1.655.493a1.319 1.319 0 0 0-.37.265.301.301 0 0 0-.057.09V14l.002.008a.147.147 0 0 0 .016.033.617.617 0 0 0 .145.15c.165.13.435.27.813.395.751.25 1.82.414 3.024.414s2.273-.163 3.024-.414c.378-.126.648-.265.813-.395a.619.619 0 0 0 .146-.15.148.148 0 0 0 .015-.033L12 14v-.004a.301.301 0 0 0-.057-.09 1.318 1.318 0 0 0-.37-.264c-.376-.198-.943-.375-1.655-.493a.5.5 0 1 1 .164-.986c.77.127 1.452.328 1.957.594C12.5 13 13 13.4 13 14c0 .426-.26.752-.544.977-.29.228-.68.413-1.116.558-.878.293-2.059.465-3.34.465-1.281 0-2.462-.172-3.34-.465-.436-.145-.826-.33-1.116-.558C3.26 14.752 3 14.426 3 14c0-.599.5-1 .961-1.243.505-.266 1.187-.467 1.957-.594a.5.5 0 0 1 .575.411z" />
                    </svg> 
                    {location.formatted_address}
                </p>

                <div className='my-4'>
                <button type="button" className="btn btn-dark rounded-pill">
                    Upvote <span className="badge text-bg-primary">4</span>
                </button>
                </div>
                {/* <a href="button" className="btn btn-secondary btn-sm rounded-pill mx-2">Direction</a> */}
                <p className="card-text text-muted"><small className="text-body-secondary">Distance ({distance} Meters)</small></p>     

            </div>
          </div>
                <iframe src={`http://maps.google.com/maps?q=loc:${geocodes.main.latitude}+${geocodes.main.longitude}&z=15&output=embed`}></iframe>
        </div>
        </div> 

    </main>
    </>
}

export default CoffeStore;