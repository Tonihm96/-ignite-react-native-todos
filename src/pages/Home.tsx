import React, { useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const currentTaskTitles = tasks.map((item) => item.title);

    currentTaskTitles.find((current) => current === newTaskTitle)
      ? Alert.alert(
          'Task já cadastrada',
          'Você não pode cadastrar uma task com o mesmo nome',
        )
      : setTasks([
          ...tasks,
          {
            id: new Date().getTime(),
            title: newTaskTitle,
            done: false,
          },
        ]);
  }

  function handleToggleTaskDone(id: number) {
    setTasks(
      tasks.map((cur) => (cur.id === id ? { ...cur, done: !cur.done } : cur)),
    );
  }

  function handleEditTask(id: number, newTaskTitle: string) {
    const currentTaskTitles = tasks.map((item) => item.title);

    currentTaskTitles.find((current) => current === newTaskTitle)
      ? Alert.alert(
          'Task já cadastrada',
          'Você não pode cadastrar uma task com o mesmo nome',
        )
      : setTasks(
          tasks.map((cur) =>
            cur.id === id ? { ...cur, title: newTaskTitle } : cur,
          ),
        );
  }

  function handleRemoveTask(id: number) {
    Alert.alert(
      'Remover item',
      'Tem certeza que você deseja remover esse item?',
      [
        { text: 'Não' },
        {
          text: 'Sim',
          onPress: () => setTasks(tasks.filter((cur) => cur.id !== id)),
        },
      ],
    );
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        editTask={handleEditTask}
        removeTask={handleRemoveTask}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB',
  },
});
