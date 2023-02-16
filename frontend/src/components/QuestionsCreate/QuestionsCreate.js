import "./QuestionsCreate.css"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import * as questionActions from "../../store/questions.js"
import { Link } from "react-router-dom"
import { Redirect } from "react-router-dom"

const QuestionsCreate = () => {
    const dispatch = useDispatch()
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [loginRedirect, setloginRedirect] = useState(false)

    const asker = useSelector((state) => state.session.user)

    if (!asker) {  
        return <Redirect to='/login'/>
    }
        // later: add error slice of state to show that you aren't logged in

    return (
        <h1>Hello From QuestionsCreate logged in</h1>
    )
}

export default QuestionsCreate