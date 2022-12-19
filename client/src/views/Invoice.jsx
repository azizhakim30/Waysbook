import React from "react"
import { Table } from "react-bootstrap"
import { API } from "../config/api"
import { useQuery } from "react-query"

function Invoice() {
  let { data: trans } = useQuery("transactionssCache", async () => {
    const response = await API.get("/transactions")

    return response.data.data
  })

  const formatIDR = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  })

  return (
    <>
      <div style={{ width: "80%", margin: "0 auto" }}>
        <h2 className="mt-5 mb-5 fw-bold">Incoming Transaction</h2>
        <Table striped width="600px">
          <thead>
            <tr className="text-danger fw-bold">
              <th>No</th>
              <th>Users</th>
              <th>Product Purchased</th>
              <th>Total Payment</th>
              <th>Status Payment</th>
            </tr>
          </thead>
          <tbody>
            {trans?.map((e, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{e.user.fullname}</td>
                  <td>
                    {e.cart.map((a) => {
                      return <span>{a.book.title}, </span>
                    })}
                  </td>
                  <td>{formatIDR.format(e.total)}</td>
                  <td>{e.status}</td>
                </tr>
              )
            })}
          </tbody>
        </Table>
      </div>
    </>
  )
}

export default Invoice
