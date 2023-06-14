import React from 'react';
import {
  render,
  Image,
  Text,
  useSettings,
  
  BlockLayout,
  BlockStack,
  Grid,
} from '@shopify/checkout-ui-extensions-react';

render('Checkout::Dynamic::Render', () => <Benifits />);


function Benifits() {
  const { benifit_title_1, Benifit_subtitle_1, Benifit_img_1 } = useSettings();
  const { benifit_title_2, Benifit_subtitle_2, Benifit_img_2 } = useSettings();
  const { benifit_title_3, Benifit_subtitle_3, Benifit_img_3 } = useSettings();
  const { padding_block, padding_main, title_color, title_size, subtitle_size, subtitle_color} = useSettings();
  return (
    <BlockLayout
      rows={['fill', 'fill', 'fill']}
      border={'base'}
      borderRadius={'base'}
      padding={padding_main}
      spacing={'loose'}
      blockAlignment={'center'}
      cornerRadius={'loose'}
      overflow='hidden'
      inlineAlignment={'center'}
    >
      <Grid
      columns={['10%', 'fill']}
      spacing="base"
    >
        <Image source={Benifit_img_1} fit={'cover'} />
        <BlockStack padding={padding_block} spacing={padding_block}>
        <Text size={title_size} emphasis='bold' appearance={title_color} padding="none">{benifit_title_1}</Text>
        <Text size={subtitle_size} appearance={subtitle_color} emphasis='bold' padding="none">{Benifit_subtitle_1}</Text>
        </BlockStack>
        </Grid>
        <Grid
      columns={['10%', 'fill']}
      spacing="base"
    >
        <Image source={Benifit_img_2} fit={'cover'} />
        <BlockStack padding={padding_block} spacing={padding_block} >
        <Text size={title_size} emphasis='bold' appearance={title_color} padding="none" >{benifit_title_2}</Text>
        <Text size={subtitle_size} appearance={subtitle_color} emphasis='bold' padding="none">{Benifit_subtitle_2}</Text>
        </BlockStack>
        </Grid>
        <Grid
      columns={['10%', 'fill']}
      spacing="base"
    >
        <Image source={Benifit_img_3} fit={'cover'}/>
        <BlockStack padding={padding_block} spacing={padding_block}>
        <Text size={title_size} emphasis='bold' appearance={title_color} padding="none">{benifit_title_3}</Text>
        <Text size={subtitle_size} appearance={subtitle_color} emphasis='bold' padding="none">{Benifit_subtitle_3}</Text>
        </BlockStack>
        </Grid>
    </BlockLayout>
  );
}