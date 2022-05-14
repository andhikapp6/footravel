import React from "react";
import styles from "./Detail.module.css";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";
import {
  gql,
  useQuery,
  useLazyQuery,
  useMutation,
  useSubscription,
} from "@apollo/client";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

const getRestaurant = gql`
  query MyQuery($id: Int) {
    Restaurant(where: { id: { _eq: $id } }) {
      id
      Image_url
      Nama_Restaurant
      Jenis_Makanan
      Lokasi_Restaurant
      Harga_Rata_Rata
      Description
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

const getComment = gql`
  query MyQuery($_eq: Int) {
    User_Comment(where: { id_restaurant: { _eq: $_eq } }) {
      id_restaurant
      id
      Username
      Experience
    }
  }
`;

const insertComment = gql`
  mutation MyMutation(
    $id_restaurant: Int
    $Username: String
    $Experience: String
  ) {
    insert_User_Comment(
      objects: {
        id_restaurant: $id_restaurant
        Username: $Username
        Experience: $Experience
      }
    ) {
      affected_rows
    }
  }
`;

export default function Detail() {
  const params = useParams();
  const [id, setId] = useState(params.id);
  console.log("id", id);

  const [
    getDetailRestaurant,
    { data: dataRestaurant, loading: loadingRestaurant },
  ] = useLazyQuery(getRestaurant);
  const [
    getUserComment,
    { data: dataUserComment, loading: loadingUserComment },
  ] = useMutation(getUser);
  const [getComment, { data: dataComment, loading: loadingComment }] =
    useMutation(getComment);

  // console.log("dataRestaurant", dataRestaurant);
  // const [getUser, { data: dataUser, loading: loadingUser }] = useLazyQuery(getUser);

  useEffect(() => {
    console.log("id", id);
    getDetailRestaurant({ variables: { id: id } });
    if (loadingRestaurant) {
      return <div>Loading...</div>;
    }
    getComment([{ variables: { id_restaurant: id } }]);
  }, []);
  console.log("dataRestaurant", dataRestaurant);

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        {dataRestaurant?.Restaurant.map((resto) => (
          <>
            <div className={styles.card}>
              <div className={styles.card_image}>
                <img
                  className={styles.cardImg}
                  src={resto.Image_url}
                  alt="restaurant"
                />
                <h5 className={styles.cardTitle}>{resto.Nama_Restaurant}</h5>
                <p className={styles.cardText}>{resto.Jenis_Makanan}</p>
                <p className={styles.cardText}>{resto.Lokasi_Restaurant}</p>
                <p className={styles.cardText}>{resto.Harga_Rata_Rata}</p>
                <p className={styles.cardText}>{resto.Description}</p>
              </div>
            </div>
          </>
        ))}

        <div className={styles.comment}>
          {dataComment?.Comment.map((coment) => (
            <>
              <div className={styles.card}>
                <div className={styles.comment}>{coment.Username} </div>
                <div className={styles.comment}>{coment.Experience}</div>
              </div>
              
            </>
          ))}
        </div>

        <Footer />
      </div>
    </>
  );
}
