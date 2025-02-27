import { useState, useRef, useEffect } from "react";
import styles from './Works.module.css'
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
// import 'swiper/css/navigation';
import WorkModal from "../components/WorkModal";
import imgTravelNote from "../assets/travelnote.png"
import imgFlowerth from "../assets/flowerth.png"
import imgMichaelKors from "../assets/michaelkors.jpg"

const works = [
    {
        name: "TravelNote",
        imgSrc: imgTravelNote,
        numberOfImg: 7
    },
    {
        name: "꽃뜨 도자기카페",
        imgSrc: imgFlowerth,
        numberOfImg: 4
    },
    {
        name: "Michael Kors",
        imgSrc: imgMichaelKors,
        numberOfImg: 4
    },
    {
        name: "TBD",
        numberOfImg: 0
    },
    {
        name: "TBD",
        numberOfImg: 0
    },
    {
        name: "TBD",
        numberOfImg: 0
    },
    {
        name: "TBD",
        numberOfImg: 0
    },
    {
        name: "TBD",
        numberOfImg: 0
    },
]
 

const Works = ({location, main}) => {
    const [isOpenModal, setIsOpenModal] = useState(false)
    const [slides, setSlides] = useState()
    const [clickedSlide, setClickedSlide] = useState()

    const text1 = useRef(null)
    const worksBox = useRef(null)
    const workRefs = useRef(new Array(works.length))
    const navigationNextRef = useRef(null)
    const navigationPrevRef = useRef(null)

    const handleModal = (isOpen) => {
        setIsOpenModal(isOpen)
    }

    useEffect(() => {
        if(location === 'works'){
            setTimeout(function(){
                text1.current.style.setProperty('bottom', 0)
            }, 100)
            setTimeout(function(){
                worksBox.current.style.setProperty('bottom', 0)
            }, 200)
            for(let workRef in workRefs.current){
                setTimeout(function(){
                    workRefs.current[workRef].style.setProperty('bottom', 0)
                }, 400+(workRef*200))
            }
        }

    }, [location])
    

    return (
        <div className={styles.WorksContainer}>
            <div className={styles.titleBox}>
                <h1 ref={text1}>WORKS</h1>
            </div>

            <Swiper
                modules={[Navigation]}
                spaceBetween={20}
                slidesPerView={"auto"}
                navigation={{
                    prevEl: navigationPrevRef.current,
                    nextEl: navigationNextRef.current,
                }}
                onSwiper={(swiper) => {
                    setSlides(swiper.slides)
                }}
                onClick={(swiper) => {
                    if(swiper.clickedSlide && swiper.clickedSlide.id !== 'TBD'){
                        setIsOpenModal(true)
                        setClickedSlide(swiper.clickedSlide)
                        main.current.style.setProperty('overflow', 'hidden')
                        for(let slide of slides){
                            slide.style.setProperty('transform', 'scale(0.66)')
                        }
                    }
                }}
                style={{
                    width: "calc(100% - 5.25rem)",
                    // flex: "1",
                    marginLeft: "5.25rem",
                    // marginBottom: "3rem",
                    boxSizing: "border-box",
                    position: "relative",
                    transition: "ease .65s",
                    bottom: "calc(-100% + 302px)",
                    boxSizing: "border-box"
                }}
                ref={worksBox}
            >
                {works.map((work, id) => {
                    return (
                        <SwiperSlide
                            key={id}
                            id={work.name}
                            style={{
                                width: "fit-content",
                                height: "fit-content",
                                display: "flex",
                                transition: "ease .65s",
                                overflow: "hidden"
                            }}
                        >
                            <div ref={(el) => {workRefs.current[id] = el}} className={styles.workContainer}>
                                {work.imgSrc ? 
                                    <img className={styles.mainImg} src={work.imgSrc}></img> :
                                    <div className={styles.mainImg}></div>
                                }
                                <div className={isOpenModal ? 
                                    `${styles.workTitle} ${styles.hideWorkTitle}` :
                                    `${styles.workTitle}`
                                }>
                                    <h2>{work.name}</h2>
                                    <p>{work.numberOfImg} IMAGES</p>
                                </div>
                            </div>
                        </SwiperSlide>
                    )
                })}
            </Swiper>
            <div className={styles.swiperBtns}>
                <button className={styles.prevBtn} ref={navigationPrevRef}></button>
                <button className={styles.nextBtn} ref={navigationNextRef}></button>
            </div>
            <WorkModal
                isOpen={isOpenModal}
                handleModal={handleModal}
                main={main}
                slides={slides}
                location={location}
                clickedSlide={clickedSlide}
            />
            
            {/* <div className={styles.test}></div> */}
        </div>
    )
}

export default Works