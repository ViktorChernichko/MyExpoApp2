import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  Image,
  ScrollView,
} from 'react-native';

export default function App() {
  // CONTACTS
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [contacts, setContacts] = useState([]);
  const [editContactId, setEditContactId] = useState(null);

  // GALLERY
  const [category, setCategory] = useState('All');

  const images = [
    { id: 1, category: 'Nature', url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAPH6sRfOQ0HWNkI7Ojbm-cJSSMkE4Vx8jXw&s' },
    { id: 2, category: 'Cities', url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIqdZe7CoUjJkVk8tEtLuwyUZp9YGQsyImXA&s' },
    { id: 3, category: 'Animals', url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrMXC1OHFk0z0mgcBGojXHn4e2Tl3I4uaxhQ&s' },
  ];

  // REVIEWS
  const [rating, setRating] = useState('');
  const [review, setReview] = useState('');
  const [reviews, setReviews] = useState([]);
  const [editReviewId, setEditReviewId] = useState(null);

  // CONTACTS LOGIC
  const saveContact = () => {
    if (!name || !phone || !email) return;

    if (editContactId !== null) {
      setContacts(
        contacts.map(c =>
          c.id === editContactId ? { ...c, name, phone, email } : c
        )
      );
      setEditContactId(null);
    } else {
      setContacts([
        ...contacts,
        { id: Date.now(), name, phone, email },
      ]);
    }

    setName('');
    setPhone('');
    setEmail('');
  };

  const deleteContact = id => {
    setContacts(contacts.filter(c => c.id !== id));
  };

  const editContact = c => {
    setName(c.name);
    setPhone(c.phone);
    setEmail(c.email);
    setEditContactId(c.id);
  };

  // GALLERY FILTER
  const filtered =
    category === 'All'
      ? images
      : images.filter(i => i.category === category);

  // REVIEWS LOGIC
  const saveReview = () => {
    if (!rating || !review) return;

    if (editReviewId !== null) {
      setReviews(
        reviews.map(r =>
          r.id === editReviewId ? { ...r, rating, review } : r
        )
      );
      setEditReviewId(null);
    } else {
      setReviews([
        ...reviews,
        { id: Date.now(), rating, review },
      ]);
    }

    setRating('');
    setReview('');
  };

  const editReview = r => {
    setRating(r.rating);
    setReview(r.review);
    setEditReviewId(r.id);
  };

  return (
    <ScrollView style={{ padding: 20, paddingTop: 40, paddingBottom: 40}}>

      {/* CONTACTS */}
      <Text style={{ fontSize: 20, marginBottom: 10 }}>Contacts</Text>

      <TextInput placeholder="Name" value={name} onChangeText={setName} />
      <TextInput placeholder="Phone" value={phone} onChangeText={setPhone} />
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />

      <Pressable onPress={saveContact}>
        <Text>Save Contact</Text>
      </Pressable>

      {contacts.map(c => (
        <View key={c.id}>
          <Text>{c.name}</Text>
          <Text>{c.phone}</Text>
          <Text>{c.email}</Text>

          <Pressable onPress={() => editContact(c)}>
            <Text>Edit</Text>
          </Pressable>

          <Pressable onPress={() => deleteContact(c.id)}>
            <Text>Delete</Text>
          </Pressable>
        </View>
      ))}

      {/* GALLERY */}
      <Text style={{ fontSize: 20, marginTop: 20 }}>Gallery</Text>

      <View style={{ flexDirection: 'row', gap: 10 }}>
        <Pressable onPress={() => setCategory('All')}>
          <Text>All</Text>
        </Pressable>
        <Pressable onPress={() => setCategory('Nature')}>
          <Text>Nature</Text>
        </Pressable>
        <Pressable onPress={() => setCategory('Cities')}>
          <Text>Cities</Text>
        </Pressable>
        <Pressable onPress={() => setCategory('Animals')}>
          <Text>Animals</Text>
        </Pressable>
      </View>

      {filtered.map(i => (
        <Image
          key={i.id}
          source={{ uri: i.url }}
          style={{ width: 150, height: 150, marginTop: 10 }}
        />
      ))}

      {/* REVIEWS */}
      <Text style={{ fontSize: 20, marginTop: 20 }}>Reviews</Text>

      <TextInput
        placeholder="Rating (1-5)"
        value={rating}
        onChangeText={setRating}
      />

      <TextInput
        placeholder="Review"
        value={review}
        onChangeText={setReview}
      />

      <Pressable onPress={saveReview}>
        <Text>Save Review</Text>
      </Pressable>

      {reviews.map(r => (
        <View key={r.id}>
          <Text>⭐ {r.rating}</Text>
          <Text>{r.review}</Text>

          <Pressable onPress={() => editReview(r)}>
            <Text>Edit</Text>
          </Pressable>
        </View>
      ))}

    </ScrollView>
  );
}