import React, { useEffect, useState } from "react";
import MainLayout from "../components/MainLayout";
import "../assets/styles/Package.css";
import axios from "axios";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjcyYTAwMGU5ZWVhMDZhNzg5OWY0NWQ4IiwiaWF0IjoxNzMxNTYyMTM2LCJleHAiOjE3MzE2NDg1MzZ9.rWEVlFkpCuK9mNxTup6gQkMUkwvmeu3YBpmIoj93rd8";

function Packeges() {
  const [data, setData] = useState([]);
  async function handleGetPackages() {
    const result = await axios.get("http://192.168.0.22:5003/package/getAll", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        offset: 0,
        limit: 9,
      },
    });
    if (result.status === 200) {
      setData(result.data.packages);
      console.log(result.data.packages);
    }
  }

  useEffect(() => {
    handleGetPackages();
  }, []);
  return (
    <MainLayout>
      <div className="text-start d-flex justify-content-between ">
        <h4>Packages</h4>
      </div>
      <div>
        <div className="row d-flex justify-content-start">
        {
          data.map((item, index) => (
            <div className="col-12 col-sm-6 col-md-6 col-lg-4 pt-5">
            <img
              className="rounded-3"
              height={150}
              style={{ width: "100%" }}
              src={`http://192.168.0.22:5003/uploads/${item.mainImage}`}
              alt=""
            />
            <div className="fs-5 fw-bold text-start text-truncate" title={item.packageName}>
             {item.packageName}
            </div>
            <div className="text-end package-details fw-medium pt-1">
              Package Details {">"}
            </div>
            <hr />
            <div className="d-flex align-items-center pb-2">
              <h3 className="text-primary">₹{item.discountedPrice}</h3> <del className="text-muted px-2">₹ {item.actualPrice}</del>
            </div>
            <button className="btn active w-100">Add To Cart</button>
          </div>
          ))
        }
         
        </div>
      </div>
    </MainLayout>
  );
}

export default Packeges;
