import { AxiosError } from "axios";
import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import transactionApi from "../../../apis/transactionApi.js";
import Button from "../../../components/Button.jsx";
import MainContentFooter from "../../../components/MainContentFooter.jsx";
import TopicAndDetails from "../../../components/TopicAndDetails.jsx";
import EventDetails from "../EventDetails.jsx";
const noOfSeatArr = [1, 2, 3, 4];
export default function SelectCheckoutDetails({
  eventDetails,
  setEventDetails,
  checkoutStep,
  setCheckoutStep,
  transactionDetails,
  setTransactionDetails,
}) {
  const [selectedSeatNo, setSelectedSeatNo] = useState(noOfSeatArr[0]);
  const ticketTypes = eventDetails?.ticketTypes;
  const [selectedZone, setSelectedZone] = useState("");
  useEffect(() => {
    if (ticketTypes && ticketTypes.length > 0) {
      setSelectedZone(ticketTypes[0].id);
    }
  }, [ticketTypes]);

  const handleSelectNoOfSeat = (e) => {
    setSelectedSeatNo(e.target.value);
  };
  const handleSelectZone = (e) => {
    setSelectedZone(e.target.value);
  };
  const handleCreateTransaction = async (e) => {
    try {
      // 1. มัดรวมข้อมูลที่จำเป็นในการ create Transaction // ticketTypeId, ticketAmount,
      console.log("click next");
      const eventId = eventDetails.id;
      const txnInitializingData = {
        ticketTypeId: +selectedZone,
        ticketAmount: +selectedSeatNo,
      };
      console.log("transaction initializing data", txnInitializingData);
      // 2. call API เพื่อสร้าง trnsaction
      const result = await transactionApi.createTransaction(
        eventId,
        txnInitializingData
      );
      // 3. รับผลจาก API มาเพื่อเก็บ state ไว้เป็น current transaction และ update page count เพื่อไปหน้าต่อไป
      console.log("create txn result", result); /// txn result มาแล้ว
      setTransactionDetails((prev) => result.data.txnCreateResult);
      setCheckoutStep((prev) => prev + 1);
    } catch (err) {
      console.log("error from creating txn", err);
      // Error from axios
      if (err instanceof AxiosError) {
        const message = err.response.data.message;
        Swal.fire({
          title: "Cannot Proceed To Checkout",
          text: `${message}`,
          icon: "error",
          confirmButtonColor: "#00AF9D",
          color: "white",
          background: "#383838",
        });
      }
    }
  };
  return (
    <div className="w-full flex flex-col gap-8">
      <EventDetails eventDetails={eventDetails} />
      <div className="flex flex-col items-center gap-8">
        <TopicAndDetails
          textSize="small"
          topic="Select Number Of Seats"
          details="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sit amet ultricies est. Maecenas a magna posuere, accumsan massa id, cursus eros. Donec eget semper justo. In quis lorem quis augue cursus faucibus at eu risus. Proin nec efficitur nulla."
        />
        <div className="">
          <form className="flex flex-col gap-2">
            <div className="text-lg flex justify-center items-center font-semibold rounded-lg w-72 h-12 bg-teal-500 ">
              Select Number Of Seats
            </div>
            <select
              className="w-72 h-12 rounded-lg text-center"
              value={selectedSeatNo}
              onChange={handleSelectNoOfSeat}
              name="NoOfSeat"
              id="NoOfSeat"
            >
              {noOfSeatArr.map((noOfSeat, index) => (
                <option key={index} value={noOfSeat}>
                  {noOfSeat} seat
                </option>
              ))}
            </select>
          </form>
        </div>
      </div>
      <div className="flex flex-col items-center gap-8">
        <TopicAndDetails
          textSize="small"
          topic="Select Zone"
          details="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sit amet ultricies est. Maecenas a magna posuere, accumsan massa id, cursus eros. Donec eget semper justo. In quis lorem quis augue cursus faucibus at eu risus. Proin nec efficitur nulla."
        />
        <div>
          <form className="flex flex-col gap-2">
            <div className="text-lg flex justify-center items-center font-semibold rounded-lg w-72 h-12 bg-teal-500 ">
              Select Zone
            </div>
            <select
              className="w-72 h-12 rounded-lg text-center"
              name="Zone"
              id="Zone"
              value={selectedZone}
              onChange={handleSelectZone}
            >
              {ticketTypes?.map((item, index) => (
                <option key={index} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </form>
        </div>
      </div>
      <MainContentFooter>
        <Button onClick={handleCreateTransaction}>Next</Button>
      </MainContentFooter>
    </div>
  );
}
