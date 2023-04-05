import { useDispatch, useSelector } from "react-redux"
import { Redirect } from "react-router-dom"
import { getCurrentUserId } from "../../store/users"
import { useParams } from "react-router-dom"
import * as questionActions from '../../store/questions'
import * as userActions from '../../store/users'
import { useEffect, useState } from "react"


const QuestionsUpdate = () => {
    const dispatch = useDispatch();
    const currentUserId = useSelector(getCurrentUserId)
    const { questionId } = useParams();
    const question = useSelector(questionActions.getQuestion(questionId))
    const asker = useSelector(userActions.getAsker(question?.askerId)) 
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [errors, setErrors] = useState([])
    const [submitted, setSubmitted] = useState(false)


    useEffect(() => {
        // debugger
        if (question && currentUserId != question?.askerId) {
        //     debugger
            console.log('redirect)')
        }
        // debugger
        // if (questionId) {
        //     // debugger
        //     try {
        //         const res = dispatch(questionActions.fetchQuestion(questionId))
        //     } catch {
        //         return <Redirect to={`/questions/${questionId}`} />
        //     }  
        // }
    }, [questionId])

    
    if (question && asker) {
        return (
            <div>
                <h1>Hello from Update Question</h1>
                <h1>{asker.displayName}</h1>
            </div>
        )
    } else {
        return null
    } 

    if (submitted) {
        // debugger
        return <Redirect to={`/questions/${question.id}`} />
    }

    const handleTitle = (e) => setTitle(e.target.value)
    const handleBody = (e) => setBody(e.target.value)

    const handleSubmit = async (e) => {
        // debugger
        e.preventDefault()
        await setErrors([]);
        // debugger
        const createFetchResponse = dispatch(questionActions.updateQuestion({title, body, asker}))
            .then((data) => {
                if (!data.question) {
                    setErrors(data.errors)
                }
            })
    }

    const showErrors = (inputType) => {
        // debugger
        let errorEl;

        errors.forEach((error) => {
            if (error.includes(inputType)) {
                errorEl = <ul className='Error'>{error}</ul>
            }
        })
        return errorEl
    }

    // debugger

    return (
        <>Hello from QUpdate</>
        // <div>
        //     <h1>Ask a public question</h1>
        //     <form onSubmit={handleSubmit}>
        //         <label>Title 
        //             <span>Be specific and imagine you're asking a question to another person</span>
        //             <input type='text'
        //                 value={title}
        //                 onChange={handleTitle}
        //             />
        //         </label>
        //         {showErrors('Title')}
        //         <label>Body 
        //             <span>Include all the information someone would need to answer your question</span>
        //             <textarea
        //                 value={body}
        //                 onChange={handleBody}
        //             />
        //         </label>
        //         {showErrors('Body')}
        //         <button type='submit'>Post your Question</button>
        //     </form>
        // </div>
    )
}

export default QuestionsUpdate