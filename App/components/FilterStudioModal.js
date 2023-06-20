import React, {useEffect, useState, useRef, useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {View, StyleSheet, Modal, FlatList, SafeAreaView} from 'react-native';
import {ListItem, Thumbnail, Left, Body, Right} from 'native-base';
import {Fonts, Images, Colors, GlobalStyle} from '@common';
import {RegularText} from '@Typography';
import {Icon} from 'react-native-elements';

const FilterStudioModal = props => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const studio = useSelector(state => state.studio);
  const [data, setData] = useState(studio.studios);

  const keyExtractor = k => k.id;

  const dismiss = () => {
    let selectedStudios = data.filter(studio => studio.selected == true);
    props.dismiss(selectedStudios);
  };

  const onSelect = useRef(selectedItem => {
    setData(oldData => {
      return [
        ...oldData.map(item => {
          if (selectedItem.id === item.id) {
            return {
              ...item,
              selected: !item.selected,
            };
          }
          return item;
        }),
      ];
    });
  });

  return (
    <SafeAreaView>
      <Modal
        transparent={true}
        visible={props.visible}
        onRequestClose={() => {}}>
        <View style={styles.semiTransparent} />
        <View style={styles.container}>
          <ListItem itemHeader>
            <Body>
              <RegularText>Select studios</RegularText>
            </Body>
            <Right style={styles.cancel}>
              <Icon
                name="cancel"
                color="white"
                size={30}
                onPress={() => dismiss()}
              />
            </Right>
          </ListItem>
          <FlatList
            contentContainerStyle={GlobalStyle.style.flatListStyle}
            data={data}
            keyExtractor={keyExtractor}
            renderItem={({item}) => (
              <StudiosItem item={item} onSelect={onSelect.current} />
            )}
          />
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default FilterStudioModal;

function StudiosItem({item, onSelect}) {
  return useMemo(() => {
    return (
      <ListItem onPress={() => onSelect(item)}>
        <Left>
          <RegularText>{item.title}</RegularText>
        </Left>
        <Right>
          {item.selected && <Icon name="check" color={Colors.green} />}
        </Right>
      </ListItem>
    );
  }, [item, onSelect]);
}

const styles = StyleSheet.create({
  semiTransparent: {
    flex: 1,
    backgroundColor: Colors.semiTransparent,
  },
  container: {
    flex: 5,
    backgroundColor: Colors.tabBarColor,
  },
  cancel: {justifyContent: 'center'},
});
