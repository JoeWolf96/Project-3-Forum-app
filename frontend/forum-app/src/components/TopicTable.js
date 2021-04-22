

const TopicTable = (props)=>{
    return (

        <table>
            <tbody>
                {props.topics.map(topics => {
                    return (
                        <tr key={topics._id} >
                            <td onDoubleClick={() => props.toggleCelebrated(topics)}
                                className={topics.celebrated
                                    ? 'asdasd'
                                    :
                                    null}> {topics.name}
                            </td>


                            <td onClick={() => props.deleteTopics(topics._id)}>X</td>
                            <td onClick={() => props.showEditForm(topics)}>edit</td>
                        </tr>
                        )
                    })
                }
            </tbody>
        </table>
    )
}

export default TopicTable
