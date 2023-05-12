import React, { useState, useEffect } from "react";
import Header from "../../commen/Header";
import Footer from "../../commen/Footer";
import { GetData } from "../../../ApiHelper/ApiHelper";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Loder from "../../commen/Loder";

export default function AllCategory() {
  const [allCategory, setAllCategory] = useState({});
  const [allCategoryData, setAllCategoryData] = useState({});
  const countryNameRedux = useSelector((state) => state?.countryName?.action)
  const [componentLoader, setComponentLoader] = useState(true);



  useEffect(() => {
    GetData("category/get-main-category").then((res) => {
      setAllCategory(res.data);
    });
  }, []);

  useEffect(() => {
    setComponentLoader(true)
    GetData(`category/get-category?id=${allCategory[0]?.id}&country=${countryNameRedux}`).then((res) => {
      console.log(res);
      if (res?.status == true) {
        setAllCategoryData(res.data);
        setComponentLoader(false)
      }
    });
  }, [allCategory, countryNameRedux]);

  const handleCategoryData = (id) => {
    console.log(id);
    setComponentLoader(true)
    GetData(`category/get-category?id=${id}&country=${countryNameRedux}`).then((res) => {
      console.log(res);
      if (res?.status == true) {
        setAllCategoryData(res.data);
        setComponentLoader(false)

      }
    });
  };
  return (
    <>
      {componentLoader ? (
        <Loder />
      ) : (
        <>

          {/* <!-- CONTENT START --> */}
          <Header class={"header-full-width"} />
          <div class="page-content">
            {/* <!-- SECTION CONTENT START --> */}
            <div class="section-full">
              <div class="twm-jobatglance-h8 container p-t50 p-b90">
                <div class="row justify-content-start">
                  {/* <!-- Headings start here... --> */}
                  <div class="col-12">
                    <ul
                      class="nav category-nav nav-pills mb-4"
                      id="pills-tab"
                      role="tablist"
                    >
                      {allCategory &&
                        allCategory?.length > 0 &&
                        allCategory?.map((item, key) => (
                          <li class="nav-item" role="presentation" key={key}>
                            <button
                              onClick={() => handleCategoryData(item.id)}
                              class="nav-link"
                              id="Food-beverage-tab"
                              data-bs-toggle="pill"
                              data-bs-target="#Food-beverage"
                              type="button"
                              role="tab"
                              aria-controls="Food-beverage"
                              aria-selected="true"
                            >
                              {item.name.toUpperCase()}
                            </button>
                          </li>
                        ))}
                      {/* <li class="nav-item" role="presentation">
                        <button
                          class="nav-link active"
                          id="Consultancy-serive-tab"
                          data-bs-toggle="pill"
                          data-bs-target="#Consultancy-service"
                          type="button"
                          role="tab"
                          aria-controls="Consultancy-service"
                          aria-selected="false"
                        >
                          CONSULTANCY SERVICES
                        </button>
                      </li> */}
                    </ul>

                    <div class="tab-content" id="pills-tabContent">
                      <div
                        class="tab-pane fade show active"
                        id="Food-beverage"
                        role="tabpanel"
                        aria-labelledby="Food-beverage-tab"
                        tabindex="0"
                      >
                        <div class="row">
                          {/* <!--1--> */}
                          {allCategoryData?.Categories?.length == 0 ? <h1> no business in this category please select another country </h1> :
                            allCategoryData &&
                            allCategoryData?.Categories?.length > 0 &&
                            allCategoryData?.Categories?.map((item, key) => (
                              <div class="col-lg-3 col-md-4 col-12" key={key}>
                                <div class="job-categories-home-8 mb-3">
                                  <div class="twm-media cat-bg-clr-3">
                                    <img src={item?.image} alt="" />
                                  </div>
                                  <Link to={"/business"} state={{ id: item.id }}>
                                    {item?.name}
                                  </Link>
                                  <div class="twm-content">
                                    <div class="twm-jobs-available">
                                      {item?.Businesses?.length}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <!-- SECTION CONTENT END  --> */}
            <Footer />
          </div>
          {/* <!-- CONTENT END --></> */}
        </>
      )}
    </>

  );
}
