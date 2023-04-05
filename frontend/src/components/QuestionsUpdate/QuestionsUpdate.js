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
        // debugger
        // if (question && currentUserId != question?.askerId) {
        //     debugger
        //     console.log('redirect)')
        // }
        // debugger
        if (questionId) {
            // debugger
            try {
                const res = dispatch(questionActions.fetchQuestion(questionId))
            } catch {
                return <Redirect to={`/questions/${questionId}`} />
            }  
        }
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
}

export default QuestionsUpdate