import { useState } from "react"
import Wizard from './Wizard'
import NoWizard from './NoWizard'

const Create = () => {
    // const [wizard, setWizard] = useState(true)
    // const page = () => {
    //     if (wizard) {
    //         return <Wizard />
    //     } else {
    //         return <NoWizard />
    //     }
    // }

    

    // const handleWizard = (e) => {
    //     e.preventDefault();
    //     debugger
    //     setWizard(!wizard)
    // }

    // return (
    //     <div>
    //         <h1>Ask a public Question</h1>
    //         <input 
    //             name='switch'
    //             type='checkbox'
    //             onChange={handleWizard}
    //         />
    //         <label for='switch'>The Ask Wizard: Enable for a more step-by-step approach to asking a question</label>
    //         {page()}
    //     </div>
    // )
    return (
        <NoWizard />
    )
}

export default Create