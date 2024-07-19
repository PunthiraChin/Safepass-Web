import { useState } from "react";
import Input from "../../../components/Input";
// const initialInput = {
//   name: "",
//   details: "",
//   maximumSeat: "",
//   remainingSeat: "",
//   ticketImage: "",
//   price: "",
// };
// const initialInputError = {
//   name: "",
//   details: "",
//   maximumSeat: "",
//   remainingSeat: "",
//   ticketImage: "",
//   price: "",
// };
export default function TicketTypeForm() {
  const [input, setInput] = useState(initialInput);
  const [inputError, setInputError] = useState(initialInputError);
  const handleInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <div>
        <Input
          label="Name"
          placeholder="Zone A"
          type="text"
          value={input.name}
          name="name"
          error={inputError.name}
          onChange={handleInput}
        />
      </div>
    </div>
  );
}
