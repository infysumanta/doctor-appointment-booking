import React, { useEffect } from "react";
import Layout from "../components/Layout";
const Home = () => {
  // const getData = async () => {
  //   try {
  //     const response = await axios.post(
  //       "/api/user/get-user-info-by-id",
  //       {},
  //       {
  //         headers: {
  //           Authorization: "Bearer " + localStorage.getItem("token"),
  //         },
  //       }
  //     );

  //     console.log(response.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   getData();
  // }, []);

  return (
    <Layout>
      <h1>HomePage</h1>
    </Layout>
  );
};

export default Home;
