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
  
  const  { data: dataComment, loading: loadingComment }
   = useLazyQuery(getComment);
   console.log("dataComment", dataComment)
    
  // const [
  //   getUserComment,
  //   { data: dataUserComment, loading: loadingUserComment },
  // ] = useMutation(getUser);
  

    const handleSubmitComment = (e) => {
      e.preventDefault();
      const id_restaurant = id;
      const Username = document.getElementById("Username").value;
      const Experience = document.getElementById("Experience").value;
      getComment({ variables: { id_restaurant, Username, Experience } });
    };

    const handleChangeComment = (e) => {
      setId(e.target.value);
    };
    
  
  // console.log("dataRestaurant", dataRestaurant);
  // const [getUser, { data: dataUser, loading: loadingUser }] = useLazyQuery(getUser);

  useEffect(() => {
    console.log("id", id);
    getDetailRestaurant({ variables: { id: id } });
    if (loadingRestaurant) {
      return <div>Loading...</div>;
    }
    // getComment({ variables: { id_restaurant: id } });
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
          {dataComment?.Comment.map((comment) => (
            <>
              <div className={styles.card}>
                <div className={styles.coment}>{comment.Username} </div>
                <div className={styles.coment}>{comment.Experience}</div>
              </div>             
            </>
          ))}
        </div>

        {/* <form action="" onSubmit={handleSubmitComment}>
            <input type="text" placeholder='Name...' className='d-block mb-3 inputComment' value={dataComment.Username} name="Username" onChange={handleChangeComment}/>
                <textarea id="" cols="30" rows="10" placeholder='Describe your Experience...' className='inputComment typeComment' value={dataComment.Experience} name="Experience" onChange={handleChangeComment} ></textarea>
                    <div className='m-2 d-flex justify-content-end'>
                        <button className="btn buttonComment">Submit</button>
                    </div>
          </form> */}

        <Footer />
      </div>
    </>
  );
}
