import {StyleSheet} from 'react-native';
import colors from '../../common/colors';
import {Constant} from '../../common';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingBottom: 16,
  },
  indicatorView: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 8,
  },
  indicator: {
    backgroundColor: colors.skyBlue02,
    height: 4,
    width: Constant.screenWidth / 3,
    marginHorizontal: 4,
    borderRadius: 2,
  },
  contentView: {
    marginHorizontal: 16,
  },
  contentSignatureView: {
    marginHorizontal: 16,
    flex: 1,
  },
  agreementTitle: {
    marginTop: 24,
  },
  agreementDesc: {
    marginTop: 8,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  agreementView: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginTop: 8,
  },
  agreementText: {
    color: colors.skyBlue02,
    fontSize: 16,
    marginLeft: 16,
  },
  eSignatureText: {
    marginTop: 8,
    marginBottom: 16,
    fontWeight: '600',
  },
  signatureView: {
    flex: 1,
    borderRadius: 10,
  },
  signature: {
    flex: 1,
  },
  signatureLine: {
    position: 'absolute',
    bottom: 24,
    left: 8,
    right: 8,
    height: 2,
    backgroundColor: colors.lightGray,
  },
  clearButtonView: {
    borderBottomWidth: 1,
    borderColor: colors.tabBarColor,
    marginTop: 8,
    paddingHorizontal: 24,
    paddingVertical: 8,
    backgroundColor: '#000',
  },
  clearButton: {
    borderColor: '#fff',
    borderRadius: 4,
    alignSelf: 'flex-end',
  },
  confirmButton: {
    marginHorizontal: 24,
  },
  modal: {
    margin: 0,
    backgroundColor: colors.mediumGray,
  },
  modalView: {
    color: colors.mediumGray,
    marginHorizontal: 24,
  },
  modalTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  viewUnCheck: {
    width: 20,
    height: 20,
    backgroundColor: '#fff',
    borderRadius: 4,
  },
  viewCheck: {
    width: 20,
    height: 20,
    backgroundColor: colors.skyBlue02,
    borderRadius: 4,
  },
  acceptView: {
    flexDirection: 'row',
    marginHorizontal: 24,
    borderTopWidth: 1,
    borderColor: colors.offWhite,
    marginTop: 16,
    paddingTop: 16,
  },
  doneButton: {
    marginHorizontal: 24,
  },
});
