import React, { useState } from "react";
import jsPDF from "jspdf";  
import MainLayout from '../components/MainLayout';
import { useLocation } from 'react-router-dom';
// import  '../assets/styles/ShowUseDe.css '
function ShowUserDe() {
 const location =useLocation();
 const user =location.state ;
 const [data] = useState({
  name: "John Doe",
  email: "john.doe@example.com",
  address: "1234 Main St, Springfield, USA"
});

const generatePDF = () => {
  
    
    // const result=await axios.get(`http:// 192.168.0.45:8000/user/getOneUser/${id}`)
    
    // if(result.status===200)
    // {
   
    const doc = new jsPDF();
  
    // PDF content ko yahan likhen
    doc.text("User Data PDF", 10, 10);
    
   
  
    doc.text(`Name:${data.name}`, 10, 20);
    doc.text(`Email:${data.email}`, 10, 30);
    doc.text(`Address:${data.address}`, 10, 50);
  
    // PDF ko naye tab me open karna
    const pdfData = doc.output('blob');
    const pdfURL = URL.createObjectURL(pdfData);
    window.open(pdfURL, "_blank");
  }
  



 console.log();
  return (
    <MainLayout>
    <div>
      <h2>User Data</h2>
      <p><strong>Name:</strong> {data.name}</p>
      <p><strong>Email:</strong> {data.email}</p>
      <p><strong>Address:</strong> {data.address}</p>
      
      <button onClick={generatePDF}>Download PDF</button>
    </div>
  </MainLayout>
  );
}

export default ShowUserDe