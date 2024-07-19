import Router from "./routes";
import { createWeb3Modal, defaultConfig } from "@web3modal/ethers/react";
import { ABI, amoy, projectId, metadata } from "./constants/blockchain-config";
import EventContextProvider from "./contexts/EventContext";
import { LoginModalContextProvider } from "./contexts/LoginModalContext";
import AuthContextProvider from "./features/authentication/contexts/AuthContext";
import { Suspense } from "react";
import Spinner from "./components/Spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminEventContextProvider from "./features/admin/contexts/AdminEventContext";

const ethersConfig = defaultConfig({
  /*Required*/
  metadata,
  /*Optional*/
  enableEIP6963: true, // true by default
  enableInjected: true, // true by default
  enableCoinbase: true, // true by default
  rpcUrl: "...", // used for the Coinbase SDK
  defaultChainId: 1, // used for the Coinbase SDK
});

createWeb3Modal({
  ethersConfig,
  chains: [amoy],
  projectId,
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
  size: "md",
  themeMode: "dark",
  themeVariables: {
    "--w3m-accent": "#00AF9D",
    "--w3m-color-mix": "#00AF9D",
    "--w3m-color-mix-strength": 40,
  },
});

export default function App() {
  return (
    // ใส่ suspense เพื่อแสดงตอนที่ react ใช้ lazyload แล้วยังโหลด components ไม่เสร็จ
    <Suspense fallback={<Spinner />}>
      <AuthContextProvider>
        <EventContextProvider>
          <LoginModalContextProvider>
            <AdminEventContextProvider>
              <Router />
              <ToastContainer
                position="top-right"
                theme="dark"
                autoClose={3000}
              />
            </AdminEventContextProvider>
          </LoginModalContextProvider>
        </EventContextProvider>
      </AuthContextProvider>
    </Suspense>
  );
}
