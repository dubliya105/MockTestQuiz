import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MainLayout from "../components/MainLayout";
import "../assets/styles/Package.css";
import parse from "html-react-parser";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjcyYTAwMGU5ZWVhMDZhNzg5OWY0NWQ4IiwiaWF0IjoxNzMxOTMyOTM3LCJleHAiOjE3MzIwMTkzMzd9.EAo0TmsjzVx-XIJr9NX8_OTU9PZPpGCsK5yi6AL7nzs";

export default function PackageDetail() {
  const [data, setData] = useState([]);
  const { id } = useParams();
  async function handleGetPackageDetail() {
    const result = await axios.get(
      "http://192.168.0.21:5003/package/getDetailById",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          package_id: id,
        },
      }
    );
    if (result.status === 200) {
      setData(result.data.packageDetails);
    }
  }
  useEffect(() => {
    handleGetPackageDetail();
  }, []);

  return (
    <MainLayout>
      <h4 className="package-details text-start fw-bold text-truncate" title={data.packageName}>{data.packageName}</h4>
      <div className="d-flex justify-content-between ">
        <div className="d-flex align-items-center">
          <h3 className=" text-primary-emphasis text-truncate">₹{data.discountedPrice}</h3>
          <del className="text-muted px-2 text-truncate">₹ {data.actualPrice}</del>
        </div>
        <div className="">
          <button className="btn add-to-cart border-0 text-truncate">Add To Cart</button>
        </div>
      </div>
      <hr />
      <div className="text-start">
         {data.length!==0&&parse(data.details)}
      </div>
    </MainLayout>
  );
}
