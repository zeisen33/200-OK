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
    const [errors, setErrors] = useState([])

    const asker = useSelector((state) => state.session.user)

    if (!asker) {  
        return <Redirect to='/login'/>
    }
        // later: add error slice of state to show that you aren't logged in

    const handleTitle = (e) => setTitle(e.target.value)
    const handleBody = (e) => setBody(e.target.value)

    const handleSubmit = async (e) => {
        // debugger
        e.preventDefault()
        await setErrors([]);
        // debugger
        await dispatch(questionActions.createQuestion({title, body, asker_id: asker.id}))
        // debugger
        //     .catch(async (res) => {
        //         let data;
        //         try {
        //             data = await  res.clone().json();
        //         } catch {
        //             data = await res.text();
        //         }
        //         if (data?.errors) {
        //             setErrors(data.errors)
        //         } else if (data) {
        //             setErrors([data])
        //         } else {
        //             setErrors([res.statusText])
        //         }
        //     })
            // debugger
    }

    const showErrors = (inputType) => {
        let errorEl;

        errors.forEach((error) => {
            if (error.includes(inputType)) {
                errorEl = <ul className='Error'>{error}</ul>
            }
        })
        return errorEl
    }

    return (
        <div>
            <h1>Ask a public question</h1>
            <form onSubmit={handleSubmit}>
                <label>Title 
                    <span>Be specific and imagine you're asking a question to another person</span>
                    <input type='text'
                        value={title}
                        onChange={handleTitle}
                    />
                </label>
                <label>Body 
                    <span>Include all the information someone would need to answer your question</span>
                    <textarea
                        value={body}
                        onChange={handleBody}
                    />
                </label>
                <button type='submit'>Post your Question</button>
            </form>
        </div>
    )
}

export default QuestionsCreate