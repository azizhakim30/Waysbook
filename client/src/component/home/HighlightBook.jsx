import React, { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/pagination"
import { Pagination } from "swiper"
import { Button } from "react-bootstrap"
import { API } from "../../config/api"
import { useQuery } from "react-query"
import { UserContext } from "../../context/userContext"
import Login from "../auth/Login"
import Register from "../auth/Register"

const HighlightBook = () => {
  const navigate = useNavigate()
  const [state] = useContext(UserContext)
  const [showRegister, setShowRegister] = useState(false)
  const [showLogin, setShowLogin] = useState(false)

  const formatIDR = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  })

  const { data: favorite } = useQuery("favoriteCache", async () => {
    const response = await API.get("/books-favorite")

    return response.data.data
  })

  // const { data: cart, refetch } = useQuery("cartsCache", async () => {
  //   if (state.isLogin === true) {
  //     const response = await API.get("/user-cart")
  //     return response.data.data
  //   }
  // })

  // const addCart = async (id) => {
  //   try {
  //     const data = {
  //       book_id: id,
  //     }

  //     const body = JSON.stringify(data)

  //     const response = await API.post("/cart", body)
  //     refetch()
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  return (
    <div style={{ marginTop: "150px" }} className="bg-grey">
      <Swiper
        slidesPerView={3}
        spaceBetween={150}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper img-fluid"
      >
        {favorite?.map((e, index) => {
          return (
            <SwiperSlide key={index}>
              <div className="d-flex pe-5" style={{ width: "500px" }}>
                <img
                  src={e.image}
                  alt="books"
                  onClick={() => {
                    state?.isLogin === false
                      ? setShowLogin(true)
                      : navigate(`/detail-book/${e.id}`)
                  }}
                  style={{ width: "236px", height: "345px" }}
                />
                <div
                  className="px-4 py-3 bg-white"
                  style={{ width: "260px", height: "277px" }}
                >
                  <h2
                    className="fw-bold leading-none text-truncate"
                    style={{ width: "200px" }}
                    onClick={() => {
                      state?.isLogin === false
                        ? setShowLogin(true)
                        : navigate(`/detail-book/${e.id}`)
                    }}
                  >
                    {e.title}
                  </h2>
                  <p
                    className="italic text-secondary text-truncate"
                    style={{ width: "200px" }}
                  >
                    By. {e.author}
                  </p>
                  <p
                    className="text-justify font-avanir break-all text-truncate"
                    style={{ width: "200px" }}
                  >
                    {e.description}
                  </p>
                  <p className="text-success fw-bold  ">
                    {formatIDR.format(e.price)}
                  </p>
                  <Button
                    variant="dark px-5 rounded-0"
                    onClick={
                      state.isLogin === false
                        ? () => setShowLogin(true)
                        : () => navigate("/detail-book/" + e.id)
                    }
                  >
                    Detail Book
                  </Button>
                </div>
              </div>
            </SwiperSlide>
          )
        })}
      </Swiper>
      <Login
        show={showLogin}
        hide={() => {
          setShowLogin(false)
        }}
        setShowLogin={setShowLogin}
        setShowRegister={setShowRegister}
      />
      <Register
        show={showRegister}
        hide={() => setShowRegister(false)}
        setShowRegister={setShowRegister}
        setShowLogin={setShowLogin}
      />
    </div>
  )
}

export default HighlightBook
