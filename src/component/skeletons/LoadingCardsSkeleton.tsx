import {useTheme} from '@react-navigation/native';
import React from 'react';
import {} from 'react-native';
import {responsiveWidth} from 'react-native-responsive-dimensions';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

interface IProps {
  numberOfItems: number;
}
export default function LoadingCardsSkeleton(props: IProps) {
  const themeColors = useTheme().colors;
  return (
    <>
      {new Array(props.numberOfItems).fill(undefined).map((_, index) => (
        <SkeletonPlaceholder
          key={'SkeletonPlaceholder_' + index}
          backgroundColor={themeColors.border}
          highlightColor={themeColors.card}>
          <SkeletonPlaceholder.Item
            height={responsiveWidth(40)}
            margin={8}
            flexDirection="row">
            <SkeletonPlaceholder.Item
              width={responsiveWidth(30)}
              height={responsiveWidth(30)}
              borderRadius={10}
            />
            <SkeletonPlaceholder.Item>
              <SkeletonPlaceholder.Item
                margin={4}
                width={responsiveWidth(40)}
                height={10}
              />
              <SkeletonPlaceholder.Item
                margin={4}
                marginTop={16}
                width={responsiveWidth(60) - 16}
                height={10}
              />
              <SkeletonPlaceholder.Item
                margin={4}
                width={responsiveWidth(50) - 16}
                height={10}
              />
              <SkeletonPlaceholder.Item
                margin={4}
                width={responsiveWidth(60) - 16}
                height={10}
              />
              <SkeletonPlaceholder.Item
                margin={4}
                width={responsiveWidth(50) - 16}
                height={10}
              />
            </SkeletonPlaceholder.Item>
          </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder>
      ))}
    </>
  );
}
