import React from 'react';
import {fireEvent, render, waitFor} from '@testing-library/react-native';
//@ts-ignore
import {toHaveStyle} from '@testing-library/jest-native';
import CustomButton from '@src/component/custom-button';

describe('testing custom button component', () => {
  expect.extend({toHaveStyle});
  const text = 'Hello';
  it('should render button text correctly', async () => {
    const {getByTestId} = render(<CustomButton>{text}</CustomButton>);
    const element = getByTestId('customText');
    expect(element.props.children).toBe(text);
  });
  it('should be able to press on the button and execute the onPress prop', async () => {
    const onPress = jest.fn();
    const {getByTestId} = render(
      <CustomButton onPress={onPress}>{text}</CustomButton>,
    );
    const button = getByTestId('customButton');
    await waitFor(() => fireEvent.press(button));
    expect(onPress).toBeCalledTimes(1);
  });
  it('should be able to disable the button by disable prop', async () => {
    const onPress = jest.fn();
    const {getByTestId} = render(
      <CustomButton disabled={true} onPress={onPress}>
        {text}
      </CustomButton>,
    );
    const button = getByTestId('customButton');
    await waitFor(() => fireEvent.press(button));
    expect(onPress).not.toBeCalled();
  });
});
