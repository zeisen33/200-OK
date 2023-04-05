import "./QuestionsShow.css"
import { useParams, Link, useHistory } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import * as questionActions from '../../store/questions.js'
import * as userActions from '../../store/users'

const QuestionsShow = () => {
    const history = useHistory();
    const dispatch = useDispatch()
    const { questionId } = useParams()
    // debugger 
    let question = useSelector(questionActions.getQuestion(questionId))
    // debugger
    const asker = useSelector(userActions.getAsker(question?.askerId)) 
    // debugger
    const currentUserId = useSelector(userActions.getCurrentUserId)
    // debugger
    
    useEffect(() => {
        // debugger
        if (questionId) {
            dispatch(questionActions.fetchQuestion(questionId))
        }
    }, [questionId])

    const updateButton = () => {
        // debugger
        if (currentUserId === question.askerId) {
            // debugger
            return <Link to={`/questions/${questionId}/edit`}>Edit Question</Link>
        }
    }

    const handleDelete = (e) => {
        // e.preventDefault();
        debugger
        if (currentUserId === question.askerId) {
            debugger
            dispatch(questionActions.deleteQuestion(questionId))
            history.push(`/questions`)
        
        // Else should never hit because it's a repeat of deleteButton condition
        } else {
            history.push(`/questions/${questionId}`)
        } 
    }

    const deleteButton = () => {
        // debugger
        if (currentUserId === question.askerId) {
            return <button onClick={handleDelete}>Delete Question</button>
        }
    }
    
    // debugger                            
    if (question && asker) {
        return (
            <div className="ShowQuestionContainer">
                <h1>{question.title}</h1>
                <h3>asked by {asker.displayName}</h3>
                <p>{question.body}</p>
                {updateButton()}
                {deleteButton()}
            </div>
        )
    } else {
        return null
    }
}

export default QuestionsShow