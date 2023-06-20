import firestore from '@react-native-firebase/firestore';

export const getDoc = async (collection, id) => {
  let response = await firestore().collection(collection).doc(id).get();
  console.warn(response);
  return response;
};

export const getCollection = (collection, orderby) => {
  return new Promise((resolve, reject) => {
    var ref = orderby
      ? firestore().collection(collection).orderBy(orderby)
      : firestore().collection(collection);

    ref
      .get()
      .then((querySnapshot) => {
        console.log('Total users: ', querySnapshot.size);
        var collectionArray = [];
        querySnapshot.forEach((documentSnapshot) => {
          let record = documentSnapshot.data();
          record.docId = documentSnapshot.id;
          collectionArray.push(record);
        });
        return resolve(collectionArray);
      })
      .catch((error) => {
        return reject('fail');
      });
  });
};

export const getCollectionWithFilter = (collection, filter, orderby) => {
  return new Promise((resolve, reject) => {
    var ref = orderby
      ? firestore()
          .collection(collection)
          .where(filter[0], filter[1], filter[2])
          .orderBy(orderby)
      : firestore()
          .collection(collection)
          .where(filter[0], filter[1], filter[2]);

    ref
      .get()
      .then((querySnapshot) => {
        console.log('Total users: ', querySnapshot.size);
        var collectionArray = [];
        querySnapshot.forEach((documentSnapshot) => {
          let record = documentSnapshot.data();
          record.docId = documentSnapshot.id;
          collectionArray.push(record);
        });
        return resolve(collectionArray);
      })
      .catch((error) => {
        return reject('fail');
      });
  });
};

export const add = (collection, data) => {
  return new Promise((resolve, reject) => {
    firestore()
      .collection(collection)
      .add(data)
      .then(() => {
        return resolve('success');
      })
      .catch((error) => {
        return reject('fail');
      });
  });
};

export const set = (collection, id, data) => {
  return new Promise((resolve, reject) => {
    firestore()
      .collection(collection)
      .doc(id)
      .set(data)
      .then(() => {
        return resolve('success');
      })
      .catch((error) => {
        return reject('fail');
      });
  });
};

export const update = (collection, id, data) => {
  return new Promise((resolve, reject) => {
    firestore()
      .collection(collection)
      .doc(id)
      .update(data)
      .then(() => {
        return resolve('success');
      })
      .catch((error) => {
        return reject('fail');
      });
  });
};

export const deleteDoc = (collection, id) => {
  return new Promise((resolve, reject) => {
    firestore()
      .collection(collection)
      .doc(id)
      .delete()
      .then(() => {
        return resolve('success');
      })
      .catch((error) => {
        return reject('fail');
      });
  });
};
