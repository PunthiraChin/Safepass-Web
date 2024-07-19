import React from "react";
import convert_datetime from "../../../utils/convert-datetime.js";

export default function TransactionCard({ userTransaction }) {
  return (
    <div
      className={`flex flex-col gap-4 bg-neutral-700 p-8 m-4 rounded-2xl border border-teal-500
}`}
      //   style={{ width: "640px" }}
    >
      <div className="flex justify-between">
        <div className="flex-1 flex flex-col gap-4">
          <div className="flex gap-8">
            <div className="w-60 font-bold">Transaction ID</div>
            <div>{userTransaction.id}</div>
          </div>
          <div className="flex gap-8">
            <div className="w-60 font-bold">Created At</div>
            <div>{convert_datetime(userTransaction.createdAt)}</div>
          </div>
          <div className="flex gap-8">
            <div className="w-60 font-bold">Updated At</div>
            <div> {convert_datetime(userTransaction.updatedAt)} </div>
          </div>
          <div className="flex gap-8">
            <div className="w-60 font-bold">Status</div>
            <div
              className={` p-1 rounded-md ${
                userTransaction.txnStatus === "FAILED"
                  ? "bg-orange-500"
                  : userTransaction.txnStatus === "SUCCESS"
                  ? "bg-teal-500"
                  : "border border-teal-500"
              }`}
            >
              {userTransaction.txnStatus}
            </div>
          </div>
        </div>
        <div div className="flex-1 flex flex-col gap-4">
          <div className="flex gap-8">
            <div className="w-60 font-bold">Event</div>
            <div>{userTransaction.event.name}</div>
          </div>
          <div className="flex gap-8">
            <div className="w-60 font-bold">Ticket Type</div>
            <div>{userTransaction.ticketType.name}</div>
          </div>
          <div className="flex gap-8">
            <div className="w-60 font-bold">Ticket Amount</div>
            <div>{userTransaction.ticketAmount}</div>
          </div>
          <div className="flex gap-8">
            <div className="w-60 font-bold">Total Price</div>
            <div>{userTransaction.totalPrice} USD</div>
          </div>
        </div>
      </div>
      <div className="flex gap-8">
        <div className="w-60 font-bold">NFT</div>
        <div>{userTransaction.nftIds[0]?.openSeaUrl}</div>
      </div>
    </div>
  );
}
