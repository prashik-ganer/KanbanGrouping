import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { v4 as uuidv4 } from 'uuid';
import './App2.css';

const App = () => {
  const [containers, setContainers] = useState({
    [uuidv4()]: { title: "To Do", tasks: [] },
  });

  const addTaskContainer = () => {
    const newContainerId = uuidv4();
    setContainers((prevContainers) => ({
      ...prevContainers,
      [newContainerId]: { title: `New List`, tasks: [] },
    }));
  };

  const addTask = (containerId) => {
    const newTask = { id: uuidv4(), content: "New Task", editable: false };
    setContainers((prevContainers) => ({
      ...prevContainers,
      [containerId]: {
        ...prevContainers[containerId],
        tasks: [...prevContainers[containerId].tasks, newTask],
      },
    }));
  };

  const handleEditToggle = (containerId, taskId) => {
    setContainers((prevContainers) => {
      const container = prevContainers[containerId];
      const tasks = container.tasks.map((task) =>
        task.id === taskId ? { ...task, editable: !task.editable } : task
      );
      return { ...prevContainers, [containerId]: { ...container, tasks } };
    });
  };

  const handleContentChange = (containerId, taskId, newContent) => {
    setContainers((prevContainers) => {
      const container = prevContainers[containerId];
      const tasks = container.tasks.map((task) =>
        task.id === taskId ? { ...task, content: newContent } : task
      );
      return { ...prevContainers, [containerId]: { ...container, tasks } };
    });
  };

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    const sourceContainer = containers[source.droppableId];
    const destContainer = containers[destination.droppableId];
    const sourceTasks = [...sourceContainer.tasks];
    const [removed] = sourceTasks.splice(source.index, 1);

    if (source.droppableId === destination.droppableId) {
      sourceTasks.splice(destination.index, 0, removed);
      setContainers((prevContainers) => ({
        ...prevContainers,
        [source.droppableId]: {
          ...sourceContainer,
          tasks: sourceTasks,
        },
      }));
    } else {
      const destTasks = [...destContainer.tasks];
      destTasks.splice(destination.index, 0, removed);

      setContainers((prevContainers) => ({
        ...prevContainers,
        [source.droppableId]: {
          ...sourceContainer,
          tasks: sourceTasks,
        },
        [destination.droppableId]: {
          ...destContainer,
          tasks: destTasks,
        },
      }));
    }
  };

  return (
    <div className="app">
      <button onClick={addTaskContainer} className="addButton">Add Task Container</button>
      <div className="containerWrapper">
        <DragDropContext onDragEnd={onDragEnd}>
          {Object.entries(containers).map(([containerId, container]) => (
            <Droppable key={containerId} droppableId={containerId}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="taskContainer"
                >
                  <h4>{container.title}</h4>
                  <button onClick={() => addTask(containerId)} className="addTaskButton">Add Task</button>
                  {container.tasks.map((task, index) => (
                    <Draggable key={task.id} draggableId={task.id} index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`task ${snapshot.isDragging ? "dragging" : ""}`}
                        >
                          {task.editable ? (
                            <input
                              type="text"
                              value={task.content}
                              onChange={(e) =>
                                handleContentChange(containerId, task.id, e.target.value)
                              }
                              onBlur={() => handleEditToggle(containerId, task.id)}
                              autoFocus
                              className="input"
                            />
                          ) : (
                            <div
                              onDoubleClick={() => handleEditToggle(containerId, task.id)}
                              className="taskText"
                            >
                              {task.content}
                            </div>
                          )}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </DragDropContext>
      </div>
    </div>
  );
};

export default App;
