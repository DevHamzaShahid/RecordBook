import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import RenderStudiosItem from './RenderStudiosItem';
import { View } from 'native-base';

function All() {
  const studio = useSelector((state) => state.studio);
  const [sortedStudio, setSortedStudio] = useState([]);

  useEffect(() => {
    const desiredTitles = ['OMAR’S ROOM', 'Twin Room A', 'Twin Room B', 'GAME ROOM', 'Unit 5', 'Internal ROOM'];
    // Filter items with desired titles
    const sortedItems = desiredTitles.flatMap((title) =>
      studio?.studios?.filter((item) => item.title === title)
    );
    // Concatenate the remaining items
    const remainingItems = studio?.studios?.filter((item) => !desiredTitles.includes(item.title));
    const finalSortedItems = sortedItems.concat(remainingItems);

    setSortedStudio(finalSortedItems);
  }, [studio]);

  return (
    <FlatList
      data={sortedStudio}
      style={styles.container}
      renderItem={({ item }) => <RenderStudiosItem item={item} />}
      ListFooterComponent={<View style={styles.footer} />}
    />
  );
}


const styles = StyleSheet.create({
  container: {
    paddingTop: 24,
  },
  footer: {
    height: 24,
  },
});

export default All;
