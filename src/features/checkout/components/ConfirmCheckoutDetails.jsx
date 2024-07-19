import { useEffect, useState } from "react";
import {
  useWeb3ModalProvider,
  useWeb3ModalAccount,
} from "@web3modal/ethers/react";
import { ethers } from "ethers";
import { BrowserProvider, Contract } from "ethers";
import { ABI, coinId } from "../../../constants/blockchain-config";
import transactionApi from "../../../apis/transactionApi";
import TopicAndDetails from "../../../components/TopicAndDetails";
import MainContentFooter from "../../../components/MainContentFooter";
import Button from "../../../components/Button";
import convert_datetime from "../../../utils/convert-datetime";
import Swal from "sweetalert2";
import { TXN_STATUS } from "../../../constants/backend-config";
import priceFeedApi from "../../../apis/third-party/priceFeedApi";
import { formatTime } from "../../../utils/convert-second-to-minute";
import useAuthContext from "../../../hooks/useAuthContext";

export default function ConfirmCheckoutDetails({
  eventDetails,
  setEventDetails,
  checkoutStep,
  setCheckoutStep,
  transactionDetails,
  setTransactionDetails,
}) {
  // 1. show current txn data to Confirm
  /// createdAt : "2024-06-11T07:53:33.000Z" eventId: 3 id: 5 ticketAmount: 2 ticketTypeId: 10 totalPrice: "6000"txnStatus: "PENDING" updatedAt: "2024-06-11T07:53:33.000Z" userId: "e0cb9287-951b-4bae-91a3-7fb0cb8971f9"
  // 2. request to connext wallet
  // 3. confirm purchase >> switch ไปจ่าย & mint token
  // Blockchain constants
  const { address, chainId, isConnected } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();
  const [mintStatus, setMintStatus] = useState("notStart");
  const [timeLeft, setTimeLeft] = useState(60 * 5); // 5 mins timer
  const [txnStatus, setTxnStatus] = useState(TXN_STATUS.PENDING);
  const [coinPriceInUSD, setCoinPriceInUSD] = useState("");
  const { setIsUserDataUpdated } = useAuthContext();

  // Prep data to call Smartcontract mint function
  console.log("Event Details", eventDetails);
  const MintNFTContractAddress = eventDetails?.contractAddress;
  // URI จะต้องเป็น JSON และ key จะต้องตรงกับที่ Opensea Require เพื่อแสดงผลที่ Opensea ได้ถูกต้อง {"name":"Priceture NFT","description":"Your Price, Your Mood, Your NFT","image":"https://firebasestorage.googleapis.com/v0/b/priceture.appspot.com/o/images%2Fac3c9d3e-3294-4bb5-9055-0f279d5568bc.JPEG?alt=media","attributes":[{"trait_type":"Feeling","value":"Very Happy"}]}
  const URI = JSON.stringify({
    name: eventDetails.name,
    description: `${transactionDetails?.ticketTypeDetails.name}, ${transactionDetails?.ticketTypeDetails.details}`,
    image: transactionDetails?.ticketTypeDetails.ticketImage,
  });
  // const URI = JSON.stringify({
  //   name: "SAFEPASS TICKET",
  //   image: transactionDetails?.ticketTypeDetails.ticketImage,
  // });

  const noOfTicket = transactionDetails?.ticketAmount;
  const ticketPriceInUSD = transactionDetails?.totalPrice;
  const ticketPrice = Math.trunc((ticketPriceInUSD / coinPriceInUSD) * 10 ** 8); // 10^18
  // ticketPrice ต้องแปลงหน่วย เป็น wei และเป็นเลข integer เท่านั้น มีทศนิยมไม่ได้
  const amount = noOfTicket * ticketPrice;
  // First Use Effect to get price from price feed API
  useEffect(() => {
    const getCoinPriceInUSD = async () => {
      try {
        const result = await priceFeedApi.cryptoToUsd(coinId.ETH);
        setCoinPriceInUSD(result.data[coinId.ETH].usd);
      } catch (err) {
        console.log(err);
      }
    };
    getCoinPriceInUSD();
  }, []);

  // Second UseEffect to run remaining time to pay
  useEffect(() => {
    if (timeLeft === 0 && txnStatus === TXN_STATUS.PENDING) {
      setTxnStatus((prev) => TXN_STATUS.FAILED);
      // เรียก API service เพื่อ update txn status ให้เป็น failed
      const eventId = eventDetails.id;
      const body = {
        txnId: transactionDetails.id,
        txnStatus: TXN_STATUS.FAILED,
      };
      console.log("***Trying to update failed txn in database***");
      const updateTimeoutTxn = async (eventId, body) => {
        try {
          const result = await transactionApi.updateTxnStatus(eventId, body);
          console.log("Update txn failed status", result);
          Swal.fire({
            text: "Transaction timeout. Please start again",
            confirmButtonColor: "#00AF9D",
            cancelButtonColor: "#FF853C",
            color: "white",
            background: "#383838",
          });
          setCheckoutStep(1);
        } catch (err) {
          console.log(err);
        }
      };
      updateTimeoutTxn(eventId, body);
    }
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleMintToken = async () => {
    try {
      // if user does not connect wallet yet
      if (!address) {
        return Swal.fire({
          text: "Please connect your wallet first",
          confirmButtonColor: "#00AF9D",
          cancelButtonColor: "#FF853C",
          color: "white",
          background: "#383838",
        });
      }
      // is user already request for minting and minting is still in progress
      if (mintStatus === "minting") {
        return Swal.fire({
          text: "Ticket Minting In process, Please wait until it is finished",
          confirmButtonColor: "#00AF9D",
          cancelButtonColor: "#FF853C",
          color: "white",
          background: "#383838",
        });
      }
      // if request for minting for the first time
      setMintStatus((prev) => "minting");
      console.log("ETH price in usd", coinPriceInUSD);
      console.log("Ticket Price Data send to SMC", ticketPrice);
      const ethersProvider = new BrowserProvider(walletProvider);
      const signer = await ethersProvider.getSigner();
      const NFTContract = new Contract(MintNFTContractAddress, ABI, signer);
      const mintNFTResult = await NFTContract.safeMint(
        address,
        URI,
        noOfTicket,
        ticketPrice,
        { value: ethers.parseUnits(amount.toString(), "wei") }
      );
      Swal.fire({
        text: "Ticket Minting in progress. Please wait.",
        confirmButtonColor: "#00AF9D",
        cancelButtonColor: "",
        color: "white",
        background: "#383838",
      });
      console.log("Minting Response", mintNFTResult);
      const receipt = await mintNFTResult.wait();
      console.log("This is the receipt from minting", mintNFTResult);
      const eventLogsArray = receipt.logs;
      console.log("*****EventLogArray", eventLogsArray);
      const tokenIdArray = [];
      for (let log of eventLogsArray) {
        if (log.eventName === "MetadataUpdate") {
          tokenIdArray.push(parseInt(log.data, 16));
        }
      }
      console.log("***TokenIdArray***", tokenIdArray);
      setMintStatus((prev) => "minted");
      setTxnStatus((prev) => txnStatus);
      // set wallet address
      // Swal.fire("Ticket Minting Completed");
      /// ถ้า mintStatus เป็น minted
      // 1. update transaction data ด้วย patch
      // 2. switch ไปที่หน้า successTransaction
      console.log("*** Trying to update transaction***");
      // code ข้างล่างนี้เหมือนจะไม่ทำงาน
      // call API to update transaction data to completed
      // create request body
      const eventId = eventDetails.id;
      const body = {
        txnId: transactionDetails.id,
        walletAddress: address,
        arrOfTokenId: tokenIdArray,
        txnStatus: TXN_STATUS.SUCCESS,
      };
      const result = await transactionApi.updateTxnStatus(eventId, body);
      console.log("update transaction complete result", result);
      const createdNft = result.data.createdNFT;
      // trigger app to fetch user data again
      setIsUserDataUpdated(true);
      setCheckoutStep((prev) => prev + 1);
    } catch (err) {
      console.log("Mint error", err);
      setMintStatus("notStart");
    }
    // call smart contract here
  };
  return (
    <div className="w-full flex flex-col items-center gap-8">
      <TopicAndDetails
        topic="Confirm Information"
        details="Confirm purchase details, then connect youe Web3 wallet which will be used to pay and to receive NFT ticket(s)"
        textSize="small"
      />
      <div className="mx-auto text-xl text-orange-500 font-semibold p-4 bg-neutral-700 rounded-xl">
        Please Complete Payment In {formatTime(timeLeft)} mins
      </div>
      <div
        className={`w-full flex flex-col gap-4 bg-neutral-700 p-8 rounded-2xl border ${
          address ? "border-teal-500" : ""
        }`}
        style={{ width: "640px" }}
      >
        <div className="text-2xl font-semibold"> Details</div>
        <div className="flex gap-8">
          <div className="w-60">Ticket Amount</div>
          <div>{transactionDetails?.ticketAmount}</div>
        </div>
        <div className="flex gap-8">
          <div className="w-60">Total Price</div>
          <div>{transactionDetails?.totalPrice} USD</div>
        </div>
        <div className="flex gap-8">
          <div className="w-60">Transaction Created Date</div>
          <div>{convert_datetime(transactionDetails?.createdAt)}</div>
        </div>
        <div className="flex gap-8">
          <div className="w-60">Wallet Address</div>
          <div>
            <w3m-button size="md" balance="hide" />
          </div>
          <div></div>
        </div>
      </div>
      <MainContentFooter>
        {address && mintStatus === "notStart" ? (
          <Button onClick={handleMintToken}>Buy Tickets</Button>
        ) : (
          <Button
            bg="ghost"
            color="ghost"
            border="ghost"
            onClick={handleMintToken}
          >
            Buy Tickets
          </Button>
        )}
      </MainContentFooter>
    </div>
  );
}
