import { useEffect, useState } from "react";
import { useRef } from "react";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import InputDateTime from "../../../components/InputDateTime";
import MainContentFooter from "../../../components/MainContentFooter";
import adminApi from "../../../apis/adminApi";
import Spinner from "../../../components/Spinner";
import pinataApi from "../../../apis/third-party/pinataApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { adminEventContext } from "../contexts/AdminEventContext";
import useEventContext from "../../../hooks/useEventContext";

const initialInput = {
  name: "",
  details: "",
  artist: "",
  organizer: "",
  avenue: "",
  coverImage: "",
  profileImage: "",
  seatMapImage: "",
  contractAddress: "",
  startDateTime: "",
  endDateTime: "",
  ticketTypes: [],
};
const initialInputError = {
  name: "",
  details: "",
  artist: "",
  organizer: "",
  avenue: "",
  coverImage: "",
  profileImage: "",
  seatMapImage: "",
  contractAddress: "",
  startDateTime: "",
  endDateTime: "",
  ticketTypes: [],
};
const initialTicketTypeInput = {
  id: "",
  name: "",
  details: "",
  maximumSeat: "",
  remainingSeat: "",
  ticketImage: "",
  price: "",
};

export default function EventForm({
  eventId,
  input,
  setInput,
  inputError,
  setInputError,
  inputTicketTypeArr,
  setInputTicketTypeArray,
  ticketTypeIdArr,
}) {
  // สร้าง state ขึ้นมาเพื่อเก็บ event and ticketType Details
  // ทำ conditional ว่า ถ้าเกิดมี event data อยู่แล้ว >> ให้ set initial state เป็นค่า event Data ที่ได้มา แล้วก็เปลี่ยนปุ่ม จาก submit เป็น update กับ delete แทน
  console.log("Input from parent component", input);
  const [loading, setLoading] = useState(false);
  const { eventAction, setEventAction } = useContext(adminEventContext);
  const { fetchEventData } = useEventContext();
  const [isReadOnly, setIsReadOnly] = useState(false);
  const fileCoverImage = useRef();
  const fileProfileImage = useRef();
  const fileSeatMapImage = useRef();
  const fileTicketImage = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    if (eventAction === "view") {
      setIsReadOnly(true);
    } else {
      setIsReadOnly(false);
    }
  }, []);
  const handleInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
    setInputError(initialInputError);
  };
  const handleAddTicketTypeForm = () => {
    // Add new tickeyTypeForm everytime user clicks add new ticket type
    const newInputTicketTypeArr = [...inputTicketTypeArr];
    const newInitialTicketTypeInput = { ...initialTicketTypeInput };
    newInitialTicketTypeInput.id = newInputTicketTypeArr.length;
    newInputTicketTypeArr.push(newInitialTicketTypeInput);
    setInputTicketTypeArray(newInputTicketTypeArr);
    console.log("length", length);
    console.log("inputTicketTypeArray", inputTicketTypeArr);
  };
  const handleInputTicketTypeDetail = (e) => {
    // update แค่ 1 value ใน object ภายใต้ array อีกที >> ต้อง clone ซ้อน clone
    // console.log(e);
    const newInputTicketTypeArr = [...inputTicketTypeArr];
    // เลือก object ของ index ที่เราต้องการจะแก้มาได้ >> ระบุ key ที่เราต้องการจะแก้ ด้วย e.target.name
    newInputTicketTypeArr[e.target.id][e.target.name] = e.target.value;
    if (e.target.name === "maximumSeat") {
      // set remaining seat = maximumSeat
      newInputTicketTypeArr[e.target.id].remainingSeat = e.target.value;
    }
    setInputTicketTypeArray(newInputTicketTypeArr);
    // ใช้ e.target.id ในการระบุ index ได้
    console.log("***** inputTicketTypeArr****", inputTicketTypeArr);
  };
  // handle upload image
  const handleUploadEventFile = (e) => {
    // เช็คก่อนว่า user upload file เข้ามามั้ย (เพราะถ้ากด cancel มันก็จะ trigger event เหมือนกัน)
    if (e.target.files[0]) {
      console.log(e);
      setInput({ ...input, [e.target.name]: e.target.files[0] });
    }
  };
  const handleUploadTicketTypeFile = (e) => {
    // เช็คก่อนว่า user upload file เข้ามามั้ย
    if (e.target.files[0]) {
      console.log(e);
      // set ticketImage ให้ถูก object
      const newInputTicketTypeArr = [...inputTicketTypeArr];
      console.log("*****", newInputTicketTypeArr);
      console.log("*****", newInputTicketTypeArr[e.target.id]);
      newInputTicketTypeArr[e.target.id][e.target.name] = e.target.files[0];
      // newInputTicketTypeArr[e.target.id][e.target.name] =
      //   "https://res.cloudinary.com/dh4js8wat/image/upload/v1718255709/hba2hfh79dhoionp2gph.jpg";
      console.log();
      setInputTicketTypeArray(newInputTicketTypeArr);
    }
  };
  const handleSubmitForm = async (e) => {
    try {
      setLoading(true);
      // เอาเฉพาะรูป ticket image ไป upload ที่ pinata ก่อน แล้วเอากลับมา
      const formData = new FormData();
      // เอาข้อมูลจาก input และ inputTicketTypeArr ทั้งหมดใส่เข้าไปใน formData ด้วย reduce
      for (let key in input) {
        formData.append(key, input[key]);
      }
      // จัดการข้อมูลจาก inputTicketTypeArr ให้เป็น key ทั้งหมดใส่เข้าไปใน formData(object เดียวกันกับ eventData)
      for (let i = 0; i < inputTicketTypeArr.length; i++) {
        // ข้างในเป็น object ที่มี key อยู่ วนลูปแต่ละ object เพื่อเอา key แบะ value ออกมา
        // เราต้อง handle แตกต่างกันตาม key แต่ละอย่าง 1. ถ้า key
        for (let key in inputTicketTypeArr[i]) {
          let keyName = `ticketTypes[${i}][${key}]`;
          // ถ้าเกิดเป็น ticketImage จะไปเรียก service Pinata เพื่อ upload รูปขึ้น ipfs ก่อนแล้ว returm image url กลับมา
          if (key === "ticketImage") {
            const resultImageUrl = await pinataApi.pinataUploadFile(
              inputTicketTypeArr[i][key],
              `TicketImageFor${inputTicketTypeArr[i].name}`
            );
            formData.append(keyName, resultImageUrl);
            continue;
          }
          if (key === " " || key === "id") continue;
          // key อื่นๆ ให้เอาค่า value มา append เข้า form data ตามปกติ
          formData.append(keyName, inputTicketTypeArr[i][key]);
        }
      }
      console.log("finalFormData", formData);
      console.log("finalInputTickeyTypeArr", inputTicketTypeArr);
      // await adminApi.editEvent(eventId, formData);
      await adminApi.createNewEvent(formData);
      setInput(initialInput);
      setInputTicketTypeArray([]);
      fetchEventData();
      toast.success("Create New Event Successfully");
      navigate("/admin");
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  const handleEditEvent = async (e) => {
    try {
      setLoading(true);
      // เอาเฉพาะรูป ticket image ไป upload ที่ pinata ก่อน แล้วเอากลับมา
      const formData = new FormData();
      // เอาข้อมูลจาก input และ inputTicketTypeArr ทั้งหมดใส่เข้าไปใน formData ด้วย reduce
      for (let key in input) {
        formData.append(key, input[key]);
        console.log("key", key, "value", input[key]);
      }
      // จัดการข้อมูลจาก inputTicketTypeArr ให้เป็น key ทั้งหมดใส่เข้าไปใน formData(object เดียวกันกับ eventData)
      for (let i = 0; i < inputTicketTypeArr.length; i++) {
        // ข้างในเป็น object ที่มี key อยู่ วนลูปแต่ละ object เพื่อเอา key แบะ value ออกมา
        // เราต้อง handle แตกต่างกันตาม key แต่ละอย่าง 1. ถ้า key
        for (let key in inputTicketTypeArr[i]) {
          let keyName = `ticketTypes[${i}][${key}]`;
          // ถ้าเกิดเป็น ticketImage จะไปเรียก service Pinata เพื่อ upload รูปขึ้น ipfs ก่อนแล้ว returm image url กลับมา
          if (key === "ticketImage") {
            // เช็ีคก่อนว่ามีการแก้มั้ย หรือไม่ได้แก้ 1. ถ้าไม่ได้แก้ แปลว่าจะเป็น url อยู่แล้ว 2. ถ้าแก้ แปลว่าจะเป็น path
            if (typeof inputTicketTypeArr[i][key] === "string") continue;
            const resultImageUrl = await pinataApi.pinataUploadFile(
              inputTicketTypeArr[i][key],
              `TicketImageFor${inputTicketTypeArr[i].name}`
            );
            formData.append(keyName, resultImageUrl);
            console.log("key", keyName, "value", resultImageUrl);
            continue;
          }
          if (key === " ") continue;
          if (eventAction === "edit" && key === "id") {
            formData.append(keyName, ticketTypeIdArr[i]);
            console.log("key", keyName, "value", ticketTypeIdArr[i]);
            // เอาค่า ticketTypeIdArr มาใส่แทน
          } else if (eventAction === "view" && key === "id") continue;
          // key อื่นๆ ให้เอาค่า value มา append เข้า form data ตามปกติ
          formData.append(keyName, inputTicketTypeArr[i][key]);
        }
      }
      console.log("finalFormData", formData);
      console.log("finalInputTickeyTypeArr", inputTicketTypeArr);
      await adminApi.editEvent(eventId, formData);
      // await adminApi.createNewEvent(formData);
      setInput(initialInput);
      setInputTicketTypeArray([]);
      navigate("/admin");
      toast.success("Create New Event Successfully");
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  const handleBackToHomepage = (e) => {
    return navigate(`/admin/`);
  };

  return (
    <div
      className="bg-neutral-700 shadow shadow-neutral-950 py-4 px-8 rounded-xl"
      style={{ width: "720px" }}
    >
      {loading && <Spinner />}
      {/* Event Details Section */}
      <div className="flex flex-col gap-2">
        <Input
          label="Event Name"
          placeholder="Event A"
          type="text"
          value={input.name}
          name="name"
          error={inputError.name}
          onChange={handleInput}
          readOnly={isReadOnly}
        />
        <Input
          label="Organizer"
          placeholder="Organizer Name"
          type="text"
          value={input.organizer}
          name="organizer"
          error={inputError.organizer}
          onChange={handleInput}
          readOnly={isReadOnly}
        />
        <Input
          label="Artist"
          placeholder="Artist Name"
          type="text"
          value={input.artist}
          name="artist"
          error={inputError.artist}
          onChange={handleInput}
          readOnly={isReadOnly}
        />
        <Input
          label="Avenue"
          placeholder="Avenue"
          type="text"
          value={input.avenue}
          name="avenue"
          error={inputError.avenue}
          onChange={handleInput}
          readOnly={isReadOnly}
        />
        <Input
          label="Contract Address"
          placeholder="Contract Address"
          type="text"
          value={input.contractAddress}
          name="contractAddress"
          error={inputError.contractAddress}
          onChange={handleInput}
          readOnly={isReadOnly}
        />

        <div className="flex flex-col gap-1">
          <label htmlFor="details" className="text-md font-semibold">
            Details
          </label>
          <textarea
            id="details"
            rows="10"
            cols="50"
            name="details"
            placeholder="Fill in details of the event here"
            value={input.details}
            error={inputError.details}
            onChange={handleInput}
            readOnly={isReadOnly}
          ></textarea>
        </div>
        <InputDateTime
          placeholder="Start Date and Time"
          error={inputError.startDateTime}
          value={input.startDateTime}
          onChange={handleInput}
          name="startDateTime"
          label="Start Date and Time"
          minDateTime="2024-06-10T00:00"
          maxDateTime="2030-12-31T00:00"
          readOnly={isReadOnly}
        />
        <InputDateTime
          placeholder="End Date and Time"
          error={inputError.endDateTime}
          value={input.endDateTime}
          onChange={handleInput}
          name="endDateTime"
          label="End Date and Time"
          minDateTime={input.startDateTime}
          maxDateTime="2030-12-31T00:00"
          readOnly={isReadOnly}
        />
        {/* Cover Photo Input แก้ตรงนี้ให้เป็น reusable component อีกที*/}
        <div className="flex flex-col gap-2">
          <label htmlFor="cover-image-input" className="text-md font-semibold">
            Cover Image
          </label>
          <input
            type="file"
            id="cover-image-input"
            ref={fileCoverImage}
            className="hidden"
            name="coverImage"
            onChange={handleUploadEventFile}
            disabled={isReadOnly}
          ></input>
          {isReadOnly ? null : (
            <Button onClick={() => fileCoverImage.current.click()}>
              Upload Photo
            </Button>
          )}
          <div className="flex justify-center">
            <img
              src={
                input.coverImage
                  ? typeof input.coverImage === "string"
                    ? input.coverImage
                    : URL.createObjectURL(input.coverImage)
                  : null
              }
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label
            htmlFor="profile-image-input"
            className="text-md font-semibold"
          >
            Profile Image
          </label>
          <input
            type="file"
            id="profile-image-input"
            ref={fileProfileImage}
            className="hidden"
            name="profileImage"
            onChange={handleUploadEventFile}
            disabled={isReadOnly}
          ></input>
          {isReadOnly ? null : (
            <Button onClick={() => fileProfileImage.current.click()}>
              Upload Photo
            </Button>
          )}
          <div className="flex justify-center">
            <img
              src={
                input.profileImage
                  ? typeof input.profileImage === "string"
                    ? input.profileImage
                    : URL.createObjectURL(input.profileImage)
                  : null
              }
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label
            htmlFor="seatmap-image-input"
            className="text-md font-semibold"
          >
            Seat Map Image
          </label>
          <input
            type="file"
            id="seatmap-image-input"
            ref={fileSeatMapImage}
            className="hidden"
            name="seatMapImage"
            onChange={handleUploadEventFile}
            disabled={isReadOnly}
          ></input>
          {isReadOnly ? null : (
            <Button onClick={() => fileSeatMapImage.current.click()}>
              Upload Photo
            </Button>
          )}
          <div className="flex justify-center">
            <img
              src={
                input.seatMapImage
                  ? typeof input.seatMapImage === "string"
                    ? input.seatMapImage
                    : URL.createObjectURL(input.seatMapImage)
                  : null
              }
            />
          </div>
        </div>
      </div>
      {/* TicketType Section */}
      <div className="py-8">
        <div className="flex justify-between">
          <div className="text-xl font-semibold">Ticket Types</div>
          {isReadOnly ? null : (
            <Button onClick={handleAddTicketTypeForm}>+ New Ticket Type</Button>
          )}
        </div>
        <div>
          {inputTicketTypeArr.map((inputTicketType, index) => (
            <div className="flex flex-col py-4 gap-2" key={index}>
              <div>{`Ticket Type`}</div>
              <Input
                label="Name"
                type="text"
                id={inputTicketType.id}
                name="name"
                value={inputTicketTypeArr[inputTicketType.id].name}
                onChange={handleInputTicketTypeDetail}
                readOnly={isReadOnly}
              />
              <Input
                label="Details"
                type="text"
                id={inputTicketType.id}
                name="details"
                value={inputTicketTypeArr[inputTicketType.id].details}
                onChange={handleInputTicketTypeDetail}
                readOnly={isReadOnly}
              />
              <Input
                label="Maximum Seat"
                type="text"
                id={inputTicketType.id}
                name="maximumSeat"
                value={inputTicketTypeArr[inputTicketType.id]?.maximumSeat}
                onChange={handleInputTicketTypeDetail}
                readOnly={isReadOnly}
              />
              <Input
                label="Price"
                type="text"
                id={inputTicketType.id}
                name="price"
                value={inputTicketTypeArr[inputTicketType.id].price}
                onChange={handleInputTicketTypeDetail}
                readOnly={isReadOnly}
              />
              {/* uploadImage */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="ticket-image-input"
                  className="text-md font-semibold"
                >
                  Ticket Image
                </label>
                <input
                  type="file"
                  id={inputTicketType.id}
                  ref={fileTicketImage}
                  className="hidden"
                  name="ticketImage"
                  onChange={handleUploadTicketTypeFile}
                  disabled={isReadOnly}
                ></input>
                {isReadOnly ? null : (
                  <Button onClick={() => fileTicketImage.current.click()}>
                    Upload Photo
                  </Button>
                )}
                <div className="flex justify-center">
                  <img
                    src={
                      inputTicketTypeArr[inputTicketType.id].ticketImage
                        ? typeof inputTicketTypeArr[inputTicketType.id]
                            .ticketImage === "string"
                          ? inputTicketTypeArr[inputTicketType.id].ticketImage
                          : URL.createObjectURL(
                              inputTicketTypeArr[inputTicketType.id].ticketImage
                            )
                        : null
                    }
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <MainContentFooter>
        {eventAction === "edit" ? (
          <>
            <Button onClick={handleEditEvent}>Submit Edit</Button>
            <Button
              color="ghost"
              bg="ghost"
              border="ghost"
              onClick={handleBackToHomepage}
            >
              Back
            </Button>
          </>
        ) : eventAction === "create" ? (
          <Button onClick={handleSubmitForm}>Submit</Button>
        ) : eventAction === "view" ? (
          <Button
            color="ghost"
            bg="ghost"
            border="ghost"
            onClick={handleBackToHomepage}
          >
            Back
          </Button>
        ) : null}
      </MainContentFooter>
    </div>
  );
}
