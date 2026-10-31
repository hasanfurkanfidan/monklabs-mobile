import { useTheme } from '@monklabs/theme';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { PlaygroundProviders } from '@/showcase/settings';

export default function RootLayout() {
  return (
    <PlaygroundProviders>
      <ThemedStack />
    </PlaygroundProviders>
  );
}

function ThemedStack() {
  const { colors, scheme } = useTheme();
  return (
    <>
      <StatusBar style={scheme === 'dark' ? 'light' : 'dark'} />
      <Stack
        screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.background } }}
      />
    </>
  );
}
