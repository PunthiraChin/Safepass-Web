import { useState, useEffect } from "react";
import SelectCheckoutDetails from "../features/checkout/components/SelectCheckoutDetails";
import ConfirmCheckoutDetails from "../features/checkout/components/ConfirmCheckoutDetails";
import SuccessCheckout from "../features/checkout/components/SuccessCheckout";
import ProgressBar from "../features/checkout/components/ProgressBar";
import Spinner from "../components/Spinner";
import { useParams } from "react-router-dom";
import eventApi from "../apis/eventAPI";
import FailCheckout from "../features/checkout/components/FailCheckout";

export default function CheckoutPage() {
  const [eventId, setEventId] = useState();
  const [checkoutStep, setCheckoutStep] = useState(1);
  const [eventDetails, setEventDetails] = useState({});
  const [transactionDetails, setTransactionDetails] = useState({});
  // Blockchain constants
  const pathParams = useParams();
  useEffect(() => {
    setEventId((prev) => pathParams.eventId);
    const fetchEvent = async () => {
      try {
        const result = await eventApi.getEventDetailsById(pathParams.eventId);
        setEventDetails(result.data);
        console.log("successful fetching event data");
      } catch (err) {
        console.log(err);
      }
    };
    fetchEvent();
  }, []);

  return (
    <div className="w-full px-48 py-16 bg-neutral-800 border border-white">
      {eventDetails ? (
        <div>
          <ProgressBar checkoutStep={checkoutStep} />
          <div>
            {checkoutStep === 1 ? (
              <SelectCheckoutDetails
                eventDetails={eventDetails}
                setEventDetails={setEventDetails}
                checkoutStep={checkoutStep}
                setCheckoutStep={setCheckoutStep}
                transactionDetail={transactionDetails}
                setTransactionDetails={setTransactionDetails}
              />
            ) : checkoutStep === 2 ? (
              <ConfirmCheckoutDetails
                eventDetails={eventDetails}
                setEventDetails={setEventDetails}
                checkoutStep={checkoutStep}
                setCheckoutStep={setCheckoutStep}
                transactionDetails={transactionDetails}
                setTransactionDetails={setTransactionDetails}
              />
            ) : checkoutStep === 3 ? (
              <SuccessCheckout
                eventDetails={eventDetails}
                setEventDetails={setEventDetails}
                checkoutStep={checkoutStep}
                setCheckoutStep={setCheckoutStep}
                transactionDetails={transactionDetails}
                setTransactionDetails={setTransactionDetails}
              />
            ) : (
              <FailCheckout />
            )}
          </div>
        </div>
      ) : (
        <Spinner />
      )}
    </div>
  );
}
