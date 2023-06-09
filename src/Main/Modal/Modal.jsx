import React, { useState, useEffect } from "react";
import "./Modal.scss";
import Modal from "react-overlays/Modal";
import { contractABI, contractAddress, channel } from "../../Utils/constants";
import * as PushAPI from "@pushprotocol/restapi";
import {
  useAccount,
  useContractRead,
  usePrepareContractWrite,
  useContractWrite,
  useWalletClient,
} from "wagmi";

const Modale = ({ isOpen, setIsOpen, id }) => {
  // Backdrop JSX code
  const renderBackdrop = (props) => <div className="backdrop" {...props} />;
  const [feeValue, setfeeValue] = useState(0);
  const [feeValueCon, setfeeValueCon] = useState(20);

  const { address } = useAccount();
  const {
    data: walletClient,
    isError,
    isLoading: clientLoading,
  } = useWalletClient();
  if (feeValue > 0) {
  }
  const { config: feeConfig, error } = usePrepareContractWrite({
    abi: contractABI,
    address: contractAddress,
    functionName: "setSubscribersFee",
    args: [feeValue],
    onError(error) {
      console.log("Error", error);
    },
    onSuccess(data) {
      //console.log(data);
      setIsOpen(false);
    },
  });

  const { config: subsConfig, error: subsError } = usePrepareContractWrite({
    abi: contractABI,
    address: contractAddress,
    functionName: "subscribe",
    args: [id],
    onSuccess(data) {
      console.log(data);
      subscribeToNotif();
      setIsOpen(false);
    },
    onError(error) {
      console.log("Error", error);
    },
  });

  const { write: feeWrite } = useContractWrite(feeConfig);
  const { write: subsWrite } = useContractWrite(subsConfig);

  const {
    data: getFee,
    error: feeError,
    isLoading,
  } = useContractRead({
    abi: contractABI,
    address: contractAddress,
    functionName: "getSubscribersFee",
    args: [id],
  });

  const subscribeToNotif = async () => {
    try {
      await PushAPI.channels.subscribe({
        signer: walletClient,
        channelAddress: `eip155:5:${channel}`, // channel address in CAIP
        userAddress: `eip155:5:${id}`, // user address in CAIP
        onSuccess: () => {
          console.log("opt in success");
        },
        onError: () => {
          console.error("opt in error");
        },
        env: "staging",
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    setfeeValueCon(parseInt(getFee));
  }, []);

  useEffect(() => {
    if (feeValue > 0) {
      feeConfig();
    }
  }, [feeValue]);

  return (
    <div className="modal-example">
      <Modal
        className={`modal ${isOpen ? "blockDisplay" : ""}`}
        show={isOpen}
        onHide={() => setIsOpen(false)}
        renderBackdrop={renderBackdrop}
      >
        <div>
          <div className="modal-header">
            <div className="modal-title">
              {address === id ? "Change Fee" : "Subscribe"}
            </div>
            <div>
              <span className="close-button" onClick={() => setIsOpen(!isOpen)}>
                x
              </span>
            </div>
          </div>
          {}
          <div className="modal-desc">
            {address === id ? (
              <div>
                <label>setFee</label>
                <input
                  type="number"
                  value={feeValue}
                  onChange={(e) => setfeeValue(e.target.value)}
                />
              </div>
            ) : (
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value="subfee"
                  id="subfee"
                  required
                />
                <label className="form-check-label" htmlFor="subfee">
                  ${feeValueCon}
                </label>
              </div>
            )}
          </div>
          <div className="modal-footer">
            <button
              className="secondary-button"
              onClick={() => setIsOpen(false)}
            >
              Close
            </button>
            {address === id ? (
              <button
                type="submit"
                className="primary-button"
                onClick={() => feeWrite()}
              >
                Confirm
              </button>
            ) : (
              <button
                type="submit"
                className="primary-button"
                onClick={() => subsWrite()}
              >
                Confirm
              </button>
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Modale;
