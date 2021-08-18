import React, {FC, useState, useCallback, useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import {Input, Button} from 'react-native-elements';
import {ThemeContext, ITodos} from '../App';
import {v4 as uuidV4} from 'uuid';
import Todo from './Todo';

const initialTodo: ITodos = {
  id: '',
  title: '',
  completed: false,
};

const Todos: FC<{}> = () => {
  const [error, setError] = useState<string>('');
  const [todo, setTodo] = useState<ITodos>(initialTodo);
  const {todos, addTodo} = useContext(ThemeContext);

  const AddTodo = useCallback(() => {
    const {title, completed} = todo;
    if (!title) {
      setError('Title est obligatoire.');
    } else {
      addTodo({
        id: uuidV4(),
        title: title,
        completed: completed,
      });
      setTodo(initialTodo);
    }
  }, [addTodo, todo]);

  const handleChange = (value: string): void => {
    setTodo({...todo, title: value});
  };

  return (
    <View>
      {todos.map(el => (
        <Todo key={el?.id} todo={el} />
      ))}
      <View style={styles.form}>
        <View style={styles.input}>
          <Input
            placeholder="Ajouter todo"
            value={todo?.title}
            errorMessage={error}
            onChangeText={handleChange}
          />
        </View>
        <View>
          <Button title="Ajouter" onPress={AddTodo} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  todos: {
    // position: 'relative',
  },
  form: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  input: {
    width: 260,
  },
});

export default Todos;
