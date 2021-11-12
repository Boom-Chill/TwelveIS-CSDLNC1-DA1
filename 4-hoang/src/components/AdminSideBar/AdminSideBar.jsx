import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types'
import './AdminSideBar.scss'
import { NavLink, Link, useHistory } from "react-router-dom";
import { BiAddToQueue, BiLogOut, BiGridAlt, BiHomeCircle, BiBarChartSquare } from "react-icons/bi";
import { AiOutlinePieChart } from "react-icons/ai"

function AdminSideBar({ office }) {
    const history = useHistory()

    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isAcceptDragging, setIsAcceptDragging] = useState(false)
    const [drag, setDrag] = useState({
        top: 0,
        left: 0,
        style: {},
        dragging: false,
    })

    const [wrapperStyle, setWrapperStyle] = useState({
        height: 0,
        width: 0,
    })

    function dragStart(e) {
        e.preventDefault()
        e.stopPropagation()
        setIsAcceptDragging(true)
    }


    function dragging(e) {
        e.preventDefault()
        e.stopPropagation()

        if (isAcceptDragging) {
            setDrag({
                ...drag,
                dragging: true,
            })
        }

        const clientX = e.clientX
        const clientY = e.clientY

        if (clientX <= 32
            || clientY <= 32
            || clientX > window.innerWidth - 32
            || clientY > window.innerHeight - 32
        ) {
            return
        }
        if (drag.dragging) {
            setDrag({
                ...drag,
                style: {
                    left: e.clientX - 32,
                    top: e.clientY - 32,
                }
            })
            setWrapperStyle({
                width: window.innerWidth,
                height: window.innerHeight,
            })
        }
    }

    function dragEnd(e) {
        e.preventDefault()
        e.stopPropagation()
        setDrag({
            ...drag,
            dragging: false,
        })
        setIsAcceptDragging(false)
        setWrapperStyle({
            width: 'auto',
            height: 'auto',
        })
    }

    function touchStart(e) {
        setIsAcceptDragging(true)
    }

    function touching(e) {
        if (isAcceptDragging) {
            setDrag({
                ...drag,
                dragging: true,
            })
        }

        const clientX = e.changedTouches[0].clientX
        const clientY = e.changedTouches[0].clientY
        if (clientX <= 32
            || clientY <= 32
            || clientX > window.innerWidth - 20
            || clientY > window.innerHeight - 20
        ) {
            return
        }
        if (drag.dragging) {
            setDrag({
                ...drag,
                style: {
                    left: e.changedTouches[0].clientX - 32,
                    top: e.changedTouches[0].clientY - 32,
                }
            })
        }
    }

    function touchEnd(e) {
        e.preventDefault()
        e.stopPropagation()
        setDrag({
            ...drag,
            dragging: false,
        })
        setIsAcceptDragging(false)
    }

    function handleOpenMenu(e) {
        if (!drag.dragging) {
            setIsMenuOpen(!isMenuOpen)
        }
    }
    //------RENDER

    return (
        <div
            className="ad-side-bar__wrapper"

            style={wrapperStyle}

            onMouseDown={(e) => dragStart(e)}
            onMouseMove={(e) => dragging(e)}
            onMouseUp={(e) => dragEnd(e)}

            onTouchStart={(e) => touchStart(e)}
            onTouchMove={(e) => touching(e)}
            onTouchEnd={(e) => touchEnd(e)}
        >


            <div className="ad-side-bar"

                style={drag.style}

                onTouchEnd={(e) => handleOpenMenu(e)}
                onMouseUp={(e) => handleOpenMenu(e)}

            >

                <div //open button
                    className="ad-side-bar__item "
                >
                    <BiGridAlt />
                </div>

                <div
                    className={isMenuOpen ? "ad-side-bar__tools ad-side-bar__tools--open" : "ad-side-bar__tools ad-side-bar__tools--close"}>

                    <Link to='/'>
                        <div
                            className="ad-side-bar__item"
                        >
                            <BiHomeCircle />
                        </div>
                    </Link>


                    <Link to='/upload'>
                        <div
                            className="ad-side-bar__item"
                        >
                            <BiAddToQueue />
                        </div>
                    </Link>

                    <Link to='/summary'>
                        <div
                            className="ad-side-bar__item"
                        >
                            <BiBarChartSquare />
                        </div>
                    </Link>
                </div>

            </div>

        </div>
    );
}


export default AdminSideBar;