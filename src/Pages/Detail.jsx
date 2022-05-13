import React from "react";
import styles from "./Detail.module.css";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";
import { gql, useQuery, useLazyQuery, useMutation, useSubscription } from "@apollo/client";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

const getRestaurant = gql`
query MyQuery($id: int ) {
  Restaurant(where: {id: {_eq: $id}}) {
    id
    Image_url
    Nama_Restaurant
    Jenis_Makanan
    Lokasi_Restaurant
    Harga_Rata_Rata
  }
}
`;

const getUser = gql`
  query MyQuery {
    User_Comment {
      id
      Username
      Experience
    }
  }
`;

export default function Detail() {

  const params = useParams();
  const [id, setId] = useState(params.id);
  console.log("id",id)
  
  const [getDetailRestaurant, { data: dataRestaurant, loading: loadingRestaurant}] = useLazyQuery(getRestaurant);
  // console.log("dataRestaurant", dataRestaurant);
  // const [getUser, { data: dataUser, loading: loadingUser }] = useLazyQuery(getUser);

  useEffect (() =>{
    getDetailRestaurant({variables: {id : id}});
  },[])
  console.log("dataRestaurant", dataRestaurant);

  


  return (
    <>
      <Navbar />
      <div className={styles.container}>
      {dataRestaurant?.restoran.map((resto)=> (
      <>
        <div className={styles.card}>
          <div className={styles.card_image}>
            <img src={dataRestaurant.Restaurant.Image_url} alt="restaurant" />
            <h5 className={styles.cardTitle}>{resto.Nama_Restaurant}</h5>
            <p className={styles.cardText}>{resto.Jenis_Makanan}</p>
            <p className={styles.cardText}>{resto.Lokasi_Restaurant}</p>
          </div>
        </div>
      </>
      ))}
      </div>

      <Footer />
    </>
  );
}
