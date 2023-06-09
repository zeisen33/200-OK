import AnswersShow from "./AnswersShow"
import { useEffect } from "react"
import * as userActions from '../../store/users'
import { useDispatch, useSelector } from "react-redux"
import * as voteActions from '../../store/votes'
import * as voteChangedActions from '../../store/voteChanged'

const AnswersList = ({ questionId }) => {
    const dispatch = useDispatch();

    // useEffect(() => {
    //     dispatch(voteChangedActions.removeVoteChanged())
    // }, [])

    // const voteChanged = useSelector(state => state.voteChanged.status)
    
    const answers = useSelector((state) => {
        // debugger
        return Object.values(state.answers).filter(answer => answer.questionId == questionId)
    }) 

    const answersMap = () => {
        // debugger
        return (
            <div>
                {answers.map((answer) => {
                    // debugger
                    return (
                        <ul>
                            <AnswersShow answer={answer} />
                        </ul>
                    )
                })}
            </div>
        )
    }

    useEffect(() => {
        // debugger
        dispatch(userActions.fetchAllUsers())

    }, [])

    // debugger
    return (
        <div>{answersMap()}</div>
    )

}

export default AnswersList;