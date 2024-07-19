import React, { useEffect } from "react";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import transactionApi from "../../../apis/transactionApi";
import Button from "../../../components/Button";
import MainContentFooter from "../../../components/MainContentFooter";
import TopicAndDetails from "../../../components/TopicAndDetails";
import convert_datetime from "../../../utils/convert-datetime";

export default function SuccessCheckout({ transactionDetails, eventDetails }) {
  // 1. ดึงค่า transaction ที่สำเร็จแล้วมาจาก System
  const [nftArr, setNftArr] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    // ต้องทำเป็น callback function เพื่อจะทำเป็น async/await
    const fetchTransactionData = async () => {
      try {
        const eventId = eventDetails.id;
        const txnId = transactionDetails.id;
        const result = await transactionApi.getTransactionDetailById(
          eventId,
          txnId
        );
        console.log("Fetch Transaction Detail Result", result);
        // result.data.transactionDetails ก็จะได้ข้อมูลมา
        const successfulTxnDetails = result.data.transactionDetails;
        setNftArr(successfulTxnDetails.nftIds);
        // เอาค่ามาแสดงผล UI
      } catch (err) {
        console.log(err);
      }
    };
    fetchTransactionData();
  }, []);
  const handleOpenOpensea = () => {
    return window.open(`${nftArr[0].openSeaUrl}`);
  };
  const handleGoToHomepage = () => {
    return navigate("/");
  };
  return (
    <div className="w-full flex flex-col items-center gap-16">
      <TopicAndDetails
        topic="Successful Purchase"
        details="Congratulations! You have successfully purchased. NFT tickets are ready in your wallet.Check it out in your wallet, or go to Opensea via below link"
        textSize="small"
      />
      <div className="w-2/3 p-4 flex flex-col gap-4 bg-neutral-700 rounded-xl">
        <div className="grid grid-cols-4 border-b-2 border-neutral-600">
          <p className="col-span-1 p-2 text-teal-500 font-semibold">Token ID</p>
          <p className="col-span-3 p-2  text-teal-500 font-semibold">
            Opensea URL
          </p>
        </div>
        {nftArr?.map((nft, index) => (
          <div key={index} className="grid grid-cols-4">
            <p className="col-span-1 px-2 py-1">{nft.tokenId}</p>
            <p className="col-span-3 px-2 py-1 truncate">
              <a
                className="underline underline-offset-4"
                href={nft.openSeaUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {nft.openSeaUrl}
              </a>
            </p>
          </div>
        ))}
      </div>
      <MainContentFooter>
        <Button onClick={handleOpenOpensea}>Go To Opensea</Button>
        <Button
          onClick={handleGoToHomepage}
          bg="ghost"
          color="ghost"
          text="ghost"
        >
          Back to Homepage
        </Button>
      </MainContentFooter>
    </div>
  );
}
