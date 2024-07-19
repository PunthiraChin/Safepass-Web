import React from "react";
import UserProfile from "../features/user/components/UserProfile";
import TransactionHistory from "../features/user/components/TransactionHistory";

export default function UserPage({ profile }) {
  return (
    <div className="w-full min-h-screen px-48 py-16 bg-neutral-800">
      <div className="flex flex-col">
        {profile ? <UserProfile /> : <TransactionHistory />}
      </div>
    </div>
  );
}
