import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Banner from "../components/banner"
import Card from '../components/card'
import { fetchCoffeeStores } from '../lib/coffee-stores'
import useTrackLocation from '../hooks/use-track-location'
import { useEffect, useState, useContext } from 'react'
import { ACTION_TYPE, StoreContext } from '../context/store-context'

// export async function getStaticProps(context) {
//   const coffeeStores = await fetchCoffeeStores();
  
//   return {
//     props: {
//       coffeeStores,
//     },
//   };
// }

export default function Home(props) {

  const { handleTrackLocation, locationErrorMsg, isLocating } = useTrackLocation()

  const { dispatch, state } = useContext(StoreContext);
  const { coffeeStores, latLong } = state;
 
  const handleUseEffect = async () => { 
    if(latLong) {
      try {
        const fetchedCoffeeStores = await fetchCoffeeStores(latLong);
        console.log("COFFEE", fetchedCoffeeStores)
        dispatch({
            type: ACTION_TYPE.SET_COFFEE_STORES,
            payload: { coffeeStores: fetchedCoffeeStores } 
        })

      } catch(err) {
        console.log(err)
      }
    }
  }

  useEffect( () => { handleUseEffect(); }, [latLong]);

  // console.log({latLong, locationErrorMsg})
  const handleOnBannerBtnClick = () => {
    console.log("Hello, I clicked");
    handleTrackLocation();
  }

  return (
    <div>
      <Head>
        <title>Coffee Square</title>
        <meta name="description" content="Find coffee shops near by." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Banner 
          buttonText={isLocating ? "Locating..." : "Locate stores"} 
          handleOnClick={handleOnBannerBtnClick}
        />

        {coffeeStores.length > 0 ? <div>
          <h4 className="mb-3">Coffee Stores</h4>
          <div className="row row-cols-1 row-cols-md-3 g-3">
            {coffeeStores.map((coffeeStore) => {
              return (
                <div key={coffeeStore.fsq_id} className="col">
                  <Card 
                    name={coffeeStore.name}
                    location={coffeeStore.location}
                    storePhoto={coffeeStore.imgUrl}
                    href={`/coffee-store/${coffeeStore.fsq_id}`}
                  />
                </div>
               )
            })}
            </div> 
          </div> : <p>Something went wrong</p>}
      </main>
      
    </div>
  )
} 
