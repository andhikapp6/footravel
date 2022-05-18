import React from "react";
import styles from "./Detail.module.css";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";
import {
  gql,
  useQuery,
  useLazyQuery,
  useMutation,
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

// const getComment = gql`
// query MyQuery($id: Int) {
//   User_Comment(where: {id: {_eq: $id}}) {
//     Experience
//     Username
//     id
//     id_Comment
//   }
// }
// `;

const getComment = gql`
query MyQuery {
  User_Comment {
    id
    id_Comment
    Experience
    Username
  }
}
`;

const insertComment = gql`
mutation MyMutation($id: Int, $Username: String  , $Experience: String ) {
  insert_User_Comment(objects: {id: $id, Username: $Username, Experience: $Experience}) {
    affected_rows
    returning {
      id_Comment
      Username
      Experience
      id
    }
  }
}
`;

export default function Detail() {
  const params = useParams();
  const [id, setId] = useState(params.id);
  const [comment, setComment] = useState(1);


  const [
    getDetailRestaurant,
    { data: dataRestaurant, loading: loadingRestaurant },
  ] = useLazyQuery(getRestaurant);
  
  const { data: dataComment, loading: loadingComment } = useQuery(getComment );
  
  const [insertComment_, { data: dataInsertComment, loading: loadingInsertComment }
  ] = useMutation(insertComment);
    
    const handleSubmitComment = (e) => {
      e.preventDefault();
      insertComment_({
        variables: {
          id: id,
          Username: comment.Username,
          Experience: comment.Experience,
        },
      });
      setComment ({
        Username: "",
        Experience: "",
      });
      
    };
    
    const handleChangeComment = (e) => {
      setComment({
        ...comment,
        [e.target.name]: e.target.value,
      });
      
    };
  
    // fungsi useEffect untuk mengambil data restaurant

  useEffect(() => {
    console.log("id", id);
    // variable id diisi dengan id yang dikirim dari url
    getDetailRestaurant({ variables: { id: id } });
    if (loadingRestaurant) {
      return <div>Loading...</div>;
    }
    // fungsi useEffect untuk mengambil data comment
    // getComment_({ variables: { id: id } });
  }, []);
  console.log("id2", id);   
  console.log("dataRestaurant", dataRestaurant);
  console.log("dataComment", dataComment)

  
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
                <p className={styles.cardHarga}>{resto.Harga_Rata_Rata}</p>
                <p className={styles.cardDescription}>{resto.Description}</p>
              </div>
            </div>
          </>
        ))}

        <div className={styles.comment}>
          {dataComment?.User_Comment.map((comment) => (
            <>
              <div className={styles.card}>
                <div className={styles.comentName}>{comment.Username} </div>
                <div className={styles.coment}>{comment.Experience}</div>
              </div>             
            </>
          ))}
        </div>
        
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
