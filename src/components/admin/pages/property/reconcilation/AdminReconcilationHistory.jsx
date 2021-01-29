import React, { useEffect, useState, useContext } from "react";
import CustomSpinner from "../../../../CustomSpinner";
import { toastNotification } from "../../../adminUtility";
import AdminPopupModal from "../../../adminUtility/AdminPopupModal";
import { ShowNListsContext } from "../../../contextApi";
import AdminReconcilationHistoryDetail from "./AdminReconcilationHistoryDetail";
import adminPropServices from "../../../adminServices/property";

const AdminReconcilationHistory = ({ propertyId }) => {
  const {nListsToShow}=useContext(ShowNListsContext);
  const [isLoading, setIsLoading] = useState(false);
  const [allRecHistory, setAllRecHistory] = useState([]);
  const [showRecDetail,setShowRecDetail]=useState(false);
  const [reconcId,setReconcId]=useState(null);
  const [openingBalance, setOpeningBalance]=useState(null);
  const [closingBalance, setClosingBalance]=useState(null);

  const [showModal,setShowModal]=useState(false);
	const [visiblePage, setVisiblePage] = useState(1);
	const nListsPerPage = 6;
  const [currentVisibleLists, setCurrentVisibleLists] = useState([]);
  

  useEffect(() => {
    setIsLoading(true);
    adminPropServices.get
      .reconcilationHistory(propertyId)
      .then((response) => {
        const data = response.data;
        console.log('reconcilation-hisotory', data)
        if (data.status_code === 200) {
          setAllRecHistory(data.result);
        }
        setIsLoading(false);
      })
      .catch((errors) => {
        toastNotification.error(errors);
        setIsLoading(false);
      });
  }, [propertyId, nListsToShow]);


  // Get Current visible reconcilation-history
	//useEffect(() => {
	//	const indexLastVList = visiblePage * nListsPerPage;
	//	const indexFirstVLists =
	//		indexLastVList - nListsPerPage;
	//	const currentVLists = allRecHistory.slice(
	//		indexFirstVLists,
	//		indexLastVList,
	//	);
	//	setCurrentVisibleLists(currentVLists);
  //}, [visiblePage, allRecHistory]);
  
  const handlePageClick = (data) => {
		setVisiblePage(data.selected);
  };
  
  const handleShowReconcDetail=(reconc_id, openingBalance, closingBalance)=>{
    setReconcId(reconc_id);
    setOpeningBalance(openingBalance);
    setClosingBalance(closingBalance);
    setShowModal(true);
  }
  return (
    <>
    
      <CustomSpinner isLoading={isLoading} />
      <div className="admin-reconc-history">
        <div className="card-primary">
          <table className="admin-table admin-table--masteroccupancy">
            <thead>
              <tr>
                <th className="width-15p">Reconcile ID</th>
                {/*<th className="width-10p">Property ID</th>*/}
                <th className="width-15p">Reconcile Date</th>
                <th className="width-15p">Number of Transaction</th>
                <th className="width-15p">Opening Balance</th>
                <th className="width-15p">Closing Balance</th>
                <th className="width-15p text-right">Amount Paid</th>
                <th className="width-15p text-right">Amount Received</th>
              </tr>
            </thead>
            <tbody>
              {allRecHistory &&
                allRecHistory.map((data, i) => {
                  return (
                    <tr key={`{rec-history-key-${i}}`}>
                      <td className="width-15p" onClick={()=>{handleShowReconcDetail(data.recon_id,data.opening_balance,data.closing_balance )}}>{data.recon_id}</td>
                      {/*<td className="width-10p">{data.hotel_id}</td>*/}
                      <td className="width-15p">{data.reconcilation_date}</td>
                      <td className="width-15p">{data.no_of_transaction}</td>
                      <td className="width-15p">{data.opening_balance}</td>
                      <td className="width-15p">{data.closing_balance}</td>
                      <td className="width-15p text-right">{data.amount_paid ==="N/A"?'-':data.amount_paid}</td>
                      <td className="width-15p text-right">{data.amount_received}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>

      {/*Modal: Show Reconcilaiton detail of inidvidual reconcilation*/}
      <AdminPopupModal showModal={showModal} closeModal={()=>setShowModal(false)} >
          <AdminReconcilationHistoryDetail reconcilationId={reconcId} propertyId={propertyId} openingBalance={openingBalance} closingBalance={closingBalance} />
      </AdminPopupModal>
      
      {/*Pagination*/}
      {/*{allRecHistory.length >= 1 && (
						<Paginate
							pageCount={Math.ceil(allRecHistory.length / nListsPerPage)}
							handlePageClick={handlePageClick}
							className="admin-pagination"
						/>
					)}*/}
    </>
  );
};

export default AdminReconcilationHistory;
