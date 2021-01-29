import React, { useEffect, useState } from "react";
import { useFormik } from "formik";

import {
  AdminCardPrimary,
  AdminButtonPrimary,
  AdminButtonSecondary,
  toastNotification,
  AdminFormInput,
  AdminFormSelectNormal,
  AdminConfirmationDialog,
  AdminSectionHeader,
} from "../../adminUtility";
import IconEdit from "./../../../../assets/images/icon/icon-edit.svg";
import IconDelete from "./../../../../assets/images/icon/icon-delete.svg";
import CustomSpinner from "../../../CustomSpinner";
import masterServices from "../../adminServices/master";
import AdminMasterNav from "./../../nav/AdminMasterNav";

const MasterMealAgeDef = () => {
  const [isDelete, setIsDelete] = useState({ id: "" });
  const [editFormValue, setEditFormValue] = useState(null);
  const [mealAge, setMealAge] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    getData();
  }, []);

  // GET DATA
  const getData = () => {
    masterServices.get
      .mealAgesDef()
      .then((response) => {
        setMealAge(response.data);
      })
      .catch((errors) => {
        toastNotification.error(errors);
      });
    setIsLoading(false);
  };
  // INITIAL VALUE
  const initialValues = {
    categoryName: "",
    fromAge: "",
    toAge: "",
  };

  // VALIDATE FORM-DATA
  const validate = (values) => {
    let errors = {};
    if (!values.categoryName) {
      errors.categoryName = "Required";
    }
    if (!values.toAge) {
      errors.toAge = "Required";
    }
    if (!values.fromAge) {
      errors.fromAge = "Required";
    }
    return errors;
  };

  // SUBMIT-DATA
  const onSubmit = (values, onSubmitProps) => {
    onSubmitProps.resetForm();
    if (editFormValue) {
      masterServices.put
        .mealAgesDef(values)
        .then((response) => {
          setEditFormValue(null);
          toastNotification.success(response.data.message);
          getData();
        })
        .catch((errors) => {
          toastNotification.error(errors);
        });
    } else {
      masterServices.post
        .mealAgesDef(values)
        .then((response) => {
          toastNotification.success(response.data.message);

          getData();
        })
        .catch((errors) => {
          toastNotification.error(errors);
        });
    }
  };

  // INTEGRATE FORMIK
  const formik = useFormik({
    initialValues: editFormValue || initialValues,
    enableReinitialize: true,
    validate,
    onSubmit,
  });

  // DELETE CATEGORY
  const handleDelete = (id) => {
    masterServices.delete
      .mealAgesDef(id)
      .then((response) => {
        toastNotification.success(response.data.message);
        getData();
      })
      .catch((errors) => {
        toastNotification.error(errors);
      });
  };

  // EDIT OCCUPANCY
  const handleEdit = (id) => {
    const editFormValue = mealAge.filter((data) => {
      return data.id === id;
    });
    setEditFormValue(editFormValue[0]);
  };

  return (
    <>
      <CustomSpinner isLoading={isLoading} />
      <div className="admin-master-mealages-body">
        <AdminSectionHeader
          breadCrumb={[
            {
              to: "/admin-dashboard",
              title: "Dashboard",
            },
            {
              to: "/admin-master",
              title: "Master",
            },
            {
              to: "/admin-master/ages-def",
              title: "Meal Ages Different Type",
            },
          ]}
          sectionTitle="Meal Ages Different Type"
        />
        <AdminMasterNav />
        <div className="col-wrapper">
          <div className="col-item col-item--lg-3">
            <AdminCardPrimary>
              <h3 className="heading-tertiary">Add New Age Type</h3>
              <form
                className="admin-form"
                onSubmit={formik.handleSubmit}
                autoComplete="off"
              >
                <AdminFormSelectNormal
                  label="Category Name"
                  name="categoryName"
                  placeholder="Select"
                  value={formik.values.categoryName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  type="text"
                  onBlur={formik.handleBlur}
                  errors={
                    formik.touched.categoryName && formik.errors.categoryName
                      ? formik.errors.categoryName
                      : ""
                  }
                  options={["Children", "Adult", "Old"]}
                />
                <div className="admin-form__group-multiple">
                  <AdminFormInput
                    label="From"
                    name="fromAge"
                    placeholder="Enter Age"
                    value={formik.values.fromAge}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    type="number"
                    onBlur={formik.handleBlur}
                    errors={
                      formik.touched.fromAge && formik.errors.fromAge
                        ? formik.errors.fromAge
                        : ""
                    }
                  />
                  <AdminFormInput
                    label="To"
                    name="toAge"
                    placeholder="Enter Age"
                    value={formik.values.toAge}
                    onChange={formik.handleChange}
                    type="number"
                    onBlur={formik.handleBlur}
                    errors={
                      formik.touched.toAge && formik.errors.toAge
                        ? formik.errors.toAge
                        : ""
                    }
                  />
                </div>

                <div className="admin-form__group-multiple">
                  <AdminButtonSecondary
                    title="Clear"
                    type="reset"
                    onClick={formik.resetForm}
                  />
                  <AdminButtonPrimary title="Add" type="submit" />
                </div>
              </form>
            </AdminCardPrimary>
          </div>
          <div className="col-item col-item--lg-9">
            <AdminCardPrimary>
              <h3 className="heading-tertiary">Lists Age Types</h3>

              {/*Display get data*/}
              {mealAge && (
                <table className="admin-table admin-table--mastermealages">
                  <thead>
                    <tr>
                      <th className="table__col-1">SN</th>
                      <th className="table__col-2">Categpry Name</th>
                      <th className="table__col-3">From</th>
                      <th className="table__col-4">To</th>
                      <th className="table__col-5">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mealAge.map((type, i) => {
                      return (
                        <tr key={type.id}>
                          <th className="table__col-1">{i + 1}</th>
                          <td className="table__col-2">{type.categoryName}</td>
                          <td className="table__col-3">{type.fromAge}</td>
                          <td className="table__col-4">{type.toAge}</td>
                          <td className="table__col-5 table__col-groupaction">
                            <a
                              className="table__col-edit"
                              onClick={() => handleEdit(type.id)}
                            >
                              <img src={IconEdit} alt="Edit" />
                            </a>
                            <a
                              className="table__col-delete"
                              onClick={() =>
                                setIsDelete({
                                  id: isDelete.id == type.id ? null : type.id,
                                })
                              }
                            >
                              {isDelete.id == type.id && (
                                <AdminConfirmationDialog
                                  onClickYes={() => handleDelete(type.id)}
                                  message="Are you sure Delete ?"
                                  position="top"
                                />
                              )}

                              <img src={IconDelete} alt="Delete" />
                            </a>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </AdminCardPrimary>
          </div>
        </div>
      </div>
    </>
  );
};

export default MasterMealAgeDef;
