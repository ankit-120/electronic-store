import Cookies from 'js-cookie'
import React from 'react'

const Contact = () => {
    console.log(Cookies.get('token'))
    return (
        <div>Contact</div>
    )
}

export default Contact