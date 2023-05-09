// import React from "react";

// export default function EmployerTransaction() {
//   return (
//     <>
//         <div class=" candidate-save-job" >
//           {/* <!--Filter Short By--> */}
//           <div class="product-filter-wrap d-flex justify-content-between align-items-center">
//             <span class="woocommerce-result-count-left">
//               Transaction History
//             </span>

//             <form class="woocommerce-ordering twm-filter-select" method="get">
//               <span class="woocommerce-result-count">Short By</span>
//               <select
//                 class="wt-select-bar-2 selectpicker"
//                 data-live-search="true"
//                 data-bv-field="size"
//               >
//                 <option>Last 2 Months</option>
//                 <option>Last 1 Months</option>
//                 <option>15 days ago</option>
//                 <option>Weekly</option>
//                 <option>Yesterday</option>
//                 <option>Today</option>
//               </select>
//             </form>
//           </div>

//           <div class="table-responsive">
//             <table class="table twm-table table-striped table-borderless">
//               <thead>
//                 <tr>
//                   <th>Order ID</th>
//                   <th>Date</th>
//                   <th>Gift Name</th>
//                   <th>Amount</th>
//                 </tr>
//               </thead>

//               <tbody>
//                 <tr>
//                   <td class="order-id text-primary">#123</td>
//                   <td class="date">18/08/2023</td>
//                   <td class="job-name">
//                     <a href="javascript:void(0);">
//                       Purchased gift voucher from Milano city center
//                     </a>
//                   </td>
//                   <td class="amount text-primary">
//                     <span class="text-clr-green2">$99</span>
//                   </td>
//                 </tr>
//                 <tr>
//                   <td class="order-id text-primary">#123</td>
//                   <td class="date">18/08/2023</td>
//                   <td class="job-name">
//                     <a href="javascript:void(0);">
//                       Purchased gift voucher from Milano city center
//                     </a>
//                   </td>
//                   <td class="amount text-primary">
//                     <span class="text-clr-green2">$99</span>
//                   </td>
//                 </tr>
//                 <tr>
//                   <td class="order-id text-primary">#123</td>
//                   <td class="date">18/08/2023</td>
//                   <td class="job-name">
//                     <a href="javascript:void(0);">
//                       Purchased gift voucher from Milano city center
//                     </a>
//                   </td>
//                   <td class="amount text-primary">
//                     <span class="text-clr-red">$123</span>
//                   </td>
//                 </tr>
//                 <tr>
//                   <td class="order-id text-primary">#123</td>
//                   <td class="date">18/08/2023</td>
//                   <td class="job-name">
//                     <a href="javascript:void(0);">
//                       Purchased gift voucher from Milano city center
//                     </a>
//                   </td>
//                   <td class="amount text-primary">
//                     <span class="text-clr-green2">$99</span>
//                   </td>
//                 </tr>
//                 <tr>
//                   <td class="order-id text-primary">#123</td>
//                   <td class="date">18/08/2023</td>
//                   <td class="job-name">
//                     <a href="javascript:void(0);">
//                       Purchased gift voucher from Milano city center
//                     </a>
//                   </td>
//                   <td class="amount text-primary">
//                     <span class="text-clr-green2">$99</span>
//                   </td>
//                 </tr>
//                 <tr>
//                   <td class="order-id text-primary">#123</td>
//                   <td class="date">18/08/2023</td>
//                   <td class="job-name">
//                     <a href="javascript:void(0);">
//                       Purchased gift voucher from Milano city center
//                     </a>
//                   </td>
//                   <td class="amount text-primary">
//                     <span class="text-clr-green2">$99</span>
//                   </td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>
//           <div class="pagination-outer text-right">
//             <div class="pagination-style1">
//               <ul class="clearfix">
//                 <li class="prev">
//                   <a href="javascript:;">
//                     <span>
//                       {" "}
//                       <i class="fa fa-angle-left"></i>{" "}
//                     </span>
//                   </a>
//                 </li>
//                 <li>
//                   <a href="javascript:;">1</a>
//                 </li>
//                 <li class="active">
//                   <a href="javascript:;">2</a>
//                 </li>
//                 <li>
//                   <a href="javascript:;">3</a>
//                 </li>
//                 <li>
//                   <a class="javascript:;" href="javascript:;">
//                     <i class="fa fa-ellipsis-h"></i>
//                   </a>
//                 </li>
//                 <li>
//                   <a href="javascript:;">5</a>
//                 </li>
//                 <li class="next">
//                   <a href="javascript:;">
//                     <span>
//                       {" "}
//                       <i class="fa fa-angle-right"></i>{" "}
//                     </span>
//                   </a>
//                 </li>
//               </ul>
//             </div>
//           </div>
//         </div>

//     </>
//   );
// }

import React, { useState } from "react";
import $ from "jquery";
import { GetDataWithToken } from "../../../ApiHelper/ApiHelper";
import { useEffect } from "react";
// import "datatables.net";
// import "datatables.net-bs4/css/dataTables.bootstrap4.min.css";

export default function EmployerTransaction(props) {
  const [transaction, setTransaction] = useState([]);

  useEffect(() => {
    GetDataWithToken("auth/transaction-history").then((res) => {
      console.log(res);
      // if (res?.data?.length > 0) {
      //   setTimeout(() => {
      //     $(document).ready(function () {
      //       $("#table").DataTable();
      //     });
      //   }, 3000);
      setTransaction(res.data);
      // }
    });
  }, [props.callApi]);

  return (
    <>
      <div className="table-responsive">
        <table id="Trantable" className="table table-hover">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Date</th>
              <th>Gift Name </th>
              <th >points</th>
            </tr>
          </thead>
          {transaction && transaction.length > 0 && (
            <tbody>
              {transaction?.map((data, key) => (
                <tr key={key} className="text-nowrap">
                  <td>
                    <p className="text-wrap">{key + 1}</p>
                  </td>

                  <td>
                    <p className="text-wrap">
                      {data?.createdAt?.split("T")?.[0]}
                    </p>
                  </td>
                  <td>
                    <p className="text-capitalize">{data?.message}</p>
                  </td>
                  <td>
                    <p className={`text-wrap ${data?.type == "credit" ? "text-clr-green2" : "text-clr-red"}`}>{data?.points}</p>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>
    </>
  );
}
