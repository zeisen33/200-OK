import AnswersShow from "./AnswersShow"
import { useEffect } from "react"
import * as userActions from '../../store/users'
import { useDispatch, useSelector } from "react-redux"
import * as voteActions from '../../store/votes'
import * as voteChangedActions from '../../store/voteChanged'

const AnswersList = ({ questionId }) => {
    const dispatch = useDispatch();
    // const answers = props.answers
    // console.log(props)
    // console.log(answers)
    // debugger
    useEffect(() => {
        dispatch(voteChangedActions.removeVoteChanged())
    }, [])


    const voteChanged = useSelector(state => state.voteChanged.status)
    
    const answers = useSelector((state) => {
        // debugger
        return Object.values(state.answers).filter(answer => answer.questionId == questionId)
    }) 
    
    // Not originally present
    const votes = useSelector(state => state ? state.votes.answerVotes : [])
    
    const answersWithVotes = []
    answers.forEach(answer => {
        // Not originally present
        // debugger
        const thisAnswersVotes = votes ? Object.values(votes).filter(vote => vote.votedAnswerId === answer.id) : []
        // const upVotes = thisAnswersVotes.filter(vote => vote.direction === true)
        // const downVotes = thisAnswersVotes.filter(vote => vote.direction === false)
        // const score = upVotes.length - downVotes.length
        // debugger
        answersWithVotes.push({answer, answerVotes: thisAnswersVotes})
    })
    // debugger

    // useEffect(() => {
    //     // Not originally present
    //     const fetchVotes = async () => {
    //         await dispatch(voteActions.fetchVotesByAnswerId(answerId))
    //     } 
    //     // debugger
    //     fetchVotes()
    //     // debugger
    // }, [voteChanged, answer])

    // const getSum = (answer) => {
    //     const votes = answer.answerVotes ? Object.values(answer.answerVotes) : []
    //     const upVotes = votes.filter(vote => vote.direction === true)
    //     const downVotes = votes.filter(vote => vote.direction === false)
    //     const score = upVotes.length - downVotes.length
    //     return score
    // }

    // const answersWithSums = answersWithVotes.map(answer => {
    //     const sum = getSum(answer)
    //     return {...answer, sum}
    // })

    // debugger
    // Added voteChanged check
    // const sortedAnswersWithSums = voteChanged ? answersWithSums : answersWithSums.sort((a,b) => b.sum - a.sum)

    // debugger





    // const sortedAnswers = Object.values(answers).sort((a,b) =>  a.voteSum - b.voteSum)
    
    // const sortedAnswers = answers.sort((a,b) =>  b.voteSum - a.voteSum)
    // console.log(sortedAnswers)

    const answersMap = () => {
        // debugger
        return (
            <div>
                {/* {answers.map((answer) => { */}
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