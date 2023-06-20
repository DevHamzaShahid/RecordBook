import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {FlatList, View, TouchableOpacity} from 'react-native';
import {Container} from 'native-base';
import {SolidButton} from '@Buttons';
import Actions from './reducer';
import {GlobalStyle, Colors} from '@common';
import {Icon} from 'react-native-elements';
import SectionHeaderCenterTitle from '../../components/SectionHeaderCenterTitle';
import StudioItem from '../../components/StudioItem';
import styles from './styles';
import moment from 'moment';
import FilterDatedStudioModal from '../../components/FilterDatedStudioModal';

const Studio = ({navigation}) => {
  const dispatch = useDispatch();
  const studio = useSelector((state) => state.studio);
  const [showFilter, setShowFilter] = useState(false);
  const [filterDate, setFilterDate] = useState(moment().format('YYYY-MM-DD'));
  const [filteredStudios, setFilteredStudios] = useState(studio.studios);

  useEffect(() => {
    dispatch(Actions.getStudios());
  }, []);

  useEffect(() => {
    if (studio.datedFullyBookedStudios.length > 0) {
      const newStudios = studio.studios.filter(
        (el) => !studio.datedFullyBookedStudios.some((f) => f === el.docId),
      );
      setFilteredStudios(newStudios);
    } else {
      setFilteredStudios(studio.studios);
    }
  }, [studio.datedFullyBookedStudios]);

  const onPressStudio = (item) => {
    dispatch(Actions.setSelectedStudio(item));
    navigation.navigate('StudioDetail', {item});
  };

  const isToday = () => {
    return moment(filterDate).isSame(new Date(), 'day');
  };
  const isTomorrow = () => {
    return moment(filterDate).isSame(
      moment().add(1, 'days').format('YYYY-MM-DD'),
    );
  };

  const keyExtractor = (k) => k.id;

  const renderStudiosItem = ({item}) => {
    return (
      <StudioItem
        title={item.title}
        profileImage={item.banner}
        images={item.images}
        imageUrls={item.imageUrls}
        rate={`$ ${item.price}\n12 hours`}
        subtitle={item.location}
        onPress={() => onPressStudio(item)}
      />
    );
  };

  return (
    <Container style={styles.container}>
      <SectionHeaderCenterTitle title="Studio Options" />
      <View style={styles.btnContainer}>
        <SolidButton
          title="Today"
          buttonStyle={isToday() ? styles.selected : styles.today}
          // onPress={() => {
          //   setFilterDate(moment().format('YYYY-MM-DD'));
          //   dispatch(Actions.getStudiosByDate(moment().format('YYYY-MM-DD')));
          // }}
        />
        <SolidButton
          title="Tomorrow"
          buttonStyle={isTomorrow() ? styles.selected : styles.today}
          onPress={() => {
            setFilterDate(moment().add(1, 'days').format('YYYY-MM-DD'));
            dispatch(
              Actions.getStudiosByDate(
                moment().add(1, 'days').format('YYYY-MM-DD'),
              ),
            );
          }}
        />
        <TouchableOpacity
          style={
            !isToday() && !isTomorrow()
              ? styles.calendarSelected
              : styles.calendar
          }
          onPress={() => setShowFilter(true)}>
          <Icon
            containerStyle={styles.iconContainerStyle}
            name={!isToday() && !isTomorrow() ? 'refresh' : 'calendar'}
            color={Colors.white}
            type="material-community"
            size={25}
            onPress={() => setShowFilter(true)}
          />
        </TouchableOpacity>
      </View>
      <FlatList
        contentContainerStyle={GlobalStyle.style.flatListStyle}
        data={filteredStudios}
        keyExtractor={keyExtractor}
        renderItem={renderStudiosItem}
      />
      <FilterDatedStudioModal
        dismiss={(date) => {
          setFilterDate(date);
          setShowFilter(false);
        }}
        date={filterDate}
        visible={showFilter}
      />
    </Container>
  );
};

Studio.navigationOptions = (screenProps) => ({
  title: 'Stories',
});
export default Studio;
