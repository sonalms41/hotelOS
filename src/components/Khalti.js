import KhaltiCheckout from "khalti-checkout-web";
import { toast } from "react-toastify";
import { PROPERTY_ID, USER_ID } from "../components/LocalStorageInfo";

const propertyID = PROPERTY_ID();
const userToken = USER_ID();

const khaltiConfig = {
  // replace this key with yours
  publicKey: "test_public_key_bbe8500bd845495b884cbaaa7455e2be",
  secretkey: "test_secret_key_73bc22857bf54e7cba5e994635cf941a",
  productIdentity: "1234567890",
  productName: "ConnectingNepal",
  productUrl: "http://connectingsoft.com.np",
  eventHandler: {
    onSuccess(payload) {
      // console.log("payload", payload);

      const postValues = {
        property_id: propertyID,
        token: payload.token,
        amount: payload.amount / 100, // amount in paisa to rupees
      };

      //api call
      const postReconcile = async () => {
        await fetch(`${process.env.REACT_APP_API_BASE_URL}/reconcile/`, {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Token ${userToken}`,
          },
          body: JSON.stringify(postValues),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log("post reconcile", data);
            if (data.status_code === 200) {
              toast.success(data.message);
            }
          })
          .catch((error) => console.error(error));
      };
      postReconcile();
    },
    onError(error) {
      // handle errors
      toast.error(error);
      console.error(error);
    },
    onClose() {
      console.log("widget is closing");
    },
  },

  paymentPreference: ["KHALTI"],
};

let khaltiCheckout = new KhaltiCheckout(khaltiConfig);

export const handlePayWithKhalti = (amount) => {
  console.log("khalti pay-amount", amount);
  khaltiCheckout.show({ amount });
};
