import {yupResolver} from '@hookform/resolvers/yup';
import {isEmpty} from 'lodash';
import React, {Fragment, useCallback, useEffect, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {Image, View} from 'react-native';
import styled, {css} from 'styled-components/native';
import {fonts, SafeAreaView} from '~/components/common';
import Feedback from '~/components/Feedback/Feedback';
import Icon from '~/components/Icon';
import ContainerWithHeader from '~/components/Layout/ContainerWithHeader';
import LightBoxView from '~/components/LightBoxView';
import Loading from '~/components/Loading/Loading';
import Text from '~/components/Text';
import {LoadingStatus, RouteParams} from '~/config/types';
import {UserType} from '~/core/entity/common';
import {Event} from '~/core/entity/event';
import useAuth from '~/hooks/useAuth';
import useFirebase from '~/hooks/useFirebase';
import useNavigate from '~/hooks/useNavigate';
import * as yup from 'yup';
import FormGroup from '~/components/Form/FormGroup';
import useTheme from '~/hooks/useTheme';
import {MaskService, TextInputMask} from 'react-native-masked-text';
import useReduxDispatch from '~/hooks/useReduxDispatch';
import {
  addProposal,
  proposalCreateAsyncThunk,
} from '~/core/store/actions/proposal';
import useFeedback from '~/hooks/useFeedback';
import useReduxSelector from '~/hooks/useReduxSelector';

interface FormData {
  price: number;
  description: string;
}

interface EventDetailsScreenInterface extends RouteParams<{event: Event}> {}

const schema = yup.object().shape({
  price: yup
    .number()
    .max(1000000, 'O valor máximo é de R$ 10.000,00.')
    .min(1, 'O valor mínimo é de R$ 1.')
    .required('Informação obrigatória.'),
  description: yup
    .string()
    .max(200, 'A quantidade máxima é de 200 caracteres.')
    .required('Informação obrigatória.'),
});

const defaultValues: FormData = {
  price: 0,
  description: '',
};

const EventDetailsScreen = ({route: {params}}: EventDetailsScreenInterface) => {
  const {goBack} = useNavigate();
  const {user} = useAuth();
  const {theme} = useTheme();
  const {feedback} = useFeedback();
  const dispatch = useReduxDispatch();
  const {
    event: {getCover},
  } = useFirebase();

  const proposalLoading = useReduxSelector(
    (state) => state.proposal.create.loading,
  );

  const event = params?.event;
  const hasEvent = !isEmpty(event);

  const [eventCover, setEventCover] = useState<string | undefined>();
  const [isOpenLightBox, setIsOpenLightBox] = useState(false);
  const [loading, setLoading] = useState<LoadingStatus>('idle');

  const {control, handleSubmit, errors, reset} = useForm({
    mode: 'onTouched',
    resolver: yupResolver(schema),
    defaultValues: defaultValues,
  });

  const toggleLightBox = useCallback(() => setIsOpenLightBox((prev) => !prev), [
    setIsOpenLightBox,
  ]);

  const onSubmit = useCallback(
    async (data: FormData) => {
      if (!event?.uuid) return;

      const resp = await dispatch(
        proposalCreateAsyncThunk({
          uuidEvent: event?.uuid,
          value: data.price.toString(),
          description: data.description,
        }),
      );
      if (proposalCreateAsyncThunk.fulfilled.match(resp)) {
        dispatch(addProposal(resp.payload.data.proposal));
        feedback({
          type: 'success',
          message: 'Proposta enviada com sucesso!',
        });
        reset(defaultValues);
      }
      toggleLightBox();
    },
    [dispatch, event, reset, toggleLightBox, feedback],
  );

  useEffect(() => {
    if (!event?.uuid || eventCover === '' || eventCover) return;
    setLoading('loading');

    (async () => {
      const cover = await getCover(event?.uuid);
      setEventCover(cover ?? '');
      setLoading('ok');
    })();
  }, [getCover, event]);

  const hasError = !!Object.keys(errors).length;

  return (
    <SafeAreaView>
      <ContainerWithHeader
        iconLeft={{
          icon: 'arrowLeft',
          onPress: goBack,
          backgroundColor: 'backgroundBlackSupport',
        }}
        title="Detalhes">
        {!hasEvent && (
          <Feedback
            title="Ops! Não conseguimos localizar esse usuário. 😱"
            text="Por favor, verifique a conexão com a sua internet."
          />
        )}
        {loading === 'loading' && <Loading />}
        {hasEvent && loading === 'ok' && (
          <Fragment>
            <UserInfos>
              <WrapperUserPhoto>
                <ImageContainer>
                  {event?.cover || eventCover ? (
                    <Image source={{uri: event?.cover || eventCover}} />
                  ) : (
                    <Icon icon="event" size="xl" color="text" />
                  )}
                </ImageContainer>
              </WrapperUserPhoto>
              <Infos>
                {/*  <Like onPress={() => {}}>
                  <Icon icon="heart" size="md" />
                </Like> */}
                <UserName size="sm" color="primary">
                  {event?.title ?? ''}
                </UserName>
                {/* <Info>
                  <Icon icon="star" size="sm" color="text" marginRight="xxs" />
                  <Text size="xs" color="white">
                    4.5
                  </Text>
                </Info> */}
                {(event?.valueRef || event?.value_ref) && (
                  <Info>
                    <Icon
                      icon="money"
                      size="sm"
                      color="text"
                      marginRight="xxs"
                    />

                    <Text size="xs" color="white">
                      R${' '}
                      {(event?.valueRef ?? event?.value_ref ?? '').toString()}
                    </Text>
                  </Info>
                )}
                <Info>
                  <Icon
                    icon="locationBig"
                    size="sm"
                    color="text"
                    marginRight="xxs"
                  />
                  <Text size="xs" color="white">
                    {event?.address || ''}
                  </Text>
                </Info>
              </Infos>
            </UserInfos>
            <ContentsWrapper>
              <ContentTitle>Resumo</ContentTitle>
              <DescriptionText size="xs">
                {event?.description ?? ''}
              </DescriptionText>
            </ContentsWrapper>
            {user?.userType === UserType.MUSICIAN && !event?.hasDeal && (
              <Fragment>
                <Proposal onPress={toggleLightBox}>
                  <Text size="sm" textAlign="center">
                    Lançar uma proposta
                  </Text>
                </Proposal>
                <LightBoxView
                  isVisible={isOpenLightBox}
                  onBackButtonPress={() => {
                    if (proposalLoading !== 'loading') toggleLightBox();
                  }}>
                  <Flex>
                    <View>
                      <Text size="md" textAlign="center" marginBottom="md">
                        Realizar Proposta
                      </Text>
                      <Controller
                        name="price"
                        control={control}
                        render={({onChange, onBlur, value}) => (
                          <FormGroup
                            tag={TextInputMask}
                            inputMaskProps={{
                              type: 'money',
                              onChangeText: (value) =>
                                onChange(
                                  MaskService.toRawValue('money', value ?? ''),
                                ),
                            }}
                            onBlur={onBlur}
                            value={MaskService.toMask('money', value ?? '')}
                            placeholder="Valor"
                            placeholderTextColor={theme.colors.text}
                            keyboardType="numeric"
                            icon="money"
                            error={errors?.price?.message}
                          />
                        )}
                      />
                      <Controller
                        name="description"
                        control={control}
                        render={({onChange, onBlur, value}) => (
                          <FormGroup
                            onBlur={onBlur}
                            onChangeText={(value) => onChange(value)}
                            value={value}
                            placeholder="Descrição"
                            placeholderTextColor={theme.colors.text}
                            keyboardType="default"
                            multiline={true}
                            icon="comment"
                            error={errors?.description?.message}
                          />
                        )}
                      />
                    </View>
                    {proposalLoading === 'loading' ? (
                      <Loading />
                    ) : (
                      <Done
                        onPress={handleSubmit(onSubmit)}
                        disabled={hasError}>
                        <Text size="sm" textAlign="center">
                          Concluir
                        </Text>
                      </Done>
                    )}
                  </Flex>
                </LightBoxView>
              </Fragment>
            )}
          </Fragment>
        )}
      </ContainerWithHeader>
    </SafeAreaView>
  );
};

export default EventDetailsScreen;

const UserInfos = styled.View`
  ${({theme}) => css`
    position: relative;
    flex-direction: row;
    width: 100%;
    height: 126px;
    border-radius: 10px;
    background-color: ${theme.colors.backgroundBlackOpacity};
    margin: ${theme.spacing.xlg} 0 ${theme.spacing.md};
  `}
`;

const WrapperUserPhoto = styled.View`
  height: 100%;
  width: 136px;
`;

const ImageContainer = styled.View`
  ${({theme}) => css`
    align-items: center;
    justify-content: center;
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 120%;
    border-radius: 10px;
    background-color: ${theme.colors.backgroundBlackSupport};
  `}
`;

const Infos = styled.View`
  ${({theme}) => css`
    flex: 1;
    padding: ${theme.spacing.sm};
  `}
`;

const UserName = styled(Text)`
  ${({theme}) => css`
    margin-bottom: ${theme.spacing.sm};
  `}
`;

const Info = styled.View`
  ${({theme}) => css`
    flex-direction: row;
    align-items: center;
    margin-bottom: ${theme.spacing.xxs};
  `}
`;

const Like = styled.TouchableOpacity`
  ${({theme}) => css`
    position: absolute;
    top: ${theme.spacing.sm};
    right: ${theme.spacing.sm};
    z-index: 1;
  `}
`;

const ContentsWrapper = styled.View`
  ${({theme}) => css`
    width: 100%;
    border-radius: 10px;
    padding: ${theme.spacing.sm};
    background-color: ${theme.colors.backgroundBlackOpacity};
    margin-bottom: ${theme.spacing.md};
  `}
`;

const ContentTitle = styled(Text)`
  ${({theme}) => css`
    margin-bottom: ${theme.spacing.xs};
  `}
`;

const DescriptionText = styled(Text)`
  ${fonts.RubikLight};
`;

/* const Image = styled.Image`
width: 65px;
  height: 65px;
  border-radius: 5px;
  margin: 0 ${({theme}) => theme.spacing.xxs};
`;

const GalleryItems = styled.View`
flex-direction: row;
margin: 0 -${({theme}) => theme.spacing.xxs};
`; */

const ButtonProposalCss = css(
  ({theme}) => css`
    margin-bottom: ${theme.spacing.md};
    background-color: ${theme.colors.primary};
    padding: ${theme.spacing.xs};
    border-radius: 7px;
  `,
);

const Proposal = styled.TouchableOpacity`
  width: 100%;
  position: absolute;
  bottom: 0;
  ${ButtonProposalCss};
`;

const Done = styled.TouchableOpacity`
  ${ButtonProposalCss};
`;

const Flex = styled.View`
  flex: 1;
  justify-content: space-between;
`;
