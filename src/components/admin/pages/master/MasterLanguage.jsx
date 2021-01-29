import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import {
  AdminCardPrimary,
  AdminToggleSwitch,
  AdminButtonPrimary,
  AdminButtonSecondary,
  toastNotification,
  AdminConfirmationDialog,
  AdminSectionHeader,
} from "../../adminUtility";
import { AdminFormInput } from "../../adminUtility/AdminFormFields";
import IconEdit from "./../../../../assets/images/icon/icon-edit.svg";
import IconDelete from "./../../../../assets/images/icon/icon-delete.svg";
import CustomSpinner from "../../../CustomSpinner";
import masterServices from "../../adminServices/master";
import AdminMasterNav from "./../../nav/AdminMasterNav";

const AdminMasterLanguages = () => {
  const [isDelete, setIsDelete] = useState({ id: "" });
  const [editFormValue, setEditFormValue] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [languages, setLanguages] = useState([]);

  useEffect(() => {
    getData();
  }, []);
  // GET DATA
  const getData = () => {
    masterServices.get
      .languages()
      .then((response) => {
        setLanguages(response.data);
      })
      .catch((errors) => {
        toastNotification.error(errors);
      });
    setIsLoading(false);
  };
  // INITIAL VALUE
  const initialValues = {
    name: "",
    status: null,
  };

  // VALIDATE FORM-DATA
  const validate = (values) => {
    let errors = {};
    if (!values.name) {
      errors.name = "Required";
    }
    return errors;
  };

  // SUBMIT-DATA
  const onSubmit = (values, onSubmitProps) => {
    onSubmitProps.resetForm();
    if (editFormValue) {
      masterServices.patch
        .languages(values)
        .then((response) => {
          toastNotification.success(response.data.message);
          setEditFormValue(null);
          getData();
        })
        .catch((errors) => {
          toastNotification.error(errors);
        });
    } else
      masterServices.post
        .languages(values)
        .then((response) => {
          toastNotification.success(response.data.message);
          getData();
        })
        .catch((errors) => {
          toastNotification.error(errors);
        });
  };

  // DELETE CATEGORY
  const handleDelete = (id) => {
    masterServices.delete
      .languages(id)
      .then((response) => {
        toastNotification.success(response.data.message);
        getData();
      })
      .catch((errors) => {
        toastNotification.error(errors);
      });
  };

  // EDIT
  const handleEdit = (id) => {
    const dataToEdit = languages.filter((data) => {
      return data.id === id;
    });
    setEditFormValue(dataToEdit[0]);
  };

  // INTEGRATE FORMIK
  const formik = useFormik({
    initialValues: editFormValue || initialValues,
    enableReinitialize: true,
    validate,
    onSubmit,
  });

  // TOGGLE ROOM VIEW STATUS
  const toggleLanguageStatus = (id) => {
    const toggleCheckbox = languages.filter((view) => {
      return view.id == id;
    });

    const values = {
      id: id,
      status: toggleCheckbox[0] == null ? false : !toggleCheckbox[0].status,
    };

    masterServices.patch
      .languages(values)
      .then((response) => {
      toastNotification.success(response.data.message);

        getData();
      })
      .catch((errors) => {
       toastNotification.error(errors)
      });
  };

  return (
    <>
      <CustomSpinner isLoading={isLoading} />
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
            to: "/admin-master/language",
            title: "Language",
          },
        ]}
        sectionTitle="Language"
      />
      <AdminMasterNav />
      <div className="admin-boardtype-body">
        <div className="col-wrapper">
          <div className="col-item col-item--lg-3">
            <AdminCardPrimary>
              <h3 className="heading-tertiary">Add Languages</h3>
              <form className="admin-form" onSubmit={formik.handleSubmit}>
                <AdminFormInput
                  label="Languages"
                  placeholder="Input Language"
                  //id="input-master-language"
                  type="text"
                  name="name"
                  onChange={formik.handleChange}
                  value={formik.values.name}
                  onBlur={formik.handleBlur}
                  errors={
                    formik.touched.name && formik.errors.name
                      ? formik.errors.name
                      : ""
                  }
                />

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
              <h3 className="heading-tertiary">Lists Languages</h3>

              <table className="admin-table admin-table--masterlanguage">
                <thead>
                  <tr>
                    <th className="table__col-1">SN</th>
                    <th className="table__col-2">Languages</th>
                    <th className="table__col-3">Deactivate / Activate</th>
                    <th className="table__col-4">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {/*If errors on fetch data then show here*/}
                  {languages.errors && (
                    <div className="admin-datafetch-error">
                      {languages.errors}
                    </div>
                  )}

                  {/*Display data*/}
                  {languages &&
                    languages.map((language, i) => {
                      return (
                        <tr key={language.id}>
                          <th className="table__col-1">{i + 1}</th>
                          <td className="table__col-2">{language.name}</td>
                          <td className="table__col-3">
                            <AdminToggleSwitch
                              id={language.id}
                              checked={
                                language.status == null
                                  ? false
                                  : language.status
                              }
                              onChange={() => toggleLanguageStatus(language.id)}
                            />
                          </td>

                          <td className="table__col-4 table__col-groupaction">
                            <a
                              className="table__col-edit"
                              onClick={() => handleEdit(language.id)}
                            >
                              <img src={IconEdit} alt="Edit" />
                            </a>
                            <a
                              className="table__col-delete"
                              onClick={() =>
                                setIsDelete({
                                  id:
                                    isDelete.id == language.id
                                      ? null
                                      : language.id,
                                })
                              }
                            >
                              {isDelete.id == language.id && (
                                <AdminConfirmationDialog
                                  onClickYes={() => handleDelete(language.id)}
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
            </AdminCardPrimary>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminMasterLanguages;
