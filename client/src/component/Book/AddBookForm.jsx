import React, { useState } from "react"
import { Button, Container, Form, Spinner, Alert } from "react-bootstrap"
import { API } from "../../config/api"
import { useNavigate } from "react-router-dom"
import { useMutation } from "react-query"

const AddBookForm = () => {
  const [isLoading, setIsloading] = useState(false)
  const [preview, setPreview] = useState(null) //For image preview
  const [message, setMessage] = useState(null)

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

      // Store data with FormData as object
      const formData = new FormData()

      formData.set("title", form.title)
      formData.set("author", form.author)
      formData.set("publication_date", form.publication_date)
      formData.set("pages", form.pages)
      formData.set("isbn", form.isbn)
      formData.set("price", form.price)
      formData.set("description", form.description)
      formData.set("image", form.image[0], form.image[0].name)
      formData.set("filePDF", form.filePDF[0], form.filePDF[0].name)

      // Insert product data

      await API.post("/book", formData)
      navigate("/list-book")
    } catch (error) {
      console.log(error)
      const alert = (
        <Alert variant="denger" className="py-1">
          Add Book Failed
        </Alert>
      )
      setMessage(alert)
    }
  })

  return (
    <Container className="margin">
      {message}
      <Form className="mx-5" onSubmit={(e) => handleSubmit.mutate(e)}>
        <h1>Add Book</h1>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Title"
            onChange={handleChange}
            name="title"
            required
          ></Form.Control>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Author</Form.Label>
          <Form.Control
            type="text"
            placeholder="Author"
            onChange={handleChange}
            name="author"
            required
          ></Form.Control>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Publication Date</Form.Label>
          <Form.Control
            type="date"
            placeholder="Publication Date"
            onChange={handleChange}
            name="publication_date"
            required
          ></Form.Control>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Pages</Form.Label>
          <Form.Control
            type="text"
            placeholder="Pages"
            onChange={handleChange}
            name="pages"
            required
          ></Form.Control>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>ISBN</Form.Label>
          <Form.Control
            type="text"
            placeholder="ISBN"
            onChange={handleChange}
            name="isbn"
            required
          ></Form.Control>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="text"
            placeholder="Price"
            onChange={handleChange}
            name="price"
            required
          ></Form.Control>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>About this book</Form.Label>
          <Form.Control
            as="textarea"
            placeholder="About This Book"
            rows={3}
            onChange={handleChange}
            name="description"
            required
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
          <Form.Control
            type="file"
            onChange={handleChange}
            name="image"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Attach Book File</Form.Label>
          <Form.Control
            type="file"
            onChange={handleChange}
            name="filePDF"
            required
          />
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
            "Add Book"
          )}
        </Button>
      </Form>
    </Container>
  )
}

export default AddBookForm
