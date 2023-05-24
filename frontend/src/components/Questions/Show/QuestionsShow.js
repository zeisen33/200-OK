import "./QuestionsShow.css"
import { useParams, Link, useHistory } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import * as questionActions from '../../../store/questions.js'
import * as userActions from '../../../store/users'
import AnswersList from "../../Answers/AnswersList"
import AnswerForm from "../../Answers/AnswerForm"

const QuestionsShow = () => {
    const history = useHistory();
    const dispatch = useDispatch()
    const { questionId } = useParams() 
    let question = useSelector(questionActions.getQuestion(questionId))
    const asker = useSelector(userActions.getAsker(question?.askerId)) 
    const currentUserId = useSelector(userActions.getCurrentUserId)
    const answers = useSelector((state) => {
        return Object.values(state.answers).filter(answer => answer.questionId == questionId);
    })

    const numOfAnswers = Object.entries(answers).length

    useEffect(() => {
        if (questionId) {
            dispatch(questionActions.fetchQuestion(questionId))
        }
    }, [questionId])

    const updateButton = () => {
        if (currentUserId === question.askerId) {
    
            return <Link id='ShowEditButton' className='inSiteLink' to={`/questions/${questionId}/edit`}>Edit</Link>
        }
    }

    const handleDelete = (e) => {
        // debugger
        if (currentUserId === question.askerId) {
            if (window.confirm('Are you sure you want to delete this question?')) {
                dispatch(questionActions.deleteQuestion((parseInt(questionId))))
                history.push(`/questions`)
            }
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
                            <div id='AskDiv'>
                                <Link id='AskCont' className='BlueButton' to='/questions/new'><span id='AskQ' className='smallText'>Ask Question</span></Link>
                            </div>
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
                <div id='BottomConts' >
                    <div id='ShowTopBot'>
                        <h6 id='hSix'><span id='highlightedLightBlue'>asked by {asker.displayName}</span></h6>
                    </div>
                    <h2 id='hTwo'>{(numOfAnswers === 1 ? 1 + ' Answer' : numOfAnswers + ' Answers')}</h2>
                    <AnswersList answers={answers} />
                    <AnswerForm />
                    <div id='NotAnswerCont'>
                        <span>
                        Not the answer you're looking for?
                        </span>
                        <Link id='BrowseLink' className='inSiteLink' to='/'>Browse other questions</Link>
                        or
                        <Link id='OwnQLink' className='inSiteLink' to='/questions/new' >ask your own question.</Link>
                    </div>
                </div>
                </div>
            </div>
        )
    } else {
        return null
    }
}

export default QuestionsShow