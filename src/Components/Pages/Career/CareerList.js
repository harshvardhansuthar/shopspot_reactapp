import React, { useEffect, useState } from 'react'
import Header from '../../commen/Header'
import Footer from '../../commen/Footer'
import { GetDataWithToken } from '../../../ApiHelper/ApiHelper'
import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'

export default function CareerList() {
    const [careerList, setCareerList] = useState([])

    const id = useLocation()

    useEffect(() => {
        GetDataWithToken("business/get-carrer").then((res) => {
            console.log(res)
            if (res.status == true) {
                setCareerList(res.data)
            }
        })
    }, [])

    return (
        <>
            {/* <!-- CONTENT START --> */}
            <Header class={"header-full-width"} />
            <div className="page-content">
                {/* <!-- Career List START --> */}
                <div className="section-full p-t50 p-b90 bg-light">
                    <div className="container">
                        {/* <!-- BLOG SECTION START --> */}
                        <div className="section-content">
                            <div className="container">
                                <div className="row">
                                    {careerList && careerList?.length > 0 && careerList?.map((item, key) => (<div className="col-xl-4 col-lg-4 col-md-6 col-12">
                                        <div className="hpage-6-featured-block" key={key}>
                                            <div className="inner-content">
                                                <div className="mid-content">
                                                    <div className="company-logo">
                                                        <img src={item?.Business?.business_licence} alt="#" />
                                                    </div>
                                                    <div className="company-info">
                                                        <Link to={"/careerdetail"} state={{ id: item?.id }} className="company-name"
                                                        >{item?.Business?.name}
                                                        </Link>
                                                        <p className="company-address">{item?.address}</p>
                                                    </div>
                                                </div>
                                                <div className="bottom-content">
                                                    <h4 className="job-name-title">{item?.post_name}</h4>
                                                </div>
                                                <div className="aply-btn-area">
                                                    <Link to={"/careerdetail"} state={{ id: item?.id }} className="aplybtn">
                                                        <i className="fas fa-chevron-right"></i>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>))}
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                {/* <!-- Career List END --> */}

            </div>
            {/* <!-- CONTENT END --> */}
            <Footer />

        </>
    )
}
