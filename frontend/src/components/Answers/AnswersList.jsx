import AnswersShow from "./AnswersShow"
import { useEffect } from "react"
import * as userActions from '../../store/users'
import { useDispatch } from "react-redux"
import * as voteActions from '../../store/votes'

const AnswersList = (props) => {
    const dispatch = useDispatch();
    const answers = props.answers
    // debugger

    const answersMap = () => {
        // debugger
        return (
            <div>
                {answers.map((answer) => {
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