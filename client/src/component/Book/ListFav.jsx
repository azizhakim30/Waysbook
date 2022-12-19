import React from "react"
import { Table, Button } from "react-bootstrap"
import { API } from "../../config/api"
import { useQuery } from "react-query"
import { useNavigate } from "react-router-dom"

const ListFav = () => {
  let { data: books, refetch } = useQuery("booksPromoCache", async () => {
    const response = await API.get("/books-promo")

    return response.data.data
  })

  const navigate = useNavigate()

  const formatIDR = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  })

  let handleDelete = async (id) => {
    const data = {
      status: "regular",
    }
    const body = JSON.stringify(data)
    await API.patch(`/book-promo/${id}`, body)
    refetch()
  }
  return (
    <>
      <div style={{ width: "80%", margin: "0 auto" }}>
        <h2 className="mt-5 mb-5 fw-bold">Favorite Book List</h2>
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
                      variant="danger"
                      onClick={() => {
                        if (window.confirm("Delete the item?")) {
                          handleDelete(e.id)
                        }
                      }}
                    >
                      Delete From FavList
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

export default ListFav
