import React from 'react';
import CustomText from '@src/component/custom-text';
import {render} from '@testing-library/react-native';
//@ts-ignore
import {toHaveStyle} from '@testing-library/jest-native';

describe('testing custom text component', () => {
  expect.extend({toHaveStyle});
  const text = 'Hello';
  it('should render text correctly', async () => {
    const {getByTestId} = render(<CustomText type="h1">{text}</CustomText>);
    const element = getByTestId('customText');
    expect(element.props.children).toBe(text);
  });
  it('should render h1 text with bold font family', async () => {
    const {getByTestId} = render(<CustomText type="h1">{text}</CustomText>);
    const element = getByTestId('customText');
    expect(element).toHaveStyle({fontFamily: 'Cairo-Medium'});
  });
  it('should render p text with medium font family', async () => {
    const {getByTestId} = render(<CustomText type="p">{text}</CustomText>);
    const element = getByTestId('customText');
    expect(element).toHaveStyle({fontFamily: 'Cairo-Medium'});
  });
});
