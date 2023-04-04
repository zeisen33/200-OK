import { useDispatch, useSelector } from "react-redux"
import { Redirect } from "react-router-dom"
import { getCurrentUserId } from "../../store/users"
import { useParams } from "react-router-dom"
import * as questionActions from '../../store/questions'
import * as userActions from '../../store/users'
import { useEffect } from "react"


const QuestionsUpdate = () => {
    const dispatch = useDispatch();
    const currentUserId = useSelector(getCurrentUserId)
    const { questionId } = useParams();
    const question = useSelector(questionActions.getQuestion(questionId))
    const asker = useSelector(userActions.getAsker(question?.askerId))  

    useEffect(() => {
        debugger
        if (questionId) {
            debugger
            dispatch(questionActions.fetchQuestion(questionId))
        }
    }, [questionId, currentUserId])


    debugger
    if ((question && currentUserId) && !currentUserId === question.askerId) {
        debugger
        return <Redirect to={`/questions/${questionId}`} />
    }
    debugger
    
    
    
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
}

export default QuestionsUpdate