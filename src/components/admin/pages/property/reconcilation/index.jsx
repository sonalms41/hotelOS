import React, { Fragment, useEffect, useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import CustomSpinner from "../../../../CustomSpinner";
import { AdminSectionHeader } from "../../../adminUtility";
import AdminReconcilationHistory from "./AdminReconcilationHistory";
import AdminReconcilationReport from "./AdminReconcilationReport";
import AdminReconcilations from "./AdminReconcilations";

const AdminPropReconcilation = (props) => {
  const [property, setProperty] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    const routeData = props.match.params;
    setProperty({
      name: routeData.propertyName,
      id: routeData.id,
    });
    setIsLoading(false);
  }, [props.match.params]);

  return (
    <div className="admin-prop-reconcilation">
      
      <CustomSpinner isLoading={isLoading} />
      {property && (
        <Fragment>
          <AdminSectionHeader
            breadCrumb={[
              {
                to: "/admin-dashboard",
                title: "Dashboard",
              },
              {
                to: "/admin-property",
                title: "Property",
              },
              {
                to: `/admin-property/dashboard/${property.id}`,
                title: "Property Dashboard",
              },
              {
                title: "Reconcilation",
              },
            ]}
            sectionTitle={property.name}
          />

          <Tabs>
            <div className="card-primary reconc-nav">
              <TabList>
                <Tab>Reconcilations</Tab>
                <Tab>Reconcilation history</Tab>
                <Tab>Reconcilation report</Tab>
              </TabList>
            </div>
            <TabPanel>
              <AdminReconcilations propertyId={property.id} />
            </TabPanel>
            <TabPanel>
              <AdminReconcilationHistory propertyId={property.id} propertyName={property && property.name} />
            </TabPanel>
            <TabPanel>
              <AdminReconcilationReport propertyId={property.id} />
            </TabPanel>
          </Tabs>
        </Fragment>
      )}
    </div>
  );
};

export default AdminPropReconcilation;
