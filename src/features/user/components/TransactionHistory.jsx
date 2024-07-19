import React, { useEffect, useState } from "react";
import userApi from "../../../apis/userApi";
import TopicAndDetails from "../../../components/TopicAndDetails";
import TransactionCard from "./TransactionCard";

export default function TransactionHistory() {
  // fetch all user transactions
  const [userTransactionArr, setUserTransactionArr] = useState([]);
  useEffect(() => {
    const fetchUserTransaction = async () => {
      try {
        const result = await userApi.getAllUserTransactions();
        console.log("Fetch user transaction result", result.data);
        setUserTransactionArr(result.data);
      } catch (err) {
        console.log("Error from fetching user's transaction history", err);
      }
    };
    fetchUserTransaction();
  }, []);

  return (
    <div className="w-full py-16 flex flex-col items-center">
      <TopicAndDetails topic="Transaction History" details="" size="large" />
      <div className="w-full rounded-2xl bg-neutral-700 p-4">
        {userTransactionArr.map((userTransaction, index) => (
          <TransactionCard userTransaction={userTransaction} />
        ))}
        {/* <div className="flex flex-col gap-8"></div> */}
      </div>
    </div>
  );
}
