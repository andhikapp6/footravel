import React from "react";
import styles from "./Home.module.css";
import Footer from "../component/Footer";
import Navbar from "../component/Navbar";
import sticker from "../Asset/sticker.png";
import { gql, useQuery } from "@apollo/client";
import { Link } from 'react-router-dom';

const GetRestaurantRecommendation = gql`
  query MyQuery {
    Restaurant(where: { Category: { _eq: "recommendation" } }) {
      id
      Image_url
      Nama_Restaurant
      Jenis_Makanan
      Lokasi_Restaurant
    }
  }
`;

const GetRestaurantAround = gql`
  query MyQuery {
    Restaurant(where: { Category: { _eq: "around" } }) {
      id
      Image_url
      Nama_Restaurant
      Jenis_Makanan
      Lokasi_Restaurant
    }
  }
`;
export default function Home() {
  const {
    data: dataQuery,
    loading: loadingQuery,
    error: error,
  } = useQuery(GetRestaurantRecommendation);
  const {
    data: dataQueryaround,
    loading: loadingQueryaround,
    error: erroraround,
  } = useQuery(GetRestaurantAround);

  if (loadingQuery) {
    return <div>Loading...</div>;
  }
  if (loadingQueryaround) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error...</div>;
  }
  if (erroraround) {
    return <div>Error...</div>;
  }

  return (
    <>
      <Navbar />
      <header>
        <div className={styles.containerHeader}>
          <div className="rowHeader">
            <div className="col-md-12">
              <div className={styles.headerTitle}>
                <div>
                  <h1>Footravel</h1>
                  <h2>
                    Find Your Best <br /> Restaurant From Here
                  </h2>
                </div>
                <img src={sticker} alt="sticker" />
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container">
        <div className="row">
          <div className={styles.recommendation}>Our Recommendation</div>
          {dataQuery.Restaurant.map((recommendation) => (
            <div className="col-md-4">
              <div className={styles.card}>
                <img src={recommendation.Image_url} className="card-img-top" alt="..." />
                <div className={styles.cardBody}>
                  <h5 className={styles.cardTitle}>{recommendation.Nama_Restaurant}</h5>
                  <p className={styles.cardText}>{recommendation.Jenis_Makanan}</p>
                  <p className={styles.cardText}>{recommendation.Lokasi_Restaurant}</p>
                  <div className='text-center'>
                  <Link to={`/Detail/${recommendation.id}`} className="btn text-center" id='btn-details'>view detail</Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>


      <div className="container">
        <div className="row">
          <div className={styles.around}>Around Jakarta</div>
          {dataQueryaround.Restaurant.map((around) => (
            <div className="col-md-4">
              <div className={styles.card}>
                <img src={around.Image_url} className="card-img-top" alt="..." />
                <div className={styles.cardBody}>
                  <h5 className={styles.cardTitle}>{around.Nama_Restaurant}</h5>
                  <p className={styles.cardText}>{around.Jenis_Makanan}</p>
                  <p className={styles.cardText}>{around.Lokasi_Restaurant}</p>
                  <Link to={`/rekomendasi/${around.Nama_Restaurant}`} className={styles.button}>view detail</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

     
      <Footer />
    </>
  );
}
