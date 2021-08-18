import React, {FC, useContext} from 'react';
import {StyleSheet} from 'react-native';
import {View} from 'react-native';
import {CheckBox, Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {ITodos, ThemeContext} from '../App';

interface IPropsTodo {
  todo: ITodos;
}

const Todo: FC<IPropsTodo> = ({todo}) => {
  const {updateCecked, deleteOne} = useContext(ThemeContext);

  const {id, title, completed} = todo;
  return (
    <View style={styles.item}>
      <CheckBox
        title={title}
        checked={completed}
        onPress={() => updateCecked(todo)}
      />
      <Button
        icon={<Icon name="trash" size={16} />}
        type="clear"
        onPress={() => deleteOne(id)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default Todo;
