import React from 'react';
import {
  render,
  BlockStack,
  TextBlock,
  useSettings,
  View,
  Text,
} from '@shopify/checkout-ui-extensions-react';

render('Checkout::Dynamic::Render', () => <App />);

function App() {
  const {timer_before_text, timer_after_text, timer} = useSettings();
  const {timer_text_color, timer_text_size, timer_size, timer_color} = useSettings()
  const initialSeconds = timer * 60; // 15 minutes in seconds
  const [seconds, setSeconds] = React.useState(initialSeconds);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prevSeconds) => {
        if (prevSeconds <= 0) {
          clearInterval(interval); // Stop the timer
          return 0;
        }
        return prevSeconds - 1;
      });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const formattedTime = React.useMemo(() => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  }, [seconds]);

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return (
    
    <BlockStack 
    border={'base'}
    borderRadius={'base'}
    padding={'tight'}
    spacing={'loose'}
    blockAlignment={'center'}
    cornerRadius={'loose'}
    overflow='hidden'
    inlineAlignment={'center'}>
      <TextBlock>
    <View>
      <Text size={timer_text_size} appearance={timer_text_color} emphasis='bold'>{timer_before_text}</Text>
      <Text size={timer_size} emphasis='bold' appearance={timer_color} > {minutes} : {remainingSeconds}</Text>
      <Text size={timer_text_size} appearance={timer_text_color} emphasis='bold'> {timer_after_text}</Text></View>
    </TextBlock>
    </BlockStack>
    
  );
}

export default App;

















// import React from 'react';
// import {
//   useExtensionApi,
//   render,
//   Banner,
//   useTranslate,
// } from '@shopify/checkout-ui-extensions-react';

// render('Checkout::Dynamic::Render', () => <App />);

// function App() {
//   const {extensionPoint} = useExtensionApi();
//   const translate = useTranslate();
//   return (
//     <Banner title="checkout-timer">
//       {translate('welcome', {extensionPoint})}
//     </Banner>
//   );
// }