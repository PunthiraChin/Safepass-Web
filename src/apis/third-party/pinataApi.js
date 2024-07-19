import FormData from "form-data";
import fs from "fs";

const pinataApi = {};
pinataApi.pinataUploadFile = async (selectedFile, fileName) => {
  try {
    const formData = new FormData();
    formData.append("file", selectedFile);
    const metadata = JSON.stringify({
      name: fileName,
    });
    formData.append("pinataMetadata", metadata);
    const options = JSON.stringify({ cidVersion: 0 });
    formData.append("pinataOptions", options);
    const res = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_PINATA_JWT}`,
      },
      body: formData,
    });
    const resData = await res.json();
    console.log("Result from Pinata upload", resData);
    return `https://gateway.pinata.cloud/ipfs/${resData.IpfsHash}`;
  } catch (error) {
    console.log("error from pinata upload", error);
  }
};
export default pinataApi;
