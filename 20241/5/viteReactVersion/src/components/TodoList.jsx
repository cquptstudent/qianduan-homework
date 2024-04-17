import React, {useState, useEffect} from 'react'

function SingleList() {
    const [inputThings, setInputThings] = useState('')
    const [deadline, setDeadline] = useState('')
    const [tasks, setTasks] = useState([])
    const [selectAll, setSelectAll] = useState(false)

    const handleChange = (e) => {
        setInputThings(e.target.value)
    }

    const handleTimeChange = (e) => {
        setDeadline(e.target.value)
    }

    const handleSubmit = () => {
        if (inputThings.trim() !== '' && deadline !== '') {
            setTasks([
                ...tasks,
                {
                    id: Date.now(),
                    things: inputThings,
                    deadline: deadline,
                    countdown: calculateCountdown(deadline),
                    selected: false
                }
            ])
            setInputThings('')
            setDeadline('')
        } else {
            alert("请输入正确的事件和时间！！！！！！")
        }
    }

    const calculateCountdown = (deadline) => {
        const diff = new Date(deadline) - Date.now()
        return diff > 0 ? diff : 0
    }

    const handleDelete = (id) => {
        setTasks(tasks.filter(task => task.id !== id))
    }

    const handleSelectAll = () => {
        setTasks(tasks.map(task => ({...task, selected: true})))
        setSelectAll(true)
    }

    const handleInvertSelection = () => {
        setTasks(tasks.map(task => ({...task, selected: !task.selected})))
        setSelectAll(false)
    }

    const handleDeselectAll = () => {
        setTasks(tasks.map(task => ({...task, selected: false})))
        setSelectAll(false)
    }

    // const handleSelectSingle = (id) => {
    //     setTasks(tasks.map(task => {
    //         if (task.id === id) {
    //             return {...task, selected: !task.selected}
    //         }
    //         return task
    //     }))
    // }

    useEffect(() => {
        const interval = setInterval(() => {
            setTasks(prevTasks => (
                prevTasks.map(task => ({
                    ...task,
                    countdown: calculateCountdown(task.deadline)
                }))
            ))
        }, 1000)

        return () => clearInterval(interval)
    }, [])

    return (
        <>
            <div id="topTitle">
                <div id="allChoose" className="topButtons" onClick={handleSelectAll}>全选</div>
                <div id="allNotChoose" className="topButtons" onClick={handleDeselectAll}>全不选</div>
                <div id="changeChoose" className="topButtons" onClick={handleInvertSelection}>反选</div>
            </div>
            {tasks.map(task => (
                <div className={`oneList`} key={task.id} onClick={() => handleSelectSingle(task.id)}>
                    <label>
                        <input type="checkbox" className="tasksFinish" checked={task.selected} readOnly/>
                    </label>
                    <div className="taskName">{task.things}</div>
                    <div className="prompt">
                        <div className="textInPrompt">距截止时间：</div>
                        <div className="leftTime">{formatCountdown(task.countdown)}</div>
                    </div>
                    <div className="deleteButton" onClick={() => handleDelete(task.id)}>删除</div>
                </div>
            ))}
            <div id="inputPlace">
                <input
                    type="text"
                    id="inputThings"
                    name="inputThings"
                    onChange={handleChange}
                    value={inputThings}
                    placeholder="请输入事件："
                />
                <div id="d">截止时间：</div>
                <input
                    type="datetime-local"
                    id="deadline"
                    name="deadline"
                    value={deadline}
                    onChange={handleTimeChange}
                    min={new Date().toISOString().split('T')[0]}
                    max="2099-12-31T00:00"
                />
                <div id="submit" onClick={handleSubmit}>
                    <div id={"word"}> 提交</div>
                </div>
            </div>
        </>
    )
}

const formatCountdown = (countdown) => {
    const hours = Math.floor(countdown / (1000 * 60 * 60))
    const minutes = Math.floor((countdown % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((countdown % (1000 * 60)) / 1000)

    return `${hours}小时 ${minutes}分钟 ${seconds}秒`
}

export default SingleList
