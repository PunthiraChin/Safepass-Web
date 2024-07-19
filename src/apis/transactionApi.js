import axios from "../config/axios";
const transactionApi = {};

transactionApi.createTransaction = (eventId, body) =>
  axios.post(`/events/${eventId}/checkout`, body);

transactionApi.updateTxnStatus = (eventId, body) =>
  axios.patch(`/events/${eventId}/checkout`, body);

transactionApi.getTransactionDetailById = (eventId, txnId) =>
  axios.get(`/events/${eventId}/checkout/transaction/${txnId}`);


export default transactionApi;
