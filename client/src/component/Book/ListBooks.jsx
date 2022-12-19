import React from "react"
import { Table, Button } from "react-bootstrap"
import { API } from "../../config/api"
import { useQuery } from "react-query"
import { useNavigate } from "react-router-dom"

const ListBooks = () => {
  let { data: books, refetch } = useQuery("bookssCache", async () => {
    const response = await API.get("/books")

    return response.data.data
  })

  const navigate = useNavigate()

  const formatIDR = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  })

  let handleDelete = async (id) => {
    await API.delete(`/book/` + id)
    refetch()
  }

  const handlePromo = async (id) => {
    const data = {
      status: "promo",
    }

    const body = JSON.stringify(data)
    await API.patch(`/book-promo/${id}`, body)
    refetch()
    navigate("/fav-list")
  }

  return (
    <>
      <div style={{ width: "80%", margin: "0 auto" }}>
        <h2 className="mt-5 mb-5 fw-bold">List Book</h2>
        <Table striped width="600px">
          <thead>
            <tr className="text-danger fw-bold">
              <th>Title</th>
              <th>Price</th>
              <th>Image</th>
              <th>Ebook</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {books?.map((e, index) => {
              return (
                <tr key={index}>
                  <td>{e.title}</td>
                  <td>{formatIDR.format(e.price)}</td>
                  <td>
                    <img
                      src={e.image}
                      style={{
                        height: "50px",
                        width: "50px",
                        objectFit: "cover",
                      }}
                    />
                  </td>
                  <td>{e.filePDF}</td>
                  <td>
                    <Button
                      variant="success"
                      className="me-2"
                      onClick={() => navigate("/edit-book/" + e.id)}
                    >
                      Edit
                    </Button>
                    <Button
                      className="me-2"
                      onClick={() => {
                        if (window.confirm("Add to promo list?")) {
                          handlePromo(e.id)
                        }
                      }}
                    >
                      AddPromo
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => {
                        if (window.confirm("Delete the item?")) {
                          handleDelete(e.id)
                        }
                      }}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </Table>
      </div>
    </>
  )
}

export default ListBooks
