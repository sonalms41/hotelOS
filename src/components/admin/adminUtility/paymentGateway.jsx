import KhaltiCheckout from "khalti-checkout-web";
import { toastNotification } from ".";
import adminPropServices from "../adminServices/property";

var property_id = null;
const khaltiConfig = {
	// replace this key with yours
	publicKey: "test_public_key_bbe8500bd845495b884cbaaa7455e2be",
	secretkey: "test_secret_key_73bc22857bf54e7cba5e994635cf941a",
	productIdentity: "1234567890",
	productName: "ConnectingNepal",
	productUrl: "http://connectingsoft.com.np",
	eventHandler: {
		onSuccess(payload) {
			const postValues = {
				token: payload.token,
				amount: payload.amount / 100, // amount in paisa to rupees
				property_id: property_id,
			};

			adminPropServices.post
				.reconsile(postValues)
				.then((response) => {
					const data = response.data;

					if (data.status_code === 200) {
						toastNotification.success(data.message);
						setTimeout(() => {
							window.location.reload();
						}, 500);
					}
					if (data.status_code === 400) {
						toastNotification.warn(data.message);
					}
				})
				.catch((errors) => {
					toastNotification.error(errors);
				});
		},
	},

	paymentPreference: ["KHALTI"],
};

let khaltiCheckout = new KhaltiCheckout(khaltiConfig);
export const handlePayReconcileAmountWithKhalti = (propertyId, amount) => {
	const amountInPaisa = amount * 100; // convert amount in paisa
	property_id = propertyId;
	khaltiCheckout.show({ amount: amountInPaisa });
};
