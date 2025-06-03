import React from 'react';
import { render } from '@testing-library/react-native';
import { CardImage } from './CardImage';

describe('CardImage', () => {
  it('renders the image with the correct URI', () => {
    const testUri = 'https://example.com/image.jpg';

    const { getByTestId } = render(<CardImage uri={testUri} />);

    const image = getByTestId('card-image');
    expect(image.props.source).toEqual({ uri: testUri });
  });
});
