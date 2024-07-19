import LoginContainer from "../features/authentication/components/LoginContainer.jsx";
import EventListContainer from "../features/homepage/EventListContainer.jsx";
import WhatIsSafepass from "../features/homepage/WhatIsSafepass.jsx";

export default function Homepage() {
  return (
    <div>
      <WhatIsSafepass />
      <div className="w-full px-48 py-16 bg-neutral-800">
        <div className="w-full">
          <EventListContainer />
          <LoginContainer />
        </div>
      </div>
    </div>
  );
}
