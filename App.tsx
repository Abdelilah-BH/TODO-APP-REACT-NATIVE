import React, {FC, useState, createContext, useCallback} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  Dimensions,
  ScrollView,
  View,
} from 'react-native';
import {Text, ThemeProvider} from 'react-native-elements';
import Todos from './components/Todos';
import {Button} from 'react-native-elements';

export interface ITodos {
  id: string;
  title: string;
  completed: boolean;
}

interface IAppContext {
  todos: ITodos[];
  addTodo: (currentTodos: ITodos) => void;
  updateCecked: (todo: ITodos) => void;
  deleteOne: (id: string) => void;
}

export const ThemeContext = createContext<IAppContext>({
  todos: [],
  addTodo: () => {},
  updateCecked: () => {},
  deleteOne: () => {},
});

const App: FC = () => {
  const [todos, setTodos] = useState<ITodos[]>([]);

  const addTodo = useCallback((currentTodos: ITodos) => {
    setTodos(current => [...current, currentTodos]);
  }, []);

  const updateCecked = useCallback(
    (todo: ITodos) => {
      const newTodos: ITodos[] = todos;
      newTodos.map(el => {
        if (todo.id === el.id) {
          el.completed = !todo.completed;
        }
      });
      setTodos([...newTodos]);
    },
    [todos],
  );

  const deleteOne = useCallback(
    id => {
      console.log('deleteOne');
      const newTodos: ITodos[] = todos;
      const todoFiltred = newTodos.filter(el => el.id !== id);
      setTodos([...todoFiltred]);
    },
    [todos],
  );

  const deleteAll = useCallback(() => setTodos([]), []);
  return (
    <ThemeProvider>
      <SafeAreaView style={styles.app}>
        <ScrollView>
          <ThemeContext.Provider
            value={{
              todos,
              addTodo,
              updateCecked,
              deleteOne,
            }}>
            <View style={styles.header}>
              <Text h4>TODO LIST</Text>
              <Button title="Supprimer tout" type="clear" onPress={deleteAll} />
            </View>
            <Todos />
          </ThemeContext.Provider>
        </ScrollView>
      </SafeAreaView>
    </ThemeProvider>
  );
};

const styles = StyleSheet.create({
  app: {
    flex: 1,
    padding: 16,
    width: Dimensions.get('window').width,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default App;
