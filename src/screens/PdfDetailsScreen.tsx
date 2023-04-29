import {Reader, ReaderProvider} from '@epubjs-react-native/core';

import {useFileSystem} from '@epubjs-react-native/file-system'; // for Bare React Native project
import React from 'react';
import {SafeAreaView, useWindowDimensions} from 'react-native';

export default function App() {
  const {width, height} = useWindowDimensions();

  return (
    <SafeAreaView>
      <ReaderProvider>
        <Reader
          src="https://filesamples.com/samples/ebook/epub/famouspaintings.epub"
          width={width}
          height={height}
          fileSystem={useFileSystem}
        />
      </ReaderProvider>
    </SafeAreaView>
  );
}

// const source = {
//   uri: 'https://research.nhm.org/pdfs/10840/10840.pdf',
//   cache: true,
// };
