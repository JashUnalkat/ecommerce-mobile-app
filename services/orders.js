// services/orders.js
import { addDoc, collection, getDocs, query, where, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';

export async function createOrder({ userId, items, total, address, paymentMethod }) {
  const ordersRef = collection(db, 'orders');
  const docRef = await addDoc(ordersRef, {
    userId,
    items,
    total,
    address,
    paymentMethod,
    createdAt: serverTimestamp(),
  });
  return docRef.id;
}

export async function getUserOrders(userId) {
  const ordersRef = collection(db, 'orders');
  const q = query(ordersRef, where('userId', '==', userId));
  const snap = await getDocs(q);
  const data = [];
  snap.forEach((d) => data.push({ id: d.id, ...d.data() }));
  return data;
}
