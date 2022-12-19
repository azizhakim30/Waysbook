import React, { useState, useEffect } from "react"
import { Button, Container, Form, Spinner, Alert } from "react-bootstrap"
import { API } from "../config/api"
import { useNavigate, useParams } from "react-router-dom"
import { useMutation } from "react-query"
import { useQuery } from "react-query"

const EditBook = () => {
  const { id } = useParams()

  let { data: book } = useQuery("bookCache", async () => {
    const response = await API.get("/book/" + id)

    return response.data.data
  })

  const [isLoading, setIsloading] = useState(false)

  const [message, setMessage] = useState(null)
  const [preview, setPreview] = useState(null) //For image preview
  const [form, setForm] = useState({
    title: "",
    publication_date: "",
    pages: "",
    isbn: "",
    price: "",
    description: "",
    author: "",
    image: "",
    filePDF: "",
  })

  useEffect(() => {
    setPreview(book?.image)
    setForm({
      title: book?.title,
      publication_date: book?.publication_date,
      pages: book?.pages,
      price: book?.price,
      description: book?.description,
      author: book?.author,
      isbn: book?.isbn,
    })
  }, [book])

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    })

    // Create image url for preview
    if (e.target.type === "file" && e.target.name === "image") {
      let url = URL.createObjectURL(e.target.files[0])
      setPreview(url)
    }
  }

  let navigate = useNavigate()

  const handleSubmit = useMutation(async (e) => {
    setIsloading(true)
    try {
      e.preventDefault()

      // Configuration
      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      }

      // Store data with FormData as object
      const formData = new FormData()

      formData.set("title", form.title)
      formData.set("author", form.author)
      formData.set("publication_date", form.publication_date)
      formData.set("pages", form.pages)
      formData.set("isbn", form.isbn)
      formData.set("price", form.price)
      formData.set("description", form.description)
      if (form?.image !== undefined) {
        formData.set("image", form.image[0])
      }
      if (form?.filePDF !== undefined) {
        formData.set("filePDF", form.filePDF[0])
      }

      // Insert product data
      await API.patch(`/book/${id}`, formData, config)
      navigate("/list-book")
    } catch (error) {
      console.log(error)
      const alert = (
        <Alert variant="denger" className="py-1">
          Edit Book Failed
        </Alert>
      )
      setMessage(alert)
    }
  })

  return (
    <Container className="margin">
      <Form className="mx-5" onSubmit={(e) => handleSubmit.mutate(e)}>
        <h1>Add Book</h1>
        {message}
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Title"
            onChange={handleChange}
            value={form.title}
            name="title"
          ></Form.Control>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Author</Form.Label>
          <Form.Control
            type="text"
            value={form?.author}
            placeholder="Author"
            onChange={handleChange}
            name="author"
          ></Form.Control>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Publication Date</Form.Label>
          <Form.Control
            type="date"
            placeholder="Publication Date"
            value={form?.publication_date}
            onChange={handleChange}
            name="publication_date"
          ></Form.Control>
        </Form.Group>
        <Form.Group className="mb-3">
          {" "}
          <Form.Label>Pages</Form.Label>
          <Form.Control
            type="text"
            placeholder="Pages"
            value={form?.pages}
            onChange={handleChange}
            name="pages"
          ></Form.Control>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>ISBN</Form.Label>
          <Form.Control
            type="text"
            placeholder="ISBN"
            value={form?.isbn}
            onChange={handleChange}
            name="isbn"
          ></Form.Control>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="text"
            placeholder="Price"
            value={form?.price}
            onChange={handleChange}
            name="price"
          ></Form.Control>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>About this book</Form.Label>
          <Form.Control
            as="textarea"
            placeholder="About This Book"
            rows={3}
            onChange={handleChange}
            value={form?.description}
            name="description"
          ></Form.Control>
        </Form.Group>
        <Form.Group className="mb-3">
          <img
            src={preview}
            style={{
              maxWidth: "150px",
              maxHeight: "150px",
              objectFit: "cover",
            }}
            alt={preview}
          />
          <br />
          <Form.Label>Cover Book</Form.Label>
          <Form.Control type="file" onChange={handleChange} name="image" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Attach Book File</Form.Label>
          <Form.Control type="file" onChange={handleChange} name="filePDF" />
        </Form.Group>
        <Button type="submit" variant="dark" className="float-end">
          {isLoading ? (
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />
          ) : (
            "Edit Book"
          )}
        </Button>
      </Form>
    </Container>
  )
}

export default EditBook
