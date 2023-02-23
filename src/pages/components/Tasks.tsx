import { useState } from "react";
import { api } from "~/utils/api";

const Task = () => {
  const task = api.todos.getAll.useQuery();
  const utils = api.useContext();
  const { mutate: deleteTaskMutation } = api.todos.deleteTask.useMutation({
    onSuccess() {
      utils.todos.getAll.invalidate();
    },
  });

  const { mutate: isCompleteMutate } = api.todos.toggleTask.useMutation({
    onSuccess() {
      utils.todos.getAll.invalidate();
    },
  });

  const handleDelete = (id: string) => {
    deleteTaskMutation(id);
  };

  return (
    <div className="flex flex-col gap-5 bg-black py-6">
      {task.data ? (
        task.data.map((t) => (
          <div className="flex justify-between gap-3" key={t.id}>
            <h3
              className={`${
                t.isComplete ? "text-red-600 line-through" : "text-white"
              }`}
            >
              {t.text}
            </h3>
            <div className="space-x-3">
              <input
                type="checkbox"
                checked={t.isComplete}
                onChange={(e) =>
                  isCompleteMutate({ id: t.id, isComplete: e.target.checked })
                }
              />
              <button
                className="rounded-md bg-red-600 p-1 text-white"
                onClick={() => handleDelete(t.id)}
              >
                Delete Task
              </button>
            </div>
          </div>
        ))
      ) : (
        <h3 className="text-white">Add your first todo!</h3>
      )}
    </div>
  );
};

export default Task;
