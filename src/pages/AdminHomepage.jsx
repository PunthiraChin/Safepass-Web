import React from "react";
import EventTable from "../features/admin/components/EventTable";

export default function AdminHomepage() {
  return (
    <div className="w-full px-48 py-16 bg-neutral-800">
      <div className="w-full">
        <EventTable />
      </div>
    </div>
  );
}
