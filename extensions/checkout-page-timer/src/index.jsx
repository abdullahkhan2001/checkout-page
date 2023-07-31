import React, { useEffect, useState } from 'react';
import { render, BlockStack, Text, useSettings, View, useExtensionApi } from '@shopify/checkout-ui-extensions-react';

render('Checkout::Dynamic::Render', () => <App />);

function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  const formattedMinutes = minutes.toString().padStart(2, '0');
  const formattedSeconds = seconds.toString().padStart(2, '0');
  return `${formattedMinutes}:${formattedSeconds}`;
}

function App() {
  const {
    timer_before_text,
    timer_after_text,
    timer,
    timer_ends,
    timer_text_color,
    timer_text_size,
    timer_size,
    timer_color
  } = useSettings();

  const { storage } = useExtensionApi(); // Obtaining the storage object from the extension API
  const [counterTimer, setCounterTimer] = useState(timer * 60); // Initial timer value set to the value from useSettings()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedTimer = await storage.read('countdownTimer');
        if (storedTimer !== null) {
          setCounterTimer(storedTimer);
        }
      } catch (error) {
        console.error('Error while reading timer data:', error);
      }
    };

    fetchData();
  }, [storage]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCounterTimer((prevTimer) => {
        if (prevTimer > 0) {
          const newTimer = prevTimer - 1;
          storage
            .write('countdownTimer', newTimer)
            .catch((error) => console.error('Error while writing timer data:', error));
          return newTimer;
        } else {
          clearInterval(interval);
          storage
            .delete('countdownTimer')
            .catch((error) => console.error('Error while deleting timer data:', error));
          return 0;
        }
      });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [storage]);

  const formattedTime = formatTime(counterTimer);

  return (
    <BlockStack
      border="base"
      borderRadius="base"
      padding="tight"
      spacing="loose"
      blockAlignment="center"
      cornerRadius="loose"
      overflow="hidden"
      inlineAlignment="center"
    >
      <View>
        <Text size={timer_text_size} appearance={timer_text_color} emphasis="strong">
          {timer_before_text}
        </Text>
        {counterTimer > 0 ? (
          <Text size={timer_size} emphasis="strong" appearance={timer_color}>
            {formattedTime}
          </Text>
        ) : (
          <Text size={timer_size} appearance={timer_color} emphasis="strong">
            {timer_ends}
          </Text>
        )}
        <Text size={timer_text_size} appearance={timer_text_color} emphasis="strong">
          {timer_after_text}
        </Text>
      </View>
    </BlockStack>
  );
}

export default App;