import Head from "next/head";
import styles from "../styles/Home.module.css";
import Banner from "../components/banner";
import Card from "../components/card";
import { fetchCoffeeStores } from "../lib/coffee-stores";
import useTrackLocation from "../hooks/use-track-location";
import { useEffect, useState, useContext } from "react";
import { ACTION_TYPE, StoreContext } from "../context/store-context";

export async function getStaticProps(context) {
  const coffeeStores = await fetchCoffeeStores();

  return {
    props: {
      coffeeStores,
    },
  };
}

export default function Home(props) {
  const { handleTrackLocation, locationErrorMsg, isLocating } =
    useTrackLocation();

  const { dispatch, state } = useContext(StoreContext);
  const { coffeeStores, latLong } = state;

  async function handleUseEffect() {
    if (latLong) {
      try {
        // const fetchedCoffeeStores = await fetchCoffeeStores(latLong);

        const response = await fetch(
          `api/getCoffeeStoresByLocation?latLong=${latLong}&limit=15`
        );
        const coffeeStores = await response.json();

        dispatch({
          type: ACTION_TYPE.SET_COFFEE_STORES,
          payload: { coffeeStores },
        });

        console.log("PAYLOAD: ", coffeeStores);
      } catch (err) {
        console.log(err);
      }
    }
  }

  useEffect(() => {
    handleUseEffect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [latLong]);

  // console.log({latLong, locationErrorMsg})
  const handleOnBannerBtnClick = () => {
    handleTrackLocation();
  };

  return (
    <div>
      <Head>
        <title>Coffee Square</title>
        <meta name="description" content="Find coffee shops near by." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Banner
          buttonText={`${
            isLocating ? "Locating..." : "Locate Nearby Coffee Stores"
          }`}
          handleOnClick={handleOnBannerBtnClick}
        />

        {coffeeStores.length > 0 && (
          <div>
            <h4 className="mb-3">Nearby Coffee Stores</h4>
            <div className="row row-cols-1 row-cols-md-3 g-3">
              {coffeeStores.map((coffeeStore) => {
                return (
                  <div key={coffeeStore.fsq_id} className="col">
                    <Card
                      name={coffeeStore.name}
                      location={coffeeStore.location}
                      storePhoto={coffeeStore.imgUrl}
                      distance={coffeeStore.distance}
                      href={`/coffee-store/${coffeeStore.fsq_id}`}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {props.coffeeStores.length > 0 && (
          <div className="mt-5">
            <h4 className="mb-3">Coffee Stores (Times Square)</h4>
            <div className="row row-cols-1 row-cols-md-3 g-3">
              {props.coffeeStores.map((coffeeStore) => {
                return (
                  <div key={coffeeStore.fsq_id} className="col">
                    <Card
                      name={coffeeStore.name}
                      location={coffeeStore.location}
                      storePhoto={coffeeStore.imgUrl}
                      distance={coffeeStore.distance}
                      href={`/coffee-store/${coffeeStore.fsq_id}`}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
