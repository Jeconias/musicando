import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import styled, {css} from 'styled-components/native';
import {EntityType} from '~/core/entity/common';
import {fonts} from '../common';
import DefaultImage from '../Default/DefaultImage';
import Icon from '../Icon';
import Text from '../Text';

interface Card {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  type?: EntityType;
}

interface OpportunityCardInterface extends Card {
  onSelect?(item: Card): void;
}

const OpportunityCard = ({
  onSelect,
  type = EntityType.EVENT,
  ...props
}: OpportunityCardInterface) => (
  <Card>
    <Like>
      <TouchableOpacity onPress={() => {}}>
        <Icon icon="heart" size="md" color="text" />
      </TouchableOpacity>
    </Like>
    <CardButton
      onPress={() => {
        if (onSelect) onSelect(props);
      }}>
      {!!props?.image && <ImageStyled source={{uri: props.image}} />}
      {!props?.image && (
        <DefaultImage>
          <Icon
            icon={type === EntityType.EVENT ? 'event' : 'user'}
            size="md"
            color="text"
          />
        </DefaultImage>
      )}
      <Content>
        <Text size="sm" color="white">
          {props.title}
        </Text>
        <Description size="xs" color="text">
          {props.description.length > 94
            ? `${props.description.substr(0, 95)}...`
            : props.description}
        </Description>
        {!!props.price && (
          <WrapperPrice size="xs" color="white">
            Valor inicial de{' '}
            <Price size="xs" color="primary">
              R$ {props.price.toString()}
            </Price>
          </WrapperPrice>
        )}
      </Content>
    </CardButton>
  </Card>
);

export default OpportunityCard;

const Card = styled(View)`
  ${({theme}) => css`
    position: relative;
    padding: ${theme.spacing.xs} ${theme.spacing.sm};
    border: 2px solid ${theme.colors.backgroundBlackSupport};
    border-radius: 4px;
    margin-bottom: ${theme.spacing.sm};
  `}
`;

const CardButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;

const ImageStyled = styled.Image`
  width: 64px;
  height: 64px;
  border-radius: 32px;
  margin-right: ${({theme}) => theme.spacing.sm};
`;

const Content = styled(View)`
  position: relative;
  flex-shrink: 1;
`;

const Description = styled(Text)`
  ${({theme}) => css`
    margin-bottom: ${theme.spacing.sm};
    padding-right: ${theme.spacing.sm};
    ${fonts.RubikLight};
  `}
`;

const WrapperPrice = styled(Text)``;

const Price = styled(Text)`
  ${fonts.RubikMedium};
`;

const Like = styled(View)`
  ${({theme}) => css`
    position: absolute;
    top: ${theme.spacing.xs};
    right: ${theme.spacing.sm};
    z-index: 2;
  `}
`;
