import * as userActions from '../../store/users'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'

const AnswersShow = (props) => {
    const dispatch = useDispatch();
    const answer = props.answer
    debugger
    const authorId = answer.authorId
    const answerAuthor = useSelector((state) => {
        debugger
        // if (!state.users) {
        //     return []
        // } else {
        //     return (
        //         Object.values(state.users).filter((user) => {
        //             return user.id == author_id
        //         })
        //     )
        // }
        if (authorId) {
            return state.users[authorId]
        }

    })

    debugger
    

    return (
        <div>
        <h1>{answer.body}</h1>
        <h3>Answered by {answerAuthor?.displayName}</h3>
        <h1>Hello from AnswersShow</h1>
        </div>
    )

}

export default AnswersShow