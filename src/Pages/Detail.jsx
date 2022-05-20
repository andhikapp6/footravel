import React from "react";
import styles from "./Detail.module.css";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";
import Loading from "../Asset/Loading";
import {
  gql,
  useMutation,
  useSubscription,
} from "@apollo/client";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";



const getRestaurant = gql`
subscription MySubscription($_eq: Int ) {
  Restaurant(where: {id: {_eq: $_eq}}) {
    Description
    Harga_Rata_Rata
    Image_url
    Jenis_Makanan
    Lokasi_Restaurant
    Nama_Restaurant
    id
    id_User
    Category
    Comment_Users {
      Username
      id
      id_Restaurant
      Experience
    }
  }
}

`;


const insertComment = gql`
mutation MyMutation($Experience: String = "", $Username: String = "" , $id_Restaurant: Int ) {
  insert_Comment_User(objects: {Experience: $Experience, Username: $Username, id_Restaurant: $id_Restaurant}) {
    affected_rows
  }
}
`;

export default function Detail() {
  // useparams digunakan untuk mengambil data dari url
  const params = useParams();
  // params.id itu buat nyimpen parameter id yang ada di url halaman website
  const [id, setId] = useState(params.id);
  // comment berfungsi untuk mengambil data dari url
  // setcomment berfungsi untuk mengisi komen
  const [comment, setComment] = useState(1);


  const { data: dataRestaurant, loading: loadingRestaurant } = useSubscription(getRestaurant, {variables: {_eq: id}});

  const [insertComment_, { data: dataInsertComment, loading: loadingInsertComment, error: errorInserComment }
  ] = useMutation(insertComment);

  
  const handleSubmitComment = (e) => {
    e.preventDefault();
    insertComment_({
      // id_Restaurant didapat dari params.id
      variables: {
        id_Restaurant: id,
        Username: comment.Username,
        Experience: comment.Experience,
      },
    });
    setComment ({
      Username: "",
      Experience: "",
    });
      
    };
    // e.target.value inputan yang diisi
    const handleChangeComment = (e) => {
      setComment({
        ...comment,
        [e.target.name]: e.target.value,
      });      
    };
   
    // if (errorComment) return <p>Error {console.error(errorComment)}</p>;
    if (loadingRestaurant) {
      return (
      <div>
        <Loading />
      </div>
    );
  }
  console.log("dataRestaurant", dataRestaurant);
  // console.log("dataComment", dataComment)

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.containerDetail}>
        {dataRestaurant?.Restaurant.map((resto) => (
          <>
            <div className={styles.card}>
              <div className={styles.card_image}>
                <img
                  className={styles.cardImg}
                  src={resto.Image_url}
                  alt="restaurant"
                />
                <p className={styles.cardTitle}>{resto.Nama_Restaurant}</p>
                <p className={styles.cardText}>{resto.Jenis_Makanan}</p>
                <p className={styles.cardText}>{resto.Lokasi_Restaurant}</p>
                <p className={styles.Description}><span>Description</span></p>
                <p className={styles.cardDescription}>{resto.Description}</p>
                <p className={styles.cardHarga}>{resto.Harga_Rata_Rata}</p>
                <p className={styles.Review}><span>Review</span></p>
              </div>
            </div>
        <div className={styles.comment}>
          {resto.Comment_Users.map((comment) => (
            <>
              <div className={styles.card}>
                <div className={styles.comentName}>{comment.Username} </div>
                <div className={styles.coment}>{comment.Experience}</div>
              </div>             
            </>
          ))}
        </div>
          </>
        ))}

        
        <div className={styles.commentForm}>
          <form className={styles.form} onSubmit={handleSubmitComment}>
              <input type="text" placeholder="Name..." className={styles.commentFormNama} onChange={handleChangeComment} value={comment.Username} name="Username" />
                <textarea id=""placeholder="Describe your Experience" className={styles.commentFormText} onChange={handleChangeComment} value={comment.Experience} name="Experience" />
                  <div className={styles.commentFormButton}>
                    <button className={styles.commentButton}>Submit</button>
                  </div>
          </form>
        </div>


        {/* <form action="" onSubmit={handleSubmitComment}>
            <input type="text" placeholder='Name...' className='d-block mb-3 inputComment'  onChange={handleChangeComment}/>
                <textarea id="" cols="30" rows="10" placeholder='Describe your Experience...' className='inputComment typeComment' onChange={handleChangeComment} ></textarea>
                    <div className='m-2 d-flex justify-content-end'>
                        <button className="btn buttonComment">Submit</button>
                    </div>
          </form> */}
          

        </div>
        <Footer />
      </div>
    </>
  );
}
