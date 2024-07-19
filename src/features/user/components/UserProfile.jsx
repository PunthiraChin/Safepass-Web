import React, { useState } from "react";
import Modal from "../../../components/Modal";
import TopicAndDetails from "../../../components/TopicAndDetails";
import useAuthContext from "../../../hooks/useAuthContext";
import ChangePasswordForm from "./ChangePasswordForm";

export default function UserProfile() {
  const { authUser } = useAuthContext();
  const [openModal, setOpenModal] = useState(false);
  return (
    <div className="py-16 flex flex-col items-center gap-8">
      <TopicAndDetails topic="User Profile" details="" size="large" />
      <div
        className={`w-full flex flex-col gap-4 bg-neutral-700 p-8 rounded-2xl border border-teal-500
        }`}
      >
        <div className="flex flex-col gap-8">
          <div className="flex gap-8">
            <div className="w-60 font-bold">Email</div>
            <div>{authUser?.email}</div>
          </div>
          <div className="flex gap-8">
            <div className="w-60 font-bold ">First Name</div>
            <div>{authUser?.firstName}</div>
          </div>
          <div className="flex gap-8">
            <div className="w-60 font-bold">Last Name</div>
            <div>{authUser?.lastName}</div>
          </div>
          <div className="flex gap-8">
            <div className="w-60 font-bold">Wallet Address</div>
            <div>{authUser?.walletAddress}</div>
          </div>
        </div>
      </div>
      <TopicAndDetails topic="User Settings" details="" size="large" />
      <div
        className={`w-full flex flex-col gap-4 bg-neutral-700 p-8 rounded-2xl border border-teal-500
        }`}
      >
        <div onClick={() => setOpenModal(true)}> Change Password</div>
      </div>
      {openModal && (
        <Modal
          title="Change Password"
          children={<ChangePasswordForm onClose={() => setOpenModal(false)} />}
          onClick={() => setOpenModal(false)}
        />
      )}
    </div>
  );
}
