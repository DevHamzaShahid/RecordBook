import React, { useCallback, useEffect } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { GlobalStyle } from '../../common';
import RenderStudiosItem from './RenderStudiosItem';
import Actions from './reducer';
import moment from 'moment';

function Today(props) {
  const studio = useSelector((state) => state.studio);
  return (
    <FlatList
      style={styles.container}
      data={studio?.studios?.filter(
        (s) => !studio.datedFullyBookedStudios.includes(s.docId),
      )}
      renderItem={({ item }) => <RenderStudiosItem item={item} />}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 24,
  },
});
export default Today;
