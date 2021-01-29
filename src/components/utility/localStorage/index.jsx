// GET LOCAL-STORAGE ITEM

export const adminStatus = () => {
	return localStorage.getItem("admin-status") ? true : false;
};
