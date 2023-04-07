import "./QuestionsShow.css"
import { useParams, Link, useHistory } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import * as questionActions from '../../../store/questions.js'
import * as userActions from '../../../store/users'

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
            return <Link id='ShowEditButton' className='inSiteLink' to={`/questions/${questionId}/edit`}>Edit</Link>
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
            return <button className='deleteButton' onClick={handleDelete}>Delete Question</button>
        }
    }
    
    // debugger                            
    if (question && asker) {
        return (
            <div id='ShowPageContainer'>
                <div id='TopConts' >
                    <div id='ShowTop' >
                        <div id='ShowTopTop' >
                            <div id='TitleCont'>
                                <h1 id='hOne'>{question.title}</h1>
                            </div>
                            <div>
                                <Link id='AskCont' className='BlueButton' to='/questions/new'><span id='AskQ' className='smallText'>Ask Question</span></Link>
                            </div>
                        </div>
                        <div id='ShowTopBot'>
                            <h6 id='hSix'><span>asked by {asker.displayName}</span></h6>
                        </div>
                    </div>
                </div>
                <div id="ShowQuestionContainer">
                    <div id='QBody' >
                        <p>{question.body}</p>
                    </div>
                    <div id='EditOrDeleteCont'>
                        {updateButton()}
                        {deleteButton()}
                    </div>
                </div>
            </div>

        )
    } else {
        return null
    }
}

export default QuestionsShow