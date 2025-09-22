import ExpoArgon2 from 'expo-argon2';
import * as Clipboard from 'expo-clipboard';
import { useState } from 'react';
import { Button, SafeAreaView, Text, TextInput, View } from 'react-native';

export default function App() {
  const [password, setPassword] = useState('');
  const [salt, setSalt] = useState('');
  const [hash, setHash] = useState<{
    encoded: string;
    hex: string;
    raw: Uint8Array;
  }>({ encoded: '', hex: '', raw: new Uint8Array() });

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flex: 1,
          gap: 8,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <TextInput
          style={{ width: '100%' }}
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
        />
        <TextInput
          style={{ width: '100%' }}
          value={salt}
          onChangeText={setSalt}
          placeholder="Salt"
        />
        <View style={{ flexDirection: 'row', gap: 10, margin: 20 }}>
          <Text>Encoded: </Text>
          <Text>{hash.encoded}</Text>
        </View>
        <View style={{ flexDirection: 'row', gap: 10, margin: 20 }}>
          <Text>Hex: </Text>
          <Text>{hash.hex}</Text>
        </View>
        <View style={{ flexDirection: 'row', gap: 10, margin: 20 }}>
          <Text>Raw: </Text>
          <Text>{hash.raw}</Text>
        </View>
        <Button
          onPress={() => {
            const result = ExpoArgon2.hash(password, salt, {
              type: 'argon2d',
              timeCost: 3,
              memoryCost: 65536,
              parallelism: 4,
              hashLength: 32,
            });
            setHash(result);
          }}
          title="Hash"
        />
        <Button
          onPress={() => Clipboard.setStringAsync(hash.encoded)}
          title="Copy"
        />
      </View>
    </SafeAreaView>
  );
}

function Group(props: { name: string; children: React.ReactNode }) {
  return (
    <View style={styles.group}>
      <Text style={styles.groupHeader}>{props.name}</Text>
      {props.children}
    </View>
  );
}

const styles = {
  header: {
    fontSize: 30,
    margin: 20,
  },
  groupHeader: {
    fontSize: 20,
    marginBottom: 20,
  },
  group: {
    margin: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
  },
  container: {
    flex: 1,
    backgroundColor: '#eee',
  },
  view: {
    flex: 1,
    height: 200,
  },
};
