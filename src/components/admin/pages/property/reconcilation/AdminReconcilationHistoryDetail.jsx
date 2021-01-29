import React, {useState, useEffect, Fragment} from 'react'
import CustomSpinner from '../../../../CustomSpinner';
import adminPropServices from '../../../adminServices/property';
import { AdminSectionHeader, toastNotification } from '../../../adminUtility';
import {useParams} from 'react-router-dom'

const AdminReconcilationHistoryDetail = (props) => {
    const [isLoadinng,setIsLoading]=useState(false);

    const {reconcilationId, propertyId, openingBalance, closingBalance, propertyName}=props;
    const [responseData,setResponseData]=useState(null);
useEffect(()=>{
  if(reconcilationId && propertyId){
    const postValue={
        property_id:propertyId,
        recon_id:reconcilationId
    }
    adminPropServices.post.reconcHistoryDetail(postValue).then(response=>{
        const data=response.data;
        console.log('reconcilation-hisotry-detail', data)
        if(data.status_code===200){
            setResponseData(data.result)
        }
    }).catch(errors=>{
        toastNotification.error(errors)
    })
  }
},[reconcilationId]);

    return (
        <>
        <CustomSpinner isLoading ={isLoadinng} />
        <AdminSectionHeader
        sectionTitle={useParams().propertyName}
        />
        <div className="reconc-history-header card-primary">
        <h4 className="rec-modal-title"><span className="title-spn">Reconcilation ID</span> {reconcilationId}</h4>
        <h4 className="rec-modal-title"><span className="title-spn">Opening Balance </span> <span className="currency">NPR </span>{openingBalance}</h4>
        <h4 className="rec-modal-title"><span className="title-spn">Closing Balance</span> <span className="currency">NPR </span>{closingBalance}</h4>
        </div>
        <div className="reconc-hist-detail">
            <div className="card-primary">
        <table className="admin-table admin-table--masteroccupancy">
          <thead>
            <tr>
              <th className="width-5p">User ID</th>
              <th className="width-10p">Property ID</th>
              <th className="width-10p">Booking ID</th>
              <th className="width-10p">Booking Date</th>
              <th className="width-10p">Payment Method</th>
              <th className="width-10p">Paid online</th>
              <th className="width-10p">Paid at Hotel</th>
              <th className="width-10p text-right">Hotel Commission</th>
              <th className="width-10p text-right">Master Commission</th>
              <th className="width-15p text-right">Reconcilation Amount</th>
            </tr>
          </thead>
          <tbody>
            {responseData &&  (
              <Fragment>
                {responseData.length >= 1 &&
                  responseData.map((data, i) => {
                    return (
                      <tr key={`reconc-Key-${i}`}>
                        <td className="width-5p">
                         {data.user_id}
                        </td>
                        <td className="width-10p">{data.property_id}</td>
                        <td className="width-10p">{data.booking_id}</td>
                        <td className="width-10p">{data.date_time}</td>
                        <td className="width-10p">{data.payment_method}</td>

                          <td className="width-10p">{data.paid_online_amount==="N/A"? "-":<><span>NPR</span> {data.paid_online_amount}</> }</td>
                          <td className="width-10p">{data.paid_at_hotel_amount==="N/A"? "-": <><span>NPR</span> {data.paid_at_hotel_amount} </> }</td>

                        <td className="width-10p text-right">
                          <span>NPR</span> {data.hotel_commission}
                        </td>
                        <td className="width-10p text-right">
                          <span>NPR</span> {data.master_commission}
                        </td>
                    <td className="width-15p text-right"><span>NPR</span> {data.reconcilation_amount} </td>
                      </tr>
                    );
                  })}
              </Fragment>
            )}
          </tbody>
        </table>
      </div>
        </div>
        </>
    )
}

export default AdminReconcilationHistoryDetail
