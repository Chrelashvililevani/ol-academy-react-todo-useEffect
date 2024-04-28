import React, { useState, useEffect } from 'react';

function InputComponent() {
  const [inputValue, setInputValue] = useState('');
  const [tasks, setTasks] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState('');
  const [checkedTasks, setCheckedTasks] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');


  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    console.log("Tasks updated:", tasks);
  }, [tasks]);

  const handleAddTask = () => {
    if (inputValue.trim() === '') {
      setErrorMessage('Task is empty');
      return;
    }

    if (tasks.some(task => task.text === inputValue)) {
      setErrorMessage('Task already exists!');
      return;
    }

    setTasks([...tasks, { text: inputValue, done: false }]);
    setInputValue('');
    setErrorMessage('');
  };

  const toggleDone = (index) => {
    setTasks(tasks.map((task, i) => {
      if (i === index) {
        return { ...task, done: !task.done };
      }
      return task;
    }));
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((task, i) => i !== index));
  };

  const editTask = (index) => {
    setEditIndex(index);
    setEditValue(tasks[index].text);
  };

  const handleEditChange = (e) => {
    setEditValue(e.target.value);
  };

  const saveEdit = (index) => {
    setTasks(tasks.map((task, i) => {
      if (i === index) {
        return { ...task, text: editValue };
      }
      return task;
    }));
    setEditIndex(null);
  };

  const handleCheckboxChange = (index) => {
    if (checkedTasks.includes(index)) {
      setCheckedTasks(checkedTasks.filter(item => item !== index));
    } else {
      setCheckedTasks([...checkedTasks, index]);
    }

    const updatedTasks = tasks.map((task, i) => {
      if (i === index) {
        return { ...task, checked: !task.checked };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const deleteCheckedTasks = () => {
    setTasks(tasks.filter((task, index) => !checkedTasks.includes(index)));
    setCheckedTasks([]);
  };

  const deleteDoneTasks = () => {
    setTasks(tasks.filter(task => !task.done));
  };

  const deleteAllTasks = () => {
    setTasks([]);
    setCheckedTasks([]);
  };

  const moveTaskUp = (index) => {
    const updatedTasks = [...tasks];
    const temp = updatedTasks[index];
    updatedTasks[index] = updatedTasks[index - 1];
    updatedTasks[index - 1] = temp;
    setTasks(updatedTasks);
  };
  
  const moveTaskDown = (index) => {
    const updatedTasks = [...tasks];
    const temp = updatedTasks[index];
    updatedTasks[index] = updatedTasks[index + 1];
    updatedTasks[index + 1] = temp;
    setTasks(updatedTasks);
  };
  

  return (
    <div className='input-text'>
      <div className="task-input-wrapper">
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          placeholder="Type something..."
          className="task-input"
        />
        <button onClick={handleAddTask} className="add-task-button">Add Task</button>
      </div>
      <ul>
        {tasks.map((task, index) => (
          <li key={index} style={{ textDecoration: task.done ? 'line-through' : 'none' }}>
            <input
              type="checkbox"
              checked={task.checked || checkedTasks.includes(index)}
              onChange={() => handleCheckboxChange(index)}
            />
            {editIndex === index ? (
              <input
                type="text"
                value={editValue}
                onChange={handleEditChange}
                className="edit-input"
              />
            ) : (
              <span>{task.text}</span>
            )}
            {editIndex === index ? (
              <button className='button-undo-done-on' onClick={() => saveEdit(index)}>Save</button>
            ) : (
              <>
                <div className="task-buttons">
                    <button className='button-undo-done-on' onClick={() => toggleDone(index)}>Done</button>
                    <button className='button-delete-on' onClick={() => deleteTask(index)}>Delete</button>
                    <button className='button-edit-on' onClick={() => editTask(index)}>Edit</button>
                        {index > 0 && (
                          <button className='button-move-up' onClick={() => moveTaskUp(index)}>Move Up</button>
                        )}
                        {index < tasks.length - 1 && (
                          <button className='button-move-down' onClick={() => moveTaskDown(index)}>Move Down</button>
                        )}
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
      {errorMessage && (
          <div className="error-message">
            {errorMessage}
          </div>
        )}
      {tasks.length > 0 && (
        <div className='buttons-delete'>
          <button className='button-delete-all-checked' onClick={deleteCheckedTasks}>Delete Checked Tasks</button>
          <button className='button-delete-all-done' onClick={deleteDoneTasks}>Delete All Done Tasks</button>
          <button className='button-delete-all' onClick={deleteAllTasks}>Delete All Tasks</button>
        </div>
      )}
    </div>
  );
}

export default InputComponent;
