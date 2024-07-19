// import { createContext, useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import eventApi from "../../../apis/eventAPI";

// export const CheckoutContext = createContext();
// export default function CheckoutContextProvider({ children }) {
//   // ใน checkout flow เราจะต้องเก็บอะไรบ้าง
//   // 1. event ID and ticket details ที่เค้าเลือกเอาไว้ เพื่อเป็น request body 2. transaction Id and transaction details 3. step ใน flow ที่เราอยู่ เพื่อจะได้ render ได้ถูกหน้า 4. wallet connect status
//   const [eventId, setEventId] = useState();
//   const [checkoutStep, setCheckoutStep] = useState(0);
//   const [eventDetails, setEventDetails] = useState({});
//   const [transactionDetails, setTransactionDetails] = useState({});

//   console.log("event ID", eventId);
//   // 1. เราต้องไป get event details มาจาก API ก่อน ตาม eventId ที่ request เข้ามา
//   useEffect(() => {
//     const fetchEvent = async () => {
//       try {
//         const result = await eventApi.getEventDetailsById(eventId);
//         setEventDetails(result.data);
//         console.log("successful fetching event data");
//       } catch (err) {
//         console.log(err);
//       }
//     };
//     fetchEvent();
//   }, []);
//   console.log("event details", eventDetails);
// 2. สร้าง function ที่เรียก API ไปสร้าง new transaction ที่ Backend

// 2. เราต้องเอาข้อมูล txn ที่ถูกสร้างขึ้นแล้ว กลับมาแสดงให้ user เห็น
// return (
//   <CheckoutContext.Provider
//     value={{
//       checkoutStep,
//       setCheckoutStep,
//       eventDetails,
//       setEventDetails,
//       eventId,
//       setEventId,
//     }}
//   >
//     {children}
//   </CheckoutContext.Provider>
// );
// }
