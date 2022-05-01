import { gql } from '@apollo/client'

export const Restaurant = gql`
query MyQuery {
    Restaurant {
      id_User
      id
      Nama_Restaurant
      Lokasi_Restaurant
      Jenis_Makanan
      Image_url
      Harga_Rata_Rata
    }
  }`;

    export const User = gql`
query MyQuery {
        Restaurant
        User {
          id
          Username
          Experience
        }
        }`;
      