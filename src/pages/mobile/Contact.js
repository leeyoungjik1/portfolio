import { useState, useRef, useEffect } from "react";
import styles from './Contact.module.css'
import Footer from "./Footer";
import emailjs from '@emailjs/browser';

const Contact = ({location}) => {
    const text1 = useRef(null)
    const input1Text = useRef(null)
    const input1 = useRef(null)
    const input2Text = useRef(null)
    const input2 = useRef(null)
    const input3Text = useRef(null)
    const input3 = useRef(null)
    const input4Text = useRef(null)
    const input4 = useRef(null)
    const button = useRef(null)

    const form = useRef()
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        title: '',
        message: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target 
        setFormData({ ...formData, [name]: value })
    }

    const sendEmail = (e) => {
        e.preventDefault()

        emailjs
            .sendForm('service_tjr33hf', 'template_5eocj4g', form.current, {
                publicKey: 'g-BAwwrOwTFLUKAKd',
            })
            .then(
                () => {
                    alert('이메일 전송이 완료되었습니다.')
                    setFormData({
                    name: '',
                    email: '',
                    title: '',
                    message: ''
                })},
                (error) => {
                    console.log('FAILED...', error.text)
                },
            )
    }

    useEffect(() => {
        if(location === 'contact'){
            setTimeout(function(){
                text1.current.style.setProperty('bottom', 0)
            }, 100)
            setTimeout(function(){
                input1Text.current.style.setProperty('bottom', 0)
                input1.current.style.setProperty('bottom', 0)
            }, 300)
            setTimeout(function(){
                input2Text.current.style.setProperty('bottom', 0)
                input2.current.style.setProperty('bottom', 0)
            }, 500)
            setTimeout(function(){
                input3Text.current.style.setProperty('bottom', 0)
                input3.current.style.setProperty('bottom', 0)
            }, 700)
            setTimeout(function(){
                input4Text.current.style.setProperty('bottom', 0)
                input4.current.style.setProperty('bottom', 0)
            }, 900)
            setTimeout(function(){
                button.current.style.setProperty('bottom', 0)
            }, 1100)
        } 
    }, [location])

    const {
        name,
        email,
        title,
        message
    } = formData 

    return (
        <>
            <div className={styles.contactContainer}>
                <div className={styles.titleBox}>
                    <h1 ref={text1}>CONTACT</h1>
                </div>
                <form ref={form} onSubmit={sendEmail}>
                    <div>
                        <label ref={input1Text} htmlFor="name">이름</label>
                        <input ref={input1} type="text" name="name" id="name" onChange={handleChange} value={name} placeholder="이름을 입력해주세요."></input>
                    </div>
                    <div>
                        <label ref={input2Text} htmlFor="email">이메일</label>
                        <input ref={input2} type="email" name="email" id="email" onChange={handleChange} value={email}  placeholder="이메일을 입력해주세요."></input>
                    </div>
                    <div>
                        <label ref={input3Text} htmlFor="title">제목</label>
                        <input ref={input3} type="text" name="title" id="title" onChange={handleChange} value={title} placeholder="제목을 입력해주세요."></input>
                    </div>
                    <div>
                        <label ref={input4Text} className={styles.descriptionTitle} htmlFor="message">내용</label>
                        <textarea ref={input4} className={styles.description} type="text" name="message" id="message" onChange={handleChange} value={message} spellCheck="false" placeholder="내용을 입력해주세요."></textarea>
                    </div>
                    <div>
                        <button ref={button} type="submit">SEND REQUEST</button>
                    </div>
                </form>
            </div>
            {location === 'contact' && 
                <Footer/>
            }
        </>

    )
}

export default Contact