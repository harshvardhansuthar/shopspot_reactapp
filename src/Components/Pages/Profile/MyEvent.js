import React from "react";

export default function MyEvent(props) {
  return (
    <>
      <form>
        {/* <!--Basic Information--> */}
        <div className="panel panel-default">
          <div className="panel-heading wt-panel-heading p-a20">
            <h4 className="panel-tittle m-a0">All Events</h4>
          </div>
          <div className="panel-body wt-panel-body p-a20 m-b30">
            <div className="row">
              <div className="col-md-6 col-12">
                <div className="activity card">
                  <div className="event-img">
                    <img src="./images/4163019 1.png" alt="" />
                  </div>
                  <div className="card-body position-relative">
                    <div className="event-logo">
                      <img src="./images/jobs-company/pic2.jpg" alt="" />
                    </div>
                    <div className="d-flex align-items-start justify-content-between">
                      <h5 className="">Ultra music festival</h5>
                      <p className="mb-0">26 Apr 2023</p>
                    </div>
                    <div className="details">
                      <h6>Artist: Jason Goodwin</h6>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-12">
                <div className="activity card">
                  <div className="event-img">
                    <img src="./images/event2.png" alt="" />
                  </div>
                  <div className="card-body position-relative">
                    <div className="event-logo">
                      <img src="./images/jobs-company/pic1.jpg" alt="" />
                    </div>
                    <div className="d-flex align-items-start justify-content-between">
                      <h5 className="">Ultra music festival</h5>
                      <p className="mb-0">26 Apr 2023</p>
                    </div>
                    <div className="details">
                      <h6>Artist: Jason Goodwin</h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
